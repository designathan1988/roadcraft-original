// Item 1: the game closed as the player closes it (its window's close: the page saves on pagehide) and opened again, timed from the
// launch command to the opening shown (the page's `opening:shown` mark) and to the world settled. node relaunch.mjs <label>
import { execSync, spawn } from 'node:child_process';
import { openSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, record, sleep } from './lib.mjs';
import { chromium } from 'playwright';

const label = process.argv[2];
const win = (a) => execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${join(ROOT, 'driver', 'win.ps1')}" ${a}`).toString().trim();
const closeAt = Date.now();
win('close');
// Wait for every electron process to end.
for (let i = 0; i < 240; i++) { const n = execSync('tasklist /FI "IMAGENAME eq electron.exe" /NH').toString(); if (!/electron\.exe/i.test(n)) break; await sleep(500); }
const closedMs = Date.now() - closeAt;
const log = openSync(join(ROOT, 'logs', `desktop-dev-${label}.log`), 'a');
const launchAt = Date.now();
const child = spawn('npm', ['run', 'desktop:dev'], { cwd: join(ROOT, '..', '..'), env: { ...process.env, NODE_OPTIONS: '--inspect=127.0.0.1:0', ROADCRAFT_LOOK: '1', ROADCRAFT_LOOK_SHOWN: '1' }, stdio: ['ignore', log, log], shell: true, detached: true });
child.unref();
let browser = null;
for (let i = 0; i < 240 && !browser; i++) { try { browser = await chromium.connectOverCDP('http://127.0.0.1:9333'); } catch { await sleep(500); } }
let page = null;
for (let i = 0; i < 240 && !page; i++) { page = browser.contexts().flatMap((c) => c.pages()).find((p) => p.url().startsWith('http://')); if (!page) await sleep(250); }
const pageAt = Date.now();
await page.waitForFunction(() => performance.getEntriesByName('opening:shown').length > 0, null, { timeout: 900000, polling: 250 });
const shownAt = Date.now();
await page.waitForFunction(() => !window.__roadcraft.scene().worldBusy, null, { timeout: 900000, polling: 250 });
const settledAt = Date.now();
const marks = await page.evaluate(() => performance.getEntriesByType('mark').map((m) => [m.name, Math.round(m.startTime)]));
const counts = await page.evaluate(() => window.__roadcraft.inventory().counts);
const row = { label, closedMs, launchToPageMs: pageAt - launchAt, launchToShownMs: shownAt - launchAt, launchToSettledMs: settledAt - launchAt, marks, counts };
record('item1', row);
console.log(JSON.stringify({ ...row, marks: marks.map((m) => m.join('@')).join(' ') }, null, 1));
process.exit(0);
