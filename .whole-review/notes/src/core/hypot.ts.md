# src/core/hypot.ts
Lines: 49
Summary: hypot2 and hypot3: Math.hypot to the bit in plain JS (scaled by the largest, Kahan-summed squares), so V8 inlines them and boxes no number per call.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-4 doc comment: V8's Math.hypot is a builtin call that boxes its result; this is its algorithm inline
- 6-24 hypot2: Infinity before NaN, 0 for zeros, squares over the largest with Kahan compensation, sqrt times the largest
- 26-48 hypot3: the same with three terms
- 49 end of file after the closing brace

## Contracts, state and data flow
- Pure, no allocation.

## Depends on / used by
- uses: nothing; used by: hot loops (to be seen)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://en.wikipedia.org/wiki/Kahan_summation_algorithm : y = x - c; t = sum + y; c = (t - sum) - y; sum = t (lines 17-22, 38-46)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sqrt : NaN for negatives (the sum is never negative here, line 23, 47)
- https://v8.dev/blog/pointer-compression : (redone research, replaces the Math.sqrt filler) a double returned through a call that is not inlined is boxed as a heap number: the file's premise (plain JS that V8 inlines keeps the number unboxed) is the right reason for it
