# Tournaments

> *Copied from: Frontend.md — "Tournaments" subtab*

In the tournaments subtab, we host competitions for who gets the most *XP* (from quests).

And so here, not actually can you view your *rank* in the tournament, but also see this week's leaderboard.

When you haven't completed a quest this week, you can't see the leaderboard, you see a sort of wireframe of it, with the text: "complete a quest to join this week's leaderboard"; And below that, there will be a button: "go to quests".
Once you have completed quests, you can see the leaderboard, which place you are in, and how much XP you have collected.

Detailing a bit more, when there are no quests completed, there are 2 sections:
- Status
- Leaderboard

The status is a group of 4 things, organized from top to bottom, as such:
- Badge Display (using the real badge assets) → see [tournaments/badge-display.md](tournaments/badge-display.md)
- Heading Saying the Rank (e.g: Bronze League)
- A description, saying, "Complete a quest to open this week's leaderboard"
- And a button to "GO TO QUESTS"

---

## Details

> *Copied from: Frontend.md — "Details" (tournament section)*

> Demo: [tournament-status-popup.html](tournament-status-popup.html) ← empty stub

Now onto some tiny details, when you finish a tournament, which finishes at midnight of a certain day, New Yord time, when you open the app next day, a _tournament status window popup_ will appear

When you don't film, and when the league ends, you get demoted to the one rank below current (e.g Gold -> Silver). Same happens if you end up on the demotion zone.

## Last Note

> *Copied from: Frontend.md — "Last node" (note about bottom menu badge)*

The last note I have on the tournaments sub-tab is that on the bottom menu icon for clans, there is a simplified version of their badge, which I already said, just wanted to remind you.