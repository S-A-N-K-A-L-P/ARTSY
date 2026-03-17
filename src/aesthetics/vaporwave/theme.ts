import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1a0030', // Deep purple
      paper: '#2a0050',
    },
    primary: {
      main: '#ff71ce', // Hot pink
    },
    secondary: {
      main: '#01cdfe', // Cyan
    },
    info: {
      main: '#05ffa1', // Neon green
    },
    text: {
      primary: '#fffb96', // Pale yellow
      secondary: '#b967ff', // Purple
    },
  },
  typography: {
    fontFamily: '"VCR OSD Mono", "Courier New", monospace',
    h1: { textShadow: '2px 2px 4px rgba(255, 113, 206, 0.5)' },
    h2: { textShadow: '2px 2px 4px rgba(1, 205, 254, 0.5)' },
    button: { 
      textTransform: 'uppercase',
      letterSpacing: '0.2em',
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 0,
          border: '1px solid #ff71ce',
          boxShadow: '0 0 10px rgba(255, 113, 206, 0.3)',
          '&:hover': {
            boxShadow: '0 0 20px rgba(255, 113, 206, 0.6), inset 0 0 10px rgba(255, 113, 206, 0.4)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(135deg, rgba(42,0,80,0.9) 0%, rgba(26,0,48,0.9) 100%)',
          border: '1px solid #01cdfe',
          boxShadow: '0 10px 30px rgba(1, 205, 254, 0.2)',
        },
      },
    },
  },
});