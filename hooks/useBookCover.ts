'use client';

import { useEffect, useMemo, useState } from 'react';
import { makeBookCoverUrl } from '../lib/coverFallback';

type Params = {
  title: string;
  author?: string;
  genre?: string;
  isbn?: string;
  width: number;
  height: number;
  seq?: string;
};

type CacheEntry = {
  url: string;
  ts: number;
};

const MEMORY_CACHE = new Map<string, CacheEntry>();
const STORAGE_KEY = 'rebooked_cover_cache_v1';
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

function getCacheKey(p: Pick<Params, 'title' | 'author' | 'isbn'>) {
  return [p.title.trim().toLowerCase(), (p.author ?? '').trim().toLowerCase(), (p.isbn ?? '').trim()].join(
    '|'
  );
}

async function fetchGoogleBooksCoverUrl(params: Params): Promise<string | null> {
  const title = params.title?.trim();
  if (!title) return null;

  const sizeVariant: 'M' | 'L' = params.height >= 550 ? 'L' : 'M';
  const queryParts: string[] = [`intitle:${title}`];
  if (params.author?.trim()) queryParts.push(`inauthor:${params.author.trim()}`);

  // Google Books API: /volumes?q=...
  const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(
    queryParts.join('+')
  )}&maxResults=1&projection=lite`;

  // Retry once for rate-limit (429) which commonly happens when many cards mount.
  for (let attempt = 0; attempt < 2; attempt += 1) {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 3500);

    try {
      const res = await fetch(url, { signal: controller.signal });
      if (res.status === 429 && attempt === 0) {
        // Wait a bit and retry.
        await new Promise((r) => setTimeout(r, 850));
        continue;
      }
      if (!res.ok) return null;
      const json = await res.json();
      const item = Array.isArray(json?.items) ? json.items[0] : null;
      const links = item?.volumeInfo?.imageLinks;
      if (!links) return null;

      const urlCandidate =
        sizeVariant === 'L'
          ? links.large || links.medium || links.thumbnail
          : links.smallThumbnail || links.thumbnail;

      if (typeof urlCandidate !== 'string') return null;
      // Avoid mixed-content issues when the app runs on HTTPS.
      return urlCandidate.startsWith('http://') ? urlCandidate.replace('http://', 'https://') : urlCandidate;
    } catch {
      return null;
    } finally {
      clearTimeout(timeout);
    }
  }

  return null;
}

function safeReadCacheFromStorage(): Record<string, CacheEntry> {
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Record<string, CacheEntry>;
    return parsed ?? {};
  } catch {
    return {};
  }
}

function safeWriteCacheToStorage(data: Record<string, CacheEntry>) {
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // ignore
  }
}

export function useBookCover(params: Params) {
  const fallbackUrl = useMemo(() => {
    return makeBookCoverUrl(
      {
        title: params.title,
        author: params.author ?? '',
        genre: params.genre ?? '',
      },
      {
        width: params.width,
        height: params.height,
        seq: params.seq ?? 'book',
        orientation: 'portrait',
      }
    );
  }, [params.author, params.genre, params.height, params.seq, params.title, params.width]);

  const cacheKey = useMemo(() => getCacheKey(params), [params]);

  const [url, setUrl] = useState<string>(fallbackUrl);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let mounted = true;

    const maybeFromMemory = MEMORY_CACHE.get(cacheKey);
    if (maybeFromMemory && Date.now() - maybeFromMemory.ts < MAX_AGE_MS) {
      setUrl(maybeFromMemory.url);
      return;
    }

    // Try localStorage cache first.
    const cachedFromStorage = (() => {
      try {
        const store = safeReadCacheFromStorage();
        const entry = store[cacheKey];
        if (!entry) return null;
        if (Date.now() - entry.ts > MAX_AGE_MS) return null;
        return entry.url;
      } catch {
        return null;
      }
    })();
    if (cachedFromStorage) {
      setUrl(cachedFromStorage);
      MEMORY_CACHE.set(cacheKey, { url: cachedFromStorage, ts: Date.now() });
      return;
    }

    // Fetch Google Books cover (throttled to avoid 429).
    setLoading(true);
    let didRelease = false;
    const run = async () => {
      try {
        await acquireFetchSlot();

        const realUrl = await fetchGoogleBooksCoverUrl(params);
        if (!mounted) return;

        if (realUrl) {
          setUrl(realUrl);
          const entry: CacheEntry = { url: realUrl, ts: Date.now() };
          MEMORY_CACHE.set(cacheKey, entry);

          // Persist (best effort).
          try {
            const store = safeReadCacheFromStorage();
            store[cacheKey] = entry;
            safeWriteCacheToStorage(store);
          } catch {
            // ignore
          }
        } else {
          // If Google fails/rate-limits, we keep the deterministic SVG fallback.
          setUrl(fallbackUrl);
        }
      } finally {
        if (!didRelease) releaseFetchSlot();
        didRelease = true;
        if (mounted) setLoading(false);
      }
    };

    void run();

    return () => {
      mounted = false;
    };
  }, [cacheKey, fallbackUrl]);

  return { url, loading, fallbackUrl };
}

// ---- Google fetch throttling (prevents 429 when many cards mount) ----
const MAX_CONCURRENT_FETCHES = 2;
let activeFetches = 0;
const fetchQueue: Array<() => void> = [];

async function acquireFetchSlot() {
  if (activeFetches < MAX_CONCURRENT_FETCHES) {
    activeFetches += 1;
    return;
  }

  await new Promise<void>((resolve) => fetchQueue.push(resolve));
  activeFetches += 1;
}

function releaseFetchSlot() {
  activeFetches = Math.max(0, activeFetches - 1);
  const next = fetchQueue.shift();
  if (next) next();
}

