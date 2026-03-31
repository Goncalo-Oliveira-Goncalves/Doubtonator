# Approve Script Batches

> *Copied from: Frontend.md — "Approve Script Batches"*

> Demo: [quest-approve-scripts.html](quest-approve-scripts.html) ← empty stub

I think this could work in the same way as tinder. That is, they click to start the task and 7 cards appear for them to approve or disprove.

In the defeault unswiped state, the script card has a title, and the markdown, until the markdown cuts off with a disapearing effect towards the button corner of the card, if you click the card, the card will go full screen and you'll be able to search, the swipe behavior still applies.

To approve, they swipe right. To disprove, they swipe left.

Once you disprove, you are, however, forced to provide feedback on what was messed up and what to say instead. ("Please respond honestly!" or "What is the point is completing this quest to help us out, if you send us giberish brota? Cammon.")

By the way, for now, until version beta, it will be all free text responses with examples. They respond with text always (no options) 

You can also see a progress bar in the bottom saying how many scripts are left. (along with an indicator of card/total, e.g: 3/7, in the right of the progress bar)

Besides that, the cards (scripts) content will be in markdown for easy data transfers.

If you slowly swipe left, you will see an arrow on the left pointing to the left with the text "reject" in a red container. (with a little shadow over everything else)
Something similar happens if you swipe right, the color is green, the text says "approve", the arrow is pointing right and it's the rightmost element on the container.

And that summarizes this quest, upon completing a quest, the _quest rewards popup window appears_.

For this quests, it's pretty simple, per script approved: 2 XP, per 7 scripts done, 14 sparks. They only get the sparks after doing (or if done) the batch. *We'll talk about the leveling system later..*

