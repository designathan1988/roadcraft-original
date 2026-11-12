# src/core/dynamicResolution.ts
Lines: 64
Summary: Dynamic resolution (an option, off by default): every 30 GPU frame costs, the 90th percentile picks a scale among fixed steps (1 .. floor) so the frame aims at 85% of the budget; falls at once, rises one step at a time, ignores 5 samples after a change.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-14 constants: WINDOW 30, AIM 0.85, STEPS 1..0.5, DEADBAND 0.05, RISE_MARGIN 0.05, SETTLE 5
- 16-27 class fields (scale, costs/sorted buffers, steps from STEPS above the floor plus the floor) and constructor
- 29-55 sample: invalid or settling samples skipped; at 30 samples, sorted copy, p90, wanted scale = scale * sqrt(budget*aim/cost); down to the largest step that fits, or up one step with margin; returns the new scale or null
- 57-64 reset: whole ratio again

## Contracts, state and data flow
- No allocation per sample; a new scale changes the canvas' drawing size (the screen's targets remade, to check where).

## Depends on / used by
- uses: nothing; used by: the renderer's resolution option

## Problems found (finding IDs)
- none

## To check in other files
- renderer: what a scale change reallocates (render targets).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/sort : numeric, in place (line 39)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/set : copies values into the array from offset 0 (line 38)
- https://threejs.org/docs/pages/WebGLRenderer.html : (redone research) the drawing buffer is width x height x pixelRatio: the fill cost scales with the pixel ratio squared, so this scaler (off by default) is the GPU lever for mid-range cards on high-DPI screens; whether main.ts caps devicePixelRatio decides the default GPU load (to check)
