# src/cityGen.worker.ts
Lines: 46
Summary: The city generator served on a job worker: either the whole city grown into tables (buildCityTableOf) or only laid out with each tile's growth package (layoutCityOf + tilePackagesOf).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-5 imports: SerializedDoc, CityTables, tilePackagesOf/TileGrowth, buildCityTableOf/layoutCityOf, JobScope
- 7-21 doc comment; CityGenAsk (id, kind small/large, seed, radius, stage 'layout'); CityGenReply (data, buildings table, tiles, other tables, error)
- 23-35 serve, layout stage: the doc laid out, toJSONTablesApart, the landscape/lots/poles/spans tables, the tiles' packages; tables transferred, `data` and `tiles` structured-cloned
- 36-40 whole city: buildCityTableOf spills buildings into tables while growing; every plain ArrayBuffer table transferred (shared ones posted as handles)
- 41-46 an error answered with its stack; end of serve

## Contracts, state and data flow
- One reply per ask. The document JSON (`data`, roads and the rest without the tables) and the tiles' packages are cloned on the way: their size is the city's roads and tile inputs, once per generation.

## Depends on / used by
- uses: editor/smallCityMap (buildCityTableOf, layoutCityOf), editor/cityTiles (tilePackagesOf), world/doc
- used by: src/main.ts cityData / cityJob through the job pool

## Problems found (finding IDs)
- none (one-off generation cost; the opening's time is judged in main.ts and the generator files)

## To check in other files
- src/editor/smallCityMap.ts buildCityTableOf: the cost of growing a 10 km city (is it proportional to the city, done once, kept?).
- src/main.ts cityData: whether the cloned `data` is held twice on the page.

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Workers_API/Transferable_objects : ArrayBuffers in the transfer list move (sender's byteLength 0), typed arrays are not themselves transferable (lines 32, 39 pass the buffers)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/SharedArrayBuffer : a posted SharedArrayBuffer shares the same block, not copied (line 38's comment holds)
- https://developer.chrome.com/blog/transferable-objects-lightning-fast : (redone research) transfer vs clone of a 32 MB buffer: 6.6 ms vs 302 ms round trip; the city tables passed here in the transfer list are the right choice in a page worker; in a desktop utility process they are copied regardless (MessagePortMain transfers ports only)
