import { IntegrationProduct, User, AlertEmailLog, NavigationItem } from '../types';
import { 
  LayoutDashboard,
  Package,
  Plug,
  Mail,
  Users,
  Activity,
  Shield,
  Zap
} from 'lucide-react';

// Available products for integration
export const AVAILABLE_PRODUCTS: IntegrationProduct[] = [
  {
    id: 'acronis',
    name: 'Acronis Cyber Protect',
    description: 'Comprehensive backup and cybersecurity solution combining data protection with anti-malware capabilities.',
    category: 'Security',
    provider: 'Acronis',
    rating: 4.7,
    users: '15K+',
    pricing: 'From $69/month',
    features: ['Backup & Recovery', 'Anti-malware Protection', 'Vulnerability Assessment', 'Patch Management'],
    isPopular: true,
    isRecommended: true,
    integrationComplexity: 'Simple',
    status: 'Integrated'
  },
  {
    id: 'bitdefender',
    name: 'Bitdefender GravityZone',
    description: 'Advanced endpoint protection with machine learning-based threat detection and response capabilities.',
    category: 'Security',
    provider: 'Bitdefender',
    rating: 4.8,
    users: '10K+',
    pricing: 'From $29.99/month',
    features: ['Endpoint Protection', 'Threat Intelligence', 'Advanced Analytics', 'Compliance Reporting'],
    isPopular: true,
    isRecommended: true,
    integrationComplexity: 'Simple',
    status: 'Available'
  },
  {
    id: 'microsoft',
    name: 'Microsoft 365',
    description: 'Complete productivity suite with Office applications, cloud storage, and collaboration tools for enterprise.',
    category: 'Productivity',
    provider: 'Microsoft',
    rating: 4.6,
    users: '50K+',
    pricing: 'From $12.50/month',
    features: ['Office Suite', 'OneDrive Storage', 'Teams Collaboration', 'Exchange Email'],
    isPopular: true,
    integrationComplexity: 'Simple',
    status: 'Available'
  },
  {
    id: 'zoho',
    name: 'Zoho Workplace',
    description: 'Integrated business suite offering email, document management, and collaboration tools for organizations.',
    category: 'Productivity',
    provider: 'Zoho Corporation',
    rating: 4.4,
    users: '25K+',
    pricing: 'From $3/month per user',
    features: ['Email & Calendar', 'Document Management', 'Team Chat', 'Video Conferencing'],
    isRecommended: true,
    integrationComplexity: 'Moderate',
    status: 'Available'
  }
];

// Product categories
export const PRODUCT_CATEGORIES = ['all', 'Security', 'Productivity'] as const;

// Navigation items
export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    badge: null,
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'products',
    label: 'Product Marketplace',
    icon: Package,
    badge: 'New',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    id: 'integrated-products',
    label: 'Integrated Products',
    icon: Plug,
    badge: '1',
    gradient: 'from-green-500 to-green-600'
  },
  {
    id: 'alert-management',
    label: 'Alert Management',
    icon: Mail,
    badge: '10.8K',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    id: 'user-management',
    label: 'User Management',
    icon: Users,
    badge: '5',
    gradient: 'from-indigo-500 to-indigo-600'
  }
];

// Quick actions for sidebar
export const QUICK_ACTIONS = [
  {
    label: 'System Health',
    icon: Activity,
    status: 'Healthy',
    color: 'text-green-500'
  },
  {
    label: 'Security Score',
    icon: Shield,
    status: '95%',
    color: 'text-blue-500'
  },
  {
    label: 'Performance',
    icon: Zap,
    status: 'Optimal',
    color: 'text-yellow-500'
  }
];

// Mock users data
export const MOCK_USERS: User[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Admin',
    status: 'Active',
    lastActive: '2024-01-15T14:30:00Z',
    createdOn: '2023-06-15T09:00:00Z',
    assignedProducts: ['Acronis', 'Microsoft', 'Bitdefender']
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'Analyst',
    status: 'Active',
    lastActive: '2024-01-15T12:45:00Z',
    createdOn: '2023-08-22T10:30:00Z',
    assignedProducts: ['Acronis', 'Microsoft']
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'Viewer',
    status: 'Active',
    lastActive: '2024-01-14T16:20:00Z',
    createdOn: '2023-11-10T14:15:00Z',
    assignedProducts: ['Acronis']
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    role: 'Analyst',
    status: 'Suspended',
    lastActive: '2024-01-10T11:30:00Z',
    createdOn: '2023-09-05T13:45:00Z',
    assignedProducts: ['Microsoft', 'Bitdefender']
  },
  {
    id: '5',
    name: 'David Thompson',
    email: 'david.thompson@company.com',
    role: 'Viewer',
    status: 'Active',
    lastActive: '2024-01-15T08:15:00Z',
    createdOn: '2023-12-01T16:00:00Z',
    assignedProducts: ['Bitdefender']
  }
];

// Mock alert email logs
export const MOCK_ALERT_EMAIL_LOGS: AlertEmailLog[] = [
  {
    id: '1',
    alertId: 'A0B6A95F',
    productName: 'Acronis',
    severity: 'Critical',
    category: 'Backup',
    alertType: 'BackupFailed',
    customerName: 'Taurus Group',
    customerEmail: 'admin@taurusgroup.com',
    resourceName: 'DC-GPS.rasasigps.ae',
    emailSentAt: '2024-01-15T14:30:00Z',
    emailStatus: 'Sent',
    message: 'Backup operation failed for critical server',
    planName: 'Enterprise Backup Plan',
    deliveryAttempts: 1
  },
  {
    id: '2',
    alertId: 'B1C7D83A',
    productName: 'Microsoft',
    severity: 'Warning',
    category: 'Email Security',
    alertType: 'MalwareDetected',
    customerName: 'Global Industries',
    customerEmail: 'security@globalindustries.com',
    resourceName: 'MAIL-SVR-01',
    emailSentAt: '2024-01-15T13:45:00Z',
    emailStatus: 'Failed',
    message: 'Malware detected in incoming email',
    planName: 'Email Security Pro',
    deliveryAttempts: 3,
    lastAttempt: '2024-01-15T15:20:00Z',
    errorMessage: 'SMTP server connection timeout'
  },
  {
    id: '3',
    alertId: 'C2D8E94B',
    productName: 'Bitdefender',
    severity: 'Error',
    category: 'System',
    alertType: 'StorageFull',
    customerName: 'Tech Solutions Ltd',
    customerEmail: 'it@techsolutions.com',
    resourceName: 'STORAGE-CLUSTER-01',
    emailSentAt: '2024-01-15T12:15:00Z',
    emailStatus: 'Sent',
    message: 'Storage capacity at 95% - immediate attention required',
    planName: 'Infrastructure Monitor',
    deliveryAttempts: 1
  },
  {
    id: '4',
    alertId: 'D3E9F05C',
    productName: 'Zoho',
    severity: 'Info',
    category: 'Licensing',
    alertType: 'LicenseExpiring',
    customerName: 'Startup Ventures',
    customerEmail: 'admin@startupventures.com',
    resourceName: 'LICENSE-SERVER',
    emailSentAt: '2024-01-15T11:00:00Z',
    emailStatus: 'Pending',
    message: 'License expires in 30 days - renewal required',
    planName: 'Standard License',
    deliveryAttempts: 0
  },
  {
    id: '5',
    alertId: 'E4F0G16D',
    productName: 'Acronis',
    severity: 'Critical',
    category: 'EDR',
    alertType: 'ThreatDetected',
    customerName: 'Financial Corp',
    customerEmail: 'security@financialcorp.com',
    resourceName: 'WORKSTATION-045',
    emailSentAt: '2024-01-15T10:30:00Z',
    emailStatus: 'Sent',
    message: 'Advanced persistent threat detected on endpoint',
    planName: 'EDR Advanced',
    deliveryAttempts: 1
  }
];

// Integration requirements
export const INTEGRATION_REQUIREMENTS = {
  microsoft: {
    credentials: ['Application ID', 'Client Secret', 'Tenant ID'],
    permissions: ['User.Read.All', 'Organization.Read.All', 'Directory.Read.All'],
    requirements: ['Admin consent required', 'Azure AD application registration']
  },
  bitdefender: {
    credentials: ['API Key', 'Company ID'],
    permissions: ['Read company information', 'Manage licenses', 'View usage reports'],
    requirements: ['GravityZone account', 'API access enabled']
  },
  acronis: {
    credentials: ['API Key', 'Server URL', 'Username'],
    permissions: ['Read backup status', 'Manage users', 'View reports'],
    requirements: ['Acronis Cyber Cloud account', 'Partner portal access']
  }
};