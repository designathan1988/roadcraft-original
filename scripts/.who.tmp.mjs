import { chromium } from 'playwright';
const want = process.argv[2] ?? 'get@items.ts';
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
const paths = new Map();
profile.samples.forEach((s, i) => {
  const dt = profile.timeDeltas[i] ?? 0;
  const chain = [];
  for (let at = s; at !== undefined; at = parent.get(at)) chain.push(label(byId.get(at)));
  const k = chain.findIndex((l) => l.startsWith(want));
  if (k < 0) return;
  const key = chain.slice(k, k + 9).join(' < ');
  paths.set(key, (paths.get(key) ?? 0) + dt);
});
for (const [k, v] of [...paths].sort((a, b) => b[1] - a[1]).slice(0, 10)) console.log(`${(v / 1000).toFixed(0).padStart(6)} ms  ${k}`);
process.exit(0);
