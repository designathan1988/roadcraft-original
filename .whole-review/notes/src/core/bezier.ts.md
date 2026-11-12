# src/core/bezier.ts
Lines: 113
Summary: Quadratic Bezier road curves stored as a shape (t along the chord, h off it): control point from shape and back, evaluation, flattening within a tolerance (1-64 steps), de Casteljau split, tightest radius in closed form, and shape fitted to a minimum radius by bisection.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-10 imports (EPS, FLATTEN_TOL, clamp, vec2 ops); CurveShape {t, h}
- 12-29 controlPoint (a + chord*t + normal*h) and shapeFromControl (its inverse; a degenerate chord gives t 0.5, h 0)
- 31-37 quadPoint: B(t) = (1-t)^2 a + 2(1-t)t c + t^2 b
- 39-56 quadSegmentCount from the second difference |a+b-2c| and tol (1..64); flattenQuad: steps+1 points
- 58-67 flattenSegment: a straight segment returns its two ends; a curve flattened
- 69-80 splitQuad: de Casteljau at t, the two halves' control triples
- 82-96 quadMinRadius: the tightest radius of curvature, closed form (Infinity for a straight one)
- 98-113 fitShapeToRadius: 40 bisection steps on |h| so the tightest radius is at least minRadius; under 0.01 the curve becomes straight (null)

## Contracts, state and data flow
- Pure; small allocations per point (Vec2 objects).

## Depends on / used by
- uses: src/core/scalar.ts, src/core/vec2.ts; used by: road editing and network flattening

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://en.wikipedia.org/wiki/B%C3%A9zier_curve : quadratic formula and de Casteljau construction (lines 31-37, 69-80)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/sign : sign of 0 is 0 (line 105: shape.h is non-zero there, line 100 returns before)
- https://raphlinus.github.io/graphics/curves/2019/12/23/flatten-quadbez.html : (redone research, replaces the Math.sign filler) the segments a quadratic needs for a tolerance follow sqrt(scale/tol) and the curve's parabola span; uniform or halving steps use more than needed: the 1-64 step flattening here is within tolerance but may emit more vertices than the optimum (geometry and memory per road; a possible saving, not a defect)
