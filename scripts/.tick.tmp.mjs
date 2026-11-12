import { chromium } from 'playwright';
const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
const page = browser.contexts().flatMap((c) => c.pages()).find((p) => p.url().startsWith('http://'));
await page.bringToFront();
await page.waitForTimeout(1500);
const out = await page.evaluate(() => new Promise((done) => {
  const s = window.__roadcraft.sim; const orig = Object.getPrototypeOf(s).readTick;
  let n = 0, ms = 0, worst = 0, frames = 0; const sizes = { vehicles: 0, peds: 0, signals: 0, layout: 0, parked: 0 };
  s.readTick = function (m) { const t = performance.now(); orig.call(this, m); const d = performance.now() - t; n++; ms += d; worst = Math.max(worst, d); sizes.vehicles += m.vehicles.length; sizes.peds += m.peds.length; sizes.signals += m.signals.length; sizes.layout += m.layout ? m.layout.junctions.length : 0; sizes.parked += m.parked ? m.parked.cars.length : 0; };
  const f = () => { frames++; if (performance.now() - t0 < 10000) requestAnimationFrame(f); };
  const t0 = performance.now(); requestAnimationFrame(f);
  setTimeout(() => { delete s.readTick; done({ ticks: n, ms: ms.toFixed(1), perTick: (ms / Math.max(1, n)).toFixed(2), worst: worst.toFixed(1), fps: (frames / 10).toFixed(1), sizes }); }, 10000);
}));
console.log(JSON.stringify(out));
process.exit(0);
