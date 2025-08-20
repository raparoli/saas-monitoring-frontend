// Mock data for the application
export const mockUsers = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john.doe@company.com',
    role: 'Admin' as const,
    status: 'Active' as const,
    lastActive: '2024-01-15T14:30:00Z',
    createdOn: '2023-06-15T09:00:00Z',
    assignedProducts: ['Acronis', 'Microsoft', 'Bitdefender'],
    avatar: undefined
  },
  {
    id: '2',
    name: 'Sarah Wilson',
    email: 'sarah.wilson@company.com',
    role: 'Analyst' as const,
    status: 'Active' as const,
    lastActive: '2024-01-15T12:45:00Z',
    createdOn: '2023-08-22T10:30:00Z',
    assignedProducts: ['Acronis', 'Microsoft'],
    avatar: undefined
  },
  {
    id: '3',
    name: 'Michael Chen',
    email: 'michael.chen@company.com',
    role: 'Viewer' as const,
    status: 'Active' as const,
    lastActive: '2024-01-14T16:20:00Z',
    createdOn: '2023-11-10T14:15:00Z',
    assignedProducts: ['Acronis'],
    avatar: undefined
  },
  {
    id: '4',
    name: 'Emily Rodriguez',
    email: 'emily.rodriguez@company.com',
    role: 'Analyst' as const,
    status: 'Suspended' as const,
    lastActive: '2024-01-10T11:30:00Z',
    createdOn: '2023-09-05T13:45:00Z',
    assignedProducts: ['Microsoft', 'Bitdefender'],
    avatar: undefined
  },
  {
    id: '5',
    name: 'David Thompson',
    email: 'david.thompson@company.com',
    role: 'Viewer' as const,
    status: 'Active' as const,
    lastActive: '2024-01-15T08:15:00Z',
    createdOn: '2023-12-01T16:00:00Z',
    assignedProducts: ['Bitdefender'],
    avatar: undefined
  }
];

export const mockAlertEmailLogs = [
  {
    id: '1',
    alertId: 'A0B6A95F',
    productName: 'Acronis',
    severity: 'Critical' as const,
    category: 'Backup',
    alertType: 'BackupFailed',
    customerName: 'Taurus Group',
    customerEmail: 'admin@taurusgroup.com',
    resourceName: 'DC-GPS.rasasigps.ae',
    emailSentAt: '2024-01-15T14:30:00Z',
    emailStatus: 'Sent' as const,
    message: 'Backup operation failed for critical server',
    planName: 'Enterprise Backup Plan',
    deliveryAttempts: 1
  },
  {
    id: '2',
    alertId: 'B1C7D83A',
    productName: 'Microsoft',
    severity: 'Warning' as const,
    category: 'Email Security',
    alertType: 'MalwareDetected',
    customerName: 'Global Industries',
    customerEmail: 'security@globalindustries.com',
    resourceName: 'MAIL-SVR-01',
    emailSentAt: '2024-01-15T13:45:00Z',
    emailStatus: 'Failed' as const,
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
    severity: 'Error' as const,
    category: 'System',
    alertType: 'StorageFull',
    customerName: 'Tech Solutions Ltd',
    customerEmail: 'it@techsolutions.com',
    resourceName: 'STORAGE-CLUSTER-01',
    emailSentAt: '2024-01-15T12:15:00Z',
    emailStatus: 'Sent' as const,
    message: 'Storage capacity at 95% - immediate attention required',
    planName: 'Infrastructure Monitor',
    deliveryAttempts: 1
  },
  {
    id: '4',
    alertId: 'D3E9F05C',
    productName: 'Zoho',
    severity: 'Info' as const,
    category: 'Licensing',
    alertType: 'LicenseExpiring',
    customerName: 'Startup Ventures',
    customerEmail: 'admin@startupventures.com',
    resourceName: 'LICENSE-SERVER',
    emailSentAt: '2024-01-15T11:00:00Z',
    emailStatus: 'Pending' as const,
    message: 'License expires in 30 days - renewal required',
    planName: 'Standard License',
    deliveryAttempts: 0
  },
  {
    id: '5',
    alertId: 'E4F0G16D',
    productName: 'Acronis',
    severity: 'Critical' as const,
    category: 'EDR',
    alertType: 'ThreatDetected',
    customerName: 'Financial Corp',
    customerEmail: 'security@financialcorp.com',
    resourceName: 'WORKSTATION-045',
    emailSentAt: '2024-01-15T10:30:00Z',
    emailStatus: 'Sent' as const,
    message: 'Advanced persistent threat detected on endpoint',
    planName: 'EDR Advanced',
    deliveryAttempts: 1
  }
];

export const mockProducts = [
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
    integrationComplexity: 'Simple' as const,
    status: 'Integrated' as const
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
    integrationComplexity: 'Simple' as const,
    status: 'Available' as const
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
    integrationComplexity: 'Simple' as const,
    status: 'Available' as const
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
    integrationComplexity: 'Moderate' as const,
    status: 'Available' as const
  }
];

export const mockDashboardStats = {
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

export const mockIntegratedProducts = [
  {
    id: 'acronis',
    name: 'Acronis Cyber Protect',
    logo: 'acronis',
    status: 'Active',
    totalLicenses: 200,
    usedLicenses: 187,
    licenseType: 'Advanced Backup',
    renewalDate: '2024-11-30'
  }
];