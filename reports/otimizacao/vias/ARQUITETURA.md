# Road surfaces: the architecture they are rebuilt to

Source: `reports/Vias e mobiliário urbano otimizados.md` (research of 2026-10-24) and its notes in
`research_notes/Vias e mobiliário urbano otimizados/`.

## What the research found

- No shipped game or road tool documented builds the road surface by uniting the roads' polygons and
  triangulating the union. Cities: Skylines 1, Unreal (Spline Mesh, Landscape Splines), EasyRoads3D,
  StreetGen and the City Sample all build a **segment** as a structured strip along its centreline and a
  **junction** as a separate piece whose edges meet the segments' ends (the "mouth" lines).
- A junction plate is small and is triangulated on its own (earcut + Delaunay refine, or CDT), never as part
  of a road's strip, and never as a fan.
- The vertices on a mouth line exist twice, bit for bit at the same place: once in the segment (with the
  road's attributes) and once in the plate (with its own), so attributes change exactly at the mouth.
- Markings are drawn by the surface's shader (analytic along the road, a per-tile cell list at junctions in
  the manner of Nehab & Hoppe 2008, MSDF glyphs for arrows and words), not as polygons of their own.
- Small and thin triangles cost 10-20x more per pixel below ~8x8 px (Riccio 2014); fans are the worst
  triangulation (Persson 2009).

## The layers, in the order they are rebuilt

1. **Junction plates apart from the roads' strips.** Each band (verge, footway, kerb, carriageway) of a tile
   is cut in two along the mouth lines: the part the roads' own rings cover, and the part only the
   junctions' plates cover. Each part is triangulated alone; the plate's vertices read no lane marks (off
   the road, as before) and its fans are not graded (there is no strip to fan from). The skirts still hang
   from the whole band's outline.
2. **Markings along the roads in the carriageway's shader.** Each road's lines (offset across, width, colour,
   dash, period, phase) in a data texture indexed per vertex; coverage box-filtered with `fwidth`. The paint
   strips along the roads go.
3. **Markings at junctions in the carriageway's shader.** Stop lines, crosswalks, arrows, legends, islands,
   taper and parking lines as primitives in a per-tile cell lattice (data textures, `texelFetch`), glyphs from
   an MSDF atlas. The paint meshes go.
4. **Strips by sagitta.** A road's stations kept where its edges leave their chords by more than the
   tolerance of the level that draws them, its height fitted along it.

Each layer: photographed before and after (`scripts/optimization-sheet.mjs`), every feature kept, committed
on its own.
