# Doubtonator Color System

> Architecture inspired by Duolingo's two-layer palette system:
> **Layer 1 → Primitive Colors** (named families with scales)
> **Layer 2 → Semantic Tokens** (role-based aliases that reference primitives)

---

## Layer 1: Primitive Colors

These are the raw color values. Never use these directly in components — always reference via semantic tokens (Layer 2).

---

### Backgrounds

**Everlasting Ice** — `#fafffd`
| Scale | Hex |
|-------|-----|
| +20% shade | `#2a252c` |
| +40% shade | `#1f1c21` |
| +60% shade | `#151216` |
| +80% shade | `#0a090b` |
| +20% tint  | `#5d585f` |
| +40% tint  | `#858287` |
| +60% tint  | `#aeabaf` |
| +80% tint  | `#d6d5d7` |

**Lava Black** — `#342e37`
| Scale | Hex |
|-------|-----|
| +20% shade | `#2a252c` |
| +40% shade | `#1f1c21` |
| +60% shade | `#151216` |
| +80% shade | `#0a090b` |
| +20% tint  | `#5d585f` |
| +40% tint  | `#858287` |
| +60% tint  | `#aeabaf` |
| +80% tint  | `#d6d5d7` |

---

### Core Brand

**Lone Hunter** *(primary)* — `#9fd356`
| Scale | Hex |
|-------|-----|
| +20% shade | `#7fa945` |
| +40% shade | `#5f7f34` |
| +60% shade | `#405422` |
| +80% shade | `#202a11` |
| +20% tint  | `#b2dc78` |
| +40% tint  | `#c5e59a` |
| +60% tint  | `#d9edbb` |
| +80% tint  | `#ecf6dd` |

---

### Extended Palette

**Oregon Blue** *(info/secondary)* — `#3c91e6`
| Scale | Hex |
|-------|-----|
| +20% shade | `#3074b8` |
| +40% shade | `#24578a` |
| +60% shade | `#183a5c` |
| +80% shade | `#0c1d2e` |
| +20% tint  | `#63a7eb` |
| +40% tint  | `#8abdf0` |
| +60% tint  | `#b1d3f5` |
| +80% tint  | `#d8e9fa` |

**Sè Lèi Orange** *(warning/secondary)* — `#fa824c`
| Scale | Hex |
|-------|-----|
| +20% shade | `#c8683d` |
| +40% shade | `#964e2e` |
| +60% shade | `#64341e` |
| +80% shade | `#321a0f` |
| +20% tint  | `#fb9b70` |
| +40% tint  | `#fcb494` |
| +60% tint  | `#fdcdb7` |
| +80% tint  | `#fee6db` |

---

### Semantic State Primitives

> These fill gaps Duolingo calls out explicitly: success, danger, and warning need **dedicated** families, not borrowed ones.

**Uh Oh Red** *(danger/error)* — `#e63c3c`
| Scale | Hex |
|-------|-----|
| +20% shade | `#b83030` |
| +40% shade | `#8a2424` |
| +60% shade | `#5c1818` |
| +80% shade | `#2e0c0c` |
| +20% tint  | `#eb6363` |
| +40% tint  | `#f08a8a` |
| +60% tint  | `#f5b1b1` |
| +80% tint  | `#fad8d8` |

**Steady Yellow** *(warning)* — `#f5c842`
| Scale | Hex |
|-------|-----|
| +20% shade | `#c4a035` |
| +40% shade | `#937828` |
| +60% shade | `#62501a` |
| +80% shade | `#31280d` |
| +20% tint  | `#f7d368` |
| +40% tint  | `#f9de8e` |
| +60% tint  | `#fbe9b4` |
| +80% tint  | `#fdf4da` |

---

## Layer 2: Semantic Tokens

> Map primitives to roles. Components always reference these — never primitives directly. This is what makes light/dark theming effortless.

### Backgrounds & Surfaces

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `color-background` | Everlasting Ice `#fafffd` | Lava Black `#342e37` |
| `color-surface` | Everlasting Ice +80% tint `#d6d5d7` | Lava Black +20% tint `#5d585f` |
| `color-surface-raised` | `#ffffff` | Lava Black +40% tint `#858287` |
| `color-surface-overlay` | `rgba(250,255,253,0.9)` | `rgba(52,46,55,0.9)` |

### Text Hierarchy

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `color-text-primary` | Lava Black `#342e37` | Everlasting Ice `#fafffd` |
| `color-text-secondary` | Lava Black +20% tint `#5d585f` | Everlasting Ice +40% shade `#aeabaf` |
| `color-text-muted` | Lava Black +40% tint `#858287` | Everlasting Ice +60% shade `#858287` |
| `color-text-on-primary` | Lava Black `#342e37` | Lava Black `#342e37` |
| `color-text-on-dark` | Everlasting Ice `#fafffd` | — |

### Brand / Actions

| Token | Value |
|-------|-------|
| `color-primary` | Lone Hunter `#9fd356` |
| `color-primary-hover` | Lone Hunter +20% shade `#7fa945` |
| `color-primary-pressed` | Lone Hunter +40% shade `#5f7f34` |
| `color-primary-disabled` | Lone Hunter +60% tint `#d9edbb` |
| `color-primary-subtle` | Lone Hunter +80% tint `#ecf6dd` |

### Semantic States

| Token | Primitive | Use |
|-------|-----------|-----|
| `color-success` | Lone Hunter `#9fd356` | Correct answers, wins, streaks |
| `color-success-subtle` | Lone Hunter +80% tint `#ecf6dd` | Success backgrounds |
| `color-info` | Oregon Blue `#3c91e6` | Hints, tooltips, neutral nudges |
| `color-info-subtle` | Oregon Blue +80% tint `#d8e9fa` | Info backgrounds |
| `color-warning` | Sè Lèi Orange `#fa824c` | Near-miss, "watch out" states |
| `color-warning-subtle` | Sè Lèi Orange +80% tint `#fee6db` | Warning backgrounds |
| `color-danger` | Uh Oh Red `#e63c3c` | Errors, wrong answers, destructive actions |
| `color-danger-subtle` | Uh Oh Red +80% tint `#fad8d8` | Error backgrounds |

### Borders & Dividers

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `color-border` | Lava Black +60% tint `#aeabaf` | Lava Black +20% tint `#5d585f` |
| `color-border-strong` | Lava Black +40% tint `#858287` | Lava Black +40% tint `#858287` |
| `color-border-primary` | Lone Hunter `#9fd356` | Lone Hunter `#9fd356` |

---

## Usage Rules (from Duolingo's philosophy)

1. **Never use pure white as a base** — use `color-background` (Everlasting Ice) instead. Gray looks lifeless.
2. **Primitives are internal** — components only reference semantic tokens so theming changes don't cascade.
3. **Lone Hunter = encouragement**, not warning. Use `color-warning`/`color-danger` for negative states.
4. **Oregon Blue = information and calm** — it's the "steady friend" energy contrasting the main chaotic-but-caring green.
5. **Sè Lèi Orange = urgency without alarm** — for soft warnings, streaks at risk, near-misses.
6. **Uh Oh Red = reserved for actual errors** — don't dilute it with warnings or it loses its urgency.
