import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'dark',
    background: {
      default: '#1e1c1a', // Dirty dark brown
      paper: '#2d2a26',
    },
    primary: {
      main: '#8a2be2', // Muted purple 
    },
    secondary: {
      main: '#cd5c5c', // Indian red
    },
    text: {
      primary: '#dcdcdc',
      secondary: '#a9a9a9',
    },
  },
  typography: {
    fontFamily: '"Courier New", Courier, monospace',
    h1: { textTransform: 'uppercase', letterSpacing: '-0.05em' },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 2,
          border: '1px solid #4a453e',
          boxShadow: 'inset 0 0 20px rgba(0,0,0,0.5)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'lowercase',
          borderBottom: '2px dotted #8a2be2',
          borderRadius: 0,
        },
      },
    },
  },
});