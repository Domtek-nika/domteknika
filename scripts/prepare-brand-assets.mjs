import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve(import.meta.dirname, "..");
const source = path.join(root, "public/assets/logo_DOMTEKNIKA_2023-alpha.png");

// Keep the approved logo intact. PNG compression also avoids the much larger
// uncompressed bitmap frames in the previous ICO file.
function squareLogo(size) {
  return sharp(source)
    .resize(size, size, { fit: "contain", background: "#ffffff" })
    .flatten({ background: "#ffffff" })
    .ensureAlpha()
    .png({ compressionLevel: 9, adaptiveFiltering: true, palette: false })
    .toBuffer();
}

const sizes = [16, 32, 48, 64, 128, 256];
const frames = await Promise.all(sizes.map(squareLogo));
const header = Buffer.alloc(6 + sizes.length * 16);
header.writeUInt16LE(1, 2);
header.writeUInt16LE(sizes.length, 4);
let offset = header.length;
frames.forEach((frame, index) => {
  const entry = 6 + index * 16;
  header[entry] = sizes[index] === 256 ? 0 : sizes[index];
  header[entry + 1] = header[entry];
  header.writeUInt16LE(1, entry + 4);
  header.writeUInt16LE(32, entry + 6);
  header.writeUInt32LE(frame.length, entry + 8);
  header.writeUInt32LE(offset, entry + 12);
  offset += frame.length;
});

await mkdir(path.join(root, "public/assets"), { recursive: true });
await Promise.all([
  writeFile(path.join(root, "src/app/favicon.ico"), Buffer.concat([header, ...frames])),
  squareLogo(96).then((image) => writeFile(path.join(root, "src/app/icon.png"), image)),
  squareLogo(180).then((image) => writeFile(path.join(root, "src/app/apple-icon.png"), image)),
  squareLogo(600).then((image) => writeFile(path.join(root, "public/assets/domteknika-logo-search.png"), image)),
]);

console.log(`Brand assets generated; favicon: ${offset} bytes across ${sizes.length} sizes.`);
