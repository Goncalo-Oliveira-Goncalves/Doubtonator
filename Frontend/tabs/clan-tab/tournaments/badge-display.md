# Badge Display

> *Copied from: Frontend.md — "Badge Display"*

> Demo: [badge-display.html](badge-display.html) ← empty stub

Let's talk a bit more about the badge display:

The badge display's nature's very simple... it's all the badges available, ordered from left to right, least to most rank... and here's the ranks ordered from least to most, this can of course be changed on the background, refer to the "Database Structure Backend.md" for more information:

- Bronze
- Silver
- Gold
- Sapphire
- Ruby
- Emerald
- Amethyst
- Pearl
- Obsidian
- Diamond

Bronze competitions are weekly, the next 4 are monthly, the next 5 are quarterly. And there are rewards for the 1st, 2nd and 3rd place, also editable on the backend, please refer to the "Database Structure Backend.md" document for more information:

- Bronze: 1. 20 Sparks / 2. 10 Sparks / 3. 5 Sparks
- Silver: 1. 25 / 2. 15 / 3. 10
- Gold: 1. 30 / 2. 20 / 3. 15
- Sapphire: 1. 35 / 2. 25 / 3. 20
- Ruby: 1. 40 / 2. 30 / 3. 25
- Emerald: 1. 45 / 2. 35 / 3. 30
- Amethyst: 1. 50 / 2. 40 / 3. 35
- Pearl: 1. 55 / 2. 45 / 3. 40
- Obsidian: 1. 60 / 2. 50 / 3. 45
- Diamond: 1. 75 / 2. 60 / 3. 50

However, here's something important: you can only see the leagues you participated in, so if you never passed from silver, you can see bronze to your left, but all the other ones have a grey locked badge (an icon present in the assets, please refer to the assets folder for more information), indicating you don't know what it is until you win.

So the badge display will have the badge you are on, and this badge will be in the center of the container, the badges after and before will follow, by the way, they are 20% smaller in size (so 80% the size) to indicate the league they are on.

They should not be able to scroll horizontally to see the leagues towards the corners... the badges on left and right fade out.

> **Suggested edit (Badge Display):** The fade-out on left/right should specify: CSS `mask-image: linear-gradient(to right, transparent, black 20%, black 80%, transparent)` — add this as an implementation note.
