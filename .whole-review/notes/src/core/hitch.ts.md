# src/core/hitch.ts
Lines: 7
Summary: measureHitch: a `performance.measure` entry for the frame monitor and profiler, in a development build only.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-6 measureHitch(name, start, end): returns in production (import.meta.env.DEV false, tree-shaken); else a measure from start to end/now
- 7 end of file after the function's closing brace (blank)

## Contracts, state and data flow
- In a dev build every call adds a measure to the performance timeline, kept until cleared (User Timing has no limit). The game is played in dev (desktop:dev): measures accumulate for the whole session unless something clears them.

## Depends on / used by
- uses: performance; used by: renderer, uploads and others (hitch:* names), read by ui/healthWatch and core/profiler

## Problems found (finding IDs)
- none confirmed; see the check below

## To check in other files
- ui/healthWatch.ts and core/profiler.ts: do they clearMeasures/clearMarks after reading? (Otherwise the dev game's memory grows with every frame's measures.)

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure : measures stay in the timeline until clearMeasures; no buffer limit in the spec (line 5)
- https://vite.dev/guide/env-and-mode : DEV statically replaced, the branch tree-shaken in production (line 3)
- https://developer.mozilla.org/en-US/docs/Web/API/Performance/measure : (redone research) the page does not state a limit; User Timing entries persist until cleared: in a dev session (the owner's desktop dev run) every hitch measure stays for the session unless a reader clears them (to check in healthWatch / profiler)
