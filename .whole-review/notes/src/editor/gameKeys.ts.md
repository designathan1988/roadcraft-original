# src/editor/gameKeys.ts
Lines: 149
Summary: Every key the game answers, written as commands and ordered key rules of the core command registry; main.ts hands in the game's actions (tools, camera, save/open, undo, terrain brush, monitors).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-52 imports; GameKeyDeps: the actions the keys reach (tool, per-tool keys, node height, camera turn/press/home, requestDraw, save/open, duplicate, undo/redo, delete road, pause, terrain brush, road class, F8/F9/F7 panels, tool keys, escape)
- 54-66 TOOL_LETTERS; done/used/held results (held asks a frame when the camera took the key)
- 68-102 createGameKeys: a registry, one command per action; camera.turn glides a quarter turn with Shift (once, not on repeat) else holds the key; every command asks a draw only where the view changes
- 104-148 RULES in priority order (panels first, the tool's own keys, node height, Q/E, Ctrl shortcuts, delete, Space, terrain number row and brackets, road classes, F8, tool letters, Escape, camera keys by code, Home); bound in reverse because the registry reads the last bound first

## Contracts, state and data flow
- Called once at the start; each keydown walks the rules until one acts (a short fixed list, the work of one key press).
- Camera keys by physical code (layout-independent), shortcuts by key.

## Depends on / used by
- uses: core/commands (CommandRegistry, KeyRule), editor/toolMachine (Tool); used by: main.ts (key handling)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/repeat : true while a held key auto-repeats (line 80, one quarter turn per press)
- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code : the physical key, layout-independent, the right choice for movement (lines 80, 119-120, 142)
- https://web.dev/articles/rail : (redone research) per key press a walk of ~35 rules: no weight on RAM, CPU or GPU
