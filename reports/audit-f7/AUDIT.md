# Audit through the game's own debug tool (F7, the Lab)

Started 2026-10-25. The game is driven in headless Chrome (Playwright) one real gesture at a time (click, key, wheel, drag);
every photo is in `reports/audit-f7/shots/` (copied from the session's scratchpad, numbered as taken). Each view is measured again
with "Measure now" after the camera moves (the diagnosis is not live).

Setup: `npx vite --port 5300`, `?city=small&seed=7`, ultra quality, 1920x1080, RTX 3060 (D3D11 through ANGLE).

**View V1 (repeatable)**: key Home (the default view, the map framed), then two wheel steps in at (900, 480): downtown's towers
(shot `036-fixed-view-2ticks.png`). The orbit of a measure: eight right-button drags of 120 px at (500, 500) during "Measure now".

## What the Lab (F7) offers, tab by tab (sidebar, top to bottom)

| Group | Tab | What it measures or does |
|-------|-----|--------------------------|
| Diagnostics | Diagnosis | "Measure now": 120 frames; bottleneck, GPU by pass, GPU by layer (triangles, draws), CPU by frame system, causes ranked with their evidence; per cause "Test" (an A/B of hiding it: GPU, CPU, draws, triangles with noise), "View draws", "In Inspector", "Investigate" (the code, the profile, related switches and optimisations) |
| Diagnostics | Overview | Frame interval, FPS, CPU, GPU, draws, triangles, JS heap over 30/60 s, p50/p95/p99, hitches, LoAF, long tasks, heap trend, warnings, current settings |
| Diagnostics | Checks | 18 checks with a verdict (heap growth, long tasks, frame pace, storage, VRAM vs ledger cap, isolation, GPU tier, context, limits, GPU timer, pixel ratio, visibility, programs, geometry/texture leaks, worker pool, machine, UA memory) |
| Elements | Inspector | Pick in game (Ctrl+Shift+C): the game entity (building, street...) and the 3D object under the cursor, geometry, attributes, material, program, live edits |
| Elements | Scene | The scene tree: select, hide/show, open in the Inspector |
| Elements | Console | JS with `$sel`, `$obj`, `$mat`, `$scene`, `$gl`, `lab` (`lab.scene.buildingLevels()`...), `$find(text)`; snippets (materials by type, programs, largest geometries, objects by type, renderer info) |
| GPU | GPU passes | Live GPU time per pass (avg, p95, max, share); debug views (overdraw, wireframe, flat normals, UV, mips); draws by layer, live |
| GPU | Frame | Capture one frame: every draw (object, layer, instances, triangles, vertices, material, program, pass, target), grouped by layer, material, program, pass, target or mesh type; CSV/JSON |
| GPU | Programs | Programs alive, compiled over time |
| GPU | WebGL | Context, extensions, limits, driver |
| CPU and memory | Consumers | Every resource by source, window 5 s / 30 s / session: simulation step, frame CPU, systems, GPU, measures, long tasks, LoAF scripts, products, memory, VRAM classes and owners, storage |
| CPU and memory | Code | Sampling profiler (live or recorded, window, interval): functions by self/total, callers, callees, hot stacks, recursion, suspects, source |
| CPU and memory | Coverage | Functions declared in the game modules against those the profiler saw |
| Controls | Switches | "Painel de efeitos": every effect, layer and system on/off live (post, light and shadows, layers drawn, buildings: material, LOD triangle budget, detail memory down to "0 (só massas)", each level and part kind, shadows, night windows; simulation) - kept between sessions, "Tudo ligado" restores |
| Controls | Optimisations | Every tier field and optional technique by system (renderer, culling, shadows, post, textures, materials, buildings, terrain, water, roads, vegetation, people, vehicles, particles, simulation, uploads) with its expected gain and cost |
| Record and test | Recording | Record segments while flipping switches; each change a segment (interval, CPU, GPU p50/p95, >50 ms, draws, delta, verdict); report JSON/MD written to `lab-reports/` on the dev server |
| Record and test | Reports | The reports in `lab-reports/` (files on disk) |
| Record and test | A/B sweep | Every switch and optimisation measured A/B/A automatically: GPU A/B and delta, CPU, noise, programs compiled, verdict |
| Record and test | Benchmarks | View route x budget (map, district, street against VIEW_BUDGETS), simulation stress (speed 1/2/4x, traffic 3x), leak (camera circling: heap, geometries, textures, programs, ledger), shaders and hitches, long stability |
| Record and test | Page probes | Read-only probes: `__gpu()`, `__frames()`, `__health()`, `__roadcraft.memory()`, `__roadcraft.inventory({top})` (every layer and kind: meshes, instances, triangles, bytes), `__roadcraft.budget(view)`, `__roadcraft.audit()`, `__lab.collectReport()` |

Inside the tabs (read whole, 2026-10-25):
- **Diagnosis**: each cause carries a "Test" A/B (hide it: GPU, CPU, draws, triangles, noise), "Turn off", "View draws", "In Inspector",
  "Investigate" (code links, its profile, its switches and optimisations); the CPU causes name the function and file:line.
- **Overview**: graph window 30/60 s; verdict (vsync-bound, GPU-bound, CPU-bound); interval, FPS, CPU, GPU, draws, triangles, heap with p50/p95/max;
  percentiles and hitches; warnings; current settings.
- **Scene**: the whole tree with triangles per node, each node selectable, hideable, open in the Inspector.
- **GPU passes**: per pass avg/p95/max/%/frames; debug views Normal, Overdraw, Wireframe, Flat normals, UV, Mips; draws by layer live.
- **Frame**: group by layer, material, program, pass, target, mesh type; every draw filterable by pass (Canyon light, Clouds, GTAO, Output, SMAA,
  Scene, shadows, outside chain); CSV/JSON.
- **Programs**: alive, compiled timeline, each program's id, key, uses and what preceded it (a long frame).
- **WebGL**: 100 rows: context attributes, driver, extensions (multi_draw, timer query, parallel compile...), limits, three's capabilities.
- **Consumers**: 82 sources (frame CPU, systems, simulation step, GPU, measures `hitch:`, long tasks, LoAF with the script blamed, products,
  VRAM by ledger class and owner, geometries, textures, programs, job pool and each worker's lanes, simulation vehicles/people, heap, GC drops,
  storage, IndexedDB, UA memory per page and worker), window 5 s / 30 s / session.
- **Code**: live or recorded sampling (window 2-10 s, interval 1-50 ms), last window / session / recording; Functions, Hot stacks, Recursion,
  Suspects; callers, callees and code of each. **Coverage**: functions declared vs seen per file; exact V8 coverage.
- **Switches** ("Painel de efeitos"): resolution 100/75/50/25 %; post (GTAO, street occlusion, bloom, clouds, SMAA, CAS); light (sun cascades,
  shadow update, environment map, sky light, ambient, fill, point lights, surface detail); layers (terrain, water, roads, buildings, trees,
  furniture, signs/poles, trains, people and vehicles, far traffic, signals, particles, weather); buildings (material, LOD triangle budget,
  detail memory, masses, facade L1, detail L0, parts, signatures, flags, shell, glass, frames, rails/awnings/brises, facade props, lots,
  furniture, shadows, night windows); simulation (step, traffic, pedestrians, growth, draw on demand).
- **Optimisations**: 59 fields over 16 systems (opaque sort, pixel ratio, frustum culling, shadow type/size/every N frames/far cascades/masses
  cast/min part width/agent shadows, post chain/MSAA/GTAO resolution/clouds/SMAA/CAS/mist, anisotropy/surface detail, shader precision,
  building screen error/triangle share/detail memory, terrain screen error, water, road wear, vegetation density/range/impostors/grass,
  street furniture, people detail zoom, vehicle screen error/whole cap/occupants, exhaust/birds/rain, population cap, uploads every N frames).
- **Recording**: segments by change (interval, CPU p50/p95, GPU p50/p95, >50 ms, draws, delta, verdict), report JSON/MD into `lab-reports/`.
- **A/B sweep**: every switch above A/B/A with the clock held: GPU A/B and delta, CPU, noise, programs compiled, verdict.
- **Benchmarks**: view route x budget, simulation stress, leak with the camera moving, shaders and hitches, long stability; frames, seconds.
- **Page probes**: the read-only probes as buttons, every probe listed, and how the vitest suites and the headless runner are run.

### M10 - Benchmarks, "View route x budget" (120 frames each view), 13:37
| View | GPU p50 | GPU p95 | CPU p50 | fps | draws | triangles | hitches |
|------|---------|---------|---------|-----|-------|-----------|---------|
| map | 6.18 ms | 8.41 ms (<= 12 ok) | 2.63 ms | 60.0 (>= 50 ok) | 108 (<= 400) | 769,341 (<= 8 M) | 0 |
| district | 10.96 ms | 11.06 ms (<= 12 ok) | 7.75 ms | 59.99 (>= 60 **over**) | 448 (<= 1,100) | 5,602,185 (<= 16 M) | 0 |
| street | 8.52 ms | 9.89 ms (<= 12 ok) | 5.28 ms | 59.99 (>= 60 **over**) | 369 (<= 1,000) | 4,344,374 (<= 16 M) | 0 |

### M11 - Checks and Consumers at rest (the city framed, 5.7 min of session)
- JS heap growing +50 to +82 MB/min (Checks warning; Overview: heap p50 704, max 783 MB); GC drops of 19 MB each, 125 in the session.
- 3-7 long tasks (max 143 ms) and 4 LoAF in a minute; the LoAF scripts are the Lab's own button handlers (`lab/window.ts`) and `frameLoop.ts`.
- Simulation step in its worker 6.7 ms mean, p95 8 ms, max 21.6 ms for 655 vehicles and 521 people.
- VRAM by the ledger: 316 MB of a 1,365 MB cap: render targets 183 MB, shadow maps 72 MB, building facade 16.7, building detail 21.5,
  cell masses 9.0, tile masses 6.5, plate masses 6.2, base masses 0.4 MB. UA memory: page 736 MB, job worker 342 MB, sim worker 102 MB.
- Programs: 232 alive, 0 released, compiled in bursts at the opening and at 176 s (building parts, road surface).

The Checks tab already flags two warnings at the session's start: **JS heap growing +50 to +82 MB/min** and **3 long tasks and 4 long animation
frames a minute** (the Overview: max interval 149 ms).

## Problems

| # | Where | Problem | Status |
|---|-------|---------|--------|
| P1 | Lab header | "VRAM NaN%" | **fixed and verified** (F1) |
| P2 | Diagnosis "Investigate" | A cause's code links were words matched anywhere (i18n "Building", chunkedSave "parts") | **fixed and verified** (F2) |
| P3 | renderer.ts `frameMark` | 13 `performance.mark` a dev frame that nothing reads: 2.6 s of main-thread self time in one session | **fixed and verified** (F3) |
| P4 | building cell parts | The diagnosis said "~4-5 ms of GPU"; the tool's A/B test measures 1.5 ms of GPU and 0.5 ms of CPU at V1. Their shadows: cutting 30 % of their shadow triangles left the shadow pass's time the same (M8) - not what the shadow pass is bound by | measured; no fix kept (F4 rejected) |
| P5 | traffic-signals | No level of detail: 253 k triangles at any distance (M1 = M2) | **fixed and verified** (F9, = P15) |
| P6 | rigged citizens | 734 k of 1.1 M triangles are shadows at the street view (M2) | already cast by the coarsest level each cascade's texel hides (`riggedCitizens.ts` castCoarse, wired at line 587): no excess past that rule |
| P7 | renderer.ts `casterChanges` | 2.2 s self in a session (M3), 0.15 ms a frame while moving (M5) | by design, kept (audit 2): the casters' signature is what lets the sun's cascade stores be kept and patched between frames (`sunCascades.ts`), sparing the cascades' redraw on the GPU for 0.15-0.28 ms of CPU |
| P8 | Lab frame capture | "buildings: 418 k triangles, 46,116,742 vertices": a batch's whole index counted once per multi-draw | **fixed and verified** (F5) |
| P9 | world / gardens shadows | A frame that redrew the cascades (M6): gardens 4.24 M triangles in the shadow maps (68-105 k in colour) | **fixed, triangles** (F10); shadow pass time unchanged on this GPU |
| P10 | camera | Zooming toward a tower takes the camera through its wall (shots 020, 024, 029); the buildings have interiors, so this may be meant | the owner's call |
| P11 | src (79 places) | `roadcraft/no-silent-catch` suppressed in the lint baseline: errors swallowed | open |
| P12 | vehicles | Car bodies drawn at their full model in a mid view: car-suv-suv-body-lite 99 cars 1.09 M tri (11 k a car), hatch body 66 cars 811 k, and again in the shadows (shot 033) | **fixed and verified** (F8) |
| P13 | buildings far | Masses drew one standard window (sill 0.3, head 0.85, full bay) whatever the facade's openings: a black-glass tower read as grey boxes | **fixed and verified** (F6) |
| P14 | buildings near | The detail level came only once 0.3 m spanned a pixel: towers at 300-600 m drew their facade level (shot 005) | **fixed and verified** (F7) |
| P15 | traffic-signals | Every head drawn at any distance: lenses 36 tri, halos 48, frame 52, visors 12 each; 580 heads 253 k tri at V5 (M12) | **fixed and verified** (F9) |
| P16 | dev console | `WebGL: INVALID_OPERATION: texSubImage3D: no bound PIXEL_UNPACK_BUFFER` x4 | seen only when the dev server restarted under a loading page (with `ERR_CONNECTION_RESET`); not reproduced on a clean load: not a game fault |
| P17 | tests | `tests/render/pixelSkips.spec.ts` VIA-05 fails: its regex wants `if (detailW > 0.0)` right after the derivatives, and commit 1d3f0145 put `#ifdef ROAD_DETAIL` between them in `mesh/roadEdges.ts` | stale test, the code does what it checks; left for the owner's call |
| P18 | src/render | My F10 added an import cycle (cellInstances -> shadowLevels -> propLevels), caught by `tests/arch/imports.spec.ts` | **fixed** (b1ea5cc0: `mesh/surfaceOff.ts`) |
| P19 | vehicles | Hubs and wheels drawn at their coarsest level under a pixel (hubs @7: 2,734 x 30 triangles at V5): `partLevelsWork.ts` never leaves a component out | open (F11 rejected) |
| P20 | flat-world-far | Every far patch drawn at its full 32 x 32 grid whatever its relief: 240,640 triangles at V0 and V5 for a plain | **fixed and verified** (F12) |
| P21 | utility poles | The caps (40 triangles), insulators (30) and transformers' cans (56) had one shape, drawn whole wherever a piece covers a pixel | **fixed** (F13); the in-game photo pending (next pass) |
| P22 | light cones | On a rainy night every lamp's cone of the map was drawn (144 triangles each) though its material discards it whole past 140 m (`BEAM_FADE`): ~277 k triangles at V5 (1,929 lamps) for no pixel | **fixed** (F14); the in-game rain photo pending (next pass) |
| P23 | utility poles | `poleLayer.ts` ScreenScale took a pole behind the eye for one the eye stands in (Infinity): its whole 1 km block drawn at the finest - every wire a tube, every insulator whole (97 k triangles of wires at V5) | **fixed** (F15) |
| P24 | utility wires | Every wire of a 1 km block drawn by its nearest pole's template: near, a 4-faced tube of 8 segments (64 triangles, 128 vertices a wire) for every wire of the block however far; under a pixel, its width shrunk below a pixel (the multisampled samples came and went: dotted, crawling wires from the air) | **fixed** (F16) |
| P25 | utility poles | A span carried 9 wires (3 courses x 3 offsets round a centred arm, the middle one through the mast), 2 insulators showed, the lower wires hung on nothing, the lamp among the wires | **fixed** (F17): urban and rural poles after the CELESC standard |
| P26 | utility poles | Every piece and every wire of a 1 km block drawn at its nearest pole's shape and template: insulators 8,160, caps 2,720, wires 11,980 sent (2,184 with an area) in the wire sheet's street view | **fixed** (F18) |
| P27 | buildings far | The glass towers' masses drew one constant pane (across = up = 0.9 for a share over 0.99) with the window pane's look, and a tile's masses dropped every roof cue under 3 m: downtown from the Home view a field of flat grey boxes on bare roofs (the owner's picture) | **fixed** (F19, the agent's gate 2, verified) |
| P28 | building parts | The Lab at V5: building cell parts 64 % of the triangles (2.84 M) in 253 draws; the small props (condensers, plants, chairs, tables, airers, dishes, loungers, bikes) drawn as models however small | **fixed** (F20, the agent's gate 3, verified) |

## Measurements

### M1 - district view (the city whole, from above), 12:25:02
- No bottleneck. GPU 8.6 ms, CPU 5.2 ms, 60 fps, 271 draws.
- GPU by pass: scene 5.5, shadow maps 0.2, GTAO 1.6, canyon light 0.5, clouds 0.5, SMAA 0.3, output 0.1 ms.
- Layers: building walls 344 k tri (22 draws), terrain 266 k, traffic signals 253 k tri (16 draws, 8.7 k instances), agents 197 k,
  building cell parts 125 k (38 draws), far masses 81 k.

### M2 - street view, close among towers, 12:26:35
- No bottleneck. GPU 13.2 ms, CPU 7.6 ms, 640 draws.
- GPU by pass: scene 8.5, shadow maps 1.2, GTAO 1.9, canyon 0.5, clouds 0.6, SMAA 0.3, output 0.1 ms.
- Layers: building cell parts 2,934 k tri (224 draws), agent-parts 1,330 k (532 k shadows), rigged citizens 1,102 k (734 k shadows),
  building walls 918 k, utilities 405 k, terrain 268 k, traffic signals 253 k (as at M1).

### M3 - downtown, oblique, 12:31:44
- No bottleneck. GPU 12.5 ms, CPU 8 ms, 511 draws. Building cell parts 2.55 M tri in 180 draws.
- The tool's A/B test "hide building cell parts": GPU 11 -> 9.4 ms, CPU 7.9 -> 7.1 ms, draws 489 -> 305.

### M4, M5 - CPU profile, Live, camera moved by gestures
- M4 (12 s): 549 frames (~45 fps). Self time: readTick 414 ms, profilerHooks.ts:36 (`bufferSubData`) 265 ms, derivedCache.ts:59 220 ms,
  cellInstances visit 188 ms, addPlain 181 ms, fitInstances 177 ms, casterChanges 110-278 ms. Session (M3): **frameMark 2,593 ms self**.
- M5 (24 s, after F3): 1,298 frames (~54 fps). Per frame: agents sync 1.73 ms (total), drawVehicle 0.92, readTick 0.54, bufferSubData 0.36,
  fitInstances 0.21, derivedCache.ts:59 0.17 (IndexedDB results read as cells come into view), casterChanges 0.15.

### M6 - downtown wide view, orbiting during "Measure now"
- CPU-bound: 15.2 ms against 13.2 ms of GPU (57.5 fps). Shadow maps 2.9 ms mean, p95 5 ms.
- The captured frame redrew the cascades: 8.62 M triangles in the shadow maps - gardens 4.24 M, building cell parts 2.01 M, walls 0.89 M.

### M7 - P4 before (the parts' one caster a cell), view V1 (shots 037, 040, 041, 042)
- Still: GPU 12.1 ms, shadow maps 0.5 ms, CPU 7.2 ms; parts 2.34 M tri, 91 draws.
- A/B "hide building cell parts": GPU 9.6 -> 8.1 ms, CPU 6.9 -> 6.4 ms, draws 333 -> 249.
- Orbit 1: shadow maps 2.6 ms (p95 5.5), CPU 13.0 ms; parts' shadow triangles 1.96 M; parts 149 draws.
- Orbit 2: shadow maps 2.5 ms (p95 5.1), CPU 13.2 ms; parts' shadow triangles 1.69 M; parts 134 draws.

### M8 - P4 after (a caster a span of 2 x 2 sub-cells), view V1 (shots 044, 046, 047, 048)
- Still: GPU 11.7 ms, shadow maps 0.5 ms, CPU 6.6 ms; parts 2.35 M tri, 92 draws.
- A/B "hide building cell parts": GPU 9.5 -> 8.1 ms, CPU 6.3 -> 5.8 ms, draws 334 -> 242.
- Orbit 1: shadow maps 2.6 ms (p95 5.2), CPU 12.9 ms; parts' shadow triangles 1.16 M; parts 133 draws.
- Orbit 2: shadow maps 2.6 ms (p95 5.5), CPU 13.3 ms; parts' shadow triangles 1.26 M; parts 150 draws.
- Reading: the spans cut the parts' shadow triangles by 30-40 % (1.96/1.69 M -> 1.16/1.26 M) with the same draws, and the shadow pass's
  time did not move (2.6/2.5 -> 2.6/2.6 ms, p95 5.5/5.1 -> 5.2/5.5). The parts' shadow triangles are not what the shadow pass is bound by.

### M9 - GPU time per pass (live, still, the city framed), shot 049
- Scene 6.07 ms (p95 7.28), GTAO 1.56, canyon light 0.53, clouds 0.47, SMAA 0.31, shadow maps 0.29 (p95 1.02, max 2.34), output 0.06.

### M12 - ONE measurement of every element, view V5 (Home, 5 wheel steps in at (820, 560)), shot f7b/030
Sources: Lab console `__roadcraft.inventory({top:400})` (what each kind holds: every instance, hidden meshes too) and one frame
captured (`__labGpu.capture()`), its 544 draws summed by object (what the frame draws). Renderer: 4.53 M triangles built, 5.70 M drawn,
512 draw calls, 1,585 geometries, 212 textures, 232 programs, heap 802 MB. Inventory total: 3,182 meshes, 20.5 M triangles if all drawn,
315 MB GPU, 756 MB CPU. The shadow cascades were not redrawn in that frame (cached): 6 shadow draws, 1.4 k triangles.

Drawn in the frame (scene pass), by object: draws, triangles, instances.

| Object | Draws | Triangles | Instances | Tri / instance |
|---|---|---|---|---|
| building-lotBox | 43 | 918,818 | 132,829 | 6.9 |
| building-shell-batch-detail | 1 | 669,298 | 25 multi | - |
| building-shell-batch-facade | 1 | 307,942 | 19 multi | - |
| building-brise | 8 | 247,488 | 10,312 | 24 |
| flat-world-far | 1 | 240,640 | 1 | - |
| building-lotSides | 14 | 221,560 | 27,695 | 8 |
| building-fin | 11 | 175,378 | 34,944 | 5 |
| building-concrete | 15 | 169,356 | 84,678 | 2 |
| building-glass | 12 | 162,472 | 81,236 | 2 |
| building-foliage | 8 | 154,944 | 807 | 192 |
| building-frame | 9 | 133,554 | 5,973 | 22 |
| building-awning | 8 | 126,720 | 5,280 | 24 |
| signal-lenses | 4 | 125,280 | 3,480 | 36 |
| vehicle-wheels (@5, @6) | 2 | 123,504 | 3,348 | 37 |
| building-acUnit | 8 | 108,870 | 3,629 | 30 |
| vehicle-hubs (@5, @7) | 2 | 107,844 | 3,272 | 33 |
| car bodies-lite @5 / @6 (all kinds) | 15 | 367,000 | 857 | 300-440 |
| building-chair | 8 | 99,450 | 1,275 | 78 |
| utility-wires | 4 | 96,840 | 4 | - |
| building-bush | 8 | 94,612 | 763 | 124 |
| building-louvre | 8 | 78,168 | 6,514 | 12 |
| gardens-far-cells | 4 | 68,548 | 34,274 | 2 |
| signal-halos | 4 | 55,680 | 1,160 | 48 |
| building-lamp | 7 | 51,096 | 4,258 | 12 |
| building-lotRail | 16 | 49,116 | 24,558 | 2 |
| building-shutter | 7 | 43,416 | 3,618 | 12 |
| signal-visors | 4 | 41,760 | 3,480 | 12 |
| vehicle-lamps | 1 | 39,600 | 3,300 | 12 |
| building-dish | 8 | 36,946 | 1,421 | 26 |
| street-lights-mid (+ mid-far cells) | 3 | 59,928 | 681 | 88 |
| signal-frame | 4 | 30,160 | 580 | 52 |
| building-glassRail | 8 | 28,724 | 7,181 | 4 |
| building-glassDark | 11 | 24,384 | 12,192 | 2 |
| utility-caps / insulators / braces / arms / lamps / poles / transformers | 31 | 99,000 | 6,400 | 4-40 |
| building-lounger, airer, door, pot, table, bike | 42 | 87,000 | 3,231 | 7-168 |
| rigged citizens @1 (+ cards) | 25 | 80,000 | 42 + 180 cards | 1,700-2,500 |
| roads (near + far), road-far-blocks | 4 | 30,279 | - | - |
| shell runs, detail runs | 2 | 29,906 | - | - |
| terrain seams + ground, slab | 9 | 26,544 | - | - |
| car glass (all kinds) | 7 | 42,000 | 900 | 30-76 |
| far-forest, trees | 6 | 22,000 | - | - |
| sign posts + plates, bikes, riders | 7 | 22,000 | - | - |

Held (inventory, every instance): lotBox 2.09 M tri / 322 k instances; shell batch 1.46 M + detail 1.12 M (69 + 54 MB GPU);
brise 885 k; lotSides 766 k; frame 724 k; roofRailing 634 k; concrete 605 k; fin 387 k; flat-world-far 328 k; louvre 256 k;
acUnit 230 k; awning 189 k; glass 168 k; massing 142 k (23 MB); signal lenses 125 k; lamp 104 k. Car bodies of every level kept on
the GPU though 0 drawn: ~0.5-0.8 MB each, some 40 geometries.

## Fixes

### F1 (P1) - the Lab's VRAM meter read "NaN%"
- Cause: the shell batches (`render/buildings/gpuBatchedMesh.ts`) give their index a stand-in `array` holding only `BYTES_PER_ELEMENT`
  (three's multi-draw reads it). The Lab's scan of the GPU's objects (`lab/gpu/memory.ts`) took any `array` as real and added
  `array.length * 4` = NaN; the game's own counter (`render/memoryCounters.ts`) already reads a `GLBufferAttribute` by its kept size.
- Fix: `lab/gpu/memory.ts` and `render/inventory.ts` read a `GLBufferAttribute` by `keptBytes`, never its `array`; the Lab console's
  "Largest geometries" (`lab/inspector/consoleTab.ts`) takes the index's `keptBytes` too.
- Verified: F7 header VRAM 48 % where it read NaN % (shot `019-header-after.png`).

### F2 (P2) - the diagnosis's code links
- Cause: `lab/investigate.ts` `queriesOf` knew no layer path ("buildings-layer / building-part-cells") and fell back to the first two
  words of the title ("Building", "parts").
- Fix: a layer origin searches each object's name of the path, the deepest first, and the heaviest object the item cites; no word fallback.
- Verified: Investigate on the parts' cause lists `src/render/buildings/layer.ts:170` (`partRoot.name = 'building-part-cells'`),
  `layer.ts:85` (`buildings-layer`), `kit.ts:582` (prefix `building-part-`) first (shot `039-F2-investigate.png`).

### F3 (P3) - `frameMark` in every development frame
- Fix: `render/renderer.ts` marks the frame's steps only when the page asks for them (`?marks`); nothing else reads them.
- Verified: the CPU profile while moving lists no `frameMark` (filter: 0 rows; `draw` in the same session: 884 samples) (shot 051).

### F4 attempt (P4) - the parts' shadow cast by spans of their cell: REJECTED, reverted
- Tried: each band's caster split into the cell's 2 x 2 sub-cell spans, each culled by its own box, at the band's level (no shadow changes).
- Measured before (M7) and after (M8) at the same view V1: 30-40 % fewer shadow triangles, the same shadow pass time, the same A/B cost.
  No real gain: reverted.

### F5 (P8) - the frame capture's vertex count of a multi-draw batch
- Cause: `lab/gpu/probe.ts` counted a batch's whole index once for each of its multi-draws.
- Fix: a batch's vertices are the sum of its draws' counts (`BatchedMesh._multiDrawCounts`).
- Verified: the walls read 2,114,604 vertices for 704,868 triangles where they read 46,116,742 for 418 k (shot 033).

### F6 (P13) - the masses draw each facade's real window
- Fix: `buildingMesh.ts` `recordBlock` takes each side's opening (`openingOf`): its share of the bay, its sill and head; `massing.ts`
  carries sill and head as one code a quad (`windowCode`), `cellArrays.ts` packs it in the grid's 4th channel, `massingMaterial.ts`
  decodes it in the vertex shader. Same triangles, same draws. Commit 5e36707a.
- Verified: the grey/black tower draws its black glass bands from afar (shot f7b 005).

### F7 (P14) - the full detail while 0.3 m spans half a pixel
- Fix: `massCells.ts` `FINE_PIXELS` 1 -> 0.5. Measured at V5: detail cells 0 -> 10, GPU 11.8 -> 12.3 ms, CPU 6.2 -> 7.1 ms, 60 fps both.
  Commit 81cc8c80.

### F8 (P12) - every vehicle drawn at its full model
- Cause: `render/agents.ts` `rung()` asks a ladder's levels lazily, only when a coarser one is wanted and missing; the body ladders were
  never asked, so every car drew its full body (11-12 k triangles).
- Fix: once every part is made, each ladder's first coarse level is asked of the LOD worker pool (`lodPool()`), so the rest follow.
- Verified (M12): car bodies drawn at @5 / @6, 300-440 triangles a car (857 cars 367 k where 99 cars drew 1.09 M).

### F9 (P5, P15) - the traffic signals' far level
- Fix: `render/signals.ts` chooses each 250 m cell's level from the pixels a metre spans at its nearest point (as `partCells.ts`): its lenses
  and halos drawn as their face alone (the very 12 triangles of the near cap, `mesh/cylinder.ts` `side: false`) once the 6 cm rim spans
  under 0.85 px (back at 1 px), its visors out of the drawing once their 42 cm diagonal spans under a pixel (the parts' rule). The far
  batches are made at their first instances. The head's shapes moved to `render/signalShapes.ts` (signals.ts past 800 lines).
- Spec: `tests/render/signalBatches.spec.ts` new case (near, far lenses with visors, far without visors, near again); 11/11 with vehicleSignals.
- Measured at V5 (one frame captured): signals 252,880 -> 112,480 triangles (lenses 125,280 -> 41,760 far, halos 55,680 -> 13,920 far,
  visors 41,760 -> 26,640, frame 30,160 the same); the scene pass 5.75 M -> 5.64 M.
- Seen: the same junction at V5 before/after (shot 053: the same, only the cars moved); a head close up in full, visors, lit lens and halo (054).

### F10 (P9) - the plants' and props' shadows by the cascade's texel
- Cause: `cellInstances.ts` casts every plant and prop under the near cascade's cover with its full model (so the shadow never follows the
  camera's level), whatever the cascade's texel: a bush of 80 triangles spanning a few texels drew all 80 in every cascade.
- Fix: `render/shadowLevels.ts` gives each caster model a ladder (its positions welded, simplified by meshoptimizer with `ErrorAbsolute`
  and `Prune`, each shape kept only within its measured two-sided error, `surfaceOff`); `cellInstances.ts` draws into each cascade the lightest
  shape whose error at the level's widest instance is under that cascade's texel (`SizedCaster.levels`, as `poleLayer.ts` does), the colour
  pass untouched. Every layer on `cellInstances` (gardens, street trees and props, nature trees, ground cover) takes it. A lab option
  (`optimizations.ts` shadowShapes: by texel today / full model) lets the Lab measure it A/B.
- Spec: `tests/render/shadowLevels.spec.ts` (the ladder within its error, let go with its model, a garden body drawn by texel on the same
  poses and given back between the passes); with shadowCasters, gardenMatrix, orderedFar, propImpostors: 17/17.
- Measured at V5, one frame each that redrew the cascades (Lab console, `lab-reports/shadow-shapes-AB-V5.json`): shadow triangles
  8,787,208 -> 7,179,736; plants and props 3,719,166 -> 2,156,974 (-42 %): bushFlowering 1.72 M -> 0.73 M, bush 211 k -> 111 k, street
  lights 211 k -> 99 k. Not lighter: broadleaf (65-tri shape off by 0.03 of its radius, over the near texel there), benches (no shape within
  the error).
- Time, measured honestly (`lab-reports/shadow-shapes-AB-time-V5.json`, 12 redraws each, the shadows pass's GPU time): full model median
  1.43 ms, by texel 1.40 ms - within the noise: this GPU's shadow pass is not bound by these triangles (as F4 found). Kept for the triangles
  and vertex work (weaker GPUs, larger cities), at the owner's order to cut every element's excess triangles.
- Seen (paused, so the wind stands still: the same setting twice differs by 0 pixels): the park close up, full model vs by texel: mean
  difference 1.3/255, 0.5 % of pixels over 24 levels, all inside the crowns' self-shadow dither (shots 055-059: the same at a glance).

### F11 attempt (P19) - a vehicle part's component left out where its radius is within the level's error: REJECTED, reverted
- Tried: `partLevelsWork.ts` ladderIndices left out a component at every level whose error reached its radius (a pixel across at most there).
- Sheets (`scripts/optimization-sheet.mjs --only="vehicle levels" --match="at (5|2.5|1.25) px/m"`, `reports/elements-optimization/vehicle-hubs/`):
  triangles 17-78 % fewer at those scales, but the surface moved past the vehicles' rule (0.5 px measured): hatch at 2.5 px/m 300 mm (0.75 px),
  sedan 296 mm, steering wheel 158 mm at 5 px/m (silhouette 74 %), motorcycle at 1.25 px/m silhouette 58 %. A component no wider than the error
  can still stand farther than it from the rest of the surface (a mirror): its radius does not bound what leaving it out moves.
- Reverted. A right rule would measure each component's distance to the rest of the vehicle (its occluders) against the error.

### F12 (P20) - the far ground drawn at the stride its relief allows
- Fix: `render/farGround.ts` measures, when a far patch is written, how far each stride (every 2nd ... 32nd corner) strays from the full grid
  (exactly, at the full grid's corners: the coarse quads are unions of the fine ones, the same diagonal); `flatAtlas.ts` `lookFar` picks for
  each patch the coarsest stride whose error spans under 0.5 px where its box stands nearest the eye (the near plates' rule is 1 px,
  `terrainLod.ts`), held by a 0.8 band, dividing its quads on the map; the skirts hide the seams. A lab option (`farStride`: by relief / full grid).
- Spec: `tests/render/farGround.spec.ts` (a tilted plane strays 0 at every stride and is one quad; a 4 m bump measured exactly; the hysteresis;
  strides dividing the map's cut; a plain patch indexed as 2 triangles and its skirts on the full grid's corners): 14/14 with flatAtlas, imports.
- Measured (Lab console, one frame each, `lab-reports/far-stride-AB-V0.json`, `-V5.json`): far ground 240,640 -> 1,568 triangles at V0 and at
  V5; the scene pass 979,745 -> 740,673 at V0 (-24 %), 4,294,895 -> 4,055,823 at V5.
- Seen (paused, day, the Lab closed): V0 full grid vs by relief differs by a mean of 0.035/255 against 0.026/255 for two shots of the same
  setting; past that noise, some 40 single pixels inside the city and none on the far ground (shots 060-062); V5 by relief (063).

### F13 (P21) - the poles' round pieces drawn with fewer sides where their roundness is under a pixel
- Fix: `render/utilities.ts` `roundShape` (the mast's own `mastShape` rule made general): each round piece's finest shape is its geometry as
  before (`cylinderWith` with both ends and its side gives three's CylinderGeometry itself), then fewer sides as wide on average, each with its
  outline's error; the pole layer draws the coarsest under a pixel (`poleLayer.ts` view) and casts by the cascade's texel, as the mast's.
- Spec: `tests/render/poleLevels.spec.ts` new case: a few metres from a pole 40/30/56 triangles (the shapes of before); 120 m up 16/12/32;
  7/7 with poleLayer, utilityWires, imports.
- Not seen in the game yet: the next pass's photos.

### F14 (P22) - the lamps' cones not drawn where their material has faded them out whole
- Fact first: the cones are drawn only at night in rain or storm (`scenery.ts` lightBeams: `night * haze`, haze = rain or storm); on a clear
  night none is drawn, before or after. In rain, every cone of the map was drawn and its pixels discarded past `BEAM_FADE` (140 m).
- Fix: `cellInstances.ts` `KindLevels.fadesAt`: a slot whose sphere's nearest depth (never more than its distance) is past it is not drawn;
  `propCells.ts` hides a far block's batch of such a kind whose sphere is all past it; `poleLayer.ts` `ScreenScale.beyond` hides a block's part
  whose box is all past it; the street's and the poles' cones given `BEAM_FADE[1]`. A view from above fades nothing and cuts nothing.
- Spec: `tests/render/fadesAt.spec.ts` (within / past / from above), `poleLevels.spec.ts` (the near line's cones drawn, the far line's not,
  none from 1,400 m, the pools still); 26/26 with poleLayer, streetFurnitureLayer, orderedFar, propImpostors, shadowLevels, imports.
- Counted, not measured on a rainy frame: the lamps at V5 (this frame's pools: 796 + 840 + 293) x 144 = 277,776 triangles drawn before in
  rain (the inventory at night held `utility-lamp-beams` 114,624 and `street-light-beams-far-cells` 120,960); after, a cone within 140 m only.
- Not seen yet: a rainy night close up (the dev server restarted under the page twice); the next pass.

### F15 (P23) - a pole behind the camera no longer makes its block the nearest there is
- Cause (read in the code): `atPoint` returned Infinity whenever the sphere's nearest depth along the view was not positive, meant for the eye
  inside a pole's sphere, but true too for every pole wholly behind the camera; a block's `nearest` is the most over its poles, so one pole
  behind the eye drew the whole kilometre's wires as tubes and its pieces at their finest.
- Fix: a sphere (`atPoint`) or a box (`atBox`) wholly behind the eye measures 0; one the eye's plane crosses still Infinity. The cascades
  are unchanged (they draw every piece by the texel, `castBySize` counts).
- Spec: `poleLevels.spec.ts` new case (a line of poles all behind the eye draws nothing in colour); it FAILS with the two new lines turned off
  (checked) and passes with them; 9/9 with poleLayer, utilityWires, fadesAt, imports.

### F16 (P24) - the wires drawn as a strip facing the eye, each with its own chords, never thinner than its samples
- Research (the owner's order: how games draw power lines): camera-facing ribbons with the sag in the vertex shader
  (https://www.alanzucconi.com/?p=12724); Humus, "Phone-wire AA" (GPU Pro 5, 2014, https://www.humus.name/index.php?page=3D&ID=89): a wire
  is never drawn thinner than a pixel, it covers the share of the pixel it fills. The standard 4x sample places (Vulkan/D3D,
  https://registry.khronos.org/VulkanSC/specs/1.0-extensions/man/html/VkSampleLocationsInfoEXT.html) are a square grid of rows 0.559 px
  apart: with 4 samples a 0.6 px strip is never broken (1 px with fewer).
- Architecture (`utilities.ts` stripTemplate, WIRE_GLSL, wireMaterials): no tube. A strip square to the eye, as wide as the old tube's
  silhouette, creased where the tube's two faces seen meet, each half lit by its face (4 triangles a chord; the crease an edge the
  multisampling smooths as it did the tube's): near, the same picture as the tube. A block's template has the chords its nearest wire needs
  (8 at most, the tube's segments) and is creased only while that wire is 1.5 px wide (plain, 2 a chord, below); in the vertex shader each
  wire keeps only the chords its OWN nearest point needs (the rest fall on them, of no area) and collapses its crease under 1.5 px. Under the
  least width (`wireClampPixels`: 0.6 px with 4 samples, 1 px without) it is drawn that wide, blended by its share. The shadow: the same strip
  facing the sun, the tube's silhouette, its true width.
- Sheet (`scripts/wire-ladder-sheet.mjs`, `src/lab/wireLadderSheet.ts`: two lines of poles 4 m to 2.7 km, the game's lights and shadow,
  1920 x 1080): reports/elements-optimization/wires/{before,after,compare}.
  | View | Wire triangles sent | with an area (worked out by the shader's rule) | Pixels over 8/255 |
  |---|---|---|---|
  | street (eye 6 m up) | 41,148 -> 21,564 | 41,148 -> 4,914 | 0.361 % |
  | aerial (150 m up) | 6,876 -> 6,876 | 6,876 -> 3,258 | 0.513 % |
  Near wires identical pixel for pixel (columns 5 and 40 of the street frame: 157, 142, 142, 50, 20... both). From the air the dotted
  wires are continuous now (zoom-aer-near/mid): the change seen. Their darkness kept within 0.94-1.10 where the wires of a span are apart,
  0.82 where the 9 wires of a span run within a pixel of each other (the widened strips overlap) - measured on the frames, not guessed; the
  owner's next item (3 + 2 wires a pole, BACKLOG 1b) thins those bundles.
- Spec: `poleLevels.spec.ts` (near block 8 creased chords = 96 indices, the far one fewer; the template by sag and width; the fewest chords
  within a pixel), `utilityWires.spec.ts` (the template 8 creased chords); 8/8 with poleLayer and imports. tsc clean; eslint clean but for
  `utilities.ts` woodCache's `no-module-state`, which HEAD already has.
- In the game (headless, small city seed 7): shots 064 (V5), 065-066 (a street, its wires enlarged): continuous dark wires, no shader
  error in the console. Not measured in the game's Lab this pass (my typing went to the game's shortcuts; the photos stand).
- The sheet's page logs Vite's HMR socket blocked by Chrome's local network checks (the routed page): the harness, not the game.

### F17 (P25) - poles built as a distributor's standard structures: urban (3 + 2 wires) and rural (3)
- Source: CELESC E-313.0002 (2024), https://www.celesc.com.br/arquivos/normas-tecnicas/especificacao-tecnica/E3130002.pdf: Figura 16 (2.0 m
  cross-arm: N1 insulators at -95, 35, 95 cm; B1 at 55, 125, 185 cm), Figuras 31/43 (arm 15 cm under the crown, brace 50 cm), Figura 71
  (secondary rack S1, spools 20 cm apart), Figura 1 (80 cm at least between circuits); the street light's bracket ~6.3 m up (a town's
  street lighting brief). The owner's order: urban pole with the arm set toward the street, 3 wires on 3 insulators, 2 below on a vertical
  rack, the light below every wire; rural pole with the 3 wires centred; both offered by the pole tool.
- Model (`@world/utilities` POLE_KINDS, primarySeats/secondarySeats/spanCarries, poleToward/streetArm): the pole's `kind` in the document
  (saved; a pole saved before it loads urban), the planner and the tool (`ui/toolChoices` poleKind, a "Poste" row by the lights'), the
  street generator urban. Render: the arm from the mast over the street (urban) or across the crown (rural), an insulator under each primary
  wire, one brace, the rack and two spools (urban), the transformer under the arm on the side its brace is not, the lamp head 2 m under the
  crown; 5 wire slots a span (3 primary, 2 secondary between two urban poles, an empty slot drawn as nothing).
- Sheet (`scripts/wire-ladder-sheet.mjs`, HEAD on a worktree server vs the tree): reports/elements-optimization/poles/{before,after},
  urban-close / rural-close before|after, after/urban-rack (every wire on its support). Street view: 39,586 -> 31,634 triangles, wires
  21,564 -> 11,980 sent (2,184 with an area); draws 37 -> 37. By mesh (after/frames.json): wires 11,980, insulators 8,160, beams 4,896,
  caps 2,720, pools 2,520, masts 2,304 - what remains is the next item (BACKLOG 1d: per-pole and per-wire levels, no light drawn by day).
- Specs: utilityWires.spec.ts rewritten to the standard's seats (urban, rural, mixed span, a wandering line never crossing sides),
  poleLevels.spec.ts (5 wires a span); 45 files / 364 tests touching poles pass; tsc clean; eslint as HEAD but for one more module-level
  `let` in toolChoices.ts, the pattern of its 29 others.
- In the game (a new city from the generator, HEAD + these files on a worktree server, the shared one restarting under the agent's edits):
  shots 067-068.

### F18 (P26) - each pole piece and each span drawn by its own size on the screen
- Cause (read, then measured by mesh on the sheet): `PartStore.view` and `WireStore.view` chose one shape a part and one template for a whole
  1 km block by its nearest pole.
- Architecture (`src/render/poleStores.ts`, the stores moved out of `poleLayer.ts`): every piece's and every span's sphere kept on the page;
  each frame each one measured where it stands (`ScreenScale.atPoint`): under a pixel not drawn, else the coarsest shape (template) within a
  pixel there, held in a 15 % band (the props' ladder's). The block's mesh of every piece casts into the cascades alone (the shadow and its
  store as they were; `castBySize` counts 0 in colour, its count 0 by default so a tier without shadows never draws it in colour); the colour
  pass draws one mesh a shape, filled from the matrices. A shape gets its own draw only where it spares 2,048 triangles (`DRAW_WORTH`): at
  most two draws a part a block - the near pieces at the finest shape any needs, the far at the finest they need, split where it spares
  most; never less detail than a piece needs (a wire's host template has as many chords and its crease where any needs them).
  `shadowCasters.ts` gains `instances` (the wires' geometry), `renderer.ts` instanceChanges reads what a mesh casts.
- Sheet (the poles' commit on a worktree server, before vs after): reports/elements-optimization/pole-levels/{before,after,compare}.
  | View | Triangles | Draws | Wires sent | Pixels over 8/255 |
  |---|---|---|---|---|
  | street | 31,634 -> 14,834 | 37 -> 39 | 11,980 -> 4,160 | 0.010 % |
  | aerial | 15,626 -> 9,998 | 37 -> 37 | 3,820 -> 3,056 | 0.007 % |
  | urban close | 30,290 -> 16,188 | 31 -> 32 | 12,640 -> 6,376 | 0.000 % |
  | rural close | 29,474 -> 16,290 | 31 -> 32 | 12,640 -> 6,496 | 0.000 % |
  Without the draw's worth rule the street view drew 10,198 triangles in 57 draws: twenty draws more for 4,600 triangles, kept out.
- Correction of my own claim: the lamps' cones and pools are not drawn by day in the game (`scenery.ts` hides their materials under 0.02);
  the sheet showed the pools only because it never sets the night.
- Specs: `poleLevels.spec.ts` rewritten for pieces and spans by their own size (a kilometre line in one block: its far insulators none, its
  spans' chords by their own distance; every near wire's template the one its own span asks), `poleLayer.spec.ts` and `utilityWires.spec.ts`
  read what is cast; 47 files / 370 tests touching poles and casters pass; tsc clean; eslint clean on the new files.
- In the game (the worktree server): shots 069 (V5), 070 (the street): poles and wires as before.

### F19 (P27) - the far glass towers drawn as their curtain walls, the tiles' roofs keeping their plant (the agent's gate 2)
- Found by the agent (gate 1, reports/elements-optimization/far-buildings/gate1): at V0 downtown is cell masses and tiles; a glass tower's
  bays (its 'glass' style: wideWindow openings, 92-94 % of the bay, 78-81 % of the storey) reached the masses as one share of 1, drawn one
  flat pane; the tile's 3 m drop left every roof bare. At V0 a storey is 2.0-2.4 px, a 1.5 m pane 1.1-1.3 px (measured).
- Fix (the agent's code, read hunk by hunk by the coordinator): `buildingMesh.ts` recordBlock records a glass bay as `CURTAIN_WALL` (1) over
  its windows' share; `massingMaterial.ts` draws the windows as the detail cuts them and, round them, the glass finish's far look (`finishFar`:
  albedo, metal 0.76, gloss, its sky 1.4); `finishes.ts` the far shell program reads a metallic finish's metal (its glass scattered 4.2 times
  the light its texture does); `massing.ts` TILE_DETAIL drop 3 m -> 1.4 m (machine rooms, lift rooms, tanks, attics kept; parapets, panels,
  skylights dropped). L0 unchanged (it already drew the spandrels).
- Proof (the agent's): gate2/game/game-V0-downtown.png (before | grid only | this | diff), V5, V1-audit, the towers' sheets at 350-2400 m;
  masonry unchanged at every level and distance. Variant (a), the grid alone, rejected: black boxes.
- Re-measured by the coordinator, GPU quiet (the empty frame 0.317-0.319 ms both runs), the district's scene pass p10, before -> after:
  tile V0 0.465 / 0.469 -> 0.447 / 0.435 ms (26,760 triangles for 18,432: no slower); cell V0 0.426 / 0.495 -> 0.456 / 0.445 and cell V5
  0.480 / 0.548 -> 0.523 / 0.489 (within the runs' own spread). Draws unchanged.
- Checks: 20 spec files / 100 tests touching the far code pass in the tree; HEAD with these files alone: tsc exit 0, curtainMasses.spec and
  imports pass. The agent's lab sheets (farBuildingSheet, partLadderSheet) need gate 3's code: committed with it.

### F20 (P28) - the small building props drawn from afar as their pictures (the agent's gate 3)
- The agent's work (`buildings/partPictures.ts` new; `kit.ts` PICTURED, `partCells.ts` levelAt, `farParts.ts`, `partWarm.ts`, `layer.ts`;
  `plantImpostors.ts` pictureQuad / takePictureFrames / waitForPictures extracted, its street props unchanged): each kind's model taken from
  8 x 8 directions (octahedral impostors, Brucks 2018) as its last level, drawn where it spans under `PICTURE_PX`, each pixel writing its model's
  own depth (pixel depth offset), the sun's shadow read at the model's surface, a thin prop toned as its mesh; its shadow its coarsest model's
  (a caster of its own in the far batch); never faded.
- Read by the coordinator hunk by hunk, and the new file whole. 33 spec files / 185 tests touching parts, pictures and impostors pass; tsc 0;
  eslint as HEAD on the changed files, the new ones clean. Sheets (reports/elements-optimization/building-part-pictures/compare): the pictures
  match their models at 8x (0.086 % of the wall frame over 8/255); district facade 800 m parts 262,556 -> 77,684 triangles.
- The gate's blocker (+1 ms on the sheet's wall frames) is the sheet's timing, not the pictures (the agent's reading, file:line, no cost of
  1 ms on the path): the sheets' light frames swing between two GPU clock states (tower-sw, identical both sides, 0.698 -> 0.689 with a p90
  of 1.6 ms both). Confirmed in the game by the Lab (F7, Diagnostics, V5, by day, GPU loaded at 11 ms a frame), alternating the tree without
  and with the pictures: scene pass 7.9 / 7.8 / 7.9 / 7.9 ms, GPU 11.3 / 11.3 / 11.3 / 11.4 ms; building cell parts 2,842 k -> 2,308 k
  triangles, 253 draws both (shots 071-073). A fix of the sheets' timing method (a loaded GPU, A/B in one page) is on the backlog.
- The finding this exposes: at V5 this GPU's scene pass is not bound by triangles - 534 k fewer did not move it - but by its pixels (the
  facades' shading, GTAO 1.6 ms): the next measures go to the pixel cost.

### F21 (P29) - the lab sheets' GPU time taken with the GPU kept at work, each frame beside an identical copy (BACKLOG 15)
- Cause (read in `partLadderSheet.ts` / `farBuildingSheet.ts`, then shown by the clocks): each sample was 10 passes and a wait for the next
  frame; a light frame (0.45 ms) left the GPU idle most of every 16.7 ms, its clocks fell and rose, and identical frames timed 0.146 and
  0.626 ms. Timing longer blocks or each pass alone timed the CPU's pace once the GPU caught up (0.91 ms a pass in blocks of 15, up to 2.2 ms
  alone: timing-proof/rejected-blocks-of-15, rejected-pass-alone).
- Method (`src/lab/steadyTiming.ts`, both sheets): before each timed block a load of plain arithmetic (8 ms of the GPU's) into a target of its
  own, so the GPU never idles and the block's passes run back to back; a block holds what the CPU sends in 4 ms; the variants of a frame
  sampled in turn, the order turned each round; a frame's identical copy timed beside it gives the method's own spread. The GPU's clocks
  logged beside the run, read only (`scripts/gpu-clocks.mjs`, `nvidia-smi`; nothing locked). Source on clock changes: NVIDIA, "Advanced API
  Performance: SetStablePowerState".
- Proof (reports/elements-optimization/pixel-cost/gate1/timing-proof): tower-sw rounds 1-4 0.732 / 0.735 / 0.735 / 0.736 ms, its copy
  0.731 / 0.730 / 0.732 / 0.730, P0 throughout; re-run by the coordinator (round-5): tower-sw 0.732 vs 0.733, wall-left 0.288 vs 0.290;
  the far district (far-district): cell V0 0.448 / 0.445, tile V0 0.433 / 0.432, cell V5 0.519 / 0.518, L1 V5 1.805 / 1.804, empty
  0.335 / 0.336. contended-trial: the same tower under another GPU load, 1.725 vs 1.727 - the copy moves with it.
- The only sheets that time the GPU are these two (`propLadderSheet.ts` has no timing). tsc 0; eslint clean on the changed files.

### F22 (P30) - the geometry governor reads the scene's geometry bytes alone (BACKLOG 9, a first step)
- Cause (read): `renderer.ts` governGeometry ran the full `countMemory` every 60 frames for one number, building the names' maps, the textures'
  set and sizes and reading every compiled material's uniforms, and walked a shared material's fields once per mesh.
- Fix (`memoryCounters.ts`): `geometryBytesOf` walks the buffers only, with the same rules as the full count (an interleaved buffer once, a
  kept size after upload, a buffer let go without a size not counted); the full count and it share the helpers; a material many meshes share
  is read once, its textures held by the first mesh reaching it (as before).
- Specs (`memoryCounters.spec.ts`, 10 pass): the governor's bytes equal the full count's over every kind of buffer (shared, indexed,
  interleaved, instanced, kept, released, morph, batch, hidden, a material's field); a shared material read once. The heap's churn at rest
  is not re-measured yet: the rest of BACKLOG 9 stays open.

### F23 (P31) - the still pictures' atlases hold no mip chain they never read (BACKLOG 4)
- Cause (read, `plantImpostors.ts` whole): every set's colour, normal and thin-part atlas was made with `generateMipmaps` (three r186
  `WebGLTextures` getMipLevels: every level allocated while it is set) and its chain drawn after the pictures. A still set that is not taken
  at every level (the street props', the ground cover's unclipped sets) reads them only at level 0: `STILL_READ_GLSL` calls `impostorRead`
  with no change across the pixel, whose level is then 0 (`impostorShaders.ts`). The plants (`COLOUR_MAP`, `farForest.ts`), the per-level
  sets (`perMip`) and every shadow outline (`SHADOW_CUT`) do read their levels: kept.
- Fix: those atlases made without levels, `LinearFilter`, and no mip draw after the pictures. `partPictures.ts` already did so. The lab's
  `propPicturesAtlas` loses its `colourMip3` panel (a level that no longer exists).
- Proof (reports/elements-optimization/prop-atlas-mips): the street props' ladders (compare-4, 9 frames) and the ground cover's
  (ground-cover/compare, 11 kinds), HEAD worktree vs the tree: 0.000 % of pixels changed, largest difference 0, triangles and draws equal.
  Nothing can shimmer that did not: the read is the same level-0 read at every distance. Saved: a third of each such atlas (the props'
  set, 2048 x 1024 x 2 RGBA8 targets: about 5.3 MiB, computed from three's rule; the VRAM meter does not count render targets' levels).
- Spec: `propImpostors.spec.ts` "hold an atlas's mip levels only where they are read" (fails on HEAD's code, passes now); 5 picture spec
  files / 28 tests pass; tsc 0; eslint clean with the baseline.

## Second audit: one F7 session, every tab (2026-10-25, 20:47-21:31)

Headless Chrome 155 (Playwright, `channel: 'chrome'`), real gestures only (click, key, wheel, drag), 1920 x 1080, RTX 3060 (ANGLE D3D11),
`?city=small&seed=7`, ultra. The Lab opened once and kept open; every tab opened and used: Diagnosis, Overview, Checks, Inspector (pick in
game), Scene, Console (every snippet), GPU (passes and the six debug views), Frame (capture, group by layer/target, draw filter, Investigate),
GPU objects, WebGL, Consumers (5 s / 30 s / session), Code (live, session, suspects, hot stacks), Coverage, Switches, Optimisations, Recording
(GTAO off/on), Reports, A/B sweep (30 switches), Benchmarks (view route, leak), Probes; the header meters docked and maximised.
Photos: `reports/audit-f7/shots-2/` (001-116, numbered as taken) and the page's console in `shots-2/console.log`.

### M13-M22 - what the session measured
- M13 Diagnosis (Home view, 119 frames): no bottleneck; GPU 9 ms (scene 5.9, shadow maps 0.2, GTAO 1.6, canyon light 0.5, clouds 0.5,
  SMAA 0.3, output 0.1), CPU 6.1 ms (drawing 6.2, overlay 0.1); 277 draws; walls 344 k triangles in 22 draws, agent parts 212 k / 20,
  building parts 118 k / 38, far masses 98.8 k / 19, signals 85.8 k / 12, gardens 68.5 k / 4. 15 causes (shots 006-009).
- M14 Overview (60 s at rest): vsync-bound, interval p50/p95/p99 16.7/17.4/17.9 ms, CPU 6.5/8.3/10.3, GPU 7.2/7.4/7.7, no hitch, heap trend
  +32.7 MB/min in the first minutes (warning); after the tests (111): CPU 10.8, GPU 11.9 ms, heap -0.1 MB/min, nothing to point out.
- M15 Checks: 0 problems, 0 warnings, 14 ok, 4 informational; GPU timer 141,841 frames, 0 skipped, 0 discarded (011, 110).
- M16 Frame (042-048): 278 draws (232 calls), 1,134,417 triangles, 49 programs; 16 unnamed draws a frame into a 212 x 1024 target;
  46 draws of no instance in the colour pass (`utility-*-cast`).
- M17 GPU objects (112-113): 102 textures 297.3 MB, 11 targets 211.3 MB, 1,662 geometries 192.8 MB; 541 programs alive after the sweep.
- M18 Code (live, 22 windows, 206 s, camera orbiting; 070-072): self time projectObject 4.2 s (three), profilerHooks.ts:36 3.2 s,
  casterChanges 2.0 s, draw 1.8 s (58 s with callees), setProgram 1.5 s, fitInstances 1.45 s, readTick 1.29 s, agents sync 1.28 s.
- M19 Recording (090): GTAO off/on, GPU p50 11.76 -> 10.22 -> 11.78 ms.
- M20 A/B sweep (097-099, 322 s): buildings -4.73 ms (-40.6 %), GTAO -1.58, shadows -1.31, people -1.04, terrain -0.72, vegetation -0.60,
  canyon light -0.50, clouds -0.45, environment map -0.40, SMAA -0.37; the rest within the noise.
- M21 Benchmarks, view route (101): map GPU p50/p95 6.31/6.71 ms, 119 draws, 0.61 M triangles; district 9.85/9.93, 444, 3.85 M;
  street 9.53/10.4, 477, 4.82 M; every frame p50 16.67 ms.
- M22 Benchmarks, leak (104): heap 795 -> 1,134 MB, "slope" 145.9 MB/min, "retained" 62.8 MB; textures 232 -> 242; geometries and
  programs unchanged; 9 frames over 50 ms, frame p95 20.1 ms.

### Problems found in the session
| # | Where | Problem (what the Lab showed) | Cause (read in the code) |
|---|-------|------------------------------|--------------------------|
| P32 | Lab header | "FPS 100%" painted red (bad) at a steady 60 fps (006, 016) | `window.ts` drawMeters grades every meter alike: a share over 85 % is bad; for the frame rate a high share is the good one |
| P33 | Lab header | "VRAM 50%" never moves while the Lab is open (every shot) | `usage.ts` scans the GPU's objects once, when the window opens (`setActive`); never again |
| P34 | Lab header | Docked, each meter's bar and sparkline run over the next meter's name (016 x3) | `.lab-panel button` (0,1,1) beats `.lab-meter` (0,1,0): the meter, a button, is laid out as an inline flex row, not its 3-row grid |
| P35 | Inspector | Picking a building selects the 3D object `sky` (5,534 m away) and outlines the sky's box across the screen (017, 018, 022) | `raycast.ts` takes the nearest solid met by its triangles; the sky sphere (BackSide, writes no depth) is met by its far side and counts as solid, the building only by its box |
| P36 | Code | "Last window" never refreshes while sampling live: Windows 1, Samples 162 frozen (068, 069) | `codeTab.ts` redraws only when the aggregate's version changes; each window replaces `last` with a new aggregate whose version is again 1 |
| P37 | Switches | The chosen buttons (resolution 100 %, material, LOD budget, detail memory "Normal") are blank teal pills (074-076) | `lab.css` sets `--v-accent-ink` to the accent itself: the chosen button's text is drawn in its background's colour |
| P38 | Reports | Files under 1 KB listed as "0 KB" (091) | `recorder/index.ts` rounds size / 1024 to a whole number |
| P39 | Benchmarks | fps 59.98 against "at least 60" marked over for district and street at a perfect 60 Hz pace (frame p50 16.67 ms) (101) | `benchmarks.ts` compares 1000 / p50 unrounded; the game's own budget (`perfBudget.ts`) reads whole frames per second |
| P40 | A/B sweep | `skyFill` and `fillLight` measured with no GPU time in B ("no GPU", verdict noise, 80 programs) (097) | a light switched recompiles the lit programs off the draw (`renderer.ts` compileChanged) and holds the frames meanwhile; the sweep's settle does not know, so its B window timed frames never drawn |
| P41 | Benchmarks | Leak test "grows": heap +62.8 MB retained, slope 145.9 MB/min, textures +10 (104) | `benchmarks.ts` track times one lap from a cold start: the first visit's cells, pictures and citizens' atlases count as retained, and the heap is read with its uncollected garbage |
| P42 | Diagnosis | CPU causes placed at generated lines ("draw in renderer.ts:3823 (generated)") where the Code tab places them in the TypeScript (renderer.ts:3342); their "View code" filters on a place no row has (007-009) | `doctor/measure.ts` reads the profile's functions before their modules' maps are in (`sourceStore.locate` answers null until fetched) |
| P43 | Diagnosis | "1 hitches (frames over 50 ms)" (007) | the title takes the plural whatever the count |
| P44 | Inspector | Each hover pick blocks the page 70-98 ms (LoAF `hoverNow`), each click 64 ms (064) | `raycast.ts` walks every instance of every instanced mesh with no array (a box each) and three's raycast every instance of the others, with no test of the mesh's whole bounds first |
| P45 | GPU, Wireframe | 208 x `GL_INVALID_OPERATION: glMultiDrawElementsANGLE: Insufficient buffer size` while the view is on (console.log 23:57:09-11) | the building shell batches (`GpuBatchedMesh`) draw by multi-draw ranges of their triangle index; three's wireframe builds a line index from `index.array`, a stand-in with no length: an empty index, drawn by ranges |
| P46 | Frame | 46 of 278 draws a frame hold no instance: the poles' and wires' casters (`utility-*-cast`) gone through the colour pass (048) | `poleStores.ts` keeps each cast mesh visible with a colour count of 0; three still sets up its program and uniforms each frame. A building part's caster is hidden between the passes instead (`partCells.ts` castInto, `userData.shadowOnly`) |
| P47 | Frame | 16 unnamed draws a frame into a 212 x 1024 target: no name, no layer, "no snippet found" (045) | `people/crowdAnimation.ts` sceneOf: the crowd's animation passes' quad has no name |
| P48 | Console | `warning X4122: sum of 1 and -1.49272e-017 cannot be represented accurately in double precision` at boot | no game shader holds such a constant (searched); D3D's HLSL compiler folding a constant of three's or ANGLE's own GLSL. Harmless; its program not found without experiments |
| P49 | Console | `[roads] a road tile worker has been silent for 10006 ms with tiles waiting` at boot | `roadTilePool.ts`: the lane's silence counts the time its share waits behind other services' jobs on the shared job-pool worker during the opening; the warning says so. Not a fault |
| P50 | Probes | `__roadcraft.audit()`: staleClaim, vehicle 3975 admitted and immobile, reservation kept (107) | the watchdog's diagnostic (`pipeline.ts` runWatchdog); the vehicle was gone later (Lab console, 116): a long wait, not a deadlock |
| P51 | Benchmarks | Leak test: 9 frames over 50 ms in 30 s of camera flight (104) | no long task or LoAF of the game's scripts recorded (Consumers): not attributable from the main thread |
| P52 | Consumers | Lab tab switches block 52-123 ms (LoAF `BUTTON.onclick` window.ts) | the Lab's own tables built on mount (GPU objects scans every object); the Lab's cost, outside the game |

### Scope (the owner, 2026-10-25): the game's errors the inspector shows, not the inspector's own
P32-P45 and P52 are faults of the Lab itself (its meters, Inspector pick, Code tab, Switches styling, Reports, Benchmarks, A/B sweep,
Diagnosis labels, Wireframe view): recorded, left as they are. The game's: P46, P47, P48, P49, P50, P51, P41, and the profile's
"hot anonymous" under `profilerHooks.ts:36` (M18).

### F24 (P46) - the poles' and wires' casters out of the colour pass
- Fix: `shadowCasters.ts` `SizedCaster.shadowOnly`: a caster drawn into the cascades alone is hidden between the passes and shown for a
  cascade's pass where it holds instances and casts (as a building part's caster, `partCells.ts` castInto); `poleStores.ts` PartStore and
  WireStore make their cast meshes so, `userData.shadowOnly` saying whether they hold anything (the casters' signature reads them hidden,
  `renderer.ts` casterChanges, as before). The colour pass no longer walks 46 draws of no instance a frame.
- Spec: `shadowCasters.spec.ts` new case (hidden between the passes, shown in a cascade it casts into, hidden under its texel or empty);
  8 spec files / 24 tests touching casters, poles, wires and the crowd pass; tsc 0; eslint clean on the changed files.
- In the game (HEAD worktree on 5301 vs the tree on 5300, the same gestures, paused by day): `shots-2/after-fix/` 04, 05, 06, 09 before
  and after; the poles, their wires and their shadows the same (`09-pole-shadow-x4.png`, `06-poles-before-after-x2.png`); the
  differences of `06-street-close-diff.png` are the cars and people (the two pages' traffic), none on a pole or its shadow.

### F25 (P47) - the crowd's animation passes named
- `people/crowdAnimation.ts` sceneOf names its quad and scene `crowd-animation` / `crowd-animation-blend`: the 16 draws a frame into the
  212 x 1024 target are told apart in a capture. No change drawn.

### F26 (M18) - the upload counters of the dev profiler named
- `render/profilerHooks.ts` (development builds only): the wrappers of `bufferData`, `bufferSubData` and the texture uploads are named
  functions; the CPU profile filed the driver's uploads under "(anonymous) profilerHooks.ts:36" (3.2 s, the Code tab's "hot anonymous").

### F27 (Diagnosis cause "Function wantedBlocks in propCells.ts:582") - a still view's far blocks chosen once
- Cause (read): `propCells.ts` show() chose each class's far blocks every frame (`wantedBlocks`: every 1 km block within the class's
  reach measured and tested against the frustum, allocated and sorted), handed them to the cache (`ViewCells.want` copies the list and
  rebuilds its set) and built another set of them; at the city's whole view the reach (the camera's far plane, ~18 km) spans ~2,300
  blocks, four times a frame with the gardens and the furniture. The Diagnosis measured it at rest: 54.7 ms of self time in 3 samples.
- Fix: each class keeps the view its blocks were chosen for (the view matrix, the frustum's planes, the view's point, the ground, the
  reach); the same view takes the same keys and set, and the cache is given a new list only when they change. Same blocks, same order.
- Spec: `propImpostors.spec.ts` new case (three looks at a still view ask once; a moved view asks again and gets what a new layer gets);
  it fails on HEAD's code, which asked every look. 10/10 in the file, 27 tests with instanceRuns and streetFurnitureLayer; tsc 0, eslint clean.
- In the game: `shots-2/after-fix/*-after-F27.png` at the same views; the far woods, parks and street props the same
  (`04-far-woods-earlier-vs-now-x2.png`, `04-far-park-earlier-vs-now-x2.png`, `06-park-earlier-vs-now-x2.png`); the differences are the
  traffic and the shadows of a clock stopped 3 minutes earlier (06:37 against 06:40).

### Left open, with their reason
- P48 (`X4122` at boot): three's own `packing.glsl` (`UnpackDownscale = 255. / 256.` = 0.996094, `PackUpscale = 256. / 255.`), folded by
  D3D's HLSL compiler under ANGLE; a warning, not the game's code.
- P49 (road tile worker silent 10 s at boot): `roadTilePool.ts` reports a lane's silence while its share waits behind the opening's other
  jobs on the shared workers; it waits and the tiles come. The warning is by design.
- P50 (staleClaim 3975): the traffic watchdog's diagnostic; the vehicle was gone later (116): a long wait, not a deadlock.
- P41 / P51 (leak test: heap +62.8 MB, textures +10, 9 frames over 50 ms in a 30 s flight): one lap from a cold start counts the first
  visit's cells, pictures and atlases; no long task of the game's scripts in the window. Read in the code: every texture made per cell,
  block or sheet is let go on its release path (`signs.ts` cellTexture, `lotOverlay.ts` upload, the sign sheets); the textures a flight
  adds are the citizens' batches (`riggedCitizens.ts`: a person's KTX2 atlas, its motion atlas, its joints and its palette target, made
  the first time that person of the 16 ready files is in view and kept with the layer, `owned`): two persons met in the flight are the 10,
  a cache with a ceiling. The heap's caches are the cells' budgets (`ViewCells` cpu/gpu budgets, `trim`). CLOSED: no leak in the code
  paths; every cache the flight fills is bounded.

### F28 - the dead-code cleanup (the scope's "full dead-code/junk cleanup")
- Knip made to see the game as it runs: the lab's sheets the scripts load in the page are entries (`src/lab/*Sheet.ts`, `optimization/sheet.ts`,
  `catalog/run.ts`), `/src/*` mapped for the scripts' page imports, the scale config read, `nvidia-smi` a system tool like `taskkill.exe`,
  `@jridgewell/trace-mapping` and `source-map-js` declared (the scripts import them); the exports read by name through Vite's `ssrLoadModule`
  or a dynamic import tagged `@public` (`COOKED_CITIES_DIR`, `cityGenHash`, `referenceFurniture`).
- What was dead, removed, each read before (149 files, +305 / -1,148 lines): 4 files no one imported (`citizenAssets.ts`, `playerId.ts`,
  `growth/grownRows.ts`, `growth/rows.ts`); the grown-rows chain of `doc.ts` (`preparedTiles` was never set: `tileGrown`, `PreparedGrown`, the
  `grown` field, the "prepared" branch of `loadTile`, `BuildingStore.placeAll`'s `plain`); the baked kerb bays of `parking.ts` and
  `kerbBays.ts` (`tileBays*` never called: the four maps always empty, `waits`/`baked`, `held`/`redo`); the rejected whole-map planner of
  `wholeMap.ts` (only `MAP_HALF`, `tileOnMap`, `onMap` read); `assert`/`slowChecks`/`ensure` and the `__SLOW_CHECKS__` define; `compilesQuiet`
  and its waiters; and 50 single functions or constants no one read. 175 exports and 93 types no longer exported where only their file reads them.
- After: knip 0 findings (baseline 0), tsc 0, eslint 0 on the tracked code (its suppressions 1,017 -> 996, none grew).

### F29 - the pole tool's choices owned by a controller (`no-module-state`)
- `src/ui/toolChoices.ts` held 20 module-level `let`s against a baseline of 19 since the poles' commit (af98b0f5): `npm run lint` failed at
  HEAD. The pole kind and its lamps are now `createPoleChoices()`, one made by the game (`main.ts`) and handed to the pole tool and its panel
  (`ShellDeps.poleChoices`): 18 left, the baseline pruned. In the game: the panel shows urban/alternate, and changing kind and lamps moves
  the selection (`shots-2/after-fix` not needed; photos in the session's scratchpad `after3/05-07`).

### F30 - the two failing specs found by the batch's unit run (both failing on clean HEAD too)
- `pixelSkips.spec.ts` VIA-05 (P17 of the first audit): the derivatives are taken before the guarded read as the spec asks, with the road
  material's `#ifdef ROAD_DETAIL` between them; the regex now allows that directive alone.
- `cityGolden.spec.ts`: the documents of the golden's commit (df876e39) and of HEAD compared field by field: the only difference is
  `poles[].kind = 'urban'` on the 796 poles (the poles' commit), 11,940 characters; the number updated with the reason in the spec.
- The unit suite after the batch: 645 files passed, these 2 failed (now pass: 4/4).

### F31 - `texSubImage3D: no bound PIXEL_UNPACK_BUFFER` (30 at once, P16 again): a context lost and restored
- Cause (read, then seen): every texture is sent anew after a WebGL context is restored, and the baked surfaces had let their texels go
  once uploaded (`surfaceTextures.ts` letTexelsGo): three r186 sent each level of the arrays with no pixels (`texSubImage3D(..., null)`),
  one call a level, 30 for three arrays of 10 levels. A saturated machine (the unit suite on every core, a dev server restarting) is where
  the browser drops and restores the context; reproduced in the headless driver with `WEBGL_lose_context` (debugging only).
- Fix: a texture whose texels are gone has its source marked not ready (three r186 `Source.dataReady`: the storage made, nothing sent);
  the context restored asks every let-go texture's file again (`wantAllTexels`), the texels read back are marked ready and sent, and the
  scene is drawn again with them (`whenTexelsRefilled`: the scene draws on demand). Spec `surfaceTexels.spec.ts`.

### F32 - the town after a restored context, as it was before it (found while reproducing F31)
The context restored with the same gestures, paused by day, compared with the same page before the loss and with a fresh page; each fault
read in the code, fixed, the restore repeated:
- A paused game stayed blank: nothing asked a frame. The restore asks one (`renderer.ts`).
- The sky's reflection was lost (the town a quarter darker): three's book of GL objects is new after a restore (r186 `initGLContext`) and
  the old prefiltered map bound nothing. It is drawn again (`environment.ts` skyLost), from the day sky it was made with (`daySky`): drawn
  from the sky of the hour of the restore (06:34, a dawn sky) the glass reflected a darker, warmer sky. The effects panel takes the new map
  (`environmentMap()`). Spec `environmentRestore.spec.ts` (fails with the sky cloned at the restore).
- The palms and the small props' far pictures were empty: a picture taken once into a render target is never drawn again by three. The
  street props' and the building parts' sets take their pictures again (`contextRestored.ts`, `plantImpostors.ts`, `partPictures.ts`; the
  layout helpers moved to `pictureLayout.ts`, the file under its 800 lines). Spec `pictureRetake.spec.ts`.
- The far shadows were lost: three makes a new `WebGLShadowMap` at the restore and drops both wrappers of its `render` (the cascades'
  stores and movers, `sunCascades.ts`; the occlusion's reveal, `renderer.ts`). Both are put on the new one (guarded against wrapping twice),
  the cascades' stores made again and drawn whole. Spec `sunCascades.spec.ts` new case.
- 23-28 frames thrown away in the second after the restore: `TypeError: Cannot read properties of null (reading 'byteLength')` in three's
  `createBuffer` (`10-restore-earlier-console.log`): the citizens' bodies are read back from their cook asynchronously, and a level drawn
  before they came made its buffers from no array. Every level of the body is held off the drawn layers until its arrays are back
  (`riggedCitizens.ts` keepPartOnGpu, as `uploads.ts` holds a mesh whose programs are not built). Spec `peopleMemory.spec.ts`.
- Twice the cells in detail (11 for 5): the layer makes its cells again after a restore and a cell made new starts near and fine, which the
  hysteresis then keeps (`massCells.ts` HYSTERESIS): the glass towers showed their detail's panes and lit rooms where their facade level
  had stood (`10-restore-earlier-towers-x2.png`). The cells made again start at the levels the eye had chosen (`chosenBefore`). Spec
  `massRestore.spec.ts` (fails without it).
- After: levels chosen 5 / 23 / 8 before and after; the top band differs from the frame before the loss in 0.37 % of its pixels (two fresh
  pages differ in 0.20-0.29 %: the traffic), the whole frame 0.67 %; no page error (`10-restore-before.png`, `10-restore-after.png`,
  `10-restore-before-after.png`, `10-restore-towers-x2.png`, `10-restore-console.log`).
- Left: `WebGL: INVALID_OPERATION: delete: object does not belong to this context` after the restore. three r186 keeps the lost context's
  dispose listeners on what was drawn before the loss (`WebGLGeometries` onGeometryDispose holds the old `WebGLAttributes`): a geometry
  disposed later deletes its lost buffer too. Warnings of three's, nothing drawn wrong.
- Checks: tsc 0, eslint 0 on every changed file, knip 0; 19 spec files / 107 tests of the touched points.

### F33 - the roads and junctions seen from above, against the owner's tool's spec (a check, no change)
- `toolReference.spec.ts` run alone: the tool's layouts (four-way, T, bend, diagonal, T at 70, 60 and 45) built by the game triangle for
  triangle as the tool's run counts them, plate, kerb faces, footway and carriageway, at L0, L1 and L2 (with the owner's curved corners);
  with the road tiles', far roads' and ladder's specs, 5 files / 52 tests.
- The same layouts meshed by the game's own code and drawn from above (`11-topview-*.png`: each level, the junction in a 32 m window and the
  whole layout in 150 m; grey the carriageway and plate, blue the footway, red the kerb faces edge-on, green the dropped kerbs, orange the
  far level's casing). Read on them: each road band one quad; each plate filled from its outline alone (no point inside); the kerb returns
  stepped 8, 4 and 2 a right angle at L0, L1, L2; the bend curved inside and outside, its footway keeping its width round both; each
  footway corner one polygon whose back follows the arc; no verge strip in any layout (no `verge` surface among the shapes).
- The tool's own page (`ferramenta-vias-objetos.html`, read only, in headless Chrome) set to the game's section (kerb radius 3.5 m, carriageway
  8 m, footway 3 m) by its sliders, each example (Cruzamento, T, Curva, Diagonal) seen from above at L0, L1 and L2 beside the game's mesh
  (`12-tool-vs-game-*.png`). Its four-way counts 178 triangles at L0 (kerb faces 80, footway 56, plate 34, carriageway 8; narrowest 15.6 cm),
  the spec's reference. The plates' triangulations, the kerb returns' steps and the roads' quads are the same at every level; the differences
  are the owner's orders and the game's own features: the bend's outside and every footway corner's back curved (the tool squares them),
  the dropped kerbs at the crossings (the tool has none), the far level's casing where the tool draws the footway at L2.
- Each difference held to its order, measured on the game's meshes (points on each arc about the corner's centre, L0 / L1 / L2):
  the owner's curved corners (2026-10-25, "curved inside and outside"): the bend's inside kerb r 3.5 m 9 / 5 / 3 points over 90 degrees
  (8 / 4 / 2 steps), its outside kerb concentric at r 11.5 m 9 / 5 / 3, its outside footway's back at r 14.5 m 9 / 5 / 3 (the footway's 3 m
  kept round it), the inside footway's back at r 0.5 m 5 / 3 / 2; each four-way corner's kerb 9 / 5 / 3 and its footway's lot side 5 / 3 / 2.
  The dropped kerbs: the game's since its first copy (7ff77269, 2026-10-12), kept (no feature removed). The far casing: the tool's L2 footway's
  triangles exactly (`toolReference.spec.ts` "the network's far level as the tool's L2").
