# src/editor/offPageNetwork.ts
Lines: 59
Summary: The network's jobs asked of the job pool: a legacy map's repairs over the whole serialized document (networkBake), a tile's junctions and ribbons as the view reaches it (roadBake), and the tiles a map opens with round its centre.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-11 imports; the contract (answers matched by the queue's seq); UNNUMBERED
- 13-30 mapRepairsOffPage: none without a queue; one networkBake job with the WHOLE SerializedDoc as its data (no transfer), crosses to a desktop job process; failures said and answered empty
- 32-43 roadBakeSource: each tile asked as a roadBake job (no key, at the tile's place, crosses); failure warned and solved on the page
- 45-58 LARGE_OPENING_REACH 1,020 m, OPENING_REACH 2,500 m; openingTilesOf: the roads' extent, the square round the centre clipped to it, tilesMeeting

## Contracts, state and data flow
- The repairs job copies the whole map document by structured clone into the job process (only for a map that is not a generated city: history.ts restoreInto skips repairs for those).
- Road tiles are solved off the page one job each; the reply's bake object is cloned back.

## Depends on / used by
- uses: jobs/jobPool submitJob/canQueueJobs, world/networkWindow tilesMeeting, workers networkBake/roadBake types; used by: main.ts (opening a map), world/network window (roadBakeSource)

## Problems found (finding IDs)
- none here (the whole-document copy is a legacy map's once-per-opening job)

## To check in other files
- jobs/jobPool: how many job processes exist and what each keeps between jobs (the six 0.6-1.3 GB utility processes seen).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm : the whole graph copied recursively (line 21: the document sent whole)
- https://www.electronjs.org/docs/latest/api/utility-process : postMessage to a utility process, ports transferable (line 20: jobs that cross to a desktop process)
- https://surma.dev/things/is-postmessage-slow/ : (redone research) clone time tracks the JSON size of the payload past ~100 KiB: the legacy repair job's whole document (line 21) costs in proportion to the map, once per opening
