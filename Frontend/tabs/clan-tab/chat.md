# Chat

> *Copied from: Frontend.md — "Chat" subtab*

> Demo: [clan-chat.html](clan-chat.html) ← empty stub

The chat features are quite simple, there are 2 sections.

The tabs, which allow you to pick posts categorized in a certain way, category tabs are configurable by the admin in the backend (not editable by users) (e.g: questions, general, sauce, etc.)

They will all be placed in a row, if it doesn't fit, they can do horizontal scroll.

The second section is the actual posts, they'll be placed in a feed view, with the pages (or rows, or cards on the feed as one might call it) similar to the timeline ones, but on steroids, it allows markdown (FULL markdown, when I mention markdown, I always mean full markdown - tables, images, code blocks...), pinning posts (displayed at the top, regardless of posted time, category filter still applies), with a pin svg: → [assets/other-ui-elements/pin.svg](../../../../assets/other-ui-elements/pin.svg) *(missing)*, headings, linking files, etc.

Upon opening the post, there is a "Post Popup Window". Which we'll talk about next...