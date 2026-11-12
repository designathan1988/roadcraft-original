# src/core/derivedCache.ts
Lines: 382
Summary: The derived-data cache in IndexedDB ('roadcraft-derived' v2): a general store plus own stores for cellWork, roadtiles, ecology and farWoods; reads (one, keys, some, all), writes (fire-and-forget, now, durable, queued under a byte budget, many, many-committed), forgets, and a byte estimate of a value.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-26 constants: DB name/version, STORE, OWN_STORES (kinds with their own store so one kind's writes never hold another's reads), storeOf/storesOf, RELAXED durability
- 28-70 database(): opened once (null where IndexedDB is missing or fails), upgrade makes the stores and drops the moved kinds from v1, versionchange/close forget the handle
- 72-78 derivedCacheOpen; prefixRange (prefix .. prefix+U+FFFF)
- 80-94 readDerived: one get; any error -> undefined (catch without binding)
- 96-111 readDerivedKeys: getAllKeys over the prefix range (keys only)
- 113-135 readDerivedSome: one get per distinct key in one transaction, resolved on complete
- 137-158 readDerivedAll: getAllKeys and getAll over the prefix: EVERY value of the prefix loaded and cloned at once
- 160-172 keepDerived: one put, errors ignored
- 174-192 keepDerivedDurably: one put, a promise resolved on complete/abort/error
- 194-208 keepDerivedNow: synchronous put on the open db (false when not yet open)
- 210-231 keepDerivedQueuedMany: bytes estimated, a WriteBudget slot awaited, one multi-store transaction, release on commit
- 233-266 WriteBudget: in-flight bytes under `most`; take waits (a write alone always passes), tryTake refuses
- 268-281 bytesOf: recursive estimate (buffers, strings x2, numbers 8, depth <= 8)
- 283-291 writeDerived/writeDerivedMany: fire and forget
- 293-309 keepDerivedManyCommitted: awaits the commit
- 311-327 keepDerivedMany: resolves once the puts are issued (not committed); errors ignored
- 329-363 forgetDerivedKinds (ranged deletes), forgetDerivedKeys (per key)
- 365-382 forgetOtherDerived: getAllKeys of the kind then deletes every key of another fingerprint

## Contracts, state and data flow
- put clones each value (MDN: in a separate thread); the cost grows with the value.
- keepDerivedMany does NOT wait for the commit: F-0001's wait (conflictTable.worker:156 imports `./render/derivedCache`, a different module path) is only the database open and the puts being issued, if that module is this one's twin (to check).
- readDerivedAll loads a whole prefix's values at once (MDN getAll: every match, cloned): proportional to everything kept under that prefix.
- Errors swallowed without a word at lines 41, 90-91, 107-108, 131-132, 154-155, 169-171, 189-190, 324-326, 359-361, 377-379.

## Depends on / used by
- uses: IndexedDB; used by: kept cities, cells, road tiles, ecology, far woods, conflict tables (callers to be seen)

## Problems found (finding IDs)
- F-0003 (suspected, S3): readDerivedAll loads a whole prefix into memory (callers to check)
- F-0004 (suspected, S4): ten swallowed errors

## To check in other files
- src/render/derivedCache.ts: is it a second copy of this module (two databases or two openings)?
- callers of readDerivedAll: which prefixes, how big at 10 km.
- callers of forgetOtherDerived: getAllKeys of a whole kind at start (cellWork keys of a large city).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/put : the value is structured-cloned in a separate thread; DataCloneError may be thrown (lines 167, 186, 202, 223, 305, 321)
- https://developer.mozilla.org/en-US/docs/Web/API/IDBDatabase/transaction : durability 'relaxed' commits once handed to the OS (line 26)
- https://developer.mozilla.org/en-US/docs/Web/API/IDBObjectStore/getAll : returns every match at once, each cloned; use count, a narrow range or a cursor for large stores (line 147)
- https://developer.chrome.com/blog/indexeddb-durability-mode-now-defaults-to-relaxed : 'relaxed' completes once changes reach the OS buffer, 3x-30x faster than 'strict' in real cases (redone research: line 26's RELAXED is right; keepDerivedManyCommitted at 293-309 waits only for that)
