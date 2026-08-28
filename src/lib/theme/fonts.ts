/**
 * Typography for every aesthetic.
 *
 * Each family is exposed as a CSS variable and all of them are attached to
 * <html>, so themes.css can select one with `--font: var(--font-playfair)`.
 *
 * Only Inter is preloaded — it backs the default aesthetic. The rest are
 * declared with `preload: false`, which emits the @font-face rules without a
 * <link rel="preload">. Browsers fetch a webfont lazily, only when it actually
 * matches rendered text, so a visitor on `soft` never downloads Cinzel.
 */
import {
  Inter,
  Playfair_Display,
  JetBrains_Mono,
  Space_Grotesk,
  Space_Mono,
  Cinzel,
  Cormorant_Garamond,
} from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playfair',
  preload: false,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains-mono',
  preload: false,
});

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
  preload: false,
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  display: 'swap',
  variable: '--font-space-mono',
  preload: false,
});

const cinzel = Cinzel({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-cinzel',
  preload: false,
});

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-cormorant',
  preload: false,
});

/** Every font variable, for the <html> className. */
export const fontVariables = [
  inter.variable,
  playfair.variable,
  jetbrainsMono.variable,
  spaceGrotesk.variable,
  spaceMono.variable,
  cinzel.variable,
  cormorant.variable,
].join(' ');
