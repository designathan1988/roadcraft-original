# src/editor/buildingTool.ts
Lines: 2727
Summary: (written as the file is read) The building tool's state machine in world coordinates: placing blueprints and drawn shapes, editing volumes, faces, roofs, elements, interiors; previews validated as the pointer moves.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-91 imports: flags, polygon, samePlain, JournalCursor, blueprints, city buildings, interior, foundation, BuildingFloors, footprints, geometry, split level, handles, pick, materials, elements, validate, types, every edit op of editor/buildings, buildingSnap, plans, facade, roofs, profile
- 93-120 ToolView (project, planeAt, ray, groundAt, pavedAt, pickPixels) and ToolHost (context, commit, changed, hovered, flash, focus)
- 122-186 modes, stages, model tools, MaterialScope, BuildingPreview (serial for the renderer), selections, PlaceParameters, Drag union; PREVIEW_ID, LONG_PRESS_MS, DRAG_START_PIXELS, ROTATE_STEP
- 188-245 BuildingTool fields (mode, stage, plan, body, params, rotation, selection, component, scope, zone, materials, measure, armed, previews, hover, clipboard); private drag, serial, judged verdict cache keyed by a JournalCursor over buildings/terrain/roads/elevation, floors, last pointer
- 247-318 queries: floorOf (preview measured each call, stored kept), selected, selectBuilding, onCutFloor, sync, handles() (buildingHandles of the shown building, filtered; asked per overlay draw)
- 320-394 deactivate, pickAt, builderHintKey, cancelOperation, selectFloor, groupWith
- 396-442 shape drag fields, span in the screen-aligned frame, beginShapeDrag (ground or roof level)
- 444-516 shapeDragRing, updateShapeDrag (params or plan preview), endShapeDrag (finish plan or place), dragging getter
- 518-622 panel commands: setMode, setStage, armModelTool, chooseShape, startPlan, cancelPlan, backPoint, finishPlan (validate, commit, select)
- 624-672 planBuilding (a clone with a new mass/void, or a JSON copy of the body with the plan) and updatePlanPreview (validates on each change)
- 674-720 selectVolume, focusSelected, changeVertex, applyFacadeGrammar, setFacadeGeometry
- 722-800 roof details (arm, select, turn, move, delete, height), setVolumeSize, referenceOf (overlap with blocks below)
- 801-888 blockOffset/setBlockOffset, turnBlock (ring rotated), setBlockBase, blockLift/setBlockLift, copyBlock (structuredClone of a volume)
- 890-961 interior: cutLevel, cutView (set each frame by the wiring), cores; interiorPreview rebuilt only when the record, level or 45-degree direction changes (cloneBuilding + cutOpen), placeCore
- 963-1039 furniture: arm, turn, editFurniture (pick under pointer, move/remove/add on the floor's list)
- 1041-1134 primitives: primitiveDraft (a new body on the ground, or a mass on a roof/against a face of a clone), hoverPrimitive per pointer move (draft + validateBuilding + samePlain against the shown ghost so an unchanged ghost is not re-sent), dropPrimitive (commit)
- 1136-1216 pointMode, offsetBlock, bevelBlock, faceInHand, extrudeFace (edge move or resize), extrudeFaceBlock (a new block against the face)
- 1218-1319 insetFace (relief of the inner bays), setFunction, setBlockMode, detachBlock (the block and what stands on it into a building of its own), flag design and flag
- 1321-1365 planArea, planHeight, pointOnPlan (per pointer move while planning: every vertex and edge of the selected building projected to the screen to snap)
- 1367-1412 chooseBlueprint, useBody (JSON copy of the body), generate, onSelected (editBuilding as one undo step), report
- 1414-1505 storeys, resize, wings, setbacks, insertStorey, split, reshape, ground/level heights
- 1507-1606 upper shapes, removeVolume, setRoof, setParameter, cyclePalette, material scope/target/current, applyStyle, paint
- 1608-1639 paint brush: paintStroke (pick, a new key per face/bay, one edit each), endPaintStroke, setPaintBrush
- 1641-1675 free elements: armElement, pathKind, massMoveArmed, startElementRun
- 1677-1761 finishElementRun (stairs climbing a floor, bands along the path, one edit), clearArmingFor
- 1763-1831 selectedElement; hoverElement per pointer move (pick on the selected building, candidates against the bay, a clone + validate per candidate, samePlain against the shown ghost); placeElement (fuse and replace)
- 1833-1905 mirror, repeat, update/remove element, faceRegion, reliefDepth, setRelief, setRoofShape
- 1907-1958 armComponent, setScope, applyToSelectedBay, rotate, duplicate, delete, copy, paste
- 1960-2043 pointer: buildingAt, pick (pickAlongRay over the store, per move), handleAt (every handle projected), pointerDown (draw, plan, mass move, handles, zone, click)
- 2045-2134 beginHandleDrag: a clone of the building as origin; vertex, storeys, side/offset, move, lift, relief, rotate, scale drags
- 2136-2204 hoversOnly; pointerMove: zone drag, plan cursor, hover (handles, place ghost, element ghost, primitive ghost, pick), a click that travels becomes a move
- 2205-2320 per-move drag: a FULL clone of the origin building each pointer move, the op applied (vertex, storeys, lift, side/wing, offset, move with snapPlacement, scale, massMove with blockSnap, relief, rotate), then showDraft
- 2322-2367 pointerUp: zone component, click, or commit of the ghost (samePlain against the origin; weldInto + replace + absorbed removed)
- 2369-2403 showDraft (verdict, samePlain against the shown ghost), verdict (judged cache reset by the cursor's changes; samePlain against the last draft), judge (validate; a 'building' clash tries the weld), freeHand
- 2405-2515 click: plan points (closing on the first), primitive, furniture, core, roof detail (one edit), element, shift-region, place, select (first the mass, then the face), paint
- 2517-2577 placeHere (clone, validate, weld, add), hoverPlace (snapPlacement per move), placeDrawn, ghostAt (placeBody shared, not copied), setPreview (serial bumped)
- 2579-2663 key: furniture, plan, ctrl copy/paste/duplicate, stage digits, rotate, Escape chain, storeys, delete
- 2665-2678 placeAt, stripId
- 2680-2727 PICK_STEP 50 m, PICK_PAD, PICK_REACH 16 km, PICK_TOP/BOTTOM; pickAlongRay: the ray walked in 50 m steps only between the highest roof and the lowest ground, buildings near each step queried once (seen set), stopped once a hit is nearer than the step

## Contracts, state and data flow
- Per pointer move in the Builder: a pick walk along the ray (by place), a ghost (placeBody or a clone of the dragged building), a verdict cached by samePlain and the change cursor, validate only when the draft changed.
- A drag clones the origin building on every move (fine for one building).

## Depends on / used by
- uses: editor/buildings, buildingPlans, buildingSnap, buildingFacade, buildingRoofs, buildingProfile, buildingFloors, world/buildings/*; used by: buildingsWiring

## Problems found (finding IDs)
- none: the per-move work is bounded to the building in hand and by-place queries

## To check in other files
- main.ts: is buildingTool.pointerMove (and its pick) run on every move when the Builder is not the active tool?

## Sources
- https://en.wikipedia.org/wiki/Ray_casting : a ray as origin + t direction, t the distance when normalised (lines 2705-2724)
- https://developer.mozilla.org/en-US/docs/Web/API/Element/pointerdown_event : pointerdown starts a press; click after release (lines 1992-2043, 2322-2367)
- https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event : (redone research) moves fire at a machine-dependent high rate: previews validated per move must stay small or be throttled; this tool validates per move (the validation's cost decides, in world/buildings/validate)
