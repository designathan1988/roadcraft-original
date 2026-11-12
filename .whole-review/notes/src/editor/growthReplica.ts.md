# src/editor/growthReplica.ts
Lines: 291
Summary: The growth worker's side: a replica of what the growth reads (neighbour buildings decoded from shared tables, roads and kerb rings filed in cells, the lot's ground and paving), fed incrementally by the page; each ask grows the first lot and then the nearest open lots of the region (up to 32), a read outside what was sent being a miss the page answers by resending with a margin.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-20 imports; the module's contract (off the page's thread; what the worker keeps; misses)
- 22-60 RoadPiece, JunctionPiece, GrowthSync (buildings put/drop/reset as shared-table refs; roads segments/junctions put/drop/reset)
- 62-106 GrowAsk (lot, stream, seed, most, nextId, count, last, region, reach, ground, paving, paved, flags); Grown; GrowAnswer; BATCH_MOST 32
- 108-112 GrowthMiss; within
- 114-160 NeighbourReplica: Map + BuildingGrid of settled neighbours; own grown buildings dropped at the next sync (the page sends them back); reset/drop/put (decoded from tables, only the neighbour kept); near throws a miss outside the covered rects
- 162-231 RoadReplica: ribbons rebuilt from the page's xy (Polyline.fromFlat), records with structure, cell filings for roads and kerbs; idsMeeting checked against the covered rect; apply/reset/drop
- 233-243 pavedLookup: the page's sampled points by a string key, else the handed-over paving reader; a miss otherwise
- 245-290 GrowthReplica.handle: sync applied, covered set, ground and paving readers; loop: designOnLot, the grown building added as a neighbour, next lot = nearest open lot of the region while the last building is far enough inside it; answer with timing

## Contracts, state and data flow
- The replica is never trimmed except by the page's drops/resets: every building and road sent stays held for the worker's life (one neighbour per building, one polyline per road), so for a city grown whole it holds a neighbour for every building and a copy of every road centreline met.
- Each ask's work: designOnLot per lot (the heavy part), bounded by BATCH_MOST.

## Depends on / used by
- uses: core/polyline, core/rng, world/cells CellFiling, world/groundPatch, world/paving, world/buildings grid/neighbours/recordTable, world/growth/zoning; used by: growth.worker.ts (the worker), editor/growthFeed (types)

## Problems found (finding IDs)
- none confirmed: the replica's size is proportional to the area grown (a neighbour summary per building, not the record), the expected cost of growing off the page.

## To check in other files
- world/buildings/neighbours settledNeighbour: how big a Neighbour is (for the worker's memory over a 10 km city).
- growth.worker.ts / growthPool: whether the growth worker lives after the city is grown (its replica then idle memory).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer : posted as a handle to the same memory, needs cross-origin isolation (lines 49-50, 151-152)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map : strong references kept until deleted or cleared; SameValueZero keys (lines 116, 167-171, 235-236)
- https://v8.dev/blog/pointer-compression : (redone research) doubles in object fields are boxed under pointer compression: every road piece rebuilt as a Polyline (line 205) and every ring point as {x, y} objects (line 213) costs heap objects per coordinate in the growth worker, held for its whole life (the replica is never trimmed)
