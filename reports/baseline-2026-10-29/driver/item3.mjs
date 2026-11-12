// Item 3: the quality presets (low, medium, high, ultra, picked in the main menu's "Gráficos" row as the player does): in each, the
// street, district and whole-city views still (10 s) and a slow district pan (10 s), with a photo; then every graphics option of the
// options dialog switched once at the district view (each value 10 s still, a photo), back to its value before.
// node item3.mjs <city> [presets|options]
import { connect, record, segmentStart, segmentEnd, shot, sleep, input, cameraNow, INSTALL_COUNTERS, windowState } from './lib.mjs';
import { makeMoves } from './moves.mjs';

const [city, part = 'both'] = process.argv.slice(2);
const { page, cdp } = await connect();
await page.evaluate(INSTALL_COUNTERS);
const m = await makeMoves(page, cdp);
async function measure(name, act) {
  const w0 = windowState(); const wall0 = Date.now();
  const start = await segmentStart(page);
  await act();
  const end = await segmentEnd(page, start);
  const w1 = windowState();
  const quality = await page.evaluate(() => window.__state().now.quality);
  const row = { city, name, wall0, wall1: Date.now(), quality, camera: await cameraNow(page), valid: !w0.iconic && !w1.iconic, ...end };
  record('item3', row);
  console.log(`${name}${row.valid ? '' : ' [INVALID]'}: q=${quality} frames ${end.frames.frames} cpu p50 ${end.frames.total?.p50} p95 ${end.frames.total?.p95} max ${end.frames.total?.max} | gpu p50 ${end.gpu.p50} p99 ${end.gpu.p99} | draws ${end.drawCalls} tris ${end.drawnTriangles} | up ${(end.gl.uploadBytes / 1e6).toFixed(1)} MB`);
}
async function clickIn(rowLabel, value) {
  const box = await page.evaluate(([rl, v]) => {
    const rows = [...document.querySelectorAll('.options-row, .v2-seg, .v2-pop-body > *')];
    for (const r of rows) {
      if (!(r.textContent || '').includes(rl)) continue;
      const b = [...r.querySelectorAll('button')].find((x) => x.textContent.trim() === v && x.offsetParent);
      if (b) { const q = b.getBoundingClientRect(); return { x: q.x + q.width / 2, y: q.y + q.height / 2 }; }
    }
    return null;
  }, [rowLabel, value]);
  if (!box) throw new Error(`no ${rowLabel} / ${value}`);
  await input.click(cdp, box); await sleep(300);
}
// Ultra is the game's own level here: its street, district and whole-city stills and district pan are the camera matrix's (item 2).
const PRESETS = [['low', 'Baixa'], ['medium', 'Média'], ['high', 'Alta']];
if (part !== 'options') {
  for (const [key, label] of PRESETS) {
    await m.clickLabel('Menu'); await clickIn('Gráficos', label); await input.press(cdp, 'Escape', 'Escape'); await sleep(2000);
    for (const z of ['rua', 'bairro', 'cidade']) {
      await m.go(z);
      await measure(`item3/${city}/${key}/${z}-still`, () => sleep(10000));
      await shot(page, `item3/${city}/${key}/${z}-still`);
    }
    await m.go('bairro');
    await measure(`item3/${city}/${key}/bairro-panSlow`, m.MOVES.panSlow);
    await shot(page, `item3/${city}/${key}/bairro-panSlow-end`);
  }
}
if (part !== 'presets') {
  // Options at the district view, ultra (the game's own default on this machine).
  // Back to ultra (the menu) before the options, as the player left it.
  await m.clickLabel('Menu'); await clickIn('Gráficos', 'Ultra'); await input.press(cdp, 'Escape', 'Escape'); await sleep(2000);
  await m.go('bairro');
  const OPTIONS = [
    ['Sombras', ['Desligado', '1024', '2048', '4096']],
    ['Oclusão de ambiente', ['Desligado', 'Ligado']],
    ['Suavização de bordas (SMAA)', ['Desligado', 'Ligado']],
    ['Resolução dinâmica', ['Ligado', 'Desligado']],
    ['Limite de quadros por segundo', ['30', '60', '120', '144', 'Sem limite']],
    ['Tela cheia', ['Ligado', 'Desligado']],
  ];
  await m.clickLabel('Menu'); await m.clickLabel('Opções gráficas'); await sleep(800);
  const labels = await page.evaluate(() => [...document.querySelectorAll('.options-row')].map((r) => [r.querySelector('.options-name')?.textContent, [...r.querySelectorAll('button')].map((b) => `${b.textContent.trim()}${b.classList.contains('on') ? '*' : ''}`)]));
  record('item3', { city, name: 'item3/options-dialog-rows', labels });
  console.log(JSON.stringify(labels));
  await shot(page, `item3/${city}/options-dialog`);
  for (const [row, values] of OPTIONS) {
    const rowNow = labels.find((l) => (l[0] || '').startsWith(row));
    const before = rowNow ? (rowNow[1].find((v) => v.endsWith('*')) || '').replace('*', '') : null;
    const all = rowNow ? rowNow[1].map((v) => v.replace('*', '')) : values;
    for (const v of all) {
      try { await clickIn(row, v); } catch (e) { record('item3', { city, name: `item3/option ${row}=${v}`, error: String(e) }); console.log(`option ${row}=${v}: FAILED ${e}`); continue; }
      await sleep(2500);
      await measure(`item3/${city}/option/${row}=${v}`, () => sleep(10000));
      await shot(page, `item3/${city}/option/${row.replace(/[^a-zA-Z]+/g, '_')}=${v}`);
    }
    if (before) await clickIn(row, before).catch(() => {});
    await sleep(1500);
  }
  await input.press(cdp, 'Escape', 'Escape');
}
process.exit(0);
