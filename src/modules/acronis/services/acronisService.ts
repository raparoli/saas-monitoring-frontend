import { Customer, Alert, CustomerUsageDetail, EnhancedCustomerData } from '../types';
import { customers, alerts, customerUsageDetails } from '../constants';

class AcronisService {
  async getCustomers(): Promise<{ data: Customer[]; success: boolean; message?: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      success: true,
      data: customers
    };
  }

  async getAlerts(): Promise<{ data: Alert[]; success: boolean; message?: string }> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    return {
      success: true,
      data: alerts
    };
  }

  async getCustomerUsageDetails(): Promise<{ data: CustomerUsageDetail[]; success: boolean; message?: string }> {
    await new Promise(resolve => setTimeout(resolve, 700));
    
    return {
      success: true,
      data: customerUsageDetails
    };
  }

  async getEnhancedCustomerData(customerId: string): Promise<{ data: EnhancedCustomerData | null; success: boolean; message?: string }> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const customer = customers.find(c => c.id === customerId);
    if (!customer) {
      return {
        success: false,
        data: null,
        message: 'Customer not found'
      };
    }

    const enhancedData: EnhancedCustomerData = {
      ...customer,
      analytics: {
        storageBreakdown: {
          backups: Math.round(customer.local_storageInGB * 0.65),
          archives: Math.round(customer.local_storageInGB * 0.22),
          replicas: Math.round(customer.local_storageInGB * 0.10),
          cache: Math.round(customer.local_storageInGB * 0.03)
        },
        utilizationTrends: [
          { month: 'Jan', storage: customer.local_storageInGB * 0.7, efficiency: (customer.utilization_rate || 75) - 10 },
          { month: 'Feb', storage: customer.local_storageInGB * 0.75, efficiency: (customer.utilization_rate || 75) - 8 },
          { month: 'Mar', storage: customer.local_storageInGB * 0.8, efficiency: (customer.utilization_rate || 75) - 5 },
          { month: 'Apr', storage: customer.local_storageInGB * 0.85, efficiency: (customer.utilization_rate || 75) - 3 },
          { month: 'May', storage: customer.local_storageInGB * 0.9, efficiency: (customer.utilization_rate || 75) - 1 },
          { month: 'Jun', storage: customer.local_storageInGB * 0.95, efficiency: customer.utilization_rate || 75 },
          { month: 'Jul', storage: customer.local_storageInGB, efficiency: customer.utilization_rate || 75 }
        ],
        performanceMetrics: {
          backupSuccess: customer.id === '1' ? 98.5 : customer.id === '2' ? 96.8 : 99.2,
          recoveryTime: customer.id === '1' ? 45 : customer.id === '2' ? 52 : 28,
          compressionRatio: customer.id === '1' ? 2.3 : customer.id === '2' ? 2.1 : 2.6,
          deduplicationRatio: customer.id === '1' ? 3.1 : customer.id === '2' ? 2.8 : 3.4
        },
        costAnalysis: {
          monthlyCost: Math.round(customer.local_storageInGB * 0.052),
          costPerGB: 0.052,
          costTrend: customer.id === '1' ? 5.2 : customer.id === '2' ? 3.8 : 2.1,
          projectedCost: Math.round(customer.local_storageInGB * 0.052 * 1.05)
        },
        healthScore: customer.utilization_rate || 75,
        riskLevel: (customer.utilization_rate || 0) > 90 ? 'High' : (customer.utilization_rate || 0) > 75 ? 'Medium' : 'Low',
        recentActivity: [
          { type: 'Backup', status: 'Success', time: '2 hours ago' },
          { type: 'Sync', status: 'Success', time: '6 hours ago' },
          { type: 'Archive', status: 'In Progress', time: '12 hours ago' }
        ]
      }
    };
    
    return {
      success: true,
      data: enhancedData
    };
  }
}

export const acronisService = new AcronisService();