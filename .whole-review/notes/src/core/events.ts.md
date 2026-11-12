# src/core/events.ts
Lines: 30
Summary: The game's input queue: browser events pushed (each push wakes a frame), drained once a frame in order; what a handler pushes waits for the next frame.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-10 InputQueue<T>: items array, wake callback, size
- 12-15 push: append and wake
- 17-23 drain: swaps the array for a new one and handles each item (one allocation a non-empty drain)
- 25-30 clear: truncates in place

## Contracts, state and data flow
- Every pointermove is queued and handled (the browser already coalesces moves of one pointer per dispatch); a drain handles every queued move, not only the latest.

## Depends on / used by
- uses: nothing; used by: main.ts (pointer and key events)

## Problems found (finding IDs)
- none

## To check in other files
- main.ts: each queued pointermove is handled in full (picks, previews); several moves in one frame would each pay that cost.

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/length : length = 0 truncates the same array (line 27)
- https://developer.mozilla.org/en-US/docs/Web/API/Element/pointermove_event : moves may fire at a high rate and are coalesced per pointer (lines 12-23)
- https://web.dev/articles/rail : (redone research) input processed within 50 ms: draining the queue once a frame bounds input latency by the frame time; a long frame delays every queued input
