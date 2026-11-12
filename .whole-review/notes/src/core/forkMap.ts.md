# src/core/forkMap.ts
Lines: 176
Summary: Copy-on-write Map and Set over another (a document's working copy for an edit): reads fall through to the map below, writes cost only what they change; changes() and applyTo write the result back.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-18 ForkMap fields: replaced (overrides at their place), added (new and re-set after delete), gone (deleted keys below); size = below - gone + added
- 20-34 get / has / owns
- 36-47 writable: the fork's own value, or the value below copied (forkWork.copied++) and kept as replaced
- 49-68 set, delete, clear (clear marks EVERY key below gone: O(below))
- 70-92 entries/keys/values/iterator/forEach: generators walking the WHOLE map below, then the added keys
- 94-107 changes() and applyTo(target): gone deleted, replaced and added put
- 109-121 ForkSet: a ForkMap over an adapter of the set below
- 123-172 ForkSet's Set methods over the map (iteration walks the whole set below)
- 174-176 forkWork counter

## Contracts, state and data flow
- Any iteration of a fork costs the whole collection below plus a generator step each (no index of only the changes). Callers iterating a fork per edit pay the map's size per edit.

## Depends on / used by
- uses: nothing; used by: world/doc forks (commit, edit rules)

## Problems found (finding IDs)
- none here

## To check in other files
- world/doc and editor/commit: do edits iterate forked maps (the whole roads/buildings) per edit?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function* : yield* delegates to another iterator until it finishes (lines 70-88, 148-158)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol/toStringTag : sets the tag Object.prototype.toString reports (lines 12-14, 123-125)
- https://en.wikipedia.org/wiki/Persistent_data_structure : (redone research) copy-on-write costs what is written; iteration over a fork walks the base and the overlay, so a whole-map walk on a fork (an edit rule that iterates every record) costs the whole map, not the edit
