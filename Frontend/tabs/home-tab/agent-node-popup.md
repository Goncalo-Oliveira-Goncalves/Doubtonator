# Agent Node Popup Window

> *Copied from: Frontend.md — "Agent Node Popup Window"*

> Demo: [agent-node-popup.html](agent-node-popup.html) ← empty stub
> Implementation: [../../HTMLs/agent-node.html](../../HTMLs/agent-node.html) ← current working file

Alright. Firstly, on the top left corner, there is an "x", clicking on it brings you back to the canvas.
Then, lets talk about "the node visualizer". We will put the node on the center top of screen. However this time, the camera is at about 30 degrees with the horizontal plane of projection, 90 degrees with the frontal. And it's in perspective view.
Really, what we see is the node sitting on the canvas.
Throughout the node, from the top of screen to node, there are the links, and those are input links, and by clicking them, just like the nodes, a popup will appear detailing what's the node it comes from & recent data transfers, you can also see, in real time, data flowing through it.
Then, from the node, on the bottom of it, you see some wires coming out and spreading out. (the outputs)
After the node, we have the name of the node, like a heading.
After the heading, there is a little menu. With 2 options: Timeline, Evolution.
First, lets talk about the timeline view & how it works...
The timeline view is a sort of feed of recent activities (please reference to the Database Structure Backend.md for the structure) an agent can have subagents, NOT peer agents, SUBAGENTS, that's the right term, mini agents that take care of specific functions on a certain agent, so on many of the cards on the feed, there will be progress bars. Then there is a start and end time. Then there is the title of the task & ID of what it does. Then there is description & performed activities.
The evolution tab will be a graph of the git branching of the AIs, the version which I have selected will be highlighted

For now these AI versions oin the evolution tab are managed by the admin only. The user cannot create branches yet. And there is a version switching ability from the admin, the user cannot yet select their versions.