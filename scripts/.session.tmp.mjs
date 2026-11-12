import { chromium } from 'playwright';
// One step of the play session: gestures in the game window, photos and the console, as a player would.
const [step, dir] = process.argv.slice(2);
const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
const page = browser.contexts().flatMap((c) => c.pages()).find((p) => p.url().startsWith('http://'));
const logs = [];
page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') logs.push(`${m.type()}: ${m.text().slice(0, 300)}`); });
page.on('pageerror', (e) => logs.push('pageerror: ' + e.message));
const sleep = (ms) => new Promise((w) => setTimeout(w, ms));
const jitter = (n) => (Math.random() - 0.5) * n;
let mx = 1280, my = 500;
const glide = async (x, y) => { const steps = 6 + Math.floor(Math.random() * 6); await page.mouse.move(x + jitter(10), y + jitter(10), { steps }); mx = x; my = y; await sleep(60 + Math.random() * 120); };
const click = async (x, y) => { await glide(x, y); await page.mouse.down(); await sleep(50 + Math.random() * 60); await page.mouse.up(); };
const dbl = async (x, y) => { await glide(x, y); await page.mouse.dblclick(x + jitter(3), y + jitter(3)); };
const drag = async (x0, y0, x1, y1, button = 'left') => {
  await glide(x0, y0); await page.mouse.down({ button });
  const n = 25 + Math.floor(Math.random() * 10);
  for (let i = 1; i <= n; i++) { const t = i / n; await page.mouse.move(x0 + (x1 - x0) * t + jitter(8), y0 + (y1 - y0) * t + Math.sin(t * 6) * 6 + jitter(6)); await sleep(20 + Math.random() * 30); }
  await sleep(150); await page.mouse.up({ button });
};
const wheel = async (x, y, dy, times) => { await glide(x, y); for (let i = 0; i < times; i++) { await page.mouse.wheel(jitter(4), dy + jitter(20)); await sleep(90 + Math.random() * 80); } };
const shot = async (name) => { await page.screenshot({ path: `${dir}/${name}.png` }); console.log('photo', name); };
const byTitle = (t) => page.locator(`button[title^="${t}"]`).first();
const press = async (t) => { const b = byTitle(t); const box = await b.boundingBox(); if (!box) { console.log('no button', t); return false; } await click(box.x + box.width * (0.3 + Math.random() * 0.4), box.y + box.height * (0.3 + Math.random() * 0.4)); return true; };
const text = async (t) => { const b = page.getByText(t, { exact: true }).first(); const box = (await b.count()) ? await b.boundingBox({ timeout: 2000 }).catch(() => null) : null; if (!box) { console.log('no text', t); return false; } await click(box.x + box.width / 2 + jitter(6), box.y + box.height / 2 + jitter(4)); return true; };
const steps = {
  async f7() {
    await text('Continuar'); await sleep(1500); await shot('02-city');
    await page.keyboard.press('F7'); await sleep(3000); await shot('03-f7');
    console.log((await page.evaluate(() => document.body.innerText)).slice(0, 4000));
  },
  async f7close() { await page.keyboard.press('Escape'); await sleep(800); await shot('04-f7-closed'); },
  async street() {
    // Down to the street: the wheel over a crossing, a few notches at a time.
    await wheel(1150, 560, -240, 6); await sleep(4000); await shot('05-street-mid');
    await wheel(1100, 600, -240, 6); await sleep(5000); await shot('06-street-low');
  },
  async tilt() {
    // Tilt with the right button dragged up, as a player looks along the street.
    await drag(1300, 700, 1310, 520, 'right'); await sleep(5000); await shot('07-street-tilt');
  },
  async pan() {
    await drag(1700, 600, 900, 520); await page.screenshot({ path: `${dir}/08-pan-just-released.png` }); await sleep(1500); await shot('09-pan-1s');
    await drag(1500, 400, 700, 700); await shot('10-pan2-released'); await sleep(6000); await shot('11-pan2-6s');
  },
  async inside() {
    await dbl(1180, 560); await sleep(6000); await shot('12-inside-ground');
    await press('Andar acima'); await sleep(250); await press('Andar acima'); await sleep(6000); await shot('13-inside-up2');
    console.log(await page.evaluate(() => document.querySelector('.v2-inside-level')?.textContent));
  },
  async insideoff() { await press('Ver por dentro'); await sleep(4000); await shot('14-inside-off'); },
  async bomb() {
    await text('Demolir'); await sleep(800); await shot('15-demolish-menu');
    console.log((await page.evaluate(() => [...document.querySelectorAll('button')].filter((b) => b.offsetParent).map((b) => b.title || b.textContent.trim()).filter(Boolean).join(' | '))).slice(0, 2500));
  },
  async drop() {
    await text('Bomba'); await sleep(700); await shot('16-bomb-armed');
    await click(1250, 520); await sleep(600); await shot('17-bomb-0.6s'); await sleep(2500); await shot('18-bomb-3s'); await sleep(6000); await shot('19-bomb-9s');
  },
  async shoot() {
    await text('Pistola'); await sleep(700); await shot('20-pistol-armed');
    for (const [x, y] of [[1100, 640], [1400, 700], [900, 560]]) { await click(x, y); await sleep(700); }
    await shot('21-pistol-after');
    await page.keyboard.press('Escape'); await sleep(500);
  },
};
await steps[step]();
console.log(logs.length ? logs.join('\n') : '(console clean)');
process.exit(0);
