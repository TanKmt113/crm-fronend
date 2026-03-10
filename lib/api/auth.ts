import { apiClient } from '../api-client';
import { AuthResponse, User } from '@/types';

export const authApi = {
  login: async (credentials: any): Promise<AuthResponse> => {
    // In real app: return apiClient.post('/auth/login', credentials);
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          user: { id: '1', name: 'Administrator', email: 'admin@example.com', role: 'ADMIN', createdAt: '', updatedAt: '' },
          accessToken: 'mock-token'
        });
      }, 1000);
    });
  },

  getMe: async (): Promise<User> => {
    return apiClient.get('/auth/me');
  },

  logout: async (): Promise<void> => {
    // Optional: call backend logout
    localStorage.removeItem('auth_token');
  }
};
