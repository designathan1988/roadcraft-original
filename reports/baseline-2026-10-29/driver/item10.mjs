// Item 10: the simulation's step, vehicles and people, the job pool (workers, busy, waiting, requests a second) and the messages the
// page sends (postMessage of Worker and MessagePort wrapped from outside: calls and the bytes of the ArrayBuffers/typed arrays found
// in the message, two levels deep; transferred ones counted apart), 20 s per state: 1x, 2x, 4x and paused, the camera still.
// node item10.mjs <city>
import { connect, record, sleep } from './lib.mjs';
import { makeMoves } from './moves.mjs';

const city = process.argv[2];
const { page, cdp } = await connect();
const m = await makeMoves(page, cdp);
await page.evaluate(() => {
  if (window.__msg) return;
  const c = window.__msg = { out: 0, outBytes: 0, transferred: 0, byTarget: {} };
  const size = (v, depth) => { if (!v || typeof v !== 'object' || depth > 2) return 0; if (ArrayBuffer.isView(v)) return v.byteLength; if (v instanceof ArrayBuffer || (typeof SharedArrayBuffer !== 'undefined' && v instanceof SharedArrayBuffer)) return v.byteLength; let s = 0; for (const k in v) { try { s += size(v[k], depth + 1); } catch { /* a getter that throws */ } } return s; };
  for (const [Proto, label] of [[Worker.prototype, 'Worker'], [MessagePort.prototype, 'MessagePort']]) {
    const f = Proto.postMessage;
    Proto.postMessage = function (message, transfer) {
      c.out++; const b = size(message, 0); c.outBytes += b;
      const list = Array.isArray(transfer) ? transfer : transfer?.transfer; if (list?.length) c.transferred++;
      const t = c.byTarget[label] || (c.byTarget[label] = [0, 0]); t[0]++; t[1] += b;
      return f.apply(this, arguments);
    };
  }
});
await m.go('bairro');
for (const state of ['1', '2', '4', 'pause']) {
  if (state === 'pause') await m.clickLabel('Pausar');
  else { await m.clickLabel(`Velocidade da simulação ${state}×`); }
  await sleep(2000);
  const rows = await page.evaluate(async () => {
    const r = window.__roadcraft; const out = [];
    const c = window.__msg; c.out = 0; c.outBytes = 0; c.transferred = 0; c.byTarget = {};
    let sub0 = r.jobPool().submitted;
    for (let i = 0; i < 40; i++) {
      await new Promise((w) => setTimeout(w, 500));
      const j = r.jobPool();
      out.push({ stepMs: r.sim.stats?.stepMs ?? null, vehicles: r.sim.vehicles.size, people: r.sim.pedViews.length, workers: j.workers.length, busy: j.workers.filter((w) => w.running).length, waiting: j.waiting, submittedPerS: (j.submitted - sub0) * 2, ports: j.ports, running: j.workers.filter((w) => w.running).map((w) => w.running) });
      sub0 = j.submitted;
    }
    return { samples: out, messages: { ...c } };
  });
  const s = rows.samples;
  const avg = (k) => +(s.reduce((a, x) => a + (x[k] ?? 0), 0) / s.length).toFixed(2);
  const runningCount = {}; for (const x of s) for (const n of x.running) runningCount[n] = (runningCount[n] ?? 0) + 1;
  const row = { city, state, stepMsAvg: avg('stepMs'), stepMsMax: Math.max(...s.map((x) => x.stepMs ?? 0)), vehicles: s[s.length - 1].vehicles, people: s[s.length - 1].people, workers: s[0].workers, busyAvg: avg('busy'), waitingAvg: avg('waiting'), requestsPerS: avg('submittedPerS'), messagesOutPerS: +(rows.messages.out / 20).toFixed(1), messageBytesOutPerS: Math.round(rows.messages.outBytes / 20), transferredPerS: +(rows.messages.transferred / 20).toFixed(1), byTarget: rows.messages.byTarget, runningSamples: runningCount, wall1: Date.now() };
  record('item10', row);
  console.log(JSON.stringify(row));
}
await m.clickLabel('Pausar').catch(() => {});
await m.clickLabel('Velocidade da simulação 1×');
process.exit(0);
