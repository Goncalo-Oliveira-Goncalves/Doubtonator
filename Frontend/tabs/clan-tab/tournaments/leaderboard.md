# Leaderboard

> *Copied from: Frontend.md — "Leaderboard" section*

> Demo: [leaderboard.html](leaderboard.html) ← empty stub

Now lets talk about the leaderboard... when you have no quests completed, it shows up as a skeleton of what should be the leaderboard, with 7 users, however, from top to bottom, the opacity of the container goes from 100% to 0%. After that container, we can see you, your rank is null, said as "-", then followed by your avatar and then your name, this group of 3 is found to the leftmost of the container, and then to the rightmost, there is a text saying "XP".

Now to complete the picture of the leaderboard, we must talk about what it looks like when you have completed quests. Firstly, the description on the status section changes to "Top X to advance to the next league" -- when it was before: "Complete a quest to join this TIMEFRAME's leaderboard."
Then, there will show up, below the description, instead of the, before, "GO TO QUESTS" button, the time left on the tournament.

Alright, now onto the actual rankings on the leaderboard... this is a list of all users on the tournament, sorted by XP gained when starting the tournament (top -> most XP collected during timeframe, bottom -> least XP collected during timeframe), now this leaderboard is broken down into 3 parts:
- The promotion zone.
- The stall zone.
- The demotion zone.

This is breaking down the list, if the top 4 pass, then, above the 5th place, you can place a text saying "PROMOTION ZONE" in green, with an arrow on the left and right of the text pointing up.
The opposite also happens, if the bottom 4 go down a league, and there are 17 participants, that means that below the 12th person, you'd add a text to separate the zones saying "DEMOTION ZONE", in red, with 2 arrows, one on the left, one on the right, pointing down. The text of "DEMOTION ZONE" or "PROMOTION ZONE" should have the same distance between the 2 zones it is between. For an overall clean aesthetic.

For more information on stall, promotion and demotion zone information, please refer to the database structure backend document.

Now, you're highlighted in accent color (`color-primary-subtle`), that is, your place as an item on the list, your container, has a background color that will highlight you (and this container will also have rounded corners.)

Now, lets talk a bit more about the container there is for each item of the list or user...

It has 2 groups, one on the leftmost and one of the rightmost (we already talked about this, but I shall repeat it:)

The first group has their rank on the left, an 8 for 8th place, a 2 for second place, and 3 for 3rd place... This has a tiny detail however, if 1st, 2nd or 3rd, a badge appear on the number, a military golden badge for first, a silver for 2nd, and a bronze for third, please refer to the database structure backend document for more information.

Then we have the avatar, then their name. And that, from left to right, completes the description of the first group.

The second group is the XP container, there will be a counter, followed by the word "XP".

> **[DOUBT]:** Everything below this line (%%%%% marker) is a duplicate of the content above it. This section should be deleted once confirmed. when you have no quests completed, it shows up as a skeleton of what should be the leaderboard, with 7 users, however, from top to bottom, the opacity of the container goes from 100% to 0%. After that container, we can see you, your rank is null, said as "-", then followed by your avatar and then your name, this group of 3 is found to the leftmost of the container, and then to the rightmost, there is a text saying "XP".

Now to complete the picture of the leaderboard, we must talk about what it looks like when you have completed quests. Firstly, the description on the status section changes to "Top X to advance to the next league" -- when it was before: "Complete a quest to join this TIMEFRAME's leaderboard."
Then, there will show up, bellow the description, instead of the, before, "GO TO QUESTS" button, the time left on the tournament.

Alright, now onto the actual rankings on the leaderboard... this is a list of all users on the tournament, sorted by XP gained when starting the tournament (top -> most XP collected during timeframe, bottom -> least XP collected during timeframe), now this leaderboard is broken down into 3 parts:
- The promotion zone.
- The stall zone.
- The demotion zone.

This is breaking down the list, if the top 4 pass, then, above the 5th place, you can place a text saying "PROMOTION ZONE" in green, with an arrow on the left and right of the text poiting up.
The opposite also happens, if the bottom 4 go down a league, and there are 17 participants, that means that bellow the 12th person, you'd add a text to separate the zones saying "DEMOTION ZONE", in red, with 2 arrows, one on the left, one on the right, pointing down. The text of "DEMOTION ZONE" or "PROMOTION ZONE" should have the same distance between the 2 zones it is between. For an overall clean asthetic.

For more information on story promotion and demotion zone information, please refer to the database structure backend document.

Now, you're highlighted in accept color, that is, your place as an item on the list, you container, has a background color that will highlight you (and this container will also have rounded corners.)

Now, lets talk a bit more about the container there is for each item of the list or user...

It has 2 groups, one on the leftmost and one of the rightmost (we already talked about this, but I shall repeat it:)

The first group has their rank on the left, an 8 for 8th place, a 2 for second place, and 3 for 3rd place... This has a tiny detail however, if 1st, 2nd or 3rd, a badge appear on teh number, a military golden badge for first, a silve for 2nd, and a bronze for thid, please refer to the database structure backend document for more information.

Then we have the avatar, then their name. And that, from left to right, completes the description of the first group.

The second group is the XP container, there will be a counter, followed by the word "XP".
