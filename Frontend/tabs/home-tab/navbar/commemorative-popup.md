# Commemorative Popup Window

> *Copied from: Frontend.md — "Commemorative Popup Window"*

> Demo: [commemorative-popup.html](commemorative-popup.html) ← empty stub

This window has the important job of commemorating the user for reaching a certain streak. First, the color of the commemoration background depends on the color of the fire on the streak.

Then, the screen is divided in two sections... the first is one saying "[STREAK NUMBER] day streak!"; on this one, there will be 3 elements:
- An animation of a clapper board on fire (color of streak)
- A counter with the streak, relatively big text,
- A text saying "day streak!"

In a top to down style flexbox.

Then the next section is 2 buttons, one, "SHARE" highlighted, where you share your achievement.
And then one "GO TO APP"

That explains this window. It opens right after you get the streak (which you increase by completing quests.)

> **Suggested edit (Commemorative Popup):** Clarify trigger: the window opens when the *app is opened* after hitting a milestone (not immediately at the moment of completing the quest). This matters for push notification UX.
