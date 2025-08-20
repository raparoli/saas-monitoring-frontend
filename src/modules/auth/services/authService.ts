import { AuthTokens, AuthUser, LoginCredentials } from '../types';

class AuthService {
  private readonly ACCESS_TOKEN_KEY = 'saas_monitor_access_token';
  private readonly REFRESH_TOKEN_KEY = 'saas_monitor_refresh_token';
  private readonly USER_KEY = 'saas_monitor_user';
  private readonly EXPIRES_AT_KEY = 'saas_monitor_expires_at';

  isAuthenticated(): boolean {
    const accessToken = this.getAccessToken();
    const expiresAt = this.getTokenExpiration();
    
    if (!accessToken || !expiresAt) {
      return false;
    }

    const now = Date.now();
    const bufferTime = 5 * 60 * 1000; // 5 minutes
    
    return now < (expiresAt - bufferTime);
  }

  getAccessToken(): string | null {
    return localStorage.getItem(this.ACCESS_TOKEN_KEY);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.REFRESH_TOKEN_KEY);
  }

  getTokenExpiration(): number | null {
    const expiresAt = localStorage.getItem(this.EXPIRES_AT_KEY);
    return expiresAt ? parseInt(expiresAt, 10) : null;
  }

  getCurrentUser(): AuthUser | null {
    const userStr = localStorage.getItem(this.USER_KEY);
    return userStr ? JSON.parse(userStr) : null;
  }

  setAuthData(tokens: AuthTokens, user: AuthUser): void {
    localStorage.setItem(this.ACCESS_TOKEN_KEY, tokens.accessToken);
    localStorage.setItem(this.REFRESH_TOKEN_KEY, tokens.refreshToken);
    localStorage.setItem(this.EXPIRES_AT_KEY, tokens.expiresAt.toString());
    localStorage.setItem(this.USER_KEY, JSON.stringify(user));
  }

  clearAuthData(): void {
    localStorage.removeItem(this.ACCESS_TOKEN_KEY);
    localStorage.removeItem(this.REFRESH_TOKEN_KEY);
    localStorage.removeItem(this.EXPIRES_AT_KEY);
    localStorage.removeItem(this.USER_KEY);
  }

  async login(credentials: LoginCredentials): Promise<{ tokens: AuthTokens; user: AuthUser }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const { email, password } = credentials;
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

  async refreshAccessToken(): Promise<AuthTokens | null> {
    const refreshToken = this.getRefreshToken();
    
    if (!refreshToken) {
      return null;
    }

    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const now = Date.now();
      const expiresIn = 24 * 60 * 60 * 1000; // 24 hours
      
      const newTokens: AuthTokens = {
        accessToken: `access_token_${now}_${Math.random().toString(36).substr(2, 9)}`,
        refreshToken: refreshToken,
        expiresAt: now + expiresIn
      };

      localStorage.setItem(this.ACCESS_TOKEN_KEY, newTokens.accessToken);
      localStorage.setItem(this.EXPIRES_AT_KEY, newTokens.expiresAt.toString());
      
      return newTokens;
    } catch (error) {
      this.clearAuthData();
      return null;
    }
  }

  async logout(): Promise<void> {
    await new Promise(resolve => setTimeout(resolve, 500));
    this.clearAuthData();
  }

  getAuthHeader(): Record<string, string> {
    const token = this.getAccessToken();
    return token ? { Authorization: `Bearer ${token}` } : {};
  }
}

export const authService = new AuthService();