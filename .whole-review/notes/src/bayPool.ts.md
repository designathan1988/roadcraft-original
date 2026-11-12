# src/bayPool.ts
Lines: 125
Summary: The lots' parking bays worked out on job workers (`bays.worker.ts`): asks split in contiguous shares, one per lane, answers joined in order.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-4 imports: jobLanes/jobPort/portWorker (job pool), Bay, LotAsk/shareOf, BayWorkers
- 6-20 Lane (worker, waiting map id->resolve/reject, heard, told), SILENCE_MS 10 s, MOST_LANES 4
- 22-30 BayPool: optional ports (the simulation's thread gets the page's lanes), lanes, broken, nextId, turn
- 32-50 work(asks): splits asks in ceil(n/lanes) shares, shareOf copies each share's lanes and walls once, postMessage {id, share} (structured clone), Promise.all flattens
- 52-59 check(now): warns once per silence stretch when a lane with jobs waiting has been quiet over 10 s
- 61-95 start(): lazily opens lanes (ports or jobPort('bays')), onmessage resolves by id (beats only refresh `heard`), onerror/onmessageerror fail the pool; a throw terminates lanes made so far
- 97-108 fail/lanesLost: once; rejects everything waiting
- 110-124 dispose/end: reject waiting, terminate workers

## Contracts, state and data flow
- Answers resolve in ask order through Promise.all; a share is cloned on the way (structured clone), so its size is the cost of a call.
- Work happens only when lots ask bays (growth/edits), not per frame.

## Depends on / used by
- uses: src/jobs/jobPool.ts, src/sim/agents/lotBays.ts (shareOf), bays.worker.ts
- used by: the simulation's parking (sim/agents/parking.ts BayWorkers), simHost with page ports

## Problems found (finding IDs)
- none

## To check in other files
- src/sim/agents/lotBays.ts shareOf: how much each share copies.

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Worker/postMessage : the message is structured-cloned unless transferred (line 45 clones each share)
- https://developer.mozilla.org/en-US/docs/Web/API/Worker/terminate : stops the worker at once, pending work dropped (lines 90, 120)
- https://surma.dev/things/is-postmessage-slow/ : (redone research) a clone over ~100 KiB costs with its size: each share of lots cloned per lane (line 45) is proportional to the lots asked, not the map
