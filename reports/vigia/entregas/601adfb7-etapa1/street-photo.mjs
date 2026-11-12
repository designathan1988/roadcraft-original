// The cast's people in the running game: a small city of seed 7 opened on the development server given, its pedestrians found where the
// game draws them (the instances of every `citizen-<id>@<level>` mesh), and the camera set over a street with several of them, near and far.
// `node street-photo.mjs <out folder> --url=http://127.0.0.1:<port>/ [--wait=40] [--at=x,y]` (`--at`: the street's centre, metres, instead of the busiest one found)
// Writes `<out>/street-<n>.png` (1920 x 1080) and `<out>/street.json`: per photo, which bodies and levels were drawn, how many figures each.
import { mkdirSync, writeFileSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { chromium } from '@playwright/test';

const args = process.argv.slice(2);
const flag = (name, fallback) => args.find((a) => a.startsWith(`--${name}=`))?.slice(name.length + 3) ?? fallback;
const out = resolve(args.find((a) => !a.startsWith('--')) ?? 'street');
const url = flag('url', 'http://127.0.0.1:5300/').replace(/\/?$/, '/');
const wait = Number(flag('wait', 40));
const at = flag('at', '')?.split(',').map(Number);
mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--enable-gpu', '--ignore-gpu-blocklist', '--use-angle=d3d11'] });
const report = { url, made: new Date().toISOString(), photos: [], errors: [] };
try {
  const page = await (await browser.newContext({ viewport: { width: 1920, height: 1080 } })).newPage();
  page.on('pageerror', (e) => report.errors.push(`page error: ${e.message}`));
  page.on('console', (m) => { if (m.type() === 'error') report.errors.push(m.text()); });
  await page.goto(url);
  await page.waitForFunction(() => performance.getEntriesByName('opening:shown').length > 0, null, { timeout: 300000, polling: 500 });
  await page.evaluate(() => { performance.clearMarks(); return window.__roadcraft.generateCity({ seed: 7, size: 'small' }); });
  await page.waitForFunction(() => performance.getEntriesByName('city:applied').length > 0 && performance.getEntriesByName('opening:shown').length > 0, null, { timeout: 600000, polling: 500 });
  await page.waitForFunction(() => { const c = document.getElementById('loading-curtain'); return !!c && getComputedStyle(c).display === 'none'; }, null, { timeout: 300000, polling: 500 });
  // Time for the walkers to come out and the bodies to load.
  await page.waitForTimeout(wait * 1000);
  /** Every figure the game draws now: its body, level and place, from the people's instanced meshes. */
  const figures = () => page.evaluate(() => {
    const scene = window.__roadcraft.scene().scene;
    const out = [];
    scene.traverse((o) => {
      const match = /^citizen-(mh_\d+)@(\w+)$/.exec(o.name ?? '');
      if (!match || !o.isInstancedMesh || !o.visible) return;
      const e = o.instanceMatrix.array;
      for (let i = 0; i < o.count; i++) out.push({ body: match[1], level: match[2], x: e[i * 16 + 12], y: -e[i * 16 + 14], z: e[i * 16 + 13] });
    });
    return out;
  });
  let all = await figures();
  if (all.length === 0) {
    // Seen from a middle distance first, so the walkers are asked for and loaded.
    await page.evaluate(() => window.__roadcraft.setView({ x: 0, y: 0, zoom: 3, azimuth: Math.PI / 4, elevation: 0.8 }));
    await page.waitForTimeout(15000);
    all = await figures();
  }
  report.figuresFound = all.length;
  // The street with the most figures within 25 m of one of them.
  const crowdAt = (f) => all.filter((g) => Math.hypot(g.x - f.x, g.y - f.y) < 25).length;
  const centres = at?.length === 2 ? [{ x: at[0], y: at[1] }] : [...all].sort((a, b) => crowdAt(b) - crowdAt(a)).slice(0, 1);
  report.centre = centres[0] ?? null;
  // Zoom in CSS pixels a metre: a 1.9 m figure 285, 76, 23 and 10 pixels tall (the finest level, the face band, the far levels, the impostor).
  const views = centres.flatMap((c) => [
    { name: 'near', x: c.x, y: c.y, zoom: 150, azimuth: Math.PI / 4, elevation: 0.45 },
    { name: 'street', x: c.x, y: c.y, zoom: 40, azimuth: Math.PI / 4, elevation: 0.6 },
    { name: 'far', x: c.x, y: c.y, zoom: 12, azimuth: Math.PI / 4, elevation: 0.8 },
    { name: 'block', x: c.x, y: c.y, zoom: 5, azimuth: Math.PI / 4, elevation: 0.9 },
  ]);
  for (const [n, v] of views.entries()) {
    await page.evaluate((view) => window.__roadcraft.setView(view), v);
    await page.waitForTimeout(6000);
    const file = `street-${n + 1}-${v.name}.png`;
    await page.screenshot({ path: join(out, file) });
    const drawn = await figures();
    const byBody = {};
    for (const f of drawn) byBody[`${f.body}@${f.level}`] = (byBody[`${f.body}@${f.level}`] ?? 0) + 1;
    report.photos.push({ file, view: v, figures: drawn.length, bodies: [...new Set(drawn.map((f) => f.body))].sort(), byBodyAndLevel: byBody });
    console.log(`${file}: ${drawn.length} figures, ${Object.keys(byBody).length} body/level pairs`);
  }
} finally {
  writeFileSync(join(out, 'street.json'), JSON.stringify(report, null, 1));
  await browser.close();
}
