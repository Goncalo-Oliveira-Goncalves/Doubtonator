# The Tracker Window

> *Copied from: Frontend.md — "The Tracker Window"*

> Demo: [tracker-window.html](tracker-window.html) ← empty stub

To be clear, just like the canvas, when you click on a node, a little popup with an arrow pointing to the node shows up, then there is a button to open this page.
Just like the other ones, there is an "x" on the top left corner.
The first section is "the node visualizer" - also like the last ones.

After that, we have the name of the node, like a heading (as before, it's the same, and now here's where it gets interesting, we are given the flexibility of a 9(width) by infinity grid (grows depending on number of items))

And here we can place "data elements" - which is placed automatically using an algorithm present on the backend.
But lets quickly talk about the data elements, because their styling's frontend... and there are 2: Graphs and stats. Their containers are fully flexible. However, for both, 1x1 is not a recommended space.

> **[DOUBT]:** The grid is defined as "9 wide by infinity tall." Are these 9 equal-width columns (like a 9-column CSS grid), or 9 abstract units? Also, if the backend algorithm places elements automatically, does the user have any ability to rearrange or resize grid items (drag-to-reorder), or is it fully backend-controlled? But don't worry, if the full information can't be covered in the grid space given, the user can always click on the stat to get some more information, in the same way a little popup shows up when we click a node. On all of these, by the way, there will be the same extrusion downwards we did on buttons and nodes.

Now, here's a flexible component that works for any ratio you can apply (we can change it to 1x1, 2x2, 9x6, and it changes automatically to the most aesthetically pleasing layout):

> Demo (flexible grid component): [chart-flexible.html](chart-flexible.html) ← empty stub

(make sure it's aesthetically pleasing till 9x9.)

Now, lets get to the graphs:
- For comparisons, a column chart.
- For correlations, a bubble chart.
- For temporal, a spline chart.
- For distribution, a histogram.
- For geospatial, a tile map.
- For part to whole / hierarchical, a pie chart.

> Pie chart demo: [chart-pie.html](chart-pie.html) ← empty stub
> Geospatial demo: [chart-geospatial.html](chart-geospatial.html) ← empty stub
> Histogram demo: [chart-histogram.html](chart-histogram.html) ← empty stub
> Spline demo: [chart-spline.html](chart-spline.html) ← empty stub
> Column chart demo: [chart-column.html](chart-column.html) ← empty stub
> Bubble chart demo: [chart-bubble.html](chart-bubble.html) ← empty stub

> **[DOUBT]:** The bubble chart demo was referencing `chart-column.html` (same file as the column chart above) — corrected to `chart-bubble.html` above. Please confirm.

And finally, the last thing we wanna do in the frontend... is talk about the tiny popups that show up when you click stats or graphs - and again it's very similar to the little popups, when clicking in nodes on the canvas.
The difference is for graphs, at the top, there is the heading of a graph, below that, the graph, below that the description, & if they tap on the graph, they can open it full screen, zoom in, zoom out. Along with the origin of the data on an "i" callout (back on popup) and you can also see the data's history of change over time at the end. (except for temporal data... duh), which is why we put temporal graphs on stat popups.

Talking about that. For a stat, they can see the current value, origin, description of what it is, name (as the heading), and at the bottom the temporal evolution of it