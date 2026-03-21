import { createTheme } from '@mui/material/styles';
import { themes, ThemeName } from '@/lib/theme/themes';

export function generateMuiTheme(themeName: ThemeName) {
  const config = themes[themeName];
  const isDark = themeName === 'noir' || themeName === 'fantasy' || themeName === 'cyberpunk' || themeName === 'grunge';

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
      },
    },
    shape: {
      borderRadius: 20,
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            textTransform: 'none',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 20,
            backgroundColor: config["--card"],
          },
        },
      },
    },
  });
}
