# src/core/gameState.ts
Lines: 147
Summary: The game's state (what the player has in hand, how the game runs): typed values with a ring of the last 512 changes; watchers told the changes of their keys once per flush (a microtask after a set, and each frame).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-24 StateChange (serial, key, from, to, cause, at); KEPT 512; Watcher (keys, seen, fn)
- 26-50 GameState fields: current values, serial, ring, count, watchers, flags; values/get
- 52-62 set: Object.is unchanged -> false; else the value, a change object in the ring, schedule
- 64-73 schedule: one microtask flush, and wake for a frame
- 75-83 watch: a watcher with its key set; the returned unsubscribe splices it out
- 85-109 flush: returns at once when nothing new (called every frame); each behind watcher gets its keys' changes (null if forgotten); a throwing watcher's error rethrown in a microtask
- 111-120 between: the ring walked from since+1 to upTo, filtered by keys
- 122-147 version, since, latest(n), snapshot (a copy)

## Contracts, state and data flow
- One small object per change; flush per frame is O(1) when nothing changed.

## Depends on / used by
- uses: nothing; used by: main.ts and the UI (tool, sky, speed, layers...)

## Problems found (finding IDs)
- none

## To check in other files
- callers that `set` per frame with changing values (each a change object and a flush walking every watcher).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Window/queueMicrotask : runs after the current task, before control returns to the event loop and before rendering (lines 68-71, 101)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/is : same reference for objects, NaN equals NaN (line 55)
- https://v8.dev/blog/trash-talk : (redone research) a change record per set into a 512 ring: records survive while in the ring (promoted if the ring turns slowly); bounded, light
