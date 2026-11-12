# src/editor/editStream.ts
Lines: 14
Summary: A seeded random stream for an edit of the document, from the diary's version and the place, so an edit can be made again the same.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-7 editRng: an Rng seeded by version and rounded x, y mixed into an unsigned 32-bit word
- 9-14 editRandom: the stream as a no-argument function

## Contracts, state and data flow
- One small object per edit.

## Depends on / used by
- uses: core/rng; used by: actions (pole pulls), other edits

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Unsigned_right_shift : >>> 0 makes an unsigned 32-bit integer (line 6)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random : cannot be seeded, so edits use their own stream (line 4)
- (redone research) one small Rng object per edit: no weight on RAM, CPU or GPU; nothing here needs more research than the two pages above
