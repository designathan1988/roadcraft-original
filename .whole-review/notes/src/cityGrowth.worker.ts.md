# src/cityGrowth.worker.ts
Lines: 35
Summary: A city's tiles grown on the job workers, many at once: 'grow' one tile's lots (growTile), or 'assemble' the tiles' tables into the city's buildings and lots tables.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-2 imports: TileGrowth/TileGrown/assembleCity/growTile, JobScope
- 4-13 CityGrowthAsk ('grow' tile + neighbours' edge buffers, 'assemble' lots + grown list) and CityGrowthReply
- 15-16 moved(): the plain ArrayBuffers of a reply, for the transfer list (shared ones are posted as handles)
- 18-28 serve: grow -> post grown with its buildings, lotBuildings.buffer and edge moved; assemble -> post buildings and lots moved
- 29-35 error logged and answered; end of serve

## Contracts, state and data flow
- lotBuildings.buffer is the WHOLE buffer under the view: transferring it is right only if the view spans it (to check in cityTiles growTile).
- If grown.buildings and lotBuildings share one buffer, the list would hold it twice and postMessage would throw DataCloneError (to check).

## Depends on / used by
- uses: src/editor/cityTiles.ts; used by: src/editor/cityInTiles.ts through the job pool

## Problems found (finding IDs)
- none confirmed here

## To check in other files
- src/editor/cityTiles.ts growTile: are buildings, lotBuildings and edge distinct buffers? Does lotBuildings view its whole buffer?
- src/editor/cityInTiles.ts: does the page transfer or clone `grown` when asking 'assemble' (a 10 km city's tables cloned twice would cost its whole size)?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects : moved buffers are detached in the sender; duplicates in the list throw DataCloneError (lines 16, 24, 27)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/buffer : .buffer is the whole underlying buffer, not the view's bytes (line 24 `grown.lotBuildings.buffer`)
- https://developer.chrome.com/blog/transferable-objects-lightning-fast : (redone research) the grown tables sent back transferred cost no copy in a page worker; the page then clones them all again to the assembler (F-0012, cityInTiles.ts:20)
