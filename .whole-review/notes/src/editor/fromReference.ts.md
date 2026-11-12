# src/editor/fromReference.ts
Lines: 252
Summary: Builds a building blueprint body from a reference 3D model (its triangles and a colour sampler): massing blocks from the upward faces, wall and plinth colours sampled per storey, each facade bay classed by how dark it shows, the roof colour, and a lantern crown when the model rises above the highest block.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-12 imports (blueprints, cityBuildings Model/mat, footprints edgeFrame, geometry baysOn, types, units m, reference types); re-export of ReferenceSampler and Triangle
- 14-28 ReferenceBlock (box, foot/top, convex hull) and ReferenceOptions (ground and storey heights); TOUCH 5 cm
- 30-56 blocksFromTriangles: upward faces only (normal z share >= 0.98, either winding); each face merged into the first touching top at the same height (linear find over the tops), else a new top
- 57-65 tops grown later merged again, restarting the double loop after each merge (worst case cubic in the tops; one-off on an import)
- 66-74 tops kept above 0.2 m and over 0.3 m wide; each block's foot is the highest top under its centre; hull; sorted by top
- 76-79 luminance, toHex, distance helpers
- 81-98 buildFromReference: storey level and height helpers; blocks of at least 2 x 2 x 2.5 m kept; each kept block's base level from the kept blocks under its centre
- 99-120 wallColour: four sides sampled 9 x 3 points 5 cm out; light samples only (luminance >= 0.42); per-channel median
- 121-137 each block's look from its top three storeys; a plinth: the highest ground storey whose colour still differs from the top
- 138-158 the Model built: one block per kept block (split at the plinth when it has one), outline from the hull when it has more than four points
- 159-199 facade: per volume, side, storey and bay, 7 x 5 samples; dark share picks wall, double door, wide or sash window; pilasters on masonry towers of three storeys or more; roof colour sampled from above
- 200-220 crown: the highest model point above the tallest volume's footprint; a lantern roof detail when it rises more than 3 m
- 222-233 normalisedOutline: hull in the block's 0..1 box, points closer than 5 cm dropped, closing duplicate popped; only kept with more than four points
- 235-251 convexHull: monotone chain over points deduplicated at centimetres

## Contracts, state and data flow
- Pure: triangles and a sampler in, a BlueprintBody out (or null); no module state.
- Runs once per reference import (the blueprint editor's reference model), not on the frame path; its quadratic merging is bounded by one model's upward faces.

## Depends on / used by
- uses: world/buildings blueprints, cityBuildings (Model, mat), footprints (edgeFrame), geometry (baysOn), types (bayKey), reference (sampler/triangle types), world/units m
- used by: the building editor's "from reference" import (blueprint workspace)

## Problems found (finding IDs)
- none (the O(n^2)-O(n^3) top merging runs once per import on one model, off the game's frame and opening paths)

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot : square root of the sum of squares, no overflow (lines 45, 79, 229, 231)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice : removes in place, later elements shifted (line 62, the merge loop)
- https://web.dev/articles/rail : (redone research, replaces the Math.hypot filler) the top merging restarts its double loop after each merge (cubic in the tops) on the page during one import; a large reference model can hold the page past 50 ms once (a one-off, not a game-time cost)
