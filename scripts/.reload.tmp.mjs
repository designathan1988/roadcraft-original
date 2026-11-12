import { chromium } from 'playwright';
const browser = await chromium.connectOverCDP('http://127.0.0.1:9333');
const pages = browser.contexts().flatMap((c) => c.pages());
console.log(pages.map((p) => p.url()).join('\n'));
const page = pages.find((p) => !p.url().startsWith('http')) ?? null;
if (page) { await page.goto('http://127.0.0.1:5300/', { waitUntil: 'commit' }); console.log('reloaded'); }
process.exit(0);
