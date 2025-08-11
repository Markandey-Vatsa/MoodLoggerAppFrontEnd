import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Button,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
} from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import ApiService from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import { JournalEntry, Sentiment } from '../../types';
import SaveIcon from '@mui/icons-material/Save';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const JournalForm: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const isEditMode = !!id;

  const [formData, setFormData] = useState<JournalEntry>({
    title: '',
    content: '',
    sentiment: undefined,
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  useEffect(() => {
    if (isEditMode) {
      loadJournalEntry();
    }
  }, [id, isEditMode]);

  const loadJournalEntry = async () => {
    if (!id) return;
    
    try {
      setLoading(true);
      console.log('Loading journal entry with ID:', id);
      const entry = await ApiService.getJournalEntryById(id);
      console.log('Loaded journal entry:', entry);
      setFormData(entry);
    } catch (error: any) {
      setError(`Failed to load journal entry: ${error.response?.data?.message || error.message}`);
      console.error('Error loading journal entry:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSentimentChange = (event: any) => {
    setFormData((prev) => ({
      ...prev,
      sentiment: event.target.value as Sentiment,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Please fill in both title and content');
      return;
    }

    try {
      setLoading(true);
      
      if (isEditMode && id) {
        console.log('Updating journal entry with ID:', id);
        console.log('Form data:', formData);
        await ApiService.updateJournalEntry(id, formData);
        setSuccess('Journal entry updated successfully!');
      } else {
        console.log('Creating new journal entry:', formData);
        await ApiService.createJournalEntry(formData);
        setSuccess('Journal entry created successfully!');
      }
      
      setTimeout(() => {
        navigate('/journals');
      }, 2000);
    } catch (error: any) {
      setError(`Failed to ${isEditMode ? 'update' : 'create'} journal entry: ${error.response?.data?.message || error.message}`);
      console.error('Error saving journal entry:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBack = () => {
    navigate('/journals');
  };

  if (loading && isEditMode) {
    return <LoadingSpinner message="Loading journal entry..." />;
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Box mb={3}>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={handleBack}
          sx={{ mb: 2 }}
        >
          Back to Journal
        </Button>
        <Typography variant="h4" component="h1">
          {isEditMode ? 'Edit Journal Entry' : 'New Journal Entry'}
        </Typography>
        <Typography variant="body1" color="textSecondary">
          {isEditMode ? 'Update your thoughts and feelings' : 'Document your thoughts and feelings'}
        </Typography>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      <Card>
        <CardContent>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
              placeholder="What's on your mind?"
            />

            <TextField
              fullWidth
              label="Content"
              name="content"
              value={formData.content}
              onChange={handleChange}
              margin="normal"
              required
              multiline
              rows={8}
              placeholder="Write about your day, thoughts, feelings, or anything that comes to mind..."
            />

            <FormControl fullWidth margin="normal">
              <InputLabel id="sentiment-label">Mood</InputLabel>
              <Select
                labelId="sentiment-label"
                id="sentiment"
                value={formData.sentiment || ''}
                label="Mood"
                onChange={handleSentimentChange}
              >
                <MenuItem value="">
                  <em>Select your mood (optional)</em>
                </MenuItem>
                <MenuItem value={Sentiment.HAPPY}>😊 Happy</MenuItem>
                <MenuItem value={Sentiment.SAD}>😢 Sad</MenuItem>
                <MenuItem value={Sentiment.ANGRY}>😠 Angry</MenuItem>
                <MenuItem value={Sentiment.ANXIOUS}>😰 Anxious</MenuItem>
              </Select>
            </FormControl>

            <Box display="flex" justifyContent="space-between" alignItems="center" mt={3}>
              <Button
                variant="outlined"
                onClick={handleBack}
                disabled={loading}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                variant="contained"
                startIcon={<SaveIcon />}
                disabled={loading}
              >
                {loading 
                  ? (isEditMode ? 'Updating...' : 'Creating...') 
                  : (isEditMode ? 'Update Entry' : 'Create Entry')
                }
              </Button>
            </Box>
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default JournalForm;
