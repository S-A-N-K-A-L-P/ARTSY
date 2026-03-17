import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    background: {
      default: '#ffffff',
      paper: '#ffffff',
    },
    primary: {
      main: '#0000ff', // Pure blue
    },
    secondary: {
      main: '#ff0000', // Pure red
    },
    text: {
      primary: '#000000',
      secondary: '#000000',
    },
  },
  shape: {
    borderRadius: 0,
  },
  typography: {
    fontFamily: '"Helvetica Neue", Helvetica, Arial, sans-serif',
    fontWeightBold: 900,
    h1: { fontWeight: 900, textTransform: 'uppercase' },
    h2: { fontWeight: 900, textTransform: 'uppercase' },
    button: { fontWeight: 900 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          border: '2px solid black',
          boxShadow: '4px 4px 0px 0px rgba(0,0,0,1)',
          color: 'black',
          '&:hover': {
            boxShadow: '2px 2px 0px 0px rgba(0,0,0,1)',
            transform: 'translate(2px, 2px)',
            backgroundColor: '#ffff00', // Yellow hover
          },
        },
        containedPrimary: {
          backgroundColor: '#0000ff',
          color: 'white',
          '&:hover': {
            backgroundColor: '#0000cc',
            color: 'white',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          border: '3px solid black',
          boxShadow: '8px 8px 0px 0px rgba(0,0,0,1)',
        },
      },
    },
  },
});