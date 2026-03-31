# The Calendar Tab

> *Copied from: Frontend.md — "The Calendar Tab" section*

> Demo: [calendar-tab.html](calendar-tab.html) ← empty stub

The calendar tab has 2 sections, the calendar & upcoming events. The calendar is similar from the one we saw in some windows, just some extra features. Besides being able to visualize the streak, you can see future calls and events.

If you tap on a certain day, it opens a _day timeline popup window_. Which I'll break down in just a second.

The tap to open the day is only responsive when you have at least one event. Upcoming events time is infinite. It goes infinetely ahead, it's the database of events filtered by how they can see.

Then, on the second section, you can see a timeline of upcoming important events. The timeline format will copy from timeline/feed view from the database node popup window.

Now, lets talk about the highlights there can be in a day, a day can be highlighted with an SVG and a color below the actual text of that day's number. The most obvious kind of highlight is a call, with a camera as picture → [assets/calendar-tab-event-highlights/call-highlight.svg](../../assets/calendar-tab-event-highlights/call-highlight.svg). Second is the end of a community challenge & day of rewards, when picture is a trophy → [assets/calendar-tab-event-highlights/tournament-end-highlight.svg](../../assets/calendar-tab-event-highlights/tournament-end-highlight.svg) we'll add more over time, but for now that's it. For now tho, the only thing is a call, these types are from the event types DB -- which this is the only element right now.