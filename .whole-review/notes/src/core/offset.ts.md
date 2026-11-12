# src/core/offset.ts
Lines: 148
Summary: Offsets an open polyline by a signed distance (miter joins, round joins past the miter limit, half-circle caps on reversals) and prunes the loops the inner side makes.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-22 imports (scalar tolerances, vec2, segSeg); OffsetOptions (miterLimit, arcTol, prune)
- 24-43 pushArc: steps so the sagitta stays within tol (2 acos(1 - tol/r)), short way round
- 45-71 offsetPolyline setup: per-segment unit tangents and left normals (arrays of Vec2 objects), the first offset point
- 73-112 each interior vertex: collinear skipped; reversal capped by an arc; miter within the limit, else round join; the last point; prune when asked (default true)
- 114-148 pruneSelfIntersections: for EACH segment i, every later segment j from the end down is tested with segSeg (allocating vectors) until a crossing: O(m^2) segSeg calls on a chain without loops

## Contracts, state and data flow
- Pruning is quadratic in the offset chain's points and allocates per test; every road edge offset with prune pays it.

## Depends on / used by
- uses: src/core/scalar.ts, src/core/vec2.ts, src/core/intersect.ts; used by: road surfaces and kerbs, lanes (to be seen)

## Problems found (finding IDs)
- F-0009 (suspected, S3): the loop pruning is quadratic with an allocation per test

## To check in other files
- callers: how many points a road's offset chain has (curved roads flattened to up to 64 points a segment) and how often offsets run (per build, per cell).

## Sources
- https://en.wikipedia.org/wiki/Sagitta_(geometry) : s = r(1 - cos(theta/2)), so theta_max = 2 acos(1 - s/r) (line 37)
- https://en.wikipedia.org/wiki/Bentley%E2%80%93Ottmann_algorithm : testing every pair is Theta(n^2); a sweep is O((n+k) log n) (lines 123-145)
- https://v8.dev/blog/trash-talk : (redone research) each segSeg result is young garbage: cheap per object, but m^2/2 of them per offset makes scavenges frequent while roads are built
