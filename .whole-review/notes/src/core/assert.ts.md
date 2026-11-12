# src/core/assert.ts
Lines: 32
Summary: The session's problem log: `ensure(condition, message)` returns the condition and reports a failure once per distinct message (console and a reporter).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-3 doc comment: runtime checks the game survives, kept in the product
- 4-12 ProblemLog: `told` Set of messages said, a reporter (no-op until set), setReporter
- 14-28 ensure: true when the condition holds; otherwise the message said once (console.error + reporter, a failing reporter caught and said)
- 30-32 the one shared `problems` log

## Contracts, state and data flow
- `told` keeps every distinct message for the session: a message built with changing values (ids, coordinates) would add an entry per failure; bounded only by the callers' messages.

## Depends on / used by
- uses: nothing; used by: the game's ensure calls (main.ts sets the reporter)

## Problems found (finding IDs)
- none

## To check in other files
- callers of problems.ensure: do any build messages with per-instance values inside a frame loop (unbounded Set growth)?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set : entries stay until deleted; has is sublinear (line 6, 17-18)
- https://developer.mozilla.org/en-US/docs/Web/API/console/error_static : logs at error level, returns undefined (lines 19, 24)
- https://bugzilla.mozilla.org/show_bug.cgi?id=1717362 : (redone research) Firefox's console storage keeps logged objects alive for the page's life (the Chromium side was not confirmed: https://developer.chrome.com/docs/devtools/console/reference says nothing on retention); here only strings are logged once per message, so no object is retained
