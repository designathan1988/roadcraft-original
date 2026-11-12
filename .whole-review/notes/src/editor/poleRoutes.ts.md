# src/editor/poleRoutes.ts
Lines: 199
Summary: The pole lines' route graph (stations every 2 m along the footway contours, spans across the streets of a region) in typed arrays, and Dijkstra over it with a heap, integer micrometre costs and ties broken by place, reusing scratch arrays wiped only where a run reached.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-35 imports; RouteGraph (stations x/y/s/contour, runs, spans CSR, scratch); STATION_STEP 2 m, CROSSING_COST 8 m, SPAN_LANDING 1 m
- 37-47 stationsAround: binary search of a run's arc lengths
- 49-80 buildRouteGraph: every contour edge's start plus its 2 m grid crossings as stations; typed arrays from the lists
- 81-110 stationAt; spans: each street of the region with a sidewalk sampled every 2 m, both kerb landings found on the contours (on a footway), deduplicated by station pair, kept within MAX_POLE_SPACING
- 111-122 spans as CSR (spanStart/spanTo/spanLength); scratch arrays
- 124-154 route: START/END nodes; reachOf/touched; placedBefore (ties by place); heap by cost; relax in whole micrometres
- 155-197 the search loop (run neighbours, spans + crossing cost, the end), the reached box when no route, the path; finally the touched scratch wiped

## Contracts, state and data flow
- A graph per pole planning region (its stations proportional to the contours' length in the region); each run's search costs only the stations it reaches (scratch reused).

## Depends on / used by
- uses: core/heap, core/vec2, world/network ribbons and segmentCells, world/poleLines, world/utilities MAX_POLE_SPACING; used by: editor/poles.ts (planning runs)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://en.wikipedia.org/wiki/Dijkstra%27s_algorithm : O((E+V) log V) with a binary heap, stale entries skipped after extraction (lines 155-175)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from : a new typed array filled from the list (lines 80, 119)
- https://v8.dev/blog/pointer-compression : (redone research) the stations are first gathered in plain number arrays (lines 52-75: doubles stored as heap numbers when not Smis) then copied to typed arrays; a region's graph is built once per lines object, the per-move cost is the search only
