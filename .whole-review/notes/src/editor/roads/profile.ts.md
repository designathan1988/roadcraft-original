# src/editor/roads/profile.ts
Lines: 35
Summary: A road profile applied to roads already built ("apply without demolishing"): each segment's type, direction, lanes, section and parking set from the profile, stopping at the first segment whose type the profile cannot fit; whether anything changed.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-11 imports (parking, roadSection, roads/profile); ApplyResult
- 13-34 applyProfileTo: per segment, problems checked (returned at once), the profile applied (direction before lanes), changed compared field by field

## Contracts, state and data flow
- Per player action, one pass over the selected segments.

## Depends on / used by
- uses: world/roads/profile (profileProblems, applyProfile), world/doc setters, world/parking sameParking, world/roadSection sameRoadSection; used by: the road upgrade tool / inspector

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Logical_OR_assignment : `changed ||=` keeps true once set (line 30)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing : `type ?? segment.type` (line 18)
- (redone research) one pass over the selected segments per player action: no weight on RAM, CPU or GPU; the two operator pages above are all it relies on
