import { chromium } from 'playwright';
const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
const page = browser.contexts().flatMap((c) => c.pages()).find((p) => p.url().startsWith('http://'));
const { width, height } = await page.evaluate(() => ({ width: innerWidth, height: innerHeight }));
const cx = width / 2, cy = height / 2;
const measure = async (label, act) => {
  await page.evaluate(() => { window.__ft = []; let last = performance.now(); const tick = (t) => { window.__ft.push(t - last); last = t; if (window.__ftOn) requestAnimationFrame(tick); }; window.__ftOn = true; requestAnimationFrame(tick); });
  await act();
  const ft = await page.evaluate(() => { window.__ftOn = false; return window.__ft.slice(1); });
  ft.sort((a, b) => a - b);
  const q = (p) => ft[Math.min(ft.length - 1, Math.floor(p * ft.length))].toFixed(1);
  console.log(`${label}: ${ft.length} frames, mean ${(ft.reduce((s, v) => s + v, 0) / ft.length).toFixed(1)} ms, p50 ${q(0.5)}, p95 ${q(0.95)}, max ${ft[ft.length - 1].toFixed(1)}`);
};
await measure('still 3 s', async () => { await page.waitForTimeout(3000); });
await measure('drag 8 s', async () => {
  for (let k = 0; k < 4; k++) {
    await page.mouse.move(cx - 300, cy); await page.mouse.down();
    for (let i = 0; i <= 60; i++) { await page.mouse.move(cx - 300 + i * 10, cy + (k % 2 ? 1 : -1) * i * 2); await page.waitForTimeout(16); }
    await page.mouse.up();
  }
});
await page.screenshot({ path: 'reports/in-game/2026-10-27-one-building/14-final-drag.png' });
process.exit(0);
