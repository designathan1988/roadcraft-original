# src/editor/buildingSnap.ts
Lines: 226
Summary: Where a footprint goes under the pointer: onto the back of the nearest road's footway (grid-stepped along it, slid flush at a corner), else aligned to the nearest building's bearing, else to the grid; then made flush with neighbours of the same bearing. Runs once per pointer move, by place only.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-37 imports; PlacementSnap, FootprintSize, footprintSize; ROAD_REACH 9.6 m, EDGE_SNAP, BUILDING_REACH 12 m
- 39-72 snapPlacement (road, else building bearing, else grid) and frontAnchor
- 74-106 snapToRoad: ribbons near the cursor (ribbonsNear), closest point and frame per ribbon, the best by distance, anchor on the footway's back
- 108-145 cornerFlush: crossing roads near the footprint, the side's slide onto their footway
- 147-165 nearestBuilding: buildings near the cursor by box distance
- 167-226 flush: buildings near the anchor of the same bearing, footprint rects projected on the snap frame, the smallest shift in u (and v)

## Contracts, state and data flow
- Per pointer move: a few queries by place (ribbonsNear, buildings.near), each ribbon's closestPoint and two sampleAt (allocating frames).

## Depends on / used by
- uses: world/buildings geometry/validate, world/roadTypes, editor/snap ribbonsNear, editor/buildings normaliseAngle; used by: editor/buildingTool placement

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sin : radians (lines 69-70, 110-111, 169-170)
- https://en.wikipedia.org/wiki/Scalar_projection : s = a . b-hat (lines 131, 136-137, 193-194)
- https://web.dev/articles/rail : (redone research, replaces the Math.sin filler) one snap per pointer move by place only (roads and buildings near the point): bounded by what is near the point whatever the map's size (not timed)
