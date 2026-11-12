# src/core/recentCache.ts
Lines: 35
Summary: A bounded LRU cache on a Map's insertion order: a hit is moved to the newest, a miss made and held, the oldest dropped past capacity.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-5 doc comment: values remade from their key only
- 6-24 RecentCache: held Map; get(key, make): delete + set on a hit, make + set on a miss, the oldest key deleted when over capacity
- 26-35 size getter (values held) and clear (every value let go)

## Contracts, state and data flow
- O(1) per get; memory bounded by capacity (an undefined value is never cached, made again each time).

## Depends on / used by
- uses: nothing; used by: junction levels, road rings (to be seen)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Map/keys : insertion order; delete then set moves a key to the end (lines 16-17, 22)
- https://en.wikipedia.org/wiki/Cache_replacement_policies : LRU discards the least recently used first (line 22)
- https://v8.dev/blog/trash-talk : (redone research) cached values outlive scavenges and live in the old generation: the capacity bounds the memory; each caller's capacity times value size is the cost (callers to check)
