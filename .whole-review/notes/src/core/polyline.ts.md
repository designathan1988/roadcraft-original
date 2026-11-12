# src/core/polyline.ts
Lines: 403
Summary: An immutable polyline on a flat Float64Array with lazily built tables (arc lengths, unit tangents, bbox, chunk and group boxes for nearest-point search); sampling by arc length (allocating or into a reused frame), sub-polylines, reversal, nearest point.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-33 imports; Frame (p, t, n, i, u, s), FrameOut (writable), newFrame
- 35-67 Polyline: xy, n, lazy fields (_cum, _length, _tan, _bbox, _chunks, _groups); fromPoints copies, fromFlat adopts
- 69-78 point(i) and toPoints(): new objects each
- 80-136 cum (cumulative length array, made on first use), tan (unit tangents), bbox, length (a sum kept as one number when cum is not made)
- 138-149 segmentAt: binary search on cum
- 151-195 sampleAt (allocates a frame), sampleAtInto (no allocation: reads tan, so builds it on first use), sampleNorm, tangentAt
- 197-222 sub (a new polyline between two arc lengths, endpoints inserted, deduped) and reversed (a new array)
- 224-272 groups and chunks: boxes of 16-segment runs and of 16 runs, made on first nearest-point search of a long line
- 274-327 nearestSegment: chunk/group boxes skipped when clearly farther; writes the module scratch `nearest`
- 329-363 closestPoint (allocates), closestInto (no allocation), distanceTo
- 365-391 segmentDistSq (shared arithmetic with nearestSegment); CHUNK 16, GROUP 16; the scratch result
- 392-403 dedupe: consecutive duplicates dropped

## Contracts, state and data flow
- Each polyline can carry up to five typed arrays and a bbox object once its tables are asked for: memory per line grows with what callers ask (tan for any sampleAtInto, cum for any sampling). A 10 km city's lanes, walks and edges are many polylines.

## Depends on / used by
- uses: scalar, vec2, aabb, hypot; used by: the network, lanes, roads, simulation, rendering

## Problems found (finding IDs)
- none

## To check in other files
- network/lanelets: how many polylines live for a 10 km city and which tables they build (memory per lane).

## Sources
- https://v8.dev/blog/pointer-compression : with pointer compression doubles in object fields are boxed as heap numbers (lines 33, 69-78: a Vec2 object per point read)
- https://en.wikipedia.org/wiki/Binary_search_algorithm : leftmost binary search, O(log n) (lines 139-149)
- https://v8.dev/blog/disabling-escape-analysis : (redone research) the allocating sampleAt returns an escaping frame object; the reused-frame variant avoids it: per-frame callers should use the second (to check in render)
