# src/editor/lotTool.ts
Lines: 1022
Summary: The zoning tool: lots drawn, edited and zoned by the player, the proposed street lots planned off the page, and the lot overlay (one group per lot within a window of 250 m cells round the ground the view sees, the proposal's lots, the gesture) handed to the scene by changed groups.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-30 imports; REFUSED_REACH 40 m, STROKE_STEP 2 m; ZoneMode, LotSplitKind
- 31-66 LotToolHost (doc, net, zoom, settings, mutate, hint, redraw, plan off the page); LotOverlay shapes; ZONE_COLOURS; PROPOSAL_CELL 50 m, ranks, NO_PROPOSAL, DRAG_REACH
- 67-113 the overlay's window: 250 m cells, drawn 100 m past the view, kept to 500 m, 2 ms a frame to fill; windowKey/windowCellRect; forWindowCells; cellRange/sameRange; forCellsOutside (only the strips a moved window gained); inRange
- 114-160 LotDecor; LotOverlayGroup; LotOverlayBook: groups by name, changed names kept for one reader (another reader gets everything)
- 162-215 LotTool state (hover, refused, polygon, cut line, curve, stroke, waiting stroke, proposal and its filing, corner, drawn, join, erase); anyZoned kept from the lots diary (every lot walked by columns only when the diary cannot say); holdOverlay
- 217-267 refusedNow: refused lots released only near the network's changed rects (by ids); gesture names; cancel; modeChanged
- 269-331 proposal key (network state + lots journal); advanceProposal (planned in the simulation worker, one ask per key, last plan shown meanwhile, rejection warned); takeWaiting; proposedAt (proposal filed once per plan in 50 m cells)
- 333-378 readPending; commitStroke (proposed lots laid and zoned in one undo step, the rest of the proposal kept); brushProposed; proposalReady
- 380-417 snapReach/snap/lotAt/lotsNear (by place); sideNear and sideAt (nearest side among lots near the point, inside preferred)
- 419-465 snapExcept; frontSideOf (nearest ribbon per side, longest near the street); landLot (onLand); streetAngleNear; eraseUnder (lot and buildings under a point by place)
- 467-549 adoptProposal (the proposal made real before editing modes); down: per mode (corner pick, front, split, polygon point/close, curve, join, add rectangle, delete stroke, brush stroke)
- 551-588 move: brush and erase strokes sampled every 2 m (at most 400 steps) by place; corner, drawn, cut, curve follow the pointer
- 590-666 up: stroke committed (or waits on the proposal), corner moved, cut line splits every crossed lot near it, curve, drawn lot added, erase removes lots and buildings in one step
- 668-684 overlay (called each frame the overlay shows): held while a city grows; the proposal advanced in the tool; refreshLots, refreshProposal, refreshGesture
- 686-713 window state: seen, windowCells, toFill/toLeave queues, ranges, drawnLots, cursors, painted, drawnCorner, lotsSeen
- 714-755 refreshLots: a full redraw on decor change or a diary it cannot read; else dirty lots from the lots diary, the buildings' change rects, hover/join, stroke, dragged corner; then moveWindow
- 756-785 moveWindow: the cells newly in range queued to fill, those past the kept range queued to leave, only on a range change
- 786-817 settleWindow: 2 ms a frame; leaving cells' drawn lots dropped; the WHOLE fill queue mapped to distances and sorted every frame while it is non-empty, then filled nearest first; redraw asked while queued
- 819-837 inWindow; drawAllLots (@rebuild: every lot group dropped, the window refilled over frames; every lot without a view)
- 839-882 drawLot: a group for a lot in the window; none for an unzoned or built lot outside the tool; outline, fill, front and arrow and corners in the tool
- 884-935 refreshProposal: on a new plan or look, groups by corner identity (unchanged ones kept); else only the lots hover/stroke touched
- 937-1004 refreshGesture: a key string built every call (settings, hover, zoom, lotsSeen, proposal key, gesture state); the gesture group rebuilt only when it changed; one snap per call
- 1006-1021 segmentCrossesLot: 21 samples, then the side crossings and midpoints

## Contracts, state and data flow
- overlay() runs each frame the zones show (the tool, or the faint zones with any other tool when anyZoned()). Outside the tool every zoned, unbuilt lot within the window gets a group; the window follows the ground the view sees, so from a far view of a 10 km city it covers the whole map.
- Each frame while cells wait: the fill queue is copied, mapped through windowCellRect, and sorted before 2 ms of filling.

## Depends on / used by
- uses: core/intersect, world/lots, world/lotStore, world/cells, world/derived JournalCursor, world/nearestRibbon, world/buildings geometry; used by: main.ts (zone tool and the overlay each frame), render/lotOverlay.ts (the groups)

## Problems found (finding IDs)
- F-0014 (suspected, S3): settleWindow sorts the whole pending fill queue every frame while it drains
- F-0015 (suspected, S3): refreshGesture builds a key string every frame the overlay is shown

## To check in other files
- render/lotOverlay.ts: what each group costs (geometry per lot), and main.ts: when overlay() is called outside the tool (the faint zones of a generated city where every lot is zoned).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/then : the plan's answer and its rejection handled by then's two callbacks (lines 293-302)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort : in place, cost implementation-defined (line 807, the queue sorted per frame)
- https://developer.mozilla.org/en-US/docs/Web/API/Performance/now : monotonic milliseconds, the 2 ms budget clock (lines 791-813)
- https://en.wikipedia.org/wiki/Binary_heap : (redone research) a heap keyed by distance gives the nearest cell in O(log n) per pop with no re-sort; the per-frame sort of the whole queue (F-0014) is O(n log n) each frame instead
- https://v8.dev/blog/trash-talk : (redone research) the gesture key string and the queue's mapped pairs are young garbage each frame (F-0014, F-0015): cheap per object, but every frame
