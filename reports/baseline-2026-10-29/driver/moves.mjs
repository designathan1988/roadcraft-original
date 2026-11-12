// The camera movements and helpers shared by the route actions (the same as matrix.mjs's, so every pass moves the same way).
import { sleep, input, setView } from './lib.mjs';

export const ZOOMS = { rua: 8, perto: 3.5, bairro: 1.5, longe: 0.8, cidade: 0.45 };
const rad = (d) => (d * Math.PI) / 180;

export async function makeMoves(page, cdp) {
  const W = await page.evaluate(() => innerWidth); const H = await page.evaluate(() => innerHeight);
  const C = { x: Math.round(W / 2), y: Math.round(H / 2) };
  const b = await page.evaluate(() => window.__roadcraft.bounds());
  const centre = { x: (b.minX + b.maxX) / 2, y: (b.minY + b.maxY) / 2 };
  async function settle(maxMs = 6000) {
    const t = Date.now();
    for (;;) {
      const s = await page.evaluate(() => ({ o: window.__roadcraft.scene().opening, b: window.__roadcraft.scene().worldBusy }));
      if (!s.o && !s.b) break;
      if (Date.now() - t > maxMs) return { settled: false, waited: Date.now() - t };
      await sleep(250);
    }
    await sleep(1500);
    return { settled: true, waited: Date.now() - t };
  }
  async function clickLabel(label) {
    const box = await page.evaluate((l) => { const sp = l.match(/^Velocidade da simulação (\d)×$/) ? l.match(/(\d)×$/)[1] : l === 'Pausar' ? '0' : null; const e = sp !== null ? document.querySelector(`button[data-speed="${sp}"]`) : [...document.querySelectorAll('button')].find((x) => (x.getAttribute('aria-label') || x.title || x.textContent).trim().startsWith(l) && x.offsetParent); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, label);
    if (!box) throw new Error(`no button ${label}`);
    await input.click(cdp, box);
    await sleep(150);
  }
  const view = (zoom, tilt = 55, dir = 0) => ({ x: centre.x, y: centre.y, zoom: ZOOMS[zoom], azimuth: rad(dir), elevation: rad(tilt) });
  const go = async (zoom, tilt, dir) => { await setView(page, view(zoom, tilt, dir)); return settle(); };
  const MOVES = {
    panSlow: async () => input.drag(cdp, 'middle', { x: C.x - 300, y: C.y }, { x: C.x + 300, y: C.y }, 10000, 300),
    panFastDrag: async () => { for (let i = 0; i < 8; i++) { const d = i % 2 ? -1 : 1; await input.drag(cdp, 'middle', { x: C.x - 700 * d, y: C.y }, { x: C.x + 700 * d, y: C.y }, 1000, 30); await sleep(250); } },
    panKeys: async () => { await input.hold(cdp, 'w', 'KeyW', 5000); await input.hold(cdp, 's', 'KeyS', 5000); },
    orbit: async () => input.drag(cdp, 'right', { x: C.x - 600, y: C.y }, { x: C.x + 600, y: C.y }, 10000, 300),
    zoomIn: async () => input.wheel(cdp, C, -100, 100, 100),
    zoomOut: async () => input.wheel(cdp, C, 100, 100, 100),
    tilt: async () => { await input.hold(cdp, 'PageUp', 'PageUp', 5000); await input.hold(cdp, 'PageDown', 'PageDown', 5000); },
    turn90: async () => { for (let i = 0; i < 8; i++) { await input.press(cdp, i % 2 ? 'E' : 'Q', i % 2 ? 'KeyE' : 'KeyQ', 8); await sleep(1250); } },
    homeCentreReset: async () => {
      await input.press(cdp, 'Home', 'Home'); await sleep(3300);
      await clickLabel('Câmera'); await clickLabel('Enquadrar a câmera'); await sleep(3200);
      await clickLabel('Norte para cima'); await input.press(cdp, 'Escape', 'Escape'); await sleep(3300);
    },
  };
  /** The district zoom's whole route: each movement from the district's reference view. */
  async function bairroRoute() { for (const act of Object.values(MOVES)) { await go('bairro'); await act(); } }
  return { C, centre, settle, clickLabel, view, go, MOVES, bairroRoute };
}
