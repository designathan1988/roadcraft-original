# Working notes of the architecture analysis (2026-10-29)

Scope (the owner's order): the files that decide performance of creating, opening, saving and playing a 10 km city, each read in full. Every note cites path:line read.

## Read so far (full ranges)
- src/main.ts 955-1004, 2086-2285 (city open path; applySnapshot)
- src/editor/cityInTiles.ts 1-56 (whole file)
- src/editor/history.ts 150-208 (restoreInto)
- src/editor/squaresDecode.ts 90-139
- src/world/doc.ts 1-3943 (whole file)
- src/render/renderer.ts 1-1250 (paused here: owner asked for the research first)

## Observations
- A1 One authoring document for the whole map lives on the page's main thread: `RoadDoc` (src/world/doc.ts:155). Roads are JS objects for the whole map (`nodes`/`segments` RecordMaps, doc.ts:156-157); buildings, lots, landscape, poles, spans are binary tables of the whole map wrapped as maps (`TableItems`, doc.ts:163-181, 293, 301).
- A2 Opening any map replaces that document whole (`replaceFromJSON(..., whole: true)`, history.ts:190) and rebuilds the network whole (`net.rebuild({ full: true })`, history.ts:194).
- A3 Loading tables re-files whole-map spatial indices on the page, one loop over every row of the map: poles/spans (`refilePoles`, doc.ts:549-582), landscape (`refileLandscape`, doc.ts:788-807, 513,411 items in the 10 km city per doc.ts:735), and max-id scans over every key (doc.ts:522-526, 767-769).
- A4 New city generation: layout of the whole map in one job (cityInTiles.ts:32), tiles grown in parallel in 4 phases (:36-49), then EVERY tile's tables posted to one 'assemble' job (:50) and the whole city returned as one reply (:54) that the page loads whole. Jobs posted with `transfer: []` (:20): whole-city buffers copied between processes.
- A5 Saved-city opening: building tables of the 10 km city are 687 MB for 249,122 buildings (squaresDecode.ts:98-100), ~2.75 KB per building; the full procedural result of each building (volumes, elements, cores, materials, furnishing: world/buildings/types.ts:284-328) is stored, not the few parameters that generate it.
- A6 Seed 7 ("Nova metrópole" first city) is read from cooked files (main.ts:2127-2131, 2173-2174); any other seed is grown live (main.ts:2134). Generated cities are also cached whole in IndexedDB (`keepDerivedDurably`, main.ts:2130, 2158).
- A7 Two designs coexist in RoadDoc. A tile-streaming design exists (`loadTile`/`unloadTile`/`tileRecords`, doc.ts:1646-2041; comment doc.ts:1648 "the page holds the tiles near the camera, never the world"), but the paths that open a city (`restoreInto` → `replaceFromJSON(whole)`, history.ts:190; `replaceWhole`, doc.ts:2281-2291) put the WHOLE map into the page's document. `leaveTiles` (doc.ts:1842) "the streamed world closed": streaming is a mode that a whole-map opening turns off.
- A8 `replaceWhole` writes one whole-map change entry for every kind (doc.ts:2285-2290): every derived product (render cells, network, sim, gardens, poles...) is told the whole map changed and rebuilds against the whole map.
- A9 `clone()` copies every node and segment of the map (doc.ts:2222-2227); `replaceWith` from a non-fork source compares the whole map (`roadDifferences`, `itemDifferences`, doc.ts:2307-2310). Edits use `fork()` (copy-on-write, doc.ts:2046-2117), which is right; any caller of clone() pays O(map).
- A10 DECISIVE: the tile streaming of the document is dead code. `RoadDoc.loadTile`/`unloadTile`/`tileRecords`/`leaveTiles` (doc.ts:1704-2041, 1842) have NO caller in src/ (grep: only tests/ call them). Commit 5de45028 (2026-10-21) "Pilha de streaming por tiles removida" deleted tileStore.ts (781 lines), tileBlob, tileMigrate, worldMeta and the per-tile far levels, saying the tile path "never received a source in the game". Since then the game has ONE mode: the whole map in the page's document, and every derived system (render, network, sim, save) works from that whole-map document, trimmed afterwards by "windows" (networkWindow, InputResidency, view cells).
- A11 `fromJSON` (doc.ts:2939-3137) reads a whole map: every node/segment of the map made a JS object (2952-2984), the loose-node walk over the whole map (2986), every tree/element/cloud/landscape item decoded (3001-3084), then ONE whole-map change entry `roadsChanged(null, ...)` (3134).
- A12 Saving per square still serialises the whole map's roads as JSON on the page (`serialized`, doc.ts:2872-2906: every node/segment `inIdOrder(...).map(saved...)`, every tree/element copied), and `toText` (2822-2832) makes one string of the whole map.
- A13 The renderer is ONE closure of 4,355 lines (`createSceneRenderer`, renderer.ts:451) importing ~185 modules (renderer.ts:1-185), all on the page's main thread: terrain plates, roads (surfaces, far level for the whole map `networkFar.requestWhole`, renderer.ts:1241-1244), structures, furniture, poles, signs, barriers, transit, agents, effects, shadows' change tracking (a per-frame walk of every caster in the scene, renderer.ts:744-862).
