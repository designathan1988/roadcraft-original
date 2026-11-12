// Markdown tables from the raw rows (raw/*.jsonl), for docs/agent/measure/BASELINE-2026-10-29.md.
// node tables.mjs <section> -> prints markdown. Sections: matrix, item1, item3, item10, item11, item12, steps, photos, profiles
import { readFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { RAW } from './lib.mjs';
import { slice } from './procSlice.mjs';

const rows = (f) => (existsSync(join(RAW, `${f}.jsonl`)) ? readFileSync(join(RAW, `${f}.jsonl`), 'utf8').trim().split('\n').filter(Boolean).map((l) => JSON.parse(l)) : []);
const mb = (b) => (b / 1e6).toFixed(1);
const f1 = (x) => (x === null || x === undefined || Number.isNaN(x) ? '-' : typeof x === 'number' ? (Math.round(x * 10) / 10).toString() : String(x));
const topSystems = (sys, n = 4) => Object.entries(sys ?? {}).sort((a, b) => b[1].p50 - a[1].p50).slice(0, n).map(([k, v]) => `${k} ${v.p50}/${v.max}`).join(', ');
const sec = process.argv[2];

if (sec === 'matrix' || sec === 'item3') {
  const list = rows(sec === 'matrix' ? 'matrix' : 'item3').filter((r) => r.frames);
  console.log('| segment | valid | frames | >50 ms | CPU p50/p95/max ms | GPU p50/p99/max ms | draw calls | triangles | programs +new | GL compiles | uploaded MB | heap MB | top systems p50/max ms | all processes private MB | GPU util % | VRAM MiB |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|---|');
  for (const r of list) {
    const s = slice(r.wall0, r.wall1);
    const valid = r.valid === false ? 'NO (minimised)' : r.frames.frames < 100 && !/still|pause/.test(r.name) ? 'NO (window not drawing)' : 'yes';
    const t = r.frames.total ?? {};
    console.log(`| ${r.name} | ${valid} | ${r.frames.frames} | ${r.frames.long} | ${f1(t.p50)}/${f1(t.p95)}/${f1(t.max)} | ${f1(r.gpu.p50)}/${f1(r.gpu.p99)}/${f1(r.gpu.max)} | ${r.drawCalls} | ${r.drawnTriangles} | ${r.programsAfter - r.programsBefore} | ${r.gl?.compiles ?? '-'} | ${mb(r.gl?.uploadBytes ?? 0)} | ${f1(r.heapMB)} | ${topSystems(r.frames.systems)} | ${s.totalPrivateMB} | ${s.gpuUtilMean ?? '-'} | ${s.gpuMemMiB ?? '-'} |`);
  }
}
if (sec === 'photos') {
  console.log('| sequence | PNGs | mean gap ms | camera at the end (x, y, zoom px/m, azimuth, elevation rad) |');
  console.log('|---|---|---|---|');
  for (const r of rows('photos')) {
    const gaps = r.times.slice(1).map((t, i) => t - r.times[i]);
    const c = r.camera;
    console.log(`| ${r.name} | ${r.frames} | ${gaps.length ? Math.round(gaps.reduce((a, b) => a + b, 0) / gaps.length) : '-'} | ${f1(c.x)}, ${f1(c.y)}, ${f1(c.zoom)}, ${f1(c.azimuth)}, ${f1(c.elevation)} |`);
  }
}
if (sec === 'steps') {
  console.log('| step | result | acted ms | settled after ms | frames | >50 ms | longest frame ms | still CPU p50 / GPU p50 ms, draws | heap MB before→after | all processes MB before→after | counts changed |');
  console.log('|---|---|---|---|---|---|---|---|---|---|---|');
  for (const r of rows('steps')) {
    const changed = Object.keys(r.after.counts).filter((k) => !['heapMB', 'vehicles', 'simPeople', 'programs'].includes(k) && r.after.counts[k] !== r.before.counts[k]).map((k) => `${k} ${r.before.counts[k]}→${r.after.counts[k]}`).join(', ');
    const still = r.still ? `${f1(r.still.frames.total?.p50)} / ${f1(r.still.gpu.p50)}, ${r.still.drawCalls}` : '-';
    console.log(`| ${r.name} | ${r.error ? `FAILED: ${r.error.replace(/\|/g, '/')}` : r.valid === false ? 'INVALID (minimised)' : 'done'} | ${r.actMs} | ${r.settledMs ?? '>60000'} | ${r.frames.frames} | ${r.frames.long} | ${f1(r.frames.max)} | ${still} | ${r.before.counts.heapMB}→${r.after.counts.heapMB} | ${r.before.procs.totalPrivateMB}→${r.after.procs.totalPrivateMB} | ${changed || '-'} |`);
  }
}
for (const name of ['item1', 'item10', 'item11', 'item12', 'item9', 'item7', 'spector', 'profiles', 'trace', 'dialogs']) if (sec === name) for (const r of rows(name)) console.log(JSON.stringify(r).slice(0, 4000));
