// Item 8: a Chrome trace of the whole browser (page, GPU process, workers) while an action runs, through the browser target's
// Tracing domain, written as JSON (traceEvents). node trace.mjs <out.json> <action-module>
import { createWriteStream } from 'node:fs';
import { pathToFileURL } from 'node:url';
import { connect, record } from './lib.mjs';

const [out, actionPath] = process.argv.slice(2);
const CATEGORIES = ['devtools.timeline', 'disabled-by-default-devtools.timeline', 'disabled-by-default-devtools.timeline.frame', 'blink.user_timing', 'v8', 'disabled-by-default-v8.gc', 'gpu', 'toplevel'];
const version = await (await fetch('http://127.0.0.1:9333/json/version')).json();
const ws = new WebSocket(version.webSocketDebuggerUrl);
await new Promise((ok, fail) => { ws.onopen = ok; ws.onerror = fail; });
let id = 0; const waiting = new Map(); let complete = null;
ws.onmessage = (e) => {
  const m = JSON.parse(e.data);
  if (m.id && waiting.has(m.id)) { const w = waiting.get(m.id); waiting.delete(m.id); m.error ? w.fail(new Error(m.error.message)) : w.ok(m.result); }
  if (m.method === 'Tracing.tracingComplete') complete?.(m.params);
};
const call = (method, params = {}) => new Promise((ok, fail) => { const i = ++id; waiting.set(i, { ok, fail }); ws.send(JSON.stringify({ id: i, method, params })); });
const done = new Promise((r) => { complete = r; });
await call('Tracing.start', { transferMode: 'ReturnAsStream', traceConfig: { recordMode: 'recordContinuously', includedCategories: CATEGORIES, enableSampling: false } });
const wall0 = Date.now();
const { page, cdp } = await connect();
const action = (await import(pathToFileURL(actionPath).href)).default;
await action({ page, cdp });
const wall1 = Date.now();
await call('Tracing.end');
const { stream } = await done;
const file = createWriteStream(out);
for (;;) {
  const chunk = await call('IO.read', { handle: stream, size: 4 << 20 });
  file.write(chunk.base64Encoded ? Buffer.from(chunk.data, 'base64') : chunk.data);
  if (chunk.eof) break;
}
await call('IO.close', { handle: stream });
await new Promise((r) => file.end(r));
record('trace', { out, wall0, wall1, categories: CATEGORIES });
console.log(`trace ${out} ${wall1 - wall0} ms`);
process.exit(0);
