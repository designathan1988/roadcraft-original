"""THE STALLS IN CHROME'S TRACE: for each frame past 33 ms the flight recorder kept in a stall series (`scripts/stalls.mjs`), what the page's
main thread, the GPU process and the collector did between the end of the frame before and its own end, read from the run's trace with
Perfetto's trace processor (https://perfetto.dev/docs/analysis/trace-processor-python). The frames' ends are tied to the trace by the
recorder's `console.timeStamp('flight:N')` (a TimeStamp event of devtools.timeline).

    python -I scripts/stalls_trace.py reports/stalls/<label>

Writes reports/stalls/<label>/trace-stalls.json: {"<run>:<frame>": {"main": [[name, ms], ...], "gpu": [[name, ms], ...], "gc_ms": n,
"gpu_busy_ms": n, "main_busy_ms": n}}, which `scripts/stalls-report.mjs` joins to each stall.
"""
import json
import os
import re
import sys

from perfetto.trace_processor import TraceProcessor

SLOW_MS = 33


def main(folder: str) -> None:
    out = {}
    runs = sorted(f for f in os.listdir(folder) if re.fullmatch(r'run-\d+\.json', f))
    for name in runs:
        run = json.load(open(os.path.join(folder, name), encoding='utf-8'))
        trace = os.path.join(folder, name.replace('.json', '.trace.json'))
        if not run.get('valid') or not os.path.exists(trace):
            continue
        tp = TraceProcessor(trace=trace)
        ends = {}
        for r in tp.query("select ts, extract_arg(arg_set_id, 'args.data.message') m from slice where name = 'TimeStamp'"):
            if r.m and r.m.startswith('flight:'):
                ends[int(r.m[7:])] = r.ts
        for seg in run['segments']:
            for f in seg['slow']:
                if f['interval'] <= SLOW_MS or f['n'] not in ends or f['n'] - 1 not in ends:
                    continue
                t0, t1 = ends[f['n'] - 1], ends[f['n']]

                def top(thread: str, process: str, depth0: bool = True) -> list:
                    q = f"""select s.name, sum(min(s.ts + s.dur, {t1}) - max(s.ts, {t0})) / 1e6 ms from slice s
                        join thread_track tt on s.track_id = tt.id join thread t using(utid) left join process p using(upid)
                        where t.name = '{thread}' and p.name like '{process}%' and s.ts < {t1} and s.ts + s.dur > {t0}
                        {'and s.depth = 0' if depth0 else ''} group by s.name order by ms desc limit 8"""
                    return [[r.name, round(r.ms, 2)] for r in tp.query(q)]

                main_rows = top('CrRendererMain', 'Renderer')
                gpu_rows = top('CrGpuMain', 'GPU Process')
                gc = list(tp.query(f"""select coalesce(sum(min(s.ts + s.dur, {t1}) - max(s.ts, {t0})), 0) / 1e6 ms from slice s
                    where (s.name like 'V8.GC%' or s.name in ('MajorGC', 'MinorGC', 'BlinkGC.AtomicPhase')) and s.ts < {t1} and s.ts + s.dur > {t0}"""))
                out[f"{run['i']}:{f['n']}"] = {
                    'main': main_rows, 'gpu': gpu_rows, 'gc_ms': round(gc[0].ms, 2),
                    'main_busy_ms': round(sum(ms for _, ms in main_rows), 2), 'gpu_busy_ms': round(sum(ms for _, ms in gpu_rows), 2),
                }
        tp.close()
    json.dump(out, open(os.path.join(folder, 'trace-stalls.json'), 'w', encoding='utf-8'), indent=1)
    print(f'{len(out)} stalls read in the traces of {folder}')


if __name__ == '__main__':
    main(sys.argv[1])
