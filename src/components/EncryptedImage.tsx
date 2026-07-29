import { useState, useEffect, useRef } from "react";
import { useCrypto } from "../hooks/useCrypto";

interface EncryptedImageProps {
  src: string;
  alt: string;
  className?: string;
  onClick?: () => void;
}

function toEncPath(src: string): string {
  const base = import.meta.env.BASE_URL;
  const relative = src.startsWith(base) ? src.slice(base.length) : src.replace(/^\//, "");
  return `${relative}.enc`;
}

export function EncryptedImage({ src, alt, className, onClick }: EncryptedImageProps) {
  const { decryptImageUrl, isUnlocked } = useCrypto();
  const [blobUrl, setBlobUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const imgRef = useRef<HTMLDivElement>(null);
  const loadedRef = useRef(false);

  useEffect(() => {
    if (!isUnlocked || loadedRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        loadedRef.current = true;
        decryptImageUrl(toEncPath(src))
          .then(setBlobUrl)
          .finally(() => setLoading(false));
      },
      { rootMargin: "200px" },
    );

    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, [isUnlocked, src, decryptImageUrl]);

  return (
    <div ref={imgRef} className={className}>
      {loading ? (
        <div className="w-full aspect-video rounded-lg bg-[var(--color-surface)] animate-pulse" />
      ) : blobUrl ? (
        <img
          src={blobUrl}
          alt={alt}
          className={`w-full rounded-lg ${onClick ? "cursor-pointer hover:opacity-90 transition-opacity" : ""}`}
          onClick={onClick}
        />
      ) : null}
    </div>
  );
}
