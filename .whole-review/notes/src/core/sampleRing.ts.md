# src/core/sampleRing.ts
Lines: 70
Summary: A fixed ring of the last `capacity` samples (Float32), no allocation per push; nearest-rank percentile stats on demand; STUTTER_MS (two periods at 59 Hz).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-19 SampleRing: values, head, filled, total; size and pushed
- 21-36 newest(back), push (O(1), no allocation), clear
- 38-56 toArray (oldest first, a new list) and stats (sorted copy, p50/p95/p99/max, count over a threshold)
- 58-70 SampleStats; STUTTER_MS

## Contracts, state and data flow
- push is allocation-free; stats allocates and sorts (per call).

## Depends on / used by
- uses: nothing; used by: frame monitors (healthWatch, governor)

## Problems found (finding IDs)
- none

## To check in other files
- callers of stats(): per frame?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Float32Array : 32-bit floats (line 3)
- https://en.wikipedia.org/wiki/Percentile : nearest rank ceil(P/100 N), always a member, the 100th the largest (line 50)
- https://v8.dev/blog/trash-talk : (redone research) a fixed Float32 ring allocates nothing per push; the percentile's sorted copy is garbage only when stats are asked (the right shape for a per-frame sampler, unlike health.ts's FrameTimer, F-0008)
