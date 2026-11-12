import { chromium } from 'playwright';
const [x, y, kind, shot] = process.argv.slice(2);
const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
const page = browser.contexts().flatMap((c) => c.pages()).find((p) => p.url().startsWith('http://'));
if (kind === 'dbl') await page.mouse.dblclick(Number(x), Number(y)); else await page.mouse.click(Number(x), Number(y));
await new Promise((w) => setTimeout(w, 8000));
if (shot) await page.screenshot({ path: shot });
process.exit(0);
