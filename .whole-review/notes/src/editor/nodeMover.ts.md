# src/editor/nodeMover.ts
Lines: 121
Summary: Dragging a road node: the node follows the pointer live in the document, the network preview rebuilt no sooner than its own last cost allows; on release the node goes back and the move is replayed as one checked edit (moveNodeChecked) carrying the street kit.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-20 imports; NodeMoverHost (doc, net, settleTopology, mutate, hint, redraw)
- 22-39 PREVIEW_MIN_MS 50; NodeMover state (node, origin, incident curves); dragging; gesture
- 41-61 grab (the incident segments' curves kept); move (doc.moveNode, redraw)
- 63-68 previewDue: a rebuild at most every max(50 ms, 1.6 x the last rebuild's cost)
- 70-109 cancel (put back, topology settled); drop: put back, then (if moved and committed) carryStreetKit around moveNodeChecked in one undo step; refusal hinted
- 111-120 putBack: node and curves restored; the network rebuilt when its revision differs

## Contracts, state and data flow
- During a drag each pointer move writes the document; the network preview rebuild is throttled by its own cost (caller-driven); drop rebuilds twice (putBack, then the checked move's fork/rebuild in commit.ts).

## Depends on / used by
- uses: world/doc moveNode/setSegmentCurve, world/network rebuild, editor/commit moveNodeChecked, editor/roads/streetKit; used by: main.ts (the move tool's node drag)

## Problems found (finding IDs)
- none here (the rebuild's cost is world/network's, checked there)

## To check in other files
- world/network rebuild: whether a rebuild after one node's move is incremental (the preview runs it every 50 ms+ while dragging).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event : fires at a high, machine-dependent rate, may be coalesced (lines 55-61, the preview throttled apart)
- https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame : frame rate follows the display, timing by elapsed time (lines 63-68, a time-based throttle)
- https://web.dev/articles/rail : (redone research) the preview rebuild waits 1.6x its own cost, so rebuilding takes at most ~60% of the drag's time; if a rebuild is whole-map, the drag still spends most frames on it (world/network to check)
