# src/core/workerLike.ts
Lines: 9
Summary: WorkerLike: the shape of a worker its owner uses (a page Worker, or a worker in another process over a port).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-8 WorkerLike: onmessage, onerror, onmessageerror, postMessage(message, transfer), terminate
- 9 end of file after the interface (blank)

## Contracts, state and data flow
- A type only.

## Depends on / used by
- uses: nothing; used by: jobs/processWorker.ts, jobPool, simulation client

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Worker/messageerror_event : fired when a message cannot be deserialised (line 5)
- https://developer.mozilla.org/en-US/docs/Web/API/MessagePort : onmessage implies start() on a port (lines 3, 6)
- https://github.com/electron/electron/blob/5cd65025c0d1523d22d81c8001d615fd7007f824/docs/api/message-port-main.md : (redone research) one shape for a page worker and a process port hides that the second copies every buffer (transfer lists take ports only)
