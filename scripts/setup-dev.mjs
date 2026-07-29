import { randomBytes, createCipheriv, pbkdf2Sync } from "node:crypto";
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join } from "node:path";
import { config } from "dotenv";

config();

const PUBLIC = join(import.meta.dirname, "..", "public");
const CONTENT_DIR = join(PUBLIC, "content");
const IMAGES_DIR = join(PUBLIC, "images");
const MARKER = "PORTFOLIO_UNLOCK_OK";
const ITERATIONS = 600_000;

const password = process.env.VITE_CASE_STUDY_PASSWORD;
if (!password) {
  console.error("Error: VITE_CASE_STUDY_PASSWORD not found in .env");
  process.exit(1);
}

const salt = randomBytes(16);
const key = pbkdf2Sync(password, salt, ITERATIONS, 32, "sha256");

function encrypt(plaintext) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, encrypted, tag]);
}

// 1. Generate portfolio-cards.json
const caseStudiesPath = join(CONTENT_DIR, "case-studies.json");
const caseStudies = JSON.parse(readFileSync(caseStudiesPath, "utf-8"));
const cards = caseStudies.map(({ slug, title, summary, cover }) => ({ slug, title, summary, cover }));
writeFileSync(join(CONTENT_DIR, "portfolio-cards.json"), JSON.stringify(cards, null, 2));
console.log("Generated portfolio-cards.json");

// 2. Encrypt case-studies.json (keep original for reference, write .enc alongside)
const caseStudiesBuffer = readFileSync(caseStudiesPath);
writeFileSync(join(CONTENT_DIR, "case-studies.enc"), encrypt(caseStudiesBuffer));
console.log("Generated case-studies.enc");

// 3. Encrypt non-cover images (write .enc alongside originals — don't delete originals in dev)
if (existsSync(IMAGES_DIR)) {
  const images = readdirSync(IMAGES_DIR).filter(
    (f) => !f.includes("-cover.") && !f.endsWith(".enc") && /\.(png|jpg|jpeg|gif|webp|svg)$/i.test(f),
  );

  for (const filename of images) {
    const filePath = join(IMAGES_DIR, filename);
    const imageBuffer = readFileSync(filePath);
    writeFileSync(join(IMAGES_DIR, `${filename}.enc`), encrypt(imageBuffer));
  }
  console.log(`Generated ${images.length} encrypted image files`);
}

// 4. Create verification token and manifest
const verificationToken = encrypt(Buffer.from(MARKER, "utf-8"));
const manifest = {
  salt: salt.toString("base64"),
  iterations: ITERATIONS,
  verificationToken: verificationToken.toString("base64"),
  version: 1,
};
writeFileSync(join(CONTENT_DIR, "crypto-manifest.json"), JSON.stringify(manifest, null, 2));
console.log("Generated crypto-manifest.json");

console.log("\nDev setup complete. Run `npm run dev` to start.");
