# Day Timeline Popup Window

> *Copied from: Frontend.md — "Day Timeline Popup Window"*

> Demo: [day-timeline-popup.html](day-timeline-popup.html) ← empty stub

This is quite simple...

There are 2 sections, an info section, and a timeline view section.

The info section has 2 elements, the day of the month in number, with a big font inside a circle.
And to the right, a group. On that group, there is a heading, saying the month on the top.
And on the bottom, another group. With, in 3 letter, the day of the week (e.g. MON, TUE) - all capitalized, followed by a divider on the right of it, and the year.

Section 2 is basically a timeline view which has a filter for the events on that day.

> **[DOUBT]:** "Has a filter" — is this a visible filter UI (e.g. category chips the user can toggle), or is "filter" just describing that the timeline is automatically scoped to the selected day (no user-facing filter control)? The word filter implies an interactive element.