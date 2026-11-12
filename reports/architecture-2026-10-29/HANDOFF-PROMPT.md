# Prompt for the next Claude Code session (paste everything below the line)

---

You are taking over the Roadcraft optimisation work. Speak to the owner in Brazilian Portuguese. Write everything in the project (code, comments, reports, commits) in English. Read `C:\Users\Jonathan\Documents\Projects\city\CLAUDE.md` and `roadcraft/CLAUDE.md` first and obey them.

## The goal (the owner's, non-negotiable)
Roadcraft is a city builder that will be sold on Steam. It creates buildings, lots, street furniture and other elements procedurally. The player must be able to:
- create, save, reopen and play a 10 km x 10 km city (~250,000 procedural buildings);
- do all of it fast on a mid-range PC (an RTX 3060-class GPU, 16-32 GB RAM);
- keep excellent graphic quality and every existing feature intact;
- use little CPU, RAM and GPU.

## What is forbidden (each was done before, and the owner caught it at the first real run)
- **Cooked/baked cities presented as the game working.** Seed 7 of "Nova metrópole" is read from pre-made files (`cooked/large-7.*`, `src/main.ts:2127-2131`). A result on seed 7 proves NOTHING about the player's path.
  - The player's path is a city grown live, saved, and reopened.
- **Fake elements:** boxes or flat planes standing in for buildings, fake roads, impostors or billboards for buildings or roads, staged scenes that only exist to pass a check.
- **Gamed evidence:** tests weakened, metrics massaged, features switched off to improve numbers, "it is the cache/environment" without proof.
- **Patches instead of the architecture fix.** The owner wants the real architecture, rebuilt where it is wrong.
- **Claiming you read or verified something you did not.** Say exactly what was read (files and line ranges) and what was not.

## CORRECTION FIRST: "Nova metrópole" is a 2.7 km city, not 10 km
- Its radius is 1,600 m (`src/world/cityGen/largeCity.ts`): a ~2.7 km grid, ~25,000 buildings.
- The 10 km city (~200,000 buildings) is the large city over a ~5,200 m radius: `node scripts/play.mjs large <seed> 5200`, or `?city=large&seed=<seed>&radius=5200` in a probes build (`src/main.ts:4350-4359`).
- Every measurement below from 2026-10-29 (10.1 GB, 5.9 GB) was taken on a 2.7 km city. The 10 km city was never opened by the previous session.
- Always state the radius and check a screenshot of the whole city.

## What happened (2026-10-27 to 2026-10-29)
- **27/10, 12h-15h:** the owner saw a ~200k-building city load at ~4 GB RAM, low CPU, GPU active. That city was seed 7, the cooked one, so it was never evidence that a grown city works.
- **28/10:** another session changed the code. The game then used 20 GB+, high CPU, low GPU, and the renderer died out of memory at every opening (`%APPDATA%/Roadcraft/problems/problems.log`, 20:54-22:32 local).
  - That session restored commits (the current HEAD equals `51c3de4c`, the 27/10 code) but never opened the game after restoring.
- **29/10 diagnosis, measured once in the real game window:**
  - The code is identical to 27/10, and `dist/desktop-jobs` matches it by hash.
  - A live-grown 10 km city (random seed) peaked at 10.1 GB within 31 s.
  - Seed 7 (cooked) loaded at ~5.9 GB.
  - The difference was cooked vs. grown, not cache or environment.
- **The seed trap:** "Nova metrópole" takes its seed from `localStorage['roadcraft.nextCitySeed']`, and every click replaces it with a random one (`src/main.ts:2169-2178`).
- **Save swap:** on 29/10, `%APPDATA%/Roadcraft/saves` was replaced by `saves-backup-2026-10-26-1958`. The save rewritten on 28/10 is kept in `saves-2026-10-28-reescrito`. The large city does not read `saves`.

## Findings so far, with evidence
Full detail is in `roadcraft/reports/architecture-2026-10-29/ARCHITECTURE.md` and `NOTES.md`. Re-verify each finding yourself.

- **D1: the whole map lives in the page's document, on the main thread.**
  - `RoadDoc` (`src/world/doc.ts:155`) holds every node and segment as JS objects (`:156-157`) and whole-map tables of buildings, lots, landscape, poles and wires (`:163-181, 293, 301`).
  - Opening replaces it whole and rebuilds the network whole (`src/editor/history.ts:190, 194`).
  - `fromJSON` builds every object and walks the whole map (`doc.ts:2952-2986`).
  - Loading re-files whole-map indices row by row (`doc.ts:549-582, 788-807`).
- **D2: tile streaming is dead code.**
  - `loadTile`, `unloadTile` and `tileRecords` (`doc.ts:1704-2041`) have no caller in `src/`, only in tests.
  - Commit `5de45028` (2026-10-21) removed the tile store, saying the tile path "never received a source in the game".
- **D3: buildings are stored expanded, not as parameters.**
  - 687 MB for 249,122 buildings (`src/editor/squaresDecode.ts:98-100`), about 2.75 KB each.
  - A record carries volumes, elements, cores, materials and furnishing (`src/world/buildings/types.ts:284-328`).
- **D4: a new city is assembled whole in one job and copied whole between processes** (`src/editor/cityInTiles.ts:20, 50, 54`; `main.ts:2158, 2223, 2257`).
- **D5: opening records "whole map changed" for every kind** (`doc.ts:2285-2290`), so every derived system starts from the whole map.
- **D6: the renderer is one 4,355-line main-thread closure** (`src/render/renderer.ts:451`).
  - It draws through three's WebGLRenderer by default (`:501`); WebGPU is a side option (`:480-500`).
  - It requests the road far level for the whole map (`:1241-1244`).
  - It walks every shadow caster every frame (`:744-862`).
- **D7: the simulation keeps its own whole-map copy** (by search, not read in full).
  - Sources: `src/sim/host/simClient.ts:430`, `src/nodeSimHost.ts:4`.
  - Meso traffic over the whole map with a micro window (`src/sim/world.ts:296, 762-778`) is correct in principle.
- **D8: save and open work on the whole map** (`doc.ts:2822-2906`; `squaresDecode.ts:158-213`).
- **Earlier review findings, all marked "suspected":** `roadcraft/.whole-review/FINDINGS.md`, F-0001 to F-0021. Examples:
  - F-0013: every road edit solves the whole map's road heights (`src/editor/editRules.ts:66`).
  - F-0010: the profiler records from the start (`src/core/profiler.ts:75`).
  - F-0007: RTX x060 cards start on the ultra tier (`src/core/gpuTier.ts:9`).

## Research already done (re-check and deepen it)
- **Generate from rules, store parameters.**
  - CGA shape grammar (Müller, Wonka et al., SIGGRAPH 2006): https://course.ccs.neu.edu/cs5150f13/readings/muller_buildings.pdf
  - GPU generation and rendering of whole cities per view, with LOD as grammar depth (real geometry, not impostors), up to 100 fps (Steinberger et al., Eurographics 2014): https://diglib.eg.org/handle/10.1111/v33i2pp105-114
- **Cells streamed around the camera.** City Sample / World Partition: https://dev.epicgames.com/documentation/unreal-engine/city-sample-project-unreal-engine-demonstration
- **Simulation and representation LOD** (Mass): https://dev.epicgames.com/documentation/unreal-engine/overview-of-mass-gameplay-in-unreal-engine
- **Hybrid meso/micro traffic** (Burghout et al.): https://trid.trb.org/view/777686
- **What fails at city scale.** Cities: Skylines II autopsy (40 ms of shadows, 6,705 draw calls, no LOD on props, no occlusion culling): https://blog.paavo.me/cities-skylines-2-performance/
- **GPU-driven rendering:**
  - indirect draws: https://toji.dev/webgpu-best-practices/indirect-draws
  - Hi-Z occlusion culling: https://www.rastergrid.com/?p=85
  - three.js focuses on WebGPURenderer, no larger new WebGL features: https://threejs.org/manual/en/webgpurenderer.html
- **Electron/V8 heap cap** of 4 GB per process (ArrayBuffers counted apart): https://www.electronjs.org/blog/v8-memory-cage

## Target architecture (to be confirmed by your own deeper research)
1. **Data:** a building = lot + rule/style + seed + height/use/age/wear (+ the player's overrides). Everything whole-map is compact typed columns (tens of MB for 10 km).
2. **Cells:** one cell grid keys data, generation, rendering, simulation windows and saving. Only cells near the camera are expanded, under fixed budgets (LRU). No path replaces "the whole map" as one unit.
3. **Generation on demand:**
   - Deterministic per cell in workers or GPU compute, with LOD as derivation depth.
   - Creating a city makes roads, lots and parameters only, per tile in parallel, with no whole-city assemble step and no cooked city.
4. **Ownership:** the simulation owns dynamic state in SharedArrayBuffer typed arrays, off the page. The page renders and runs the UI. No second whole-map document per process.
5. **Renderer:** WebGPU, compute culling (frustum + Hi-Z), indirect instanced draws of building modules, shadows by size and distance, a fixed GPU memory budget, independent layers fed by cell data.
6. **Save:** parameters and edits per dirty cell. Opening expands only the visible cells.

## Your task, in this order
1. **Research the correct architecture in depth.** Use official documentation and papers (WebGPU/three.js r186 as installed, Electron 44, procedural city papers, shipped city builders). Cite every source.
2. **Read in full, to the last line, every file on the performance path**, at least:
   - `src/main.ts`, `src/render/renderer.ts`;
   - `src/render/buildings/*` (`buildingMesh.ts`, `layer.ts`, `massCells.ts`, `cellInstances.ts`);
   - `src/world/buildings/*`, `src/world/growth/*`, `src/world/network*.ts`, `src/world/elevation.ts`;
   - `src/editor/{persistence,chunkedSave,saveStore,squaresDecode,preparedCity,cityTiles,smallCityMap}.ts`;
   - `src/cityGen.worker.ts`, `src/cityGrowth.worker.ts`;
   - `src/sim/world.ts`, `src/sim/host/*`, `src/nodeSimHost.ts`, `src/desktopSim.ts`, `src/jobs/*`;
   - `desktop/*.cjs`.

   Log each file and line range in `reports/architecture-2026-10-29/READ-LOG.md`.
3. **Complete the report** (`ARCHITECTURE.md`): every architectural problem with path:line, its effect at 10 km, and the replacement design. Answer the open questions: the exact parameter set of a building, and whether the generator is deterministic.
4. **Rebuild the architecture**, not patches, in small committed steps. After each step:
   - run `npm run typecheck` and the lint;
   - commit;
   - publish per the memory rule (`push-roadcraft-2-0.md`: orphan `publish` branch without `reports/`).
5. **Verify in the real game window** (`npm run dev` + `npm run desktop:dev`, scripts in `scripts/inGame.mjs`):
   - Create a NEW 10 km city with a random seed (never seed 7): radius ~5,200 m, NOT the menu's "Nova metrópole" (2.7 km); confirm its size on a screenshot of the whole city.
   - Save it, close the game, reopen it, play it.
   - Measure RAM, CPU and GPU per process once.
   - Take screenshots and look at them.
   - Report the city size every time.
   - A slow or heavy result is a goal not met, not a "pending item".

## Working rules from the owner
- Find problems by reading code, not by endless measurements.
- No visible change: nothing disappears, moves or changes material.
- Do the work yourself.
- Do not stop to ask; decide.
- Be honest about what was and was not done.
