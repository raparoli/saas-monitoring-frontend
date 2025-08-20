// Shared application constants
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
import { NavigationItem } from '../types';

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

export const PRODUCT_CATEGORIES = ['all', 'Security', 'Productivity'] as const;

export const INTEGRATION_REQUIREMENTS = {
  acronis: {
    credentials: ['API Key', 'Server URL'],
    permissions: ['Backup management', 'User access', 'License monitoring'],
    requirements: ['Active Acronis account', 'API access enabled']
  },
  microsoft: {
    credentials: ['Application ID', 'Client Secret', 'Tenant ID'],
    permissions: ['User management', 'License monitoring', 'Usage reporting'],
    requirements: ['Azure AD admin access', 'Microsoft 365 subscription']
  },
  bitdefender: {
    credentials: ['API Key', 'Company ID'],
    permissions: ['Endpoint management', 'Policy configuration', 'Reporting'],
    requirements: ['GravityZone account', 'API access enabled']
  },
  zoho: {
    credentials: ['API Key', 'Organization ID'],
    permissions: ['User management', 'Email access', 'Document management'],
    requirements: ['Zoho Workplace account', 'Admin privileges']
  }
};

export const AVAILABLE_PRODUCTS = [
  {
    id: 'bitdefender',
    name: 'Bitdefender GravityZone',
    description: 'Advanced endpoint protection with machine learning-based threat detection.',
    category: 'Security',
    provider: 'Bitdefender',
    rating: 4.8,
    users: '10K+',
    pricing: 'From $29.99/month',
    features: ['Endpoint Protection', 'Threat Intelligence', 'Advanced Analytics'],
    isPopular: true,
    isRecommended: true,
    integrationComplexity: 'Simple' as const,
    status: 'Available' as const
  },
  {
    id: 'microsoft',
    name: 'Microsoft 365',
    description: 'Complete productivity suite with Office applications and cloud storage.',
    category: 'Productivity',
    provider: 'Microsoft',
    rating: 4.6,
    users: '50K+',
    pricing: 'From $12.50/month',
    features: ['Office Suite', 'OneDrive Storage', 'Teams Collaboration'],
    isPopular: true,
    integrationComplexity: 'Simple' as const,
    status: 'Available' as const
  },
  {
    id: 'zoho',
    name: 'Zoho Workplace',
    description: 'Integrated business suite offering email and document management.',
    category: 'Productivity',
    provider: 'Zoho Corporation',
    rating: 4.4,
    users: '25K+',
    pricing: 'From $3/month per user',
    features: ['Email & Calendar', 'Document Management', 'Team Chat'],
    isRecommended: true,
    integrationComplexity: 'Moderate' as const,
    status: 'Available' as const
  }
];