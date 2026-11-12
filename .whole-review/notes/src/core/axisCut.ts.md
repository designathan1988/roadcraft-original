# src/core\axisCut.ts
Lines: 232
Summary: Cuts a polygon with holes along an axis-parallel line into the parts below and above, by walking each ring's crossings and joining the chains along the cut; null where the cut cannot be made cleanly.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-24 imports (clipper types); CLEAR 1e-3, NUDGE, TRIES 16; Crossing (v along the line, rising, point) and Chain (points, exit) types
- 26-45 cutAtAxis setup: each ring opened, degenerate rings skipped (outer one fails), winding normalised in the cut's frame (outer anticlockwise, holes clockwise); clearLine nudges the cut off every vertex
- 47-98 per ring: the crossings of each edge that changes side (interpolated point), rings not crossed kept whole by side; one walk round from the first crossing cuts the ring into chains assigned below/above by the entry's direction
- 100-130 a cut hole with an uncut outer fails; crossings sorted along the line and paired (each pair must rise then fall, strictly increasing); join each side's chains, holes given to the piece that contains them, world winding restored
- 132-135 worldWinding: outer anticlockwise, holes clockwise in world axes
- 137-165 join: chains linked through the crossing pairs (Map by the entry point's identity), guarded against loops
- 167-171 sideOnly: the whole polygon on one side
- 173-191 clearLine: tries 16 offsets alternating sides by NUDGE until no vertex is within CLEAR
- 193-212 openRing (drops a repeated closing point), signedArea (twice the area in the cut frame)
- 214-232 contains: even-odd point in ring

## Contracts, state and data flow
- Pure; cost O(vertices + crossings log crossings) per cut; arrays allocated per call. Map keys are the crossing point arrays by identity (line 143-159), which holds because chains share those exact arrays.

## Depends on / used by
- uses: src/core/clipper.ts types; used by: polygon splitting in world/editor code (lots, blocks)

## Problems found (finding IDs)
- none

## To check in other files
- callers: whether cuts run per frame (they should run per edit only).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort : in place, stable since ES2019 (line 103)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map : object keys by identity (lines 104, 143-159)
- https://en.wikipedia.org/wiki/Sutherland%E2%80%93Hodgman_algorithm : (redone research) clipping against one axis line is linear in the ring's vertices; the cut here walks crossings then sorts them along the cut: O(n log n) per cut, per building split, not per frame
