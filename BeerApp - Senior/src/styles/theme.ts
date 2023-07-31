import { createTheme } from '@mui/material/styles';
import { green, blue } from '@mui/material/colors';

const theme = createTheme({
  typography: {
    h1: {
      fontSize: 'xx-large',
    },
    h3: {
      fontWeight: 'bold',
      fontSize: 'large',
      textTransform: 'uppercase',
    },
  },
  palette: {
    primary: {
      main: blue[800],
    },
    secondary: {
      main: green[500],
    },
  },
  components: {
    MuiLink: {
      styleOverrides: {
        root: {
          textDecoration: 'none',
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          padding: '20px',
        }
      }
    },
  },
});

export { theme };
