# src/editor/tileCodec.ts
Lines: 49
Summary: Reading back the oldest tiled saves (manifest 5: gzip JSON squares) and the wears kept beside every format's buildings: a square's records, a wears list as id/decay pairs, and a record with its stored wear laid over it.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-12 imports; the contract; SquareBlob and its guard
- 14-19 SquareCodec: square, wears, global
- 21-29 JSON_CODEC: each square gunzipped and JSON-parsed whole (manifest 5)
- 31-38 readWears: a JSON array of pairs checked and turned into a Map
- 40-48 withWear: the record copied without/with its decay when the stored wear differs

## Contracts, state and data flow
- Old format only (manifest 5): every record of a square becomes an object; the next save rewrites the map in the current format. withWear copies a building record only when its wear differs.

## Depends on / used by
- uses: editor/saveStore gunzip, editor/regionFrames types; used by: editor/squaresDecode (codec choice, withWear)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse : the whole value is built before any reviver runs (lines 24, 28, 33: each square parsed whole)
- https://v8.dev/blog/cost-of-javascript-2019 : JSON.parse is the fast path for large data evaluated once (about 10 kB and up): the right reader for the old JSON squares
