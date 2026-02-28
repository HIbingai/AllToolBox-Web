import { createTheme } from '@mui/material/styles';

/**
 * Windows11-inspired adaptive glassmorphism theme.
 * Light: #72d6fe / #ffffff
 * Dark:  #191919 / #881798
 */

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

export default function getTheme(prefersDark = false) {
  const palette = prefersDark ? darkPalette : lightPalette;

  const paperBg = prefersDark ? darkPalette.background.paper : lightPalette.background.paper;
  const paperBorder = prefersDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(255,255,255,0.6)';
  const paperBoxShadow = prefersDark ? '0 4px 30px rgba(0,0,0,0.6)' : '0 4px 30px rgba(16,24,40,0.06)';
  const appBarBg = prefersDark ? 'linear-gradient(180deg, rgba(136,23,152,0.12), rgba(136,23,152,0.06))' : 'rgba(255,255,255,0.45)';
  const appBarBorder = prefersDark ? '1px solid rgba(255,255,255,0.04)' : '1px solid rgba(255,255,255,0.6)';

  return createTheme({
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
            backdropFilter: 'blur(12px) saturate(120%)',
            WebkitBackdropFilter: 'blur(12px) saturate(120%)'
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
            borderRadius: 10,
            boxShadow: 'none'
          },
          containedPrimary: {
            background: prefersDark ? 'linear-gradient(180deg,#a14aca,#881798)' : 'linear-gradient(180deg,#a8e7ff,#72d6fe)'
          }
        }
      }
    },
    typography: {
      fontFamily: '"Segoe UI", "Segoe UI Variable", "Roboto", "Noto Sans SC", Arial, sans-serif'
    }
  });
}
