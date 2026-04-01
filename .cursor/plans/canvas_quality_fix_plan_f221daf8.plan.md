---
name: Canvas Quality Fix Plan
overview: Improve canvas fidelity and behavior by making node rendering zoom-crisp, recalculating dot-grid opacity when nodes move, and enforcing visibly curved spline links while preserving your MD tangent formula.
todos:
  - id: fidelity-dpr-texture
    content: Apply DPR-aware Pixi renderer and sharpen node icon texture handling for zoomed clarity.
    status: completed
  - id: dot-grid-dirty-redraw
    content: Implement dirty-flag background redraw so heatmap opacity recomputes when nodes move.
    status: completed
  - id: spline-anchor-bias
    content: Refine boundary anchor selection to prevent straight-looking links while keeping MD curve formula.
    status: completed
  - id: interaction-regression-check
    content: Validate pan/zoom/drag/popup behavior after rendering and curve changes.
    status: completed
  - id: lint-and-visual-verify
    content: Run lints and perform targeted visual checks for crispness, grid reactivity, and spline curvature.
    status: completed
isProject: false
---

# Canvas Quality Fix Plan

## Goal

Fix the three remaining canvas quality issues in `home-canvas.html`: pixelation on zoom, static dot-grid opacity after node movement, and links that look straight instead of spline-like.

## Findings From Current Code

- Pixi renderer is initialized without explicit DPR settings, so zoomed visuals can soften.
- Dot-grid heatmap is computed once at startup and not redrawn when node positions change.
- Link formula is implemented, but anchor/tangent choices often become collinear, making curves appear straight.

## Files In Scope

- [frontend/tabs/home-tab/home-canvas.html](frontend/tabs/home-tab/home-canvas.html)
- [frontend/tabs/home-tab/canvas/links.md](frontend/tabs/home-tab/canvas/links.md)
- [frontend/tabs/home-tab/canvas.md](frontend/tabs/home-tab/canvas.md)

## Implementation Steps

1. **Raise visual fidelity for zoomed nodes**

- Update Pixi init to use device pixel ratio (`resolution`) with `autoDensity: true`.
- Keep node bodies vector-drawn; keep the center hex asset swappable through `HEXAGON_SVG_PATH`.
- Load the hex texture with higher effective resolution and lock smoothing behavior so zoom-in stays sharp.

1. **Make dot-grid opacity reactive to node movement**

- Refactor background drawing to keep a persistent grid graphics reference.
- Add `backgroundDirty` flag, set it when any node position changes (drag or programmatic move).
- In ticker, redraw grid only when dirty (with optional throttle) so opacity updates live but remains performant.

1. **Make spline curvature visibly conform to MD expectations**

- Keep your MD core math unchanged:
  - boundary anchors
  - tangent-based controls
  - `s = 0.45 * distance(P0, P1)`
- Improve boundary-anchor selection to avoid collinearity (deterministic angular bias per edge, stronger on near-horizontal/vertical links).
- Preserve stable edge-specific behavior so curves do not flicker frame-to-frame.
- Keep dark idle wires + moving green flow segment inside tube.

1. **Verify behavior on phone navigation interactions**

- Ensure pan/zoom/drag still work with updated background redraw and link anchors.
- Confirm popup anchoring still points correctly after camera transform.

1. **Validation pass**

- Verify visually:
  - node details remain crisp at max zoom,
  - dot opacity follows moved nodes in real time,
  - links are clearly spline-curved across the workflow graph.
- Run lints on edited files.

## Acceptance Criteria

- Zooming in no longer produces obvious node/icon blur.
- Moving any node updates nearby dot-grid intensity immediately.
- Links render as visibly curved splines while still following your MD tangent formula contract.
- Existing phone interactions (pan, pinch, drag, popup) remain stable.

