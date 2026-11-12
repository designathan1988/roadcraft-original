// ONE-TIME CONVERSION OF THE CAST'S SIXTEEN PEOPLE (run once, 2026-10-24; kept as a record only: not part of the build, not in package.json).
// Reads each person file of the old folder (format: `src/render/people/cookedPerson.ts`, version 3), rebuilds the near level to at most
// 3,000 triangles with meshoptimizer on the skinned mesh, keeps the middle level and the impostor as they are, DROPS the far shell (a
// 300-triangle hull in vertex colours, faceless: rejected on the sheets, 2026-10-24; the middle level is drawn down to the impostor), drops
// the vertices no level draws (the face's expressions re-indexed to the kept ones), names the person after its cast role and writes the body
// and its atlas to the new folder.
//
// `node optimize-once.mjs <old folder> <new folder> <report.json> [--dry]`, run from the project's root.
//
// The simplifier only rewrites indices (`simplifyWithAttributes`), so every kept vertex keeps its position, normal, colour, region byte,
// atlas coordinate, four bone indices and weights and its expression moves exactly. What it is told, so that what it removes looks the same:
// - the mesh must be welded (no two vertices with every attribute and every expression move equal: checked, refused otherwise), so the
//   atlas seams are the vertices sharing a position and differing elsewhere, which meshoptimizer keeps by itself;
// - attributes: the normal and atlas coordinate (the weights of the old ladder), how far each expression moves the vertex, and where its
//   bone weights put it (the weighted centre of its bones' heads): vertices weighted to other bones are told apart, so a collapse does not
//   make a joint bend differently;
// - locked (`vertex_lock`): every open border of a region (cloth, skin, hair, eyes) lying against another region (a hem on the skin, the
//   skin's edge under a sleeve, the hair's roots on the scalp, an eye in its lids), and every small part whole (a lace, a tuft of beard).
// Every level's error is MEASURED, not estimated: the two-sided distance between the level and the old near level at the rest pose (each
// mesh's samples, its vertices, edge midpoints and triangle centres, to the other's nearest triangle), the largest, as a share of the
// height; per region too, in the report. The errors must grow strictly from near to far (the game draws the coarsest level under a pixel,
// `riggedCitizens.ts` citizenLevelOf): checked, refused otherwise.
// Sources: https://github.com/zeux/meshoptimizer#simplification (welding, attributes, vertex_lock, getScale),
// node_modules/meshoptimizer/README.md and meshopt_simplifier.d.ts (meshoptimizer.js 1.2.0).
import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { pathToFileURL } from 'node:url';

// meshoptimizer as the project has it (run from the project's root).
const { MeshoptSimplifier } = await import(pathToFileURL(createRequire(path.join(process.cwd(), 'package.json')).resolve('meshoptimizer')).href);

const [fromDir, toDir, reportFile] = process.argv.slice(2).filter((a) => !a.startsWith('--'));
const DRY = process.argv.includes('--dry');
if (!fromDir || !toDir || !reportFile) throw new Error('usage: optimize-once.mjs <old folder> <new folder> <report.json> [--dry]');

/** The old ids and the cast role each body is named after now (`src/people/cast.json`: sex, age band, wardrobe; unique). */
const RENAME = {
  mh_34: 'female-adult-casual', mh_55: 'female-adult-sport-casual', mh_44: 'female-adult-smart-casual', mh_48: 'female-adult-business',
  mh_14: 'female-young-casual', mh_64: 'female-senior-casual', mh_00: 'female-child-casual', mh_08: 'female-child-sport-casual',
  mh_38: 'male-adult-casual', mh_59: 'male-adult-sport-casual', mh_45: 'male-adult-smart-casual', mh_51: 'male-adult-business',
  mh_18: 'male-young-casual', mh_67: 'male-senior-casual', mh_04: 'male-child-casual', mh_11: 'male-child-sport-casual',
};
if (new Set(Object.values(RENAME)).size !== Object.keys(RENAME).length) throw new Error('two bodies share a name');
/** The near level's budget (`LEVEL_TRIANGLES`). */
const NEAR = 3000;
/** A part of this many triangles or fewer (a lace, a tuft, a ring) is kept whole on the near level. */
const SMALL_PART = 16;
/** Normal and atlas weights of the old ladder (a seam torn by 0.1 of the atlas costs 6 cm); expression and skin weights per metre. */
const NORMAL_WEIGHT = 0.1, UV_WEIGHT = 0.6, MORPH_WEIGHT = 1, SKIN_WEIGHT = 0.5;
/** A region's border vertex this close to another region's surface is where the two meet: locked. */
const CONTACT = 0.015;
const REGIONS = ['cloth', 'skin', 'hair', 'eyes'];
/** The distance search's grid cell, metres. */
const GRID = 0.04;

const KINDS = { f32: Float32Array, u32: Uint32Array, u16: Uint16Array, i16: Int16Array, u8: Uint8Array, i8: Int8Array };
const kindOf = (a) => Object.entries(KINDS).find(([, K]) => a instanceof K)[0];

function decode(file) {
  const bytes = fs.readFileSync(file);
  const buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength);
  const length = new DataView(buffer).getUint32(0, true);
  const header = JSON.parse(new TextDecoder().decode(new Uint8Array(buffer, 4, length)));
  if (header.version !== 3) throw new Error(`${file}: version ${header.version}`);
  const base = 4 + ((length + 3) & ~3);
  const get = (ref) => { const K = KINDS[ref.kind]; return new K(buffer.slice(base + ref.at, base + ref.at + ref.length * K.BYTES_PER_ELEMENT)); };
  const m = header.mesh;
  return { header, size: bytes.byteLength, attributes: m.attributes.map(get), index: get(m.index), morphs: m.morphs.map((x) => ({ name: x.name, vertices: get(x.vertices), deltas: get(x.deltas) })) };
}

/** The layout of `packCookedPerson`: four bytes of header length, the JSON header, then every array 4-aligned. */
function pack(header, attributes, index, morphs) {
  const chunks = [];
  let size = 0;
  const put = (array) => {
    const raw = new Uint8Array(array.buffer, array.byteOffset, array.byteLength);
    const copy = new Uint8Array((raw.byteLength + 3) & ~3);
    copy.set(raw);
    const ref = { kind: kindOf(array), at: size, length: array.length };
    chunks.push(copy);
    size += copy.byteLength;
    return ref;
  };
  const mesh = { ...header.mesh, attributes: attributes.map(put), index: put(index), morphs: morphs.map((x) => ({ name: x.name, vertices: put(x.vertices), deltas: put(x.deltas) })) };
  const text = new TextEncoder().encode(JSON.stringify({ ...header, mesh }));
  const padded = (text.byteLength + 3) & ~3;
  const out = new Uint8Array(4 + padded + size);
  new DataView(out.buffer).setUint32(0, text.byteLength, true);
  out.set(text, 4);
  let at = 4 + padded;
  for (const c of chunks) { out.set(c, at); at += c.byteLength; }
  return out;
}

// ------------------------------------------------------------------ 4x4 matrices, column-major as three's `fromArray`
const mul = (a, b) => { const o = new Array(16).fill(0); for (let c = 0; c < 4; c++) for (let r = 0; r < 4; r++) for (let k = 0; k < 4; k++) o[c * 4 + r] += a[k * 4 + r] * b[c * 4 + k]; return o; };
const apply = (m, x, y, z) => [m[0] * x + m[4] * y + m[8] * z + m[12], m[1] * x + m[5] * y + m[9] * z + m[13], m[2] * x + m[6] * y + m[10] * z + m[14]];
function compose(p, q, s) {
  const [x, y, z, w] = q, x2 = x + x, y2 = y + y, z2 = z + z;
  const xx = x * x2, xy = x * y2, xz = x * z2, yy = y * y2, yz = y * z2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
  return [(1 - (yy + zz)) * s[0], (xy + wz) * s[0], (xz - wy) * s[0], 0, (xy - wz) * s[1], (1 - (xx + zz)) * s[1], (yz + wx) * s[1], 0,
    (xz + wy) * s[2], (yz - wx) * s[2], (1 - (xx + yy)) * s[2], 0, p[0], p[1], p[2], 1];
}
function invert(m) {
  const a = m, inv = new Array(16);
  inv[0] = a[5] * a[10] * a[15] - a[5] * a[11] * a[14] - a[9] * a[6] * a[15] + a[9] * a[7] * a[14] + a[13] * a[6] * a[11] - a[13] * a[7] * a[10];
  inv[4] = -a[4] * a[10] * a[15] + a[4] * a[11] * a[14] + a[8] * a[6] * a[15] - a[8] * a[7] * a[14] - a[12] * a[6] * a[11] + a[12] * a[7] * a[10];
  inv[8] = a[4] * a[9] * a[15] - a[4] * a[11] * a[13] - a[8] * a[5] * a[15] + a[8] * a[7] * a[13] + a[12] * a[5] * a[11] - a[12] * a[7] * a[9];
  inv[12] = -a[4] * a[9] * a[14] + a[4] * a[10] * a[13] + a[8] * a[5] * a[14] - a[8] * a[6] * a[13] - a[12] * a[5] * a[10] + a[12] * a[6] * a[9];
  inv[1] = -a[1] * a[10] * a[15] + a[1] * a[11] * a[14] + a[9] * a[2] * a[15] - a[9] * a[3] * a[14] - a[13] * a[2] * a[11] + a[13] * a[3] * a[10];
  inv[5] = a[0] * a[10] * a[15] - a[0] * a[11] * a[14] - a[8] * a[2] * a[15] + a[8] * a[3] * a[14] + a[12] * a[2] * a[11] - a[12] * a[3] * a[10];
  inv[9] = -a[0] * a[9] * a[15] + a[0] * a[11] * a[13] + a[8] * a[1] * a[15] - a[8] * a[3] * a[13] - a[12] * a[1] * a[11] + a[12] * a[3] * a[9];
  inv[13] = a[0] * a[9] * a[14] - a[0] * a[10] * a[13] - a[8] * a[1] * a[14] + a[8] * a[2] * a[13] + a[12] * a[1] * a[10] - a[12] * a[2] * a[9];
  inv[2] = a[1] * a[6] * a[15] - a[1] * a[7] * a[14] - a[5] * a[2] * a[15] + a[5] * a[3] * a[14] + a[13] * a[2] * a[7] - a[13] * a[3] * a[6];
  inv[6] = -a[0] * a[6] * a[15] + a[0] * a[7] * a[14] + a[4] * a[2] * a[15] - a[4] * a[3] * a[14] - a[12] * a[2] * a[7] + a[12] * a[3] * a[6];
  inv[10] = a[0] * a[5] * a[15] - a[0] * a[7] * a[13] - a[4] * a[1] * a[15] + a[4] * a[3] * a[13] + a[12] * a[1] * a[7] - a[12] * a[3] * a[5];
  inv[14] = -a[0] * a[5] * a[14] + a[0] * a[6] * a[13] + a[4] * a[1] * a[14] - a[4] * a[2] * a[13] - a[12] * a[1] * a[6] + a[12] * a[2] * a[5];
  inv[3] = -a[1] * a[6] * a[11] + a[1] * a[7] * a[10] + a[5] * a[2] * a[11] - a[5] * a[3] * a[10] - a[9] * a[2] * a[7] + a[9] * a[3] * a[6];
  inv[7] = a[0] * a[6] * a[11] - a[0] * a[7] * a[10] - a[4] * a[2] * a[11] + a[4] * a[3] * a[10] + a[8] * a[2] * a[7] - a[8] * a[3] * a[6];
  inv[11] = -a[0] * a[5] * a[11] + a[0] * a[7] * a[9] + a[4] * a[1] * a[11] - a[4] * a[3] * a[9] - a[8] * a[1] * a[7] + a[8] * a[3] * a[5];
  inv[15] = a[0] * a[5] * a[10] - a[0] * a[6] * a[9] - a[4] * a[1] * a[10] + a[4] * a[2] * a[9] + a[8] * a[1] * a[6] - a[8] * a[2] * a[5];
  const det = a[0] * inv[0] + a[1] * inv[4] + a[2] * inv[8] + a[3] * inv[12];
  return inv.map((x) => x / det);
}

// ------------------------------------------------------------------ distances
/** Squared distance from point p to triangle abc (Ericson, Real-Time Collision Detection, 5.1.5). */
function pointTriangle2(px, py, pz, P, a, b, c) {
  const ax = P[a * 3], ay = P[a * 3 + 1], az = P[a * 3 + 2];
  const abx = P[b * 3] - ax, aby = P[b * 3 + 1] - ay, abz = P[b * 3 + 2] - az;
  const acx = P[c * 3] - ax, acy = P[c * 3 + 1] - ay, acz = P[c * 3 + 2] - az;
  const apx = px - ax, apy = py - ay, apz = pz - az;
  const d1 = abx * apx + aby * apy + abz * apz, d2 = acx * apx + acy * apy + acz * apz;
  let s = 0, t = 0;
  if (d1 <= 0 && d2 <= 0) { s = 0; t = 0; } else {
    const bpx = px - P[b * 3], bpy = py - P[b * 3 + 1], bpz = pz - P[b * 3 + 2];
    const d3 = abx * bpx + aby * bpy + abz * bpz, d4 = acx * bpx + acy * bpy + acz * bpz;
    const cpx = px - P[c * 3], cpy = py - P[c * 3 + 1], cpz = pz - P[c * 3 + 2];
    const d5 = abx * cpx + aby * cpy + abz * cpz, d6 = acx * cpx + acy * cpy + acz * cpz;
    const vc = d1 * d4 - d3 * d2, vb = d5 * d2 - d1 * d6, va = d3 * d6 - d5 * d4;
    if (d3 >= 0 && d4 <= d3) { s = 1; t = 0; } else if (d6 >= 0 && d5 <= d6) { s = 0; t = 1; } else if (vc <= 0 && d1 >= 0 && d3 <= 0) { s = d1 / (d1 - d3); t = 0; } else if (vb <= 0 && d2 >= 0 && d6 <= 0) { s = 0; t = d2 / (d2 - d6); } else if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) { t = (d4 - d3) / ((d4 - d3) + (d5 - d6)); s = 1 - t; } else { const den = 1 / (va + vb + vc); s = vb * den; t = vc * den; }
  }
  const qx = ax + abx * s + acx * t, qy = ay + aby * s + acy * t, qz = az + abz * s + acz * t;
  return (px - qx) ** 2 + (py - qy) ** 2 + (pz - qz) ** 2;
}

/** The triangles of `index` (region `r`, or all) with their bounding spheres, to measure points against. */
function triangleSet(index, P, region, r) {
  const tris = [];
  for (let i = 0; i < index.length; i += 3) if (r < 0 || region[index[i]] === r) tris.push(i);
  // A uniform grid of GRID-metre cells, each triangle in every cell its box touches.
  const cells = new Map();
  const key = (i, j, k) => ((i + 512) * 1024 + (j + 512)) * 1024 + (k + 512);
  tris.forEach((t, n) => {
    const lo = [Infinity, Infinity, Infinity], hi = [-Infinity, -Infinity, -Infinity];
    for (let e = 0; e < 3; e++) for (let c = 0; c < 3; c++) { const x = P[index[t + e] * 3 + c]; lo[c] = Math.min(lo[c], x); hi[c] = Math.max(hi[c], x); }
    const [i0, j0, k0] = lo.map((x) => Math.floor(x / GRID)), [i1, j1, k1] = hi.map((x) => Math.floor(x / GRID));
    for (let i = i0; i <= i1; i++) for (let j = j0; j <= j1; j++) for (let k = k0; k <= k1; k++) {
      const at = key(i, j, k);
      let list = cells.get(at);
      if (!list) cells.set(at, (list = []));
      list.push(n);
    }
  });
  return { index, tris, cells, key, stamp: new Uint32Array(tris.length), visit: 0 };
}
/** The exact distance from (x, y, z) to the nearest triangle of the set: the grid's cells in growing shells round the point's, until
 *  the nearest found is nearer than any unvisited cell can be. */
function distanceTo(set, P, x, y, z) {
  if (!set.tris.length) return Infinity;
  const ci = Math.floor(x / GRID), cj = Math.floor(y / GRID), ck = Math.floor(z / GRID);
  const visit = ++set.visit;
  let best = Infinity;
  for (let ring = 0; ring < 64; ring++) {
    for (let i = ci - ring; i <= ci + ring; i++) for (let j = cj - ring; j <= cj + ring; j++) for (let k = ck - ring; k <= ck + ring; k++) {
      if (Math.max(Math.abs(i - ci), Math.abs(j - cj), Math.abs(k - ck)) !== ring) continue;
      const list = set.cells.get(set.key(i, j, k));
      if (!list) continue;
      for (const n of list) {
        if (set.stamp[n] === visit) continue;
        set.stamp[n] = visit;
        const t = set.tris[n];
        const e = pointTriangle2(x, y, z, P, set.index[t], set.index[t + 1], set.index[t + 2]);
        if (e < best) best = e;
      }
    }
    // Every cell not yet visited lies at least ring * GRID from the point.
    if (best <= (ring * GRID) ** 2) return Math.sqrt(best);
  }
  // Farther than 64 cells: every triangle, one by one.
  for (let n = 0; n < set.tris.length; n++) {
    const t = set.tris[n];
    best = Math.min(best, pointTriangle2(x, y, z, P, set.index[t], set.index[t + 1], set.index[t + 2]));
  }
  return Math.sqrt(best);
}
/** Points of region `r` of `index`: its vertices, its edges' midpoints and its triangles' centres. */
function samples(index, P, region, r) {
  const out = [], seen = new Set();
  const at = (v) => [P[v * 3], P[v * 3 + 1], P[v * 3 + 2]];
  for (let i = 0; i < index.length; i += 3) {
    if (region[index[i]] !== r) continue;
    const t = [index[i], index[i + 1], index[i + 2]].map(at);
    for (let e = 0; e < 3; e++) {
      const v = index[i + e];
      if (!seen.has(v)) { seen.add(v); out.push(t[e]); }
      const u = t[(e + 1) % 3];
      out.push([(t[e][0] + u[0]) / 2, (t[e][1] + u[1]) / 2, (t[e][2] + u[2]) / 2]);
    }
    out.push([(t[0][0] + t[1][0] + t[2][0]) / 3, (t[0][1] + t[1][1] + t[2][1]) / 3, (t[0][2] + t[1][2] + t[2][2]) / 3]);
  }
  return out;
}
/** Two-sided distance between a level and the reference (both at the rest pose), in metres: the largest and the RMS over every sample,
 *  each mesh's points to the other's nearest triangle whatever its region (what is seen), and the same region by region (a diagnostic:
 *  a region the other mesh has none of is measured against its whole surface). */
function measure(level, reference, P, region, perRegion = false) {
  /** The points of `from` (region `r`, or all) to the triangles of `to` (region `toRegion`, or all). */
  const side = (from, r, to, toRegion) => {
    const set = triangleSet(to, P, region, toRegion);
    let max = 0, sum = 0, count = 0;
    for (const q of [0, 1, 2, 3]) if (r < 0 || q === r) for (const [x, y, z] of samples(from, P, region, q)) { const d = distanceTo(set, P, x, y, z); max = Math.max(max, d); sum += d * d; count++; }
    return { max, sum, count };
  };
  const both = (a, b) => ({ max: Math.max(a.max, b.max), rms: Math.sqrt((a.sum + b.sum) / Math.max(1, a.count + b.count)), referenceToLevel: a.max, levelToReference: b.max });
  const whole = both(side(reference, -1, level, -1), side(level, -1, reference, -1));
  if (!perRegion) return whole;
  const has = (index, r) => { for (let i = 0; i < index.length; i += 3) if (region[index[i]] === r) return true; return false; };
  const regions = [];
  for (let r = 0; r < 4; r++) {
    if (!has(reference, r) && !has(level, r)) continue;
    const x = both(side(reference, r, level, has(level, r) ? r : -1), side(level, r, reference, has(reference, r) ? r : -1));
    regions.push({ region: REGIONS[r], max: x.max, rms: x.rms });
  }
  return { ...whole, regions };
}

/** Vertices on an open border of their region's surface (edges of one triangle once the region's vertices are welded by position). */
function borderVertices(index, P, region) {
  const weld = new Map(), rep = new Int32Array(P.length / 3).fill(-1);
  for (const v of index) if (rep[v] < 0) {
    const key = `${region[v]}:${P[v * 3]},${P[v * 3 + 1]},${P[v * 3 + 2]}`;
    let r = weld.get(key);
    if (r === undefined) weld.set(key, (r = v));
    rep[v] = r;
  }
  const edges = new Map();
  for (let i = 0; i < index.length; i += 3) for (let e = 0; e < 3; e++) {
    const a = rep[index[i + e]], b = rep[index[i + (e + 1) % 3]];
    const key = a < b ? `${a},${b}` : `${b},${a}`;
    edges.set(key, (edges.get(key) ?? 0) + 1);
  }
  const border = new Set();
  for (const [key, count] of edges) if (count === 1) for (const r of key.split(',')) border.add(Number(r));
  return [...new Set(index)].filter((v) => border.has(rep[v]));
}

// ------------------------------------------------------------------ one body
await MeshoptSimplifier.ready;
if (!DRY) fs.mkdirSync(toDir, { recursive: true });
const report = [];
for (const [oldId, newId] of Object.entries(RENAME)) {
  const p = decode(path.join(fromDir, `${oldId}.bin`));
  const h = p.header, m = h.mesh, n = m.vertexCount;
  const [qpos, qnor, col, quv, skinIndex, skinWeight] = p.attributes;
  const s = m.quant.scale / 32767, [ox, oy, oz] = m.quant.offset;
  /** Positions in metres in the mesh's frame (the quantisation undone): what the simplifier works on. */
  const P = new Float32Array(n * 3);
  for (let v = 0; v < n; v++) { P[v * 3] = qpos[v * 3] * s + ox; P[v * 3 + 1] = qpos[v * 3 + 1] * s + oy; P[v * 3 + 2] = qpos[v * 3 + 2] * s + oz; }
  const region = new Uint8Array(n);
  for (let v = 0; v < n; v++) region[v] = col[v * 4 + 3] >> 6;
  const level = (k) => new Uint32Array(p.index.slice(m.levels[k].start, m.levels[k].start + m.levels[k].count));
  const [L0, L1, L2] = [0, 1, 2].map(level);

  // Welded: two vertices with every attribute byte and every expression move equal would be one vertex twice.
  const moves = Array.from({ length: n }, () => []);
  p.morphs.forEach((x, k) => x.vertices.forEach((v, i) => moves[v].push(k, x.deltas[i * 3], x.deltas[i * 3 + 1], x.deltas[i * 3 + 2])));
  const seen = new Set();
  for (const v of new Set(L0)) {
    const key = [qpos.subarray(v * 3, v * 3 + 3), qnor.subarray(v * 4, v * 4 + 4), col.subarray(v * 4, v * 4 + 4), quv.subarray(v * 2, v * 2 + 2),
      skinIndex.subarray(v * 4, v * 4 + 4), skinWeight.subarray(v * 4, v * 4 + 4), moves[v]].map((a) => Array.from(a).join(',')).join('|');
    if (seen.has(key)) throw new Error(`${oldId}: vertex ${v} duplicates another: weld first`);
    seen.add(key);
  }

  // The rest pose, as the game's `restRig` holds it (every node where the file has it), skinned as three skins (`attached`):
  // world = mesh.matrixWorld * bindMatrixInverse * sum(weight * bone.matrixWorld * boneInverse) * bindMatrix * position.
  const world = [];
  h.nodes.forEach((node, i) => {
    const local = i === m.node ? compose(m.quant.offset, node.q, [m.quant.scale, m.quant.scale, m.quant.scale]) : compose(node.p, node.q, node.s);
    world[i] = node.parent >= 0 ? mul(world[node.parent], local) : local;
  });
  const bindInverse = invert(m.bind);
  const palette = m.bones.map((b, k) => mul(mul(mul(world[m.node], bindInverse), mul(world[b], m.inverses.slice(k * 16, k * 16 + 16))), m.bind));
  const R = new Float32Array(n * 3);
  let restMove = 0;
  for (let v = 0; v < n; v++) {
    const g = [qpos[v * 3] / 32767, qpos[v * 3 + 1] / 32767, qpos[v * 3 + 2] / 32767];
    let x = 0, y = 0, z = 0, wsum = 0;
    for (let k = 0; k < 4; k++) {
      const w = skinWeight[v * 4 + k] / 255;
      if (!w) continue;
      const q = apply(palette[skinIndex[v * 4 + k]], g[0], g[1], g[2]);
      x += w * q[0]; y += w * q[1]; z += w * q[2]; wsum += w;
    }
    R[v * 3] = x / wsum; R[v * 3 + 1] = y / wsum; R[v * 3 + 2] = z / wsum;
    const bound = apply(world[m.node], g[0], g[1], g[2]);
    restMove = Math.max(restMove, Math.hypot(R[v * 3] - bound[0], R[v * 3 + 1] - bound[1], R[v * 3 + 2] - bound[2]));
  }
  let minY = Infinity, maxY = -Infinity;
  for (const v of new Set(L0)) { minY = Math.min(minY, R[v * 3 + 1]); maxY = Math.max(maxY, R[v * 3 + 1]); }
  if (Math.abs(maxY - minY - h.height) > 0.05 * h.height) throw new Error(`${oldId}: the rest pose stands ${maxY - minY} m, the file says ${h.height}`);

  // The bones' heads in the mesh's frame (metres), for the skin attribute: each bone's bind world, inverse(boneInverse), back through the bind and the quantisation.
  const toMetres = mul([m.quant.scale, 0, 0, 0, 0, m.quant.scale, 0, 0, 0, 0, m.quant.scale, 0, ox, oy, oz, 1], bindInverse);
  const heads = m.bones.map((_, k) => { const g = mul(toMetres, invert(m.inverses.slice(k * 16, k * 16 + 16))); return [g[12], g[13], g[14]]; });
  const headOf = (name) => heads[m.bones.findIndex((b) => h.nodes[b].name === name)];
  if (Math.abs(headOf('Bip01_Head')[1] - h.height * 0.87) > h.height * 0.08 || headOf('Bip01_L_Foot')[1] > h.height * 0.12) throw new Error(`${oldId}: bone heads at ${headOf('Bip01_Head')} and ${headOf('Bip01_L_Foot')}, height ${h.height}`);

  // The simplifier's attributes: normal (3), atlas uv (2), each expression's reach in metres (13), the bone-weighted centre in metres (3).
  const nm = p.morphs.length, A = 5 + nm + 3;
  const attributes = new Float32Array(n * A);
  for (let v = 0; v < n; v++) {
    const o = v * A;
    attributes[o] = qnor[v * 4] / 127; attributes[o + 1] = qnor[v * 4 + 1] / 127; attributes[o + 2] = qnor[v * 4 + 2] / 127;
    attributes[o + 3] = quv[v * 2] / 65535; attributes[o + 4] = quv[v * 2 + 1] / 65535;
    let wsum = 0, cx = 0, cy = 0, cz = 0;
    for (let k = 0; k < 4; k++) { const w = skinWeight[v * 4 + k] / 255; const b = heads[skinIndex[v * 4 + k]]; cx += w * b[0]; cy += w * b[1]; cz += w * b[2]; wsum += w; }
    attributes[o + 5 + nm] = cx / wsum; attributes[o + 6 + nm] = cy / wsum; attributes[o + 7 + nm] = cz / wsum;
  }
  p.morphs.forEach((x, k) => x.vertices.forEach((v, i) => { attributes[v * A + 5 + k] = Math.hypot(x.deltas[i * 3], x.deltas[i * 3 + 1], x.deltas[i * 3 + 2]) * s; }));
  // The simplifier's positions are shares of the mesh's extent: a metre of an attribute weighs 1 / extent to count as a metre of surface.
  const extent = MeshoptSimplifier.getScale(P, 3);
  const weights = [NORMAL_WEIGHT, NORMAL_WEIGHT, NORMAL_WEIGHT, UV_WEIGHT, UV_WEIGHT, ...Array(nm).fill(MORPH_WEIGHT / extent), ...Array(3).fill(SKIN_WEIGHT / extent)];

  // Locked on both rebuilt levels: a region's open border against another region's surface (of the old near level).
  const lock = new Uint8Array(n);
  {
    const others = [0, 1, 2, 3].map((r) => triangleSet(L0, P, region, r));
    for (const v of borderVertices(L0, P, region)) {
      for (let r = 0; r < 4; r++) {
        if (r === region[v] || !others[r].tris.length) continue;
        if (distanceTo(others[r], P, P[v * 3], P[v * 3 + 1], P[v * 3 + 2]) < CONTACT) { lock[v] = 1; break; }
      }
    }
  }
  // Locked on the near level too: every small part whole (a shoe lace, a tuft of beard, a ring: a component of the old near level, welded
  // by position within its region, of SMALL_PART triangles or fewer), which the simplifier would otherwise collapse to nothing.
  const lockNear = new Uint8Array(lock);
  const smallParts = [];
  {
    const rep = new Int32Array(n).fill(-1), byPosition = new Map();
    for (const v of new Set(L0)) { const key = region[v] + ':' + P[v * 3] + ',' + P[v * 3 + 1] + ',' + P[v * 3 + 2]; if (!byPosition.has(key)) byPosition.set(key, v); rep[v] = byPosition.get(key); }
    const parent = new Map();
    const find = (x) => { while (parent.get(x) !== x) { parent.set(x, parent.get(parent.get(x))); x = parent.get(x); } return x; };
    for (const v of new Set(L0)) parent.set(rep[v], rep[v]);
    for (let i = 0; i < L0.length; i += 3) { const a = find(rep[L0[i]]); parent.set(find(rep[L0[i + 1]]), a); parent.set(find(rep[L0[i + 2]]), find(a)); }
    const triangles = new Map();
    for (let i = 0; i < L0.length; i += 3) { const r = find(rep[L0[i]]); triangles.set(r, (triangles.get(r) ?? 0) + 1); }
    for (const v of new Set(L0)) if (triangles.get(find(rep[v])) <= SMALL_PART) lockNear[v] = 1;
    for (const [r, t] of triangles) if (t <= SMALL_PART) smallParts.push({ region: REGIONS[region[r]], triangles: t });
  }
  const locked = lock.reduce((t, x) => t + x, 0), lockedNear = lockNear.reduce((t, x) => t + x, 0);

  /** The old near level simplified to `triangles` with `flags` and the locks, and what meshoptimizer says of it (its relative error and that in metres). */
  const simplify = (triangles, flags, locks) => {
    if (L0.length <= triangles * 3) return { index: L0, simplifier: 0, metres: 0, flags: 'kept' };
    const [index, error] = MeshoptSimplifier.simplifyWithAttributes(L0, P, 3, attributes, A, weights, locks, triangles * 3, 1, flags);
    return { index, simplifier: error, metres: error * extent, flags: flags.join('+') || 'none' };
  };
  const measured = (built) => ({ ...built, measured: measure(built.index, L0, R, region) });

  // The near level: borders and small parts locked, seams kept; it must reach its budget.
  const near = measured(simplify(NEAR, [], lockNear));
  if (near.index.length > NEAR * 3) throw new Error(`${oldId}: the near level stays at ${near.index.length / 3} triangles`);

  // The middle level as it is. DO NOT replace it by one simplified from the near level: tried at 800 and 1200 triangles (borders,
  // face features, eyes, finger tips, hair borders locked in turn, the sheets of 2026-10-24), each one caved the mouth in, tore a lock
  // out of the hair, thinned the legs to sticks or lost the shoes; none passed its sheet. It is measured the same way as the others.
  const middle = { index: L1, flags: 'kept', simplifier: null, metres: null, measured: measure(L1, L0, R, region) };
  const levels = [near, middle];
  for (const l of levels) { l.error = l.measured.max / h.height; l.regions = measure(l.index, L0, R, region, true).regions; }
  if (!(levels[0].error < levels[1].error)) throw new Error(`${oldId}: errors ${levels.map((l) => l.error)} do not grow`);

  // Compact: the vertices some level draws, in their old order.
  const used = new Uint8Array(n);
  for (const l of levels) for (const v of l.index) used[v] = 1;
  const remap = new Int32Array(n).fill(-1), back = [];
  for (let v = 0; v < n; v++) if (used[v]) { remap[v] = back.length; back.push(v); }
  const count = back.length;
  const pick = (array, size) => { const out = new array.constructor(count * size); back.forEach((v, i) => out.set(array.subarray(v * size, v * size + size), i * size)); return out; };
  const outAttributes = [pick(qpos, 3), pick(qnor, 4), pick(col, 4), pick(quv, 2), pick(skinIndex, 4), pick(skinWeight, 4)];
  const outIndex = new Uint16Array(levels.reduce((t, l) => t + l.index.length, 0));
  const outLevels = [];
  let at = 0;
  for (const l of levels) { for (let i = 0; i < l.index.length; i++) outIndex[at + i] = remap[l.index[i]]; outLevels.push({ start: at, count: l.index.length, error: l.error }); at += l.index.length; }
  const outMorphs = p.morphs.map((x) => {
    const keep = [];
    for (let i = 0; i < x.vertices.length; i++) if (used[x.vertices[i]]) keep.push(i);
    const vertices = new Uint16Array(keep.length), deltas = new Int16Array(keep.length * 3);
    keep.forEach((i, j) => { vertices[j] = remap[x.vertices[i]]; deltas.set(x.deltas.subarray(i * 3, i * 3 + 3), j * 3); });
    return { name: x.name, vertices, deltas };
  });
  // Every kept vertex moves in every expression exactly as before; every vertex an expression moved and a level draws is still moved.
  outMorphs.forEach((x, k) => {
    const old = new Map(Array.from(p.morphs[k].vertices, (v, i) => [v, i]));
    for (let j = 0; j < x.vertices.length; j++) {
      const i = old.get(back[x.vertices[j]]);
      for (let c = 0; c < 3; c++) if (p.morphs[k].deltas[i * 3 + c] !== x.deltas[j * 3 + c]) throw new Error(`${oldId}: ${x.name} moved`);
    }
    const drawn = Array.from(p.morphs[k].vertices).filter((v) => used[v]).length;
    if (drawn !== x.vertices.length) throw new Error(`${oldId}: ${x.name} lost moved vertices`);
  });
  const header = { ...h, id: newId, mesh: { ...m, vertexCount: count, levels: outLevels }, atlas: { ...h.atlas, file: `${newId}.ktx2` } };
  const bytes = pack(header, outAttributes, outIndex, outMorphs);
  if (!DRY) {
    fs.writeFileSync(path.join(toDir, `${newId}.bin`), bytes);
    fs.copyFileSync(path.join(fromDir, `${oldId}.ktx2`), path.join(toDir, `${newId}.ktx2`));
  }
  const regionsOf = (index) => Object.fromEntries(REGIONS.map((name, r) => { let c = 0; for (let i = 0; i < index.length; i += 3) if (region[index[i]] === r) c++; return [name, c]; }));
  const mm = (x) => Math.round(x * 10000) / 10;
  const oldMiddle = measure(L1, L0, R, region, true);
  const describe = (l) => ({ flags: l.flags, simplifierRelative: l.simplifier, simplifierMm: l.metres === null ? null : mm(l.metres),
    maxMm: mm(l.measured.max), rmsMm: mm(l.measured.rms), referenceToLevelMm: mm(l.measured.referenceToLevel), levelToReferenceMm: mm(l.measured.levelToReference),
    switchPixels: l.error > 0 ? Math.round(1 / l.error) : null, regions: l.regions.map((r) => ({ region: r.region, maxMm: mm(r.max), rmsMm: mm(r.rms) })) });
  report.push({
    oldId, newId, height: h.height, restPoseMoveMm: mm(restMove), lockedBorderVertices: locked, lockedNearVertices: lockedNear, smallParts: smallParts.length,
    before: { triangles: [L0, L1, L2].map((l) => l.length / 3), storedErrors: m.levels.map((l) => l.error), vertices: n, bytes: p.size, regions: [L0, L1, L2].map(regionsOf),
      middleMeasured: { error: oldMiddle.max / h.height, maxMm: mm(oldMiddle.max), rmsMm: mm(oldMiddle.rms), regions: oldMiddle.regions.map((r) => ({ region: r.region, maxMm: mm(r.max), rmsMm: mm(r.rms) })) } },
    after: { triangles: levels.map((l) => l.index.length / 3), errors: outLevels.map((l) => l.error), vertices: count, bytes: bytes.byteLength,
      atlasBytes: fs.statSync(path.join(fromDir, `${oldId}.ktx2`)).size, regions: levels.map((l) => regionsOf(l.index)), levels: levels.map(describe) },
  });
  const r = report.at(-1);
  console.log(`${oldId} -> ${newId}: triangles ${r.before.triangles.join('/')} -> ${r.after.triangles.join('/')}; measured max/rms mm ${r.after.levels.map((l) => `${l.maxMm}/${l.rmsMm}`).join(', ')} ` +
    `(old middle ${r.before.middleMeasured.maxMm}/${r.before.middleMeasured.rmsMm}); meshopt ${r.after.levels.slice(0, 2).map((l) => `${(l.simplifierRelative ?? 0).toExponential(2)} (${l.simplifierMm} mm, ${l.flags})`).join(', ')}; ` +
    `errors ${r.after.errors.map((e) => e.toFixed(4)).join('/')}; switch px ${r.after.levels.map((l) => l.switchPixels).join('/')}; vertices ${n} -> ${count}; bytes ${p.size} -> ${bytes.byteLength}; ` +
    `small parts ${smallParts.length}`);
}
fs.writeFileSync(reportFile, JSON.stringify(report, null, 1));
