# src/editor/squaresRead.worker.ts
Lines: 33
Summary: The job-system service that decodes a saved map's squares off the page (decodeSquares) and posts the session back: plain table buffers, orders, wear fields and upgraded frames transferred; shared tables shared; the document's records (roads, lists such as trees, items not in tables) structured-cloned.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-8 imports; the contract; SquaresReadAsk, SquaresReadReply
- 10-26 serve: decode; the transfer list (plain table buffers, order arrays, fields, upgraded frames); the reply posted
- 27-32 a failure logged and answered with its stack

## Contracts, state and data flow
- The tables are moved (plain) or shared (SharedArrayBuffer when the page is cross-origin isolated); the `document` part (every node, segment, list item such as trees, and records of kinds not in tables) is cloned to the page at a cost following its JSON size.
- If this service runs in a desktop utility process, nothing is transferred or shared across the process boundary (MessagePortMain moves ports only): the whole session, tables included, is copied into the page.

## Depends on / used by
- uses: editor/squaresDecode, world/buildings/tableRows (baseBuffers, baseOrder), jobs/jobScope; used by: chunkedSave readSquares via the job pool

## Problems found (finding IDs)
- none here (F-0021 is upstream in squaresDecode)

## To check in other files
- jobs/jobPool / desktop: is the squaresRead service a page worker or a utility-process thread (decides whether the 10 km city's tables cross as copies)?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Window/crossOriginIsolated : SharedArrayBuffer only in a cross-origin isolated document (COOP same-origin + COEP), else a plain ArrayBuffer (line 18 tests which it got)
- https://surma.dev/things/is-postmessage-slow/ : clone time roughly proportional to the JSON size of the payload (line 26: the document part is cloned)
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects : listed buffers move, the rest is copied (lines 15-26)
