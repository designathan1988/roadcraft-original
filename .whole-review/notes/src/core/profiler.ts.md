# src/core/profiler.ts
Lines: 285
Summary: The surgical profiler: per-frame counts of disposals, builds and uploads with their call sites (stack traces), engine products' timings, diary changes, heap readings, long tasks and frame steps, rolled into a one-second window for the HUD. Its comment says it is closed by default, but `on` starts TRUE.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-24 ProfiledEvent; Tally (frame/window/total counts and bytes, sites, last call)
- 26-55 SITES_EXACT 48, SITE_STRIDE 16, WINDOW_MS 1000, STACK_LINES 6, NOT_CALLER regex; stackHere (new Error().stack with 14 frames), shortLine (regex), callerLines (split, filter, map)
- 57-72 ProductTiming, ChangeSeen
- 74-121 Profiler: `private on = true` (line 75), enabled getter/setter telling toggles; onToggle calls the toggle at once with `on`; tallies, frame/window counters, frameMs list, products, idleProducts (grows by name), changes window, heap readings, long tasks, steps window
- 122-138 step (per frame system and hitch); gauges; tally lookup/creation
- 140-155 count: per event; for the first 48 calls of a frame and every 16th after, a full stack captured, formatted, split and regex-parsed, and a joined string kept
- 157-183 change (a string key per change), product (Map set per product per refresh), longTask, heap
- 185-228 beginFrame/endFrame: per frame push of the frame time and tally roll; every second sorted copies of frame times, sites, changes and steps, the view rebuilt
- 230-256 view(): plain data for the HUD
- 258-285 ProfilerView; round; the one `profiler`

## Contracts, state and data flow
- With `on = true` from the start, every count() in the game (every geometry built, buffer and texture uploaded, anything disposed) captures and parses a stack trace for up to 48 calls a frame plus 1 in 16 after; engine products and changes build strings and map entries every refresh; observers registered through onToggle are switched on at once.
- The comment at 77 ("closed, the default, every method returns at once") contradicts line 75.

## Depends on / used by
- uses: performance, Error stacks; used by: main.ts (HUD, observers via onToggle), engine.onRefresh, uploads/three hooks (count)

## Problems found (finding IDs)
- F-0010 (suspected, S2): the profiler records by default (stack traces on every build/upload/dispose, observers on)

## To check in other files
- main.ts: is profiler.enabled set false at start (only the HUD should turn it on)? What do its onToggle observers do (PerformanceObserver long tasks, heap polling)?
- who calls profiler.count (three patches in render/uploads?) and how often per frame.

## Sources
- https://v8.dev/docs/stack-trace-api : frames collected at creation (stackTraceLimit), formatted on first access of .stack (lines 37-43)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Error/stack : non-standard; populated when the Error is created (line 40)
- https://v8.dev/docs/stack-trace-api : (redone research, read again for F-0010) frames are collected at creation and formatted only when .stack is read, "for efficiency"; stackHere reads .stack at once and regex-parses it, so every counted event pays both capture and formatting, the expensive path the docs avoid
