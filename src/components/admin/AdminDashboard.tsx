import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControlLabel,
  Checkbox,
  Alert,
  Grid,
  Divider,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import ApiService from '../../services/api';
import LoadingSpinner from '../common/LoadingSpinner';
import { User } from '../../types';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import PeopleIcon from '@mui/icons-material/People';
import SecurityIcon from '@mui/icons-material/Security';

const AdminDashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [createAdminDialog, setCreateAdminDialog] = useState(false);
  const [newAdminData, setNewAdminData] = useState({
    userName: '',
    password: '',
    email: '',
    sentimentAnalysis: true,
  });

  useEffect(() => {
    // Check if user is admin
    if (!ApiService.isCurrentUserAdmin()) {
      navigate('/dashboard');
      return;
    }
    loadAllUsers();
  }, [navigate]);

  const loadAllUsers = async () => {
    try {
      setLoading(true);
      const allUsers = await ApiService.getAllUsers();
      setUsers(allUsers);
    } catch (error: any) {
      setError('Failed to load users. You might not have admin privileges.');
      console.error('Error loading users:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateAdmin = async () => {
    if (!newAdminData.userName || !newAdminData.password) {
      setError('Username and password are required');
      return;
    }

    try {
      const adminUser: User = {
        ...newAdminData,
        roles: ['ADMIN', 'USER'],
      };
      
      await ApiService.createAdmin(adminUser);
      setSuccess('Admin user created successfully!');
      setCreateAdminDialog(false);
      setNewAdminData({
        userName: '',
        password: '',
        email: '',
        sentimentAnalysis: true,
      });
      await loadAllUsers(); // Refresh the list
    } catch (error: any) {
      setError('Failed to create admin user');
      console.error('Error creating admin:', error);
    }
  };

  const getUserRoleColor = (roles: string[] | undefined) => {
    if (roles && roles.includes('ADMIN')) {
      return 'error'; // Red for admin
    }
    return 'primary'; // Blue for regular user
  };

  const formatDate = (dateString: string | undefined) => {
    if (!dateString) return 'N/A';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  const handleDialogChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setNewAdminData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  if (loading) {
    return <LoadingSpinner message="Loading admin dashboard..." />;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Header */}
      <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
        <Box display="flex" alignItems="center">
          <AdminPanelSettingsIcon sx={{ fontSize: 40, mr: 2, color: 'error.main' }} />
          <Box>
            <Typography variant="h4" component="h1">
              Admin Dashboard
            </Typography>
            <Typography variant="body1" color="textSecondary">
              Manage users and system administration
            </Typography>
          </Box>
        </Box>
        <Button
          variant="contained"
          startIcon={<PersonAddIcon />}
          onClick={() => setCreateAdminDialog(true)}
          color="error"
        >
          Create Admin
        </Button>
      </Box>

      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

      {/* Statistics Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PeopleIcon sx={{ fontSize: 40, mr: 2, color: 'primary.main' }} />
                <Box>
                  <Typography variant="h4">{users.length}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    Total Users
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <SecurityIcon sx={{ fontSize: 40, mr: 2, color: 'error.main' }} />
                <Box>
                  <Typography variant="h4">
                    {users.filter(u => u.roles?.includes('ADMIN')).length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Admin Users
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={4}>
          <Card>
            <CardContent>
              <Box display="flex" alignItems="center">
                <PeopleIcon sx={{ fontSize: 40, mr: 2, color: 'success.main' }} />
                <Box>
                  <Typography variant="h4">
                    {users.filter(u => !u.roles?.includes('ADMIN')).length}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    Regular Users
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Users Table */}
      <Card>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            All Users
          </Typography>
          <Divider sx={{ mb: 2 }} />
          
          {users.length === 0 ? (
            <Box textAlign="center" py={4}>
              <Typography variant="body1" color="textSecondary">
                No users found
              </Typography>
            </Box>
          ) : (
            <TableContainer component={Paper} variant="outlined">
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell><strong>Username</strong></TableCell>
                    <TableCell><strong>Email</strong></TableCell>
                    <TableCell><strong>Role</strong></TableCell>
                    <TableCell><strong>Journal Entries</strong></TableCell>
                    <TableCell><strong>Sentiment Analysis</strong></TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {users.map((userData) => (
                    <TableRow key={userData.id || userData.userName} hover>
                      <TableCell>
                        <Typography variant="body1" fontWeight="medium">
                          {userData.userName}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        {userData.email || 'No email provided'}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={userData.roles?.includes('ADMIN') ? 'Admin' : 'User'}
                          color={getUserRoleColor(userData.roles)}
                          size="small"
                          icon={userData.roles?.includes('ADMIN') ? <SecurityIcon /> : <PeopleIcon />}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2">
                          {userData.journalEntries?.length || 0} entries
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={userData.sentimentAnalysis ? 'Enabled' : 'Disabled'}
                          color={userData.sentimentAnalysis ? 'success' : 'default'}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </CardContent>
      </Card>

      {/* Create Admin Dialog */}
      <Dialog
        open={createAdminDialog}
        onClose={() => setCreateAdminDialog(false)}
        maxWidth="sm"
        fullWidth
      >
        <DialogTitle>Create New Admin User</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            name="userName"
            label="Username"
            type="text"
            fullWidth
            variant="outlined"
            value={newAdminData.userName}
            onChange={handleDialogChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="password"
            label="Password"
            type="password"
            fullWidth
            variant="outlined"
            value={newAdminData.password}
            onChange={handleDialogChange}
            required
            sx={{ mb: 2 }}
          />
          <TextField
            margin="dense"
            name="email"
            label="Email"
            type="email"
            fullWidth
            variant="outlined"
            value={newAdminData.email}
            onChange={handleDialogChange}
            sx={{ mb: 2 }}
          />
          <FormControlLabel
            control={
              <Checkbox
                name="sentimentAnalysis"
                checked={newAdminData.sentimentAnalysis}
                onChange={handleDialogChange}
              />
            }
            label="Enable Sentiment Analysis"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setCreateAdminDialog(false)}>
            Cancel
          </Button>
          <Button
            onClick={handleCreateAdmin}
            variant="contained"
            color="error"
          >
            Create Admin
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default AdminDashboard;
