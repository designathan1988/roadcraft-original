# src/core/rerootMap.ts
Lines: 105
Summary: A persistent map by rerooting (Baker's shallow binding): the root holds the values, every other version holds its differences from the one it points to; deriving a new version reroots to the current one first, so a new version costs what it writes.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-7 GONE sentinel symbol; Slot type
- 8-27 RerootMap fields (data, up, prev while written, sealed); get walks up to the root (O(depth))
- 29-50 derive (reroot, the new version takes the data Map, this one becomes an empty diff pointing up), set, delete
- 52-56 seal: no more writes; prev dropped
- 58-70 entries: O(map) walk with a seen Set (for whole-map readers)
- 72-83 writable guard; note: the derived-from version keeps the key's old value before the first write
- 85-105 reroot: reverses the diffs along the path to the root (each layer's data swapped into the root, a back Map built)

## Contracts, state and data flow
- Old versions are kept only while referenced (new versions do not point back; prev is cleared at seal). Reading an old version walks its diff chain until the next derive reroots.

## Depends on / used by
- uses: nothing; used by: the document's stores (versions per edit)

## Problems found (finding IDs)
- none

## To check in other files
- holders of old versions (history, readers): do they keep many versions alive (each a diff Map)?

## Sources
- https://en.wikipedia.org/wiki/Persistent_data_structure : persistence by fat nodes/path copying and their old-version access costs (the rerooting trick itself is not on that page; cited by the file to Conchon & Filliatre 2007) (lines 1-2)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Symbol : every Symbol() unique, a safe sentinel (line 5)
- https://v8.dev/blog/trash-talk : (redone research) versions kept alive are promoted and survive in the old generation: each kept version's difference map is long-lived memory until no version points to it
