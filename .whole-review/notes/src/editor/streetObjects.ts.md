# src/editor/streetObjects.ts
Lines: 106
Summary: Street objects that split a road: a pedestrian crossing (zebra or signal) or a U-turn through the median at a chosen arc position, each made on a forked document and network, checked (the crossing's single crosswalk, the U-turn's connector fitting a car), and taken back.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-15 imports; PedestrianCrossingKind, PedestrianCrossingResult
- 16-41 commitPedestrianCrossing: refusals (no record, kind, tunnel, not walkable); the split point past the crosswalk; room checked against both stop lines
- 43-65 fork, rebuild, split, the node's two pieces, the crossing set on the piece from a, rebuilt again; refused if impossible or not exactly one crosswalk; taken back
- 67-83 UturnResult; commitUturn: refusals (tunnel, one-way or no median, too short)
- 84-105 fork, rebuild, split, the arriving piece, the U-turn set, rebuilt; only this node's connectors built (not every road's lanes); refused when no U-turn fits a car; taken back

## Contracts, state and data flow
- Per click: a fork of the document and network (costs what is written) and two network rebuilds; the lanelets of one junction only.

## Depends on / used by
- uses: world/approach, world/doc fork/takeBack, world/network fork/rebuild/stopLineDistance/crosswalkDistanceAt, world/lanelets junctionConnectors, editor/commit splitSegment; used by: the street-objects tool (crossings, U-turns)

## Problems found (finding IDs)
- none

## To check in other files
- world/network rebuild after a fork: the first rebuild at lines 45 and 86 runs before any change on the fork (does it cost nothing when nothing changed?).

## Sources
- https://en.wikipedia.org/wiki/Persistent_data_structure : an update's cost is bounded by what it changes (fat node O(1) per change; path copying by depth): the fork's premise (lines 43-44, 84-85)
- https://web.dev/articles/rail : a user-initiated transition within 100 ms: two rebuilds per click must fit it (lines 45, 56, 86, 97)
