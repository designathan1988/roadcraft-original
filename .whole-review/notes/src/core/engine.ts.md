# src/core/engine.ts
Lines: 138
Summary: The products engine: registered products refreshed per phase ('frame', 'draw', 'step') in dependency order, each refresh timed and counted in a ledger; a watched stamp tells when a product computed with no input moved ("idle").

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-21 doc comment; EngineInput (static epoch, serial, touch): a class NOT exported and never constructed in this file
- 23-48 Product {name, after, refresh(): keys}; ProductWork ledger entry; Phase
- 50-69 Engine fields: products, stamp source, stampAt per phase, onRefresh hook, phaseOf, orders cache, ledger, lastBusy
- 71-90 register (once, unique name, order cache cleared) and unregister
- 92-114 refresh(phase): order cached (topological, filtered by phase); stamp read (+ EngineInput.epoch); `still` when it equals the phase's last; EVERY product's refresh() called anyway, two performance.now() reads and the ledger written per product, onRefresh told
- 116-119 idle(phase): the names that computed last time
- 121-138 sorted: depth-first topological order (a cycle throws), `this.products.includes` per dependency (linear)

## Contracts, state and data flow
- With `still` known (no input moved), every product is still refreshed each frame: the work skipped only inside each product's refresh. Its per-frame cost is O(products) calls plus 2 timer reads each, whatever happened.
- EngineInput.epoch is never moved unless something outside constructs EngineInput, and it is not exported: dead code.

## Depends on / used by
- uses: nothing; used by: main.ts / renderer (the derived products of the document)

## Problems found (finding IDs)
- F-0005 (suspected, S3): products refreshed every frame even when the stamp says nothing moved
- F-0006 (suspected, S4): EngineInput is dead code

## To check in other files
- who calls engine.watch and refresh: is the stamp complete (every input of every product), so a still stamp could skip the phase?
- each product's refresh: does it return at once when nothing changed?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Performance/now : a monotonic ms clock, coarsened 5-100 us (lines 101-103, two reads per product per refresh)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes : searched front to back (lines 73, 130)
- https://web.dev/articles/rail : (redone research) about 10 ms of work per animation frame: every product refreshed each frame whether or not its inputs moved (F-0005) spends that budget on nothing in a still view
