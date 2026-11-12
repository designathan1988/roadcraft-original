# src/editor/roads/economy.ts
Lines: 23
Summary: Paying for a road edit: the roads' value and the balance before the edit (roadsBefore), and the charge for the value after against it, written into the edited document when it can be paid (settleRoadEdit).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-8 imports (world/economy chargeFor, roadValue); RoadsBefore
- 10-13 roadsBefore: roadValue(doc) of the map before the edit and the balance
- 15-22 settleRoadEdit: chargeFor(before, roadValue(after), balance); the balance set when affordable and non-zero

## Contracts, state and data flow
- Each road edit and each dry run calls roadValue twice (before and after): its cost is world/economy's roadValue (whole map or kept incrementally).

## Depends on / used by
- uses: world/economy (roadValue, chargeFor), world/doc setBalance; used by: editor/commit (commitRoadPath, dry runs, layCopy), editor/editRules guardRoadEdit, other road edits

## Problems found (finding IDs)
- none here; see the check below

## To check in other files
- world/economy roadValue: does it sum every segment of the map at each call (two whole-map sums per edit and per dry run) or keep the value as segments change?

## Sources
- https://en.wikipedia.org/wiki/Incremental_computing : an aggregate kept by its changes instead of recomputed (lines 11-13, 17: the value asked per edit)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Functions/Default_parameters : `apply = true` used when undefined (line 16)
- https://web.dev/articles/rail : (redone research, replaces the default-parameter filler) two roadValue calls per edit and per dry run: if roadValue walks every segment, that is two whole-map passes inside the 100 ms response budget of each dry run (world/economy to check)
