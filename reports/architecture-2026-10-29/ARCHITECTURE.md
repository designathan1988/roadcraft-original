# The architecture a 10 km procedural city needs, and where Roadcraft departs from it

Date: 2026-10-29. Author: Claude (Opus 5.5), at the owner's order.
Goal (the owner's words, summarised): a city builder that creates, opens, saves and plays a 10 km x 10 km city (~250,000 procedural buildings) fast, with high graphic quality and low use of CPU, RAM and GPU on a mid-range PC, with every element real (no cooked city, no box or fake road standing in for a building or a road).

Companion files: `NOTES.md` (observations with path:line, in reading order), `READ-LOG.md` (every source file and its size).

---

## 0. What this report rests on (read in full vs. not)

Read in full, every line:
- `src/world/doc.ts` (3,943 lines), the map's document.
- `src/editor/cityInTiles.ts` (56 lines), how a new city is grown.

Read in part (ranges in `NOTES.md`):
- `src/main.ts` 955-1004 and 2086-2285 (map opening, new city).
- `src/editor/history.ts` 150-208 (`restoreInto`).
- `src/editor/squaresDecode.ts` 90-139.
- `src/render/renderer.ts` 1-1250 of 4,355.

Located by search only, NOT read in full (claims about them below are marked "by search"):
- Building geometry: `render/buildings/buildingMesh.ts`, `layer.ts`, `massCells.ts`.
- Simulation: `sim/world.ts`, `sim/host/simClient.ts`, `nodeSimHost.ts`.
- Saving and loading: `editor/persistence.ts`, `chunkedSave.ts`.
- Generation workers: `cityGen.worker.ts`, `cityGrowth.worker.ts`.

These must be read in full before any rebuild of their part starts.

---

## 1. What the research says the right architecture is

### 1.1 Store the rules and the parameters, generate the geometry where it is seen

- Procedural buildings are produced by rule sets (shape grammars).
  - The CGA shape grammar evolves a mass model into facades and details by split and repeat rules ([Müller, Wonka et al., "Procedural Modeling of Buildings", SIGGRAPH 2006](https://course.ccs.neu.edu/cs5150f13/readings/muller_buildings.pdf)).
  - A building is therefore fully described by its lot, its rule (style) and a seed. The geometry is a function of those.
- Steinberger, Kenzel, Kainz, Wonka and Schmalstieg (Eurographics 2014) generate AND render cities on the GPU in the same frame loop.
  - Generation is limited to what the view needs, by visibility pruning and adaptive level of detail of the grammar itself.
  - The derivation is reused between frames.
  - They report thousands of buildings at up to 100 fps. Generating the geometry was faster than copying pregenerated data from memory for detailed scenes. One figure shows 28 km² visible with up to 47,000 buildings.
  - Sources: [diglib record](https://diglib.eg.org/handle/10.1111/v33i2pp105-114), [summary](https://experts.azregents.edu/en/publications/on-the-fly-generation-and-rendering-of-infinite-cities-on-the-gpu/).
- Their level of detail is the grammar stopped earlier: a coarser derivation of the same building. It is real geometry, not an impostor.
- The general pattern for procedural worlds: content is a deterministic function of (seed, cell coordinates). Only a neighbourhood around the viewer is expanded, and the player's edits are stored on top of the generated base ([Teinemaa et al., PCG workshop](https://pcgworkshop.com/archive/teinemaa2015procedurl.pdf)).
- Consequence for the save:
  - A building costs a few tens of bytes: lot, rule, seed, height, age, wear.
  - Its geometry is never saved. Opening a city reads parameters, not geometry.

### 1.2 Partition the world into cells; expand only the cells near the camera

- Unreal's City Sample (the Matrix Awakens city) shows how a large city is handled:
  - The city is divided into grid cells (World Partition). Cells are loaded and unloaded automatically as the player moves. On open, no cell of the big city is loaded ([Epic, City Sample docs](https://dev.epicgames.com/documentation/unreal-engine/city-sample-project-unreal-engine-demonstration)).
  - That city was generated offline in Houdini. Roadcraft must generate at runtime, which is exactly what 1.1 covers.
- What must exist for the whole map is only the compact layer:
  - the road graph;
  - lots and building parameters in typed columns;
  - aggregate simulation state.
- Geometry, micro simulation and detailed derived data exist only for active cells, under fixed budgets (an LRU of cells).

### 1.3 Simulation: data-oriented, off the page, with levels of detail

- Cities: Skylines II's CPU side (Unity DOTS/ECS, Burst, jobs across cores) was judged its strength ([Huhtala, "Why Cities: Skylines 2 performs poorly"](https://blog.paavo.me/cities-skylines-2-performance/)).
  - Data-oriented storage means structure-of-arrays in contiguous memory, processed by systems.
  - In JavaScript that means typed arrays, shared between threads with SharedArrayBuffer ([MDN, typed arrays](https://developer.mozilla.org/en/javascript_typed_arrays)).
- Simulation level of detail comes in two independent kinds:
  - Simulation LOD: update rate and model per distance, with a cap per level.
  - Representation LOD: how an agent is drawn.
  - Source: [Epic, Mass Gameplay overview](https://dev.epicgames.com/documentation/unreal-engine/overview-of-mass-gameplay-in-unreal-engine).
- For traffic, the established method is hybrid ([Burghout, Koutsopoulos, Andréasson](https://trid.trb.org/view/777686)):
  - a mesoscopic model over the whole network;
  - microscopic simulation only in an area of interest, with consistent hand-over at the boundary.
- Memory limit that decides the process layout:
  - Electron's V8 heap is limited to 4 GB per process (pointer compression). ArrayBuffers are counted separately ([Electron, V8 memory cage](https://www.electronjs.org/blog/v8-memory-cage)).
  - Since V8 9.2, the total heap of all threads in a process shares that cap ([V8 release 9.2](https://v8.dev/blog/v8-release-92)).
  - Whole-map data must therefore live in typed arrays, not JS objects. A whole-map copy must never be duplicated per process.

### 1.4 Rendering: draw only what is seen, at the detail it is seen

- The Cities: Skylines II autopsy ([Huhtala](https://blog.paavo.me/cities-skylines-2-performance/)) shows what fails:
  - About 88 ms per frame, ~40 ms of it in cascaded shadows.
  - 6,705 draw calls, 72% of them for shadows.
  - ~121 M input vertices.
  - Props and characters without LOD, only frustum culling, no occlusion culling.
  - ~60 MB of instance data rebuilt and uploaded every frame.
  - The author's remedies: LOD for everything, occlusion culling, more aggressive distance culling, shadow casters limited by size and distance.
- GPU-driven rendering:
  - A compute pass culls (frustum and Hi-Z occlusion) and writes indirect draw arguments. The CPU no longer walks objects ([WebGPU indirect draw best practices](https://toji.dev/webgpu-best-practices/indirect-draws); [Imagination, GPU-controlled rendering](https://docs.imgtec.com/sdk-documentation/html/whitepapers/GPUControlledRendering.html)).
  - Hi-Z occlusion is conservative: it never culls something visible. It pays off with many objects in large scenes ([RasterGrid, Hi-Z culling](https://www.rastergrid.com/?p=85)).
- Repeated parts are drawn as instances: windows, doors, balconies, cornices, street furniture. Each building is then a set of instance records, not a unique mesh.
- Engine path: three.js states that it focuses on WebGPURenderer and plans no larger new features for WebGLRenderer ([three.js manual, WebGPURenderer](https://threejs.org/manual/en/webgpurenderer.html)). BatchedMesh gained indirect drawing in r182 ([release notes](https://newreleases.io/project/github/mrdoob/three.js/release/r182)).
- What is honest to say about "no impostors":
  - Every reference above uses levels of detail.
  - Drawing all 250,000 buildings at full detail at every distance is exactly the Cities: Skylines II failure.
  - The way that keeps every element real is the level of detail of 1.1: the same building's rules stopped at a coarser step. That is real geometry of the real building, generated from its own parameters. It is not a box, a billboard or a baked picture.

### 1.5 The target, in one picture

| Layer | Whole map (always resident) | Active cells only (near camera, budgeted) |
|---|---|---|
| Data | road graph, lots, building parameters (lot, rule, seed, height, age, wear) as typed columns; player edits | none |
| Generation | none | grammar derivation per cell in workers (or GPU compute), LOD by derivation depth, cached per cell with an LRU |
| Simulation | meso traffic, economy, demand (aggregates per road and per cell) | micro agents (cars, people) in a window |
| Rendering | coarse terrain plus road network far level (from the graph) | instanced modules, GPU culling (frustum + Hi-Z), shadows by size and distance, fixed GPU memory budget |
| Save | parameters and edits, written per dirty cell | nothing (regenerated) |
| New city | roads, lots and parameters generated per tile in parallel; no geometry | geometry appears only when a cell is seen |

---

## 2. Where Roadcraft departs from it (evidence)

D1: the whole map lives in the page's document, on the main thread. Verified by full reading.
- `RoadDoc` (src/world/doc.ts:155) holds every node and segment of the map as JS objects (doc.ts:156-157).
- Buildings, lots, landscape, poles and wires are whole-map tables wrapped as maps (doc.ts:163-181, 293, 301).
- Opening a map replaces the document whole and rebuilds the network whole (src/editor/history.ts:190, 194).
- `fromJSON` builds every node and segment object (doc.ts:2952-2984) and walks the whole map (doc.ts:2986).
- Loading re-files whole-map spatial indices in one loop over every row (doc.ts:549-582, 788-807; 513,411 landscape items in the 10 km city, doc.ts:735).

D2: the tile streaming of the document is dead code. Verified.
- `loadTile`, `unloadTile`, `tileRecords` and `leaveTiles` (doc.ts:1704-2041) have no caller in `src/`. Only tests call them.
- Commit `5de45028` (2026-10-21) removed the tile store (tileStore.ts, 781 lines; tileBlob, tileMigrate, worldMeta). Its message says the tile path "never received a source in the game".
- Since then the game has one mode: the whole map in the page, trimmed afterwards by windows (network window, input residency, view cells).
- This is the opposite of 1.2.

D3: buildings are stored as their expanded result, not as their parameters. Verified in the code read.
- The 10 km city's building tables are 687 MB for 249,122 buildings (src/editor/squaresDecode.ts:98-100), about 2.75 KB per building.
- A building record carries its volumes, elements, cores, materials and furnishing (src/world/buildings/types.ts:284-328).
- 1.1 says a few tens of bytes. This alone multiplies memory, save size, load time and every copy between processes.

D4: a new city is assembled whole and moved whole. Verified.
- The layout of the whole map runs in one job (cityInTiles.ts:32). The tiles are grown in parallel (:36-49).
- Every tile's tables are then posted to one 'assemble' job (:50). The page receives the whole city in one reply (:54) and loads it whole (main.ts:2223, 2257).
- Jobs are posted with no transfer list (cityInTiles.ts:20), so the buffers are copied between processes.
- The result is cached whole in IndexedDB (main.ts:2158).
- The first "Nova metrópole" (seed 7) is read from cooked files (main.ts:2127-2131, 2173-2174). That is not the player's path.

D5: opening writes "the whole map changed" for every kind. Verified.
- `replaceWhole` records a whole-map change for every kind (doc.ts:2285-2290).
- Every derived system therefore starts from the whole map, then trims to the view.

D6: the renderer is one 4,355-line main-thread closure with whole-map products. Read 1-1250.
- `createSceneRenderer` (render/renderer.ts:451) owns terrain, roads, structures, furniture, poles, signs, transit, agents, effects and shadows.
- The network's far level is requested for the whole map at opening (renderer.ts:1241-1244).
- Every frame walks every shadow caster of the scene to detect changes (renderer.ts:744-862). This is CPU work proportional to the scene, not to what changed.
- The game draws through three's WebGLRenderer (renderer.ts:38, 501). The WebGPU path is a side option (`?gpu=webgpu`, renderer.ts:480-500).
- So the GPU-driven culling of 1.4 (compute and indirect draws) is not available on the default path.

D7: the simulation keeps its own whole-map copy. By search, not read in full.
- The simulation process follows a copy of the map's document, sent by the diary's changes "or the whole map" (src/sim/host/simClient.ts:430).
- It holds "the whole map's lane graph, walkways and network" in its own process (src/nodeSimHost.ts:4).
- The meso drives the whole map with a micro window (src/sim/world.ts:296, 762-778). That part matches 1.3.
- The whole map is therefore held at least twice (page and simulation), each with the expanded building data of D3.

D8: saving and opening work on the whole map on the page. Partly verified.
- `serialized` writes every node and segment of the map (doc.ts:2872-2906). `toText` makes one string of the whole map (doc.ts:2822-2832).
- Opening a saved city decodes every square (squaresDecode.ts:158-213, from the earlier review's note; not re-read).

D9: edits solve whole-map work. Earlier review finding F-0013, not verified by me.
- Every road edit's rules solve the whole map's road heights from scratch (src/editor/editRules.ts:66).

---

## 3. What must be rebuilt (no patches)

In order of dependency:

1. **Data model.**
   - A building becomes its parameters: lot, rule/style, seed, height, use, age, wear, plus the player's own overrides when the player edits it in the Builder. This replaces the stored expanded record (D3).
   - Lots, roads, poles and landscape stay as typed columns.
   - The whole-map layer must fit in tens of MB for 10 km.
2. **Cells as the unit of everything.**
   - One cell grid (the project's 250 m cells / 1 km tiles) keys data, generation, rendering, simulation windows and saving.
   - The page holds the compact whole-map columns plus only the expanded cells near the camera, under a fixed budget (D1, D2).
   - No code path may replace "the whole map" as one unit (D5).
3. **Generation on demand.**
   - The rule engine (the existing building generators) runs per cell in workers, deterministically from parameters, with LOD as derivation depth.
   - Its output is instance records and per-cell batches, never stored in the save.
   - Creating a city produces only roads, lots and parameters, per tile in parallel, with no whole-city assemble step (D4) and no cooked city.
4. **One owner per piece of data, off the page.**
   - The simulation owns the dynamic state in SharedArrayBuffer typed arrays.
   - The page renders and runs the UI from shared memory or snapshots.
   - No second whole-map document per process (D7). The 4 GB V8 cage per process makes this mandatory.
5. **GPU-driven renderer.**
   - WebGPU (three's WebGPURenderer).
   - Compute culling (frustum + Hi-Z) and indirect instanced draws of building modules.
   - Shadow casters limited by size and distance.
   - A fixed GPU memory budget.
   - The renderer split into independent layers fed by cell data, not one 4,355-line closure (D6).
6. **Save per dirty cell of parameters and edits.**
   - No whole-map JSON on the page (D8).
   - Opening reads the compact layer and expands only the cells in view.

## 4. What is still unknown

- The exact parameter set that reproduces today's buildings deterministically. It depends on `world/buildings/*`, `world/growth/lotPlan.ts` and `render/buildings/buildingMesh.ts` (4,719 lines), none read in full yet.
- Whether today's generator is deterministic from (lot, seed, rule) alone.
- The memory of the whole-map compact layer for 10 km: to be computed from the column sizes once the parameter set is fixed.
- How much of the renderer's per-layer cell systems (cellInstances, propCells, massCells) can be kept as layers fed by the new cell data. This needs their full reading.
