# src/editor/toolMachine.ts
Lines: 86
Summary: The tool in hand as a statechart: every tool a state under 'hand' (the road tools under 'roads'); pick takes a tool, toggle takes it or puts it down to inspect, putDown returns to inspect and lets go of what Inspect picked; entering a tool tells the hands.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-30 imports; Tool, TOOLS, ROAD_TOOLS; isTool
- 32-49 ToolEvent; ToolHands (take, letGo); ToolMachine
- 51-66 createToolMachine: putDown target; 'hand' handlers (pick, toggle, putDown) and 'roads' (toggling the road tool puts it down)
- 67-78 a state per tool (entry takes the tool unless booting; inspect's own putDown/toggle; others put down on their own toggle)
- 79-85 the Machine and the facade

## Contracts, state and data flow
- One transition per tool button or key; no performance weight.

## Depends on / used by
- uses: core/statechart; used by: main.ts (tool changes), editor/gameKeys (Tool type)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://www.w3.org/TR/scxml/ : ancestor transitions are defaults taken when no descendant transition matches; the first matching transition in document order wins (lines 55-76)
- https://statecharts.dev/what-is-a-statechart.html : hierarchy and guards (the 'roads' parent, the toggle guards)
