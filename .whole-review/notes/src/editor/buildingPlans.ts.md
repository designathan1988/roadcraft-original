# src/editor/buildingPlans.ts
Lines: 272
Summary: Building plan editing: starter shapes and primitives, a volume's ring stored in its bounding frame, vertex/edge moves, bevels, offsets (Clipper2 inflate), vertex insert/remove with facade sides remapped, masses added at ground or on a roof (shrunk by bisection to its support).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-24 imports; PlanShape, Primitive and PRIMITIVES table
- 26-43 shapePoints: unit-square outlines (rectangle, L, U, cross, stepped, chamfered; circle 24, hexagon, octagon)
- 45-65 setVolumePlan (3..64 finite points, min size, CCW, normalised outline, validOutline) and shapeBody
- 67-90 movePlanVertex and movePlanEdge (grid snap, positive area kept)
- 91-126 bevelPlan: each corner cut back along its sides (at most half a side); decorations of sides dropped
- 128-155 offsetPlan: rectangle grown directly; outlines inflated by Clipper2 (miter, polygon), refused when the topology changes, rotated to the old first point
- 157-217 changePlanVertex: insert/remove a vertex; facade sides, patterns, bays, materials, geometry and reliefs remapped
- 219-242 addPlanMass: a new volume from a storey template (structuredClone per storey), materials cloned, the source's roof made a terrace and its details under the mass dropped
- 244-272 addShapedUpperMass: the shape at scale, shrunk by 18 bisection steps until supported by the source footprint

## Contracts, state and data flow
- Per edit only; small allocations.

## Depends on / used by
- uses: clipper2-ts, world/buildings (blueprints, geometry, footprints, types), core/polygon; used by: editor/buildingTool

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://www.angusj.com/clipper2/Docs/Units/Clipper/Functions/InflatePaths.htm : delta, join type and end type of an offset (lines 141-142)
- https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone : a deep copy of plain objects (lines 229, 232)
- https://www.angusj.com/clipper2/Docs/Overview.htm : (redone research) integer coordinates scaled from doubles; one inflate per edit of a plan, not per frame
