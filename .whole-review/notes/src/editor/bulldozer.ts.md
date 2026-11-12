# src/editor/bulldozer.ts
Lines: 151
Summary: The bulldozer: a click removes the one thing under the pointer (building, pole, street item, road), a dragged box removes everything inside it in one undo step; roads removed with their street kit and a share of their price back.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-25 imports; BulldozerHost
- 27-36 removeRoads: removeWithStreetKit around roadsBefore(doc) (the economy's "before"), segments removed, orphan nodes pruned, settleRoadEdit
- 38-91 CLICK_PIXELS; Bulldozer: drag state, gesture, inProgress, cancel, down, move (redraw), up (click or box), box()
- 93-122 click: building first, else pole/item unless on a carriageway, else the road
- 124-151 boxed: by place (ribbonsNear, buildings.near, lotsIn, polesIn, landscapeIn, barriersIn), each filtered to inside the box, removed in one mutate

## Contracts, state and data flow
- Everything by place; the road removal's cost is the economy's (roadsBefore/settleRoadEdit) and the street kit's.

## Depends on / used by
- uses: world/lots, landscape, carriageway, editor/snap, editor/roads/economy, editor/roads/streetKit; used by: main.ts (bulldozer tool), other tools via removeRoads

## Problems found (finding IDs)
- none here

## To check in other files
- editor/roads/economy roadsBefore: does it price every road of the map at each removal (whole-map work per edit)?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_syntax : object spread is a shallow copy (lines 62, 68-69)
- https://developer.mozilla.org/en-US/docs/Web/API/PointerEvent/pointerId : unique among active pointers (lines 61-77)
- https://web.dev/articles/rail : (redone research) a dragged box removes everything inside in one step: work proportional to the box's contents and the roads' street kits, at release only
