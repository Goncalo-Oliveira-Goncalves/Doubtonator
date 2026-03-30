# Doubtonator Brand Guidelines

## Color Usage

## Doubtonator Color System

> Architecture inspired by Duolingo's two-layer palette system:
> **Layer 1 → Primitive Colors** (named families with scales)
> **Layer 2 → Semantic Tokens** (role-based aliases that reference primitives)

---

### Layer 1: Primitive Colors

These are the raw color values. Never use these directly in components — always reference via semantic tokens (Layer 2).

---

#### Backgrounds

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

#### Core Brand

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

#### Extended Palette

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

**Sè Lèi Orange** *(warning/secondary)* — `#ff9600`
| Scale | Hex |
|-------|-----|
| +20% shade | `#cc7800` |
| +40% shade | `#995a00` |
| +60% shade | `#663c00` |
| +80% shade | `#331e00` |
| +20% tint  | `#ffab33` |
| +40% tint  | `#ffc066` |
| +60% tint  | `#ffd599` |
| +80% tint  | `#ffeacc` |

---

#### Semantic State Primitives

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

### Layer 2: Semantic Tokens

> Map primitives to roles. Components always reference these — never primitives directly. This is what makes light/dark theming effortless.

#### Backgrounds & Surfaces

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `color-background` | Everlasting Ice `#fafffd` | Lava Black `#342e37` |
| `color-surface` | Everlasting Ice +80% tint `#d6d5d7` | Lava Black +20% tint `#5d585f` |
| `color-surface-raised` | `#ffffff` | Lava Black +40% tint `#858287` |
| `color-surface-overlay` | `rgba(250,255,253,0.9)` | `rgba(52,46,55,0.9)` |

#### Text Hierarchy

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `color-text-primary` | Lava Black `#342e37` | Everlasting Ice `#fafffd` |
| `color-text-secondary` | Lava Black +20% tint `#5d585f` | Everlasting Ice +40% shade `#aeabaf` |
| `color-text-muted` | Lava Black +40% tint `#858287` | Everlasting Ice +60% shade `#858287` |
| `color-text-on-primary` | Lava Black `#342e37` | Lava Black `#342e37` |
| `color-text-on-dark` | Everlasting Ice `#fafffd` | — |

#### Brand / Actions

| Token | Value |
|-------|-------|
| `color-primary` | Lone Hunter `#9fd356` |
| `color-primary-hover` | Lone Hunter +20% shade `#7fa945` |
| `color-primary-pressed` | Lone Hunter +40% shade `#5f7f34` |
| `color-primary-disabled` | Lone Hunter +60% tint `#d9edbb` |
| `color-primary-subtle` | Lone Hunter +80% tint `#ecf6dd` |

#### Semantic States

| Token | Primitive | Use |
|-------|-----------|-----|
| `color-success` | Lone Hunter `#9fd356` | Correct answers, wins, streaks |
| `color-success-subtle` | Lone Hunter +80% tint `#ecf6dd` | Success backgrounds |
| `color-info` | Oregon Blue `#3c91e6` | Hints, tooltips, neutral nudges |
| `color-info-subtle` | Oregon Blue +80% tint `#d8e9fa` | Info backgrounds |
| `color-warning` | Sè Lèi Orange `#ff9600` | Near-miss, "watch out" states |
| `color-warning-subtle` | `#fff5d3` | Warning backgrounds |
| `color-danger` | Uh Oh Red `#e63c3c` | Errors, wrong answers, destructive actions |
| `color-danger-subtle` | Uh Oh Red +80% tint `#fad8d8` | Error backgrounds |

#### Borders & Dividers

| Token | Light Mode | Dark Mode |
|-------|-----------|-----------|
| `color-border` | Lava Black +60% tint `#aeabaf` | Lava Black +20% tint `#5d585f` |
| `color-border-strong` | Lava Black +40% tint `#858287` | Lava Black +40% tint `#858287` |
| `color-border-primary` | Lone Hunter `#9fd356` | Lone Hunter `#9fd356` |

---

### Usage Rules (from Duolingo's philosophy)

1. **Never use pure white as a base** — use `color-background` (Everlasting Ice) instead. Gray looks lifeless.
2. **Primitives are internal** — components only reference semantic tokens so theming changes don't cascade.
3. **Lone Hunter = encouragement**, not warning. Use `color-warning`/`color-danger` for negative states.
4. **Oregon Blue = information and calm** — it's the "steady friend" energy contrasting the main chaotic-but-caring green.
5. **Sè Lèi Orange = urgency without alarm** — for soft warnings, streaks at risk, near-misses.
6. **Uh Oh Red = reserved for actual errors** — don't dilute it with warnings or it loses its urgency.

# More Colors & Other More Useful Info

### Ranks Color Palette
Remember that on the tournaments ranking, there are those small military badges for 1st, 2nd and 3rd place. Here's the palettes:

| Rank | Primary Color |
|---|--------|
| 3 | e6ae7e |
| 2 | e1f0ff |
| 1 | ffef38 |

### Badges

#### The tiers in the tier list:
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

#### Badge Description
All these tiers are by order of where you start from (bronze), to the pinicle of all badges (diamond)

Even thought there are primary colors, we might use different tones.

| Tier | Name | Primary Color | Shape |
|----|------|---------|--------------|-----|

| 1 | Bronze | e6ae7e | Shape 1 |
| 2 | Silver | e1f0ff | Shape 1 |
| 3 | Gold | ffef38 | Shape 1 |
| 4 | Sapphire | 43c3fe | Shape 2 |
| 5 | Ruby | fe4c4c | Shape 2 |
| 6 | Emerald | 87df05 | Shape 2 |
| 7 | Amethist | cf81ff | Shape 3 |
| 8 | Pearl | feaade | Shape 3 |
| 9 | Obsidian | 28282c | Shape 3 |
| 10 | Diamond | 87e9ea | Shape 4 |

#### Shapes
None in scale.

> **[DOUBT]:** Shapes 1–4 are defined only as ASCII art. Before implementing SVGs, what are the exact shapes? Shape 1 reads as a tombstone/shield (flat top, curved bottom). Shape 2 reads as a regular octagon. Shape 3 reads as a rounded rectangle with flat cut corners. Shape 4 reads as a teardrop or narrowing diamond. Are these correct? A reference image or Figma frame would eliminate ambiguity entirely.

##### SHAPE 1
Shield

---------------------
|                   |
|                   |
|                   |
|                   |
|                   |
|                   |
|                   |
 \                 / 
  \               /  
   `-.         ,-'   
      `-------'      

##### SHAPE 2
Octagon with bigger left and right sides.

              XXXXX             
         XXXXX     XXXXX        
   XXXXXX               XXXXX   
XXX                          XXX
X                              X
X                              X
X                              X
X                              X
X                              X
X                              X
X                              X
X                              X
X                              X
X                              X
XXX                          XXX
   XXXXXX               XXXXX   
         XXXXX     XXXXX        
              XXXXX             

##### Shape 3
Rounded rectangle with flat cut corners

     +--------+    
  .'           `.  
.'               `.
|                 |
|                 |
|                 |
|                 |
|                 |
|                 |
|                 |
`.               .'
  `.           .'  
     +--------+    

##### Shape 4
Narrowing diamond.

      -----------      
   .-'           `-.   
.-'                 `-.
|                     |
\                     /
 |                   | 
 \                   / 
  |                 |  
  \                 /  
   |               |   
   \               /   
    |             |    
    \.__       __./    
        ``---''        
#### Variants
2 Varients exist:
- "Simplified" for fitting small sizes
- "Real" for big and medium sizes

### Some Notes
They have a little shine layer (linear white overlay at 20%)
From gold above there are little particle dots

> **[DOUBT]:** Particle dots — are these static decorative dots or animated? If animated, is this an exception to the no-CSS-transition rule, or should these be frame-based / Lottie? Also, what is the size, density, and placement pattern of the dots?

### Streak palette [INCORRECT — see navbar.md for the correct tiers and colors; this section needs to be updated to match]

> **[DOUBT]:** This section is marked incorrect but hasn't been updated. The correct tiers and colors are in `tabs/home-tab/navbar.md` (Yellow/Yellow-Orange/Orange/Orange-Blue/Blue with milestones at 1 week, 1 month, 3 months, 7 months, 1 year). Please update this section to match, or delete it and point here to navbar.md as the source of truth.
| State | Color | When |
|-------|-------|-----|
| Yellow | ffef38 | achieved 1st week |
| Yellow-Orange | ffc038 | Achieved 1th month |
| Orange | f58a07 | Achieved 3rd months |
| Orange-Blue | There is no color mixes this. We'll use a gradient of the color above and bellow | Achieved 7th months |
| Blue | 266dd3 | Achieveed in 1 year |

---

## Typography
Line Height: Set your line height to 1.5 times the font size for body text. For example, if your body text is 16 pixels, set the line height to 24 pixels.
Paragraph Spacing: Maintain sufficient spacing between paragraphs to avoid a cramped appearance. A spacing of 1.5 to 2 times the line height is ideal.

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Counters & Interactive Elements | Nunito | ExtraBold (800) | Uppercase, letter-spaced +1px |
| H1 | Fredoka One | Medium (500) | 28,98918px |
| H2 | Fredoka One | Medium (500) | 26,3538px |
| H3 | Fredoka One | Medium (500) | 23,958px |
| H4 | Fredoka One | Medium (500) | 21,78px |
| H5 | Fredoka One | Medium (500) | 19,8px |
| H6 | Fredoka One | Medium (500) | 18px |
| Body | Fredoka One | Regular (400) | 16px |
| Secondary Text | Fredoka One | Regular (400) | 14px |
| Metadata & Legal Text | Fredoka One | Regular (400) | 12px |

---

## Visual Rules

1. **Gamification graphics are reward objects.** They must feel special — never reuse the same visual treatment for both common and rare items. Rarity should be visually obvious instantly.
2. **Gradients are allowed here only.** This is the only design system in the Doubtonator suite that permits gradients. Keep them within tier-appropriate color families — no rainbow gradients.
3. **Glow effects must be purposeful.** Use glow to signal energy, achievement, and life. Never use glow as decoration on inactive or locked items.
4. **Consistency over originality.** Every badge in the same tier must share the same visual weight and treatment — individual badges differentiate through icon and name only.
5. **The avatar is the user's identity.** It must never be used as a decorative illustration. It always represents the specific user's progress.
