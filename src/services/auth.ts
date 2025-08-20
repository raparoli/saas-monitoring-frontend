// Authentication service with token management
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
  expiresAt: number;
}

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: string;
}

class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'saas_monitor_access_token';
  private readonly REFRESH_TOKEN_KEY = 'saas_monitor_refresh_token';
  private readonly USER_KEY = 'saas_monitor_user';
  private readonly EXPIRES_AT_KEY = 'saas_monitor_expires_at';

  // Check if user is authenticated
  isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();
    const expiresAt = this.getTokenExpiration();
    
    if (!accessToken || !expiresAt) {
      return false;
    }

    // Check if token is expired (with 5 minute buffer)
    const now = Date.now();
    const bufferTime = 5 * 60 * 1000; // 5 minutes
    
    return now < (expiresAt - bufferTime);
  }

  // Get access token from localStorage
  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  // Get refresh token from localStorage
  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  // Get token expiration time
  getTokenExpiration(): number | null {
    const expiresAt = localStorage.getItem(this.EXPIRES_AT_KEY);
    return expiresAt ? parseInt(expiresAt, 10) : null;
  }

  // Get current user from localStorage
  getCurrentUser(): AuthUser | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  // Store authentication data
  setAuthData(tokens: AuthTokens, user: AuthUser): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
    localStorage.setItem(this.EXPIRES_AT_KEY, tokens.expiresAt.toString());
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  // Clear authentication data
  clearAuthData(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.EXPIRES_AT_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  // Login with credentials
  async login(email: string, password: string): Promise<{ tokens: AuthTokens; user: AuthUser }> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication logic
    if (email && password.length >= 6) {
      const now = Date.now();
      const expiresIn = 24 * 60 * 60 * 1000; // 24 hours
      
      const tokens: AuthTokens = {
        accessToken: `access_token_${now}_${Math.random().toString(36).substr(2, 9)}`,
        refreshToken: `refresh_token_${now}_${Math.random().toString(36).substr(2, 9)}`,
        expiresAt: now + expiresIn
      };

      const user: AuthUser = {
        id: '1',
        name: 'John Doe',
        email: email,
        role: 'Admin'
      };

      this.setAuthData(tokens, user);
      
      return { tokens, user };
    }
    
    throw new Error('Invalid credentials');
  }

  // Refresh access token
  async refreshAccessToken(): Promise<AuthTokens | null> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      return null;
    }

    try {
      // Simulate API call to refresh token
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const now = Date.now();
      const expiresIn = 24 * 60 * 60 * 1000; // 24 hours
      
      const newTokens: AuthTokens = {
        accessToken: `access_token_${now}_${Math.random().toString(36).substr(2, 9)}`,
        refreshToken: refreshToken, // Keep same refresh token
        expiresAt: now + expiresIn
      };

      // Update tokens in localStorage
      localStorage.setItem(this.ACCESS_TOKEN_KEY, newTokens.accessToken);
      localStorage.setItem(this.EXPIRES_AT_KEY, newTokens.expiresAt.toString());
      
      return newTokens;
    } catch (error) {
      // If refresh fails, clear auth data
      this.clearAuthData();
      return null;
    }
  }

  // Logout
  async logout(): Promise<void> {
    // Simulate API call to invalidate token
    await new Promise(resolve => setTimeout(resolve, 500));
    
    this.clearAuthData();
  }

  // Get authorization header for API calls
  getAuthHeader(): Record<string, string> {
    const token = this.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export const authService = new AuthService();
export default authService;