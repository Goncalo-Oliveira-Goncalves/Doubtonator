# Quest Board

> *Copied from: Frontend.md — "Quest Board"*

> Demo: [quests-board.html](quests-board.html) ← empty stub

The quest board is where you can find quests.

The quest board will be ordered by most important tasks (top), and least important (bottom) - there is an algorithm for defining this on the backend. We will go over all the algorithms there...

This is basically a top to bottom list of quests, which is cards (or rows of a database if you're refined enough to bother about such terminology), lets break these cards down...

There are 3 sections these cards have...

- Heading
- Description
- Button

## Heading
The heading is simply the quest, the ones we have right now is...
- Record a Video (7 per week, they can record anytime, but we recommend having a weekly hour)
- Approve Script Batches - which the heading is "Approve Scripts"
- Give Feedback/Answer Questions (for market research) - which the heading is "Help Us Out" (quest name on database structure backend)

## Description
Below the heading we have a 2 line description. By the way, all of this should be configurable on a database in the backend. I will not provide the description right now.

And then, below the description we have a button, which has 2 elements, at the top, a button with the text: "ACCEPT QUEST" or "FILM", the first one's default, there is a second one, in this case, "FILM", that is configurable in the backend.

Below this button, the second element, which is the estimated time to do a task, placed on the rightmost, this element has a clock icon on the left, followed by the time in minutes (it's a group)

That concludes the quests tab, except for one thing... what happens when you complete a quest? You get the _quests rewards popup window_.

> **Suggested edit (Quest Board):** The quest heading "Help Us Out" is the display name — confirm this is final and matches what's stored in the Quest DB `Quest Name` field.
