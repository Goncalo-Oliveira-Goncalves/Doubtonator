# Approve Script Batches

> *Copied from: Frontend.md — "Approve Script Batches"*

> Demo: [quest-approve-scripts.html](quest-approve-scripts.html) ← empty stub

I think this could work in the same way as tinder. That is, they click to start the task and 7 cards appear for them to approve or disprove.

> **[DOUBT]:** What does the script card look like in its default (non-swiped) state? Is there a title, preview text, or just the full markdown content? Is there a visible count indicator showing "card 3 of 7" in the static state, or only on the progress bar at the bottom?
To approve, they swipe right. To disprove, they swipe left.

Once you disprove, you are, however, forced to provide feedback on what was messed up and what to say instead.

> **[DOUBT]:** What does the feedback form on disproval look like? Is it free-text only, a set of predefined categories (e.g. "Off-brand tone", "Factually wrong", "Too long"), or both? This affects the UI significantly and also needs a backend spec for the feedback structure. If you click, you can see the full script, and you can scroll (the swipe left or right thing still works)

You can also see a progress bar in the bottom saying how many scripts are left.

Besides that, the cards (scripts) content will be in markdown for easy data transfers.

If you slowly swipe left, you will see an arrow on the left pointing to the left with the text "reject" in a red container. (with a little shadow over everything else)
Something similar happens if you swipe right, the color is green, the text says "approve", the arrow is pointing right and it's the rightmost element on the container.

And that summarizes this quest, upon completing a quest, the _quest rewards popup window appears_.

For this quests, it's pretty simple, per script approved: 2 XP, per 7 scripts done, 14 sparks. They only get the sparks after doing (or if done) the batch. *We'll talk about the leveling system later..*

