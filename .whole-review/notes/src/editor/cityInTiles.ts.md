# src/editor\cityInTiles.ts
Lines: 56
Summary: A new city made on many job workers: laid out by one (cityGen 'layout'), its tiles' lots grown four phases one after another (each tile given its already-grown neighbours' edge buffers), then the tiles' tables joined by one 'assemble' job.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-13 imports and the doc comment (a 10 km city's 249,000 buildings once took four minutes on one worker)
- 15-28 job(): one pool job whose ask is posted with an EMPTY transfer list (everything cloned); UNNUMBERED
- 30-49 growCityInTiles: layout; per phase the tiles grown in parallel, each ask carrying copies of its neighbours' edge buffers
- 50-56 assemble: the ask carries EVERY grown tile (all the city's building tables) cloned to the assembling worker; the reply

## Contracts, state and data flow
- The page receives each tile's tables transferred (cityGrowth.worker moves them), keeps them in `grown`, then posts them all again with transfer [] to the assembler: the whole city's tables structured-cloned once more (MDN: ArrayBuffers not in a transfer list are copied) and held twice meanwhile.

## Depends on / used by
- uses: jobs/jobPool submitJob, cityGen.worker, cityGrowth.worker, editor/cityTiles; used by: main.ts cityJob (a new large city)

## Problems found (finding IDs)
- F-0012 (suspected, S3): the assemble job clones every tile's tables instead of transferring them

## To check in other files
- editor/cityTiles.ts: are TileGrown buffers plain ArrayBuffers (copied) or shared?
- jobs/jobPool submitJob: does `write` support a transfer list here (it does: { data, transfer }).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Structured_clone_algorithm : ArrayBuffers are copied by structured clone (lines 20, 41, 50)
- https://en.wikipedia.org/wiki/Checkerboard : alternating colouring by parity, so same-colour squares never share an edge (line 36's phases; kept: it decides the phase order, not performance)
- https://developer.chrome.com/blog/transferable-objects-lightning-fast : a 32 MB ArrayBuffer round trip took ~302 ms cloned vs ~6.6 ms transferred (redone research: the cost of line 20's empty transfer list, ~10 ms per MB of tables each way, in a renderer worker)
- https://surma.dev/things/is-postmessage-slow/ : clone cost tracks the payload's size past ~100 KiB; ArrayBuffer transfer is size-independent (line 50: every grown tile's tables in one ask)
- https://github.com/electron/electron/blob/5cd65025c0d1523d22d81c8001d615fd7007f824/docs/api/message-port-main.md : MessagePortMain's transfer list takes ports only; in the desktop build a job that crosses to a utility process carries its buffers as copies whatever the transfer list says (to confirm in jobs/jobPool and desktop/jobs.cjs)
