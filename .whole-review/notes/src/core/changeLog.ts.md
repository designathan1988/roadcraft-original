# src/core/changeLog.ts
Lines: 73
Summary: A log of changes between opaque state tokens: a reader holds a token and asks `since(token)` for the changes after it (null: read everything again). States no reader holds (collected) are merged away when the log doubles.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-7 doc comment (never keep only the last N); Entry {from, to WeakRefs, changes or null = everything}
- 9-10 MERGE_FROM 64: the entry count at which the log is first merged
- 12-23 ChangeLog: entries, current token and its WeakRef, merged count, an empty list; `state` getter
- 25-36 push: a new token; when entries reach max(64, 2 x last merged size), merge the collected states
- 38-56 merge(held): walks entries joining runs whose middle state is not alive (collected or not held); concatenates change lists ([...a, ...b])
- 58-73 since(state): the current token -> none; null -> null; findIndex of the entry starting at it (deref per entry), then the changes from there (null if any entry is 'everything')

## Contracts, state and data flow
- Memory: every change after the OLDEST token any reader still holds stays in the log. A reader that keeps a token and reads seldom (or never again) keeps every change since, for the whole session.
- since() is O(entries) with a deref each; the log is kept short only by merging collected states.

## Depends on / used by
- uses: nothing; used by: the document's diaries (world/changes, world/doc) and the derived products' cursors

## Problems found (finding IDs)
- none confirmed here

## To check in other files
- world/changes.ts and every holder of a ChangeLog state: does any reader keep a token for good without reading (unbounded growth of the log across a play session)?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakRef : deref is undefined only after collection, which may never happen; never rely on GC timing (lines 3-4, 40-43, 62)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findIndex : linear scan until a match (line 62)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/FinalizationRegistry : (redone research) collection may happen much later or never: a reader's token dropped without a read keeps the log's entries until GC decides, so the log's memory depends on GC timing, not on the readers' needs
- https://blog.mozilla.org/sfink/2022/06/09/ephemeron-tables-aka-javascript-weakmaps/ : (redone research) weak references add marking work; the log holds few tokens (one per reader), so the GC cost is small; the risk is the retained entries
