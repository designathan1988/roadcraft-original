# src/editor/buildingRoofs.ts
Lines: 44
Summary: Roof details of a mass (solar, skylight, vent, chimney, water tank, spire, lantern): add at a point if it fits, update with checks, remove.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-10 imports; SIZE per kind
- 12-26 addRoofDetail: fits check; next id = max + 1; spire and lantern heights (lantern with a flag)
- 28-36 updateRoofDetail: patched copy checked (fits, finite rotation, height 1-40 m), assigned in place
- 38-44 removeRoofDetail

## Contracts, state and data flow
- Per edit only.

## Depends on / used by
- uses: world/buildings footprints, types, flags; used by: editor/buildingTool

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce : with an initial value an empty array returns it (line 18)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign : copies own enumerable properties onto the target (line 34)
- https://web.dev/articles/rail : (redone research, replaces the reduce filler) roof details added, updated and removed per click: input-time work bounded by one mass's details (not timed); no frame cost
