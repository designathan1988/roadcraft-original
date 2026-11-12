# src/core/idSlots.ts
Lines: 133
Summary: Dense slots for sparse numeric ids on typed arrays: an open-addressing table (linear probing, tombstones, power-of-two size, load under 0.6) mapping each id to a slot of the caller's columns; freed slots reused; `grown` widens a column.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-13 doc comment; EMPTY/FULL/GONE; MOST_LOAD 0.6; hashOf mixes the id's low and high 32 bits (murmur finaliser)
- 15-35 IdSlots fields (keys, values, states, used, live, free list, next, onGrow, capacity) and constructor sized for the expected count
- 37-55 size, capacity; get: probe until EMPTY
- 57-72 take: existing slot, else rehash when used (full + tombstones) passes 0.6 (double when live passes half of that, otherwise same size to drop tombstones), a free slot or the next; capacity doubles and onGrow tells the caller
- 74-88 delete: tombstone, the slot pushed on the free list (grown by doubling)
- 90-103 forEach over the whole table; clear (states emptied, capacity kept)
- 105-124 place (first non-FULL from the hash) and rehash (new arrays, FULL entries placed again)
- 126-133 grown(column, capacity): a new array of the same type, copied

## Contracts, state and data flow
- O(1) expected per operation; nothing shrinks (table, free list, columns): a city's peak count is kept.

## Depends on / used by
- uses: nothing; used by: the stores of ids (buildings table, items) (to be seen)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://en.wikipedia.org/wiki/Linear_probing : tombstones count toward the load; rehash when too many; constant expected time under a load below one (lines 5, 61, 116-123)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/fill : fills in place (line 98)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT : (redone research) a typed column costs its element size per slot (4-8 bytes), against an object per record plus boxed doubles under pointer compression (v8.dev/blog/pointer-compression): the right layout for per-record state of a large city
