// THE ANALYSIS of the one run (run15.mjs): every thread's CPU profile cut by the run's time marks, its live memory, by TypeScript file:line.
// - Page and page workers: the dev server's modules carry inline source maps (Vite) -> source-map-js gives the .ts line.
// - Job processes (dist/desktop-jobs chunks, no map): rolldown's `//#region src/...` comments give the .ts file; the line is the function's
//   declaration found in that file (marked "~decl").
// Writes raw/analysis.json and prints markdown: per thread and per segment the top functions by self and total time, what each segment costs
// over the still district view, the top live-memory lines and the sum per file, and the share not attributed (with why).
// node analyse.mjs [top=30]
import { readFileSync, readdirSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { createRequire } from 'node:module';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..'); const RAW = join(ROOT, 'raw'); const REPO = join(ROOT, '..', '..');
const { SourceMapConsumer } = createRequire(join(REPO, 'package.json'))('source-map-js');
const TOP = Number(process.argv[2] ?? 30);
const run = JSON.parse(readFileSync(join(RAW, 'marks.json'), 'utf8'));

// ---- source positions --------------------------------------------------------------------------------------------------------
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
        const region = []; let cur = null;
        for (const l of readFileSync(path, 'utf8').split('\n')) { const r = l.match(/^\/\/#region (.+)$/); if (r) cur = r[1].trim(); else if (/^\/\/#endregion/.test(l)) { region.push(cur); cur = null; continue; } region.push(cur); }
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
    const name = fn.replace(/^.*\./, '').replace(/[^A-Za-z0-9_$]/g, '');
    if (name) { const re = new RegExp(`(function\\*?\\s+${name}\\b|\\b${name}\\s*[(=:]|\\b(get|set|async|static)\\s+${name}\\s*\\()`); const i = src.findIndex((l) => re.test(l)); if (i >= 0) line = i + 1; }
  } catch { /* not a file of the repository */ }
  declCache.set(key, line);
  return line;
}
async function where(cf) {
  if (!cf.url) return '(no url: native or V8 builtin)';
  const c = await consumerFor(cf.url);
  if (c?.kind === 'map') { const p = c.map.originalPositionFor({ line: cf.lineNumber + 1, column: Math.max(0, cf.columnNumber) }); if (p.source) return `${p.source.replace(/^.*?\/(src|node_modules)\//, '$1/')}:${p.line}`; }
  if (c?.kind === 'region') { const file = c.region[cf.lineNumber]; if (file) { const l = declLine(file, cf.functionName); return `${file}:${l ?? '?'}${l ? ' ~decl' : ''}`; } }
  return cf.url.replace(/^.*\/node_modules\//, 'node_modules/').replace('http://127.0.0.1:5300/', '');
}

// ---- segments as wall-clock windows --------------------------------------------------------------------------------------------
const byName = new Map(run.marks.map((m) => [m.name, m.wall]));
const segs = [];
const openStart = run.marks.find((m) => m.name.startsWith('open:start'))?.wall;
if (openStart && byName.get('open:end')) segs.push({ name: 'open', w0: openStart, w1: byName.get('open:end') });
for (const m of run.marks) if (m.name.endsWith(':start') && !m.name.startsWith('open')) { const n = m.name.slice(0, -6); const e = byName.get(`${n}:end`); if (e) segs.push({ name: n, w0: m.wall, w1: e }); }
segs.push({ name: 'whole run', w0: run.T0, w1: byName.get('profiles:stop') ?? Date.now() });

const SPECIAL = new Set(['(program)', '(idle)', '(garbage collector)', '(root)']);
async function cpu(file, wallStart) {
  const p = JSON.parse(readFileSync(file, 'utf8'));
  const byId = new Map(p.nodes.map((n) => [n.id, n])); const parent = new Map();
  for (const n of p.nodes) for (const c of n.children ?? []) parent.set(c, n.id);
  const key = (n) => `${n.callFrame.functionName || '(anonymous)'}|${n.callFrame.url}|${n.callFrame.lineNumber}`;
  // Sample times, us since the profile's start, mapped to wall time by the start (Profiler.start returned at wallStart).
  const times = []; let t = 0; for (const d of p.timeDeltas) { t += d; times.push(t); }
  const out = {};
  for (const s of segs) {
    const a = (s.w0 - wallStart) * 1000; const b = (s.w1 - wallStart) * 1000;
    const self = new Map(); const total = new Map(); let busy = 0, idle = 0, program = 0, gc = 0, noUrl = 0, n = 0;
    for (let i = 0; i < p.samples.length; i++) {
      if (times[i] < a || times[i] >= b) continue;
      const dt = p.timeDeltas[i + 1] ?? 200; n++;
      const node = byId.get(p.samples[i]); const fn = node.callFrame.functionName;
      if (fn === '(idle)') { idle += dt; continue; }
      busy += dt;
      if (fn === '(program)') { program += dt; continue; }
      if (fn === '(garbage collector)') { gc += dt; continue; }
      if (!node.callFrame.url) noUrl += dt;
      const k = key(node); self.set(k, (self.get(k) ?? 0) + dt);
      const seen = new Set();
      for (let cur = node.id; cur !== undefined; cur = parent.get(cur)) { const kk = key(byId.get(cur)); if (seen.has(kk) || SPECIAL.has(byId.get(cur).callFrame.functionName)) continue; seen.add(kk); total.set(kk, (total.get(kk) ?? 0) + dt); }
    }
    if (!n) continue;
    const frames = new Map(p.nodes.map((x) => [key(x), x.callFrame]));
    const rows = async (m) => { const r = []; for (const [k, us] of [...m].sort((x, y) => y[1] - x[1]).slice(0, TOP)) { const cf = frames.get(k); r.push({ fn: cf.functionName || '(anonymous)', at: await where(cf), ms: +(us / 1000).toFixed(1), selfMs: +((self.get(k) ?? 0) / 1000).toFixed(1), totalMs: +((total.get(k) ?? 0) / 1000).toFixed(1) }); } return r; };
    out[s.name] = { wallMs: s.w1 - s.w0, busyMs: +(busy / 1000).toFixed(0), idleMs: +(idle / 1000).toFixed(0), programMs: +(program / 1000).toFixed(0), gcMs: +(gc / 1000).toFixed(0), noUrlMs: +(noUrl / 1000).toFixed(0), selfRaw: Object.fromEntries([...self].map(([k, v]) => [k, v])), topSelf: await rows(self), topTotal: await rows(total) };
  }
  return { out, frames: new Map(p.nodes.map((x) => [key(x), x.callFrame])) };
}
async function heap(file) {
  const p = JSON.parse(readFileSync(file, 'utf8'));
  const site = new Map(); let total = 0;
  const walk = (n, parentFn) => { const k = `${n.callFrame.functionName || '(anonymous)'}|${n.callFrame.url}|${n.callFrame.lineNumber}`; if (n.selfSize) { const r = site.get(k) ?? { cf: n.callFrame, bytes: 0, parentFn }; r.bytes += n.selfSize; site.set(k, r); total += n.selfSize; } for (const c of n.children ?? []) walk(c, n.callFrame.functionName || parentFn); };
  walk(p.head, '');
  const top = []; const perFile = new Map(); let noUrl = 0;
  for (const r of site.values()) { const at = await where(r.cf); const f = at.replace(/:\d+.*$/, ''); perFile.set(f, (perFile.get(f) ?? 0) + r.bytes); if (!r.cf.url) noUrl += r.bytes; r.at = at; }
  for (const r of [...site.values()].sort((a, b) => b.bytes - a.bytes).slice(0, TOP)) top.push({ fn: r.cf.functionName || `(anonymous in ${r.parentFn || '?'})`, at: r.at, MB: +(r.bytes / 1048576).toFixed(1) });
  return { liveMB: +(total / 1048576).toFixed(1), noUrlMB: +(noUrl / 1048576).toFixed(1), top, perFile: [...perFile].sort((a, b) => b[1] - a[1]).slice(0, TOP).map(([f, b]) => ({ file: f, MB: +(b / 1048576).toFixed(1) })) };
}

const result = { segments: segs.map((s) => ({ ...s, ms: s.w1 - s.w0 })), threads: [] };
const dir = join(RAW, 'profiles');
for (const t of run.threads) {
  const cpuFile = join(dir, `${t.file}.cpuprofile`); const heapFile = join(dir, `${t.file}.heapprofile`);
  const row = { thread: t.name };
  if (existsSync(cpuFile)) { const c = await cpu(cpuFile, t.wallStart); row.cpu = c.out; row._frames = c.frames; }
  if (existsSync(heapFile)) row.heap = await heap(heapFile);
  result.threads.push(row);
}
// What each segment costs over the still district view (55°), per thread: self ms a second, the functions that grow most.
const BASE = 'still-district-55';
for (const t of result.threads) {
  if (!t.cpu?.[BASE]) continue;
  const base = t.cpu[BASE]; const bs = base.wallMs / 1000;
  t.extra = {};
  for (const [name, s] of Object.entries(t.cpu)) {
    if (name === BASE || name === 'whole run') continue;
    const ss = s.wallMs / 1000; const grow = [];
    for (const [k, us] of Object.entries(s.selfRaw)) { const d = us / ss - (base.selfRaw[k] ?? 0) / bs; if (d > 0) grow.push([k, d]); }
    grow.sort((a, b) => b[1] - a[1]);
    const rows = [];
    for (const [k, d] of grow.slice(0, 15)) { const cf = t._frames.get(k); rows.push({ fn: cf.functionName || '(anonymous)', at: await where(cf), extraMsPerS: +(d / 1000).toFixed(1) }); }
    t.extra[name] = { busyPerS: +(s.busyMs / ss).toFixed(0), baseBusyPerS: +(base.busyMs / bs).toFixed(0), grow: rows };
  }
}
for (const t of result.threads) { delete t._frames; if (t.cpu) for (const s of Object.values(t.cpu)) delete s.selfRaw; }
writeFileSync(join(RAW, 'analysis.json'), JSON.stringify(result, null, 1));

// ---- markdown --------------------------------------------------------------------------------------------------------------
const md = [];
md.push('## Segments', '| segment | ms |', '|---|---|', ...result.segments.map((s) => `| ${s.name} | ${s.ms} |`));
const busyOf = (t) => t.cpu?.['whole run']?.busyMs ?? 0;
for (const t of [...result.threads].sort((a, b) => busyOf(b) - busyOf(a))) {
  const w = t.cpu?.['whole run'];
  if (!w || (w.busyMs < 500 && (t.heap?.liveMB ?? 0) < 20)) continue;
  md.push('', `### ${t.thread}`, `Whole run: busy ${w.busyMs} ms of ${w.wallMs} ms (GC ${w.gcMs}, "program" ${w.programMs} = V8/engine work outside JS functions, native or builtin with no URL ${w.noUrlMs}); live memory at the end ${t.heap?.liveMB ?? '-'} MB (with no source URL ${t.heap?.noUrlMB ?? '-'} MB).`);
  for (const [name, s] of Object.entries(t.cpu)) {
    if (s.busyMs < 100) continue;
    md.push('', `#### ${t.thread} · ${name}: busy ${s.busyMs} ms of ${s.wallMs} ms`, '| # | function | file:line | self ms | total ms |', '|---|---|---|---|---|');
    s.topSelf.forEach((r, i) => md.push(`| ${i + 1} | ${r.fn} | ${r.at} | ${r.selfMs} | ${r.totalMs} |`));
    md.push('', 'by total time:', '| # | function | file:line | total ms |', '|---|---|---|---|');
    s.topTotal.forEach((r, i) => md.push(`| ${i + 1} | ${r.fn} | ${r.at} | ${r.totalMs} |`));
  }
  if (t.extra) {
    md.push('', `#### ${t.thread} · what each segment adds over ${BASE} (busy ms a second, and the functions that grow most)`);
    for (const [name, e] of Object.entries(t.extra)) md.push(`- ${name}: ${e.busyPerS} vs ${e.baseBusyPerS} ms/s; ${e.grow.slice(0, 8).map((g) => `${g.fn} ${g.at} +${g.extraMsPerS}`).join('; ')}`);
  }
  if (t.heap) {
    md.push('', `#### ${t.thread} · live memory at the end: ${t.heap.liveMB} MB`, '| # | allocated by | file:line | MB |', '|---|---|---|---|');
    t.heap.top.forEach((r, i) => md.push(`| ${i + 1} | ${r.fn} | ${r.at} | ${r.MB} |`));
    md.push('', 'by file:', ...t.heap.perFile.map((f) => `- ${f.file}: ${f.MB} MB`));
  }
}
writeFileSync(join(RAW, 'analysis.md'), md.join('\n'));
console.log(md.join('\n').slice(0, 4000));
