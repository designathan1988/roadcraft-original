# src/editor/persistence.ts
Lines: 684
Summary: Autosave and loading: the map saved by squares into IndexedDB (TiledSaves, encoded in the job system's save lane) when available, else as one text in localStorage or the large store; debounced (700 ms, at most 3 s) and flushed in idle time; settings apart; unreadable copies set aside, never deleted; map files read (binary frame or older JSON); strict validation of a serialized document.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-26 imports; KEY, QUARANTINE_KEY, DEBOUNCE_MS 700, MAX_WAIT_MS 3000, SETTINGS_KEY, LOCAL_LIMIT_CHARS 2.4 M
- 27-62 SavedSettings; withUnit; SavedSession (document, settings, tables, fields)
- 63-91 Persistence: timer, pending, parted (TiledSaves over IndexedDB parts), loadedParts; constructor; adoptLoaded; rejected
- 92-104 save (with the stored settings: loadSession reads and parses localStorage's small entry); saveSoon
- 106-158 saveSession: with parts, the settings written and TiledSaves.save (what the diary says changed), the pointer written after; else one JSON text of the whole map to localStorage (<= 2.4 M chars) or the large store; a failure to make the text caught with no binding (F-0016)
- 160-168 partsKept, dropParts
- 170-212 loadSessionAsync: the newest of the small key, the parts (tables kept undecoded; the document validated by isSavedSession, F-0017) and the large store (skipped by its head's time before any parse)
- 214-262 saveSessionSoon (debounce with max wait, then requestIdleCallback within 2 s); saveSettingsSoon/flushSettings/writeSettings
- 264-291 readSettings; flush (cancels the idle callback, runs the pending save and settings)
- 293-361 load/loadSession (pointer entries return null; a doc or session parsed; unreadable set aside once); quarantineStored (large store and parts copied aside); clear
- 363-391 quarantine: never overwrites an earlier set-aside copy, never deletes before the copy is written
- 393-425 SPEEDS, DEMANDS; normalizeSettings (camera in this build's unit, speed and intensities clamped, demand to the nearest level); MAX_INTENSITY 3; cameraInUnit; defaultSettings
- 427-445 isSavedSession, isSavedSettings
- 448-488 ImportResult; importFromFile (file input, cancel by event or by focus return)
- 490-515 readMapFile (binary frame: RoadDoc.fromBinary then toJSON; or older JSON); readImportedSession
- 517-615 isSerializedDoc: every node (unique id, finite coordinates, control, movements), every segment (ids, ends exist, type, section, structure, lanes, curve), relief, nature, terrain stamps, poles and spans, buildings list, people, economy; Sets of every id built
- 617-640 isJunctionControl, isSegmentDirection, isRecord, isFiniteNumber, MAX_STAMP_RADIUS, isId (safe integer > 0)
- 642-658 LargeStore; indexedDbStore; defaultParts (IndexedDB parts written through the save job port)
- 659-683 storeRequest (resolves on complete, null on error/abort, a failure to open warned), storeGet/storePut/storeDelete

## Contracts, state and data flow
- With IndexedDB a save writes only the squares that changed (chunkedSave.ts); the whole-text path is for no IndexedDB.
- Opening from parts validates the WHOLE document on the page (isSerializedDoc walks every node and segment and builds id Sets) before restoreInto, even though the parts were written by the game itself.

## Depends on / used by
- uses: world/doc, world/roadTypes, roadSection, structures, terrain, ecology, economy, buildings/serialize, rescale, units, chunkedSave TiledSaves, saveStore, saveBinary, jobs/jobPool jobPort; used by: main.ts (autosave, open, import), mapExport (withUnit)

## Problems found (finding IDs)
- F-0016 (suspected, S4): saveSession swallows the error of making the map's text
- F-0017 (suspected, S3): opening a saved city validates every node and segment on the page

## To check in other files
- chunkedSave TiledSaves.read: whether it already checks what it decodes (then the second walk here is redundant).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Window/requestIdleCallback : the callback in idle time, timeout forces it (lines 226-233)
- https://developer.mozilla.org/en-US/docs/Web/API/Storage/setItem : throws QuotaExceededError when full; replaces the key's value (lines 124, 136-146, 367-378)
- https://developer.mozilla.org/en-US/docs/Web/API/IDBTransaction/complete_event : fires when the transaction committed (lines 659-673)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/isSafeInteger : ids up to 2^53 - 1 (lines 637-640)
- https://web.dev/articles/storage-for-the-web : (redone research) localStorage synchronous and main-thread blocking: save() (line 94) reads and parses the small entry each call; the whole-text path (128-146) writes up to 2.4 M characters synchronously
- https://web.dev/articles/rail : (redone research) work in 50 ms chunks: the whole-document validation of an opened 10 km city (F-0017, 518-615) is one unbroken main-thread pass
