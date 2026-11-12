# src/editor/squaresDecode.ts
Lines: 268
Summary: A map saved by squares decoded from its blobs off the page (squaresRead.worker): globals and wears read, every square decompressed 32 at a time, tables of the kinds kept in tables kept per square (copied into shared memory) and ordered by id (not joined), the rest decoded as records, lists ordered; the layout for the next save; timings.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-18 imports; the contract (off the page; 18 s on the page at 10 km before); GUNZIP_BATCH 32
- 20-77 TiledManifest, SavedLayout, UpgradedSquare, SavedTables, SavedFields, TiledSession (with timing), SquaresRead
- 79-92 isObject, idOf; squareRecords (a table's records decoded from a sliced copy, or JSON parsed)
- 94-135 joined: per kind, the squares' row ids and orders gathered, an order array sorted by id (lots by stored order then id), wears differing from rows as a field, each square's table copied into shared memory (tableIn, line 132), one TableBase over them
- 137-157 decodeSquares: globals (version 1), wears into a Map
- 158-213 per batch of 32 squares: blobs read to buffers, inflated, then each square: a table kind's table copied into a buffer of its own (slice, line 193) and kept; other kinds decoded as records (buildings with their wear); lists with their orders
- 214-243 per table kind: mixed formats decode everything; squares lacking columns rewritten (copyRows) and kept for re-storing; joined
- 244-258 timing; records and lists sorted; the document assembled
- 259-267 the layout (old format: write all next time; else lists' orders and squares, upgraded squares)

## Contracts, state and data flow
- Every square's table bytes are copied twice before the page sees them: once to a buffer of its own (line 193, kept for all squares until the join) and once into shared memory (tableIn at line 132, which allocates and sets, recordTable.ts:36-40). For a 10 km city (687 MB of building tables, per the comment at 98) the worker holds both full copies at the join: ~1.4 GB peak plus the lots' and other kinds' tables.
- Off the page, so it costs the read worker's memory and time, not the page's frames; the shared tables are what the page keeps.

## Depends on / used by
- uses: world/buildings/recordTable (RecordTable, TableWriter, tableIn, tableRecords), editor/regionFrames, editor/tileCodec, editor/saveLayers; used by: squaresRead.worker (via chunkedSave readSquares)

## Problems found (finding IDs)
- F-0021 (suspected, S2): every square's table is copied twice at the opening (slice, then tableIn), both copies of the whole city held at the join

## To check in other files
- squaresRead.worker: whether it runs in a page worker (the shared cage of 4 GB with the page) or a utility process.
- chunkedSave readSquares: how the blobs are fetched (all at once into `got`?): the compressed blobs of the whole map held too.

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set : set copies the source range into the target's buffer (recordTable.ts:38, tableIn called at line 132): a second full copy
- https://developer.mozilla.org/en-US/docs/Web/API/Response/arrayBuffer : reads the stream to completion into an ArrayBuffer (the inflated frame, regionFrames inflated, line 179)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice : a copy into a new buffer (lines 89, 193)
- https://v8.dev/blog/v8-release-92 : all isolates in a process share one 4 GB cage (ArrayBuffers counted apart, Electron blog): the copies sit outside the heap but inside the process's memory
