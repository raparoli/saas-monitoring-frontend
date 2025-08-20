// Shared application types
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