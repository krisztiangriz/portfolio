import { randomBytes, createCipheriv, pbkdf2Sync } from "node:crypto";
import { readFileSync, writeFileSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";
import { config } from "dotenv";

config();

const ROOT = join(import.meta.dirname, "..");
const ITERATIONS = 600_000;

const password = process.env.VITE_CASE_STUDY_PASSWORD;
if (!password) {
  console.error("Error: VITE_CASE_STUDY_PASSWORD not found in .env");
  process.exit(1);
}

// Create tar.gz of sensitive content (relative to public/)
const tarFile = join(ROOT, ".content-archive.tar.gz");
execSync(
  `tar czf "${tarFile}" -C "${join(ROOT, "public")}" content/case-studies.json $(find images -type f -not -name '*-cover.*' -not -name 'contact-footer.webp' -not -name 'contact-footer-alt.webp' -not -name '*.enc' | sort)`,
  { cwd: join(ROOT, "public"), stdio: "pipe" },
);
const tarBuffer = readFileSync(tarFile);
execSync(`rm "${tarFile}"`);

// Encrypt
const salt = randomBytes(16);
const key = pbkdf2Sync(password, salt, ITERATIONS, 32, "sha256");
const iv = randomBytes(12);
const cipher = createCipheriv("aes-256-gcm", key, iv);
const encrypted = Buffer.concat([cipher.update(tarBuffer), cipher.final()]);
const tag = cipher.getAuthTag();

// Write: [salt(16)][iv(12)][ciphertext][tag(16)]
const output = Buffer.concat([salt, iv, encrypted, tag]);
writeFileSync(join(ROOT, "content-archive.enc"), output);

const sizeMB = (output.length / 1024 / 1024).toFixed(1);
console.log(`Created content-archive.enc (${sizeMB} MB)`);
