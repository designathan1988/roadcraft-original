# src/core/units.ts
Lines: 20
Summary: The one unit system: 1 world unit = 1 metre; m(), perM(), TUNED_UNIT (0.4 m, the old unit), stepsIn (steps of a length read to a millionth), kmh (km/h to units per second).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-3 METERS_PER_UNIT = 1 (typed number so it is not a literal), UNITS_PER_METER
- 5-12 m(metres), perM(per metre), TUNED_UNIT = m(0.4)
- 14-20 stepsIn and kmh (/3.6)

## Contracts, state and data flow
- One unit is one metre: RegionIndex's default cell of 8 units is 8 m (a city-wide dense grid 10 km wide is 1,250^2 = 1.56 M cells, 12.5 MB of start+ref per index).

## Depends on / used by
- uses: nothing; used by: every file

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://en.wikipedia.org/wiki/Metre_per_second : 1 km/h = 1/3.6 m/s exactly (line 19)
- https://www.typescriptlang.org/docs/handbook/2/everyday-types.html : `: number` widens a const from its literal type (line 2)
- https://v8.dev/blog/elements-kinds : (redone research) 1 unit = 1 m makes most coordinates non-Smi doubles (fractions of a metre): arrays of coordinates hold doubles (PACKED_DOUBLE_ELEMENTS); no cost of its own here, only a fact the layouts elsewhere must respect
