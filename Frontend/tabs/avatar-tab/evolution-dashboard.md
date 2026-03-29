# Evolution Analysis Dashboard Subtab

> *Copied from: Frontend.md — "Evolution Analysis Dashboard Subtab"*

> Demo: [profile-evolution.html](profile-evolution.html) ← empty stub

Firstly, lets detail the data we want to track, and how we want to present it. I think the best way is via the scheme of the funnel, in the future we could turn this into a core feature of the app, further diving into the game aspect... but not for now.
For now, let me explain how the funnel view will work, and perhaps on version 2 of this app, not only could we include a tab to teach them to make a funnel, but we could unite the funnel view and canvas into a single view that they can edit, change and make tests, that could also tap into the AI version thing, and the AIs could provide feedback on the strengths of their money model that was crafted on the app.
From then on, our job as developers would be to make it more like a game & give them stuff to sandbox with.
But... that's version 2, which we'll hopefully, work on soon, and don't worry, I'll create a list of possible updates after detailing assets (after the backend)

Anyways, as stated, this will be similar to the canvas on the home tab.
There will be various node types, one of the nodes will be social media. - For example your instagram data, such as posts, average views per week, average leads per week, average followers per week, the increase in any of those metrics... etc.
We'll talk more about what shows up when you click a node once we got to the node specific page.

But, just know, most of the properties from the canvas apply, starting out position, (0,0), having a grid. Allowing the format of nodes to be changes with an SVG, etc...

For now though, the biggest change is that all of these nodes get their data from trackers, a new category, if we were to compare with agents and databases, this needs a page style for it too, it will get one, _The Tracker Window_, don't worry.

Note: Even though we create template styles for categories of nodes, we allow for personalized modifications per node format. For the meaning of this terminology, please reference to the "Database Structure Backend.md" for more information.

> **Suggested edit (Evolution Dashboard):** The v2 feature notes (funnel + canvas merge) are valuable — move them to a `[v2 Idea]` callout block so they don't clutter the v1 spec.
