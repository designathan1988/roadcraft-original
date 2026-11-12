# Ready libraries for roads, terrain and LOD (three.js 0.186, WebGL2, TypeScript)

Research made for the VIGIA from primary sources: READMEs, docs, the npm registry and downloads (week of 2026-10-16 to 10-22), and GitHub.
Nothing was installed or tested.

## Bottom line

- **Roads**: no ready library meshes user-drawn roads (lanes, kerbs, sidewalks, filleted junctions, LOD) for a three.js city builder:
  - three.js r186 `CityGenerator` is a grid of blocks and needs WebGPU;
  - osm2streets outputs 2D GeoJSON with sharp corners;
  - Streets GL builds mitred strips with no junctions;
  - OSM2World and libOpenDRIVE need OSM or OpenDRIVE input.
  Keep our own mesher, use the geometry kernels below and port algorithms from the reference projects.
- **Terrain**: no maintained three.js library does LOD terrain that the player edits. 3d-tiles-renderer, geo-three, three-tile and Giro3D
  stream static GIS tiles. The proven pattern for editable terrain is a geometry clipmap displaced from a heightmap in the vertex shader
  (Terrain3D, MIT, Godot), plus road "stamping" into the heightfield, and Constrainautor for exact breaklines.
- **LOD**: three-mesh-bvh, InstancedMesh2, batched-mesh-extensions, core BatchedMesh, meshoptimizer and gltf-transform are real and
  maintained. No Nanite-like system is production-ready for WebGL2.

## Shortlist (worth adopting)

| # | Library | License | Version (date) | Use |
|---|---|---|---|---|
| 1 | [meshoptimizer](https://github.com/zeux/meshoptimizer) | MIT | 1.3.0 (2026-09-25); we have 1.2.0 | LockBorder chunk LODs, Sparse re-simplification, attribute-aware simplification (already adopted) |
| 2 | [three-mesh-bvh](https://github.com/gkjohnson/three-mesh-bvh) | MIT | 0.9.16 (2026-10-08), 3.1M downloads/week | raycasts and shapecasts on terrain, roads and buildings |
| 3 | [@three.ez/instanced-mesh](https://github.com/agargaro/instanced-mesh) (InstancedMesh2) | MIT | 0.3.16 (2026-07-26) | per-instance LOD, shadow LOD, BVH culling: props, trees, vehicles, people |
| 4 | three.js BatchedMesh + [batched-mesh-extensions](https://github.com/agargaro/batched-mesh-extensions) | MIT | 0.0.12 (2026-06-23); official example `webgl_batch_lod_bvh` | static geometry per chunk with BVH culling and LOD |
| 5 | Clipper2 ([clipper2-ts](https://github.com/countertype/clipper2-ts) / [Clipper2-WASM](https://github.com/ErikSom/Clipper2-WASM)) | BSL-1.0 | 2.0.1-18 (2026-07-04) | offsets and rounded outlines (its triangulation is flagged buggy: do not use it) |
| 6 | [earcut 3.2](https://github.com/mapbox/earcut) with `refine()` | ISC | 3.2.4 (2026-09-28), 9M downloads/week | road, junction and lot polygons (replaces three.js's internal 2.x copy) |
| 7 | [Delaunator](https://github.com/mapbox/delaunator) + [Constrainautor](https://github.com/kninnug/Constrainautor) | ISC | 5.1.0 / 4.1.0 (2026-03) | terrain mesh with road and lot edges as breaklines (constrained Delaunay) |
| 8 | [martini](https://github.com/mapbox/martini) / [delatin](https://github.com/mapbox/delatin) | ISC | 0.2.0 | optional per-chunk terrain simplification, with skirts |
| 9 | [gltf-transform](https://gltf-transform.dev/) / gltfpack | MIT | 4.5.1 (2026-09-28) | offline processing of authored assets |

**Port, do not install** (references):
- [Godot Road Generator](https://github.com/TheDuckCow/godot-road-generator) (MIT; cross-sections, intersections, terrain flattening; used
  in shipped games);
- [osm2streets](https://github.com/a-b-street/osm2streets) corner trimming (Apache-2.0);
- Streets GL `GeometryGroundProjector` (MIT);
- the Terrain3D clipmap (MIT);
- the 3d-tiles-renderer TileFlatteningPlugin idea (Apache-2.0);
- SUMO junction shapes (EPL-2.0: file-level copyleft, mind the licence).

**Not usable:**
- three.js CityGenerator (WebGPU and grid only);
- OSM2World at run time;
- libOpenDRIVE, RoadArchitect, commercial engine tools, Mapbox and MapLibre;
- 3d-tiles-renderer for the editable world;
- geo-three, three-tile and Giro3D (peer three versions and GIS focus);
- the CDLOD demos;
- the Nanite-like demos (Theia is one week old);
- agargaro/octahedral-impostor (work in progress);
- poly2tri and cdt2d (stale);
- Triangle (its licence forbids commercial use without a licence: blocker for Steam).
