# src/core/weakMachine.ts
Lines: 50
Summary: A weaker machine played on this one for a run (build-time ROADCRAFT_WEAK): threads, GPU name, memory GB and pixel ratio overrides; the preset uhd770 (4 threads, Intel UHD 770, 8 GB, dpr 1).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-11 doc comment; the build-time constant; WeakMachine interface
- 13-18 PRESETS (uhd770) and NONE
- 20-46 parseWeakMachine: presets and key=value parts, ranges checked (throws out of range)
- 48-50 WEAK_MACHINE from the define

## Contracts, state and data flow
- Constant for the run; read by the job pool, gpuTier/gpuLedger and the pixel ratio.

## Depends on / used by
- uses: the Vite define __WEAK_MACHINE__; used by: jobs/jobPool, render/gpuLedger, gpu tier choice, pixel ratio

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://vite.dev/config/shared-options.html#define : defines are globals in dev and replaced statically in build (lines 3, 49)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isFinite : no coercion; used after Number(value) (lines 35-36)
- https://store.steampowered.com/hwsurvey/videocard/ : (redone research) the uhd770 preset (Intel integrated) models the low end; the mission's mid-range PC is an RTX x060 (the most common cards, Sep 2026), which no preset models
