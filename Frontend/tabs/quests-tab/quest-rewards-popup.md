# Quest Rewards Popup Window

> *Copied from: Frontend.md — "Quest Rewards Popup Windows"*

> Demo: [quest-rewards-popup.html](quest-rewards-popup.html) ← empty stub

Alright, lets talk about how this popup window is broken down... there are 3 sections:

- Eyebrow
- Reward
- Continue

The eyebrow says something like "your hard work has rewarded you with..."
The reward on the other hand is 3 elements, an animation of a spark → [assets/animations/spark-burst.lottie](../../../assets/animations/spark-burst.lottie) *(missing)*, and then, below that, a counter, and below that, a text saying "Sparks", the counter shows the number of sparks they got from the quest.

> **[DOUBT]:** "Animation of a spark" — same question as the commemorative popup's clapper animation. Lottie, CSS sprite, or JS frame-by-frame? This is the second explicitly animated element, so the animation system needs to be decided. Also: does the counter count up from 0 to the earned amount (animated increment), or does it just show the static value?
And finally, we have a button saying "HURRAY!" in text. I do want to highlight most buttons continue to have that 3d extrusion thing we use in the nodes.

Alright! That should finish everything quest related. I do not believe I missed anything, except maybe the leveling system (which shall be detailed in the backend)

> **Suggested edit (Quest Rewards Popup):** The spark animation here is one of the few explicit animations in the app — confirm it follows the same no-CSS-transition rule (i.e., it's a frame-based or Lottie animation, not a CSS keyframe on layout properties).
