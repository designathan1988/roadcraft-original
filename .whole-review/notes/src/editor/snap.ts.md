# src/editor/snap.ts
Lines: 426
Summary: The road tool's snapping: what the pointer is over (a node, a point on a road, open ground) found among the ribbons near the point; road starts and ends snapped to nodes, roads (with perpendicular/angle landings), headings (continue, perpendicular, grid orthogonals, 15-degree steps), lengths and the grid; heights of anchors; the snap settings kept in localStorage.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-37 imports; Anchor, SnapResult; CONE 7.5 deg, LENGTH_STEP 4 m, LENGTH_TOLERANCE
- 39-71 RoadSnap settings read at module load and written on change in localStorage (both failures caught with no binding); grid snap step and offset
- 73-82 ribbonsNear: the network holds the roads near the rect, then the segment cells' ids meeting it
- 84-163 findAnchor (@perInput): nodes of the roads near the point within 30 px, else the closest road within its casing (box test, closestPoint), height-matched when asked, ties to the smaller id
- 165-170 snapRoadStart: a free start on the grid
- 172-194 snapRoadEndpoint: snapEndpoint with the settings, else the anchor
- 196-253 snapHeading: candidates from the start node's roads, the landing road's angles, grid headings or 15-degree steps; the nearest within the cone (any grid heading while the grid is drawn)
- 255-274 rayHitsPolyline: segSeg against every segment of the target's points
- 276-285 SnapOptions: heightOffset, angles, lengthStep, grid
- 287-380 snapEndpoint (@perInput): a node landing exact; a road landing: the target's points copied (toPoints), the heading snapped to the road's tangent, a ray cast twice, kept when near the pointer; else headings, length quantised, the grid
- 382-401 onGridAlong; GRID_HEADINGS
- 403-425 anchorHeightOffset (node or interpolated segment height plus clearance); anchorForHeight

## Contracts, state and data flow
- Per pointer move: work bounded by the roads near the pointer; on a road landing, one copy of the target road's points as objects and up to two ray casts over all its segments (segSeg allocating per segment): proportional to that one road's vertices.

## Depends on / used by
- uses: core/vec2, core/intersect segSeg, core/scalar, world/network (segmentCells, ribbons, polylines, holdNear), world/geometry orientedPolyline, world/grid, world/structures; used by: editor/roadTool, editor/commit, editor/repair, editor/blocks, other tools

## Problems found (finding IDs)
- F-0018 (suspected, S4, widened): two more catch blocks with no binding (lines 53, 68)

## To check in other files
- world/network holdNear: what holding the roads near a rect costs per pointer move (it runs at every findAnchor).

## Sources
- https://v8.dev/blog/disabling-escape-analysis : returned objects escape to the heap: toPoints (line 313) and segSeg per segment (line 266) allocate per pointer move on a road landing, bounded by one road's vertices
- https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/getCoalescedEvents : the browser merges pointer updates into one event to reduce handling; frame alignment is not guaranteed by the page: everything @perInput here runs once per dispatched move (lines 84, 172, 287)
- https://web.dev/articles/storage-for-the-web : localStorage blocks the main thread: read once at module load, written per settings change (lines 47-71), no weight
