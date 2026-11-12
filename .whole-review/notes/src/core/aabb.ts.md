# src/core/aabb.ts
Lines: 31
Summary: A 2D axis-aligned box type, built from a flat xy buffer, and grown by a margin.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-6 Aabb interface: readonly minX, minY, maxX, maxY
- 8-23 fromFlat(xy, count = length/2): one pass over count points, min/max; an empty input gives Infinity/-Infinity bounds
- 25-31 expand(b, m): a new box grown by m on every side (allocates an object)

## Contracts, state and data flow
- Pure functions; fromFlat with count past the buffer reads undefined and comparisons with undefined are false, so extra points are ignored.

## Depends on / used by
- uses: nothing; used by: polylines, network and editor code (to be seen in their notes)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Right_shift : `length >> 1` halves a 32-bit integer; correct up to 2^31-1 (line 9)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float64Array : elements read by index, initialised to 0 (lines 15-16)
- https://v8.dev/blog/pointer-compression : (redone research) a box object's four double fields are boxed numbers under pointer compression: a new Aabb per call is several heap objects; how often callers make them decides the weight (callers not yet read: to check)
