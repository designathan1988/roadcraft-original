# src/actionsWiring.ts
Lines: 481
Summary: The dock's Actions: the pistol (shootAt, shootVehicle), the bomb (strikeAt, explodeAt) and the fires (ignite, tick). All work runs on a player's click or on the fire step (0.5 s of sim time), never per frame for nothing.

## Structure (every non-blank line range, 1 to the end, and what it holds)
- 1-21 imports: sim views and poses, scene handle, viewport, geometry helpers (closestOnSegment, pointInPolygon, solidFootprints, volumeElevation), signalPosts, units, editRng
- 23-30 constants: RAY_ABOVE/RAY_BELOW (vertical reach of a building ray), VEHICLE_HALF_SPAN (max over ARCHETYPES), FIRE_STEP 0.5 s
- 32-66 ActionsDeps (doc, net, sim, scene, buildingAt, view, size, heightAt, strength, mutate, caused, hint, redraw, holdGrowth) and Actions interface
- 68-87 createActions: poseOf copies a vehicle's pose; state vehicleShots (Map, cleared over 200), shorted (Set, grows with each building ever shorted), deferredHits queue, breaking flag, burning Map
- 88-151 shootAt: walks every sim.pedViews pose (once per click) within 25 m, marches 38 heights up the body axis; else bodies on the ground (scene.shootBody), else vehicles; sim.act 'shot' then scene.wound
- 153-215 shootVehicle: vehicles in the shot's box (sim.vehiclesIn, by place), slab test in each vehicle frame, nearest hit; two-wheelers drop the rider; cars hit through glass strand; 12 shots explode
- 217-231 strikeAt: building under the pointer (pick or ray over buildings near the ray), blow point on it, explodeAt
- 233-298 explodeAt, first half: radius from strength, deadNear over sim.pedViews, sim.act impact; in one mutate the buildings near struck or deferred (fracture deferred a frame) and soot wear within 2.2 r
- 299-354 the same mutate: poles in the box broken plus pulled neighbours (seeded stream, sorted), torn wires, signal posts near, landscape items near, a terrain stamp crater
- 355-391 vehicles near thrown with their occupants, scene.explode, soot blots (<=40), strikeGround, holdGrowth, hint, ignite, redraw
- 393-398 onBuildingDown: the struck building removed when its pieces are ready
- 400-417 breakDeferred/scheduleBreak/breakOne: four deferred buildings a requestAnimationFrame, asked again while some wait
- 419-450 ignite (at most 3 burning) and tick: each FIRE_STEP, each burning building's footprint centroid, two flames every 6 s; redraw while any burns
- 452-458 buildingsUnderRay: buildings near the ray's ground span (by place)
- 460-477 rayOnBuilding: marches down from the top in 0.5 m steps, testing each volume's box
- 479-481 return of the four actions

## Contracts, state and data flow
- Every query is by place (doc.buildings.near, polesIn, landscapeIn, vehiclesIn); nothing walks the whole city per frame.
- `shorted` only grows (one id per building ever struck): bounded by the buildings struck in a session.

## Depends on / used by
- uses: sim/host/simClient (pedViews, vehiclesIn, act, time, alpha), render/renderer SceneHandle, world/doc, world/buildings/geometry, world/signalPosts, editor/editStream
- used by: src/main.ts (the dock's pistol and bomb, tick from the frame loop)

## Problems found (finding IDs)
- none: no per-frame or whole-map work; the costs are per click.

## To check in other files
- src/main.ts: tick(now) is called every frame; it returns at once unless FIRE_STEP passed (line 429).

## Sources
- https://developer.mozilla.org/en-US/docs/Web/API/Window/requestAnimationFrame : one-shot, once per repaint, must be asked again; paused in background tabs (lines 400-410 ask it again while hits wait)
- https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/hypot : sqrt of the sum of squares, overflow-safe (distance tests of lines 100-110, 240, 255-262, per click)
- https://web.dev/articles/rail : (redone research, replaces the Math.hypot filler) input handled in 50 ms: shots and blasts work per click and fires per 0.5 s of sim time, not per frame; no frame cost while nothing burns
