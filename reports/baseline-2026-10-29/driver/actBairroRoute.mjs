// The district zoom's route (each movement from the district's reference view), as an action for profile.mjs and trace.mjs.
import { makeMoves } from './moves.mjs';
export default async ({ page, cdp }) => { const m = await makeMoves(page, cdp); await m.bairroRoute(); };
