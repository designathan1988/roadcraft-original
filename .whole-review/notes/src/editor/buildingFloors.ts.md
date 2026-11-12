# src/editor/buildingFloors.ts
Lines: 43
Summary: Each building's floor height, worked out once and kept; the floors the document's changes reach (buildings by id, terrain/roads/elevation by rectangle grown by FLOOR_READ_REACH) forgotten through a journal cursor.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-8 imports; KINDS followed (buildings, terrain, roads, elevation)
- 10-21 BuildingFloors: floors Map, cursor; floorOf (follow, then the kept floor or floorHeight)
- 23-43 follow: the cursor's entries (null: forget all); building entries by id; other kinds by rectangles (buildings near each rect forgotten); an entry with no ids or rects forgets all

## Contracts, state and data flow
- One number per building ever asked; a change without rectangles empties the whole map (every floor worked out again).

## Depends on / used by
- uses: world/buildings/foundation, world/derived JournalCursor, world/doc; used by: editor/buildingTool, render (floors of buildings)

## Problems found (finding IDs)
- none

## To check in other files
- world/changes: which changes come without rects (forget everything).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/delete : true when removed, false when absent (lines 31, 38)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/clear : removes every entry (lines 26, 30, 34)
- https://v8.dev/blog/trash-talk : (redone research) one floor height kept per building for the session: a Map entry with a boxed double per building of a 10 km city lives in the old generation (memory proportional to the buildings asked, not all of them)
