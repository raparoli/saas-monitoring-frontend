import { DashboardStats } from '../types';

class DashboardService {
  async getDashboardStats(): Promise<{ data: DashboardStats; success: boolean; message?: string }> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const mockDashboardStats: DashboardStats = {
      totalProducts: 1,
      totalCustomers: 140,
      protectedWorkloads: 460,
      licenseUtilization: 89.6,
      storageDistribution: [
        { name: 'Local Storage', value: 45, color: '#3b82f6' },
        { name: 'Cloud Storage', value: 35, color: '#10b981' },
        { name: 'Hybrid Storage', value: 20, color: '#f59e0b' }
      ],
      licenseUtilizationData: [
        { product: 'Acronis', used: 187, available: 13, overused: 0, total: 200 },
        { product: 'Microsoft', used: 0, available: 250, overused: 0, total: 250 },
        { product: 'Bitdefender', used: 0, available: 150, overused: 0, total: 150 }
      ],
      alertStats: [
        { title: 'Critical Alerts', value: '5731', color: 'from-red-500 to-red-600' },
        { title: 'Warning Alerts', value: '13177', color: 'from-yellow-500 to-yellow-600' },
        { title: 'Errors', value: '649', color: 'from-orange-500 to-orange-600' },
        { title: 'Informational', value: '747', color: 'from-blue-500 to-blue-600' }
      ]
    };
    
    return {
      success: true,
      data: mockDashboardStats
    };
  }
}

export const dashboardService = new DashboardService();