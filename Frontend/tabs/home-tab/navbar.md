# Navbar of The Home Tab

> *Copied from: Frontend.md — "Navbar of The Home Tab"*

> Demo: [home-navbar.html](home-navbar.html) ← empty stub

With the canvas now covered, lets go over the navbar of the home page. As said, this navbar is a part of the home & is only present on it. This navbar has a few interactive features, first, the settings gear, on the leftmost, it will open _the settings page_.

Then, second element is the streak, this element is very important, it guarantees gamification, there are a few things to take note, first, the icon, if the streak is none, either because they lost it or they are new... then it will be a grey svg of a fire → [assets/streak/grey-fire.svg](../../../assets/streak/grey-fire.svg). Then, if they do have a streak, we will give them 5 variations. Yellow, Yellow-Orange, Orange, Orange-Blue, Blue (please reference to the "Database Structure Backend.md" for more information)

If they keep the streak for long enough, fire will evolve in the ways states previously...

Being:
- Yellow (achieved 1st week) → [assets/streak/yellow-fire.svg](../../../assets/streak/yellow-fire.svg)
- Yellow-Orange (achieved 1st month) → [assets/streak/yellow-orange-fire.svg](../../../assets/streak/yellow-orange-fire.svg)
- Orange (achieved 3rd month) → [assets/streak/orange-fire.svg](../../../assets/streak/orange-fire.svg)
- Orange-Blue (achieved 7th month) → [assets/streak/orange-blue-fire.svg](../../../assets/streak/orange-blue-fire.svg)
- Blue (achieved 1 year) → [assets/streak/blue-fire.svg](../../../assets/streak/blue-fire.svg)

Upon reaching these milestones, not only will they be rewarded with sparks, which we'll get to in a second, but upon opening the app there will a _commemorative popup window_.

Besides the icon, to the right of it, there will be a streak counter in days (even though the streak is counted every week)

And upon clicking the streak, the _streak status popup window_ will appear.

After that, to the right of the streak, the third element, is sparks. Sparks are like points... How do you get points? Via *achievements*, which can be found on _your profile_ or via *quests*, found in the _quests tab_.

The icon will have the image of some sparkles → [assets/spark-2d.svg](../../../assets/spark-2d.svg). Contrary to streaks, doesn't change, and upon clicking the sparks, you get to the _rewards store_, which we'll get to in a bit.

On the right of the icon, we have a counter with the number of sparks you have.

> `[REMOVED]`: And that's it, oh sorry, did I say there were 4 elements? Well, it was meant for the forth element to be my logo, but it serves no purpose.

One more thing, the transition from navbar to canvas is soft, there is no hard separating line between menue & canvas.