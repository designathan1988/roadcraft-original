# src/core/polygon.ts
Lines: 91
Summary: Polygon basics: isSimple (pairs of edges tested by box first, segSeg only where boxes meet), signed area, ray-cast point in polygon, monotone-chain convex hull.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-5 imports; BOX_GAP 1e-6
- 7-27 isSimple: every edge's box in four typed arrays, then each pair's boxes compared (O(n^2) cheap tests), segSeg where they overlap, neighbours skipped
- 29-37 signedArea (shoelace)
- 39-51 pointInPolygon (even-odd ray cast; edges unspecified)
- 53-91 convexHull: sorted copy, lower and upper chains with cross <= 0 pops, wound positive

## Contracts, state and data flow
- isSimple is still quadratic in box tests (no allocation there); fine for junction rings of tens of points.

## Depends on / used by
- uses: src/core/intersect.ts; used by: junction rings, lots, actions (pointInPolygon per footprint)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://en.wikibooks.org/wiki/Algorithm_Implementation/Geometry/Convex_hull/Monotone_chain : sort, lower and upper chains, pop while not counter-clockwise, O(n log n) (lines 53-90)
- https://en.wikipedia.org/wiki/Point_in_polygon : even-odd ray casting, boundary points unspecified, vertices counted half-open (lines 39-51)
- https://en.wikipedia.org/wiki/Bentley%E2%80%93Ottmann_algorithm : (redone research) isSimple's pair test with a box prefilter is still O(n^2) box tests; fine for footprints of tens of vertices, costly for long rings (callers decide)
