/**
 * Aesthetic palettes.
 *
 * `palettes.json` is the single source of truth. It feeds two consumers:
 *   1. `scripts/generate-theme-css.mjs` -> `src/styles/themes.css` (the DOM)
 *   2. this module -> `generateMuiTheme()` (MUI's palette)
 *
 * Run `npm run theme:css` after editing palettes.json so the two stay in sync.
 */
import palettes from './palettes.json';

export const themes = palettes;

export type ThemeName = keyof typeof palettes;

export const THEME_NAMES = Object.keys(palettes) as ThemeName[];

export const DEFAULT_THEME: ThemeName = 'soft';

export const DARK_THEMES: ThemeName[] = [
  'noir',
  'cyberpunk',
  'grunge',
  'fantasy',
  'vaporwave',
];

/** Narrows an arbitrary string (DB value, URL param) to a known aesthetic. */
export function resolveTheme(name: string | null | undefined): ThemeName {
  return name && name in palettes ? (name as ThemeName) : DEFAULT_THEME;
}

/**
 * Switches the active aesthetic.
 *
 * The palette itself lives in themes.css keyed by `[data-theme]`, so this only
 * has to flip one attribute — no per-property writes, and the server can set
 * the same attribute during SSR to avoid a flash of unthemed content.
 */
export const applyTheme = (themeName: ThemeName) => {
  if (typeof document === 'undefined') return;
  document.documentElement.dataset.theme = resolveTheme(themeName);
};
