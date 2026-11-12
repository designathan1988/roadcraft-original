// UserPromptSubmit: turns the user's explicit limits ("não rode", "sem scripts", "não teste"...) into session state.
// PreToolUse: denies tool calls that break those limits, edit a protected ruler (tests, baselines, measurement scripts,
// acceptance criteria, the gates themselves) or destroy work in the shared working copy. Permission rules and CLAUDE.md
// text are advice to the model; a PreToolUse deny is applied by Claude Code in every permission mode.
const fs = require('fs'), path = require('path'), L = require('./lib.cjs');

// Limits are set only by text the user typed. Each one names a category of tools, because a per-command deny is easy to route around.
const LIMITS = {
  'SEM-EXEC': /#SEM-EXEC\b|proibid[oa] de (rodar|executar)|n[ãa]o (rode|execute|rodar|executar) nada|nenhum processo|sem rodar nada/i,
  'SEM-SCRIPT': /#SEM-SCRIPT\b|proibid[oa] de criar scripts?|n[ãa]o (crie|criar|use|usar) scripts?|pare (j[áa] )?de (criar|usar) scripts?|sem scripts?\b/i,
  'SEM-TESTE': /#SEM-TESTE\b|n[ãa]o (fa[çc]a|rode|rodar|vai rodar) (nenhum )?(teste|testes|medi[çc][ãa]o|medi[çc][õo]es|benchmark)|n[ãa]o (teste|testar|me[çc]a|medir)\b|sem (testar|testes|medir|medi[çc][õo]es)\b|nada de (testar|medir|testes)|chega de (medi[çc][õo]es|testes)|n[ãa]o vai (medir|testar)/i,
  'SEM-JOGO': /#SEM-JOGO\b|n[ãa]o (abra|abrir|execute|executar|rode|rodar|vai executar|vai abrir) (o )?jogo|sem (abrir|executar|rodar) o jogo|nada de (abrir|executar|rodar) o jogo|jogo algum/i,
  'SO-LER': /#SO-LER\b|\b(s[óo]|apenas) (explique|explicar|leia|ler|responda|responder)\b|n[ãa]o (altere|alterar|mude|mudar|edite|editar) nada/i,
};
const RELEASES = {
  'SEM-EXEC': /#LIBERA-EXEC\b|pode (rodar|executar)\b/i,
  'SEM-SCRIPT': /#LIBERA-SCRIPT\b|pode (criar|usar) scripts?/i,
  'SEM-TESTE': /#LIBERA-TESTE\b|pode (testar|medir|rodar (os )?testes)/i,
  'SEM-JOGO': /#LIBERA-JOGO\b|pode (abrir|executar|rodar) o jogo/i,
  'SO-LER': /#LIBERA-EDICAO\b|pode (alterar|editar|mudar|implementar)/i,
};
const READ_ONLY = /^\s*(ls|dir|pwd|cat|type|head|tail|wc|grep|rg|find|tree|stat|file|git (status|log|diff|show|branch|ls-files|rev-parse|reflog|blame)|Get-ChildItem|Get-Content|Select-String|Test-Path|Get-Item)\b[^;&|>`$]*$/i;
const DESTRUCTIVE_GIT = /\bgit\s+(checkout\s+(--\s|\S+\s+--\s|-f\b|\.\s*$)|restore\b|reset\s+--hard|clean\b|stash\b|archive\b|filter-branch|update-ref|commit\b[^\n]*--no-verify|push\b)/i;

(async () => {
  let e;
  try { e = JSON.parse(await L.readStdin()); } catch (err) { process.stderr.write('guard: unreadable hook input: ' + err.message); process.exit(2); }
  const dir = L.projectDir(e), cfg = L.config(), key = e.session_id, st = L.loadState(key);

  if (e.hook_event_name === 'UserPromptSubmit') return onPrompt(e, st, key);

  const tool = String(e.tool_name || ''), inp = e.tool_input || {};
  const file = L.rel(dir, inp.file_path || inp.notebook_path || '');
  const cmd = String(inp.command || '');
  const cmdN = cmd.replace(/\\/g, '/');
  const isEdit = /^(Edit|Write|MultiEdit|NotebookEdit)$/.test(tool), isShell = /^(Bash|PowerShell)$/.test(tool);
  const granted = (f) => st.grants.some((g) => L.globRe(g).test(f));
  const deny = (why) => {
    L.log(dir, `${String(key).slice(0, 8)} DENY ${tool} ${file || cmd.slice(0, 120)} :: ${why.slice(0, 120)}`);
    process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: 'deny', permissionDecisionReason: why } }));
    process.exit(0);
  };

  // 1. The gates' own files and state belong to the user.
  const gateTouch = /roadcraft-claude-gates|ROADCRAFT_ALLOW_PROTECTED|(^|[\s"'/])\.claude\/(hooks|settings|gate-config|RULES|gates-log)|\.git\/hooks/i;
  if (isEdit && (L.STATE_DIR_RE.test(file) || /^\.claude\/|^\.git\//i.test(file)))
    deny(`"${file}" belongs to the gates or to git. Only the user changes it, by hand.`);
  if (isShell && gateTouch.test(cmdN) && !READ_ONLY.test(cmd))
    deny('This command touches the gates (.claude hooks/settings, their state, .git/hooks or the protected-commit release). Only the user changes them. To read them, use the Read tool.');

  // 2. Rulers: never change the ruler to fit the code.
  if (isEdit && !granted(file)) {
    if (L.matchAny(file, cfg.protectAll))
      deny(`"${file}" is a protected ruler (measurement, check, baseline, acceptance or rules file). Do not change the ruler to fit the work. If you believe it is wrong, stop and tell the user why, with file:line; the user can allow it by typing #LIBERA-PROTEGIDO ${file}`);
    if (L.matchAny(file, cfg.protectExisting) && fs.existsSync(path.join(dir, file)))
      deny(`"${file}" is an existing test. New tests are welcome; changing or weakening an existing one is the user's call. If it is wrong, tell the user why, with file:line; the user can allow it by typing #LIBERA-PROTEGIDO ${file}`);
  }
  if (isShell && !READ_ONLY.test(cmd)) {
    const touches = [...cfg.protectAll, ...cfg.protectExisting].map((g) => g.replace(/\*.*$/, '')).filter((p) => p.length > 3)
      .find((p) => cmdN.toLowerCase().includes(p.toLowerCase()));
    const writes = /(^|[^-])>|\bSet-Content\b|\bOut-File\b|\bAdd-Content\b|\bsed\s+(-i|--in-place)|\brm\b|\bRemove-Item\b|\bmv\b|\bMove-Item\b|\bcp\b|\bCopy-Item\b|writeFile|\.write\(|open\([^)]*['"]w|\bgit\s+(checkout|restore|rm|mv)\b|\btruncate\b/i.test(cmd);
    if (touches && writes && !granted(touches + '**') && !st.grants.some((g) => cmdN.toLowerCase().includes(g.replace(/\*.*$/, '').toLowerCase())))
      deny(`This command seems to write to a protected ruler (${touches}). Rulers change only with the user's #LIBERA-PROTEGIDO grant.`);
  }

  // 3. Destructive git in a working copy shared by several sessions (and the route used before to undo a denial).
  if (isShell && DESTRUCTIVE_GIT.test(cmd) && !st.grants.includes('#GIT'))
    deny('Destructive or history-rewriting git command (checkout --, restore, reset --hard, clean, stash, archive, --no-verify, push). The working copy is shared and holds other work; ask the user, who can allow it with #LIBERA-GIT.');

  // 4. The user's limits, by tool category.
  const lim = new Set(st.limits);
  const why = (k) => `The user set the limit ${k} in this session ("${(st.limitQuotes || {})[k] || k}"). It covers the whole category, including indirect routes. Do not route around it; if it blocks the task, say so and ask. The user lifts it by typing #LIBERA-${k.replace('SEM-', '').replace('SO-LER', 'EDICAO')}.`;
  if (lim.has('SO-LER') && (isEdit || (isShell && !READ_ONLY.test(cmd)))) deny(why('SO-LER'));
  if (lim.has('SEM-EXEC') && isShell && !READ_ONLY.test(cmd)) deny(why('SEM-EXEC'));
  if (lim.has('SEM-SCRIPT')) {
    if (isEdit && /\.(py|mjs|cjs|js|ps1|sh|bat|cmd)$/i.test(file) && !L.matchAny(file, cfg.sourceGlobs)) deny(why('SEM-SCRIPT'));
    if (isShell && /\b(python3?|py|node|deno|bun|tsx|ts-node|pwsh|powershell)(\.exe)?\s+(-c|-e|--eval|-|\S+\.(py|m?js|cjs|ts|ps1))/i.test(cmd)) deny(why('SEM-SCRIPT'));
  }
  if (lim.has('SEM-TESTE') && isShell && L.anyRe(cmd, cfg.testPatterns)) deny(why('SEM-TESTE'));
  if (lim.has('SEM-JOGO') && isShell && L.anyRe(cmd, cfg.gamePatterns)) deny(why('SEM-JOGO'));
  process.exit(0);
})().catch((err) => { process.stderr.write('guard crashed: ' + err.stack); process.exit(2); });

function onPrompt(e, st, key) {
  const p = String(e.prompt || '');
  if (!L.isHumanText(p)) process.exit(0); // other sessions and notifications cannot set or lift limits
  const text = p.replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, '');
  const before = new Set(st.limits);
  st.limitQuotes = st.limitQuotes || {};
  if (/#LIBERA\b(?!-)/.test(text)) st.limits = [];
  for (const [k, re] of Object.entries(RELEASES)) if (re.test(text)) st.limits = st.limits.filter((x) => x !== k);
  for (const [k, re] of Object.entries(LIMITS)) {
    const m = text.match(re);
    if (m && !st.limits.includes(k)) { st.limits.push(k); st.limitQuotes[k] = m[0]; }
  }
  for (const m of text.matchAll(/#LIBERA-PROTEGIDO\s+(\S+)/g)) st.grants.push(m[1].replace(/\\/g, '/'));
  if (/#LIBERA-GIT\b/.test(text)) st.grants.push('#GIT');
  if (/#SEM-PESQUISA\b/.test(text)) st.noResearch = true;
  L.saveState(key, st);
  const added = st.limits.filter((k) => !before.has(k)), removed = [...before].filter((k) => !st.limits.includes(k));
  const out = {};
  if (st.limits.length) out.hookSpecificOutput = { hookEventName: 'UserPromptSubmit', additionalContext: `Active user limits, enforced by hooks: ${st.limits.join(', ')}. If one blocks the task, say so and ask; do not route around it.` };
  if (added.length || removed.length) out.systemMessage = `Travas: ${added.length ? 'ativei ' + added.join(', ') : ''}${added.length && removed.length ? '; ' : ''}${removed.length ? 'liberei ' + removed.join(', ') : ''}. Para soltar: #LIBERA (todas) ou #LIBERA-EXEC/-SCRIPT/-TESTE/-JOGO/-EDICAO.`;
  if (Object.keys(out).length) process.stdout.write(JSON.stringify(out));
  process.exit(0);
}
