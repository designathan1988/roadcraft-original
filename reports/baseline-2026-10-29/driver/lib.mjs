// The measuring driver of the one baseline session (docs/agent/prompts/MEASURE-ONCE.md). Outside the game: it connects to the
// desktop game's window over the DevTools protocol (port 9333), uses the game's own probe API (`window.__roadcraft`, `__frames`,
// `__gpu`) and real input events (CDP Input.dispatch*), and writes every number to reports/baseline-2026-10-29/raw/*.jsonl.
import { chromium } from 'playwright';
import { appendFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

export const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
export const SHOTS = join(ROOT, 'shots');
export const RAW = join(ROOT, 'raw');
mkdirSync(SHOTS, { recursive: true });
mkdirSync(RAW, { recursive: true });

export const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function connect() {
  const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
  const page = browser.contexts().flatMap((c) => c.pages()).find((p) => p.url().startsWith('http://'));
  if (!page) throw new Error('no game window on 9333');
  const cdp = await page.context().newCDPSession(page);
  return { browser, page, cdp };
}

/** WebGL call counters wrapped on the context's prototype from outside (CDP evaluate), not in the game's code: bytes handed to
 *  upload calls (an upper bound when a call passes srcOffset/length it is computed from them), draw calls of every camera
 *  (shadow, depth, scene, passes), shader compiles and program links. Installed once; read and reset by `glCounters(true)`. */
export const INSTALL_COUNTERS = `(() => {
  if (window.__bc) return 'already';
  const c = window.__bc = { bytes: 0, uploads: 0, byCall: {}, draws: 0, instances: 0, compiles: 0, links: 0 };
  const P = WebGL2RenderingContext.prototype;
  const viewBytes = (v, off, len) => { if (!v || typeof v !== 'object') return 0; if (ArrayBuffer.isView(v)) { const e = v.BYTES_PER_ELEMENT || 1; if (len) return len * e; return v.byteLength - (off || 0) * e; } if (v instanceof ArrayBuffer) return v.byteLength; if ('width' in v && 'height' in v) return (v.width|0) * (v.height|0) * 4; return 0; };
  const GL = WebGL2RenderingContext; const comps = (f) => ({[GL.RGBA]:4,[GL.RGBA_INTEGER]:4,[GL.RGB]:3,[GL.RGB_INTEGER]:3,[GL.RG]:2,[GL.RG_INTEGER]:2,[GL.RED]:1,[GL.RED_INTEGER]:1,[GL.DEPTH_COMPONENT]:1,[GL.ALPHA]:1,[GL.LUMINANCE]:1,[GL.LUMINANCE_ALPHA]:2}[f] || 4); const size = (t) => ({[GL.UNSIGNED_BYTE]:1,[GL.BYTE]:1,[GL.HALF_FLOAT]:2,[GL.SHORT]:2,[GL.UNSIGNED_SHORT]:2,[GL.FLOAT]:4,[GL.INT]:4,[GL.UNSIGNED_INT]:4}[t] || 4);
  // Texture bytes are the region written (width x height x depth x texel), not the source array (three passes the whole array with UNPACK_SKIP_*).
  const tex2 = (w, h, f, t, src) => src == null ? 0 : (ArrayBuffer.isView(src) ? w * h * comps(f) * size(t) : viewBytes(src));
  const tex3 = (w, h, d, f, t, src) => src == null ? 0 : w * h * d * comps(f) * size(t);
  const add = (name, n) => { c.bytes += n; c.uploads++; const r = c.byCall[name] || (c.byCall[name] = [0, 0]); r[0]++; r[1] += n; };
  const wrap = (name, bytesOf) => { const f = P[name]; if (!f) return; P[name] = function (...a) { try { add(name, bytesOf(a)); } catch (e) { c.err = String(e); } return f.apply(this, a); }; };
  wrap('bufferData', (a) => typeof a[1] === 'number' ? 0 : viewBytes(a[1], a[3], a[4]));
  wrap('bufferSubData', (a) => viewBytes(a[2], a[3], a[4]));
  wrap('texImage2D', (a) => a.length >= 9 ? tex2(a[3], a[4], a[6], a[7], a[8]) : viewBytes(a[5]));
  wrap('texSubImage2D', (a) => a.length >= 9 ? tex2(a[4], a[5], a[6], a[7], a[8]) : viewBytes(a[6]));
  wrap('texImage3D', (a) => tex3(a[3], a[4], a[5], a[7], a[8], a[9]));
  wrap('texSubImage3D', (a) => tex3(a[5], a[6], a[7], a[8], a[9], a[10]));
  wrap('compressedTexImage2D', (a) => viewBytes(a[6], a[7], a[8]));
  wrap('compressedTexSubImage2D', (a) => viewBytes(a[7], a[8], a[9]));
  for (const d of ['drawArrays', 'drawElements']) { const f = P[d]; P[d] = function (...a) { c.draws++; c.instances++; return f.apply(this, a); }; }
  for (const d of ['drawArraysInstanced', 'drawElementsInstanced']) { const f = P[d]; P[d] = function (...a) { c.draws++; c.instances += a[a.length - 1] | 0; return f.apply(this, a); }; }
  for (const d of ['multiDrawArraysWEBGL', 'multiDrawElementsWEBGL']) { /* extension objects, counted below */ }
  const fc = P.compileShader; P.compileShader = function (...a) { c.compiles++; return fc.apply(this, a); };
  const fl = P.linkProgram; P.linkProgram = function (...a) { c.links++; return fl.apply(this, a); };
  // The game's own profiler hooks (src/render/profilerHooks.ts) put the upload calls on the context instance, bound to the prototype's
  // originals taken before this wrap: those instance properties are wrapped too, so the scene's uploads are counted.
  const inst = window.__roadcraft.scene().gl.getContext();
  const own = (name, bytesOf) => { if (!Object.prototype.hasOwnProperty.call(inst, name)) return; const f = inst[name]; inst[name] = function (...a) { try { add(name, bytesOf(a)); } catch (e) { c.err = String(e); } return f.apply(this, a); }; };
  own('bufferData', (a) => typeof a[1] === 'number' ? 0 : viewBytes(a[1], a[3], a[4]));
  own('bufferSubData', (a) => viewBytes(a[2], a[3], a[4]));
  own('texImage2D', (a) => a.length >= 9 ? tex2(a[3], a[4], a[6], a[7], a[8]) : viewBytes(a[5]));
  own('texSubImage2D', (a) => a.length >= 9 ? tex2(a[4], a[5], a[6], a[7], a[8]) : viewBytes(a[6]));
  own('texImage3D', (a) => tex3(a[3], a[4], a[5], a[7], a[8], a[9]));
  own('texSubImage3D', (a) => tex3(a[5], a[6], a[7], a[8], a[9], a[10]));
  own('compressedTexImage2D', (a) => viewBytes(a[6], a[7], a[8]));
  const ge = P.getExtension; P.getExtension = function (name) { const x = ge.call(this, name); if (x && name === 'WEBGL_multi_draw' && !x.__bc) { x.__bc = 1; for (const m of ['multiDrawArraysWEBGL','multiDrawElementsWEBGL','multiDrawArraysInstancedWEBGL','multiDrawElementsInstancedWEBGL']) { const f = x[m]; if (f) x[m] = function (...a) { const n = a[a.length - 1] | 0; c.draws += n; c.instances += n; return f.apply(this, a); }; } } return x; };
  return 'installed';
})()`;

export async function evaluate(page, expr) {
  return page.evaluate(expr);
}

/** One line of JSON appended to raw/<file>.jsonl. */
export function record(file, row) {
  appendFileSync(join(RAW, `${file}.jsonl`), `${JSON.stringify({ wall: Date.now(), ...row })}\n`);
}
export function writeRaw(name, data) {
  writeFileSync(join(RAW, name), typeof data === 'string' ? data : JSON.stringify(data, null, 1));
}

/** What a segment reads at its start (performance.now, the counters reset, the GPU timer reset). */
export async function segmentStart(page) {
  return page.evaluate(`(() => {
    const r = window.__roadcraft; const c = window.__bc;
    if (c) { c.bytes = 0; c.uploads = 0; c.byCall = {}; c.draws = 0; c.instances = 0; c.compiles = 0; c.links = 0; }
    window.__gpu(true);
    const u = r.usage();
    return { t0: performance.now(), programs: u.programs, geometries: u.geometries, textures: u.textures };
  })()`);
}

/** What a segment reads at its end: the frames since t0 (CPU time per frame and per system, FrameTimer), the GPU timer's frames,
 *  draw calls and triangles (the scene's stats), programs compiled, the counters, the heap. */
export async function segmentEnd(page, start) {
  return page.evaluate(`(() => {
    const r = window.__roadcraft; const c = window.__bc || {};
    const fs = window.__frames(${start.t0});
    const g = window.__gpu(false);
    const u = r.usage();
    const s = r.scene().stats;
    const mem = performance.memory;
    return { ms: Math.round(performance.now() - ${start.t0}), frames: fs, gpu: g, drawCalls: s.drawCalls, drawnTriangles: s.drawnTriangles, builtTriangles: s.builtTriangles,
      programsBefore: ${start.programs}, programsAfter: u.programs, geometriesAfter: u.geometries, texturesAfter: u.textures,
      gl: { uploadBytes: c.bytes, uploads: c.uploads, byCall: c.byCall, glDraws: c.draws, instances: c.instances, compiles: c.compiles, links: c.links },
      heapMB: mem ? Math.round(mem.usedJSHeapSize / 1e5) / 10 : null, opening: r.scene().opening, worldBusy: r.scene().worldBusy, fps: s.fps };
  })()`);
}

/** The camera as the game reads it (`__roadcraft.camera` flat, `view()` orbit). */
export async function cameraNow(page) {
  return page.evaluate(`(() => { const r = window.__roadcraft; const v = r.view(); return { x: r.camera.x, y: r.camera.y, zoom: r.camera.zoom, azimuth: v.azimuth ?? null, elevation: v.elevation ?? null, perspective: window.__state().now.perspective }; })()`);
}
export async function setView(page, at) {
  await page.evaluate((a) => window.__roadcraft.setView(a), at);
}

/** PNG at the window's native size, saved under shots/<name>.png; returns the path. */
export async function shot(page, name) {
  const path = join(SHOTS, `${name}.png`);
  mkdirSync(dirname(path), { recursive: true });
  await page.screenshot({ path, type: 'png' });
  return path;
}

/** Real input through the protocol: the same events the window's own mouse and keyboard send. */
export const input = {
  async drag(cdp, button, from, to, ms, steps) {
    const b = button; const buttons = b === 'left' ? 1 : b === 'right' ? 2 : 4;
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: from.x, y: from.y });
    await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: from.x, y: from.y, button: b, buttons, clickCount: 1 });
    const n = steps ?? Math.max(2, Math.round(ms / 16));
    for (let i = 1; i <= n; i++) {
      const x = from.x + ((to.x - from.x) * i) / n; const y = from.y + ((to.y - from.y) * i) / n;
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x, y, button: b, buttons });
      await sleep(ms / n);
    }
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: to.x, y: to.y, button: b, buttons: 0, clickCount: 1 });
  },
  async click(cdp, at, button = 'left', clickCount = 1, modifiers = 0) {
    const buttons = button === 'left' ? 1 : button === 'right' ? 2 : 4;
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseMoved', x: at.x, y: at.y, modifiers });
    await cdp.send('Input.dispatchMouseEvent', { type: 'mousePressed', x: at.x, y: at.y, button, buttons, clickCount, modifiers });
    await cdp.send('Input.dispatchMouseEvent', { type: 'mouseReleased', x: at.x, y: at.y, button, buttons: 0, clickCount, modifiers });
  },
  async wheel(cdp, at, deltaY, times, gapMs) {
    for (let i = 0; i < times; i++) {
      await cdp.send('Input.dispatchMouseEvent', { type: 'mouseWheel', x: at.x, y: at.y, deltaX: 0, deltaY });
      await sleep(gapMs);
    }
  },
  /** A key held for `ms` (keydown with autorepeat off, keyup). */
  async hold(cdp, key, code, ms, modifiers = 0) {
    const vk = { KeyW: 87, KeyA: 65, KeyS: 83, KeyD: 68, KeyQ: 81, KeyE: 69, PageUp: 33, PageDown: 34, Equal: 187, Minus: 189, ArrowUp: 38, ArrowDown: 40, ArrowLeft: 37, ArrowRight: 39, Home: 36 }[code] ?? 0;
    await cdp.send('Input.dispatchKeyEvent', { type: 'rawKeyDown', key, code, windowsVirtualKeyCode: vk, modifiers });
    await sleep(ms);
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: vk, modifiers });
  },
  async press(cdp, key, code, modifiers = 0, text) {
    const vk = { KeyQ: 81, KeyE: 69, Home: 36, Space: 32, Escape: 27, F7: 118, F8: 119, F9: 120, Delete: 46, Enter: 13 }[code] ?? (key.length === 1 ? key.toUpperCase().charCodeAt(0) : 0);
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyDown', key, code, windowsVirtualKeyCode: vk, modifiers, ...(text ? { text } : {}) });
    await cdp.send('Input.dispatchKeyEvent', { type: 'keyUp', key, code, windowsVirtualKeyCode: vk, modifiers });
  },
};

/** The game window's state from user32 (win.ps1): iconic (minimised), zoomed (maximised), foreground. A segment measured while the
 *  window was minimised is invalid: the game stops drawing then (desktop/main.cjs tellShown, src/desktopShown.ts). */
import { execSync } from 'node:child_process';
export function windowState() {
  const out = execSync(`powershell -NoProfile -ExecutionPolicy Bypass -File "${join(ROOT, 'driver', 'win.ps1')}" state`).toString().trim();
  return { iconic: /iconic=True/.test(out), zoomed: /zoomed=True/.test(out), foreground: /foreground=True/.test(out), raw: out };
}
