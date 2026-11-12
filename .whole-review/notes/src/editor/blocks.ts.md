# src/editor/blocks.ts
Lines: 50
Summary: A grid of streets laid in one gesture: the grid's lines (rotated about a centre) and each committed as a road path whose ends join what is already there.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-17 imports; BlockGrid {cols, rows, blockMetres, angle}
- 19-29 blockGridLines: rows+1 and cols+1 lines, each two rotated points
- 31-50 commitBlockGrid: per line, ends anchored (findAnchor 4 units) and commitRoadPath with one straight span; counts the lines laid

## Contracts, state and data flow
- One commit per line: each commit's cost (network rebuild) is commit.ts's; (rows+cols+2) commits for one gesture.

## Depends on / used by
- uses: editor/commit commitRoadPath, editor/snap findAnchor; used by: the road tool's block grid

## Problems found (finding IDs)
- none here

## To check in other files
- editor/commit commitRoadPath: what each commit rebuilds (the whole network or only the touched part).

## Sources
- https://en.wikipedia.org/wiki/Rotation_matrix : x' = x cos - y sin, y' = x sin + y cos (line 24)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/cos : radians (line 23)
- https://web.dev/articles/rail : (redone research, replaces the Math.cos filler) a grid of streets is laid as one road commit per line, each a fork, rebuilds and the edit rules (F-0013's whole-map solve per commit): a grid of n lines multiplies that work by n in one gesture
