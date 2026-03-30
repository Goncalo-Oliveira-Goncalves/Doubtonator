---
style_name: Doubtonator Pitch
asset_type: Presentation / pitch slides
description: Design system for investor decks, product demos, and client onboarding presentations. Two modes — dark (default) and light. Branded but professional; energetic without sacrificing clarity.
---

# Doubtonator Pitch Design System

## Purpose

All slide decks for Doubtonator: investor pitches, product demo walkthroughs, client onboarding decks, and internal presentations. Slides must be bold and memorable while remaining readable and credible. The brand energy shows up through typography, color, and layout — not clutter.

---

## Canvas

**Slide dimensions:** 1920 × 1080px (16:9 widescreen). All slide specs in this document use these dimensions.

**Safe zone:** 80px on all edges. No critical text or visuals outside this boundary.

**Export format:** PDF for sharing. Native format (Figma/Keynote/PowerPoint) for editing.

---

## Deck Modes

Doubtonator pitch decks come in two modes. Choose one per deck and stick to it — never mix modes within a single presentation.

### Mode A — Dark Deck (default for investor pitches)
| Element | Color |
|---------|-------|
| Slide background | Lava Black `#342e37` |
| Primary text | Everlasting Ice `#fafffd` |
| Secondary text | Lava Black +60% tint `#aeabaf` |
| Accent / highlight | Lone Hunter `#9fd356` |
| Secondary accent | Oregon Blue `#3c91e6` |
| Dividers | Lava Black +20% tint `#5d585f` |

### Mode B — Light Deck (client onboarding, product demos)
| Element | Color |
|---------|-------|
| Slide background | Everlasting Ice `#fafffd` |
| Primary text | Lava Black `#342e37` |
| Secondary text | Lava Black +40% tint `#858287` |
| Accent / highlight | Lone Hunter `#9fd356` |
| Secondary accent | Oregon Blue `#3c91e6` |
| Dividers | Lava Black +80% tint `#d6d5d7` |

---

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Slide title | Fredoka One | Regular | 52–64px |
| Section header | Fredoka One | Regular | 40–48px |
| Subheading | Nunito | ExtraBold (800) | 28–32px |
| Body text | Nunito | SemiBold (600) | 20–24px |
| Bullet points | Nunito | Regular (400) | 19–22px |
| Callout / big stat | Fredoka One | Regular | 72–120px |
| Caption / source | Nunito | Regular (400) | 13px, secondary text color |
| Label chips | Nunito | Bold (700) | 13px, uppercase, +1px letter-spacing |

### Slide text rules
1. **One headline per slide.** If two headlines are competing, that's two slides.
2. **Bullet points maximum 5 per slide.** Prefer 3. Never use sub-bullets.
3. **Body copy on slides maximum 20 words per bullet.** If it needs more, it belongs in speaker notes.
4. **Big stats get Fredoka One treatment** — any number or metric that's the main point of a slide should be huge, 80–120px, centered or prominently anchored.
5. **Title slides are text-only or near text-only.** No complex visuals competing with the deck name/section title.

---

## Slide Type Library

### Type 1 — Title Slide
```
┌──────────────────────────────────────────────────────────────────────┐
│  [Full background: Lava Black or Lone Hunter full bleed]             │
│                                                                      │
│                                                                      │
│              Doubtonator                   ← Fredoka One 72px       │
│              Just press record.            ← Nunito SemiBold 28px   │
│                                                                      │
│              Pitch Deck · March 2026       ← Nunito Regular 18px    │
│              [Presenter name]                                        │
│                                                                      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```
- Title slides on Lone Hunter green background: Lava Black text (inverted)
- Title slides on Lava Black: Everlasting Ice text, Lone Hunter accent line below the name

### Type 2 — Section Divider
```
┌──────────────────────────────────────────────────────────────────────┐
│  [Full-bleed accent color — alternate between Lava Black / Lone Hunter] │
│                                                                      │
│     03                         ← Fredoka One 140px, 20% opacity      │
│     THE PRODUCT                ← Fredoka One 56px, primary text      │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```
- Large faded section number anchors the left, section title overlaps it
- Creates momentum and visual hierarchy between major deck sections

### Type 3 — Content Slide (text + visual)
```
┌──────────────────────────────────────────────────────────────────────┐
│  Slide Title in Fredoka One 52px                                    │  ← Top-left anchor
│  ─────────────────────────────────────────────                      │  ← Lone Hunter divider line, 2px
│                                                                      │
│  [Text block, left 50%]        │  [Visual, right 50%]               │
│  • Bullet one                  │  [screenshot / illustration /      │
│  • Bullet two                  │   chart / icon grid]               │
│  • Bullet three                │                                    │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```
- The Lone Hunter 2px horizontal rule under the title is a consistent signature across all content slides
- Left/right split is 50/50 by default. Can be 60/40 if the visual needs more room.

### Type 4 — Big Stat Slide
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│    85%                         ← Fredoka One 120px, Lone Hunter      │
│    of coaches quit posting     ← Nunito SemiBold 28px, below         │
│    within 3 months.            ← continued                           │
│                                                                      │
│    [Source caption]            ← Bottom left, 13px, muted            │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```
- Used for market data, problem definition, or impact metrics
- The number always gets Lone Hunter color treatment — it's the hook
- Only one stat per slide

### Type 5 — Quote Slide
```
┌──────────────────────────────────────────────────────────────────────┐
│                                                                      │
│    "I used to spend 3 hours a day on content.                       │  ← Nunito SemiBold 28px
│     Now I film once and Doubtonator handles                         │     italic, max 3 lines
│     everything else."                                               │
│                                                                      │
│    — Coach Name, Platform, Followers                                │  ← Attribution, 16px
│                                                                      │
│    [Left accent bar: 4px Lone Hunter vertical line]                 │
│                                                                      │
└──────────────────────────────────────────────────────────────────────┘
```

### Type 6 — Comparison / Before & After
```
┌──────────────────────────────────────────────────────────────────────┐
│  BEFORE                        │  AFTER                              │
│  ──────────────────────────    │  ──────────────────────────         │
│  [Muted: Lava +40% tint bg]   │  [Active: Lone Hunter accent]       │
│  3 hrs/day on content         │  30 min/week                        │
│  Manual captioning            │  AI handles it                      │
│  Inconsistent posting         │  Auto-scheduled                     │
│  Burnout                      │  Just coach                         │
└──────────────────────────────────────────────────────────────────────┘
```
- Left (Before) column: muted background, no accent
- Right (After) column: subtle Lone Hunter left border (4px), slightly elevated surface

---

## Data Visualization Rules

### Chart color mapping
| Data series | Color | Use |
|------------|-------|-----|
| Primary metric | Lone Hunter `#9fd356` | The main data line/bar you want audience to see |
| Comparison / baseline | Oregon Blue `#3c91e6` | Secondary series |
| Highlight / outlier | Steady Yellow `#f5c842` | Single data point to call attention to |
| Negative / below target | Uh Oh Red `#e63c3c` | Use sparingly — only for genuinely bad data |
| Neutral / reference | Lava Black +40% tint `#858287` | Industry average, benchmark lines |

### Chart rules
1. **No pie charts.** Use bar or line charts. Pie charts are imprecise and hard to read on slides.
2. **Gridlines:** Minimal — `color-border` at 30% opacity, horizontal only.
3. **Axis labels:** Nunito Regular 13px, secondary text color.
4. **Data labels on bars:** Nunito Bold 14px, placed above bars, primary text color.
5. **Highlight the story.** If the chart's point is one bar being higher, make that bar Lone Hunter and the rest Oregon Blue at 40% opacity.
6. **Chart background:** Always transparent — inherits slide background.

---

## Icon & Visual Usage

- Icons in slides: Outline style, 40–48px, matched to text color
- Screenshots: App screenshots in rounded rectangle frame (16px radius), subtle drop shadow (Lava Black 20% opacity, 0 8px 24px)
- Illustrations: Reuse from `doubtonator-web.md` design system — consistent flat vector style
- No stock photos anywhere in the deck

---

## Slide Pacing Guidelines

These are not visual rules but inform how the design system is used structurally.

| Deck type | Recommended slide count |
|----------|------------------------|
| Investor pitch (seed) | 12–15 slides |
| Product demo | 8–12 slides |
| Client onboarding | 10–15 slides |
| Internal presentation | No limit, but apply all visual rules |

### Standard investor pitch structure
1. Title slide
2. Problem (1 big stat slide)
3. Solution ("Just press record." — one-liner)
4. Product demo / screenshots (2–3 slides)
5. How it works (canvas / workflow overview)
6. Gamification loop (why coaches stay)
7. Traction / early data
8. Market size
9. Business model
10. Team
11. Ask + use of funds
12. CTA / contact

---

## Visual Rules

1. **One Lone Hunter element per slide minimum.** Even if it's just the title underline — the brand must show up on every slide.
2. **Never more than 3 colors on a single slide** (excluding background). Lone Hunter + one accent + text colors.
3. **Consistent slide title position.** Always top-left, always 80px from left edge, 60px from top edge. This creates visual rhythm across the deck.
4. **Section dividers use the full-bleed treatment.** They're intentional visual breaks — don't make them look like content slides.
5. **Animations are minimal.** Fade in (300ms) for content, none for backgrounds. No flying text, spinning charts, or bounce effects.
6. **Speaker notes are not visible to audience.** Put detailed context there — keep slides clean.
