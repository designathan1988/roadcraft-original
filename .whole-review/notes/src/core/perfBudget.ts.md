# src/core/perfBudget.ts
Lines: 171
Summary: The performance budgets table: per-step ms budgets (warn), per-view triangle/draw-call/GPU/fps budgets, GPU memory per group, textures, targets, heap; memoryGroup classifies a mesh by name; cityBudgetTable compares a measure with the budgets.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-12 Budget {max, min, level, why}
- 14-37 STEP_BUDGETS (edit, commit, network, draw steps, warn only) and stepBudget(name) (whole name, then the part before the first space)
- 39-48 CityView; VIEW_BUDGETS: street and district 16,000,000 triangles, map 8,000,000; draw calls 1,000-1,100; GPU 12 ms; fps 60/50 (comment: the triangle budget must not be under what the view draws at full facade level)
- 50-74 MemoryGroup and MEMORY_BUDGETS_MB (L0 shells 300, parts 150, masses 120, tiles 60, plates 15; others none; other 0); textures 600 MB, targets 300 MB, heap 1,500 MB
- 76-91 memoryGroup(name): prefixes and regexes to groups
- 93-124 CityMeasure (from the running game) and BudgetRow
- 126-171 cityBudgetTable: rows for the view, each memory group, textures, targets, CPU geometry, heap; sorted over-first

## Contracts, state and data flow
- The triangle budget (16 M a frame in street/district views) is what buildings/frameBudget fits the levels to: on a mid-range GPU 16 M triangles a frame (shadows included) is a heavy load; the budget follows what the view draws, not the target machine.

## Depends on / used by
- uses: nothing; used by: ui/healthWatch (F9), render/buildings/frameBudget (VIEW_BUDGETS?), the specs and probes

## Problems found (finding IDs)
- none confirmed here; see check

## To check in other files
- render/buildings/frameBudget.ts and quality.ts: is VIEW_BUDGETS.triangles the frame's triangle budget in the game, and what a mid-range tier gets.

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Performance/memory : usedJSHeapSize is non-standard, unreliable, misses workers (lines 110-113)
- https://threejs.org/docs/#api/en/renderers/WebGLRenderer.info : (index page; general three behaviour) info.render calls/triangles per render, reset when autoReset (lines 96-98)
- https://threejs.org/docs/pages/WebGLRenderer.html : (redone research: the real page) info.memory counts only geometries and textures, not their bytes; budgets in bytes need the game's own accounting (memoryGroup here)
