# Streak Status Popup Window

> *Copied from: Frontend.md — "Streak Status Popup Window"*

> Demo: [streak-status-popup.html](streak-status-popup.html) ← empty stub

Upon clicking the streak on the home tab's top navbar, the streak status popup window appears...

Like all the popup windows... there is a "x" on the top left corner.

On the center top, there is a text "Streak"; Then this window is broken down into 2 sections:
  Section 1:
    This section has 2 sub-sections:
      Sub-Section 1:
        The first sub-section is status. With 2 objects, being the leftmost one text, giving your streak (e.g: "X day streak.")
        And the one on the right of that one, an animation of the streak fire (with the right color), it's a looping animation.
      Sub-Section 2:
        This subsection has 2 elements and it's a callout, notion style
        Object 1: Heading of the callout data "Your Streak Position:"
        Object 2: A statistic that shows their place in the streaks. (you have a bigger streak then 59% of users)

        > **[DOUBT]:** "59% of users" — is this calculated against all users on the platform, or only users in the same league/clan? The scope of the comparison affects both the backend query and what text makes sense motivationally.
  Section 2:
    In here there is simply a calendar.
    Similar to the calendar before described on the _database node popup window_, however with 1 extra feature. We can see on each week the streak, and to be clear, each week will not be colored or something like that... starting with the beginning of the month, there is a fully rounded container, and it expands throughout the weeks down to the end of the month, like such:

    > **[DOUBT]:** The streak calendar visual — the expanding container that grows through the weeks of a month is described but not shown. What does this look like? Is it a single pill that stretches horizontally across a week row, or a border that traces around completed days? The `<!-- steal from duolingo -->` comment is a placeholder — a sketch or reference screenshot is needed before implementation.

    Upon completing a full month, instead of semi noticeable, semi transparent color of the fire, the container's is background turns golden, with a nice shine, and the text color of those days, matches the color that it would be on an actual image of gold, essentially carving in the numbers into the golden plate, not that you'd actually do that, but it should give you an idea of the text color I am going for in that container.

    > **[DOUBT]:** "The text color that matches actual gold" — there's no hex or token for this. Is it a dark amber like `#7a5c00`, or a near-black engraved look? Also, is "a nice shine" the same 20% white linear overlay used on badges?

> **Suggested edit (Streak Popup):** The `<!-- steal calendar thing -->` comment is a TODO — replace with a real reference once a Duolingo-inspired streak calendar prototype is built. --- I DO NOT understand this suggestion
