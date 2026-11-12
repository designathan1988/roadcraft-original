# src/editor/save.worker.ts
Lines: 24
Summary: The autosave's writer, a job-system service: each batch of changed binary frames (transferred from the page) compressed and written to IndexedDB one after another, answered by id; failures logged and answered false.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-9 imports (JobScope, saveStore writeBatch, StoreTurns, workerParts); the contract; SaveMessage
- 11-23 serve: the worker's part store; writes serialised by StoreTurns; each message written and answered

## Contracts, state and data flow
- Runs in a job worker (or a desktop job process); holds only the part store handle between batches.

## Depends on / used by
- uses: editor/saveStore writeBatch, editor/storeTurns, editor/workerParts, jobs/jobScope; used by: jobs/job.worker (the 'save' service), persistence defaultParts (portWriter)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/message_event : the worker's onmessage gets MessageEvent.data (lines 16-17)
- https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API/Using_IndexedDB : IndexedDB in workers; one readwrite transaction per store at a time (lines 14-15)
- https://developer.chrome.com/blog/indexeddb-durability-mode-now-defaults-to-relaxed : (redone research) relaxed writes complete once the OS has them (3x-30x faster than strict); the writer's durability is set in saveStore (to check there)
