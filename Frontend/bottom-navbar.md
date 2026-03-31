# Bottom Navigation Bar

> *Copied from: Frontend.md — "Bottom Navigation" section*

> Demo: [bottom-navigation.html](bottom-navigation.html) ← empty stub

---

With this, we have completed every page of the home tab... Now... lets quickly go over the bottom navigation bar, which will fill in the details on the other tabs.

Firstly, let's discuss it's components, there are 5... centered, with small margin between each other,
From left to right, the order is:
- Home, Calendar, Clan, Quests, Profile.

The Home, we just went over it...
The Calendar, besides making clear the streak, warns of important events. Don't worry, we'll talk about each tab in more detail once we get to it.
Then Clan is basically where the community comunicates & grows together.
The Quests will be where all tasks the user has to do gather.
And then the profile is where you see achievements, XP, and stuff like that...

A few of these tabs will have their own top navbars, but for now... that doesn't matter.

Now, for the icons! The "Home" will have a map icon. A golden map → [assets/bottom-menu/home-tab-map.svg](../assets/bottom-menu/home-tab-map.svg). The calendar, will be a calendar (duh) → [assets/bottom-menu/calendar-tab-calendar.svg](../assets/bottom-menu/calendar-tab-calendar.svg). The Clan will be their *badge*, and don't worry, we'll talk about badges more soon → use the simplified badge from [assets/badges/simplified/](../assets/badges/simplified/). The quests will be a treasure chest → [assets/bottom-menu/quests-tab-treasure-chest.svg](../assets/bottom-menu/quests-tab-treasure-chest.svg). And the avatar will be a little avatar, like duolingo does it → [assets/bottom-menu/avatar-tab-avatar.svg](../assets/bottom-menu/avatar-tab-avatar.svg). Please refer to the assets folder for these icons. Except the Badge, which there is 2 folders, simplified, and real. That's because we don't want too many details on a small icon. The simplified will be used when the badge is displayed small. And the real will be used when the badge is displayed on big scale, but we'll more into more details in a bit.

Two more things: On the buttom menu, when on a certain tab, it's bounding box's color is no longer transparent but a bit lighter/darker then the menu's background. On the container that has the tab currently opened, besides the background color change, there will be a thin outline on the container, and there will be a bit of roundness to the container too.

Besides that, there is a think top outline on the bottom menu.

---

Also, the icon for Clan should note that the *simplified* badge version is used here specifically (the real one is only for large display contexts like the Tournaments subtab).
