import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#050505',
      paper: '#111111',
    },
    primary: {
      main: '#fcee0a', // Cyberpunk yellow
    },
    secondary: {
      main: '#00ffff', // Cyan
    },
    error: {
      main: '#ff003c', // Neon red
    },
    text: {
      primary: '#e0e0e0',
      secondary: '#888888',
    },
  },
  typography: {
    fontFamily: '"Rajdhani", "Roboto", sans-serif',
    h1: { fontWeight: 700, textTransform: 'uppercase', color: '#fcee0a' },
    h2: { fontWeight: 700, textTransform: 'uppercase' },
    button: {
      letterSpacing: '0.15em',
      fontWeight: 'bold',
    },
  },
  shape: {
    borderRadius: 0,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'uppercase',
          border: '1px solid #fcee0a',
          color: '#000000',
          backgroundColor: '#fcee0a',
          clipPath: 'polygon(10% 0, 100% 0, 90% 100%, 0 100%)',
          padding: '8px 24px',
          '&:hover': {
            backgroundColor: '#00ffff',
            border: '1px solid #00ffff',
            color: '#000',
            boxShadow: '0 0 15px rgba(0,255,255,0.6)',
          },
        },
        outlined: {
          backgroundColor: 'transparent',
          color: '#fcee0a',
          '&:hover': {
            backgroundColor: 'rgba(252,238,10,0.1)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '1px solid #333',
          borderLeft: '4px solid #fcee0a',
          background: 'linear-gradient(45deg, #111 30%, #1a1a1a 90%)',
        },
      },
    },
  },
});