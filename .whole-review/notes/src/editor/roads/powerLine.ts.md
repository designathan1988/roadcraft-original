# src/editor/roads/powerLine.ts
Lines: 96
Summary: The power line of new streets: for each street with a footway (not tunnelled, its open stretch above ground) a pole run is planned along its left footway between its mouths, consecutive runs joined at two-road nodes; many streets planned over shared 1 km tiles; a generator yields every 6 streets.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-14 imports; END_SETBACK 4 m, MIN_RUN 24 m, SNAP_REACH 8 m, BURIED 0.5 m
- 16-22 layPowerLines: runs the steps to the end
- 24-38 layPowerLinesSteps state: ids sorted; the planner; ends by node; join (a span between an incoming and an outgoing run at a two-road node)
- 39-68 per street: skipped without pedestrians/footway, tunnels, buried; the stretch between the mouths and setbacks; positions on the left footway; a run continuing from the previous pole; committed; ends joined
- 70-76 openStretch: the share of a road above BURIED from its ends' offsets
- 78-95 PlanRun; BATCH 24; runPlanner (shared tiles past 24 streets, else planPoleRun); STREETS_A_STEP 6

## Contracts, state and data flow
- Per street: one route plan over a region round it (or a shared tile); used for new streets (the road tool) and for the generator's whole city.

## Depends on / used by
- uses: editor/poles (planPoleRun, poleRunPlanner, commitPoleRunPoles), world/network (ribbons, mouthDistance), world/pedestrianAccess; used by: editor/cityGenerator (power lines for the city), the road tool / streetKit

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function* : yield pauses, the return value comes with done (lines 16-25, 40)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Generator/next : the final next() carries the return value (lines 19-20)
- https://web.dev/articles/rail : (redone research) the generator yields every 6 streets so a caller can cut the work in chunks, but layPowerLines drains it in one go (lines 16-22): a whole city's power lines in one pass where called on the page
