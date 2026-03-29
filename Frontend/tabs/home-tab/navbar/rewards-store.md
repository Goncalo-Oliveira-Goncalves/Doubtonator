# Rewards Store

> *Copied from: Frontend.md — "Rewards Store"*

> Demo: [rewards-store.html](rewards-store.html) ← empty stub

Upon clicking on the sparks, in the navbar on home... in takes you to the reward store, here, you can trade sparks by actual real life rewards. I am yet to this figure this out, so for now, it stays as an experimental feature that is disabled by default... anyways:

It is divided into 3 sections:
1. A counter, which shows your sparks (being on the left a 3d spark floating) and on the right, the actual counter -- on this section, the background is a gradient from top left to bottom right of the section container, from pink to neon pink. The 3d spark (and other sparks) contrast in color. Upon transition from section 1 to 2, the background gradient smoothly goes to the white background of the sections 2 & 3.
2. On section 2, there is a sort of card indicating the recommended product for them to get. Lets break down how this card is constructed, firstly, we have the main image, this is a transparent png of a product, it sticks out a bit of frame to add a more dynamic feel (image is cropped so borders of the image always very close to touching the product, it's the only way to get the effect of sticking out of frame at scale) One important node is that the card's background's colorful. Now after the image, there is one group with the name of the item & some tags, in this case, since it's a recommended card, it has a star tag, only one card can have a star tag, but for other tags, you can put one across multiple cards. After this group, there is a brief description, if you clicked on the item, it brings you to the _item popup window_.
3. After the second section, the third is the catalog, a big list of types of products available, here's the current list:
  - Audio
  - Cameras
  - Other Goodies
  The styling per catalog will be a div with a colorful background, and an arrow on the center right, pointing to the right, opening the item brings you to the _catalog popup window_

> **Suggested edit (Rewards Store):** The phrase "I am yet to this figure this out" should be cleaned up or converted into a `[PENDING]` callout. Also, the transition between sections 1 and 2 uses "smoothly" — verify with the no-animation rule (the rest of the app has no animations except the streak fire and spark).
