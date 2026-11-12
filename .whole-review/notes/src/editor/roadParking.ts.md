# src/editor/roadParking.ts
Lines: 41
Summary: The road tool's parking preset (none, parallel both/right/left, cycle, cycle and parking), kept in localStorage, and the segment parking a new road is drawn with.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-14 ROAD_PARKING_PRESETS; KEY; the preset read from localStorage at module load (a failure caught with no binding and no word)
- 16-27 roadParkingPreset; setRoadParkingPreset (written to localStorage; a failure caught with no binding)
- 29-40 roadParking: the preset as left/right parking

## Contracts, state and data flow
- Module state, one string; no performance cost.

## Depends on / used by
- uses: world/parking types, localStorage; used by: the road tool (options panel, commit of a drawn road)

## Problems found (finding IDs)
- F-0018 (suspected, S4): two catch blocks with no binding drop storage errors unsaid

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Storage/getItem : storage access may throw when blocked (line 10)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/try...catch : optional catch binding drops the error value (lines 12, 24)
- https://web.dev/articles/storage-for-the-web : (redone research) localStorage blocks the main thread; here one short string read once at module load and written per preset change: no performance weight
