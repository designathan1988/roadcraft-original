// git pre-commit: a second line of defence outside Claude Code. Rejects commits that change a protected ruler
// (or modify/delete an existing test) unless the user created the file .git/ROADCRAFT_ALLOW_PROTECTED by hand.
// It runs in the same user account, so it makes tampering visible rather than impossible.
const fs = require('fs'), path = require('path'), L = require('./lib.cjs');

const dir = L.git(process.cwd(), ['rev-parse', '--show-toplevel']).trim();
if (fs.existsSync(path.join(dir, '.git', 'ROADCRAFT_ALLOW_PROTECTED'))) process.exit(0);
const cfg = L.config();
const staged = L.git(dir, ['diff', '--cached', '--name-status']).split('\n').filter(Boolean).map((l) => l.split('\t'));
const bad = staged.filter(([st, ...files]) => {
  const f = files[files.length - 1];
  return L.matchAny(f, cfg.protectAll) || (L.matchAny(files[0], cfg.protectExisting) && !st.startsWith('A'));
});
if (bad.length) {
  process.stderr.write('pre-commit: this commit changes protected rulers:\n' + bad.map((b) => '  ' + b.join(' ')).join('\n') +
    '\nOnly the user allows this: create .git/ROADCRAFT_ALLOW_PROTECTED by hand, commit, then delete it.\n');
  process.exit(1);
}
