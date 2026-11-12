// PreToolUse on Edit/Write of source files: implementation waits for research that leaves an artifact.
// A WebSearch only returns titles and links, so it does not count. The session must have (a) fetched at least one page with
// WebFetch and (b) written a note under research_notes/ that names a fetched URL and quotes it. The user can waive this for
// a session by typing #SEM-PESQUISA.
const L = require('./lib.cjs');

(async () => {
  let e;
  try { e = JSON.parse(await L.readStdin()); } catch (err) { process.stderr.write('research-gate: unreadable hook input: ' + err.message); process.exit(2); }
  const tool = String(e.tool_name || '');
  if (!/^(Edit|Write|MultiEdit|NotebookEdit)$/.test(tool)) process.exit(0);
  const dir = L.projectDir(e), cfg = L.config();
  const file = L.rel(dir, e.tool_input.file_path || e.tool_input.notebook_path || '');
  if (!L.matchAny(file, cfg.sourceGlobs)) process.exit(0);

  const key = e.agent_id ? `${e.session_id}-${e.agent_id}` : e.session_id;
  const st = L.loadState(e.session_id);
  if (st.noResearch || st.researchOk) process.exit(0);
  const sub = e.agent_id ? L.loadState(key) : st;
  if (sub.researchOk) process.exit(0);

  sub.index = L.indexTranscript(e.agent_transcript_path || e.transcript_path, sub.index);
  const fetched = new Set(sub.index.fetched);
  const good = sub.index.notes.filter((n) => L.matchAny(L.rel(dir, n.path), cfg.researchNotesGlobs) && n.quoted && n.urls.some((u) => fetched.has(u)));
  if (good.length) { sub.researchOk = true; L.saveState(key, sub); process.exit(0); }
  L.saveState(key, sub);

  const why = !fetched.size
    ? 'No page has been read with WebFetch in this session (a WebSearch result list is not a source).'
    : 'Pages were fetched, but no note under research_notes/ names one of them and quotes what it says.';
  L.log(dir, `${String(e.session_id).slice(0, 8)} DENY ${tool} ${file} :: research missing`);
  process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason:
    `Research before implementing: ${why} Before editing ${file}: open the official docs or the technique's primary source with WebFetch, then write research_notes/<topic>.md with each URL you fetched, a quoted passage ("> ..."), and what it means for this change. Then edit. (The user can waive this by typing #SEM-PESQUISA.)` } }));
  process.exit(0);
})().catch((err) => { process.stderr.write('research-gate crashed: ' + err.stack); process.exit(2); });
