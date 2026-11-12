// Item 13: every console error/warning and uncaught exception of the page and its workers, for the whole session, through the
// browser's DevTools endpoint (Target.setAutoAttach, flatten: the page, its dedicated workers and their nested workers).
// Reconnects when the game is closed and opened again. Writes logs/console.jsonl.
import { appendFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, sleep } from './lib.mjs';

const OUT = join(ROOT, 'logs', 'console.jsonl');
const log = (row) => appendFileSync(OUT, `${JSON.stringify({ wall: Date.now(), ...row })}\n`);

async function session() {
  const version = await (await fetch('http://127.0.0.1:9333/json/version')).json();
  const ws = new WebSocket(version.webSocketDebuggerUrl);
  let id = 0;
  const send = (method, params = {}, sessionId) => ws.send(JSON.stringify({ id: ++id, method, params, ...(sessionId ? { sessionId } : {}) }));
  const kinds = new Map();
  await new Promise((open, fail) => { ws.onopen = open; ws.onerror = fail; });
  ws.onmessage = (event) => {
    const m = JSON.parse(event.data);
    if (m.method === 'Target.attachedToTarget') {
      const s = m.params.sessionId; const info = m.params.targetInfo;
      kinds.set(s, `${info.type}:${info.url.slice(0, 120)}`);
      log({ event: 'attached', target: kinds.get(s) });
      send('Runtime.enable', {}, s);
      send('Log.enable', {}, s);
      send('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: false, flatten: true }, s);
      send('Runtime.runIfWaitingForDebugger', {}, s);
    } else if (m.method === 'Runtime.consoleAPICalled' && (m.params.type === 'error' || m.params.type === 'warning' || m.params.type === 'assert')) {
      const text = m.params.args.map((a) => a.value ?? a.description ?? a.type).join(' ').slice(0, 2000);
      const frame = m.params.stackTrace?.callFrames?.[0];
      log({ target: kinds.get(m.sessionId), level: m.params.type, text, at: frame ? `${frame.url}:${frame.lineNumber + 1}` : null });
    } else if (m.method === 'Runtime.exceptionThrown') {
      const d = m.params.exceptionDetails;
      log({ target: kinds.get(m.sessionId), level: 'exception', text: (d.exception?.description ?? d.text).slice(0, 3000), at: d.url ? `${d.url}:${d.lineNumber + 1}` : null });
    } else if (m.method === 'Log.entryAdded' && (m.params.entry.level === 'error' || m.params.entry.level === 'warning')) {
      log({ target: kinds.get(m.sessionId), level: `log-${m.params.entry.level}`, text: m.params.entry.text.slice(0, 2000), at: m.params.entry.url ?? null, source: m.params.entry.source });
    } else if (m.method === 'Target.detachedFromTarget') {
      log({ event: 'detached', target: kinds.get(m.params.sessionId) });
    }
  };
  send('Target.setDiscoverTargets', { discover: true });
  send('Target.setAutoAttach', { autoAttach: true, waitForDebuggerOnStart: false, flatten: true });
  await new Promise((closed) => { ws.onclose = closed; });
}

for (;;) {
  try { await session(); log({ event: 'browser closed' }); } catch { /* the game not running: tried again */ }
  await sleep(2000);
}
