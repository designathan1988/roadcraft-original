// Item 9 (and item 6's snapshots): the district route in a loop 3 times; a heap snapshot of the page before the loop, after lap 1 and
// after lap 3 (for MemLab find-leaks), and at the end of every lap the processes' memory and the heap.
// node item9.mjs <city>
import { createWriteStream, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { RAW, connect, record, sleep } from './lib.mjs';
import { makeMoves } from './moves.mjs';
import { slice } from './procSlice.mjs';

const city = process.argv[2];
const OUT = join(RAW, 'heapsnapshots'); mkdirSync(OUT, { recursive: true });
const { page, cdp } = await connect();
const m = await makeMoves(page, cdp);

async function snapshot(name) {
  const file = join(OUT, `${city}-${name}.heapsnapshot`);
  const ws = createWriteStream(file);
  const onChunk = (e) => ws.write(e.chunk);
  cdp.on('HeapProfiler.addHeapSnapshotChunk', onChunk);
  const t = Date.now();
  await cdp.send('HeapProfiler.enable');
  await cdp.send('HeapProfiler.takeHeapSnapshot', { reportProgress: false, captureNumericValue: false });
  cdp.off('HeapProfiler.addHeapSnapshotChunk', onChunk);
  await new Promise((r) => ws.end(r));
  return { file, ms: Date.now() - t };
}
const lap = async (i) => {
  const wall0 = Date.now();
  await m.bairroRoute();
  const wall1 = Date.now();
  await sleep(3000);
  const s = slice(wall1 - 3000, Date.now());
  const heap = await page.evaluate(() => Math.round(performance.memory.usedJSHeapSize / 1e5) / 10);
  const row = { city, lap: i, wall0, wall1, heapMB: heap, totalPrivateMB: s.totalPrivateMB, procs: s.procs, vram: s.gpuMemMiB };
  record('item9', row);
  console.log(`lap ${i}: heap ${heap} MB, all processes private ${s.totalPrivateMB} MB, vram ${s.gpuMemMiB} MiB | ${s.procs.map((p) => `${p.kind}:${Math.round(p.privateMB)}`).join(' ')}`);
};
await m.go('bairro');
const s0 = slice(Date.now() - 3000, Date.now());
record('item9', { city, lap: 0, heapMB: await page.evaluate(() => Math.round(performance.memory.usedJSHeapSize / 1e5) / 10), totalPrivateMB: s0.totalPrivateMB, procs: s0.procs, vram: s0.gpuMemMiB });
const a = await snapshot('baseline'); console.log('snapshot baseline', a);
await lap(1);
const b = await snapshot('target'); console.log('snapshot after lap 1', b);
await lap(2);
await lap(3);
const c = await snapshot('final'); console.log('snapshot after lap 3', c);
record('item9', { city, snapshots: [a, b, c] });
process.exit(0);
