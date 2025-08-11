import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme, ThemeProvider as MuiThemeProvider } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

interface ThemeContextType {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

// Modern & Professional Theme
const createModernTheme = (isDarkMode: boolean) => {
  return createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#3b82f6' : '#1e40af', // Professional blue
        light: isDarkMode ? '#60a5fa' : '#3b82f6',
        dark: isDarkMode ? '#1e40af' : '#1e3a8a',
        contrastText: '#ffffff',
      },
      secondary: {
        main: isDarkMode ? '#64748b' : '#475569', // Professional gray
        light: isDarkMode ? '#94a3b8' : '#64748b',
        dark: isDarkMode ? '#475569' : '#334155',
        contrastText: '#ffffff',
      },
      background: {
        default: isDarkMode ? '#0f172a' : '#f8fafc', // Deep slate or very light gray
        paper: isDarkMode ? '#1e293b' : '#ffffff', // Slate or pure white
      },
      text: {
        primary: isDarkMode ? '#f8fafc' : '#0f172a', // High contrast text
        secondary: isDarkMode ? '#cbd5e1' : '#475569', // Muted text
      },
      divider: isDarkMode ? '#334155' : '#e2e8f0',
      error: {
        main: isDarkMode ? '#ef4444' : '#dc2626', // Professional red
      },
      warning: {
        main: isDarkMode ? '#f59e0b' : '#d97706', // Professional amber
      },
      info: {
        main: isDarkMode ? '#3b82f6' : '#2563eb', // Professional blue
      },
      success: {
        main: isDarkMode ? '#10b981' : '#059669', // Professional green
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Inter"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
        lineHeight: 1.1,
        marginBottom: '1.5rem',
        color: isDarkMode ? '#f8fafc' : '#0f172a',
        letterSpacing: '-0.02em',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
        lineHeight: 1.2,
        marginBottom: '1.2rem',
        color: isDarkMode ? '#f8fafc' : '#0f172a',
        letterSpacing: '-0.01em',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.5rem',
        lineHeight: 1.3,
        marginBottom: '1rem',
        color: isDarkMode ? '#f8fafc' : '#0f172a',
      },
      h4: {
        fontWeight: 500,
        fontSize: '1.25rem',
        lineHeight: 1.4,
        marginBottom: '0.8rem',
        color: isDarkMode ? '#f8fafc' : '#0f172a',
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.125rem',
        lineHeight: 1.4,
        marginBottom: '0.6rem',
        color: isDarkMode ? '#f8fafc' : '#0f172a',
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.4,
        marginBottom: '0.5rem',
        color: isDarkMode ? '#f8fafc' : '#0f172a',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.5,
        color: isDarkMode ? '#f8fafc' : '#0f172a',
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        color: isDarkMode ? '#cbd5e1' : '#475569',
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '0.875rem',
        letterSpacing: '0.01em',
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.4,
        color: isDarkMode ? '#cbd5e1' : '#475569',
      },
    },
    shape: {
      borderRadius: 8,
    },
    spacing: 8,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '10px 24px',
            boxShadow: 'none',
            transition: 'all 0.2s ease-in-out',
            border: '1px solid transparent',
            '&:hover': {
              boxShadow: isDarkMode 
                ? '0 4px 16px rgba(59, 130, 246, 0.4)'
                : '0 2px 12px rgba(30, 64, 175, 0.2)',
              transform: 'translateY(-1px)',
            },
            '&:focus': {
              outline: 'none',
              boxShadow: isDarkMode 
                ? '0 0 0 3px rgba(59, 130, 246, 0.3)'
                : '0 0 0 3px rgba(30, 64, 175, 0.2)',
            },
          },
          contained: {
            background: isDarkMode 
              ? 'linear-gradient(135deg, #3b82f6 0%, #1e40af 100%)'
              : 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)',
            color: '#ffffff',
            '&:hover': {
              background: isDarkMode 
                ? 'linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%)'
                : 'linear-gradient(135deg, #1e3a8a 0%, #1e3a8a 100%)',
            },
          },
          outlined: {
            borderColor: isDarkMode ? '#3b82f6' : '#1e40af',
            color: isDarkMode ? '#3b82f6' : '#1e40af',
            '&:hover': {
              backgroundColor: isDarkMode 
                ? 'rgba(59, 130, 246, 0.1)'
                : 'rgba(30, 64, 175, 0.05)',
              borderColor: isDarkMode ? '#1e40af' : '#1e3a8a',
            },
          },
          text: {
            color: isDarkMode ? '#3b82f6' : '#1e40af',
            '&:hover': {
              backgroundColor: isDarkMode 
                ? 'rgba(59, 130, 246, 0.1)'
                : 'rgba(30, 64, 175, 0.05)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            boxShadow: isDarkMode 
              ? '0 4px 24px rgba(0, 0, 0, 0.4)'
              : '0 1px 20px rgba(0, 0, 0, 0.08)',
            border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: isDarkMode 
                ? '0 8px 32px rgba(0, 0, 0, 0.5)'
                : '0 4px 32px rgba(0, 0, 0, 0.12)',
              transform: 'translateY(-2px)',
            },
          },
        },
      },
      MuiTextField: {
        styleOverrides: {
          root: {
            '& .MuiOutlinedInput-root': {
              borderRadius: '8px',
              backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
              transition: 'all 0.2s ease-in-out',
              '& fieldset': {
                border: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
                transition: 'border-color 0.2s ease-in-out',
              },
              '&:hover fieldset': {
                borderColor: isDarkMode ? '#3b82f6' : '#1e40af',
              },
              '&.Mui-focused fieldset': {
                borderColor: isDarkMode ? '#3b82f6' : '#1e40af',
                borderWidth: '2px',
              },
            },
            '& .MuiInputLabel-root': {
              color: isDarkMode ? '#cbd5e1' : '#475569',
              '&.Mui-focused': {
                color: isDarkMode ? '#3b82f6' : '#1e40af',
              },
            },
            '& .MuiOutlinedInput-input': {
              color: isDarkMode ? '#f8fafc' : '#0f172a',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            border: isDarkMode ? '1px solid #334155' : '1px solid #e2e8f0',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            color: isDarkMode ? '#f8fafc' : '#0f172a',
            boxShadow: isDarkMode 
              ? '0 2px 16px rgba(0, 0, 0, 0.3)'
              : '0 1px 16px rgba(0, 0, 0, 0.06)',
            borderBottom: `1px solid ${isDarkMode ? '#334155' : '#e2e8f0'}`,
            backdropFilter: 'blur(8px)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '6px',
            backgroundColor: isDarkMode ? '#334155' : '#f1f5f9',
            color: isDarkMode ? '#f8fafc' : '#0f172a',
            fontWeight: 500,
            '&:hover': {
              backgroundColor: isDarkMode ? '#475569' : '#e2e8f0',
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDarkMode ? '#334155' : '#e2e8f0',
          },
        },
      },
    },
  });
};

interface ThemeProviderProps {
  children: React.ReactNode;
}

export const ThemeProvider: React.FC<ThemeProviderProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const saved = localStorage.getItem('darkMode');
    return saved ? JSON.parse(saved) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
    // Update CSS custom properties for the theme
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  // Set initial theme on mount
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = createModernTheme(isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
