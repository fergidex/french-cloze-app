#!/usr/bin/env node
/**
 * Generates PNG icons for the PWA using only Node.js built-ins (no native deps).
 * Run: node scripts/generate-icons.js
 *
 * Creates:
 *   public/icon-192.png
 *   public/icon-512.png
 *   public/apple-touch-icon.png  (180×180)
 */

const zlib = require("zlib");
const fs = require("fs");
const path = require("path");

// ── CRC-32 (required by PNG format) ─────────────────────────────────────────
const CRC_TABLE = new Uint32Array(256);
for (let n = 0; n < 256; n++) {
  let c = n;
  for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  CRC_TABLE[n] = c;
}
function crc32(buf) {
  let c = 0xffffffff;
  for (let i = 0; i < buf.length; i++)
    c = CRC_TABLE[(c ^ buf[i]) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0;
}

function chunk(type, data) {
  const t = Buffer.from(type, "ascii");
  const len = Buffer.alloc(4);
  len.writeUInt32BE(data.length);
  const crcBuf = Buffer.alloc(4);
  crcBuf.writeUInt32BE(crc32(Buffer.concat([t, data])));
  return Buffer.concat([len, t, data, crcBuf]);
}

/**
 * Creates a solid-color PNG with an "F" letter drawn in white.
 * @param {number} size - Width/height in pixels
 * @param {[number,number,number]} bg - Background RGB
 * @param {[number,number,number]} fg - Foreground (letter) RGB
 */
function makePNG(size, bg, fg) {
  // IHDR
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(size, 0);
  ihdr.writeUInt32BE(size, 4);
  ihdr[8] = 8; // bit depth
  ihdr[9] = 2; // RGB color type

  // Raw pixel data: each row = [filter=0, r, g, b, r, g, b, ...]
  const stride = 1 + size * 3;
  const raw = Buffer.alloc(size * stride, 0);

  // Fill background
  for (let y = 0; y < size; y++) {
    raw[y * stride] = 0; // filter None
    for (let x = 0; x < size; x++) {
      const i = y * stride + 1 + x * 3;
      raw[i] = bg[0];
      raw[i + 1] = bg[1];
      raw[i + 2] = bg[2];
    }
  }

  // Draw a simple "F" in the centre (scaled to ~40% of icon size)
  const scale = size / 192;
  function setPixel(x, y) {
    x = Math.round(x);
    y = Math.round(y);
    if (x < 0 || x >= size || y < 0 || y >= size) return;
    const i = y * stride + 1 + x * 3;
    raw[i] = fg[0];
    raw[i + 1] = fg[1];
    raw[i + 2] = fg[2];
  }
  function rect(x, y, w, h) {
    for (let dy = 0; dy < h; dy++)
      for (let dx = 0; dx < w; dx++)
        setPixel(Math.round(x + dx), Math.round(y + dy));
  }

  const lx = Math.round(60 * scale); // left edge
  const ty = Math.round(44 * scale); // top edge
  const sw = Math.round(22 * scale); // stroke width
  const th = Math.round(104 * scale); // total height
  const tw = Math.round(72 * scale); // total width
  const mw = Math.round(56 * scale); // mid-bar width
  const mh = Math.round(18 * scale); // mid-bar height
  const my = Math.round(46 * scale); // mid-bar y offset from top

  // Vertical stroke
  rect(lx, ty, sw, th);
  // Top horizontal bar
  rect(lx, ty, tw, sw);
  // Middle horizontal bar
  rect(lx, ty + my, mw, mh);

  const compressed = zlib.deflateSync(raw, { level: 9 });
  const sig = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
  return Buffer.concat([
    sig,
    chunk("IHDR", ihdr),
    chunk("IDAT", compressed),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

const outDir = path.join(__dirname, "..", "public");
// zinc-950 background, white "F"
const BG = [9, 9, 11];
const FG = [255, 255, 255];

fs.writeFileSync(path.join(outDir, "icon-192.png"), makePNG(192, BG, FG));
fs.writeFileSync(path.join(outDir, "icon-512.png"), makePNG(512, BG, FG));
fs.writeFileSync(
  path.join(outDir, "apple-touch-icon.png"),
  makePNG(180, BG, FG)
);

console.log("✓ Icons generated in public/");
