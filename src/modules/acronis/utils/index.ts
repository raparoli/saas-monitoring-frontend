import { Customer, Alert, SortField, SortDirection, EnhancedCustomerData } from '../types';
import { customers, licenseData, alertSeverityData } from '../constants';
import { AlertOctagon, XCircle, AlertTriangle, Info, AlertCircle, TrendingUp, TrendingDown } from 'lucide-react';

// Helper functions
export const getSeverityColor = (severity: string) => {
  switch (severity) {
    case 'Critical': return 'destructive';
    case 'Error': return 'destructive';
    case 'Warning': return 'secondary';
    case 'Info': return 'default';
    default: return 'default';
  }
};

export const getSeverityIcon = (severity: string) => {
  switch (severity) {
    case 'Critical': return AlertOctagon;
    case 'Error': return XCircle;
    case 'Warning': return AlertTriangle;
    case 'Info': return Info;
    default: return AlertCircle;
  }
};

export const getSeverityStats = () => {
  const total = alertSeverityData.reduce((sum, item) => sum + item.value, 0);
  return alertSeverityData.map(item => ({
    ...item,
    percentage: Math.round((item.value / total) * 100)
  }));
};

export const formatStorageGB = (gb: number) => {
  if (gb >= 1000) {
    return `${(gb / 1000).toFixed(1)} TB`;
  }
  return `${gb.toLocaleString()} GB`;
};

export const getDaysUntilRenewal = () => {
  const renewalDate = new Date(licenseData.renewalDate);
  const today = new Date();
  const diffTime = renewalDate.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const formatDate = (dateString: string) => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString: string) => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getUtilizationColor = (rate: number) => {
  if (rate >= 95) return 'text-red-600';
  if (rate >= 80) return 'text-orange-600';
  if (rate >= 60) return 'text-yellow-600';
  return 'text-green-600';
};

export const getUtilizationBarColor = (rate: number) => {
  if (rate >= 95) return 'bg-red-500';
  if (rate >= 80) return 'bg-orange-500';
  if (rate >= 60) return 'bg-yellow-500';
  return 'bg-green-500';
};

// Enhanced customer data with comprehensive analytics
export const getEnhancedCustomerData = (customerId: string): EnhancedCustomerData | null => {
  const customer = customers.find(c => c.id === customerId);
  if (!customer) return null;

  return {
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
};

// Filter functions
export const getFilteredCustomers = (
  customers: Customer[],
  customerSearch: string,
  storageFilter: string,
  showDisabledCustomers: boolean
) => {
  return customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(customerSearch.toLowerCase());
    const matchesStorageFilter = storageFilter === 'all' || 
      (storageFilter === '1000' && customer.local_storageInGB > 1000) ||
      (storageFilter === '5000' && customer.local_storageInGB > 5000) ||
      (storageFilter === '10000' && customer.local_storageInGB > 10000);
    const matchesEnabledFilter = showDisabledCustomers || customer.enabled;
    
    return matchesSearch && matchesStorageFilter && matchesEnabledFilter;
  });
};

export const getFilteredUsageCustomers = (
  customers: Customer[],
  customerSearch: string,
  usageUtilizationFilter: string,
  usageStorageFilter: string,
  showDisabledCustomers: boolean
) => {
  return customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(customerSearch.toLowerCase());
    const matchesUtilizationFilter = usageUtilizationFilter === 'all' ||
      (usageUtilizationFilter === '80' && (customer.utilization_rate || 0) > 80);
    const matchesStorageFilter = usageStorageFilter === 'all' ||
      (usageStorageFilter === '5000' && customer.local_storageInGB > 5000);
    const matchesEnabledFilter = showDisabledCustomers || customer.enabled;
    
    return matchesSearch && matchesUtilizationFilter && matchesStorageFilter && matchesEnabledFilter;
  });
};

export const getFilteredAlerts = (
  alerts: Alert[],
  alertSeverityFilter: string,
  alertCategoryFilter: string,
  alertTypeFilter: string,
  alertSearch: string,
  alertDateFrom?: Date,
  alertDateTo?: Date
) => {
  return alerts.filter(alert => {
    const matchesSeverity = alertSeverityFilter === 'all' || alert.severity === alertSeverityFilter;
    const matchesCategory = alertCategoryFilter === 'all' || alert.category === alertCategoryFilter;
    const matchesType = alertTypeFilter === 'all' || alert.type === alertTypeFilter;
    const matchesSearch = alert.resourceName.toLowerCase().includes(alertSearch.toLowerCase()) ||
                         alert.planName.toLowerCase().includes(alertSearch.toLowerCase()) ||
                         alert.type.toLowerCase().includes(alertSearch.toLowerCase());
    
    const alertDate = new Date(alert.createdDate);
    const matchesDateRange = (!alertDateFrom || alertDate >= alertDateFrom) && 
                            (!alertDateTo || alertDate <= alertDateTo);
    
    return matchesSeverity && matchesCategory && matchesType && matchesSearch && matchesDateRange;
  });
};

// Sort function
export const getSortedCustomers = (
  customers: Customer[],
  sortField: SortField,
  sortDirection: SortDirection
) => {
  return [...customers].sort((a, b) => {
    let aValue, bValue;
    
    switch (sortField) {
      case 'name':
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
        break;
      case 'total_protected_workloads':
        aValue = a.total_protected_workloads;
        bValue = b.total_protected_workloads;
        break;
      case 'local_storageInGB':
        aValue = a.local_storageInGB;
        bValue = b.local_storageInGB;
        break;
      case 'created_at':
        aValue = new Date(a.created_at).getTime();
        bValue = new Date(b.created_at).getTime();
        break;
      case 'utilization_rate':
        aValue = a.utilization_rate || 0;
        bValue = b.utilization_rate || 0;
        break;
      default:
        aValue = a.name.toLowerCase();
        bValue = b.name.toLowerCase();
    }
    
    if (sortDirection === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });
};