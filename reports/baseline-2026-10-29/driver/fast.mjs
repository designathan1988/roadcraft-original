// THE ONE FAST PASS (the owner, 2026-10-28 night: the whole measure in about ten minutes; the features, photos and numbers, not every
// street). On the 10 km city, the game window off-screen without focus (ROADCRAFT_LOOK_SHOWN). Each block once:
//   A camera: 5 zooms still 3 s + photo; at the district: min/max tilt, 4 directions, orthographic; 9 movements 4 s with a photo at
//     start and end; one zoom-out from street to the whole city. B simulation: 1x/pause/2x/4x 5 s each with the job pool and the page's
//     messages. C quality: low/medium/high at the district 3 s + photo, back to ultra. D GPU: F7 Diagnosis + Spector at the district
//     (item7.mjs bairro). E panels and tools (steps.mjs) with the CPU and heap profilers of every thread on (profile.mjs). F idle and
//     resize. Output: raw/fast.jsonl, shots/fast/.
import { execFileSync, execSync, spawn } from 'node:child_process';
// (the trace's socket and the snapshots' streams are opened in the camera block)
import { join } from 'node:path';
import { createWriteStream as fsWrite, mkdirSync as fsMkdir } from 'node:fs';
import { ROOT, connect, record, segmentStart, segmentEnd, shot, sleep, input, cameraNow, INSTALL_COUNTERS, windowState } from './lib.mjs';
import { makeMoves } from './moves.mjs';
import { slice } from './procSlice.mjs';

const D = join(ROOT, 'driver');
const T0 = Date.now();
const { page, cdp } = await connect();
await page.evaluate(INSTALL_COUNTERS);
const m = await makeMoves(page, cdp);
if (await page.evaluate(() => [...document.querySelectorAll('button')].some((b) => b.textContent.trim() === 'Continuar' && b.offsetParent))) await m.clickLabel('Continuar');
const win = (a) => execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${join(D, 'win.ps1')}" ${a}`).toString().trim();
const rad = (d) => (d * Math.PI) / 180;
async function seg(name, act, photoEnd = true) {
  const wall0 = Date.now();
  const st = await segmentStart(page);
  await act();
  const end = await segmentEnd(page, st);
  const wall1 = Date.now();
  const extra = await page.evaluate(() => { const u = window.__roadcraft.usage(); return { buildingDetailMB: u.buildingDetailMB, quality: window.__state().now.quality }; });
  const s = slice(wall0, wall1);
  const row = { name, wall0, wall1, camera: await cameraNow(page), ...extra, ...end, procs: s.procs, totalPrivateMB: s.totalPrivateMB, gpuUtil: s.gpuUtilMean, vram: s.gpuMemMiB };
  record('fast', row);
  if (photoEnd) await shot(page, `fast/${name}`);
  const f = end.frames;
  console.log(`${name}: frames ${f.frames} >50ms ${f.long} cpu p50 ${f.total?.p50} max ${f.total?.max} | gpu p50 ${end.gpu.p50} max ${end.gpu.max} | draws ${end.drawCalls} tris ${end.drawnTriangles} | progs +${end.programsAfter - end.programsBefore} | up ${(end.gl.uploadBytes / 1e6).toFixed(0)} MB | detail ${extra.buildingDetailMB} MB | all ${s.totalPrivateMB} MB`);
}
const go = (z, tilt = 55, dir = 0) => page.evaluate((a) => window.__roadcraft.setView(a), { x: m.centre.x, y: m.centre.y, zoom: { rua: 8, perto: 3.5, bairro: 1.5, longe: 0.8, cidade: 0.45 }[z], azimuth: rad(dir), elevation: rad(tilt) });
const settle = () => m.settle(4000);

const FROM = process.argv[2] ?? 'A';
const C = m.C;
const MOVES4 = {
  panSlow: () => input.drag(cdp, 'middle', { x: C.x - 200, y: C.y }, { x: C.x + 200, y: C.y }, 4000, 120),
  panFast: async () => { for (let i = 0; i < 3; i++) { const d = i % 2 ? -1 : 1; await input.drag(cdp, 'middle', { x: C.x - 600 * d, y: C.y }, { x: C.x + 600 * d, y: C.y }, 900, 25); await sleep(200); } },
  panKeys: () => input.hold(cdp, 'w', 'KeyW', 4000),
  orbit: () => input.drag(cdp, 'right', { x: C.x - 400, y: C.y }, { x: C.x + 400, y: C.y }, 4000, 120),
  zoomIn: () => input.wheel(cdp, C, -100, 40, 100),
  zoomOut: () => input.wheel(cdp, C, 100, 40, 100),
  tilt: async () => { await input.hold(cdp, 'PageUp', 'PageUp', 2000); await input.hold(cdp, 'PageDown', 'PageDown', 2000); },
  turn90: async () => { for (let i = 0; i < 3; i++) { await input.press(cdp, i % 2 ? 'E' : 'Q', i % 2 ? 'KeyE' : 'KeyQ', 8); await sleep(1300); } },
  homeCentreReset: async () => { await input.press(cdp, 'Home', 'Home'); await sleep(1500); await m.clickLabel('Câmera'); await m.clickLabel('Enquadrar a câmera'); await sleep(1300); await m.clickLabel('Norte para cima'); await input.press(cdp, 'Escape', 'Escape'); await sleep(1000); },
};
// Item 9 / MemLab: heap snapshots of the page before, after 1 and after 3 laps of the short district route (pan, orbit, zoom in/out).
fsMkdir(join(ROOT, 'raw', 'heapsnapshots'), { recursive: true });
async function snap(name) { const f = join(ROOT, 'raw', 'heapsnapshots', `ten-${name}.heapsnapshot`); const w = fsWrite(f); const on = (e) => w.write(e.chunk); cdp.on('HeapProfiler.addHeapSnapshotChunk', on); const t = Date.now(); await cdp.send('HeapProfiler.enable'); await cdp.send('HeapProfiler.takeHeapSnapshot', { reportProgress: false }); cdp.off('HeapProfiler.addHeapSnapshotChunk', on); await new Promise((r) => w.end(r)); record('fast', { name: `heap-snapshot-${name}`, ms: Date.now() - t }); console.log(`snapshot ${name} ${Date.now() - t} ms`); }
const lap = async (i) => { await go('bairro'); await settle(); for (const k of ['panFast', 'orbit', 'zoomIn', 'zoomOut']) await MOVES4[k](); await sleep(2000); const s = slice(Date.now() - 3000, Date.now()); const heap = await page.evaluate(() => Math.round(performance.memory.usedJSHeapSize / 1e5) / 10); record('fast', { name: `lap-${i}`, heapMB: heap, totalPrivateMB: s.totalPrivateMB, procs: s.procs, vram: s.gpuMemMiB }); console.log(`lap ${i}: heap ${heap} MB, all ${s.totalPrivateMB} MB, vram ${s.gpuMemMiB}`); };
if (FROM === 'A') {
// A camera
for (const z of ['rua', 'perto', 'bairro', 'longe', 'cidade']) { await go(z); await settle(); await seg(`A-still-${z}`, () => sleep(3000)); }
for (const [n, t, d] of [['min-N', 20, 0], ['max-N', 90, 0], ['mid-E', 55, 90], ['mid-S', 55, 180], ['mid-W', 55, 270]]) { await go('bairro', t, d); await settle(); await seg(`A-bairro-${n}`, () => sleep(3000)); }
await m.clickLabel('Câmera'); await m.clickLabel('Câmera em perspectiva'); await input.press(cdp, 'Escape', 'Escape');
await go('bairro'); await settle(); await seg('A-bairro-ortho', () => sleep(3000));
await m.clickLabel('Câmera'); await m.clickLabel('Câmera em perspectiva'); await input.press(cdp, 'Escape', 'Escape');
// The Chrome trace (item 8) over the movement block: started on the browser target, stopped after it (trace-ten-moves.json).
const { createWriteStream, mkdirSync } = await import('node:fs');
const bw = new WebSocket((await (await fetch('http://127.0.0.1:9333/json/version')).json()).webSocketDebuggerUrl);
await new Promise((ok) => { bw.onopen = ok; });
let bid = 0; const bwait = new Map(); let traceDone = null;
bw.onmessage = (e) => { const x = JSON.parse(e.data); if (x.id && bwait.has(x.id)) { bwait.get(x.id)(x.result ?? x.error); bwait.delete(x.id); } if (x.method === 'Tracing.tracingComplete') traceDone?.(x.params); };
const bcall = (method, params = {}) => new Promise((r) => { const i = ++bid; bwait.set(i, r); bw.send(JSON.stringify({ id: i, method, params })); });
const traced = new Promise((r) => { traceDone = r; });
await bcall('Tracing.start', { transferMode: 'ReturnAsStream', traceConfig: { recordMode: 'recordContinuously', includedCategories: ['devtools.timeline', 'disabled-by-default-devtools.timeline', 'disabled-by-default-devtools.timeline.frame', 'blink.user_timing', 'v8', 'disabled-by-default-v8.gc', 'gpu', 'toplevel'] } });
for (const [n, act] of Object.entries(MOVES4)) { await go('bairro'); await settle(); await shot(page, `fast/A-move-${n}-start`); await seg(`A-move-${n}`, act); }
await go('rua'); await settle(); await seg('A-move-zoomOut-street-to-city', () => input.wheel(cdp, C, 100, 60, 100));
await bcall('Tracing.end');
{ const { stream } = await traced; const out = createWriteStream(join(ROOT, 'raw', 'trace-ten-moves.json')); for (;;) { const c = await bcall('IO.read', { handle: stream, size: 4 << 20 }); out.write(c.base64Encoded ? Buffer.from(c.data, 'base64') : c.data); if (c.eof) break; } await new Promise((r) => out.end(r)); record('fast', { name: 'A-trace', file: 'raw/trace-ten-moves.json' }); console.log('trace saved'); }
}
// The heap snapshots killed the 10 km page (renderer OOM, 2026-10-28T23:54Z): the laps run without them, memory read at each lap's end.
if (FROM === 'A' || FROM === 'L') { await lap(1); await lap(2); await lap(3); }

// B simulation (camera still at the district): the page's messages counted from outside (item10.mjs's wrapper)
await go('bairro'); await settle();
await page.evaluate(() => {
  if (window.__msg) return;
  const c = window.__msg = { out: 0, outBytes: 0 };
  const size = (v, depth) => { if (!v || typeof v !== 'object' || depth > 2) return 0; if (ArrayBuffer.isView(v) || v instanceof ArrayBuffer) return v.byteLength; let s = 0; for (const k in v) { try { s += size(v[k], depth + 1); } catch { /* getter */ } } return s; };
  for (const P of [Worker.prototype, MessagePort.prototype]) { const f = P.postMessage; P.postMessage = function (message) { c.out++; c.outBytes += size(message, 0); return f.apply(this, arguments); }; }
});
// Item 6: every thread's CPU (100 us) and heap sampling over the whole simulation block (still at 1x, paused, 2x, 4x).
const profSim = spawn('node', [join(D, 'profile.mjs'), 'ten-still-paused-speeds', '30000', 'both'], { stdio: 'ignore' });
await sleep(3000);
for (const sp of ['1', 'pause', '2', '4']) {
  if (sp === 'pause') await m.clickLabel('Pausar'); else await m.clickLabel(`Velocidade da simulação ${sp}×`);
  await sleep(500);
  const before = await page.evaluate(() => { window.__msg.out = 0; window.__msg.outBytes = 0; return window.__roadcraft.jobPool().submitted; });
  await seg(`B-sim-${sp}`, () => sleep(5000), false);
  const sim = await page.evaluate((b) => { const r = window.__roadcraft; const j = r.jobPool(); return { stepMs: r.sim.stats?.stepMs ?? null, vehicles: r.sim.vehicles.size, people: r.sim.pedViews.length, workers: j.workers.length, busy: j.workers.filter((w) => w.running).length, waiting: j.waiting, jobsPerS: (j.submitted - b) / 5, msgsOutPerS: window.__msg.out / 5, msgBytesOutPerS: Math.round(window.__msg.outBytes / 5) }; }, before);
  record('fast', { name: `B-sim-${sp}-stats`, ...sim });
  console.log(`B-sim-${sp}: ${JSON.stringify(sim)}`);
}
await m.clickLabel('Velocidade da simulação 1×');
await new Promise((r) => profSim.on('exit', r));

// C quality presets (main menu "Gráficos")
async function quality(label) {
  await m.clickLabel('Menu');
  const box = await page.evaluate((l) => { const b = [...document.querySelectorAll('.v2-pop button')].find((x) => x.textContent.trim() === l && x.offsetParent); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, label);
  if (box) await input.click(cdp, box);
  await input.press(cdp, 'Escape', 'Escape'); await sleep(1500);
  return !!box;
}
for (const [k, l] of [['low', 'Baixa'], ['medium', 'Média'], ['high', 'Alta']]) { const ok = await quality(l); await go('bairro'); await settle(); await seg(`C-quality-${k}${ok ? '' : '-NOT-SET'}`, () => sleep(3000)); }
await quality('Ultra');
// Every graphics option value once at the district (the options dialog), back to its value before.
await go('bairro'); await settle();
await m.clickLabel('Menu'); await m.clickLabel('Opções gráficas'); await sleep(600);
const rows = await page.evaluate(() => [...document.querySelectorAll('.options-row')].map((r) => [r.querySelector('.options-name')?.textContent ?? '', [...r.querySelectorAll('button')].map((b) => [b.textContent.trim(), b.classList.contains('on')])]));
record('fast', { name: 'C-options-rows', rows });
for (const [row, buttons] of rows) {
  if (/Predefini|VSync|Sincronia/.test(row)) continue;
  const was = buttons.find((b) => b[1])?.[0];
  for (const [v] of buttons) {
    const box = await page.evaluate(([rl, val]) => { const r = [...document.querySelectorAll('.options-row')].find((x) => (x.querySelector('.options-name')?.textContent ?? '') === rl); const b = r && [...r.querySelectorAll('button')].find((x) => x.textContent.trim() === val); if (!b) return null; const q = b.getBoundingClientRect(); return { x: q.x + q.width / 2, y: q.y + q.height / 2 }; }, [row, v]);
    if (!box) continue;
    await input.click(cdp, box); await sleep(1200);
    await seg(`C-option-${row.replace(/[^A-Za-zÀ-ú]+/g, '_')}=${v.replace(/[^A-Za-z0-9À-ú]+/g, '_')}`, () => sleep(2000));
  }
  const back = await page.evaluate(([rl, val]) => { const r = [...document.querySelectorAll('.options-row')].find((x) => (x.querySelector('.options-name')?.textContent ?? '') === rl); const b = r && [...r.querySelectorAll('button')].find((x) => x.textContent.trim() === val); if (!b) return null; const q = b.getBoundingClientRect(); return { x: q.x + q.width / 2, y: q.y + q.height / 2 }; }, [row, was]);
  if (back) { await input.click(cdp, back); await sleep(800); }
}
await input.press(cdp, 'Escape', 'Escape');

// D GPU at the district: the F7 Diagnosis and one Spector frame
try { console.log(execFileSync('node', [join(D, 'item7.mjs'), 'ten', 'bairro'], { maxBuffer: 1 << 26, timeout: 240000 }).toString().slice(0, 1500)); } catch (e) { record('fast', { name: 'D-gpu', error: String(e).slice(0, 2000) }); console.log(`D failed: ${String(e).slice(0, 300)}`); }

// E panels and tools with every thread's CPU (100 us) and sampling heap profilers on
const prof = spawn('node', [join(D, 'profile.mjs'), 'ten-panels-tools', '240000', 'both'], { stdio: ['ignore', 'pipe', 'pipe'] });
let profOut = ''; prof.stdout.on('data', (d) => { profOut += d; });
await sleep(4000);
const stepsEnv = { ...process.env, STILL_MS: '2000' };
for (const f of ['item4-panels.json', 'item5-tools.json']) {
  try { console.log(execFileSync('node', [join(D, 'steps.mjs'), join(D, f), 'ten'], { env: stepsEnv, maxBuffer: 1 << 26, timeout: 600000 }).toString()); } catch (e) { record('fast', { name: `E-${f}`, error: String(e).slice(0, 3000) }); console.log(`E ${f} stopped: ${String(e).slice(0, 400)}`); }
}
await new Promise((r) => prof.on('exit', r));
console.log(profOut.slice(0, 1200));

// F idle and resize (the window off-screen: minimised and restored, then a 1 px resize)
await go('bairro'); await settle();
win('minimize'); await sleep(1000); await seg('F-idle-minimised', () => sleep(5000), false); win('restore'); await sleep(1500);
try { console.log(execFileSync('node', [join(D, 'item12.mjs'), 'ten'], { timeout: 60000 }).toString()); } catch (e) { console.log(`F resize failed ${String(e).slice(0, 300)}`); }
record('fast', { name: 'END', ms: Date.now() - T0 });
console.log(`FAST PASS ${Math.round((Date.now() - T0) / 1000)} s`);
process.exit(0);
