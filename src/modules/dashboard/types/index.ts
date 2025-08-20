// Dashboard module types
export interface DashboardStats {
  totalProducts: number;
  totalCustomers: number;
  protectedWorkloads: number;
  licenseUtilization: number;
  storageDistribution: StorageDistribution[];
  licenseUtilizationData: LicenseUtilizationData[];
  alertStats: AlertStat[];
}

export interface StorageDistribution {
  name: string;
  value: number;
  color: string;
}

export interface LicenseUtilizationData {
  product: string;
  used: number;
  available: number;
  overused: number;
  total: number;
}

export interface AlertStat {
  title: string;
  value: string;
  color: string;
  icon?: any;
}

export interface GlobalStat {
  title: string;
  value: string;
  change: string;
  trend: string;
  icon: any;
  color: string;
}

export interface IntegratedProduct {
  name: string;
  status: string;
  totalUsers: number;
  licenseUsage: number;
  lastSync: string;
  icon: any;
  statusColor: string;
}

export interface AIInsight {
  title: string;
  text: string;
  icon: any;
  actionLabel: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
}