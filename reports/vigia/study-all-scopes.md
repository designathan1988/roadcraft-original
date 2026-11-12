# Study of all scopes: state, what is wrong, what to do, how it is accepted

VIGIA, 2026-10-24, written with the three sessions stopped. Sources:
- three read-only fact sheets of the working copy (roads, buildings, people/vehicles/props), each run with tests and file:line evidence;
- the VIGIA's own measurements (junction reference, three.js r186 generators run in Node, npm and GitHub metadata);
- web sources, linked where used.

"Measured" means a number was read from a file or a run; "computed" means arithmetic on measured numbers; "assumed" is said.

## 0. Where things stand

| scope | commits since the sessions started | working copy |
|---|---|---|
| Roads | none | Large rewrite, not committable: 19 type errors in tests (blocks `npm run build`); failing specs: pieceMesh mouth seam (8 m gap), roadLod, networkFarRoadsBuild, landStroke, surfaceInputsResidency, cutWalls, steppedYards (44 lot surfaces with earth above the floor), unboundedPlates, binarySave/chunkedSave (12, the v7 save has no test); the map shrank from 18 x 1,024 m = 18.4 km to 14 x 1,280 m = 17.9 km a side (`vite.config.ts:16`); no measurement or photo after the last edits. |
| Buildings | ruler a6eb9ce6 (hidden-triangle criterion, accepted: 4 files, test 5/5) | Stage 1 (hidden faces removed at generation): whole catalogue 1,662,866 -> 1,501,550 triangles (-9.7%), vertices -11%, hidden 96,424 -> 2,496; 156 tests pass; not committed. |
| People / vehicles / props | none | 16 new people cooked (in the main folder now); MakeHuman sources and the cooker deleted, **and the new cooker's code exists nowhere** (it was edited in place, then deleted); licence problems; budgets missed. Vehicles, props, vegetation untouched. |

Cause, the VIGIA's share included: stages too large before the first commit; orders queued while a session ran one turn for an hour;
a commit instruction ("commit with pathspec") that writes the working copy of the path, shared by every session.

## 1. Rules for every session from now on

1. **Small stages, one commit each, at most ~2 hours of work.** Every stage ends compiled, with tests passing, measured, photographed,
   committed. Nothing is "finished later".
2. **Commit from the index.** The working copy is shared. Stage your files (or your hunks with `git apply --cached`), check that
   `git diff --cached --name-only` holds nothing of another session, and run `git commit` with **no** pathspec.
3. **No regression of features.** Map size, any visual detail, save compatibility, and every test that passes on HEAD must still hold.
   A lost feature is a failed stage.
4. **Measured, not claimed.**
   - Triangles, vertices and draws come from `scripts/optimization-sheet.mjs` or `scripts/model-catalog.mjs`, in clean worktrees,
     before = HEAD.
   - Images: render + wireframe, before/after; the session opens every one.
   - Add "min triangle altitude" (2 x area / longest edge) to the sheet.
5. **Ends of turns.** A session ends its turn after each step, so the VIGIA's messages reach it; no turn longer than ~45 minutes.

## 2. Roads

### What is right
- Segments as cross-section strips sharing station vertices: straight 140 m 412 -> 58 triangles, 16 -> 3 draws.
- No verge, no skirts under the carriageway, no clipper/union/difference.
- 10 m grid, TILE_ORIGIN removed.
- Exact kerb ramps.
- Terrain conformed to roads and lots (Delaunator + Constrainautor), wired end to end in WebGL (`renderer.ts:1781` -> `terrain.ts:2371`
  -> `terrainLod.ts:129,149-195` -> `renderedHeightAt`); 5 unit tests pass.

### What is wrong
- **Junction plate** meshed in rings with fans (`pieceMesh.ts:166-171`, `fanTriangles`, `MOST_RINGS`): triangles 3.4 cm wide. A plate
  that is neither star-shaped nor planar falls back to earcut with no tolerance check.
- **Corner arcs** resampled at 1 cm at every distance (`junctionPiece.ts:231`): about 290 triangles a four-way junction on the arcs alone.
- **Kerb top** is a band of its own (`roadSurfaceReads.ts:277-288`).
- **`seamsOf` locks the plate's whole outline** as seam (`pieceMesh.ts:110-116` with `junctionPiece.ts:135-136`), so the far level
  cannot simplify it: L1 saves 4%, its error rose from 0.05 to 0.17.
- **Vertex 56 B** (all Float32; `surfaceTiles.ts:28-33`); 11 draws a junction.
- **Map shrunk** 18.4 -> 17.9 km.

### Target design
Researched; the reference with counts is in the VIGIA scratchpad, `cruzamento-referencia.html`.
- **Plate from its outline only.** earcut + refine when flat; Delaunator + Constrainautor with the crown's fold lines as constraints
  when crowned.
  - Delaunay maximises the smallest angle of a triangulation of the given points
    ([Wikipedia](https://en.wikipedia.org/wiki/Delaunay_triangulation)).
  - Fans are the worst case on the GPU, which shades in 2 x 2 pixel quads
    ([Persson, "Triangulation"](https://www.humus.name/index.php?page=News&ID=228)).
  - Adding interior points (Ruppert refinement) was measured: 3x the triangles, no gain in width. Rejected.
- **Corner with a chamfer (the user's requirement), its detail by distance**, equal-angle stations nested 8 ⊃ 4 ⊃ 2 ⊃ 1:

  | level | n | chord error, R = 4 m |
  |---|---|---|
  | L0, < 90 m | 8 | 1.9 cm |
  | L1, 90-350 m | 4 | 7.7 cm |
  | L2, > 350 m | 2 | 30 cm |

  - Each switch is at <= 1 px (roads session's figure: 1,158 px/m at 1 m).
  - The mouths never change, so there is no crack between levels.
  - WebGL 2 has no tessellation stage (it targets OpenGL ES 3.0; tessellation is ES 3.2,
    [Khronos list](https://www.khronos.org/webgl/public-mailing-list/public_webgl/1702/msg00026.php)), so levels are discrete meshes.
- **Every arc step costs 4 triangles a corner** (1 plate, 2 kerb face, 1 footway), measured in the reference: a four-way junction with
  22 m arms is 50 + 16 n = 178 / 114 / 82 triangles, against 677 now. The user's square model, with no chamfer, is 42.
- **Kerb top inside the footway band**, its colour from the shader (as `roadSection` already draws the lines).
- **No kerb face at L2** (16 cm < 0.6 px beyond 350 m).
- **Stage 2:** roads beyond ~1.5 km painted into the terrain's paint texture (2 m a texel, `terrain.ts:283`) instead of geometry. Far
  Cry 4 bakes roads and decals into its terrain's virtual texture this way
  ([Ka Chen, GDC 2015](https://gdcvault.com/play/1021761/Adaptive-Virtual-Texture-Rendering-in)).

### Roads stages

**R1, make it committable** (no new design work):
- 0 type errors.
- Every spec that passes on HEAD passes:
  - the networkFarRoadsBuild test's `exclude` argument;
  - pieceMesh: the mouth seam;
  - steppedYards: earth above the floor;
  - cutWalls, unboundedPlates, landStroke, surfaceInputsResidency, roadLod.
- Save v7 with a migration test, and binarySave/chunkedSave expectations updated for v7 only where the format changed by design.
- **Map size back to >= 18.4 km a side.** 18 tiles of 1,280 m = 23.0 km, or prove a valid count >= 18.4 km.
- Remove `probe54tmp.spec.ts`, `_inv`, `_tsc54.json` and the stale verge comments.
- The preview warm-up TypeError seen in the after-logs (`renderer.ts:2659`) fixed.
- Sheets: straight, bend, T, four-way (L0/L1), and grazing photos on a slope.
- Commit.

**R2, the junction**, per the spec in `reports/vigia/roads-stage1-junction-spec.md` sections 1-3:
- Four-way: L0 <= 260 triangles with 8 ramps, L1 <= 200, L2 <= 90.
- Min altitude >= 5 cm.
- Tests: nested stations, fixed mouths, no sliver, plate from outline, chord error.

**R3:**
- Vertex <= 32 B.
- Draw calls by one material where the slot allows it.
- Far roads into the terrain texture.

## 3. Buildings

### Where the triangles are (measured, catalogue rows, L0 built alone, after stage 1)
- The 25-floor tower (40 x 36 m) is 142,350 in total:
  - balcony plants: pot 14,700, foliage 21,696 and bush 16,296, so 52,692 (37%);
  - balcony furniture: chair 13,764, table 7,280, lounger 4,416 and airer 1,824, so 27,284 (19%);
  - fins and edges: 27,428 (19%);
  - non-window "frame" parts (canopy brackets, transoms, gourmet posts): 16,236 (11%);
  - glassRail 7,728;
  - shell 910, plus 162 of facade runs.
- Apartments, 5 floors: 11,020 in total (railing 5,040). House: 2,066.
- Windows are already shader (`PANE_FRAME_GLSL`, `glassRoom.ts:16-64`).
- Far proxies already exist and are cheap: masses 22-132 triangles and base 10-54.

### The defect that costs the most in a real city
- `layer.ts:174` builds `FarPartBatch` in the same call that makes the kit (`layer.ts:83`).
- `farParts.ts:64` takes `levels.at(-1)` then, while the meshopt levels of the 9 props (pot, foliage, bush, chair, table, lounger, airer,
  dish, bike) arrive later (`kit.ts:200,709-711`) and are never picked up (`farParts.ts:94-95,277`).
- So **every building beyond ~280 m draws its balcony plants and furniture at full L0, permanently**. For the tower that is about 80,000
  of an estimated 95,668 L1 triangles. This was found by reading the code and has not been measured at run time.
- The catalogue reads levels before meshopt is ready (`src/lab/catalog/kits.ts:41-44`), so it never measures them either.

### Buildings stages
**B1:** commit stage 1 as it is (tests pass), with its sheets.
- First, visually check the placement changes the diff made beyond hidden faces: terrace pots 0.7 -> 0.5 m, pergola posts, tank ladder,
  stairLift car.
- `cellArrays` / `partFiling` / `layerCells` follow the roads session's CELL change. They are committed by whichever stage carries
  CELL, not twice.

**B2:** fix the FarPartBatch race.
- The far batch rebuilds when the meshopt levels arrive, or levels are made before the batch.
- The catalogue measures the levels after `MeshoptSimplifier.ready`.
- Acceptance:
  - catalogue L1 row of the tower <= 30,000 triangles;
  - a test that a far batch never draws a prop at L0 once its levels exist;
  - same far image.

**B3:** balcony plants and furniture as impostors beyond N px.
- Reuse `plantImpostors.ts`: octahedral, 2 triangles, the real model's picture, already used for lot and street plants below 48 px.
- Acceptance:
  - the same render up close;
  - triangles drawn by the tower at 100 m <= 40,000, measured by a sheet that draws at fixed distances with LOD on, not the L0 sum.

**B4:** cheaper geometry, same look.
- Non-window frame parts: 44 -> <= 12.
- glassRail: 12 -> 2, a single quad.
- Merge fin and edge where they are coplanar runs.
- Acceptance: tower L0 <= 90,000 with the same sheet image.

## 4. People

### State (measured from the .bin headers)

| level | before (budget, HEAD) | before, total of 16 | now, total of 16 |
|---|---|---|---|
| L0 | 3,000 | 83,031 | 60,975 |
| L1 | 800 | 63,967 | 26,520 |
| L2 | 200 | 24,261 | 4,786 |
| L3 | 60 | 9,936 | dropped |

- Now 3 meshes plus the 8 px impostor.
- The budgets are still missed: L0 over 3,000 for 14 of 16 bodies (max 5,002); L1 over 800 for all 16 (1,153-2,504).
- Files: 4.36 -> 2.92 MB.
- The people load by per-file sha256 (`cookedLoad.ts:8-17`, `cook-plugin.ts:100-110`); the old code-hash gate is gone.
- **Lost:** the new cooker (`src/dev/peopleCook/shell.ts` and the edits to `visibility.ts`, `meshDistance.ts`, `weld.ts`, `lodLadder.ts`,
  `cook.ts`) is in no commit, no worktree, no patch.
  - It is recoverable from the models session's transcript: 6 files written whole, 7 edits, about 40 scripted patches.
- **Licences.** The 16 bodies wear 9 AGPL-3.0 uses and 6 with no stated licence (bodies mh_34, mh_55, mh_44, mh_14, mh_64, mh_38, mh_59,
  mh_45, mh_67, mh_04). Neither can ship in a commercial game.
  - The 14 CC-BY uses need attribution, and nothing fills the About dialog's `#aboutCredits` (`index.html:27`).
  - `CREDITS.json` and `LICENSE-MakeHuman-CC0.txt` are untracked while `cook-plugin.ts:196` copies them: a clean clone fails to build.
- `citizenLocomotion.spec.ts:171` now fails: the feet overlap by 0.53 mm on the side step.

### People stages
**P1, recover the tool:**
- Rebuild the cooker from the transcript into a tools location **outside the shipped game**: a `tools/people-cook/` folder excluded from
  the build and from `src/`, or a separate branch. Its MakeHuman sources stay out of the game build too, per the user's order.
- Acceptance: re-cook mh_48 and mh_59 and get files **byte-identical** to the ones in `cooked/people`. Commit the tool.

**P2, licences:**
- Swap every AGPL and unstated item for a CC0 one (or CC-BY with credit) and re-cook those 10 bodies.
- Fill `#aboutCredits` from `CREDITS.json`, with a test that fails if a CC-BY item is missing from it.
- Commit `CREDITS.json` and the licence file.

**P3, budgets:**
- L0 <= 3,000 and L1 <= 800 for all 16, or a justification per body in px at the switch distance with a sheet.
- `citizenLocomotion` passes.
- Then the deletion commit: MakeHuman sources, the old cook, `src/dev`.
- Acceptance: sheets per body and level, a game photo of people in a street, a grep proof.

## 5. Vehicles, street props, vegetation (not started)

### Measured
- **Cars.** L0 13,600-15,310 (hatch: shell 9,720, interior 1,570, roof 1,540, steering 540, glass 1,008); 49-121 hidden triangles a car,
  never removed.
- **Levels.**
  - Made at run time by meshoptimizer (`partLevelsWork.ts`, errors 1.25-40 cm); the hatch shell goes 9,720 -> 2,183 at L1.
  - Bus and truck shells never simplify.
  - Door open-state parts have no levels.
  - L0 is drawn only above 40 px/m, and band 2 only for the 200 largest on screen.
- **Far street furniture.**
  - Far blocks draw every bench, bin and hydrant at its full near mesh (`propCells.ts:417`).
  - Commit b46c5894 fixed it with 12-triangle boxes (district: benches 587k -> 43k, bins 624k -> 41k, hydrants 199k -> 14.5k).
  - 837f1866 reverted it because boxes are not the same model.
  - The right fix keeps the look: the prop's octahedral impostor (2 triangles, the real picture), the system plants already use.
- **Signals.** 412 triangles a head with no levels; a code note records 1 M triangles at a close view of a large city (`signals.ts:456`).
- **Barriers.** Railing 6,996 triangles per 70 m (583 boxes x 12) with no levels.
- **glTF ground cover.** Up to 3,216 triangles (a mushroom), 1,690 (flowers); no simplification, no levels, only a 1 px cull.
- **Vegetation.** Body + cards above 48 px, octahedral impostor below; no middle level.

### Stages (after P1-P3)
- **V1, far furniture as impostors.** Acceptance: district view triangles of benches, bins and hydrants <= 60,000 total, the same image
  (pixel diff and the sheet).
- **V2, signals.**
  - Lenses and halos drawn by the shader of one face, not geometry; a far level of the head.
  - Barriers: railing beyond N px as a card with the bars in alpha.
  - Acceptance: a measured close view of a large city, triangles halved with the same image.
- **V3, cars.**
  - Remove hidden triangles.
  - Justify L0 (14.8k) in px at its switch distance, or cut it.
  - Levels for the open-door parts.
  - Bus and truck shells simplified.
- **V4, glTF elements.** Offline `gltf-transform` `simplify` + `meshopt` plus 2 levels, with the same sheet image
  ([glTF Transform](https://gltf-transform.dev/)).

## 6. The two texts the user pasted, item by item

### Text 1: "geradores paramétricos + instancing + LOD + pipeline GLB"
- **InstancedMesh, BatchedMesh, LOD.** Already in the game: 26 files create InstancedMesh; buildings use their own batches
  (`shellBatch.ts`, `gpuBatchedMesh.ts`); levels exist for parts, vehicles, people and plants. Not new.
- **"Not everything one mesh; cars with doors as separate parts."** Already so: `doorOpening` (`agents.ts:352`) and the open-state
  door, glass and card parts (`:1225-1271`). The gap is that those open-state parts have no levels (V3).
- **Traffic-light state in the shader, not geometry.** Right and not done: 412 triangles a head, of which 216 are lenses and 72 halos (V2).
- **Antennas, AC units, benches, bins by instancing.** Already instanced. The real cost is far blocks drawing near meshes (V1).
- **Blender / Houdini offline generators.** Not for buildings: they are generated at run time (city growth, construction mode).
  For small props, the in-code models are already light (bin 182, lamp 132).
- **glTF Transform (simplify, meshopt, textureCompress, instance) and GLTFLoader's meshopt / gpu-instancing extensions.** Right, for
  the one glTF set the game has, the ground cover (V4).

Verdict: sound generic advice. About 80% is already in the game; the useful items are V1, V2 and V4.

### Text 2: the library list
| item | what we found | verdict |
|---|---|---|
| three-roads | `npm install` fails (`EUNSUPPORTEDPROTOCOL "workspace:*"`, tested); junctions by polygon unions (the architecture we removed) with points every 5 m; 2 commits, both 2026-08-01 | no |
| YUKA (MIT) | steering behaviours; last npm 0.7.8 (2022) | no: the game has its own drive model (`src/sim/drive`, `intersections`, spillback) |
| graphology | graph + shortest path | no: the game has `src/sim/routing/router.ts` |
| recast-navigation-js (MIT, active) | navmesh for free walking | not now: pedestrians walk sidewalks (`src/sim/peds/sidewalk.ts`); a candidate only for squares and parks |
| SkyscraperGenerator (three.js r186) | measured: 18-20k triangles at 40 m, 48-51k at 140 m, non-indexed, a hidden back wall by design, no LOD, TSL materials that run only on WebGPURenderer ([maintainer](https://discourse.threejs.org/t/r164-nodes-no-longer-working-with-webgl-webgl2/64909)); the game is WebGL (`renderer.ts:437`) | no |
| BuildingGeneratorThreeJS | demo app, one Hong Kong style, 20.6 MB kit.glb, 10 commits in 4 days | no; reference only |
| threejs-city | WebGPU/TSL and its own world package; published 2026-10-13 | no |
| polygon-clipping | already a dependency (lots and buildings) | fine, never for roads |
| gen-city, Turf.js | 2D city layout; geographic analysis | no: the game has its own city generator and geometry |
| Delaunator | adopted (with Constrainautor) | yes |
| three-mesh-bvh (MIT, active) | raycast and spatial queries | candidate only if picking or raycasts cost time; not a triangle optimisation |
| traffic-simulation-de | GPL-3.0 | cannot ship in a closed commercial game |
| TRIZHAX traffic | 0 stars, no licence | cannot use |
| SUMO | external simulator | no |

Verdict: nothing in either list replaces what the game already does. What we take are techniques: plate from its outline, corners with
nested levels by distance, impostors for small props, roads baked into the terrain texture far away, glTF Transform for the glTF set.

## 7. Order
1. Roads R1 (make it committable), Buildings B1 (commit stage 1) and People P1 (recover the cooker) start together. They touch disjoint
   files except `src/world/cells.ts` and its followers: roads commits CELL together with `cellArrays` / `partFiling` / `layerCells`;
   buildings leaves those three out of B1.
2. Then R2, B2, P2.
3. Then R3, B3, P3, and V1-V4 by the models session.

Each session gets only its own section, the rules of section 1, and one stage at a time.
