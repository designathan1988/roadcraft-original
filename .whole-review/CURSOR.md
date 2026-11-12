# Cursor

What I am doing now, the next step, and open questions. Keep it short and current.

- Phase read: 115 of 772 files read; next `src/editor/saveStore.ts` (ledger `next`). No code changed.
- 2026-10-28 late, the owner: "REFAÇA TODAS AS PESQUISAS". DONE for the 109 notes: each note's Sources now has a "(redone research)" line from pages opened for the performance question that file raises (V8 GC/escape analysis/pointer compression/elements kinds/stack traces, postMessage clone vs transfer, Electron processes and MessagePortMain, IndexedDB durability/getAll, localStorage blocking, WeakMap/WeakRef/FinalizationRegistry, RAIL budgets, Steam GPU survey, Electron backgroundThrottling, three WebGLRenderer). Filler sources (Math.cos etc.) marked replaced. From now on, research only what decides each suspicion.
- Research changed findings: F-0008 (shift is left-trimmed in V8; the cost is 1,800 promoted Map+record objects), F-0007 (x060 = most common Steam GPUs), F-0010 (capture + format per event), F-0012 (clone ~10 ms/MB; desktop utility processes copy anyway).
- New checks from research: main.ts stops drawing when minimized? (backgroundThrottling false renders every frame in the background); devicePixelRatio cap; where cookedCities/cityGenerator/regionFrames decode run (page vs worker); world/network rebuild incremental?; world/economy roadValue; world/elevation; poleLinesIn caching; doc.trees count; jobs/jobPool + desktop/jobs.cjs (six job processes, copies per crossing job).
- Findings F-0001..F-0020 suspected (FINDINGS.md).
- docs/agent/work.md cannot be written during phase read (the skill's hook denies project edits); this file is the notebook until phase fix.
