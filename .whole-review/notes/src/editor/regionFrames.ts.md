# src/editor/regionFrames.ts
Lines: 81
Summary: The binary frames of a map saved by regions: a square's records (a record table cut from the map's, or JSON) with their order places, a square's wears as id/decay pairs, and small values (globals, the manifest) as JSON frames; plus the codec that reads them back from stored blobs.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-9 imports (tableRecords, saveBinary frame helpers); the contract; section kinds
- 11-23 SquareRecords, SquareSections; squareFrame (a table's bytes as they are, or JSON; orders as doubles)
- 25-34 readSquareSections: the frame's sections, nothing decoded
- 36-45 readSquareFrame: the table copied to its own buffer (slice) and decoded to records, or JSON parsed; orders to an array
- 47-60 wearFrame; readWearFrame (pairs to a Map)
- 62-69 valueFrame; readValueFrame
- 71-80 REGION_CODEC: square (gunzip then sections), squareOf (inflate stored bytes), wears, global

## Contracts, state and data flow
- Saving cuts a table's rows without decoding; reading a square for the opening uses sections (no decode); readSquareFrame decodes every record (callers other than the opening).

## Depends on / used by
- uses: world/buildings/recordTable tableRecords, editor/saveBinary; used by: editor/chunkedSave (TiledSaves read/write), squaresDecode, the save worker

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Blob/arrayBuffer : the blob's bytes in an ArrayBuffer, promise-based (line 76)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/slice : a copy in a new buffer (line 41: the table read from offset 0)
- https://developer.mozilla.org/en-US/docs/Web/API/CompressionStream : (redone research) gzip/gunzip streams run off the page in workers; where REGION_CODEC is called decides whether a city's squares are decompressed on the page at opening (squaresDecode, to check)
