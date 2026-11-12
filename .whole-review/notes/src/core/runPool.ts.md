# src/core/runPool.ts
Lines: 75
Summary: Runs of numbers by integer key in one shared Float64Array (start and length per key in Int32 columns); a dropped run stays until a put overflows, then the live runs are packed (same size while a quarter stays free, else 1.5x what is needed).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-8 RunPool: starts/lengths columns, data, used, live
- 10-18 start(key) (?? 0 for keys past the column) and length(key)
- 20-32 put: drops the old run, reserves keys (1.5x), packs when the tail has no room, appends
- 34-54 reserve, drop, clear
- 56-75 pack: walks every key, copies live runs together into a new array

## Contracts, state and data flow
- pack is O(keys + live numbers) and allocates a new array each time; amortised by the free quarter. `data` must be re-read after put.

## Depends on / used by
- uses: nothing; used by: kerbBays entrance runs and building runs (to be seen)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://en.wikipedia.org/wiki/Dynamic_array : growth factor a gives amortised cost a/(a-1); 1.5 wastes at most 0.5n (lines 23, 59)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int32Array : contents start at 0; an index past the end reads undefined (lines 12, 17)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT : (redone research) 8 bytes a number in one shared Float64Array, no object per run; the dead runs kept until a put overflows are memory held by design (up to a quarter free)
