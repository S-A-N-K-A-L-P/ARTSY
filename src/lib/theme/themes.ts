export const themes = {
  soft: {
    "--bg-primary": "#F5F2EE",
    "--bg-secondary": "#ffffff",
    "--bg-tertiary": "#E8E4DE", // Darkened for better input depth
    "--text-primary": "#1A1A1A", // Darkened for readability
    "--text-secondary": "#4D4D4D",
    "--text-muted": "#8E8E93",
    "--accent": "#D6BFA7",
    "--accent-hover": "#C5AC91",
    "--accent-soft": "rgba(214, 191, 167, 0.25)",
    "--border-subtle": "rgba(0, 0, 0, 0.08)", // Solid defined alpha
    "--border-strong": "rgba(0, 0, 0, 0.15)",
    "--shadow-soft": "0 2px 12px rgba(0,0,0,0.02)",
    "--shadow-medium": "0 8px 32px rgba(0,0,0,0.05)",
    "--radius": "24px",
    "--font": "'Inter', 'SF Pro', sans-serif",
  },
  noir: {
    "--bg-primary": "#050505", // Darker primary
    "--bg-secondary": "#111111", // Distinct step
    "--bg-tertiary": "#1A1A1A", // Visible input layer
    "--text-primary": "#ffffff",
    "--text-secondary": "#b0b0b0", // Lighter for contrast
    "--text-muted": "#777777",
    "--accent": "#C0A062",
    "--accent-hover": "#d4b476",
    "--accent-soft": "rgba(192, 160, 98, 0.2)",
    "--border-subtle": "rgba(255, 255, 255, 0.1)", // Consistent alpha border
    "--border-strong": "rgba(255, 255, 255, 0.2)",
    "--shadow-soft": "0 4px 16px rgba(0,0,0,0.6)",
    "--shadow-medium": "0 12px 48px rgba(0,0,0,0.9)",
    "--radius": "0px",
    "--font": "'Playfair Display', serif",
  },
  minimal: {
    "--bg-primary": "#ffffff",
    "--bg-secondary": "#f8f8f8", // More distinct
    "--bg-tertiary": "#f0f0f0", // Visible inputs
    "--text-primary": "#000000",
    "--text-secondary": "#333333",
    "--text-muted": "#999999",
    "--accent": "#000000",
    "--accent-hover": "#333333",
    "--accent-soft": "rgba(0, 0, 0, 0.05)",
    "--border-subtle": "rgba(0, 0, 0, 0.05)",
    "--border-strong": "rgba(0, 0, 0, 0.1)",
    "--shadow-soft": "0 2px 8px rgba(0,0,0,0.02)",
    "--shadow-medium": "0 4px 16px rgba(0,0,0,0.05)",
    "--radius": "12px",
    "--font": "'Inter', sans-serif",
  },
  cyberpunk: {
    "--bg-primary": "#020205", // True black
    "--bg-secondary": "#0D0D15", // Deep navy/gray
    "--bg-tertiary": "#151525", // Input layer
    "--text-primary": "#FFFFFF",
    "--text-secondary": "#BBBBFF", 
    "--text-muted": "#6A6A9A",
    "--accent": "#00F5D4",
    "--accent-hover": "#00FFDD",
    "--accent-soft": "rgba(0, 245, 212, 0.2)",
    "--border-subtle": "rgba(0, 245, 212, 0.15)", // Glow border
    "--border-strong": "#00F5D4",
    "--shadow-soft": "0 0 10px rgba(0,245,212,0.2)",
    "--shadow-medium": "0 0 30px rgba(0,245,212,0.3)",
    "--radius": "4px",
    "--font": "'JetBrains Mono', monospace",
  },
  vaporwave: {
    "--bg-primary": "#0D011D", // Darkened
    "--bg-secondary": "#18082A", // Distinct step
    "--bg-tertiary": "#26153A", // Input layer
    "--text-primary": "#FFFFFF",
    "--text-secondary": "#F0ACFF", 
    "--text-muted": "#A278C2",
    "--accent": "#FF6AD5",
    "--accent-hover": "#FF85E1",
    "--accent-soft": "rgba(255, 106, 213, 0.2)",
    "--border-subtle": "rgba(255, 106, 213, 0.2)",
    "--border-strong": "#FF6AD5",
    "--shadow-soft": "0 4px 12px rgba(255, 106, 213, 0.2)",
    "--shadow-medium": "0 8px 32px rgba(255, 106, 213, 0.3)",
    "--radius": "32px",
    "--font": "'Space Grotesk', sans-serif",
  },
  brutalist: {
    "--bg-primary": "#DED9D1", // Darkened slightly
    "--bg-secondary": "#C7C2BA",
    "--bg-tertiary": "#B3ADA4",
    "--text-primary": "#000000",
    "--text-secondary": "#1A1A1A",
    "--text-muted": "#555555",
    "--accent": "#FF3300",
    "--accent-hover": "#CC2900",
    "--accent-soft": "rgba(255, 51, 0, 0.15)",
    "--border-subtle": "#000000", // Hard lines
    "--border-strong": "#000000",
    "--shadow-soft": "4px 4px 0px #000000",
    "--shadow-medium": "10px 10px 0px #000000",
    "--radius": "0px",
    "--font": "'Space Mono', monospace",
  },
  grunge: {
    "--bg-primary": "#050505",
    "--bg-secondary": "#111111",
    "--bg-tertiary": "#1A1A1A",
    "--text-primary": "#E0E0E0",
    "--text-secondary": "#AAAAAA",
    "--text-muted": "#666666",
    "--accent": "#4A5D4E",
    "--accent-hover": "#5A7060",
    "--accent-soft": "rgba(74, 93, 78, 0.25)",
    "--border-subtle": "rgba(255, 255, 255, 0.08)",
    "--border-strong": "rgba(255, 255, 255, 0.15)",
    "--shadow-soft": "0 2px 8px rgba(0,0,0,0.5)",
    "--shadow-medium": "0 8px 24px rgba(0,0,0,0.8)",
    "--radius": "8px",
    "--font": "'Courier New', monospace",
  },
  fantasy: {
    "--bg-primary": "#0F0D1A",
    "--bg-secondary": "#181525",
    "--bg-tertiary": "#231F35",
    "--text-primary": "#F5F0FF",
    "--text-secondary": "#D1C4E9",
    "--text-muted": "#9575CD",
    "--accent": "#9575CD",
    "--accent-hover": "#B39DDB",
    "--accent-soft": "rgba(149, 117, 205, 0.2)",
    "--border-subtle": "rgba(149, 117, 205, 0.2)",
    "--border-strong": "#9575CD",
    "--shadow-soft": "0 4px 16px rgba(0,0,0,0.6)",
    "--shadow-medium": "0 12px 48px rgba(0,0,0,0.8)",
    "--radius": "20px",
    "--font": "'Cinzel', serif",
  },
  luxury: {
    "--bg-primary": "#FDFCFB",
    "--bg-secondary": "#F5F2EE",
    "--bg-tertiary": "#E8E4DE",
    "--text-primary": "#1A1A1A",
    "--text-secondary": "#4A4A4A",
    "--text-muted": "#8A8A8A",
    "--accent": "#C9A74E",
    "--accent-hover": "#D4B976",
    "--accent-soft": "rgba(201, 167, 78, 0.15)",
    "--border-subtle": "rgba(201, 167, 78, 0.15)",
    "--border-strong": "#C9A74E",
    "--shadow-soft": "0 2px 12px rgba(0,0,0,0.03)",
    "--shadow-medium": "0 12px 48px rgba(0,0,0,0.08)",
    "--radius": "16px",
    "--font": "'Cormorant Garamond', serif",
  },
};

export type ThemeName = keyof typeof themes;

export const applyTheme = (themeName: ThemeName) => {
  if (typeof document === 'undefined') return;
  const theme = themes[themeName];
  if (!theme) return;
  const root = document.documentElement;
  Object.entries(theme).forEach(([key, value]) => {
    root.style.setProperty(key, value);
  });
};
