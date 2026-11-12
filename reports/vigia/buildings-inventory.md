# Buildings: inventory of everything a generated building draws

Read-only inventory made for the VIGIA (code read and counted by hand, checked against `reports/engine-geometry/rows`, measured
2026-10-23, before commits 6a2ba7be, 506b4736 and 759af93f: part and furniture models still match the code; whole-building numbers may be
stale). Primitive counts: three's box 12; `Emitter.box` 10 (no bottom); `sides()` 8; `Emitter.cylinder(sides)` 3 × sides; `Shell.face` with
n points n − 2.

## 1. Shell faces (`src/render/buildings/buildingMesh.ts`)

| emitter | file:line | lays | triangles |
|---|---|---|---|
| `emitBuilding` | :1186 | plinth loop, reliefs (box 10 or 4), observation wideWindow 10, cut-open walls 6/2, deco pilasters 6/bay, outside steps 8/step, machine room 10 | as listed |
| `emitBay` | :1907 | pillar 6-10 + column 24; plain wall 2 (0 when its run lays it); cut opening 16 (porch 14); flush opening 2 or 0 | as listed |
| `emitStreak` | :1738 | rain streak (near shell only) | 2 |
| `emitPorchLight` | :1138 | lamp + wash instances | 12 + 2 |
| `emitFacadeRuns` | :1798 | one quad per run of like bays × storeys | 2 per run |
| `emitPlinth` | :2106 | face + ledge per span; 2 notch cheeks per recessed entrance | 4 per span (+4 per notch) |
| `emitRecessedFlight` | :2187 | verge slab + riser/tread per step | 8 + 4/step |
| `emitRelief` | :2221 | cheeks, head, sill | 8 |
| `band` / `flushBand` | :3471 / :3479 | storey bands | 8 / 4 per span |
| `emitCornice` | :3525 | slab 16, default 32, deco 64 | as listed |
| `emitRoof` flat | :3798 | roof quad 2; parapet piece 8; terrace edge `roofRailing` 78 | |
| `emitRoof` gable / hip / shed / sawtooth | :3866 / :3941 / :3999 | 34 / 26 / 16 / 6 per tooth | |
| `emitPolygonRoof` | :3676 | earcut patches, eaves infill, parapet 6/side or roofRailing | not fixed |
| `emitRoofPlant` | :2246 | drains 20, tank 136 (far 94), tankBox 30/10, hatch 10, condenser 20/10, airHandler 94/10, solar 10/panel, mast 20-30, dish 20/10, skylight 10, vent 84, liftRoom 20, chimney 42 | as listed |
| `emitTerrace` | :2359 | deck 10, pots 30, parasol set 50, loungers 10, pergola 10/piece, water tank 84 | |
| `emitRoofDetails` | :3536 | solar/skylight 4, vent 10, spire 58 + flag, chimney 20 | |
| `emitLantern` | :3610 | glazed lantern with dome | 982 + flag |
| `emitInterior` (cut open) | :1636 | floor earcut, core 60, lift 10, stair 120, flights 10/riser, partitions 10, furniture via `placeFurniture` :1723 | |
| `emitLot` / `emitLots` | :2977 / :2437 | apron 2 per 2 m; paved lot 2 per 3 m cell; kerb 2 per 3 m; pool water 12 + coping 8 + sides | |
| `emitClock` | :2679 | 16 boxes as lotBox | 160 |
| stairs, rails, fences, flowers, rocks, parking, lot parts | :3075-:3350 | 8/step, 6/side, fence 2 lotRail 8 + posts 10 every 2 m (railing every 0.45 m), flowers 20, rocks 30, parking 2/quad | |

Far level (L1): the same walk with `far`; bays ≤ 0.3 m deep (`FLAT_DEPTH` :182) flattened into runs; pane/frame/door/shutter left to the
shader; `only(NEAR)` items left out.

## 2. Kit part kinds (`chunk.ts:8-30`, geometry `kit.ts:479-501`, levels `kit.ts:622-645`), all instanced

| kind | geometry | L0 (raw → measured) | coarser levels |
|---|---|---|---|
| glass / glassDark | kit.ts:478 plane | 2 | – |
| frame | kit.ts:272 | 56 | card 2 |
| concrete | unit box | 12 | top 2 |
| door | kit.ts:342 | 72 → 62 | 12 |
| shutter | unit box | 12 | – |
| railing | kit.ts:286 (21 boxes) | 252 → 222 | card 12 |
| roofRailing | kit.ts:335 (7 boxes) | 84 → 78 | card 4 |
| awning | kit.ts:407 | 24 | – |
| column | kit.ts:489 open cylinder 12 | 24 | – |
| water | unit box | 12 | top 2 |
| lamp | unit box | 12 | – |
| wash | plane | 2 | – |
| fin | unit box | 12 | top 2 |
| louvre | kit.ts:358 | 52 | box 12 |
| glassRail | kit.ts:374 | 12 | none |
| brise | kit.ts:385 | 60 | 24 |
| acUnit | facadePropModels.ts:55 | 80 → 74 | 30 |
| pot | :90 | 126 → 112 | meshopt (run time) |
| foliage | :113 | 192 | meshopt |
| bush | :280 | 168 | meshopt |
| chair | :159 | 96 → 78 | meshopt |
| table | :172 | 160 → 146 | meshopt |
| airer | :183 | 168 | meshopt |
| dish | :212 | 146 | meshopt |
| lounger | :307 | 96 → 66 | meshopt |
| bike | :320 | 240 | meshopt |
| lotBox / lotRail / lotSlab / lotSides | shellParts.ts:108-117 | 10 / 8 / 10 / 8 | top 2 / top 2 / top 2 / 0 |

Level choice: `levelAt` partCells.ts:421 (coarser once its error < 1.5 px); facade-level cells draw `levels.at(-1)` (farParts.ts:64).
**Possible bug (read, not measured):** `FarPartBatch` is built at layer.ts:174 right after the kit, before `MeshoptSimplifier.ready`, so the far
batch probably draws the 9 simplified props at their full L0.

## 3. Furniture and plants

Interior furniture (`furnitureKit.ts:107`, 40 kinds, `FURNITURE_KINDS` world/buildings/interior.ts:13), measured triangles: bed 126,
singleBed 118, sofa 172, armchair 128, table 76, chair 112, desk 64, officeChair 820, shelf 370, bookshelf 1814, counter 30, fridge 44,
stove 208, sink 64, toilet 70, bath 56, wardrobe 40, tv 32, plant 462, pew 44, seat 40, wardBed 132, bars 438, screen 22, altar 104,
machine 86, rack 240, locker 40, atm 30, stage 40, barCounter 246, blackboard 34, checkout 50, treadmill 48, pallet 20, ceilingLamp 260,
floorLamp 160, tableLamp 146, stairs 152, stairwell 34. Used by the cut-open interior, by ruins (`interiorFurniture` :4654, about 140
pieces) and as the shader box behind panes (roomBehind.ts:27).
Lot plants (`src/render/gardens.ts:75/:172`): broadleaf 282, broadleafTall 180, conifer 158, ipê 240, bush 112, bushFlowering 112, hedge 120,
far picture 2.

## 4. Windows and rooms

Pane = 2-triangle instance; the room behind (glassRoom.ts:258), pane frame (`PANE_FRAME_GLSL` :16), recess (:75/:116), lamps
(roomLamps.ts:46), louvre slats, AC front and the facade-level windows (facadeLevel.ts:73) are all shader.

## 5. Far levels

Detail runs (2 per run), facade level L1 (a whole building measured 60k-158k in the catalogue), masses cell/tile/plate (massing.ts:285,
massCells.ts:252), base (massBase.ts:106). Buildings have NO impostor.

## 6. Signature buildings, landmarks, flags, lot elements

- `signature.ts:1755` `buildSignature` (designs at :1740): primitives box 12, plant 112, cone 26, bush 80, ellipse 96, dome 240, lamp 76,
  flag 42, tree 200, cylinder 40, windowFront (5+m)×12, windowSide 72.
- `landmarks.ts:418` and `facadeKit.ts`: spire 144, finial 60, bellMansard 64, archedDormer 168, cartouche 216, plantedTree 304, lampPost 116.
- No catalogue group for signature buildings or landmarks.
- Flag cloth: `flagLayer.ts:106`, a plane of 24 × 12 segments, 576 triangles per flag.
- Lot elements (`layElement` :2729): stairs 10/step, railing 16 + 10/post, fence 16 + posts, gate pillars 20, bin 36, lot lamp 30,
  bollard 10+10, drain 50, bench 36, planter 20, canopy 40, boundary wall 28, clock 160.

## 7. Other

Ghost/preview (kit.ts:571), faded copies (fade.ts), ruins (destruction.ts:72, fracture.ts:173), part shadow casters (partCells.ts:345),
party walls (removal only). `signature-*` and `flag-cloth` are in no memory group (perfBudget.ts:76).

Not inventoried: meshopt levels (run time), whole-building totals (record-dependent), signature/landmark totals (no catalogue rows).
