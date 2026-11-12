// Stop / SubagentStop: no "done" without evidence.
// Obligations come first from ACTIONS (edited source => a check ran after the last edit; edited visual code => a screenshot
// taken after it was opened), then from CLAIMS in the final message ("li", "testei", "vi a imagem", "pesquisei", "commitei",
// cited links). Every block offers the honest way out: saying plainly what was not done always passes.
// Stop hooks have no onFailure, so this script never crashes silently: on an internal error it tells the user the turn was NOT checked.
const fs = require('fs'), path = require('path'), { spawnSync } = require('child_process'), L = require('./lib.cjs');

const tellUser = (m) => { process.stdout.write(JSON.stringify({ systemMessage: m })); process.exit(0); };

(async () => {
  let e;
  try { e = JSON.parse(await L.readStdin()); } catch (err) { tellUser('claim-gate: entrada ilegível; este turno NÃO foi conferido. ' + err.message); }
  try { run(e); } catch (err) { tellUser('claim-gate falhou; este turno NÃO foi conferido: ' + err.message); }
})();

// Text with negated phrases removed, so "não testei" is not read as "testei".
const affirmative = (msg) => msg.replace(/\b(n[ãa]o|nunca|sem|ainda n[ãa]o|not|never|didn'?t|haven'?t|wasn'?t|without)\b[^.\n;:,]{0,60}/gi, ' ');
const HONEST = {
  verify: /n[ãa]o (testei|verifiquei|rodei|executei|conferi|compilei|rodei (os )?testes)|sem (testar|verificar|rodar)|n[ãa]o (foi|est[áa]) (testad|verificad)|not (yet )?(tested|verified|run)|did ?n[o']t (test|verify|run)/i,
  visual: /n[ãa]o (verifiquei|conferi|olhei|vi|abri|tirei)[^.\n]{0,40}(visual|imagem|imagens|foto|fotos|captura|capturas|screenshot)|sem (captura|foto|verifica[çc][ãa]o visual)|not (visually )?(verified|checked) (visually|on screen)|no screenshot/i,
};
const CLAIMS = {
  read: /\b(li|lido|lida|lidos|lidas|reli|leitura (integral|completa)|read (the )?(whole|entire|full|complete)|fully read|read (it|them) (all|in full))\b/i,
  look: /\b(vi|abri|olhei|analisei|conferi|examinei|mostra|mostram|aparece|aparecem|looked at|opened|the (image|screenshot) shows)\b/i,
  tested: /\b(testei|testado|testada|testes (passam|passaram|passando|verdes?)|rodei os testes|su[íi]te (passa|passou|verde)|tudo passa|verifiquei que (passa|funciona|compila|roda)|compila(ndo)? (limpo|sem erros?)|typecheck (limpo|passa|ok)|tests? (pass|passed|passing|green)|all green|verified (that )?it (works|passes)|it (builds|compiles))\b/i,
  researched: /\b(pesquisei|pesquisa (feita|conclu[íi]da)|consultei|segundo a documenta[çc][ãa]o|de acordo com a (documenta[çc][ãa]o|fonte)|fontes? consultadas?|researched|according to the (docs|documentation))\b/i,
  committed: /\b(commitei|commit(ado|ada|ados)?\s+[0-9a-f]{7,}|fiz (o )?commit|committed)\b/i,
  done: /\b(pronto|conclu[íi]d[oa]|conclu[íi]|terminei|terminado|finalizei|implementei|corrigi|resolvi|feito\b|done\b|complete[d]?\b|finished\b|fixed\b|implemented\b)/i,
};

function run(e) {
  const dir = L.projectDir(e), cfg = L.config();
  const sub = e.hook_event_name === 'SubagentStop';
  const key = sub ? `${e.session_id}-${e.agent_id}` : e.session_id;
  const st = L.loadState(key), main = sub ? L.loadState(e.session_id) : st;
  const raw = String(e.last_assistant_message || '');
  const msg = raw.replace(/```[\s\S]*?```/g, ' ');
  const aff = affirmative(msg);
  st.index = L.indexTranscript(sub ? e.agent_transcript_path : e.transcript_path, st.index);
  const idx = st.index, turn = idx.turn;
  const rel = (p) => L.rel(dir, p);
  const problems = [];

  const edits = turn.filter((x) => x.kind === 'edit' && x.ok);
  const lastEdit = edits.length ? edits[edits.length - 1].n : -1;
  const editedSrc = edits.filter((x) => L.matchAny(rel(x.path), cfg.sourceGlobs) && !L.matchAny(rel(x.path), cfg.protectExisting));
  const editedVis = edits.filter((x) => L.matchAny(rel(x.path), cfg.visualGlobs));
  const checks = turn.filter((x) => x.kind === 'shell' && L.anyRe(x.cmd, cfg.verifyPatterns));
  const masked = (x) => /\|\s*(tail|head|Select-Object|grep|findstr)\b/i.test(x.cmd) && !/pipefail/.test(x.cmd);
  const cleanAfter = (n) => checks.filter((x) => x.n > n && x.ok && !x.bg && !masked(x));

  // 1. Source edited => a check ran after the last edit, unpiped, and passed.
  if (editedSrc.length && !HONEST.verify.test(msg)) {
    const after = checks.filter((x) => x.n > lastEdit);
    if (!after.length) problems.push(`You edited ${editedSrc.length} source file(s) (${[...new Set(editedSrc.map((x) => rel(x.path)))].slice(0, 5).join(', ')}) and no check ran after your last edit. Run one (typecheck, tests, the catalogue sheet) and report its real result, or write plainly "não verifiquei".`);
    else if (!cleanAfter(lastEdit).length) problems.push('Every check after your last edit failed, ran in the background, or was piped through tail/head/grep (which hides its exit code). Run it unpiped and report the real result, or say it failed.');
  }
  // 2. Visual code edited => a screenshot opened with Read after the last edit.
  if (editedVis.length && !HONEST.visual.test(msg)) {
    const shots = turn.filter((x) => x.kind === 'read' && x.image && x.ok && x.n > lastEdit);
    if (!shots.length) problems.push('You changed code that draws something and opened no image taken after the change. Render it, open the PNG with Read, say what it shows and give its path; or write plainly "não verifiquei visualmente".');
  }
  // 3. "I read X" => the session's Reads of X cover every line.
  if (CLAIMS.read.test(aff) && !/\blinhas?\s+\d+\s*(a|at[ée]|-|–)\s*\d+|\blines?\s+\d+\s*(to|-|–)\s*\d+/i.test(msg)) {
    const named = turn.filter((x) => x.kind === 'read' && !x.image && x.total && msg.toLowerCase().includes(path.basename(x.path)));
    for (const p of new Set(named.map((x) => x.path))) {
      const c = L.coverage(idx, p);
      if (c && c.reach < c.total) problems.push(`You say you read ${path.basename(p)}, but your Reads cover lines 1-${c.reach} of ${c.total}. Read the rest, or say exactly which lines you read.`);
    }
  }
  // 4. Images named next to a "looked/shows" verb => opened with Read in this session.
  if (CLAIMS.look.test(aff)) {
    for (const m of new Set(msg.match(/[\w./\\:-]+\.(png|jpe?g|webp|gif)\b/gi) || [])) {
      const base = m.replace(/\\/g, '/').split('/').pop().toLowerCase();
      if (!idx.imagesRead.some((p) => p.endsWith('/' + base) || p === base)) problems.push(`You describe ${m} but never opened it with Read in this session. Open it before describing it, or say you did not look.`);
    }
  }
  // 5. Links cited => fetched with WebFetch (a search-result title is not a source), unless the user gave the link.
  const known = new Set([...idx.fetched, ...idx.userUrls, ...(main.index && main.index.fetched || [])]);
  for (const u of new Set((msg.match(/https?:\/\/[^\s)\]>"'`]+/g) || []).map(L.normUrl)))
    if (!known.has(u) && !/localhost|127\.0\.0\.1|claude\.ai\/|#local_|#terminal/.test(u)) problems.push(`You cite ${u} but never fetched it with WebFetch in this session. Fetch it and check the claim, or mark it "não lido".`);
  // 6. "researched" => at least one page fetched in the session.
  if (CLAIMS.researched.test(aff) && !idx.fetched.length && !(main.index && main.index.fetched.length))
    problems.push('You say you researched or followed the docs, but no page was fetched with WebFetch in this session (searches only return titles). Fetch the sources, or say the claim comes from memory.');
  // 7. "tested/verified" => a passing, unpiped check in this turn after the last edit.
  if (CLAIMS.tested.test(aff) && !HONEST.verify.test(msg) && !cleanAfter(lastEdit).length)
    problems.push('You say it was tested/verified/compiles, but no passing check (unpiped, in the foreground) ran in this turn after your last edit. Run it, or remove the claim.');
  // 8. "committed" => a successful git commit in this turn.
  if (CLAIMS.committed.test(aff) && !turn.some((x) => x.kind === 'shell' && x.ok && /\bgit\b[^\n]*\bcommit\b/.test(x.cmd)))
    problems.push('You say you committed, but no git commit succeeded in this turn. Commit, or remove the claim.');
  // 9. Rulers changed by any route since the session started (tests, measurement scripts, acceptance, gates).
  // A session that started before the gates were installed has no snapshot: take it now instead of blaming old changes.
  if (!sub && !st.snapshot) st.snapshot = Object.fromEntries(L.protectedChanges(dir, cfg).map(({ file }) => [file, L.hashOf(dir, file)]));
  else if (!sub) {
    const snap = st.snapshot;
    for (const { file } of L.protectedChanges(dir, cfg)) {
      if (snap[file] === L.hashOf(dir, file) || /^\.claude\/(gates-log\.txt|settings\.before-gates\.json)$/i.test(file)) continue;
      if ((main.grants || []).some((g) => L.globRe(g).test(file) || file.toLowerCase().startsWith(g.replace(/\*.*$/, '').toLowerCase()))) continue;
      problems.push(`Protected file changed since this session started: ${file}. If you changed it, restore it or explain to the user why the ruler is wrong and ask for #LIBERA-PROTEGIDO ${file}. If another session changed it, say so.`);
    }
  }
  // 10. Acceptance criteria written by the user, checked when the turn claims completion.
  const accFile = path.join(dir, 'ACCEPTANCE.json');
  if (!sub && fs.existsSync(accFile) && CLAIMS.done.test(aff)) {
    const a = JSON.parse(fs.readFileSync(accFile, 'utf8'));
    for (const p of a.mustNotExist || []) if (fs.existsSync(path.join(dir, p))) problems.push(`Acceptance (ACCEPTANCE.json): ${p} must no longer exist.`);
    for (const p of a.mustExist || []) if (!fs.existsSync(path.join(dir, p))) problems.push(`Acceptance (ACCEPTANCE.json): ${p} must exist.`);
    for (const c of a.mustNotContain || []) {
      const r = spawnSync('git', ['grep', '-n', '-E', c.pattern, '--', c.glob || '.'], { cwd: dir, encoding: 'utf8' });
      if (r.status === 0) problems.push(`Acceptance (ACCEPTANCE.json): pattern ${c.pattern} still found:\n${r.stdout.split('\n').slice(0, 5).join('\n')}`);
    }
    for (const c of a.commands || []) {
      const r = spawnSync(c.run, { cwd: dir, shell: true, timeout: (c.timeoutSec || 900) * 1000, encoding: 'utf8' });
      if (r.status !== (c.expectExit ?? 0)) problems.push(`Acceptance (ACCEPTANCE.json): "${c.run}" exited ${r.status}, expected ${c.expectExit ?? 0}.`);
    }
    if (a.needsScreenshot && !turn.some((x) => x.kind === 'read' && x.image && x.ok && x.n > lastEdit)) problems.push('Acceptance (ACCEPTANCE.json): a screenshot taken after the last edit must be opened with Read.');
  }

  const tag = `${String(key).slice(0, 8)}${sub ? ' sub' : ''}`;
  if (!problems.length) {
    st.blocks = 0; st.lastReason = ''; L.saveState(key, st);
    L.log(dir, `${tag} STOP ok (edits ${edits.length}, checks ${checks.length})`);
    process.exit(0);
  }
  const reason = 'Claims without evidence, or work without the check it needs:\n- ' + problems.join('\n- ') +
    '\nProvide the evidence, or rewrite the message to say honestly what was not done. "Não fiz / não verifiquei / não li" always satisfies this gate; a false "done" never does.';
  st.blocks = reason === st.lastReason ? st.blocks + 1 : (e.stop_hook_active ? st.blocks + 1 : 1);
  st.lastReason = reason;
  L.saveState(key, st);
  L.log(dir, `${tag} STOP block #${st.blocks}: ${problems.map((p) => p.slice(0, 80)).join(' | ')}`);
  if (st.blocks > cfg.stopBlockCap) {
    st.blocks = 0; L.saveState(key, st);
    tellUser('ATENÇÃO: o turno terminou com afirmações SEM prova (o portão desistiu após ' + cfg.stopBlockCap + ' tentativas):\n- ' + problems.join('\n- '));
  }
  process.stdout.write(JSON.stringify({ decision: 'block', reason }));
  process.exit(0);
}
