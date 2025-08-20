// API service layer with mock data simulation
import { 
  User, 
  AlertEmailLog, 
  IntegrationProduct, 
  ProductDetail 
} from '../types';
import { authService } from './auth';
import { 
  mockUsers, 
  mockAlertEmailLogs, 
  mockProducts, 
  mockDashboardStats,
  mockIntegratedProducts 
} from '../data/mockData';

// Simulate API delay
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

// API Response wrapper
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message?: string;
  total?: number;
}

class ApiService {
  private baseUrl = '/api/v1';

  // Get headers with authentication
  private getHeaders(): Record<string, string> {
    return {
      'Content-Type': 'application/json',
      ...authService.getAuthHeader()
    };
  }

  // Authentication
  async login(email: string, password: string): Promise<ApiResponse<{ tokens: any; user: User }>> {
    const { tokens, user } = await authService.login(email, password);
    
    return {
      success: true,
      data: { tokens, user }
    };
  }

  async logout(): Promise<ApiResponse<null>> {
    await authService.logout();
    return {
      success: true,
      data: null,
      message: 'Logged out successfully'
    };
  }

  // Users
  async getUsers(params: {
    search?: string;
    role?: string;
    status?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<ApiResponse<User[]>> {
    await delay(800);
    
    let filteredUsers = [...mockUsers];
    
    if (params?.search && typeof params.search === 'string' && params.search.trim()) {
      filteredUsers = filteredUsers.filter(user => 
        user && typeof user === 'object' &&
        (user.name || '').toLowerCase().includes(params.search!.toLowerCase()) ||
        (user.email || '').toLowerCase().includes(params.search!.toLowerCase())
      );
    }
    
    if (params?.role && typeof params.role === 'string' && params.role !== 'All') {
      filteredUsers = filteredUsers.filter(user => user && typeof user === 'object' && user.role === params.role);
    }
    
    if (params?.status && typeof params.status === 'string' && params.status !== 'All') {
      filteredUsers = filteredUsers.filter(user => user && typeof user === 'object' && user.status === params.status);
    }
    
    return {
      success: true,
      data: filteredUsers,
      total: filteredUsers.length
    };
  }

  async createUser(userData: Partial<User>): Promise<ApiResponse<User>> {
    await delay(1000);
    
    const newUser: User = userData && typeof userData === 'object' ? {
      id: Date.now().toString(),
      name: userData.name || '',
      email: userData.email || '',
      role: userData.role || 'Viewer',
      status: 'Active',
      lastActive: new Date().toISOString(),
      createdOn: new Date().toISOString(),
      assignedProducts: userData.assignedProducts || []
    } : {} as User;
    
    return {
      success: true,
      data: newUser,
      message: 'User created successfully'
    };
  }

  async updateUser(id: string, userData: Partial<User>): Promise<ApiResponse<User>> {
    await delay(800);
    
    const existingUser = mockUsers.find(u => u && typeof u === 'object' && u.id === id);
    if (!existingUser) {
      throw new Error('User not found');
    }
    
    const updatedUser = userData && typeof userData === 'object' ? { ...existingUser, ...userData } : existingUser;
    
    return {
      success: true,
      data: updatedUser,
      message: 'User updated successfully'
    };
  }

  async deleteUser(id: string): Promise<ApiResponse<null>> {
    await delay(600);
    
    return {
      success: true,
      data: null,
      message: 'User deleted successfully'
    };
  }

  // Alert Email Logs
  async getAlertEmailLogs(params: {
    search?: string;
    severity?: string;
    category?: string;
    emailStatus?: string;
    product?: string;
    dateRange?: string;
    page?: number;
    limit?: number;
  } = {}): Promise<ApiResponse<AlertEmailLog[]>> {
    await delay(1200);
    
    let filteredAlerts = [...mockAlertEmailLogs];
    
    if (params?.search && typeof params.search === 'string' && params.search.trim()) {
      filteredAlerts = filteredAlerts.filter(alert => 
        alert && typeof alert === 'object' &&
        (alert.customerName || '').toLowerCase().includes(params.search!.toLowerCase()) ||
        (alert.resourceName || '').toLowerCase().includes(params.search!.toLowerCase()) ||
        (alert.alertId || '').toLowerCase().includes(params.search!.toLowerCase()) ||
        (alert.productName || '').toLowerCase().includes(params.search!.toLowerCase())
      );
    }
    
    if (params?.severity && typeof params.severity === 'string' && params.severity !== 'all') {
      filteredAlerts = filteredAlerts.filter(alert => alert && typeof alert === 'object' && alert.severity === params.severity);
    }
    
    if (params?.category && typeof params.category === 'string' && params.category !== 'all') {
      filteredAlerts = filteredAlerts.filter(alert => alert && typeof alert === 'object' && alert.category === params.category);
    }
    
    if (params?.emailStatus && typeof params.emailStatus === 'string' && params.emailStatus !== 'all') {
      filteredAlerts = filteredAlerts.filter(alert => alert && typeof alert === 'object' && alert.emailStatus === params.emailStatus);
    }
    
    if (params?.product && typeof params.product === 'string' && params.product !== 'all') {
      filteredAlerts = filteredAlerts.filter(alert => alert && typeof alert === 'object' && alert.productName === params.product);
    }
    
    // Pagination
    const page = params?.page || 1;
    const limit = params?.limit || 10;
    const startIndex = (page - 1) * limit;
    const paginatedAlerts = filteredAlerts.slice(startIndex, startIndex + limit);
    
    return {
      success: true,
      data: paginatedAlerts,
      total: filteredAlerts.length
    };
  }

  async resendAlert(alertId: string): Promise<ApiResponse<null>> {
    await delay(1500);
    
    return {
      success: true,
      data: null,
      message: 'Alert email resent successfully'
    };
  }

  // Products
  async getAvailableProducts(params: {
    search?: string;
    category?: string;
  } = {}): Promise<ApiResponse<IntegrationProduct[]>> {
    await delay(600);
    
    let filteredProducts = [...mockProducts];
    
    if (params?.search && typeof params.search === 'string' && params.search.trim()) {
      filteredProducts = filteredProducts.filter(product => 
        product && typeof product === 'object' &&
        (product.name || '').toLowerCase().includes(params.search!.toLowerCase()) ||
        (product.description || '').toLowerCase().includes(params.search!.toLowerCase()) ||
        (product.category || '').toLowerCase().includes(params.search!.toLowerCase())
      );
    }
    
    if (params?.category && typeof params.category === 'string' && params.category !== 'all') {
      filteredProducts = filteredProducts.filter(product => product && typeof product === 'object' && product.category === params.category);
    }
    
    return {
      success: true,
      data: filteredProducts,
      total: filteredProducts.length
    };
  }

  async getIntegratedProducts(): Promise<ApiResponse<ProductDetail[]>> {
    await delay(800);
    
    return {
      success: true,
      data: mockIntegratedProducts,
      total: mockIntegratedProducts.length
    };
  }

  async integrateProduct(productId: string, config: any): Promise<ApiResponse<null>> {
    await delay(2000);
    
    return {
      success: true,
      data: null,
      message: 'Product integrated successfully'
    };
  }

  // Dashboard
  async getDashboardStats(): Promise<ApiResponse<typeof mockDashboardStats>> {
    await delay(1000);
    
    return {
      success: true,
      data: mockDashboardStats
    };
  }

  // Acronis specific endpoints
  async getAcronisCustomers(params?: {
    search?: string;
    storageFilter?: string;
    showDisabled?: boolean;
    sortField?: string;
    sortDirection?: string;
  }): Promise<ApiResponse<any[]>> {
    await delay(1500);
    
    // Mock Acronis customers data
    const mockAcronisCustomers = [
      {
        id: '1',
        name: 'LAITH EMC NEW SERVER',
        total_protected_workloads: 1,
        local_storageInGB: 9390,
        enabled: true,
        utilization_rate: 94,
        servers: 1,
        vms: 0,
        workstations: 0,
        contact_email: 'admin@laithemc.com',
        location: 'UAE',
        created_at: '2024-01-15T10:30:00Z'
      },
      {
        id: '2',
        name: 'Al Mahtab Vegetables',
        total_protected_workloads: 2,
        local_storageInGB: 8247,
        enabled: true,
        utilization_rate: 87,
        servers: 1,
        vms: 1,
        workstations: 0,
        contact_email: 'it@almahtab.com',
        location: 'UAE',
        created_at: '2024-02-10T09:15:00Z'
      }
    ];
    
    return {
      success: true,
      data: mockAcronisCustomers,
      total: mockAcronisCustomers.length
    };
  }

  async getAcronisAlerts(params?: any): Promise<ApiResponse<any[]>> {
    await delay(1200);
    
    const mockAcronisAlerts = [
      {
        id: '1',
        type: 'BackupFailed',
        severity: 'Critical',
        category: 'Backup',
        planName: 'Enterprise Plan',
        resourceName: 'DC-GPS.rasasigps.ae',
        createdDate: '2024-01-15T14:30:00Z',
        message: 'Backup operation failed for critical server'
      }
    ];
    
    return {
      success: true,
      data: mockAcronisAlerts,
      total: mockAcronisAlerts.length
    };
  }

  // Generic error handler
  private handleError(error: any): never {
    console.error('API Error:', error);
    throw new Error(error.message || 'An unexpected error occurred');
  }
}

export const apiService = new ApiService();
export default apiService;