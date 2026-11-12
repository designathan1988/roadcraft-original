// Shared helpers for the roadcraft gates: config, per-session state, path globs and an incremental transcript index.
// The gates check facts (tool calls, files on disk, git), never the model's own account of what it did.
const fs = require('fs'), os = require('os'), path = require('path'), { execFileSync } = require('child_process');

const ROOT = path.join(__dirname, '..');
exports.ROOT = ROOT;
exports.config = () => JSON.parse(fs.readFileSync(path.join(ROOT, 'gate-config.json'), 'utf8'));

exports.readStdin = () => new Promise((resolve) => {
  let b = '';
  process.stdin.setEncoding('utf8');
  process.stdin.on('data', (c) => (b += c));
  process.stdin.on('end', () => resolve(b));
});

exports.projectDir = (e) => (process.env.CLAUDE_PROJECT_DIR || e.cwd || process.cwd()).replace(/\\/g, '/').replace(/\/$/, '');

exports.log = (dir, line) => {
  try { fs.appendFileSync(path.join(ROOT, 'gates-log.txt'), `${new Date().toISOString()} ${line}\n`); } catch { /* the log is a convenience */ }
};

// ---- per-session state (outside the repo, protected by guard.cjs) ----
const STATE_DIR = path.join(os.tmpdir(), 'roadcraft-claude-gates');
exports.STATE_DIR_RE = /roadcraft-claude-gates/i;
const blank = () => ({ limits: [], grants: [], blocks: 0, lastReason: '', snapshot: null, index: {} });
const stateFile = (key) => path.join(STATE_DIR, `${String(key).replace(/[^\w-]/g, '')}.json`);
exports.loadState = (key) => { try { return { ...blank(), ...JSON.parse(fs.readFileSync(stateFile(key), 'utf8')) }; } catch { return blank(); } };
exports.saveState = (key, s) => { fs.mkdirSync(STATE_DIR, { recursive: true }); fs.writeFileSync(stateFile(key), JSON.stringify(s)); };

// ---- paths and globs ----
exports.rel = (dir, p) => {
  const f = String(p || '').replace(/\\/g, '/');
  const d = dir.toLowerCase() + '/';
  return f.toLowerCase().startsWith(d) ? f.slice(d.length) : f.replace(/^\.\//, '');
};
const globCache = new Map();
exports.globRe = (g) => {
  if (!globCache.has(g)) {
    const src = g.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*\*\/?/g, '\u0000').replace(/\*/g, '[^/]*').replace(/\u0000/g, '.*');
    globCache.set(g, new RegExp('^' + src + '$', 'i'));
  }
  return globCache.get(g);
};
exports.matchAny = (relPath, globs) => (globs || []).some((g) => exports.globRe(g).test(relPath));
exports.anyRe = (cmd, patterns) => (patterns || []).some((p) => new RegExp(p, 'i').test(cmd));

// A prompt typed by the user, not a message injected by another session, a task notification or the harness.
exports.isHumanText = (text) => {
  const t = String(text || '').replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, '').trim();
  return t.length > 0 && !/^<(agent-message|cross-session-message|task-notification|side-sessions-event|ci-monitor-event|command-name|local-command)/i.test(t)
    && !/^\[(Cross-session idle notice|Request interrupted)/i.test(t);
};

// ---- incremental transcript index ----
// Reads only the bytes appended since the last call. Session-wide facts are kept for the whole session;
// `turn` holds the events since the last prompt (from the user or injected), which is what a Stop gate judges.
const promptText = (en) => {
  const c = en.message && en.message.content;
  if (typeof c === 'string') return c;
  if (Array.isArray(c) && !c.some((b) => b.type === 'tool_result')) return c.filter((b) => b.type === 'text').map((b) => b.text).join('\n');
  return null;
};
const blankIndex = () => ({ offset: 0, seq: 0, pending: {}, fetched: [], userUrls: [], imagesRead: [], readFiles: {}, notes: [], turn: [] });

exports.indexTranscript = (file, idx) => {
  idx = { ...blankIndex(), ...(idx || {}) };
  if (!file || !fs.existsSync(file)) return idx;
  const size = fs.statSync(file).size;
  if (size < idx.offset) Object.assign(idx, blankIndex()); // rewritten file: start over
  if (size === idx.offset) return idx;
  const fd = fs.openSync(file, 'r');
  const buf = Buffer.alloc(size - idx.offset);
  fs.readSync(fd, buf, 0, buf.length, idx.offset);
  fs.closeSync(fd);
  const lastNl = buf.lastIndexOf(10);
  if (lastNl < 0) return idx;
  idx.offset += lastNl + 1;
  for (const line of buf.subarray(0, lastNl).toString('utf8').split('\n')) {
    if (!line) continue;
    let en; try { en = JSON.parse(line); } catch { continue; }
    if (en.type === 'user' && !en.isMeta) {
      const text = promptText(en);
      if (text !== null && text.trim()) {
        idx.turn = [];
        if (exports.isHumanText(text)) for (const u of text.match(/https?:\/\/[^\s)\]>"'`]+/g) || []) idx.userUrls.push(normUrl(u));
        continue;
      }
    }
    const content = Array.isArray(en.message && en.message.content) ? en.message.content : [];
    for (const b of content) {
      if (en.type === 'assistant' && b.type === 'tool_use') idx.pending[b.id] = { name: b.name, input: b.input || {} };
      if (en.type === 'user' && b.type === 'tool_result' && idx.pending[b.tool_use_id]) {
        const call = idx.pending[b.tool_use_id];
        delete idx.pending[b.tool_use_id];
        record(idx, call, b, en.toolUseResult);
      }
    }
  }
  idx.fetched = [...new Set(idx.fetched)];
  idx.userUrls = [...new Set(idx.userUrls)];
  idx.imagesRead = [...new Set(idx.imagesRead)];
  return idx;
};

const normUrl = (u) => String(u).replace(/[#?].*$/, '').replace(/[.,;:]+$/, '').replace(/\/$/, '').toLowerCase();
exports.normUrl = normUrl;
const normPath = (p) => String(p || '').replace(/\\/g, '/').toLowerCase();
exports.normPath = normPath;
const resultText = (b) => (typeof b.content === 'string' ? b.content : Array.isArray(b.content) ? b.content.map((x) => x.text || '').join('\n') : '');

function record(idx, call, b, tur) {
  const ok = !b.is_error;
  const n = ++idx.seq;
  const inp = call.input;
  const ev = { n, tool: call.name, ok };
  if (/^(Edit|Write|MultiEdit|NotebookEdit)$/.test(call.name)) {
    ev.kind = 'edit'; ev.path = normPath(inp.file_path || inp.notebook_path);
    if (ok) {
      const text = String(inp.content || inp.new_string || '') + (Array.isArray(inp.edits) ? inp.edits.map((x) => x.new_string).join('\n') : '');
      idx.notes.push({ path: ev.path, urls: (text.match(/https?:\/\/[^\s)\]>"'`]+/g) || []).map(normUrl), quoted: /^\s*>\s*\S.{15,}/m.test(text) || /["“][^"”\n]{20,}["”]/.test(text) });
    }
  } else if (/^(Bash|PowerShell)$/.test(call.name)) {
    ev.kind = 'shell'; ev.cmd = String(inp.command || '').slice(0, 2000);
    ev.bg = !!inp.run_in_background;
    ev.out = resultText(b).slice(-300);
  } else if (call.name === 'Read') {
    ev.kind = 'read'; ev.path = normPath(inp.file_path);
    const f = tur && tur.file;
    if (tur && tur.type === 'image') { ev.image = true; if (ok) idx.imagesRead.push(ev.path); }
    else if (f && f.totalLines) {
      ev.start = f.startLine || 1; ev.num = f.numLines || 0; ev.total = f.totalLines;
      if (ok) (idx.readFiles[ev.path] = idx.readFiles[ev.path] || []).push([ev.start, ev.start + ev.num - 1, ev.total]);
    } else if (/\.(png|jpe?g|webp|gif)$/i.test(ev.path) && ok) { ev.image = true; idx.imagesRead.push(ev.path); }
  } else if (call.name === 'WebFetch') {
    ev.kind = 'fetch'; ev.url = normUrl(inp.url);
    if (ok && !/^(Error|Request failed|Unable to fetch)/i.test(resultText(b))) idx.fetched.push(ev.url);
  } else return;
  idx.turn.push(ev);
  if (idx.turn.length > 4000) idx.turn.splice(0, idx.turn.length - 4000);
}

// Coverage of a file by the Read calls of the session: the highest line reached without a gap, and the file length.
exports.coverage = (idx, p) => {
  const iv = (idx.readFiles[normPath(p)] || []).slice().sort((a, b) => a[0] - b[0]);
  if (!iv.length) return null;
  let reach = 0;
  for (const [a, b] of iv) { if (a > reach + 1) break; reach = Math.max(reach, b); }
  return { reach, total: iv[iv.length - 1][2] };
};

// ---- git ----
// execFileSync runs git directly (no cmd.exe / sh in between), so it works from any hook environment on Windows.
exports.git = (dir, args) => execFileSync('git', args, { cwd: dir, encoding: 'utf8', maxBuffer: 256 << 20, stdio: ['ignore', 'pipe', 'ignore'], windowsHide: true });
exports.changedFiles = (dir) => exports.git(dir, ['status', '--porcelain', '--untracked-files=all']).split('\n').filter(Boolean)
  .map((l) => ({ code: l.slice(0, 2), file: l.slice(3).replace(/^"|"$/g, '').split(' -> ').pop() }));
exports.hashOf = (dir, f) => { try { return fs.existsSync(path.join(dir, f)) ? exports.git(dir, ['hash-object', '--', f]).trim() : 'deleted'; } catch { return 'unreadable'; } };
exports.protectedChanges = (dir, cfg) => exports.changedFiles(dir).filter(({ code, file }) =>
  exports.matchAny(file, cfg.protectAll) || (exports.matchAny(file, cfg.protectExisting) && code.trim() !== '??' && !code.startsWith('A')));
exports.isTracked = (dir, f) => { try { exports.git(dir, ['ls-files', '--error-unmatch', '--', f]); return true; } catch { return false; } };
