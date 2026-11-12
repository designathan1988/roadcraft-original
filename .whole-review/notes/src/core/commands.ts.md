# src/core/commands.ts
Lines: 99
Summary: The command registry: named commands with an optional enabled test, and key rules (by physical code and/or character, modifiers, a when test) resolved last-bound first.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-11 CommandResult ('done', 'cancelled', 'pass'); Command {id, label, enabled, run}
- 13-37 KeyRule (code, key(s), ctrl/shift/alt, when, command, args, prevent) and KeyPress
- 39-55 CommandRegistry: commands Map, keys list; register (twice throws), bind (unknown command throws), has
- 57-73 all(), bindings(), run(id): unknown id throws; disabled -> cancelled
- 75-87 press: rules walked from the last bound; the first that matches, applies and does not 'pass' wins
- 89-99 matches: code exact, key(s) case-insensitive, modifiers when given

## Contracts, state and data flow
- Runs per key press only; O(rules) per press.

## Depends on / used by
- uses: nothing; used by: main.ts and the UI (shortcuts, dock, drawers)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/code : the physical key, layout independent (line 14, 90)
- https://developer.mozilla.org/en-US/docs/Web/API/KeyboardEvent/key : the character under the layout and modifiers (lines 16, 91-93)
- https://web.dev/articles/rail : (redone research) input handled within 50 ms: resolving a key walks a short rule list per key press, far inside the budget; no performance weight
