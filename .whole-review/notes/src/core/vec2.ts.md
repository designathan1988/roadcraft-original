# src/core/vec2.ts
Lines: 47
Summary: 2D vector helpers on immutable {x, y} objects: add, sub, scale, neg, dot, cross, lengths, perp, normalize, lerp, angle, fromAngle, addScaled.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-7 Vec2 interface (readonly x, y)
- 9-20 add/sub/scale/neg (each a new object), dot, cross, lenSq, len and dist (Math.hypot builtin)
- 22-35 perp (new object), normalize (unit or (1,0) when tiny), lerpVec, angleOf (atan2)
- 37-47 fromAngle, addScaled

## Contracts, state and data flow
- Every vector op allocates a small object (shared hidden class, two in-object fields, doubles boxed under pointer compression): cheap alone, costly in hot loops (offset prune, segSeg).

## Depends on / used by
- uses: src/core/scalar.ts; used by: the geometry code everywhere

## Problems found (finding IDs)
- none (allocation cost is the callers' to judge: F-0009)

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/atan2 : atan2(y, x), range [-PI, PI] (line 35)
- https://v8.dev/blog/fast-properties : same-shape objects share a hidden class, properties in-object (lines 9-46)
- https://v8.dev/blog/disabling-escape-analysis : (redone research) an object whose lifetime is provably within the optimised function can be kept in registers; a returned {x, y} escapes and is heap-allocated: every helper here returns a new object
- https://v8.dev/blog/pointer-compression : (redone research) with pointer compression doubles in fields are boxed: a non-integer {x, y} is the object plus two heap numbers; cheap if short-lived (v8.dev/blog/trash-talk), costly when kept or made per item per frame
