# src/core/plain.ts
Lines: 50
Summary: Deep equality of plain values: samePlain (an undefined key is no key; NaN equals NaN) and sameText (the same JSON text, keys in the same order, without writing it).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-23 samePlain: identity, NaN pair, arrays element by element, objects by for...in counting defined keys both ways
- 25-50 sameText: the same plus key ORDER (Object.keys of both, undefined skipped), as JSON.stringify would write

## Contracts, state and data flow
- Linear in the values compared; sameText allocates the two key arrays per object.

## Depends on / used by
- uses: nothing; used by: change detection of records (to be seen)

## Problems found (finding IDs)
- none

## To check in other files
- callers comparing whole documents per frame.

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/keys : own enumerable keys, same order as for...in, a new array (lines 39-46)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify : undefined keys omitted in objects, NaN written null (lines 25-28, 42-43)
- https://v8.dev/blog/trash-talk : (redone research) samePlain compares without building text (no string garbage); Object.keys arrays per level are short-lived and cheap
