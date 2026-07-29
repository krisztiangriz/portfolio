import { useState, useEffect, useCallback, useRef } from "react";
import { verifyPassword, decryptBuffer } from "../lib/crypto";
import { CryptoContext } from "./cryptoContextValue";
import type { CryptoManifest } from "../types/content";

const SESSION_KEY = "portfolio_password";

export function CryptoProvider({ children }: { children: React.ReactNode }) {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [unlocking, setUnlocking] = useState(false);
  const keyRef = useRef<CryptoKey | null>(null);
  const manifestRef = useRef<CryptoManifest | null>(null);
  const blobCache = useRef(new Map<string, string>());

  const fetchManifest = useCallback(async (): Promise<CryptoManifest> => {
    if (manifestRef.current) return manifestRef.current;
    const res = await fetch(`${import.meta.env.BASE_URL}content/crypto-manifest.json`);
    const manifest: CryptoManifest = await res.json();
    manifestRef.current = manifest;
    return manifest;
  }, []);

  const doUnlock = useCallback(async (password: string): Promise<boolean> => {
    const manifest = await fetchManifest();
    const key = await verifyPassword(password, manifest);
    if (key) {
      keyRef.current = key;
      setIsUnlocked(true);
      sessionStorage.setItem(SESSION_KEY, password);
      return true;
    }
    return false;
  }, [fetchManifest]);

  const unlock = useCallback(async (password: string): Promise<boolean> => {
    setUnlocking(true);
    try {
      return await doUnlock(password);
    } finally {
      setUnlocking(false);
    }
  }, [doUnlock]);

  useEffect(() => {
    const saved = sessionStorage.getItem(SESSION_KEY);
    if (saved) {
      doUnlock(saved).catch(() => sessionStorage.removeItem(SESSION_KEY));
    }
  }, [doUnlock]);

  const decryptJson = useCallback(async <T,>(encPath: string): Promise<T> => {
    if (!keyRef.current) throw new Error("Not unlocked");
    const res = await fetch(`${import.meta.env.BASE_URL}${encPath}`);
    const encrypted = await res.arrayBuffer();
    const decrypted = await decryptBuffer(encrypted, keyRef.current);
    return JSON.parse(new TextDecoder().decode(decrypted));
  }, []);

  const decryptImageUrl = useCallback(async (encPath: string): Promise<string> => {
    if (blobCache.current.has(encPath)) return blobCache.current.get(encPath)!;
    if (!keyRef.current) throw new Error("Not unlocked");
    const res = await fetch(`${import.meta.env.BASE_URL}${encPath}`);
    const encrypted = await res.arrayBuffer();
    const decrypted = await decryptBuffer(encrypted, keyRef.current);
    const blob = new Blob([decrypted]);
    const url = URL.createObjectURL(blob);
    blobCache.current.set(encPath, url);
    return url;
  }, []);

  return (
    <CryptoContext.Provider value={{ isUnlocked, unlocking, unlock, decryptJson, decryptImageUrl }}>
      {children}
    </CryptoContext.Provider>
  );
}
