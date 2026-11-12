# src/core/gpuTier.ts
Lines: 33
Summary: The graphics tier a machine starts on, by the renderer string (WEBGL_debug_renderer_info): software/phones low, NVIDIA RTX x060 and up ultra, AMD RX x700+ ultra, Intel integrated low, Apple M ultra/high; unknown medium.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-2 GpuTier type: low, medium, high, ultra
- 4-24 RULES, first match wins: software and phone GPUs low; RTX: x050 and the 20 series high, every other RTX (3060, 4060...) ULTRA; MX low; GTX 16/1070/1080 high; other NVIDIA medium; AMD RX 6000-9000 by the x700 split ultra/high; RX 5700 high; other AMD medium; Intel Arc high, Iris medium, others low; Apple M Max/Ultra ultra, M high
- 26-33 tierForGpu: the first matching rule's tier, medium otherwise

## Contracts, state and data flow
- A mid-range card (RTX 3060/4060, the "mid-range PC" of the mission) starts on the ULTRA tier: the heaviest settings by default on the target machine.

## Depends on / used by
- uses: nothing; used by: the quality governor / settings at the first start

## Problems found (finding IDs)
- F-0007 (suspected, S2): mid-range RTX x060 cards start on ultra

## To check in other files
- src/render/quality.ts: what 'ultra' turns on over 'high' (GPU and memory costs), to decide whether a mid-range card should start there.

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/WEBGL_debug_renderer_info : UNMASKED_RENDERER_WEBGL is the driver's renderer string, not always available (line 1, 26)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/match : a non-global regex returns the match with its groups, null when none (lines 28-29)
- https://store.steampowered.com/hwsurvey/videocard/ : (redone research) September 2026, the most common Steam GPUs are RTX 5070 6.15%, 5060 4.40%, 5060 Ti 4.06%, 4060 3.89%, 3060 3.66%, 4060 Laptop 3.50%, 3050 2.90%: the x060 cards ARE the mid-range PC of the mission, and line 9 starts them (laptops included) on ultra (F-0007 confirmed in relevance)
