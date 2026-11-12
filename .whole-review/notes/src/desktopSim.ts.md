# src/desktopSim.ts
Lines: 34
Summary: On the desktop, the simulation's worker is a thread of a utility process (its own V8 heap), reached over a port the shell hands in order; a lost process fails the worker.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-9 import; doc comment; SimBridge; message names
- 11-24 desktopSimWorker: null without the bridge; ports handed in order; a lost process fails every living worker
- 25-34 the maker: a ProcessWorker over a port asked from the shell (added to `living`, never removed)

## Contracts, state and data flow
- The simulation holds its own copy of the city's lane graph, walkways and network in its process (its heap counts in the game's RAM).

## Depends on / used by
- uses: jobs/processWorker; used by: sim/host/simClient (useWorkerMaker), main.ts

## Problems found (finding IDs)
- none

## To check in other files
- sim/host: what the simulation keeps for a 10 km city (graphs of the whole map, copied from the page).

## Sources
- https://www.electronjs.org/docs/latest/api/message-channel-main : a pair of connected ports, one transferred to the other process (lines 3, 19-30)
- https://v8.dev/blog/pointer-compression : each heap is held to a 4 GB range under pointer compression (line 3's "a V8 cage of its own")
- https://chromium.googlesource.com/chromium/src/+/main/docs/process_model_and_site_isolation.md : (redone research) a process per heap costs memory of its own; the simulation's own process is chosen for the 4 GB cage, its baseline is the price
