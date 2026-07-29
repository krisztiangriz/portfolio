import { createContext } from "react";

export interface CryptoContextValue {
  isUnlocked: boolean;
  unlocking: boolean;
  unlock: (password: string) => Promise<boolean>;
  decryptJson: <T>(encPath: string) => Promise<T>;
  decryptImageUrl: (encPath: string) => Promise<string>;
}

export const CryptoContext = createContext<CryptoContextValue | null>(null);
