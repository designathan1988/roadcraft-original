# src/editor/repair.ts
Lines: 108
Summary: Repairs of a legacy map's dead ends that visibly end inside another road: found (nearest candidate over every dead end, roads near it), split and merged, up to 64; or replayed on the page from steps found off the page.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-25 imports; Candidate; RepairStep
- 27-47 repairNearConnections: up to 64 rounds of a network rebuild, the nearest candidate over the whole map, a split and merge (rejected pairs remembered); a final rebuild
- 49-72 REPLAY_EPS 5 cm; replayRepairs: each step checked against the map as it is (the dead end, the road, the place), split and merged, a rebuild before each
- 74-107 nearestCandidate (@rebuild): every node of one incident road; the roads near it (ribbonsNear); same structure, not rejected, heights within 30 cm, within the casing half; the nearest kept

## Contracts, state and data flow
- Whole-map work, run once at a legacy map's opening (skipped for generated cities, history.ts openedGenerated); 64 rounds x every node at most.

## Depends on / used by
- uses: world/doc nodes/segments/mergeNodes, world/network rebuild/polylines, editor/commit splitSegment, editor/snap ribbonsNear, world/structures; used by: editor/history restoreInto, networkBake.worker (off the page), main.ts (replay)

## Problems found (finding IDs)
- none (legacy maps only, not the generated 10 km city)

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values : a live iterator in insertion order (line 77: the nodes walked, no mutation inside)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals : each evaluation makes a new string (lines 39, 91: the rejected keys)
- https://web.dev/articles/rail : (redone research) up to 64 rounds of a network rebuild plus a walk of every node: legacy maps only (generated cities skip it), run off the page in the networkBake job or on the page for a map whose network holds every road
