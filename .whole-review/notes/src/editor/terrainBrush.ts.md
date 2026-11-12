# src/editor/terrainBrush.ts
Lines: 266
Summary: The terrain brush: what a dab does for every brush of the land tool (elements laid or erased, trees planted or cut, gully, fog and paint dabs, terrain stamps for raise/lower/flatten/river/landforms), and the stroke that lays dabs along the pointer at a spacing and a rate set by the last rebuild's cost, a held flatten repeating from the frame.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-18 imports; TERRAIN_SPACING 0.2 r, TERRAIN_MIN_MS 45, TERRAIN_STAMP_MARK; a dangling comment (line 18, its constant gone)
- 20-55 Landform, DabSettings; NOISE_ORIGIN_REACH 120 m; noiseOrigin
- 57-138 stampTerrain: elements (only those near, scatter seeded by the edit stream), trees (near only; one tree or a stand), gully, fog, paint dabs; else a terrain stamp (raise/lower rough with noise origin, hardness, profile; flatten level), rivers cut trees, landforms paint their rock
- 140-168 TerrainBrushHost (interval from the last rebuild's cost); Stroke
- 170-206 TerrainBrush: getters; begin (record for undo, the stamp allocator's mark, first dab, flatten repeats)
- 208-219 tick (from the frame): a held flatten dabs again once its interval allows
- 221-252 paint (@perInput): no stroke = one dab; else rate- and spacing-limited, at most 12 dabs per event
- 254-265 end (the stroke dropped) and disarm (the held repeat off)

## Contracts, state and data flow
- Every dab appends a record to a document list (terrain stamps, paint, fog, gully dabs) or adds elements/trees: a sculpting session grows these lists without merging; what each costs downstream (terrain evaluation per stamp, the save's ordered lists, F-0020's WeakMap entries per list item) is the terrain's and the save's.
- The dab rate follows the host's interval (the last rebuild's cost), so the brush adapts to how heavy a rebuild is.

## Depends on / used by
- uses: world/elements, world/trees, world/terrain, world/terrainPaint, editor/editStream, world/doc; used by: main.ts (the land tool)

## Problems found (finding IDs)
- none here

## To check in other files
- world/terrain: whether heights are evaluated from the stamps list (cost growing with every dab ever laid) or baked into a heightfield per change.

## Sources
- https://en.wikipedia.org/wiki/Heightmap : a raster of heights per sample, less memory than meshes for a level of detail (the alternative to evaluating a growing stamp list)
- https://web.dev/articles/optimize-long-tasks : a task over 50 ms is long; break work up and yield (lines 242-248: at most 12 dabs per event, each a rebuild downstream)
