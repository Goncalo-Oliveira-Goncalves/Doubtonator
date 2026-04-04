const path = require("path");
const fs = require("fs");

function toCamelCase(raw) {
  return raw.replace(/-([a-z])/gi, (_, c) => c.toUpperCase());
}

function stripFrontmatter(text) {
  const lines = text.split(/\r?\n/);
  let i = 0;
  if (lines[0]?.trim() === "---") {
    i = 1;
    while (i < lines.length && lines[i].trim() !== "---") i += 1;
    i += 1;
  }
  return lines.slice(i).join("\n");
}

/**
 * @param {string} segment
 * @returns {{ id: string, label: string | null, hasExplicit: boolean } | null}
 */
function parseNodeRef(segment) {
  const s = segment.trim();
  const m = s.match(/^([a-zA-Z0-9_-]+)(?:\["([^"]*)"\])?$/);
  if (!m) return null;
  const id = toCamelCase(m[1]);
  const hasExplicit = m[2] !== undefined;
  const label = hasExplicit ? (m[2] ?? "").trim() : null;
  return { id, label, hasExplicit };
}

/**
 * @param {Map<string, string>} labelMap
 * @param {{ id: string, label: string | null, hasExplicit: boolean }} ref
 */
function mergeLabel(labelMap, ref) {
  if (!ref) return;
  if (ref.hasExplicit) {
    labelMap.set(ref.id, ref.label || ref.id);
  } else if (!labelMap.has(ref.id)) {
    labelMap.set(ref.id, ref.id);
  }
}

/**
 * @param {string} rhs
 * @returns {ParsedRef[]}
 */
function parseRhsTargets(rhs) {
  return rhs
    .split("&")
    .map((p) => parseNodeRef(p))
    .filter(Boolean);
}

function inferSub(label) {
  const L = label.toLowerCase();
  if (/\bdb\b|database|data db/i.test(label)) return "Database node";
  if (L.includes("api")) return "API node";
  if (L.includes("human")) return "Human node";
  if (L.includes("fetcher")) return "Fetcher node";
  if (L.includes("scorecard") || L.includes("analytics")) return "Analytics node";
  if (L.includes("feedback")) return "AI feedback";
  if (L.includes("instagram") || L.includes("threads") || L.includes("linkedin")) return "Channel node";
  return "AI node";
}

function inferColorHex(label) {
  const L = label.toLowerCase();
  if (/\bdb\b|database|data db|trends|scripts|video data/i.test(label)) return "#9fd356";
  if (L.includes("api") || L.includes("zernio") || L.includes("other data")) return "#ff9600";
  if (L.includes("human") || L.includes("filmed")) return "#b06cff";
  if (L.includes("instagram") || L.includes("threads") || L.includes("linkedin")) return "#9fd356";
  return "#3c91e6";
}

function inferRoute(label) {
  const sub = inferSub(label);
  if (sub === "Database node" || sub === "Data node") return "database-node-popup.html";
  return "agent-node-popup.html";
}

/**
 * Feedback edges in `workflow-map.mermaid` (Filmed → Videos DB, Auto-Feedback → Videos DB).
 * If included in longest-path layering, cycles push node depths to huge values and
 * horizontal spacing (layer × colW) stretches links across the screen.
 */
const LAYERING_SKIP_KEYS = new Set(["n1->scripts", "n10->scripts"]);

function edgeKeyForLayering(e) {
  return `${e.from}->${e.to}`;
}

/**
 * Longest-path layering on a DAG-like view of the workflow (feedback edges omitted).
 * @param {Set<string>} ids
 * @param {{ from: string, to: string }[]} edges
 */
function longestPathDepths(ids, edges) {
  const depth = new Map();
  const layeringEdges = edges.filter((e) => !LAYERING_SKIP_KEYS.has(edgeKeyForLayering(e)));

  for (const id of ids) depth.set(id, 0);

  let changed = true;
  let guard = 0;
  while (changed && guard < ids.size + 2) {
    changed = false;
    guard += 1;
    for (const e of layeringEdges) {
      if (!ids.has(e.from) || !ids.has(e.to)) continue;
      const next = depth.get(e.from) + 1;
      if (next > depth.get(e.to)) {
        depth.set(e.to, next);
        changed = true;
      }
    }
  }

  return depth;
}

/**
 * @param {Map<string, number>} depths
 * @param {Set<string>} ids
 */
function layoutPositions(depths, ids) {
  const byLayer = new Map();
  for (const id of ids) {
    const L = depths.get(id) ?? 0;
    if (!byLayer.has(L)) byLayer.set(L, []);
    byLayer.get(L).push(id);
  }
  const layers = [...byLayer.keys()].sort((a, b) => a - b);
  const colW = 170;
  const rowH = 95;
  const startX = 120;
  const startY = 200;
  const pos = new Map();
  for (const L of layers) {
    const row = byLayer.get(L).sort();
    row.forEach((id, i) => {
      pos.set(id, { x: startX + L * colW, y: startY + i * rowH });
    });
  }
  return pos;
}

/**
 * Parse `flowchart` body: arrow lines and optional `id["label"]` forms.
 * @param {string} mermaidText
 */
function parseFlowchartEdges(mermaidText) {
  const body = stripFrontmatter(mermaidText);
  const lines = body.split(/\r?\n/);
  const labelMap = new Map();
  const edges = [];

  const arrowRe = /^\s*([a-zA-Z0-9_-]+)(?:\["([^"]*)"\])?\s*-->\s*(.+)$/;

  for (const line of lines) {
    const t = line.trim();
    if (!t || t.startsWith("%")) continue;
    if (t.startsWith("flowchart")) continue;
    if (t.includes("@{")) continue;

    const m = t.match(arrowRe);
    if (!m) continue;

    const fromRef = parseNodeRef(`${m[1]}${m[2] !== undefined ? `["${m[2]}"]` : ""}`);
    if (!fromRef) continue;
    mergeLabel(labelMap, fromRef);

    const targets = parseRhsTargets(m[3]);
    for (const toRef of targets) {
      mergeLabel(labelMap, toRef);
      edges.push({ from: fromRef.id, to: toRef.id });
    }
  }

  return { labelMap, edges };
}

/**
 * @param {string} mermaidText
 */
function buildGraphFromMermaid(mermaidText) {
  const { labelMap, edges } = parseFlowchartEdges(mermaidText);
  const ids = new Set(labelMap.keys());
  for (const e of edges) {
    ids.add(e.from);
    ids.add(e.to);
  }

  const depths = longestPathDepths(ids, edges);
  const positions = layoutPositions(depths, ids);

  const nodes = [...ids].map((id) => {
    const label = labelMap.get(id) ?? id;
    const p = positions.get(id) || { x: 200, y: 300 };
    return {
      id,
      label,
      x: p.x,
      y: p.y,
      color: inferColorHex(label),
      sub: inferSub(label),
      route: inferRoute(label),
    };
  });

  const outEdges = edges.map((e, i) => ({
    id: `e${i}`,
    from: e.from,
    to: e.to,
    speed: 1,
  }));

  return { nodes, edges: outEdges };
}

function defaultGraph() {
  const samplePath = path.join(__dirname, "..", "..", "..", "..", "AI Workflow", "workflow-map.mermaid");
  try {
    const text = fs.readFileSync(samplePath, "utf8");
    return buildGraphFromMermaid(text);
  } catch {
    return null;
  }
}

module.exports = {
  buildGraphFromMermaid,
  defaultGraph,
};
