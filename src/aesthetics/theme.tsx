import { createTheme } from '@mui/material/styles';
import { themes, ThemeName } from '@/lib/theme/themes';

const DARK_THEMES: ThemeName[] = ['noir', 'cyberpunk', 'grunge', 'fantasy', 'vaporwave'];

export function generateMuiTheme(themeName: ThemeName) {
  const config = themes[themeName];
  const isDark = DARK_THEMES.includes(themeName);

  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      background: {
        default: config["--bg"],
        paper: config["--card"],
      },
      primary: {
        main: config["--accent"],
      },
      text: {
        primary: config["--text"],
        secondary: config["--muted"],
      },
    },
    shape: {
      borderRadius: parseInt(config["--radius"]) || 16,
    },
    typography: {
      fontFamily: config["--font"],
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: parseInt(config["--radius"]) || 16,
            textTransform: 'none' as const,
            boxShadow: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: parseInt(config["--radius"]) || 16,
            backgroundColor: config["--card"],
            border: `1px solid ${config["--border"]}`,
            boxShadow: config["--shadow"],
          },
        },
      },
    },
  });
}
