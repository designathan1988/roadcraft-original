# src/editor/commit.ts
Lines: 1028
Summary: (written as the file is read) Committing roads: a gesture's pieces laid on a forked copy of the document and network, judged (edit rules, funds), deep cuts bored as tunnels, and taken back into the live map as one atomic edit; dry runs kept so the click lays the copy already judged.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-42 imports; MIN_DRAFT_LENGTH 9.6 m, MERGE_EPS, CROSS_PAD, HEIGHT_JOIN_EPS, CROSSING_CLEARANCE, AUTO_TUNNEL_COVER
- 44-60 DraftResult; STATION_STEP 2 m
- 62-161 commitRoadPath: pieces joined; network rebuilt if behind; roads near held; a kept dry run reused at the click (same doc version, network, ground solve, key); else doc.fork + net.fork, each piece committed in place with grade limits and the work network REBUILT after each piece; deep cuts bored; rules; dry run: settleRoadEdit(roadsBefore(doc)...) and stations, kept; else layCopy
- 163-169 holdAlong: the page network holds the roads near the draft's points
- 171-201 layCopy (charge on the copy, takeBack of doc and network), lastDryRun, dryRunsReused, dryRunKey (JSON of the ask)
- 203-222 terrain index kept while the stamps are the same; solveOver (the game's ground: buildRoadElevation from its previous solve; else the index's last solve)
- 224-261 boreDeepCuts: only new ground segments near terrain stamps; elevation solved over the work network; each new segment sampled every 3.2 m, a cover over AUTO_TUNNEL_COVER makes it a tunnel
- 263-287 draftStations: new segments on the drawn path, elevation, stations every 2 m
- 289-308 joinShortPieces
- 310-329 DraftStop, ExistingCut, TaggedCut
- 331-379 commitDraft: one draft on a fork, rebuilt, judged, charged, taken back
- 381-478 commitDraftInPlace: endpoints materialised (a split endpoint rebuilds the network); the draft flattened; roads near its box (ribbonsNear), each piece pair tested only where boxes meet; height gaps decide pass-over/clearance; cuts near ends reuse the junction
- 480-527 slides onto crossings, existing segments split at their cuts, stops ordered, a segment per span (not if already joined), orphan nodes pruned
- 529-593 JOINT_STRAIGHT; slideOntoCrossing; normalizeDraftStops; alreadyJoined
- 595-671 materializeEndpoints (anchors at nodes, cuts, or free nodes), materializeFree (nodes of roads near the point only), segmentOffsetAt
- 673-756 splitSegment; reconcileMovedNode: merges a dropped node with a node near it, else rebuilds the network and tests the moved roads against the roads near them, splitting and recursing on a crossing (up to 16 deep, a network rebuild each time)
- 758-784 moveNodeChecked: fork, move, reconcile, rebuild, rules, charge, take back
- 786-833 joinSegments: two compatible straight pieces at an unused node joined (sections, parking, bans, crossings carried)
- 835-872 duplicateSegment: a parallel copy offset by the road's width
- 874-985 splitSegmentAtCuts: cuts sorted and merged, new nodes at the curve's split points, the segment replaced by pieces (curves, dash origins, sections, parking, cut walls, bans and crossings carried)
- 987-1028 parameterAtArc, curveShapeForRange, quadRange (de Casteljau twice), validPoint

## Contracts, state and data flow
- Every road edit is made on a fork of the document and of the network (copy-on-write), judged, then taken back: its cost depends on what fork/rebuild/takeBack copy (world/doc, world/network).
- commitRoadPath rebuilds the working network after each piece (workNet.rebuild per piece) and again after boring; reconcileMovedNode rebuilds after each crossing found.
- A dry run (the road tool at rest) does the whole job (fork, pieces, rules, roadsBefore + settleRoadEdit, stations) and keeps it for the click.

## Depends on / used by
- uses: world/doc fork/takeBack, world/network fork/rebuild/holdNear, world/elevation buildRoadElevation, world/terrain, editor/editRules, editor/roads/economy; used by: road tool (gesture, dry runs at rest), blocks, other tools

## Problems found (finding IDs)
- none confirmed here; the costs sit in the forks, rebuilds, the elevation solve and the economy (checks below)

## To check in other files
- editor/roads/economy roadsBefore/settleRoadEdit: cost per dry run (the road tool judges at rest).
- world/elevation buildRoadElevation(net, ground, previous): whole network or the changed part?
- world/network fork().rebuild(): whole copy or incremental?

## Sources
- https://en.wikipedia.org/wiki/De_Casteljau%27s_algorithm : the sub-curve over [t0, t1] by splitting at t1 then at t0/t1 (lines 1008-1023)
- https://en.wikipedia.org/wiki/Persistent_data_structure : copy-on-write costs what is written, not the whole structure (lines 103-106, 364-365, 769-770: doc.fork/net.fork)
- https://web.dev/articles/rail : (redone research) a dry run at each pause of the pointer must answer within 100 ms; the rebuild per piece (lines 62-161) and up to 16 rebuilds in reconcileMovedNode stay within it only if net.rebuild costs what changed (world/network to check)
