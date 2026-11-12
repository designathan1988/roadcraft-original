import { chromium } from 'playwright';
const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
const page = browser.contexts().flatMap((c) => c.pages())[0];
const since = await page.evaluate(() => { window.__gpu(true); return performance.now(); });
await page.mouse.move(1280, 500);
for (const key of ['KeyW', 'KeyD', 'KeyS', 'KeyA']) { await page.keyboard.down(key); await new Promise((r) => setTimeout(r, 4000)); await page.keyboard.up(key); }
const out = await page.evaluate((since) => ({ frames: window.__frames(since), gpu: window.__gpu(false) }), since);
console.log(JSON.stringify(out, null, 1).slice(0, 4000));
process.exit(0);
