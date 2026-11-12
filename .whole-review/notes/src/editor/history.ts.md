# src/editor/history.ts
Lines: 208
Summary: Undo/redo by the document's patches (records an edit changed), with grouped steps undone together, a step and byte budget (60 steps, 96 MiB), and the map loaders: restoreInto (a saved or generated city replacing the document whole, network rebuilt, repairs skipped for a generated city) and restoreSnapshot.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-10 imports (hitch, table rows, RecordTable, RoadDoc, docImage sideOf, terrain relief, preparedCity, repair)
- 11-38 History state: undo/redo stacks of DocPatch, open edit, group and groupOf (WeakMap); budget 60 steps / 96 MiB; bytes summed over both stacks on each call; canUndo/canRedo
- 40-65 begin (settle, beginEdit), end, cancel (the open edit restored from its before side), grouped
- 67-103 undo: pops the step and its group; a whole-map step takes the map after (doc.image, tables shared) only when first undone; restore before; redo: restore after, trim
- 105-130 groupAt; dropGroupsOf (a trimmed group dropped whole from both stacks); clear
- 132-158 settle/close: endEdit timed as a hitch, the patch grouped, pushed, redo cleared, trimmed; trim drops the oldest steps past the count, then past the byte budget (bytes recomputed per drop)
- 160-168 followNetwork (rebuild only when the roads' revision moved); serialize (toText)
- 170-183 openedGenerated / docGenerated: over 10,000 buildings on flat ground with no stamps = a generated city, opened without repairs
- 185-200 restoreInto: tables normalised; replaceFromJSON whole (repair off for a generated city); full network rebuild; repairs only when not generated and the network holds every road; three performance marks
- 202-207 restoreSnapshot: replace without repair, rebuild when the roads moved

## Contracts, state and data flow
- The history holds up to 96 MiB of patches (an approximate UTF-16 size); a whole-map step holds the map before (and after once undone) as images whose building tables are shared, not copied.
- trim's while loop recomputes bytes over both stacks per dropped step: at most 60 x 120 additions, negligible.
- performance.mark entries accumulate per open (three per map opened), never per frame.

## Depends on / used by
- uses: world/doc (beginEdit/endEdit/restore/image/replaceFromJSON/toText), world/docImage, world/network rebuild, editor/repair, editor/preparedCity; used by: main.ts (undo/redo keys, opening maps, autosave), tools

## Problems found (finding IDs)
- none here; whether a city's opening leaves a whole-map step in the undo stack (holding the previous map's image) depends on the caller.

## To check in other files
- main.ts / persistence: does opening a map run inside history.begin/end (a whole step holding the previous city's image), or after history.clear()?
- world/doc wholeBytes: does it count the shared tables (the budget then trimming real memory) or only the text side?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap : keys held weakly, an entry goes with its patch (line 19)
- https://developer.mozilla.org/en-US/docs/Web/API/Performance/mark : marks stay in the timeline until cleared (lines 192-198, three per opening)
- https://v8.dev/blog/trash-talk : (redone research) what lives long is promoted and paid by major GCs: up to 96 MiB of patches (and whole-map images on a map-replacing step) live in the old generation for the session; the budget bounds the memory, not its GC cost
