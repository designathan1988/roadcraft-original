// Item 7: the GPU at the still street, district and whole-city views: the F7 lab's Diagnosis "Measure now" pressed with a real click
// (its report: every pass timed, one frame's every draw timed, waste findings; written by the game to lab-reports/), then the F7 closed
// and one Spector.js frame (spector.mjs); the GPU's limits read once. node item7.mjs <city> [views]
import { execFileSync } from 'node:child_process';
import { copyFileSync, mkdirSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { ROOT, RAW, connect, record, shot, sleep, input } from './lib.mjs';
import { makeMoves } from './moves.mjs';

const [city, viewArg] = process.argv.slice(2);
const views = viewArg ? viewArg.split(',') : ['rua', 'bairro', 'cidade'];
const REPORTS = join(ROOT, '..', '..', 'lab-reports');
const OUT = join(RAW, 'f7'); mkdirSync(OUT, { recursive: true });
const { page, cdp } = await connect();
const m = await makeMoves(page, cdp);

const caps = await page.evaluate(() => {
  const gl = window.__roadcraft.scene().gl.getContext();
  const P = (n) => { try { const v = gl.getParameter(gl[n]); return ArrayBuffer.isView(v) ? [...v] : v; } catch { return null; } };
  const dbg = gl.getExtension('WEBGL_debug_renderer_info');
  const names = ['MAX_TEXTURE_SIZE', 'MAX_3D_TEXTURE_SIZE', 'MAX_ARRAY_TEXTURE_LAYERS', 'MAX_CUBE_MAP_TEXTURE_SIZE', 'MAX_RENDERBUFFER_SIZE', 'MAX_SAMPLES', 'MAX_TEXTURE_IMAGE_UNITS', 'MAX_VERTEX_TEXTURE_IMAGE_UNITS', 'MAX_COMBINED_TEXTURE_IMAGE_UNITS', 'MAX_VERTEX_ATTRIBS', 'MAX_VERTEX_UNIFORM_VECTORS', 'MAX_FRAGMENT_UNIFORM_VECTORS', 'MAX_VARYING_VECTORS', 'MAX_UNIFORM_BLOCK_SIZE', 'MAX_VERTEX_UNIFORM_BLOCKS', 'MAX_FRAGMENT_UNIFORM_BLOCKS', 'MAX_COMBINED_UNIFORM_BLOCKS', 'MAX_UNIFORM_BUFFER_BINDINGS', 'MAX_DRAW_BUFFERS', 'MAX_COLOR_ATTACHMENTS', 'MAX_ELEMENT_INDEX', 'MAX_ELEMENTS_VERTICES', 'MAX_ELEMENTS_INDICES', 'MAX_VIEWPORT_DIMS', 'MAX_TEXTURE_LOD_BIAS', 'ALIASED_POINT_SIZE_RANGE'];
  const out = Object.fromEntries(names.map((n) => [n, P(n)]));
  out.renderer = dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : null;
  out.vendor = dbg ? gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) : null;
  out.version = gl.getParameter(gl.VERSION); out.glsl = gl.getParameter(gl.SHADING_LANGUAGE_VERSION);
  out.extensions = gl.getSupportedExtensions();
  out.contextAttributes = gl.getContextAttributes();
  return out;
});
writeFileSync(join(OUT, 'gpu-caps.json'), JSON.stringify(caps, null, 1));
record('item7', { city, name: 'caps', caps: { ...caps, extensions: caps.extensions.length } });

const newest = (prefix, after) => readdirSync(REPORTS).filter((f) => f.startsWith(prefix)).map((f) => ({ f, t: statSync(join(REPORTS, f)).mtimeMs })).filter((x) => x.t > after).sort((a, b) => b.t - a.t);
async function clickText(text) {
  const box = await page.evaluate((t) => { const b = [...document.querySelectorAll('button,[role=tab]')].find((x) => x.offsetParent && (x.textContent || '').trim().startsWith(t)); if (!b) return null; const r = b.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2 }; }, text);
  if (!box) throw new Error(`no ${text}`);
  await input.click(cdp, box); await sleep(300);
}
for (const v of views) {
  await m.go(v);
  const before = Date.now();
  await input.press(cdp, 'F7', 'F7'); await sleep(1200);
  let error = null;
  try {
    await clickText('Diagnosis');
    await shot(page, `item7/${city}/${v}-f7-diagnosis-tab`);
    // The Diagnosis tab starts a measure by itself when opened; "Measure now" is pressed only when it has not.
    const auto = await page.evaluate(() => [...document.querySelectorAll('button')].some((b) => b.offsetParent && b.textContent.trim().startsWith('Measuring')));
    if (!auto) await clickText('Measure now');
    // The measure ends when its button reads "Measure now" again and a report is written.
    for (let i = 0; i < 480; i++) { await sleep(500); if (newest('diag-', before).length >= 2) break; }
    await sleep(1000);
    await shot(page, `item7/${city}/${v}-f7-diagnosis-done`);
  } catch (e) { error = String(e); }
  const files = newest('diag-', before).map((x) => x.f);
  for (const f of files) copyFileSync(join(REPORTS, f), join(OUT, `${city}-${v}-${f}`));
  await input.press(cdp, 'F7', 'F7'); await sleep(1500);
  record('item7', { city, name: `diagnose-${v}`, files, error, ms: Date.now() - before });
  console.log(`diagnose ${v}: ${error ?? files.join(', ')}`);
  try { console.log(execFileSync('node', [join(ROOT, 'driver', 'spector.mjs'), `${city}-${v}`]).toString().slice(0, 600)); } catch (e) { record('item7', { city, name: `spector-${v}`, error: String(e).slice(0, 2000) }); console.log(`spector ${v} FAILED ${String(e).slice(0, 500)}`); }
}
process.exit(0);
