# Backlog of the optimisation work (the owner's list, kept in order)

One thing at a time: the item in progress is finished (code, spec, before/after, commit) before the next starts. New findings are added
here, never switched to.

## In progress
1. The wires (the coordinator): research how games draw power lines (camera-facing ribbons, Humus "phone-wire AA", sag in the vertex
   shader), then the right method; today 64 triangles a span near. Code, spec, before/after sheet, commit.
   1b. Right after (the owner, 2026-10-25): a span carries 9 wires today (3 courses x 3 offsets), too many. Two kinds of pole to choose from
       when placing them (the editor's pole tool and the generator):
       - URBAN: the cross-arm set off toward the street, not centred (the Brazilian "beco"/"meio-beco" structures), 3 insulators on it (2
         today) carrying the 3 primary wires; below, a vertical secondary rack (spool insulators bolted to the pole) carrying 2 wires one
         over the other; the street light below that - BELOW every wire, never among them (the owner, 2026-10-25: today the lamp
         stands in the middle of the wires).
       - RURAL (outside the city): 3 wires on top, the cross-arm centred (the "normal" structure).
       Research the real standards (structure drawings, heights, spacings), model the rack, the insulators, string 3 + 2 / 3 wires, the
       pole kind in the document and the tool, sheet, commit.
   1d. DONE (F18). Right after 1b (measured by mesh on the wire sheet's street view, 31,634 triangles): (a) the wires send 11,980 triangles of which
       2,184 have an area - a 1 km block's template is its nearest wire's, the farther wires collapse in the shader but are counted: bucket
       each block's wires by their own distance on the CPU (re-bucketed as the eye moves) so what is sent is what is drawn; (b) every pole
       part's level is its 1 km block's nearest pole's (insulators 8,160, caps 2,720, masts 2,304): each pole by its own distance, as the
       street props do (`cellInstances.ts`); (c) the lamps' cones (4,896) and pools (2,520) drawn by day, their light zero: none drawn then.
   1c. Later, a new family (the owner noted it does not exist yet): transmission towers. Only on the owner's order.

## Next, in order
2. Buildings seen from afar look like boxes (the owner's picture of the overview; the agent after its gate 3): the far levels (cell masses,
   tile and plate masses, the base) draw curtain-wall towers as one flat light-grey glass with no storey or mullion line
   (`massingMaterial.ts`: across = up = 0.9 for a curtain wall), and the base no window at all.
2b. The agent's gate 2 (far buildings, variant b) ACCEPTED by the coordinator (diff read, 20 spec files / 100 tests, the V0 crop): the tile
    timing with the 1.4 m drop re-run quiet before it is committed. Its findings left alone, here: (1) L0 vs L1 glass bands at 350 m (teal vs
    near-black), (2) masonry masses greyer than L0 at 2 km (89,91,90 vs 119,105,88), (3) the base draws glass towers matte black, (4) the lab's
    engineBuildings builds masses without `kit.finishTone`, (5) night views not checked.
3. DONE (F20, gate 3 accepted; its +1 ms was the sheets' timing, confirmed in the game by the Lab). The agent's gate 3 (the building props' pictures), reported: verify its sheets (reports/elements-optimization/building-part-pictures/compare),
   its triangles (district facade 800 m 262,556 -> 77,684; tower-ne 119,124 -> 93,917), its 3 fixes made during gate 3 and the code; BLOCKER
   before any commit: its wall frames' scene pass went 0.40-0.55 -> 1.40-1.58 ms (4+4 runs), cause not found.
4. DONE (F23). The impostor atlases of the street props: their mip chains are never read (a still set reads mip 0): no mips, LinearFilter (VRAM).
   Caution (the owner's optimisation guide, 2026-10-25): dropping mips is no optimisation where they are read - prove with a moving
   sheet that nothing shimmers before dropping any.
5. Every model's base mesh, not only its levels (the owner's order): an inventory of every model the game makes
   (`node scripts/optimization-sheet.mjs inventory`), its triangles, vertices, bytes a vertex; hidden faces, duplicate vertices, vertex
   cache order (meshoptimizer optimizeVertexCache / optimizeVertexFetch), attribute compression (positions, normals, colours quantized).
6. Textures: every texture the game holds (the Lab's GPU objects): format, size, mips read or not, compression (KTX2/Basis), atlases.
7. The lot boxes (`building-lotBox`, 914 k triangles at V5) and the other shell parts: thin posts and rails left out under half a pixel across
   (the bars' rule, `BAR_PIXELS`), measured with sheets.
8. The building parts' shadow casters (lotBox-caster 1.54 M triangles on a cascade redraw).
9. The JS heap's churn (~1 MB/s of garbage at rest) and the long tasks (up to 143 ms). Step done (F22): the geometry governor no longer
   runs the full memory count; the churn not re-measured yet.
10. The in-game photos still owed: the poles' round pieces close up (F13), a rainy night's cones close up (F14).
11. The stale VIA-05 spec (`pixelSkips.spec.ts`): the owner's call.
12. EVERYTHING the game draws, one family at a time (the owner's order): research the right method to optimise it AND how it should be drawn,
    built and architected (as the wires: research found the camera-facing ribbon, not a tube); change the model's architecture completely where
    that is what it takes, keeping the look and gaining performance (fewer triangles, draws, bytes). The families from the inventory (item 5):
    buildings (shells, masses, parts, lots), roads and junctions, terrain and water, trees and plants, ground cover, street furniture, poles and
    wires, signals and signs, vehicles, people, effects (rain, smoke, fire), sky and clouds, the post chain. Each: sources cited, plan, sheet,
    commit. The owner, again (2026-10-25): research how each 3D model should be built - the poles, the traffic signals and every other
    element in the game - its right architecture, not only its levels.
13. From the owner's optimisation guide (2026-10-25), checked against the code (what the game already has is not new):
    - Already in the game: interior mapping behind the window panes (`buildings/glassRoom.ts`, van Dongen 2008); the buildings' own
      occlusion culling (`occlusion.ts`, a CPU hierarchical depth buffer of the walls that surely stand); KTX2/UASTC textures transcoded to
      BC7/ASTC/ETC2 (`ktx2Texture.ts`); octahedral impostors; instancing and BatchedMesh; far masses (tile, plate) as the buildings' HLOD;
      CDLOD terrain; casting by size; the meso traffic for the far cars.
    a. GAP: the occlusion test hides only the buildings' objects (`renderer.ts` buildings.hideOccluded). Poles and wires, street props,
       trees, signals, vehicles and people behind the walls are still drawn. Measure what a street view draws hidden, then test each
       layer's blocks/cells against the same buffer (colour pass only, as the buildings).
    b. Textures (item 6): find every texture NOT compressed (canvas textures such as the poles' wood, RGBA8 atlases) and its bytes.
    c. Every optimisation proved A/B by GPU time as well as triangles (the rule already; the guide asks for P95/P99 frame times too).
14. A shader's compile warning on this GPU since 12:24 at least (ANGLE/D3D): `warning X4122: sum of 1 and -1.49272e-017 cannot be represented
    accurately in double precision` at lines 209-210 of one program (vite log). Find the program and the constant; harmless today, but a
    shader's message on any GPU is to be cleared (the game ships on Steam).
15. DONE (F21). The lab sheets' GPU timing (partLadderSheet, farBuildingSheet, propLadderSheet): light frames swing between two GPU clock states; time
    them under load (a sample block of ~12 ms) and A/B in one page; log `nvidia-smi` clocks (read only) to prove it.
16. At V5 the scene pass is bound by its pixels, not its triangles (F20): measure the facades' fragment cost (the shell program, the masses,
    the glass), GTAO 1.6 ms, canyon light 0.6 ms - the Lab's passes - and find what a pixel spends.
17. From the second F7 audit (2026-10-25, AUDIT.md "Second audit"), the game's items left open:
    a. CLOSED: P41/P51 (heap 62.8 MB and 10 textures more after one lap from a cold start): no leak in the code paths; the textures are
       the citizens' per-person batches (16 at most), the heap the cells' budgeted caches (AUDIT.md, "Left open" P41).
    b. CLOSED, by design: P7 (`casterChanges` 2.0 s of self time, 0.28 ms a frame): the casters' signature is what keeps the sun's
       cascade stores between frames; its CPU spares the cascades' GPU redraw.
    c. DECIDED, not done: `vehicle-lamps` (64.5 k triangles, 5.4 k boxes of 12 triangles). Of a lamp's six faces only the one against
       the body is always hidden, and the GPU already culls the faces turned away after their few vertices: 2 triangles a lamp spared at
       most, against a risk to the lamps' look (a lamp standing proud of the body shows that face). Not worth a change.
    d. DECIDED, left: P48 (`X4122` at boot): three's `packing.glsl` constants folded by D3D's compiler; a warning on this GPU, three's
       code; patching three's depth packing blind would risk the shadows' precision for a warning.
    e. The Lab's own faults (P32-P45, P52): recorded, out of this work's scope by the owner's order (the game's errors only).
18. DONE (AUDIT.md F31, F32): the `texSubImage3D: no bound PIXEL_UNPACK_BUFFER` warnings were a WebGL context lost and restored (a saturated
    machine), the baked surfaces sent with their texels let go; reproduced with `WEBGL_lose_context` and fixed, with everything else the
    restore lost (the paused frame, the sky's reflection, the far pictures, the far shadows, the citizens' frames, the cells' levels).
