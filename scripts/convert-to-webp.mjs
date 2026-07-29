import sharp from "sharp";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const IMAGES_DIR = join(ROOT, "public", "images");

const MAX_WIDTH = 1920;
const QUALITY = 90;

const webps = readdirSync(IMAGES_DIR).filter(
  (f) => f.endsWith(".webp") && !f.endsWith(".enc"),
);

let optimized = 0;
let savedBytes = 0;

for (const filename of webps) {
  const filePath = join(IMAGES_DIR, filename);
  const inputSize = statSync(filePath).size;

  const tempPath = filePath + ".tmp";
  await sharp(filePath)
    .resize({ width: MAX_WIDTH, withoutEnlargement: true })
    .webp({ quality: QUALITY })
    .toFile(tempPath);

  const { rename } = await import("node:fs/promises");
  await rename(tempPath, filePath);

  const outputSize = statSync(filePath).size;
  savedBytes += inputSize - outputSize;
  optimized++;
  console.log(`  ${filename}: ${(inputSize / 1024).toFixed(0)}KB → ${(outputSize / 1024).toFixed(0)}KB`);
}

console.log(`\nOptimized ${optimized} images (resize ≤${MAX_WIDTH}px, quality ${QUALITY})`);
console.log(`Saved ${(savedBytes / 1024 / 1024).toFixed(1)} MB total`);
