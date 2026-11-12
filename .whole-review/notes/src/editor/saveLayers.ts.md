# src/editor/saveLayers.ts
Lines: 223
Summary: The layers of the map saved by squares: each keyed kind (where a record stands, how its square's table is cut, its saved form, its index by place), each ordered list (items by reference with a fractional order and a square, held in two WeakMaps per list), the global parts, and the square helpers.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-33 imports; SAVE_TILE 1 km, DENSE_SQUARE (a cell) for buildings and lots; KeyedName, ListName, KEYED_NAMES, LIST_NAMES (stamps, paint, fog, gullies, clouds, trees, clearings, elements, zones, zoneMarks), LAYER_NAMES
- 35-67 Place, Keyed; KeyedSpec (side, kinds, items, placeOf, idsIn by place, placeless, saved form, order, table, ref, columns, box, summary); keyed; nodeOf
- 68-114 KEYED: nodes and segments (objects, filed by node / end a), poles, spans, landscape (tables), barriers (objects), buildings and lots (tables by cell, box and summary columns)
- 116-136 ListSpec; LISTS: every list filed by its item's point, by tile
- 138-154 GLOBAL_KINDS; NOWHERE; squareAt (a string key per record); squareRect (parsing the key); meets
- 156-171 KeyedState: stored/dirty/wear squares, placeless; dirtyStored (every stored square tested against the change's rects)
- 173-188 ListState: ords and square WeakMaps over every item of the list, counts, stored, dirty, changed, rects; freshKeyed, freshLists
- 190-222 placeInOrder: a walk of the whole list; items without a valid fractional place numbered between their neighbours; renumbering everything when doubles run out

## Contracts, state and data flow
- Each ordered list (trees among them) keeps two WeakMap entries for each item for the session, and placeInOrder walks the whole list whenever the list's kind changed.
- V8 visits weak collections (WeakMap entries) on the main thread during marking: workers bail out on them (v8.dev concurrent marking), so a WeakMap entry per tree of a 10 km city is main-thread GC work at every major collection, besides its memory.
- KeyedState.dirtyStored tests every stored square per change (the squares of a 10 km map: hundreds at 1 km, thousands at the cell side for buildings and lots).

## Depends on / used by
- uses: world/doc (records, indexes by place, saved forms), world/buildings geometry/summary/recordTable, world/lot rings and summary, world/cells, world/tiles; used by: editor/chunkedSave (TiledSaves), the save worker

## Problems found (finding IDs)
- F-0020 (suspected, S3): the ordered lists' items (trees) are each held in two WeakMaps for the session

## To check in other files
- How many items doc.trees (and the other lists) hold in a generated 10 km city, and chunkedSave's use of ListState (placeInOrder at every save with a tree change).
- chunkedSave: dirtyStored called per diary entry (every stored square tested each time).

## Sources
- https://blog.mozilla.org/sfink/2022/06/09/ephemeron-tables-aka-javascript-weakmaps/ : WeakMaps are ephemeron tables; their marking needs extra passes or a pending table per key (lines 175-176)
- https://v8.dev/blog/concurrent-marking : V8's marking workers bail out on weak collections; the main thread visits them (lines 175-176)
