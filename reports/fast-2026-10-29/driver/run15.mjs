// THE ONE RUN (docs: the owner's task of 2026-10-29, "achar as causas"): every JS thread of the game profiled for the WHOLE run at once
// (V8 CPU sampling every 200 us + sampling heap profiler keeping only what is still alive at the end), the route below played without a
// pause, each segment a time mark (performance.mark on the page + wall clock in marks.json); the profiles are cut by the marks later
// (analyse.mjs). Nothing measured apart, nothing repeated. Output: reports/fast-2026-10-29/raw/.
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync, readdirSync, statSync, copyFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const RAW = join(ROOT, 'raw'); const SHOTS = join(ROOT, 'shots');
for (const d of [RAW, SHOTS, join(RAW, 'profiles')]) mkdirSync(d, { recursive: true });
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const T0 = Date.now();
const marks = [];
const log = (...a) => console.log(`[${((Date.now() - T0) / 1000).toFixed(0)} s]`, ...a);

// ---- every thread's inspector -------------------------------------------------------------------------------------------------
async function inspector(url) {
  const ws = new WebSocket(url);
  await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = () => fail(new Error(`ws ${url}`)); });
  let id = 0; const waiting = new Map(); const listeners = [];
  ws.onmessage = (e) => { const m = JSON.parse(e.data); if (m.id && waiting.has(m.id)) { const w = waiting.get(m.id); waiting.delete(m.id); m.error ? w.fail(new Error(`${w.method}: ${m.error.message}`)) : w.ok(m.result); } else for (const l of listeners) l(m); };
  const call = (method, params = {}, sessionId) => new Promise((ok, fail) => { const i = ++id; waiting.set(i, { ok, fail, method }); ws.send(JSON.stringify({ id: i, method, params, ...(sessionId ? { sessionId } : {}) })); });
  return { call, on: (l) => listeners.push(l) };
}
const threads = []; const failures = [];
async function startThread(t) {
  try {
    await t.call('Profiler.enable'); await t.call('Profiler.setSamplingInterval', { interval: 200 }); await t.call('Profiler.start');
    await t.call('HeapProfiler.enable'); await t.call('HeapProfiler.startSampling', { samplingInterval: 65536 });
    t.wallStart = Date.now(); threads.push(t);
  } catch (e) { failures.push({ thread: t.name, error: String(e) }); }
}
// The opening measured is the 10 km city opened from its save at the page's start (the boot): the page loaded again here, then every
// thread attached at once. (generateCity over a 10 km city already opened doubles the memory: the renderer died of OOM four times.)
const reloadWall = Date.now();
{ const { spawn } = await import('node:child_process'); const { openSync } = await import('node:fs');
  const out = openSync(join(ROOT, 'logs', 'desktop-dev.log'), 'a');
  spawn('npm', ['run', 'desktop:dev'], { cwd: join(ROOT, '..', '..'), env: { ...process.env, NODE_OPTIONS: '--inspect=127.0.0.1:0', ROADCRAFT_LOOK: '1', ROADCRAFT_LOOK_SHOWN: '1' }, stdio: ['ignore', out, out], shell: true, detached: true }).unref(); }
for (;;) { try { const l = await (await fetch('http://127.0.0.1:9333/json/list')).json(); if (l.some((x) => x.type === 'page' && x.url.startsWith('http://127.0.0.1:5300'))) break; } catch { /* not up yet */ } await sleep(100); }
const list = await (await fetch('http://127.0.0.1:9333/json/list')).json();
const pageTarget = list.find((x) => x.type === 'page' && x.url.startsWith('http://127.0.0.1:5300'));
const pageI = await inspector(pageTarget.webSocketDebuggerUrl);
// Workers made later (the city's opening makes some) are attached and profiled as they come.
pageI.on((m) => {
  if (m.method !== 'Target.attachedToTarget') return;
  const s = m.params.sessionId;
  pageI.call('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: false, flatten: true }, s).catch(() => {});
  void startThread({ name: `worker:${m.params.targetInfo.url.replace(/^.*\/src\//, '').replace(/\?.*$/, '')}:${s.slice(0, 6)}`, call: (method, p) => pageI.call(method, p, s) }).then(() => pageI.call('Runtime.runIfWaitingForDebugger', {}, s).catch(() => {}));
});
await startThread({ name: 'page', call: (m, p) => pageI.call(m, p) });
await pageI.call('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: false, flatten: true });
const portsNow = () => execSync(`powershell -NoProfile -Command "$e=(Get-CimInstance Win32_Process -Filter \\"Name='electron.exe'\\" | Where-Object { $_.CommandLine -match 'node.mojom.NodeService' }).ProcessId; Get-NetTCPConnection -State Listen | Where-Object { $e -contains $_.OwningProcess } | ForEach-Object { '' + $_.OwningProcess + ':' + $_.LocalPort }"`).toString().trim().split(/\s+/).filter(Boolean);
const seenPorts = new Set();
async function attachJobs() { for (const pp of portsNow()) { if (seenPorts.has(pp)) continue; seenPorts.add(pp); await attachJob(pp); } }
async function attachJob(pp) {
  const [pid, port] = pp.split(':');
  try {
    const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const proc = await inspector(targets[0].webSocketDebuggerUrl);
    await startThread({ name: `job-process:${pid}`, call: (m, p) => proc.call(m, p) });
    let id = 0; const waiting = new Map();
    proc.on((m) => {
      if (m.method === 'NodeWorker.attachedToWorker') {
        const s = m.params.sessionId; const info = m.params.workerInfo;
        void startThread({ name: `job-thread:${pid}:${(info.title || info.url || '').replace(/^.*[\\/]/, '').slice(0, 40)}:${s.slice(0, 6)}`, call: (method, params = {}) => new Promise((ok, fail) => { const i = ++id; waiting.set(`${s}:${i}`, { ok, fail }); proc.call('NodeWorker.sendMessageToWorker', { sessionId: s, message: JSON.stringify({ id: i, method, params }) }).catch(fail); }) });
      }
      if (m.method === 'NodeWorker.receivedMessageFromWorker') {
        const inner = JSON.parse(m.params.message); const k = `${m.params.sessionId}:${inner.id}`;
        if (inner.id && waiting.has(k)) { const w = waiting.get(k); waiting.delete(k); inner.error ? w.fail(new Error(inner.error.message)) : w.ok(inner.result); }
      }
    });
    await proc.call('NodeWorker.enable', { waitForDebuggerOnStart: false });
  } catch (e) { failures.push({ pid, port, error: String(e) }); }
}
// The job utility processes start with the page: attached now and every 3 s for the first 90 s, as each appears.
await attachJobs();
const jobPoll = setInterval(() => { if (Date.now() - reloadWall < 90000) void attachJobs().catch(() => {}); else clearInterval(jobPoll); }, 3000);
await sleep(1500);
log(`profiling ${threads.length} threads so far (${failures.length} failures)`);

// ---- the game, real input --------------------------------------------------------------------------------------------------
let page = null; let cdp = null;
const rawEval = async (expr) => { const r = await pageI.call('Runtime.evaluate', { expression: expr, returnByValue: true }); return r.result?.value; };
async function mark(name) { const t = await rawEval(`(performance.mark('run:${name}'), performance.now())`).catch(() => null); marks.push({ name, wall: Date.now(), pageNow: t }); log(`mark ${name}`); }
const frames = (since) => page.evaluate((s) => { const f = window.__frames(s); return { frames: f.frames, long: f.long, total: f.total, systems: f.systems }; }, since);
const now = () => page.evaluate(() => performance.now());
async function segment(name, act) {
  const t0 = await now(); await mark(`${name}:start`);
  const g0 = await page.evaluate(() => { window.__gpu(true); return 0; });
  await act();
  const t1 = await now(); await mark(`${name}:end`);
  const f = await frames(t0); const g = await page.evaluate(() => window.__gpu(false));
  const u = await page.evaluate(() => { const r = window.__roadcraft; const s = r.scene().stats; return { draws: s.drawCalls, tris: s.drawnTriangles, detailMB: r.usage().buildingDetailMB, heapMB: Math.round(performance.memory.usedJSHeapSize / 1e6) }; });
  const row = { name, ms: Math.round(t1 - t0), ...f, gpu: g, ...u, g0 };
  segments.push(row);
  log(`${name}: frames ${f.frames} >50 ${f.long} cpu p50 ${f.total?.p50} max ${f.total?.max} | gpu p50 ${g.p50} | draws ${u.draws} tris ${u.tris} | detail ${u.detailMB} MB | heap ${u.heapMB} MB`);
}
const segments = [];
const shot = (name) => page.screenshot({ path: join(SHOTS, `${name}.png`), type: 'png', timeout: 60000 }).catch((e) => log(`photo ${name} failed: ${e.message}`));
let C = { x: 960, y: 496 };
const send = (m, p) => cdp.send(m, p);
async function drag(button, a, b, ms, steps = 60) { const bs = button === 'left' ? 1 : button === 'right' ? 2 : 4; await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: a.x, y: a.y }); await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: a.x, y: a.y, button, buttons: bs, clickCount: 1 }); for (let i = 1; i <= steps; i++) { await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: a.x + ((b.x - a.x) * i) / steps, y: a.y + ((b.y - a.y) * i) / steps, button, buttons: bs }); await sleep(ms / steps); } await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: b.x, y: b.y, button, buttons: 0, clickCount: 1 }); }
async function click(at, mods = 0) { await send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: at.x, y: at.y }); await send('Input.dispatchMouseEvent', { type: 'mousePressed', x: at.x, y: at.y, button: 'left', buttons: 1, clickCount: 1, modifiers: mods }); await send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: at.x, y: at.y, button: 'left', buttons: 0, clickCount: 1, modifiers: mods }); await sleep(150); }
async function key(k, code, mods = 0) { const vk = { Escape: 27, PageUp: 33, PageDown: 34, Home: 36 }[code] ?? (k.length === 1 ? k.toUpperCase().charCodeAt(0) : 0); await send('Input.dispatchKeyEvent', { type: 'keyDown', key: k, code, windowsVirtualKeyCode: vk, modifiers: mods, ...(k.length === 1 ? { text: k } : {}) }); await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk, modifiers: mods }); await sleep(150); }
async function hold(k, code, ms) { const vk = { PageUp: 33, PageDown: 34 }[code] ?? 0; await send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key: k, code, windowsVirtualKeyCode: vk }); await sleep(ms); await send('Input.dispatchKeyEvent', { type: 'keyUp', key: k, code, windowsVirtualKeyCode: vk }); }
async function wheel(dy, n, gap) { for (let i = 0; i < n; i++) { await send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: C.x, y: C.y, deltaX: 0, deltaY: dy }); await sleep(gap); } }
async function clickLabel(label) { const b = await page.evaluate((l) => { const sp = /^speed:(\d)$/.exec(l); const e = sp ? document.querySelector(`button[data-speed="${sp[1]}"]`) : [...document.querySelectorAll('button,[role=tab]')].find((x) => x.offsetParent && (x.getAttribute('aria-label') || x.title || x.textContent).trim().startsWith(l)); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, label); if (!b) { log(`no button ${label}`); return false; } await click(b); return true; }
const rad = (d) => (d * Math.PI) / 180;
const view = (x, y, zoom, el = 55, az = 0) => page.evaluate((a) => window.__roadcraft.setView(a), { x, y, zoom, azimuth: rad(az), elevation: rad(el) });
async function settled(max = 6000) { const t = Date.now(); while (Date.now() - t < max) { const b = await page.evaluate(() => window.__roadcraft.scene().opening || window.__roadcraft.scene().worldBusy); if (!b) return Date.now() - t; await sleep(200); } return null; }
const counts = () => page.evaluate(() => { const c = window.__roadcraft.inventory().counts.doc; return { nodes: c.nodes, segments: c.segments, buildings: c.buildings, lots: c.lots }; });

// 1. the 10 km city opened from its save (the boot), until the opening is shown and the world settled
marks.push({ name: 'open:start (page reloaded)', wall: reloadWall, pageNow: 0 });
// During the opening the page's live memory (sampling heap profile) is saved every 10 s and its CPU profile in 15 s pieces, so that a page
// that dies of OOM leaves its last picture of who holds the memory (the profile of a dead page cannot be read).
const pageT = threads.find((t) => t.name === 'page');
let piece = 0; let lastHeap = Date.now(); let lastCpu = Date.now();
for (;;) {
  const s2 = await Promise.race([rawEval(`({ shown: performance.getEntriesByName('opening:shown').length > 0, b: window.__roadcraft ? window.__roadcraft.scene().worldBusy : true, heap: Math.round(performance.memory.usedJSHeapSize / 1e6) })`), sleep(20000).then(() => ({ shown: false, slow: true }))]).catch(() => ({ shown: false, dead: true })) ?? { shown: false };
  if (s2.shown && !s2.b) break;
  if (Date.now() - lastHeap > 10000 && pageT) { lastHeap = Date.now(); try { const hp = await pageT.call('HeapProfiler.getSamplingProfile'); writeFileSync(join(RAW, 'profiles', `page-open-live-${String(piece).padStart(2, '0')}.heapprofile`), JSON.stringify(hp.profile)); log(`open: live heap picture ${piece} saved (page heap ${s2.heap} MB)`); } catch (e) { log(`open: heap picture failed ${e.message}`); } }
  if (Date.now() - lastCpu > 15000 && pageT) { lastCpu = Date.now(); try { const { profile } = await pageT.call('Profiler.stop'); writeFileSync(join(RAW, 'profiles', `page-open-cpu-${String(piece).padStart(2, '0')}.cpuprofile`), JSON.stringify({ ...profile, wallEnd: Date.now() })); await pageT.call('Profiler.start'); pageT.wallStart = Date.now(); piece++; } catch (e) { log(`open: cpu piece failed ${e.message}`); } }
  if (s2.dead) { log('open: the page is gone'); break; }
  if (Date.now() - T0 > 600000) { log('open: timeout'); break; }
  await sleep(500);
}
await mark('open:end');
const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
page = browser.contexts().flatMap((c) => c.pages()).find((p) => p.url().startsWith('http://'));
cdp = await page.context().newCDPSession(page);
page.on('dialog', (d) => d.dismiss().catch(() => {}));
{ const w = await page.evaluate(() => [innerWidth, innerHeight]); C = { x: Math.round(w[0] / 2), y: Math.round(w[1] / 2) }; }
const openMarks = await page.evaluate(() => performance.getEntriesByType('mark').filter((m) => !m.name.startsWith('run:')).map((m) => [m.name, Math.round(m.startTime)]));
log(`opened: ${openMarks.map((m) => m.join('@')).join(' ')}`);
if (await page.evaluate(() => [...document.querySelectorAll('button')].some((b) => b.textContent.trim() === 'Continuar' && b.offsetParent))) await clickLabel('Continuar');
const b = await page.evaluate(() => window.__roadcraft.bounds());
const cx = (b.minX + b.maxX) / 2; const cy = (b.minY + b.maxY) / 2;

// 2. still, 10 s each view, a photo each
for (const [name, zoom, el] of [['still-street', 8, 55], ['still-district-low20', 1.5, 20], ['still-district-55', 1.5, 55], ['still-far', 0.8, 55], ['still-whole-city', 0.45, 55]]) {
  await view(cx, cy, zoom, el); await settled();
  await segment(name, () => sleep(10000)); await shot(name);
}
// 3. moving at the district zoom, 10 s each; photos every 500 ms in the zoom out and in
async function seq(name, act) { let go = true; let i = 0; const loop = (async () => { while (go) { const t = Date.now(); await shot(`${name}/${String(i++).padStart(3, '0')}`); const w = 500 - (Date.now() - t); if (w > 0) await sleep(w); } })(); await act(); go = false; await loop; }
await view(cx, cy, 1.5); await settled();
await segment('move-pan-drag', () => drag('middle', { x: C.x - 300, y: C.y }, { x: C.x + 300, y: C.y }, 10000, 200));
await view(cx, cy, 1.5); await settled();
await segment('move-orbit', () => drag('right', { x: C.x - 500, y: C.y }, { x: C.x + 500, y: C.y }, 10000, 200));
await view(cx, cy, 8); await settled();
await segment('move-zoom-out-street-to-city', () => seq('seq-zoom-out', () => wheel(100, 100, 100)));
await segment('move-zoom-in-back', () => seq('seq-zoom-in', () => wheel(-100, 100, 100)));
await view(cx, cy, 1.5); await settled();
await segment('move-tilt', async () => { await hold('PageUp', 'PageUp', 5000); await hold('PageDown', 'PageDown', 5000); });
// 4. simulation
await view(cx, cy, 1.5); await settled();
await clickLabel('speed:0'); await segment('sim-paused', () => sleep(10000));
await clickLabel('speed:4'); await segment('sim-4x', () => sleep(10000));
await clickLabel('speed:1');
// 5. edits at open land past the roads (x 8,600 m), each timed until settled, its largest frame
await view(8600, 0, 2.5); await settled();
async function edit(name, act) {
  const before = await counts(); const t0 = await now(); await mark(`${name}:start`);
  await act(); const acted = await now(); const s = await settled(60000); const t1 = await now(); await mark(`${name}:end`);
  const f = await frames(t0); const after = await counts();
  const row = { name, actMs: Math.round(acted - t0), settledAfterMs: s, totalMs: Math.round(t1 - t0), frames: f.frames, long: f.long, maxFrame: f.total?.max, before, after };
  segments.push(row); await shot(name);
  log(`${name}: ${row.totalMs} ms, largest frame ${row.maxFrame} ms | ${JSON.stringify(before)} -> ${JSON.stringify(after)}`);
}
await edit('edit-road', async () => { await key('1', 'Digit1'); await drag('left', { x: C.x - 250, y: C.y - 80 }, { x: C.x + 250, y: C.y - 80 }, 700, 40); await sleep(800); await key('Escape', 'Escape'); });
await edit('edit-zone', async () => { await key('z', 'KeyZ'); await drag('left', { x: C.x - 240, y: C.y - 55 }, { x: C.x + 240, y: C.y - 55 }, 900, 40); await sleep(1500); await key('Escape', 'Escape'); await key('Escape', 'Escape'); });
await edit('edit-building', async () => { await key('h', 'KeyH'); await sleep(1000); await clickLabel('Modelos'); await clickLabel('Torre residencial'); await sleep(600); await click({ x: C.x + 150, y: C.y + 60 }); await sleep(2000); await key('Escape', 'Escape'); await key('Escape', 'Escape'); });
await view(cx, cy, 3.5); await settled();
await edit('edit-demolish', async () => { await key('b', 'KeyB'); await click(C); await sleep(1500); await key('Escape', 'Escape'); await key('Escape', 'Escape'); });
// 6. the save
const savesDir = join(process.env.APPDATA, 'Roadcraft', 'saves');
const dirBytes = () => { let n = 0; const walk = (d) => { for (const f of readdirSync(d)) { const p = join(d, f); const s = statSync(p); if (s.isDirectory()) walk(p); else n += s.size; } }; walk(savesDir); return n; };
const bytes0 = dirBytes(); await mark('save:start'); const s0 = Date.now();
await page.evaluate(() => window.__roadcraft.saved()); const saveMs = Date.now() - s0; await mark('save:end');
await sleep(3000); const bytes1 = dirBytes();
log(`save ${saveMs} ms; saves folder ${bytes0} -> ${bytes1} bytes`);

// ---- stop and save every profile ---------------------------------------------------------------------------------------------
await mark('profiles:stop');
const saved = [];
for (const t of threads) {
  const file = t.name.replace(/[^a-zA-Z0-9._-]+/g, '_');
  try {
    const { profile } = await t.call('Profiler.stop'); writeFileSync(join(RAW, 'profiles', `${file}.cpuprofile`), JSON.stringify(profile));
    const hp = await t.call('HeapProfiler.getSamplingProfile'); await t.call('HeapProfiler.stopSampling'); writeFileSync(join(RAW, 'profiles', `${file}.heapprofile`), JSON.stringify(hp.profile));
    saved.push({ name: t.name, file, wallStart: t.wallStart });
  } catch (e) { failures.push({ thread: t.name, stop: String(e) }); }
}
// F7 at the street and the district: the Diagnosis (its .md/.json from lab-reports/) and the video memory by owner.
const REPORTS = join(ROOT, '..', '..', 'lab-reports');
const gpuBook = async (where) => page.evaluate(async () => { const { gpuLedger } = await import('/src/render/gpuLedger.ts'); const byClass = {}; for (const e of gpuLedger.entries()) { const r = byClass[e.cls] ?? (byClass[e.cls] = { bytes: 0, triangles: 0, owners: 0 }); r.bytes += e.bytes; r.triangles += e.triangles; r.owners++; } const m = window.__roadcraft.memory(); return { ledgerMB: Math.round(gpuLedger.bytes() / 1e6), byClass, gpuByName: m.gpuByName, textureByName: m.textureByName, targetMB: m.targetMB, geometryMB: m.geometryMB, textureMB: m.textureMB }; }).then((r) => ({ where, ...r })).catch((e) => ({ where, error: String(e) }));
const books = [];
for (const [where, zoom] of [['street', 8], ['district', 1.5]]) {
  await view(cx, cy, zoom); await settled();
  books.push(await gpuBook(where));
  const before = Date.now(); await mark(`f7-${where}:start`);
  await key('F7', 'F7'); await sleep(1200);
  await clickLabel('Diagnosis'); await sleep(800);
  if (!(await page.evaluate(() => [...document.querySelectorAll('button')].some((x) => x.offsetParent && x.textContent.trim().startsWith('Measuring'))))) await clickLabel('Measure now');
  for (let i = 0; i < 240; i++) { await sleep(500); const fresh = readdirSync(REPORTS).filter((f) => f.startsWith('diag-') && statSync(join(REPORTS, f)).mtimeMs > before); if (fresh.length >= 2) { for (const f of fresh) copyFileSync(join(REPORTS, f), join(RAW, `${where}-${f}`)); break; } }
  await shot(`f7-${where}`); await key('F7', 'F7'); await mark(`f7-${where}:end`);
}
writeFileSync(join(RAW, 'marks.json'), JSON.stringify({ T0, marks, openMarks, segments, saveMs, saveBytes: [bytes0, bytes1], books, threads: saved, failures }, null, 1));
log(`RUN DONE in ${Math.round((Date.now() - T0) / 1000)} s; ${saved.length} threads saved, ${failures.length} failures`);
process.exit(0);
