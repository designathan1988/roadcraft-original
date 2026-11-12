# src/editor/chunkedSave.ts
Lines: 595
Summary: The map saved by squares (manifest 8): each square of each keyed layer a binary frame cut from the map's tables (rows copied, nothing decoded); the ordered lists by squares too; the globals apart; a save writes only the squares the diary says changed. Reads every older format (7, 6, 5 JSON tiles, 3 parts) and writes it whole as 8 on the next save.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-38 imports; doc comments on the formats and on never walking the map or decoding a table to save
- 39-70 RegionManifest, OldManifest, isTiledManifest, isOldManifest
- 71-84 decodedOffPage: the saved squares decoded by a 'saveRead' job of the pool (tables handed back)
- 86-137 TiledSaves fields (journal cursor over every document kind, keyed and list states, globals, old keys, a save queue, the writer) and key builders for every format
- 139-187 save (queued), adopt (a just-opened map: stored squares known; upgraded frames written; lists' order and squares restored; what the loader changed after replacement noted)
- 189-252 everything, take (diary since the last save; another document -> everything), note (globals, wear, keyed layers by rects/ids, lists marked), worn, touch, occupied (one pass of a layer's ids and places)
- 254-327 wholeLayer, squaresMeeting (squares a rect reaches tested via the kind's place index), standingIn (ids by place for one square, placeless found once), walk (an ordered list: EVERY item placed and its square checked), membersOf
- 329-389 write, keyed layers: dirty and wear squares taken; members by place; each square's rows copied from the map's table into a TableWriter (or saved records), framed; wears per square
- 390-441 write, lists: the WHOLE list walked to gather the dirty squares' items; globals; the manifest; the writer; on failure everything put back
- 443-497 read: newest manifest first, older formats read as they were; readSquares fetches every blob of the map and decodes off the page
- 499-525 readOld (format 3: head and parts gunzipped and parsed)
- 527-595 settled, queued, savedKeys, forget, clear, setAside; SquareKeys

## Contracts, state and data flow
- Keyed layers: a save costs the squares changed (place index queries), never the map.
- Lists (LIST_NAMES): any change of a list's kind walks the whole list twice per save (walk: every item's square; write: every item to gather the dirty squares' items). Proportional to the list's size, per save.
- Read: every square's blob fetched at once (the whole saved map in memory as Blobs), then decoded off the page.

## Depends on / used by
- uses: world/buildings/recordTable, world/changes, world/derived, world/doc, editor/saveStore, regionFrames, tileCodec, saveLayers, squaresDecode, jobs/jobPool; used by: editor/persistence

## Problems found (finding IDs)
- none confirmed here

## To check in other files
- editor/saveLayers.ts LIST_NAMES: which kinds are lists (roads? the walk per save over every road of a 10 km city).
- editor/persistence: when save() runs (each edit? a timer?).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Blob/text : resolves with the contents decoded as UTF-8 (lines 462, 464, 518, 545)
- https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark : marks stay until cleared; `detail` metadata (lines 491, 495)
- https://developer.chrome.com/blog/indexeddb-durability-mode-now-defaults-to-relaxed : (redone research) relaxed commits complete once the OS has the data, 3x-30x faster than strict: writing only the changed squares in relaxed transactions is the cheap path
- https://surma.dev/things/is-postmessage-slow/ : (redone research) sending changes, not the whole state, keeps each message proportional to the change: the save hands the worker only the changed squares' rows
