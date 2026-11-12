# src/editor/mapExport.ts
Lines: 47
Summary: Save map: the map file as one Blob of framed pieces (header, settings JSON, the document's binary sections), offered as a download through an object URL revoked ten seconds later.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-6 imports (RoadDoc, persistence settings with unit, saveBinary framing); MAP_FILE_NAME
- 8-15 mapFileBlob: settings section (optional) and the doc section (toBinary viewed as bytes), framed into Blob parts
- 17-34 exportToFile: the blob made, a failure told to onFailed (and logged) or thrown
- 36-46 offerFile: object URL, a link clicked, the URL revoked after 10 s

## Contracts, state and data flow
- One player action; the map's binary is made once (toBinary) and copied once into the Blob; nothing kept after the URL is revoked.

## Depends on / used by
- uses: world/doc toBinary, editor/persistence withUnit, editor/saveBinary; used by: main.ts (Ctrl+S, the menu's Save map)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/URL/createObjectURL_static : the URL keeps the blob alive until revoked (lines 38-44)
- https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob : the parts are put inside the blob, concatenated (line 14)
- https://web.dev/articles/rail : (redone research) doc.toBinary of a whole city runs on the page at Save map: a one-off pause proportional to the map, outside game time
