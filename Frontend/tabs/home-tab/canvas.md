# Canvas

> *Copied from: Frontend.md — "Breaking Down the Canvas"*

The canvas is essentially defined by me, and clients can visualize it (at least for version 1 of the app) -- it will be a node workflow.

---

## Extra Notes

> *Copied from: Frontend.md — "Extra Notes"*

Finally... as a styling thing, we will have a grid of dots in the background. The background is white, and the dots will be black with low transparency.

But like a heat map, the closer to nodes, the bigger the opacity. And by the way, even though the shape of the nodes change, their size is the same. It's consistent. Here is a prototype, here there is also a algorithm to generate the arrows automatically, so feel free to copy that, it works with spoline logic to look cool.

> Full canvas prototype: [home-canvas.html](home-canvas.html) ← populated

> **[DOUBT]:** The heat map says "closer to nodes, the bigger the opacity." Three things are undefined: (1) What is the max influence radius in pixels? (2) What is the falloff curve — linear, quadratic, or Gaussian? (3) What are the min/max opacity values for the dots (e.g. 0.05 to 0.4)?

[PROBLEM WITH CODE: The prototype in `home-canvas.html` uses placeholder tab names (Home / Activity / Settings). Update them to match the real 5 tabs (Home / Calendar / Clan / Quests / Profile). The `nodes` array is also hardcoded — once the backend is wired, this should be fetched per-user from the Canvas DB.]
