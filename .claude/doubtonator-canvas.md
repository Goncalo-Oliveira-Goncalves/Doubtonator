---
style_name: Doubtonator Canvas
asset_type: App UI assets (nodes, canvas, quest board)
description: Design system for all in-app UI components — canvas workflow nodes, quest board tiles, cards, and interactive elements. Functional but fully branded with the gamified flat visual language.
---

# Doubtonator Canvas Design System

## Purpose

All interactive UI components inside the Doubtonator app: the Canvas workflow builder, quest board, node states, cards, buttons, and any interactive surface. Components must be immediately readable, state-differentiated, and feel like a game — not a productivity tool.

---

## Color Usage

Always reference semantic tokens from the Doubtonator palette. Never use raw hex in component specs.

### Surface hierarchy
| Layer | Token | Use |
|-------|-------|-----|
| App background | `color-background` | Full-screen base |
| Card / node surface | `color-surface` | Default component fill |
| Elevated card | `color-surface-raised` | Modals, drawers, hover state |
| Overlay / sheet | `color-surface-overlay` | Bottom sheets, tooltips |

### State colors
| State | Background | Border | Text |
|-------|-----------|--------|------|
| Locked | `color-surface` (muted) | `color-border` (dashed) | `color-text-muted` |
| Available | `color-surface-raised` | `color-border-primary` (solid) | `color-text-primary` |
| In Progress | `color-info-subtle` | `color-info` (solid, 2px) | `color-text-primary` |
| Completed | `color-primary` (Lone Hunter fill) | none | `color-text-on-primary` |
| Failed / Error | `color-danger-subtle` | `color-danger` (solid) | `color-danger` |
| Active / Focus | `color-surface-raised` | `color-primary` (3px, glow effect) | `color-text-primary` |

### Action colors
| Element | Token |
|---------|-------|
| Primary button fill | `color-primary` |
| Primary button text | `color-text-on-primary` |
| Destructive button | `color-danger` |
| Ghost button border | `color-border-primary` |
| Disabled state | `color-primary-disabled` |

---

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Screen title | Fredoka One | Regular | 28px |
| Section heading | Nunito | ExtraBold (800) | 20px |
| Node / tile label | Nunito | Bold (700) | 15px |
| Body / description | Nunito | SemiBold (600) | 14px |
| Micro / status tag | Nunito | SemiBold (600) | 11–12px |
| Button label | Nunito | Bold (700) | 15px |
| XP / number display | Fredoka One | Regular | varies |

**Line height:** 1.4 for body. 1.1–1.2 for headlines and node labels (tight for game feel).

---

## Spacing & Grid

| Token | Value | Use |
|-------|-------|-----|
| `space-xs` | 4px | Icon gaps, micro padding |
| `space-sm` | 8px | Tag padding, tight spacing |
| `space-md` | 16px | Standard component padding |
| `space-lg` | 24px | Section spacing |
| `space-xl` | 32px | Screen-level breathing room |
| `space-2xl` | 48px | Major section dividers |

**Base grid:** 8px. All spacing must be multiples of 4px, prefer multiples of 8px.

---

## Corner Radius System

| Component | Radius |
|-----------|--------|
| Nodes / cards | 16px |
| Buttons (standard) | 10px |
| Buttons (pill / CTA) | 100px |
| Tags / chips / badges | 100px (fully rounded) |
| Bottom sheet | 24px top corners only |
| Icon containers | 12px |
| Avatar | 100px (circle) |
| Progress bars | 100px |

---

## Canvas Node Anatomy

Each Canvas node is a card representing one step in a client's automation workflow.

```
┌────────────────────────────────────┐  ← 16px corner radius
│  [icon]  Node Title                │  ← icon 32×32, title Nunito Bold 15px
│  ─────────────────────────────     │  ← 1px divider in color-border
│  Short description of what         │  ← Nunito SemiBold 13px, color-text-secondary
│  this step does.                   │
│                                    │
│  [status tag]        [→ connect]   │  ← tag bottom-left, connector bottom-right
└────────────────────────────────────┘
```

**Node width:** 200–240px fixed. **Node height:** auto, minimum 80px.

**Connector dots:** 10px circle, `color-primary` fill, centered on right edge (output) and left edge (input). On hover: 14px with a `color-primary` glow ring.

**Connection lines:** 2px stroke, `color-border-primary`, bezier curve between nodes. Active connection: `color-primary` with subtle animated dash.

---

## Quest Board Tile Anatomy

Quest tiles are larger, more visual — they're motivational game objects, not just UI elements.

```
┌─────────────────────────────────┐
│  ┌──────────────────────────┐   │
│  │   [quest icon / visual]  │   │  ← icon area, 80px height, accent color bg
│  └──────────────────────────┘   │
│                                 │
│  Quest Title                    │  ← Nunito ExtraBold 16px
│  Short one-line description     │  ← Nunito Regular 13px, color-text-secondary
│                                 │
│  [████████░░░░]  3/5 complete   │  ← progress bar + label
│                                 │
│ [Claim →]           │  ← XP chip + CTA
└─────────────────────────────────┘
```

**Quest tile width:** Full-width in list, or 160px in grid view. **Corner radius:** 16px.

**Quest states:**
- Available: Normal rendering
- In progress: `color-info` left border accent (4px)
- Completed (unclaimed): `color-primary` left border, claim CTA highlighted
- Claimed: Dimmed, completed checkmark, no CTA

---

## Progress & XP Components

### XP Bar
- Full-width pill, `color-surface` track, `color-primary` fill
- Height: 10px (compact) or 16px (prominent)
- Animated fill on XP gain: spring ease, 400ms

### Streak Counter
- Fredoka One number, large (32–48px depending on context)
- `color-warning` (Sè Lèi Orange) when streak is active
- `color-text-muted` when streak is at risk
- Small fire emoji or icon beside the number in active state

### XP Chip / Tag
```
[ +150 XP ]
```
- Pill shape, `color-primary-subtle` background, `color-primary` text
- Fredoka One, 13px, no padding waste

---

## Button System

| Variant | Fill | Text | Border | Use |
|---------|------|------|--------|-----|
| Primary | `color-primary` | `color-text-on-primary` | none | Main CTA |
| Secondary | transparent | `color-primary` | `color-border-primary` 2px | Secondary action |
| Danger | `color-danger` | white | none | Destructive actions |
| Ghost | transparent | `color-text-primary` | `color-border` 1px | Low-emphasis actions |
| Disabled | `color-primary-disabled` | `color-text-muted` | none | Any disabled state |

**All buttons:** Nunito Bold 15px, 100px radius (pill) or 10px radius (standard), minimum 44px height (touch target).

---

## Icon System

- **Style:** Outline icons with 2px stroke weight. Match `color-text-primary` unless contextually colored.
- **Size grid:** 16px · 20px · 24px · 32px · 40px
- **Never use icons without labels** in navigation. Use icon + label pairs.
- **Contextual color:** Icons inside state-colored components inherit the state color (e.g., icon in a completed node is `color-text-on-primary`).

---

## Visual Rules

1. Every component must communicate its state at a glance — don't rely on subtle color differences alone. Use borders, icons, and label changes together.
2. The canvas background uses a subtle dot grid (`color-border` at 15% opacity) to reinforce the spatial/spatial workflow metaphor.
3. Gamification elements (XP, streaks, badges) always use Fredoka One for numbers — this distinguishes them from functional UI text instantly.
4. Shadow/elevation: Use only for modals and bottom sheets. Nodes and cards are flat — elevation comes from borders, not shadows.
5. Animation: All state transitions use spring physics (not linear). Enter: 300ms, Exit: 200ms. XP/streak gains: celebratory, 400ms with slight overshoot.
