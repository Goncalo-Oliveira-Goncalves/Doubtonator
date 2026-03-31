# Tournament Status Window Popup

> *Copied from: Frontend.md — "Tournament Status Window popup"*

> **[DOUBT]:** This file has no `> Demo:` reference unlike every other popup. Should one be added? Also — cells 2, 3, 4 each have a stat counter and a bottom label, but the icon for each cell is not described. What icon represents "Minutes Recording"? "Words Said"? "Total Videos"? Please specify or point to assets.

Now, lets talk a bit about the tournament status window popup, there are a few things:

There are 2 groups - Badge and stats.

The badge has, well the badge at the top, and, the text "You won the X tournament" at the bottom.
The stats has a 2x2 grid, with the same margin between rows & columns, on one cell we have the XP gained, so on the top of the cell we have an icon that represents XP → [assets/icons/xp-icon.svg](../../../../assets/icons/xp-icon.svg) *(missing)*, left, followed on the right by a group with the number of XP gained at the top. And at the bottom of that group the text "XP Earned", in the other cells, the layout is the same. The only thing that change is the icon and the bottom text (the counter also always changes because depends on data, but technically it's the same element, that fetching of data is coded programatically)

Cell 2:
  - "Minutes Recording" → [assets/icons/clapperboard-icon.svg](../../../../assets/icons/clapperboard-icon.svg) *(missing — same asset as card-subtab stats list)*
Cell 3:
  - "Words Said" → [assets/icons/words-said-icon.svg](../../../../assets/icons/words-said-icon.svg) *(missing)*
Cell 4:
  - "Total Videos" → [assets/icons/total-videos-icon.svg](../../../../assets/icons/total-videos-icon.svg) *(missing)*

Finally in the top left corner, there's an X to close the popup window. The popup window's background is the color of the badge, or has the badge's gradient if it's a gradient.

This window will show up ONLY if they win. Not if they lose, nor if they stay. Because that would demotivate them.
