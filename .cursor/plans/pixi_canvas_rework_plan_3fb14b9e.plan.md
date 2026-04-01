---
name: Pixi Canvas Rework Plan
overview: Rebuild the Home canvas on PixiJS to match the frontend MD specs, then integrate node popups with correct placement/arrow behavior while preserving your approved bottom navbar style.
todos:
  - id: pixi-scene-home-canvas
    content: Migrate home-canvas renderer to PixiJS layered scene while keeping existing HTML shell and approved navbar/bottom-nav visuals.
    status: completed
  - id: node-projection-unification
    content: Implement a shared perspective/extrusion utility for agent and database nodes with swappable center SVG and viewport-safe layout.
    status: completed
  - id: link-algorithm-rebuild
    content: Apply MD tangent-based cubic link algorithm with stable per-edge anchors/control points and black idle wire styling.
    status: completed
  - id: flow-animation-rework
    content: Implement clearly visible moving green glow segments per link with deterministic phases and speed controls.
    status: completed
  - id: popup-integration
    content: Integrate node popup open behavior with anti-clipping placement and center-to-edge arrow logic from node-popup spec.
    status: completed
  - id: interaction-parity
    content: Add robust node/wire hit areas so drag, click, and popup behaviors coexist without conflicts.
    status: completed
  - id: validation-pass
    content: Run lints and verify all canvas MD acceptance criteria before finishing.
    status: completed
isProject: false
---

# PixiJS Canvas Rework Plan

## Goal

Bring the Home canvas in line with the frontend canvas docs: true PixiJS-based perspective nodes, MD-defined link algorithm with visible moving glow, reliable node/link visibility, and integrated node popups.

## Source Of Truth

- [frontend/tabs/home-tab/canvas.md](frontend/tabs/home-tab/canvas.md)
- [frontend/tabs/home-tab/canvas/node.md](frontend/tabs/home-tab/canvas/node.md)
- [frontend/tabs/home-tab/canvas/links.md](frontend/tabs/home-tab/canvas/links.md)
- [frontend/tabs/home-tab/navbar.md](frontend/tabs/home-tab/navbar.md)
- [frontend/bottom-navbar.md](frontend/bottom-navbar.md)
- [frontend/tabs/home-tab/agent-node-popup.md](frontend/tabs/home-tab/agent-node-popup.md)
- [frontend/tabs/home-tab/home-canvas.html](frontend/tabs/home-tab/home-canvas.html)
- [frontend/tabs/home-tab/canvas/node-popup.html](frontend/tabs/home-tab/canvas/node-popup.html)

## Implementation Steps

1. **Replace Home canvas renderer with PixiJS scene graph**

- Keep existing HTML shell/nav structure in `home-canvas.html`.
- Replace 2D drawing loop with PixiJS `Application` + layers:
  - `bgLayer` (dot grid heatmap)
  - `edgeLayer` (wire tubes)
  - `flowLayer` (moving glow segments)
  - `nodeShadowLayer`
  - `nodeLayer`
  - `uiHitLayer` (interaction overlays)
- Preserve white-mode palette and the bottom navbar visual you approved.

1. **Implement reusable node projection system (60-degree style)**

- Build one projection utility for both agent and database nodes so perspective is consistent.
- Keep node size invariant while allowing swappable center SVG (hexagon path as default).
- Render top face + extruded side faces + ground shadow in Pixi, with clear separation of fills/strokes.
- Ensure all connected nodes are within viewport (initial layout normalization + bounds clamp).

1. **Implement MD link algorithm exactly and normalize endpoints**

- Use boundary anchors on projected node hulls (not center-to-center wires).
- Use cubic tangent formula from docs (`s = 0.45 * distance(P0,P1)`), with control points derived from outward tangents.
- Add stable per-edge IDs and deterministic path rebuild so animation does not reset.
- Confirm links are soft (not over-rounded), black in idle state.

1. **Rebuild flow animation to be visibly moving at all times**

- Animate a glow segment moving inside each wire tube (primary green), with independent phases per link.
- Tune segment length/speed/alpha to remain visible on white background.
- Tie speed parameter to per-edge transfer speed value (default constant until backend wiring exists).

1. **Integrate node popup behavior from canvas spec**

- On node tap/click, open popup (using existing popup demo logic as base from `canvas/node-popup.html`).
- Compute popup position with anti-clipping and side selection based on center-to-edge vector.
- Arrow points to nearest valid node-edge intersection.
- Wire/node hit areas should not conflict with drag interactions.

1. **Wire interaction parity and navigation hook-up**

- Keep drag support for node repositioning in demo mode.
- Add wire hover/click metadata hooks (source/target/flow state placeholders), aligned with popup docs.
- Connect node open action to `agent-node-popup.html` / database popup routes as demo navigation targets.

1. **Verification pass**

- Validate against MD checklist: perspective, links, glow movement, visibility, navbar/bottom-menu constraints.
- Run lints on modified frontend files and fix any introduced issues.

## Acceptance Criteria

- Home canvas is PixiJS-rendered (no 2D-only path as primary renderer).
- Node perspective matches the 60-degree style requirement in canvas docs.
- All linked nodes are visible and wires connect to visible boundaries.
- Glow visibly moves through every active link.
- Bottom bar remains icon-only, aligned, 1:1 containers with breathing room.
- Node popup opens with anti-clipping placement and correct directional arrow.

