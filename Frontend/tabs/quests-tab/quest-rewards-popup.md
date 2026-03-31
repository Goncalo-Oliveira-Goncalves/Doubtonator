# Quest Rewards Popup Window

> *Copied from: Frontend.md — "Quest Rewards Popup Windows"*

> Demo: [quest-rewards-popup.html](quest-rewards-popup.html) ← empty stub

Alright, lets talk about how this popup window is broken down... there are 3 sections:

- Eyebrow
- Reward
- Continue

The eyebrow says something like "your hard work has rewarded you with..."
The reward on the other hand is 3 elements, an animation of a spark (lottie) → [assets/animations/spark-burst.lottie](../../../assets/animations/spark-burst.lottie) *(deferred to version omega)*, and then, below that, a counter, and below that, a text saying "Sparks", the counter shows the number of sparks they got from the quest (the counter goes from 0 to value, thats always applicable on popups, only on top navbars do the counters just display the value statically).

And finally, we have a button saying "HURRAY!" in text. I do want to highlight most buttons continue to have that 3d extrusion thing we use in the nodes.

Alright! That should finish everything quest related. I do not believe I missed anything, except maybe the leveling system (which shall be detailed in the backend)