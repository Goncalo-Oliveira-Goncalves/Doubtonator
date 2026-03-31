"""
optimize_svgs.py — SVG asset optimizer for the Doubtonator project.

For every .svg in the assets/ tree it:
  1. Removes the sodipodi:namedview metadata block
  2. Prunes groups/paths whose coordinates lie entirely outside the viewBox
  3. Expands the viewBox when content is slightly clipped (e.g. rotated arms)
  4. Removes unused <defs> entries
  5. Backs up each original to <file>.bak before touching it

Usage:
    python optimize_svgs.py [--dry-run]

Pass --dry-run to preview what would change without writing files.
"""

import xml.etree.ElementTree as ET
import math, re, os, sys, shutil, glob, argparse

# ── Namespace constants ───────────────────────────────────────────────────────
SVG_NS      = "http://www.w3.org/2000/svg"
INKSCAPE_NS = "http://www.inkscape.org/namespaces/inkscape"
SODIPODI_NS = "http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd"
XLINK_NS    = "http://www.w3.org/1999/xlink"

for prefix, uri in [
    ("",          SVG_NS),
    ("inkscape",  INKSCAPE_NS),
    ("sodipodi",  SODIPODI_NS),
    ("xlink",     XLINK_NS),
    ("svg",       SVG_NS),
    ("xml",       "http://www.w3.org/XML/1998/namespace"),
]:
    ET.register_namespace(prefix, uri)

_S = f"{{{SVG_NS}}}"   # shorthand: _S + "g" == "{http://...}g"

# ── Transform math ────────────────────────────────────────────────────────────
def identity():
    return [1.0, 0.0, 0.0, 1.0, 0.0, 0.0]  # [a, b, c, d, e, f]

def mat_mul(m1, m2):
    a1,b1,c1,d1,e1,f1 = m1
    a2,b2,c2,d2,e2,f2 = m2
    return [
        a1*a2 + c1*b2,
        b1*a2 + d1*b2,
        a1*c2 + c1*d2,
        b1*c2 + d1*d2,
        a1*e2 + c1*f2 + e1,
        b1*e2 + d1*f2 + f1,
    ]

def parse_transform(t):
    """Parse any SVG transform string into a 6-element matrix."""
    if not t:
        return identity()
    result = identity()
    # SVG allows chained transforms: "translate(…) rotate(…) scale(…)"
    for part in re.finditer(
            r'(matrix|translate|scale|rotate|skewX|skewY)\s*\(([^)]+)\)', t):
        name = part.group(1)
        args = [float(x) for x in re.split(r'[,\s]+', part.group(2).strip()) if x]
        if name == 'translate':
            tx, ty = args[0], (args[1] if len(args) > 1 else 0.0)
            m = [1, 0, 0, 1, tx, ty]
        elif name == 'scale':
            sx, sy = args[0], (args[1] if len(args) > 1 else args[0])
            m = [sx, 0, 0, sy, 0, 0]
        elif name == 'matrix':
            m = args[:6]
        elif name == 'rotate':
            a = math.radians(args[0])
            ca, sa = math.cos(a), math.sin(a)
            if len(args) >= 3:
                cx, cy = args[1], args[2]
                m = [ca, sa, -sa, ca,
                     cx - cx*ca + cy*sa,
                     cy - cx*sa - cy*ca]
            else:
                m = [ca, sa, -sa, ca, 0, 0]
        elif name == 'skewX':
            m = [1, 0, math.tan(math.radians(args[0])), 1, 0, 0]
        elif name == 'skewY':
            m = [1, math.tan(math.radians(args[0])), 0, 1, 0, 0]
        else:
            m = identity()
        result = mat_mul(result, m)
    return result

def apply_mat(mat, x, y):
    a,b,c,d,e,f = mat
    return (a*x + c*y + e, b*x + d*y + f)

# ── Proper SVG path parser ────────────────────────────────────────────────────
# Number of *coordinate* values each command consumes (flags excluded).
# Arc (A/a) consumes: rx, ry, x-rotation, [flag, flag], x, y  — we skip the 2 flags.
_CMD_COORD_COUNT = {
    'M': 2, 'm': 2,
    'L': 2, 'l': 2,
    'H': 1, 'h': 1,
    'V': 1, 'v': 1,
    'C': 6, 'c': 6,
    'S': 4, 's': 4,
    'Q': 4, 'q': 4,
    'T': 2, 't': 2,
    'A': 5, 'a': 5,   # 7 total params but 2 are flags; we emit 5 "coords" (rx,ry,rot,x,y)
    'Z': 0, 'z': 0,
}

def _tokenize_path(d):
    """Yield (command, [args]) pairs from an SVG path d string."""
    token_re = re.compile(r'([MmLlHhVvCcSsQqTtAaZz])|'
                          r'([-+]?(?:\d+\.?\d*|\.\d+)(?:[eE][-+]?\d+)?)')
    tokens = token_re.findall(d)
    cmd = None
    nums = []
    for cmd_tok, num_tok in tokens:
        if cmd_tok:
            if cmd is not None:
                yield cmd, nums
            cmd = cmd_tok
            nums = []
        elif num_tok:
            nums.append(float(num_tok))
    if cmd is not None:
        yield cmd, nums

def extract_path_points(d):
    """
    Return a list of (x, y) absolute coordinate points from a path d string.
    Arc flags (large-arc and sweep) are correctly skipped.
    """
    points = []
    cur_x, cur_y = 0.0, 0.0

    for cmd, raw in _tokenize_path(d):
        upper = cmd.upper()
        rel = cmd.islower()

        if upper == 'Z':
            continue

        if upper == 'A':
            # Arc: rx ry x-rot large-arc-flag sweep-flag x y  (7 params per segment)
            i = 0
            while i + 6 < len(raw):
                # skip rx(0), ry(1), x-rot(2), flag(3), flag(4)
                x, y = raw[i+5], raw[i+6]
                if rel:
                    x, y = cur_x + x, cur_y + y
                points.append((x, y))
                cur_x, cur_y = x, y
                i += 7
            continue

        n = _CMD_COORD_COUNT.get(upper, 2)
        if n == 0:
            continue

        i = 0
        while i + n - 1 < len(raw):
            segment = raw[i:i+n]

            if upper == 'H':
                x = (cur_x + segment[0]) if rel else segment[0]
                points.append((x, cur_y))
                cur_x = x
            elif upper == 'V':
                y = (cur_y + segment[0]) if rel else segment[0]
                points.append((cur_x, y))
                cur_y = y
            elif upper in ('M', 'L', 'T'):
                x = (cur_x + segment[0]) if rel else segment[0]
                y = (cur_y + segment[1]) if rel else segment[1]
                points.append((x, y))
                cur_x, cur_y = x, y
            elif upper in ('C', 'S', 'Q'):
                # Last two values are the endpoint
                x = (cur_x + segment[-2]) if rel else segment[-2]
                y = (cur_y + segment[-1]) if rel else segment[-1]
                # Also include control points for tighter bbox
                for j in range(0, len(segment)-1, 2):
                    px = (cur_x + segment[j])   if rel else segment[j]
                    py = (cur_y + segment[j+1]) if rel else segment[j+1]
                    points.append((px, py))
                cur_x, cur_y = x, y
            i += n

    return points

# ── Bounding box helpers ──────────────────────────────────────────────────────
INF = float('inf')

def merge_bbox(a, b):
    if a is None: return b
    if b is None: return a
    return (min(a[0],b[0]), min(a[1],b[1]), max(a[2],b[2]), max(a[3],b[3]))

def points_bbox(points, mat):
    """Apply mat to a list of (x,y) and return (xmin,ymin,xmax,ymax) or None."""
    if not points:
        return None
    xs, ys = [], []
    for (px, py) in points:
        tx, ty = apply_mat(mat, px, py)
        xs.append(tx); ys.append(ty)
    return (min(xs), min(ys), max(xs), max(ys))

def element_bbox(el, parent_mat):
    """Compute rough SVG-space bounding box of a single element (no children)."""
    own_mat = parse_transform(el.get("transform"))
    mat = mat_mul(parent_mat, own_mat)

    pts = []

    # Path d
    d = el.get("d")
    if d:
        pts.extend(extract_path_points(d))

    # Rect / image x, y, width, height
    x = el.get("x"); y = el.get("y")
    w = el.get("width"); h = el.get("height")
    if x is not None and y is not None:
        try:
            fx, fy = float(x), float(y)
            fw = float(w) if w else 0.0
            fh = float(h) if h else 0.0
            pts += [(fx, fy), (fx+fw, fy), (fx, fy+fh), (fx+fw, fy+fh)]
        except ValueError:
            pass

    # Circle cx, cy, r
    cx = el.get("cx"); cy = el.get("cy"); r = el.get("r")
    if cx is not None and cy is not None:
        try:
            fcx, fcy, fr = float(cx), float(cy), float(r or 0)
            pts += [(fcx-fr, fcy), (fcx+fr, fcy), (fcx, fcy-fr), (fcx, fcy+fr)]
        except ValueError:
            pass

    # Text x, y (rough)
    if el.tag in (f"{_S}text", f"{_S}tspan"):
        tx = el.get("x"); ty = el.get("y")
        if tx and ty:
            try:
                pts.append((float(tx), float(ty)))
            except ValueError:
                pass

    return points_bbox(pts, mat)

def subtree_bbox(el, parent_mat):
    """Recursively compute the bounding box of an element and all its descendants."""
    own_mat = parse_transform(el.get("transform"))
    mat = mat_mul(parent_mat, own_mat)

    bb = element_bbox(el, parent_mat)  # this element itself

    for child in el:
        child_bb = subtree_bbox(child, mat)
        bb = merge_bbox(bb, child_bb)

    return bb

def boxes_overlap(b1, b2, margin=0.0):
    """Return True if two (xmin,ymin,xmax,ymax) boxes overlap (with optional margin)."""
    if b1 is None or b2 is None:
        return False
    return (b1[0] - margin <= b2[2] + margin and
            b1[2] + margin >= b2[0] - margin and
            b1[1] - margin <= b2[3] + margin and
            b1[3] + margin >= b2[1] - margin)

# ── Defs cleanup ──────────────────────────────────────────────────────────────
def collect_url_refs(root):
    """Collect all IDs referenced via url(#id) or href="#id" anywhere in the tree."""
    refs = set()
    for el in root.iter():
        for val in el.attrib.values():
            for m in re.finditer(r'url\(#([^)]+)\)', val):
                refs.add(m.group(1))
            if val.startswith('#'):
                refs.add(val[1:])
        xhref = el.get(f"{{{XLINK_NS}}}href", "")
        if xhref.startswith('#'):
            refs.add(xhref[1:])
        for m in re.finditer(r'url\(#([^)]+)\)', el.get("style", "")):
            refs.add(m.group(1))
    return refs

def clean_defs(root):
    """Remove unused entries from <defs>. Returns (before, after) counts."""
    defs = root.find(f"{_S}defs")
    if defs is None:
        return 0, 0
    # Collect refs from the whole document first
    refs = collect_url_refs(root)
    before = len(list(defs))
    to_remove = []
    for child in list(defs):
        cid = child.get("id", "")
        tag = child.tag.split("}")[-1]
        # Always drop Inkscape path-effect entries — they bloat the file and
        # are only used by Inkscape's own editing UI, not by renderers.
        if "path-effect" in tag or (cid and cid.startswith("path-effect")):
            to_remove.append(child)
        elif cid and cid not in refs:
            to_remove.append(child)
    for child in to_remove:
        defs.remove(child)
    return before, len(list(defs))

# ── Main per-file logic ───────────────────────────────────────────────────────
PRUNE_MARGIN   = 1.0   # mm — how far outside viewBox before we prune
EXPAND_PADDING = 0.5   # mm — padding added when auto-expanding the viewBox

def process_file(path, dry_run=False):
    size_in = os.path.getsize(path)

    tree = ET.parse(path)
    root = tree.getroot()

    vb = root.get("viewBox", "").split()
    if len(vb) != 4:
        return None  # can't determine frame — skip
    vb_x, vb_y, vb_w, vb_h = float(vb[0]), float(vb[1]), float(vb[2]), float(vb[3])
    viewbox = (vb_x, vb_y, vb_x + vb_w, vb_y + vb_h)

    changed = False

    # ── Remove sodipodi:namedview ─────────────────────────────────────────────
    namedview = root.find(f"{{{SODIPODI_NS}}}namedview")
    if namedview is not None:
        root.remove(namedview)
        changed = True

    # ── Prune out-of-frame content ────────────────────────────────────────────
    layer1 = root.find(f".//{_S}g[@id='layer1']")
    total_pruned = 0

    if layer1 is not None:
        layer1_mat = parse_transform(layer1.get("transform"))

        def prune(parent, par_mat):
            nonlocal total_pruned
            own = parse_transform(parent.get("transform"))
            cur = mat_mul(par_mat, own)
            to_remove = []
            for child in list(parent):
                bb = subtree_bbox(child, cur)
                if bb is None or not boxes_overlap(bb, viewbox, margin=PRUNE_MARGIN):
                    to_remove.append(child)
                elif len(child) > 0:
                    prune(child, cur)
            for child in to_remove:
                parent.remove(child)
                total_pruned += 1

        prune(layer1, identity())
        if total_pruned > 0:
            changed = True

    # ── Auto-expand viewBox for clipped content ───────────────────────────────
    if layer1 is not None:
        layer1_mat = parse_transform(layer1.get("transform"))
        content_bb = subtree_bbox(layer1, identity())

        if content_bb is not None:
            pad = EXPAND_PADDING
            need_x0 = content_bb[0] - pad
            need_y0 = content_bb[1] - pad
            need_x1 = content_bb[2] + pad
            need_y1 = content_bb[3] + pad

            new_x0 = min(vb_x, need_x0)
            new_y0 = min(vb_y, need_y0)
            new_x1 = max(vb_x + vb_w, need_x1)
            new_y1 = max(vb_y + vb_h, need_y1)

            if (abs(new_x0 - vb_x) > 0.01 or abs(new_y0 - vb_y) > 0.01 or
                    abs(new_x1 - (vb_x+vb_w)) > 0.01 or abs(new_y1 - (vb_y+vb_h)) > 0.01):
                nw = new_x1 - new_x0
                nh = new_y1 - new_y0
                root.set("viewBox", f"{new_x0:.6g} {new_y0:.6g} {nw:.6g} {nh:.6g}")

                # Keep width/height attributes in sync (physical size in mm)
                for attr, val in [("width", nw), ("height", nh)]:
                    old_attr = root.get(attr, "")
                    unit_m = re.match(r"[\d.eE+\-]+(\D*)", old_attr)
                    unit = unit_m.group(1) if unit_m else "mm"
                    root.set(attr, f"{val:.6g}{unit}")

                changed = True

    # ── Clean unused defs ─────────────────────────────────────────────────────
    defs_before, defs_after = clean_defs(root)
    if defs_after < defs_before:
        changed = True

    if not changed:
        return {"path": path, "size_in": size_in, "size_out": size_in,
                "pruned": 0, "skipped": True}

    if not dry_run:
        bak = path + ".bak"
        if not os.path.exists(bak):
            shutil.copy2(path, bak)
        tree.write(path, encoding="unicode", xml_declaration=True)

    size_out = os.path.getsize(path) if not dry_run else size_in
    return {
        "path":      path,
        "size_in":   size_in,
        "size_out":  size_out,
        "pruned":    total_pruned,
        "defs_removed": defs_before - defs_after,
        "skipped":   False,
    }

# ── Entry point ───────────────────────────────────────────────────────────────
def main():
    parser = argparse.ArgumentParser(description="Optimize SVG assets")
    parser.add_argument("--dry-run", action="store_true",
                        help="Report what would change without writing files")
    args = parser.parse_args()

    svg_files = sorted(glob.glob("assets/**/*.svg", recursive=True))
    # Skip backup files
    svg_files = [f for f in svg_files if not f.endswith(".bak")]

    total_before = 0
    total_after  = 0
    processed    = 0
    skipped      = 0

    print(f"{'DRY RUN — ' if args.dry_run else ''}Processing {len(svg_files)} SVG files...\n")

    for path in svg_files:
        try:
            result = process_file(path.replace("\\", "/"), dry_run=args.dry_run)
        except Exception as e:
            print(f"  ERROR {path}: {e}")
            continue

        if result is None:
            print(f"  SKIP  {path}  (no viewBox)")
            skipped += 1
            continue

        total_before += result["size_in"]
        total_after  += result["size_out"]

        if result["skipped"]:
            skipped += 1
            print(f"  OK    {path}  ({result['size_in']//1024}KB, nothing to remove)")
        else:
            reduction = result["size_in"] - result["size_out"]
            pct = 100 * reduction // max(result["size_in"], 1)
            action = "WOULD CHANGE" if args.dry_run else "OPTIMIZED"
            print(f"  {action}  {path}")
            print(f"         {result['size_in']//1024}KB -> {result['size_out']//1024}KB"
                  f"  (-{pct}%)  pruned={result['pruned']}  "
                  f"defs_removed={result.get('defs_removed',0)}")
            processed += 1

    print(f"\nDone. {processed} optimized, {skipped} unchanged.")
    if total_before > 0:
        total_pct = 100 * (total_before - total_after) // total_before
        print(f"Total: {total_before//1024}KB -> {total_after//1024}KB  (-{total_pct}%)")

if __name__ == "__main__":
    main()
