// Reads the names of the buttons each drawer shows (to point the remaining steps at the game's real labels). node labels.mjs
import { connect, sleep, input } from './lib.mjs';
const { page, cdp } = await connect();
const names = () => page.evaluate(() => [...document.querySelectorAll('button,[role=tab],[role=switch],input,select')].filter((e) => e.offsetParent && e.getBoundingClientRect().width > 0).map((e) => (e.getAttribute('aria-label') || e.title || e.textContent || e.type || '').trim().replace(/\s+/g, ' ').slice(0, 40)).filter(Boolean));
if (await page.evaluate(() => [...document.querySelectorAll('button')].some((b) => b.textContent.trim() === 'Continuar' && b.offsetParent))) { const b = await page.evaluate(() => { const e = [...document.querySelectorAll('button')].find((x) => x.textContent.trim() === 'Continuar'); const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }); await input.click(cdp, b); await sleep(500); }
const esc = async () => { await input.press(cdp, 'Escape', 'Escape'); await input.press(cdp, 'Escape', 'Escape'); await sleep(300); };
for (const [label, key] of [['LANDSCAPE', 't'], ['BUILDER', 'h'], ['TRANSIT', 'o'], ['DEMOLISH', 'b'], ['ZONE', 'z']]) {
  await input.press(cdp, key, `Key${key.toUpperCase()}`, 0, key); await sleep(1200);
  console.log(`${label}: ${JSON.stringify(await names())}`);
  await esc();
}
process.exit(0);
