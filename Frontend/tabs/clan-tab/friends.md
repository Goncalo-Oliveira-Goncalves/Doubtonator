# Friends

> *Copied from: Frontend.md — "Friends" subtab*

> Demo: [friends-subtab.html](friends-subtab.html) ← empty stub

After the tournaments sub-tab, the only one left is the friends subtab.

The friends tab will be a copy of whatsapp (without friend groups only DMs.)

It will be a list of all their contacts, sorted by who they talked with recently.

So there will be 2 groups per item on this list (container/contact), one at the far left, one at the far right:

The first group has, an avatar, on the left and to the right of that, a subgroup, with their name at the top, in bigger letters, and the recent messages, at the bottom, first 160 characters, adding "..." if there is more.

Group 2 has 2 elements, at the top, the most recent time there was a message in the conversation, at the bottom, a fully rounded container with number of new messages with a vibrant background color, if no messages, the container's invisible.

Upon clicking a chat, it's a normal DM chat bubble conversation.

> **Suggested edit (Friends):** Add a note about what happens on first open with no contacts — empty state design is missing. Also, "(without friend groups only DMs)" is ambiguous — rewrite as "(DMs only, no group chats in v1)".
