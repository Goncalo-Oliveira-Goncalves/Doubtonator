# Database Node Popup Window

> *Copied from: Frontend.md — "Database Node Popup Windows"*

> Demo: [database-node-popup.html](database-node-popup.html) ← empty stub

Database node popup windows have a similar layout to the agent node popup windows... For their differences: Firstly, unlike agents.. here, there is only one data source, one table, that can be represented in different ways:
- Table (basic)
- Feed / Timeline (depends on data)
- Calendar

You can, on the backend, chose which views they can see from. If they have only access to 1 view, we don't show the tabs, nor title.

Let's quickly cover, besides the data, what other components are and then we'll go back to detailing each of the views.

Just like in the agent node popup window, there is a "x" on the top left corner, clicking it takes you back to the canvas.
Besides that, on the center top of the screen, there will be the node, with the functionality we talked about, below that, there is the heading, and then there is the database.

Now let's cover the views... the first view is a table. Has columns, and also horizontal scrolling if columns don't fit the screen.

The second view is the feed / timeline. Which is similar to the timeline detailed on the agent node popup window. If not equal. Because you see, a timeline is just a feed sorted by end and start date... it can also have tags and things like that...

The third view and final view is the calendar view, which is very simple, firstly, it has a top nav, on the center you have a text indicating the year, example: "March 2026", on the right and left, you have right and left arrows, respectivelly, to go forward or backward a month on the calendar.
Then after that, we have a grid, which cells happen to have a 1:1 ratio, with 7 columns for the the days of the week. The first row of the grid is the days of the week, being as follows: (S | M | T | W | T | F | S). After that, the next rows will be weeks with elements being the days, by order.
The day it is today is highlighted on the calendar. Then, there are different kinds of highlights for days where something is scheduled, you can change the highlight color and shape via an svg. (please reference to the "Database Structure Backend.md" for more information)

> **Suggested edit (Database Node Popup):** Consider adding a note that the Database Node popup does NOT have a Timeline/Evolution tab menu — it has the view-type tabs (Table / Feed / Calendar) instead. This is easy to confuse with the Agent Node popup's tab menu.
