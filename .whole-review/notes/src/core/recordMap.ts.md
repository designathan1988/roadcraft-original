# src/core/recordMap.ts
Lines: 22
Summary: A Map subclass that tells a listener each key's value before a set, delete or clear (an edit being recorded for undo).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-4 RecordMap extends Map; `before` listener or null
- 6-10 set: before?.(key, old) (arguments not evaluated when nobody listens), then super.set
- 12-15 delete: told only when the key exists
- 17-21 clear: every entry told when listened, then cleared (O(size) only while recording)
- 22 end of file after the class (blank line)

## Contracts, state and data flow
- No cost when nobody listens beyond the subclass call; the Map constructor's entries go through this set (the field not yet set, so nobody is told).

## Depends on / used by
- uses: nothing; used by: world/doc stores recorded by editor/history

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Optional_chaining : fn?.(args) does not evaluate args when fn is nullish (line 8)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Classes/extends : a Map subclass's set is called by the constructor for each entry (line 7's comment)
- https://v8.dev/blog/disabling-escape-analysis : (redone research) a listener call per set that receives the old value cannot be optimised away when the value escapes into the undo record: every recorded write keeps the previous value alive until its patch is dropped (history's 96 MiB budget)
