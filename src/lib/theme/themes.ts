export const themes = {
  soft: {
    "--bg": "#F5F2EE",
    "--card": "#ffffff",
    "--text": "#2C2C2C",
    "--muted": "#8E8E93",
    "--accent": "#D6BFA7",
    "--border": "#E5E5EA",
    "--shadow": "0 4px 24px rgba(0,0,0,0.04)",
    "--radius": "24px",
    "--font": "'Inter', 'SF Pro', sans-serif",
  },
  noir: {
    "--bg": "#0a0a0a",
    "--card": "#1a1a1a",
    "--text": "#ffffff",
    "--muted": "#666666",
    "--accent": "#C0A062",
    "--border": "#2a2a2a",
    "--shadow": "0 8px 32px rgba(0,0,0,0.6)",
    "--radius": "0px",
    "--font": "'Playfair Display', serif",
  },
  minimal: {
    "--bg": "#ffffff",
    "--card": "#fafafa",
    "--text": "#111111",
    "--muted": "#999999",
    "--accent": "#000000",
    "--border": "#eeeeee",
    "--shadow": "0 2px 12px rgba(0,0,0,0.03)",
    "--radius": "12px",
    "--font": "'Inter', sans-serif",
  },
  cyberpunk: {
    "--bg": "#0F0F1A",
    "--card": "#1A1A2E",
    "--text": "#E0E0FF",
    "--muted": "#5A5A8A",
    "--accent": "#00F5D4",
    "--border": "#2A2A4E",
    "--shadow": "0 0 20px rgba(0,245,212,0.15)",
    "--radius": "4px",
    "--font": "'JetBrains Mono', monospace",
  },
  vaporwave: {
    "--bg": "#1a0a2e",
    "--card": "#2a1a3e",
    "--text": "#FFE4F5",
    "--muted": "#9A6DB0",
    "--accent": "#FF6AD5",
    "--border": "#3a2a4e",
    "--shadow": "0 8px 32px rgba(255,106,213,0.1)",
    "--radius": "32px",
    "--font": "'Space Grotesk', sans-serif",
  },
  brutalist: {
    "--bg": "#E8E4DE",
    "--card": "#D4CFC8",
    "--text": "#1A1A1A",
    "--muted": "#6B6B6B",
    "--accent": "#FF3300",
    "--border": "#1A1A1A",
    "--shadow": "8px 8px 0px #1A1A1A",
    "--radius": "0px",
    "--font": "'Space Mono', monospace",
  },
  grunge: {
    "--bg": "#121212",
    "--card": "#1E1E1E",
    "--text": "#D1D1D1",
    "--muted": "#5A5A5A",
    "--accent": "#4A5D4E",
    "--border": "#2A2A2A",
    "--shadow": "0 4px 16px rgba(0,0,0,0.4)",
    "--radius": "8px",
    "--font": "'Courier New', monospace",
  },
  fantasy: {
    "--bg": "#1E1B2E",
    "--card": "#2A2640",
    "--text": "#EDE7F6",
    "--muted": "#8A82A0",
    "--accent": "#7C4DFF",
    "--border": "#3A3660",
    "--shadow": "0 8px 32px rgba(124,77,255,0.15)",
    "--radius": "20px",
    "--font": "'Cinzel', serif",
  },
  luxury: {
    "--bg": "#F8F5F0",
    "--card": "#FFFFFF",
    "--text": "#1C1C1C",
    "--muted": "#8A8A8A",
    "--accent": "#C9A74E",
    "--border": "#E8E0D0",
    "--shadow": "0 8px 40px rgba(0,0,0,0.06)",
    "--radius": "16px",
    "--font": "'Cormorant Garamond', serif",
  },
};

export type ThemeName = keyof typeof themes;

export const applyTheme = (themeName: ThemeName) => {
  if (typeof document === 'undefined') return;
  const theme = themes[themeName];
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};
