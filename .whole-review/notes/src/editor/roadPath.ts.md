# src/editor/roadPath.ts
Lines: 109
Summary: A freehand road gesture turned into a chain of tangent-continuous quadratic pieces: samples thinned to 7.2 m, simplified (plan and height errors) with a growing tolerance until at most 48 controls, pieces joined at the midpoints between controls.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-19 imports; RoadPathPoint, RoadPathPiece; MIN_CONTROL_SPACING 7.2 m, MAX_CONTROLS 48
- 21-33 midpoint; distanceToChord
- 35-64 simplify: recursive Douglas-Peucker on the larger of the plan distance and four times the height error; kept indices sorted
- 66-92 roadPathFromGesture: a too-short closed stroke refused; samples thinned, height changes taken by the last control; the end; tolerance x1.5 until under 48 controls
- 93-108 a straight piece for two controls; else quadratics from each control, ends at the midpoints (the last at the end)

## Contracts, state and data flow
- Pure; runs on the road tool's gesture (per pointer release or per preview), bounded by the stroke's samples.

## Depends on / used by
- uses: core/bezier shapeFromControl, core/vec2; used by: the road tool (freehand drawing)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://en.wikipedia.org/wiki/B%C3%A9zier_curve : a quadratic's end tangents meet at its control point; G1 joins need collinear neighbouring controls (lines 95-106, midpoint joins)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce : with an initial value the callback starts at index 0 (lines 73-74)
- https://raphlinus.github.io/graphics/curves/2019/12/23/flatten-quadbez.html : (redone research) fewer quadratic pieces within a tolerance means fewer segments to build and draw; the 48-control cap with a growing tolerance bounds a freehand road's pieces
