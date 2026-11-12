# Objects: inventory of everything drawn that is not a generated building or a road surface

Read-only inventory made for the VIGIA. Counts: `reports/engine-geometry/rows` (2026-10-23; vehicles, props, vegetation, signals,
barriers, transit and poles are unchanged since) and, for people, the headers of `cooked/people/*.bin` (cooked 2026-10-24 07:02Z). The
catalogue's people rows are stale.

## 1. People

- 16 cooked bodies (`cooked/people/mh_*.bin` + `.ktx2`, list `src/people/cast.json`, `citizenCasting.ts:39`). One SkinnedMesh per body
  (body, clothes, shoes, hair, brows, lashes, eyes merged), one 1024² atlas, one material (`personMaterial.ts`).
- Hidden skin removed at the cook (`src/dev/peopleBuild/personRig.ts:623-667`) only under clothes, shoes, top, bottom, skirt, dress, suit and
  gloves.
- Levels: budgets `[3000, 800, 200, 60]` (`cookedPerson.ts:37`), made by `simplifyWithAttributes` with error caps
  `[0.005, 0.015, 0.04, 0.1]` of body height (`src/dev/peopleCook/lodLadder.ts:20-50`). Measured min / median / max:
  - L0 3000 / 5101 / 11590;
  - L1 1232 / 3997 / 10688;
  - L2 199 / 542 / 8188;
  - L3 41 / 223 / 1854;
  - the card 2.
  The budgets are often missed because the error cap wins (mh_59 L2 = 8188).
- Drawn as 4 InstancedMeshes per body (one per level) + 1 card (`riggedCitizens.ts:535-570`). GPU skinning by a palette pass
  (`crowdAnimation.ts:229-236`). 13 face morphs on L0 only. The card has 8 yaw frames (`personImpostor.ts:69-115`), used below 8 px.
- **Today no person loads**: the cooked manifest's hash `62cf9d765ce349d9` does not match the cook code's hash
  (`reports/otimizacao/INVENTARIO.md:10`).
- Held props: newspaper 24, cup 96, phone 12, camera 52, bag 24, umbrella 40, box 24 (`heldProps.ts:36-78`). Rider helmet 168
  (`agents.ts:598`).
- Source assets, cook time only: `public/models/people` (313 MB; 575 proxies, of which 133 the cast can wear). `cooked/procedural/*.bin`
  (38 files) is ORPHANED: nothing reads it.

## 2. Vehicles (`src/render/agents.ts`, `carBody.ts`, `vehicleModels.ts`, `vehicleLevels.ts`)

- One InstancedMesh per part per style. 7 levels made at run time by meshoptimizer (`partLevelsWork.ts:9-14`,
  `LEVEL_ERRORS=[0.0125...0.4]`). Bands: 0 = far proxy + lamps + blob; 1 = lite body, glass, trim, wheels; 2 = interior, steering wheel,
  occupants, real shadows.
- Hidden triangles NOT removed (the hatch has 109).
- L0 / far:
  - hatch 14,838 / 36 (shell 9,720, glass 1,008, trim 460, interior 1,570, roof 1,540, steering 540);
  - sedan 15,310 / 36; wagon 15,014 / 36; suv 14,842 / 36; pickup 14,346 / 36; van 13,600 / 36;
  - bus 8,872 / 80 (interior 6,172); truck 2,464 / 96;
  - motorcycle 704; bicycle 432;
  - wheel 404 (tyre 256 + rim 148); spoked wheel 672;
  - steering wheel 540; lamps and plates 12; blob 10;
  - far traffic 24 (`densityCars.ts:59`); train car 12 (`transit.ts:382`).

## 3. Street furniture (`propGeometry.ts`, `streetFurnitureLayer.ts`, `propCells.ts`, `cellInstances.ts`)

- Street lamp 132 → far 32; lens 2; night pool 28; night beam 144 (`scenery.ts:217/229`).
- Bin 182, bench 164, hydrant 164, postbox 92, phone 560, drain 108, tree pit 90: each near → a 12-triangle box under 12 px.
- **In far blocks they are drawn with the full near mesh** (`propCells.ts:405-427`).
- Meadow grass tuft 35, wildflower 40.

## 4. Street props

- Traffic signal head 412 (frame 52, visors 6 × 12, lenses 6 × 36, halos 2 × 36) (`signals.ts:116-127`); no LOD.
- Utility poles (`utilities.ts`, `poleLayer.ts`):
  - mast 24/12/6;
  - arms and braces 12, cap 40, insulator 30, transformer 56;
  - lamp lens 2, pool 28, beam 144;
  - wires 64 → 2 (5 templates, 9 wires per span).
- Signs: post 24, plate 2 (`signs.ts:461`, `signLayer.ts:266-290`).
- Barriers (`barriers.ts:145`), boxes of 12 per piece, per 70 m: fence 864, wall 432, hedge 216, guardrail 648, **railing 6,996**.
- Transit: boxes of 12 (140 m of track ≈ 996), bus stop 72, metro boxes.

## 5. Vegetation and landscape

- Low-poly models (`lowPolyTrees.ts`): oak 282, broadleafTall 180, cypress 158, palm 480, ipê 240 ×2, bush 112, bushFlowering 112,
  hedge 120.
- Below 48 px each plant is an octahedral impostor (2 triangles, 8 × 8 frames of 64 px, `plantImpostors.ts`).
- Street trees, garden plants (`gardens.ts`), nature forest (`natureTrees.ts`, `plantCells.ts`), painted woods (`groundCover.ts`),
  rocks 36, scrub 60.
- Far forest: 2 per tree, impostor (`farForest.ts`, `farWoods.ts`).
- Landscape glTF (`public/models/elements`, `elements.ts:70`):
  - stones 244-522, pebbles 114-136, gravel 52-104;
  - grass 155-494, tallGrass 326-622, scrub 120-360, fern 288, clover 379-615;
  - **flowers 755-1,690**, **mushrooms 880-3,216**;
  - leaves 2.
- Water (`terrain.ts:2580`): sample lake 4,624, river 864.

## 6. Other

Sky dome 960; rain 10,000 segments; exhaust 4,000 points; blast debris box 12 / cylinder 36; craters 28; shockwave 96; gore 28-120;
blood decals 20. Road structures (piers 48, boxes 12, `structures.ts`) are the roads session's. Flags 576 are the buildings session's.

Not counted: vehicle levels 1-6 (made at run time), per-frame instances and draw calls (need the game), blast slabs and car shells, wrecks,
fracture pieces, water and far forest per real map.
