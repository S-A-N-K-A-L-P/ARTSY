import { createTheme } from '@mui/material/styles';
import { themes, ThemeName } from '@/lib/theme/themes';

const DARK_THEMES: ThemeName[] = ['noir', 'cyberpunk', 'grunge', 'fantasy', 'vaporwave'];

export function generateMuiTheme(themeName: ThemeName) {
  const config = themes[themeName];
  const isDark = DARK_THEMES.includes(themeName);

  // If theme not found, fallback to soft
  const themeConfig = config || themes.soft;

  return createTheme({
    palette: {
      mode: isDark ? 'dark' : 'light',
      background: {
        default: themeConfig["--bg-primary"],
        paper: themeConfig["--bg-secondary"],
      },
      primary: {
        main: themeConfig["--accent"],
      },
      text: {
        primary: themeConfig["--text-primary"],
        secondary: themeConfig["--text-secondary"],
      },
      divider: themeConfig["--border-subtle"],
    },
    shape: {
      borderRadius: parseInt(themeConfig["--radius"]) || 16,
    },
    typography: {
      fontFamily: themeConfig["--font"],
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: parseInt(themeConfig["--radius"]) || 16,
            textTransform: 'none' as const,
            boxShadow: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: parseInt(themeConfig["--radius"]) || 16,
            backgroundColor: themeConfig["--bg-secondary"],
            border: `1px solid ${themeConfig["--border-subtle"]}`,
            boxShadow: themeConfig["--shadow-soft"],
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundImage: 'none',
            backgroundColor: themeConfig["--bg-secondary"],
          }
        }
      }
    },
  });
}
