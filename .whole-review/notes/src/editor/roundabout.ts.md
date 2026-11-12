# src/editor/roundabout.ts
Lines: 90
Summary: A single-lane roundabout placed on vacant ground: refused when its size, the map's bounds or roads near it forbid; else eight ring nodes (priority on the even ones), eight one-way curved ring segments and four approaches, laid on a fork, judged by the forked network, taken back.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-17 imports; ROUNDABOUT_MIN/MAX_RADIUS 32/128 m, APPROACH 40 m; RoundaboutResult
- 19-40 roundaboutRefusal: size and type checked; inside MAP_HALF; the roads near its box held and measured (distance to the centre against the reach and both widths)
- 42-76 commitRoundabout: refused early; the fork; eight nodes and eight ring segments (quadratic controls at radius / cos(step/2))
- 77-89 four approaches; the network forked and rebuilt; impossible ring nodes refuse it; taken back

## Contracts, state and data flow
- One player action; the refusal preview asks only the roads near the box.

## Depends on / used by
- uses: core/bezier, world/doc fork/takeBack, world/network fork/rebuild/holdNear/ribbonsMeeting/polylines, world/roadTypes, world/cityGen wholeMap; used by: the roundabout tool and its preview

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://en.wikipedia.org/wiki/Roundabout : priority to the circulating flow (lines 63-67)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos : radians (lines 58-61, 71)
- https://en.wikipedia.org/wiki/Persistent_data_structure : (redone research, replaces the Math.cos filler) laid on a fork that costs what it writes; the preview's refusal asks only the roads near the box: per click and per preview move, bounded by what is near
