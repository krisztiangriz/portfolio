import sharp from "sharp";
import { readFileSync, writeFileSync, readdirSync, unlinkSync, renameSync } from "node:fs";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const IMAGES_DIR = join(ROOT, "public", "images");
const CASE_STUDIES_PATH = join(ROOT, "public", "content", "case-studies.json");

const PUBLIC_FILES = ["contact-footer.png", "contact-footer-alt.png"];

// Convert all PNGs (including covers and public files)
const pngs = readdirSync(IMAGES_DIR).filter(
  (f) => f.endsWith(".png") && !f.endsWith(".enc"),
);

let converted = 0;
let savedBytes = 0;

for (const filename of pngs) {
  const inputPath = join(IMAGES_DIR, filename);
  const outputPath = join(IMAGES_DIR, filename.replace(/\.png$/, ".webp"));

  const inputSize = readFileSync(inputPath).length;
  await sharp(inputPath).webp({ lossless: true }).toFile(outputPath);
  const outputSize = readFileSync(outputPath).length;

  unlinkSync(inputPath);
  savedBytes += inputSize - outputSize;
  converted++;
}

console.log(`Converted ${converted} images to WebP`);
console.log(`Saved ${(savedBytes / 1024 / 1024).toFixed(1)} MB`);

// Update case-studies.json: .png → .webp
let json = readFileSync(CASE_STUDIES_PATH, "utf-8");
json = json.replace(/\.png"/g, '.webp"');
writeFileSync(CASE_STUDIES_PATH, json);
console.log("Updated case-studies.json image paths");
