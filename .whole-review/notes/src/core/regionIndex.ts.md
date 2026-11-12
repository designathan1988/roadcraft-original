# src/core/regionIndex.ts
Lines: 554
Summary: Point location, boundary distance, digests and line spans over a set of rings in constant time per query: the rings clustered, each cluster a dense grid of cells (default 8 units) holding the segments its supercover touches plus a reference winding number at every cell centre.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-35 FillRule; RegionIndex fields (rule, grids, coarse lookup Map of grids by 64-cell coarse cells, scratch hits); constructor builds the lookup
- 36-72 fromRings: rings of 3+ points, clustered, each cluster's segments (wound CCW for nonzero) into one Grid; fromMultiPoly converts [x,y] pairs to objects then fromRings
- 74-108 inside, gridAt, winding, contains, digest (sums over the grids the box overlaps + the middle's winding)
- 110-166 boundaryDistance; run (crossings along a line within reach, insertion-sorted, the first change of inside each way); span
- 168-185 clusterCount, cellCount; CLUSTER_GAP 4, COARSE 64, coarseKey
- 187-248 clusters: ring boxes, union-find with path halving; overlaps found through coarse cells; then a loop merging clusters whose bounds overlap, comparing EVERY pair of roots each pass until none merges (O(roots^2) per pass)
- 250-317 Grid fields and constructor: bounds, nx*ny dense cells; counting sort of (cell, segment) pairs; stamps per segment; ref per cell; covers, overlaps, bounds
- 318-346 rasterise and cellsOfSegment (row by row supercover)
- 347-397 scanReference: per row a scanline of crossings sorted, the winding of every cell centre (total minus left)
- 398-428 Grid.winding: the cell's reference corrected by the cell's segments along an L path from the centre to the point
- 430-453 digestInto: segments of the box's cells hashed once (stamps)
- 455-481 nearest: closest segment within reach (stamps)
- 483-531 crossings: the line's cells walked row by row, intersections appended (scratch grown by doubling)
- 533-554 floatWord/segmentHash (FNV over the 8 words of a segment)

## Contracts, state and data flow
- Memory per grid: 2 Int32 per cell (start, ref) plus the lists; a cluster's grid is dense over its box: one large cluster spanning a city at 8-unit cells is (span/8)^2 cells.
- clusters' merge loop is quadratic in the number of clusters per pass.

## Depends on / used by
- uses: src/core/digest.ts; used by: paved/footway regions, lots, junction areas (to be seen)

## Problems found (finding IDs)
- none confirmed here

## To check in other files
- src/world/units.ts: how big a unit is (cell = 8 units: the dense grid's size for a city-wide index).
- callers of fromRings/fromMultiPoly: are any indexes built over the whole 10 km map (one cluster spanning it, its dense grid's memory), and how often rebuilt?

## Sources
- https://en.wikipedia.org/wiki/Disjoint-set_data_structure : path halving find; near-constant amortised with union by size/rank (lines 200-206: union by min index, not by size)
- https://en.wikipedia.org/wiki/Nonzero-rule : nonzero sums signed crossings, even-odd counts them (lines 4-5, 74-76, 384, 390, 524)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT : (redone research) dense grids of 8-unit cells in typed arrays: memory per cluster = its cells x bytes per cell; a 10 km map's rings at 8 m cells is a large grid (its users and their extents decide; to check where regionIndex is built for whole-map rings)
