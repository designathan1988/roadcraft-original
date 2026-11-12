# Whole-map work: the complete inventory (2026-10-26)

This list comes from a mechanical scan of `src` (`whole-map-scan.txt`, 214 hits) for every walk over a kind of the document (`buildings.all()`, `lotStore.all()`, `landscape.values()`, `poles.values()`, `segments`, `nodes`, `ribbons`, `junctions`, `toJSON()`, `tableRecords(`). Every hit was read in its context. It excludes the `sim/`, `lab/` and `*.worker.ts` files: those run off the page.

Each hit falls into one class:

- **A**: work proportional to the whole map, done on the page at the opening, in a frame or at an edit, that decodes records or builds per-record state.
- **B**: bounded or legitimate: the generator, a worker, a cell's own records, or comments.
- **C**: a false positive: a field named `lots`, a `toJSON` of something else.

The fix for every A item follows the plan in `reports/root-architecture-plan-2026-10-26.md`. A product is built from the tables' columns without decoding, or only for the cells near the view, or off the page.

## A: the items and what became of each

| # | Where | Finding after reading the code | Result |
|---|---|---|---|
| A1 | `render/buildings/layer.ts` | every building decoded to file the town at a map's opening | **Rebuilt** (`09142c09`): record tables format 3 with summary columns (`world/buildings/summary.ts`); the layer files the town from them (`TownColumns.fileRow`, `BuildingStore.eachSummarised`). Spec `tests/render/townColumnsSummary.spec.ts`. |
| A2 | `render/gardenLists.ts:73` | `gardenLists` is used by tests only; the game draws the gardens per cell (`gardens.ts` `createGardenCells`, `buildings.near` of the cell) | **Not on the page's path** (class B). |
| A3 | `world/buildings/decayWatch.ts` | every building decoded at the first look; and every tenth of wear wrote the whole record again as an object on the page (the whole city as objects after a month of city time) | **Rebuilt** (`4d8b139e`): the wear is a field written over the table row (`TableItems.writeField`), carried by the worker refs, the sections, the binary map and the save's wear squares; the decay watch reads `builtAt` from a summary column. Spec `tests/world/wearField.spec.ts`. |
| A4 | `world/buildings/siteGrading.ts` | at the first stroke of the land every building decoded and its platform worked out to file the town's platforms (skipped on level land) | **Rebuilt** (`1ca12b76`): platforms filed a square of 125 m at a time when a shaping reads it (`storePads`), from the buildings' grid; a site's digest taken when its ground is graded. Spec in `tests/world/siteGrading.spec.ts` (lazy == every platform filed at once, before and after edits; no decode). |
| A5 | `world/openLots.ts` | every lot decoded and held as an object from the growth's first look | **Rebuilt** (`3d781c03`): slots hold numbers; lots tables gain summary columns (`world/lotSummary.ts`). Spec in `tests/world/openLots.spec.ts`. |
| A6 | `world/lots.ts` planAll | runs in the simulation's worker (`SimHost.lotPlan`) and in the generator | **Off the page** (class B). |
| A7 | `world/lots.ts` cutLotsByRoads | a road edit on a network built from nothing cut every lot of the map on the page | **Rebuilt** (`826846f8`): the edit's own rectangles always (`roadEditRects`, a diary cursor taken before the edit). Spec in `tests/editor/lotsCutByRoad.spec.ts`. |
| A8 | `render/streetFurnitureLayer.ts:284`, `world/streetFurniture.ts:118` | `furnitureProduct` and `streetFurniture()` are used by tests only; the game places the furniture per cell (`furnitureAbout`, `landscapeIn` of the cell) | **Not on the page's path** (class B). |
| A9 | `render/poleLayer.ts:111` | `fill` builds the warm-up scene (2 poles) and the editor's preview; the game uses `PoleCells` by block near the view; the document's pole index is filed from the columns | **Not on the page's path** (class B). |
| A10 | `editor/lotTool.ts` drawAllLots | every lot's overlay group made at each change of the tool's mode or zone colour, the zones shown far past the far plane | **Rebuilt** (`71129c61`): groups for the 250 m cells the view sees (`groundSeen`); zoned lots counted from the summary columns. Spec in `tests/editor/lotOverlayKey.spec.ts`. |
| A11 | `editor/persistence.ts:128` | the whole-text save runs only without IndexedDB; the desktop always has it (`defaultParts`) and saves by squares | **Not on the game's path** (class B). |

## Found while reading, not in the scan

| Where | Finding | Result |
|---|---|---|
| `editor/chunkedSave.ts` membersOf | every save that wrote a square walked every id of its layer (700,000 buildings, lots and landscaping items on the 10 km map) | **Rebuilt** (`60f9ea9e`): each layer answers the ids in a rectangle from its own index by place (`KeyedSpec.idsIn`). Spec in `tests/editor/chunkedSave.spec.ts`. |

## Structural phases

| # | What | Result |
|---|---|---|
| S1 | road surfaces' inputs | Already per cell round the view (`roadSurfaceInputs.ts` `ViewCells`, dormant items) and, with the network window, over the tiles near the view only: no whole-map page work. Deriving the shapes in a worker would need a replica of the window's network there (the shapes read the junctions and roads two and three hops round each piece). **Not done.** |
| S2 | the city grown by tiles on the job workers | **Done** (`75fb8a07`). Spec `tests/editor/cityTiles.spec.ts`. |
| S3 | nodes, segments and barriers in tables | The 10 km city has 52,333 segments: they are read on the network's hot path (`doc.node`, `incident`) at every build. A table decoded when read would slow every road edit and build; the gain is tens of MB. **Not done.** |
| S4 | undo as a log of diffs | **Already so**: `RoadDoc.beginEdit`/`endEdit` record the records an edit wrote (`DocPatch`); only a whole map replaced keeps an image, its tables shared. |
| S5 | the save written off the page, the changed squares alone | **Done**: the squares' members found by place (`60f9ea9e`); rows copied without decoding; compression and the write in the save worker. |

## Still proportional to the roads on the page (one pass at a load)

- `world/tileIndex.ts` fileAll, `main.ts` worldBounds (camera fit), `editor/roadTop.ts` allCells, the simulation's start (`trafficMapOf`: nodes and segments as records; buildings and lots as their tables).
