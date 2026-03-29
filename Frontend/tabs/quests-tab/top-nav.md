# Top Nav

> *Copied from: Frontend.md — "Top Nav" (quests)*

> Demo: [quests-top-nav.html](quests-top-nav.html) ← empty stub

First, the navigation bar of the quests tab: it will have the level followed by a small progress bar to the next level, the streak, and the sparks. Here's the navbar:

To talk a bit more about it... the division between it and the other sections is soft, you cannot spot the division between it and the other sections, just like the top navbar on the home page.

The streak and sparks are the same elements from the home tab with the same interactivity and popup windows.

The level and XP progress bar are new. This is one element broken down into 3, We'll talk about the z axis here, because there are things on top of each other.
The bottom layer is the XP bar. A progress bar saying how close or far away we are from leveling up. Also, the progress bar angle is like, 60 degrees, instead of 90, so the color of the XP is vivid as so. The progress color is neon green, and the bar background's kinda white or something (depends on the palette)

The next layer is a container, the LV container, with fully rounded corners, centered text, with the level on it.

The finally layer is just the text "LV", child of LV container, with absolute placement to the top left, and a translation of -50% on the X and Y, with a small background so that the lines don't overlap.

> Demo (XP bar detail): [quests-xp-bar.html](quests-xp-bar.html) ← empty stub

Now, detailed, lets go back to the elements of the top navbar, there are 3, and these 3, level, streak, and sparks, are distributed, level on the leftmost, streaks on the center, and sparks on the rightmost.

That concludes everything you need to know about the top nav.

> **Suggested edit (Quests Top Nav):** The 60-degree XP bar angle is a visual design detail that could conflict with different screen widths — add a note that this angle should be tested on both narrow and wide screen sizes. The "kinda white or something (depends on the palette)" note should be resolved once the design palette is finalized — mark as `[PENDING: palette]`.
