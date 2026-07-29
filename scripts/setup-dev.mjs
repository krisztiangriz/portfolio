import { randomBytes, createCipheriv, pbkdf2Sync } from "node:crypto";
import { readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";
import { config } from "dotenv";

config();

const ROOT = join(import.meta.dirname, "..");
const PUBLIC = join(ROOT, "public");
const CONTENT_DIR = join(PUBLIC, "content");
const IMAGES_DIR = join(PUBLIC, "images");
const MARKER = "PORTFOLIO_UNLOCK_OK";
const ITERATIONS = 600_000;

const password = process.env.VITE_CASE_STUDY_PASSWORD;
if (!password) {
  console.error("Error: VITE_CASE_STUDY_PASSWORD not found in .env");
  process.exit(1);
}

// Step 1: Decrypt archive if case-studies.json doesn't exist
const caseStudiesPath = join(CONTENT_DIR, "case-studies.json");
if (!existsSync(caseStudiesPath)) {
  console.log("Decrypting content archive...");
  execSync(`node "${join(ROOT, "scripts", "decrypt-archive.mjs")}"`, {
    cwd: ROOT,
    stdio: "inherit",
    env: { ...process.env, VITE_CASE_STUDY_PASSWORD: password },
  });
}

// Step 2: Generate dev encryption files
const salt = randomBytes(16);
const key = pbkdf2Sync(password, salt, ITERATIONS, 32, "sha256");

function encrypt(plaintext) {
  const iv = randomBytes(12);
  const cipher = createCipheriv("aes-256-gcm", key, iv);
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()]);
  const tag = cipher.getAuthTag();
  return Buffer.concat([iv, encrypted, tag]);
}

// Generate portfolio-cards.json
const caseStudies = JSON.parse(readFileSync(caseStudiesPath, "utf-8"));
const cards = caseStudies.map(({ slug, title, summary, cover }) => ({ slug, title, summary, cover }));
writeFileSync(join(CONTENT_DIR, "portfolio-cards.json"), JSON.stringify(cards, null, 2));
console.log("Generated portfolio-cards.json");

// Encrypt case-studies.json (write .enc alongside original)
const caseStudiesBuffer = readFileSync(caseStudiesPath);
writeFileSync(join(CONTENT_DIR, "case-studies.enc"), encrypt(caseStudiesBuffer));
console.log("Generated case-studies.enc");

// Encrypt non-cover images (write .enc alongside originals)
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

// Create verification token and manifest
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
