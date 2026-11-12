// CPU profiles (.cpuprofile) to tables: self and total ms per function with its TypeScript file:line.
// Page and page workers: the dev server's modules carry inline source maps (Vite), mapped with source-map-js.
// Job processes: dist/desktop-jobs chunks have no source map; rolldown's `//#region src/...` comments give the source file of each
// line, the function name is V8's, and the TypeScript line is found by the function's declaration in that file (marked "~decl").
// node cpuAnalyze.mjs <dir with .cpuprofile> [top=30]   -> writes <dir>/cpu-summary.json and prints markdown
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const require = createRequire(join(process.cwd(), '..', '..', 'package.json'));
const { SourceMapConsumer } = require('source-map-js');
const REPO = join(fileURLToPath(import.meta.url), '..', '..', '..', '..');
const [dir, topArg] = process.argv.slice(2);
const TOP = Number(topArg ?? 30);

const consumers = new Map();
async function consumerFor(url) {
  if (consumers.has(url)) return consumers.get(url);
  let c = null;
  try {
    if (url.startsWith('http://127.0.0.1:5300/')) {
      const text = await (await fetch(url)).text();
      const m = text.match(/\/\/# sourceMappingURL=data:application\/json;(?:charset=utf-8;)?base64,([A-Za-z0-9+/=]+)\s*$/);
      if (m) c = { kind: 'map', map: new SourceMapConsumer(JSON.parse(Buffer.from(m[1], 'base64').toString('utf8'))) };
    } else if (url.includes('desktop-jobs')) {
      const path = url.startsWith('file:') ? fileURLToPath(url) : url;
      if (existsSync(path)) {
        const lines = readFileSync(path, 'utf8').split('\n');
        const region = []; let cur = null;
        for (const l of lines) { const r = l.match(/^\/\/#region (.+)$/); if (r) cur = r[1].trim(); else if (/^\/\/#endregion/.test(l)) { region.push(cur); cur = null; continue; } region.push(cur); }
        c = { kind: 'region', region };
      }
    }
  } catch { c = null; }
  consumers.set(url, c);
  return c;
}
const declCache = new Map();
function declLine(file, fn) {
  const key = `${file}|${fn}`;
  if (declCache.has(key)) return declCache.get(key);
  let line = null;
  try {
    const src = readFileSync(join(REPO, file), 'utf8').split('\n');
    const name = fn.replace(/^.*\./, '');
    const re = new RegExp(`(function\\*?\\s+${name}\\b|\\b${name}\\s*[(=:]|\\b(get|set|async|static)\\s+${name}\\s*\\()`);
    const i = src.findIndex((l) => re.test(l));
    if (i >= 0) line = i + 1;
  } catch { /* the file is not in the repository */ }
  declCache.set(key, line);
  return line;
}
async function where(cf) {
  if (!cf.url) return null;
  const c = await consumerFor(cf.url);
  if (c?.kind === 'map') {
    const p = c.map.originalPositionFor({ line: cf.lineNumber + 1, column: Math.max(0, cf.columnNumber) });
    if (p.source) return `${p.source.replace(/^.*?\/src\//, 'src/').replace(/^\/?/, '')}:${p.line}`;
  }
  if (c?.kind === 'region') {
    const file = c.region[cf.lineNumber];
    if (file) { const l = declLine(file, cf.functionName); return `${file}:${l ?? '?'}${l ? ' ~decl' : ''}`; }
  }
  return cf.url.replace(/^.*\/node_modules\//, 'node_modules/').replace('http://127.0.0.1:5300/', '');
}

const SPECIAL = new Set(['(program)', '(idle)', '(garbage collector)', '(root)']);
async function analyse(file) {
  const p = JSON.parse(readFileSync(file, 'utf8'));
  const byId = new Map(p.nodes.map((n) => [n.id, n]));
  const parent = new Map();
  for (const n of p.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
  // Self time per node from the samples and their time deltas (us).
  const self = new Map();
  for (let i = 0; i < p.samples.length; i++) self.set(p.samples[i], (self.get(p.samples[i]) ?? 0) + (p.timeDeltas[i] ?? 0));
  const totalUs = p.endTime - p.startTime;
  const fnSelf = new Map(); const fnTotal = new Map(); const meta = new Map();
  const keyOf = (n) => `${n.callFrame.functionName || '(anonymous)'}|${n.callFrame.url}|${n.callFrame.lineNumber}`;
  for (const n of p.nodes) meta.set(keyOf(n), n.callFrame);
  for (const [id, us] of self) {
    const n = byId.get(id);
    fnSelf.set(keyOf(n), (fnSelf.get(keyOf(n)) ?? 0) + us);
    // Total: each distinct function on this sample's stack once.
    const seen = new Set();
    for (let cur = id; cur !== undefined; cur = parent.get(cur)) { const k = keyOf(byId.get(cur)); if (seen.has(k)) continue; seen.add(k); fnTotal.set(k, (fnTotal.get(k) ?? 0) + us); }
  }
  let idle = 0, program = 0, gc = 0, attributed = 0, unattributed = 0;
  const rows = [];
  for (const [k, us] of fnSelf) {
    const cf = meta.get(k);
    if (cf.functionName === '(idle)') { idle += us; continue; }
    if (cf.functionName === '(program)') { program += us; continue; }
    if (cf.functionName === '(garbage collector)') { gc += us; continue; }
    if (cf.functionName === '(root)') continue;
    rows.push({ k, cf, self: us, total: fnTotal.get(k) ?? us });
  }
  const top = async (key) => {
    const sorted = rows.filter((r) => !SPECIAL.has(r.cf.functionName)).sort((a, b) => b[key] - a[key]).slice(0, TOP);
    const out = [];
    for (const r of sorted) out.push({ fn: r.cf.functionName || '(anonymous)', at: await where(r.cf), selfMs: +(r.self / 1000).toFixed(1), totalMs: +(r.total / 1000).toFixed(1) });
    return out;
  };
  for (const r of rows) { if (r.cf.url) attributed += r.self; else unattributed += r.self; }
  const busy = totalUs - idle;
  return { file: file.split(/[\\/]/).pop(), wallMs: +(totalUs / 1000).toFixed(0), busyMs: +(busy / 1000).toFixed(0), idleMs: +(idle / 1000).toFixed(0), programMs: +(program / 1000).toFixed(0), gcMs: +(gc / 1000).toFixed(0), jsWithSourceMs: +(attributed / 1000).toFixed(0), nativeNoUrlMs: +(unattributed / 1000).toFixed(0), samples: p.samples.length, topSelf: await top('self'), topTotal: await top('total') };
}


// Sampling heap profiles: bytes allocated (and still alive at the stop, samples kept by V8's sampler) per allocation site.
async function analyseHeap(file) {
  const p = JSON.parse(readFileSync(file, 'utf8'));
  const site = new Map(); let total = 0;
  const walk = (n, stack) => {
    const k = `${n.callFrame.functionName || '(anonymous)'}|${n.callFrame.url}|${n.callFrame.lineNumber}`;
    if (n.selfSize) { const r = site.get(k) ?? { cf: n.callFrame, bytes: 0, parent: stack }; r.bytes += n.selfSize; site.set(k, r); total += n.selfSize; }
    for (const c of n.children ?? []) walk(c, n.callFrame.functionName || stack);
  };
  walk(p.head, '');
  const sorted = [...site.values()].sort((a, b) => b.bytes - a.bytes).slice(0, TOP);
  const out = [];
  for (const r of sorted) out.push({ fn: r.cf.functionName || `(anonymous in ${r.parent || '?'})`, at: await where(r.cf), MB: +(r.bytes / 1048576).toFixed(2) });
  const noUrl = [...site.values()].filter((r) => !r.cf.url).reduce((a, r) => a + r.bytes, 0);
  return { file: file.split(/[\\/]/).pop(), sampledLiveMB: +(total / 1048576).toFixed(1), noUrlMB: +(noUrl / 1048576).toFixed(1), top: out };
}
const files = readdirSync(dir).filter((f) => f.endsWith('.cpuprofile'));
const all = [];
for (const f of files) all.push(await analyse(join(dir, f)));
all.sort((a, b) => b.busyMs - a.busyMs);
writeFileSync(join(dir, 'cpu-summary.json'), JSON.stringify(all, null, 1));
const heaps = [];
for (const f of readdirSync(dir).filter((f) => f.endsWith('.heapprofile'))) heaps.push(await analyseHeap(join(dir, f)));
heaps.sort((a, b) => b.sampledLiveMB - a.sampledLiveMB);
writeFileSync(join(dir, 'heap-summary.json'), JSON.stringify(heaps, null, 1));
for (const h of heaps) {
  console.log(`\n#### ${h.file}: ${h.sampledLiveMB} MB sampled (no source url ${h.noUrlMB} MB)`);
  if (h.sampledLiveMB < 1) continue;
  console.log('| # | allocation site | file:line | MB |\n|---|---|---|---|');
  h.top.forEach((r, i) => console.log(`| ${i + 1} | ${r.fn} | ${r.at} | ${r.MB} |`));
}
for (const a of all) {
  console.log(`\n#### ${a.file}: wall ${a.wallMs} ms, busy ${a.busyMs} ms (JS with a source ${a.jsWithSourceMs}, native/no url ${a.nativeNoUrlMs}, program ${a.programMs}, GC ${a.gcMs}), idle ${a.idleMs}`);
  if (a.busyMs < 50) continue;
  console.log('| # | function | file:line | self ms | total ms |\n|---|---|---|---|---|');
  a.topSelf.forEach((r, i) => console.log(`| ${i + 1} | ${r.fn} | ${r.at} | ${r.selfMs} | ${r.totalMs} |`));
}
