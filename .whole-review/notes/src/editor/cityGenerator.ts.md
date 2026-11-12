# src/editor/cityGenerator.ts
Lines: 109
Summary: The city generator's hand on the map: a plan's street graph laid as roads, footways widened to 3 m (avenues given a planted median), squares in each neighbourhood, power lines, furniture and street names for the whole city, every lot zoned by its district.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-14 imports: street names, power lines, doc, network, lots, squares, furniture sets, road types, snap, plan levels
- 16-28 layCity: a node per crossing and bend, a road segment per edge step
- 30-44 CITY_FOOTWAY 3 m, CITY_MEDIAN 2 m; widenCityFootways: every segment (a snapshot of the map's segments) widened (generation, once)
- 46-66 greenCity: squares (lots deleted, dabs, trees), network rebuilt if stale, power lines, furniture and street names for every segment, added in batches
- 68-99 zoneCity: each lot's zone from the plan and whether a main road (by ribbonsNear) is within 22 m; lots grouped by zone, zoned in one call per group
- 100-109 nearAny: point within d of any segment

## Contracts, state and data flow
- Whole-map work, by design, once per generated city (marked @rebuild); runs in the city worker.

## Depends on / used by
- uses: world/roads (streetNames, furnitureSets), editor/roads/powerLine, world/doc, world/lots, world/cityGen; used by: editor/smallCityMap (the generator)

## Problems found (finding IDs)
- none (the generation's cost belongs to the opening of a new city: checked in smallCityMap/cityTiles)

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/values : the iterator is live; spreading snapshots it before mutating (line 36)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split : the substrings between separators (line 95)
- https://web.dev/articles/rail : (redone research, replaces the split filler) laying a whole city's roads, footways, squares, power lines, furniture and names is whole-map work: on the page it must be cut in 50 ms chunks or moved off it (where it runs: the caller decides; to check in main.ts / cityGen.worker)
