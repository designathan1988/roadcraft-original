import { join, resolve } from 'node:path';
import { _electron } from 'playwright';

/**
 * THE DESKTOP APP OPENED FOR THE OWNER TO PLAY, WITH A CITY GENERATED: `node scripts/play.mjs [small|large] [seed] [radiusMetres]`.
 * The product built with its probes first (`npx vite build --mode probe --outDir dist`, then the desktop jobs' build): the city is asked
 * through the page's probe (`__roadcraft.generateCity`) as the look runs ask it (`scripts/look.mjs`). The window is the player's own
 * (shown, maximised, the player's profile); this process stays until the window closes. No Steam.
 */

const [size = 'large', seed = '7', radius] = process.argv.slice(2);
const options = { seed: Number(seed), size, ...(radius ? { radiusMetres: Number(radius) } : {}) };

const app = await _electron.launch({ args: [join(resolve('.'), 'desktop', 'main.cjs')], env: { ...process.env, ROADCRAFT_NO_STEAM: '1' } });
app.process().stdout?.on('data', (chunk) => { for (const line of String(chunk).split(/\r?\n/)) if (line.startsWith('[metrics]')) console.log(`${new Date().toISOString().slice(11, 19)} ${line} MB`); });
const window = await app.firstWindow();
await window.waitForFunction(() => typeof window.__roadcraft?.generateCity === 'function', null, { timeout: 120_000 });
console.log(`generating the ${size} city of seed ${options.seed}${radius ? ` over ${radius} m` : ''}`);
const started = Date.now();
await window.evaluate((o) => { window.__roadcraft.generateCity(o); }, options);
await window.waitForFunction(() => performance.getEntriesByName('city:applied').length > 0, null, { timeout: 1_800_000, polling: 500 });
console.log(`city applied after ${((Date.now() - started) / 1000).toFixed(0)} s; the window is the owner's now`);
app.on('close', () => process.exit(0));
