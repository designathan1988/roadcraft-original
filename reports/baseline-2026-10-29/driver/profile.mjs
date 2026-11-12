// Item 6: CPU profiles (V8 sampling, 100 us) and sampling heap profiles of every JS thread of the game at once: the page, its workers
// (Target.setAutoAttach, flatten), each job utility process (its Node inspector, NODE_OPTIONS=--inspect=127.0.0.1:0 at launch) and
// the worker threads inside them (NodeWorker domain). node profile.mjs <label> <ms> [cpu|heap|both] [action-module]
// The action module, if given, exports default async ({page, cdp}) => {} and is run while the profiles record (instead of waiting).
import { execSync } from 'node:child_process';
import { mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';
import { ROOT, connect, sleep, record } from './lib.mjs';

const [label, msArg, kind = 'both', actionPath] = process.argv.slice(2);
const ms = Number(msArg);
const OUT = join(ROOT, 'raw', 'profiles', label);
mkdirSync(OUT, { recursive: true });
const wantCpu = kind !== 'heap'; const wantHeap = kind !== 'cpu';

/** A raw inspector connection; `call` sends on a flat session (or the root) and waits for the answer. */
async function inspector(url) {
  const ws = new WebSocket(url);
  await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = () => fail(new Error(`ws ${url}`)); });
  let id = 0; const waiting = new Map(); const listeners = [];
  ws.onmessage = (e) => {
    const m = JSON.parse(e.data);
    if (m.id && waiting.has(m.id)) { const w = waiting.get(m.id); waiting.delete(m.id); m.error ? w.fail(new Error(`${w.method}: ${m.error.message}`)) : w.ok(m.result); }
    else for (const l of listeners) l(m);
  };
  const call = (method, params = {}, sessionId) => new Promise((ok, fail) => { const i = ++id; waiting.set(i, { ok, fail, method }); ws.send(JSON.stringify({ id: i, method, params, ...(sessionId ? { sessionId } : {}) })); });
  return { ws, call, on: (l) => listeners.push(l), close: () => ws.close() };
}

/** A thread to profile: `call` reaches its Profiler/HeapProfiler. */
const threads = [];
const failures = [];

// The page and its workers.
const list = await (await fetch('http://127.0.0.1:9333/json/list')).json();
const pageTarget = list.find((t) => t.type === 'page' && t.url.startsWith('http://127.0.0.1:5300'));
const page = await inspector(pageTarget.webSocketDebuggerUrl);
threads.push({ name: 'page', call: (m, p) => page.call(m, p) });
const workerSessions = [];
page.on((m) => {
  if (m.method === 'Target.attachedToTarget') {
    const s = m.params.sessionId;
    workerSessions.push({ s, url: m.params.targetInfo.url });
    page.call('Runtime.runIfWaitingForDebugger', {}, s).catch(() => {});
    page.call('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: false, flatten: true }, s).catch(() => {});
  }
});
await page.call('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: false, flatten: true });
await sleep(800);
for (const w of workerSessions) threads.push({ name: `worker:${w.url.replace(/^.*\/src\//, '').replace(/\?.*$/, '')}:${w.s.slice(0, 6)}`, call: (m, p) => page.call(m, p, w.s) });

// The job processes: each Electron utility process listening on an inspector port.
const ports = execSync(`powershell -NoProfile -Command "$e=(Get-CimInstance Win32_Process -Filter \\"Name='electron.exe'\\" | Where-Object { $_.CommandLine -match 'node.mojom.NodeService' }).ProcessId; Get-NetTCPConnection -State Listen | Where-Object { $e -contains $_.OwningProcess } | ForEach-Object { '' + $_.OwningProcess + ':' + $_.LocalPort }"`).toString().trim().split(/\s+/).filter(Boolean);
for (const pp of ports) {
  const [pid, port] = pp.split(':');
  try {
    const targets = await (await fetch(`http://127.0.0.1:${port}/json/list`)).json();
    const proc = await inspector(targets[0].webSocketDebuggerUrl);
    threads.push({ name: `job-process:${pid}`, call: (m, p) => proc.call(m, p) });
    // Its worker threads (Node's NodeWorker domain): messages relayed through the process's session.
    const sub = new Map(); let id = 0; const waiting = new Map();
    proc.on((m) => {
      if (m.method === 'NodeWorker.attachedToWorker') sub.set(m.params.sessionId, m.params.workerInfo);
      if (m.method === 'NodeWorker.receivedMessageFromWorker') {
        const inner = JSON.parse(m.params.message);
        if (inner.id && waiting.has(`${m.params.sessionId}:${inner.id}`)) { const w = waiting.get(`${m.params.sessionId}:${inner.id}`); waiting.delete(`${m.params.sessionId}:${inner.id}`); inner.error ? w.fail(new Error(inner.error.message)) : w.ok(inner.result); }
      }
    });
    await proc.call('NodeWorker.enable', { waitForDebuggerOnStart: false });
    await sleep(500);
    for (const [s, info] of sub) {
      threads.push({ name: `job-thread:${pid}:${(info.title || info.url || '').replace(/^.*[\\/]/, '').slice(0, 40)}:${s.slice(0, 6)}`, call: (method, params = {}) => new Promise((ok, fail) => { const i = ++id; waiting.set(`${s}:${i}`, { ok, fail }); proc.call('NodeWorker.sendMessageToWorker', { sessionId: s, message: JSON.stringify({ id: i, method, params }) }).catch(fail); }) });
    }
  } catch (e) { failures.push({ pid, port, error: String(e) }); }
}

// Start everything, then wait (or act), then stop and save.
const started = [];
for (const t of threads) {
  try {
    if (wantCpu) { await t.call('Profiler.enable'); await t.call('Profiler.setSamplingInterval', { interval: 100 }); await t.call('Profiler.start'); }
    if (wantHeap) { await t.call('HeapProfiler.enable'); await t.call('HeapProfiler.startSampling', { samplingInterval: 32768, includeObjectsCollectedByMajorGC: true, includeObjectsCollectedByMinorGC: true }); }
    started.push(t);
  } catch (e) { failures.push({ thread: t.name, error: String(e) }); }
}
const wall0 = Date.now();
if (actionPath) { const { page: pw, cdp } = await connect(); const action = (await import(pathToFileURL(actionPath).href)).default; await action({ page: pw, cdp }); }
else await sleep(ms);
const wall1 = Date.now();
const saved = [];
for (const t of started) {
  const file = t.name.replace(/[^a-zA-Z0-9._-]+/g, '_');
  try {
    if (wantCpu) { const { profile } = await t.call('Profiler.stop'); writeFileSync(join(OUT, `${file}.cpuprofile`), JSON.stringify(profile)); saved.push(`${file}.cpuprofile`); }
    if (wantHeap) { const { profile } = await t.call('HeapProfiler.getSamplingProfile'); await t.call('HeapProfiler.stopSampling'); writeFileSync(join(OUT, `${file}.heapprofile`), JSON.stringify(profile)); saved.push(`${file}.heapprofile`); }
  } catch (e) { failures.push({ thread: t.name, stop: String(e) }); }
}
record('profiles', { label, kind, ms: wall1 - wall0, wall0, wall1, threads: threads.map((t) => t.name), saved, failures });
console.log(JSON.stringify({ label, threads: threads.length, saved: saved.length, failures }, null, 1));
process.exit(0);
