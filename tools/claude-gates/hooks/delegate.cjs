// PreToolUse on Agent/Task: a delegation may not drop what the user requires. In the audit, 30 subagent prompts said
// "No screenshots" and many capped reports at a few hundred words, so the gaps never reached the parent.
// SubagentStart (session.cjs) injects the rule card; SubagentStop (claim-gate.cjs) checks the subagent's own claims.
const fs = require('fs'), path = require('path'), L = require('./lib.cjs');

(async () => {
  let e;
  try { e = JSON.parse(await L.readStdin()); } catch (err) { process.stderr.write('delegate: unreadable hook input: ' + err.message); process.exit(2); }
  const p = String((e.tool_input && (e.tool_input.prompt || e.tool_input.description)) || '');
  const dir = L.projectDir(e);
  const deny = (why) => {
    L.log(dir, `${String(e.session_id).slice(0, 8)} DENY Agent :: ${why.slice(0, 100)}`);
    process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: why } }));
    process.exit(0);
  };
  if (/\b(no|do not|don'?t|never) (take )?screenshots?\b|\bsem (fotos?|capturas?)\b|\bn[ãa]o (tire|tirar) (fotos?|capturas?)|no (embedded )?browser|skip (the )?(visual|verification|research)|n[ãa]o (pesquise|verifique)/i.test(p))
    deny('This delegation removes a check the user requires (screenshots, research or verification). Keep it, and ask the subagent to report the evidence, or "not done", for each requirement.');
  if (/\b(under|at most|max(imum)?|no more than|fewer than|less than|até|no m[áa]ximo|menos de)\s*~?\d+\s*(words|palavras)\b/i.test(p))
    deny('Do not cap the subagent report length: short reports were where the "not done" items disappeared. Ask instead for a list of every requirement with its evidence or "not done".');
  if (fs.existsSync(path.join(dir, 'ACCEPTANCE.json')) && !/ACCEPTANCE\.json/.test(p))
    deny('An acceptance file is active. Name ACCEPTANCE.json in the delegation prompt and require the subagent to report, per criterion, its evidence or "not done".');
  process.exit(0);
})().catch((err) => { process.stderr.write('delegate crashed: ' + err.stack); process.exit(2); });
