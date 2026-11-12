# src/core/heap.ts
Lines: 65
Summary: The game's one binary min-heap of numbers by priority, in three typed columns (item, key, arrival order), ties broken by an optional `before` then by arrival.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-13 doc comment; Heap fields (items/keys/order Float64Arrays of 16, count, seq); size, peekKey, clear (count reset; capacity kept)
- 14-23 push: grows by doubling when full, sift-up
- 24-41 pop: undefined (cast to number) when empty; swap root and last, sift-down
- 42-47 grow: three new arrays of twice the size, copied
- 48-57 less: key, then `before`, then arrival order
- 58-65 swap through locals (no destructuring arrays)

## Contracts, state and data flow
- O(log n) push/pop, no allocation besides doubling; capacity never shrinks (a heap once filled with one entry a building keeps that room).

## Depends on / used by
- uses: nothing; used by: decayWatch and other schedulers (to be seen)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://en.wikipedia.org/wiki/Binary_heap : parent (i-1)/2, children 2i+1/2i+2, O(log n) sift-up and sift-down (lines 18-22, 32-39)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray : fixed-length views; growing means a new array and a copy (lines 42-47)
- https://v8.dev/blog/trash-talk : (redone research) typed columns allocate nothing per push: no young-generation garbage per item, unlike a heap of {item, key} objects
