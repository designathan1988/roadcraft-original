# Rejected optimization rounds: visual audit

Every sheet in this folder was opened and inspected, one by one (45 sheets). The rounds they record were
reverted in code (`900c6ecc` vehicles, `f5cb7e5b` roads, `35f64239` vegetation, `73a97cbb` glass rail,
`b46c5894` street furniture far blocks): the models are back to what they were at `53478458`. The only later
change kept in the same files is `5b2d3032` (draw calls and garbage in `cellInstances.ts` / `roadSurfaces.ts`),
which does not touch any model.

Why each round was rejected: the "after" pictures show models that are no longer the same model.

## Street furniture (6 of 6 broken)

`mobilia/*.png`: bench, storm drain, mailbox, hydrant, bin and phone booth were replaced by **plain 12-triangle
boxes** in the far blocks. The phone booth (orange hood on a post) became a tall pinkish slab; the mailbox lost its
round top, slot and plate. A box is a different object, not a simplification of this one.

## Facade parts (1)

`pecas/parapeito-de-vidro-longe.png`: the glass rail lost its visible edge band (the panel's thickness).

## Vegetation (20)

- `arbusto-rasteiro`: **holes** — visible faces of the tufts were deleted (a notch in the left tuft, a gap in the
  right one).
- `broadleafTall` (near, "1 % fewer"): **a different tree** — the cards sit elsewhere, the crown is narrower and
  lost its right lobe.
- Medium levels changed the crown: `broadleafTall-medio`, `oak-medio` (top lost), `cypress-medio` (round tip
  lost), `ipePink-medio` / `ipeYellow-medio` (left lobe lost, more green underneath), `bush-medio` (clusters shrunk),
  `hedge-medio` (separate tufts with gaps). **`bushFlowering-medio` lost its pink flowers.**
- `palm-medio` is the near palm: there is no medium level.
- `oak`, `bush`, `bushFlowering`, `cypress`, `hedge`, `ipePink`, `ipeYellow`, `pedra`: **0 % fewer triangles**.

## Vehicles (12)

- `roda-aro`: the rim (a drum with five spokes) became **two flat discs** side by side.
- `roda-pneu`: the tyre with round shoulders became a **faceted drum** with wrong shading bands (normals).
- `bus`: the flat roof with round edges got a **ridge** along its length.
- `sedan-sedan`, `sedan-wagon`, `hatch-hatch`, `suv-suv`, `suv-pickup`, `van-van`: window outlines, pillars and
  bonnet changed; curved panels became faceted.
- `motorcycle` and `bicycle`: the sheets show the body alone (seat, posts, engine, exhaust; the bicycle's rack and
  saddle) without the wheels the game draws with it, so neither is recognisable and nothing about the whole vehicle
  was checked.

## Roads (6)

- `vias-asfalto`: the crossing became a **star of needle fans** — every corner arc (hundreds of points at 8 mm)
  joined by very long triangles to the middle; a flat surface still had 11,144 triangles.
- `vias-calcada`: dense fans and slivers at the corners; notches at the kerb returns.
- `vias-gramado`: grass strips **lost width** (the upper block's strip became a thin line).
- `vias-meio-fio`: long slivers along the medians.
- `vias-faixas`: **+6 %** triangles; every dash and crossing bar is a capsule with round ends.
- `vias-conjunto`: all of the above together.

Root cause in code: `ARC_TOL = m(0.008)` (`src/core/scalar.ts:39`) holds for every level, since no caller passes
`opts.arcTol` (`src/core/offset.ts:56`).

## What every round lacked

No level was accepted on a geometric error (two-sided Hausdorff distance in pixels at the distance the level is
drawn), no silhouette was compared, and far levels were substitutes instead of simplifications of the model itself.
The redo follows the method in `../REGISTRO.md`.
