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
      default: '#f6f7fb',
      paper: 'rgba(255,255,255,0.55)'
    },
    text: {
      primary: '#0f172a',
      secondary: '#4b5563'
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: 'rgba(255,255,255,0.55)',
          boxShadow: '0 4px 30px rgba(16,24,40,0.06)',
          border: '1px solid rgba(255,255,255,0.6)',
          backdropFilter: 'blur(8px) saturate(120%)',
          WebkitBackdropFilter: 'blur(8px) saturate(120%)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'rgba(255,255,255,0.45)',
          boxShadow: 'none',
          borderBottom: '1px solid rgba(255,255,255,0.6)'
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
