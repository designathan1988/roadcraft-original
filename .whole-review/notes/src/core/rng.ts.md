# src/core/rng.ts
Lines: 123
Summary: The deterministic RNG (xoshiro128** seeded by splitmix32): u32, float, range, int, bool, pick, Box-Muller normal, weighted pick, fork by tag, state/fromState; plus mulberry32 as a closure generator.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-14 RngState; mix (splitmix32 finaliser); rot
- 16-44 Rng: four state words seeded from the seed by mix (all-zero guarded), state() and fromState
- 46-58 u32: xoshiro128** step on the fields (no closure, no allocation)
- 60-100 float, range, int, bool, pick (throws on empty), normal (u clamped above 0), weighted
- 102-110 fork: FNV of the tag xor a draw seeds a new stream
- 112-123 mulberry32 closure generator

## Contracts, state and data flow
- No allocation per draw; one object per stream.

## Depends on / used by
- uses: src/core/scalar.ts; used by: city generation, growth, gardens, effects

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://prng.di.unimi.it/ : xoshiro128** (xor/shift/rotate engine, multiplication scrambler); seed with SplitMix (lines 5-11, 24-58)
- https://en.wikipedia.org/wiki/Box%E2%80%93Muller_transform : Z = sqrt(-2 ln U1) cos(2 pi U2); U1 must not be 0 (lines 85-89)
- https://v8.dev/blog/disabling-escape-analysis : (redone research) state()/fork() return new objects that escape; per lot or per building, not per frame: no weight
