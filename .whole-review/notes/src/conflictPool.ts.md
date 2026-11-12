# src/conflictPool.ts
Lines: 281
Summary: The traffic's conflict pairs, junction turns, sweeps, finished pairs, whole builds' junctions and walkway corners measured on the job workers (up to four lanes), each ask split in contiguous shares with only the data its share reads.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-5 imports: job pool, conflict table types (FinishAsk, SweepSamples, TABLE_SIZE...), junction turns, walking lines, junction build
- 7-19 Lane (worker, waiting, watchdog timer), SILENCE_MS 10 s, MOST_LANES 4
- 21-33 ConflictPool: keepPrefix (tables kept for the next session), ports, lanes, broken, nextId
- 34-69 measure(pairs): per share, each distinct sweep listed once (frame arrays cloned), pair indices transferred; ask() posts and arms the watchdog
- 71-100 chooseTurns: per share, each distinct surface's rings once, turns as plain objects (cloned)
- 102-133 sampleSweeps: per share, distinct lines once (cloned), refs/c0/count transferred
- 135-162 finishPairs: distinct lines once (cloned), refs and the tables block transferred
- 164-200 buildJunctions and roundCorners: the share's asks cloned whole
- 202-208 arm: the silence warning timer restarted on every ask and every message (beats included); none while nothing waits
- 210-249 start: lanes opened lazily; onmessage resolves by id with whichever answer field came; errors fail the pool
- 251-280 fail/lanesLost/dispose/end: reject everything waiting, clear timers, terminate workers

## Contracts, state and data flow
- Answers keep the input order (Promise.all); a failed share rejects the whole call (the callers measure on the page then).
- Work is per road edit / network build, not per frame.

## Depends on / used by
- uses: src/jobs/jobPool.ts, world/conflictTable, world/junctionTurns, world/walkingLines, world/junctionBuild; served by conflictTable.worker.ts
- used by: the network's conflict and junction builds (world/network, sim topology), simHost with page ports

## Problems found (finding IDs)
- none

## To check in other files
- the callers: how many pairs a 10 km city's opening sends (is the whole map measured at the opening, or only the view's junctions?).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Window/setTimeout : returns an id; clearTimeout cancels a pending timer (lines 203-207 restart it per message)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/all : results in input order, the first rejection rejects the whole (lines 58, 99, 132, 161, 180, 199)
- https://surma.dev/things/is-postmessage-slow/ : (redone research) clone cost follows payload size; each share carries only the data it reads (the file's design), so the cost is per ask, not per map
- https://github.com/electron/electron/blob/5cd65025c0d1523d22d81c8001d615fd7007f824/docs/api/message-port-main.md : (redone research) in the desktop build the lanes reach utility processes: shares are copies there whatever is transferred
