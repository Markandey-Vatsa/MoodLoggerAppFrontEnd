import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  Grid,
  TextField,
  InputAdornment,
  Fab,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import { JournalEntry, Sentiment } from '../../types';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const JournalList: React.FC = () => {
  const navigate = useNavigate();
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<JournalEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    loadJournalEntries();
  }, []);

  useEffect(() => {
    // Filter entries based on search term
    if (searchTerm.trim() === '') {
      setFilteredEntries(entries);
    } else {
      const filtered = entries.filter(
        (entry) =>
          entry.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          entry.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredEntries(filtered);
    }
  }, [entries, searchTerm]);

  const loadJournalEntries = async () => {
    try {
      setLoading(true);
      const data = await ApiService.getAllJournalEntries();
      console.log('Loaded journal entries:', data);
      setEntries(data);
    } catch (error) {
      console.error('Error loading journal entries:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNewEntry = () => {
    navigate('/journals/new');
  };

  const handleEditEntry = (id: string) => {
    navigate(`/journals/edit/${id}`);
  };

  const handleDeleteEntry = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this journal entry?')) {
      try {
        console.log('Deleting journal entry with ID:', id);
        await ApiService.deleteJournalEntry(id);
        console.log('Delete successful');
        await loadJournalEntries(); // Refresh the list
      } catch (error: any) {
        console.error('Error deleting journal entry:', error);
        alert('Failed to delete journal entry. Please try again.');
      }
    }
  };

  const getSentimentColor = (sentiment: Sentiment | undefined) => {
    switch (sentiment) {
      case Sentiment.HAPPY:
        return '#4caf50';
      case Sentiment.SAD:
        return '#2196f3';
      case Sentiment.ANGRY:
        return '#f44336';
      case Sentiment.ANXIOUS:
        return '#ff9800';
      default:
        return '#9e9e9e';
    }
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return '';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return <LoadingSpinner message="Loading your journal entries..." />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Typography variant="h4" component="h1">
          My Journal Entries
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleNewEntry}
          sx={{ display: { xs: 'none', sm: 'flex' } }}
        >
          New Entry
        </Button>
      </Box>

      {/* Search Bar */}
      <Box mb={3}>
        <TextField
          fullWidth
          placeholder="Search journal entries..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Journal Entries */}
      {filteredEntries.length === 0 ? (
        <Box textAlign="center" py={8}>
          <Typography variant="h6" color="textSecondary" gutterBottom>
            {searchTerm ? 'No entries found matching your search.' : 'No journal entries yet.'}
          </Typography>
          <Typography variant="body1" color="textSecondary" mb={3}>
            {searchTerm ? 'Try a different search term.' : 'Start documenting your thoughts and feelings.'}
          </Typography>
          {!searchTerm && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleNewEntry}
              size="large"
            >
              Create Your First Entry
            </Button>
          )}
        </Box>
      ) : (
        <Grid container spacing={3}>
          {filteredEntries.map((entry) => (
            <Grid item xs={12} md={6} lg={4} key={entry.id}>
              <Card
                sx={{
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  borderLeft: '4px solid',
                  borderLeftColor: getSentimentColor(entry.sentiment),
                }}
              >
                <CardContent sx={{ flexGrow: 1 }}>
                  <Typography variant="h6" component="h2" gutterBottom>
                    {entry.title}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {formatDate(entry.date)}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitLineClamp: 3,
                      WebkitBoxOrient: 'vertical',
                      mb: 2,
                    }}
                  >
                    {entry.content}
                  </Typography>
                  {entry.sentiment && (
                    <Typography
                      variant="caption"
                      sx={{
                        px: 1,
                        py: 0.5,
                        borderRadius: 1,
                        backgroundColor: getSentimentColor(entry.sentiment),
                        color: 'white',
                        textTransform: 'capitalize',
                        display: 'inline-block',
                        mb: 2,
                      }}
                    >
                      {entry.sentiment.toLowerCase()}
                    </Typography>
                  )}
                </CardContent>
                <Box sx={{ p: 2, pt: 0 }}>
                  <Button
                    startIcon={<EditIcon />}
                    onClick={() => handleEditEntry(entry.id!)}
                    size="small"
                    sx={{ mr: 1 }}
                  >
                    Edit
                  </Button>
                  <Button
                    startIcon={<DeleteIcon />}
                    onClick={() => handleDeleteEntry(entry.id!)}
                    size="small"
                    color="error"
                  >
                    Delete
                  </Button>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Floating Action Button for mobile */}
      <Fab
        color="primary"
        aria-label="add"
        onClick={handleNewEntry}
        sx={{
          position: 'fixed',
          bottom: 16,
          right: 16,
          display: { xs: 'flex', sm: 'none' },
        }}
      >
        <AddIcon />
      </Fab>
    </Container>
  );
};

export default JournalList;
