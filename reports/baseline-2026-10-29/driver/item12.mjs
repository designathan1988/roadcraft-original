// Item 12: resizing. The window 1 px narrower once, then maximised, then restored, then maximised again; after each: the canvas's
// size, the render targets' bytes (the game's targetBytes), and what was made on the GPU meanwhile (createTexture, deleteTexture,
// createFramebuffer, texStorage2D, renderbufferStorage(Multisample) wrapped on the prototype from outside: calls and texels).
// node item12.mjs <city>
import { connect, record, sleep } from './lib.mjs';

const city = process.argv[2];
const { page, cdp } = await connect();
await page.evaluate(() => {
  if (window.__rs) return;
  const c = window.__rs = { createTexture: 0, deleteTexture: 0, createFramebuffer: 0, deleteFramebuffer: 0, texStorage2D: 0, texStorageTexels: 0, renderbufferStorage: 0, rbTexels: 0 };
  const P = WebGL2RenderingContext.prototype;
  for (const n of ['createTexture', 'deleteTexture', 'createFramebuffer', 'deleteFramebuffer']) { const f = P[n]; P[n] = function (...a) { c[n]++; return f.apply(this, a); }; }
  const ts = P.texStorage2D; P.texStorage2D = function (...a) { c.texStorage2D++; c.texStorageTexels += a[3] * a[4]; return ts.apply(this, a); };
  for (const n of ['renderbufferStorage', 'renderbufferStorageMultisample']) { const f = P[n]; P[n] = function (...a) { c.renderbufferStorage++; c.rbTexels += a[a.length - 1] * a[a.length - 2]; return f.apply(this, a); }; }
});
const read = () => page.evaluate(() => {
  const r = window.__roadcraft; const c = { ...window.__rs }; for (const k in window.__rs) window.__rs[k] = 0;
  const canvas = r.scene().gl.domElement; const mem = r.memory();
  return { innerW: innerWidth, innerH: innerHeight, dpr: devicePixelRatio, canvas: [canvas.width, canvas.height, canvas.clientWidth, canvas.clientHeight], targetMB: mem.targetMB, textureMB: mem.textureMB, glTextures: mem.glTextures, gl: c };
});
import { execSync } from 'node:child_process';
const win = (a) => execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${new URL('./win.ps1', import.meta.url).pathname.slice(1)}" ${a}`).toString().trim();
const steps = [];
steps.push({ step: 'before', window: win('state'), ...(await read()) });
win('restore'); await sleep(2000);
steps.push({ step: 'restored (un-maximised)', window: win('state'), ...(await read()) });
win('narrow1'); await sleep(2000);
steps.push({ step: '1 px narrower', window: win('state'), ...(await read()) });
win('maximize'); await sleep(2000);
steps.push({ step: 'maximised', window: win('state'), ...(await read()) });
win('restore'); await sleep(2000);
steps.push({ step: 'restored', window: win('state'), ...(await read()) });
win('front'); await sleep(2000);
steps.push({ step: 'maximised again (as measured)', window: win('state'), ...(await read()) });
record('item12', { city, steps });
for (const s of steps) console.log(JSON.stringify(s));
process.exit(0);
