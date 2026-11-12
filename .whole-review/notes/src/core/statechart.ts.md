# src/core/statechart.ts
Lines: 139
Summary: A statechart with SCXML semantics for the game's tools and modes: hierarchical states, queued events processed to completion, transitions with guards, actions and targets; exit up to the domain, actions, entry down to the target; the last 256 transitions recorded.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-30 MachineEvent, Transition, StateSpec, TransitionRecord; KEPT 256
- 32-51 Machine: current, queue, processing, ring; constructor checks parents, enters the initial path
- 53-78 state, in(id) (path walk), send (queue drained, re-entrant events queued), latest(n)
- 80-90 step: the first enabled transition from the innermost state outwards
- 92-115 take: targetless (actions only), or exit the states up to the domain, actions, entry from the domain down to the target
- 117-120 record: a record object pushed; the oldest shifted past 256
- 122-139 path (a new array per call) and descend (initial children, loop-guarded)

## Contracts, state and data flow
- Per event: path arrays and a record object; cheap unless events arrive per pointer move (each recorded).

## Depends on / used by
- uses: performance.now; used by: the tools' machines (road tool, building tool...)

## Problems found (finding IDs)
- none

## To check in other files
- whether pointermove is sent as a machine event (a record per move).

## Sources
- https://www.w3.org/TR/scxml/ : the LCCA is neither exited nor entered; exit innermost first, then transition content, then entry outermost first (lines 92-115)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice : a negative start takes the last elements as a new array (line 77)
- https://web.dev/articles/rail : (redone research) events processed per input, not per frame; the 256-transition record is bounded: no performance weight
