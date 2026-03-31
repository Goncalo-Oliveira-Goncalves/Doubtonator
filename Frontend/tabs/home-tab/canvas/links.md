# Links

> *Copied from: Frontend.md — "Breaking Down the Links"*

For the connection of the nodes, also called "Links" or "Arrows without a tip", it's a bit interesting...

1. When the nodes are transfering data to other nodes we should be able to see it from the node viewer, the links should be black, however when transfering data, it's as if there is a point going through the link and leaving out a glow "inside the link", kinda like something glow-ey through a tube. The speed of the glow throught the tube is the speed between going from one AI to another, which might be fast, so we crank up the glow. And yes, it is actual data passing through, it's a way to visualize it in real time. The color of the glow should be our primary green.
2. The links are soft, but not rounded either. (I could show you some examples of give you the formula, Imma give you the formula...)

## Spline Tangent Formula (how to compute the curve shape)

The spline shape at each end is determined by the **outward tangent** - the unit vector pointing from the node's center through the connection point on its boundary:

> From the node center, trace the horizontal and vertical axis lines. Where they intersect the node border you get the connection point. The vector from center to connection point (pointing outward) is the tangent direction for the spline at that end.

Concretely:
- T = normalize(connectionPoint - nodeCenter)  outward unit tangent
- C0 = P0 + s * T0  (control point at source end)
- C1 = P1 + s * T1  (control point at destination end)
- s = 0.45 x dist(P0, P1)

Because of how cubic bezier tangents work (tangent at P0 = 3*(C0-P0), tangent at P1 = 3*(P1-C1)), this makes the wire depart P0 in the outward direction and arrive at P1 from the inward direction (natural plug-in look, no loops).

For the agent-node detail view (perspective canvas, where one end is a canvas edge instead of another node):
- Node end: C = nodeConnectionPt + s * normalize(nodeConnectionPt - nodeCenter)
- Canvas-edge end: C = canvasEdgePt + s * normalize(nodeConnectionPt - canvasEdgePt)  (chord toward node)
