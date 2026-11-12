import { chromium } from 'playwright';
const [shotDuring, shotAfter, waitAfter] = process.argv.slice(2);
const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
const page = browser.contexts().flatMap((c) => c.pages()).find((p) => p.url().startsWith('http://'));
const sleep = (ms) => new Promise((w) => setTimeout(w, ms));
// An organic drag: a wobbling path with uneven steps, a pause, then a release.
let x = 1700 + Math.random() * 40, y = 560 + Math.random() * 30;
await page.mouse.move(x, y, { steps: 6 });
await sleep(120);
await page.mouse.down();
for (let i = 0; i < 40; i++) {
  x -= 18 + Math.random() * 10; y += 6 + Math.sin(i / 3) * 5 + Math.random() * 4;
  await page.mouse.move(x, y, { steps: 2 });
  await sleep(25 + Math.random() * 30);
}
await page.screenshot({ path: shotDuring });
for (let i = 0; i < 15; i++) { x -= 10 + Math.random() * 6; y += Math.random() * 3; await page.mouse.move(x, y); await sleep(30); }
await sleep(200);
await page.mouse.up();
await sleep(Number(waitAfter ?? 3000));
await page.screenshot({ path: shotAfter });
process.exit(0);
