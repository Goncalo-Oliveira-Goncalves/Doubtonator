# Friends

> *Copied from: Frontend.md — "Friends" subtab*

> Demo: [friends-subtab.html](friends-subtab.html) ← empty stub

After the tournaments sub-tab, the only one left is the friends subtab.

The friends tab will be a copy of whatsapp (DMs only, no group chats in v1).

It will be a list of all their contacts, sorted by who they talked with recently.

So there will be 2 groups per item on this list (container/contact), one at the far left, one at the far right:

The first group has, an avatar, on the left ansd to the right of that, a subgroup, with their name at the top, in bigger letters, and the recent messages, at the bottom, first 160 characters, adding "..." if there is more.

Group 2 has 2 elements, at the top, the most recent time there was a message in the conversation, at the bottom, a fully rounded container with number of new messages with a vibrant background color, if no messages, the container's invisible.

Upon clicking a chat, it's a normal DM chat bubble conversation.

> **[DOUBT]:** Message bubble styling is never described. Which side are sent messages on (right)? Received (left)? What's the bubble background color — `color-primary` for sent, `color-surface` for received? Are there message tails? What about timestamps — per message, or grouped?

What if they don't have any chats? A callout shows up with something like "This place seems quite lonely, start some conversations with people", to start conversations, you click on the name of posters and commenters in the chat section.

> **Note:** When no contacts, they can click on names in the "Chat" section to start a conversation in the friends tab, if they go directly to the friends tab without talking to anyone, a little callout shows up "It's quite empty in here, try talking to someone."
