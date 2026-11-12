// Installs the gates into .claude/ and .git/hooks/. Run it yourself (the agent is not allowed to touch .claude):
//   node tools/claude-gates/install.cjs            install (keeps a backup of the current settings)
//   node tools/claude-gates/install.cjs --restore  put the previous settings back
const fs = require('fs'), path = require('path');
const src = __dirname, dir = path.resolve(src, '..', '..'), dot = path.join(dir, '.claude');
const backup = path.join(dot, 'settings.before-gates.json');

if (process.argv.includes('--restore')) {
  if (!fs.existsSync(backup)) { console.error('No backup found at ' + backup); process.exit(1); }
  fs.copyFileSync(backup, path.join(dot, 'settings.json'));
  try { fs.unlinkSync(path.join(dir, '.git', 'hooks', 'pre-commit')); } catch {}
  console.log('Restored .claude/settings.json from the backup and removed the git pre-commit gate.');
  process.exit(0);
}

fs.mkdirSync(path.join(dot, 'hooks'), { recursive: true });
if (fs.existsSync(path.join(dot, 'settings.json')) && !fs.existsSync(backup)) fs.copyFileSync(path.join(dot, 'settings.json'), backup);
for (const f of fs.readdirSync(path.join(src, 'hooks'))) fs.copyFileSync(path.join(src, 'hooks', f), path.join(dot, 'hooks', f));
for (const f of ['gate-config.json', 'RULES.md']) fs.copyFileSync(path.join(src, f), path.join(dot, f));
fs.copyFileSync(path.join(src, 'settings.json'), path.join(dot, 'settings.json'));
fs.writeFileSync(path.join(dir, '.git', 'hooks', 'pre-commit'), '#!/bin/sh\nexec node "$(git rev-parse --show-toplevel)/.claude/hooks/pre-commit.cjs"\n');
console.log(`Gates installed:
  .claude/settings.json      new hooks (the previous file is kept as .claude/settings.before-gates.json)
  .claude/hooks/*.cjs        guard, research-gate, claim-gate, session, delegate, pre-commit
  .claude/gate-config.json   which files are rulers, source, visual; which commands count as checks
  .claude/RULES.md           the short rule card re-injected at start, after compaction and into subagents
  .git/hooks/pre-commit      rejects commits that change rulers unless .git/ROADCRAFT_ALLOW_PROTECTED exists
Every hook firing is logged in .claude/gates-log.txt. Open a NEW session for the gates to apply from its start.`);
