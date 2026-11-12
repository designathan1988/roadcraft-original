# src/core/intersect.ts
Lines: 69
Summary: 2D intersections: line-line (parametric), segment-segment (t, u in [0,1]), closest point on a segment, and a forward slab test.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-18 lineLine: cross products, parallel under sinEps -> null; point and both parameters
- 20-36 segSeg: t = (w x s)/(r x s), u = (w x r)/(r x s), both in [0,1]
- 38-54 closestOnSegment: degenerate segment -> its start; t clamped; point and squared distance
- 56-69 inForwardSlab: ahead of the origin by more than margin and within hw - margin of the ray

## Contracts, state and data flow
- Pure; each call allocates a few Vec2 objects (sub/add/scale) and a result object.

## Depends on / used by
- uses: src/core/scalar.ts, src/core/vec2.ts; used by: network, editor, actions (closestOnSegment per footprint edge)

## Problems found (finding IDs)
- none

## To check in other files
- hot loops calling these per frame (allocations).

## Sources
- https://en.wikipedia.org/wiki/Line%E2%80%93line_intersection : t = (d x s)/(r x s), u = (d x r)/(r x s); parallel when r x s = 0 (lines 12-17, 27-35)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/abs : absolute value (lines 13, 30, 67)
- https://v8.dev/blog/disabling-escape-analysis : (redone research, replaces the Math.abs filler) a returned result object escapes to the heap: segSeg allocates per call, which matters in offset.ts's pair loop (F-0009, O(m^2) calls) and in polygon isSimple
