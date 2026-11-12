# src/desktopJobs.ts
Lines: 55
Summary: On the desktop shell, the long-running job workers are threads of utility processes (desktop/jobs.cjs): each new long worker asks the shell for a port and wraps it in a ProcessWorker; a lost process fails its workers; desktopJobThreads reads how many job threads the shell runs.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-12 imports; JobsBridge, PortMessage, LostMessage and their guards
- 14-31 desktopJobWorkers: null without the bridge; ports handed in order to the askers; `living` sets of workers by process; a lost process fails each of its workers
- 32-46 the maker: short workers stay the page's; a long worker is a ProcessWorker over a port asked from the shell (connectJobs), added to its process's set (never removed when a worker ends normally)
- 48-55 desktopJobThreads: the shell's JOB_THREADS (cores less the page's and the simulation's, within memory)

## Contracts, state and data flow
- The number of job threads, and so of job heaps, is the shell's choice (desktop/main.cjs, outside this review's scope): the 2026-10-28 window showed six utility processes of 0.6-1.3 GB each.

## Depends on / used by
- uses: jobs/processWorker, world/buildings/recordTable; used by: jobs/jobPool (setJobWorkerMaker), main.ts

## Problems found (finding IDs)
- none confirmed here

## To check in other files
- desktop/main.cjs (outside src): JOB_THREADS and THREADS_PER_PROCESS: how many processes and threads for a mid-range PC, and what each thread loads (each a heap with its own copies of kits/tables).
- jobs/jobPool.ts: what each long worker keeps resident (caches) - the job processes' RAM.

## Sources
- https://www.electronjs.org/docs/latest/api/utility-process : utilityProcess.fork starts a Node child process; ports passed with MessageChannelMain (lines 4, 14-46)
- https://developer.mozilla.org/en-US/docs/Web/API/Window/postMessage : ports transferred and read from event.ports (lines 22-24)
- https://chromium.googlesource.com/chromium/src/+/main/docs/process_model_and_site_isolation.md : (redone research) each process adds memory overhead; the job workers here are threads of utility processes, each process its own heap: the six 0.6-1.3 GB processes seen are this design's cost
- https://www.electronjs.org/docs/latest/tutorial/performance : (redone research) a dedicated process is the last resort for heavy work; worker threads first
- https://github.com/electron/electron/blob/5cd65025c0d1523d22d81c8001d615fd7007f824/docs/api/message-port-main.md : (redone research) MessagePortMain transfers ports only: every buffer a crossing job carries is copied into the process
