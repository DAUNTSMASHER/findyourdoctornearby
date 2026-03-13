import { get, put } from "@vercel/blob";

const CACHE_PREFIX = "cache";
const CACHE_TTL_MS = 24 * 60 * 60 * 1000; // 24 hours

export interface CachedData<T> {
  data: T;
  cachedAt: number;
}

function blobPath(key: string): string {
  const safe = key.replace(/[^a-zA-Z0-9-_/]/g, "-").toLowerCase();
  return `${CACHE_PREFIX}/${safe}.json`;
}

export async function getFromBlob<T>(key: string): Promise<T | null> {
  try {
    const path = blobPath(key);
    const res = await get(path, { access: "public" });
    if (!res || !res.stream) return null;
    const text = await new Response(res.stream).text();
    const parsed = JSON.parse(text) as CachedData<T>;
    if (Date.now() - parsed.cachedAt > CACHE_TTL_MS) return null; // expired
    return parsed.data;
  } catch {
    return null;
  }
}

export async function saveToBlob<T>(key: string, data: T): Promise<void> {
  const path = blobPath(key);
  const payload: CachedData<T> = { data, cachedAt: Date.now() };
  await put(path, JSON.stringify(payload), {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
  });
}
