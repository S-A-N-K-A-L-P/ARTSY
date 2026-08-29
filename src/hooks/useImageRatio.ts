'use client';

import { useCallback, useState } from 'react';

/**
 * Sizes a board tile to the image it contains.
 *
 * Every card in the app picked its aspect ratio by hashing the item id, so the
 * tile shape had no relationship to the picture inside it and `object-cover`
 * then cropped the picture to fit. That is the opposite of how a pin board
 * works: on Pinterest the tile is tall *because the image is tall*, which is
 * what produces the stagger.
 *
 * The hashed ratio stays as the placeholder so the grid has a stable layout
 * before the image loads (and if it never does). Once the browser reports the
 * real dimensions we swap to them, clamped so a panorama or a very long poster
 * cannot blow out a column.
 */
const MIN_RATIO = 0.55; // tallest allowed (h ≈ 1.8w)
const MAX_RATIO = 1.9; // widest allowed

/** Stable per-id placeholder, used only until the image reports its size. */
export function placeholderRatio(id: string, variants: string[]) {
  let hash = 0;
  const s = String(id);
  for (let i = 0; i < s.length; i++) hash = (hash * 31 + s.charCodeAt(i)) >>> 0;
  return variants[hash % variants.length];
}

export function useImageRatio(fallback: string) {
  const [ratio, setRatio] = useState<string>(fallback);

  const onLoad = useCallback((e: React.SyntheticEvent<HTMLImageElement>) => {
    const { naturalWidth: w, naturalHeight: h } = e.currentTarget;
    if (!w || !h) return;
    const r = Math.min(MAX_RATIO, Math.max(MIN_RATIO, w / h));
    setRatio(`${r}`);
  }, []);

  return { ratio, onLoad };
}
