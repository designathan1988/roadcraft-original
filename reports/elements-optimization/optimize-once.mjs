// THE GROUND COVER'S MODELS OPTIMISED ONCE (public/models/elements): a record of how the committed files were made, run by hand, never by the
// build (not referenced by package.json or vite.config.ts).
//
//   node reports/elements-optimization/optimize-once.mjs --from=<folder of the source .gltf/.bin> --to=<folder> [--report=<file.json>]
//   node reports/elements-optimization/optimize-once.mjs --from=<folder of the source .gltf/.bin> --check=<folder of made files> --report=<file.json>
//     writes nothing: each made file read back, its L0 checked against the source corner for corner, its L1 measured again against its L0.
//
// The sources are the Quaternius files as committed before this change (git show db9da0c7:public/models/elements/<name>.gltf|.bin).
// The ladder is the owner's (`propLevels.ts`): a model `s` pixels across (its box's largest extent on the screen) is drawn whole from 48 px, as
// its L1 from 16 px, as its octahedral picture from 1.5 px, not at all under it. Every primitive of every model:
// - L0, LOSSLESS: exact duplicate vertices welded (every attribute bit for bit), then the triangles and vertices reordered for the GPU's vertex
//   cache and fetch (meshoptimizer `reorderMesh`, optsize false). Its triangles are the source's, checked here triangle by triangle. No lossy L0:
//   the street camera stands 1.6 m over the ground (`isoViewport.ts` GROUND_CLEARANCE) with a near plane down to 8 cm, and the brush sets any
//   size, so no fixed L0 error can be held under a pixel at the nearest distance.
// - L1: meshoptimizer `simplifyWithAttributes` (normals, texture coordinates weighted into model units, vertex colours; `Prune`, and `Permissive`
//   tried too: the pebbles are faceted, a seam at every edge), the fewest triangles whose error MEASURED here (not meshoptimizer's estimate)
//   holds at the largest size L1 is drawn at, 48 px grown by the band an instance keeps its level in (`cellInstances.ts` HYSTERESIS):
//   * the texture as drawn, two-sided: each sampled point of either surface to where the same texel lies on the other (the distance in space
//     plus the uv missed times the model units a uv unit spans there): under ERROR_PX pixels;
//   * the light: the surface whose normal turns by more than TURN_DEGREES (Lambert's n.l changes by up to sin of it) under half a pixel's area;
//   * the vertex colours (they tint the texture): the surface whose colour changes by more than COLOUR_STEP under half a pixel's area.
//   Found with SAMPLES_MIN points a surface, kept only once PRECISE_SAMPLES points hold both.
//   A model keeps an L1 only where it draws at most WORTH of L0's triangles (`propLevels.ts`); a part with none draws its L0 there.
// - Written as glTF 2.0 with EXT_meshopt_compression (lossless: no quantisation, no filter), mesh 0 the L0 and mesh 1 the L1 (a primitive with
//   no level of its own reads L0's accessors), each L1 primitive's `extras` its measured errors in the file's units.
// Sources: meshoptimizer README (https://github.com/zeux/meshoptimizer, the npm package's own copy, version 1.2.0: `reorderMesh`,
// `simplifyWithAttributes`, `compactMesh`, `encodeGltfBuffer`); EXT_meshopt_compression
// (https://github.com/KhronosGroup/glTF/blob/main/extensions/2.0/Vendor/EXT_meshopt_compression/README.md); closest point on a triangle:
// C. Ericson, Real-Time Collision Detection (2005), 5.1.5; the ladder and its measure: src/render/propLevels.ts, src/render/cellInstances.ts.
import fs from 'node:fs';
import path from 'node:path';
import zlib from 'node:zlib';
import { MeshoptDecoder, MeshoptEncoder, MeshoptSimplifier } from 'meshoptimizer';

const args = Object.fromEntries(process.argv.slice(2).filter((a) => a.startsWith('--')).map((a) => a.slice(2).split('=')));
if (!args.from || (!args.to && !(args.check && args.report))) {
  console.error('usage: node reports/elements-optimization/optimize-once.mjs --from=<folder> --to=<folder> [--report=<file.json>]');
  process.exit(2);
}
await Promise.all([MeshoptDecoder.ready, MeshoptEncoder.ready, MeshoptSimplifier.ready]);

/** The ladder (`propLevels.ts` PROP_NEAR_PX): L1 is drawn under this many pixels across. */
const NEAR_PX = 48;
/** `cellInstances.ts` HYSTERESIS: an instance drawn at the coarser level keeps it until it is this share over the switch. */
const HYSTERESIS = 0.15;
/** The most a texel of L1 may lie off where L0 draws it at the largest size L1 is drawn at, pixels. */
const ERROR_PX = 1;
/** A normal turned by more than this changes the light (n.l) by up to its sine (8.7 %): the surface so turned must be under one pixel's area. */
const TURN_DEGREES = 5;
/** A vertex colour changed by more than this (linear, 0..1; about two 8-bit steps of a mid-tone once encoded) is a change of the material's colour. */
const COLOUR_STEP = 0.01;
/** A model's L1 that keeps more than this share of its triangles is not worth its draws (`propLevels.ts` WORTH). */
const WORTH = 0.9;
/** The relative errors (meshoptimizer's, of the model's extent) tried for L1, smallest first; two in a row past the bound end the search. */
const TRIED = [0.001, 0.002, 0.003, 0.004, 0.005, 0.006, 0.008, 0.01, 0.0125, 0.015, 0.0175, 0.02, 0.025, 0.03, 0.035, 0.04, 0.05, 0.06];
/** The weights tried in the simplifier for the normals and the vertex colours (a higher weight keeps them at some cost to the shape, meshoptimizer
 *  README); the texture's held in model units. */
const ATTRIBUTE_WEIGHTS = [1, 4, 16, 64];
/** Points sampled on each surface, at least, and per triangle; and at least as many to hold a level found by them (a level is kept on these). */
const SAMPLES_MIN = 12000, SAMPLES_PER_TRIANGLE = 8, PRECISE_SAMPLES = 200_000;
/** The share of one pixel's area the surface turned past TURN_DEGREES may cover: half, so a second look with fewer points (the spec's) finds it
 *  under a pixel too. */
const TURNED_SHARE = 0.5;

const COMPONENTS = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 };
const ARRAYS = { 5121: Uint8Array, 5123: Uint16Array, 5125: Uint32Array, 5126: Float32Array };

/** A model's json and primitives, its bufferViews decoded (EXT_meshopt_compression read as well, to check what is written). */
function readModel(dir, name) {
  const json = JSON.parse(fs.readFileSync(path.join(dir, `${name}.gltf`), 'utf8'));
  const buffers = json.buffers.map((b) => (b.uri ? new Uint8Array(fs.readFileSync(path.join(dir, b.uri))) : null));
  const views = json.bufferViews.map((view) => {
    const packed = view.extensions?.EXT_meshopt_compression;
    if (packed) {
      const out = new Uint8Array(packed.count * packed.byteStride);
      const source = buffers[packed.buffer].subarray(packed.byteOffset ?? 0, (packed.byteOffset ?? 0) + packed.byteLength);
      MeshoptDecoder.decodeGltfBuffer(out, packed.count, packed.byteStride, source, packed.mode, packed.filter);
      return out;
    }
    return buffers[view.buffer].subarray(view.byteOffset ?? 0, (view.byteOffset ?? 0) + view.byteLength);
  });
  const read = (i) => {
    const a = json.accessors[i];
    const bytes = views[a.bufferView];
    const n = a.count * COMPONENTS[a.type];
    const Type = ARRAYS[a.componentType];
    const start = a.byteOffset ?? 0;
    return new Type(bytes.slice(start, start + n * Type.BYTES_PER_ELEMENT).buffer);
  };
  const levels = json.meshes.map((mesh) => mesh.primitives.map((p) => ({
    material: p.material,
    position: read(p.attributes.POSITION),
    normal: read(p.attributes.NORMAL),
    uv: read(p.attributes.TEXCOORD_0),
    colour: p.attributes.COLOR_0 === undefined ? null : read(p.attributes.COLOR_0),
    index: Uint32Array.from(read(p.indices)),
    extras: p.extras ?? null,
  })));
  return { json, levels };
}

/** A primitive's vertices kept where `remap[v]` says (0xffffffff: dropped), `count` of them. */
function remapped(prim, remap, count, index) {
  const take = (array, width) => {
    if (!array) return null;
    const out = new array.constructor(count * width);
    for (let v = 0; v < remap.length; v++) if (remap[v] !== 0xffffffff) for (let k = 0; k < width; k++) out[remap[v] * width + k] = array[v * width + k];
    return out;
  };
  return { ...prim, position: take(prim.position, 3), normal: take(prim.normal, 3), uv: take(prim.uv, 2), colour: take(prim.colour, 4), index };
}

/** Exact duplicates welded: two vertices with every attribute equal bit for bit are one. */
function weld(prim) {
  const count = prim.position.length / 3;
  const bytes = (array, width, v) => Buffer.from(array.buffer, array.byteOffset + v * width * array.BYTES_PER_ELEMENT, width * array.BYTES_PER_ELEMENT).toString('hex');
  const seen = new Map();
  const remap = new Uint32Array(count);
  for (let v = 0; v < count; v++) {
    const key = `${bytes(prim.position, 3, v)}|${bytes(prim.normal, 3, v)}|${bytes(prim.uv, 2, v)}|${prim.colour ? bytes(prim.colour, 4, v) : ''}`;
    let at = seen.get(key);
    if (at === undefined) seen.set(key, at = seen.size);
    remap[v] = at;
  }
  return remapped(prim, remap, seen.size, prim.index.map((i) => remap[i]));
}

/** Triangles and vertices in the GPU's order (meshoptimizer `reorderMesh`, optsize false: the vertex cache and fetch, not the file size). */
function reorder(prim) {
  const index = prim.index.slice();
  const [remap, unique] = MeshoptEncoder.reorderMesh(index, true, false);
  return remapped(prim, remap, unique, index);
}

/** The triangles a primitive draws, each as its three corners' attributes, sorted: two primitives drawing the same triangles give the same list. */
function triangleKeys(prim) {
  const corner = (v) => [...prim.position.subarray(v * 3, v * 3 + 3), ...prim.normal.subarray(v * 3, v * 3 + 3), ...prim.uv.subarray(v * 2, v * 2 + 2),
    ...(prim.colour ? prim.colour.subarray(v * 4, v * 4 + 4) : [])].join(',');
  const keys = [];
  for (let t = 0; t < prim.index.length; t += 3) {
    const c = [corner(prim.index[t]), corner(prim.index[t + 1]), corner(prim.index[t + 2])];
    // The same triangle whichever corner it starts at, its winding kept.
    const first = c.indexOf([...c].sort()[0]);
    keys.push([c[first], c[(first + 1) % 3], c[(first + 2) % 3]].join(';'));
  }
  return keys.sort();
}

/** The colours as the game reads them: normalised shorts, rgb (`elements.ts`). */
const colourOf = (prim, v, out) => {
  if (!prim.colour) { out[0] = out[1] = out[2] = 1; return out; }
  out[0] = prim.colour[v * 4] / 65535; out[1] = prim.colour[v * 4 + 1] / 65535; out[2] = prim.colour[v * 4 + 2] / 65535;
  return out;
};

/** A primitive's triangles for measuring: corners, area, and the model units one uv unit spans on each (its texture's scale there). */
function surfaceOf(prim) {
  const t = prim.index.length / 3;
  const area = new Float64Array(t), scale = new Float64Array(t);
  const p = prim.position, uv = prim.uv;
  for (let k = 0; k < t; k++) {
    const a = prim.index[k * 3], b = prim.index[k * 3 + 1], c = prim.index[k * 3 + 2];
    const ab = [p[b * 3] - p[a * 3], p[b * 3 + 1] - p[a * 3 + 1], p[b * 3 + 2] - p[a * 3 + 2]];
    const ac = [p[c * 3] - p[a * 3], p[c * 3 + 1] - p[a * 3 + 1], p[c * 3 + 2] - p[a * 3 + 2]];
    const cross = [ab[1] * ac[2] - ab[2] * ac[1], ab[2] * ac[0] - ab[0] * ac[2], ab[0] * ac[1] - ab[1] * ac[0]];
    area[k] = Math.hypot(...cross) / 2;
    const uvArea = Math.abs((uv[b * 2] - uv[a * 2]) * (uv[c * 2 + 1] - uv[a * 2 + 1]) - (uv[c * 2] - uv[a * 2]) * (uv[b * 2 + 1] - uv[a * 2 + 1])) / 2;
    scale[k] = uvArea > 1e-14 ? Math.sqrt(area[k] / uvArea) : 0;
  }
  return { prim, triangles: t, area, scale };
}

/** A grid of a surface's triangles (cubic cells): each cell lists the triangles whose box reaches into it. */
function gridOf(surface, cell) {
  const { prim, triangles, area } = surface;
  const p = prim.position;
  const cells = new Map();
  const key = (x, y, z) => `${x},${y},${z}`;
  for (let k = 0; k < triangles; k++) {
    if (area[k] < 1e-14) continue;
    const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
    for (let j = 0; j < 3; j++) { const v = prim.index[k * 3 + j]; for (let a = 0; a < 3; a++) { lo[a] = Math.min(lo[a], p[v * 3 + a]); hi[a] = Math.max(hi[a], p[v * 3 + a]); } }
    for (let x = Math.floor(lo[0] / cell); x <= Math.floor(hi[0] / cell); x++)
      for (let y = Math.floor(lo[1] / cell); y <= Math.floor(hi[1] / cell); y++)
        for (let z = Math.floor(lo[2] / cell); z <= Math.floor(hi[2] / cell); z++) {
          const at = key(x, y, z);
          const list = cells.get(at);
          if (list) list.push(k); else cells.set(at, [k]);
        }
  }
  return { surface, cell, cells, key };
}

/** The point of triangle (a, b, c) nearest p, as barycentric weights (Ericson, Real-Time Collision Detection, 5.1.5). */
function nearestOnTriangle(p, a, b, c, out) {
  const set = (x, y, z) => { out[0] = x; out[1] = y; out[2] = z; return out; };
  const sub = (x, y) => [x[0] - y[0], x[1] - y[1], x[2] - y[2]];
  const dot = (x, y) => x[0] * y[0] + x[1] * y[1] + x[2] * y[2];
  const ab = sub(b, a), ac = sub(c, a), ap = sub(p, a);
  const d1 = dot(ab, ap), d2 = dot(ac, ap);
  if (d1 <= 0 && d2 <= 0) return set(1, 0, 0);
  const bp = sub(p, b), d3 = dot(ab, bp), d4 = dot(ac, bp);
  if (d3 >= 0 && d4 <= d3) return set(0, 1, 0);
  const vc = d1 * d4 - d3 * d2;
  if (vc <= 0 && d1 >= 0 && d3 <= 0) { const v = d1 / (d1 - d3); return set(1 - v, v, 0); }
  const cp = sub(p, c), d5 = dot(ab, cp), d6 = dot(ac, cp);
  if (d6 >= 0 && d5 <= d6) return set(0, 0, 1);
  const vb = d5 * d2 - d1 * d6;
  if (vb <= 0 && d2 >= 0 && d6 <= 0) { const w = d2 / (d2 - d6); return set(1 - w, 0, w); }
  const va = d3 * d6 - d5 * d4;
  if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) { const w = (d4 - d3) / (d4 - d3 + (d5 - d6)); return set(0, 1 - w, w); }
  const denom = 1 / (va + vb + vc);
  const v = vb * denom, w = vc * denom;
  return set(1 - v - w, v, w);
}

/** A surface's attributes at barycentric `w` of triangle `k`: point, uv, normal, colour. */
function sampleAt(surface, k, w) {
  const { prim } = surface;
  const v = [prim.index[k * 3], prim.index[k * 3 + 1], prim.index[k * 3 + 2]];
  const mix = (array, width) => Array.from({ length: width }, (_, a) => w[0] * array[v[0] * width + a] + w[1] * array[v[1] * width + a] + w[2] * array[v[2] * width + a]);
  const c = [0, 0, 0], ci = [new Float64Array(3), new Float64Array(3), new Float64Array(3)];
  for (let j = 0; j < 3; j++) { colourOf(prim, v[j], ci[j]); for (let a = 0; a < 3; a++) c[a] += w[j] * ci[j][a]; }
  return { point: mix(prim.position, 3), uv: mix(prim.uv, 2), normal: mix(prim.normal, 3), colour: c };
}

/** The points spread over a surface by area: at least `least`, and SAMPLES_PER_TRIANGLE a triangle. */
const areaSamplesOf = (surface, least) => Math.max(least, surface.triangles * SAMPLES_PER_TRIANGLE);

/** Points spread over a surface by area, at least `least` (a seeded generator: the same points each run), then its vertices. */
function samplesOf(surface, seed, least) {
  let s = seed >>> 0;
  const random = () => { s = (s + 0x6d2b79f5) >>> 0; let t = s; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; };
  const { triangles, area } = surface;
  const total = area.reduce((a, b) => a + b, 0);
  const count = areaSamplesOf(surface, least);
  const cumulative = new Float64Array(triangles);
  let run = 0;
  for (let k = 0; k < triangles; k++) cumulative[k] = run += area[k];
  const out = [];
  for (let i = 0; i < count; i++) {
    const r = random() * total;
    let lo = 0, hi = triangles - 1;
    while (lo < hi) { const mid = (lo + hi) >> 1; if (cumulative[mid] < r) lo = mid + 1; else hi = mid; }
    let u = random(), v = random();
    if (u + v > 1) { u = 1 - u; v = 1 - v; }
    out.push({ k: lo, w: [1 - u - v, u, v] });
  }
  // Every corner too: the farthest point of a surface from another is often one.
  for (let k = 0; k < triangles; k++) if (area[k] >= 1e-14) for (let j = 0; j < 3; j++) out.push({ k, w: [j === 0 ? 1 : 0, j === 1 ? 1 : 0, j === 2 ? 1 : 0] });
  return out;
}

/** One-sided, the shape alone: every sample of `from` to the nearest point of `to` (model units). */
function nearestSided(from, grid, seed, least) {
  const to = grid.surface, p = to.prim.position;
  const corner = (v) => [p[v * 3], p[v * 3 + 1], p[v * 3 + 2]];
  const w = [0, 0, 0];
  let worst = 0;
  for (const { k, w: weights } of samplesOf(from, seed, least)) {
    const q = sampleAt(from, k, weights).point;
    const cell = [Math.floor(q[0] / grid.cell), Math.floor(q[1] / grid.cell), Math.floor(q[2] / grid.cell)];
    // Rings of cells round the point until the nearest found lies within the ring's reach.
    let best = Infinity;
    for (let ring = 0; ring < 64; ring++) {
      for (let x = -ring; x <= ring; x++) for (let y = -ring; y <= ring; y++) for (let z = -ring; z <= ring; z++) {
        if (Math.max(Math.abs(x), Math.abs(y), Math.abs(z)) !== ring) continue;
        for (const t of grid.cells.get(grid.key(cell[0] + x, cell[1] + y, cell[2] + z)) ?? []) {
          const v = [to.prim.index[t * 3], to.prim.index[t * 3 + 1], to.prim.index[t * 3 + 2]];
          nearestOnTriangle(q, corner(v[0]), corner(v[1]), corner(v[2]), w);
          let d2 = 0;
          for (let a = 0; a < 3; a++) d2 += (w[0] * p[v[0] * 3 + a] + w[1] * p[v[1] * 3 + a] + w[2] * p[v[2] * 3 + a] - q[a]) ** 2;
          if (d2 < best * best) best = Math.sqrt(d2);
        }
      }
      if (best <= ring * grid.cell) break;
    }
    if (best > worst) worst = best;
  }
  return worst;
}


/** A surface's triangles filed by their texture coordinates (square cells of the uv box), with each one's box in space. */
function uvGridOf(surface) {
  const { prim, triangles } = surface;
  const uv = prim.uv, p = prim.position;
  const lo = [Infinity, Infinity], hi = [-Infinity, -Infinity];
  for (let i = 0; i < uv.length; i += 2) for (let a = 0; a < 2; a++) { lo[a] = Math.min(lo[a], uv[i + a]); hi[a] = Math.max(hi[a], uv[i + a]); }
  const cell = Math.max(hi[0] - lo[0], hi[1] - lo[1], 1e-9) / 64;
  const cells = new Map();
  const key = (x, y) => x * 4096 + y;
  const boxes = new Float64Array(triangles * 6);
  for (let k = 0; k < triangles; k++) {
    const v = [prim.index[k * 3], prim.index[k * 3 + 1], prim.index[k * 3 + 2]];
    for (let a = 0; a < 3; a++) {
      boxes[k * 6 + a] = Math.min(p[v[0] * 3 + a], p[v[1] * 3 + a], p[v[2] * 3 + a]);
      boxes[k * 6 + 3 + a] = Math.max(p[v[0] * 3 + a], p[v[1] * 3 + a], p[v[2] * 3 + a]);
    }
    const x0 = Math.floor((Math.min(...v.map((i) => uv[i * 2])) - lo[0]) / cell), x1 = Math.floor((Math.max(...v.map((i) => uv[i * 2])) - lo[0]) / cell);
    const y0 = Math.floor((Math.min(...v.map((i) => uv[i * 2 + 1])) - lo[1]) / cell), y1 = Math.floor((Math.max(...v.map((i) => uv[i * 2 + 1])) - lo[1]) / cell);
    for (let x = x0; x <= x1; x++) for (let y = y0; y <= y1; y++) { const list = cells.get(key(x, y)); if (list) list.push(k); else cells.set(key(x, y), [k]); }
  }
  return { surface, lo, cell, cells, key, boxes };
}

/**
 * One-sided, the texture as drawn: each sample of `from` (a texel of its texture where it lies) to where the same texel lies on `to`. For each
 * triangle of `to`, its point nearest the sample's texture coordinates, at a cost of the distance in space plus the uv missed times the model
 * units a uv unit spans where the sample lies (`surfaceOf` scale): the least cost is how far that texel moved - the shape and the texture's slide
 * in one measure. A point on a seam is matched on its own side of it (its uv is one island's), a texel shared by several islands (the same
 * texture on two caps) by the one nearest, and an edge drawn in by the uv it lost. The normal there against the sample's: the surface turned.
 */
function texelSided(from, grid, seed, least) {
  const to = grid.surface, p = to.prim.position, uv = to.prim.uv, boxes = grid.boxes;
  const scales = [...from.scale].filter((s) => s > 0).sort((a, b) => a - b);
  const typical = scales.length ? scales[scales.length >> 1] : 1;
  const areaSamples = areaSamplesOf(from, least);
  const total = from.area.reduce((a, b) => a + b, 0);
  const w = [0, 0, 0];
  const errors = [], angles = [];
  let turned = 0, recoloured = 0, sum = 0, worstColour = 0, i = 0;
  for (const { k, w: weights } of samplesOf(from, seed, least)) {
    const s = sampleAt(from, k, weights);
    const scale = from.scale[k] > 0 ? from.scale[k] : typical;
    const cx = Math.floor((s.uv[0] - grid.lo[0]) / grid.cell), cy = Math.floor((s.uv[1] - grid.lo[1]) / grid.cell);
    let best = Infinity, match = null;
    const q = [s.uv[0], s.uv[1], 0];
    for (let ring = 0; ring < 130; ring++) {
      for (let x = -ring; x <= ring; x++) for (let y = -ring; y <= ring; y++) {
        if (Math.max(Math.abs(x), Math.abs(y)) !== ring) continue;
        for (const t of grid.cells.get(grid.key(cx + x, cy + y)) ?? []) {
          // Its box in space as far as the best found already: it cannot cost less.
          let box2 = 0;
          for (let a = 0; a < 3; a++) box2 += Math.max(boxes[t * 6 + a] - s.point[a], 0, s.point[a] - boxes[t * 6 + 3 + a]) ** 2;
          if (box2 >= best * best) continue;
          const v = [to.prim.index[t * 3], to.prim.index[t * 3 + 1], to.prim.index[t * 3 + 2]];
          nearestOnTriangle(q, [uv[v[0] * 2], uv[v[0] * 2 + 1], 0], [uv[v[1] * 2], uv[v[1] * 2 + 1], 0], [uv[v[2] * 2], uv[v[2] * 2 + 1], 0], w);
          let du2 = 0, d2 = 0;
          for (let a = 0; a < 2; a++) du2 += (w[0] * uv[v[0] * 2 + a] + w[1] * uv[v[1] * 2 + a] + w[2] * uv[v[2] * 2 + a] - s.uv[a]) ** 2;
          for (let a = 0; a < 3; a++) d2 += (w[0] * p[v[0] * 3 + a] + w[1] * p[v[1] * 3 + a] + w[2] * p[v[2] * 3 + a] - s.point[a]) ** 2;
          const cost = Math.sqrt(d2) + Math.sqrt(du2) * scale;
          if (cost < best) { best = cost; match = { t, w: [...w] }; }
        }
      }
      // A triangle past this ring misses the uv by more than `ring` cells: it costs more than the best found.
      if (best <= ring * grid.cell * scale) break;
    }
    const o = sampleAt(to, match.t, match.w);
    const n1 = Math.hypot(...s.normal), n2 = Math.hypot(...o.normal);
    const angle = Math.acos(Math.min(1, Math.max(-1, (s.normal[0] * o.normal[0] + s.normal[1] * o.normal[1] + s.normal[2] * o.normal[2]) / (n1 * n2 || 1)))) * 180 / Math.PI;
    angles.push(angle);
    // The area samples each stand for an equal share of the surface (the corners after them, for the distance only).
    if (i < areaSamples && angle > TURN_DEGREES) turned++;
    const colour = Math.max(...[0, 1, 2].map((a) => Math.abs(o.colour[a] - s.colour[a])));
    if (i < areaSamples && colour > COLOUR_STEP) recoloured++;
    worstColour = Math.max(worstColour, colour);
    errors.push(best);
    sum += best;
    i++;
  }
  errors.sort((a, b) => a - b);
  angles.sort((a, b) => a - b);
  const at = (list, share) => list[Math.min(list.length - 1, Math.floor(list.length * share))];
  return {
    max: errors[errors.length - 1], p999: at(errors, 0.999), mean: sum / errors.length, normal: angles[angles.length - 1], normalP99: at(angles, 0.99),
    normalMean: angles.reduce((a, b) => a + b, 0) / angles.length, turnedArea: (turned / areaSamples) * total, recolouredArea: (recoloured / areaSamples) * total, colour: worstColour, samples: errors.length,
  };
}

/** Two-sided, the larger of the two ways: the texels' move (model units), normals (degrees), the surface turned past TURN_DEGREES (model units
 *  squared), colours (0..1); with `shape`, the surfaces' own two-sided Hausdorff distance too (model units, as the sheets measure it). At least
 *  `least` points each way. */
function measure(a, b, extent, shape = false, least = SAMPLES_MIN) {
  const sa = surfaceOf(a), sb = surfaceOf(b);
  const ab = texelSided(sa, uvGridOf(sb), 1, least), ba = texelSided(sb, uvGridOf(sa), 2, least);
  const pick = (key) => Math.max(ab[key], ba[key]);
  const out = {
    max: pick('max'), p999: pick('p999'), mean: pick('mean'), normal: pick('normal'), normalP99: pick('normalP99'), normalMean: pick('normalMean'),
    turnedArea: pick('turnedArea'), recolouredArea: pick('recolouredArea'), colour: pick('colour'),
  };
  if (!shape) return out;
  const cell = extent / 24;
  return { ...out, geometric: Math.max(nearestSided(sa, gridOf(sb, cell), 3, least), nearestSided(sb, gridOf(sa, cell), 4, least)) };
}

/** The attributes the simplifier weighs: normal, uv in model units (meshoptimizer README: a change of 1/weight in an attribute weighs as a change
 *  of one in normalised position), colour. */
function simplifierInput(prim, extent) {
  const count = prim.position.length / 3;
  const surface = surfaceOf(prim);
  const scales = [...surface.scale].filter((s) => s > 0).sort((x, y) => x - y);
  const uvWeight = scales.length ? scales[scales.length >> 1] / extent : 1;
  const stride = prim.colour ? 8 : 5;
  const attributes = new Float32Array(count * stride);
  const c = new Float64Array(3);
  for (let v = 0; v < count; v++) {
    attributes.set(prim.normal.subarray(v * 3, v * 3 + 3), v * stride);
    attributes.set(prim.uv.subarray(v * 2, v * 2 + 2), v * stride + 3);
    if (prim.colour) attributes.set(colourOf(prim, v, c), v * stride + 5);
  }
  /** The weights with the normals and the colours weighed `weight` each, the uv in model units. */
  const weights = (weight) => [weight, weight, weight, uvWeight, uvWeight, ...(prim.colour ? [weight, weight, weight] : [])];
  return { attributes, stride, weights, uvWeight };
}

/**
 * A primitive's L1: of the errors tried (each flag set and attribute weight from the smallest error up, two in a row past a bound ending it), the
 * fewest triangles whose texels lie within `bound` and whose surface turned past TURN_DEGREES, and recoloured past COLOUR_STEP, is under
 * TURNED_SHARE of `area` (model units),
 * found by SAMPLES_MIN points and held by PRECISE_SAMPLES; null: none. Every one tried reported.
 */
function lowerOf(l0, extent, bound, area) {
  const input = simplifierInput(l0, extent);
  const t0 = l0.index.length / 3;
  const tried = [];
  const seen = new Set();
  let kept = null;
  for (const flags of [['Prune'], ['Prune', 'Permissive']]) for (const weight of ATTRIBUTE_WEIGHTS) {
    let past = 0;
    for (const target of TRIED) {
      const [index, estimate] = MeshoptSimplifier.simplifyWithAttributes(l0.index, l0.position, 3, input.attributes, input.stride, input.weights(weight), null, 3, target, flags);
      const t1 = index.length / 3;
      const key = index.join(',');
      if (t1 >= t0 || t1 === 0 || seen.has(key)) continue;
      seen.add(key);
      const [remap, unique] = MeshoptSimplifier.compactMesh(index.slice());
      const l1 = reorder(remapped(l0, remap, unique, index.map((i) => remap[i])));
      const quick = measure(l0, l1, extent);
      const passes = (m) => m.max <= bound && m.turnedArea <= TURNED_SHARE * area && m.recolouredArea <= TURNED_SHARE * area;
      // The ones that pass measured again, many times more densely: a level is kept on that measure alone.
      const measured = passes(quick) && (!kept || t1 < kept.triangles) ? measure(l0, l1, extent, true, PRECISE_SAMPLES) : quick;
      const within = measured.max <= bound, lit = measured.turnedArea <= TURNED_SHARE * area && measured.recolouredArea <= TURNED_SHARE * area;
      tried.push({ flags: flags.join('+'), weight, target, estimate, triangles: t1, vertices: l1.position.length / 3, measured, precise: measured !== quick, within, lit });
      if (!passes(quick)) { if (++past >= 2) break; continue; }
      past = 0;
      if (measured !== quick && within && lit) kept = { flags: flags.join('+'), weight, target, triangles: t1, vertices: l1.position.length / 3, measured, l1 };
    }
  }
  return { uvWeight: input.uvWeight, tried, kept };
}

const align4 = (n) => (n + 3) & ~3;

/** The model written: its two levels, each primitive's streams a bufferView of their own, EXT_meshopt_compression over them (no quantisation). */
function writeModel(dir, name, source, l0s, l1s) {
  const views = [];
  const accessors = [];
  const add = (data, count, stride, mode, target) => {
    const bytes = new Uint8Array(data.buffer, data.byteOffset, data.byteLength);
    views.push({ bytes, count, stride, mode, target });
    return views.length - 1;
  };
  const attribute = (array, type, componentType, normalized) => {
    const width = COMPONENTS[type];
    const count = array.length / width;
    const view = add(array, count, width * array.BYTES_PER_ELEMENT, 'ATTRIBUTES', 34962);
    accessors.push({ bufferView: view, componentType, count, type, ...(normalized ? { normalized: true } : {}) });
    return accessors.length - 1;
  };
  const primitive = (prim, extras) => {
    const pos = attribute(prim.position, 'VEC3', 5126, false);
    const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
    for (let i = 0; i < prim.position.length; i += 3) for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], prim.position[i + k]); hi[k] = Math.max(hi[k], prim.position[i + k]); }
    accessors[pos].min = lo; accessors[pos].max = hi;
    const attributes = { POSITION: pos, NORMAL: attribute(prim.normal, 'VEC3', 5126, false), TEXCOORD_0: attribute(prim.uv, 'VEC2', 5126, false) };
    if (prim.colour) attributes.COLOR_0 = attribute(prim.colour, 'VEC4', 5123, true);
    if (prim.position.length / 3 > 65535) throw new Error(`${name}: over 65,535 vertices`);
    const index = Uint16Array.from(prim.index);
    const view = add(index, index.length, 2, 'TRIANGLES', 34963);
    accessors.push({ bufferView: view, componentType: 5123, count: index.length, type: 'SCALAR' });
    return { attributes, indices: accessors.length - 1, material: prim.material, ...(extras ? { extras } : {}) };
  };
  const finest = l0s.map((p) => primitive(p, null));
  const meshes = [{ name: source.meshes[0].name, primitives: finest }];
  // A part with no level of its own reads L0's accessors: nothing written twice.
  if (l1s.some((l) => l !== null)) {
    meshes.push({
      name: `${source.meshes[0].name} L1`, extras: { level: 1, of: 0 },
      primitives: l1s.map((l, i) => (l ? primitive(l.prim, l.extras) : { ...finest[i], extras: { error: 0, turnedArea: 0, recolouredArea: 0 } })),
    });
  }
  // The fallback layout (what the views decode to) and the compressed one.
  let plain = 0, packed = 0;
  const chunks = [];
  const bufferViews = views.map((v) => {
    const encoded = MeshoptEncoder.encodeGltfBuffer(v.bytes, v.count, v.stride, v.mode);
    const out = {
      buffer: 0, byteOffset: plain, byteLength: v.bytes.length, ...(v.mode === 'ATTRIBUTES' ? { byteStride: v.stride } : {}), target: v.target,
      extensions: { EXT_meshopt_compression: { buffer: 1, byteOffset: packed, byteLength: encoded.length, byteStride: v.stride, mode: v.mode, count: v.count } },
    };
    plain = align4(plain + v.bytes.length);
    chunks.push(encoded, new Uint8Array(align4(encoded.length) - encoded.length));
    packed = align4(packed + encoded.length);
    return out;
  });
  const bin = Buffer.concat(chunks);
  // The same streams uncompressed, for the record of what the compression saves.
  const raw = Buffer.concat(views.flatMap((v) => [Buffer.from(v.bytes), Buffer.alloc(align4(v.bytes.length) - v.bytes.length)]));
  const json = {
    asset: { ...source.asset, generator: `${source.asset.generator}; reports/elements-optimization/optimize-once.mjs (meshoptimizer 1.2.0)` },
    extensionsUsed: ['EXT_meshopt_compression'],
    extensionsRequired: ['EXT_meshopt_compression'],
    scene: source.scene, scenes: source.scenes, nodes: source.nodes,
    materials: source.materials, meshes, textures: source.textures, images: source.images, samplers: source.samplers,
    accessors, bufferViews,
    buffers: [
      { byteLength: plain, extensions: { EXT_meshopt_compression: { fallback: true } } },
      { byteLength: bin.length, uri: `${name}.bin` },
    ],
  };
  fs.writeFileSync(path.join(dir, `${name}.gltf`), `${JSON.stringify(json)}\n`);
  fs.writeFileSync(path.join(dir, `${name}.bin`), bin);
  return { plain, packed: bin.length, packedGzip: zlib.gzipSync(bin, { level: 9 }).length, raw: raw.length, rawGzip: zlib.gzipSync(raw, { level: 9 }).length };
}

/** A model's extent (meshoptimizer's scale), its measure (`propLevels.ts` propMeasure: its box's largest extent, every part), and one pixel at
 *  the largest size L1 is drawn at in model units: the bound of its texels, and its square the bound of the surface turned. */
function ladderOf(prims) {
  const all = new Float32Array(prims.flatMap((p) => [...p.position]));
  const extent = MeshoptSimplifier.getScale(all, 3);
  const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < all.length; i += 3) for (let k = 0; k < 3; k++) { lo[k] = Math.min(lo[k], all[i + k]); hi[k] = Math.max(hi[k], all[i + k]); }
  const across = Math.max(hi[0] - lo[0], hi[1] - lo[1], hi[2] - lo[2]);
  const pixel = across / (NEAR_PX * (1 + HYSTERESIS));
  return { extent, across, pixel, bound: ERROR_PX * pixel, area: pixel * pixel };
}

const names = fs.readdirSync(args.from).filter((f) => f.endsWith('.gltf')).map((f) => f.slice(0, -5)).sort();

if (args.check) {
  // The made files measured again, nothing written: L0 against the source, each L1 against its L0 (the same seeded samples as when made).
  const checked = [];
  for (const name of names) {
    const source = readModel(args.from, name).levels[0];
    const made = readModel(args.check, name);
    const l0s = made.levels[0], l1s = made.levels[1] ?? null;
    const sameL0 = l0s.length === source.length && source.every((p, i) => triangleKeys(p).join('\n') === triangleKeys(l0s[i]).join('\n'));
    const { extent, across, pixel, bound, area } = ladderOf(l0s);
    const parts = l0s.map((l0, i) => {
      const l1 = l1s?.[i] ?? null;
      const own = l1 !== null && triangleKeys(l1).join('\n') !== triangleKeys(l0).join('\n');
      const measured = own ? measure(l0, l1, extent, true, PRECISE_SAMPLES) : null;
      return {
        triangles: l0.index.length / 3, l1Triangles: own ? l1.index.length / 3 : null, recorded: l1?.extras ?? null, measured,
        texelPx: measured ? measured.max / pixel : null, shapePx: measured ? measured.geometric / pixel : null, turnedPx2: measured ? measured.turnedArea / area : null, recolouredPx2: measured ? measured.recolouredArea / area : null,
        within: measured ? measured.max <= bound && measured.turnedArea <= TURNED_SHARE * area && measured.recolouredArea <= TURNED_SHARE * area : null,
      };
    });
    checked.push({ name, sameL0, across, pixel, parts });
    console.log(`${name}: L0 ${sameL0 ? 'the source\'s triangles' : 'DIFFERS'}; ${parts.map((p) => (p.l1Triangles === null ? `${p.triangles} (no L1)` : `${p.triangles}->${p.l1Triangles} texel ${p.texelPx.toFixed(2)} px, shape ${p.shapePx.toFixed(2)} px, turned ${p.turnedPx2.toFixed(2)} px2, recoloured ${p.recolouredPx2.toFixed(2)} px2${p.within ? '' : ' OUT'}`)).join(' | ')}`);
  }
  fs.writeFileSync(args.report, `${JSON.stringify(checked, null, 1)}\n`);
  process.exit(checked.every((c) => c.sameL0 && c.parts.every((p) => p.within !== false)) ? 0 : 1);
}

fs.mkdirSync(args.to, { recursive: true });
const report = [];
for (const name of names) {
  const started = Date.now();
  const { json, levels: [prims] } = readModel(args.from, name);
  const sourceBin = fs.readFileSync(path.join(args.from, json.buffers[0].uri));
  const { extent, across, pixel, bound, area } = ladderOf(prims);
  const l0s = [], parts = [];
  for (const prim of prims) {
    const l0 = reorder(weld(prim));
    // Lossless: the same triangles, corner for corner.
    if (triangleKeys(prim).join('\n') !== triangleKeys(l0).join('\n')) throw new Error(`${name}: L0 does not draw the source's triangles`);
    l0s.push(l0);
    const { uvWeight, tried, kept } = lowerOf(l0, extent, bound, area);
    // The level kept: its surfaces' own distance too (measured with it), the shape alone, as the sheets measure it (`surfaceError.ts`).
    if (kept) kept.shape = kept.measured.geometric;
    parts.push({ material: json.materials[prim.material].name, sourceVertices: prim.position.length / 3, vertices: l0.position.length / 3, triangles: prim.index.length / 3, uvWeight, tried, kept });
  }
  const t0 = parts.reduce((s, p) => s + p.triangles, 0);
  const t1 = parts.reduce((s, p) => s + (p.kept ? p.kept.triangles : p.triangles), 0);
  const worth = t1 <= WORTH * t0;
  const l1s = parts.map((p) => (worth && p.kept ? { prim: p.kept.l1, extras: { error: p.kept.measured.max, turnedArea: p.kept.measured.turnedArea, recolouredArea: p.kept.measured.recolouredArea } } : null));
  const sizes = writeModel(args.to, name, json, l0s, l1s);
  // What was written read back: every level as the reader will decode it.
  const back = readModel(args.to, name);
  back.levels[0].forEach((p, i) => { if (triangleKeys(p).join('\n') !== triangleKeys(l0s[i]).join('\n')) throw new Error(`${name}: L0 read back differs`); });
  back.levels[1]?.forEach((p, i) => { if (triangleKeys(p).join('\n') !== triangleKeys(l1s[i]?.prim ?? l0s[i]).join('\n')) throw new Error(`${name}: L1 read back differs`); });
  const strip = (c) => (c ? (({ l1, ...rest }) => rest)(c) : null);
  report.push({
    name, extent, across, pixel, bound, area, nearPx: NEAR_PX, hysteresis: HYSTERESIS, errorPx: ERROR_PX, turnDegrees: TURN_DEGREES, colourStep: COLOUR_STEP,
    triangles: { l0: t0, l1: worth ? t1 : null }, worth,
    parts: parts.map((p) => ({ ...p, kept: strip(p.kept) })),
    bytes: {
      sourceGltf: fs.statSync(path.join(args.from, `${name}.gltf`)).size, sourceBin: sourceBin.length, sourceBinGzip: zlib.gzipSync(sourceBin, { level: 9 }).length,
      gltf: fs.statSync(path.join(args.to, `${name}.gltf`)).size, bin: sizes.packed, binGzip: sizes.packedGzip, raw: sizes.raw, rawGzip: sizes.rawGzip,
    },
    seconds: (Date.now() - started) / 1000,
  });
  const line = parts.map((p) => `${p.material} ${p.triangles}->${worth && p.kept ? `${p.kept.triangles} (${p.kept.flags} w${p.kept.weight} ${p.kept.target}: ${(p.kept.measured.max / pixel).toFixed(2)} px, turned ${(p.kept.measured.turnedArea / area).toFixed(2)} px2, recoloured ${(p.kept.measured.recolouredArea / area).toFixed(2)} px2)` : 'L0'}`).join(' | ');
  console.log(`${name}: ${line}; bin ${sourceBin.length} -> ${sizes.packed} (raw ${sizes.raw}); ${((Date.now() - started) / 1000).toFixed(0)} s`);
}
if (args.report) fs.writeFileSync(args.report, `${JSON.stringify(report, null, 1)}\n`);
