# src/conflictTable.worker.ts
Lines: 165
Summary: The conflict service of the job workers: answers 'turns', 'junctions', 'corners', 'finish', 'sweeps' and 'pairs' asks from conflictPool, beating every 500 ms; the pairs' tables are kept on disk for the next session before the answer goes back.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-10 imports: Polyline, conflict table work (PairWork, pairTable, finishPair, sampleSweep), turn choice, walking lines, junction build, keepDerivedMany, JobScope
- 12-66 the ask shapes: PairsAsk (sweeps, pair indices, keep prefix/keys), TurnsAsk, SweepsAsk, FinishAsk, JunctionsAsk, CornersAsk
- 68-77 BEAT_MS 500; the async onmessage; the beat closure per ask
- 78-89 turns: chooseTurnOf per turn with a per-ask surface cache; answer cloned
- 90-102 junctions: buildJunctionOf per ask with per-ask line/ring caches; connector path buffers transferred (deduplicated by a Set)
- 103-114 corners: roundCorners per node; each line's buffer transferred
- 115-126 finish: points of each centreline once, finishPair per pair on a subarray view of the tables block; answer cloned
- 127-142 sweeps: sampleSweep per ask with a per-ask line cache; each sweep's frame and frameLengthSq buffers transferred
- 143-157 pairs: samples with empty caches, one PairWork, pairTable per pair, tables' buffers transferred; when keep, keepDerivedMany awaited BEFORE the answer is posted
- 158-165 error logged and answered; end

## Contracts, state and data flow
- The handler is async: while it awaits the disk (line 156) the worker's next message may start (MDN async function: handlers interleave at awaits); each ask has its own locals, so no shared state races.
- The page waits for the disk write of the kept tables before it gets its pairs (line 156): the traffic's conflicts of a road build arrive only after IndexedDB committed.

## Depends on / used by
- uses: world/conflictTable, world/turnChoice, world/walkingLines, world/junctionBuild, render/derivedCache
- used by: src/conflictPool.ts through the job pool

## Problems found (finding IDs)
- F-0001 (suspected): the pairs answer waits for the disk write (line 156)

## To check in other files
- world/conflictTable sampleSweep: are frame and frameLengthSq separate buffers (line 137 would throw DataCloneError on a shared one)?
- world/conflictTable pairTable: can two pairs return the same table (line 152 duplicate buffer)?
- render/derivedCache keepDerivedMany: how long the awaited write takes (transaction commit) and whether it copies the tables.

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/subarray : a view on the same buffer, no copy (line 121)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function : the handler suspends at await and later events run meanwhile (line 71, 156)
- https://developer.chrome.com/blog/indexeddb-durability-mode-now-defaults-to-relaxed : (redone research) a relaxed commit returns once the OS has the data; F-0001's wait at line 156 is the database open plus issuing the puts and cloning the values (IDBObjectStore.put clones), not a disk flush: still a wait the answer does not need
