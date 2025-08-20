import { useState, useEffect, useCallback } from 'react';
import { authService, AuthUser } from '../services/auth';

interface UseAuthReturn {
  isAuthenticated: boolean;
  user: AuthUser | null;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => void;
}

export function useAuth(): UseAuthReturn {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check authentication status
  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    
    try {
      const isAuth = authService.isAuthenticated();
      
      if (isAuth) {
        const currentUser = authService.getCurrentUser();
        setIsAuthenticated(true);
        setUser(currentUser);
      } else {
        // Try to refresh token if we have a refresh token
        const refreshToken = authService.getRefreshToken();
        if (refreshToken) {
          const newTokens = await authService.refreshAccessToken();
          if (newTokens) {
            const currentUser = authService.getCurrentUser();
            setIsAuthenticated(true);
            setUser(currentUser);
          } else {
            setIsAuthenticated(false);
            setUser(null);
          }
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Login function
  const login = useCallback(async (email: string, password: string) => {
    setIsLoading(true);
    
    try {
      const { tokens, user: authUser } = await authService.login(email, password);
      setIsAuthenticated(true);
      setUser(authUser);
    } catch (error) {
      setIsAuthenticated(false);
      setUser(null);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(async () => {
    setIsLoading(true);
    
    try {
      await authService.logout();
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      // Even if logout API fails, clear local state
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Check auth on mount
  useEffect(() => {
    if (checkAuth) {
      checkAuth();
    }
  }, [checkAuth]);

  // Set up token refresh interval
  useEffect(() => {
    if (isAuthenticated) {
      const interval = setInterval(() => {
        const isAuth = authService.isAuthenticated();
        if (!isAuth) {
          // Token expired, try to refresh
          authService.refreshAccessToken().then((newTokens) => {
            if (!newTokens) {
              // Refresh failed, logout user
              setIsAuthenticated(false);
              setUser(null);
            }
          });
        }
      }, 60000); // Check every minute

      return () => clearInterval(interval);
    }
  }, [isAuthenticated]);

  return {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    checkAuth
  };
}