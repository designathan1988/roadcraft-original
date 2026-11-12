# src/editor/roadTop.ts
Lines: 94
Summary: The highest road node's solved height, kept per world cell from the diary's roads and elevation entries (a Derived product): only the cells an entry's rectangles reach are recomputed; a histogram of whole heights gives the top.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-14 imports; KINDS (roads, elevation); Source
- 16-43 RoadTop: byHeight histogram, top, the Derived of cells (all keys, dirty cells, compute, histogram counted on change)
- 45-58 height(): refresh; the top re-read from the histogram's keys only when cells changed; lastComputes
- 60-73 cellTop: the nodes inside the cell of the roads meeting it, their solved heights
- 75-80 allCells (@rebuild): every node's cell (first look, a map loaded, a whole solve)
- 82-93 dirtyCells: the cells a change's rects reach; a change without rects = every node's cell

## Contracts, state and data flow
- Per road edit, work proportional to the cells the edit's rects reach; an 'elevation' entry without rects (a whole solve) recomputes every cell of the map.

## Depends on / used by
- uses: world/derived Derived, world/cells, world/network segmentCells, world/doc; used by: main.ts / renderer (the camera's or the scene's top road height)

## Problems found (finding IDs)
- none here

## To check in other files
- world/elevation: does a road edit's solve write an 'elevation' entry with rects (local) or without (whole map, every cell here recomputed)?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/ceil : rounds toward +infinity (line 27: the whole-height buckets)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite : -Infinity is not finite (line 71)
- https://en.wikipedia.org/wiki/Incremental_computing : (redone research, replaces the Math.ceil filler) the Derived product recomputes only the cells an entry's rects reach; an elevation entry without rects (a whole solve) defeats it: every cell of the map recomputed (lines 83-87)
