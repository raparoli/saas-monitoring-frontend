import { Customer, Alert, LicenseEdition, CustomerUsageDetail, Usage } from './types';
import { Server, Monitor, Laptop } from 'lucide-react';

// Constants
export const ALERTS_PER_PAGE = 10;

// Enhanced license data
export const licenseData = {
  totalLicenses: 200,
  usedLicenses: 187,
  availableLicenses: 13,
  utilizationPercentage: 93.5,
  licenseType: 'Advanced Backup',
  renewalDate: '2024-11-30',
  status: 'Active',
  contractType: 'Annual',
  contractId: 'ACR-2024-001'
};

// License editions data
export const licenseEditions: LicenseEdition[] = [
  {
    id: '1',
    editionName: 'Cyber Protection',
    licenseType: 'Per Workload',
    totalQuota: 150,
    usedLicenses: 147,
    utilizationRate: 98
  },
  {
    id: '2',
    editionName: 'Advanced Backup',
    licenseType: 'Storage-based',
    totalQuota: 30,
    usedLicenses: 25,
    utilizationRate: 83.3
  },
  {
    id: '3',
    editionName: 'Cyber Protect Cloud',
    licenseType: 'Per Workload',
    totalQuota: 20,
    usedLicenses: 15,
    utilizationRate: 75
  }
];

export const storageDistribution = [
  { name: 'Local Storage', value: 232.81, color: 'hsl(var(--chart-1))' },
  { name: 'Cloud Storage', value: 4.71, color: 'hsl(var(--chart-2))' }
];

export const workloadUtilization = [
  { type: 'Servers', icon: Server, quota: 1, used: 1, utilizationRate: 100 },
  { type: 'Virtual Machines', icon: Monitor, quota: 1, used: 1, utilizationRate: 100 },
  { type: 'Workstations', icon: Laptop, quota: 1, used: 1, utilizationRate: 100 }
];

export const topCustomers = [
  { name: 'LAITH EMC NEW SERVER', localStorageGB: 9390, protectedWorkloads: 1 },
  { name: 'Al Mahtab Vegetables', localStorageGB: 8247, protectedWorkloads: 2 },
  { name: 'AL AYAAN', localStorageGB: 3092, protectedWorkloads: 1 }
];

export const alertSeverityData = [
  { name: 'Critical', value: 5731, color: '#dc2626' },
  { name: 'Warning', value: 13177, color: '#f59e0b' },
  { name: 'Error', value: 649, color: '#ef4444' },
  { name: 'Info', value: 747, color: '#3b82f6' }
];

export const alertCategoryCount = [
  { name: 'Backup', value: 8245, color: 'hsl(var(--chart-1))' },
  { name: 'Email Security', value: 4567, color: 'hsl(var(--chart-2))' },
  { name: 'System', value: 3891, color: 'hsl(var(--chart-3))' },
  { name: 'EDR', value: 2134, color: 'hsl(var(--chart-4))' },
  { name: 'Network', value: 1567, color: 'hsl(var(--chart-5))' }
];

export const alertTypeCount = [
  { name: 'BackupFailed', value: 4532, color: '#dc2626' },
  { name: 'NoBackupForXDays', value: 3654, color: '#f59e0b' },
  { name: 'MalwareDetected', value: 2876, color: '#ef4444' },
  { name: 'StorageFull', value: 2234, color: '#3b82f6' },
  { name: 'ConnectionLost', value: 1789, color: '#8b5cf6' },
  { name: 'LicenseExpiring', value: 1234, color: '#06b6d4' },
  { name: 'SystemError', value: 987, color: '#10b981' },
  { name: 'Others', value: 2998, color: '#6b7280' }
];

// Enhanced alerts data
export const alerts: Alert[] = [
  {
    id: '1',
    type: 'BackupDidNotStart',
    severity: 'Critical',
    category: 'Backup',
    planName: 'DC-GPS',
    resourceName: 'DC-GPS.rasasigps.ae',
    createdDate: '2024-08-08T14:30:00Z',
    planId: 'plan-001',
    agentId: 'agent-12345',
    resourceId: 'res-67890',
    message: 'Backup job failed to start due to agent connectivity issues',
    backupSource: '/var/backups',
    backupLocation: 'Cloud Storage Pool 1',
    rawPayload: {
      alertId: 'alert-001',
      timestamp: '2024-08-08T14:30:00Z',
      severity: 'Critical',
      details: { errorCode: 'ERR_AGENT_OFFLINE', retryCount: 3 }
    }
  },
  {
    id: '2',
    type: 'NoBackupForXDays',
    severity: 'Warning',
    category: 'Backup',
    planName: 'Daily-VM-Backup',
    resourceName: 'VM-Cluster-A.domain.local',
    createdDate: '2024-08-07T09:15:00Z',
    planId: 'plan-002',
    agentId: 'agent-23456',
    resourceId: 'res-78901',
    message: 'No successful backup completed for 3 days',
    backupSource: 'Virtual Machine',
    backupLocation: 'Local Storage Pool',
    rawPayload: {
      alertId: 'alert-002',
      timestamp: '2024-08-07T09:15:00Z',
      severity: 'Warning',
      details: { lastBackup: '2024-08-04T22:00:00Z', daysMissed: 3 }
    }
  },
  {
    id: '3',
    type: 'MalwareDetected',
    severity: 'Critical',
    category: 'EDR',
    planName: 'Endpoint-Protection',
    resourceName: 'WS-Finance-01.corp.local',
    createdDate: '2024-08-07T16:45:00Z',
    planId: 'plan-003',
    agentId: 'agent-34567',
    resourceId: 'res-89012',
    message: 'Malware signature detected and quarantined',
    backupSource: 'C:\\Users\\Documents',
    backupLocation: 'Quarantine Vault',
    rawPayload: {
      alertId: 'alert-003',
      timestamp: '2024-08-07T16:45:00Z',
      severity: 'Critical',
      details: { malwareType: 'Trojan.GenKryptor', threatLevel: 'High', action: 'Quarantined' }
    }
  },
  {
    id: '4',
    type: 'StorageFull',
    severity: 'Error',
    category: 'System',
    planName: 'Archive-Storage',
    resourceName: 'Storage-Pool-Primary',
    createdDate: '2024-08-06T11:20:00Z',
    planId: 'plan-004',
    agentId: 'agent-45678',
    resourceId: 'res-90123',
    message: 'Storage pool has reached 95% capacity',
    backupSource: 'Multiple Sources',
    backupLocation: 'Primary Storage Pool',
    rawPayload: {
      alertId: 'alert-004',
      timestamp: '2024-08-06T11:20:00Z',
      severity: 'Error',
      details: { currentUsage: '95%', totalCapacity: '50TB', availableSpace: '2.5TB' }
    }
  },
  {
    id: '5',
    type: 'LicenseExpiring',
    severity: 'Warning',
    category: 'System',
    planName: 'License-Manager',
    resourceName: 'Acronis-License-Server',
    createdDate: '2024-08-05T08:00:00Z',
    planId: 'plan-005',
    agentId: 'agent-56789',
    resourceId: 'res-01234',
    message: 'License will expire in 30 days',
    backupSource: 'License Database',
    backupLocation: 'License Server',
    rawPayload: {
      alertId: 'alert-005',
      timestamp: '2024-08-05T08:00:00Z',
      severity: 'Warning',
      details: { expiryDate: '2024-09-05', daysRemaining: 30, licenseType: 'Advanced' }
    }
  },
  {
    id: '6',
    type: 'ConnectionLost',
    severity: 'Error',
    category: 'Network',
    planName: 'Remote-Backup',
    resourceName: 'Remote-Site-01',
    createdDate: '2024-08-04T13:30:00Z',
    planId: 'plan-006',
    agentId: 'agent-67890',
    resourceId: 'res-12345',
    message: 'Connection to remote backup agent lost',
    backupSource: 'Remote Server',
    backupLocation: 'Cloud Repository',
    rawPayload: {
      alertId: 'alert-006',
      timestamp: '2024-08-04T13:30:00Z',
      severity: 'Error',
      details: { lastContact: '2024-08-04T10:15:00Z', connectionType: 'VPN', retryAttempts: 5 }
    }
  }
];

// Enhanced customers data
export const customers: Customer[] = [
  {
    id: '1',
    name: 'LAITH EMC NEW SERVER',
    total_protected_workloads: 1,
    local_storageInGB: 9390,
    enabled: true,
    created_at: '2024-01-15T10:30:00Z',
    production_start_date: '2024-02-01T00:00:00Z',
    type: 'default',
    pricing_mode: 'Production',
    mfa_status: 'enabled',
    brand_uuid: 'brand-uuid-001',
    language: 'en',
    location: 'UAE',
    owner_id: 'owner-001',
    contact_email: 'admin@laithemc.com',
    contact_phone: '+971-50-123-4567',
    updated_at: '2024-08-01T15:22:00Z',
    servers: 1,
    vms: 0,
    workstations: 0,
    utilization_rate: 94
  },
  {
    id: '2',
    name: 'Al Mahtab Vegetables',
    total_protected_workloads: 2,
    local_storageInGB: 8247,
    enabled: true,
    created_at: '2024-02-10T09:15:00Z',
    production_start_date: '2024-02-15T00:00:00Z',
    type: 'default',
    pricing_mode: 'Production',
    mfa_status: 'disabled',
    brand_uuid: 'brand-uuid-002',
    language: 'ar',
    location: 'UAE',
    owner_id: 'owner-002',
    contact_email: 'it@almahtab.com',
    contact_phone: '+971-50-234-5678',
    updated_at: '2024-07-28T11:45:00Z',
    servers: 1,
    vms: 1,
    workstations: 0,
    utilization_rate: 87
  },
  {
    id: '3',
    name: 'AL AYAAN',
    total_protected_workloads: 1,
    local_storageInGB: 3092,
    enabled: true,
    created_at: '2024-03-05T14:20:00Z',
    production_start_date: '2024-03-10T00:00:00Z',
    type: 'default',
    pricing_mode: 'Production',
    mfa_status: 'enabled',
    brand_uuid: 'brand-uuid-003',
    language: 'en',
    location: 'UAE',
    owner_id: 'owner-003',
    contact_email: 'support@alayaan.com',
    contact_phone: '+971-50-345-6789',
    updated_at: '2024-08-02T09:30:00Z',
    servers: 0,
    vms: 0,
    workstations: 1,
    utilization_rate: 76
  },
  {
    id: '4',
    name: 'TechCorp Solutions',
    total_protected_workloads: 5,
    local_storageInGB: 12500,
    enabled: false,
    created_at: '2024-01-20T11:00:00Z',
    production_start_date: '2024-01-25T00:00:00Z',
    type: 'enterprise',
    pricing_mode: 'Production',
    mfa_status: 'enabled',
    brand_uuid: 'brand-uuid-004',
    language: 'en',
    location: 'UAE',
    owner_id: 'owner-004',
    contact_email: 'admin@techcorp.com',
    contact_phone: '+971-50-456-7890',
    updated_at: '2024-07-15T16:20:00Z',
    servers: 2,
    vms: 2,
    workstations: 1,
    utilization_rate: 82
  },
  {
    id: '5',
    name: 'Global Trading LLC',
    total_protected_workloads: 3,
    local_storageInGB: 6780,
    enabled: true,
    created_at: '2024-02-28T08:45:00Z',
    production_start_date: '2024-03-05T00:00:00Z',
    type: 'default',
    pricing_mode: 'Production',
    mfa_status: 'enabled',
    brand_uuid: 'brand-uuid-005',
    language: 'en',
    location: 'UAE',
    owner_id: 'owner-005',
    contact_email: 'it@globaltrading.com',
    contact_phone: '+971-50-567-8901',
    updated_at: '2024-07-30T13:10:00Z',
    servers: 1,
    vms: 1,
    workstations: 1,
    utilization_rate: 89
  },
  {
    id: '6',
    name: 'Smart Systems',
    total_protected_workloads: 2,
    local_storageInGB: 4250,
    enabled: false,
    created_at: '2024-04-12T16:30:00Z',
    production_start_date: '2024-04-20T00:00:00Z',
    type: 'default',
    pricing_mode: 'Production',
    mfa_status: 'disabled',
    brand_uuid: 'brand-uuid-006',
    language: 'ar',
    location: 'UAE',
    owner_id: 'owner-006',
    contact_email: 'admin@smartsystems.com',
    contact_phone: '+971-50-678-9012',
    updated_at: '2024-07-25T10:55:00Z',
    servers: 0,
    vms: 1,
    workstations: 1,
    utilization_rate: 65
  }
];

// Mock customer usage detail data
export const customerUsageDetails: CustomerUsageDetail[] = [
  {
    customerId: '1',
    customerName: 'LAITH EMC NEW SERVER',
    usageBreakdown: {
      cyberProtection: { storage: 9390, vms: 0, servers: 1, workstations: 0 },
      quotas: { storageQuota: 10000, vmsQuota: 2, serversQuota: 1, workstationsQuota: 5 }
    },
    contractInfo: { renewalDate: '2024-12-01', licenseType: 'Advanced', status: 'Active' }
  },
  {
    customerId: '2',
    customerName: 'Al Mahtab Vegetables',
    usageBreakdown: {
      cyberProtection: { storage: 8247, vms: 1, servers: 1, workstations: 0 },
      quotas: { storageQuota: 12000, vmsQuota: 2, serversQuota: 2, workstationsQuota: 10 }
    },
    contractInfo: { renewalDate: '2024-11-15', licenseType: 'Standard', status: 'Active' }
  }
];

// Mock data for other tabs
export const overviewStats = {
  totalProtectedWorkloads: 240,
  totalLocalStorageUsed: 232.80
};

export const usageData: Usage[] = [
  { productRename: 'Servers', usageType: 'Backup', quota: '50 GB', absoluteValue: '42 GB', utilizationRate: 84 },
  { productRename: 'VMs', usageType: 'Replication', quota: '100 GB', absoluteValue: '87 GB', utilizationRate: 87 },
  { productRename: 'Workstations', usageType: 'Sync', quota: '25 GB', absoluteValue: '18 GB', utilizationRate: 72 },
  { productRename: 'Servers', usageType: 'Archive', quota: '200 GB', absoluteValue: '156 GB', utilizationRate: 78 },
  { productRename: 'Mobile Devices', usageType: 'Backup', quota: '15 GB', absoluteValue: '14 GB', utilizationRate: 93 },
];

export const alertSeverityCount = [
  { name: 'Critical', value: 5, color: '#dc2626' },
  { name: 'Warning', value: 12, color: '#f59e0b' },
  { name: 'Info', value: 8, color: '#3b82f6' },
  { name: 'Error', value: 3, color: '#ef4444' }
];