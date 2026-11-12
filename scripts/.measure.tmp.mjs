import { chromium } from 'playwright';
const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
const page = browser.contexts().flatMap((c) => c.pages())[0];
const lines = [];
page.on('console', (m) => { if (m.type() === 'error' || (m.type() === 'warning' && !m.text().includes('Electron Security'))) lines.push(`${m.type()}: ${m.text().slice(0, 300)}`); });
page.on('pageerror', (e) => lines.push(`pageerror: ${e.message.slice(0, 300)}`));
if (process.argv[2] === 'reload') await page.goto('http://127.0.0.1:5300/', { waitUntil: 'commit' });
const t0 = Date.now();
await page.waitForFunction("performance.getEntriesByType('mark').some(m => m.name === 'opening:shown')", null, { timeout: 900000, polling: 500 });
console.log(`shown after ${((Date.now() - t0) / 1000).toFixed(1)} s (wall)`);
const out = await page.evaluate(`({ marks: performance.getEntriesByType('mark').filter(m => /^(save|opening|reveal|roads:kept|world:(solved|surfaces|surfaced|roads))/.test(m.name)).map(m => m.name + ' ' + (m.startTime/1000).toFixed(1) + (m.detail ? ' ' + JSON.stringify(m.detail) : '')),
  diary: window.__changes(900).filter(c => /surfaces|elevation/.test(c.kind)).slice(-3).map(c => c.kind + ' | ' + (c.ms ?? 0).toFixed(0) + ' ms | ' + (c.detail ?? '')),
  state: window.__roadcraft ? null : null })`);
console.log(out.marks.join('\n'));
console.log(out.diary.join('\n'));
const seen = new Map();
for (const l of lines) seen.set(l, (seen.get(l) ?? 0) + 1);
console.log(`console (${lines.length}):`);
for (const [l, n] of seen) console.log(`${n}x ${l}`);
process.exit(0);
