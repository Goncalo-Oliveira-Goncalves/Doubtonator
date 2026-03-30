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

The streak appears right after completing a quest that reaches a goal to increase the streak. The streak increases by one, when during that week you record 7 videos. I believe I already talked about the streak tiers [link where I talked about that] -- because of this, there is no trigger, "if certain value, play", and it checks that when increasing the streak after completing the quest before getting back to the tabs. This functionality just wouldn't make any sense with push notifications.