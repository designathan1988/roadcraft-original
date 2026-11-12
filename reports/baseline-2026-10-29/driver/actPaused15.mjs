// The simulation paused (its button clicked), 15 s still, then 1x again: an action for profile.mjs.
import { sleep } from './lib.mjs';
import { makeMoves } from './moves.mjs';
export default async ({ page, cdp }) => { const m = await makeMoves(page, cdp); await m.clickLabel('Pausar'); await sleep(15000); await m.clickLabel('Velocidade da simulação 1×'); };
