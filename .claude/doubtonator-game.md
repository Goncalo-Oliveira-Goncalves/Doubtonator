---
style_name: Doubtonator Game
asset_type: Gamification graphics (badges, streaks, avatar, tournaments)
description: Design system for all gamification visuals — badges, streak graphics, the evolving coach avatar, tournament brackets, and XP celebration moments. The most expressive system — allows layered depth, glow effects, and tier-based visual complexity.
---

# Doubtonator Game Design System

## Purpose

All gamification-layer visuals: achievement badges, streak fire counters, the coach's evolving avatar, tournament brackets and leaderboards, clan graphics, and celebratory moments (level-up, quest complete, daily win). These assets must feel earned — they're reward objects, not UI chrome.

---

## Color Usage

Gamification graphics are the one place where the design system allows layered depth, subtle gradients, and glow/shine effects — but always grounded in the Doubtonator palette.

### Ranks Color Palette
Remember that on the tournaments ranking, there are those small military badges for 1st, 2nd and 3rd place. Here's the palettes:

| Rank | Primary Color |
|---|--------|
| 1 | e6ae7e |
| 2 | e1f0ff |
| 3 | ffef38 |

### Badge Color Palette

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

##### SHAPE 1

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

### Streak palette [INCORRECT, REVISE BASED ON FRONTEND INFO - TIERS ARE NOT CORRECT, COLORS WERE SPECIFIED]
| State | Color | When |
|-------|-------|-----|
| Active streak | Sè Lèi Orange `#fa824c` → Steady Yellow `#f5c842` | Fire gradient |
| At-risk streak (< 4hrs to reset) | Sè Lèi Orange at 60% opacity | Warning state |
| Broken streak | Lava Black +40% tint `#858287` | Muted, no energy |
| Record streak | Lone Hunter `#9fd356` | Celebrate new personal best |

---

## Typography

| Role | Font | Weight | Notes |
|------|------|--------|-------|
| Badge name | Fredoka One | Regular | All caps, centered, 14–18px |
| XP amount (celebration) | Fredoka One | Regular | Very large, 48–80px |
| Tournament rank number | Fredoka One | Regular | Oversized, 32–64px |
| Streak count | Fredoka One | Regular | 40–72px depending on context |
| Tier label | Nunito | ExtraBold (800) | Uppercase, letter-spaced +1px |
| Description / flavor text | Nunito | SemiBold (600) | 13–14px, italic allowed for flavor |

---

## Badge System

### Badge anatomy
```
        ┌────────────────────┐
       /  [tier color frame]  \
      /                        \
     │    [central icon 40px]   │  ← Icon represents the achievement category
     │                          │
      \   BADGE NAME           /  ← Fredoka One, centered, bottom area
       \  ─────────────────── /
        └────────────────────┘
             [tier label]         ← Tiny pill below: "GOLD", "LEGENDARY", etc.
```

**Shape vocabulary by category:**
| Category | Shape |
|----------|-------|
| Streak / consistency | Hexagon |
| Content output | Circle with camera/film icon |
| Community / clan | Shield |
| Skill / level-up | Star burst |
| Challenge / tournament | Diamond |
| First-time milestones | Rounded square (gem-like) |

**Size variants:**
- Full badge (profile, showcase): 120×120px
- List badge: 48×48px
- Micro badge (inline): 24×24px

### Badge detail rules by tier
| Tier | Border | Interior detail | Glow |
|------|--------|----------------|------|
| Starter | 2px flat stroke | Single flat icon | None |
| Bronze | 3px stroke with slight gradient | Icon + subtle inner shadow | Soft warm glow, 8px |
| Silver | 3px gradient border | Icon + shine layer (linear white overlay at 20%) | Cool shimmer |
| Gold | 4px gradient border | Icon + shine + particle dots | Warm yellow glow, 12px |
| Legendary | 4px animated gradient border | Full icon + layered effects | Aurora-style dual glow, 16px |

---

## Streak Graphic System

### Streak counter anatomy
```
      🔥  ← fire icon, 32px, Sè Lèi Orange
      42  ← Fredoka One, 48px, orange-to-yellow gradient
    streak  ← Nunito SemiBold 12px, color-text-muted, label
```

**States:**
- **Active:** Full color fire icon + gradient number
- **Today's post done:** Add Lone Hunter checkmark badge overlapping fire at bottom-right
- **At risk:** Fire icon desaturated 40%, number in Sè Lèi Orange at 70% opacity, pulsing animation
- **Broken:** Grey flame (no color), number crossed out in `color-text-muted`
- **New record:** Fire icon replaced by star, number in Lone Hunter, celebratory particle burst

### Streak milestone graphics
At 7, 30, 60, 100, 365 day streaks — full celebration graphic is generated:
- Full-bleed card with tier-appropriate colors
- Large streak number (80–96px Fredoka One) centered
- "X DAY STREAK" label below
- Background: subtle radial gradient from accent color to Lava Black
- Animated particles (if motion supported)

---

## Avatar System

The coach avatar evolves visually as the user levels up. 5 evolution stages.

### Evolution stages
| Stage | Level range | Visual description | Color treatment |
|-------|------------|-------------------|----------------|
| 1 — Rookie | 1–9 | Simple silhouette, plain gym outfit | Muted, limited detail |
| 2 — Hustler | 10–24 | More defined features, branded gear | Lone Hunter accent pieces |
| 3 — Coach | 25–49 | Full character, equipment visible | Rich Lone Hunter + Lava Black |
| 4 — Elite | 50–74 | Distinguishing features, aura ring | Lone Hunter + Oregon Blue highlights |
| 5 — Legend | 75+ | Full legendary treatment, animated idle | Full tier color treatment, aurora aura |

### Avatar visual rules
1. Each stage must be immediately distinguishable from the previous — not just an accessory swap.
2. The avatar always faces right (forward-facing profile for profile display, side-facing for action contexts).
3. Facial style: Flat illustrated, rounded features consistent with Fredoka One's roundness. No photorealism.
4. Avatar background for profile display: Circular crop, `color-surface` fill, avatar fills 80% of the circle.
5. Evolution animation (when leveling up): Avatar "glows" in current tier color, then new stage fades in over 1.2s.

### Avatar color rules
| Element | Color guideline |
|---------|----------------|
| Skin tones | Neutral range, multiple options at account setup |
| Base outfit | Lava Black + Lone Hunter accent stripe |
| Equipment/gear | Evolves with tier — bronze → gold → legendary materials |
| Aura (Elite+) | Oregon Blue → Lone Hunter radial glow |
| Background | Always `color-surface` — never compete with avatar |

---

## Tournament & Leaderboard Graphics

### Leaderboard entry
```
┌────────────────────────────────────────┐
│  #1  [avatar 32px]  CoachName     🏆  │  ← rank + avatar + name + trophy icon
│      ████████████████░░░░  2,450 XP   │  ← progress bar + XP label
└────────────────────────────────────────┘
```

**Top 3 rank treatments:**
- #1: Steady Yellow `#f5c842` rank number, gold border on entry
- #2: Lava Black +60% tint `#aeabaf`, silver border
- #3: Sè Lèi Orange `#fa824c`, bronze border

**User's own entry:** Always highlighted with `color-primary-subtle` background and `color-border-primary` border regardless of rank.

### Tournament bracket
- Clean horizontal bracket layout
- Connecting lines: `color-border` 1px
- Win: Node fills with `color-primary` (Lone Hunter)
- Loss: Node fills with `color-surface` (muted)
- In progress: `color-info` (Oregon Blue) with animated pulse border
- Champion slot: Full `doubtonator-game` Legendary tier treatment

---

## Celebration Moments

Full-screen celebration graphics triggered by key achievements.

### Templates
**Quest Complete:**
- Background: Radial burst from `color-primary` to Lava Black
- Center: Large checkmark icon in Lone Hunter
- Headline: "QUEST COMPLETE" in Fredoka One, 48px, Everlasting Ice
- XP gain: "+{XP} XP" in Steady Yellow, 32px

**Level Up:**
- Background: Tier-appropriate color treatment (see tier palette)
- Center: Avatar at new evolution stage
- "LEVEL {N}" in Fredoka One, oversized
- New tier name below in smaller Nunito ExtraBold

**Streak Record:**
- Background: Sè Lèi Orange → Lava Black gradient
- Center: Streak number in Fredoka One, 80px
- "NEW RECORD" label above in Nunito ExtraBold
- Particle effects: small dots radiating outward in Steady Yellow and Lone Hunter

---

## Visual Rules

1. **Gamification graphics are reward objects.** They must feel special — never reuse the same visual treatment for both common and rare items. Rarity should be visually obvious instantly.
2. **Gradients are allowed here only.** This is the only design system in the Doubtonator suite that permits gradients. Keep them within tier-appropriate color families — no rainbow gradients.
3. **Glow effects must be purposeful.** Use glow to signal energy, achievement, and life. Never use glow as decoration on inactive or locked items.
4. **Consistency over originality.** Every badge in the same tier must share the same visual weight and treatment — individual badges differentiate through icon and name only.
5. **The avatar is the user's identity.** It must never be used as a decorative illustration. It always represents the specific user's progress.
