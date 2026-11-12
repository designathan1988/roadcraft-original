# src/editor/cityTiles.ts
Lines: 193
Summary: A city's buildings grown tile by tile on many workers: the laid-out city cut into 1 km tile packages (lots, roads within 150 m), each tile grown on its own small document reading its earlier neighbours' edge buildings, buildings in a tile-own id range and spilled to a table as they grow; the tiles' tables joined into the city's by copying rows.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-29 imports; doc comment (phases on a 2x2 checkerboard, ids per tile, LayerProcGen)
- 31-62 ROAD_MARGIN 150 m, EDGE_REACH, TILE_IDS 65,536, SPILL_AT/KEEP; TileGrowth; TileGrown {buildings ArrayBuffer table, lotBuildings Float64Array, edge table}
- 64-74 phaseOf (parity), tilesTouch
- 76-117 tilePackagesOf: one pass over the lots (by tile of their centre) and one over the segments (every tile within 150 m), each package's nodes and segments saved
- 119-141 nearBorder; edgeBuildingsNear: neighbours' edge tables read by box columns, rows decoded only in reach
- 143-179 growTile: a document of the tile's roads and lots (fromJSON, no repair), neighbours placed, ids from the tile's range, a Network rebuilt for the tile, growLots spilling to the table every 4,096 records; lot->building pairs; edge buildings encoded
- 181-193 assembleCity: rows of every tile copied (no decoding); the layout's lots decoded and re-encoded with their building ids

## Contracts, state and data flow
- TileGrown.buildings/edge are plain ArrayBuffers (TableWriter / encodeRecords output): F-0012's clone to the assembler copies them all.
- Each tile builds its own Network over its roads (per tile once).

## Depends on / used by
- uses: world/buildings recordTable/intern/summary/geometry, world/doc, world/lots, world/network, world/growth/zoning, world/tiles, editor/preparedCity, editor/smallCityMap growLots; used by: cityGen.worker, cityGrowth.worker, cityInTiles

## Problems found (finding IDs)
- F-0012 confirmed in shape here (the buffers are plain ArrayBuffers)

## To check in other files
- none

## Sources
- https://github.com/runevision/LayerProcGen : layered chunk generation where a chunk's dependencies are generated first (line 26)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/from : one dense array of n with the map function (line 187)
- https://surma.dev/things/is-postmessage-slow/ : (redone research) each tile package (lots and roads within 150 m, neighbours' edges) is cloned to its worker at a cost following its size; the join copies rows, a second full copy of the city's tables during the assembly
