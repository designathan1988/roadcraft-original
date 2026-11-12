# src/core/weightedSlots.ts
Lines: 119
Summary: Ordered slots each empty or of one of a few classes, with one Fenwick tree of counts per class, so a weighted draw over thousands of slots (and the k-th occupied slot) is found in log steps.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-19 fields: cap (power of two), used, classes (Int8, -1 empty), trees per class, counts, occupied; constructor
- 21-57 length, push (grows when full), set (moves a slot between classes in the trees), classAt, count, total
- 59-84 findWeighted (descends the trees summing weight x count per class) and nth (descends by counts)
- 86-92 clear (room kept)
- 94-119 add (Fenwick update) and grow (cap doubled, trees rebuilt in O(n) by parent sums)

## Contracts, state and data flow
- O(kinds log n) per draw and update; memory (kinds + 1) arrays of cap; nothing shrinks.

## Depends on / used by
- uses: nothing; used by: weighted draws over lots or slots (to be seen)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://en.wikipedia.org/wiki/Fenwick_tree : update by adding lsb, prefix search by descent, O(n) construction through parents (lines 60-84, 94-117)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Int8Array : signed 8-bit, -128..127 (line 9; classes under 128)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT : (redone research) one byte a slot plus one Fenwick array per class: thousands of slots cost kilobytes, a weighted draw log steps, no garbage per draw
