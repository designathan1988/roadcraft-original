import { chromium } from 'playwright';

/**
 * THE GAME WINDOW'S TIMELINE FOLLOWED (`npm run desktop:dev`): every mark whose name starts with `prefix` printed once as it appears,
 * seconds from `window.__cityStart`, until one named `end` appears or the page reports an uncaught error; the window left open.
 * `node scripts/inGameMarks.mjs [prefix] [end]` (default `city:` and `city:applied`).
 */
const PORT = process.env.ROADCRAFT_DEBUG_PORT ?? '9333';
const prefix = process.argv[2] ?? 'city:';
const end = process.argv[3] ?? 'city:applied';
const browser = await chromium.connectOverCDP(`http://127.0.0.1:${PORT}`);
const page = browser.contexts().flatMap((c) => c.pages()).find((p) => p.url().startsWith('http://'));
if (!page) { console.error('no game window'); process.exit(1); }
page.on('pageerror', (error) => { console.log(`pageerror: ${error.message}`); process.exit(3); });
page.on('console', (message) => { if (message.type() === 'error' || message.text().startsWith('[city]')) console.log(`console.${message.type()}: ${message.text()}`); });
const seen = new Set();
for (;;) {
  const marks = await page.evaluate((p) => performance.getEntriesByType('mark').filter((m) => m.name.startsWith(p))
    .map((m) => ({ name: m.name, at: ((m.startTime - (window.__cityStart ?? 0)) / 1000).toFixed(1), detail: typeof m.detail === 'string' ? m.detail : '' })), prefix);
  for (const m of marks) {
    const key = `${m.name}@${m.at}`;
    if (seen.has(key)) continue;
    seen.add(key);
    console.log(`${m.name} ${m.at} s ${m.detail}`);
    if (m.name === end) process.exit(0);
  }
  await new Promise((wake) => setTimeout(wake, 5000));
}
