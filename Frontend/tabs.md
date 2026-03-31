# Doubtonator — Frontend Specification Index

> *This is the index. All content lives in the files below. Frontend.md is the source of truth — all sections below are cut from it.*

---

## Home Tab

| File | Covers |
|---|---|
| [tabs/home-tab.md](tabs/home-tab.md) | Tab intro |
| [tabs/home-tab/canvas.md](tabs/home-tab/canvas.md) | Canvas overview, dot grid background |
| [tabs/home-tab/canvas/node.md](tabs/home-tab/canvas/node.md) | Node shape, depth, PixiJS, popup, 2 node types |
| [tabs/home-tab/canvas/links.md](tabs/home-tab/canvas/links.md) | Links/splines, glow effect, tangent formula |
| [tabs/home-tab/agent-node-popup.md](tabs/home-tab/agent-node-popup.md) | Agent node detail page (timeline + evolution) |
| [tabs/home-tab/database-node-popup.md](tabs/home-tab/database-node-popup.md) | Database node detail page (table/feed/calendar views) |
| [tabs/home-tab/navbar.md](tabs/home-tab/navbar.md) | Home top navbar (settings, streak, sparks) |
| [tabs/home-tab/navbar/settings-page.md](tabs/home-tab/navbar/settings-page.md) | Settings page |
| [tabs/home-tab/navbar/commemorative-popup.md](tabs/home-tab/navbar/commemorative-popup.md) | Streak milestone commemorative popup |
| [tabs/home-tab/navbar/streak-status-popup.md](tabs/home-tab/navbar/streak-status-popup.md) | Streak status popup |
| [tabs/home-tab/navbar/rewards-store.md](tabs/home-tab/navbar/rewards-store.md) | Rewards store (3 sections) |
| [tabs/home-tab/navbar/rewards-store/catalog-popup.md](tabs/home-tab/navbar/rewards-store/catalog-popup.md) | Catalog popup window |
| [tabs/home-tab/navbar/rewards-store/item-popup.md](tabs/home-tab/navbar/rewards-store/item-popup.md) | Item popup window |

## Calendar Tab

| File | Covers |
|---|---|
| [tabs/calendar-tab.md](tabs/calendar-tab.md) | Tab intro, highlight types (call, challenge) |
| [tabs/calendar-tab/day-timeline-popup.md](tabs/calendar-tab/day-timeline-popup.md) | Day timeline popup window |

## Clan Tab

| File | Covers |
|---|---|
| [tabs/clan-tab.md](tabs/clan-tab.md) | Tab intro, top navbar (3 subtabs) |
| [tabs/clan-tab/chat.md](tabs/clan-tab/chat.md) | Chat subtab (feed, category tabs) |
| [tabs/clan-tab/chat/post-popup.md](tabs/clan-tab/chat/post-popup.md) | Post popup window |
| [tabs/clan-tab/tournaments.md](tabs/clan-tab/tournaments.md) | Tournaments subtab intro, details, last note |
| [tabs/clan-tab/tournaments/badge-display.md](tabs/clan-tab/tournaments/badge-display.md) | Badge display component |
| [tabs/clan-tab/tournaments/leaderboard.md](tabs/clan-tab/tournaments/leaderboard.md) | Leaderboard component |
| [tabs/clan-tab/tournaments/tournament-status-popup.md](tabs/clan-tab/tournaments/tournament-status-popup.md) | Tournament status window popup |
| [tabs/clan-tab/friends.md](tabs/clan-tab/friends.md) | Friends subtab (DMs) |

## Quests Tab

| File | Covers |
|---|---|
| [tabs/quests-tab.md](tabs/quests-tab.md) | Tab intro, quest types list |
| [tabs/quests-tab/approve-scripts.md](tabs/quests-tab/approve-scripts.md) | Approve Script Batches quest |
| [tabs/quests-tab/record-videos.md](tabs/quests-tab/record-videos.md) | Record Videos quest + UI sections |
| [tabs/quests-tab/answer-questions.md](tabs/quests-tab/answer-questions.md) | Give Feedback/Answer Questions quest + UI sections |
| [tabs/quests-tab/top-nav.md](tabs/quests-tab/top-nav.md) | Quests tab top navbar (level, streak, sparks) |
| [tabs/quests-tab/quest-board.md](tabs/quests-tab/quest-board.md) | Quest board (card layout) |
| [tabs/quests-tab/quest-rewards-popup.md](tabs/quests-tab/quest-rewards-popup.md) | Quest rewards popup window |

## Avatar Tab

| File | Covers |
|---|---|
| [tabs/avatar-tab.md](tabs/avatar-tab.md) | Tab intro (leveling, achievements, journal, progress) |
| [tabs/avatar-tab/top-navbar.md](tabs/avatar-tab/top-navbar.md) | 3-icon subtab switcher (node tree, card, journal) |
| [tabs/avatar-tab/card-subtab.md](tabs/avatar-tab/card-subtab.md) | Card/passport subtab |
| [tabs/avatar-tab/evolution-dashboard.md](tabs/avatar-tab/evolution-dashboard.md) | Evolution analysis dashboard subtab |
| [tabs/avatar-tab/evolution-dashboard/tracker-window.md](tabs/avatar-tab/evolution-dashboard/tracker-window.md) | Tracker window (data elements, charts, stat popups) |
| [tabs/avatar-tab/journal.md](tabs/avatar-tab/journal.md) | Journal subtab |
| [tabs/avatar-tab/journal/note-popup.md](tabs/avatar-tab/journal/note-popup.md) | Note popup window |

## Other

| File | Covers |
|---|---|
| [bottom-navbar.md](bottom-navbar.md) | Bottom navigation bar (shared across all tabs) |
| [conclusion.md](conclusion.md) | Conclusion — component-based dev philosophy + reading order |

## HTML Demos

All HTML prototypes live in the same folder as the `.md` file that references them. Each tab file references its demo inline with a local path.
Populated demos are extracted from Frontend.md. Empty demos are stubs marked `<!-- TODO -->`.

---

## Conclusion

> *Copied from: Frontend.md — "Conclusion"*

Of course, all this HTML code that I gave are examples, overall, I want you to identify patterns and create component based frontend development, you start with the smallest components and then scale up, so we can build advanced components with small ones, and any change propagates over to the rest of the components.

Now please head over to the backend to understand the project better, after that read through the assets to get a clue, and finally, read through the possible upgrades so you can get a sense of what loose ends must you leave so we can tie them later. Finally, read the default Ai workflow for content creation for clients, so we can create the default canvas and funnel.
