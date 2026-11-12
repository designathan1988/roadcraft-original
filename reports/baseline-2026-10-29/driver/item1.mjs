// Item 1: a city made (the game's own `generateCity`, as the menu's), opened, saved; every phase the game marks on its timeline.
// node item1.mjs small|ten
import { connect, record, shot, sleep } from './lib.mjs';

const which = process.argv[2];
const ask = which === 'small' ? { seed: 7 } : { seed: 7, size: 'large', radiusMetres: 8850 };
const { page } = await connect();
const t0 = await page.evaluate(() => performance.now());
const wall0 = Date.now();
// Not awaited in the page: the promise resolves when the city is put in place; the curtain and the world fill are watched after.
await page.evaluate((a) => { window.__gen = { done: null, error: null }; window.__roadcraft.generateCity(a).then(() => { window.__gen.done = performance.now(); }, (e) => { window.__gen.error = String(e); }); }, ask);
let applied = null;
for (;;) {
  const s = await page.evaluate(() => ({ g: window.__gen, opening: window.__roadcraft.scene().opening, busy: window.__roadcraft.scene().worldBusy, now: performance.now() }));
  if (s.g.error) { record('item1', { which, error: s.g.error }); console.log('error', s.g.error); process.exit(1); }
  if (s.g.done && applied === null) applied = s.g.done;
  if (applied !== null && !s.opening && !s.busy) break;
  if (s.now - t0 > 900_000) { console.log('timeout 15 min'); break; }
  await sleep(500);
}
const settled = await page.evaluate(() => performance.now());
const marks = await page.evaluate((from) => performance.getEntriesByType('mark').filter((m) => m.startTime >= from).map((m) => [m.name, Math.round(m.startTime - from)]), t0);
const counts = await page.evaluate(() => window.__roadcraft.inventory().counts);
await shot(page, `item1/${which}-opened`);
// The save: the autosave written now, resolved once stored (`__roadcraft.saved`).
const s0 = await page.evaluate(() => performance.now());
await page.evaluate(() => window.__roadcraft.saved());
const s1 = await page.evaluate(() => performance.now());
const row = { which, ask, wallStart: wall0, appliedMs: Math.round(applied - t0), settledMs: Math.round(settled - t0), saveMs: Math.round(s1 - s0), marks, counts };
record('item1', row);
console.log(JSON.stringify(row, null, 1));
process.exit(0);
