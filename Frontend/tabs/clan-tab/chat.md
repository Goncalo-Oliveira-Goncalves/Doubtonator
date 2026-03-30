# Chat

> *Copied from: Frontend.md — "Chat" subtab*

> Demo: [clan-chat.html](clan-chat.html) ← empty stub

The chat features are quite simple, there are 2 sections.

The tabs, which allow you to pick posts categorized in a certain way, which is editable on the background (e.g: questions, general, sauce, etc.)

They will all be placed in a row, if it doesn't fit, they can do horizontal scroll.

The second section is the actual posts, they'll be placed in a feed view, with the pages (or rows as one might call it) similar to the timeline ones, but on steroids, it allows markdown, pinning posts, headings, linking files, etc.

> **[DOUBT]:** Two things undefined: (1) "Pinning posts" — where do pinned posts appear? At the very top of the feed regardless of category? Is there a visual pin indicator on the card? (2) Markdown in posts — is this full markdown (tables, images, code blocks) or a limited rich-text subset? Images/attachments would significantly change the card height and loading behavior.

Upon opening the post, there is a "Post Popup Window". Which we'll talk about next...

> **Suggested edit (Chat):** is ambiguous — clarify as "category tabs are configurable by the admin in the backend (not editable by users)". Also note that "pages (or rows)" phrasing is awkward — simplify to "cards in a feed".
