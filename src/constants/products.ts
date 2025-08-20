import { IntegrationProduct } from '../types';

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

export const PRODUCT_CATEGORIES = ['all', 'Security', 'Productivity'] as const;

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