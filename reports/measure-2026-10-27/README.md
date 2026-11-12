# Reopening the 10 km city, after the cache rebuilt (2026-10-27)

The city is the saved 10 km city (249,122 buildings). It ran in the game window: visible, 2560 x 1009.

## What the steady-state measurement found, and what was fixed

The first steady measurement showed the curtain at 145.9 s, the cache whole: 11,738 kept cells and 10,458 kept road tiles. The fixes below came out of it, and each was confirmed in the game.

| Cause | Fix | Commit |
|---|---|---|
| Empty cover cells were sent from their job with the frozen `EMPTY_COVER`'s arrays: detached after the first, 1,708 failures an opening | `packCover` copies its arrays | d93b09a3 |
| The cells' writes were dropped past 96 MB in flight, so the cache never completed | `DerivedWriterLane.keep` waits for room | 39e69daf |
| A road tile carried its session's paint slots, in its arrays and in its key: never found again | Kept with its roads' and nodes' ids (`tilePieces.ts`), given the session's slots as read; page writes wait for room | 38220402 |
| The build waited 3 s at most for the kept keys, which came 8 s after it began: 0 of 10,458 reused | The build waits for the read | fae7ab40 |
| The boot's saved large map solved its whole network and built 5 x 5 km of road tiles before its curtain | It opens at its view's district, as a map opened from the menu does | fae7ab40 |

## The opening with every fix

| Mark | s |
|---|---|
| save:parsed | 33.7 |
| world:solved | 38.4 (scoped solve, 0.1 s) |
| world:surfaces | 45.6 |
| world:surfaced | 70.2 |
| reveal:whole | 97.7 |
| opening:shown | 98.3 |

- **Road surfaces:** 131 tiles built and 1,208 read from the store, all 1,208 found.
- **Console:** no error. The only warning was a road tile worker silent for 10 s, its tiles waiting.
- **Photo:** `03-scoped-shown.png`, the whole city behind the menu. The camera and hour are those of the latest autosave (22:57).
- **Profile after the reveal (8 s):** 6.0 s idle of 9.3 s.

## Left, not fixed yet

- **The save read:** 6.7 -> 33.7 s, 27 s.
- **The road surfaces:** 25 s for 1,339 tiles with 236 ms of page work, waiting on the store's one lane and the road tile workers. The workers share the job processes with the cells' jobs.
- **Roads in to the town whole:** 27.5 s, the buildings' levels and the trees.
- **The frame rate:** not measured reliably. The window was covered, and the browser throttles its animation frames to about 1 a second; the profile showed the page idle.

# The batch after it (2026-10-27, later)

Each line was measured in the game window after its fix, by reloading the page. All but the last ran in the same window, which had been open about 8 hours.

| Fix | Commit | Opening shown |
|---|---|---|
| Before the batch (the table above) | | 98.3 s |
| The derived cache split into one store per kind; the road tile lanes' workers kept from queued jobs | 9f19b4ac | 68.8 s |
| The derived cache writer kept clear of queued jobs; two kept road tiles per place (an opening's scoped solve and the whole one) | 9b2e93db | 65.9 s |
| The road tile lanes on workers of their own | 6bab6ef3 | 47.9 s |
| The map read over its squares' tables, nothing joined | f8f55030 | 41.6 s |
| The same, in a fresh window (the game window restarted) | | **24.1 s** |

Earlier in the batch, with no measurement of their own:

- accf6aa3: depth prepass for the far masses. With and without it, the photos differ by about 140 pixels of moving things. Its GPU gain was not measured: the window is covered, it draws about 1 frame per second, and the lab's pass timer adds several renders into one frame.
- 106949d7: the gardens placed off the page.
- 3fa519d0: the table copy reads its bytes in one pass, writing the same bytes as before.

## The last opening, in the fresh window

| Mark | s |
|---|---|
| save:files-read | 2.8 |
| save:parsed | 7.7 (squares 3.3, join 1.1) |
| world:solved | 10.5 |
| world:surfaces | 14.2 |
| world:surfaced | 16.9 |
| reveal:whole | 23.8 |
| opening:shown | 24.1 |

- **Road surfaces:** 1,310 tiles reused and 29 built. The kept tiles were read in 1.2 s; the workers built theirs in 0.14 s.
- **Console:** no error and no warning.
- **Photo:** `04-final-shown.png`, the whole city behind the menu, unchanged from before.
- **The city:** 249,122 buildings and 513,411 landscape items, read over 3,840 tables. A save written by the new code was read back whole, and the traffic runs (328 vehicles after 164 s).

## How the causes were found

- **Kept road tiles read 17 s late.** The tiles are 7-25 KB each, and 40 of them read in 10 ms. The 17 s was waiting: the cache's lane shared its worker with the page threads' jobs.
- **645 tiles built again at every opening.** I recorded the parts of each tile key in two sessions and compared them. Of 589 comparable tiles, 335 differed in the elevation part only, 12 in the inputs and none in the terrain.
- **29 tiles taking 22 s.** The job pool showed each tile lane sharing its worker with the traffic, ground, people-level and far-level lanes, while 8 workers held no lane.

## Not done, or not verified

- **Editing at 10 km:** not examined.
- **On the page while the camera moves:** the camera solids (records decoded per cell) and the street furniture's placing.
- **The frame rate:** not measured; the window is covered.
- **Architecture specs:** `tests/arch/imports.spec.ts` fails on a cycle in `world` that grew with `networkBake.ts` on 2026-10-26 (`networkBuild` → `networkBake` → `junction`/`ribbons`/`doc` → … → `networkBuild`). It was not touched here, and the baseline was not changed to hide it.
