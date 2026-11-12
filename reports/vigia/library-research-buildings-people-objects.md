# Ready libraries for buildings, crowds, vehicles and vegetation (three.js 0.186, WebGL2)

Research made for the VIGIA (2026-10-24) from primary sources: npm registry metadata, GitHub, READMEs and the source of the three.js r186
addons, `@three.ez/instanced-mesh` and `three-vat`. Nothing was installed or run. The "Already in the game" column comes from the VIGIA's
inventories (`buildings-inventory.md`, `objects-inventory.md`).

## Bottom line

No maintained library generates procedural buildings (facades, shape grammar) for three.js: that stays ours. The libraries that exist
cover instancing, culling and LOD, crowd animation on the GPU, impostors, interior-mapped windows, simplification and roofs. **The game
already does most of these by its own code**; the gaps measured are geometry discipline (hidden faces, heavy kit and props, broken LOD
ladders), not missing libraries.

| Need | Best library | License, version | Already in the game | Verdict |
|---|---|---|---|---|
| LOD / simplification | [meshoptimizer](https://github.com/zeux/meshoptimizer) 1.3 (`simplifyWithAttributes`, `Regularize` for skinned, `simplifySloppy`/`Prune` for HLOD) | MIT, 1.3.0 (2026-09-25) | yes, 1.2.0 | KEEP (1.3 optional) |
| Instanced props / vehicles / trees with LOD, shadow LOD, BVH culling | [@three.ez/instanced-mesh](https://github.com/agargaro/instanced-mesh) (InstancedMesh2) | MIT, 0.3.16 (2026-07-26), pre-1.0, WebGL only, WebGPU rewrite announced | own `cellInstances.ts`, `instanceRuns.ts` | CANDIDATE: adopt only if it beats ours on a measured case |
| Building pieces batched with LOD and BVH | BatchedMesh + [batched-mesh-extensions](https://github.com/agargaro/batched-mesh-extensions) (official example `webgl_batch_lod_bvh`, 500k instances, 5 LODs) | MIT, 0.0.12 (2026-06-23) | own `shellBatch.ts`, `gpuBatchedMesh.ts` | CANDIDATE |
| Crowd animation on the GPU | [three-vat](https://github.com/MikeFernandez-Pro/three-vat) | MIT, 4.2.0, first published 2026-09-14, single author, 3 stars | YES: palette pass `crowdAnimation.ts` (GPU skinning, 4 blended clips) | NOT NEEDED (ours works; three-vat is 6 weeks old) |
| Interior-mapped windows | [three-fenestra](https://github.com/codedgar/three-fenestra) (`glslCore`) | MIT, 0.3.0 | YES: `glassRoom.ts`, rooms per pane from the real interior | NOT NEEDED |
| Octahedral impostors | [agargaro/octahedral-impostor](https://github.com/agargaro/octahedral-impostor) | MIT, not on npm, "wip" | YES for plants (`plantImpostors.ts`); none for buildings | reference only |
| Procedural trees | [@dgreenheck/ez-tree](https://github.com/dgreenheck/ez-tree) | MIT, 1.1.0 | own low-poly trees (`lowPolyTrees.ts`) | optional |
| Roofs (hipped, complex) | [straight-skeleton **v1**](https://github.com/StrandedKitty/straight-skeleton/tree/v1) (pure TS port, Apache-2.0) + Streets GL roof builders (MIT) | v2/v3 embed **GPL CGAL**: not usable in a Steam build | own roofs (`emitRoof`, `emitPolygonRoof`) | reference |
| Offline asset pipeline | [gltf-transform](https://github.com/donmccurdy/glTF-Transform) / gltfpack | MIT, 4.5.1 | – | USE for authored assets (`join` skips skinned meshes) |
| Robust unions | manifold-3d (Apache-2.0), three-bvh-csg (MIT, experimental) | – | – | only offline or rarely |
| CC0 assets | [Quaternius](https://quaternius.com/packs/universalanimationlibrary.html), [Kenney](https://kenney.nl/assets/car-kit), [KayKit](https://kaylousberg.itch.io/city-builder-bits) | CC0 | – | if the style fits |
| Characters, hidden body removal | MPFB2 "Delete group", InstaLOD Pioneer (free under $100k revenue, offline) | – | YES: `personRig.ts` deletes covered skin | – |

**Not usable:**
- shape-grammar ports (cgajs "very buggy", ShapeGrammars.js unlicensed, ShapeML GPL);
- Esri CityEngine PRT (commercial licence);
- the OSM tools at run time;
- three.js r186 generators (TSL/WebGPU: geometry ideas only);
- three-virtual-geometry and Horde (WebGPU only);
- Needle gltf-progressive (its LODs come from a cloud service);
- Simplygon (USD 6,300 a year);
- manthrax/three-vat (no licence);
- @three.ez/simplify-geometry (pins an old meshoptimizer).

**Licence traps:**
- straight-skeleton v2/v3 (GPL CGAL compiled to WASM);
- Synty POLYGON (its licence forbids content for "Game Creation Software": the city editor needs a legal read);
- Triangle (no commercial use);
- Mixamo raw files cannot be redistributed.

**Integration risk:** InstancedMesh2, three-vat, three-fenestra and three-custom-shader-material all patch shaders; no pairing was tested.
