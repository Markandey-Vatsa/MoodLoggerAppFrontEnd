import React, { useState } from 'react';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  Link,
  Divider,
  Card,
  CardContent,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/api';
import CreateIcon from '@mui/icons-material/Create';
import LoginIcon from '@mui/icons-material/Login';

const Login: React.FC = () => {
  const [formData, setFormData] = useState({
    userName: '',
    password: '',
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // Since your backend uses Basic Auth, we'll simulate the login process
      // In a real implementation, you'd need to configure Spring Security properly
      const response = await ApiService.login(formData);
      
      if (response.user && response.token) {
        login(response.user, response.token);
        navigate('/dashboard');
      } else {
        // For now, we'll use a basic auth simulation
        const basicToken = btoa(`${formData.userName}:${formData.password}`);
        const user = { userName: formData.userName };
        login(user, basicToken);
        navigate('/dashboard');
      }
    } catch (err) {
      setError('Invalid credentials. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          minHeight: '80vh',
          justifyContent: 'center',
        }}
      >
        <Card className="minimalist-card clean-hover fade-in" sx={{ 
          padding: 4, 
          width: '100%',
          maxWidth: 450,
          textAlign: 'center',
        }}>
          <CardContent>
            <CreateIcon sx={{ 
              fontSize: 48, 
              mb: 2, 
              color: 'primary.main',
              opacity: 0.8
            }} />
            <Typography component="h1" variant="h3" className="clean-heading" gutterBottom>
              MoodLogger
            </Typography>
            <Typography variant="body2" className="clean-subtext" sx={{ mb: 4 }}>
              Your personal journal for tracking thoughts and moods
            </Typography>
            
            {error && (
              <Alert 
                severity="error" 
                className="clean-error"
                sx={{ 
                  mb: 3,
                  textAlign: 'left',
                  borderRadius: '8px'
                }}
              >
                {error}
              </Alert>
            )}
            
            <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
              <TextField
                margin="normal"
                required
                fullWidth
                id="userName"
                label="Username"
                name="userName"
                autoComplete="username"
                autoFocus
                value={formData.userName}
                onChange={handleChange}
                placeholder="Enter your username"
                sx={{ mb: 2 }}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                sx={{ mb: 3 }}
              />
              <Button
                type="submit"
                fullWidth
                variant="contained"
                startIcon={<LoginIcon />}
                className="minimalist-button"
                sx={{ 
                  mt: 2, 
                  mb: 3,
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 500
                }}
                disabled={loading}
              >
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <div className="clean-loading"></div>
                    Signing in...
                  </Box>
                ) : (
                  'Sign In'
                )}
              </Button>
              
              <Divider sx={{ mb: 3 }} />
              
              <Box textAlign="center">
                <Typography variant="body2" className="clean-subtext" sx={{ mb: 1 }}>
                  Don't have an account?
                </Typography>
                <Link
                  component="button"
                  variant="body2"
                  onClick={() => navigate('/register')}
                  type="button"
                  sx={{ 
                    color: 'primary.main',
                    textDecoration: 'none',
                    fontWeight: 500,
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Create Account
                </Link>
              </Box>
            </Box>
          </CardContent>
        </Card>
      </Box>
    </Container>
  );
};

export default Login;
