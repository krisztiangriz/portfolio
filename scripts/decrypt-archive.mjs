import { createDecipheriv, pbkdf2Sync } from "node:crypto";
import { readFileSync, writeFileSync, existsSync } from "node:fs";
import { execSync } from "node:child_process";
import { join } from "node:path";

const ROOT = join(import.meta.dirname, "..");
const ITERATIONS = 600_000;

// Support both dotenv (.env) and raw env var (CI)
if (existsSync(join(ROOT, ".env"))) {
  const { config } = await import("dotenv");
  config();
}

const password = process.env.VITE_CASE_STUDY_PASSWORD;
if (!password) {
  console.error("Error: VITE_CASE_STUDY_PASSWORD environment variable is required");
  process.exit(1);
}

const archivePath = join(ROOT, "content-archive.enc");
if (!existsSync(archivePath)) {
  console.error("Error: content-archive.enc not found");
  process.exit(1);
}

// Read archive: [salt(16)][iv(12)][ciphertext][tag(16)]
const data = readFileSync(archivePath);
const salt = data.subarray(0, 16);
const iv = data.subarray(16, 28);
const tag = data.subarray(data.length - 16);
const ciphertext = data.subarray(28, data.length - 16);

// Decrypt
const key = pbkdf2Sync(password, salt, ITERATIONS, 32, "sha256");
const decipher = createDecipheriv("aes-256-gcm", key, iv);
decipher.setAuthTag(tag);

let tarBuffer;
try {
  tarBuffer = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
} catch {
  console.error("Error: Decryption failed — wrong password?");
  process.exit(1);
}

// Extract tar.gz to public/
const tarFile = join(ROOT, ".content-archive.tar.gz");
writeFileSync(tarFile, tarBuffer);
execSync(`tar xzf "${tarFile}" -C "${join(ROOT, "public")}"`, { stdio: "pipe" });
execSync(`rm "${tarFile}"`);

console.log("Decrypted content-archive.enc → extracted to public/");
