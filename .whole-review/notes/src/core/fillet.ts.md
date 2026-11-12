# src/core/fillet.ts
Lines: 65
Summary: Corner rounding for road junction kerbs: the fillet arc between two leaving directions (tangent points, centre, run), the acute setback where two widened rays stop overlapping, and the kerb return radius between two half-widths (2.8-7.2 m).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-16 imports (scalar epsilons, vec2, units); Fillet {ta, tb, c, r, run}
- 18-45 filletCorner: angle between the directions (acos of the clamped dot), too sharp or straight -> null; run = r / tan(half), centre along the bisector at r / sin(half)
- 47-54 ACUTE_CLEARANCE 1.02; acuteSetback: (hwA+hwB) * 1.02 / (2 sin(psi/2))
- 56-65 CURB_R_MIN 2.8 m, CURB_R_MAX 7.2 m; curbRadius: half the narrower half-width, clamped

## Contracts, state and data flow
- Pure, constant time; dot is clamped before acos so it never gives NaN.

## Depends on / used by
- uses: src/core/scalar.ts, src/core/vec2.ts, src/core/units.ts; used by: junction geometry

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/acos : domain [-1, 1], NaN outside (line 26 clamps)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/tan : radians (lines 31, 52)
- https://v8.dev/blog/disabling-escape-analysis : (redone research, replaces the Math.tan filler) fillet results returned as objects escape and are heap-allocated; called per junction leg when kerbs are built, not per frame: no weight unless junctions are rebuilt in bulk (whole-map rebuild)
