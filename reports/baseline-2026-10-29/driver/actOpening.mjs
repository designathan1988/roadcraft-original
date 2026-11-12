// The opening: the page loaded again (the autosaved city reopened, as at the game's start) until the opening is shown and the world is
// settled: an action for profile.mjs (the page's own session survives the load; the old workers' do not).
import { sleep } from './lib.mjs';
export default async ({ page }) => {
  await page.evaluate(() => location.reload());
  await sleep(1500);
  await page.waitForFunction(() => performance.getEntriesByName('opening:shown').length > 0, null, { timeout: 900000, polling: 250 });
  await page.waitForFunction(() => window.__roadcraft && !window.__roadcraft.scene().worldBusy, null, { timeout: 900000, polling: 250 });
};
