// The last block, once: the failed steps again with their drawers open (item5d-redo.json), the low preset (it drew no frame in its 3 s
// the first time), the F7 Diagnosis and Spector at the district, idle minimised, the resize, then the save, the game closed and
// opened again, and the city's counts before and after (F4). node finish.mjs
import { execFileSync, execSync } from 'node:child_process';
import { join } from 'node:path';
import { ROOT, connect, record, segmentStart, segmentEnd, shot, sleep, input } from './lib.mjs';
import { makeMoves } from './moves.mjs';
import { slice } from './procSlice.mjs';

const D = join(ROOT, 'driver');
const run = (args, ms) => { try { return execFileSync('node', args, { env: { ...process.env, STILL_MS: '2000' }, maxBuffer: 1 << 26, timeout: ms }).toString(); } catch (e) { return `FAILED ${String(e).slice(0, 600)}`; } };
console.log(run([join(D, 'steps.mjs'), join(D, 'item5d-redo.json'), 'ten'], 900000));
let { page, cdp } = await connect();
let m = await makeMoves(page, cdp);
async function seg(name, ms) {
  const wall0 = Date.now(); const st = await segmentStart(page); await sleep(ms); const end = await segmentEnd(page, st);
  const s = slice(wall0, Date.now()); const q = await page.evaluate(() => window.__state().now.quality);
  record('fast', { name, wall0, wall1: Date.now(), quality: q, ...end, procs: s.procs, totalPrivateMB: s.totalPrivateMB, gpuUtil: s.gpuUtilMean, vram: s.gpuMemMiB });
  await shot(page, `fast/${name}`);
  console.log(`${name}: q=${q} frames ${end.frames.frames} cpu p50 ${end.frames.total?.p50} gpu p50 ${end.gpu.p50} draws ${end.drawCalls}`);
}
async function quality(label) {
  await m.clickLabel('Menu');
  const box = await page.evaluate((l) => { const b = [...document.querySelectorAll('.v2-pop button')].find((x) => x.textContent.trim() === l && x.offsetParent); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, label);
  if (box) await input.click(cdp, box);
  await input.press(cdp, 'Escape', 'Escape');
}
await m.go('bairro');
await quality('Baixa'); await sleep(6000); await seg('C-quality-low-retry', 3000);
await quality('Ultra'); await sleep(4000);
console.log(run([join(D, 'item7.mjs'), 'ten', 'bairro'], 300000));
// Idle minimised (the window off-screen: minimised through user32 and restored).
await m.go('bairro');
const win = (a) => execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${join(D, 'win.ps1')}" ${a}`).toString().trim();
win('minimize'); await sleep(1000);
{ const wall0 = Date.now(); const st = await segmentStart(page); await sleep(10000); const end = await segmentEnd(page, st); const s = slice(wall0, Date.now()); record('fast', { name: 'F-idle-minimised', wall0, wall1: Date.now(), ...end, procs: s.procs, totalPrivateMB: s.totalPrivateMB, gpuUtil: s.gpuUtilMean }); console.log(`F-idle-minimised: frames ${end.frames.frames}, all ${s.totalPrivateMB} MB, gpu ${s.gpuUtilMean}%`); }
win('restore'); await sleep(2000);
console.log(run([join(D, 'item12.mjs'), 'ten'], 120000));
// F4: counts before the save, the save, the game closed and opened again, counts after.
const counts = () => page.evaluate(() => { const c = window.__roadcraft.inventory().counts.doc; const t = window.__roadcraft.transit; return { ...c, transitLines: t?.lines?.length ?? t?.state?.lines?.length ?? null }; });
const before = await counts();
const s0 = Date.now(); await page.evaluate(() => window.__roadcraft.saved()); const saveMs = Date.now() - s0;
const out = run([join(D, 'relaunch.mjs'), 'ten-after-tools'], 900000);
({ page, cdp } = await connect());
const after = await counts();
const same = Object.keys(before).filter((k) => before[k] !== after[k]).map((k) => `${k} ${before[k]}->${after[k]}`);
record('fast', { name: 'F4-save-reopen', saveMs, before, after, differences: same, relaunch: out.slice(0, 400) });
console.log(`F4: save ${saveMs} ms; differences after reopening: ${same.length ? same.join(', ') : 'none'}`);
process.exit(0);
