import { useState, useEffect } from 'react';
import type { User } from '@/lib/api/generated/types';

interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  token: string | null;
}

export function useAuth(): AuthState {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    token: null,
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const token = localStorage.getItem('auth_token');
      const userStr = localStorage.getItem('user');

      if (token && userStr) {
        try {
          const user = JSON.parse(userStr);
          setAuthState({
            isAuthenticated: true,
            user,
            token,
          });
        } catch (error) {
          console.error('Failed to parse user data:', error);
          setAuthState({ isAuthenticated: false, user: null, token: null });
        }
      }
    }
  }, []);

  return authState;
}

export function logout() {
  if (typeof window !== 'undefined') {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('user');
    window.location.href = '/login';
  }
}
