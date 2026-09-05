// Builds public/models/coach.glb from the raw Mixamo exports in src/animations/.
//
// The exports are cumulative: each file re-contains every animation from the
// ones before it, so situps.glb (the last export) already holds ten of the
// eleven clips on a single rig. Only bodyweight-squat.glb was exported from a
// separate Blender session, on a duplicate of the same Mixamo "Alpha" rig — its
// clip is retargeted onto the base rig by bone name.
//
// Every clip ships from Mixamo named "mixamo.com", so this also renames them to
// the slugs the app looks up. Clip order was verified against hip-height
// fingerprints (the plank's hips are static; box jumps rise ~50 units).
//
// Run: node scripts/build-coach-glb.mjs

import fs from "node:fs";
import path from "node:path";

const SRC = "src/animations";
const OUT = "public/models/coach.glb";

// The raw Mixamo exports are ~30MB and are NOT in git (see .gitignore) — the
// built coach.glb is committed instead. So on a clean clone, and on Vercel,
// the sources are absent and there is nothing to rebuild: use the committed
// model and carry on. Only fail if neither the sources nor the output exist,
// which is a genuinely broken checkout.
if (!fs.existsSync(SRC) || fs.readdirSync(SRC).filter((f) => f.endsWith(".glb")).length === 0) {
  if (fs.existsSync(OUT)) {
    console.log(`[coach-glb] ${SRC} not present — using the committed ${OUT}.`);
    process.exit(0);
  }
  console.error(`[coach-glb] neither ${SRC} nor ${OUT} exists — cannot build the 3D coach.`);
  process.exit(1);
}

// situps.glb's animations, in export order.
const BASE_CLIPS = [
  "back-squat",
  "bicycle-situps",
  null, // duplicate import of bicycle-situps — dropped
  "box-jumps",
  "burpees",
  "jumping-jacks",
  "kettlebell-swing",
  "pike-walkout",
  "standing-pistol",
  "plank",
  "situps",
];

const JSON_CHUNK = 0x4e4f534a;
const BIN_CHUNK = 0x004e4942;

function parseGlb(file) {
  const buf = fs.readFileSync(file);
  if (buf.readUInt32LE(0) !== 0x46546c67) throw new Error(`${file}: not a GLB`);
  let json = null;
  let bin = Buffer.alloc(0);
  let offset = 12;
  while (offset < buf.length) {
    const length = buf.readUInt32LE(offset);
    const type = buf.readUInt32LE(offset + 4);
    const data = buf.subarray(offset + 8, offset + 8 + length);
    if (type === JSON_CHUNK) json = JSON.parse(data.toString("utf8"));
    else if (type === BIN_CHUNK) bin = data;
    offset += 8 + length;
  }
  return { json, bin };
}

function pad4(n) {
  return (4 - (n % 4)) % 4;
}

function writeGlb(file, json, bin) {
  const jsonBuf = Buffer.from(JSON.stringify(json), "utf8");
  const jsonPad = Buffer.alloc(pad4(jsonBuf.length), 0x20);
  const binPad = Buffer.alloc(pad4(bin.length), 0);
  const jsonLen = jsonBuf.length + jsonPad.length;
  const binLen = bin.length + binPad.length;
  const header = Buffer.alloc(12);
  header.writeUInt32LE(0x46546c67, 0);
  header.writeUInt32LE(2, 4);
  header.writeUInt32LE(12 + 8 + jsonLen + 8 + binLen, 8);
  const jsonHeader = Buffer.alloc(8);
  jsonHeader.writeUInt32LE(jsonLen, 0);
  jsonHeader.writeUInt32LE(JSON_CHUNK, 4);
  const binHeader = Buffer.alloc(8);
  binHeader.writeUInt32LE(binLen, 0);
  binHeader.writeUInt32LE(BIN_CHUNK, 4);
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(
    file,
    Buffer.concat([header, jsonHeader, jsonBuf, jsonPad, binHeader, binBufOf(bin), binPad]),
  );
}

function binBufOf(bin) {
  return Buffer.isBuffer(bin) ? bin : Buffer.from(bin);
}

// The raw Mixamo exports are ~31MB and may not be present in a deploy
// checkout — the built coach.glb is what actually ships. Skip rather than
// fail the build when the sources aren't there but the output already is.
const sources = ["situps.glb", "bodyweight-squat.glb"].map((f) => path.join(SRC, f));
if (!sources.every((f) => fs.existsSync(f))) {
  if (fs.existsSync(OUT)) {
    console.log(`${SRC} not present — keeping the existing ${OUT}`);
    process.exit(0);
  }
  throw new Error(`missing raw exports in ${SRC}/ and no prebuilt ${OUT}`);
}

const base = parseGlb(path.join(SRC, "situps.glb"));
const extra = parseGlb(path.join(SRC, "bodyweight-squat.glb"));

// --- Rename + dedupe the base clips -----------------------------------------
if (base.json.animations.length !== BASE_CLIPS.length) {
  throw new Error(
    `situps.glb has ${base.json.animations.length} animations, expected ${BASE_CLIPS.length}`,
  );
}
base.json.animations = base.json.animations
  .map((anim, i) => (BASE_CLIPS[i] ? { ...anim, name: BASE_CLIPS[i] } : null))
  .filter(Boolean);

// --- Retarget bodyweight-squat onto the base rig ----------------------------
const baseNodeByName = new Map();
base.json.nodes.forEach((node, i) => {
  if (node.name && !baseNodeByName.has(node.name)) baseNodeByName.set(node.name, i);
});

const binParts = [binBufOf(base.bin)];
let binLength = base.bin.length;

// Copies one accessor (and the slice of BIN it points at) from `extra` into
// `base`, returning the new accessor index. Animation accessors are tightly
// packed and never sparse, so a straight byte copy is enough.
const accessorCache = new Map();
function copyAccessor(srcIndex) {
  if (accessorCache.has(srcIndex)) return accessorCache.get(srcIndex);
  const acc = extra.json.accessors[srcIndex];
  if (acc.sparse) throw new Error("sparse accessors are not supported");
  const view = extra.json.bufferViews[acc.bufferView];
  const componentSize = { 5120: 1, 5121: 1, 5122: 2, 5123: 2, 5125: 4, 5126: 4 }[acc.componentType];
  const componentCount = { SCALAR: 1, VEC2: 2, VEC3: 3, VEC4: 4 }[acc.type];
  const byteLength = acc.count * componentSize * componentCount;
  const start = (view.byteOffset ?? 0) + (acc.byteOffset ?? 0);
  const bytes = extra.bin.subarray(start, start + byteLength);

  const padding = pad4(binLength);
  if (padding) {
    binParts.push(Buffer.alloc(padding, 0));
    binLength += padding;
  }
  base.json.bufferViews.push({ buffer: 0, byteOffset: binLength, byteLength });
  binParts.push(Buffer.from(bytes));
  binLength += byteLength;

  base.json.accessors.push({
    bufferView: base.json.bufferViews.length - 1,
    componentType: acc.componentType,
    count: acc.count,
    type: acc.type,
    ...(acc.max ? { max: acc.max } : {}),
    ...(acc.min ? { min: acc.min } : {}),
  });
  const newIndex = base.json.accessors.length - 1;
  accessorCache.set(srcIndex, newIndex);
  return newIndex;
}

const squatAnim = extra.json.animations[0];
const samplers = squatAnim.samplers.map((s) => ({
  input: copyAccessor(s.input),
  output: copyAccessor(s.output),
  interpolation: s.interpolation ?? "LINEAR",
}));
const channels = squatAnim.channels.map((c) => {
  const boneName = extra.json.nodes[c.target.node].name;
  const target = baseNodeByName.get(boneName);
  if (target === undefined) throw new Error(`no bone named ${boneName} on the base rig`);
  return { sampler: c.sampler, target: { node: target, path: c.target.path } };
});
base.json.animations.push({ name: "bodyweight-squat", samplers, channels });

base.json.buffers[0].byteLength = binLength;
base.json.asset.generator = "move-sharp build-coach-glb";

writeGlb(OUT, base.json, Buffer.concat(binParts));

const size = (fs.statSync(OUT).size / 1024 / 1024).toFixed(2);
console.log(`${OUT}  ${size} MB`);
console.log(`clips: ${base.json.animations.map((a) => a.name).join(", ")}`);
