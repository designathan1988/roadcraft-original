# src/editor/cookedCities.ts
Lines: 55
Summary: The cities shipped with the game (the first new city of each size, seed 7, grown at build time): read from gzip files when this build's generator fingerprint matches, otherwise null (grown here).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-24 imports; COOKED_CITY_SEEDS, CookedKind, COOKED_CITIES_DIR; manifest and CookedCity shapes
- 26-30 gunzipped: a response body piped through DecompressionStream('gzip')
- 32-54 readCookedCity: manifest fetched once (no-cache revalidation); every file of the city fetched and gunzipped in parallel; the data parsed from JSON; the tables as ArrayBuffers

## Contracts, state and data flow
- Only for the default seed and the default radius (main.ts passes radius undefined); a 10 km city (radius 5 km) is never shipped: it is grown or read from the derived cache.

## Depends on / used by
- uses: fetch, DecompressionStream, editor/preparedCity CITY_TABLES; used by: main.ts cityData

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/DecompressionStream : pipeThrough(new DecompressionStream('gzip')) then a Response to read it (lines 27-30)
- https://developer.mozilla.org/en-US/docs/Web/API/RequestInit : cache 'no-cache' revalidates a cached copy (line 38)
- https://developer.mozilla.org/en-US/docs/Web/API/CompressionStream : (redone research) gzip streams run in workers too: here the gunzip and JSON parse of a shipped city run on the page where this is called (main.ts cityData), proportional to the city's size
