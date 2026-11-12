# src/editor/poles.ts
Lines: 522
Summary: The pole tool and the planning of a pole run: ends snapped onto standing poles or the footway contours, the route searched over the pole lines of a region round the run that doubles until the route is surely shortest, corners kept by Douglas-Peucker, poles spaced evenly off crossing landings, standing poles reused; a batch planner by 1 km tiles.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-38 imports; POLE_PICK_PIXELS, LINE_CATCH 2.5 m, POLE_TO_LINE 5 m, CORNER_TOLERANCE 1.5 m, MIN_POLE_GAP 10 m, REUSE_RADIUS 6 m; lampFor
- 40-63 PoleSnap; snapPole (the cell's lines); snapOn (a pole near, else the contour within 12 m on a footway or 2.5 m off it, else free)
- 65-91 PlannedPole, PoleRunRefusal, PoleRunPlan; placeOf; endOff
- 93-103 graphs: route graphs cached per PoleLines object (WeakMap)
- 105-139 ROUTE_MARGIN 96 m, CLOSED_PAD, ROUTE_MARGIN_MOST 4 km, poleRouteWork; routeRun: the region round both ends grows x2 until the found cost is under twice the region's reach (or the start's reached box closes inside it)
- 141-151 Routing; regional
- 153-201 TILE 4 cells; poleRunPlanner: lines and graph per tile (kept for the planner's life), routed inside the tile when both ends are inner, else routeRun
- 203-239 corners (iterative RDP with a stack); inLanding
- 241-268 planPoleRun: the last plan returned while nothing it reads changed (the preview asks every frame); lastPlan
- 270-276 planPoleRunWhole
- 278-370 computePoleRun: snaps; route; arc lengths; corner keys merged within a gap; even stations between them; each nudged off landings up to 12 m (linear scan of `at` per probe); standing poles reused, duplicates merged
- 372-393 commitPoleRun/commitPoleRunPoles: new poles added, spans between consecutive ids
- 395-410 PoleToolHost: doc, net, zoom, mode, lamps, kind, inHand, mutate, hint, redraw
- 412-455 PoleTool state; reach in world units; gesture/inProgress/cancel; plan (the draft or the chained hover)
- 457-509 down (remove under Remove verb or shift-click, else a draft), move (draft end or hover), up (plan, commit, chain on)
- 511-521 marks (the pole under the pointer to remove, or the snap of the first end)

## Contracts, state and data flow
- The preview's plan is recomputed only when the pointer, the network revision or the poles serial changed; each new pointer position plans again over a region (poleLinesIn + buildRouteGraph unless poleLinesIn returns the same object for the same region).

## Depends on / used by
- uses: world/poleLines (poleLinesAt/In/Of, nearestOnContour, onFootway), editor/poleRoutes, world/doc poles, world/utilities, world/cells CELL; used by: main.ts (pole tool, preview each frame), city generator / power lines (poleRunPlanner)

## Problems found (finding IDs)
- none confirmed here

## To check in other files
- world/poleLines poleLinesIn: does it return a cached object per region (otherwise the WeakMap graph cache never hits and every pointer move rebuilds the route graph)?

## Sources
- https://en.wikipedia.org/wiki/Ramer%E2%80%93Douglas%E2%80%93Peucker_algorithm : keeps the farthest point beyond tolerance, O(n log n) to O(n^2) (lines 203-228)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap : keys held weakly: a graph lives as long as its lines object (lines 93-103)
- https://web.dev/articles/rail : (redone research) input handled within 50 ms: a pointer move that rebuilds a region's route graph (if poleLinesIn returns a new lines object each time) can pass that on a dense block; caching decides (to check in world/poleLines)
