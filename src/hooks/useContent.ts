import { useState, useEffect } from "react";

const cache = new Map<string, unknown>();

export function useContent<T>(filename: string): { data: T | null; loading: boolean; error: boolean } {
  const [data, setData] = useState<T | null>(() => (cache.get(filename) as T) ?? null);
  const [loading, setLoading] = useState(!cache.has(filename));
  const [error, setError] = useState(false);

  useEffect(() => {
    if (cache.has(filename)) {
      setData(cache.get(filename) as T);
      setLoading(false);
      return;
    }

    let cancelled = false;
    setLoading(true);

    fetch(`${import.meta.env.BASE_URL}content/${filename}`)
      .then((res) => {
        if (!res.ok) throw new Error(res.statusText);
        return res.json();
      })
      .then((json) => {
        if (cancelled) return;
        cache.set(filename, json);
        setData(json as T);
        setLoading(false);
      })
      .catch(() => {
        if (cancelled) return;
        setError(true);
        setLoading(false);
      });

    return () => { cancelled = true; };
  }, [filename]);

  return { data, loading, error };
}
