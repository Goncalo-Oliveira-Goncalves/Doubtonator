---
style_name: Doubtonator Web
asset_type: Website / landing page graphics (note - WE WILL NOT HAVE LANDING PAGES. NOT YET. PLEASE IGNORE.)
description: Design system for the Doubtonator marketing website and landing pages — hero sections, feature illustrations, CTA banners, and supporting visuals. Bold flat language adapted for wide-canvas web contexts.
---

# Doubtonator Web Design System

## Purpose

All visual assets for the Doubtonator public-facing website and landing pages: hero section graphics, feature block visuals, CTA banners, mockup compositions, and any illustration used to explain the product. The goal is to convert — every visual must either communicate what Doubtonator does or make coaches feel like it was built for them.

---

## Canvas Sizes

| Asset | Dimensions | Notes |
|-------|-----------|-------|
| Hero section | 1440 × 800px (design), fluid in implementation | Full-width; visible area from 1024px up |
| Feature block illustration | 600 × 480px | Used beside copy blocks, left or right aligned |
| CTA banner | 1440 × 360px | Full-width strip above footer |
| Mobile hero | 375 × 600px | Separate treatment for mobile breakpoint |
| OG image (social preview) | 1200 × 630px | Used for link previews when sharing the site |

**Max content width:** 1200px centered on all full-width sections.

---

## Color Usage

### Section background palette
| Section type | Background | Text | Accent |
|-------------|-----------|------|--------|
| Hero (default) | Lava Black `#342e37` | Everlasting Ice `#fafffd` | Lone Hunter `#9fd356` |
| Feature (light) | Everlasting Ice `#fafffd` | Lava Black `#342e37` | Lone Hunter `#9fd356` |
| Feature (dark) | Lava Black `#342e37` | Everlasting Ice `#fafffd` | Oregon Blue `#3c91e6` |
| CTA banner | Lone Hunter `#9fd356` | Lava Black `#342e37` | Everlasting Ice `#fafffd` |
| Stats / social proof | Lava Black +20% tint `#5d585f` (slightly lighter) | Everlasting Ice | Lone Hunter |

**Rule:** Alternate section backgrounds down the page — never two consecutive same-color sections. Standard pattern: Dark hero → Light feature → Dark feature → Green CTA.

### Illustration color rules
- Illustrations use the full Doubtonator palette but always prioritize Lone Hunter and Lava Black as the dominant pair.
- Supporting colors (Oregon Blue, Sè Lèi Orange) used for secondary elements only — never as dominant fills.
- Steady Yellow used for highlight moments (e.g., streak numbers, star icons in feature illustrations).

---

## Typography

| Role | Font | Weight | Size |
|------|------|--------|------|
| Hero headline | Fredoka One | Regular | 64–96px |
| Section headline | Fredoka One | Regular | 48–64px |
| Subheading | Nunito | ExtraBold (800) | 28–36px |
| Body paragraph | Nunito | Regular (400) | 17–19px |
| Feature label | Nunito | Bold (700) | 14px, uppercase, +1px letter-spacing |
| CTA button text | Nunito | Bold (700) | 17–19px |
| Caption / fine print | Nunito | Regular (400) | 13–14px, `color-text-muted` |

### Text rules
1. Hero headline maximum 6 words. The tagline "Just press record." is the benchmark — short, punchy, action-oriented.
2. No justified text. Left-align body copy. Center-align only for full-bleed hero moments.
3. Line height: 1.2 for headlines, 1.6–1.7 for body copy.
4. Max line width: 65 characters for body text. Never let paragraphs stretch full-width.

---

## Layout & Grid

**12-column grid, 24px gutters.**

| Breakpoint | Columns | Margin |
|-----------|---------|--------|
| Desktop (1440px) | 12 col | 120px each side |
| Laptop (1024px) | 12 col | 48px each side |
| Tablet (768px) | 8 col | 32px each side |
| Mobile (375px) | 4 col | 20px each side |

### Section anatomy
Each page section follows a consistent structure:
```
┌──────────────────────────────────────────────────────┐
│                  [Section background]                 │
│                                                      │
│    [Feature label — UPPERCASE SMALL TEXT]            │  ← Announces what this section is about
│                                                      │
│    Section Headline in Fredoka One                   │  ← Primary message
│    Supporting subhead in Nunito                      │
│                                                      │
│    [Visual / illustration]    [Copy block]           │  ← 50/50 split or 60/40
│                                                      │
└──────────────────────────────────────────────────────┘
```

**Vertical rhythm:** 80px between sections on desktop, 48px on mobile.

---

## Hero Section

The hero is the most critical real estate on the page. It must communicate the core value proposition in under 3 seconds.

### Hero structure
```
┌──────────────────────────────────────────────────────────────┐
│  [Lava Black background]                                     │
│                                                              │
│  Stop creating content.        ← Headline: Fredoka One 80px │
│  Start coaching.               ← Line 2 (optional)          │
│                                                              │
│  [One-sentence supporting copy in Nunito 19px]               │
│                                                              │
│  [CTA Button: Get Early Access]   [Secondary link]          │
│                                                              │
│                  [App mockup / hero visual →]                │
└──────────────────────────────────────────────────────────────┘
```

### Hero visual rules
- The hero visual is always an app mockup or a conceptual abstract of the Canvas — not a stock photo.
- Mockup frame: Phone or tablet silhouette in Lava Black, with a subtle Lone Hunter glow around the device.
- Background accent: Subtle geometric shapes (circles, angular blocks) in Lone Hunter at 8–12% opacity.
- No photography in the hero. Ever.

---

## Feature Block Illustrations

Each product feature gets a dedicated illustration used in feature sections.

### Illustration style
- **Flat vector** with bold outlines (2–3px stroke, Lava Black or Everlasting Ice depending on bg)
- **Isometric perspective optional** for showing the app Canvas workflow — gives depth without photography
- **No gradients on illustrations** — flat fills only, consistent with the overall visual language
- **Geometric shapes** as compositional anchors — rectangles and circles to frame focal elements

### Feature illustration content by section
| Feature | Illustration subject |
|---------|---------------------|
| AI scripting | Abstract flow showing input → output with Lone Hunter arrow paths |
| Canvas workflow builder | Isometric view of connected nodes on a grid |
| Gamification | Coach avatar at evolution stage 3–4, XP bar filling |
| Scheduling & posting | Calendar grid with auto-filled posts in Lone Hunter green |
| Analytics / Fathom integration | Simple chart with rising Lone Hunter line |

### Illustration sizing rules
- Illustrations in feature blocks: 560–640px wide max
- Padding around illustrations: 40px minimum — never flush to section edges
- On mobile: illustrations stack below copy, full-width at 100% container width

---

## CTA Banner

Full-width call-to-action strip at page bottom.

```
┌──────────────────────────────────────────────────────────────┐
│  [Lone Hunter background #9fd356]                            │
│                                                              │
│        Your only job is to film.                            │  ← Fredoka One 56px, Lava Black
│        [Get Early Access →]                                 │  ← Large pill button, Lava Black fill
│                                                              │
└──────────────────────────────────────────────────────────────┘
```

- CTA button on Lone Hunter background: Lava Black fill, Everlasting Ice text
- Maximum 2 lines of copy in the CTA banner
- No secondary link in the CTA banner — one action only

---

## Button System (Web)

| Variant | Fill | Text | Border | Min size |
|---------|------|------|--------|----------|
| Primary | `color-primary` | `color-text-on-primary` | none | 160px × 52px |
| Primary (on green bg) | Lava Black | Everlasting Ice | none | 160px × 52px |
| Secondary | transparent | Everlasting Ice | 2px Everlasting Ice | 140px × 52px |
| Ghost (light bg) | transparent | Lava Black | 2px Lava Black | 140px × 52px |

**Button shape:** 100px border radius (full pill). **Font:** Nunito Bold 17px.

**Hover state:** Primary button → `color-primary-hover`. Secondary → background fills at 10% opacity.

---

## App Mockup Treatment

When showing the app inside a device frame:
1. Use a clean phone silhouette (no brand logos). Flat, minimal frame — Lava Black color.
2. The screen shows real UI from the app (Canvas, Quest Board, or the main feed).
3. Apply a subtle Lone Hunter glow behind the device (radial gradient, 60–80px blur, 30–40% opacity).
4. On dark backgrounds: device frame is slightly lighter than background — not invisible, not harsh.
5. Multiple devices: Use 2 max. Never 3+ devices in a single section — it becomes wallpaper.

---

## Visual Rules

1. **No stock photography.** This is a flat-illustrated, product-screenshot-forward site. Photography breaks the game-like visual consistency.
2. **Geometric shapes are the decoration.** Use circles, rectangles, and angular elements — never decorative icons or emojis as primary visual elements.
3. **The Lone Hunter CTA is sacred.** Every page must have exactly one full Lone Hunter green CTA section. Not zero, not two.
4. **Alternate section darkness.** Dark sections next to light sections — never the same background tone twice in a row.
5. **Product visuals must use real UI.** Feature illustrations may be abstract, but device mockups must show real app screens — no placeholder wireframes on a live site.
