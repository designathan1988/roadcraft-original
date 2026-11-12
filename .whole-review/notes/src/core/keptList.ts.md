# src/core/keptList.ts
Lines: 86
Summary: A list kept in localStorage under one key (blueprints, road templates): read entries (unreadable ones kept as they are), readShared (the same list while the stored text is unchanged), update (an unreadable list set aside first), all with failures said.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-7 KeptList(key, what); the shared cache {text, read, out}
- 9-27 entries(); read(reader): each entry read, failures warned and skipped
- 29-42 readShared: getItem EVERY call (a synchronous storage read of the whole text), then compares the text to reuse the list
- 44-55 update: the stored list changed and written (JSON.stringify); an unreadable text kept under a dated key first
- 57-74 stored(): getItem + JSON.parse (an array or the unreadable text)
- 76-86 write: setItem, false on failure

## Contracts, state and data flow
- Every read parses the whole stored JSON; readShared still reads the whole string from storage each call (synchronous). With photos (data URLs) inside entries the string is large.

## Depends on / used by
- uses: localStorage; used by: editor/blueprintLibrary, road templates

## Problems found (finding IDs)
- none confirmed; see check

## To check in other files
- callers of readShared / entries: are they called per frame or per panel refresh (each a synchronous read of a possibly large string)?
- editor/blueprintLibrary: are photos (data URLs) kept inside this list (localStorage ~5 MB, synchronous)?

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage : UTF-16 strings kept per origin; access blocks the thread (general note given there); quota errors on write (lines 33, 61, 78)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse : throws SyntaxError on invalid text (line 68)
- https://web.dev/articles/storage-for-the-web : (redone research) localStorage is synchronous and blocks the main thread: every entries()/stored() read parses the whole kept list on the page; readShared (same text, same list) is the only guard (F-0011's root)
