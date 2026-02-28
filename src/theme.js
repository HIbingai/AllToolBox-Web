import { createTheme } from '@mui/material/styles';

/**
 * Adaptive glassmorphism theme supporting light and dark modes.
 * Light: #72d6fe / #ffffff
 * Dark:  #191919 / #881798 (+ lighter purple accent)
 */

const prefersDark = (typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) || false;

const lightPalette = {
  mode: 'light',
  primary: {
    main: '#72d6fe',
    contrastText: '#0f172a'
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
};

const darkPalette = {
  mode: 'dark',
  primary: {
    main: '#881798',
    light: '#b35fbf',
    contrastText: '#ffffff'
  },
  secondary: {
    main: '#b86ad1'
  },
  background: {
    default: '#191919',
    paper: 'rgba(25,25,25,0.7)'
  },
  text: {
    primary: '#f5f5f7',
    secondary: '#d1c4e9'
  }
};

const palette = prefersDark ? darkPalette : lightPalette;

const paperBg = prefersDark ? darkPalette.background.paper : lightPalette.background.paper;
const paperBorder = prefersDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(255,255,255,0.6)';
const paperBoxShadow = prefersDark ? '0 4px 30px rgba(0,0,0,0.6)' : '0 4px 30px rgba(16,24,40,0.06)';
const appBarBg = prefersDark ? 'linear-gradient(180deg, rgba(136,23,152,0.12), rgba(136,23,152,0.06))' : 'rgba(255,255,255,0.45)';
const appBarBorder = prefersDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(255,255,255,0.6)';

const theme = createTheme({
  palette,
  shape: {
    borderRadius: 12
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: paperBg,
          boxShadow: paperBoxShadow,
          border: paperBorder,
          backdropFilter: 'blur(8px) saturate(120%)',
          WebkitBackdropFilter: 'blur(8px) saturate(120%)'
        }
      }
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: appBarBg,
          boxShadow: 'none',
          borderBottom: appBarBorder
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
