# src/core/digest.ts
Lines: 79
Summary: An exact two-lane digest of a stream of numbers, strings and plain values (FNV-like and murmur-like lanes mixed per 32-bit word), giving an integer under 2^53; used to key derived data by content.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-4 shared scratch: one Float64Array and its two 32-bit words
- 6-16 Digest lanes a/b; add(value): both words of the double
- 18-28 addAll (each number then the length) and addText (each char code then the length)
- 30-56 addPlain: tags each kind, arrays element by element, objects by for...in keys in creation order (undefined, functions and skipped keys left out), then the count
- 58-70 value(): a final avalanche on each lane, 21 bits of a and 32 of b
- 72-79 word(): FNV multiply on a, murmur multiply and shift on b

## Contracts, state and data flow
- Cost proportional to the digested data; the key order of objects is creation order, so two equal records built in another order digest differently.

## Depends on / used by
- uses: nothing; used by: derived keys (cells' ground digests, kept tiles)

## Problems found (finding IDs)
- none

## To check in other files
- callers digesting large structures per frame (the digest itself is linear).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/imul : 32-bit integer multiply with wrap (lines 62-67, 73-74)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...in : own and inherited enumerable keys, integer keys first then creation order (line 48)
- https://web.dev/articles/rail : (redone research) a digest walks every value it keys: digesting a whole city's inputs to key derived data is linear work on whatever thread calls it; on the page it must stay under 50 ms chunks (callers to check: digests of whole-map inputs at opening)
