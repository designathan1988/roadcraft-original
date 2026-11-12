# Findings

Heading (parsed by ledger.mjs): `### F-NNNN · status · S1-S4 · path:line — short title`, numbered F-0001, F-0002, ...
Statuses: suspected → confirmed | rejected (phase verify); confirmed → fixed | blocked (phase fix). A defect seen in the app test may start as `app:<screen>` and is traced to its code (path:line) before it is confirmed.
Lines: What:, Proof:, Effect:, Fix plan:, Check: (other file to look at), Evidence: (screenshot of an app-test defect), Source: (URLs opened with WebFetch for the decision, in phase verify, after `work F-NNNN`), Rejected because:, Blocker:, Tried:, Fix: (path:line of each change), Fix source: (URLs opened in phase fix for this fix, before editing), Verified by: (re-read path:a-b of the changed lines after the last edit).

### F-0001 · suspected · S3 · src/conflictTable.worker.ts:156 — the traffic's pairs wait for their disk write before going back
What: with `keep` set, the worker awaits keepDerivedMany (an IndexedDB write of every table of the batch) before posting the tables to the page.
Proof: conflictTable.worker.ts:156 `await keepDerivedMany(...)` precedes the postMessage at :157; conflictPool.ts:66 asks with keep whenever keepPrefix is set (:55).
Effect: every road build's conflict pairs reach the simulation only after the disk committed; the write is not needed for the answer.
Fix plan: post the tables first (copies kept for the write, or the write fed from a copy before transfer), then write.
Check: src/render/derivedCache.ts keepDerivedMany (does it copy before awaiting the transaction?)

### F-0002 · suspected · S4 · src/core/clipper.ts:134 — the Martinez kernel's error dropped unsaid
What: `catch {` with no binding: when polygon-clipping fails, its error is neither logged nor carried.
Proof: clipper.ts:134-138 catch without a variable, then rethrows Clipper2's error or runs Clipper2.
Effect: a geometry failure of the fallback kernel leaves no trace; the project forbids swallowed errors.
Fix plan: bind the error and say it (console.warn with the reason) before falling back.

### F-0003 · suspected · S3 · src/core/derivedCache.ts:147 — readDerivedAll loads every value of a prefix at once
What: getAll over a whole prefix range returns and clones every kept value together.
Proof: derivedCache.ts:146-150 getAllKeys + getAll(prefixRange(prefix)) with no count.
Effect: memory and time proportional to everything kept under that prefix (a large city's kept data) whenever it is called.
Fix plan: read only the keys wanted (readDerivedSome) or a cursor, depending on the callers.
Check: every caller of readDerivedAll.

### F-0004 · suspected · S4 · src/core/derivedCache.ts:41 — errors swallowed without a word
What: catch blocks with no binding at lines 41, 90, 107, 131, 154, 169, 189, 324, 359, 377 resolve empty or do nothing.
Proof: each `catch {` returns a default (undefined, empty set/map) or nothing.
Effect: a failing cache leaves no trace; the project forbids swallowed errors.
Fix plan: bind and warn with the reason, keeping the default.

### F-0005 · suspected · S3 · src/core/engine.ts:100 — every product refreshed each frame even when nothing moved
What: refresh(phase) computes `still` (no input moved since the phase's last refresh) but still calls every product's refresh(), timing each with two performance.now() reads.
Proof: engine.ts:97-99 compute still; :100-111 loop over every product unconditionally.
Effect: per-frame work proportional to the number of products whatever happened; a still view pays it every frame.
Fix plan: when the stamp covers every input, skip the phase's refreshes while still; otherwise make the stamp complete first.
Check: the stamp's source (who calls watch) and each product's inputs.

### F-0006 · suspected · S4 · src/core/engine.ts:4 — EngineInput is never used
What: a non-exported class whose static epoch is added to the stamp but never moved.
Proof: engine.ts:4-21 not exported; no `new EngineInput` in the file.
Effect: dead code; the stamp adds a constant 0.
Fix plan: remove it, or export and use it if the inputs need it.

### F-0007 · suspected · S2 · src/core/gpuTier.ts:9 — a mid-range RTX x060 starts on the ultra tier
What: every RTX whose last two digits are not 50 and whose series is not 20 maps to 'ultra': RTX 3060, 4060, 5060 are mid-range cards.
Proof: gpuTier.ts:9 `m[2] === '50' || m[1] === '20' ? 'high' : 'ultra'`; "RTX 3060" gives m[1]='30', m[2]='60' -> ultra.
Effect: the mission's mid-range PC opens on the heaviest settings (the owner's window showed Ultra selected), raising GPU and memory load. Research redone: in the Steam survey of September 2026 the RTX 5060, 5060 Ti, 4060, 3060, 4060 Laptop and 4060 Ti are among the ten most common GPUs (store.steampowered.com/hwsurvey/videocard): the x060 cards ARE the typical player's PC, and all of them (laptops included) start on ultra.
Fix plan: x060 cards to high (and decide x070 by the quality tiers' real costs).
Check: src/render/quality.ts tiers.

### F-0008 · suspected · S3 · src/core/health.ts:153 — the frame timer allocates a Map a frame and shifts its whole history each frame
What: begin() makes a new Map every frame; end() pushes a record and trims the oldest with Array.shift() while the history holds 30 s of frames.
Proof: health.ts:153 `this.current = new Map()`; :164-166 push then `while (...) this.frames.shift()`; at 60 Hz ~1,800 records are kept. Research redone: V8 left-trims large arrays on shift (codereview.chromium.org/2874453002), so the shift is not an O(history) copy; the cost is that every frame's Map and record survive 30 s, so all are promoted to the old generation (v8.dev/blog/trash-talk: survivors are what the scavenger pays for) and cleared only by major GCs.
Effect: per-frame old-generation garbage (a Map and a record a frame, ~1,800 alive), for a diagnostic.
Fix plan: a fixed ring of frame slots with reused per-system arrays (FrameSystem is a closed set), trimmed by index.
Check: main.ts (is the timer always on).

### F-0009 · suspected · S3 · src/core/offset.ts:129 — the offset's loop pruning tests every pair of segments
What: pruneSelfIntersections tests each segment against every later one (from the end down) with segSeg, which allocates vectors per call.
Proof: offset.ts:123-145 outer walk over i, inner loop j from m-2 down to i+2; a chain with no loop runs all of them: (m^2)/2 tests.
Effect: a road edge offset of m points costs O(m^2) allocations and tests; prune is on by default (line 57) for every offset.
Fix plan: test only segments whose boxes overlap (a sweep or a grid over the chain), and an allocation-free segment test.
Check: callers (offset chain lengths, how often run).

### F-0010 · suspected · S2 · src/core/profiler.ts:75 — the profiler records from the start, capturing stack traces on every build, upload and disposal
What: `private on = true` while its own comment says closed is the default; count() then captures and parses a stack trace for the first 48 events of every frame and every 16th after; onToggle switches the observers on at registration.
Proof: profiler.ts:75 `on = true`; :77 comment "closed, the default"; :141-155 count captures stackHere() (new Error().stack, 14 frames) and regex-parses it; :87-90 onToggle calls toggle(this.on) at once.
Effect: CPU and garbage on every frame that builds or uploads (opening a city, streaming cells, a camera move), in the shipped game, for a HUD nobody opened. Research redone: V8 collects frames at Error creation and formats them only when .stack is read (v8.dev/docs/stack-trace-api); stackHere reads .stack immediately, so each counted event pays capture and formatting.
Fix plan: start closed (`on = false`), so every method returns at once until the HUD opens it.
Check: main.ts (does anything set enabled at start; what the observers are).

### F-0011 · suspected · S3 · src/editor/blueprintLibrary.ts:54 — every photo lookup reads and parses the whole blueprint list, photos included
What: photos (PNG data URLs) are stored inside the blueprint list in localStorage; photoOf reads the list with getItem and JSON.parse on each call.
Proof: blueprintLibrary.ts:16-17 photo in StoredBlueprint; :49 setPhoto rewrites the whole list; :54 photoOf -> KeptList.entries -> stored() getItem + JSON.parse (keptList.ts:58-73); buildingsWiring.ts:483-485 calls photoOf once per id of a gallery.
Effect: opening a gallery parses the whole multi-megabyte string once per item, synchronously on the main thread; the photos also eat the 5 MiB localStorage quota the designs need.
Fix plan: parse the list once per request (one read for all ids) and keep photos apart from the bodies (their own keys or IndexedDB).
Check: ui/builder/workspace (when requestThumbnails runs).

### F-0012 · suspected · S3 · src/editor/cityInTiles.ts:20 — a new city's tile tables are cloned to the assembler instead of transferred
What: every job of the city's growth is posted with an empty transfer list; the 'assemble' ask carries every grown tile's building tables.
Proof: cityInTiles.ts:20 `write: () => ({ data: ask, transfer: [] })`; :50 the assemble ask `{ grown }` holds every TileGrown (cityGrowth.worker.ts:24 sent them back transferred).
Effect: making a new large city copies all its building tables once more through postMessage and holds both copies until the reply (memory peak and time of the opening of a new city).
Fix plan: pass the grown tiles' plain ArrayBuffers in the transfer list of the assemble job (they are not used on the page afterwards). Research redone: cloning costs ~10 ms per MB each way vs size-independent transfer (developer.chrome.com/blog/transferable-objects-lightning-fast, surma.dev/things/is-postmessage-slow); in the desktop build a job crossing to a utility process is copied anyway (Electron MessagePortMain transfers ports only), so there the right fix is to assemble where the tiles were grown or keep them in one process.
Check: editor/cityTiles.ts TileGrown (plain or shared buffers).

### F-0013 · suspected · S2 · src/editor/editRules.ts:66 — every road edit's rules solve the whole map's road heights from scratch
What: flatSolves.before() calls buildRoadElevation(before.net, FLAT_GROUND) with no previous solve; after() needs before(); deck() in overlapsAnother and grade() in tooSteep ask after().
Proof: editRules.ts:66 `buildRoadElevation(before.net, FLAT_GROUND)` (no third argument); :68 after() = buildRoadElevation(after.net, FLAT_GROUND, beforeSolve()); :57 deck() calls solves.after(); refuseRoadEdit runs for every commit and every dry run (commit.ts:146).
Effect: drawing or moving a road in a 10 km city solves every road's height of the map at each pause of the pointer (dry run) and at each click, if buildRoadElevation without a previous solve is whole-map.
Fix plan: keep the flat solve of the live network per its revision (or reuse the game's last solve), so before() is computed once per map change.
Check: world/elevation buildRoadElevation.

### F-0014 · suspected · S3 · src/editor/lotTool.ts:807 — the lot overlay's whole fill queue is re-sorted every frame while it drains
What: settleWindow copies every queued cell, computes its distance (a new rect per key) and sorts the lot, each frame, then fills only 2 ms of it.
Proof: lotTool.ts:806-813 `[...this.toFill].map(...).sort(...)` inside settleWindow, called from moveWindow (:784) in every overlay() frame; the comment at :761-762 gives ~20,000 cells from the Home view of the 10 km map.
Effect: O(n log n) work and garbage per frame for the whole time the window fills (many frames when n is in the thousands), on the page's thread during camera moves.
Fix plan: order the queue once when cells are queued (or keep a heap by distance) and drain it in order; re-order only when the view's centre moves to another cell.
Check: render/lotOverlay.ts and main.ts (when the faint zones are on).

### F-0015 · suspected · S4 · src/editor/lotTool.ts:941 — the gesture key is a joined string built every frame
What: refreshGesture builds a string of ~14 parts (coordinates formatted, the polygon's points) every overlay() call to learn nothing changed.
Proof: lotTool.ts:941-945; overlay() calls it each frame (:682).
Effect: per-frame string garbage while the zones are shown.
Fix plan: compare the few inputs directly (a dirty flag set by down/move/up and the settings/zoom/hover/lotsSeen/proposalKey numbers).

### F-0016 · suspected · S4 · src/editor/persistence.ts:132 — the error of making the map's text is swallowed
What: `catch {` with no binding around the map's serialisation: the save fails with no reason said.
Proof: persistence.ts:129-135 `try { ... } catch { this.onSaveFailed?.(); return false; }`.
Effect: a failing whole-text save leaves no trace; the project forbids swallowed errors.
Fix plan: bind the error and log it before onSaveFailed.

### F-0017 · suspected · S3 · src/editor/persistence.ts:191 — opening a city saved in parts validates its whole document on the page
What: the document read from the parts goes through isSavedSession -> isSerializedDoc, which walks every node and segment (and stamps, poles, spans) and builds Sets of every id, on the page, before restoreInto.
Proof: persistence.ts:190-191 `isSavedSession(session)`; :427-430 calls isSerializedDoc; :518-615 the full walk.
Effect: opening a 10 km city spends a whole-map walk and transient id Sets on the main thread for data the game wrote itself.
Fix plan: check the parts where they are decoded (TiledSaves.read / the save worker) or only the session's shape here; keep the full check for imported files and localStorage text.
Check: editor/chunkedSave TiledSaves.read.

### F-0018 · suspected · S4 · src/editor/roadParking.ts:12 — storage errors dropped unsaid
What: two `catch {` blocks with no binding: the preset's read and write failures leave no trace.
Proof: roadParking.ts:12-14 and :24-26; the same in editor/snap.ts:53-55 and :68-70.
Effect: the project forbids swallowed errors; no performance effect.
Fix plan: bind and warn with the reason, keeping the default.

### F-0019 · suspected · S3 · src/editor/roadTool.ts:412 — every economy entry re-runs the resting draft's dry run
What: mapAround moves the draft's key on any diary entry of kind 'economy' (or without rects), wherever it is; a new key makes verdict() judge again after 120 ms, i.e. a full commitRoadPath dry run (fork, rebuilds, edit rules, two road-value sums, stations).
Proof: roadTool.ts:412 `if (e.kind === 'economy' || e.rects === null || ...) return ++this.mapSerial`; :359-366 a new key re-judges; :426 commitRoadPath dryRun.
Effect: with the city's clock running, if the balance is written on a schedule, a draft held still is judged again at that rate: whole-map work (F-0013) repeated with nothing near it changed.
Fix plan: key the dry run on the balance only through whether the cost is affordable (re-judge on a balance change only when the last verdict was 'funds' or the balance crossed the cost), not on every economy entry.
Check: world/economy and the simulation's writes of the balance (how often).

### F-0020 · suspected · S3 · src/editor/saveLayers.ts:175 — every item of the saved lists (the trees) is held in two WeakMaps for the session
What: ListState keeps `ords` and `square` WeakMaps keyed by each list item object; placeInOrder sets an entry for every item and walks the whole list whenever the kind changed.
Proof: saveLayers.ts:175-176 two WeakMaps per list; :191-221 placeInOrder walks `list` whole and sets ords for each new item; LIST_NAMES includes 'trees' (:32).
Effect: for a city with hundreds of thousands of trees, two ephemeron entries per tree in memory, visited by the main thread at each major GC (V8's marking workers bail out on weak collections), and an O(list) walk per save that touches trees.
Fix plan: give list items a stable numeric order and square in typed columns (or key the order by id), removing the per-object WeakMaps; walk only the changed rects' items.
Check: how many trees a generated 10 km city holds; chunkedSave's use of ListState.

### F-0021 · suspected · S2 · src/editor/squaresDecode.ts:193 — opening a saved city copies every square's table twice, both copies held at once
What: each square's table section is sliced into a buffer of its own and kept until every square is read; then `joined` copies each into shared memory with tableIn (allocate + set).
Proof: squaresDecode.ts:193 `new RecordTable(value.table.slice().buffer)` kept in tableRead; :132 `tableIn(table.buffer)`; recordTable.ts:36-40 tableIn allocates and copies; the comment at :98 gives 687 MB of building tables for the 10 km city.
Effect: ~2x the city's tables (1.4 GB+ for buildings alone) held at once in the read worker at every opening, plus the time of two full copies.
Fix plan: copy each square's table section straight into shared memory once (allocate shared, set from the subarray) when it is read, and build the RecordTable over that; drop the intermediate slice.
Check: squaresRead.worker (page worker or process); chunkedSave readSquares (all blobs held at once?).
