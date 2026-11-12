# src/desktopSaves.ts
Lines: 154
Summary: The desktop's saves: the autosave's stores as files in the Steam Auto-Cloud folder, kept by the shell's saves utility process over a MessagePort (get, write, batch, keys, marks); an older IndexedDB map copied once into an empty folder.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-32 imports; bridge, Request/Answer shapes, message names, CONNECT_MS 10 s, MIGRATED key, MIGRATE_CHUNK 32; DesktopStores
- 34-58 desktopSaves: null without the bridge; a lost writer fails what waits and tells listeners; ports handed in order
- 59-84 nextPort (patient for workers, timed for the page), open (the page's port, answers by id), call, written
- 86-107 ready (migration once); parts: get (the answers' Uint8Arrays wrapped in NEW Blobs: a copy), write (each Blob read back into a new Uint8Array: a copy), marks, writer.write (batches as they are)
- 108-116 store: get reads blob.text(), put/delete through parts; connectWorker
- 118-141 migrate: keys listed; an empty folder gets the IndexedDB map copied in chunks of 32 (each value read as bytes)
- 143-154 read: one IndexedDB request; failure resolves null (catch without a word at 149)

## Contracts, state and data flow
- Each get/put copies the data once more on the page (Uint8Array -> Blob -> text/arrayBuffer): opening a save of a 10 km city holds its squares twice transiently.

## Depends on / used by
- uses: editor/persistence, editor/saveStore, editor/workerParts; used by: main.ts (desktop persistence), the job workers' save ports

## Problems found (finding IDs)
- none confirmed here (the squares' path is judged in editor/persistence and chunkedSave)

## To check in other files
- editor/persistence and editor/chunkedSave: are whole maps read through store.get (text) or by squares through parts (Blob each)?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Blob/Blob : a Blob is the concatenation of its parts, its own snapshot (lines 94, 110)
- https://developer.mozilla.org/en-US/docs/Web/API/Blob/arrayBuffer : resolves with a new ArrayBuffer of the contents (lines 98, 133)
- https://github.com/electron/electron/blob/5cd65025c0d1523d22d81c8001d615fd7007f824/docs/api/message-port-main.md : (redone research) the saves process is reached over a port that transfers ports only: every square written is copied into it (bounded by what changed)
