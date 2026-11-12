// The landscape drawer's tabs, each opened, its controls listed. node labels2.mjs
import { connect, sleep, input } from './lib.mjs';
const { page, cdp } = await connect();
const names = () => page.evaluate(() => [...document.querySelectorAll('.v2-drawer button,.v2-drawer input,.v2-toolopts button,.v2-toolopts input,.v2-toolopts select')].filter((e) => e.offsetParent).map((e) => (e.getAttribute('aria-label') || e.title || e.textContent || e.type || '').trim().replace(/\s+/g, ' ').slice(0, 40)).filter(Boolean));
const click = async (t) => { const b = await page.evaluate((l) => { const e = [...document.querySelectorAll('button,[role=tab]')].find((x) => x.offsetParent && (x.getAttribute('aria-label') || x.title || x.textContent).trim() === l); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, t); if (b) { await input.click(cdp, b); await sleep(600); } return !!b; };
await input.press(cdp, 't', 'KeyT', 0, 't'); await sleep(1000);
for (const tab of ['Relevo', 'Solo', 'Natureza', 'Céu e clima', 'Rua']) { console.log(`${tab} (${await click(tab)}): ${JSON.stringify(await names())}`); }
for (const sub of ['Árvores', 'Plantas', 'Efeitos', 'Água', 'Clima', 'Nuvens', 'Neblina', 'Postes', 'Paisagismo', 'Muros']) { const ok = await click(sub); if (ok) console.log(`  ${sub}: ${JSON.stringify(await names())}`); }
await input.press(cdp, 'Escape', 'Escape'); await input.press(cdp, 'Escape', 'Escape');
process.exit(0);
