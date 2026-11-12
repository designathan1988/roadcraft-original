// Item 11: idleness. 20 s per situation, the camera still at the district view; CPU % and GPU % per process come from the samplers
// (procSlice.mjs) over each window recorded here. Situations: paused; the main menu open; each large panel open (F7 lab, F9 monitor,
// the Builder's workspace, the roads catalogue); the window minimised; the window behind another (Notepad maximised in front).
// node item11.mjs <city>
import { execSync, spawn } from 'node:child_process';
import { connect, record, sleep, input } from './lib.mjs';
import { makeMoves } from './moves.mjs';
import { slice, short } from './procSlice.mjs';

const city = process.argv[2];
const { page, cdp } = await connect();
const m = await makeMoves(page, cdp);
await m.go('bairro');
const frames = () => page.evaluate(() => window.__frames(performance.now() - 20000).frames).catch(() => null);
async function hold(name, open, close) {
  if (open) await open();
  await sleep(1500);
  const wall0 = Date.now();
  await sleep(20000);
  const wall1 = Date.now();
  const drawn = await frames();
  if (close) await close();
  await sleep(3000); // the samplers' last row of the window
  const s = slice(wall0, wall1);
  record('item11', { city, name, wall0, wall1, framesDrawnIn20s: drawn, ...s });
  console.log(`${name}: frames ${drawn} | ${short(s)}`);
}
// Running 1x and paused: item 10's 20 s windows (the same camera, the same states) are used, not measured again.
await hold('main menu open', () => m.clickLabel('Menu'), () => input.press(cdp, 'Escape', 'Escape'));
await hold('F7 lab open', () => input.press(cdp, 'F7', 'F7'), () => input.press(cdp, 'F7', 'F7'));
await hold('F9 monitor open', () => input.press(cdp, 'F9', 'F9'), () => input.press(cdp, 'F9', 'F9'));
await hold('builder workspace open', () => m.clickLabel('Construção'), () => input.press(cdp, 'Escape', 'Escape').then(() => input.press(cdp, 'Escape', 'Escape')));
await hold('roads tool panel open', () => m.clickLabel('Via'), () => input.press(cdp, 'Escape', 'Escape').then(() => input.press(cdp, 'Escape', 'Escape')));
// Minimised and restored through user32 (win.ps1): Electron does not serve Browser.setWindowBounds over CDP.
const win = (a) => execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${new URL('./win.ps1', import.meta.url).pathname.slice(1)}" ${a}`).toString().trim();
await hold('window minimised', async () => { win('minimize'); }, async () => { win('front'); });
let notepad = null;
await hold('window behind Notepad (maximised in front)', async () => { notepad = spawn('powershell', ['-NoProfile', '-Command', 'Start-Process notepad -WindowStyle Maximized -PassThru | Select -Expand Id'], { stdio: ['ignore', 'pipe', 'ignore'] }); notepad.stdout.on('data', (d) => { notepad.pid2 = Number(String(d).trim()); }); await sleep(1500); },
  async () => { if (notepad?.pid2) execSync(`taskkill /PID ${notepad.pid2} /F`); win('front'); });
process.exit(0);
