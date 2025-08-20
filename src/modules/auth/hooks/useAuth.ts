import { useState, useEffect, useCallback } from 'react';
import { authService } from '../services/authService';
import { AuthUser, LoginCredentials, AuthState } from '../types';

interface UseAuthReturn extends AuthState {
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
}

export function useAuth(): UseAuthReturn {
  const [state, setState] = useState<AuthState>({
    isAuthenticated: false,
    user: null,
    isLoading: true
  });

  const checkAuth = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const isAuth = authService.isAuthenticated();
      
      if (isAuth) {
        const currentUser = authService.getCurrentUser();
        setState({
          isAuthenticated: true,
          user: currentUser,
          isLoading: false
        });
      } else {
        const refreshToken = authService.getRefreshToken();
        if (refreshToken) {
          const newTokens = await authService.refreshAccessToken();
          if (newTokens) {
            const currentUser = authService.getCurrentUser();
            setState({
              isAuthenticated: true,
              user: currentUser,
              isLoading: false
            });
          } else {
            setState({
              isAuthenticated: false,
              user: null,
              isLoading: false
            });
          }
        } else {
          setState({
            isAuthenticated: false,
            user: null,
            isLoading: false
          });
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setState({
        isAuthenticated: false,
        user: null,
        isLoading: false
      });
    }
  }, []);

  const login = useCallback(async (email: string, password: string) => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      const credentials: LoginCredentials = { email, password };
      const { tokens, user } = await authService.login(credentials);
      setState({
        isAuthenticated: true,
        user,
        isLoading: false
      });
    } catch (error) {
      setState({
        isAuthenticated: false,
        user: null,
        isLoading: false
      });
      throw error;
    }
  }, []);

  const logout = useCallback(async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    try {
      await authService.logout();
      setState({
        isAuthenticated: false,
        user: null,
        isLoading: false
      });
    } catch (error) {
      console.error('Logout failed:', error);
      setState({
        isAuthenticated: false,
        user: null,
        isLoading: false
      });
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (state.isAuthenticated) {
      const interval = setInterval(() => {
        const isAuth = authService.isAuthenticated();
        if (!isAuth) {
          authService.refreshAccessToken().then((newTokens) => {
            if (!newTokens) {
              setState({
                isAuthenticated: false,
                user: null,
                isLoading: false
              });
            }
          });
        }
      }, 60000);

      return () => clearInterval(interval);
    }
  }, [state.isAuthenticated]);

  return {
    ...state,
    login,
    logout,
    checkAuth
  };
}