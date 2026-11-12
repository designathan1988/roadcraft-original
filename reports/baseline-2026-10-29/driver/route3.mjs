// Items 6, 8 and 9 in one: the district route run three times, once each.
//   heap snapshot (baseline) -> lap 1 under the CPU (100 us) and sampling heap profilers of every thread (profile.mjs)
//   -> heap snapshot (target) -> lap 2 under the Chrome trace (trace.mjs) -> lap 3 plain -> heap snapshot (final)
// At the end of every lap: the heap and every process's memory (item 9). node route3.mjs <city>
import { execFileSync } from 'node:child_process';
import { createWriteStream, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, RAW, connect, record, sleep } from './lib.mjs';
import { makeMoves } from './moves.mjs';
import { slice } from './procSlice.mjs';

const city = process.argv[2];
const D = join(ROOT, 'driver');
mkdirSync(join(RAW, 'heapsnapshots'), { recursive: true });
const { page, cdp } = await connect();
const m = await makeMoves(page, cdp);
async function snapshot(name) {
  const file = join(RAW, 'heapsnapshots', `${city}-${name}.heapsnapshot`);
  const ws = createWriteStream(file);
  const onChunk = (e) => ws.write(e.chunk);
  cdp.on('HeapProfiler.addHeapSnapshotChunk', onChunk);
  const t = Date.now();
  await cdp.send('HeapProfiler.enable');
  await cdp.send('HeapProfiler.takeHeapSnapshot', { reportProgress: false, captureNumericValue: false });
  cdp.off('HeapProfiler.addHeapSnapshotChunk', onChunk);
  await new Promise((r) => ws.end(r));
  console.log(`snapshot ${name}: ${Date.now() - t} ms`);
  return { name, file, ms: Date.now() - t };
}
async function lapEnd(lap, wall0) {
  const wall1 = Date.now();
  await sleep(3000);
  const s = slice(wall1 - 3000, Date.now());
  const heap = await page.evaluate(() => Math.round(performance.memory.usedJSHeapSize / 1e5) / 10);
  record('item9', { city, lap, wall0, wall1, heapMB: heap, totalPrivateMB: s.totalPrivateMB, procs: s.procs, vram: s.gpuMemMiB });
  console.log(`lap ${lap}: ${Math.round((wall1 - wall0) / 1000)} s, heap ${heap} MB, all processes ${s.totalPrivateMB} MB, VRAM ${s.gpuMemMiB} MiB`);
}
await m.go('bairro');
const s0 = slice(Date.now() - 3000, Date.now());
record('item9', { city, lap: 0, heapMB: await page.evaluate(() => Math.round(performance.memory.usedJSHeapSize / 1e5) / 10), totalPrivateMB: s0.totalPrivateMB, procs: s0.procs, vram: s0.gpuMemMiB });
const snaps = [await snapshot('baseline')];
let w = Date.now();
console.log(execFileSync('node', [join(D, 'profile.mjs'), `${city}-route`, '0', 'both', join(D, 'actBairroRoute.mjs')], { maxBuffer: 1 << 26 }).toString().slice(0, 1500));
await lapEnd(1, w);
snaps.push(await snapshot('target'));
w = Date.now();
console.log(execFileSync('node', [join(D, 'trace.mjs'), join(RAW, `trace-${city}-route.json`), join(D, 'actBairroRoute.mjs')], { maxBuffer: 1 << 26 }).toString());
await lapEnd(2, w);
w = Date.now();
await m.bairroRoute();
await lapEnd(3, w);
snaps.push(await snapshot('final'));
record('item9', { city, snapshots: snaps });
process.exit(0);
