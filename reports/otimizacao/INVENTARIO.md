# Inventory: every model the game draws, before the redo

Built by the engine's own builders on the no-game page (`node scripts/optimization-sheet.mjs inventory`), on the tree with the rejected rounds reverted (`837f1866`). 2499 objects; every one is **not optimised**. Raw data: `inventario.json`.

Triangles and vertices count every copy of an instanced part inside an object (a building's windows); geometry bytes count each buffer once.

Not in this list, and why:

- The MakeHuman garments, hair and base body (`public/models/people`): the game never loads them; they are the source of the cooked people (`MODELOS_NAO_USADOS.md`).
- **People: cast (cooked)** shows 0 triangles: the cooked people are stale (cooked as `62cf9d765ce349d9`, the code now gives `c20e4c2f976a25dd` since `57cab9fe` changed `src/core/rng.ts`), so they do not load, in this page or in the game. They are cooked again in the people group.
- Layers made only in a generated city (the test city's copies, draw calls): counted with the game, which is not opened.

## By group

| Group | Objects | Triangles | Geometry KB | Hidden triangles |
|---|---|---|---|---|
| Buildings: far facade (L1) | 80 | 756,308 | 5,311 | 90,284 |
| Buildings: made to measure | 27 | 387,578 | 3,146 | 53,552 |
| Buildings: functions | 42 | 385,586 | 4,309 | 30,012 |
| Roads | 48 | 219,539 | 15,452 | 0 |
| Vehicles | 13 | 101,522 | 4,484 | 1,723 |
| Buildings: presets | 11 | 91,778 | 1,095 | 8,696 |
| Far forest | 6 | 44,152 | 691 | 0 |
| Buildings: interiors (cut open) | 3 | 28,964 | 850 | 4,332 |
| Buildings: shell pieces | 1712 | 27,394 | 2,889 | 12 |
| Editor previews | 5 | 19,066 | 282 | 1,641 |
| Landscape elements (glTF) | 23 | 11,622 | 497 | 0 |
| Barriers | 5 | 9,156 | 55 | 0 |
| Furniture (interiors) | 40 | 7,172 | 1,121 | 551 |
| Buildings: masses (cell level) | 79 | 6,508 | 599 | 2 |
| Water | 2 | 5,488 | 707 | 0 |
| Terrain | 4 | 3,312 | 136 | 276 |
| Buildings: masses (tile level) | 79 | 2,516 | 233 | 2 |
| Buildings: masses (plate level) | 79 | 2,204 | 201 | 0 |
| Buildings: part models | 31 | 2,082 | 151 | 257 |
| Low-poly plant models | 9 | 1,924 | 191 | 83 |
| Ecosystem trees | 12 | 1,852 | 170 | 171 |
| Street furniture | 13 | 1,741 | 91 | 415 |
| Forest trees (painted woods) | 8 | 1,720 | 183 | 11 |
| Traffic signals | 1 | 1,648 | 11 | 0 |
| Street trees and bushes | 8 | 1,444 | 153 | 3 |
| Buildings: base (farthest level) | 79 | 1,318 | 33 | 15 |
| Transit | 4 | 1,128 | 45 | 0 |
| Roads: network far level | 12 | 1,032 | 55 | 0 |
| Utility poles | 12 | 1,014 | 35 | 0 |
| Sky | 1 | 960 | 23 | 0 |
| Flags | 1 | 576 | 14 | 0 |
| Ground cover | 9 | 420 | 49 | 85 |
| Signs | 12 | 318 | 168 | 0 |
| Effects | 6 | 282 | 448 | 0 |
| People: held props | 7 | 272 | 29 | 54 |
| People: cast (cooked) | 16 | 0 | 0 | 0 |
| **Total** | **2499** | **2,129,596** | **43,905** | |

## Buildings: far facade (L1)

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Buildings: far facade (L1)/residential high (large lot 40 x 36 m (residentialTower))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 157,990 | 313,762 | 68 | Uint16 | 249,668 | L0 157,990 | 26,635 | not optimised |
| Buildings: far facade (L1)/residentialTower (homes)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 140,962 | 271,743 | 68 | Uint16 | 208,912 | L0 140,962 | 17,774 | not optimised |
| Buildings: far facade (L1)/residential high (medium lot 24 x 26 m (residentialTower))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 90,644 | 179,716 | 68 | Uint16 | 191,236 | L0 90,644 | 15,740 | not optimised |
| Buildings: far facade (L1)/hotel (commerce)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 60,794 | 120,461 | 88 | Uint16 | 116,552 | L0 60,794 | 4,163 | not optimised |
| Buildings: far facade (L1)/tower (preset)/preset | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 51,922 | 100,268 | 68 | Uint16 | 168,636 | L0 51,922 | 6,510 | not optimised |
| Buildings: far facade (L1)/apartments (homes)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 39,836 | 76,946 | 68 | Uint16 | 146,368 | L0 39,836 | 4,912 | not optimised |
| Buildings: far facade (L1)/residential medium (large lot 40 x 36 m (apartments))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 21,564 | 42,019 | 88 | Uint16 | 221,220 | L0 21,564 | 2,952 | not optimised |
| Buildings: far facade (L1)/residential high (small lot 12 x 16 m (residentialTower))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 20,858 | 40,140 | 68 | Uint16 | 125,724 | L0 20,858 | 3,025 | not optimised |
| Buildings: far facade (L1)/residential medium (medium lot 24 x 26 m (apartments))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 11,718 | 22,697 | 88 | Uint16 | 141,176 | L0 11,718 | 1,785 | not optimised |
| Buildings: far facade (L1)/apartments (preset)/preset | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 11,156 | 21,591 | 68 | Uint16 | 107,388 | L0 11,156 | 1,347 | not optimised |
| Buildings: far facade (L1)/university (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 8,046 | 14,318 | 88 | Uint16 | 178,668 | L0 8,046 | 72 | not optimised |
| Buildings: far facade (L1)/residential medium (small lot 12 x 16 m (apartments))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 6,618 | 12,591 | 88 | Uint16 | 108,148 | L0 6,618 | 1,191 | not optimised |
| Buildings: far facade (L1)/commercial medium (large lot 40 x 36 m (shop))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 6,582 | 10,822 | 88 | Uint16 | 171,516 | L0 6,582 | 138 | not optimised |
| Buildings: far facade (L1)/mixed (preset)/preset | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 6,480 | 12,627 | 68 | Uint16 | 106,200 | L0 6,480 | 367 | not optimised |
| Buildings: far facade (L1)/office (work)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 6,114 | 11,544 | 68 | Uint16 | 78,296 | L0 6,114 | 84 | not optimised |
| Buildings: far facade (L1)/prison (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 5,798 | 10,723 | 88 | Uint16 | 108,704 | L0 5,798 | 50 | not optimised |
| Buildings: far facade (L1)/commercial medium (small lot 12 x 16 m (shop))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 5,620 | 10,492 | 88 | Uint16 | 89,776 | L0 5,620 | 230 | not optimised |
| Buildings: far facade (L1)/hospital (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 5,510 | 9,766 | 88 | Uint16 | 119,460 | L0 5,510 | 54 | not optimised |
| Buildings: far facade (L1)/mall (commerce)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 5,220 | 9,024 | 64 | Uint16 | 172,088 | L0 5,220 | 256 | not optimised |
| Buildings: far facade (L1)/cityHall (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 5,010 | 8,388 | 88 | Uint16 | 127,632 | L0 5,010 | 87 | not optimised |
| Buildings: far facade (L1)/school (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 5,010 | 8,981 | 88 | Uint16 | 114,684 | L0 5,010 | 68 | not optimised |
| Buildings: far facade (L1)/commercial high (large lot 40 x 36 m (office))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 4,942 | 9,232 | 88 | Uint16 | 72,444 | L0 4,942 | 352 | not optimised |
| Buildings: far facade (L1)/courtyard (preset)/preset | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 4,320 | 7,840 | 68 | Uint16 | 105,000 | L0 4,320 | 66 | not optimised |
| Buildings: far facade (L1)/commercial medium (medium lot 24 x 26 m (shop))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 4,316 | 7,146 | 88 | Uint16 | 115,420 | L0 4,316 | 94 | not optimised |
| Buildings: far facade (L1)/commercial low (large lot 40 x 36 m (shop))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 3,896 | 6,598 | 88 | Uint16 | 126,732 | L0 3,896 | 108 | not optimised |
| Buildings: far facade (L1)/commercial high (medium lot 24 x 26 m (office))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 3,796 | 7,120 | 88 | Uint16 | 56,680 | L0 3,796 | 272 | not optimised |
| Buildings: far facade (L1)/supermarket (commerce)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 3,554 | 5,811 | 64 | Uint16 | 105,676 | L0 3,554 | 249 | not optimised |
| Buildings: far facade (L1)/courthouse (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 2,550 | 4,446 | 68 | Uint16 | 76,048 | L0 2,550 | 12 | not optimised |
| Buildings: far facade (L1)/commercial low (medium lot 24 x 26 m (shop))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 2,500 | 4,382 | 88 | Uint16 | 86,204 | L0 2,500 | 64 | not optimised |
| Buildings: far facade (L1)/commercial low (small lot 12 x 16 m (shop))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 2,476 | 4,824 | 88 | Uint16 | 59,244 | L0 2,476 | 130 | not optimised |
| Buildings: far facade (L1)/council (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 2,308 | 3,717 | 88 | Uint16 | 81,896 | L0 2,308 | 64 | not optimised |
| Buildings: far facade (L1)/cemetery (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 2,300 | 4,622 | 88 | Uint16 | 22,660 | L0 2,300 | 8 | not optimised |
| Buildings: far facade (L1)/police (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 2,172 | 3,811 | 68 | Uint16 | 51,804 | L0 2,172 | 51 | not optimised |
| Buildings: far facade (L1)/bank (commerce)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 2,126 | 3,473 | 68 | Uint16 | 73,160 | L0 2,126 | 13 | not optimised |
| Buildings: far facade (L1)/house (preset)/preset | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,926 | 3,716 | 68 | Uint16 | 67,196 | L0 1,926 | 228 | not optimised |
| Buildings: far facade (L1)/club (leisure)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,760 | 3,043 | 88 | Uint16 | 29,112 | L0 1,760 | 42 | not optimised |
| Buildings: far facade (L1)/fireStation (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,474 | 2,497 | 64 | Uint16 | 56,860 | L0 1,474 | 4 | not optimised |
| Buildings: far facade (L1)/cinema (commerce)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,442 | 2,286 | 88 | Uint16 | 62,160 | L0 1,442 | 0 | not optimised |
| Buildings: far facade (L1)/rowhouse (preset)/preset | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,360 | 2,714 | 68 | Uint16 | 45,548 | L0 1,360 | 50 | not optimised |
| Buildings: far facade (L1)/factory (work)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,346 | 2,378 | 64 | Uint16 | 51,188 | L0 1,346 | 8 | not optimised |
| Buildings: far facade (L1)/postOffice (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,320 | 2,384 | 88 | Uint16 | 36,260 | L0 1,320 | 74 | not optimised |
| Buildings: far facade (L1)/museum (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,308 | 2,038 | 64 | Uint16 | 56,848 | L0 1,308 | 0 | not optimised |
| Buildings: far facade (L1)/factory (preset)/preset | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,238 | 2,356 | 68 | Uint16 | 38,160 | L0 1,238 | 22 | not optimised |
| Buildings: far facade (L1)/library (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,232 | 1,914 | 88 | Uint16 | 50,124 | L0 1,232 | 43 | not optimised |
| Buildings: far facade (L1)/block (preset)/preset | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,220 | 2,240 | 68 | Uint16 | 44,232 | L0 1,220 | 14 | not optimised |
| Buildings: far facade (L1)/office (preset)/preset | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,212 | 1,998 | 64 | Uint16 | 50,480 | L0 1,212 | 28 | not optimised |
| Buildings: far facade (L1)/clinic (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,180 | 2,078 | 68 | Uint16 | 37,464 | L0 1,180 | 6 | not optimised |
| Buildings: far facade (L1)/shop (commerce)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,144 | 2,152 | 88 | Uint16 | 33,204 | L0 1,144 | 60 | not optimised |
| Buildings: far facade (L1)/gasStation (commerce)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,124 | 1,974 | 88 | Uint16 | 34,140 | L0 1,124 | 84 | not optimised |
| Buildings: far facade (L1)/sportsCourt (leisure)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,094 | 1,912 | 88 | Uint16 | 12,024 | L0 1,094 | 0 | not optimised |
| Buildings: far facade (L1)/busStation (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,078 | 1,574 | 88 | Uint16 | 43,288 | L0 1,078 | 51 | not optimised |
| Buildings: far facade (L1)/gym (commerce)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,042 | 1,642 | 64 | Uint16 | 45,748 | L0 1,042 | 0 | not optimised |
| Buildings: far facade (L1)/pharmacy (commerce)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,030 | 1,906 | 88 | Uint16 | 34,920 | L0 1,030 | 60 | not optimised |
| Buildings: far facade (L1)/shop (preset)/preset | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 1,014 | 1,892 | 64 | Uint16 | 32,716 | L0 1,014 | 20 | not optimised |
| Buildings: far facade (L1)/nightclub (commerce)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 998 | 1,570 | 88 | Uint16 | 42,312 | L0 998 | 0 | not optimised |
| Buildings: far facade (L1)/playground (leisure)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 930 | 1,704 | 88 | Uint16 | 10,224 | L0 930 | 0 | not optimised |
| Buildings: far facade (L1)/church (public)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 926 | 1,623 | 64 | Uint16 | 21,132 | L0 926 | 9 | not optimised |
| Buildings: far facade (L1)/bar (commerce)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 916 | 1,670 | 88 | Uint16 | 35,020 | L0 916 | 8 | not optimised |
| Buildings: far facade (L1)/restaurant (commerce)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 810 | 1,300 | 88 | Uint16 | 32,128 | L0 810 | 25 | not optimised |
| Buildings: far facade (L1)/residential low (large lot 40 x 36 m (house))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 792 | 1,505 | 64 | Uint16 | 19,200 | L0 792 | 8 | not optimised |
| Buildings: far facade (L1)/snackBar (commerce)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 764 | 1,454 | 88 | Uint16 | 24,924 | L0 764 | 52 | not optimised |
| Buildings: far facade (L1)/townhouse (homes)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 746 | 1,486 | 64 | Uint16 | 16,620 | L0 746 | 8 | not optimised |
| Buildings: far facade (L1)/bakery (commerce)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 728 | 1,454 | 88 | Uint16 | 17,716 | L0 728 | 52 | not optimised |
| Buildings: far facade (L1)/park (leisure)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 698 | 1,396 | 88 | Uint16 | 5,844 | L0 698 | 0 | not optimised |
| Buildings: far facade (L1)/industrial low (medium lot 24 x 26 m (warehouse))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 658 | 1,099 | 64 | Uint16 | 21,572 | L0 658 | 46 | not optimised |
| Buildings: far facade (L1)/residential low (medium lot 24 x 26 m (house))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 640 | 1,233 | 64 | Uint16 | 17,920 | L0 640 | 8 | not optimised |
| Buildings: far facade (L1)/industrial low (large lot 40 x 36 m (warehouse))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 636 | 1,029 | 64 | Uint16 | 20,000 | L0 636 | 50 | not optimised |
| Buildings: far facade (L1)/commercial high (small lot 12 x 16 m (office))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 578 | 928 | 88 | Uint16 | 25,104 | L0 578 | 0 | not optimised |
| Buildings: far facade (L1)/house (homes)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 576 | 1,150 | 64 | Uint16 | 15,008 | L0 576 | 8 | not optimised |
| Buildings: far facade (L1)/industrial high (medium lot 24 x 26 m (factory))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 554 | 893 | 64 | Uint16 | 22,460 | L0 554 | 72 | not optimised |
| Buildings: far facade (L1)/square (leisure)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 536 | 721 | 88 | Uint16 | 9,620 | L0 536 | 0 | not optimised |
| Buildings: far facade (L1)/industrial medium (large lot 40 x 36 m (factory))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 522 | 803 | 64 | Uint16 | 20,348 | L0 522 | 24 | not optimised |
| Buildings: far facade (L1)/residential low (small lot 12 x 16 m (house))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 518 | 1,013 | 64 | Uint16 | 16,756 | L0 518 | 8 | not optimised |
| Buildings: far facade (L1)/industrial medium (medium lot 24 x 26 m (factory))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 502 | 802 | 64 | Uint16 | 19,964 | L0 502 | 72 | not optimised |
| Buildings: far facade (L1)/industrial high (large lot 40 x 36 m (factory))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 448 | 681 | 64 | Uint16 | 16,976 | L0 448 | 30 | not optimised |
| Buildings: far facade (L1)/warehouse (preset)/preset | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 442 | 858 | 64 | Uint16 | 13,732 | L0 442 | 8 | not optimised |
| Buildings: far facade (L1)/warehouse (work)/function | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 292 | 317 | 44 | Uint16 | 9,680 | L0 292 | 55 | not optimised |
| Buildings: far facade (L1)/industrial low (small lot 12 x 16 m (warehouse))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 282 | 550 | 64 | Uint16 | 12,452 | L0 282 | 8 | not optimised |
| Buildings: far facade (L1)/industrial medium (small lot 12 x 16 m (factory))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 282 | 550 | 64 | Uint16 | 12,452 | L0 282 | 8 | not optimised |
| Buildings: far facade (L1)/industrial high (small lot 12 x 16 m (factory))/made to measure | `src/render/buildings/buildingMesh.ts (emitChunk far, assembleBuildingMeshes)` | 282 | 550 | 64 | Uint16 | 12,452 | L0 282 | 8 | not optimised |

## Buildings: made to measure

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Buildings: made to measure/residential high/large lot 40 x 36 m (residentialTower) (25 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 163,142 | 321,368 | 104 | Uint16 | 396,016 | L0 163,142 | 26,643 | not optimised |
| Buildings: made to measure/residential high/medium lot 24 x 26 m (residentialTower) (25 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 94,988 | 186,402 | 104 | Uint16 | 313,856 | L0 94,988 | 15,748 | not optimised |
| Buildings: made to measure/residential medium/large lot 40 x 36 m (apartments) (5 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 23,426 | 45,027 | 104 | Uint16 | 277,084 | L0 23,426 | 2,968 | not optimised |
| Buildings: made to measure/residential high/small lot 12 x 16 m (residentialTower) (25 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 23,256 | 44,092 | 104 | Uint16 | 196,964 | L0 23,256 | 3,033 | not optimised |
| Buildings: made to measure/residential medium/medium lot 24 x 26 m (apartments) (5 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 12,816 | 24,481 | 104 | Uint16 | 170,000 | L0 12,816 | 1,793 | not optimised |
| Buildings: made to measure/commercial medium/large lot 40 x 36 m (shop) (4 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 8,918 | 14,820 | 104 | Uint16 | 253,068 | L0 8,918 | 192 | not optimised |
| Buildings: made to measure/commercial high/large lot 40 x 36 m (office) (19 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 8,808 | 14,628 | 104 | Uint16 | 197,404 | L0 8,808 | 368 | not optimised |
| Buildings: made to measure/residential medium/small lot 12 x 16 m (apartments) (5 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 7,186 | 13,545 | 104 | Uint16 | 128,552 | L0 7,186 | 1,199 | not optimised |
| Buildings: made to measure/commercial high/medium lot 24 x 26 m (office) (19 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 6,672 | 11,205 | 104 | Uint16 | 151,340 | L0 6,672 | 286 | not optimised |
| Buildings: made to measure/commercial medium/small lot 12 x 16 m (shop) (4 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 6,388 | 11,759 | 104 | Uint16 | 116,644 | L0 6,388 | 238 | not optimised |
| Buildings: made to measure/commercial medium/medium lot 24 x 26 m (shop) (4 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 5,990 | 10,047 | 104 | Uint16 | 170,872 | L0 5,990 | 132 | not optimised |
| Buildings: made to measure/commercial low/large lot 40 x 36 m (shop) (2 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 5,490 | 9,408 | 104 | Uint16 | 187,352 | L0 5,490 | 160 | not optimised |
| Buildings: made to measure/commercial low/medium lot 24 x 26 m (shop) (2 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 3,660 | 6,440 | 104 | Uint16 | 128,500 | L0 3,660 | 102 | not optimised |
| Buildings: made to measure/commercial low/small lot 12 x 16 m (shop) (2 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 2,990 | 5,710 | 104 | Uint16 | 78,444 | L0 2,990 | 148 | not optimised |
| Buildings: made to measure/commercial high/small lot 12 x 16 m (office) (19 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 2,232 | 3,316 | 104 | Uint16 | 79,704 | L0 2,232 | 14 | not optimised |
| Buildings: made to measure/industrial low/large lot 40 x 36 m (warehouse) (3 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 1,464 | 2,741 | 104 | Uint16 | 39,824 | L0 1,464 | 84 | not optimised |
| Buildings: made to measure/industrial low/medium lot 24 x 26 m (warehouse) (3 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 1,422 | 2,708 | 104 | Uint16 | 40,628 | L0 1,422 | 78 | not optimised |
| Buildings: made to measure/industrial medium/large lot 40 x 36 m (factory) (3 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 1,264 | 2,331 | 104 | Uint16 | 39,532 | L0 1,264 | 48 | not optimised |
| Buildings: made to measure/industrial high/medium lot 24 x 26 m (factory) (4 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 1,192 | 2,251 | 104 | Uint16 | 39,168 | L0 1,192 | 100 | not optimised |
| Buildings: made to measure/industrial high/large lot 40 x 36 m (factory) (4 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 1,138 | 2,118 | 104 | Uint16 | 33,664 | L0 1,138 | 58 | not optimised |
| Buildings: made to measure/industrial medium/medium lot 24 x 26 m (factory) (3 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 1,098 | 2,089 | 104 | Uint16 | 34,716 | L0 1,098 | 100 | not optimised |
| Buildings: made to measure/residential low/large lot 40 x 36 m (house) (2 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 1,048 | 1,953 | 104 | Uint16 | 31,272 | L0 1,048 | 10 | not optimised |
| Buildings: made to measure/residential low/medium lot 24 x 26 m (house) (2 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 970 | 1,829 | 104 | Uint16 | 31,228 | L0 970 | 10 | not optimised |
| Buildings: made to measure/residential low/small lot 12 x 16 m (house) (2 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 754 | 1,445 | 104 | Uint16 | 27,132 | L0 754 | 10 | not optimised |
| Buildings: made to measure/industrial low/small lot 12 x 16 m (warehouse) (3 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 422 | 796 | 64 | Uint16 | 19,588 | L0 422 | 10 | not optimised |
| Buildings: made to measure/industrial medium/small lot 12 x 16 m (factory) (3 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 422 | 796 | 64 | Uint16 | 19,588 | L0 422 | 10 | not optimised |
| Buildings: made to measure/industrial high/small lot 12 x 16 m (factory) (4 floors) | `src/world/buildings/procedural.ts (madeToMeasure)` | 422 | 796 | 64 | Uint16 | 19,588 | L0 422 | 10 | not optimised |

## Buildings: functions

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Buildings: functions/residentialTower/homes (18 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 143,144 | 274,949 | 104 | Uint16 | 280,896 | L0 143,144 | 17,798 | not optimised |
| Buildings: functions/hotel/commerce (10 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 62,308 | 122,727 | 104 | Uint16 | 170,008 | L0 62,308 | 4,173 | not optimised |
| Buildings: functions/apartments/homes (6 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 40,750 | 78,434 | 104 | Uint16 | 181,640 | L0 40,750 | 4,922 | not optimised |
| Buildings: functions/university/public (4 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 12,342 | 21,699 | 104 | Uint16 | 334,136 | L0 12,342 | 126 | not optimised |
| Buildings: functions/office/work (12 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 9,676 | 17,401 | 104 | Uint16 | 190,440 | L0 9,676 | 106 | not optimised |
| Buildings: functions/hospital/public (8 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 8,622 | 15,047 | 104 | Uint16 | 234,592 | L0 8,622 | 90 | not optimised |
| Buildings: functions/school/public (2 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 8,378 | 15,194 | 104 | Uint16 | 191,220 | L0 8,378 | 80 | not optimised |
| Buildings: functions/cityHall/public (6 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 7,448 | 12,610 | 104 | Uint16 | 216,056 | L0 7,448 | 171 | not optimised |
| Buildings: functions/mall/commerce (3 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 7,050 | 11,836 | 104 | Uint16 | 247,256 | L0 7,050 | 264 | not optimised |
| Buildings: functions/prison/public (3 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 6,984 | 12,646 | 104 | Uint16 | 157,900 | L0 6,984 | 56 | not optimised |
| Buildings: functions/courthouse/public (3 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 6,642 | 13,166 | 104 | Uint16 | 162,268 | L0 6,642 | 178 | not optimised |
| Buildings: functions/council/public (4 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 5,802 | 11,328 | 104 | Uint16 | 153,208 | L0 5,802 | 220 | not optimised |
| Buildings: functions/bank/commerce (3 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 4,778 | 9,077 | 104 | Uint16 | 133,636 | L0 4,778 | 139 | not optimised |
| Buildings: functions/supermarket/commerce (2 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 4,700 | 7,882 | 104 | Uint16 | 159,412 | L0 4,700 | 261 | not optimised |
| Buildings: functions/museum/public (2 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 4,634 | 9,409 | 104 | Uint16 | 119,584 | L0 4,634 | 152 | not optimised |
| Buildings: functions/library/public (2 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 3,862 | 7,735 | 104 | Uint16 | 100,604 | L0 3,862 | 161 | not optimised |
| Buildings: functions/police/public (3 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 3,494 | 6,146 | 104 | Uint16 | 102,148 | L0 3,494 | 73 | not optimised |
| Buildings: functions/church/public (8 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 3,374 | 7,104 | 104 | Uint16 | 61,096 | L0 3,374 | 121 | not optimised |
| Buildings: functions/club/leisure (3 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 3,150 | 5,727 | 104 | Uint16 | 56,556 | L0 3,150 | 50 | not optimised |
| Buildings: functions/factory/work (9 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 2,734 | 4,855 | 104 | Uint16 | 94,172 | L0 2,734 | 20 | not optimised |
| Buildings: functions/restaurant/commerce (1 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 2,670 | 5,487 | 104 | Uint16 | 70,324 | L0 2,670 | 151 | not optimised |
| Buildings: functions/fireStation/public (6 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 2,640 | 4,538 | 104 | Uint16 | 96,440 | L0 2,640 | 14 | not optimised |
| Buildings: functions/cemetery/public (2 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 2,456 | 4,912 | 104 | Uint16 | 30,624 | L0 2,456 | 10 | not optimised |
| Buildings: functions/bar/commerce (2 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 2,326 | 4,717 | 104 | Uint16 | 65,128 | L0 2,326 | 72 | not optimised |
| Buildings: functions/cinema/commerce (3 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 2,194 | 3,635 | 104 | Uint16 | 98,044 | L0 2,194 | 10 | not optimised |
| Buildings: functions/sportsCourt/leisure (1 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 2,134 | 3,992 | 88 | Uint16 | 16,600 | L0 2,134 | 0 | not optimised |
| Buildings: functions/clinic/public (2 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 1,902 | 3,387 | 104 | Uint16 | 67,512 | L0 1,902 | 20 | not optimised |
| Buildings: functions/postOffice/public (2 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 1,888 | 3,416 | 104 | Uint16 | 61,200 | L0 1,888 | 88 | not optimised |
| Buildings: functions/gym/commerce (2 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 1,704 | 2,858 | 104 | Uint16 | 76,572 | L0 1,704 | 10 | not optimised |
| Buildings: functions/busStation/public (2 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 1,672 | 2,660 | 104 | Uint16 | 70,648 | L0 1,672 | 61 | not optimised |
| Buildings: functions/shop/commerce (2 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 1,632 | 2,991 | 104 | Uint16 | 53,668 | L0 1,632 | 74 | not optimised |
| Buildings: functions/playground/leisure (1 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 1,610 | 3,064 | 88 | Uint16 | 13,216 | L0 1,610 | 0 | not optimised |
| Buildings: functions/nightclub/commerce (2 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 1,602 | 2,680 | 104 | Uint16 | 71,572 | L0 1,602 | 10 | not optimised |
| Buildings: functions/gasStation/commerce (1 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 1,446 | 2,539 | 104 | Uint16 | 49,900 | L0 1,446 | 88 | not optimised |
| Buildings: functions/pharmacy/commerce (1 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 1,322 | 2,411 | 104 | Uint16 | 49,060 | L0 1,322 | 62 | not optimised |
| Buildings: functions/warehouse/work (3 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 1,220 | 2,031 | 64 | Uint16 | 34,728 | L0 1,220 | 51 | not optimised |
| Buildings: functions/townhouse/homes (4 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 1,126 | 2,132 | 104 | Uint16 | 30,396 | L0 1,126 | 10 | not optimised |
| Buildings: functions/snackBar/commerce (1 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 1,008 | 1,882 | 104 | Uint16 | 37,072 | L0 1,008 | 56 | not optimised |
| Buildings: functions/house/homes (3 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 988 | 1,882 | 104 | Uint16 | 30,112 | L0 988 | 10 | not optimised |
| Buildings: functions/bakery/commerce (3 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 940 | 1,816 | 104 | Uint16 | 27,052 | L0 940 | 54 | not optimised |
| Buildings: functions/park/leisure (1 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 698 | 1,396 | 88 | Uint16 | 5,844 | L0 698 | 0 | not optimised |
| Buildings: functions/square/leisure (1 floors) | `src/world/buildings/cityBuildings.ts (CITY_BUILDINGS)` | 536 | 721 | 88 | Uint16 | 9,620 | L0 536 | 0 | not optimised |

## Roads

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Roads/boulevard junction/four ways | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 12,228 | 11,193 | 56 | Uint16 | 785,732 | L0 12,228 · L1 2,666 | 0 | not optimised |
| Roads/avenue junction/four ways | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 10,428 | 9,389 | 56 | Uint16 | 671,742 | L0 10,428 · L1 2,113 | 0 | not optimised |
| Roads/highway junction/four ways | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 9,188 | 8,821 | 56 | Uint16 | 593,096 | L0 9,188 · L1 2,236 | 0 | not optimised |
| Roads/boulevard junction/three ways | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 9,130 | 8,154 | 56 | Uint16 | 587,226 | L0 9,130 · L1 2,557 | 0 | not optimised |
| Roads/urban junction/four ways | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 7,798 | 7,579 | 56 | Uint16 | 527,454 | L0 7,798 · L1 1,583 | 0 | not optimised |
| Roads/avenue junction/three ways | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 7,697 | 6,827 | 56 | Uint16 | 497,392 | L0 7,697 · L1 1,879 | 0 | not optimised |
| Roads/local junction/four ways | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 7,420 | 7,406 | 56 | Uint16 | 513,900 | L0 7,420 · L1 1,578 | 0 | not optimised |
| Roads/highway junction/three ways | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 6,805 | 6,358 | 56 | Uint16 | 458,512 | L0 6,805 · L1 2,415 | 0 | not optimised |
| Roads/boulevard bend/two roads at a right angle | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 6,461 | 5,817 | 56 | Uint16 | 436,490 | L0 6,461 · L1 2,274 | 0 | not optimised |
| Roads/urban junction/three ways | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 5,775 | 5,540 | 56 | Uint16 | 398,088 | L0 5,775 · L1 1,545 | 0 | not optimised |
| Roads/local junction/three ways | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 5,423 | 5,320 | 56 | Uint16 | 387,234 | L0 5,423 · L1 1,636 | 0 | not optimised |
| Roads/avenue bend/two roads at a right angle | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 5,376 | 4,827 | 56 | Uint16 | 361,754 | L0 5,376 · L1 1,611 | 0 | not optimised |
| Roads/ramp junction/four ways | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 5,248 | 5,546 | 56 | Uint16 | 359,424 | L0 5,248 · L1 1,216 | 0 | not optimised |
| Roads/boulevard tunnel/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 5,116 | 4,608 | 56 | Uint16 | 352,192 | L0 5,116 · L1 2,616 | 0 | not optimised |
| Roads/boulevard straight/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 5,020 | 4,248 | 56 | Uint16 | 331,442 | L0 5,020 · L1 2,515 | 0 | not optimised |
| Roads/highway bend/two roads at a right angle | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 4,881 | 4,594 | 56 | Uint16 | 352,966 | L0 4,881 · L1 2,232 | 0 | not optimised |
| Roads/highway tunnel/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 4,552 | 4,180 | 56 | Uint16 | 329,312 | L0 4,552 · L1 2,652 | 0 | not optimised |
| Roads/highway straight/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 4,456 | 3,820 | 56 | Uint16 | 314,800 | L0 4,456 · L1 2,648 | 0 | not optimised |
| Roads/avenue tunnel/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 4,232 | 3,742 | 56 | Uint16 | 287,066 | L0 4,232 · L1 1,911 | 0 | not optimised |
| Roads/boulevard one way/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 4,190 | 3,475 | 56 | Uint16 | 272,648 | L0 4,190 · L1 1,794 | 0 | not optimised |
| Roads/avenue straight/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 4,136 | 3,418 | 56 | Uint16 | 269,012 | L0 4,136 · L1 1,810 | 0 | not optimised |
| Roads/avenue one way/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 4,116 | 3,438 | 56 | Uint16 | 270,052 | L0 4,116 · L1 1,790 | 0 | not optimised |
| Roads/urban bend/two roads at a right angle | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 4,009 | 3,918 | 56 | Uint16 | 290,962 | L0 4,009 · L1 1,326 | 0 | not optimised |
| Roads/ramp junction/three ways | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 3,809 | 3,941 | 56 | Uint16 | 283,792 | L0 3,809 · L1 1,519 | 0 | not optimised |
| Roads/local bend/two roads at a right angle | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 3,766 | 3,767 | 56 | Uint16 | 284,650 | L0 3,766 · L1 1,433 | 0 | not optimised |
| Roads/boulevard raised/140 m elevated | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 3,760 | 5,294 | 56 | Uint16 | 312,832 | L0 3,760 · L1 2,176 | 0 | not optimised |
| Roads/boulevard bridge/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 3,652 | 5,140 | 56 | Uint16 | 313,280 | L0 3,652 · L1 2,176 | 0 | not optimised |
| Roads/highway one way/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 3,626 | 3,047 | 56 | Uint16 | 255,968 | L0 3,626 · L1 1,930 | 0 | not optimised |
| Roads/avenue raised/140 m elevated | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 3,392 | 4,898 | 56 | Uint16 | 281,920 | L0 3,392 · L1 1,808 | 0 | not optimised |
| Roads/highway raised/140 m elevated | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 3,336 | 4,934 | 56 | Uint16 | 267,424 | L0 3,336 · L1 1,752 | 0 | not optimised |
| Roads/avenue bridge/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 3,284 | 4,744 | 56 | Uint16 | 282,368 | L0 3,284 · L1 1,808 | 0 | not optimised |
| Roads/highway bridge/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 3,228 | 4,780 | 56 | Uint16 | 267,872 | L0 3,228 · L1 1,752 | 0 | not optimised |
| Roads/urban raised/140 m elevated | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 3,132 | 4,650 | 56 | Uint16 | 258,896 | L0 3,132 · L1 1,548 | 0 | not optimised |
| Roads/local raised/140 m elevated | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 3,088 | 4,562 | 56 | Uint16 | 252,736 | L0 3,088 · L1 1,504 | 0 | not optimised |
| Roads/urban tunnel/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 3,026 | 3,009 | 56 | Uint16 | 235,736 | L0 3,026 · L1 1,786 | 0 | not optimised |
| Roads/urban bridge/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 3,024 | 4,492 | 56 | Uint16 | 258,896 | L0 3,024 · L1 1,548 | 0 | not optimised |
| Roads/local bridge/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 2,980 | 4,404 | 56 | Uint16 | 252,736 | L0 2,980 · L1 1,504 | 0 | not optimised |
| Roads/urban straight/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 2,930 | 2,709 | 56 | Uint16 | 218,460 | L0 2,930 · L1 1,668 | 0 | not optimised |
| Roads/urban one way/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 2,930 | 2,709 | 56 | Uint16 | 218,460 | L0 2,930 · L1 1,668 | 0 | not optimised |
| Roads/ramp raised/140 m elevated | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 2,756 | 4,314 | 56 | Uint16 | 216,752 | L0 2,756 · L1 1,172 | 0 | not optimised |
| Roads/local tunnel/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 2,694 | 2,761 | 56 | Uint16 | 229,694 | L0 2,694 · L1 2,003 | 0 | not optimised |
| Roads/ramp bend/two roads at a right angle | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 2,673 | 2,814 | 56 | Uint16 | 217,208 | L0 2,673 · L1 1,387 | 0 | not optimised |
| Roads/ramp bridge/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 2,648 | 4,156 | 56 | Uint16 | 216,752 | L0 2,648 · L1 1,172 | 0 | not optimised |
| Roads/local one way/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 2,642 | 2,561 | 56 | Uint16 | 220,428 | L0 2,642 · L1 1,948 | 0 | not optimised |
| Roads/local straight/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 2,598 | 2,473 | 56 | Uint16 | 214,268 | L0 2,598 · L1 1,904 | 0 | not optimised |
| Roads/ramp tunnel/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 2,468 | 2,584 | 56 | Uint16 | 213,184 | L0 2,468 · L1 1,824 | 0 | not optimised |
| Roads/ramp straight/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 2,372 | 2,284 | 56 | Uint16 | 201,984 | L0 2,372 · L1 1,804 | 0 | not optimised |
| Roads/ramp one way/140 m | `src/render/roadSurfaces.ts (roadSurfaceSteps) + src/render/structures.ts (buildStructureDetails)` | 2,040 | 2,048 | 56 | Uint16 | 197,792 | L0 2,040 · L1 2,040 | 0 | not optimised |

## Vehicles

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Vehicles/sedan/sedan | `src/render/carBody.ts` | 15,310 | 12,470 | 36 | Uint16 + none | 540,228 | L0 15,310 · L1 36 | 110 | not optimised |
| Vehicles/sedan/wagon | `src/render/carBody.ts` | 15,014 | 15,234 | 36 | Uint16 + none | 631,572 | L0 15,014 · L1 36 | 121 | not optimised |
| Vehicles/suv/suv | `src/render/carBody.ts` | 14,842 | 15,146 | 36 | Uint16 + none | 627,372 | L0 14,842 · L1 36 | 95 | not optimised |
| Vehicles/hatch/hatch | `src/render/carBody.ts` | 14,838 | 14,940 | 36 | Uint16 + none | 620,436 | L0 14,838 · L1 36 | 109 | not optimised |
| Vehicles/suv/pickup | `src/render/carBody.ts` | 14,346 | 12,333 | 36 | Uint16 + none | 528,504 | L0 14,346 · L1 36 | 97 | not optimised |
| Vehicles/van/van | `src/render/carBody.ts` | 13,600 | 15,132 | 36 | Uint16 + none | 616,560 | L0 13,600 · L1 36 | 49 | not optimised |
| Vehicles/bus | `src/render/vehicleModels.ts` | 8,872 | 18,007 | 36 | Uint16 | 707,580 | L0 8,872 · L1 80 | 769 | not optimised |
| Vehicles/truck | `src/render/vehicleModels.ts` | 2,464 | 4,471 | 36 | Uint16 | 183,228 | L0 2,464 · L1 96 | 202 | not optimised |
| Vehicles/motorcycle | `src/render/vehicleModels.ts` | 704 | 1,448 | 36 | Uint16 | 56,352 | L0 704 | 52 | not optimised |
| Vehicles/wheel/spoked (two-wheelers) | `src/render/vehicleModels.ts` | 672 | 714 | 36 | Uint16 | 29,124 | L0 672 | 32 | not optimised |
| Vehicles/bicycle | `src/render/vehicleModels.ts` | 432 | 830 | 36 | Uint16 | 32,472 | L0 432 | 23 | not optimised |
| Vehicles/wheel/tyre + rim | `src/render/vehicleModels.ts` | 404 | 413 | 36 | Uint16 | 16,680 | L0 404 | 64 | not optimised |
| Vehicles/far car (far traffic)/4.3 x 1.8 m, body and cabin | `src/render/densityCars.ts (carGeometry)` | 24 | 48 | 24 | Uint16 | 1,296 | L0 24 | 0 | not optimised |

## Buildings: presets

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Buildings: presets/tower/preset (14 floors) | `src/world/buildings/blueprints.ts (BLUEPRINTS, instantiate)` | 53,904 | 103,400 | 104 | Uint16 | 235,856 | L0 53,904 | 6,514 | not optimised |
| Buildings: presets/apartments/preset (5 floors) | `src/world/buildings/blueprints.ts (BLUEPRINTS, instantiate)` | 12,258 | 23,421 | 104 | Uint16 | 146,056 | L0 12,258 | 1,359 | not optimised |
| Buildings: presets/mixed/preset (5 floors) | `src/world/buildings/blueprints.ts (BLUEPRINTS, instantiate)` | 7,002 | 13,463 | 104 | Uint16 | 124,156 | L0 7,002 | 369 | not optimised |
| Buildings: presets/courtyard/preset (3 floors) | `src/world/buildings/blueprints.ts (BLUEPRINTS, instantiate)` | 6,574 | 11,682 | 104 | Uint16 | 187,124 | L0 6,574 | 56 | not optimised |
| Buildings: presets/house/preset (3 floors) | `src/world/buildings/blueprints.ts (BLUEPRINTS, instantiate)` | 2,312 | 4,402 | 104 | Uint16 | 81,656 | L0 2,312 | 230 | not optimised |
| Buildings: presets/office/preset (8 floors) | `src/world/buildings/blueprints.ts (BLUEPRINTS, instantiate)` | 2,220 | 3,479 | 104 | Uint16 | 87,156 | L0 2,220 | 26 | not optimised |
| Buildings: presets/factory/preset (3 floors) | `src/world/buildings/blueprints.ts (BLUEPRINTS, instantiate)` | 1,906 | 3,518 | 104 | Uint16 | 59,348 | L0 1,906 | 34 | not optimised |
| Buildings: presets/rowhouse/preset (4 floors) | `src/world/buildings/blueprints.ts (BLUEPRINTS, instantiate)` | 1,738 | 3,356 | 104 | Uint16 | 59,136 | L0 1,738 | 52 | not optimised |
| Buildings: presets/block/preset (2 floors) | `src/world/buildings/blueprints.ts (BLUEPRINTS, instantiate)` | 1,664 | 3,008 | 104 | Uint16 | 63,344 | L0 1,664 | 20 | not optimised |
| Buildings: presets/shop/preset (2 floors) | `src/world/buildings/blueprints.ts (BLUEPRINTS, instantiate)` | 1,426 | 2,613 | 104 | Uint16 | 51,124 | L0 1,426 | 26 | not optimised |
| Buildings: presets/warehouse/preset (3 floors) | `src/world/buildings/blueprints.ts (BLUEPRINTS, instantiate)` | 774 | 1,440 | 104 | Uint16 | 25,964 | L0 774 | 10 | not optimised |

## Far forest

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Far forest/cerrado/one plate, 3713 trees | `src/render/farForest.ts (createFarForest) + src/render/farWoods.ts (farWoods)` | 7,426 | 14,852 | 24 | Uint16 | 118,924 | L0 7,426 | 0 | not optimised |
| Far forest/atlantic/one plate, 3691 trees | `src/render/farForest.ts (createFarForest) + src/render/farWoods.ts (farWoods)` | 7,382 | 14,764 | 24 | Uint16 | 118,220 | L0 7,382 | 0 | not optimised |
| Far forest/amazon/one plate, 3687 trees | `src/render/farForest.ts (createFarForest) + src/render/farWoods.ts (farWoods)` | 7,374 | 14,748 | 24 | Uint16 | 118,092 | L0 7,374 | 0 | not optimised |
| Far forest/caatinga/one plate, 3680 trees | `src/render/farForest.ts (createFarForest) + src/render/farWoods.ts (farWoods)` | 7,360 | 14,720 | 24 | Uint16 | 117,868 | L0 7,360 | 0 | not optimised |
| Far forest/pantanal/one plate, 3664 trees | `src/render/farForest.ts (createFarForest) + src/render/farWoods.ts (farWoods)` | 7,328 | 14,656 | 24 | Uint16 | 117,356 | L0 7,328 | 0 | not optimised |
| Far forest/pampa/one plate, 3641 trees | `src/render/farForest.ts (createFarForest) + src/render/farWoods.ts (farWoods)` | 7,282 | 14,564 | 24 | Uint16 | 116,620 | L0 7,282 | 0 | not optimised |

## Buildings: interiors (cut open)

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Buildings: interiors (cut open)/apartments/5 floors, cut above level 1 | `src/render/buildings/buildingMesh.ts (cutaway)` | 20,072 | 33,101 | 128 | Uint16 | 355,772 | L0 20,072 | 3,034 | not optimised |
| Buildings: interiors (cut open)/rowhouse/4 floors, cut above level 1 | `src/render/buildings/buildingMesh.ts (cutaway)` | 4,512 | 6,906 | 128 | Uint16 | 233,728 | L0 4,512 | 610 | not optimised |
| Buildings: interiors (cut open)/house/3 floors, cut above level 1 | `src/render/buildings/buildingMesh.ts (cutaway)` | 4,380 | 6,975 | 128 | Uint16 | 281,104 | L0 4,380 | 688 | not optimised |

## Buildings: shell pieces

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 40.00 x 72.93 x 26.00 m, from commercial high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 1,594 | 4,782 | 36 | none | 172,152 | L0 1,594 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 72.93 x 26.00 m, from commercial high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 1,154 | 3,462 | 36 | none | 124,632 | L0 1,154 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 37.18 x 0.50 x 13.13 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 960 | 2,880 | 36 | none | 103,680 | L0 960 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.00 x 49.60 x 14.00 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitBay)` | 704 | 2,112 | 36 | none | 76,032 | L0 704 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 72.93 x 16.00 m, from commercial high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 678 | 2,034 | 36 | none | 73,224 | L0 678 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 31.50 x 16.00 m, from function hotel | `src/render/buildings/buildingMesh.ts (emitBay)` | 510 | 1,530 | 36 | none | 55,080 | L0 510 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 20.35 x 0.50 x 13.13 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 420 | 1,260 | 36 | none | 45,360 | L0 420 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 10.96 x 0.50 x 15.13 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 360 | 1,080 | 36 | none | 38,880 | L0 360 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.00 x 25.30 x 15.00 m, from preset office | `src/render/buildings/buildingMesh.ts (emitBay)` | 340 | 1,020 | 36 | none | 36,720 | L0 340 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 2.90 x 0.10 x 19.88 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 340 | 1,020 | 36 | none | 36,720 | L0 340 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 50.04 x 0.00 x 48.04 m, from function university | `src/render/buildings/buildingMesh.ts (emitLot)` | 266 | 798 | 36 | none | 28,728 | L0 266 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 60.00 x 10.00 x 40.00 m, from function mall | `src/render/buildings/buildingMesh.ts (emitBay)` | 248 | 744 | 36 | none | 26,784 | L0 248 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 62.04 x 0.00 x 46.04 m, from function mall | `src/render/buildings/buildingMesh.ts (emitLot)` | 224 | 672 | 36 | none | 24,192 | L0 224 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.00 x 15.50 x 12.00 m, from function apartments | `src/render/buildings/buildingMesh.ts (emitBay)` | 200 | 600 | 36 | none | 21,600 | L0 200 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 38.04 x 0.00 x 32.04 m, from function school | `src/render/buildings/buildingMesh.ts (emitLot)` | 186 | 558 | 36 | none | 20,088 | L0 186 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 5.56 x 0.50 x 11.13 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 180 | 540 | 36 | none | 19,440 | L0 180 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 1.80 x 0.35 x 19.85 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 170 | 510 | 36 | none | 18,360 | L0 170 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 42.04 x 0.00 x 38.04 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitLot)` | 168 | 504 | 36 | none | 18,144 | L0 168 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 42.04 x 0.00 x 38.04 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitLot)` | 166 | 498 | 36 | none | 17,928 | L0 166 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 26.04 x 0.00 x 26.04 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (emitLot)` | 164 | 492 | 36 | none | 17,712 | L0 164 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 42.04 x 0.00 x 38.04 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitLot)` | 164 | 492 | 36 | none | 17,712 | L0 164 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 48.04 x 0.00 x 26.04 m, from function factory | `src/render/buildings/buildingMesh.ts (emitLot)` | 154 | 462 | 36 | none | 16,632 | L0 154 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 42.04 x 0.00 x 32.04 m, from function supermarket | `src/render/buildings/buildingMesh.ts (emitLot)` | 148 | 444 | 36 | none | 15,984 | L0 148 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 32.04 x 0.00 x 36.04 m, from function prison | `src/render/buildings/buildingMesh.ts (emitLot)` | 142 | 426 | 36 | none | 15,336 | L0 142 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 42.04 x 0.00 x 28.04 m, from commercial high large lot | `src/render/buildings/buildingMesh.ts (emitLot)` | 140 | 420 | 36 | none | 15,120 | L0 140 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 42.04 x 0.00 x 25.04 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitLot)` | 136 | 408 | 36 | none | 14,688 | L0 136 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 39.00 x 6.10 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 134 | 402 | 36 | none | 14,472 | L0 134 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 38.04 x 0.00 x 26.04 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitLot)` | 128 | 384 | 36 | none | 13,824 | L0 128 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 60.00 x 6.00 x 40.00 m, from function mall | `src/render/buildings/buildingMesh.ts (emitBay)` | 124 | 372 | 36 | none | 13,392 | L0 124 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 38.04 x 0.00 x 22.04 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitLot)` | 120 | 360 | 36 | none | 12,960 | L0 120 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 1.80 x 0.35 x 13.85 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 120 | 360 | 36 | none | 12,960 | L0 120 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 3.81 x 0.50 x 21.13 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 120 | 360 | 36 | none | 12,960 | L0 120 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 32.04 x 0.00 x 26.04 m, from function courthouse | `src/render/buildings/buildingMesh.ts (emitLot)` | 116 | 348 | 36 | none | 12,528 | L0 116 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 34.04 x 0.00 x 24.04 m, from function museum | `src/render/buildings/buildingMesh.ts (emitLot)` | 116 | 348 | 36 | none | 12,528 | L0 116 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 26.04 x 0.00 x 32.04 m, from function cinema | `src/render/buildings/buildingMesh.ts (emitLot)` | 116 | 348 | 36 | none | 12,528 | L0 116 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 26.04 x 0.00 x 28.04 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitLot)` | 116 | 348 | 36 | none | 12,528 | L0 116 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 35.04 x 0.00 x 17.04 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitLot)` | 114 | 342 | 36 | none | 12,312 | L0 114 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 42.04 x 0.00 x 13.04 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitLot)` | 114 | 342 | 36 | none | 12,312 | L0 114 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 10.25 x 23.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 114 | 342 | 36 | none | 12,312 | L0 114 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 26.04 x 0.00 x 28.04 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitLot)` | 114 | 342 | 36 | none | 12,312 | L0 114 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 32.04 x 0.00 x 24.04 m, from function council | `src/render/buildings/buildingMesh.ts (emitLot)` | 112 | 336 | 36 | none | 12,096 | L0 112 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 39.00 x 9.15 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 112 | 336 | 36 | none | 12,096 | L0 112 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 26.04 x 0.00 x 28.04 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitLot)` | 112 | 336 | 36 | none | 12,096 | L0 112 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 16.04 x 0.00 x 34.04 m, from function church | `src/render/buildings/buildingMesh.ts (emitLot)` | 108 | 324 | 36 | none | 11,664 | L0 108 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 39.00 x 9.15 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 108 | 324 | 36 | none | 11,664 | L0 108 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 26.04 x 0.00 x 28.04 m, from commercial high medium lot | `src/render/buildings/buildingMesh.ts (emitLot)` | 108 | 324 | 36 | none | 11,664 | L0 108 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 39.00 x 6.10 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 106 | 318 | 36 | none | 11,448 | L0 106 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 26.04 x 0.00 x 25.04 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitLot)` | 104 | 312 | 36 | none | 11,232 | L0 104 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 1.80 x 0.35 x 11.45 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 100 | 300 | 36 | none | 10,800 | L0 100 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 0.14 x 2.40 x 20.54 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 100 | 300 | 36 | none | 10,800 | L0 100 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 24.24 x 0.96 x 24.24 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 96 | 288 | 36 | none | 10,368 | L0 96 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 26.04 x 0.00 x 22.04 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitLot)` | 96 | 288 | 36 | none | 10,368 | L0 96 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 24.04 x 0.00 x 20.04 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitLot)` | 96 | 288 | 36 | none | 10,368 | L0 96 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 22.04 x 0.00 x 26.04 m, from function nightclub | `src/render/buildings/buildingMesh.ts (emitLot)` | 96 | 288 | 36 | none | 10,368 | L0 96 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 23.00 x 9.15 x 22.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 96 | 288 | 36 | none | 10,368 | L0 96 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 26.04 x 0.00 x 20.04 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitLot)` | 92 | 276 | 36 | none | 9,936 | L0 92 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 32.04 x 0.00 x 14.04 m, from function busStation | `src/render/buildings/buildingMesh.ts (emitLot)` | 92 | 276 | 36 | none | 9,936 | L0 92 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 23.04 x 0.00 x 20.04 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitLot)` | 88 | 264 | 36 | none | 9,504 | L0 88 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 26.04 x 0.00 x 18.04 m, from function hotel | `src/render/buildings/buildingMesh.ts (emitLot)` | 88 | 264 | 36 | none | 9,504 | L0 88 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 36.50 x 6.10 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 86 | 258 | 36 | none | 9,288 | L0 86 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 1.15 x 0.12 x 2.82 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 84 | 252 | 36 | none | 9,072 | L0 84 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 2.85 x 0.12 x 1.12 m, from preset office | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 84 | 252 | 36 | none | 9,072 | L0 84 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 47.98 x 0.30 x 13.98 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitLots)` | 84 | 252 | 36 | none | 9,072 | L0 84 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 26.04 x 0.00 x 13.04 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitLot)` | 82 | 246 | 36 | none | 8,856 | L0 82 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 22.04 x 0.00 x 17.04 m, from function police | `src/render/buildings/buildingMesh.ts (emitLot)` | 80 | 240 | 36 | none | 8,640 | L0 80 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 39.98 x 0.30 x 17.98 m, from function supermarket | `src/render/buildings/buildingMesh.ts (emitLots)` | 80 | 240 | 36 | none | 8,640 | L0 80 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 29.98 x 0.30 x 29.98 m, from function square | `src/render/buildings/buildingMesh.ts (emitLots)` | 80 | 240 | 36 | none | 8,640 | L0 80 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 39.00 x 6.10 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 80 | 240 | 36 | none | 8,640 | L0 80 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 40.00 x 6.00 x 30.00 m, from function supermarket | `src/render/buildings/buildingMesh.ts (emitBay)` | 78 | 234 | 36 | none | 8,424 | L0 78 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 20.04 x 0.00 x 17.04 m, from preset office | `src/render/buildings/buildingMesh.ts (emitLot)` | 76 | 228 | 36 | none | 8,208 | L0 76 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 20.04 x 0.00 x 18.04 m, from function bank | `src/render/buildings/buildingMesh.ts (emitLot)` | 76 | 228 | 36 | none | 8,208 | L0 76 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 39.00 x 6.10 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 76 | 228 | 36 | none | 8,208 | L0 76 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 40.00 x 7.20 x 23.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 74 | 222 | 36 | none | 7,992 | L0 74 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 32.00 x 5.00 x 22.00 m, from function museum | `src/render/buildings/buildingMesh.ts (emitBay)` | 72 | 216 | 36 | none | 7,776 | L0 72 | 0 | not optimised |
| Buildings: shell pieces/parking/emitParking, 18.00 x 0.00 x 14.00 m, from function supermarket | `src/render/buildings/buildingMesh.ts (emitParking)` | 72 | 216 | 36 | none | 7,776 | L0 72 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 22.04 x 0.00 x 14.04 m, from function club | `src/render/buildings/buildingMesh.ts (emitLot)` | 72 | 216 | 36 | none | 7,776 | L0 72 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 46.24 x 0.96 x 24.24 m, from function factory | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 72 | 216 | 36 | none | 7,776 | L0 72 | 4 | not optimised |
| Buildings: shell pieces/lot/emitLots, 31.98 x 0.30 x 19.98 m, from function sportsCourt | `src/render/buildings/buildingMesh.ts (emitLots)` | 72 | 216 | 36 | none | 7,776 | L0 72 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 39.00 x 6.10 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 70 | 210 | 36 | none | 7,560 | L0 70 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 20.04 x 0.00 x 14.04 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitLot)` | 68 | 204 | 36 | none | 7,344 | L0 68 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 37.98 x 0.30 x 9.98 m, from function council | `src/render/buildings/buildingMesh.ts (emitLots)` | 68 | 204 | 36 | none | 7,344 | L0 68 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 36.00 x 6.70 x 24.00 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitBay)` | 68 | 204 | 36 | none | 7,344 | L0 68 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 40.00 x 16.35 x 36.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 68 | 204 | 36 | none | 7,344 | L0 68 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 39.00 x 6.10 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 68 | 204 | 36 | none | 7,344 | L0 68 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 40.00 x 6.10 x 14.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 66 | 198 | 36 | none | 7,128 | L0 66 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 17.04 x 0.00 x 14.04 m, from preset mixed | `src/render/buildings/buildingMesh.ts (emitLot)` | 64 | 192 | 36 | none | 6,912 | L0 64 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 36.24 x 0.96 x 30.24 m, from function school | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 64 | 192 | 36 | none | 6,912 | L0 64 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 48.24 x 0.96 x 46.24 m, from function university | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 64 | 192 | 36 | none | 6,912 | L0 64 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 16.04 x 0.00 x 16.04 m, from function restaurant | `src/render/buildings/buildingMesh.ts (emitLot)` | 64 | 192 | 36 | none | 6,912 | L0 64 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 17.98 x 0.30 x 27.98 m, from function club | `src/render/buildings/buildingMesh.ts (emitLots)` | 64 | 192 | 36 | none | 6,912 | L0 64 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 14.04 x 0.00 x 18.04 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitLot)` | 64 | 192 | 36 | none | 6,912 | L0 64 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 21.00 x 6.20 x 18.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitBay)` | 62 | 186 | 36 | none | 6,696 | L0 62 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 10.00 x 30.00 m, from function cinema | `src/render/buildings/buildingMesh.ts (emitBay)` | 62 | 186 | 36 | none | 6,696 | L0 62 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 8.50 x 12.20 x 11.50 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 62 | 186 | 36 | none | 6,696 | L0 62 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 29.98 x 0.30 x 13.98 m, from function busStation | `src/render/buildings/buildingMesh.ts (emitLots)` | 60 | 180 | 36 | none | 6,480 | L0 60 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 23.00 x 6.10 x 22.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 60 | 180 | 36 | none | 6,480 | L0 60 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 14.04 x 0.00 x 13.04 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitLot)` | 58 | 174 | 36 | none | 6,264 | L0 58 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 11.00 x 9.15 x 15.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 58 | 174 | 36 | none | 6,264 | L0 58 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 40.00 x 4.45 x 23.50 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 58 | 174 | 36 | none | 6,264 | L0 58 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 4.50 x 18.00 m, from function library | `src/render/buildings/buildingMesh.ts (emitBay)` | 56 | 168 | 36 | none | 6,048 | L0 56 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 19.98 x 0.30 x 19.98 m, from function prison | `src/render/buildings/buildingMesh.ts (emitLots)` | 56 | 168 | 36 | none | 6,048 | L0 56 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 28.00 x 3.00 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 56 | 168 | 36 | none | 6,048 | L0 56 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 29.98 x 0.30 x 11.98 m, from function warehouse | `src/render/buildings/buildingMesh.ts (emitLots)` | 56 | 168 | 36 | none | 6,048 | L0 56 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 6.10 x 16.00 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 56 | 168 | 36 | none | 6,048 | L0 56 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 7.20 x 16.00 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 54 | 162 | 36 | none | 5,832 | L0 54 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 23.00 x 3.05 x 22.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 54 | 162 | 36 | none | 5,832 | L0 54 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 39.00 x 6.10 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 54 | 162 | 36 | none | 5,832 | L0 54 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 14.04 x 0.00 x 11.04 m, from preset block | `src/render/buildings/buildingMesh.ts (emitLot)` | 52 | 156 | 36 | none | 5,616 | L0 52 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 6.70 x 20.00 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitBay)` | 52 | 156 | 36 | none | 5,616 | L0 52 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 27.98 x 0.30 x 7.98 m, from function library | `src/render/buildings/buildingMesh.ts (emitLots)` | 52 | 156 | 36 | none | 5,616 | L0 52 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 11.04 x 0.00 x 14.04 m, from function shop | `src/render/buildings/buildingMesh.ts (emitLot)` | 52 | 156 | 36 | none | 5,616 | L0 52 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 12.04 x 0.00 x 14.04 m, from function pharmacy | `src/render/buildings/buildingMesh.ts (emitLot)` | 52 | 156 | 36 | none | 5,616 | L0 52 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 20.00 x 7.00 x 24.00 m, from function nightclub | `src/render/buildings/buildingMesh.ts (emitBay)` | 52 | 156 | 36 | none | 5,616 | L0 52 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 20.00 x 6.00 x 24.00 m, from function gym | `src/render/buildings/buildingMesh.ts (emitBay)` | 52 | 156 | 36 | none | 5,616 | L0 52 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 20.00 x 0.04 x 16.00 m, from function club | `src/render/buildings/buildingMesh.ts (emitLots)` | 52 | 156 | 36 | none | 5,616 | L0 52 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 23.98 x 0.30 x 13.98 m, from function gasStation | `src/render/buildings/buildingMesh.ts (emitLots)` | 52 | 156 | 36 | none | 5,616 | L0 52 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 19.98 x 0.30 x 15.98 m, from function playground | `src/render/buildings/buildingMesh.ts (emitLots)` | 52 | 156 | 36 | none | 5,616 | L0 52 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 40.00 x 7.20 x 14.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 52 | 156 | 36 | none | 5,616 | L0 52 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 23.00 x 6.10 x 22.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 52 | 156 | 36 | none | 5,616 | L0 52 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 39.00 x 3.05 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 52 | 156 | 36 | none | 5,616 | L0 52 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 39.00 x 6.10 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 52 | 156 | 36 | none | 5,616 | L0 52 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 11.04 x 0.00 x 11.04 m, from preset house | `src/render/buildings/buildingMesh.ts (emitLot)` | 48 | 144 | 36 | none | 5,184 | L0 48 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 60.24 x 0.96 x 44.24 m, from function mall | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 48 | 144 | 36 | none | 5,184 | L0 48 | 2 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 11.04 x 0.00 x 12.04 m, from function bakery | `src/render/buildings/buildingMesh.ts (emitLot)` | 48 | 144 | 36 | none | 5,184 | L0 48 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 14.04 x 0.00 x 10.04 m, from function gasStation | `src/render/buildings/buildingMesh.ts (emitLot)` | 48 | 144 | 36 | none | 5,184 | L0 48 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 6.70 x 18.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 48 | 144 | 36 | none | 5,184 | L0 48 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 12.24 x 0.96 x 11.24 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 48 | 144 | 36 | none | 5,184 | L0 48 | 2 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 24.24 x 0.96 x 11.24 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 48 | 144 | 36 | none | 5,184 | L0 48 | 2 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 40.24 x 0.96 x 11.24 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 48 | 144 | 36 | none | 5,184 | L0 48 | 2 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 23.00 x 6.10 x 22.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 48 | 144 | 36 | none | 5,184 | L0 48 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 8.04 x 0.00 x 14.04 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (emitLot)` | 44 | 132 | 36 | none | 4,752 | L0 44 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 4.00 x 22.00 x 4.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 44 | 132 | 36 | none | 4,752 | L0 44 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 30.00 x 6.00 x 12.00 m, from function busStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 44 | 132 | 36 | none | 4,752 | L0 44 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 40.00 x 6.10 x 14.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 44 | 132 | 36 | none | 4,752 | L0 44 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 1.60 x 0.90 x 1.56 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 42 | 126 | 36 | none | 4,536 | L0 42 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 1.79 x 0.25 x 1.74 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 42 | 126 | 36 | none | 4,536 | L0 42 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.76 x 0.10 x 0.74 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 42 | 126 | 36 | none | 4,536 | L0 42 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.56 x 0.75 x 0.55 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 42 | 126 | 36 | none | 4,536 | L0 42 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.70 x 0.15 x 0.68 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 42 | 126 | 36 | none | 4,536 | L0 42 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.81 x 4.50 x 0.79 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 42 | 126 | 36 | none | 4,536 | L0 42 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 6.10 x 14.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 42 | 126 | 36 | none | 4,536 | L0 42 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 1.40 x 0.95 x 1.36 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 42 | 126 | 36 | none | 4,536 | L0 42 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 1.56 x 0.20 x 1.52 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 42 | 126 | 36 | none | 4,536 | L0 42 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 11.00 x 6.10 x 15.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 42 | 126 | 36 | none | 4,536 | L0 42 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 20.97 x 6.10 x 22.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 42 | 126 | 36 | none | 4,536 | L0 42 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 22.65 x 6.10 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 42 | 126 | 36 | none | 4,536 | L0 42 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 40.00 x 6.73 x 30.50 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 42 | 126 | 36 | none | 4,536 | L0 42 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 40.00 x 7.87 x 29.50 m, from industrial medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 42 | 126 | 36 | none | 4,536 | L0 42 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 40.00 x 8.87 x 29.50 m, from industrial high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 42 | 126 | 36 | none | 4,536 | L0 42 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 33.24 x 0.96 x 15.24 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 40 | 120 | 36 | none | 4,320 | L0 40 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 22.24 x 0.96 x 18.24 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 40 | 120 | 36 | none | 4,320 | L0 40 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 11.98 x 0.30 x 17.98 m, from function school | `src/render/buildings/buildingMesh.ts (emitLots)` | 40 | 120 | 36 | none | 4,320 | L0 40 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 30.24 x 0.96 x 34.24 m, from function prison | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 40 | 120 | 36 | none | 4,320 | L0 40 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 14.24 x 0.96 x 32.24 m, from function church | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 40 | 120 | 36 | none | 4,320 | L0 40 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 21.98 x 0.30 x 5.98 m, from function church | `src/render/buildings/buildingMesh.ts (emitLots)` | 40 | 120 | 36 | none | 4,320 | L0 40 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 10.04 x 0.00 x 10.04 m, from function snackBar | `src/render/buildings/buildingMesh.ts (emitLot)` | 40 | 120 | 36 | none | 4,320 | L0 40 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 24.24 x 0.96 x 26.24 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 40 | 120 | 36 | none | 4,320 | L0 40 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 40.24 x 0.96 x 36.24 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 40 | 120 | 36 | none | 4,320 | L0 40 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 23.00 x 6.10 x 22.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 40 | 120 | 36 | none | 4,320 | L0 40 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 23.00 x 3.05 x 22.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 40 | 120 | 36 | none | 4,320 | L0 40 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 20.97 x 6.10 x 22.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 40 | 120 | 36 | none | 4,320 | L0 40 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 16.35 x 26.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 38 | 114 | 36 | none | 4,104 | L0 38 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 22.65 x 6.10 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 38 | 114 | 36 | none | 4,104 | L0 38 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 22.65 x 3.05 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 38 | 114 | 36 | none | 4,104 | L0 38 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 11.98 x 0.30 x 14.98 m, from function police | `src/render/buildings/buildingMesh.ts (emitLots)` | 36 | 108 | 36 | none | 3,888 | L0 36 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 39.00 x 6.10 x 9.58 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 36 | 108 | 36 | none | 3,888 | L0 36 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 22.65 x 6.10 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 36 | 108 | 36 | none | 3,888 | L0 36 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 22.65 x 3.05 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 36 | 108 | 36 | none | 3,888 | L0 36 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 4.45 x 13.50 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 36 | 108 | 36 | none | 3,888 | L0 36 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 6.20 x 18.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 34 | 102 | 36 | none | 3,672 | L0 34 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 7.00 x 9.15 x 12.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 34 | 102 | 36 | none | 3,672 | L0 34 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 23.00 x 6.10 x 20.06 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 34 | 102 | 36 | none | 3,672 | L0 34 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 19.50 x 3.05 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 34 | 102 | 36 | none | 3,672 | L0 34 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 9.24 x 1.45 x 9.24 m, from function council | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 32 | 96 | 36 | none | 3,456 | L0 32 | 0 | not optimised |
| Buildings: shell pieces/parking/emitParking, 12.00 x 0.00 x 6.00 m, from function police | `src/render/buildings/buildingMesh.ts (emitParking)` | 32 | 96 | 36 | none | 3,456 | L0 32 | 0 | not optimised |
| Buildings: shell pieces/lot ground and foundation/emitLot, 10.04 x 0.00 x 6.04 m, from function cemetery | `src/render/buildings/buildingMesh.ts (emitLot)` | 32 | 96 | 36 | none | 3,456 | L0 32 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 7.00 x 3.05 x 22.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 32 | 96 | 36 | none | 3,456 | L0 32 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 7.20 x 16.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 32 | 96 | 36 | none | 3,456 | L0 32 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.94 x 3.05 x 22.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 32 | 96 | 36 | none | 3,456 | L0 32 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.00 x 3.05 x 17.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 32 | 96 | 36 | none | 3,456 | L0 32 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 16.35 x 3.05 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 32 | 96 | 36 | none | 3,456 | L0 32 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 16.35 x 6.10 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 32 | 96 | 36 | none | 3,456 | L0 32 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 7.55 x 16.00 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 32 | 96 | 36 | none | 3,456 | L0 32 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 6.20 x 12.00 m, from preset mixed | `src/render/buildings/buildingMesh.ts (emitBay)` | 30 | 90 | 36 | none | 3,240 | L0 30 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 3.60 x 12.00 m, from function postOffice | `src/render/buildings/buildingMesh.ts (emitBay)` | 30 | 90 | 36 | none | 3,240 | L0 30 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 36.00 x 6.70 x 18.00 m, from function school | `src/render/buildings/buildingMesh.ts (emitBay)` | 30 | 90 | 36 | none | 3,240 | L0 30 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 11.00 x 6.10 x 15.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 30 | 90 | 36 | none | 3,240 | L0 30 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 13.19 x 6.10 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 30 | 90 | 36 | none | 3,240 | L0 30 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 6.70 x 12.00 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 28 | 84 | 36 | none | 3,024 | L0 28 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 6.70 x 12.00 m, from preset mixed | `src/render/buildings/buildingMesh.ts (emitBay)` | 28 | 84 | 36 | none | 3,024 | L0 28 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 12.00 m, from function school | `src/render/buildings/buildingMesh.ts (emitBay)` | 28 | 84 | 36 | none | 3,024 | L0 28 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 6.70 x 12.00 m, from function shop | `src/render/buildings/buildingMesh.ts (emitBay)` | 28 | 84 | 36 | none | 3,024 | L0 28 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 13.98 x 0.30 x 5.98 m, from function restaurant | `src/render/buildings/buildingMesh.ts (emitLots)` | 28 | 84 | 36 | none | 3,024 | L0 28 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 18.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 28 | 84 | 36 | none | 3,024 | L0 28 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 20.97 x 3.05 x 20.06 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 28 | 84 | 36 | none | 3,024 | L0 28 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 20.97 x 6.10 x 20.06 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 28 | 84 | 36 | none | 3,024 | L0 28 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 6.20 x 12.00 m, from preset mixed | `src/render/buildings/buildingMesh.ts (emitBay)` | 26 | 78 | 36 | none | 2,808 | L0 26 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 18.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 26 | 78 | 36 | none | 2,808 | L0 26 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 11.00 x 6.10 x 15.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 26 | 78 | 36 | none | 2,808 | L0 26 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 11.00 x 3.05 x 15.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 26 | 78 | 36 | none | 2,808 | L0 26 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 8.00 x 6.10 x 9.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 26 | 78 | 36 | none | 2,808 | L0 26 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.94 x 3.05 x 20.06 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 26 | 78 | 36 | none | 2,808 | L0 26 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 20.97 x 3.05 x 18.12 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 26 | 78 | 36 | none | 2,808 | L0 26 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 6.73 x 20.50 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 26 | 78 | 36 | none | 2,808 | L0 26 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 7.87 x 19.50 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 26 | 78 | 36 | none | 2,808 | L0 26 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 8.87 x 19.50 m, from industrial high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 26 | 78 | 36 | none | 2,808 | L0 26 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 10.00 x 3.60 x 12.00 m, from function pharmacy | `src/render/buildings/buildingMesh.ts (emitBay)` | 24 | 72 | 36 | none | 2,592 | L0 24 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 6.70 x 10.00 m, from function bakery | `src/render/buildings/buildingMesh.ts (emitBay)` | 24 | 72 | 36 | none | 2,592 | L0 24 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 6.10 x 16.00 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 24 | 72 | 36 | none | 2,592 | L0 24 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.62 x 6.10 x 14.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 24 | 72 | 36 | none | 2,592 | L0 24 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 8.00 x 6.10 x 9.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 24 | 72 | 36 | none | 2,592 | L0 24 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 8.00 x 3.60 x 8.00 m, from function snackBar | `src/render/buildings/buildingMesh.ts (emitBay)` | 22 | 66 | 36 | none | 2,376 | L0 22 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 3.60 x 8.00 m, from function gasStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 22 | 66 | 36 | none | 2,376 | L0 22 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 18.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 22 | 66 | 36 | none | 2,376 | L0 22 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.46 x 4.16 x 14.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 22 | 66 | 36 | none | 2,376 | L0 22 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 40.00 x 3.10 x 12.50 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 22 | 66 | 36 | none | 2,376 | L0 22 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 10.96 x 0.02 x 7.96 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 16.96 x 0.02 x 10.96 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 13.96 x 0.02 x 10.96 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 16.96 x 0.02 x 13.96 m, from preset office | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 22.96 x 0.02 x 4.96 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 12.20 x 0.25 x 1.20 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 4.96 x 0.02 x 10.96 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 7.96 x 0.02 x 7.96 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 22.96 x 0.02 x 18.96 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 16.96 x 0.02 x 12.96 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 34.96 x 0.02 x 18.96 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 8.96 x 0.02 x 8.96 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 28.96 x 0.02 x 20.96 m, from function council | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 28.96 x 0.02 x 22.96 m, from function courthouse | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 18.96 x 0.02 x 13.96 m, from function police | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 16.96 x 0.02 x 16.96 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 2.96 x 0.02 x 2.96 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 34.96 x 0.02 x 22.96 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 22.96 x 0.02 x 14.96 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 9.00 x 3.00 x 3.00 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 34.96 x 0.02 x 10.96 m, from function school | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 10.96 x 0.02 x 16.96 m, from function school | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 46.96 x 0.02 x 14.96 m, from function university | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 12.96 x 0.02 x 28.96 m, from function university | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 22.96 x 0.02 x 16.96 m, from function library | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 30.96 x 0.02 x 20.96 m, from function museum | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 28.96 x 0.02 x 12.96 m, from function prison | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 8.96 x 0.02 x 18.96 m, from function prison | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 1.70 x 0.25 x 8.70 m, from function prison | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 28.96 x 0.02 x 10.96 m, from function busStation | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 7.96 x 0.02 x 10.96 m, from function shop | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 38.96 x 0.02 x 28.96 m, from function supermarket | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 58.96 x 0.02 x 38.96 m, from function mall | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 10.96 x 0.02 x 4.96 m, from function mall | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 7.00 x 3.00 x 3.00 m, from function mall | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 16.96 x 0.02 x 14.96 m, from function bank | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 8.96 x 0.02 x 10.96 m, from function pharmacy | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 12.96 x 0.02 x 12.96 m, from function restaurant | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 6.96 x 0.02 x 6.96 m, from function snackBar | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 18.96 x 0.02 x 22.96 m, from function nightclub | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 22.96 x 0.02 x 28.96 m, from function cinema | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 10.96 x 0.02 x 6.96 m, from function gasStation | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 12.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.00 x 6.20 x 18.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 6.00 x 3.00 x 3.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 1.96 x 0.02 x 1.96 m, from function factory | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 1.80 x 0.45 x 0.40 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 7.20 x 14.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 30.77 x 3.05 x 0.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 7.00 x 3.05 x 22.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 11.00 x 3.05 x 12.35 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 11.00 x 6.10 x 12.35 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 11.00 x 3.05 x 15.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 20.97 x 3.05 x 9.58 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 10.01 x 3.05 x 20.06 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 20.97 x 6.10 x 9.58 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 22.65 x 3.05 x 9.58 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 10.96 x 0.02 x 14.96 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 2.20 x 0.25 x 5.70 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 22.96 x 0.02 x 11.46 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 22.96 x 0.02 x 12.46 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 38.96 x 0.02 x 11.46 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 38.96 x 0.02 x 22.46 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 20.96 x 0.02 x 22.96 m, from commercial high medium lot | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 36.96 x 0.02 x 22.96 m, from commercial high large lot | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 6.96 x 0.02 x 4.46 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 6.73 x 30.50 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 5.46 x 0.02 x 5.46 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 7.87 x 29.50 m, from industrial medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 8.87 x 29.50 m, from industrial high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 20 | 60 | 36 | none | 2,160 | L0 20 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.60 x 12.00 m, from function school | `src/render/buildings/buildingMesh.ts (emitBay)` | 18 | 54 | 36 | none | 1,944 | L0 18 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 6.20 x 18.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 18 | 54 | 36 | none | 1,944 | L0 18 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 3.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 18 | 54 | 36 | none | 1,944 | L0 18 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 15.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 18 | 54 | 36 | none | 1,944 | L0 18 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 9.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 18 | 54 | 36 | none | 1,944 | L0 18 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 6.10 x 14.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 18 | 54 | 36 | none | 1,944 | L0 18 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 11.00 x 30.49 x 15.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 18 | 54 | 36 | none | 1,944 | L0 18 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 10.01 x 6.10 x 18.12 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 18 | 54 | 36 | none | 1,944 | L0 18 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 10.01 x 3.05 x 18.12 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 18 | 54 | 36 | none | 1,944 | L0 18 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 19.50 x 3.05 x 9.58 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 18 | 54 | 36 | none | 1,944 | L0 18 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 7.55 x 12.50 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 18 | 54 | 36 | none | 1,944 | L0 18 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 12.24 x 0.96 x 9.24 m, from preset block | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 9.24 x 0.96 x 9.24 m, from preset house | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 6.24 x 0.96 x 12.24 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 18.24 x 0.96 x 12.24 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 21.24 x 0.96 x 18.24 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 3.10 x 12.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 3.10 x 9.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 18.24 x 0.96 x 15.24 m, from preset office | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 15.24 x 0.96 x 12.24 m, from preset mixed | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 24.24 x 0.96 x 18.24 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 7.00 x 0.00 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 5.50 x 0.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 24.24 x 0.96 x 20.24 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 36.24 x 0.96 x 20.24 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 30.24 x 0.96 x 22.24 m, from function council | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.24 x 4.50 x 9.24 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 30.24 x 0.96 x 24.24 m, from function courthouse | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 20.24 x 0.96 x 15.24 m, from function police | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 36.24 x 0.96 x 24.24 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 3.60 x 18.00 m, from function school | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 32.24 x 0.96 x 22.24 m, from function museum | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 8.24 x 0.96 x 4.24 m, from function cemetery | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 30.24 x 0.96 x 12.24 m, from function busStation | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 9.24 x 0.96 x 12.24 m, from function shop | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 40.24 x 0.96 x 30.24 m, from function supermarket | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/parking/emitParking, 18.10 x 0.00 x 10.08 m, from function supermarket | `src/render/buildings/buildingMesh.ts (emitParking)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 18.24 x 0.96 x 16.24 m, from function bank | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 10.24 x 0.96 x 12.24 m, from function pharmacy | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 9.24 x 0.96 x 10.24 m, from function bakery | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 14.24 x 0.96 x 14.24 m, from function restaurant | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 8.24 x 0.96 x 8.24 m, from function snackBar | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 20.24 x 0.96 x 24.24 m, from function nightclub | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 24.24 x 0.96 x 30.24 m, from function cinema | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 24.24 x 0.96 x 16.24 m, from function hotel | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 20.24 x 0.96 x 12.24 m, from function club | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 12.24 x 0.96 x 8.24 m, from function gasStation | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 3.10 x 15.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 3.10 x 12.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 12.24 x 0.96 x 16.24 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 6.10 x 16.00 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 10.29 x 4.16 x 14.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 17.14 x 3.05 x 8.40 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 6.10 x 14.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.62 x 3.05 x 0.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 7.00 x 3.05 x 22.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 24.24 x 0.96 x 23.24 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 40.24 x 0.96 x 23.24 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 16.35 x 6.10 x 9.58 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 40.00 x 4.45 x 12.50 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 24.24 x 0.96 x 26.24 m, from commercial high medium lot | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/plinth/emitPlinth, 40.24 x 0.96 x 26.24 m, from commercial high large lot | `src/render/buildings/buildingMesh.ts (emitPlinth)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 6.73 x 20.50 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 7.87 x 19.50 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 8.87 x 19.50 m, from industrial high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 16 | 48 | 36 | none | 1,728 | L0 16 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 6.20 x 12.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 3.10 x 12.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 3.10 x 6.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 3.60 x 12.00 m, from function school | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 3.10 x 18.00 m, from function school | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 9.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 3.10 x 18.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 10.00 x 11.00 x 10.00 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.05 x 14.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 7.00 x 6.10 x 12.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.06 x 3.05 x 15.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.03 x 3.05 x 18.12 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 13.19 x 3.05 x 9.58 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 13.19 x 6.10 x 9.58 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 3.10 x 16.00 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 3.10 x 12.50 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 14 | 42 | 36 | none | 1,512 | L0 14 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 3.10 x 3.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 3.10 x 12.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 6.20 x 12.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 3.10 x 9.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 9.24 x 3.88 x 9.24 m, from function council | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.00 x 3.60 x 0.00 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 18.00 m, from function school | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 48.00 x 4.00 x 9.60 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.46 x 6.00 x 0.00 m, from function supermarket | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 6.20 x 18.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 18.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.46 x 4.16 x 0.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.08 x 3.05 x 14.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 5.50 x 3.05 x 15.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 8.00 x 6.10 x 9.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.03 x 3.05 x 16.18 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 10.01 x 3.05 x 9.58 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 10.01 x 6.10 x 9.58 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 23.00 x 3.05 x 22.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 39.00 x 3.05 x 22.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.46 x 4.45 x 0.00 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.46 x 3.10 x 0.00 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 40.00 x 3.10 x 6.25 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.46 x 5.01 x 0.00 m, from commercial high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 6.73 x 16.00 m, from industrial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 6.73 x 16.00 m, from industrial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 7.87 x 16.00 m, from industrial medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 7.87 x 16.00 m, from industrial medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 8.87 x 16.00 m, from industrial high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 8.87 x 16.00 m, from industrial high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 1.90 x 0.30 x 1.90 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.90 x 0.70 x 0.80 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.56 x 0.02 x 0.56 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.80 x 0.70 x 0.90 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.08 x 0.70 x 0.08 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.80 x 0.70 x 0.10 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 1.20 x 0.25 x 1.20 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.90 x 0.45 x 0.90 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.08 x 3.50 x 0.08 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 1.20 x 0.04 x 0.04 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 3.00 x 3.00 x 3.00 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 3.10 x 0.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 1.80 x 1.40 x 3.40 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.04 x 0.04 x 0.90 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 3.20 x 2.20 x 2.40 m, from preset office | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.80 x 0.12 x 0.80 m, from preset office | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.10 x 3.10 x 0.50 m, from preset office | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 3.40 x 1.40 x 1.80 m, from preset office | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 5.50 x 15.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 1.05 x 0.07 x 1.60 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.15 x 0.25 x 0.15 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 8.57 x 6.20 x 15.00 m, from function police | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/parking/emitParking, 8.64 x 0.00 x 12.10 m, from function police | `src/render/buildings/buildingMesh.ts (emitParking)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 3.10 x 9.60 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 4.00 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.50 x 15.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 4.00 x 6.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 6.00 x 0.00 m, from function busStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 6.00 x 3.00 m, from function mall | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 5.00 x 3.00 m, from function mall | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 3.10 x 9.00 m, from function bar | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 9.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 3.10 x 6.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 7.36 x 0.06 x 14.40 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 0.80 x 0.05 x 0.80 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 0.08 x 2.30 x 0.08 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 2.20 x 0.10 x 2.20 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 14.38 x 0.06 x 12.40 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 4.33 x 0.06 x 10.40 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 28.22 x 0.06 x 12.40 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 3.58 x 0.06 x 20.40 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof terrace/emitTerrace, 0.12 x 0.15 x 20.60 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitTerrace)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 5.50 x 6.10 x 12.35 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 5.50 x 3.05 x 12.35 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 8.50 x 3.05 x 4.51 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 7.00 x 3.05 x 9.47 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 3.00 x 3.00 x 2.20 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 14.89 x 3.05 x 0.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 14.24 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 12.50 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.38 x 4.45 x 0.00 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 2.60 x 2.50 x 2.60 m, from commercial medium small lot | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 0.90 x 2.05 x 0.04 m, from commercial medium small lot | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/roof plant/emitRoofPlant, 2.40 x 2.20 x 3.20 m, from commercial high small lot | `src/render/buildings/buildingMesh.ts (emitRoofPlant)` | 10 | 30 | 36 | none | 1,080 | L0 10 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 3.10 x 9.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 3.60 x 9.00 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 3.10 x 6.00 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 3.10 x 0.00 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 3.60 x 3.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 15.00 x 3.60 x 6.00 m, from preset mixed | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 6.20 x 12.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 3.60 x 0.00 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 4.50 x 0.00 m, from function courthouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.40 x 12.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 9.60 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 6.70 x 12.00 m, from function school | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 6.70 x 18.00 m, from function school | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 4.00 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.50 x 12.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.00 x 12.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 14.00 x 4.00 x 9.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 3.60 x 2.80 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 30.00 x 3.60 x 14.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 10.00 x 0.00 m, from function cinema | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 20.60 x 0.00 x 16.60 m, from function club | `src/render/buildings/buildingMesh.ts (emitLots)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 3.10 x 9.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 6.20 x 18.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 30.90 x 5.47 x 24.90 m, from function warehouse | `src/render/buildings/buildingMesh.ts (emitRoof)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 3.27 x 0.00 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 40.00 x 3.27 x 8.50 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 11.20 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 13.71 x 3.05 x 0.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.94 x 3.05 x 12.35 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.59 x 6.10 x 7.41 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 3.10 x 16.00 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 4.45 x 0.00 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 5.01 x 0.00 m, from commercial high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 8.00 x 3.40 x 5.50 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 8 | 24 | 36 | none | 864 | L0 8 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 3.60 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 3.10 x 0.00 m, from preset house | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 3.10 x 3.00 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.00 x 3.10 x 12.00 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 9.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 3.60 x 3.00 m, from preset mixed | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.00 x 3.10 x 6.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 9.80 x 9.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 7.00 x 9.00 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 5.50 x 15.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 8.57 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.50 x 9.43 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 36.00 x 3.10 x 3.00 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 9.60 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 12.00 m, from function school | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 4.00 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.00 x 9.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 8.40 x 4.00 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.60 x 8.40 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 8.40 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 4.00 x 3.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 8.57 x 7.00 x 0.00 m, from function nightclub | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 8.57 x 6.00 x 0.00 m, from function gym | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 18.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 10.00 x 4.00 x 10.00 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.27 x 8.50 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 5.00 x 3.27 x 2.50 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 10.29 x 4.16 x 0.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 9.43 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 9.71 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 5.50 x 6.10 x 5.88 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 7.00 x 6.10 x 4.51 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.59 x 3.05 x 4.50 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.03 x 3.05 x 7.64 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 7.98 x 3.05 x 1.94 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.67 x 3.40 x 5.50 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 8.00 x 3.40 x 0.00 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 8.00 x 3.40 x 5.50 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 6 | 18 | 36 | none | 648 | L0 6 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 3.60 x 3.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 6.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 3.10 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 3.10 x 3.00 m, from preset house | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 3.60 x 0.00 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.60 x 6.00 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 18.00 x 3.10 x 12.00 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 9.00 x 6.70 x 6.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 6.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 7.00 x 6.00 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 5.50 x 0.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 5.71 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 4.50 x 0.00 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.50 x 6.29 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.50 x 6.00 m, from function courthouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.86 x 3.60 x 3.00 m, from function police | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 5.71 x 3.10 x 0.00 m, from function police | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 20.00 x 3.10 x 3.00 m, from function police | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 3.40 x 0.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 6.20 x 16.00 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 6.40 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 3.10 x 3.20 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 16.00 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 3.20 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 12.00 x 6.70 x 6.00 m, from function school | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.50 x 6.40 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 4.00 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.00 x 6.40 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 5.60 x 4.50 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.00 x 6.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 48.00 x 12.50 x 30.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 14.00 x 8.00 x 30.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 5.60 x 4.00 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.60 x 5.60 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 6.70 x 14.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 5.60 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 30.00 x 3.10 x 14.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.60 x 5.71 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 10.00 x 3.60 x 2.86 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 10.00 x 3.10 x 20.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 8.40 x 9.00 x 0.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 9.00 x 3.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 9.00 x 6.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 4.00 x 3.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 4.00 x 3.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 5.71 x 3.60 x 0.00 m, from function club | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 3.10 x 3.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 3.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.10 x 18.00 m, from function office | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 10.00 x 4.00 x 3.33 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.27 x 5.67 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 5.00 x 3.27 x 11.00 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 3.27 x 0.00 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 24.00 x 3.27 x 2.83 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.15 x 3.27 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 7.00 x 3.05 x 0.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.15 x 3.05 x 0.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 5.60 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 6.29 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 7.12 x 3.05 x 0.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.94 x 3.05 x 5.88 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 5.70 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 5.95 x 3.05 x 0.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 4.45 x 0.00 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 5.01 x 0.00 m, from commercial high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 60.37 x 26.00 m, from commercial high medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 40.00 x 60.37 x 26.00 m, from commercial high large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 6.73 x 0.00 m, from industrial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 5.33 x 3.40 x 0.00 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 7.87 x 0.00 m, from industrial medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 6.00 x 8.87 x 0.00 m, from industrial high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 4 | 12 | 36 | none | 432 | L0 4 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.75 x 3.60 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.50 x 0.90 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.50 x 0.55 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 2.15 x 0.20 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.50 x 0.00 x 0.20 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.96 x 0.68 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 3.60 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.05 x 0.77 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.85 x 3.60 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.30 x 1.25 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 2.35 x 0.20 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.30 x 0.00 x 0.20 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 1.23 m, from preset block | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.60 x 3.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 1.05 m, from preset block | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.23 x 0.77 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.60 x 0.75 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.90 x 1.50 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.55 x 1.50 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 2.15 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 0.00 x 1.50 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 1.32 m, from preset block | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 3.10 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.75 x 3.10 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 1.65 x 0.20 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.23 x 0.68 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 3.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 0.96 m, from preset block | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.14 x 0.77 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 12.06 x 0.09 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 12.03 x 0.00 x 0.03 m, from preset block | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 9.06 m, from preset block | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 9.03 m, from preset block | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 12.14 x 0.13 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 12.07 x 0.00 x 0.07 m, from preset block | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 9.14 m, from preset block | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 9.07 m, from preset block | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 12.00 x 0.00 x 9.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 12.14 x 0.14 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 9.14 m, from preset block | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 12.32 x 0.22 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 12.16 x 0.00 x 0.16 m, from preset block | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 9.32 m, from preset block | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 9.16 m, from preset block | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.00 x 0.85 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.00 x 0.00 x 0.35 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.00 x 0.06 x 0.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.85 x 3.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.35 x 0.00 x 3.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.06 x 3.00 m, from preset block | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.68 x 1.05 m, from preset house | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.32 x 0.77 x 0.00 m, from preset house | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 0.75 m, from preset house | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 1.65 x 0.00 m, from preset house | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.32 x 0.68 x 0.00 m, from preset house | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 1.14 m, from preset house | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 9.06 x 0.09 x 0.00 m, from preset house | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 9.03 x 0.00 x 0.03 m, from preset house | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 9.14 x 0.13 x 0.00 m, from preset house | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 9.07 x 0.00 x 0.07 m, from preset house | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 9.90 x 2.86 x 4.95 m, from preset house | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 9.90 x 0.18 x 0.00 m, from preset house | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 9.90 x 0.26 x 0.45 m, from preset house | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 9.00 x 0.14 x 0.14 m, from preset house | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 3.04 x 4.95 m, from preset house | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.45 x 2.86 x 4.95 m, from preset house | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 6.06 x 0.09 x 0.00 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 6.03 x 0.00 x 0.03 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 12.06 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 12.03 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 6.14 x 0.13 x 0.00 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 6.07 x 0.00 x 0.07 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 12.14 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 12.07 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.45 x 1.99 x 12.90 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.18 x 12.90 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.45 x 0.26 x 12.90 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.14 x 0.14 x 12.00 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.45 x 2.17 x 0.00 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.45 x 1.99 x 0.45 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.96 x 0.77 x 0.00 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.68 x 1.14 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.68 x 1.23 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 18.06 x 0.09 x 0.00 m, from preset apartments | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 18.03 x 0.00 x 0.03 m, from preset apartments | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 18.14 x 0.13 x 0.00 m, from preset apartments | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 18.07 x 0.00 x 0.07 m, from preset apartments | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 18.00 x 0.00 x 12.00 m, from preset apartments | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 18.14 x 0.14 x 0.00 m, from preset apartments | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 12.14 m, from preset apartments | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 18.32 x 0.22 x 0.00 m, from preset apartments | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 18.16 x 0.00 x 0.16 m, from preset apartments | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 12.32 m, from preset apartments | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 12.16 m, from preset apartments | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.68 x 0.96 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.68 x 1.32 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 21.06 x 0.09 x 0.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 21.03 x 0.00 x 0.03 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 18.06 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 18.03 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 21.14 x 0.13 x 0.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 21.07 x 0.00 x 0.07 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 18.14 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 18.07 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 15.06 x 0.09 x 0.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 15.03 x 0.00 x 0.03 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 15.14 x 0.13 x 0.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 15.07 x 0.00 x 0.07 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 21.00 x 0.00 x 18.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 21.14 x 0.14 x 0.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 18.14 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 21.32 x 0.22 x 0.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 21.16 x 0.00 x 0.16 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 18.32 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 18.16 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 15.00 x 0.00 x 12.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 15.14 x 0.14 x 0.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 15.32 x 0.22 x 0.00 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 15.16 x 0.00 x 0.16 m, from preset tower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 0.00 x 1.80 m, from preset office | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.60 x 1.80 m, from preset office | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 15.06 m, from preset office | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 15.03 m, from preset office | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 15.14 m, from preset office | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 15.07 m, from preset office | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 18.00 x 0.00 x 15.00 m, from preset office | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 15.14 m, from preset office | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 15.32 m, from preset office | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 15.16 m, from preset office | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 15.90 x 3.72 x 6.45 m, from preset mixed | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 15.90 x 0.18 x 0.00 m, from preset mixed | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 15.90 x 0.26 x 0.45 m, from preset mixed | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.00 x 0.14 x 0.14 m, from preset mixed | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.14 x 0.68 x 0.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.05 x 0.68 x 0.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 24.06 x 0.09 x 0.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 24.03 x 0.00 x 0.03 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 6.06 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 6.03 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 12.00 x 0.09 x 0.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 12.00 x 0.00 x 0.03 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 24.14 x 0.13 x 0.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 24.07 x 0.00 x 0.07 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 6.14 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 6.07 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 12.00 x 0.13 x 0.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 12.00 x 0.00 x 0.07 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 0.00 x 6.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 24.14 x 0.14 x 0.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 6.14 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 24.32 x 0.22 x 0.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 24.16 x 0.00 x 0.16 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 6.32 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 6.16 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 6.00 x 0.00 x 12.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 6.14 x 0.14 x 0.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 6.32 x 0.22 x 0.00 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 6.16 x 0.00 x 0.16 m, from preset courtyard | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.35 x 7.00 x 0.00 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 2.50 x 0.00 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.50 x 0.25 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 0.00 x 0.25 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 7.00 x 0.00 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.85 x 7.00 x 0.00 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.30 x 4.65 x 0.00 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 7.00 x 0.75 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 5.55 x 0.00 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 7.00 x 3.00 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 2.10 x 6.00 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 2.10 x 0.00 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.35 x 5.50 x 0.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 1.00 x 0.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 5.50 x 0.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.85 x 5.50 x 0.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.30 x 3.15 x 0.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.75 x 5.50 x 0.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.05 x 0.20 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 5.50 x 0.75 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 4.05 x 0.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 5.50 x 3.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 1.05 x 3.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 1.05 x 0.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 9.00 x 0.00 x 9.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 9.14 x 0.14 x 0.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 9.32 x 0.22 x 0.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 9.16 x 0.00 x 0.16 m, from preset factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.35 x 3.60 x 0.00 m, from function apartments | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 0.45 x 0.00 m, from function apartments | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.15 x 0.30 m, from function apartments | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 0.00 x 0.30 m, from function apartments | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 2.86 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 0.68 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 20.06 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 20.03 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 20.14 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 20.07 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 14.06 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 14.03 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 14.14 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 14.07 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 0.00 x 20.00 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 20.14 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 20.32 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 20.16 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.85 x 2.86 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.35 x 0.00 x 2.86 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.06 x 2.86 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 18.00 x 0.00 x 14.00 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 14.14 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 14.32 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 14.16 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.85 x 2.80 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.35 x 0.00 x 2.80 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.06 x 2.80 m, from function residentialTower | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 5.00 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.36 x 4.99 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.00 x 4.99 x 0.30 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.75 x 5.00 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.55 x 0.20 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.35 x 5.00 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 1.40 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.60 x 0.30 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 5.00 x 2.86 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.00 x 4.99 x 0.36 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.30 x 4.99 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 5.00 x 0.68 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 3.55 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.75 x 4.20 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 2.75 x 0.20 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.36 x 4.20 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.00 x 4.20 x 0.30 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 4.20 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.20 x 2.86 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.00 x 4.20 x 0.36 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.30 x 4.20 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.20 x 0.68 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 2.75 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.33 x 4.20 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.65 x 4.20 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.00 x 4.20 x 0.65 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.20 x 3.33 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.20 x 0.92 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.92 x 4.20 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 36.06 x 0.09 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 36.03 x 0.00 x 0.03 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 36.14 x 0.13 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 36.07 x 0.00 x 0.07 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 10.06 x 0.09 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 10.03 x 0.00 x 0.03 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 10.06 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 10.03 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 10.14 x 0.13 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 10.07 x 0.00 x 0.07 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 10.14 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 10.07 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 36.00 x 0.00 x 20.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 36.49 x 0.22 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 36.25 x 0.00 x 0.25 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 20.50 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.25 x 0.00 x 20.25 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 37.10 x 0.33 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 36.55 x 0.00 x 0.55 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.33 x 21.10 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.55 x 0.00 x 20.55 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 36.25 x 0.13 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 36.13 x 0.00 x 0.13 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 20.25 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.13 x 0.00 x 20.13 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 36.56 x 0.19 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 36.28 x 0.00 x 0.28 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.19 x 20.56 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.28 x 0.00 x 20.28 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 10.00 x 0.00 x 10.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 10.49 x 0.22 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 10.25 x 0.00 x 0.25 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 10.49 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.25 x 0.00 x 10.25 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 11.10 x 0.33 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 10.55 x 0.00 x 0.55 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.33 x 11.10 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.55 x 0.00 x 10.55 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 10.25 x 0.13 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 10.13 x 0.00 x 0.13 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 10.25 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.13 x 0.00 x 10.13 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 10.56 x 0.19 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 10.28 x 0.00 x 0.28 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.19 x 10.56 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.28 x 0.00 x 10.28 m, from function cityHall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.33 x 0.85 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.33 x 0.00 x 0.35 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.33 x 0.06 x 0.00 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.85 x 3.33 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.35 x 0.00 x 3.33 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.06 x 3.33 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.70 x 5.00 x 0.00 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.60 x 0.05 x 0.00 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.60 x 0.50 x 0.00 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.45 x 0.20 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.60 x 0.00 x 0.20 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 5.00 x 0.77 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.05 x 1.60 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.50 x 1.60 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 4.45 x 0.00 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 0.00 x 1.60 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 4.50 x 0.00 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.75 x 4.50 x 0.00 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 0.20 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.50 x 3.14 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.50 x 0.82 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 3.05 x 0.00 m, from function council | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 30.06 x 0.09 x 0.00 m, from function council | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 30.03 x 0.00 x 0.03 m, from function council | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 22.06 m, from function council | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 22.03 m, from function council | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 30.14 x 0.13 x 0.00 m, from function council | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 30.07 x 0.00 x 0.07 m, from function council | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 22.14 m, from function council | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 22.07 m, from function council | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 30.00 x 0.00 x 22.00 m, from function council | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 30.14 x 0.14 x 0.00 m, from function council | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 22.14 m, from function council | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 30.32 x 0.22 x 0.00 m, from function council | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 30.16 x 0.00 x 0.16 m, from function council | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 22.32 m, from function council | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 22.16 m, from function council | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.85 x 3.14 m, from function council | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.35 x 0.00 x 3.14 m, from function council | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.06 x 3.14 m, from function council | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.70 x 5.50 x 0.00 m, from function courthouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.95 x 0.20 m, from function courthouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 1.90 x 0.00 m, from function courthouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 5.50 x 0.70 m, from function courthouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 4.95 x 0.00 m, from function courthouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.50 x 3.00 m, from function courthouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.50 x 0.75 m, from function courthouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 24.06 m, from function courthouse | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 24.03 m, from function courthouse | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 24.14 m, from function courthouse | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 24.07 m, from function courthouse | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 30.00 x 0.00 x 24.00 m, from function courthouse | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 24.14 m, from function courthouse | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 24.32 m, from function courthouse | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 24.16 m, from function courthouse | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.86 x 3.60 x 0.00 m, from function police | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.16 x 0.45 x 0.00 m, from function police | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.16 x 0.00 x 0.30 m, from function police | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.68 x 3.60 x 0.00 m, from function police | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.86 x 3.10 x 0.00 m, from function police | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.68 x 3.10 x 0.00 m, from function police | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 20.06 x 0.09 x 0.00 m, from function police | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 20.03 x 0.00 x 0.03 m, from function police | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 20.14 x 0.13 x 0.00 m, from function police | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 20.07 x 0.00 x 0.07 m, from function police | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 20.00 x 0.00 x 15.00 m, from function police | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 20.14 x 0.14 x 0.00 m, from function police | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 20.32 x 0.22 x 0.00 m, from function police | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 20.16 x 0.00 x 0.16 m, from function police | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.86 x 0.85 x 0.00 m, from function police | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.86 x 0.00 x 0.35 m, from function police | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.86 x 0.06 x 0.00 m, from function police | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.40 x 5.00 x 0.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.20 x 2.40 x 0.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 2.60 x 0.20 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.20 x 0.00 x 0.20 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 5.00 x 0.40 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 2.40 x 2.20 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 2.60 x 0.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 0.00 x 2.20 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 5.00 x 2.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.75 x 3.40 x 0.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 1.95 x 0.20 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 3.40 x 0.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.40 x 0.75 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 1.95 x 0.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.40 x 3.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.40 x 2.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 6.03 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 8.03 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 8.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 6.07 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 8.07 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 8.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 4.06 x 0.09 x 0.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 4.03 x 0.00 x 0.03 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 4.06 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 4.03 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 4.14 x 0.13 x 0.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 4.07 x 0.00 x 0.07 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 4.14 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 4.07 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 18.00 x 0.00 x 18.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.85 x 2.67 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.35 x 0.00 x 2.67 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.06 x 2.67 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 4.00 x 0.00 x 4.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 4.14 x 0.14 x 0.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 4.14 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 4.32 x 0.22 x 0.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 4.16 x 0.00 x 0.16 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 4.32 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 4.16 m, from function fireStation | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 4.00 x 0.85 x 0.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 4.00 x 0.00 x 0.35 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 4.00 x 0.06 x 0.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.85 x 4.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.35 x 0.00 x 4.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.06 x 4.00 m, from function fireStation | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 0.85 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 3.20 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 16.06 m, from function hospital | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 16.03 m, from function hospital | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 16.14 m, from function hospital | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 16.07 m, from function hospital | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 36.00 x 0.00 x 24.00 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 36.14 x 0.14 x 0.00 m, from function hospital | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 36.32 x 0.22 x 0.00 m, from function hospital | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 36.16 x 0.00 x 0.16 m, from function hospital | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 0.00 x 16.00 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 16.14 m, from function hospital | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 16.32 m, from function hospital | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 16.16 m, from function hospital | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.85 x 3.20 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.35 x 0.00 x 3.20 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.06 x 3.20 m, from function hospital | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 36.00 x 0.00 x 12.00 m, from function school | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 12.00 x 0.00 x 18.00 m, from function school | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.35 x 4.50 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 0.90 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.50 x 3.20 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.50 x 0.85 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.00 x 4.50 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.75 x 4.00 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 2.55 x 0.20 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.00 x 3.20 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.00 x 0.85 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 2.55 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.00 x 4.00 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 4.00 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.80 x 4.50 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.65 x 4.50 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.00 x 3.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.00 x 0.75 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.80 x 4.00 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.65 x 4.00 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 48.06 x 0.09 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 48.03 x 0.00 x 0.03 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 20.00 x 0.09 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 20.00 x 0.00 x 0.03 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 48.14 x 0.13 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 48.07 x 0.00 x 0.07 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 20.00 x 0.13 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 20.00 x 0.00 x 0.07 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 30.06 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 30.03 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 14.06 x 0.09 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 14.03 x 0.00 x 0.03 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 30.14 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 30.07 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 14.14 x 0.13 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 14.07 x 0.00 x 0.07 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 48.00 x 0.00 x 16.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 48.14 x 0.14 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 48.32 x 0.22 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 48.16 x 0.00 x 0.16 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 14.00 x 0.00 x 30.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 14.14 x 0.14 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 30.14 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 14.32 x 0.22 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 14.16 x 0.00 x 0.16 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 30.32 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 30.16 m, from function university | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.80 x 0.85 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.80 x 0.00 x 0.35 m, from function university | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.80 x 0.06 x 0.00 m, from function university | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.70 x 6.00 x 0.00 m, from function library | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 5.45 x 0.20 m, from function library | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.35 x 6.00 x 0.00 m, from function library | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 2.40 x 0.00 m, from function library | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 6.00 x 0.70 m, from function library | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 5.45 x 0.00 m, from function library | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 0.00 x 18.00 m, from function library | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.65 x 7.00 x 0.00 m, from function museum | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 6.45 x 0.20 m, from function museum | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.21 x 3.40 x 0.00 m, from function museum | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.21 x 0.00 x 0.30 m, from function museum | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 7.00 x 0.77 m, from function museum | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 6.45 x 0.00 m, from function museum | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 32.06 x 0.09 x 0.00 m, from function museum | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 32.03 x 0.00 x 0.03 m, from function museum | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 32.14 x 0.13 x 0.00 m, from function museum | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 32.07 x 0.00 x 0.07 m, from function museum | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 32.00 x 0.00 x 22.00 m, from function museum | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 32.14 x 0.14 x 0.00 m, from function museum | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 32.32 x 0.22 x 0.00 m, from function museum | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 32.16 x 0.00 x 0.16 m, from function museum | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.91 x 0.85 x 0.00 m, from function museum | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.91 x 0.00 x 0.35 m, from function museum | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.91 x 0.06 x 0.00 m, from function museum | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.96 x 0.77 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 2.46 x 0.68 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.79 x 0.77 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 2.46 x 0.77 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 2.13 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 1.66 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.60 x 2.80 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.00 x 3.60 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 2.30 x 0.77 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 1.82 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 2.29 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 2.13 x 0.77 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 2.13 x 0.68 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 2.80 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.00 x 3.10 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 1.98 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 2.30 x 0.68 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.60 x 2.86 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 2.18 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 1.86 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 2.34 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 2.02 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 2.57 x 0.77 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.33 x 3.60 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 2.01 x 0.77 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 2.38 x 0.77 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 1.70 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.33 x 3.10 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.68 x 2.34 m, from function prison | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 20.03 x 0.09 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 20.07 x 0.13 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 30.00 x 0.00 x 14.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 10.00 x 0.00 x 20.00 m, from function prison | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 10.14 x 0.14 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 10.32 x 0.22 x 0.00 m, from function prison | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 10.16 x 0.00 x 0.16 m, from function prison | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.35 x 9.00 x 0.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.10 x 5.40 x 0.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.10 x 0.00 x 0.30 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.60 x 9.00 x 0.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 8.45 x 0.20 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 9.00 x 0.64 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 8.45 x 0.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 5.40 x 0.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 9.00 x 0.75 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 7.55 x 0.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 7.45 x 7.45 x 26.90 m, from function church | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.18 x 26.90 m, from function church | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.45 x 0.45 x 26.90 m, from function church | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.14 x 0.20 x 26.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 7.45 x 7.63 x 0.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 7.45 x 7.45 x 0.45 m, from function church | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 6.90 x 5.98 x 3.45 m, from function church | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 6.90 x 0.18 x 0.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 6.90 x 0.78 x 0.45 m, from function church | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.18 x 6.90 m, from function church | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.45 x 0.78 x 6.90 m, from function church | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.67 x 3.60 x 0.00 m, from function cemetery | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.60 x 1.25 m, from function cemetery | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.58 x 3.60 x 0.00 m, from function cemetery | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.60 x 4.00 m, from function cemetery | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 8.90 x 1.41 x 2.45 m, from function cemetery | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 8.90 x 0.18 x 0.00 m, from function cemetery | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 8.90 x 0.26 x 0.45 m, from function cemetery | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 8.00 x 0.14 x 0.14 m, from function cemetery | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 1.59 x 2.45 m, from function cemetery | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.45 x 1.41 x 2.45 m, from function cemetery | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 30.00 x 0.00 x 12.00 m, from function busStation | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 9.00 x 0.00 x 12.00 m, from function shop | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.38 x 2.40 x 0.00 m, from function supermarket | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.38 x 0.00 x 0.30 m, from function supermarket | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 40.00 x 0.00 x 30.00 m, from function supermarket | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 40.14 x 0.14 x 0.00 m, from function supermarket | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 40.07 x 0.00 x 0.07 m, from function supermarket | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 40.32 x 0.22 x 0.00 m, from function supermarket | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 40.16 x 0.00 x 0.16 m, from function supermarket | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.08 x 0.85 x 0.00 m, from function supermarket | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.08 x 0.00 x 0.35 m, from function supermarket | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.08 x 0.06 x 0.00 m, from function supermarket | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 6.00 x 1.00 m, from function mall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 6.00 x 3.00 m, from function mall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 5.00 x 1.00 m, from function mall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 5.00 x 3.00 m, from function mall | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 24.03 x 0.09 x 0.00 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 24.00 x 0.00 x 0.03 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 40.06 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 40.03 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 60.06 x 0.09 x 0.00 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 60.03 x 0.00 x 0.03 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 24.07 x 0.13 x 0.00 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 24.00 x 0.00 x 0.07 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 40.14 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 40.07 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 60.14 x 0.13 x 0.00 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 60.07 x 0.00 x 0.07 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 4.03 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 4.07 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 60.00 x 0.00 x 40.00 m, from function mall | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 60.14 x 0.14 x 0.00 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 40.14 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 60.32 x 0.22 x 0.00 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 60.16 x 0.00 x 0.16 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 40.32 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 40.16 m, from function mall | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.85 x 3.08 m, from function mall | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.35 x 0.00 x 3.08 m, from function mall | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.06 x 3.08 m, from function mall | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 12.00 x 0.00 x 6.00 m, from function mall | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.36 x 5.49 x 0.00 m, from function bank | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.00 x 5.49 x 0.30 m, from function bank | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 5.50 x 0.80 m, from function bank | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.00 x 5.49 x 0.36 m, from function bank | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.30 x 5.49 x 0.00 m, from function bank | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.36 x 4.00 x 0.00 m, from function bank | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.00 x 4.00 x 0.30 m, from function bank | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.00 x 4.00 x 0.36 m, from function bank | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.30 x 4.00 x 0.00 m, from function bank | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 18.00 x 0.00 x 16.00 m, from function bank | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 18.50 x 0.22 x 0.00 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 18.25 x 0.00 x 0.25 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 16.49 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.25 x 0.00 x 16.25 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 19.10 x 0.33 x 0.00 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 18.55 x 0.00 x 0.55 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.33 x 17.10 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.55 x 0.00 x 16.55 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 18.25 x 0.13 x 0.00 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 18.13 x 0.00 x 0.13 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 16.25 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.13 x 0.00 x 16.13 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 18.56 x 0.19 x 0.00 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 18.28 x 0.00 x 0.28 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.19 x 16.56 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.28 x 0.00 x 16.28 m, from function bank | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.02 x 3.60 x 0.00 m, from function pharmacy | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 10.00 x 0.00 x 12.00 m, from function pharmacy | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 3.33 m, from function bakery | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 0.92 m, from function bakery | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 4.95 x 2.86 x 10.90 m, from function bakery | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.18 x 10.90 m, from function bakery | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.45 x 0.26 x 10.90 m, from function bakery | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.14 x 0.14 x 10.00 m, from function bakery | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 4.95 x 3.04 x 0.00 m, from function bakery | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 4.95 x 2.86 x 0.45 m, from function bakery | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.60 x 3.60 x 0.00 m, from function restaurant | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.10 x 0.45 x 0.00 m, from function restaurant | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.60 x 0.60 m, from function restaurant | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 14.00 x 0.00 x 14.00 m, from function restaurant | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 8.00 x 0.00 x 8.00 m, from function snackBar | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 8.14 x 0.14 x 0.00 m, from function snackBar | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 8.07 x 0.00 x 0.07 m, from function snackBar | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 8.14 m, from function snackBar | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 8.07 m, from function snackBar | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 8.32 x 0.22 x 0.00 m, from function snackBar | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 8.16 x 0.00 x 0.16 m, from function snackBar | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 8.32 m, from function snackBar | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 8.16 m, from function snackBar | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.67 x 0.85 x 0.00 m, from function snackBar | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.67 x 0.00 x 0.35 m, from function snackBar | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.67 x 0.06 x 0.00 m, from function snackBar | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.70 x 3.60 x 0.00 m, from function bar | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.60 x 0.70 m, from function bar | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.16 x 3.40 x 0.00 m, from function nightclub | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 20.00 x 0.00 x 24.00 m, from function nightclub | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.35 x 10.00 x 0.00 m, from function cinema | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 6.40 x 0.00 m, from function cinema | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 0.00 x 30.00 m, from function cinema | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.16 x 2.40 x 0.00 m, from function gym | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 20.90 x 3.72 x 6.45 m, from function club | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 20.90 x 0.18 x 0.00 m, from function club | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 20.90 x 0.26 x 0.45 m, from function club | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 12.00 x 0.00 x 8.00 m, from function gasStation | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 7.00 x 0.35 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 2.50 x 2.30 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.25 x 4.50 x 0.00 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.25 x 0.00 x 2.30 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 7.00 x 2.00 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.33 x 7.00 x 0.00 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.02 x 7.00 x 0.00 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.92 x 7.00 x 0.00 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 5.55 x 0.20 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.92 x 4.00 x 0.00 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.00 x 3.33 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.00 x 0.92 m, from function factory | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 3.06 x 0.09 x 0.00 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 3.03 x 0.00 x 0.03 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 3.06 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 3.03 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 3.14 x 0.13 x 0.00 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 3.07 x 0.00 x 0.07 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 3.14 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 3.07 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 36.00 x 2.10 x 6.00 m, from function factory | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 36.00 x 2.10 x 0.00 m, from function factory | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 10.14 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 10.32 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 10.16 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.00 x 0.00 x 3.00 m, from function factory | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 3.14 x 0.14 x 0.00 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 3.14 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 3.32 x 0.22 x 0.00 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 3.16 x 0.00 x 0.16 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 3.32 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 3.16 m, from function factory | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.35 x 8.00 x 0.00 m, from function warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 3.50 x 0.00 m, from function warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 8.00 x 0.35 m, from function warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.50 x 2.30 m, from function warehouse | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 30.90 x 5.29 x 24.90 m, from function warehouse | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 30.00 x 5.10 x 24.00 m, from function warehouse | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 30.00 x 5.10 x 0.00 m, from function warehouse | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.00 x 3.27 x 0.00 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.85 x 3.27 x 0.00 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.30 x 0.92 x 0.00 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.88 x 3.27 x 0.00 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.25 x 1.00 x 0.00 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.25 x 0.47 x 0.00 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 1.80 x 0.20 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.25 x 0.00 x 0.20 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.80 x 0.87 x 0.00 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.87 x 0.83 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 3.27 x 0.00 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.87 x 0.68 x 0.00 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.95 x 0.80 x 0.00 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.87 x 0.90 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.46 x 0.80 x 0.00 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.27 x 2.50 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.87 x 0.85 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade relief/emitRelief, 0.00 x 3.27 x 1.20 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRelief)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade relief/emitRelief, 3.00 x 0.00 x 1.20 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRelief)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 12.90 x 2.09 x 4.70 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 12.90 x 0.18 x 0.00 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 12.90 x 0.20 x 0.45 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 12.00 x 0.12 x 0.14 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 2.27 x 4.70 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.45 x 2.09 x 4.70 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.95 x 1.19 x 8.40 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.18 x 8.40 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.45 x 0.18 x 8.40 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.14 x 0.12 x 7.50 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.95 x 1.37 x 0.00 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.95 x 1.19 x 0.45 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.10 x 0.87 x 0.00 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.87 x 0.80 x 0.00 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.27 x 0.83 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 1.00 x 1.18 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.47 x 1.18 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 1.80 x 0.00 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 0.00 x 1.18 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.27 x 2.83 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.87 x 0.87 x 0.00 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.02 x 0.80 x 0.00 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.02 x 0.68 x 0.00 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.80 x 0.90 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 5.00 x 3.27 x 0.00 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.58 x 0.87 x 0.00 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.87 x 0.79 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.68 x 0.85 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.90 x 2.09 x 4.70 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.90 x 0.18 x 0.00 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.90 x 0.20 x 0.45 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 0.12 x 0.14 m, from residential low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.15 x 3.27 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.08 x 3.27 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.97 x 0.87 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.97 x 0.80 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.89 x 3.27 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.82 x 0.87 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.13 x 0.87 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.97 x 0.68 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.05 x 0.87 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.90 x 0.68 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.05 x 0.80 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.13 x 0.68 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.90 x 3.27 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.28 x 1.00 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.28 x 0.47 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.28 x 0.00 x 0.20 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.87 x 1.04 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.87 x 0.97 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.87 x 0.75 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade relief/emitRelief, 3.08 x 0.00 x 1.20 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitRelief)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 40.90 x 2.09 x 4.70 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 40.90 x 0.18 x 0.00 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 40.90 x 0.20 x 0.45 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 40.00 x 0.12 x 0.14 m, from residential low large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 4.00 x 4.16 x 0.00 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.80 x 4.16 x 0.00 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.40 x 0.56 x 0.00 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.40 x 0.00 x 0.30 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 0.49 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.80 x 2.22 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.60 x 2.22 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 0.00 x 2.22 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 12.00 x 0.00 x 16.00 m, from residential medium small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.51 x 4.16 x 0.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.29 x 4.16 x 0.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.52 x 3.05 x 0.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.38 x 0.80 x 0.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.38 x 0.62 x 0.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 1.63 x 0.20 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.38 x 0.00 x 0.20 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 0.43 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.80 x 1.94 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.62 x 1.94 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 1.63 x 0.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 0.00 x 1.94 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 2.80 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.29 x 3.05 x 0.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 0.61 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.80 x 2.78 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.62 x 2.78 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 0.00 x 2.78 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 0.00 x 14.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 7.00 x 0.00 x 12.00 m, from residential medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.35 x 4.16 x 0.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.38 x 0.56 x 0.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.23 x 4.16 x 0.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.47 x 3.05 x 0.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.14 x 0.80 x 0.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.14 x 0.62 x 0.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.14 x 0.00 x 0.20 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.23 x 3.05 x 0.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.08 x 3.05 x 0.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 0.48 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.80 x 2.18 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.62 x 2.18 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 0.00 x 2.18 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 3.14 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 40.00 x 0.00 x 14.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 7.00 x 0.00 x 22.00 m, from residential medium large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.30 x 3.05 x 0.40 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.35 x 0.80 x 1.84 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.35 x 0.62 x 1.84 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.16 x 1.63 x 0.12 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.51 x 0.00 x 1.96 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.54 x 3.05 x 0.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.47 x 0.80 x 0.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.47 x 0.62 x 0.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.47 x 0.00 x 0.20 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.56 x 3.05 x 0.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.80 x 2.25 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.62 x 2.25 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 0.00 x 2.25 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 3.24 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 0.38 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.80 x 1.72 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.62 x 1.72 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 0.00 x 1.72 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.23 x 3.05 x 0.31 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.04 x 0.80 x 1.41 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.04 x 0.62 x 1.41 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.20 x 0.00 x 1.53 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 2.48 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.79 x 3.05 x 0.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.60 x 0.80 x 0.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.60 x 0.62 x 0.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.60 x 0.00 x 0.20 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 0.44 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.80 x 2.02 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.62 x 2.02 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 0.00 x 2.02 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.05 x 2.91 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.22 x 3.05 x 0.24 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.98 x 0.80 x 1.10 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.98 x 0.62 x 1.10 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.15 x 1.63 x 0.13 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.13 x 0.00 x 1.24 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.41 x 3.05 x 1.59 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 5.18 x 0.85 x 0.00 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 5.18 x 0.00 x 0.35 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 1.41 x 0.85 x 1.59 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 1.67 x 0.00 x 1.82 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 0.00 x 0.85 x 5.82 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 0.35 x 0.00 x 5.82 m, from residential high small lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.34 x 3.05 x 0.32 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.35 x 0.80 x 1.29 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.35 x 0.52 x 1.29 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.14 x 1.73 x 0.14 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.49 x 0.00 x 1.44 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.80 x 1.90 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.52 x 1.90 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 1.73 x 0.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 0.00 x 1.90 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.50 x 3.05 x 0.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.98 x 0.80 x 0.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.98 x 0.52 x 0.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 1.73 x 0.20 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.98 x 0.00 x 0.20 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 0.00 x 23.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 11.65 x 0.85 x 0.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 11.65 x 0.00 x 0.35 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 3.18 x 0.85 x 3.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 3.42 x 0.00 x 3.25 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 0.00 x 0.85 x 11.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 0.35 x 0.00 x 11.00 m, from residential high medium lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.53 x 3.05 x 0.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.10 x 0.80 x 0.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.10 x 0.52 x 0.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.10 x 0.00 x 0.20 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.15 x 3.05 x 0.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 40.00 x 0.00 x 23.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 22.00 x 0.85 x 0.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 22.00 x 0.00 x 0.35 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 6.00 x 0.85 x 3.00 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof (polygon plan)/emitPolygonRoof, 6.15 x 0.00 x 3.31 m, from residential high large lot | `src/render/buildings/buildingMesh.ts (emitPolygonRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.85 x 4.45 x 0.00 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.30 x 2.10 x 0.00 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.78 x 3.10 x 0.00 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.44 x 0.85 x 0.00 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.44 x 0.37 x 0.00 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 1.88 x 0.20 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.44 x 0.00 x 0.20 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 0.83 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.85 x 1.54 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.37 x 1.54 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 1.88 x 0.00 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 0.00 x 1.54 m, from commercial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.35 x 4.45 x 0.00 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 0.85 x 0.00 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.77 x 3.10 x 0.00 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.45 x 0.85 x 0.00 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.45 x 0.33 x 0.00 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 1.92 x 0.20 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.45 x 0.00 x 0.20 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 0.81 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.85 x 1.51 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.33 x 1.51 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 1.92 x 0.00 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.20 x 0.00 x 1.51 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.09 x 12.56 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 12.53 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.13 x 12.64 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.07 x 0.00 x 12.57 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 0.00 x 12.50 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.14 x 12.64 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.22 x 12.82 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.16 x 0.00 x 12.66 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.85 x 3.13 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.35 x 0.00 x 3.13 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.06 x 3.13 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 0.00 x 13.50 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.85 x 2.70 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.35 x 0.00 x 2.70 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.06 x 2.70 m, from commercial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.38 x 0.85 x 0.00 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.89 x 4.45 x 0.00 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.79 x 3.10 x 0.00 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.49 x 0.85 x 0.00 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.49 x 0.33 x 0.00 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.49 x 0.00 x 0.20 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.08 x 3.10 x 0.00 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 40.06 x 0.09 x 0.00 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 40.03 x 0.00 x 0.03 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 40.14 x 0.13 x 0.00 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 40.00 x 0.00 x 12.50 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 40.00 x 0.00 x 23.50 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.85 x 2.94 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.35 x 0.00 x 2.94 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.06 x 2.94 m, from commercial low large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 4.45 x 0.00 m, from commercial medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.35 x 4.44 x 0.00 m, from commercial medium small lot | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.00 x 4.44 x 0.12 m, from commercial medium small lot | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.45 x 3.20 m, from commercial medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.00 x 4.44 x 0.35 m, from commercial medium small lot | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.12 x 4.44 x 0.00 m, from commercial medium small lot | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.35 x 3.10 x 0.00 m, from commercial medium small lot | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.00 x 3.10 x 0.12 m, from commercial medium small lot | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.00 x 3.10 x 0.35 m, from commercial medium small lot | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/building body (walls, slabs)/emitBuilding, 0.12 x 3.10 x 0.00 m, from commercial medium small lot | `src/render/buildings/buildingMesh.ts (emitBuilding)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 4.45 x 3.13 m, from commercial medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.10 x 3.13 m, from commercial medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.08 x 4.45 x 0.00 m, from commercial medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.35 x 5.01 x 0.00 m, from commercial high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 1.41 x 0.00 m, from commercial high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.00 x 1.50 x 0.00 m, from commercial high small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 1.50 x 3.20 m, from commercial high small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.14 x 1.50 x 0.00 m, from commercial high medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.14 x 0.00 x 0.35 m, from commercial high medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.14 x 0.06 x 0.00 m, from commercial high medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 1.50 x 3.00 m, from commercial high medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.38 x 1.41 x 0.00 m, from commercial high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.92 x 1.50 x 0.00 m, from commercial high large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.92 x 0.00 x 0.35 m, from commercial high large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 2.92 x 0.06 x 0.00 m, from commercial high large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.85 x 6.73 x 0.00 m, from industrial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.30 x 4.38 x 0.00 m, from industrial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.35 x 6.73 x 0.00 m, from industrial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 2.23 x 0.00 m, from industrial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 6.73 x 0.00 m, from industrial low small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 12.90 x 3.24 x 8.45 m, from industrial low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 12.90 x 0.17 x 0.45 m, from industrial low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 12.00 x 0.11 x 0.14 m, from industrial low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 3.42 x 8.45 m, from industrial low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.45 x 3.24 x 8.45 m, from industrial low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.10 x 6.73 x 0.00 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.47 x 0.90 x 0.00 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.47 x 0.60 x 0.00 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 5.23 x 0.10 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.47 x 0.00 x 0.10 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.73 x 0.77 x 0.00 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 2.17 x 0.77 x 0.00 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.87 x 0.68 x 0.00 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 6.73 x 0.10 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.90 x 2.55 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.60 x 2.55 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.10 x 5.23 x 0.00 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.10 x 0.00 x 2.55 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 1.63 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 1.94 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 1.78 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.87 x 0.77 x 0.00 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.77 x 2.24 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.67 x 3.40 x 0.00 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 2.02 x 0.77 x 0.00 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.68 x 2.09 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 8.06 x 0.24 x 0.00 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 8.03 x 0.00 x 0.03 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.24 x 5.56 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.03 x 0.00 x 5.53 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.90 x 3.27 x 10.70 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.90 x 0.14 x 0.45 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 0.10 x 0.14 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 3.45 x 10.70 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.45 x 3.27 x 10.70 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 8.00 x 0.00 x 5.50 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 8.90 x 0.26 x 0.00 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 8.45 x 0.00 x 0.45 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.26 x 6.40 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.45 x 0.00 x 5.95 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.85 x 2.75 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.35 x 0.00 x 2.75 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.06 x 2.75 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.38 x 2.23 x 0.00 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.38 x 0.00 x 0.25 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.08 x 6.73 x 0.00 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.68 x 1.78 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 0.00 x 0.68 x 2.24 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/streak under a sill/emitStreak, 1.58 x 0.77 x 0.00 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitStreak)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 3.40 x 2.75 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 40.90 x 3.05 x 15.70 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 40.90 x 0.09 x 0.45 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 40.00 x 0.09 x 0.14 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 3.23 x 15.70 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.45 x 3.05 x 15.70 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.85 x 7.87 x 0.00 m, from industrial medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.30 x 5.52 x 0.00 m, from industrial medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.35 x 7.87 x 0.00 m, from industrial medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 3.37 x 0.00 m, from industrial medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 7.87 x 0.00 m, from industrial medium small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.10 x 7.87 x 0.00 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.05 x 0.90 x 0.00 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.05 x 0.60 x 0.00 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 6.37 x 0.10 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.05 x 0.00 x 0.10 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 7.87 x 0.10 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.90 x 3.05 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 0.60 x 3.05 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.10 x 6.37 x 0.00 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.10 x 0.00 x 3.05 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.90 x 3.31 x 10.20 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.90 x 0.15 x 0.45 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 24.00 x 0.11 x 0.14 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 3.49 x 10.20 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.45 x 3.31 x 10.20 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 6.50 x 0.00 x 6.50 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 7.40 x 0.26 x 0.00 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 6.95 x 0.00 x 0.45 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.00 x 0.26 x 7.40 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/flush storey band/flushBand, 0.45 x 0.00 x 6.95 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (flushBand)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.25 x 0.85 x 0.00 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.25 x 0.00 x 0.35 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.25 x 0.06 x 0.00 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.85 x 3.25 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.35 x 0.00 x 3.25 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 0.06 x 3.25 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.38 x 3.37 x 0.00 m, from industrial medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.08 x 7.87 x 0.00 m, from industrial medium large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 40.90 x 3.23 x 15.20 m, from industrial medium large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 40.90 x 0.10 x 0.45 m, from industrial medium large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 3.41 x 15.20 m, from industrial medium large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.45 x 3.23 x 15.20 m, from industrial medium large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.85 x 8.87 x 0.00 m, from industrial high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 1.30 x 6.52 x 0.00 m, from industrial high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.35 x 8.87 x 0.00 m, from industrial high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.30 x 4.37 x 0.00 m, from industrial high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.00 x 8.87 x 0.00 m, from industrial high small lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.10 x 8.87 x 0.00 m, from industrial high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 7.37 x 0.10 m, from industrial high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.00 x 8.87 x 0.10 m, from industrial high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 0.10 x 7.37 x 0.00 m, from industrial high medium lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 2.38 x 4.37 x 0.00 m, from industrial high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/facade bay (wall round an opening, reveals, sill, head)/emitBay, 3.08 x 8.87 x 0.00 m, from industrial high large lot | `src/render/buildings/buildingMesh.ts (emitBay)` | 2 | 6 | 36 | none | 216 | L0 2 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 2.60 x 9.00 m, from preset house | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 6.00 x 1.73 x 0.00 m, from preset rowhouse | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 6.45 x 3.72 x 12.90 m, from preset mixed | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 2.10 x 6.00 m, from preset warehouse | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 1.05 x 3.00 m, from preset factory | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 3.00 x 0.00 x 2.80 m, from function cityHall | `src/render/buildings/buildingMesh.ts (emitLots)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 2.92 x 0.00 x 2.50 m, from function council | `src/render/buildings/buildingMesh.ts (emitLots)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 3.00 x 0.00 x 3.00 m, from function police | `src/render/buildings/buildingMesh.ts (emitLots)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 2.80 x 0.00 x 2.67 m, from function library | `src/render/buildings/buildingMesh.ts (emitLots)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 2.86 x 0.00 x 2.86 m, from function prison | `src/render/buildings/buildingMesh.ts (emitLots)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 14.00 x 7.00 x 0.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 3.45 x 5.98 x 6.90 m, from function church | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 2.75 x 0.00 x 3.00 m, from function church | `src/render/buildings/buildingMesh.ts (emitLots)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 1.15 x 4.00 m, from function cemetery | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 2.86 x 0.00 x 3.00 m, from function supermarket | `src/render/buildings/buildingMesh.ts (emitLots)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 9.00 x 2.60 x 0.00 m, from function bakery | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 2.80 x 0.00 x 3.00 m, from function restaurant | `src/render/buildings/buildingMesh.ts (emitLots)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 2.86 x 0.00 x 2.67 m, from function club | `src/render/buildings/buildingMesh.ts (emitLots)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/lot/emitLots, 2.91 x 0.00 x 2.86 m, from function sportsCourt | `src/render/buildings/buildingMesh.ts (emitLots)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 1.89 x 8.50 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 5.00 x 1.01 x 0.00 m, from residential low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 3.07 x 16.00 m, from industrial low small lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 3.13 x 20.50 m, from industrial low medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 2.96 x 30.50 m, from industrial low large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 3.17 x 19.50 m, from industrial medium medium lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |
| Buildings: shell pieces/roof/emitRoof, 0.00 x 3.14 x 29.50 m, from industrial medium large lot | `src/render/buildings/buildingMesh.ts (emitRoof)` | 1 | 3 | 36 | none | 108 | L0 1 | 0 | not optimised |

## Editor previews

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Editor previews/building ghost/apartments | `src/render/buildings/buildingMesh.ts (ghost)` | 12,256 | 23,417 | 68 | Uint16 | 141,528 | L0 12,256 | 1,359 | not optimised |
| Editor previews/railway/100 m | `src/render/transit.ts (buildTrackPreview)` | 2,700 | 5,400 | 32 | Uint16 | 840 | L0 2,700 | 0 | not optimised |
| Editor previews/building ghost/house | `src/render/buildings/buildingMesh.ts (ghost)` | 2,310 | 4,398 | 68 | Uint16 | 80,472 | L0 2,310 | 230 | not optimised |
| Editor previews/building ghost/rowhouse | `src/render/buildings/buildingMesh.ts (ghost)` | 1,736 | 3,352 | 68 | Uint16 | 57,424 | L0 1,736 | 52 | not optimised |
| Editor previews/pole run/3 poles | `src/render/poleLayer.ts (buildPolePreview)` | 64 | 128 | 56 | Uint16 | 8,064 | L0 64 | 0 | not optimised |

## Landscape elements (glTF)

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Landscape elements (glTF)/mushrooms/2 | `public/models/elements/*.gltf (src/render/elements.ts)` | 3,216 | 1,806 | 32 | Uint32 | 96,384 | L0 3,216 | 0 | not optimised |
| Landscape elements (glTF)/flowers/2 | `public/models/elements/*.gltf (src/render/elements.ts)` | 1,690 | 1,302 | 44 | Uint32 | 77,568 | L0 1,690 | 0 | not optimised |
| Landscape elements (glTF)/mushrooms/1 | `public/models/elements/*.gltf (src/render/elements.ts)` | 880 | 555 | 32 | Uint32 | 28,320 | L0 880 | 0 | not optimised |
| Landscape elements (glTF)/flowers/1 | `public/models/elements/*.gltf (src/render/elements.ts)` | 755 | 581 | 44 | Uint32 | 34,624 | L0 755 | 0 | not optimised |
| Landscape elements (glTF)/tallGrass/2 | `public/models/elements/*.gltf (src/render/elements.ts)` | 622 | 644 | 44 | Uint32 | 35,800 | L0 622 | 0 | not optimised |
| Landscape elements (glTF)/clover/2 | `public/models/elements/*.gltf (src/render/elements.ts)` | 615 | 433 | 44 | Uint32 | 26,432 | L0 615 | 0 | not optimised |
| Landscape elements (glTF)/stones/3 | `public/models/elements/*.gltf (src/render/elements.ts)` | 522 | 531 | 32 | Uint32 | 23,256 | L0 522 | 0 | not optimised |
| Landscape elements (glTF)/grass/2 | `public/models/elements/*.gltf (src/render/elements.ts)` | 494 | 559 | 44 | Uint32 | 30,524 | L0 494 | 0 | not optimised |
| Landscape elements (glTF)/clover/1 | `public/models/elements/*.gltf (src/render/elements.ts)` | 379 | 267 | 44 | Uint32 | 16,296 | L0 379 | 0 | not optimised |
| Landscape elements (glTF)/scrub/2 | `public/models/elements/*.gltf (src/render/elements.ts)` | 360 | 360 | 44 | Uint32 | 20,160 | L0 360 | 0 | not optimised |
| Landscape elements (glTF)/stones/1 | `public/models/elements/*.gltf (src/render/elements.ts)` | 342 | 351 | 32 | Uint32 | 15,336 | L0 342 | 0 | not optimised |
| Landscape elements (glTF)/tallGrass/1 | `public/models/elements/*.gltf (src/render/elements.ts)` | 326 | 303 | 44 | Uint32 | 17,244 | L0 326 | 0 | not optimised |
| Landscape elements (glTF)/fern/1 | `public/models/elements/*.gltf (src/render/elements.ts)` | 288 | 243 | 44 | Uint32 | 14,148 | L0 288 | 0 | not optimised |
| Landscape elements (glTF)/stones/2 | `public/models/elements/*.gltf (src/render/elements.ts)` | 244 | 249 | 32 | Uint32 | 10,896 | L0 244 | 0 | not optimised |
| Landscape elements (glTF)/grass/1 | `public/models/elements/*.gltf (src/render/elements.ts)` | 155 | 153 | 44 | Uint32 | 8,592 | L0 155 | 0 | not optimised |
| Landscape elements (glTF)/pebbles/1 | `public/models/elements/*.gltf (src/render/elements.ts)` | 136 | 292 | 32 | Uint32 | 10,976 | L0 136 | 0 | not optimised |
| Landscape elements (glTF)/pebbles/3 | `public/models/elements/*.gltf (src/render/elements.ts)` | 128 | 244 | 32 | Uint32 | 9,344 | L0 128 | 0 | not optimised |
| Landscape elements (glTF)/scrub/1 | `public/models/elements/*.gltf (src/render/elements.ts)` | 120 | 120 | 44 | Uint32 | 6,720 | L0 120 | 0 | not optimised |
| Landscape elements (glTF)/pebbles/2 | `public/models/elements/*.gltf (src/render/elements.ts)` | 114 | 212 | 32 | Uint32 | 8,152 | L0 114 | 0 | not optimised |
| Landscape elements (glTF)/gravel/1 | `public/models/elements/*.gltf (src/render/elements.ts)` | 104 | 216 | 32 | Uint32 | 8,160 | L0 104 | 0 | not optimised |
| Landscape elements (glTF)/gravel/2 | `public/models/elements/*.gltf (src/render/elements.ts)` | 78 | 162 | 32 | Uint32 | 6,120 | L0 78 | 0 | not optimised |
| Landscape elements (glTF)/gravel/3 | `public/models/elements/*.gltf (src/render/elements.ts)` | 52 | 108 | 32 | Uint32 | 4,080 | L0 52 | 0 | not optimised |
| Landscape elements (glTF)/leaves/1 | `src/render/elements.ts` | 2 | 4 | 32 | Uint16 | 140 | L0 2 | 0 | not optimised |

## Barriers

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Barriers/railing/70 m run | `src/render/barriers.ts (createBarriers, sync)` | 6,996 | 13,992 | 64 | Uint16 | 36,496 | L0 6,996 | 0 | not optimised |
| Barriers/fence/70 m run | `src/render/barriers.ts (createBarriers, sync)` | 864 | 1,728 | 64 | Uint16 | 5,776 | L0 864 | 0 | not optimised |
| Barriers/guardrail/70 m run | `src/render/barriers.ts (createBarriers, sync)` | 648 | 1,296 | 64 | Uint16 | 5,776 | L0 648 | 0 | not optimised |
| Barriers/wall/70 m run | `src/render/barriers.ts (createBarriers, sync)` | 432 | 864 | 64 | Uint16 | 5,776 | L0 432 | 0 | not optimised |
| Barriers/hedge/70 m run | `src/render/barriers.ts (createBarriers, sync)` | 216 | 432 | 64 | Uint16 | 2,888 | L0 216 | 0 | not optimised |

## Furniture (interiors)

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Furniture (interiors)/bookshelf | `src/render/buildings/furnitureKit.ts` | 1,814 | 3,628 | 96 | Uint16 | 359,172 | L0 1,814 | 2 | not optimised |
| Furniture (interiors)/officeChair | `src/render/buildings/furnitureKit.ts` | 820 | 714 | 96 | Uint16 | 73,464 | L0 820 | 177 | not optimised |
| Furniture (interiors)/plant | `src/render/buildings/furnitureKit.ts` | 462 | 356 | 96 | Uint16 | 36,948 | L0 462 | 148 | not optimised |
| Furniture (interiors)/bars | `src/render/buildings/furnitureKit.ts` | 438 | 669 | 96 | Uint16 | 66,852 | L0 438 | 0 | not optimised |
| Furniture (interiors)/shelf | `src/render/buildings/furnitureKit.ts` | 370 | 740 | 96 | Uint16 | 73,260 | L0 370 | 2 | not optimised |
| Furniture (interiors)/ceilingLamp | `src/render/buildings/furnitureKit.ts` | 260 | 287 | 96 | Uint16 | 29,112 | L0 260 | 90 | not optimised |
| Furniture (interiors)/barCounter | `src/render/buildings/furnitureKit.ts` | 246 | 366 | 96 | Uint16 | 36,612 | L0 246 | 0 | not optimised |
| Furniture (interiors)/rack | `src/render/buildings/furnitureKit.ts` | 240 | 480 | 96 | Uint16 | 47,520 | L0 240 | 0 | not optimised |
| Furniture (interiors)/stove | `src/render/buildings/furnitureKit.ts` | 208 | 316 | 96 | Uint16 | 31,584 | L0 208 | 5 | not optimised |
| Furniture (interiors)/sofa | `src/render/buildings/furnitureKit.ts` | 172 | 288 | 96 | Uint16 | 28,680 | L0 172 | 11 | not optimised |
| Furniture (interiors)/floorLamp | `src/render/buildings/furnitureKit.ts` | 160 | 243 | 96 | Uint16 | 24,288 | L0 160 | 8 | not optimised |
| Furniture (interiors)/stairs | `src/render/buildings/furnitureKit.ts` | 152 | 304 | 96 | Uint16 | 30,096 | L0 152 | 24 | not optimised |
| Furniture (interiors)/tableLamp | `src/render/buildings/furnitureKit.ts` | 146 | 223 | 96 | Uint16 | 22,284 | L0 146 | 8 | not optimised |
| Furniture (interiors)/wardBed | `src/render/buildings/furnitureKit.ts` | 132 | 208 | 96 | Uint16 | 20,760 | L0 132 | 0 | not optimised |
| Furniture (interiors)/armchair | `src/render/buildings/furnitureKit.ts` | 128 | 200 | 96 | Uint16 | 19,968 | L0 128 | 5 | not optimised |
| Furniture (interiors)/bed | `src/render/buildings/furnitureKit.ts` | 126 | 196 | 96 | Uint16 | 19,572 | L0 126 | 4 | not optimised |
| Furniture (interiors)/singleBed | `src/render/buildings/furnitureKit.ts` | 118 | 180 | 96 | Uint16 | 17,988 | L0 118 | 6 | not optimised |
| Furniture (interiors)/chair | `src/render/buildings/furnitureKit.ts` | 112 | 168 | 96 | Uint16 | 16,800 | L0 112 | 0 | not optimised |
| Furniture (interiors)/altar | `src/render/buildings/furnitureKit.ts` | 104 | 166 | 96 | Uint16 | 16,560 | L0 104 | 8 | not optimised |
| Furniture (interiors)/machine | `src/render/buildings/furnitureKit.ts` | 86 | 148 | 96 | Uint16 | 14,724 | L0 86 | 4 | not optimised |
| Furniture (interiors)/table | `src/render/buildings/furnitureKit.ts` | 76 | 96 | 96 | Uint16 | 9,672 | L0 76 | 0 | not optimised |
| Furniture (interiors)/toilet | `src/render/buildings/furnitureKit.ts` | 70 | 111 | 96 | Uint16 | 11,076 | L0 70 | 0 | not optimised |
| Furniture (interiors)/desk | `src/render/buildings/furnitureKit.ts` | 64 | 128 | 96 | Uint16 | 12,672 | L0 64 | 0 | not optimised |
| Furniture (interiors)/sink | `src/render/buildings/furnitureKit.ts` | 64 | 107 | 96 | Uint16 | 10,656 | L0 64 | 0 | not optimised |
| Furniture (interiors)/bath | `src/render/buildings/furnitureKit.ts` | 56 | 91 | 96 | Uint16 | 9,072 | L0 56 | 10 | not optimised |
| Furniture (interiors)/checkout | `src/render/buildings/furnitureKit.ts` | 50 | 100 | 96 | Uint16 | 9,900 | L0 50 | 0 | not optimised |
| Furniture (interiors)/treadmill | `src/render/buildings/furnitureKit.ts` | 48 | 96 | 96 | Uint16 | 9,504 | L0 48 | 0 | not optimised |
| Furniture (interiors)/fridge | `src/render/buildings/furnitureKit.ts` | 44 | 88 | 96 | Uint16 | 8,712 | L0 44 | 4 | not optimised |
| Furniture (interiors)/pew | `src/render/buildings/furnitureKit.ts` | 44 | 88 | 96 | Uint16 | 8,712 | L0 44 | 0 | not optimised |
| Furniture (interiors)/wardrobe | `src/render/buildings/furnitureKit.ts` | 40 | 80 | 96 | Uint16 | 7,920 | L0 40 | 4 | not optimised |
| Furniture (interiors)/seat | `src/render/buildings/furnitureKit.ts` | 40 | 80 | 96 | Uint16 | 7,920 | L0 40 | 2 | not optimised |
| Furniture (interiors)/locker | `src/render/buildings/furnitureKit.ts` | 40 | 80 | 96 | Uint16 | 7,920 | L0 40 | 4 | not optimised |
| Furniture (interiors)/stage | `src/render/buildings/furnitureKit.ts` | 40 | 80 | 96 | Uint16 | 7,920 | L0 40 | 0 | not optimised |
| Furniture (interiors)/blackboard | `src/render/buildings/furnitureKit.ts` | 34 | 68 | 96 | Uint16 | 6,732 | L0 34 | 6 | not optimised |
| Furniture (interiors)/stairwell | `src/render/buildings/furnitureKit.ts` | 34 | 68 | 96 | Uint16 | 6,732 | L0 34 | 4 | not optimised |
| Furniture (interiors)/tv | `src/render/buildings/furnitureKit.ts` | 32 | 64 | 96 | Uint16 | 6,336 | L0 32 | 0 | not optimised |
| Furniture (interiors)/counter | `src/render/buildings/furnitureKit.ts` | 30 | 60 | 96 | Uint16 | 5,940 | L0 30 | 0 | not optimised |
| Furniture (interiors)/atm | `src/render/buildings/furnitureKit.ts` | 30 | 60 | 96 | Uint16 | 5,940 | L0 30 | 9 | not optimised |
| Furniture (interiors)/screen | `src/render/buildings/furnitureKit.ts` | 22 | 44 | 96 | Uint16 | 4,356 | L0 22 | 6 | not optimised |
| Furniture (interiors)/pallet | `src/render/buildings/furnitureKit.ts` | 20 | 40 | 96 | Uint16 | 3,960 | L0 20 | 0 | not optimised |

## Buildings: masses (cell level)

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Buildings: masses (cell level)/council (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 244 | 484 | 44 | Uint16 | 22,760 | L0 244 | 0 | not optimised |
| Buildings: masses (cell level)/courtyard (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 242 | 484 | 44 | Uint16 | 22,748 | L0 242 | 0 | not optimised |
| Buildings: masses (cell level)/mall (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 242 | 484 | 44 | Uint16 | 22,748 | L0 242 | 0 | not optimised |
| Buildings: masses (cell level)/university (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 196 | 392 | 44 | Uint16 | 18,424 | L0 196 | 0 | not optimised |
| Buildings: masses (cell level)/school (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 188 | 376 | 44 | Uint16 | 17,672 | L0 188 | 0 | not optimised |
| Buildings: masses (cell level)/residential high (small lot 12 x 16 m (residentialTower))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 170 | 328 | 44 | Uint16 | 15,452 | L0 170 | 0 | not optimised |
| Buildings: masses (cell level)/prison (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 164 | 328 | 44 | Uint16 | 15,416 | L0 164 | 0 | not optimised |
| Buildings: masses (cell level)/commercial medium (large lot 40 x 36 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 162 | 324 | 44 | Uint16 | 15,228 | L0 162 | 0 | not optimised |
| Buildings: masses (cell level)/hospital (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 160 | 320 | 44 | Uint16 | 15,040 | L0 160 | 0 | not optimised |
| Buildings: masses (cell level)/residential medium (large lot 40 x 36 m (apartments))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 152 | 304 | 44 | Uint16 | 14,288 | L0 152 | 0 | not optimised |
| Buildings: masses (cell level)/fireStation (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 144 | 288 | 44 | Uint16 | 13,536 | L0 144 | 0 | not optimised |
| Buildings: masses (cell level)/cityHall (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 138 | 276 | 44 | Uint16 | 12,972 | L0 138 | 0 | not optimised |
| Buildings: masses (cell level)/residential high (medium lot 24 x 26 m (residentialTower))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 132 | 256 | 44 | Uint16 | 12,056 | L0 132 | 0 | not optimised |
| Buildings: masses (cell level)/residential high (large lot 40 x 36 m (residentialTower))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 132 | 256 | 44 | Uint16 | 12,056 | L0 132 | 0 | not optimised |
| Buildings: masses (cell level)/commercial low (medium lot 24 x 26 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 132 | 264 | 44 | Uint16 | 12,408 | L0 132 | 0 | not optimised |
| Buildings: masses (cell level)/commercial low (large lot 40 x 36 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 132 | 264 | 44 | Uint16 | 12,408 | L0 132 | 0 | not optimised |
| Buildings: masses (cell level)/factory (work)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 130 | 268 | 44 | Uint16 | 12,572 | L0 130 | 0 | not optimised |
| Buildings: masses (cell level)/commercial medium (medium lot 24 x 26 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 122 | 244 | 44 | Uint16 | 11,468 | L0 122 | 0 | not optimised |
| Buildings: masses (cell level)/residentialTower (homes)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 110 | 220 | 44 | Uint16 | 10,340 | L0 110 | 0 | not optimised |
| Buildings: masses (cell level)/office (work)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 106 | 212 | 44 | Uint16 | 9,964 | L0 106 | 0 | not optimised |
| Buildings: masses (cell level)/commercial high (medium lot 24 x 26 m (office))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 106 | 212 | 44 | Uint16 | 9,964 | L0 106 | 0 | not optimised |
| Buildings: masses (cell level)/commercial high (large lot 40 x 36 m (office))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 106 | 212 | 44 | Uint16 | 9,964 | L0 106 | 0 | not optimised |
| Buildings: masses (cell level)/factory (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 102 | 210 | 44 | Uint16 | 9,852 | L0 102 | 0 | not optimised |
| Buildings: masses (cell level)/office (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 98 | 196 | 44 | Uint16 | 9,212 | L0 98 | 0 | not optimised |
| Buildings: masses (cell level)/apartments (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 96 | 192 | 44 | Uint16 | 9,024 | L0 96 | 0 | not optimised |
| Buildings: masses (cell level)/supermarket (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 90 | 180 | 44 | Uint16 | 8,460 | L0 90 | 0 | not optimised |
| Buildings: masses (cell level)/cinema (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 88 | 176 | 44 | Uint16 | 8,272 | L0 88 | 0 | not optimised |
| Buildings: masses (cell level)/tower (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 86 | 172 | 44 | Uint16 | 8,084 | L0 86 | 0 | not optimised |
| Buildings: masses (cell level)/courthouse (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 86 | 172 | 44 | Uint16 | 8,084 | L0 86 | 0 | not optimised |
| Buildings: masses (cell level)/museum (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 86 | 172 | 44 | Uint16 | 8,084 | L0 86 | 0 | not optimised |
| Buildings: masses (cell level)/bank (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 86 | 172 | 44 | Uint16 | 8,084 | L0 86 | 0 | not optimised |
| Buildings: masses (cell level)/hotel (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 86 | 172 | 44 | Uint16 | 8,084 | L0 86 | 0 | not optimised |
| Buildings: masses (cell level)/residential medium (medium lot 24 x 26 m (apartments))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 86 | 172 | 44 | Uint16 | 8,084 | L0 86 | 0 | not optimised |
| Buildings: masses (cell level)/police (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 84 | 168 | 44 | Uint16 | 7,896 | L0 84 | 0 | not optimised |
| Buildings: masses (cell level)/commercial low (small lot 12 x 16 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 82 | 164 | 44 | Uint16 | 7,708 | L0 82 | 0 | not optimised |
| Buildings: masses (cell level)/commercial medium (small lot 12 x 16 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 82 | 164 | 44 | Uint16 | 7,708 | L0 82 | 0 | not optimised |
| Buildings: masses (cell level)/library (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 78 | 156 | 44 | Uint16 | 7,332 | L0 78 | 0 | not optimised |
| Buildings: masses (cell level)/block (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 76 | 152 | 44 | Uint16 | 7,144 | L0 76 | 0 | not optimised |
| Buildings: masses (cell level)/apartments (homes)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 72 | 144 | 44 | Uint16 | 6,768 | L0 72 | 0 | not optimised |
| Buildings: masses (cell level)/clinic (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 72 | 144 | 44 | Uint16 | 6,768 | L0 72 | 0 | not optimised |
| Buildings: masses (cell level)/pharmacy (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 68 | 136 | 44 | Uint16 | 6,392 | L0 68 | 0 | not optimised |
| Buildings: masses (cell level)/postOffice (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 66 | 132 | 44 | Uint16 | 6,204 | L0 66 | 0 | not optimised |
| Buildings: masses (cell level)/shop (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 66 | 132 | 44 | Uint16 | 6,204 | L0 66 | 0 | not optimised |
| Buildings: masses (cell level)/bar (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 66 | 132 | 44 | Uint16 | 6,204 | L0 66 | 0 | not optimised |
| Buildings: masses (cell level)/commercial high (small lot 12 x 16 m (office))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 66 | 132 | 44 | Uint16 | 6,204 | L0 66 | 0 | not optimised |
| Buildings: masses (cell level)/industrial low (medium lot 24 x 26 m (warehouse))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 64 | 130 | 44 | Uint16 | 6,104 | L0 64 | 0 | not optimised |
| Buildings: masses (cell level)/busStation (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 60 | 120 | 44 | Uint16 | 5,640 | L0 60 | 0 | not optimised |
| Buildings: masses (cell level)/restaurant (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 60 | 120 | 44 | Uint16 | 5,640 | L0 60 | 0 | not optimised |
| Buildings: masses (cell level)/gasStation (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 60 | 120 | 44 | Uint16 | 5,640 | L0 60 | 0 | not optimised |
| Buildings: masses (cell level)/nightclub (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 58 | 116 | 44 | Uint16 | 5,452 | L0 58 | 0 | not optimised |
| Buildings: masses (cell level)/gym (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 58 | 116 | 44 | Uint16 | 5,452 | L0 58 | 0 | not optimised |
| Buildings: masses (cell level)/residential medium (small lot 12 x 16 m (apartments))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 58 | 116 | 44 | Uint16 | 5,452 | L0 58 | 0 | not optimised |
| Buildings: masses (cell level)/shop (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 56 | 112 | 44 | Uint16 | 5,264 | L0 56 | 0 | not optimised |
| Buildings: masses (cell level)/industrial low (large lot 40 x 36 m (warehouse))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 54 | 110 | 44 | Uint16 | 5,164 | L0 54 | 0 | not optimised |
| Buildings: masses (cell level)/industrial medium (medium lot 24 x 26 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 50 | 102 | 44 | Uint16 | 4,788 | L0 50 | 0 | not optimised |
| Buildings: masses (cell level)/industrial medium (large lot 40 x 36 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 50 | 102 | 44 | Uint16 | 4,788 | L0 50 | 0 | not optimised |
| Buildings: masses (cell level)/industrial high (medium lot 24 x 26 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 50 | 102 | 44 | Uint16 | 4,788 | L0 50 | 0 | not optimised |
| Buildings: masses (cell level)/industrial high (large lot 40 x 36 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 50 | 102 | 44 | Uint16 | 4,788 | L0 50 | 0 | not optimised |
| Buildings: masses (cell level)/snackBar (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 46 | 92 | 44 | Uint16 | 4,324 | L0 46 | 0 | not optimised |
| Buildings: masses (cell level)/church (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 42 | 88 | 44 | Uint16 | 4,124 | L0 42 | 0 | not optimised |
| Buildings: masses (cell level)/residential low (medium lot 24 x 26 m (house))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 38 | 80 | 44 | Uint16 | 3,748 | L0 38 | 0 | not optimised |
| Buildings: masses (cell level)/residential low (large lot 40 x 36 m (house))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 38 | 80 | 44 | Uint16 | 3,748 | L0 38 | 0 | not optimised |
| Buildings: masses (cell level)/residential low (small lot 12 x 16 m (house))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 36 | 76 | 44 | Uint16 | 3,560 | L0 36 | 0 | not optimised |
| Buildings: masses (cell level)/warehouse (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 28 | 62 | 44 | Uint16 | 2,896 | L0 28 | 0 | not optimised |
| Buildings: masses (cell level)/house (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 26 | 54 | 44 | Uint16 | 2,532 | L0 26 | 0 | not optimised |
| Buildings: masses (cell level)/rowhouse (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 26 | 54 | 44 | Uint16 | 2,532 | L0 26 | 0 | not optimised |
| Buildings: masses (cell level)/mixed (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 26 | 54 | 44 | Uint16 | 2,532 | L0 26 | 0 | not optimised |
| Buildings: masses (cell level)/house (homes)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 26 | 54 | 44 | Uint16 | 2,532 | L0 26 | 0 | not optimised |
| Buildings: masses (cell level)/bakery (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 26 | 54 | 44 | Uint16 | 2,532 | L0 26 | 0 | not optimised |
| Buildings: masses (cell level)/club (leisure)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 26 | 54 | 44 | Uint16 | 2,532 | L0 26 | 0 | not optimised |
| Buildings: masses (cell level)/townhouse (homes)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 24 | 50 | 44 | Uint16 | 2,344 | L0 24 | 0 | not optimised |
| Buildings: masses (cell level)/cemetery (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 38 | 44 | Uint16 | 1,780 | L0 18 | 0 | not optimised |
| Buildings: masses (cell level)/industrial low (small lot 12 x 16 m (warehouse))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 38 | 44 | Uint16 | 1,780 | L0 18 | 0 | not optimised |
| Buildings: masses (cell level)/industrial medium (small lot 12 x 16 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 38 | 44 | Uint16 | 1,780 | L0 18 | 0 | not optimised |
| Buildings: masses (cell level)/industrial high (small lot 12 x 16 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 38 | 44 | Uint16 | 1,780 | L0 18 | 0 | not optimised |
| Buildings: masses (cell level)/warehouse (work)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 16 | 34 | 44 | Uint16 | 1,592 | L0 16 | 2 | not optimised |
| Buildings: masses (cell level)/square (leisure)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 2 | 4 | 44 | Uint16 | 188 | L0 2 | 0 | not optimised |
| Buildings: masses (cell level)/playground (leisure)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 2 | 4 | 44 | Uint16 | 188 | L0 2 | 0 | not optimised |
| Buildings: masses (cell level)/sportsCourt (leisure)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 2 | 4 | 44 | Uint16 | 188 | L0 2 | 0 | not optimised |

## Water

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Water/lake/one stamp, 40 m round | `src/render/terrain.ts (unifiedWaterGeometry)` | 4,624 | 13,872 | 44 | none | 610,368 | L0 4,624 | 0 | not optimised |
| Water/river/160 m course, 16 m wide | `src/render/terrain.ts (unifiedWaterGeometry)` | 864 | 2,592 | 44 | none | 114,048 | L0 864 | 0 | not optimised |

## Terrain

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Terrain/far patch/one plate, its four skirts | `src/render/flatAtlas.ts (createFlatFar, writeFarPatch, farIndexInto)` | 2,560 | 1,221 | 24 | Uint16 | 44,664 | L0 2,560 | 256 | not optimised |
| Terrain/edge slab/round one plate | `src/render/terrain.ts (slabGeometry)` | 512 | 1,536 | 48 | none | 73,728 | L0 512 | 0 | not optimised |
| Terrain/near patch/10 x 10 cells (level 0: 6.4 m a cell, each level twice as wide) | `src/render/terrainLod.ts (LandLod, patchCells)` | 200 | 400 | 3 | Uint16 | 18,784 | L0 200 | 0 | not optimised |
| Terrain/near patch rim/one side, both ways round | `src/render/terrainLod.ts (LandLod, patchRim)` | 40 | 22 | 3 | Uint16 | 2,354 | L0 40 | 20 | not optimised |

## Buildings: masses (tile level)

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Buildings: masses (tile level)/council (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 180 | 356 | 44 | Uint16 | 16,744 | L0 180 | 0 | not optimised |
| Buildings: masses (tile level)/residential high (small lot 12 x 16 m (residentialTower))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 112 | 212 | 44 | Uint16 | 10,000 | L0 112 | 0 | not optimised |
| Buildings: masses (tile level)/residential medium (large lot 40 x 36 m (apartments))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 82 | 164 | 44 | Uint16 | 7,708 | L0 82 | 0 | not optimised |
| Buildings: masses (tile level)/residential high (medium lot 24 x 26 m (residentialTower))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 74 | 140 | 44 | Uint16 | 6,604 | L0 74 | 0 | not optimised |
| Buildings: masses (tile level)/residential high (large lot 40 x 36 m (residentialTower))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 74 | 140 | 44 | Uint16 | 6,604 | L0 74 | 0 | not optimised |
| Buildings: masses (tile level)/residential medium (medium lot 24 x 26 m (apartments))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 66 | 132 | 44 | Uint16 | 6,204 | L0 66 | 0 | not optimised |
| Buildings: masses (tile level)/factory (work)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 62 | 132 | 44 | Uint16 | 6,180 | L0 62 | 0 | not optimised |
| Buildings: masses (tile level)/courtyard (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 60 | 120 | 44 | Uint16 | 5,640 | L0 60 | 0 | not optimised |
| Buildings: masses (tile level)/factory (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 58 | 122 | 44 | Uint16 | 5,716 | L0 58 | 0 | not optimised |
| Buildings: masses (tile level)/university (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 56 | 112 | 44 | Uint16 | 5,264 | L0 56 | 0 | not optimised |
| Buildings: masses (tile level)/school (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 48 | 96 | 44 | Uint16 | 4,512 | L0 48 | 0 | not optimised |
| Buildings: masses (tile level)/mall (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 44 | 88 | 44 | Uint16 | 4,136 | L0 44 | 0 | not optimised |
| Buildings: masses (tile level)/apartments (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 42 | 84 | 44 | Uint16 | 3,948 | L0 42 | 0 | not optimised |
| Buildings: masses (tile level)/prison (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 42 | 84 | 44 | Uint16 | 3,948 | L0 42 | 0 | not optimised |
| Buildings: masses (tile level)/church (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 42 | 88 | 44 | Uint16 | 4,124 | L0 42 | 0 | not optimised |
| Buildings: masses (tile level)/fireStation (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 40 | 80 | 44 | Uint16 | 3,760 | L0 40 | 0 | not optimised |
| Buildings: masses (tile level)/residential medium (small lot 12 x 16 m (apartments))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 38 | 76 | 44 | Uint16 | 3,572 | L0 38 | 0 | not optimised |
| Buildings: masses (tile level)/tower (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 32 | 64 | 44 | Uint16 | 3,008 | L0 32 | 0 | not optimised |
| Buildings: masses (tile level)/residentialTower (homes)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 32 | 64 | 44 | Uint16 | 3,008 | L0 32 | 0 | not optimised |
| Buildings: masses (tile level)/hospital (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 32 | 64 | 44 | Uint16 | 3,008 | L0 32 | 0 | not optimised |
| Buildings: masses (tile level)/residential low (medium lot 24 x 26 m (house))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 32 | 68 | 44 | Uint16 | 3,184 | L0 32 | 0 | not optimised |
| Buildings: masses (tile level)/residential low (large lot 40 x 36 m (house))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 32 | 68 | 44 | Uint16 | 3,184 | L0 32 | 0 | not optimised |
| Buildings: masses (tile level)/commercial high (medium lot 24 x 26 m (office))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 32 | 64 | 44 | Uint16 | 3,008 | L0 32 | 0 | not optimised |
| Buildings: masses (tile level)/commercial high (large lot 40 x 36 m (office))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 32 | 64 | 44 | Uint16 | 3,008 | L0 32 | 0 | not optimised |
| Buildings: masses (tile level)/industrial medium (medium lot 24 x 26 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 32 | 66 | 44 | Uint16 | 3,096 | L0 32 | 0 | not optimised |
| Buildings: masses (tile level)/cityHall (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 30 | 60 | 44 | Uint16 | 2,820 | L0 30 | 0 | not optimised |
| Buildings: masses (tile level)/residential low (small lot 12 x 16 m (house))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 30 | 64 | 44 | Uint16 | 2,996 | L0 30 | 0 | not optimised |
| Buildings: masses (tile level)/commercial low (medium lot 24 x 26 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 30 | 60 | 44 | Uint16 | 2,820 | L0 30 | 0 | not optimised |
| Buildings: masses (tile level)/commercial low (large lot 40 x 36 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 30 | 60 | 44 | Uint16 | 2,820 | L0 30 | 0 | not optimised |
| Buildings: masses (tile level)/commercial medium (medium lot 24 x 26 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 30 | 60 | 44 | Uint16 | 2,820 | L0 30 | 0 | not optimised |
| Buildings: masses (tile level)/commercial medium (large lot 40 x 36 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 30 | 60 | 44 | Uint16 | 2,820 | L0 30 | 0 | not optimised |
| Buildings: masses (tile level)/industrial low (medium lot 24 x 26 m (warehouse))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 30 | 62 | 44 | Uint16 | 2,908 | L0 30 | 0 | not optimised |
| Buildings: masses (tile level)/industrial low (large lot 40 x 36 m (warehouse))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 30 | 62 | 44 | Uint16 | 2,908 | L0 30 | 0 | not optimised |
| Buildings: masses (tile level)/warehouse (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 28 | 62 | 44 | Uint16 | 2,896 | L0 28 | 0 | not optimised |
| Buildings: masses (tile level)/commercial low (small lot 12 x 16 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 28 | 56 | 44 | Uint16 | 2,632 | L0 28 | 0 | not optimised |
| Buildings: masses (tile level)/commercial medium (small lot 12 x 16 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 28 | 56 | 44 | Uint16 | 2,632 | L0 28 | 0 | not optimised |
| Buildings: masses (tile level)/house (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 26 | 54 | 44 | Uint16 | 2,532 | L0 26 | 0 | not optimised |
| Buildings: masses (tile level)/rowhouse (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 26 | 54 | 44 | Uint16 | 2,532 | L0 26 | 0 | not optimised |
| Buildings: masses (tile level)/mixed (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 26 | 54 | 44 | Uint16 | 2,532 | L0 26 | 0 | not optimised |
| Buildings: masses (tile level)/house (homes)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 26 | 54 | 44 | Uint16 | 2,532 | L0 26 | 0 | not optimised |
| Buildings: masses (tile level)/bakery (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 26 | 54 | 44 | Uint16 | 2,532 | L0 26 | 0 | not optimised |
| Buildings: masses (tile level)/club (leisure)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 26 | 54 | 44 | Uint16 | 2,532 | L0 26 | 0 | not optimised |
| Buildings: masses (tile level)/townhouse (homes)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 24 | 50 | 44 | Uint16 | 2,344 | L0 24 | 0 | not optimised |
| Buildings: masses (tile level)/library (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 24 | 48 | 44 | Uint16 | 2,256 | L0 24 | 0 | not optimised |
| Buildings: masses (tile level)/block (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (tile level)/shop (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (tile level)/office (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (tile level)/courthouse (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (tile level)/postOffice (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (tile level)/museum (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (tile level)/shop (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (tile level)/bank (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (tile level)/bar (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (tile level)/hotel (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (tile level)/office (work)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (tile level)/commercial high (small lot 12 x 16 m (office))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (tile level)/industrial medium (large lot 40 x 36 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 46 | 44 | Uint16 | 2,156 | L0 22 | 0 | not optimised |
| Buildings: masses (tile level)/industrial high (medium lot 24 x 26 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 46 | 44 | Uint16 | 2,156 | L0 22 | 0 | not optimised |
| Buildings: masses (tile level)/industrial high (large lot 40 x 36 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 46 | 44 | Uint16 | 2,156 | L0 22 | 0 | not optimised |
| Buildings: masses (tile level)/police (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 20 | 40 | 44 | Uint16 | 1,880 | L0 20 | 0 | not optimised |
| Buildings: masses (tile level)/apartments (homes)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 36 | 44 | Uint16 | 1,692 | L0 18 | 0 | not optimised |
| Buildings: masses (tile level)/clinic (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 36 | 44 | Uint16 | 1,692 | L0 18 | 0 | not optimised |
| Buildings: masses (tile level)/cemetery (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 38 | 44 | Uint16 | 1,780 | L0 18 | 0 | not optimised |
| Buildings: masses (tile level)/industrial low (small lot 12 x 16 m (warehouse))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 38 | 44 | Uint16 | 1,780 | L0 18 | 0 | not optimised |
| Buildings: masses (tile level)/industrial medium (small lot 12 x 16 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 38 | 44 | Uint16 | 1,780 | L0 18 | 0 | not optimised |
| Buildings: masses (tile level)/industrial high (small lot 12 x 16 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 38 | 44 | Uint16 | 1,780 | L0 18 | 0 | not optimised |
| Buildings: masses (tile level)/busStation (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 16 | 32 | 44 | Uint16 | 1,504 | L0 16 | 0 | not optimised |
| Buildings: masses (tile level)/supermarket (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 16 | 32 | 44 | Uint16 | 1,504 | L0 16 | 0 | not optimised |
| Buildings: masses (tile level)/restaurant (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 16 | 32 | 44 | Uint16 | 1,504 | L0 16 | 0 | not optimised |
| Buildings: masses (tile level)/gasStation (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 16 | 32 | 44 | Uint16 | 1,504 | L0 16 | 0 | not optimised |
| Buildings: masses (tile level)/warehouse (work)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 16 | 34 | 44 | Uint16 | 1,592 | L0 16 | 2 | not optimised |
| Buildings: masses (tile level)/pharmacy (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 14 | 28 | 44 | Uint16 | 1,316 | L0 14 | 0 | not optimised |
| Buildings: masses (tile level)/nightclub (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 14 | 28 | 44 | Uint16 | 1,316 | L0 14 | 0 | not optimised |
| Buildings: masses (tile level)/cinema (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 14 | 28 | 44 | Uint16 | 1,316 | L0 14 | 0 | not optimised |
| Buildings: masses (tile level)/gym (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 14 | 28 | 44 | Uint16 | 1,316 | L0 14 | 0 | not optimised |
| Buildings: masses (tile level)/snackBar (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 12 | 24 | 44 | Uint16 | 1,128 | L0 12 | 0 | not optimised |
| Buildings: masses (tile level)/square (leisure)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 2 | 4 | 44 | Uint16 | 188 | L0 2 | 0 | not optimised |
| Buildings: masses (tile level)/playground (leisure)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 2 | 4 | 44 | Uint16 | 188 | L0 2 | 0 | not optimised |
| Buildings: masses (tile level)/sportsCourt (leisure)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 2 | 4 | 44 | Uint16 | 188 | L0 2 | 0 | not optimised |

## Buildings: masses (plate level)

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Buildings: masses (plate level)/residential high (small lot 12 x 16 m (residentialTower))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 112 | 212 | 44 | Uint16 | 10,000 | L0 112 | 0 | not optimised |
| Buildings: masses (plate level)/residential medium (large lot 40 x 36 m (apartments))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 82 | 164 | 44 | Uint16 | 7,708 | L0 82 | 0 | not optimised |
| Buildings: masses (plate level)/residential high (medium lot 24 x 26 m (residentialTower))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 74 | 140 | 44 | Uint16 | 6,604 | L0 74 | 0 | not optimised |
| Buildings: masses (plate level)/residential high (large lot 40 x 36 m (residentialTower))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 74 | 140 | 44 | Uint16 | 6,604 | L0 74 | 0 | not optimised |
| Buildings: masses (plate level)/residential medium (medium lot 24 x 26 m (apartments))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 66 | 132 | 44 | Uint16 | 6,204 | L0 66 | 0 | not optimised |
| Buildings: masses (plate level)/courtyard (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 60 | 120 | 44 | Uint16 | 5,640 | L0 60 | 0 | not optimised |
| Buildings: masses (plate level)/university (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 56 | 112 | 44 | Uint16 | 5,264 | L0 56 | 0 | not optimised |
| Buildings: masses (plate level)/school (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 48 | 96 | 44 | Uint16 | 4,512 | L0 48 | 0 | not optimised |
| Buildings: masses (plate level)/council (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 46 | 88 | 44 | Uint16 | 4,148 | L0 46 | 0 | not optimised |
| Buildings: masses (plate level)/mall (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 44 | 88 | 44 | Uint16 | 4,136 | L0 44 | 0 | not optimised |
| Buildings: masses (plate level)/apartments (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 42 | 84 | 44 | Uint16 | 3,948 | L0 42 | 0 | not optimised |
| Buildings: masses (plate level)/prison (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 42 | 84 | 44 | Uint16 | 3,948 | L0 42 | 0 | not optimised |
| Buildings: masses (plate level)/fireStation (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 40 | 80 | 44 | Uint16 | 3,760 | L0 40 | 0 | not optimised |
| Buildings: masses (plate level)/factory (work)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 40 | 80 | 44 | Uint16 | 3,760 | L0 40 | 0 | not optimised |
| Buildings: masses (plate level)/residential medium (small lot 12 x 16 m (apartments))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 38 | 76 | 44 | Uint16 | 3,572 | L0 38 | 0 | not optimised |
| Buildings: masses (plate level)/church (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 34 | 68 | 44 | Uint16 | 3,196 | L0 34 | 0 | not optimised |
| Buildings: masses (plate level)/tower (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 32 | 64 | 44 | Uint16 | 3,008 | L0 32 | 0 | not optimised |
| Buildings: masses (plate level)/factory (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 32 | 64 | 44 | Uint16 | 3,008 | L0 32 | 0 | not optimised |
| Buildings: masses (plate level)/residentialTower (homes)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 32 | 64 | 44 | Uint16 | 3,008 | L0 32 | 0 | not optimised |
| Buildings: masses (plate level)/hospital (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 32 | 64 | 44 | Uint16 | 3,008 | L0 32 | 0 | not optimised |
| Buildings: masses (plate level)/commercial high (medium lot 24 x 26 m (office))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 32 | 64 | 44 | Uint16 | 3,008 | L0 32 | 0 | not optimised |
| Buildings: masses (plate level)/commercial high (large lot 40 x 36 m (office))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 32 | 64 | 44 | Uint16 | 3,008 | L0 32 | 0 | not optimised |
| Buildings: masses (plate level)/cityHall (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 30 | 60 | 44 | Uint16 | 2,820 | L0 30 | 0 | not optimised |
| Buildings: masses (plate level)/commercial low (medium lot 24 x 26 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 30 | 60 | 44 | Uint16 | 2,820 | L0 30 | 0 | not optimised |
| Buildings: masses (plate level)/commercial low (large lot 40 x 36 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 30 | 60 | 44 | Uint16 | 2,820 | L0 30 | 0 | not optimised |
| Buildings: masses (plate level)/commercial medium (medium lot 24 x 26 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 30 | 60 | 44 | Uint16 | 2,820 | L0 30 | 0 | not optimised |
| Buildings: masses (plate level)/commercial medium (large lot 40 x 36 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 30 | 60 | 44 | Uint16 | 2,820 | L0 30 | 0 | not optimised |
| Buildings: masses (plate level)/commercial low (small lot 12 x 16 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 28 | 56 | 44 | Uint16 | 2,632 | L0 28 | 0 | not optimised |
| Buildings: masses (plate level)/commercial medium (small lot 12 x 16 m (shop))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 28 | 56 | 44 | Uint16 | 2,632 | L0 28 | 0 | not optimised |
| Buildings: masses (plate level)/industrial low (medium lot 24 x 26 m (warehouse))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 26 | 52 | 44 | Uint16 | 2,444 | L0 26 | 0 | not optimised |
| Buildings: masses (plate level)/industrial low (large lot 40 x 36 m (warehouse))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 26 | 52 | 44 | Uint16 | 2,444 | L0 26 | 0 | not optimised |
| Buildings: masses (plate level)/library (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 24 | 48 | 44 | Uint16 | 2,256 | L0 24 | 0 | not optimised |
| Buildings: masses (plate level)/residential low (medium lot 24 x 26 m (house))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 24 | 48 | 44 | Uint16 | 2,256 | L0 24 | 0 | not optimised |
| Buildings: masses (plate level)/residential low (large lot 40 x 36 m (house))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 24 | 48 | 44 | Uint16 | 2,256 | L0 24 | 0 | not optimised |
| Buildings: masses (plate level)/block (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/house (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/rowhouse (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/shop (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/office (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/mixed (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/house (homes)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/courthouse (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/postOffice (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/museum (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/shop (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/bank (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/bakery (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/bar (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/hotel (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/club (leisure)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/office (work)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/residential low (small lot 12 x 16 m (house))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/commercial high (small lot 12 x 16 m (office))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 22 | 44 | 44 | Uint16 | 2,068 | L0 22 | 0 | not optimised |
| Buildings: masses (plate level)/townhouse (homes)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 20 | 40 | 44 | Uint16 | 1,880 | L0 20 | 0 | not optimised |
| Buildings: masses (plate level)/police (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 20 | 40 | 44 | Uint16 | 1,880 | L0 20 | 0 | not optimised |
| Buildings: masses (plate level)/apartments (homes)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 36 | 44 | Uint16 | 1,692 | L0 18 | 0 | not optimised |
| Buildings: masses (plate level)/clinic (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 36 | 44 | Uint16 | 1,692 | L0 18 | 0 | not optimised |
| Buildings: masses (plate level)/industrial medium (medium lot 24 x 26 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 36 | 44 | Uint16 | 1,692 | L0 18 | 0 | not optimised |
| Buildings: masses (plate level)/industrial medium (large lot 40 x 36 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 36 | 44 | Uint16 | 1,692 | L0 18 | 0 | not optimised |
| Buildings: masses (plate level)/industrial high (medium lot 24 x 26 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 36 | 44 | Uint16 | 1,692 | L0 18 | 0 | not optimised |
| Buildings: masses (plate level)/industrial high (large lot 40 x 36 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 18 | 36 | 44 | Uint16 | 1,692 | L0 18 | 0 | not optimised |
| Buildings: masses (plate level)/busStation (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 16 | 32 | 44 | Uint16 | 1,504 | L0 16 | 0 | not optimised |
| Buildings: masses (plate level)/supermarket (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 16 | 32 | 44 | Uint16 | 1,504 | L0 16 | 0 | not optimised |
| Buildings: masses (plate level)/restaurant (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 16 | 32 | 44 | Uint16 | 1,504 | L0 16 | 0 | not optimised |
| Buildings: masses (plate level)/gasStation (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 16 | 32 | 44 | Uint16 | 1,504 | L0 16 | 0 | not optimised |
| Buildings: masses (plate level)/cemetery (public)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 14 | 28 | 44 | Uint16 | 1,316 | L0 14 | 0 | not optimised |
| Buildings: masses (plate level)/pharmacy (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 14 | 28 | 44 | Uint16 | 1,316 | L0 14 | 0 | not optimised |
| Buildings: masses (plate level)/nightclub (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 14 | 28 | 44 | Uint16 | 1,316 | L0 14 | 0 | not optimised |
| Buildings: masses (plate level)/cinema (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 14 | 28 | 44 | Uint16 | 1,316 | L0 14 | 0 | not optimised |
| Buildings: masses (plate level)/gym (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 14 | 28 | 44 | Uint16 | 1,316 | L0 14 | 0 | not optimised |
| Buildings: masses (plate level)/industrial low (small lot 12 x 16 m (warehouse))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 14 | 28 | 44 | Uint16 | 1,316 | L0 14 | 0 | not optimised |
| Buildings: masses (plate level)/industrial medium (small lot 12 x 16 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 14 | 28 | 44 | Uint16 | 1,316 | L0 14 | 0 | not optimised |
| Buildings: masses (plate level)/industrial high (small lot 12 x 16 m (factory))/made to measure | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 14 | 28 | 44 | Uint16 | 1,316 | L0 14 | 0 | not optimised |
| Buildings: masses (plate level)/warehouse (preset)/preset | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 12 | 24 | 44 | Uint16 | 1,128 | L0 12 | 0 | not optimised |
| Buildings: masses (plate level)/snackBar (commerce)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 12 | 24 | 44 | Uint16 | 1,128 | L0 12 | 0 | not optimised |
| Buildings: masses (plate level)/warehouse (work)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 12 | 24 | 44 | Uint16 | 1,128 | L0 12 | 0 | not optimised |
| Buildings: masses (plate level)/square (leisure)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 2 | 4 | 44 | Uint16 | 188 | L0 2 | 0 | not optimised |
| Buildings: masses (plate level)/playground (leisure)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 2 | 4 | 44 | Uint16 | 188 | L0 2 | 0 | not optimised |
| Buildings: masses (plate level)/sportsCourt (leisure)/function | `src/render/buildings/massing.ts (emitMassing) + massCells.ts (cellMesh)` | 2 | 4 | 44 | Uint16 | 188 | L0 2 | 0 | not optimised |

## Buildings: part models

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Buildings: part models/bike | `src/render/buildings/kit.ts` | 240 | 344 | 36 | Uint16 | 13,824 | L0 240 | 18 | not optimised |
| Buildings: part models/railing | `src/render/buildings/kit.ts` | 222 | 444 | 32 | Uint16 | 16,284 | L0 222 · L1 12 | 11 | not optimised |
| Buildings: part models/foliage | `src/render/buildings/kit.ts` | 192 | 380 | 36 | Uint16 | 14,832 | L0 192 | 125 | not optimised |
| Buildings: part models/bush | `src/render/buildings/kit.ts` | 168 | 372 | 36 | Uint16 | 14,400 | L0 168 | 0 | not optimised |
| Buildings: part models/airer | `src/render/buildings/kit.ts` | 168 | 336 | 36 | Uint16 | 13,104 | L0 168 | 20 | not optimised |
| Buildings: part models/table | `src/render/buildings/kit.ts` | 146 | 223 | 36 | Uint16 | 8,904 | L0 146 | 8 | not optimised |
| Buildings: part models/dish | `src/render/buildings/kit.ts` | 146 | 171 | 36 | Uint16 | 7,032 | L0 146 | 3 | not optimised |
| Buildings: part models/pot | `src/render/buildings/kit.ts` | 112 | 163 | 36 | Uint16 | 6,540 | L0 112 | 42 | not optimised |
| Buildings: part models/roofRailing | `src/render/buildings/kit.ts` | 78 | 156 | 32 | Uint16 | 5,708 | L0 78 · L1 4 | 8 | not optimised |
| Buildings: part models/chair | `src/render/buildings/kit.ts` | 78 | 156 | 36 | Uint16 | 6,084 | L0 78 | 4 | not optimised |
| Buildings: part models/acUnit | `src/render/buildings/kit.ts` | 74 | 136 | 36 | Uint16 | 7,680 | L0 74 · L1 30 | 6 | not optimised |
| Buildings: part models/lounger | `src/render/buildings/kit.ts` | 66 | 132 | 36 | Uint16 | 5,148 | L0 66 | 2 | not optimised |
| Buildings: part models/door | `src/render/buildings/kit.ts` | 62 | 124 | 32 | Uint16 | 5,180 | L0 62 · L1 12 | 2 | not optimised |
| Buildings: part models/brise | `src/render/buildings/kit.ts` | 60 | 144 | 32 | Uint16 | 6,264 | L0 60 · L1 24 | 0 | not optimised |
| Buildings: part models/frame | `src/render/buildings/kit.ts` | 56 | 144 | 32 | Uint16 | 5,100 | L0 56 · L1 2 | 4 | not optimised |
| Buildings: part models/louvre | `src/render/buildings/kit.ts` | 52 | 144 | 32 | Uint16 | 5,760 | L0 52 · L1 12 | 0 | not optimised |
| Buildings: part models/awning | `src/render/buildings/kit.ts` | 24 | 48 | 32 | Uint16 | 1,680 | L0 24 | 4 | not optimised |
| Buildings: part models/column | `src/render/buildings/kit.ts` | 24 | 26 | 32 | Uint16 | 976 | L0 24 | 0 | not optimised |
| Buildings: part models/concrete | `src/render/buildings/kit.ts` | 12 | 24 | 32 | Uint16 | 980 | L0 12 · L1 2 | 0 | not optimised |
| Buildings: part models/shutter | `src/render/buildings/kit.ts` | 12 | 24 | 32 | Uint16 | 840 | L0 12 | 0 | not optimised |
| Buildings: part models/water | `src/render/buildings/kit.ts` | 12 | 24 | 32 | Uint16 | 980 | L0 12 · L1 2 | 0 | not optimised |
| Buildings: part models/lamp | `src/render/buildings/kit.ts` | 12 | 24 | 32 | Uint16 | 840 | L0 12 | 0 | not optimised |
| Buildings: part models/fin | `src/render/buildings/kit.ts` | 12 | 24 | 32 | Uint16 | 980 | L0 12 · L1 2 | 0 | not optimised |
| Buildings: part models/glassRail | `src/render/buildings/kit.ts` | 12 | 24 | 32 | Uint16 | 840 | L0 12 | 0 | not optimised |
| Buildings: part models/lotBox | `src/render/buildings/kit.ts` | 10 | 20 | 44 | Uint16 | 1,128 | L0 10 · L1 2 | 0 | not optimised |
| Buildings: part models/lotSlab | `src/render/buildings/kit.ts` | 10 | 20 | 44 | Uint16 | 1,128 | L0 10 · L1 2 | 0 | not optimised |
| Buildings: part models/lotRail | `src/render/buildings/kit.ts` | 8 | 16 | 44 | Uint16 | 940 | L0 8 · L1 2 | 0 | not optimised |
| Buildings: part models/lotSides | `src/render/buildings/kit.ts` | 8 | 16 | 44 | Uint16 | 752 | L0 8 · L1 0 | 0 | not optimised |
| Buildings: part models/glass | `src/render/buildings/kit.ts` | 2 | 4 | 32 | Uint16 | 140 | L0 2 | 0 | not optimised |
| Buildings: part models/glassDark | `src/render/buildings/kit.ts` | 2 | 4 | 32 | Uint16 | 140 | L0 2 | 0 | not optimised |
| Buildings: part models/wash | `src/render/buildings/kit.ts` | 2 | 4 | 32 | Uint16 | 140 | L0 2 | 0 | not optimised |

## Low-poly plant models

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Low-poly plant models/palm | `src/render/lowPolyTrees.ts` | 480 | 930 | 52 | none + Uint16 | 38,280 | L0 480 | 83 | not optimised |
| Low-poly plant models/oak | `src/render/lowPolyTrees.ts` | 282 | 766 | 52 | none + Uint16 | 30,616 | L0 282 | 0 | not optimised |
| Low-poly plant models/ipeYellow | `src/render/lowPolyTrees.ts` | 240 | 612 | 52 | none + Uint16 | 26,136 | L0 240 | 0 | not optimised |
| Low-poly plant models/ipePink | `src/render/lowPolyTrees.ts` | 240 | 612 | 52 | none + Uint16 | 26,136 | L0 240 | 0 | not optimised |
| Low-poly plant models/broadleafTall | `src/render/lowPolyTrees.ts` | 180 | 472 | 52 | none + Uint16 | 19,576 | L0 180 | 0 | not optimised |
| Low-poly plant models/cypress | `src/render/lowPolyTrees.ts` | 158 | 334 | 52 | none + Uint16 | 17,344 | L0 158 | 0 | not optimised |
| Low-poly plant models/hedge | `src/render/lowPolyTrees.ts` | 120 | 320 | 52 | none + Uint16 | 13,040 | L0 120 | 0 | not optimised |
| Low-poly plant models/bush | `src/render/lowPolyTrees.ts` | 112 | 304 | 52 | none + Uint16 | 12,160 | L0 112 | 0 | not optimised |
| Low-poly plant models/bushFlowering | `src/render/lowPolyTrees.ts` | 112 | 304 | 52 | none + Uint16 | 12,160 | L0 112 | 0 | not optimised |

## Ecosystem trees

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Ecosystem trees/palm/5 | `src/render/natureTrees.ts` | 480 | 930 | 52 | none + Uint16 | 38,280 | L0 480 | 91 | not optimised |
| Ecosystem trees/palm/6 | `src/render/natureTrees.ts` | 480 | 930 | 52 | none + Uint16 | 38,280 | L0 480 | 80 | not optimised |
| Ecosystem trees/oak/1 | `src/render/natureTrees.ts` | 282 | 766 | 52 | none + Uint16 | 30,616 | L0 282 | 0 | not optimised |
| Ecosystem trees/oak/2 | `src/render/natureTrees.ts` | 282 | 766 | 52 | none + Uint16 | 30,616 | L0 282 | 0 | not optimised |
| Ecosystem trees/cypress/3 | `src/render/natureTrees.ts` | 158 | 334 | 52 | none + Uint16 | 17,344 | L0 158 | 0 | not optimised |
| Ecosystem trees/cypress/4 | `src/render/natureTrees.ts` | 158 | 334 | 52 | none + Uint16 | 17,344 | L0 158 | 0 | not optimised |
| Ecosystem trees/oak far picture (impostor)/1 | `src/render/plantImpostors.ts` | 2 | 4 | 48 | Uint16 | 204 | L0 2 | 0 | not optimised |
| Ecosystem trees/oak far picture (impostor)/2 | `src/render/plantImpostors.ts` | 2 | 4 | 48 | Uint16 | 204 | L0 2 | 0 | not optimised |
| Ecosystem trees/cypress far picture (impostor)/3 | `src/render/plantImpostors.ts` | 2 | 4 | 48 | Uint16 | 204 | L0 2 | 0 | not optimised |
| Ecosystem trees/cypress far picture (impostor)/4 | `src/render/plantImpostors.ts` | 2 | 4 | 48 | Uint16 | 204 | L0 2 | 0 | not optimised |
| Ecosystem trees/palm far picture (impostor)/5 | `src/render/plantImpostors.ts` | 2 | 4 | 48 | Uint16 | 204 | L0 2 | 0 | not optimised |
| Ecosystem trees/palm far picture (impostor)/6 | `src/render/plantImpostors.ts` | 2 | 4 | 48 | Uint16 | 204 | L0 2 | 0 | not optimised |

## Street furniture

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Street furniture/phone | `src/render/propGeometry.ts` | 560 | 401 | 36 | Uint16 | 17,796 | L0 560 | 240 | not optimised |
| Street furniture/bin | `src/render/propGeometry.ts` | 182 | 237 | 36 | Uint16 | 9,624 | L0 182 | 14 | not optimised |
| Street furniture/bench | `src/render/propGeometry.ts` | 164 | 328 | 36 | Uint16 | 12,792 | L0 164 | 10 | not optimised |
| Street furniture/hydrant | `src/render/propGeometry.ts` | 164 | 243 | 36 | Uint16 | 9,732 | L0 164 | 23 | not optimised |
| Street furniture/lamp light beam (night) | `src/render/scenery.ts` | 144 | 95 | 32 | Uint16 | 3,904 | L0 144 | 0 | not optimised |
| Street furniture/lamp | `src/render/propGeometry.ts` | 132 | 200 | 36 | Uint16 | 10,308 | L0 132 · L1 32 | 19 | not optimised |
| Street furniture/drain | `src/render/propGeometry.ts` | 108 | 216 | 36 | Uint16 | 8,424 | L0 108 | 56 | not optimised |
| Street furniture/postbox | `src/render/propGeometry.ts` | 92 | 164 | 36 | Uint16 | 6,456 | L0 92 | 2 | not optimised |
| Street furniture/tree pit | `src/render/scenery.ts` | 90 | 190 | 36 | Uint16 | 7,380 | L0 90 | 32 | not optimised |
| Street furniture/wildflower | `src/render/scenery.ts` | 40 | 94 | 36 | Uint16 | 3,624 | L0 40 | 0 | not optimised |
| Street furniture/grass tuft | `src/render/scenery.ts` | 35 | 49 | 36 | Uint16 | 1,974 | L0 35 | 19 | not optimised |
| Street furniture/lamp light pool (night) | `src/render/scenery.ts` | 28 | 30 | 32 | Uint16 | 1,128 | L0 28 | 0 | not optimised |
| Street furniture/lamp lens | `src/render/scenery.ts` | 2 | 4 | 36 | Uint16 | 156 | L0 2 | 0 | not optimised |

## Forest trees (painted woods)

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Forest trees (painted woods)/broadleaf/1 | `src/render/groundCover.ts` | 282 | 766 | 52 | none + Uint16 | 30,616 | L0 282 | 1 | not optimised |
| Forest trees (painted woods)/broadleaf/2 | `src/render/groundCover.ts` | 282 | 766 | 52 | none + Uint16 | 30,616 | L0 282 | 10 | not optimised |
| Forest trees (painted woods)/ipeYellow/1 | `src/render/groundCover.ts` | 240 | 612 | 52 | none + Uint16 | 26,136 | L0 240 | 0 | not optimised |
| Forest trees (painted woods)/ipePink/1 | `src/render/groundCover.ts` | 240 | 612 | 52 | none + Uint16 | 26,136 | L0 240 | 0 | not optimised |
| Forest trees (painted woods)/broadleafTall/1 | `src/render/groundCover.ts` | 180 | 472 | 52 | none + Uint16 | 19,576 | L0 180 | 0 | not optimised |
| Forest trees (painted woods)/broadleafTall/2 | `src/render/groundCover.ts` | 180 | 472 | 52 | none + Uint16 | 19,576 | L0 180 | 0 | not optimised |
| Forest trees (painted woods)/conifer/1 | `src/render/groundCover.ts` | 158 | 334 | 52 | none + Uint16 | 17,344 | L0 158 | 0 | not optimised |
| Forest trees (painted woods)/conifer/2 | `src/render/groundCover.ts` | 158 | 334 | 52 | none + Uint16 | 17,344 | L0 158 | 0 | not optimised |

## Traffic signals

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Traffic signals/signalised junction/4 heads (post, arm, housing, visors, lenses, halos) | `src/render/signals.ts (createSignalHeads, sync)` | 1,648 | 2,516 | 72 | Uint16 | 10,904 | L0 1,648 | 0 | not optimised |

## Street trees and bushes

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Street trees and bushes/broadleaf | `src/render/propGeometry.ts (treeParts)` | 282 | 766 | 52 | none + Uint16 | 30,616 | L0 282 | 0 | not optimised |
| Street trees and bushes/ipeYellow | `src/render/propGeometry.ts (treeParts)` | 240 | 612 | 52 | none + Uint16 | 26,136 | L0 240 | 0 | not optimised |
| Street trees and bushes/ipePink | `src/render/propGeometry.ts (treeParts)` | 240 | 612 | 52 | none + Uint16 | 26,136 | L0 240 | 0 | not optimised |
| Street trees and bushes/broadleafTall | `src/render/propGeometry.ts (treeParts)` | 180 | 472 | 52 | none + Uint16 | 19,576 | L0 180 | 3 | not optimised |
| Street trees and bushes/conifer | `src/render/propGeometry.ts (treeParts)` | 158 | 334 | 52 | none + Uint16 | 17,344 | L0 158 | 0 | not optimised |
| Street trees and bushes/hedge | `src/render/propGeometry.ts (bushParts)` | 120 | 320 | 52 | none + Uint16 | 13,040 | L0 120 | 0 | not optimised |
| Street trees and bushes/bush | `src/render/propGeometry.ts (bushParts)` | 112 | 304 | 52 | none + Uint16 | 12,160 | L0 112 | 0 | not optimised |
| Street trees and bushes/bushFlowering | `src/render/propGeometry.ts (bushParts)` | 112 | 304 | 52 | none + Uint16 | 12,160 | L0 112 | 0 | not optimised |

## Buildings: base (farthest level)

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Buildings: base (farthest level)/residential high (small lot 12 x 16 m (residentialTower))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 76 | 56 | 24 | Uint16 | 1,800 | L0 76 | 0 | not optimised |
| Buildings: base (farthest level)/residential high (medium lot 24 x 26 m (residentialTower))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 54 | 40 | 24 | Uint16 | 1,284 | L0 54 | 0 | not optimised |
| Buildings: base (farthest level)/residential high (large lot 40 x 36 m (residentialTower))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 54 | 40 | 24 | Uint16 | 1,284 | L0 54 | 0 | not optimised |
| Buildings: base (farthest level)/courtyard (preset)/preset | `src/render/buildings/massBase.ts (emitBase)` | 40 | 32 | 24 | Uint16 | 1,008 | L0 40 | 0 | not optimised |
| Buildings: base (farthest level)/council (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 34 | 28 | 24 | Uint16 | 876 | L0 34 | 0 | not optimised |
| Buildings: base (farthest level)/school (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 32 | 28 | 24 | Uint16 | 864 | L0 32 | 0 | not optimised |
| Buildings: base (farthest level)/university (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 30 | 24 | 24 | Uint16 | 756 | L0 30 | 0 | not optimised |
| Buildings: base (farthest level)/factory (work)/function | `src/render/buildings/massBase.ts (emitBase)` | 30 | 24 | 24 | Uint16 | 756 | L0 30 | 0 | not optimised |
| Buildings: base (farthest level)/cityHall (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 22 | 20 | 24 | Uint16 | 612 | L0 22 | 0 | not optimised |
| Buildings: base (farthest level)/prison (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 22 | 20 | 24 | Uint16 | 612 | L0 22 | 0 | not optimised |
| Buildings: base (farthest level)/church (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 22 | 20 | 24 | Uint16 | 612 | L0 22 | 0 | not optimised |
| Buildings: base (farthest level)/tower (preset)/preset | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/factory (preset)/preset | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/residentialTower (homes)/function | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/fireStation (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/hospital (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/mall (commerce)/function | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 2 | not optimised |
| Buildings: base (farthest level)/residential low (small lot 12 x 16 m (house))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 5 | not optimised |
| Buildings: base (farthest level)/residential low (medium lot 24 x 26 m (house))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 4 | not optimised |
| Buildings: base (farthest level)/residential low (large lot 40 x 36 m (house))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 4 | not optimised |
| Buildings: base (farthest level)/residential medium (medium lot 24 x 26 m (apartments))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/residential medium (large lot 40 x 36 m (apartments))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/commercial low (medium lot 24 x 26 m (shop))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/commercial low (large lot 40 x 36 m (shop))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/commercial medium (medium lot 24 x 26 m (shop))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/commercial medium (large lot 40 x 36 m (shop))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/commercial high (medium lot 24 x 26 m (office))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/commercial high (large lot 40 x 36 m (office))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/industrial low (medium lot 24 x 26 m (warehouse))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/industrial low (large lot 40 x 36 m (warehouse))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/industrial medium (medium lot 24 x 26 m (factory))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/industrial medium (large lot 40 x 36 m (factory))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/industrial high (medium lot 24 x 26 m (factory))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/industrial high (large lot 40 x 36 m (factory))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 20 | 16 | 24 | Uint16 | 504 | L0 20 | 0 | not optimised |
| Buildings: base (farthest level)/club (leisure)/function | `src/render/buildings/massBase.ts (emitBase)` | 14 | 16 | 24 | Uint16 | 468 | L0 14 | 0 | not optimised |
| Buildings: base (farthest level)/police (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 12 | 12 | 24 | Uint16 | 360 | L0 12 | 0 | not optimised |
| Buildings: base (farthest level)/library (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 12 | 12 | 24 | Uint16 | 360 | L0 12 | 0 | not optimised |
| Buildings: base (farthest level)/busStation (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 12 | 12 | 24 | Uint16 | 360 | L0 12 | 0 | not optimised |
| Buildings: base (farthest level)/supermarket (commerce)/function | `src/render/buildings/massBase.ts (emitBase)` | 12 | 12 | 24 | Uint16 | 360 | L0 12 | 0 | not optimised |
| Buildings: base (farthest level)/gasStation (commerce)/function | `src/render/buildings/massBase.ts (emitBase)` | 12 | 12 | 24 | Uint16 | 360 | L0 12 | 0 | not optimised |
| Buildings: base (farthest level)/warehouse (work)/function | `src/render/buildings/massBase.ts (emitBase)` | 12 | 12 | 24 | Uint16 | 360 | L0 12 | 0 | not optimised |
| Buildings: base (farthest level)/block (preset)/preset | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/house (preset)/preset | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/rowhouse (preset)/preset | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/apartments (preset)/preset | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/shop (preset)/preset | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/office (preset)/preset | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/mixed (preset)/preset | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/warehouse (preset)/preset | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/house (homes)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/townhouse (homes)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/apartments (homes)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/courthouse (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/postOffice (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/clinic (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/museum (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/cemetery (public)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/shop (commerce)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/bank (commerce)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/pharmacy (commerce)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/bakery (commerce)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/restaurant (commerce)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/snackBar (commerce)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/bar (commerce)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/nightclub (commerce)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/cinema (commerce)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/hotel (commerce)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/gym (commerce)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/office (work)/function | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/residential medium (small lot 12 x 16 m (apartments))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/commercial low (small lot 12 x 16 m (shop))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/commercial medium (small lot 12 x 16 m (shop))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/commercial high (small lot 12 x 16 m (office))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/industrial low (small lot 12 x 16 m (warehouse))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/industrial medium (small lot 12 x 16 m (factory))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/industrial high (small lot 12 x 16 m (factory))/made to measure | `src/render/buildings/massBase.ts (emitBase)` | 10 | 8 | 24 | Uint16 | 252 | L0 10 | 0 | not optimised |
| Buildings: base (farthest level)/square (leisure)/function | `src/render/buildings/massBase.ts (emitBase)` | 2 | 4 | 24 | Uint16 | 108 | L0 2 | 0 | not optimised |
| Buildings: base (farthest level)/playground (leisure)/function | `src/render/buildings/massBase.ts (emitBase)` | 2 | 4 | 24 | Uint16 | 108 | L0 2 | 0 | not optimised |
| Buildings: base (farthest level)/sportsCourt (leisure)/function | `src/render/buildings/massBase.ts (emitBase)` | 2 | 4 | 24 | Uint16 | 108 | L0 2 | 0 | not optimised |

## Transit

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Transit/train track and station/140 m of track | `src/render/transit.ts (createTransit, sync)` | 996 | 1,992 | 64 | Uint16 | 22,264 | L0 996 | 0 | not optimised |
| Transit/bus stop/on the footway's edge | `src/render/transit.ts (createTransit, sync)` | 72 | 144 | 64 | Uint16 | 11,552 | L0 72 | 0 | not optimised |
| Transit/metro track and station/140 m of track, its way down | `src/render/transit.ts (createTransit, sync)` | 48 | 96 | 64 | Uint16 | 11,552 | L0 48 | 0 | not optimised |
| Transit/transit-trains | `src/render/transit.ts` | 12 | 24 | 32 | Uint16 | 840 | L0 12 | 0 | not optimised |

## Roads: network far level

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Roads: network far level/highway four-way junction/140 m | `src/render/networkFarRoads.ts (farRoadInput) + src/render/networkFarRoadsBuild.ts (buildFarRoadCells)` | 188 | 204 | 36 | Uint32 | 9,600 | L0 188 | 0 | not optimised |
| Roads: network far level/boulevard four-way junction/140 m | `src/render/networkFarRoads.ts (farRoadInput) + src/render/networkFarRoadsBuild.ts (buildFarRoadCells)` | 168 | 184 | 36 | Uint32 | 8,640 | L0 168 | 0 | not optimised |
| Roads: network far level/local four-way junction/140 m | `src/render/networkFarRoads.ts (farRoadInput) + src/render/networkFarRoadsBuild.ts (buildFarRoadCells)` | 164 | 180 | 36 | Uint32 | 8,448 | L0 164 | 0 | not optimised |
| Roads: network far level/avenue four-way junction/140 m | `src/render/networkFarRoads.ts (farRoadInput) + src/render/networkFarRoadsBuild.ts (buildFarRoadCells)` | 152 | 168 | 36 | Uint32 | 7,872 | L0 152 | 0 | not optimised |
| Roads: network far level/ramp four-way junction/140 m | `src/render/networkFarRoads.ts (farRoadInput) + src/render/networkFarRoadsBuild.ts (buildFarRoadCells)` | 144 | 160 | 36 | Uint32 | 7,488 | L0 144 | 0 | not optimised |
| Roads: network far level/urban four-way junction/140 m | `src/render/networkFarRoads.ts (farRoadInput) + src/render/networkFarRoadsBuild.ts (buildFarRoadCells)` | 120 | 136 | 36 | Uint32 | 6,336 | L0 120 | 0 | not optimised |
| Roads: network far level/local straight/140 m | `src/render/networkFarRoads.ts (farRoadInput) + src/render/networkFarRoadsBuild.ts (buildFarRoadCells)` | 16 | 32 | 36 | Uint32 | 1,344 | L0 16 | 0 | not optimised |
| Roads: network far level/urban straight/140 m | `src/render/networkFarRoads.ts (farRoadInput) + src/render/networkFarRoadsBuild.ts (buildFarRoadCells)` | 16 | 32 | 36 | Uint32 | 1,344 | L0 16 | 0 | not optimised |
| Roads: network far level/avenue straight/140 m | `src/render/networkFarRoads.ts (farRoadInput) + src/render/networkFarRoadsBuild.ts (buildFarRoadCells)` | 16 | 32 | 36 | Uint32 | 1,344 | L0 16 | 0 | not optimised |
| Roads: network far level/boulevard straight/140 m | `src/render/networkFarRoads.ts (farRoadInput) + src/render/networkFarRoadsBuild.ts (buildFarRoadCells)` | 16 | 32 | 36 | Uint32 | 1,344 | L0 16 | 0 | not optimised |
| Roads: network far level/highway straight/140 m | `src/render/networkFarRoads.ts (farRoadInput) + src/render/networkFarRoadsBuild.ts (buildFarRoadCells)` | 16 | 32 | 36 | Uint32 | 1,344 | L0 16 | 0 | not optimised |
| Roads: network far level/ramp straight/140 m | `src/render/networkFarRoads.ts (farRoadInput) + src/render/networkFarRoadsBuild.ts (buildFarRoadCells)` | 16 | 32 | 36 | Uint32 | 1,344 | L0 16 | 0 | not optimised |

## Utility poles

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Utility poles/pole span/two poles (one with a lamp), their wires | `src/render/poleLayer.ts (buildUtilities)` | 642 | 887 | 56 | Uint16 | 18,896 | L0 642 | 0 | not optimised |
| Utility poles/utility-lamp-beams | `src/render/utilities.ts (polePartSpecs)` | 144 | 95 | 32 | Uint16 | 3,904 | L0 144 | 0 | not optimised |
| Utility poles/utility-transformers | `src/render/utilities.ts (polePartSpecs)` | 56 | 88 | 32 | Uint16 | 3,152 | L0 56 | 0 | not optimised |
| Utility poles/utility-caps | `src/render/utilities.ts (polePartSpecs)` | 40 | 64 | 32 | Uint16 | 2,288 | L0 40 | 0 | not optimised |
| Utility poles/utility-insulators | `src/render/utilities.ts (polePartSpecs)` | 30 | 43 | 32 | Uint16 | 1,556 | L0 30 | 0 | not optimised |
| Utility poles/utility-lamp-pools | `src/render/utilities.ts (polePartSpecs)` | 28 | 30 | 32 | Uint16 | 1,128 | L0 28 | 0 | not optimised |
| Utility poles/utility-poles | `src/render/utilities.ts (polePartSpecs)` | 24 | 26 | 32 | Uint16 | 1,788 | L0 24 · L1 12 · L2 6 | 0 | not optimised |
| Utility poles/utility-arms | `src/render/utilities.ts (polePartSpecs)` | 12 | 24 | 32 | Uint16 | 840 | L0 12 | 0 | not optimised |
| Utility poles/utility-braces | `src/render/utilities.ts (polePartSpecs)` | 12 | 24 | 32 | Uint16 | 840 | L0 12 | 0 | not optimised |
| Utility poles/utility-lamp-arms | `src/render/utilities.ts (polePartSpecs)` | 12 | 24 | 32 | Uint16 | 840 | L0 12 | 0 | not optimised |
| Utility poles/utility-lamp-heads | `src/render/utilities.ts (polePartSpecs)` | 12 | 24 | 32 | Uint16 | 840 | L0 12 | 0 | not optimised |
| Utility poles/utility-lamp-lenses | `src/render/utilities.ts (polePartSpecs)` | 2 | 4 | 32 | Uint16 | 140 | L0 2 | 0 | not optimised |

## Sky

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Sky/sky/dome | `src/render/environment.ts:149` | 960 | 561 | 32 | Uint16 | 23,712 | L0 960 | 0 | not optimised |

## Flags

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Flags/flag cloth/1.8 x 1.2 m | `src/render/buildings/flagLayer.ts (createFlagLayer, set)` | 576 | 325 | 32 | Uint16 | 13,900 | L0 576 | 0 | not optimised |

## Ground cover

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Ground cover/scrub/1 | `src/render/groundCover.ts` | 60 | 180 | 36 | none | 6,480 | L0 60 | 21 | not optimised |
| Ground cover/scrub/2 | `src/render/groundCover.ts` | 60 | 180 | 36 | none | 6,480 | L0 60 | 18 | not optimised |
| Ground cover/scrub/3 | `src/render/groundCover.ts` | 60 | 180 | 36 | none | 6,480 | L0 60 | 25 | not optimised |
| Ground cover/scrub/4 | `src/render/groundCover.ts` | 60 | 180 | 36 | none | 6,480 | L0 60 | 21 | not optimised |
| Ground cover/rock/1 | `src/render/groundCover.ts` | 36 | 108 | 44 | none | 4,752 | L0 36 | 0 | not optimised |
| Ground cover/rock/2 | `src/render/groundCover.ts` | 36 | 108 | 44 | none | 4,752 | L0 36 | 0 | not optimised |
| Ground cover/rock/3 | `src/render/groundCover.ts` | 36 | 108 | 44 | none | 4,752 | L0 36 | 0 | not optimised |
| Ground cover/rock/4 | `src/render/groundCover.ts` | 36 | 108 | 44 | none | 4,752 | L0 36 | 0 | not optimised |
| Ground cover/rock/5 | `src/render/groundCover.ts` | 36 | 108 | 44 | none | 4,752 | L0 36 | 0 | not optimised |

## Signs

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Signs/street name/both ends of a street at a junction | `src/render/signLayer.ts (createSignLayer, sync)` | 56 | 94 | 64 | Uint16 + none | 15,600 | L0 56 | 0 | not optimised |
| Signs/street/with text "Main St 50" | `src/render/signLayer.ts (createSignLayer, sync)` | 28 | 47 | 64 | Uint16 + none | 15,600 | L0 28 | 0 | not optimised |
| Signs/stop/one sign | `src/render/signLayer.ts (createSignLayer, sync)` | 26 | 41 | 64 | Uint16 + none | 15,600 | L0 26 | 0 | not optimised |
| Signs/yield/one sign | `src/render/signLayer.ts (createSignLayer, sync)` | 26 | 41 | 64 | Uint16 + none | 15,600 | L0 26 | 0 | not optimised |
| Signs/speed/with text "Main St 50" | `src/render/signLayer.ts (createSignLayer, sync)` | 26 | 41 | 64 | Uint16 + none | 15,600 | L0 26 | 0 | not optimised |
| Signs/noParking/one sign | `src/render/signLayer.ts (createSignLayer, sync)` | 26 | 41 | 64 | Uint16 + none | 15,600 | L0 26 | 0 | not optimised |
| Signs/noEntry/one sign | `src/render/signLayer.ts (createSignLayer, sync)` | 26 | 41 | 64 | Uint16 + none | 15,600 | L0 26 | 0 | not optimised |
| Signs/pedestrian/one sign | `src/render/signLayer.ts (createSignLayer, sync)` | 26 | 41 | 64 | Uint16 + none | 15,600 | L0 26 | 0 | not optimised |
| Signs/school/one sign | `src/render/signLayer.ts (createSignLayer, sync)` | 26 | 41 | 64 | Uint16 + none | 15,600 | L0 26 | 0 | not optimised |
| Signs/direction/with text "Main St 50" | `src/render/signLayer.ts (createSignLayer, sync)` | 26 | 41 | 64 | Uint16 + none | 15,600 | L0 26 | 0 | not optimised |
| Signs/info/with text "Main St 50" | `src/render/signLayer.ts (createSignLayer, sync)` | 26 | 41 | 64 | Uint16 + none | 15,600 | L0 26 | 0 | not optimised |
| Signs/junction signs/what a four-way junction stands of itself | `src/render/signLayer.ts (createSignLayer, sync)` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |

## Effects

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| Effects/gore | `src/render/gore.ts` | 212 | 238 | 32 | Uint16 | 8,888 | L0 212 | 0 | not optimised |
| Effects/casualty decals | `src/render/casualties.ts` | 60 | 66 | 32 | Uint16 | 824 | L0 60 | 0 | not optimised |
| Effects/blob shadow | `src/render/blobShadows.ts` | 10 | 11 | 40 | Uint16 | 500 | L0 10 | 0 | not optimised |
| Effects/exhaust smoke | `src/render/exhaust.ts` | 0 | 3,999 | 32 | none | 128,000 | L0 0 | n/a | not optimised |
| Effects/rain | `src/render/rain.ts` | 0 | 19,998 | 16 | none | 320,000 | L0 0 | n/a | not optimised |
| Effects/lightning | `src/render/lightning.ts` | 0 | 8 | 44 | Uint16 | 220 | L0 0 | n/a | not optimised |

## People: held props

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| People: held props/cup | `src/render/people/heldProps.ts` | 96 | 288 | 36 | none | 10,368 | L0 96 | 24 | not optimised |
| People: held props/camera | `src/render/people/heldProps.ts` | 52 | 156 | 36 | none | 5,616 | L0 52 | 12 | not optimised |
| People: held props/umbrella | `src/render/people/heldProps.ts` | 40 | 120 | 36 | none | 4,320 | L0 40 | 6 | not optimised |
| People: held props/newspaper | `src/render/people/heldProps.ts` | 24 | 72 | 36 | none | 2,592 | L0 24 | 8 | not optimised |
| People: held props/bag | `src/render/people/heldProps.ts` | 24 | 72 | 36 | none | 2,592 | L0 24 | 0 | not optimised |
| People: held props/box | `src/render/people/heldProps.ts` | 24 | 72 | 36 | none | 2,592 | L0 24 | 4 | not optimised |
| People: held props/phone | `src/render/people/heldProps.ts` | 12 | 36 | 36 | none | 1,296 | L0 12 | 0 | not optimised |

## People: cast (cooked)

| Object | Source | Triangles | Vertices | Bytes/vertex | Index | Geometry bytes | Levels (triangles) | Hidden | Status |
|---|---|---|---|---|---|---|---|---|---|
| People: cast (cooked)/mh_34 | `cooked/people/mh_34.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
| People: cast (cooked)/mh_55 | `cooked/people/mh_55.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
| People: cast (cooked)/mh_44 | `cooked/people/mh_44.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
| People: cast (cooked)/mh_48 | `cooked/people/mh_48.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
| People: cast (cooked)/mh_14 | `cooked/people/mh_14.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
| People: cast (cooked)/mh_64 | `cooked/people/mh_64.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
| People: cast (cooked)/mh_00 | `cooked/people/mh_00.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
| People: cast (cooked)/mh_08 | `cooked/people/mh_08.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
| People: cast (cooked)/mh_38 | `cooked/people/mh_38.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
| People: cast (cooked)/mh_59 | `cooked/people/mh_59.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
| People: cast (cooked)/mh_45 | `cooked/people/mh_45.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
| People: cast (cooked)/mh_51 | `cooked/people/mh_51.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
| People: cast (cooked)/mh_18 | `cooked/people/mh_18.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
| People: cast (cooked)/mh_67 | `cooked/people/mh_67.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
| People: cast (cooked)/mh_04 | `cooked/people/mh_04.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
| People: cast (cooked)/mh_11 | `cooked/people/mh_11.bin` | 0 | 0 | 0 | none | 0 |  | 0 | not optimised |
