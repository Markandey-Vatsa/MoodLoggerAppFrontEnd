import axios, { AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import { JournalEntry, User, AuthResponse } from '../types';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8080';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('authToken');
    if (token && config.headers) {
      // For basic auth (since your backend uses Spring Security Basic Auth)
      config.headers.Authorization = `Basic ${token}`;
    }
    return config;
  },
  (error: any) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response: any) => response,
  (error: any) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('authToken');
      localStorage.removeItem('user');
      if (window.location.pathname !== '/login') {
        window.location.href = '/login';
      }
    }
    return Promise.reject(error);
  }
);

export class ApiService {
  // Authentication APIs (Basic Auth simulation)
  static async login(credentials: { userName: string; password: string }): Promise<AuthResponse> {
    // Since your backend uses Basic Auth, we create the basic auth token
    const basicToken = btoa(`${credentials.userName}:${credentials.password}`);
    
    // Try to get user greeting to verify credentials and fetch user data
    try {
      const tempApi = axios.create({
        baseURL: API_BASE_URL,
        headers: {
          'Authorization': `Basic ${basicToken}`,
          'Content-Type': 'application/json',
        },
      });
      
      // Verify credentials with user endpoint
      await tempApi.get('/user');
      
      // Try to get all users to determine if this user is admin
      // This will fail for non-admin users, which is expected
      let isAdmin = false;
      try {
        await tempApi.get('/admin/all-users');
        isAdmin = true;
      } catch (adminError) {
        // User is not admin, which is fine
        isAdmin = false;
      }
      
      const userRoles = isAdmin ? ['ADMIN', 'USER'] : ['USER'];
      
      return {
        token: basicToken,
        user: { 
          userName: credentials.userName,
          roles: userRoles
        }
      };
    } catch (error) {
      throw new Error('Invalid credentials');
    }
  }

  static async register(user: User): Promise<void> {
    await api.post('/public/create-user', user);
  }

  // Journal Entry APIs
  static async getAllJournalEntries(): Promise<JournalEntry[]> {
    const response: AxiosResponse<JournalEntry[]> = await api.get('/journal');
    return response.data;
  }

  static async createJournalEntry(entry: JournalEntry): Promise<JournalEntry> {
    const response: AxiosResponse<JournalEntry> = await api.post('/journal', entry);
    return response.data;
  }

  static async getJournalEntryById(id: string): Promise<JournalEntry> {
    try {
      const response: AxiosResponse<JournalEntry> = await api.get(`/journal/get-by-id/${id}`);
      return response.data;
    } catch (error: any) {
      console.error('Get journal entry by ID error:', error.response?.data || error.message);
      throw error;
    }
  }

  static async updateJournalEntry(id: string, entry: JournalEntry): Promise<JournalEntry> {
    try {
      const response: AxiosResponse<JournalEntry> = await api.put(`/journal/id/${id}`, entry);
      return response.data;
    } catch (error: any) {
      console.error('Update journal entry error:', error.response?.data || error.message);
      throw error;
    }
  }

  static async deleteJournalEntry(id: string): Promise<void> {
    try {
      await api.delete(`/journal/delete/${id}`);
    } catch (error: any) {
      console.error('Delete journal entry error:', error.response?.data || error.message);
      throw error;
    }
  }

  // User APIs
  static async updateUser(user: User): Promise<void> {
    await api.put('/user', user);
  }

  static async deleteUser(): Promise<void> {
    await api.delete('/user');
  }

  static async getUserGreeting(): Promise<string> {
    const response: AxiosResponse<string> = await api.get('/user');
    return response.data;
  }

  // Admin APIs
  static async getAllUsers(): Promise<User[]> {
    const response: AxiosResponse<User[]> = await api.get('/admin/all-users');
    return response.data;
  }

  static async createAdmin(user: User): Promise<void> {
    await api.post('/admin/create-admin', user);
  }

  // Helper method to check if current user is admin
  static isCurrentUserAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    return user.roles && user.roles.includes('ADMIN');
  }
}

export default ApiService;
