# src/editor/saveBinary.ts
Lines: 114
Summary: The save's binary frames: a magic word, a format, a directory of sections (kind, offset, length) and 8-byte aligned sections; packed as pieces (for a Blob) or one buffer (transferable); read back as views without copying; JSON and Float64 helpers; gzip through Compression Streams, kept plain where the browser lacks them.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-20 the contract; magic words (square, wear, global, manifest, map file), file sections, FORMAT, HEAD/ENTRY; align8
- 22-41 FrameSection; framePieces: the header with the directory, each section and its padding as pieces (no whole buffer)
- 43-50 packFrame: the pieces copied into one buffer
- 52-57 magicOf: the first little-endian word, 0 when too short
- 59-75 readFrame: magic and format checked, the directory bounds checked, sections as subarray views
- 77-89 TextEncoder/Decoder; jsonBytes/jsonOf; f64Bytes; f64Of (copied only when not 8-byte aligned)
- 91-99 isGzip; gzipBytes (Blob piped through CompressionStream('gzip'), or plain)
- 101-113 gunzipBytes; inflated (a stream over the bytes as they are through DecompressionStream; plain bytes returned as they are; a gzip save without DecompressionStream throws)

## Contracts, state and data flow
- packFrame makes one copy of a square's sections (to transfer them); reading never copies a section except an unaligned Float64 one.

## Depends on / used by
- uses: DataView, TextEncoder/Decoder, Blob, Response, Compression Streams; used by: editor/regionFrames, chunkedSave, saveStore, mapExport, persistence readMapFile

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/CompressionStream : gzip through pipeThrough, available in workers (lines 94-99)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/DataView/getUint32 : little-endian flag, RangeError past the end (lines 56, 63-71)
- https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream : the reverse stream (lines 108-112)
- https://developer.chrome.com/blog/transferable-objects-lightning-fast : (redone research) packFrame's single buffer is what makes a square transferable to the save worker at no copy (6.6 ms vs 302 ms for 32 MB): one copy here to save a clone later
