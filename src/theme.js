import { createTheme } from '@mui/material/styles';

/**
 * Material3-inspired theme (Material You-like).
 * You can later plug in dynamic color generation based on wallpaper.
 */
const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#6750A4', // material3 seed color -> purple
      contrastText: '#fff'
    },
    secondary: {
      main: '#018786'
    },
    background: {
      default: '#FBFAFF',
      paper: '#FFFFFF'
    },
    text: {
      primary: '#111827',
      secondary: '#6B7280'
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12
        }
      }
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 10
        }
      }
    }
  },
  typography: {
    fontFamily: '"Roboto","Noto Sans SC", "Helvetica Neue", Arial, sans-serif'
  }
});

export default theme;
