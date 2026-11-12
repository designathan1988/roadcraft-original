# src/core/clipper.ts
Lines: 173
Summary: Polygon boolean operations (union, difference, intersection) on a shared integer grid (25,000 steps a metre): Clipper2's integer kernel first, the Martinez kernel (polygon-clipping) when Clipper2 throws, and Clipper2 again when Martinez fails first; area of a multipolygon.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-15 imports (clipper2-ts, polygon-clipping, perM); Ring/Poly/MultiPoly; SCALE and CLIPPER_SCALE (0.04 mm grid)
- 17-24 signedDoubleArea of an integer path
- 26-52 input: rings rounded to the grid, repeated points and the closing point dropped, rings under 3 points skipped, outer rings positive and holes negative (NonZero fills overlapping exteriors as a union); non-finite coordinates throw
- 54-73 ringOf and output: the PolyTree walked, each outer with its hole children
- 75-87 run: one Clipper64 per operation, subjects and clips added, execute with NonZero, throws on failure
- 89-114 legacyInput/legacyOutput: the same grid for polygon-clipping, closing point dropped on output
- 116-123 compatibleRun: Clipper2 first; its throw falls back to Martinez with the error carried
- 125-140 martinezRun: union/difference/intersection by polygon-clipping; its failure is caught WITHOUT binding the error (line 134 `catch {`), rethrowing Clipper2's error when that already failed, else running Clipper2
- 142-155 union (a and b as subjects together), difference (no clip -> union), intersection (no clip -> empty)
- 157-173 area: signed, holes subtracted

## Contracts, state and data flow
- Pure; cost O((n+k) log n) per operation; called by lots, roads' surfaces, blocks.
- Line 134's catch drops the Martinez error unsaid (a swallowed error; the rule "no swallowed error" in the project). Not a performance problem.

## Depends on / used by
- uses: clipper2-ts, polygon-clipping, src/core/units.ts; used by: road surfaces, lots, blocks, far roads (to be seen)

## Problems found (finding IDs)
- F-0002 (suspected, S4): line 134 swallows the Martinez error

## To check in other files
- the callers: whether booleans run per frame or per view cell repeatedly for unchanged inputs.

## Sources
- https://www.angusj.com/clipper2/Docs/Units/Clipper/Types/FillRule.htm : NonZero fills any non-zero winding; orientation flips only the sign (lines 45-47, 83)
- https://github.com/mfogel/polygon-clipping : GeoJSON-like input, union/intersection/difference, O((n+k) log n), round-off can loop (capped by queue limits) (lines 125-140)
- https://www.angusj.com/clipper2/Docs/Overview.htm : (redone research) integer coordinates for robustness, accuracy degrading past 1e15: 25,000 steps a metre over a 10 km map is 2.5e8, far inside; the native C++ build is the fast path, a JS port pays per call (lines 1-60)
