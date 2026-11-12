# src/buildingsWiring.ts
Lines: 1247
Summary: The Builder's composition: the building tool, its workspace panels, the 3D reference model, the player's blueprints and their photos, the inspector fields, the overlay, and the per-frame hand-off (beforeDraw) of the cutaway and the preview to the renderer.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-29 imports: flags, polygon area, doc, network, blueprints, photo studio, lot library, building geometry and types, editor building ops and tool, builder catalogue, viewport, renderer handle, overlays, interface photos, reference model, i18n
- 31-80 BuildingWiringDeps and BuildingWiring interfaces (pointer, key, activate/deactivate, beforeDraw, drawOverlay, restored, afterRoadEdit, bulldozeAt, hints)
- 82-117 createBuildingWiring: blueprint library list; ToolView (project/planeAt read the size once a call, ray from the view or two heights, groundAt/pavedAt from the scene, pickPixels 16)
- 119-135 panel state: dirty, painting, inspectorOpen, category, toolId, snapMode, grid, hideOthers, lastHint, seeInside, drawAction
- 137-165 ToolHost: commit wraps an edit in one history step and calls afterEdit; changed marks dirty, tells a hint change, refreshes the panel, requests a draw
- 167-179 the tool; Alt key listeners (keydown/keyup/blur) toggle free placement
- 181-212 clearArming (puts every armed tool away), floorInHand, shapeOfTool, planActionOfTool
- 214-273 the 3D reference: load a glb/gltf from a file input, place on the selected building, build a building from its capture, its actions
- 275-334 runTool, action tools: storeys, split, setback, vertices, relief, roofs, copy style, block modes, cut levels, extrude/inset/offset/bevel
- 335-443 runTool, mode tools: shapes, primitives, furniture, cores, sketch, select, wing/stack/cut, moveMass, pushpull, paint, opening components, roof details, path runs, free elements
- 445-477 backToSelect, CREATES set, afterGesture (put the tool down after it made something), defaultSplitFloor, copyStyle
- 479-515 requestThumbnails (interface photos or the player's kept photos, nothing rendered), photographBlueprint (one photo with the game's renderer, FileReader data URL, kept), photographOlder (once)
- 517-620 BuilderActions, first half: category, tool, floor, floor commands, snap, grid, hide others (scene.setBuildingsDimmed), inspector, selection actions (duplicate, mirror, group by doc.buildings.near, save with prompt, delete)
- 621-699 BuilderActions, second half: fields, presets (lots loaded lazily), user blueprints, finish/colour/style/pattern, draw action, scope, plan finish/back/cancel
- 700-769 BuilderActions, last: roof pitch/ridge/fall, see inside toggle/up/down (bounded by the top floor), view frame/top/turn
- 771-818 workspace made; notify; setField maps each inspector number to a tool call
- 820-924 hintKey; inspectorFields builds the inspector's fields of the selection (only when the panel is refreshed)
- 926-996 selectionName, materialLine, state() (the panel's whole state), refresh() only when dirty
- 998-1002 drawGizmos: the construction grid when on
- 1004-1100 returned wiring, first part: insideClick, pointerDown/Move/Up (dirty only when the panel changes; hover alone does not), cancelOperation
- 1101-1160 key, activate, deactivate, openInside, beforeDraw (every frame: photographs older blueprints once; works out the view direction from two toWorld calls; sets the scene's cutaway (null when none) and the preview, refreshes the panel when active)
- 1161-1230 drawOverlay (selection, hover, handles, label, measure), restored, afterRoadEdit (clearBuildingsAfterEdit), bulldozeAt, requestThumbnails, hintKey, languageChanged
- 1232-1247 PRIMITIVE_OF_TOOL; READY set of every catalogue tool

## Contracts, state and data flow
- The panel is rebuilt only when `dirty` (refresh); a pointer hover alone does not dirty it.
- beforeDraw runs each frame and always calls scene.setBuildingCutaway and scene.setBuildingPreview, with null when nothing: their cost on an unchanged value is the renderer's (to check).

## Depends on / used by
- uses: editor/buildingTool, editor/buildings, ui/builder/workspace, render/renderer SceneHandle, render/buildings/photo, referenceModel
- used by: src/main.ts (the Builder tool's wiring, beforeDraw each frame, drawOverlay)

## Problems found (finding IDs)
- none confirmed in this file; see "To check".

## To check in other files
- src/render/renderer.ts setBuildingCutaway(null) and setBuildingPreview(null): do they return at once when the value did not change? Called every frame from beforeDraw (lines 1153-1158).
- src/main.ts: is beforeDraw called every frame even when the Builder is not the active tool?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/FileReader/readAsDataURL : the photo becomes a base64 data URL on load (lines 496-501)
- https://developer.mozilla.org/en-US/docs/Web/API/Window/prompt : modal, returns null on cancel (lines 603-604 test it)
- https://developer.mozilla.org/en-US/docs/Glossary/Base64 : (redone research) a data URL is about a third larger than the image bytes; stored in localStorage as a UTF-16 string it is kept inside the blueprint list that photoOf parses per id (F-0011)
- https://web.dev/articles/storage-for-the-web : (redone research) localStorage blocks the main thread: requestThumbnails' per-id photoOf calls (lines 483-485) each parse the whole list
