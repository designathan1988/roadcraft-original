# src/core/identityMemo.ts
Lines: 19
Summary: identityMemo: a value computed once per key object (WeakMap, freed with the key); uniqueCounter: a counter of numbers never handed out twice in the page.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-12 identityMemo(compute): one get, `has` only for an undefined value, compute and keep on a miss; keyed by identity, so a key changed in place answers stale
- 14-19 uniqueCounter: a closure counting up from 1

## Contracts, state and data flow
- Values live as long as their key; no growth beyond the keys alive.

## Depends on / used by
- uses: nothing; used by: memoised derivations (to be seen)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/WeakMap : values live only while the key does, unless held elsewhere (line 3)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/MAX_SAFE_INTEGER : integers exact up to 2^53-1 (line 17's counter)
- https://v8.dev/blog/concurrent-marking : (redone research) V8's marking workers bail out on weak collections, the main thread visits them: a memo keyed on many objects (one entry per record of a large city) adds main-thread GC work; its callers' key counts decide the weight (to check)
