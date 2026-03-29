# Item Popup Window

> *Copied from: Frontend.md — "Item Popup Window"*

> Demo: [item-popup.html](item-popup.html) ← empty stub

The item popout window is broken down into 3 different sections...

The first section is the display, where the product is shown. The background color is vivid.
There is the png of the product, for a dynamic effect, the text is below the png.
Here there is a hard transition from section 1 (colorful background) to section 2, (white background) -- in the hard line, at the center, there will be a png of a shadow, with the idea to bring a bit of depth to the composition.

The second section, as told, has a white background. And it will be a markdown stylized document, where we tell more about the product.

The third section will be special, it is always found in the bottom of the screen, even when scrollable, a button to purchase.

The button has 2 parts, the text "PURCHASE" and to the rightmost, the amount of sparks it costs, besides that, there is a like opacity decrease when the content is overlapping with the bounding box for the document. Also blur, both are progressive (top 100% for opacity, 0px for blur) to bottom, (at 0% opacity, 4px blur).

> **Suggested edit (Item Popup):** The "like opacity decrease" phrasing is unclear — rewrite as: "a progressive fade: the background of the purchase button container goes from 0% opacity at the top to 100% at the bottom, overlapping the markdown content above it, with blur going from 0px to 4px."
