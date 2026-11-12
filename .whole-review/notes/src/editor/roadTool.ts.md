# src/editor/roadTool.ts
Lines: 597
Summary: The road tool: drags, chains and curves drawn, snapped to roads and the grid, at a chosen height; the draft judged by a dry run 120 ms after it rests (verdict, cost, stations) and judged again whenever the map near it (or the balance) changes; the road laid in one undo step with its profile/width, cut walls, furniture, power line and name.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-41 imports; VERDICT_DELAY 120 ms; RefusalReason, REFUSALS, isRefusal
- 42-100 RoadDraft, CurvePending, RoadToolHost (settings, setHeight, worldAtScreen, naturalHeightAt, offerElevation, groundSolve, flash, undoGroup, mutate, hint, redraw)
- 101-176 RoadTool state (draft, chain, chain preview, curve pending, pointer, shift, heightEdited, settling); gesture/bending/inProgress/cancel/dropCurve/reset/heightChosen/pointerAt; anchorHeight/atHeight
- 177-195 bend: the pending curve laid with its control at the press
- 196-237 down: grid step set; the start snapped (on a road with the grid, the nearest grid point on it among 9); the start height; the draft
- 238-271 move (curve control, or the draft's snap and a sample) and hover (the chain preview: one snap per move)
- 272-304 up: a click starts a chain; a chained curve waits for its bend; a drag long enough is committed
- 305-344 stepHeight: whole metres; the stroke carried so the pointer stays on the same screen point; the chain preview and pending curve follow
- 345-353 ending: the end anchor, its height, the pieces
- 354-387 verdict: a new key resets the judgement and sets judgeAt; judged once rested (frames asked meanwhile); stations and cost read through verdict
- 388-400 draftKey: an array of the draft's numbers and mapAround, compared element by element to reuse the last key
- 401-417 mapAround: the diary read each call; a serial moved by an entry meeting the draft's box + 80 m, by any entry without rects, or by ANY economy entry (F-0019); the draft's samples copied into a temp array to box them
- 418-431 judge: commitRoadPath as a dry run (fork, pieces, rules, economy, stations) with the game's ground solve
- 432-514 commit/layPart: commitRoadPath in one undo step (grouped for long roads); the elevation offered; profile or width applied and paid (reverted when unaffordable); cut walls; furniture, power lines and street names; hints; the chain ended and the height kept
- 515-531 preview: the pending curve, the draft or chain preview, or the settling road
- 532-569 pieces (free path via roadPathFromGesture + fitRoadCurve, or one straight/curved piece); curveOf (control point, or the drag's farthest offset x1.36, clamped)
- 570-581 landscapeAlong: items near the laid ribbons, deduplicated and sorted
- 582-596 DraftKey; pushSample (dense to 256, then one a metre or a height change, at most 4096)

## Contracts, state and data flow
- The dry run is the whole road commit on a fork (commit.ts) plus the edit rules (editRules.ts, F-0013) and two roadValue sums: run once per resting draft, and again each time mapAround moves its serial.
- verdict() is called every frame the tool's preview shows; draftKey builds a key array each call (small).

## Depends on / used by
- uses: editor/snap, editor/commit commitRoadPath, editor/roadPath, roads/economy, roads/profile, roads/powerLine, world/roads furniture and names, world/grid, world/derived JournalCursor, world/changes DOC_CHANGE_KINDS; used by: main.ts (the road tool's input and preview each frame), ui road panel (cost)

## Problems found (finding IDs)
- F-0019 (suspected, S3): any economy entry of the diary re-runs the draft's whole dry run while a draft rests

## To check in other files
- world/economy and the simulation: how often the balance is written to the diary while the clock runs (each such entry re-judges the draft).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is : SameValue equality of the key's parts (line 396)
- https://developer.mozilla.org/en-US/docs/Web/API/Performance/now : the rest timer of the verdict (lines 361-366)
- https://en.wikipedia.org/wiki/Incremental_computing : (redone research) recompute only what depends on what changed: the dry run depends on the balance only through affordability, so re-judging on every economy entry (F-0019, line 412) recomputes work its result does not depend on
- https://web.dev/articles/rail : (redone research) each re-judge is a full commit dry run on the page while the player holds the tool: repeated at the balance's write rate it takes frame time with nothing changed near the draft
