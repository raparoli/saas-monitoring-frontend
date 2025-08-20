// Core application types
export type Page = 'login' | 'dashboard' | 'products' | 'integrated-products' | 'product-detail' | 'acronis-detail' | 'alert-management' | 'user-management';

// Product types
export interface ProductDetail {
  id: string;
  name: string;
  logo: string;
  status: string;
  totalLicenses: number;
  usedLicenses: number;
  licenseType: string;
  renewalDate: string;
}

export interface IntegrationProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  provider?: string;
  rating?: number;
  users?: string;
  pricing?: string;
  features?: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
  integrationComplexity?: 'Simple' | 'Moderate' | 'Advanced';
  status?: 'Available' | 'Coming Soon' | 'Beta' | 'Integrated';
}

// User types
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'Admin' | 'Analyst' | 'Viewer';
  status: 'Active' | 'Suspended';
  lastActive: string;
  createdOn: string;
  assignedProducts: string[];
  avatar?: string;
}

// Alert types
export interface AlertEmailLog {
  id: string;
  alertId: string;
  productName: string;
  severity: 'Critical' | 'Warning' | 'Error' | 'Info';
  category: string;
  alertType: string;
  customerName: string;
  customerEmail: string;
  resourceName: string;
  emailSentAt: string;
  emailStatus: 'Sent' | 'Failed' | 'Pending';
  message: string;
  planName: string;
  deliveryAttempts: number;
  lastAttempt?: string;
  errorMessage?: string;
}

// Acronis types
export interface Customer {
  id: string;
  name: string;
  total_protected_workloads: number;
  local_storageInGB: number;
  enabled: boolean;
  created_at: string;
  production_start_date: string;
  type: string;
  pricing_mode: string;
  mfa_status: string;
  brand_uuid: string;
  language: string;
  location: string;
  owner_id: string;
  contact_email: string;
  contact_phone: string;
  updated_at: string;
  servers?: number;
  vms?: number;
  workstations?: number;
  utilization_rate?: number;
}

export interface Alert {
  id: string;
  type: string;
  severity: 'Critical' | 'Warning' | 'Info' | 'Error';
  category: string;
  planName: string;
  resourceName: string;
  createdDate: string;
  planId?: string;
  agentId?: string;
  resourceId?: string;
  message?: string;
  backupSource?: string;
  backupLocation?: string;
  rawPayload?: any;
}

export interface CustomerUsageDetail {
  customerId: string;
  customerName: string;
  usageBreakdown: {
    cyberProtection: {
      storage: number;
      vms: number;
      servers: number;
      workstations: number;
    };
    quotas: {
      storageQuota: number;
      vmsQuota: number;
      serversQuota: number;
      workstationsQuota: number;
    };
  };
  contractInfo: {
    renewalDate: string;
    licenseType: string;
    status: string;
  };
}

export interface LicenseEdition {
  id: string;
  editionName: string;
  licenseType: string;
  totalQuota: number;
  usedLicenses: number;
  utilizationRate: number;
}

export interface Usage {
  productRename: string;
  usageType: string;
  quota: string;
  absoluteValue: string;
  utilizationRate: number;
}

export type SortField = 'name' | 'total_protected_workloads' | 'local_storageInGB' | 'created_at' | 'utilization_rate';
export type SortDirection = 'asc' | 'desc';

export interface EnhancedCustomerAnalytics {
  storageBreakdown: {
    backups: number;
    archives: number;
    replicas: number;
    cache: number;
  };
  utilizationTrends: {
    month: string;
    storage: number;
    efficiency: number;
  }[];
  performanceMetrics: {
    backupSuccess: number;
    recoveryTime: number;
    compressionRatio: number;
    deduplicationRatio: number;
  };
  costAnalysis: {
    monthlyCost: number;
    costPerGB: number;
    costTrend: number;
    projectedCost: number;
  };
  healthScore: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  recentActivity: {
    type: string;
    status: string;
    time: string;
  }[];
}

export interface EnhancedCustomerData extends Customer {
  analytics: EnhancedCustomerAnalytics;
}

// Navigation types
export interface NavigationItem {
  id: Page;
  label: string;
  icon: any;
  badge?: string | null;
  gradient: string;
}

// Integration types
export type IntegrationStep = 'overview' | 'credentials' | 'configuration' | 'permissions' | 'testing' | 'success';