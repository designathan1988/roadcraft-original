import { chromium } from 'playwright';
// A real edit in the open window (gestures), the page's code sampled while it lands: `step` says which part.
const [step, shot] = process.argv.slice(2);
const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
const page = browser.contexts().flatMap((c) => c.pages()).find((p) => p.url().startsWith('http://'));
if (step === 'open') {
  const button = page.getByText('Continuar', { exact: true });
  if (await button.count()) await button.first().click();
  await page.waitForTimeout(1500);
  await page.getByText('Vias', { exact: true }).first().click();
  await page.waitForTimeout(1500);
}
if (step === 'draw') {
  await page.evaluate(() => { window.__labCode?.start(true); window.__labCode?.record(true); performance.mark('edit:start'); });
  await page.mouse.move(1400, 520);
  await page.mouse.down();
  for (let i = 1; i <= 30; i++) { await page.mouse.move(1400 + i * 10, 520 + i * 2); await page.waitForTimeout(16); }
  await page.mouse.up();
  performance.now();
  await page.waitForTimeout(12000);
  const out = await page.evaluate(() => {
    const code = window.__labCode;
    const rows = code ? code.functions('session').sort((a, b) => b.selfMs - a.selfMs).slice(0, 40) : null;
    code?.record(false);
    const since = performance.getEntriesByName('edit:start')[0].startTime;
    const hitches = performance.getEntriesByType('measure').filter((m) => m.startTime > since && m.name.startsWith('hitch:')).map((m) => m.name + ' ' + m.duration.toFixed(0));
    return { status: code?.status(), rows, hitches: hitches.slice(0, 40), diary: window.__changes(30).filter((c) => c.at > since).map((c) => c.kind + ' | ' + (c.ms ?? 0).toFixed(0) + ' ms | ' + (c.detail ?? '').slice(0, 100)) };
  });
  console.log(JSON.stringify(out, null, 1).slice(0, 12000));
}
if (step === 'undo') { await page.keyboard.press('Control+z'); await page.waitForTimeout(3000); }
if (shot) await page.screenshot({ path: shot });
process.exit(0);
