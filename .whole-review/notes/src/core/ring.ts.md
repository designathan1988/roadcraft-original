# src/core/ring.ts
Lines: 220
Summary: A closed boundary of lines and exact arcs kept as one plain array of numbers (area and box cached in it); edges, vertices and flattened points made on each call.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-24 RingEdge (line | arc with centre, radius, angles, ccw, end); layout constants AREA..EDGES, edge codes, sizes
- 26-52 Ring: data run and edge count; the constructor lays the run at its size
- 54-65 run() (the run itself for another thread) and fromRun (copies it)
- 67-95 start, edges (new objects each call), isEmpty, flatten (a new point list each call from flatXY)
- 97-120 flatXY: every call re-flattens the arcs (steps by ARC_TOL sagitta), a number[] grown by push, then Float64Array.from (two allocations per call)
- 122-150 bbox (worked out once, kept in the run; a new object each call), signedArea (cached)
- 152-187 ensurePositive, reversed (new ring, arcs kept exact), fromPolygon
- 189-202 addToPath (Path2D, arcs exact)
- 204-220 arcDelta, arcEdge (sweep under PI), lineEdge

## Contracts, state and data flow
- Memory traded for CPU: nothing flattened is kept, so every flatten/flatXY re-tessellates arcs and allocates. Callers asking the vertices per frame or per cell repeatedly pay it each time.

## Depends on / used by
- uses: scalar, vec2, aabb; used by: junction and road surfaces, lots (to be seen)

## Problems found (finding IDs)
- none confirmed here

## To check in other files
- callers of flatten/flatXY/edges: per frame or per repeated build?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/arc : arc(x, y, r, start, end, counterclockwise); default clockwise (line 197)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/TypedArray/from : a new typed array copied from the list (line 119)
- https://v8.dev/blog/pointer-compression : (redone research) the ring is one plain number array (an all-number array takes the PACKED_DOUBLE_ELEMENTS kind with a FixedDoubleArray backing store, https://v8.dev/blog/elements-kinds) but edges, vertices and flattened points are new objects on each call: a caller asking them per frame makes garbage per point (callers to check)
