# src/editor/saveStore.ts
Lines: 157
Summary: The saves' IndexedDB store and its batches: PartStore (get, write put+remove+marks in one transaction, marks by prefix), the save batch of binary frames (transferred to the writer), gzip of the frames 32 at a time, the writer in the job system's save lane (portWriter) or in place, and the database 'roadcraft-saves'.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-23 imports; the contract; PartStore; SaveEntry (a plain ArrayBuffer, transferred), SaveBatch, batchBuffers (the transfer list), SaveWriter
- 25-33 gzip/gunzip of texts (old saves, read only)
- 35-47 GZIP_BATCH 32; writeBatch: frames compressed 32 at a time (packed ones) as Blobs, one store.write
- 49-50 storeWriter: in the asking thread
- 52-77 portWriter: one worker from the save lane, answers by id, every waiter failed on error/messageerror; the batch posted with its buffers transferred (a failure to post logged and answered false)
- 79-99 SAVES_DB, SAVES_STORE; openSaves once (null without IndexedDB, on error, or blocked; a throw logged)
- 101-118 indexedDbParts transact: one transaction, the result read on complete, null on error/abort (a throw logged); no durability option given (the browser's default)
- 119-128 get: one transaction, a request per key; a string value handed on as a Blob
- 129-138 write: put each Blob, marks as strings, deletes, in one readwrite transaction
- 139-154 marks: getAllKeys and getAll of a key range in one transaction
- 156 the trailing comment of the service's message type

## Contracts, state and data flow
- Each changed square is stored as its own Blob value (gzip-compressed); a whole map's first save is thousands of Blobs in one transaction.
- In a page worker the batch's buffers move without copy; in the desktop build the save lane is a utility-process thread, where the buffers are copied (MessagePortMain transfers ports only).
- Chromium writes values larger than a LevelDB page as files beside the database and Snappy-compresses them since 129; already-gzipped frames gain nothing from that second compression.

## Depends on / used by
- uses: editor/saveBinary gzipBytes, IndexedDB, Compression Streams; used by: save.worker, persistence (defaultParts, storeRequest), chunkedSave, tileStore

## Problems found (finding IDs)
- none confirmed

## To check in other files
- How many squares a 10 km city's first save writes, and whether Chromium keeps each Blob as a file (the comment at 132 says so; the Chrome doc read does not mention Blobs): thousands of small files per save if so.

## Sources
- https://developer.chrome.com/docs/chromium/indexeddb-storage-improvements : large values stored as files beside LevelDB, Snappy-compressed since Chrome 129, moved back when they shrink under a page (lines 39-47, 129-138)
- https://developer.chrome.com/blog/indexeddb-durability-mode-now-defaults-to-relaxed : relaxed is the default since Chrome 121, 3x-30x faster than strict (line 108: no durability option, so relaxed)
- https://developer.chrome.com/blog/transferable-objects-lightning-fast : transferred buffers cost no copy in a page worker (line 73)
