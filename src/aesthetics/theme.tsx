import { createTheme } from '@mui/material/styles';
import { themes, ThemeName, DARK_THEMES, resolveTheme } from '@/lib/theme/themes';

export function generateMuiTheme(themeName: ThemeName) {
  const name = resolveTheme(themeName);
  const themeConfig = themes[name];
  const isDark = DARK_THEMES.includes(name);

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
      /*
       * CssBaseline would otherwise bake the palette into `body` as literal
       * colours, injected by emotion after globals.css and therefore winning
       * the cascade. That makes the page ground follow React state instead of
       * the data-theme attribute. Point it back at the CSS vars so the server-
       * rendered theme and any later switch agree, with one owner.
       */
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            backgroundColor: 'var(--bg-primary)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font)',
          },
        },
      },
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
