# src/core/polygonBands.ts
Lines: 59
Summary: A ring's edges binned into horizontal bands (Haines' bins) so a point-in-polygon test reads only the edges of the point's band; built by a counting sort.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-15 PolygonBands {y0, scale, count, xy, start, edge}
- 17-19 bandAt: the band of a height, clamped
- 21-42 polygonBands: n/2 bands over the box's height; each edge's first and last band counted, prefix sums, edges placed (an edge spanning k bands listed k times)
- 44-59 insideBands: the even-odd test over the band's edges

## Contracts, state and data flow
- Build O(n + listed edges) with typed arrays; a test O(edges in one band).

## Depends on / used by
- uses: nothing; used by: lot/area containment tests (to be seen)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://en.wikipedia.org/wiki/Counting_sort : counts, prefix sums, placement, O(n + k) (lines 31-40)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice : a copy into a new array (line 39 `start.slice` used as write cursors)
- https://en.wikipedia.org/wiki/Point_in_polygon : (redone research) ray casting is O(edges) per point; banding reads only the point's band, so tests over many points (lots, footprints) cost per band, not per ring
