# src/editor/cloudTool.ts
Lines: 93
Summary: The cloud tool (Landscape > Terrain > Clouds): add a cloud under the pointer at the brush's height, pick the repeat seen under the pointer, remove/edit/move it (the wind's drift taken off what is kept).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-22 imports; CloudToolHost (doc, mode, brush, drift, rayAt, record, changed, hint)
- 24-36 CloudTool: drag state, pointer, gesture
- 38-71 down: every cloud mapped to its drifted repeat (a copy each), cloudUnder; add (record, addCloud), remove, edit, or start a move
- 73-83 move: the dragged cloud's new place written to the document on every pointer move, then host.changed()
- 85-93 up (ends the drag of that pointer) and cancel (drops the drag)

## Contracts, state and data flow
- A drag writes the document on every pointer move (each a change in the diary and a host.changed()).

## Depends on / used by
- uses: world/clouds, world/doc; used by: main.ts (cloud tool)

## Problems found (finding IDs)
- none here

## To check in other files
- main.ts host.changed for the cloud tool: does it schedule an autosave per move?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map : a new array of transformed elements (line 48)
- https://en.wikipedia.org/wiki/Line%E2%80%93plane_intersection : t = (h - oz)/dz for a horizontal plane (rayAt, lines 47, 52, 67, 79)
- https://web.dev/articles/rail : (redone research, replaces the Array.map filler) one ray-plane test per input over the clouds kept (a short list): no frame cost
