import type { CryptoManifest } from "../types/content";

const MARKER = "PORTFOLIO_UNLOCK_OK";

function base64ToBuffer(b64: string): ArrayBuffer {
  const binary = atob(b64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes.buffer;
}

async function deriveKey(password: string, salt: ArrayBuffer, iterations: number): Promise<CryptoKey> {
  const encoder = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    encoder.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    { name: "PBKDF2", salt, iterations, hash: "SHA-256" },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["decrypt"],
  );
}

export async function verifyPassword(password: string, manifest: CryptoManifest): Promise<CryptoKey | null> {
  const salt = base64ToBuffer(manifest.salt);
  const key = await deriveKey(password, salt, manifest.iterations);
  const tokenBuf = base64ToBuffer(manifest.verificationToken);
  try {
    const iv = tokenBuf.slice(0, 12);
    const ciphertext = tokenBuf.slice(12);
    const decrypted = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext,
    );
    const text = new TextDecoder().decode(decrypted);
    return text === MARKER ? key : null;
  } catch {
    return null;
  }
}

export async function decryptBuffer(encrypted: ArrayBuffer, key: CryptoKey): Promise<ArrayBuffer> {
  const iv = encrypted.slice(0, 12);
  const ciphertext = encrypted.slice(12);
  return crypto.subtle.decrypt({ name: "AES-GCM", iv }, key, ciphertext);
}
