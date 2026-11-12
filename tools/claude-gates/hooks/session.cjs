// SessionStart (startup|resume|clear|compact|fork) and SubagentStart: put the rule card, the active limits and the acceptance
// criteria back into context. Instructions given only in chat are lost at compaction; this re-reads them from disk every time.
// On a fresh session it also snapshots the protected files, so claim-gate can tell what changed during the session.
const fs = require('fs'), path = require('path'), L = require('./lib.cjs');

(async () => {
  let e;
  try { e = JSON.parse(await L.readStdin()); } catch { process.exit(0); } // cannot block here; the gates still run
  const dir = L.projectDir(e), cfg = L.config(), st = L.loadState(e.session_id);
  const ev = e.hook_event_name;
  if (ev === 'SessionStart' && (e.source === 'startup' || e.source === 'clear' || !st.snapshot)) {
    try { st.snapshot = Object.fromEntries(L.protectedChanges(dir, cfg).map(({ file }) => [file, L.hashOf(dir, file)])); } catch { st.snapshot = {}; }
    L.saveState(e.session_id, st);
  }
  let card = '';
  try { card = fs.readFileSync(path.join(L.ROOT, 'RULES.md'), 'utf8'); } catch { card = '(RULES.md missing)'; }
  const accFile = path.join(dir, 'ACCEPTANCE.json');
  const acc = fs.existsSync(accFile) ? fs.readFileSync(accFile, 'utf8').slice(0, 3000) : 'none';
  const ctx = `${card}\n\nActive user limits (enforced): ${st.limits.join(', ') || 'none'}\nAcceptance criteria (ACCEPTANCE.json, read-only): ${acc}`;
  L.log(dir, `${String(e.session_id).slice(0, 8)} ${ev} ${e.source || e.agent_type || ''} rules injected`);
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: ev, additionalContext: ctx.slice(0, 9500) } }));
  process.exit(0);
})();
