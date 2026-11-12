# src/editor/smallCityMap.ts
Lines: 134
Summary: A whole city made on one document in a worker: planned (small or large plan), laid out (footways, network, lots, green, zones), every lot grown on flat ground; either written out whole as JSON (buildCityMap) or with its buildings spilled into a table as they grow (buildCityTable, the page's PreparedCity), or laid out only for the tile growth (layoutCityOf).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-18 imports; GROWTH_SEED
- 20-33 buildSmallCityMap, buildLargeCityMap, buildCityMap (growCity then toJSON: every building as an object)
- 35-43 buildCityTableOf; SPILL_AT 4096, SPILL_KEEP 1024
- 45-70 buildCityTable: shared members; buildings spilled to the page's table every 4,096 held (the newest 1,024 kept as neighbours); the document written with its other kinds as tables apart
- 72-82 layoutCityOf: plan, layCity, layOut (no growth)
- 84-101 layOut: footways widened, a network built (whole), lots planned and applied, the planner let go, green, a second rebuild, zones
- 103-114 growCity: layCity; interning off; spilling to a table when asked; layOut; growLots; the last spill
- 116-133 growLots: the road elevation solved once on flat ground (whole network), pavedAt from it; up to 3x open lots + 50 tries of growOnLot, each grown building stamped (a copy put back)

## Contracts, state and data flow
- Runs in a worker (cityGen.worker); the whole network, the elevation and the document live in that worker's heap during generation.
- V8 9.2+: all isolates in a process share one 4 GB pointer-compression cage (the page and its workers together), the reason a 160,000-building city as objects (~20 KB a building) broke the worker; the spill to tables keeps the buildings off the heap.
- buildCityMap (whole JSON, every building an object) is still exported: its callers decide whether that path is used for large cities.

## Depends on / used by
- uses: world/elevation, world/lots, world/network, world/paving, world/roads/footwayRise, world/buildings intern/spilledItems, world/cityGen plans, world/growth/zoning, editor/cityGenerator, editor/preparedCity; used by: cityGen.worker (buildCityTableOf, layoutCityOf), editor/cityTiles (growLots), probes/scripts (buildSmallCityMap/LargeCityMap)

## Problems found (finding IDs)
- none here

## To check in other files
- callers of buildLargeCityMap / buildCityMap (a large city as one JSON of objects would exceed the shared cage).
- jobs/jobPool: which jobs run in page workers (sharing the page's 4 GB cage) and which in utility processes (their own cage each, their own process memory).

## Sources
- https://v8.dev/blog/v8-release-92 : since V8 9.2 all isolates in a process share one 4 GB cage; the total heap of all threads in a process is capped at 4 GB (lines 45-51)
- https://www.electronjs.org/blog/v8-memory-cage : Electron's V8 heap is capped at 4 GB with pointer compression; ArrayBuffers counted separately with their own limits (the tables kept as buffers, lines 52-69)
- https://v8.dev/blog/pointer-compression : the cage layout and doubles boxed in object fields (why records as objects cost ~20 KB a building, line 49)
