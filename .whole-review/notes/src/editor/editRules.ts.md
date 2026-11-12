# src/editor/editRules.ts
Lines: 285
Summary: What a road edit may not leave behind, judged on the working copy of the network: sharper junctions, squeezed legs, ramps steeper than Baldwin Street, a carriageway on another; guardRoadEdit runs an in-place edit on a fork, judges and pays it.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-40 imports; RoadEditRefusal; RoadState; GAP_NOISE, SQUEEZE_SLACK, MAX_BUILT_GRADE, PASS_CLEARANCE, SAME_LEVEL, SAMPLE_STEP 0.8 m, OVERLAP_SLACK, SAME_PLACE
- 42-60 refuseRoadEdit: the fork's written impossible/squeezed marks compared with before; changed segments; steepness and overlap judged on flat-ground solves
- 62-69 flatSolves: before() = buildRoadElevation(before.net, FLAT_GROUND) with NO previous solve (from scratch, when asked); after() starts from before()
- 71-78 written: the fork's own marks only (ForkMap.changes)
- 80-95 guardRoadEdit: rebuild if behind, roadsBefore(doc), fork, edit, rebuild, rules, settle, take back
- 97-127 changedSegments (the fork's named roads and their incident segments) and sameSegment/sameEnd (no text per road)
- 129-185 deckAt; GRADE_STEP/RUN; grade (samples the solved deck every 0.4 m); tooSteep (changed roads and those meeting them; a road meeting that was already as steep before is not refused)
- 187-236 overlapsAnother: roads near the changed one (ribbonsNear), samples every 0.8 m, closest point on each near road, decks compared via the after() solve, overlaps that stood before ignored
- 238-285 withinSharedPlate, overlappedBefore, overlapReach, segmentsThrough (by place)

## Contracts, state and data flow
- Asking deck() or a ramp's grade forces after(), which forces before(): a solve of the WHOLE network before the edit, from nothing, on every edit and every dry run that has a ramp or a road near the changed one (nearly every road drawn in a city).

## Depends on / used by
- uses: core/forkMap, core/plain, world/elevation buildRoadElevation, world/network, editor/roads/economy, editor/snap; used by: editor/commit (every road edit and dry run), guardRoadEdit callers

## Problems found (finding IDs)
- F-0013 (suspected, S2): the rules solve every road of the map from scratch for each edit/dry run (flatSolves.before)

## To check in other files
- world/elevation buildRoadElevation: is a solve with no previous whole-map, and is there a cache of the flat solve per network revision?

## Sources
- https://en.wikipedia.org/wiki/Baldwin_Street : about 35% at its steepest (lines 29-30)
- https://en.wikipedia.org/wiki/Grade_(slope) : grade = rise / horizontal run (lines 141-164)
- https://web.dev/articles/rail : (redone research) a response within 100 ms, input handled in 50 ms: a whole-map road-height solve at each dry run and each click (F-0013, line 66) breaks that budget in proportion to the map, not the edit
- https://en.wikipedia.org/wiki/Incremental_computing : (redone research) recompute only what depends on the change: the flat solve of the network before the edit does not change between dry runs of the same map revision, so keeping it per revision is the incremental form
