export const themes = {
  noir: {
    "--bg": "#0a0a0a",
    "--card": "#1a1a1a",
    "--text": "#ffffff",
    "--accent": "#C0A062",
  },
  soft: {
    "--bg": "#F5F2EE",
    "--card": "#ffffff",
    "--text": "#2C2C2C",
    "--accent": "#D6BFA7",
  },
  fantasy: {
    "--bg": "#1E1B2E",
    "--card": "#2A2640",
    "--text": "#EDE7F6",
    "--accent": "#7C4DFF",
  },
  luxury: {
    "--bg": "#F8F5F0",
    "--card": "#FFFFFF",
    "--text": "#1C1C1C",
    "--accent": "#C9A74E",
  },
  cyberpunk: {
    "--bg": "#0F0F1A",
    "--card": "#1A1A2E",
    "--text": "#E0E0FF",
    "--accent": "#00F5D4",
  },
  grunge: {
    "--bg": "#121212",
    "--card": "#1E1E1E",
    "--text": "#D1D1D1",
    "--accent": "#4A5D4E",
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
