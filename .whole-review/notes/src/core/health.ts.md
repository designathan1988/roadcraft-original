# src/core/health.ts
Lines: 217
Summary: The game's health log (a ring of 256 problems, repeats counted) and the per-frame system timer (each frame's milliseconds per system, kept 30 s or 4096 frames), with percentile statistics.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-32 HealthKind, HealthSeverity, HealthEntry (serial, kind, severity, message, detail, context, systems, ms, times, count, earlier)
- 34-53 KEPT 256, REPEAT_WINDOW_MS 10 s; HealthLog ring, version, changes counter
- 55-81 record: a repeat of the same kind and message among the last 16 within 10 s is counted (entry copied); else a new entry
- 83-120 latest(n), status(window) (walks up to 256 entries), toJSON (last 50), restore (earlier session's entries marked)
- 122-141 LONG_FRAME_MS 50; FrameSystem names; systemKey; FrameRecord; FRAMES_KEPT_MS 30 s, FRAMES_KEPT_MAX 4096
- 143-179 FrameTimer: begin() makes a NEW Map every frame; mark adds a system's lap; end() pushes a record and trims the front with Array.shift() (each shift moves every kept frame: ~1,800 at 60 Hz); between() filters all kept frames; recent()
- 181-217 percentile (sorted copy), frameStats (per system spread), systemsOf (sums)

## Contracts, state and data flow
- Per frame (when the timer runs): one Map, one record object, one shift of an array of ~1,800 entries; 30 s of Maps retained.
- status() walks up to 256 entries (caller frequency to check).

## Depends on / used by
- uses: nothing; used by: main.ts frame loop (FrameTimer), ui/healthWatch, the health panel

## Problems found (finding IDs)
- F-0008 (suspected, S3): the frame timer allocates a Map per frame and shifts its whole array every frame

## To check in other files
- main.ts: is FrameTimer begun/ended every frame in the shipped game? How often is status() called?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift : shifts every remaining value left by one (line 166)
- https://developer.mozilla.org/en-US/docs/Web/API/Performance_API/Long_animation_frame_timing : a long animation frame is over 50 ms (line 123)
- https://codereview.chromium.org/2874453002 : V8 moves elements only for small arrays on shift; larger ones are left-trimmed (the backing store's start moved, no copy), so line 166 is not an O(history) copy per frame (redone research: corrects the Structure line 143-179 claim)
- https://v8.dev/blog/trash-talk : the scavenger's cost is proportional to surviving objects; objects that survive two scavenges are promoted to the old generation (the per-frame Map and record live 30 s: all of them promoted, collected only by major GCs)
