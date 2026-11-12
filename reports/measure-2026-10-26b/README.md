# One measurement: reopening the 10 km city (2026-10-26, second batch)

The game window was visible (2560 x 1009, not hidden). The city is the saved 10 km city (249,122 buildings).

## Timeline (seconds from page start)

| mark | s |
|---|---|
| save:files-read | 6.3 |
| save:parsed | 33.1 |
| world:solved | 39.3 |
| world:shape | 42.4 |
| world:surfaces | 45.4 |
| world:surfaced | 86.7 |
| world:roads | 86.9 |
| opening:shown | 142.8 |

The previous measurement showed the city at 113.7 s.

## The open city (menu up, still camera)

- 10.8 frames a second.
- The bar showed 28 vehicles and 19 people at 02:47, at night.
- Photo: `01-shown.png`, the whole city behind the menu, with its buildings, roads and woods drawn.

CPU profile, 10 s, self time:

| function | ms |
|---|---|
| put (IndexedDB) | 2,608 |
| keepDerivedNow | 1,136 |
| recordTable copy | 765 |
| processWorker port.onmessage | 540 |
| postMessage | 346 |
| room | 268 |

The callers show the cells' job answers being kept on the page (`cellPool.answer` -> `keepDerivedNow`, and `SliceStore.keep`). They also show the jobs' rows being copied for the job processes (`ownRows`).

## Causes found and fixed

1. **The cell fingerprint read too much.** `__CELL_WORK_HASH__` read the plants' cover index (`layerCells.ts`), the view's cells (`viewCells.ts`) and the picture sets (`plantImpostors.ts`). This batch edited all three, so every kept mass, far level and slice was thrown away and made again. The road tiles' fingerprint read `viewCells.ts` too, so the road surfaces were made again as well.
   - Fixed in `ac02ebfd`.
2. **The results were written on the page.** Every result and slice was serialised into IndexedDB on the page.
   - Fixed in `c9a36957`: they now go through the writer's lane, with their arrays copied and transferred.

## Not verified

- The next open still makes the cells and road tiles once more, because the fingerprints changed again with the fix.
- Only the open after that one shows the steady state.
- The far cars' new shader has not been seen on screen yet. No error was looked for in the console during this measurement.
