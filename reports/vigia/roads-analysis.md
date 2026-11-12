# Roads: where the polygons are, and what the architecture must become

Measured by the VIGIA with `scripts/optimization-sheet.mjs` (`--only="roads, structures" --radius=22`) on clean checkouts.
"Committed" is 85f4e048. "WIP" is the uncommitted piece-based code the cancelled roads session left in the working tree
(applied on 506b4736). Raw data: the VIGIA's scratchpad `cmp2/metrics.json` and `meas/metrics.json`.

## Triangles by band

| Layout | Version | Total | Verge (green strip) | Footway | Kerb | Asphalt | Draw calls |
|---|---|---|---|---|---|---|---|
| urban straight 140 m | committed | 412 | 208 | 140 | 52 | 12 | 16 |
| urban straight 140 m | WIP | 574 | 360 | 172 | 20 | 22 | 4 |
| urban junction, four ways | committed | 2,314 | 704 | 898 | 376 | 308 | 24 |
| urban junction, four ways | WIP | 3,712 | 1,808 | 1,240 | 488 | 160 | 14 |
| urban bend | committed | 1,354 | 546 | 437 | 215 | 148 | 19 |
| urban bend | WIP | 2,402 | 1,320 | 674 | 298 | 106 | 9 |

The WIP is WORSE in triangles (+39 % to +77 %) and moves the surface by up to 510 mm. It is better only in draw calls, because the
tile cut is gone and each piece is one mesh. The "22 triangles for a straight road" its session promised was never measured.

## Why

1. **The verge duplicates the terrain.**
   - The ground is already shaped to the roads: `src/world/elevation.ts:213-221` holds it at road level `SHAPE_INNER` (1.2 m) past the
     casing, then batters it back (`SHAPE_SHOULDER`, `BATTER`); `src/render/terrainShaping.ts` applies that to the terrain grid.
   - On top of that shaped ground, a separate 1 m verge mesh falls from the footway to the ground with a smoothstep:
     `roadSurfaceReads.ts` `vergeTop`, cut into `VERGE_ACROSS` = 6 long strips, plus skirts.
   - It wears the terrain's own material (`TERRAIN_UV`). The verge is half or more of every road's triangles, and it draws what the
     terrain already is.
2. **Skirts and walls on every band.** Each band hangs a skirt or wall on its edges (`bottom:` in `roadSurfaceReads.ts`; `WALL_A | WALL_B`
   on every band in the WIP's `roads/segmentPiece.ts:114/130/147`), so faces are drawn where two bands meet at one height.
3. **The tile cut (committed only).** Every band was cut in four by the 76.8 m tiles: 4 meshes each, with a fan of triangles at the cut.
   The WIP removed this, which is right.
4. **Footway and kerb as separate bands**, each refined on its own, instead of one swept cross-section.

## What the industry does (sources)

- **The road is a 2D cross-section swept along its curve.** Kerbs, gutters, footways and shoulders are extruded from one profile, with
  the tessellation density controlled along the road: Procedural Road Toolkit,
  https://forums.unrealengine.com/t/artem-nesin-procedural-road-toolkit/2836635 . Intersections are generated apart, with separate
  materials for road, median, shoulder and sidewalk: roadacity,
  https://www.unrealengine.com/marketplace/en-US/product/roadacity-road-intersection-maker .
- **The terrain is deformed to the road**, with a side falloff, rather than the road hanging skirts down to the terrain:
  - Unreal `EditorApplySpline` (start/end width, side falloff, raise/lower),
    https://docs.unrealengine.com/4.27/en-US/BlueprintAPI/Landscape/Editor/EditorApplySpline/ ;
  - UnrealDrive's landscape attribute (lateral fade distance, Z offset), https://unrealdrive.readthedocs.io/en/latest/attributes/LandscapeAttribute.html ;
  - Cities: Skylines terraforms a shoulder on each side of a road automatically (player observation),
    https://steamcommunity.com/app/255710/discussions/0/2950376208535613885 ;
  - developers' advice in the same direction: flatten the terrain first,
    https://hub.jmonkeyengine.org/t/creating-city-builder-roads/34422 .
- **Road edges blend into a terrain texture** with world-space UVs, rather than large alpha-blended decals:
  https://polycount.com/discussion/comment/2405032 , and the terrain painting of the Fab road systems,
  https://www.fab.com/listings/5fe2c221-2ba4-4db6-802c-964dca9d7d39 .

## What must be done

1. **Delete the verge mesh.**
   - The terrain shaping makes the fall from the footway's outer edge to the ground: `elevation.ts` shapes the ground to the footway
     edge's height, with the same smoothstep the verge used, over the same 1 m, then the batter.
   - The grass is the terrain's own material, so nothing changes in the picture.
   - Expected: −50 % to −63 % of every road's triangles.
2. **One swept cross-section per side for kerb + footway** (kerb face, kerb top, footway: a few vertices across), with stations only where
   the road curves or its height leaves the chord.
   - Expected on a flat straight 140 m road: asphalt 2, each side about 6, plus the ends: about 15-20 triangles in all, against 412.
3. **No skirts on ground-level roads** once the terrain meets their edges. Skirts and side faces only on structures (bridges, viaducts,
   retaining walls), and one face per height step, never between two bands of one height.
4. **Keep from the WIP:**
   - pieces whole in their owner's block (no tile cut: draw calls 16 → 4);
   - shared mouth vertices between road and junction;
   - the far level from the same pieces.
5. **Junctions:** the plate (earcut once) and its corners swept with the same cross-section.
6. **Then**:
   - the remaining paint in the asphalt shader;
   - the street props (signals, poles, lights, wires, barriers) instanced per kind and cell, with LOD.

Every step: the triangles by band on the sheets, before and after on clean checkouts, and side-by-side photos, renderer and wireframe.
