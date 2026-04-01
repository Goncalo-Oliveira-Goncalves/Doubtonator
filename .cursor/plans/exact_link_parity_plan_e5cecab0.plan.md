---
name: Exact Link Parity Plan
overview: Make `home-canvas.html` links visually identical to `agent-node-popup.html` by porting the popup wire-generation and flow-timing model verbatim into the canvas pipeline.
todos:
  - id: port-wire-geometry-model
    content: Replace home-canvas wire anchor/tangent generation with the exact popup-style makeWire model adapted to world coordinates.
    status: completed
  - id: port-flow-timing-model
    content: Switch home-canvas flow progression to popup-style absolute-time animation with matching stagger offsets.
    status: completed
  - id: preserve-stroke-stack-order
    content: Keep wire + glow stroke stack and order identical to popup while integrating new geometry/timing.
    status: completed
  - id: interaction-safety-check
    content: Verify pan/zoom/drag/popup behavior remains intact after link model parity update.
    status: completed
  - id: parity-lint-verify
    content: Perform visual parity check against agent-node popup and run lints on home-canvas file.
    status: completed
isProject: false
---

# Exact Link Parity Plan

## Goal

Match Home canvas link visuals 1:1 with the link behavior from `agent-node-popup.html` (same curve feel, same flow movement feel, same stacking look).

## Source Files

- [frontend/tabs/home-tab/home-canvas.html](frontend/tabs/home-tab/home-canvas.html)
- [frontend/tabs/home-tab/agent-node-popup.html](frontend/tabs/home-tab/agent-node-popup.html)
- [frontend/tabs/home-tab/canvas/links.md](frontend/tabs/home-tab/canvas/links.md)

## What Is Different Today

- Canvas uses `buildWire(...)` + `boundaryPoint(...)` with edge-id angular bias.
- Popup uses `makeWire(...)` branch logic with endpoint-role tangents.
- Canvas flow motion uses incremental phase (`+= deltaTime`), popup uses absolute-time progression (`ticker.lastTime` based).

## Implementation Steps

1. **Port popup wire geometry logic into canvas**

- Copy the popup wire construction model into Home canvas as a dedicated helper (same tangent branch behavior used in popup’s `makeWire(...)`).
- Remove canvas-only angular bias from link anchors for this parity mode.
- Keep cubic structure and control-scale rule `s = 0.45 * distance`.

1. **Port popup flow timing model exactly**

- Replace incremental `flowPhase += ...` with popup-style absolute-time progression in canvas.
- Keep the same per-link phase offsets so links animate with stagger like the preview.

1. **Keep popup stroke stack values exact**

- Preserve base wire and 3-layer glow values exactly as in popup (already mostly matched, keep unchanged while migrating geometry/timing).
- Ensure draw order remains: wire first, then soft->mid->core flow segment.

1. **Adapt for world-space canvas safely**

- Use the same wire math but in canvas world coordinates (so pan/zoom still works).
- Keep node dragging, popup click handling, and free-roam camera unaffected.

1. **Validation pass (parity-focused)**

- Side-by-side visual check: `agent-node-popup.html` vs `home-canvas.html` for curve shape and flow motion cadence.
- Verify links no longer look “slightly different” on entry/exit curvature.
- Run lints on modified file.

## Acceptance Criteria

- Home canvas links are visually indistinguishable from agent-node preview links.
- Flow speed/cadence matches popup feel (not just color/width).
- No regressions in pan/zoom/drag/popup interactions.

