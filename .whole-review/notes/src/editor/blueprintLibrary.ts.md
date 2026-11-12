# src/editor/blueprintLibrary.ts
Lines: 80
Summary: The player's saved building designs (blueprints) in localStorage through KeptList: list, save by name, a photo (PNG data URL) kept INSIDE each entry, photoOf, remove; each stored body rescaled and repaired on read.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-21 imports; KEY; StoredBlueprint {key, name, body, unit, photo}; isStored
- 23-45 BlueprintLibrary: list (reads and repairs every entry), save (replaces by name, writes the whole list)
- 47-56 setPhoto (the whole list rewritten with the photo inside), photoOf (getItem + JSON.parse of the WHOLE list, photos included, per call)
- 58-62 remove: the list rewritten without that blueprint
- 64-80 readEntry (rescale + migrate) and readBody (JSON round trip to clean the body)

## Contracts, state and data flow
- The photos live in the same localStorage string as the bodies: every read of the list parses every photo; buildingsWiring.requestThumbnails calls photoOf once per id of a gallery, each a synchronous read and parse of the whole string (O(ids x size)). localStorage holds 5 MiB per origin: photos fill it.

## Depends on / used by
- uses: core/keptList, world/buildings/serialize, world/rescale; used by: buildingsWiring (list, save, photoOf, setPhoto, remove)

## Problems found (finding IDs)
- F-0011 (suspected, S3): photos kept inside the blueprint list; photoOf parses the whole list per id

## To check in other files
- ui/builder/workspace: how often requestThumbnails is called (per gallery open, per scroll?).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Storage_API/Storage_quotas_and_eviction_criteria : 5 MiB of localStorage per origin, QuotaExceededError when full (lines 8, 16-17, 48-49)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find : linear scan to the first match (lines 39, 54)
- https://web.dev/articles/storage-for-the-web : (redone research) localStorage is synchronous and blocks the main thread, about 5 MB, strings only; use IndexedDB: each photoOf's getItem + JSON.parse of the whole list (photos inside) blocks the page per gallery item (F-0011)
