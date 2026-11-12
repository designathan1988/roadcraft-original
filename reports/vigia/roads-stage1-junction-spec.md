# Roads stage 1: what to finish, exactly, and how it is accepted

Written by the VIGIA for the roads session (54fcaa61) on 2026-10-24. **This file replaces every earlier VIGIA message about the junction,
its levels and the stage 1 commit.** Nothing in it is optional. Where a number is given, it is the acceptance threshold.

## 0. Where you are, and the position

Right (keep it): segments as cross-section strips (straight 140 m: 412 -> 58 triangles); no verge, no skirts; no clipper, union or
difference; the 10 m grid with its 1 m subgrid; TILE_ORIGIN removed; exact kerb ramps; the conformed terrain (`terrainSeams.ts`,
Delaunator 5.1 + Constrainautor 4.1).

Wrong (redo in this stage): the junction (four-way urban: 677 triangles).
- The plate is meshed "in rings out from its middle": a 2-triangle centre and fans to the outline (`pieceMesh.ts:18`, `:167-168`
  `fanTriangles`, `MOST_RINGS` `:30`). Its triangles are as narrow as 3.4 cm.
- Every kerb arc is resampled at 1 cm at every distance (`junctionPiece.ts:229-231` `CORNER_TOL`, `cornerChains` `:284`). On a 4 m
  radius that is 12 steps a corner, about 290 triangles a junction for the arcs alone.
- The kerb's top is a band of its own.
- The far level saves 4% (677 -> 651).

The target is the user's model, measured in the VIGIA's reference (`<VIGIA scratchpad>/cruzamento-referencia.html`, panels 4 and 5;
`snaps/round-n4-v34.png`, `snaps/round-n8-vtop.png`). The scratchpad is
`C:\Users\Jonathan\AppData\Local\Temp\claude\C--Users-Jonathan--claude-spares-spare-TJ6skJ\7dd2375b-9680-4443-b24c-c89e980ceebd\scratchpad`.

## 1. The junction, piece by piece

1. **Plate.** The polygon between the mouths and the kerb arcs, triangulated from its outline only.
   - A flat plate (`planar()` true): `earcut` + `refine()`.
   - A crowned or sloping plate: Delaunator + Constrainautor, with the outline and the crown's fold lines (ridges and valleys) as
     constrained edges. The height comes from the crown's function at the vertices. If the crown is not piecewise planar, add stations
     only along the fold lines until the plate is within 1 cm of the crown function.
   - No interior point other than those fold lines' stations. Delete `fanTriangles` and `MOST_RINGS`; do not keep them as a fallback.
2. **Kerb arc, by level.** Equal-angle stations, n steps a corner, nested so each coarser level's points are a subset of the finer one's:

   | level | camera to block | n | chord error, R = 4 m | below 1 px from |
   |---|---|---|---|---|
   | L0 | < 90 m | 8 | 1.9 cm | 22 m |
   | L1 | 90 - 350 m | 4 | 7.7 cm | 89 m |
   | L2 (far network) | > 350 m | 2 | 30 cm | 352 m |

   - The pixel figure is yours: 1,158 px/m at 1 m, px = error x 1158 / distance.
   - For another radius, use n = ceil((pi/2) / (2 acos(1 - e/R))), rounded up to a power of 2, with e = 1.9 / 7.7 / 30 cm.
   - The mouths' vertices are identical at every level, so no crack opens between a junction and its roads at different levels.
   - Replace `CORNER_TOL` and the Douglas-Peucker in `cornerChains` with these stations.
3. **Kerb face.** A ladder of quads over the arc's stations, with smooth normals along the arc. L2 has **no kerb face**: 16 cm is
   below 0.6 px beyond 350 m.
4. **Kerb top.** Part of the footway band. Its colour comes from the shader from the distance to the kerb edge, as the lines already do
   with `roadSection`. No triangle of its own.
5. **Footway corner.** Triangulated from its outline: the arc's stations at kerb-top height, the two arms' footway edges at the mouths
   and the lot's corner, which stays square. No other point.
6. **Ramps.** As they are now (exact planes). They fit the footway corner's outline; they are not drawn on top of it.
7. The same rules apply to the T junction, the bend and every junction the network makes.

Expected cost of the four-way junction, corners + plate + four 22 m arms without ramps: 50 + 16 n, so 178 at L0, 114 at L1 and below
82 at L2, the latter without kerb faces.

## 2. Acceptance (measured with `scripts/optimization-sheet.mjs`, before = HEAD 759af93f in a clean worktree, after = your worktree)

| object | L0 triangles | L1 | L2 | narrowest triangle (min altitude) | hidden |
|---|---|---|---|---|---|
| Roads/urban straight/140 m | <= 58 | <= 58 | <= 12 | >= 5 cm | 0 |
| Roads/urban junction/four ways | <= 260 (178 + ~72 for 8 ramps) | <= 200 | <= 90 | >= 5 cm | 0 |
| Roads/urban bend/right angle | report; must equal the formula +-10% | report | report | >= 5 cm | 0 |
| T junction | report; must equal the formula +-10% | report | report | >= 5 cm | 0 |

- Formula: each arc step costs 4 triangles (1 plate, 2 kerb face, 1 footway), plus the arms and ramps you count.
- Draw calls: no more than now (11 on the junction). Their reduction is stage 2.
- Min altitude: 2 x area / longest edge, over every triangle of the object. Add it to the sheet's table; drop "angle < 10 deg".
- Images, each opened by you and listed in the note: before/after render + wireframe of the four objects at L0, L1 and L2; a zoom of one
  corner at each level; grazing photos of a junction and a straight road on a slope (the conformed terrain, no gap, no float).

## 3. Tests (in `tests/render/pieceMesh.spec.ts` or next to it)

1. **Nested stations.** For every corner of a generated city (`planCity` small, seed 2), L2's arc points are a subset of L1's, and L1's
   of L0's.
2. **Mouths fixed.** Every mouth's vertices are identical at L0, L1 and L2.
3. **No sliver.** No junction triangle in the city has a min altitude under 5 cm.
4. **Plate from its outline.** A flat plate has no vertex that is not on its outline.
5. **Chord error.** Each level's arc is within its error budget (1.9 / 7.7 / 30 cm for R = 4 m) of the true arc.
6. **Conformed terrain.** Your existing 5 terrain seam tests pass.
7. **The suite.** No test failing that passes on HEAD; the 26 failing on HEAD listed in the note, each with its reason.

## 4. Order of work

a. Leave the terrain step you are in compiling and passing its tests.
b. Rewrite the junction as in section 1.
c. Run the tests (section 3) and the sheets (section 2), open every image.
d. Write the note `reports/vigia/entregas/54fcaa61-<commit>.md` per PROTOCOL.md, with the file:line of each claim, the before/after
   table, the dependency list (delaunator 5.1.0 ISC, @kninnug/constrainautor 4.1.0 ISC, earcut 3.2.x ISC) and the save 6 -> 7 migration test.
e. Commit locally, never push. The working copy is shared, and `git commit -- <paths>` writes the WORKING COPY of those paths. So:
   stage only your files (or only your hunks, `git apply --cached`), check `git diff --cached --name-only` has nothing of another
   session, then `git commit` with no pathspec.

## 5. Stage 2, after this commit (do not start it before)

- Vertex format: 56 -> <= 32 B a vertex (normal 3 x Int8 or 10-10-10-2, colour Uint8 normalized, uv Int16/Float16, roadSection relative
  to its block), with proof that the painted lines do not shimmer. See "Vertex quantization" in https://github.com/zeux/meshoptimizer.
- Draw calls: one material for carriageway, footway and kerb where the slot in the vertex allows it (`roadEdges.ts:79` already reads
  `vRoadPaintSlot`).
- Roads beyond ~1.5 km painted into the terrain's paint texture (2 m a texel, `terrain.ts:283`), with no road geometry there. This is
  the virtual-texture approach Far Cry 4 used for roads and decals (Ka Chen, "Adaptive Virtual Texture Rendering in Far Cry 4", GDC 2015,
  https://gdcvault.com/play/1021761/Adaptive-Virtual-Texture-Rendering-in).
