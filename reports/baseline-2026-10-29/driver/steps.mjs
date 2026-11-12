// Items 4 and 5: interface panels and tools, as a list of steps run once each with real input (CDP Input events on the window).
// node steps.mjs <steps.json> <city> [from-step-name]
// A step: { name, do: [action...], still?: ms (a still window measured after it, panels: 10000), shot?: true (default) }
// Actions: {view:{x,y,zoom,az,el}} {hold:key, code, ms} {click:"text or title/aria start"} {sel:"css"} {at:[x,y]} {dbl:[x,y]} {right:[x,y]} {key:"key", code?, mods?}
//          {drag:[x1,y1,x2,y2], button?, ms?} {wheel:[x,y,dy,times]} {wait:ms} {dialog:"accept"|"dismiss"} {type:"text"}
// Each step records: time until the game is settled again (no opening, world not busy) after its last action, the frames meanwhile
// (longest, count > 50 ms), the heap and the processes' memory before and after, the counts of the city, and a PNG.
import { readFileSync } from 'node:fs';
import { connect, record, shot, sleep, input, segmentStart, segmentEnd, INSTALL_COUNTERS, windowState } from './lib.mjs';
import { slice } from './procSlice.mjs';

const [file, city, from] = process.argv.slice(2);
const steps = JSON.parse(readFileSync(file, 'utf8'));
const { page, cdp } = await connect();
await page.evaluate(INSTALL_COUNTERS);
let dialogAnswer = 'dismiss';
page.on('dialog', async (d) => { record('dialogs', { type: d.type(), message: d.message(), answer: dialogAnswer }); if (dialogAnswer === 'accept') await d.accept(); else await d.dismiss(); });

async function boxOf(target) {
  return page.evaluate((t) => {
    const visible = (e) => e && e.offsetParent !== null && e.getBoundingClientRect().width > 0;
    let e = null;
    if (t.sel) e = [...document.querySelectorAll(t.sel)].find(visible);
    else {
      const all = [...document.querySelectorAll('button,[role=button],[role=tab],[role=switch],[role=menuitem],[role=option],a,label,summary,.rc-card,[data-cat],input,select')].filter(visible);
      const name = (x) => (x.getAttribute('aria-label') || x.title || x.textContent || '').trim();
      e = all.find((x) => name(x) === t.click) ?? all.find((x) => name(x).startsWith(t.click)) ?? all.find((x) => name(x).includes(t.click));
    }
    if (!e) return null;
    e.scrollIntoView({ block: 'nearest', inline: 'nearest' });
    const r = e.getBoundingClientRect();
    return { x: r.x + r.width / 2, y: r.y + r.height / 2, name: (e.getAttribute('aria-label') || e.title || e.textContent || '').trim().slice(0, 60) };
  }, target);
}
async function act(a) {
  if (a.click !== undefined || a.sel) { const b = await boxOf(a); if (!b) throw new Error(`not on screen: ${a.click ?? a.sel}`); await input.click(cdp, b); await sleep(250); return b.name; }
  if (a.at) { await input.click(cdp, { x: a.at[0], y: a.at[1] }, 'left', 1, a.mods ?? 0); await sleep(120); return; }
  if (a.dbl) { await input.click(cdp, { x: a.dbl[0], y: a.dbl[1] }, 'left', 1); await input.click(cdp, { x: a.dbl[0], y: a.dbl[1] }, 'left', 2); await sleep(150); return; }
  if (a.right) { await input.click(cdp, { x: a.right[0], y: a.right[1] }, 'right'); await sleep(150); return; }
  if (a.key) { await input.press(cdp, a.key, a.code ?? (a.key.length === 1 ? `Key${a.key.toUpperCase()}` : a.key), a.mods ?? 0, a.key.length === 1 ? a.key : undefined); await sleep(200); return; }
  if (a.drag) { const [x1, y1, x2, y2] = a.drag; await input.drag(cdp, a.button ?? 'left', { x: x1, y: y1 }, { x: x2, y: y2 }, a.ms ?? 600, a.steps); await sleep(200); return; }
  if (a.wheel) { const [x, y, dy, n] = a.wheel; await input.wheel(cdp, { x, y }, dy, n, 60); return; }
  if (a.wait) { await sleep(a.wait); return; }
  // The camera placed by the game's own API (the prompt allows it, so the confirming run stands at the same place): degrees in, radians out.
  if (a.view) { const v = a.view; await page.evaluate((at) => window.__roadcraft.setView(at), { x: v.x, y: v.y, zoom: v.zoom, azimuth: (v.az ?? 0) * Math.PI / 180, elevation: (v.el ?? 55) * Math.PI / 180 }); await sleep(a.settle ?? 3000); return; }
  if (a.hold) { await input.hold(cdp, a.hold, a.code ?? a.hold, a.ms ?? 1000, a.mods ?? 0); return; }
  if (a.dialog) { dialogAnswer = a.dialog; return; }
  if (a.type) { await cdp.send('Input.insertText', { text: a.type }); await sleep(150); return; }
  throw new Error(`unknown action ${JSON.stringify(a)}`);
}
const counts = () => page.evaluate(() => { const c = window.__roadcraft.inventory().counts; return { ...c.doc, vehicles: c.sim.vehicles, simPeople: c.sim.people, heapMB: c.heapMB, programs: c.gl.programs }; });

let started = !from;
for (const s of steps) {
  if (!started) { if (s.name === from) started = true; else continue; }
  const before = { counts: await counts(), procs: slice(Date.now() - 3000, Date.now()) };
  const t0 = await page.evaluate(() => performance.now());
  const wall0 = Date.now();
  const clicked = []; let error = null;
  try { for (const a of s.do ?? []) clicked.push(await act(a)); } catch (e) { error = String(e.message ?? e); }
  const tActed = await page.evaluate(() => performance.now());
  // Settled: no opening, the world not busy; at most 60 s.
  let settledMs = null;
  for (let i = 0; i < 40; i++) {
    const st = await page.evaluate(() => ({ o: window.__roadcraft.scene().opening, b: window.__roadcraft.scene().worldBusy, now: performance.now() }));
    if (!st.o && !st.b) { settledMs = Math.round(st.now - tActed); break; }
    await sleep(250);
  }
  await sleep(400);
  const frames = await page.evaluate((t) => { const f = window.__frames(t); return { frames: f.frames, long: f.long, max: f.total?.max ?? null, p50: f.total?.p50 ?? null }; }, t0);
  let still = null;
  if (s.still) { const st = await segmentStart(page); await sleep(Number(process.env.STILL_MS ?? s.still)); still = await segmentEnd(page, st); }
  const png = s.shot === false ? null : await shot(page, `${city}/${s.name}`);
  const wall1 = Date.now();
  await sleep(800);
  const after = { counts: await counts(), procs: slice(wall1 - 3000, wall1) };
  const w = windowState();
  const row = { city, name: s.name, wall0, wall1, error, clicked, actMs: Math.round(tActed - t0), settledMs, frames, still, before, after, png, window: w, valid: !w.iconic };
  record('steps', row);
  console.log(`${s.name}: ${error ? `FAILED ${error} | ` : ''}acted ${row.actMs} ms, settled +${settledMs} ms, frames ${frames.frames} long ${frames.long} max ${frames.max} ms | heap ${before.counts.heapMB}->${after.counts.heapMB} MB, total ${before.procs.totalPrivateMB}->${after.procs.totalPrivateMB} MB${still ? ` | still cpu p50 ${still.frames.total?.p50} gpu p50 ${still.gpu.p50} draws ${still.drawCalls}` : ''}${w.iconic ? ' [INVALID: window minimised]' : ''}`);
}
process.exit(0);
