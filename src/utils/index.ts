// Utility functions for the application

export const formatStorageGB = (gb: number): string => {
  if (gb >= 1000) {
    return `${(gb / 1000).toFixed(1)} TB`;
  }
  return `${gb.toLocaleString()} GB`;
};

export const formatDate = (dateString: string): string => {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

export const formatDateTime = (dateString: string): string => {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
};

export const getInitials = (name: string): string => {
  return name.split(' ').map(n => n[0]).join('').toUpperCase();
};

export const getDaysUntilRenewal = (renewalDate: string): number => {
  const renewal = new Date(renewalDate);
  const today = new Date();
  const diffTime = renewal.getTime() - today.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

export const getUsagePercentage = (used: number, total: number): number => {
  return Math.round((used / total) * 100);
};

// Badge variant helpers
export const getSeverityBadgeVariant = (severity: string) => {
  switch (severity.toLowerCase()) {
    case 'critical':
    case 'error':
      return 'destructive';
    case 'warning':
      return 'secondary';
    case 'info':
      return 'default';
    default:
      return 'secondary';
  }
};

export const getStatusBadgeVariant = (status: string) => {
  switch (status.toLowerCase()) {
    case 'active':
    case 'enabled':
    case 'connected':
    case 'sent':
      return 'default';
    case 'warning':
    case 'pending':
      return 'secondary';
    case 'inactive':
    case 'disabled':
    case 'failed':
    case 'suspended':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export const getUsageBadgeVariant = (percentage: number) => {
  if (percentage >= 90) return 'destructive';
  if (percentage >= 75) return 'secondary';
  return 'default';
};

// Color helpers
export const getRoleBadgeColor = (role: string): string => {
  switch (role) {
    case 'Admin': return 'bg-red-100 text-red-800';
    case 'Analyst': return 'bg-blue-100 text-blue-800';
    case 'Viewer': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getEmailStatusColor = (status: string): string => {
  switch (status) {
    case 'Sent': return 'bg-green-100 text-green-800';
    case 'Failed': return 'bg-red-100 text-red-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getProductBadgeColor = (product: string): string => {
  switch (product) {
    case 'Acronis': return 'bg-blue-100 text-blue-800';
    case 'Microsoft': return 'bg-green-100 text-green-800';
    case 'Bitdefender': return 'bg-orange-100 text-orange-800';
    case 'Zoho': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getComplexityColor = (complexity: string): string => {
  switch (complexity) {
    case 'Simple': return 'bg-green-100 text-green-800';
    case 'Moderate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getProductGradient = (productId: string): string => {
  switch (productId) {
    case 'acronis':
      return 'bg-gradient-to-br from-orange-50 to-red-100 border-orange-200';
    case 'microsoft':
      return 'bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200';
    case 'bitdefender':
      return 'bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200';
    case 'zoho':
      return 'bg-gradient-to-br from-green-50 to-green-100 border-green-200';
    default:
      return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
  }
};