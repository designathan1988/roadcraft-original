# src/editor/buildingFacade.ts
Lines: 3
Summary: A barrel re-exporting the facade patterns from the building model.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-2 a comment and `export * from '@world/buildings/facadePatterns'` (named exports only)
- 3 end of file (blank)

## Contracts, state and data flow
- No code of its own.

## Depends on / used by
- uses: world/buildings/facadePatterns; used by: editor files importing facade patterns

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/export : export * re-exports the named exports, not the default (line 2)
- https://vite.dev/guide/features.html#typescript : tsconfig path aliases need resolve.tsconfigPaths or an alias (line 2's @world)
- (redone research) a two-line barrel re-export: no runtime work, nothing whose behaviour decides performance; the two pages above are what it relies on
