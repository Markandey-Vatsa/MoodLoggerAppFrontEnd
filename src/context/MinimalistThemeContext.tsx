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

// Minimalist & Clean Theme
const createMinimalistTheme = (isDarkMode: boolean) => {
  return createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#6b73ff' : '#5a67d8', // Soft purple-blue
        light: isDarkMode ? '#9c88ff' : '#7c8aed',
        dark: isDarkMode ? '#4c51bf' : '#3c41a6',
        contrastText: '#ffffff',
      },
      secondary: {
        main: isDarkMode ? '#81c784' : '#66bb6a', // Soft green
        light: isDarkMode ? '#a5d6a7' : '#81c784',
        dark: isDarkMode ? '#4caf50' : '#388e3c',
        contrastText: '#ffffff',
      },
      background: {
        default: isDarkMode ? '#121212' : '#fafafa', // Clean dark or very light gray
        paper: isDarkMode ? '#1e1e1e' : '#ffffff', // Clean white paper
      },
      text: {
        primary: isDarkMode ? '#e0e0e0' : '#333333', // Clean readable text
        secondary: isDarkMode ? '#b0b0b0' : '#666666', // Muted secondary text
      },
      divider: isDarkMode ? '#333333' : '#e0e0e0',
      error: {
        main: isDarkMode ? '#f48fb1' : '#e57373', // Soft red
      },
      warning: {
        main: isDarkMode ? '#ffb74d' : '#ff9800', // Soft orange
      },
      info: {
        main: isDarkMode ? '#64b5f6' : '#2196f3', // Soft blue
      },
      success: {
        main: isDarkMode ? '#81c784' : '#4caf50', // Soft green
      },
    },
    typography: {
      fontFamily: [
        '-apple-system',
        'BlinkMacSystemFont',
        '"Segoe UI"',
        'Roboto',
        '"Helvetica Neue"',
        'Arial',
        'sans-serif',
      ].join(','),
      h1: {
        fontWeight: 300,
        fontSize: '2.5rem',
        lineHeight: 1.2,
        marginBottom: '1.5rem',
        color: isDarkMode ? '#e0e0e0' : '#333333',
      },
      h2: {
        fontWeight: 300,
        fontSize: '2rem',
        lineHeight: 1.3,
        marginBottom: '1.2rem',
        color: isDarkMode ? '#e0e0e0' : '#333333',
      },
      h3: {
        fontWeight: 400,
        fontSize: '1.5rem',
        lineHeight: 1.4,
        marginBottom: '1rem',
        color: isDarkMode ? '#e0e0e0' : '#333333',
      },
      h4: {
        fontWeight: 400,
        fontSize: '1.25rem',
        lineHeight: 1.4,
        marginBottom: '0.8rem',
        color: isDarkMode ? '#e0e0e0' : '#333333',
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.125rem',
        lineHeight: 1.4,
        marginBottom: '0.6rem',
        color: isDarkMode ? '#e0e0e0' : '#333333',
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
        lineHeight: 1.4,
        marginBottom: '0.5rem',
        color: isDarkMode ? '#e0e0e0' : '#333333',
      },
      body1: {
        fontSize: '1rem',
        lineHeight: 1.6,
        color: isDarkMode ? '#e0e0e0' : '#333333',
      },
      body2: {
        fontSize: '0.875rem',
        lineHeight: 1.5,
        color: isDarkMode ? '#b0b0b0' : '#666666',
      },
      button: {
        textTransform: 'none',
        fontWeight: 500,
        fontSize: '0.875rem',
      },
      caption: {
        fontSize: '0.75rem',
        lineHeight: 1.4,
        color: isDarkMode ? '#b0b0b0' : '#666666',
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
            '&:hover': {
              boxShadow: isDarkMode 
                ? '0 4px 16px rgba(107, 115, 255, 0.3)'
                : '0 2px 12px rgba(90, 103, 216, 0.15)',
              transform: 'translateY(-1px)',
            },
            '&:focus': {
              outline: 'none',
              boxShadow: isDarkMode 
                ? '0 0 0 3px rgba(107, 115, 255, 0.3)'
                : '0 0 0 3px rgba(90, 103, 216, 0.2)',
            },
          },
          contained: {
            background: isDarkMode 
              ? 'linear-gradient(135deg, #6b73ff 0%, #5a67d8 100%)'
              : 'linear-gradient(135deg, #5a67d8 0%, #4c51bf 100%)',
            color: '#ffffff',
            '&:hover': {
              background: isDarkMode 
                ? 'linear-gradient(135deg, #5a67d8 0%, #4c51bf 100%)'
                : 'linear-gradient(135deg, #4c51bf 0%, #3c41a6 100%)',
            },
          },
          outlined: {
            borderColor: isDarkMode ? '#6b73ff' : '#5a67d8',
            color: isDarkMode ? '#6b73ff' : '#5a67d8',
            '&:hover': {
              backgroundColor: isDarkMode 
                ? 'rgba(107, 115, 255, 0.1)'
                : 'rgba(90, 103, 216, 0.05)',
              borderColor: isDarkMode ? '#5a67d8' : '#4c51bf',
            },
          },
          text: {
            color: isDarkMode ? '#6b73ff' : '#5a67d8',
            '&:hover': {
              backgroundColor: isDarkMode 
                ? 'rgba(107, 115, 255, 0.1)'
                : 'rgba(90, 103, 216, 0.05)',
            },
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            boxShadow: isDarkMode 
              ? '0 4px 24px rgba(0, 0, 0, 0.25)'
              : '0 1px 20px rgba(0, 0, 0, 0.04)',
            border: isDarkMode ? '1px solid #333333' : '1px solid #f0f0f0',
            transition: 'all 0.3s ease-in-out',
            '&:hover': {
              boxShadow: isDarkMode 
                ? '0 8px 32px rgba(0, 0, 0, 0.3)'
                : '0 4px 32px rgba(0, 0, 0, 0.08)',
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
              backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
              transition: 'all 0.2s ease-in-out',
              '& fieldset': {
                border: `1px solid ${isDarkMode ? '#333333' : '#e0e0e0'}`,
                transition: 'border-color 0.2s ease-in-out',
              },
              '&:hover fieldset': {
                borderColor: isDarkMode ? '#6b73ff' : '#5a67d8',
              },
              '&.Mui-focused fieldset': {
                borderColor: isDarkMode ? '#6b73ff' : '#5a67d8',
                borderWidth: '2px',
              },
            },
            '& .MuiInputLabel-root': {
              color: isDarkMode ? '#b0b0b0' : '#666666',
              '&.Mui-focused': {
                color: isDarkMode ? '#6b73ff' : '#5a67d8',
              },
            },
            '& .MuiOutlinedInput-input': {
              color: isDarkMode ? '#e0e0e0' : '#333333',
            },
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            border: isDarkMode ? '1px solid #333333' : '1px solid #f0f0f0',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1e1e1e' : '#ffffff',
            color: isDarkMode ? '#e0e0e0' : '#333333',
            boxShadow: isDarkMode 
              ? '0 2px 16px rgba(0, 0, 0, 0.2)'
              : '0 1px 16px rgba(0, 0, 0, 0.04)',
            borderBottom: `1px solid ${isDarkMode ? '#333333' : '#e0e0e0'}`,
            backdropFilter: 'blur(8px)',
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: '16px',
            backgroundColor: isDarkMode ? '#333333' : '#f5f5f5',
            color: isDarkMode ? '#e0e0e0' : '#333333',
            '&:hover': {
              backgroundColor: isDarkMode ? '#404040' : '#eeeeee',
            },
          },
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: isDarkMode ? '#333333' : '#e0e0e0',
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
  const [isDarkMode, setIsDarkMode] = useState<boolean>(() => {
    const savedMode = localStorage.getItem('darkMode');
    return savedMode ? JSON.parse(savedMode) : false;
  });

  useEffect(() => {
    localStorage.setItem('darkMode', JSON.stringify(isDarkMode));
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const theme = createMinimalistTheme(isDarkMode);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        {children}
      </MuiThemeProvider>
    </ThemeContext.Provider>
  );
};
