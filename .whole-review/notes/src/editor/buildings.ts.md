# src/editor/buildings.ts
Lines: 1126
Summary: The building commands and operations: storeys, resizing, wings, setbacks, removal with support, roofs, parameters, level heights, facade components and zones, rotation and scaling, place/add/edit/replace/delete/duplicate, clearing buildings the roads reach, grouping, element fusing, block moves and snapping, union, welding neighbours, clipping, reliefs, roof shape, free elements, mirroring, repeats.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-87 imports (materials, neighbours, polygon-clipping, footprints, plans, changes, blueprints, elements, geometry, validate, types); EditResult; FAIL_MISSING/UNCHANGED
- 88-124 storeyTemplate (JSON copy of the top storey), snapLength, rideWith (stacked volumes follow), opSetStoreys
- 126-167 shiftBays and opResize (side moved, bays re-indexed)
- 169-239 copyStoreys and opAddWing (outline or rectangle wing with a door)
- 241-297 opAddSetback (inset volume on the roof, terrace below) and opRemoveVolume (unsupported volumes go too)
- 299-345 opSetRoof, opSetParameters, opSetLevelHeight; FacadeScope
- 346-430 opSetComponentZone and opSetComponent (bay, row, column, storey, side, volume), each compared by JSON before/after
- 432-480 opRotate, opScalePlan, normaliseAngle
- 482-573 placeBuilding, addBuildingRecord, editBuilding (clone, op, validate, put), replaceBuilding, deleteBuilding, removeVolume, duplicateBuilding (six positions tried)
- 575-620 clearBuildingsOnRoads: by change rects (buildings near) or, with rects null, EVERY building of the map one by one with footprint and element tests against roads; clearBuildingsAfterEdit (rects from Network.changesSince); everyBuilding generator; buildingsIn
- 622-670 groupInto: the source's volumes and elements moved into the target's frame
- 672-770 opFuseElement, FUSE_GAP, opMoveBlock (stacked blocks follow), blockSnap
- 771-800 lookOf and opUnionVolumes
- 802-906 weldInto (neighbours near the draft by box, rings met by overlapArea, their volumes and elements absorbed), boxesMeet, clipRing, polygonBounds, simplePieces
- 908-977 FaceRegion, RELIEF_STEP, cutRelief, opSetRelief, RoofShape, opSetRoofShape
- 979-1022 opAddElement, opUpdateElement, opRemoveElement
- 1024-1126 MIRROR_SIDE, opMirror (faces, bays, reliefs, materials, geometry, details, elements, cores flipped), opRepeatElement

## Contracts, state and data flow
- Edits work on a clone (cloneBuilding) and validate before storing.
- clearBuildingsOnRoads with rects null (the network cannot say what changed) tests EVERY building against roads: a whole-map walk whenever changesSince returns null.

## Depends on / used by
- uses: world/buildings/*, polygon-clipping, editor/buildingPlans; used by: buildingTool, buildingsWiring (afterRoadEdit, bulldoze), actions

## Problems found (finding IDs)
- none confirmed here

## To check in other files
- world/network changesSince: when does it return null (every building of a 10 km city tested after a road edit)?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function* : generators yield lazily one value per next() (lines 604-610)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify : serialises the whole value; cost grows with it (lines 359, 373, 389, 429, 944, 963, 994)
- https://developer.mozilla.org/en-US/docs/Web/API/Window/structuredClone : (redone research) a deep copy without a text round trip; a JSON round trip of a building (~7 KB record) per edit builds and parses a string each time: per edit, not per frame, light
