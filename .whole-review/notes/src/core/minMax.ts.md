# src/core/minMax.ts
Lines: 10
Summary: least and most: Math.min and Math.max of two numbers to the bit (NaN and signed zero kept) as comparisons the optimiser keeps unboxed.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-3 doc comment: the builtins stayed calls boxing their results in a cell job's loops
- 5-6 least(a, b): NaN if either is NaN; -0 under +0; else the smaller
- 8-10 most(a, b): NaN if either is NaN; +0 over -0; else the larger

## Contracts, state and data flow
- Pure, no allocation.

## Depends on / used by
- uses: nothing; used by: render/buildings/cellArrays boxes and other hot loops

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/min : NaN if any argument is NaN; -0 is the minimum of 0 and -0 (line 6)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/max : NaN if any argument is NaN; +0 the maximum of 0 and -0 (line 9)
- https://v8.dev/blog/pointer-compression : (redone research) numbers kept unboxed only while they stay in registers of optimised code; small comparisons inline, so least/most avoid a heap number where Math.min/max calls are not inlined (the file's premise; no weight either way unless in a hot loop)
