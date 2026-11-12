# src/editor/streetscapeTool.ts
Lines: 155
Summary: The landscaping tool: benches, bins, lights, trees and signs placed on the footways (snapped, refused with a reason), a stop or give-way sign at an approach becoming that leg's rule, shift-click removing, and a row dragged out from a placed item at the catalogue's spacing.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-25 imports; StreetscapeToolHost
- 27-39 StreetscapeTool: hover snap, row in progress; reach
- 41-84 down: shift removes the item near; else the snap among items around; a stop/yield sign on an approach sets the node's rule; else the item added (a row begins for row kinds)
- 86-97 move: while pressed, the row's pieces worked out again; else the hover snap
- 99-112 up: the row's pieces added in one undo step; class end
- 114-115 ROW_SPACING from the furniture catalogue
- 117-141 rowPieces: up to 200 stations along the footway toward the pointer; each snapped among the items around it plus the row's own (a landscapeIn query and ribbonsNear per station, the `laid` list growing)
- 143-151 itemsAround: the widest casing near, the items in a padded box
- 153-154 MEADOW_CLEAR 2.5 m: a meadow's clearance

## Contracts, state and data flow
- A hover snap per pointer move (bounded by what is near). While a row is dragged, every move recomputes the whole row from its start: up to 200 stations, each with two spatial queries and a snap against all pieces laid so far (quadratic in the row's length), per pointer move.

## Depends on / used by
- uses: world/landscape (snapLandscape, landscapeNearIn, footwayAt), world/roads/derivedSigns, world/roads/furnitureCatalog, editor/snap ribbonsNear; used by: main.ts (the streetscape tool)

## Problems found (finding IDs)
- none raised: the row recompute is per drag move and bounded at 200 pieces (a long row drag does more work per move than needed; noted, not a measured problem)

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event : moves fire at a very high rate depending on the pointer and machine (lines 86-97: the row rebuilt per move)
- https://web.dev/articles/optimize-input-delay : do as little main-thread work as possible per interaction; debounce expensive handlers (the row recompute, lines 118-141)
