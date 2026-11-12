# src/core/scalar.ts
Lines: 73
Summary: The engine's numeric tolerances and tiny scalar helpers: EPS family, GEO_EPS 0.04 mm, SIN_EPS (3 deg), ACUTE_EPS (12 deg), MITER limits, FLATTEN_TOL 2 cm, ARC_TOL 8 mm, ribbons and seams; steadyRatio, clamp, hypot2 (plain sqrt), lerp, normalizeAngle.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-21 EPS 1e-9, GEO_EPS m(0.00004), COARSE_EPS, FINE_EPS, DIV_EPS, MIN_ITER_STEP
- 23-51 SIN_EPS, ACUTE_EPS, MITER_LIMIT 4, CORNER_MITER 2.5, FLATTEN_TOL m(0.02), ARC_TOL m(0.008), TAPER_ANGLE, MIN_RIBBON, SEAM_OVERLAP, SURFACE_END_STEP
- 53-65 TAU; steadyRatio (rounded to a millionth), clamp, hypot2 (sqrt of squares: a second `hypot2` with other rounding than core/hypot.ts), lerp
- 66-73 normalizeAngle into (-PI, PI] using % (sign of the dividend)

## Contracts, state and data flow
- ARC_TOL 8 mm sets how many points every arc flattens to (kerb returns, junction rings): finer tolerance, more points everywhere geometry is flattened.

## Depends on / used by
- uses: src/core/units.ts; used by: nearly every geometry file

## Problems found (finding IDs)
- none

## To check in other files
- the far/coarse geometry: do far levels reuse these fine tolerances (8 mm arcs drawn kilometres away)?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Remainder : % keeps the dividend's sign, floats included (line 68)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/round : halves toward +Infinity (line 56)
- https://raphlinus.github.io/graphics/curves/2019/12/23/flatten-quadbez.html : (redone research, replaces the Math.round filler) the vertex count of a flattened curve grows as 1/sqrt(tolerance): FLATTEN_TOL 2 cm and ARC_TOL 8 mm set how many vertices every road and arc carries (halving a tolerance multiplies vertices by ~1.4); a quality setting, kept
