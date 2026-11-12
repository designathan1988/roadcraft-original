# src/editor/buildingProfile.ts
Lines: 108
Summary: Profile edits of a building: a mass split at a floor (reliefs split between the two), and a tier reshaped to another plan with facade work carried by face direction.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-4 imports: building types, baysOn, edge frames and sides, plan helpers
- 6-33 splitVolumeAtFloor: the upper part a structuredClone with the upper storeys; reliefs split; the lower one's roof a terrace with its pitch and details dropped
- 35-66 reshapeTier: JSON of the volume before, a clone, old faces and frames, the new plan, each new face's nearest old face by normal (and back), replicate()
- 67-107 facade geometry (bays scaled by face length), materials, each storey's sides, patterns, bays (re-indexed), materials; true when the JSON changed

## Contracts, state and data flow
- Per edit only (two JSON.stringify of one volume).

## Depends on / used by
- uses: world/buildings types, geometry, footprints; editor/buildingPlans; used by: editor/buildingTool

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/entries : [index, element] pairs (lines 61, 82)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/delete : removes own properties; frees nothing directly (lines 24-30, 69-104)
- https://v8.dev/blog/fast-properties : (redone research) deleting a property can turn an object into dictionary (slow) mode; on a record kept in the city that makes its later reads slower and its storage larger: per profile edit, a few objects
