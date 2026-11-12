# src/editor/barriers.ts
Lines: 175
Summary: The walls tool: a wall, fence or hedge traced point by point, each point snapped behind the kerb or along the footway's back of the nearest road (ribbons near the point only), checked not to reach a road, built in one undo step.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-14 imports; FOOTWAY_REACH 3 m, MIN_BARRIER_RUN 0.5 m
- 16-37 snapBarrierPoint: ribbons near the point (ribbonsNear), tunnels skipped, the nearest offset line behind the kerb or footway (closestPoint + sampleAt per ribbon)
- 39-61 barrierProblem: too short, or a segment's rectangle on a carriageway (kerb kinds) or touching a road
- 63-73 BarrierToolHost
- 75-114 BarrierTool: points, lastClick, cursor; gesture, cancel; down (shift removes, else a snapped point; a double click by detail or 450 ms/10 px ends the run)
- 116-134 move (cursor and redraw only), key (Enter, Backspace, Escape)
- 136-152 finish: duplicates dropped, checked, built
- 154-162 plan (per redraw: the cursor snapped, the whole run checked against roads)
- 164-175 onCarriageway: ribbons near the rectangle, each corner's distance

## Contracts, state and data flow
- Every redraw while tracing snaps the cursor and checks every segment of the run (ribbons near each): bounded by the run's length, by place.

## Depends on / used by
- uses: world/barriers, world/buildings/validate, world/network, world/roadTypes, editor/snap ribbonsNear; used by: main.ts (walls tool)

## Problems found (finding IDs)
- none

## To check in other files
- editor/snap ribbonsNear: indexed by place (not a walk of every ribbon)?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/UIEvent/detail : the click count for mouse events (line 109)
- https://developer.mozilla.org/en-US/docs/Web/API/Element/dblclick_event : two clicks in a short span (lines 105-112)
- https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event : (redone research) the snap per pointer move reads only the ribbons near the point: bounded by what is near, independent of the map's size
