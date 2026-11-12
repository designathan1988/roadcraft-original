// Item 7: one frame of WebGL calls captured by Spector.js 0.9.30 (npm, loaded into the page over CDP: no change to the game's code).
// node spector.mjs <name>   -> raw/spector/<name>.json and a summary printed
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { connect, RAW, record } from './lib.mjs';

const name = process.argv[2];
const BUNDLE = 'C:/Users/Jonathan/AppData/Local/Temp/claude/C--Users-Jonathan-Documents-Projects-city-roadcraft/985da588-0b8a-452e-8813-206a2032ddbf/scratchpad/tools/node_modules/spectorjs/dist/spector.bundle.js';
const { page } = await connect();
if (!(await page.evaluate(() => typeof window.SPECTOR !== 'undefined'))) await page.addScriptTag({ content: readFileSync(BUNDLE, 'utf8') });
const capture = await page.evaluate(() => new Promise((done, fail) => {
  const canvas = window.__roadcraft.scene().gl.domElement;
  const spector = new window.SPECTOR.Spector();
  const timer = setTimeout(() => fail(new Error('no capture in 60 s')), 60000);
  spector.onCapture.add((c) => { clearTimeout(timer); done(JSON.stringify(c)); });
  spector.onError.add((e) => { clearTimeout(timer); fail(new Error(String(e))); });
  spector.captureCanvas(canvas, 0, false, false);
  window.__roadcraft.redraw();
}));
mkdirSync(join(RAW, 'spector'), { recursive: true });
writeFileSync(join(RAW, 'spector', `${name}.json`), capture);
const c = JSON.parse(capture);
const byName = {};
for (const cmd of c.commands) byName[cmd.name] = (byName[cmd.name] ?? 0) + 1;
const draws = c.commands.filter((x) => /^draw|multiDraw/.test(x.name)).length;
const analyses = (c.analyses ?? []).map((a) => ({ name: a.analyserName, ...Object.fromEntries(Object.entries(a).filter(([k]) => k !== 'analyserName').map(([k, v]) => [k, typeof v === 'object' ? JSON.stringify(v).slice(0, 1500) : v])) }));
const summary = { name, commands: c.commands.length, draws, durationMs: c.endTime - c.startTime, top: Object.entries(byName).sort((a, b) => b[1] - a[1]).slice(0, 25), analyses };
record('spector', summary);
console.log(JSON.stringify(summary, null, 1));
process.exit(0);
