# src/bays.worker.ts
Lines: 25
Summary: The bays service of the job workers: answers a share of lots with baysOfShare, beating every 500 ms while it works.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-2 imports: BayShare/baysOfShare (sim/agents/lotBays), JobScope
- 4-8 serve(self): BEAT_MS 500
- 9-15 onmessage: per ask, a beat closure posting {id, beat} at most every 500 ms
- 16-23 posts {id, bays} (structured clone of Bay[][]) or {id, error} after logging
- 24-25 closing braces of the handler and of serve

## Contracts, state and data flow
- One answer per ask; the bays go back cloned, not transferred (objects, not buffers).

## Depends on / used by
- uses: src/sim/agents/lotBays.ts; used by: src/bayPool.ts through the job pool (`job.worker.ts`)

## Problems found (finding IDs)
- none

## To check in other files
- src/sim/agents/lotBays.ts baysOfShare and the Bay shape (size of the clone back).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Performance/now : available in workers, measured from the worker's start (lines 11-14)
- https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/postMessage : the answer is structured-cloned unless transferred (lines 14, 17, 21)
- https://surma.dev/things/is-postmessage-slow/ : (redone research) under ~10 KiB a message is safe within a frame; the 500 ms beats are tiny, the answer's size follows its share
