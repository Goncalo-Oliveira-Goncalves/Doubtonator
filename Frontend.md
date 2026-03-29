# Home Tab

[NOTE] We will have to change this to the actual html of the actual thing, right now it's bare bones
```html

<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Screen</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
  }

  .frame {
    position: relative;
    width: min(100vw, calc(100vh * 9 / 16));
    height: min(100vh, calc(100vw * 16 / 9));
    aspect-ratio: 9 / 16;
    background: #fff;
    border: 6px solid #000;
    display: flex;
    flex-direction: column;
  }

  .main-area {
    flex: 1;
    background: #fff;
    position: relative;
  }

  .dashed-line {
    position: absolute;
    top: calc(1 / 16 * 100%);
    left: 0;
    right: 0;
    height: 0;
    display: flex;
    align-items: center;
  }

  .dashed-line::after {
    content: '';
    display: block;
    width: 100%;
    border-top: 6px dashed #000;
  }

  .footer-area {
    height: calc(2 / 16 * 100%);
    background: #fff;
    flex-shrink: 0;
    border-top: 6px solid #000;
  }
</style>
</head>
<body>
  <div class="frame">
    <div class="main-area">
      <div class="dashed-line"></div>
    </div>
    <div class="footer-area"></div>
  </div>
</body>
</html>

```

The "Top Navigation Bar" only shows up in the home tab. The "canvas" is the main thing about the home page. Where they can sort of visualize their AI workflow, that's the main thing on the home tab. The bottom menu shows up on every tab.

## Breaking Down the Canvas

The canvas is essentially defined by me, and clients can visualize it (at least for version 1 of the app) -- it will be a node workflow.

### Breaking Down the Node

The node can have various shapes, a square, a circle, a shield, a star, basically an SVG *{:for how this connects with the backend, refer to the database structure backend.}
However, the node also doesn't look flat, as if seen from a top down perspective, but more as if seen from a 60 degree (opening to the right) angle with the horizontal plane of projection, and making 90 degrees with the frontal plane of projection.
To add depth, we will use PixiJS. And we will specify the SVGs.

Here is an example code with PixiJS for a node for the canvas. Do not take this as the code for the app, even though it's a great start, this alone is not flexible.

```javascript
import { Application, Graphics, Container } from 'pixi.js';

(async () => {
  const app = new Application();
  await app.init({ background: '#f0f0f0', resizeTo: window });
  document.body.appendChild(app.canvas);

  const cx = app.screen.width  / 2;
  const cy = app.screen.height / 2;

  const NODE_SIZE  = 140;
  const THICKNESS  = 14;
  const COLOR_TOP  = 0x1a8fff;
  const COLOR_SIDE = 0x0d5ca8;
  const ICON_SIZE  = 75;
  const ICON_COLOR = "0d5ca8";

  const NODE_VB = 703;
  const NODE_POINTS = [
    [315.283, 7.15532],  [387.227, 7.15532],
    [569.134, 82.5036],  [620.007, 133.376],
    [695.355, 315.283],  [695.355, 387.227],
    [620.007, 569.134],  [569.134, 620.007],
    [387.227, 695.355],  [315.283, 695.355],
    [133.376, 620.007],  [82.5036, 569.134],
    [7.15532, 387.227],  [7.15532, 315.283],
    [82.5036, 133.376],  [133.376, 82.5036],
  ];

  const ICON_VB   = 34.5;
  const ICON_PATH = `M34.5,20.375v-6.25h-4.514c-0.32-1.313-0.838-2.545-1.521-3.669l3.193-3.193l-4.42-4.419l-3.193,3.193
    c-1.125-0.683-2.355-1.2-3.67-1.521V0.001h-6.25v4.515c-1.313,0.321-2.546,0.838-3.671,1.521L7.262,2.844L2.843,7.263l3.193,3.193
    c-0.684,1.125-1.2,2.357-1.521,3.669H0v6.25h4.516c0.32,1.312,0.838,2.545,1.521,3.669l-3.193,3.191l4.419,4.421l3.192-3.193
    c1.125,0.685,2.357,1.2,3.671,1.521v4.516h6.25v-4.516c1.313-0.32,2.545-0.838,3.67-1.521l3.192,3.193l4.421-4.421l-3.193-3.191
    c0.685-1.125,1.199-2.355,1.521-3.669H34.5z M17.25,23.5c-3.451,0-6.25-2.798-6.25-6.25S13.799,11,17.25,11s6.25,2.798,6.25,6.25
    S20.701,23.5,17.25,23.5z`;

  // ── Center points around (0,0) using the actual bounding box ─────────
  const rawXs = NODE_POINTS.map(([x]) => x);
  const rawYs = NODE_POINTS.map(([, y]) => y);
  const rawMinX = Math.min(...rawXs);
  const rawMaxX = Math.max(...rawXs);
  const rawMinY = Math.min(...rawYs);
  const rawMaxY = Math.max(...rawYs);
  const rawW = rawMaxX - rawMinX;
  const rawH = rawMaxY - rawMinY;
  const rawCX = rawMinX + rawW / 2;
  const rawCY = rawMinY + rawH / 2;

  // Scale so the largest dimension = NODE_SIZE
  const nodeScale = NODE_SIZE / Math.max(rawW, rawH);

  // Points are now centered on (0,0) in local space
  const pts = NODE_POINTS.map(([x, y]) => ({
    x: (x - rawCX) * nodeScale,
    y: (y - rawCY) * nodeScale,
  }));

  // ── Draw node ─────────────────────────────────────────────────────────
  const node = new Graphics();

  const n = pts.length;
  for (let i = 0; i < n; i++) {
    const a = pts[i];
    const b = pts[(i + 1) % n];
    if ((a.y + b.y) / 2 < 0) continue;
    node.poly([
      a.x, a.y,
      b.x, b.y,
      b.x, b.y + THICKNESS,
      a.x, a.y + THICKNESS,
    ]).fill({ color: COLOR_SIDE });
  }
  node.poly(pts.flatMap(p => [p.x, p.y])).fill({ color: COLOR_TOP });

  // ── Draw icon centered on (0,0) ───────────────────────────────────────
  const iconScale = ICON_SIZE / ICON_VB;

  const icon = new Graphics();
  icon.svg(`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${ICON_VB} ${ICON_VB}">
    <path d="${ICON_PATH}" fill="#${ICON_COLOR}"/>
  </svg>`);
  icon.scale.set(iconScale);

  // Icon origin is top-left, so shift by half its size to center on (0,0)
  icon.x = -ICON_SIZE / 2;
  icon.y = -ICON_SIZE / 2;

  // ── Compose ───────────────────────────────────────────────────────────
  const tile = new Container();
  tile.addChild(node);
  tile.addChild(icon);

  // Single placement — everything is already centered on (0,0)
  tile.x = cx;
  tile.y = cy;

  app.stage.addChild(tile);
})();
```

Here is also detailed how we add depth and do the perspective thing. The colors are also wrong, pay no mind to it... Inside the node there is an SVG. Too.

Upon clicking the node, a little popup shows up *{:and to be clear, the example I will give right now, like all the other examples before are purely for inspiration, they must be considered upon the brand voice we are going for. Along with palletes you chose, fonts, etc...}

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Popup</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #c8c8c8;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  .wrapper {
    position: relative;
    display: inline-block;
    margin-top: 20px;
  }

  .caret-outer {
    position: absolute;
    top: -15px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 13px solid transparent;
    border-right: 13px solid transparent;
    border-bottom: 13px solid #bebebe;
    z-index: 1;
  }

  .caret-inner {
    position: absolute;
    top: -12px;
    left: 50%;
    transform: translateX(-50%);
    width: 0;
    height: 0;
    border-left: 11px solid transparent;
    border-right: 11px solid transparent;
    border-bottom: 13px solid #efefef;
    z-index: 3;
  }

  /* Covers the border line where caret meets the box */
  .caret-cover {
    position: absolute;
    top: 0px;
    left: 50%;
    transform: translateX(-50%);
    width: 20px;
    height: 4px;
    background: #efefef;
    z-index: 4;
  }

  .popup {
    background: #efefef;
    border-radius: 16px;
    padding: 18px 18px 14px;
    width: 260px;
    box-shadow: 0 2px 12px rgba(0,0,0,0.15);
    border: 2.5px solid #bebebe;
    position: relative;
    z-index: 2;
  }

  .title {
    font-size: 14px;
    font-weight: 700;
    color: #888;
    margin-bottom: 6px;
  }

  .subtitle {
    font-size: 13px;
    color: #aaa;
    font-weight: 400;
    margin-bottom: 16px;
    line-height: 1.4;
  }

  .button {
    background: #e0e0e0;
    border-radius: 10px;
    padding: 11px 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
  }

  .button-label {
    font-size: 12px;
    color: #aaa;
    font-weight: 700;
    letter-spacing: 0.1em;
  }
</style>
</head>
<body>
  <div class="wrapper">
    <div class="caret-outer"></div>
    <div class="caret-inner"></div>
    <div class="caret-cover"></div>
    <div class="popup">
      <div class="title">Name common animals</div>
      <div class="subtitle">Complete all levels above to unlock this!</div>
      <div class="button">
        <div class="button-label">LOCKED</div>
      </div>
    </div>
  </div>
</body>
</html>
```

Also, when you click the button, the node goes a bit down, I didn't code that functionality in, by the way, there is NO animation, on or off, one state to the next. I like that stylized look.

```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Button States</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
    gap: 0;
  }

  .panel {
    background: #f5d9a8;
    width: 50vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 32px;
    border: 4px solid #000;
  }

  .label {
    font-size: clamp(18px, 2.5vw, 32px);
    font-weight: 900;
    color: #000;
    letter-spacing: 0.01em;
  }

  /* NOT PRESSED: white face + black bottom shadow */
  .btn-not-pressed {
    position: relative;
    width: clamp(160px, 25vw, 320px);
    height: clamp(110px, 17vw, 220px);
    cursor: pointer;
    user-select: none;
  }

  .btn-not-pressed .face {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 14px;
    background: #fff;
  }

  .btn-not-pressed .shadow {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 14px;
    background: #000;
  }

  /* PRESSED: white face shifted down, no shadow */
  .btn-pressed {
    position: relative;
    width: clamp(160px, 25vw, 320px);
    height: clamp(110px, 17vw, 220px);
    cursor: pointer;
    user-select: none;
  }

  .btn-pressed .face {
    position: absolute;
    top: 14px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
  }
</style>
</head>
<body>

  <div class="panel">
    <div class="label">NOT PRESSED</div>
    <div class="btn-not-pressed">
      <div class="face"></div>
      <div class="shadow"></div>
    </div>
  </div>

  <div class="panel">
    <div class="label">PRESSED DOWN</div>
    <div class="btn-pressed">
      <div class="face"></div>
    </div>
  </div>

</body>
</html>
```

And now... lets talk a bit more about this popup. There will be some kind of calculation to see where the popup can pop without being cut off. And then, for calculating the arrow... 2 perpendicular lines, 1 vertical, and 1 horizontal will pass by the center point of the node, on one of the lines, there will be 2 points of intersection between the popup & one of the lines, the point closest to the button is the one where the arrow is placed, and the angle of the vector done from that point to the center of the node will define the direction of the arrow.
On the opopup, there will be a button. Depending on what kind of node it is, it does diferent things.


There are 2 kinds of nodes: (in this canvas)
    An agent Node
    A database Node

#### Agent Node

If it's an agent node, the button will view the activity of that agent in a little timeline, and the agents evolution over time _(I call this the agent node popup window, which I'll detail in a second)_.

#### Database Node

If it's a database node, depending on the kinds of database, like notion, it might be a calendar, a table, a timeline, or something else, but for now, those are the 3 kinds of databases we allow. (I call this database node popup window, will also detail in a second)

Let's now go back to heading 3, where we break down the nodes.

Those nodes are placed on a grid. When the user sees the workflow, the camera's center starts on cordinates (0,0).

We define on the nodes, what are the inputs (other nodes, can be empty), and what are the outputs (also other nodes, optional) -- by defining the inputs, outputs & cordinates, they are linked automatically.

And by making our agents & databases connect like this, we can make it very easy to scale our AIs because, this should really be how the backend is structured (Again, reference to the "Database Structure Backend.md")

### Breaking Down the Links
For the connection of the nodes, also called "Links" or "Arrows without a tip", it's a bit interesting...

1. When the nodes are transfering data to other nodes we should be able to see it from the node viewer, the links should be black, however when transfering data, it's as if there is a point going through the link and leaving out a glow "inside the link", kinda like something glow-ey through a tube.
2. The links are soft, but not rounded either. (I could show you some examples of give you the formula, Imma give you the formula...)

#### Spline Tangent Formula (how to compute the curve shape)

The spline shape at each end is determined by the **outward tangent** - the unit vector pointing from the node's center through the connection point on its boundary:

> From the node center, trace the horizontal and vertical axis lines. Where they intersect the node border you get the connection point. The vector from center to connection point (pointing outward) is the tangent direction for the spline at that end.

Concretely:
- T = normalize(connectionPoint - nodeCenter)  outward unit tangent
- C0 = P0 + s * T0  (control point at source end)
- C1 = P1 + s * T1  (control point at destination end)
- s = 0.45 x dist(P0, P1)

Because of how cubic bezier tangents work (tangent at P0 = 3*(C0-P0), tangent at P1 = 3*(P1-C1)), this makes the wire depart P0 in the outward direction and arrive at P1 from the inward direction (natural plug-in look, no loops).

For the agent-node detail view (perspective canvas, where one end is a canvas edge instead of another node):
- Node end: C = nodeConnectionPt + s * normalize(nodeConnectionPt - nodeCenter)
- Canvas-edge end: C = canvasEdgePt + s * normalize(nodeConnectionPt - canvasEdgePt)  (chord toward node)

### Extra Notes

Finally... as a styling thing, we will have a grid of dots in the background. The background is white, and the dots will be black with low transparency.

But like a heat map, the closer to nodes, the bigger the opacity. And by the way, even though the shape of the nodes change, their size is the same. It's consistent. Here is a prototype, here there is also a algorithm to generate the arrows automatically, so feel free to copy that, it works with spoline logic to look cool.
```html
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Doubtonator</title>
<style>
  * { margin: 0; padding: 0; box-sizing: border-box; }

  body {
    background: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh;
    overflow: hidden;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
  }

  /* 9:16 mobile frame */
  .frame {
    position: relative;
    width: min(100vw, calc(100vh * 9 / 16));
    height: min(100vh, calc(100vw * 16 / 9));
    aspect-ratio: 9 / 16;
    background: #fff;
    border: 5px solid #000;
    display: flex;
    flex-direction: column;
    overflow: hidden;
  }

  /* Top nav bar — 1/16 of frame height */
  .nav-top {
    height: calc(1 / 16 * 100%);
    background: #fff;
    flex-shrink: 0;
    border-bottom: 4px dashed #000;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 0 14px;
    z-index: 10;
  }
  .nav-top-title {
    font-size: clamp(9px, 1.5vw, 13px);
    font-weight: 800;
    color: #111;
    letter-spacing: 0.12em;
    text-transform: uppercase;
  }
  .nav-top-dot {
    width: 7px; height: 7px;
    border-radius: 50%;
    background: #111;
  }

  /* Main canvas area */
  .main-area {
    flex: 1;
    position: relative;
    overflow: hidden;
    background: #fff;
  }
  .main-area canvas {
    position: absolute;
    top: 0; left: 0;
    width: 100%; height: 100%;
  }

  /* Bottom nav — 2/16 of frame height */
  .nav-bottom {
    height: calc(2 / 16 * 100%);
    background: #fff;
    flex-shrink: 0;
    border-top: 4px solid #000;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 0 10px;
    z-index: 10;
  }
  .nav-tab {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    opacity: 0.25;
    cursor: pointer;
  }
  .nav-tab.active { opacity: 1; }
  .nav-tab-icon {
    width: clamp(14px, 2.5vw, 20px);
    height: clamp(14px, 2.5vw, 20px);
    background: #111;
    border-radius: 2px;
  }
  .nav-tab-icon.circle { border-radius: 50%; }
  .nav-tab-icon.diamond {
    border-radius: 2px;
    transform: rotate(45deg);
    width: clamp(10px, 1.8vw, 14px);
    height: clamp(10px, 1.8vw, 14px);
  }
  .nav-tab-label {
    font-size: clamp(6px, 1vw, 8px);
    font-weight: 700;
    color: #111;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }

  /* ── Popup ─────────────────────────────────── */
  .popup-wrapper {
    position: absolute;
    z-index: 100;
    display: none;
    pointer-events: none;
  }
  .popup-wrapper.visible {
    display: block;
    pointer-events: all;
  }
  .caret-outer, .caret-inner, .caret-cover {
    position: absolute;
  }
  .popup {
    background: #efefef;
    border-radius: 13px;
    padding: 14px 14px 10px;
    width: 190px;
    border: 2px solid #bebebe;
    position: relative;
    z-index: 2;
    box-shadow: 0 4px 18px rgba(0,0,0,0.10);
  }
  .popup-title {
    font-size: 12px;
    font-weight: 700;
    color: #555;
    margin-bottom: 4px;
  }
  .popup-sub {
    font-size: 11px;
    color: #999;
    margin-bottom: 11px;
    line-height: 1.45;
  }
  .popup-btn {
    background: #e0e0e0;
    border-radius: 8px;
    padding: 8px 12px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    border: none;
    width: 100%;
  }
  .popup-btn span {
    font-size: 9px;
    font-weight: 700;
    color: #aaa;
    letter-spacing: 0.12em;
  }
</style>
</head>
<body>

<div class="frame" id="frame">

  <!-- Top Nav -->
  <div class="nav-top">
    <div class="nav-top-title">My Workflow</div>
    <div class="nav-top-dot"></div>
  </div>

  <!-- Canvas Area -->
  <div class="main-area" id="mainArea">
    <canvas id="main"></canvas>

    <!-- Popup -->
    <div class="popup-wrapper" id="popup">
      <div class="caret-outer" id="caretOuter"></div>
      <div class="caret-inner" id="caretInner"></div>
      <div class="caret-cover" id="caretCover"></div>
      <div class="popup" id="popupBox">
        <div class="popup-title" id="popupTitle"></div>
        <div class="popup-sub" id="popupSub"></div>
        <button class="popup-btn" id="popupBtn"><span id="popupBtnLabel"></span></button>
      </div>
    </div>
  </div>

  <!-- Bottom Nav -->
  <div class="nav-bottom">
    <div class="nav-tab active">
      <div class="nav-tab-icon"></div>
      <div class="nav-tab-label">Home</div>
    </div>
    <div class="nav-tab">
      <div class="nav-tab-icon circle"></div>
      <div class="nav-tab-label">Activity</div>
    </div>
    <div class="nav-tab">
      <div class="nav-tab-icon diamond"></div>
      <div class="nav-tab-label">Settings</div>
    </div>
  </div>

</div>

<script>
const canvas   = document.getElementById('main');
const ctx      = canvas.getContext('2d');
const mainArea = document.getElementById('mainArea');
let W, H;

// ── Camera (world→screen: screenPos = worldPos + camera) ─────────────────────
const camera = { x: 0, y: 0 };

// ── Drag state ────────────────────────────────────────────────────────────────
let isDragging  = false;
let dragStart   = { x: 0, y: 0 };
let cameraStart = { x: 0, y: 0 };
let dragDist    = 0;   // distinguishes pan from click

// ── Mouse in screen space ─────────────────────────────────────────────────────
const mouse = { x: -9999, y: -9999 };

// ── Bubble time counter ───────────────────────────────────────────────────────
let time = 0;

function resize() {
  const r = mainArea.getBoundingClientRect();
  W = canvas.width  = r.width;
  H = canvas.height = r.height;
  // Re-centre camera so world (0,0) is at screen centre
  camera.x = W / 2;
  camera.y = H / 2;
}

// ── Input: mouse tracking + drag ─────────────────────────────────────────────
mainArea.addEventListener('mousedown', e => {
  const r = mainArea.getBoundingClientRect();
  dragStart   = { x: e.clientX - r.left, y: e.clientY - r.top };
  cameraStart = { x: camera.x, y: camera.y };
  isDragging  = true;
  dragDist    = 0;
  canvas.style.cursor = 'grabbing';

  // Visual press: push node down immediately on mousedown
  const wx = dragStart.x - camera.x;
  const wy = dragStart.y - camera.y;
  for (const node of nodes) {
    node.pressed = Math.hypot(wx - node.x, wy - node.y) < NODE_SIZE / 2 + 5;
  }
});

mainArea.addEventListener('mousemove', e => {
  const r  = mainArea.getBoundingClientRect();
  mouse.x  = e.clientX - r.left;
  mouse.y  = e.clientY - r.top;

  if (isDragging) {
    const dx = mouse.x - dragStart.x;
    const dy = mouse.y - dragStart.y;
    dragDist   = Math.hypot(dx, dy);
    camera.x   = cameraStart.x + dx;
    camera.y   = cameraStart.y + dy;
    if (activeNode) hidePopup();   // close popup while panning
    return;
  }

  // Hover cursor: pointer over nodes, grab otherwise
  const wx = mouse.x - camera.x, wy = mouse.y - camera.y;
  const overNode = nodes.some(n => Math.hypot(wx - n.x, wy - n.y) < n.size / 2 + 5);
  canvas.style.cursor = overNode ? 'pointer' : 'grab';
});

mainArea.addEventListener('mouseup', e => {
  isDragging = false;

  // Handle tap/click interaction here (before releasing press)
  if (dragDist <= 5) {
    const r  = mainArea.getBoundingClientRect();
    const sx = e.clientX - r.left;
    const sy = e.clientY - r.top;
    const wx = sx - camera.x;
    const wy = sy - camera.y;

    if (activeNode) {
      hidePopup();
    } else {
      for (const node of nodes) {
        if (Math.hypot(wx - node.x, wy - node.y) < NODE_SIZE / 2 + 5) {
          showPopup(node);
          break;
        }
      }
    }
  }

  // Delay the visual release so the pressed state is visible for at least a few frames
  setTimeout(() => {
    for (const node of nodes) node.pressed = false;
  }, 60);
});
mainArea.addEventListener('mouseleave', () => { mouse.x = -9999; mouse.y = -9999; isDragging = false; });

// ── Node polygon shape ────────────────────────────────────────────────────────
const NODE_POINTS_RAW = [
  [315.283,7.155],[387.227,7.155],[569.134,82.504],[620.007,133.376],
  [695.355,315.283],[695.355,387.227],[620.007,569.134],[569.134,620.007],
  [387.227,695.355],[315.283,695.355],[133.376,620.007],[82.504,569.134],
  [7.155,387.227],[7.155,315.283],[82.504,133.376],[133.376,82.504],
];

function buildPts(size) {
  const xs = NODE_POINTS_RAW.map(p => p[0]);
  const ys = NODE_POINTS_RAW.map(p => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  const scale = size / Math.max(maxX - minX, maxY - minY);
  return NODE_POINTS_RAW.map(([x, y]) => ({ x: (x - cx) * scale, y: (y - cy) * scale }));
}

// ── SVG icon paths ────────────────────────────────────────────────────────────
const ICON_PATHS = {
  agent: {
    vb: 34.5,
    d: `M34.5,20.375v-6.25h-4.514c-0.32-1.313-0.838-2.545-1.521-3.669l3.193-3.193
        l-4.42-4.419l-3.193,3.193c-1.125-0.683-2.355-1.2-3.67-1.521V0.001h-6.25v4.515
        c-1.313,0.321-2.546,0.838-3.671,1.521L7.262,2.844L2.843,7.263l3.193,3.193
        c-0.684,1.125-1.2,2.357-1.521,3.669H0v6.25h4.516c0.32,1.312,0.838,2.545,1.521,3.669
        l-3.193,3.191l4.419,4.421l3.192-3.193c1.125,0.685,2.357,1.2,3.671,1.521v4.516h6.25
        v-4.516c1.313-0.32,2.545-0.838,3.67-1.521l3.192,3.193l4.421-4.421l-3.193-3.191
        c0.685-1.125,1.199-2.355,1.521-3.669H34.5z M17.25,23.5c-3.451,0-6.25-2.798-6.25-6.25
        S13.799,11,17.25,11s6.25,2.798,6.25,6.25S20.701,23.5,17.25,23.5z`
  },
  database: {
    vb: 100,
    d: `M50,5 C25,5 10,13 10,22 L10,78 C10,87 25,95 50,95
        C75,95 90,87 90,78 L90,22 C90,13 75,5 50,5 Z
        M50,35 C28,35 12,28 12,22 C12,16 28,9 50,9
        C72,9 88,16 88,22 C88,28 72,35 50,35 Z
        M12,35 C20,40 34,43 50,43 C66,43 80,40 88,35 L88,50
        C80,55 66,58 50,58 C34,58 20,55 12,50 Z
        M12,53 C20,58 34,61 50,61 C66,61 80,58 88,53 L88,68
        C80,73 66,76 50,76 C34,76 20,73 12,68 Z`
  }
};

const ICON_PATH2D = {};
for (const [key, val] of Object.entries(ICON_PATHS)) {
  ICON_PATH2D[key] = new Path2D(val.d);
}

function drawNodeIcon(type, size) {
  const icon  = ICON_PATHS[type]  || ICON_PATHS.agent;
  const p2d   = ICON_PATH2D[type] || ICON_PATH2D.agent;
  const scale = size / icon.vb;
  ctx.save();
  ctx.translate(-size / 2, -size / 2);
  ctx.scale(scale, scale);
  ctx.fillStyle = 'rgba(255,255,255,1)';
  ctx.fill(p2d);
  ctx.restore();
}

// ── Draw node (all same size) ─────────────────────────────────────────────────
const NODE_SIZE = 62;   // consistent across all nodes

function drawNode(nx, ny, colorTop, colorSide, pressed, type) {
  const size      = NODE_SIZE;
  const thickness = size * 0.10;
  const pts       = buildPts(size);
  const oy        = pressed ? thickness : 0;   // instant press, no animation

  ctx.save();
  ctx.translate(nx, ny + oy);

  if (!pressed) {
    const n = pts.length;
    for (let i = 0; i < n; i++) {
      const a = pts[i], b = pts[(i + 1) % n];
      if ((a.y + b.y) / 2 < 0) continue;
      ctx.beginPath();
      ctx.moveTo(a.x, a.y); ctx.lineTo(b.x, b.y);
      ctx.lineTo(b.x, b.y + thickness); ctx.lineTo(a.x, a.y + thickness);
      ctx.closePath();
      ctx.fillStyle = colorSide;
      ctx.fill();
    }
  }

  ctx.beginPath();
  pts.forEach((p, i) => i === 0 ? ctx.moveTo(p.x, p.y) : ctx.lineTo(p.x, p.y));
  ctx.closePath();
  ctx.fillStyle = colorTop;
  ctx.fill();

  ctx.globalAlpha = 0.30;
  drawNodeIcon(type, size * 0.38);
  ctx.globalAlpha = 1;

  ctx.restore();
}

// ── Nodes (world-space positions, all same size) ──────────────────────────────
const nodes = [
  { id:0, type:'agent',    label:'Orchestrator', colorTop:'#202020', colorSide:'#0a0a0a', pressed:false, x:0,    y:-105 },
  { id:1, type:'agent',    label:'Researcher',   colorTop:'#1a3a5c', colorSide:'#0d1f33', pressed:false, x:-155, y:35   },
  { id:2, type:'database', label:'Notion DB',    colorTop:'#1a3a2a', colorSide:'#0d2015', pressed:false, x:155,  y:15   },
  { id:3, type:'agent',    label:'Writer',       colorTop:'#3a1a1a', colorSide:'#200d0d', pressed:false, x:0,    y:170  },
];

function layoutNodes() {
  // Positions are already world-space; nothing to recompute on resize
}

// ── Links — cubic hermite spline via polygon boundary ─────────────────────────
const links  = [{ from:0, to:1 }, { from:0, to:2 }, { from:1, to:3 }, { from:2, to:3 }];
const pulses = links.map(l => ({ ...l, t: Math.random() }));

// Unit-scale polygon (fits inside ±0.5), computed once
const POLY_PTS_UNIT = (() => {
  const xs = NODE_POINTS_RAW.map(p => p[0]);
  const ys = NODE_POINTS_RAW.map(p => p[1]);
  const minX = Math.min(...xs), maxX = Math.max(...xs);
  const minY = Math.min(...ys), maxY = Math.max(...ys);
  const cx = (minX + maxX) / 2, cy = (minY + maxY) / 2;
  const sc = 1 / Math.max(maxX - minX, maxY - minY);
  return NODE_POINTS_RAW.map(([x, y]) => ({ x: (x - cx) * sc, y: (y - cy) * sc }));
})();

// Ray-cast from (0,0) in direction `angle` against the unit polygon → boundary point
function polyBoundaryPt(angle) {
  const cos = Math.cos(angle), sin = Math.sin(angle);
  let bestT = Infinity;
  const n = POLY_PTS_UNIT.length;
  for (let i = 0; i < n; i++) {
    const a = POLY_PTS_UNIT[i], b = POLY_PTS_UNIT[(i + 1) % n];
    const ex = b.x - a.x, ey = b.y - a.y;
    const denom = cos * ey - sin * ex;
    if (Math.abs(denom) < 1e-9) continue;
    const t = (a.x * ey - a.y * ex) / denom;
    const s = (a.x * sin - a.y * cos) / denom;
    if (t > 1e-9 && s >= -1e-9 && s <= 1 + 1e-9 && t < bestT) bestT = t;
  }
  return { x: bestT * cos, y: bestT * sin };
}

// World-space connection point on nodeA's boundary, exiting toward nodeB.
// The exit tangent is the cardinal axis vector (H or V) closest to the A→B direction.
function connectionEndpoint(nodeA, nodeB) {
  const dx = nodeB.x - nodeA.x, dy = nodeB.y - nodeA.y;
  const angle = Math.abs(dx) >= Math.abs(dy)
    ? (dx >= 0 ? 0 : Math.PI)
    : (dy >= 0 ? Math.PI / 2 : -Math.PI / 2);
  const local = polyBoundaryPt(angle);
  return {
    x:  nodeA.x + local.x * NODE_SIZE,
    y:  nodeA.y + local.y * NODE_SIZE,
    tx: Math.cos(angle),   // outgoing tangent (unit vector)
    ty: Math.sin(angle),
  };
}

// Cubic bezier geometry for one link.
// Strength = 0.45 × distance between the two boundary points.
// Control points: C0 = P0 + s·T0,  C1 = P1 + s·T1
// (T1 is the outgoing tangent from the destination node, which equals the
//  incoming direction at P1 when negated — the bezier end-tangent is P1−C1.)
function linkGeometry(link) {
  const ep0 = connectionEndpoint(nodes[link.from], nodes[link.to]);
  const ep1 = connectionEndpoint(nodes[link.to],   nodes[link.from]);
  const dist = Math.hypot(ep1.x - ep0.x, ep1.y - ep0.y);
  const s = 0.45 * dist;
  return {
    p0: ep0,
    c0: { x: ep0.x + ep0.tx * s, y: ep0.y + ep0.ty * s },
    c1: { x: ep1.x + ep1.tx * s, y: ep1.y + ep1.ty * s },
    p1: ep1,
  };
}

function cubicPt(t, g) {
  const u = 1 - t;
  return {
    x: u*u*u*g.p0.x + 3*u*u*t*g.c0.x + 3*u*t*t*g.c1.x + t*t*t*g.p1.x,
    y: u*u*u*g.p0.y + 3*u*u*t*g.c0.y + 3*u*t*t*g.c1.y + t*t*t*g.p1.y,
  };
}

function drawLinks() {
  ctx.lineWidth   = 2.5;
  ctx.lineCap     = 'round';
  ctx.strokeStyle = '#1a1a1a';
  for (const l of links) {
    const g = linkGeometry(l);
    ctx.beginPath();
    ctx.moveTo(g.p0.x, g.p0.y);
    ctx.bezierCurveTo(g.c0.x, g.c0.y, g.c1.x, g.c1.y, g.p1.x, g.p1.y);
    ctx.stroke();
  }
}

// Glow as layered strokes along the path segment — light inside a tube
function drawPulses() {
  const SPREAD = 0.07;
  const STEPS  = 14;

  // Outer diffuse layers (no shadow blur — just soft wide strokes)
  const softLayers = [
    { w: 18, alpha: 0.05 },
    { w: 11, alpha: 0.10 },
    { w:  6, alpha: 0.22 },
  ];
  // Inner bright layers — these get shadow blur for the actual glow halo
  const brightLayers = [
    { w: 3,   alpha: 0.60, blur: 8  },
    { w: 1.4, alpha: 0.95, blur: 14 },
  ];

  for (const p of pulses) {
    p.t = (p.t + 0.0035) % 1;
    const g  = linkGeometry(p);
    const t0 = Math.max(0, p.t - SPREAD);
    const t1 = Math.min(1, p.t + SPREAD);

    const pathPts = [];
    for (let i = 0; i <= STEPS; i++) {
      pathPts.push(cubicPt(t0 + (i / STEPS) * (t1 - t0), g));
    }

    function strokePath() {
      ctx.beginPath();
      pathPts.forEach(({ x, y }, i) => i === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y));
      ctx.stroke();
    }

    ctx.lineCap = 'round';
    ctx.shadowColor = 'rgba(140,210,255,0.9)';

    for (const { w, alpha } of softLayers) {
      ctx.shadowBlur  = 0;
      ctx.strokeStyle = `rgba(190,225,255,${alpha})`;
      ctx.lineWidth   = w;
      strokePath();
    }

    for (const { w, alpha, blur } of brightLayers) {
      ctx.shadowBlur  = blur;
      ctx.strokeStyle = `rgba(210,235,255,${alpha})`;
      ctx.lineWidth   = w;
      strokePath();
    }

    ctx.shadowBlur = 0;   // reset so other drawing isn't affected
  }
}

// ── Dot grid — infinite tiling, heat-map + bubbly breathing ──────────────────
const DOT_SPACING = 22;

function drawDots() {
  // World-mouse for heat calculation (already in translated world context)
  const wmx = mouse.x - camera.x;
  const wmy = mouse.y - camera.y;

  // Visible world range
  const startC = Math.floor((-camera.x)          / DOT_SPACING) - 1;
  const endC   = Math.ceil ((-camera.x + W)       / DOT_SPACING) + 1;
  const startR = Math.floor((-camera.y)          / DOT_SPACING) - 1;
  const endR   = Math.ceil ((-camera.y + H)       / DOT_SPACING) + 1;

  for (let c = startC; c <= endC; c++) {
    for (let r = startR; r <= endR; r++) {
      const dx = c * DOT_SPACING;
      const dy = r * DOT_SPACING;

      // Heat from nodes
      let heat = 0;
      for (const n of nodes) {
        const d = Math.hypot(dx - n.x, dy - n.y);
        heat = Math.max(heat, Math.max(0, 1 - d / (NODE_SIZE * 2.6)));
      }
      // Mouse warmth
      const md = Math.hypot(dx - wmx, dy - wmy);
      if (md < 75) heat = Math.max(heat, (1 - md / 75) * 0.30);

      // Bubble: golden-ratio phase per dot for organic wave pattern
      const phase  = (c * 1.6180339 + r * 2.4142135) * 0.8;
      const bubble = Math.sin(time * 1.4 + phase) * 0.5 + 0.5;   // 0..1

      const alpha  = 0.07 + heat * 0.58 + bubble * 0.04;
      const radius = 1.05 + heat * 0.85 + bubble * 0.40;

      ctx.beginPath();
      ctx.arc(dx, dy, radius, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(0,0,0,${Math.min(1, alpha)})`;
      ctx.fill();
    }
  }
}

// ── Popup ─────────────────────────────────────────────────────────────────────
const popupEl       = document.getElementById('popup');
const popupTitle    = document.getElementById('popupTitle');
const popupSub      = document.getElementById('popupSub');
const popupBtnLabel = document.getElementById('popupBtnLabel');
const caretOuter    = document.getElementById('caretOuter');
const caretInner    = document.getElementById('caretInner');
const caretCover    = document.getElementById('caretCover');
let activeNode = null;

function positionPopup(node) {
  // Convert world position to screen position
  const sx = node.x + camera.x;
  const sy = node.y + camera.y;

  const boxW = 190, boxH = 108, margin = 10, C = 11;
  const placeAbove = sy > H / 2;
  let bx = sx - boxW / 2;
  let by = placeAbove
    ? sy - NODE_SIZE / 2 - boxH - 20
    : sy + NODE_SIZE / 2 + 20;

  bx = Math.max(margin, Math.min(W - boxW - margin, bx));
  by = Math.max(margin, Math.min(H - boxH - margin, by));

  popupEl.style.left = bx + 'px';
  popupEl.style.top  = by + 'px';

  const caretX = Math.max(C + 4, Math.min(boxW - C * 2 - 4, sx - bx - C));

  if (placeAbove) {
    caretOuter.style.cssText = `left:${caretX}px;top:${boxH-1}px;width:0;height:0;border-left:${C}px solid transparent;border-right:${C}px solid transparent;border-top:${C}px solid #bebebe;z-index:1;`;
    caretInner.style.cssText = `left:${caretX+2}px;top:${boxH-3}px;width:0;height:0;border-left:${C-2}px solid transparent;border-right:${C-2}px solid transparent;border-top:${C-1}px solid #efefef;z-index:3;`;
    caretCover.style.cssText = `left:${caretX-2}px;top:${boxH-4}px;width:${C*2+4}px;height:5px;background:#efefef;z-index:4;`;
  } else {
    caretOuter.style.cssText = `left:${caretX}px;top:${-C-1}px;width:0;height:0;border-left:${C}px solid transparent;border-right:${C}px solid transparent;border-bottom:${C}px solid #bebebe;z-index:1;`;
    caretInner.style.cssText = `left:${caretX+2}px;top:${-C+1}px;width:0;height:0;border-left:${C-2}px solid transparent;border-right:${C-2}px solid transparent;border-bottom:${C-1}px solid #efefef;z-index:3;`;
    caretCover.style.cssText = `left:${caretX-2}px;top:${C-2}px;width:${C*2+4}px;height:5px;background:#efefef;z-index:4;`;
  }
}

function showPopup(node) {
  activeNode = node;
  popupTitle.textContent = node.label;
  if (node.type === 'agent') {
    popupSub.textContent      = "View this agent's activity and evolution over time.";
    popupBtnLabel.textContent = 'VIEW ACTIVITY';
  } else {
    popupSub.textContent      = 'Browse this database connection and its records.';
    popupBtnLabel.textContent = 'OPEN DATABASE';
  }
  positionPopup(node);
  popupEl.classList.add('visible');
}

function hidePopup() {
  popupEl.classList.remove('visible');
  activeNode = null;
}


// ── Render loop ───────────────────────────────────────────────────────────────
function loop() {
  time += 0.016;
  ctx.clearRect(0, 0, W, H);

  ctx.save();
  ctx.translate(camera.x, camera.y);   // world-space transform

  drawDots();
  drawLinks();
  drawPulses();
  for (const node of nodes) {
    drawNode(node.x, node.y, node.colorTop, node.colorSide, node.pressed, node.type);
  }

  ctx.restore();
  requestAnimationFrame(loop);
}

// ── Init ──────────────────────────────────────────────────────────────────────
window.addEventListener('resize', resize);
canvas.style.cursor = 'grab';
requestAnimationFrame(() => { resize(); loop(); });
</script>
</body>
</html>
```

### Agent Node Popup Window
Alright. Firstly, on the top left corner, there is an "x", clicking on it brings you back to the canvas.
Then, lets talk about "the node visualizer". We will put the node on the center top of screen. However this time, the camera is at about 30 degrees with the horizontal plane of projection, 90 degrees with the frontal. And it's in perspective view.
Really, what we see is the node sitting on the canvas. 
Throughout the node, from the top of screen to node, there are the links, and those are input links, and by clicking them, just like the nodes, a popup will appear detailing what's the node it comes from & recent data transfers, you can also see, in real time, data flowing through it.
Then, from the node, on the bottom of it, you see some wires coming out and spreading out. (the outputs)
After the node, we have the name of the node, like a heading.
After the heading, there is a little menu. With 2 options: Timeline, Evolution.
First, lets talk about the timeline view & how it works...
The timeline view is a sort of feed of recent activities (please reference to the Database Structure Backend.md for the structure) an agent can have subagents, so on many of the cards on the feed, there will be progress bars. Then thre is a start and end time. Then there is the title of the task & ID of what it does. Then there is description & performed activities.
The evolution tab will be a graph of the git branching of the AIs, the version which I have selected will be highlighted

Here's a preview
```hmtl

```

### Database Node Popup Windows
Database node popup windows have a similar layout to the agent node popup windows... For their differences: Firstly, unlike agents.. here, there is only one data source, one table, that can be represented in different ways:
- Table (basic)
- Feed / Timeline (depends on data)
- Calendar

You can, on the backend, chose which views they can see from. If they have only access to 1 view, we don't show the tabs, nor title.

Let's quickly cover, besides the data, what other components are and then we'll go back to detailing each of the views.

Just like in the agent node popup window, there is a "x" on the top left corner, clicking it takes you back to the canvas.
Besides that, on the center top of the screen, there will be the node, with the functionality we talked about, bellow that, there is the heading, and then there is the database.

Now let's cover the views... the first view is a table. Has columns, and also horizontal scrolling if columns don't fit the screen. 

The second view is the feed / timeline. Which is similar to the timeline detailed on the agent node popup window. If not equal. Because you see, a timeline is just a feed sorted by end and start date... it can also have tags and things like that...

The third view and final view is the calendar view, which is very simple, firstly, it has a top nav, on the center you have a text indicating the year, example: "March 2026", on the right and left, you have right and left arrows, respectivelly, to go forward or backward a month on the calendar.
Then after that, we have a grid, which cells happen to have a 1:1 ratio, with 7 columns for the the days of the week. The first row of the grid is the days of the week, being as follows: (S | M | T | W | T | F | S). After that, the next rows will be weeks with elements being the days, by order.
The day it is today is highlighted on the calendar. Then, there are different kinds of highlights for days where something is scheduled, you can change the highlight color and shape via an svg. (please reference to the "Database Structure Backend.md" for more information)

Here's a preview (prototype as an example)
```html

```

## Navbar of The Home Tab

With the canvas now covered, lets go over the navbar of the home page. As said, this navbar is a part of the home & is only present on it. This navbar has a few interactive features, first, the settings gear, on the leftmost, it will open _the settings page_.

Then, second element is the streak, this element is very important, it guarantees gamification, there are a few things to take note, first, the icon, if the streak is none, either because they lost it or they are new... then it will be a grey svg of a fire. Then, if they do have a streak, we will give them 5 variations. Yellow, Yellow-Orange, Orange, Orange-Blue, Blue (please reference to the "Database Structure Backend.md" for more information)

If they keep the streak for long enough, fire will evolve in the ways states previously...

Being: 
- Yellow (adchieved 1st week)
- Yellow-Orange (adchieved 1st month)
- Orange (adchieved 3rd month)
- Orange-Blue (adchieved 7th month)
- Blue (adchieved 1 year)

Upon reaching these milestones, not only will they be rewarded with sparks, which we'll get to in a second, but upon opening the app there will a _comemorative popup window_.

Besides the icon, to the right of it, there will be a streak counter in days (even though the streak is counted every week)

And upon clicking the streak, the _streak status popup window_ will appear.

After that, to the right of the streak, the third element, is sparks. Sparks are like points... How do you get points? Via *adchivements*, which can be found on _your profile_ or via *quests*, found in the _quests tab_.

The icon will have the image of some sparkles... Please reference to the assets folder present in the directory for such matters. Contrary to streaks, doesn't change, and upon clicking the sparks, you get to the _rewards store_, which we'll get to in a bit.

On the right of the icon, we have a counter with the number of gems you have.

And that's it, oh sorry, did I say there were 4 elements? Well, it was meant for the forth element to be my logo, but it serves no pourpose.

Here's a preview of a prototype detailing just that:
```html

```

One more thing, the transition from navbar to canvas is soft, there is no hard seperating line between menue & canvas.

### The Settings Page

Now, lets break down the settings page. In the top left corner, like most popup windows, there is an "x".

Then centered, there is a menu. In this menu there is 1 toggle for a white or dark mode. And 2 submenus "API Keys" & "Account Info". On the "API key submenu" there is a list with the name of the tool, and the api key, and on the account info menu, at the top... there is a button to link the instagram account, highlighted from everything, and then, as a list, there is the phone, email and name.

Preview of the Setting Page:
```html

```

### Comemorative Popup Window

This window has the important job of comemorating the user for reaching a certain streak. First, the color of the comemoration background depends on the color of the fire on the streak.

Then, the screen is divided in two sections... the first is one saying "[STREAK NUMBER] day streak!"; on this one, there will be 3 elements:
- An animation of a clapper board on fire (color of streak)
- A counter with the streak, relatively big text,
- A text saying "day streak!"

In a top to down style flexbox.

Then the next section is 2 buttons, one, "SHARE" highlighted, where you share your adchievement.
And then one "GO TO APP"

That explains this window. It opens right after you get the streak (which you increase by completing quests.)
```html

```

### Streak Status Popup Window

Upon clicking the streak on the home tab's top navbar, the streak status popup window appears...

Like all the popup windows... there is a "x" on the top left corner.

On the center top, there is a text "Streak"; Then this window is broken down into 2 sections:
  Section 1:
    This section has 2 sub-sections:
      Sub-Section 1:
        The first sub-section is status. With 2 objects, being the leftmost one text, giving your streak (e.g: "X day streak.")
        And the one on the right of that one, an animation of the streak fire (with the right color), it's a looping animation.
      Sub-Section 2:
        This subsection has 2 objections and it's a callout, notion style
        Object 1: Heading of the callout data "Your Streak Position:"
        Object 2: A statistic that shows their place in the streaks. (you have a bigger streak then 59% of users)
  Section 2:
    In here there is simply a calendar.
    Similar to the calendar before described on the _database node popup window_, however with 1 extra feature. We can see on each week the streak, and to be clear, each week will not be colored or something like that... starting with the beggining of the month, there is a fully rounded container, and it expands throught the weeks down to the end of the month, like such:
    
    ```html (steal calendar thing from duolingo and ask AI to do some variations with steaks)

    ```

    Upon completing a full month, instead of semi noticeble, semi transparent color of the fire, the container's is background turns golden, with a nice shine, and the text color of those days, matches the color that it would be on an actual image of gold, essentially carving in the numbers into the golden plate, not that you'd actually do that, but it should give you an idea of the text color I am going for in that container.
```html

```

And that is the "Streak Status Popup Window".

### Rewards Store

Upon clicking on the sparks, in the navbar on home... in takes you to the reward store, here, you can trade sparks by actual real life rewards. I am yet to this figure this out, so for now, it stays as an experimental feature that is disabled by default... anyways:

It is devided into 3 sections: 
1. A counter, which shows your sparks (being on the left a 3d spark floating) and on the right, the actual counter -- on this section, the background is a gradient from top left to bottom right of the section container, from pink to neon pink. The 3d spark (and other sparks) contrast in color. Upon transition from section 1 to 2, the background gradient smoothly goes to the white background of the sections 2 & 3.
2. On section 2, there is a sort of card indicating the recommended product for them to get. Lets break down how this card is constructed, firstly, we have the main image, this is a transparent png of a product, it sticks out a bit of frame to add a more dynamic feel (image is cropped so borders of the image always very close to touching the product, it's the only way to get the effect of sticking out of frame at scale) One important node is that the card's background's colorful. Now after the image, there is one group with the name of the item & some tags, in this case, since it's a recomended card, it has a star tag, only one card can have a star tag, but for other tags, you can put one accross multiple cards. After this group, there is a brief description, if you clicked on the item, it brings you to the _item popup window_. Which shall be detailed in a second.
3. After the second section, the third is the catalog, a big list of types of products available, here's the current list:
  - Audio
  - Cameras
  - Other Goodies
  The styling per catalog will be a div with a colorful background, and an arrow on the center right, pointing to the right, opening the item brings you to the _catalog popup window_

```html

```

#### Catalog Popup Window

This popup shall be very simple to create, since it reutilizes elements from other windows. There are 2 sections; Display & Catalog, the display section is an exact structural copy of the one on the item popup window, instead of a product being shown however, it's an image of choice & the png of a shadow.

The catalog section is literally a list version of that product card presented on teh rewards store, the one on section 2, it's that card repreated, and with different colors, values, and images, this is because they are from the same database. And the interactivity is the same; Upon clicking, takes you to the item popout window. 

```html

```

#### Item Popup Window

The item popout window is broken down into 3 different sections...

The first section is the display, where the product is shown. The background color is vivid.
There is the png of the product, for a dynamtic effect, the text is bellow the png.
Here there is a hard transition from section 1 (colorful background) to section 2, (white background) -- in the hard line, at the center, there will be a png of a shadow, with the idea to bring a bit of depth to the composition.

The second section, as told, has a white background. And it will be a markdown stylized document, where we tell more about the product. 

The third section will be special, it is always found in the bottom of the screen, even when scrollable, a button to purchase.

The button has 2 parts, the text "PURCHASE" and to the rightmost, the ammount of sparks it costs, besides that, there is a like opacity decrease when the content is overlapping with the bounding box for the document. Also blur, both are progressive (top 100% for opacity, 0px for blur) to bottom, (at 0% opacity, 4px blur).

```html

```

# Bottom Navigation

With this, we have completed every page of the home tab... Now... 

Lets quickly go over the bottom navigation bar, which will fill in the details on the other tabs.


Firstly, let's discuss it's components, there are 5... centered, with small margin between each other,
From left to right, the order is:
- Home, Calendar, Clan, Quests, Profile.

The Home, we just went over it...
The Calendar, besides making clear the streak, warns of important events. Don't worry, we'll talk about each tab in more detail once we get to it.
Then Clan is basically where the community comunicates & grows together.
The Quests will be where all tasks the user has to do gather.
And then the profile is where you see adchievements, XP, and stuff like that...

A few of these tabs will have their own top navbars, but for now... that doesn't matter. 

Now, for the icons! The "Home" will have a map icon. A golden map. The calendar, will be a calendar (duh). The Clan will be their *badge*, and don't worry, we'll talk about badges more soon. The quests will be a treasure chest. And the avatar will be a little avatar, like duolingo does it. Please refer to the assets folder for these icons. Except the Badge, which there is 2 folders, simplified, and real. That's because we don't want too many details on a small icon. The simplified will be used when the badge is displayed small. And the real will be used when the badge is displayed on big scale, but we'll more into more details in a bit.

Two more things: On the buttom menu, when on a certin tab, it's bounding box's color is no longer transparent but a bit lighter/darker then the menu's background. On the container that has the tab currently opened, besides the background color change, there will be a think outline on the container, and there will be a bit of roundness to the container too.

Besides that, there is a think top outline on the bottom menu. 


```html

```

# The Calendar Tab

The calendar tab has 2 sections, the calendar & upcoming events. The calendar is similar from teh one we saw in some windows, just some extra features. Besides being able to visualize the streak, you can see future calls and events.

If you tap on a certain day, it opens a _day timeline popup window_. Which I'll break down in just a second.

Then, on the second section, you can see a timeline of upcoming important events. The timeline format will copy from timeline/feed view from the database node popup window.

Now, lets talk about the highlights there can be in a day, a day can be highlighted with an SVG and a color bellow the actual text of that day's number. The most obvious kind of highlight is a call, with a camera as picture. Second is the end of a comunity challenge & day of rewards, when picture is a trophey we'll add more over time, but for now that's it.


```html

```

## Day Timeline Popup Window

This is quite simple...

There are 2 sections, an info section, and a timeline view section.

The info section has 2 elements, the day of the month in number, with a big font inside a circle.
And to the right, a group. On that group, there is a heading, saying the month on the top.
And on the bottom, another group. With, in 3 letter, the day of the week, followered by a divider on the right of it, and the year.

Section 2 is basically a timeline view which has a filter for the events on that day.


```html

```

# The Clan Tab

Next, lets talk about the clan tab; this is the big one. 

## Top Navbar
Firstly, let's break down the top navigation bar on teh clan tab, from left to right:
1. Tournaments
2. Chat
3. Friends

Those are the 3 items. These will not have the same functionality has the top navbar on the home page. Instead, they act more like subtabs. By default, the subtab opened is "chat", which we'll talk about in a bit, but it's basically an in app version of "Skool" or "Discord".

We will detail all of these subtanbs in their own right however! Before that, I want to remind that the goal of hosting the community in our app is for full control of the data.


```html

```

## Subtabs
### Chat

The chat features are quite simple, there are 2 sections.

The tabs, which allow you to pick posts categorized in a certain way, which is editable on the background (e.g: questions, general, sauce, etc.)

They will all be placed in a row, if it doesn't fit, they can do horizontal scroll.

The second section is the actual posts, they'll be placed in a feed view, with the pages (or rows as one might call it) similar to the timeline ones, but on steroids, it allows markdown, pinning posts, headings, linking files, etc.

Upon opening the post, there is a "Post Popup Window". Which we'll talk about next...


```html

```

#### Post Popup Window

The idea of the post popup window is to read it like an article, with the avatar at the end, coments, responses, adding videos & images, motivating towards good responses & big ones for market research.
You can also gift people sparks for their posts or comments.
And people can coment on comments and we can open and close threads, just like a reddit thread.

Detailing how their name shows up at the end... it's very simple: Their profile picture is in a circle and in the left, and then there is a group the right, on that group there is their name (at the top) and a subgroup at the bottom. The sub-group contains the data this was posted and the instagram tag.

People can also like posts & comments.

Then for the comments, this container shows up at the top, everything else is the same.


```html

```

### Tournaments

In the tournaments subtab, we host competitions for who gets the most *XP* (from quests).

And so here, not actually can you view your *rank* in the tournament, but also see this week's leaderboard.

When you haven't completed a quest this week, you can't see the leaderboard, you see a sort of wireframe of it, with the text: "complete a quest to join this week's leaderboard"; And bellow that, there will be a button: "go to quests".
Once you have completed quests, you can see the leaderboard, which place you are in, and how much XP you have collected.

Detailing a bit more, when there are no quests completed, there are 2 sections:
- Status
- Leaderboard

The status is a group of 4 things, organized from top to bottom, as such:
- Badge Display (using the real badge assets)
- Heading Saying the Rank (e.g: Bronze League)
- A description, saying, "Complete a quest to open this week's leaderboard"
- And a button to "GO TO QUESTS"


#### Badge Display
Let's talk a bit more about the badge display:

The badge display's nature's very simple... it's all the badges available, ordered from left to right, least to most rank... and here's the ranks ordered from least to most, this can of course be changed on the background, refer to the "Database Structure Backend.md" for more information:

- Bronze
- Silver
- Gold
- Sapphire
- Ruby
- Emerald
- Amethist
- Pearl
- Obsidian
- Diamond

Bronze competitions are weekly, the next 4 are monthly, the next 5 are quarterly. And there are rewards for the 1st, 2nd and 3rd place, also editable on the backend, please refer to the "Database Structure Backend.md" document for more information:

- Bronze:
  1. 20 Sparks
  2. 10 Sparks
  3. 5 Sparks

- Silver:
  1. 25 Sparks
  2. 15 Sparks
  3. 10 Sparks

- Gold:
  1. 30 Sparks
  2. 20 Sparks
  3. 15 Sparks

- Sapphire:
  1. 35 Sparks
  2. 25 Sparks
  3. 20 Sparks

- Ruby:
  1. 40 Sparks
  2. 30 Sparks
  3. 25 Sparks

- Emerald:
  1. 45 Sparks
  2. 35 Sparks
  3. 30 Sparks

- Amethist:
  1. 50 Sparks
  2. 40 Sparks
  3. 35 Sparks

- Pearl:
  1. 55 Sparks
  2. 45 Sparks
  3. 40 Sparks

- Obsidian:
  1. 60 Sparks
  2. 50 Sparks
  3. 45 Sparks

- Diamond:
  1. 75 Sparks
  2. 60 Sparks
  3. 50 Sparks

However, here's something important: you can only see the leagues you participated in, so if you never passed from silver, you can see bronze to your left, but all the other ones have a grey locket badge (an icon present in the assets, please refer to the assets folder for more information), indicating you don't know what it is until you win.

So the badge display will have the badge you are on, and this badge will be in the center of the container, the badges after and before will follow, by the way, they are 20% smaller in size (so 80% the size) to indicate the league they are on.

They should not be able to scroll horizontally to see the leagues towards the corners... the badges on left and right fade out.


```html

```

#### Leaderboard
Now lets talk about the leaderboard... when you have no quests completed, it shows up as a skeleton of what should be the leaderboard, with 7 users, however, from top to bottom, the opacity of the container goes from 100% to 0%. After that container, we can see you, your rank is null, said as "-", then followed by your avatar and then your name, this group of 3 is found to the leftmost of the container, and then to the rightmost, there is a text saying "XP".

Now to complete the picture of the leaderboard, we must talk about what it looks like when you have completed quests. Firstly, the description on the status section changes to "Top X to advance to the next league" -- when it was before: "Complete a quest to join this TIMEFRAME's leaderboard."
Then, there will show up, bellow the description, instead of the, before, "GO TO QUESTS" button, the time left on the tournament.

Alright, now onto the actual rankings on the leaderboard... this is a list of all users on the tournament, sorted by XP gained when starting the tournament (top -> most XP collected during timeframe, bottom -> least XP collected during timeframe), now this leaderboard is broken down into 3 parts:
- The promotion zone.
- The stall zone.
- The demotion zone.

This is breaking down the list, if the top 4 pass, then, above the 5th place, you can place a text saying "PROMOTION ZONE" in green, with an arrow on the left and right of the text poiting up. 
The opposite also happens, if the bottom 4 go down a league, and there are 17 participants, that means that bellow the 12th person, you'd add a text to separate the zones saying "DEMOTION ZONE", in red, with 2 arrows, one on the left, one on the right, pointing down. The text of "DEMOTION ZONE" or "PROMOTION ZONE" should have the same distance between the 2 zones it is between. For an overall clean asthetic.

For more information on story promotion and demotion zone information, please refer to the database structure backend document.

Now, you're highlighted in accept color, that is, your place as an item on the list, you container, has a background color that will highlight you (and this container will also have rounded corners.)

Now, lets talk a bit more about the container there is for each item of the list or user...

It has 2 groups, one on the leftmost and one of the rightmost (we already talked about this, but I shall repeat it:)

```html

```

The first group has their rank on the left, an 8 for 8th place, a 2 for second place, and 3 for 3rd place... This has a tiny detail however, if 1st, 2nd or 3rd, a badge appear on teh number, a military golden badge for first, a silve for 2nd, and a bronze for thid, please refer to the database structure backend document for more information.

Then we have the avatar, then their name. And that, from left to right, completes the description of the first group.

The second group is the XP container, there will be a counter, followed by the word "XP".

#### Details

Now onto some tiny details, when you finish a tournament, which finishes at midnight of a certain day, US time, when you open the app next day, a _tournament status window popup_ will appear, which we'll about in just a second. When you don't film, and when the league ends, you get demoted to the last rank. Same happens if you end up on the demotion zone.


```html

```

#### Tournament Status Window popup

Now, lets talk a bit about the tournament status window popup, there are a few things:

There are 2 groups - Badge and stats.

The badge has, well the badge at the top, and, the text "You won the X tournament" at the bottom.
The stats has a 2x2 grid, with the same margin between rows & columns, on one cell we have the XP gained, so on the top of the cell we have an icon that represents XP, left, followed on the right by a group with the number of XP gained at the top. And at the bottom of that group the text "XP Earned", in the other cells, the layout is the same. The only thing that change is the icon and the bottom text (the counter also always changes because depends on data, but technically it's the same element, that fetching of data is coded programatically)

Cell 2:
  - "Minutes Recording"
Cell 3:
  - "Words Said"
Cell 4:
  - "Total Videos"

Finally in the top left corner, there's an X to close the popup window. The popup window's background is th color of the badge, or has the badge's gradient if it's a gradient. 


```html

```

#### Last node

The least note I have on the tournaments sub-tab is that on the bottom menu icon for clans, there is a simplified version of their badge, which I already said, just wanted to remind you.


```html

```

### Friends

After the tournaments sub-tab, the only one left is the friends subtab.

The friends tab will be a copy of whatsapp (without friend groups only DMs.)

It will be a list of all their contacts, sorted by who they talked with recently.

So there will be 2 groups per item on this list (container/contact), one at te far left, one at the far right:

The first group has, an avatar, on the left and to the right of that, a subgroup, with their name at the top, in bigger letters, and the recent messages, at the bottom, first 160 characters, adding "..." if there is more.

Group 2 has 2 elements, at the top, the most recent time there was a message in the conversatiojn, at the bottom, a fully rounded container with number of new messages with a vibrant background color, if no messages, the container's invisible.

Upon clicking a chat, it's a normal DM chat bubble conversation.


```html

```

# The Quests Tab

Now that we have finished with the clans tab... lets head over to the second most complex tab of the main tabs, the _quests tab_.

Quests are essentially, but tasks we want the user to do. 

## Quest Types
There are 3 kinds of tasks (right now):

- Aprove Script Batches
- Record Videos
- Give Feedback/Answer Questions (for market research)

Now, lets quickly cover how all of these are gonna work.

### Aprove Script Batches
I think this could work in the same way as tinder. That is, they click to start the task and 7 cards appear for them to approve or disprove.
To approve, they swipe right. To disprove, they swipe left. 

Once you disprove, you are, however, forced to provide fedback on what was messed up and what to say instead. If you click, you can see the full script, and you can scroll (the swipe left or right thing still works)

You can also see a progress bar in the bottom saying how many scripts are left.

Besides that, the cards (scripts) content will be in markdown for easy data transfers.

If you slowly swipe left, you will see an arrow on the left pointing to the left with the text "disaprove" in a red container. (with a little shadow over everything else)
Something similar happens if you swipe right, the color is green, the text says "aprove", the arrow is pointing right and it's the rightmost element on the container.

And that summarizes this quest, upon completing a quest, the _quest rewards popup window appears_.

For this quests, it's pretty simple, per script approved: 2 XP, per 7 scripts done, 14 sparks. They only get the sparks after doing (or if done) the batch. *We'll talk about the leveling system later..*


```html

```

### Record Videos
Now, lets go over the "recording videos" quest. Now... here's a problem:
Making a built in camera feature might to much for now... so instead, they simply upload the video, an AI transcribes it, checks for how good the filming was with some sort of algorithm, aproves or disproves. (all alrithms are backend)

If disproved, We do it again, and the AI will give feedback. If approved, we finish.

Per video we get 30XP and 14 Sparks. 

#### UI
Now let's talk about the UI.

The UI is pretty simple, but before detailning it, I want to highlight the presence of an "x" button to cancel the realization of a task, once clicked, a small, in window, popup, will appear, saying "Are you sure you want to cancel this task?". With the options, "BACK TO TASK" and "GIVE TASK UP"

Alright, now let's break down the actual UI, there are 4 sections,
- Info Section
- Print It Section
- Script Section
- Upload Section

Lets talk about each one of them. 

##### Info Section
The info section is where you provide information about the script, and it has 2 elements. 
The top element is the heading, the title of the script, and the bottom one is a group.
That group contains, in order, the day of the week this script is scheduled to, a dividing line, and the type of video, (being the options TOFU [Top of Funnel], MOFU [Middle of Funnel] and BOFU [Bottom of Funnel]), that in order from left to right.

The background color for this section's vivid, it can be a vivid gradient too.

##### Print It Section
After this, we have the "print it" section - this is where you have a button to print the script, which gives you a pdf or it actually, ACTIVELLY, send it to the printer.

Lets talk about the UI, it pairs well with the last section in a kind of bento box style...

And it has 2 elements, one at the rightmost and one at the leftmost, respetivelly: the text "PRINT SCRIPT", and an arrow pointing right.

The background has a vivid color. 

##### Script Section
The third section is a formated markdown - which will be the script, this section's scrollable.

##### Upload Section
The last section is a video to upload (you can upload multiple videos), it's literally a button saying "UPLOAD RECORDINGS", this button sticks to the bottom of the screen and has some margin with the bottom, it's also centered.
The final thing about this section is that, on the container for the bottom (touching the bottom, left & right of the frame), the opacity of the markdown bellow, at the top of the container's 100%, and at the bottom, 0%, the opposite happens with blur, 0px at the top, 4px at the bottom.


```html

```

### Give Feedback/Answer Questions

Now finisyhed with this quest/task, lets go to the last one... Give Feedback & Answer Questions.

These kinds of tasks really are for no more then market research, lets go over how it works.
First, they must answer honestly & not garbage, an AI will confirm if their answer is just to get sparks, or is actually honest.

We will give the option to talk by voice & make it default to get more elaborate answers. The more elaborate the answer to questions, the more sparks and XP. 

There will be 5 questions maximum per quest with a certain theme. These questions will be pulled up from a datbase. Please refer to the "Datbase Structure Backend.md" for More Information.

#### UI

Now, lets detail the UI, there are 4 sections:

- Progress
- Question
- Text
- Buttons

Besides this, like all the other ones, there is an "x" present in the top left with the same functionality as previously stated for these quests.

##### Progress Section

The progress section is a small progress bar followed by a text (x/y), like (4/5). The progress bar doesn't span the full screen, it's found at the top center of the screen.

##### Questiom

Bellow that, there is a question (the question), stylized as a heading.

##### Text 

Then the next section is text, your answer, it's scrollable, and the text size grows as you type or talk more.

##### Buttons

Then there is buttons. That's the 4th section, always placed at the bottom, it's placed there, if you can scroll, it stays there. And there are 2 buttons... The top button is the Talk button, now, this button has some interesting functionality.

This button has 2 elements, on the leftmost, a "TALK" text, and on the rightmost, an svg with a soundwave. Please refer to the assets folder for this asset.

When you press on it and it is recording, 2 things happen, first, there is a red outline around the button, a think 4px one, and next, thje button's container itself taks the shape of the soundwave being received, adds to the buttons initial shape and smooths it out, here's an example (taken from google's stitch devepment environment):

```html

```

The next button is the answer button, which... "ANSWERS" as said on the text.

Finally, this section has a opacity effect, like the last ones of it's kind, starts at teh bottom of the screen with 0% opacity for the text underneath it, and on teh top of the container, which touches right, left & bottom corners, 100% opacity, blur here is, also 0px, and at the bottom, 4px.


```html

```

## UI

Alright, now that we talked about the windows for the different quests, at least for now, let's talk about the actual quests tab.

### Top Nav

First, the navigation bar of the quests tab: it will have the level followed by a small progress bar to the next level, the streak, and the sparks. Here's the navbar:

```html

```

To talk a bit more about it... the division between it and the other sections is soft, you cannot spot the division between it and the other sections, just like the top navbar on the home page.

The streak and sparks are the same elements from the home tab with the same interactivity and popup windows.

The level and XP progress bar are new. This is one element broken down into 3, We'll talk about the z axis here, because there are things on top of each other. 
The bottom layer is the XP bar. A progress bar saying how close or far away we are from leveling up. Also, the progress bar angle is like, 60 degrees, instead of 90, so the color of the XP is vivid as so. The progress color is neon green, and the bar background's kinda white or something (depends on the palette)

The next layer is a container, the LV container, with fully rounded corners, centered text, with the level on it.

The finaly layer is just the text "LV", child of LV container, with absolute placement to the top left, and a translation of -50% on the X and Y, with a small background so that the lines don't overlap.

Here's the level and XP bar in detail:

```html

```

Now, detailed, lets go back to the elements of the top navbar, there are 3, and these 3, level, streak, and sparks, are distributed, level on the leftmost, streaks on the center, and sparks on the rightmost.

That concludes everything you need to know about the top nav. Now... lets talk about the quest board.

### Quest Board

The quest board is where you can find quests.

The quest board will be ordered by most important tasks (top), and least important (bottom) - there is an algorithm for defining this on the backend. We will go over all the algorithms there...

This is basically a top to bottom list of quests, which is cards (or rows of a database if you're refined enough to bother about such terminology), lets break these cards down...

There are 3 sections these cards have...

- Heading
- Description
- Button

#### Heading
The heading is simply the quest, the ones we have right now is... 
- Record a Video (7 per week, they can record anytime, but we recommend having a weekly hour)
- Aprove Script Batches - which the heading is "Approve Scripts"
- Give Feedback/Answer Questions (for market research) - which the heading is "Help Us Out"

#### Description
Bellow the heading we have a 2 line description. By the way, all of this should be configurable on a database in the backend. I will not provide the description right now.

And then, bellow the description we have a button, which has 2 elements, at the top, a button with the text: "ACCEPT QUEST" or "FILM", the first noe's default, there is a second one, in this care, "FILM", that is configurable in the backend.

Bellow this button, the second element, which is the estimated time time to do a task, placed on the rightmost, this element has a clock icon on the left, followed by the time in minutes (it's a group) 

That concludes the quests tab, except for one thing... what happens when you complete a quest? You get the _quests rewards popup window_.



```html

```

## Quest Rewards Popup Windows

Alright, lets talk about how this popup window is broken down... there are 3 sections:

- Eyebrow
- Reward
- Continue

The eyebrow says something like "your hard work has rewarded you with..."
The reward on the other hand is 3 elements, an animation of a spark, and then, bellow that, a counter, and bellow that, a text saying "Sparks", the counter shows the number of sparks they got from the quest.
And finally, we have a button saying "HURRAY!" in text. I do want to highlight most buttons continue to have that 3d extrusion thing we use in the nodes.

Alright! That should finish everything quest related. I do not believe I missed anything, except maybe the leveling system (which shall be detailed in the backend)



```html

```

# The Avatar Tab

And now, lets talk about the last, but definitely not least, tab, the profile tab.

This tab will give home for a few very important features.

I shall list them out:
- Leveling
- Adchievements
- Journal
- Progress (real life)

The journal is the most important one.

Again, I'll explain the leveling's algorithm on the backend, for now, that's all it is.

The adchivements is literally a compilation of a bunch of conditional statements.

The journal is where the coach takes notes. I'll explain more later...

For now... lets see what shows up when you click on the tab.

## UI

First, lets look at the top navbar, which has a few things...

### Top Navbar

The first icon on the leftmost of the container, a container containing the 3, a container with 75% about of the width of the screen and centered, will be a node tree, the second icon, at the center of the container, will be a sort of card, kinds of like an ID, the third icon on the rightmost of the container will be a book, like a journal. 

Now let's go over the subtabs they represent. (yes, they are subtabs, not same functionality as the home page, but more like the clan.)


The node tree represents your progress in real life, increase in views per week, followers per day, etc... It is basically an evolution analysis dashboard, which we'll go over in a bit.
The card is basically sort of like a passport, it will have their name, their level, their progress towards the next level (an in a progress bar with XP), recordings done, their streak, their sparks, their rank, and their adchievements.
The book is where the journaling feature comes in.


The default subtab's the card. By the way, the top nav has a smooth transition to the content, so it's not visible, tehre's no hard dividing line here. 


```html

```

### The Card Subtab's Content

This subtab has 2 sections: the status & stats section.

The status section is broken down into your profile, picture, a circle in a container that hugs in width and fills the height of the container - and then the profile is placed at the top, it has rounded corners & has your profile picture with an actual image of yourself in it.

The element is a group, containing 3 elements, from top to bottom:
- Their name
- Their level
- Another group

Their name is in heading size, besides that, as a styling thing, after their name, positioned absolutely on the top right corner of the container of the text there there is an icon that was translated by x: +50% and y: -50%, and that icon is their badge. The current badge they're in (obsidian, sapphire, ruby...), this icon's height is about 60% the height of the container, width is calculate automatically keeping the ratio intact.
Then adfter this we have the level progress bar, which is the one we saw on teh quests tab, but the progress bar occupies the full width.
Then we have another group, with 2 elements occupying 50-50 space... from right to left, the streak and sparksm respectively. And that completes the first section. 

The second section's a list. A list of different data.
Let me break down what a list element has, from left to right, an icon, and text. A flexbox with those to elements from left and right.

For example: 
- Icon: A clapper board: 
- Text: "Your time per filming session has reduced by an of 33%, with 45% more results"

This data will be gotten from the "Data Structure Backend.md", but you get the idea... 

```html

```

Now, lets go over to the next subsection with the node tree icon, in this case, what it was supposed to be at least, a git branch.

### Evolution Analysis Dashboard Subtab

Firstly, lets detail the data we want to track, and how we want to present it. I think the best way is via the scheme of the funnel, in the future we could turn this into a core feature of the app, further diving into the game aspect... but not for now.
For now, let me explain how the funnel view will work, and perhaps on version 2 of this app, not only could we include a tab to teach them to makle a funnel, but we could unite the funnel view and canvas into a single view that they can edit, changre and make tests, that could also tap into the AI version thing, and the AIs could provide feedback on the strengths of their money model that was crafted on the app.
From then on, ouir job as developers would be to make it more like a game & give them stuff to sandbox with.
But... that's version 2, which we'll hopefully, work on soon, and don't worry, I'll create a list of possible updates after detailing assets (after the backend)

Anyways, as stated, this will be similar to the canvas on the home tab.
There will be various node types, one of the nodes will be social media. - For example your instagram data, such as posts, average views per week, average leads per week, average followers per week, the increase in any of those metrics... etc.
We'll talk more about what shows up when you click a node once we got to the node specific page.

But, just know, most of the properties from the canvas apply, starting out position, (0,0), having a grid. Allowing the format of nodes to be changes with an SVG, etc...

For now though, the biggest change is that all of thesenodes get their data from trackers, a new category, if we were to compare with agents and databases, this needs az page style for it too, it will get one, _The Tracker Window_, don't worry.

Note: Even though we create template styles for categories of nodes, we allow for personalized modications per node format. For the meaning of this terminology, please reference to the "Database Structure Backend.md" for more information.


```html

```

#### The Tracker Window

To be clear, just like the canvas, when you click on a node, a little popup with an arrow pointing to the node shows up, then there is a button to open this page.
Just like the other ones, there is an "x" on the top left corner.
The first section is "the node visualizer" - also like the last ones.

After that, we have the name of the node, like a heading (as before, it's the same, and now here's where it gets interesting, we are given the flexibility of a 9(width) by infinity grid (grows depending on number of items))

And here we can place "data elements" - which is placed automaticaly using an algorithm present on the backend.
But lets quickly talk about the data elements, because their styling's frontend... and there are 2: Graphs and stats. Their containers are fully flexible. However, for both, 1x1 is not a recommended space. But don't worry, if the full information can't be covered in the grid space given, the user can always click on teh stat to get some more information, in the same way a little popup showws up when we click a node. On all of these, by the way, there will be the same extrusion downwards we did on buttons and nodes.

Now, here's a flexible component that works for any ratio you can apply (we can change it to 1x1, 2x2, 9x6, and it changes automatically to the most asthetically pleasing layout):

```html

```

(make sure it's astetically pleasing till 9x9.)

Now, lets get to the graphs:
- For comparisons, a column chart.
- For correlations, a bubble chart.
- For temporal, a spline chart.
- For distribution, a historgram.
- For geospacial, a tile map.
- For part to whole / hierarchical, a pie chart.

Firstly, here's the component for the pie chart:
```html

```

Secondly, here's the component for geospacial:
```html

```

Then, here's the component for the histogram:
```html

```

Then, here's the component for the splines:
```html

```

Then, here's the component for the column chart:
```html

```

And finally, the last thing we wanna do in the frontend... is talk about the tiny popups that show up when you click stats or graphs - and again it's very similar to the little popups, when clicking in nodes on the canvas.
The diference is for graphs, at the top, there is the heading of a graph, bellow that, the graph, bellow that the description, & if they tap on the graph, they can open it full screen, zoom in, zoom out. Along with the origin of the data on an "i" callout (back on popup) and you can also see the data's history of change over time at the end. (except for temporal data... duh), which is why we put temporal graphs on stat popups.

Talking about that. For a stat, they can see the current value, origin, description of what it is, name (as the heading), and at the bottom the temporal evolution of it

# Conclusion

Of course, all this HTML code that I gave are examples, overall, I want you to identify patterns are create component based frontend development, you start with the smallest components and then scale up, so we can build advanced components with small ones, and any change propagates over to the rest of the components.

Now please head over to the backend to understand the project better, after that read throught the assets to get a clue, and finally, read through the possible upgrades so you can get a sense of what needs ends must you leave so we can tie them later. Finally, read the default Ai workflow for content creation for clients, so we can create the default canvas and funnel.