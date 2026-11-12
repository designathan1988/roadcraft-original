# src/editor/roads/streetKit.ts
Lines: 91
Summary: A street's power line and furniture carried through an edit of its road: what stands on the edited streets' footways (nearer to them than to any other street) is found before the edit, removed after it, and laid again on the roads the edit left (or removed with them).

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-25 imports; carried (furniture catalogue kinds), BEYOND 1.5 m, WITHIN 1 m; Kit
- 27-38 nearestStreet: the closest ribbon among the network's segment cells within 40 m
- 40-59 kitOf: per edited street, the poles and carried pieces within its box + 30 m, owned when the nearest street is one edited and the point is on its footway band (dedup by linear includes)
- 61-70 removeWithStreetKit: rebuild, kit, edit, kit removed
- 72-90 carryStreetKit: rebuild, kit, edit; kit removed; rebuild; power lines laid again on the streets left; furniture laid again (complete set with a line, basic without)

## Contracts, state and data flow
- Per road edit: work proportional to the edited streets and what stands near them; two network rebuilds (incremental per the comments).

## Depends on / used by
- uses: world/network (segmentCells, ribbons, rebuild), world/doc poles/landscape, world/roads furniture catalogue and sets, editor/roads/powerLine; used by: editor/nodeMover (drop), the road tools' edits (move, widen, delete)

## Problems found (finding IDs)
- none

## To check in other files
- none

## Sources
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/includes : a front-to-back search (lines 55-56: dedup of a street's few items)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/some : stops at the first truthy result (line 14)
- https://web.dev/articles/rail : (redone research) two network rebuilds per carried edit plus a nearest-street search per pole and piece near the edited streets: bounded by the edit's area if net.rebuild is incremental (world/network to check)
