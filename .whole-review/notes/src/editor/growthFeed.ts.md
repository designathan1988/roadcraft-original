# src/editor/growthFeed.ts
Lines: 354
Summary: The page's side of the city's growth: picks the next lot, sends the growth worker only what it reads round the lot (buildings as shared-table row refs, roads and junction kerb rings, the region's ground and paving) and keeps the worker's replica in step from the buildings' diary and the network's changes; writes the buildings that come back after checking them again when the document moved.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-22 imports; grow(rect, pad); the module's contract: one lot at a time, the replica fed incrementally, never the whole document
- 24-58 GrowthHost, GrowthLane (post with a transfer list), GrowthOutcome; REGION_HALF 160, READ_PAD 48, MOVES, MISS_MARGIN 32, MOST_MISSES 4, MOST_REFUSALS 3
- 60-101 Asked; GrowthSession state: sent/stale building ids, sent/stale roads and kerbs, cursors (buildings diary, network state, change journal), refusals; busy
- 103-126 ask: changes read at every ask (an unread cursor would pin the diary), pickLot, send; restart after a worker failure resends everything lazily
- 128-191 receive: stale answers dropped; moved = journal entries or network state changed; each grown building written in order if its lot is still open and (when moved) it validates; refusals counted; a miss re-asks the same lot with a wider margin, set aside after 4
- 193-224 lotOpen; readChanges (changed buildings and roads that the worker holds marked stale; everything reset when the diary cannot say); forgetRoads
- 226-274 send: region rect round the lot, read pads; the open region lots sorted by lot order; sync of buildings and roads; the paving packed and transferred, or the street points sampled on the page; the ground patch sampled; posted
- 276-297 syncBuildings: stale ones resent or dropped; those near the read rects not yet held added as refs
- 299-333 syncRoads: the same for segments and junctions by the network's cell indexes
- 335-353 roadPiece (ribbon xy shared, not copied here) and junctionPiece (kerb ring flattened to a Float64Array)

## Contracts, state and data flow
- Per ask: work proportional to the region round one lot (lots in a 320 m square, buildings and roads near it) plus what changed since; the worker's replica grows with the area grown (ids in sentBuildings/sentRoads, one entry per item held).
- The ground patch and the paved points go in the message without a transfer list (structured clone copies them; they are small, one region's samples).

## Depends on / used by
- uses: world/derived JournalCursor, world/groundPatch, world/buildings store/recordTable/validate, world/growth/zoning (pickLot, commitGrown), world/network cell indexes, editor/growthReplica types; used by: editor growth pool/driver (growthPool.ts), specs

## Problems found (finding IDs)
- none (incremental by design; the copies of small per-region arrays are bounded)

## To check in other files
- growthReplica (worker side): what it keeps per building ref and per road piece, so the replica's memory for a 10 km city is bounded.

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects : buffers in the transfer list move, others are copied by structured clone (lines 38, 254-273)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set : insertion order, sublinear has/add (lines 79-87, 206-212, 282-330)
- https://surma.dev/things/is-postmessage-slow/ : (redone research) sending patches instead of the whole state keeps each message proportional to the change: this file's sync (refs, stale items only) is that design; per ask the region's ground patch and paved points are small clones
