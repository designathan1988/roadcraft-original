# src/editor/storeTurns.ts
Lines: 45
Summary: The save worker's turns: writes run at once; reads run one at a time, each begun in a task of its own (a MessageChannel message to itself) once no write is under way, so a write never waits behind queued synchronous reads.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-10 the contract; nextTask: a new MessageChannel per call, one message, the port closed on receipt
- 12-29 StoreTurns: writing count, waiting reads, the last read's promise; write (counted, waiting reads released when none is left)
- 31-44 read: chained after the previous read; yields a task, waits while a write runs, then runs

## Contracts, state and data flow
- One MessageChannel per read turn (closed after): a small allocation per read, not per frame.

## Depends on / used by
- uses: MessageChannel, promises; used by: save.worker (write), the tile store's reads (tileStore)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/MessageChannel : two connected ports, available in workers; a posted message is delivered as a task of the receiving port (lines 4-9)
- https://developer.chrome.com/blog/use-scheduler-yield : scheduler.yield resumes ahead of other queued tasks, Chromium-only (an alternative to line 35's yield, which instead lets queued writes in first: the intended order here)
