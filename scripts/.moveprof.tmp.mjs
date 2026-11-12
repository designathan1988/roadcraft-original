import { chromium } from 'playwright';
const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
const page = browser.contexts().flatMap((c) => c.pages())[0];
const session = await page.context().newCDPSession(page);
await session.send('Profiler.enable');
await session.send('Profiler.setSamplingInterval', { interval: 500 });
await session.send('Profiler.start');
await page.mouse.move(1280, 500);
for (const key of ['KeyW', 'KeyD', 'KeyS', 'KeyA']) { await page.keyboard.down(key); await new Promise((r) => setTimeout(r, 4000)); await page.keyboard.up(key); }
const { profile } = await session.send('Profiler.stop');
const byId = new Map(profile.nodes.map((n) => [n.id, n]));
const parent = new Map();
for (const n of profile.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
const label = (n) => `${n.callFrame.functionName || '(anon)'}@${n.callFrame.url.split('/').pop().split('?')[0]}:${n.callFrame.lineNumber + 1}`;
const self = new Map(), incl = new Map();
let total = 0;
profile.samples.forEach((s, i) => {
  const dt = profile.timeDeltas[i] ?? 0; total += dt;
  const n = byId.get(s); self.set(label(n), (self.get(label(n)) ?? 0) + dt);
  const seen = new Set();
  for (let at = s; at !== undefined; at = parent.get(at)) { const l = label(byId.get(at)); if (seen.has(l)) continue; seen.add(l); incl.set(l, (incl.get(l) ?? 0) + dt); }
});
const show = (m, k) => [...m].sort((a, b) => b[1] - a[1]).slice(0, k).map(([l, v]) => `${(v / 1000).toFixed(0).padStart(6)} ms  ${l}`).join('\n');
console.log(`total ${(total / 1000).toFixed(0)} ms\n-- self\n${show(self, 22)}\n-- inclusive\n${show(incl, 45)}`);
process.exit(0);
