# src/core/simplifyLine.ts
Lines: 25
Summary: Ramer-Douglas-Peucker simplification of an open line within `tol`, iterative with an explicit stack and a keep mask.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-9 doc comment; under 3 points a copy; keep mask with both ends; the stack of ranges
- 10-22 each range: the farthest point from the chord (or from the first end on a zero chord); kept and split when farther than tol
- 23-25 the kept points (filter, a new array)

## Contracts, state and data flow
- Worst case O(n^2), best O(n log n); one small array per pushed range.

## Depends on / used by
- uses: nothing; used by: far roads and outlines (to be seen)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm : keep the farthest point beyond epsilon and recurse; worst O(n^2) (lines 10-22)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter : a new shallow array of the kept elements (line 23)
- https://raphlinus.github.io/graphics/curves/2019/12/23/flatten-quadbez.html : (redone research) fewer vertices within the same tolerance is the saving that matters downstream (geometry per road); RDP removes the extra ones at O(n log n)-O(n^2), run per line built
