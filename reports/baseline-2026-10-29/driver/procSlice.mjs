// The per-process samples (logs/proc.csv, ~1-2 s apart) and nvidia-smi's (logs/nvsmi.csv, 500 ms) cut to a window of wall time:
// per process the memory at the window's end, its CPU % over the window (% of one core), its GPU dedicated memory and 3D %;
// the GPU's total utilisation over the window (mean, max).
import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT } from './lib.mjs';

let procRows = null, nvRows = null;
function load() {
  procRows = readFileSync(join(ROOT, 'logs', 'proc.csv'), 'utf8').replace(/^﻿/, '').trim().split(/\r?\n/).slice(1)
    .map((l) => l.replace(/^﻿/, '').split(',')).filter((r) => r.length >= 9)
    .map(([t, pid, kind, svc, ws, priv, cpu, gpuMem, gpu3d]) => ({ t: +t, pid: +pid, kind, svc, ws: +ws, priv: +priv, cpu: +cpu, gpuMem: +gpuMem, gpu3d: +gpu3d }));
  nvRows = readFileSync(join(ROOT, 'logs', 'nvsmi.csv'), 'utf8').trim().split(/\r?\n/).map((l) => l.split(',').map((s) => s.trim()))
    .filter((r) => r.length >= 4 && /^\d{4}\//.test(r[0])).map(([ts, util, mem, clk]) => ({ t: new Date(ts.replace(/\//g, '-').replace(' ', 'T')).getTime(), util: parseFloat(util), memMiB: parseFloat(mem), clk: parseFloat(clk) }));
}
const label = (r) => (r.kind === 'utility' && r.svc === 'node.mojom.NodeService' ? 'job/utility' : r.kind === 'utility' ? r.svc.replace(/\.mojom\..*/, '') : r.kind);

export function slice(wall0, wall1) {
  // Read again each time: the samplers keep appending while a driver runs.
  load();
  const inWin = procRows.filter((r) => r.t >= wall0 - 2500 && r.t <= wall1 + 2500);
  const byPid = new Map();
  for (const r of inWin) { const a = byPid.get(r.pid) ?? []; a.push(r); byPid.set(r.pid, a); }
  const procs = [];
  for (const [pid, rows] of byPid) {
    rows.sort((a, b) => a.t - b.t);
    const first = rows.find((r) => r.t >= wall0 - 2500) ?? rows[0]; const last = [...rows].reverse().find((r) => r.t <= wall1 + 2500) ?? rows[rows.length - 1];
    const dt = (last.t - first.t) / 1000;
    procs.push({ pid, kind: label(last), wsMB: last.ws, privateMB: last.priv, cpuPct: dt > 0.5 ? +(((last.cpu - first.cpu) / dt) * 100).toFixed(0) : null, gpuMemMB: last.gpuMem, gpu3dPct: +(rows.reduce((a, r) => a + r.gpu3d, 0) / rows.length).toFixed(1) });
  }
  procs.sort((a, b) => b.privateMB - a.privateMB);
  const nv = nvRows.filter((r) => r.t >= wall0 && r.t <= wall1);
  const sum = (k) => procs.reduce((a, p) => a + p[k], 0);
  return {
    procs, totalPrivateMB: Math.round(sum('privateMB')), totalWsMB: Math.round(sum('wsMB')), totalCpuPct: procs.reduce((a, p) => a + (p.cpuPct ?? 0), 0),
    gpuUtilMean: nv.length ? +(nv.reduce((a, r) => a + r.util, 0) / nv.length).toFixed(0) : null, gpuUtilMax: nv.length ? Math.max(...nv.map((r) => r.util)) : null, gpuMemMiB: nv.length ? nv[nv.length - 1].memMiB : null,
  };
}
export const short = (s) => `${s.procs.map((p) => `${p.kind}:${Math.round(p.privateMB)}MB/${p.cpuPct ?? '?'}%`).join(' ')} | total ${s.totalPrivateMB} MB, gpu ${s.gpuUtilMean}% (max ${s.gpuUtilMax}), vram ${s.gpuMemMiB} MiB`;
