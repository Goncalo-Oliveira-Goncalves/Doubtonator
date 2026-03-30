# The Card Subtab's Content

> *Copied from: Frontend.md — "The Card Subtab's Content"*

This subtab has 2 sections: the status & stats section.

The status section is broken down into your profile, picture, a circle in a container that hugs in width and fills the height of the container - and then the profile is placed at the top, it has rounded corners & has your profile picture with an actual image of yourself in it.

The element is a group, containing 3 elements, from top to bottom:
- Their name
- Their level
- Another group

Their name is in heading size, besides that, as a styling thing, after their name, positioned absolutely on the top right corner of the container of the text there is an icon that was translated by x: +50% and y: -50%, and that icon is their badge. The current badge they're in (obsidian, sapphire, ruby...), this icon's height is about 60% the height of the container, width is calculate automatically keeping the ratio intact.
Then after this we have the level progress bar, which is the one we saw on the quests tab, but the progress bar occupies the full width.
Then we have another group, with 2 elements occupying 50-50 space... from right to left, the streak and sparks respectively. And that completes the first section.

The second section's a list. A list of different data.
Let me break down what a list element has, from left to right, an icon, and text. A flexbox with those two elements from left and right.

For example:
- Icon: A clapper board → [assets/icons/clapperboard-icon.svg](../../../assets/icons/clapperboard-icon.svg) *(missing)*
- Text: "Your time per filming session has reduced by an average of 33%, with 45% more results" - These are prewritten texts with variable substitution. I write them, and then the variables are subtituted, then based on an algorithm, we pick the one that will motivate them the most.

This data will be gotten from the "Data Structure Backend.md", but you get the idea...

`[TODO: (done first) List out all possible motivational sentences you could say]`
`[TODO: Algorithm to pick most motivational thing to say]`

> **[DOUBT]:** Everything below this %%% marker appears to be orphaned content that was not cleanly cut from the source document. It starts describing the node tree subtab (which belongs in `evolution-dashboard.md`) but trails off. This section should either be moved to its proper file or deleted.
