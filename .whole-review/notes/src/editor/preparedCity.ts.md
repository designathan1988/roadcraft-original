# src/editor/preparedCity.ts
Lines: 158
Summary: A whole city made off the page kept as record tables (buildings, landscape, lots, poles, spans), never as posted objects: prepareCity turns a serialized city's records into tables in batches of 2,000 (members shared per batch, not interned), and the helpers that hand the page an opened city's tables.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-23 imports; the contract (records in tables, never objects); CITY_TABLES, CityTable, CityTables
- 25-35 PreparedCity; the history of why (1.3 GB opening, interning cost); PREPARE_BATCH 2000
- 37-77 prepareCity: buildings through PreparedCityWriter batch by batch; landscape, lots (with building only while standing), poles, spans (between standing poles) as tables (lots with box and summary columns); the data's lists left empty
- 79-115 PreparedCityWriter: TableWriter with row boxes and summary columns; add (migrate, first of an id, settle, share, write); endBatch keeps only the members kept; finish
- 117-135 OpenedTables, OpenedCity, noCityTables
- 137-157 preparedCity (no decode), openedTables, isOpenedTables, openedBuildings (rows read from the table's header)

## Contracts, state and data flow
- Runs in the city worker (cityGen.worker) or where a saved city is prepared; the page gets ArrayBuffers (or shared buffers) and reads rows on demand.
- prepareCity holds the input's objects, the per-kind object arrays (items, lots, poles, spans) and their encoded tables at once while it runs (peak in the worker).

## Depends on / used by
- uses: world/doc record readers, world/docBinary DOC_TABLES, world/buildings recordTable/summary/geometry/intern/serialize/types, world/lots, world/lotSummary, world/ids; used by: cityGen.worker, editor/history restoreInto (types), main.ts (opening), cookedCities

## Problems found (finding IDs)
- none

## To check in other files
- world/buildings/recordTable TableWriter: whether finish() copies the whole table once more (peak memory of a 10 km city's preparation).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakSet : objects held weakly, a visited mark per batch (line 99)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice : a shallow copy of the batch's references (line 43)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/BYTES_PER_ELEMENT : (redone research) records as table rows cost their bytes, not an object graph per record (objects plus boxed doubles, v8.dev/blog/pointer-compression): the reason the city is kept in tables
- https://developer.chrome.com/blog/transferable-objects-lightning-fast : (redone research) the tables are buffers, transferable at no copy to the page from a page worker
