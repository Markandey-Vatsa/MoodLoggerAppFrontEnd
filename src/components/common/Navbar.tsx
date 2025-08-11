import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, IconButton, Tooltip } from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/api';
import LogoutIcon from '@mui/icons-material/Logout';
import HomeIcon from '@mui/icons-material/Home';
import BookIcon from '@mui/icons-material/Book';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import CreateIcon from '@mui/icons-material/Create';

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const { isDarkMode, toggleTheme } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const handleHome = () => {
    navigate('/dashboard');
  };

  const handleJournals = () => {
    navigate('/journals');
  };

  const handleProfile = () => {
    navigate('/profile');
  };

  const handleAdmin = () => {
    navigate('/admin');
  };

  const isAdmin = () => {
    return ApiService.isCurrentUserAdmin();
  };

  return (
    <AppBar position="static" sx={{ background: 'transparent', backdropFilter: 'blur(10px)' }}>
      <Toolbar sx={{ padding: '0 24px' }}>
        <CreateIcon sx={{ mr: 2, color: 'primary.main' }} />
        <Typography 
          variant="h6" 
          component="div" 
          sx={{ 
            flexGrow: 1,
            fontWeight: 500,
            letterSpacing: '0.02em',
            color: 'text.primary'
          }}
        >
          MoodLogger
        </Typography>
        
        {/* Theme Toggle Button */}
        <Tooltip title={isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <IconButton
            color="inherit"
            onClick={toggleTheme}
            sx={{ 
              mr: 2,
              color: 'text.primary',
              '&:hover': {
                backgroundColor: 'rgba(90, 103, 216, 0.1)',
              }
            }}
          >
            {isDarkMode ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Tooltip>

        {user && (
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: { xs: 1, md: 2 },
            flexWrap: 'wrap',
          }}>
            <Button
              color="inherit"
              startIcon={<HomeIcon />}
              onClick={handleHome}
              sx={{
                color: 'text.primary',
                display: { xs: 'none', sm: 'flex' },
                '&:hover': {
                  backgroundColor: 'rgba(90, 103, 216, 0.1)',
                }
              }}
            >
              Dashboard
            </Button>
            <Button
              color="inherit"
              startIcon={<BookIcon />}
              onClick={handleJournals}
              sx={{
                color: 'text.primary',
                display: { xs: 'none', sm: 'flex' },
                '&:hover': {
                  backgroundColor: 'rgba(90, 103, 216, 0.1)',
                }
              }}
            >
              Journals
            </Button>
            <Button
              color="inherit"
              startIcon={<AccountCircleIcon />}
              onClick={handleProfile}
              sx={{
                color: 'text.primary',
                display: { xs: 'none', md: 'flex' },
                '&:hover': {
                  backgroundColor: 'rgba(90, 103, 216, 0.1)',
                }
              }}
            >
              Profile
            </Button>
            {/* Mobile icon-only buttons */}
            <Tooltip title="Dashboard">
              <IconButton
                color="inherit"
                onClick={handleHome}
                sx={{
                  color: 'text.primary',
                  display: { xs: 'flex', sm: 'none' },
                  '&:hover': {
                    backgroundColor: 'rgba(90, 103, 216, 0.1)',
                  }
                }}
              >
                <HomeIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Journals">
              <IconButton
                color="inherit"
                onClick={handleJournals}
                sx={{
                  color: 'text.primary',
                  display: { xs: 'flex', sm: 'none' },
                  '&:hover': {
                    backgroundColor: 'rgba(90, 103, 216, 0.1)',
                  }
                }}
              >
                <BookIcon />
              </IconButton>
            </Tooltip>
            <Tooltip title="Profile">
              <IconButton
                color="inherit"
                onClick={handleProfile}
                sx={{
                  color: 'text.primary',
                  display: { xs: 'flex', md: 'none' },
                  '&:hover': {
                    backgroundColor: 'rgba(90, 103, 216, 0.1)',
                  }
                }}
              >
                <AccountCircleIcon />
              </IconButton>
            </Tooltip>
            {isAdmin() && (
              <>
                <Button
                  color="inherit"
                  startIcon={<AdminPanelSettingsIcon />}
                  onClick={handleAdmin}
                  sx={{ 
                    border: '1px solid',
                    borderColor: 'primary.main',
                    borderRadius: '8px',
                    color: 'primary.main',
                    ml: 1,
                    display: { xs: 'none', lg: 'flex' },
                    '&:hover': {
                      backgroundColor: 'rgba(90, 103, 216, 0.1)',
                      borderColor: 'primary.dark',
                    }
                  }}
                >
                  Admin
                </Button>
                <Tooltip title="Admin">
                  <IconButton
                    color="inherit"
                    onClick={handleAdmin}
                    sx={{
                      color: 'primary.main',
                      border: '1px solid',
                      borderColor: 'primary.main',
                      borderRadius: '8px',
                      display: { xs: 'flex', lg: 'none' },
                      '&:hover': {
                        backgroundColor: 'rgba(90, 103, 216, 0.1)',
                        borderColor: 'primary.dark',
                      }
                    }}
                  >
                    <AdminPanelSettingsIcon />
                  </IconButton>
                </Tooltip>
              </>
            )}
            <Typography 
              variant="body2" 
              sx={{ 
                marginLeft: { xs: 0, md: 2 }, 
                marginRight: 1, 
                color: 'text.secondary',
                fontWeight: 500,
                display: { xs: 'none', sm: 'block' },
              }}
            >
              Welcome, {user.userName}
            </Typography>
            <Button
              color="inherit"
              startIcon={<LogoutIcon />}
              onClick={handleLogout}
              sx={{
                color: 'text.primary',
                display: { xs: 'none', sm: 'flex' },
                '&:hover': {
                  backgroundColor: 'rgba(229, 115, 115, 0.1)',
                  color: 'error.main'
                }
              }}
            >
              Logout
            </Button>
            <Tooltip title="Logout">
              <IconButton
                color="inherit"
                onClick={handleLogout}
                sx={{
                  color: 'text.primary',
                  display: { xs: 'flex', sm: 'none' },
                  '&:hover': {
                    backgroundColor: 'rgba(229, 115, 115, 0.1)',
                    color: 'error.main'
                  }
                }}
              >
                <LogoutIcon />
              </IconButton>
            </Tooltip>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
