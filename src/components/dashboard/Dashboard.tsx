import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  Button,
  Chip,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import { JournalEntry } from '../../types';
import AddIcon from '@mui/icons-material/Add';
import BookIcon from '@mui/icons-material/Book';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import FormatQuoteIcon from '@mui/icons-material/FormatQuote';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [greeting, setGreeting] = useState('');
  const [recentEntries, setRecentEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      
      // Load greeting with weather and quote
      const greetingResponse = await ApiService.getUserGreeting();
      setGreeting(greetingResponse);
      
      // Load recent journal entries (last 5)
      const entries = await ApiService.getAllJournalEntries();
      setRecentEntries(entries.slice(0, 5));
      
    } catch (error) {
      console.error('Error loading dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewEntry = () => {
    navigate('/journals/new');
  };

  const handleViewAllEntries = () => {
    navigate('/journals');
  };

  const getSentimentColor = (sentiment: string | undefined) => {
    switch (sentiment) {
      case 'HAPPY':
        return '#4caf50';
      case 'SAD':
        return '#2196f3';
      case 'ANGRY':
        return '#f44336';
      case 'ANXIOUS':
        return '#ff9800';
      default:
        return '#9e9e9e';
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (loading) {
    return <LoadingSpinner message="Loading your dashboard..." />;
  }

  return (
    <Container maxWidth="lg" className="clean-container" sx={{ mt: 4, mb: 4 }}>
      {/* Welcome Section */}
      <Card className="minimalist-card fade-in" sx={{ mb: 4 }}>
        <CardContent sx={{ p: 4 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <WbSunnyIcon sx={{ mr: 2, fontSize: 32, color: 'primary.main' }} />
            <Typography variant="h4" className="clean-heading" sx={{ mb: 0 }}>
              Welcome back, {user?.userName}!
            </Typography>
          </Box>
          {greeting && (
            <Box display="flex" alignItems="flex-start" sx={{ mt: 2 }}>
              <FormatQuoteIcon sx={{ mr: 2, mt: 0.5, color: 'text.secondary' }} />
              <Typography variant="body1" className="clean-text" sx={{ 
                fontSize: '1.1rem', 
                lineHeight: 1.6,
                fontStyle: 'italic'
              }}>
                {greeting}
              </Typography>
            </Box>
          )}
        </CardContent>
      </Card>

      <Grid container spacing={3} className="clean-grid">
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Card className="minimalist-card clean-hover slide-up">
            <CardContent>
              <Typography variant="h6" className="clean-heading" sx={{ mb: 3 }}>
                Quick Actions
              </Typography>
              <Box display="flex" flexDirection="column" gap={2}>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  onClick={handleNewEntry}
                  fullWidth
                  className="minimalist-button"
                  sx={{ py: 1.5 }}
                >
                  New Journal Entry
                </Button>
                <Button
                  variant="outlined"
                  startIcon={<BookIcon />}
                  onClick={handleViewAllEntries}
                  fullWidth
                  sx={{ py: 1.5 }}
                >
                  View All Entries
                </Button>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Entries */}
        <Grid item xs={12} md={8}>
          <Card className="minimalist-card clean-hover slide-up">
            <CardContent>
              <Typography variant="h6" className="clean-heading" sx={{ mb: 3 }}>
                Recent Journal Entries
              </Typography>
              {recentEntries.length === 0 ? (
                <Box textAlign="center" py={3}>
                  <BookIcon sx={{ fontSize: 48, color: 'grey.400', mb: 2, opacity: 0.5 }} />
                  <Typography variant="body1" className="clean-subtext" sx={{ mb: 2 }}>
                    No journal entries yet. Create your first entry to get started!
                  </Typography>
                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={handleNewEntry}
                    className="minimalist-button"
                  >
                    Create Entry
                  </Button>
                </Box>
              ) : (
                <Box>
                  {recentEntries.map((entry, index) => (
                    <Card
                      key={entry.id}
                      sx={{
                        mb: 2,
                        p: 2,
                        background: 'background.paper',
                        borderLeft: '4px solid',
                        borderLeftColor: getSentimentColor(entry.sentiment),
                        borderRadius: '8px',
                        transition: 'all 0.2s ease',
                        '&:hover': {
                          transform: 'translateX(4px)',
                          boxShadow: '0 2px 12px rgba(0,0,0,0.1)',
                        }
                      }}
                      className="scale-in"
                      style={{ animationDelay: `${index * 100}ms` }}
                    >
                      <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                        <Typography variant="subtitle1" sx={{ fontWeight: 500, color: 'text.primary' }}>
                          {entry.title}
                        </Typography>
                        <Box display="flex" alignItems="center" gap={1}>
                          <AccessTimeIcon sx={{ fontSize: 16, color: 'text.secondary' }} />
                          <Typography variant="caption" className="clean-subtext">
                            {formatDate(entry.date)}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography
                        variant="body2"
                        className="clean-text"
                        sx={{
                          mb: 2,
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          lineHeight: 1.5,
                        }}
                      >
                        {entry.content}
                      </Typography>
                      {entry.sentiment && (
                        <Chip
                          label={entry.sentiment.toLowerCase()}
                          size="small"
                          sx={{
                            backgroundColor: getSentimentColor(entry.sentiment),
                            color: 'white',
                            textTransform: 'capitalize',
                            fontWeight: 500,
                          }}
                        />
                      )}
                    </Card>
                  ))}
                  <Box textAlign="center" mt={3}>
                    <Button 
                      variant="text" 
                      onClick={handleViewAllEntries}
                      sx={{ 
                        color: 'primary.main',
                        '&:hover': {
                          backgroundColor: 'rgba(90, 103, 216, 0.1)',
                        }
                      }}
                    >
                      View All Entries →
                    </Button>
                  </Box>
                </Box>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
