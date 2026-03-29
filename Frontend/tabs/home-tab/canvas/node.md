# Node

> *Copied from: Frontend.md — "Breaking Down the Node"*

The node can have various shapes, a square, a circle, a shield, a star, basically an SVG *{:for how this connects with the backend, refer to the database structure backend.}*
However, the node also doesn't look flat, as if seen from a top down perspective, but more as if seen from a 60 degree (opening to the right) angle with the horizontal plane of projection, and making 90 degrees with the frontal plane of projection.
To add depth, we will use PixiJS. And we will specify the SVGs.

Here is an example code with PixiJS for a node for the canvas. Do not take this as the code for the app, even though it's a great start, this alone is not flexible.

> PixiJS node snippet: [canvas-node-pixi.js](canvas-node-pixi.js) ← populated (module snippet, not standalone)

Here is also detailed how we add depth and do the perspective thing. The colors are also wrong, pay no mind to it... Inside the node there is an SVG. Too.

Upon clicking the node, a little popup shows up *{:and to be clear, the example I will give right now, like all the other examples before are purely for inspiration, they must be considered upon the brand voice we are going for. Along with palletes you chose, fonts, etc...}*

> Node popup example: [node-popup.html](node-popup.html) ← populated

Also, when you click the button, the node goes a bit down, I didn't code that functionality in, by the way, there is NO animation, on or off, one state to the next. I like that stylized look.

> Button states example: [button-states.html](button-states.html) ← populated

And now... lets talk a bit more about this popup. There will be some kind of calculation to see where the popup can pop without being cut off. And then, for calculating the arrow... 2 perpendicular lines, 1 vertical, and 1 horizontal will pass by the center point of the node, on one of the lines, there will be 2 points of intersection between the popup & one of the lines, the point closest to the button is the one where the arrow is placed, and the angle of the vector done from that point to the center of the node will define the direction of the arrow.
On the popup, there will be a button. Depending on what kind of node it is, it does diferent things.

There are 2 kinds of nodes: (in this canvas)
    An agent Node → see [../../agent-node-popup.md](../../agent-node-popup.md)
    A database Node → see [../../database-node-popup.md](../../database-node-popup.md)

## Agent Node

If it's an agent node, the button will view the activity of that agent in a little timeline, and the agents evolution over time _(I call this the agent node popup window, detailed in [../../agent-node-popup.md](../../agent-node-popup.md))_.

## Database Node

If it's a database node, depending on the kinds of database, like notion, it might be a calendar, a table, a timeline, or something else, but for now, those are the 3 kinds of databases we allow. _(I call this database node popup window, detailed in [../../database-node-popup.md](../../database-node-popup.md))_

Those nodes are placed on a grid. When the user sees the workflow, the camera's center starts on cordinates (0,0).

We define on the nodes, what are the inputs (other nodes, can be empty), and what are the outputs (also other nodes, optional) -- by defining the inputs, outputs & cordinates, they are linked automatically.

And by making our agents & databases connect like this, we can make it very easy to scale our AIs because, this should really be how the backend is structured (Again, reference to the "Database Structure Backend.md")
