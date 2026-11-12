// Item 2: the camera matrix. node matrix.mjs <city> <mode> [zooms] [speeds]
//   mode still   : every zoom x tilt x direction x perspective, settled, 10 s still, one photo each
//   mode moves   : every movement at each zoom (10 s each), numbers only (no capture during the numbers)
//   mode photos  : the same movements replayed, a PNG every ~200 ms (the visual pass; its timing is not used)
// zooms: comma list of rua,perto,bairro,longe,cidade (default all); speeds: comma list of 1,2,4,pause (default 1)
import { execSync } from 'node:child_process';
import { connect, record, segmentStart, segmentEnd, shot, sleep, input, cameraNow, setView, INSTALL_COUNTERS, windowState } from './lib.mjs';

export const ZOOMS = { rua: 8, perto: 3.5, bairro: 1.5, longe: 0.8, cidade: 0.45 }; // CSS px a metre (1 world unit = 1 m)
export const TILTS = { min: 20, mid: 55, max: 90 }; // degrees over the horizon
export const DIRS = { N: 0, E: 90, S: 180, W: 270 }; // azimuth, degrees
const rad = (d) => (d * Math.PI) / 180;

const [city, mode, zoomArg, speedArg, moveArg] = process.argv.slice(2);
const onlyMoves = moveArg ? moveArg.split(',') : null;
const zooms = (zoomArg && zoomArg !== 'all' ? zoomArg.split(',') : Object.keys(ZOOMS));
const speeds = speedArg ? speedArg.split(',') : ['1'];
const { page, cdp } = await connect();
await page.evaluate(INSTALL_COUNTERS);
const W = await page.evaluate(() => innerWidth); const H = await page.evaluate(() => innerHeight);
const C = { x: Math.round(W / 2), y: Math.round(H / 2) };
const bounds = await page.evaluate(() => window.__roadcraft.bounds());
const centre = { x: (bounds.minX + bounds.maxX) / 2, y: (bounds.minY + bounds.maxY) / 2 };

async function settle(maxMs = 6000) {
  const t = Date.now();
  for (;;) {
    const s = await page.evaluate(() => ({ o: window.__roadcraft.scene().opening, b: window.__roadcraft.scene().worldBusy }));
    if (!s.o && !s.b) break;
    if (Date.now() - t > maxMs) return { settled: false, waited: Date.now() - t };
    await sleep(250);
  }
  await sleep(1500);
  return { settled: true, waited: Date.now() - t };
}
async function clickLabel(label) {
  const box = await page.evaluate((l) => { const sp = l.match(/^Velocidade da simulação (\d)×$/) ? l.match(/(\d)×$/)[1] : l === 'Pausar' ? '0' : null; const e = sp !== null ? document.querySelector(`button[data-speed="${sp}"]`) : [...document.querySelectorAll('button')].find((b) => (b.getAttribute('aria-label') || b.title || b.textContent).trim().startsWith(l) && b.offsetParent); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, label);
  if (!box) throw new Error(`no button ${label}`);
  await input.click(cdp, box);
  await sleep(150);
}
async function perspective(on) {
  const now = await page.evaluate(() => window.__state().now.perspective);
  if (now === on) return;
  const open = await page.evaluate(() => [...document.querySelectorAll('button')].some((b) => (b.getAttribute('aria-label') || '').startsWith('Câmera em perspectiva') && b.offsetParent));
  if (!open) await clickLabel('Câmera');
  await clickLabel('Câmera em perspectiva');
  await input.press(cdp, 'Escape', 'Escape');
  await sleep(300);
}
async function speed(s) {
  const st = await page.evaluate(() => window.__state().now);
  if (s === 'pause') { if (!st.paused) await clickLabel('Pausar'); return; }
  await clickLabel(`Velocidade da simulação ${s}×`);
}
// The start screen after a reopening: its Continue button pressed, as the player does.
if (await page.evaluate(() => [...document.querySelectorAll('button')].some((b) => b.textContent.trim() === 'Continuar' && b.offsetParent))) await clickLabel('Continuar');
const view = (zoom, tilt = TILTS.mid, dir = DIRS.N) => ({ x: centre.x, y: centre.y, zoom: ZOOMS[zoom], azimuth: rad(dir), elevation: rad(tilt) });

// Segments already measured in an earlier run of this driver are not measured again; one measured while minimised stays as it was
// (invalid, recorded) and is not repeated either.
import { readFileSync as readDone, existsSync as doneExists } from 'node:fs';
const DONE = new Set(doneExists(new URL('../raw/matrix.jsonl', import.meta.url)) ? readDone(new URL('../raw/matrix.jsonl', import.meta.url), 'utf8').trim().split(String.fromCharCode(10)).filter(Boolean).map((l) => JSON.parse(l).name) : []);
async function frontIfMinimised() { if (windowState().iconic) { execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${new URL('./win.ps1', import.meta.url).pathname.slice(1)}" front`); record('matrix-window', { restoredAt: Date.now() }); await sleep(2500); } }
async function measure(name, act, extra = {}) {
  await frontIfMinimised();
  const w0 = windowState();
  const wall0 = Date.now();
  const start = await segmentStart(page);
  await act();
  const end = await segmentEnd(page, start);
  const w1 = windowState();
  extra = { ...extra, window: { start: w0, end: w1 }, valid: !w0.iconic && !w1.iconic };
  const cam = await cameraNow(page);
  const row = { city, name, wall0, wall1: Date.now(), camera: cam, ...extra, ...end };
  record('matrix', row);
  const f = end.frames;
  console.log(`${name}${extra.valid ? '' : ' [INVALID: window minimised]'}: frames ${f.frames} long ${f.long} cpu p50 ${f.total?.p50} p95 ${f.total?.p95} max ${f.total?.max} | gpu p50 ${end.gpu.p50} p99 ${end.gpu.p99} max ${end.gpu.max} | draws ${end.drawCalls} tris ${end.drawnTriangles} | progs +${end.programsAfter - end.programsBefore} | up ${(end.gl.uploadBytes / 1e6).toFixed(1)} MB`);
  return row;
}

// The movements, each 10 s, from the zoom's reference view.
// The input's session: the photo pass sends its input events without waiting for each one's answer (the captures held every answer back
// and stretched a 10 s move to minutes); the events keep their order on the session, so the move runs in real time while captured.
let IC = cdp;
const fastInput = { send: (method, params) => { if (method.startsWith('Input.')) { cdp.send(method, params).catch(() => {}); return Promise.resolve({}); } return cdp.send(method, params); } };
const MOVES = {
  panSlow: async () => input.drag(IC, 'middle', { x: C.x - 300, y: C.y }, { x: C.x + 300, y: C.y }, 10000, 300),
  panFastDrag: async () => { for (let i = 0; i < 8; i++) { const d = i % 2 ? -1 : 1; await input.drag(IC, 'middle', { x: C.x - 700 * d, y: C.y }, { x: C.x + 700 * d, y: C.y }, 1000, 30); await sleep(250); } },
  panKeys: async () => { await input.hold(IC, 'w', 'KeyW', 5000); await input.hold(IC, 's', 'KeyS', 5000); },
  orbit: async () => input.drag(IC, 'right', { x: C.x - 600, y: C.y }, { x: C.x + 600, y: C.y }, 10000, 300),
  zoomIn: async () => input.wheel(IC, C, -100, 100, 100),
  zoomOut: async () => input.wheel(IC, C, 100, 100, 100),
  tilt: async () => { await input.hold(IC, 'PageUp', 'PageUp', 5000); await input.hold(IC, 'PageDown', 'PageDown', 5000); },
  turn90: async () => { for (let i = 0; i < 8; i++) { await input.press(IC, i % 2 ? 'E' : 'Q', i % 2 ? 'KeyE' : 'KeyQ', 8); await sleep(1250); } },
  homeCentreReset: async () => {
    await input.press(IC, 'Home', 'Home'); await sleep(3300);
    await clickLabel('Câmera'); await clickLabel('Enquadrar a câmera'); await sleep(3200);
    await clickLabel('Norte para cima'); await input.press(IC, 'Escape', 'Escape'); await sleep(3300);
  },
};

if (mode === 'still5') {
  // [2C] the five zooms still, mid tilt, north, perspective.
  await speed('1');
  await perspective(true);
  for (const z of zooms) {
    const name = `still/${city}/persp/${z}-mid-N`;
    await setView(page, view(z));
    const s = await settle();
    await measure(name, () => sleep(10000), { settle: s });
    await shot(page, name);
  }
} else if (mode === 'still') {
  await speed('1');
  for (const p of [true, false]) {
    await perspective(p);
    for (const z of zooms) for (const [tn, t] of Object.entries(TILTS)) for (const [dn, d] of Object.entries(DIRS)) {
      const name = `still/${city}/${p ? 'persp' : 'ortho'}/${z}-${tn}-${dn}`;
      if (DONE.has(name)) continue;
      await setView(page, view(z, t, d));
      const s = await settle();
      await measure(name, () => sleep(10000), { settle: s });
      await shot(page, name);
    }
  }
  await perspective(true);
} else if (mode === 'moves' || mode === 'photos') {
  if (mode === 'photos') IC = fastInput;
  await perspective(true);
  for (const sp of speeds) {
    await speed(sp);
    for (const z of zooms) for (const [mn, act] of Object.entries(MOVES)) {
      if (onlyMoves && !onlyMoves.includes(`${z}/${mn}`) && !onlyMoves.includes(mn)) continue;
      const name = `${mode === 'moves' ? 'move' : 'seq'}/${city}/x${sp}/${z}/${mn}`;
      await setView(page, view(z));
      const s = await settle();
      if (mode === 'moves') { if (!DONE.has(name)) await measure(name, act, { settle: s, speed: sp }); continue; }
      await frontIfMinimised();
      // The visual pass: the movement run while the window is captured as fast as the protocol gives PNGs, aiming at one every 200 ms.
      let going = true; const times = []; let i = 0;
      const t0 = Date.now();
      const loop = (async () => { while (going) { const t = Date.now(); await shot(page, `${name}/${String(i++).padStart(3, '0')}`); times.push(t - t0); const wait = 200 - (Date.now() - t); if (wait > 0) await sleep(wait); } })();
      await act(); going = false; await loop;
      record('photos', { city, name, speed: sp, frames: i, times, camera: await cameraNow(page) });
      console.log(`${name}: ${i} PNG`);
    }
  }
  await speed('1');
}
process.exit(0);
