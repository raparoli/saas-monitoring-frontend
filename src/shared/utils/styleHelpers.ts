export const getSeverityBadgeVariant = (severity: string) => {
  switch (typeof severity === 'string' ? severity.toLowerCase().trim() : '') {
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
  switch (typeof status === 'string' ? status.toLowerCase().trim() : '') {
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
  const safePercentage = typeof percentage === 'number' && !isNaN(percentage) ? percentage : 0;
  const clampedPercentage = Math.max(0, Math.min(100, safePercentage));
  if (clampedPercentage >= 90) return 'destructive';
  if (clampedPercentage >= 75) return 'secondary';
  return 'default';
};

export const getRoleBadgeColor = (role: string): string => {
  switch (typeof role === 'string' ? role.trim() : '') {
    case 'Admin': return 'bg-red-100 text-red-800';
    case 'Analyst': return 'bg-blue-100 text-blue-800';
    case 'Viewer': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getEmailStatusColor = (status: string): string => {
  switch (typeof status === 'string' ? status.trim() : '') {
    case 'Sent': return 'bg-green-100 text-green-800';
    case 'Failed': return 'bg-red-100 text-red-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getProductBadgeColor = (product: string): string => {
  switch (typeof product === 'string' ? product.trim() : '') {
    case 'Acronis': return 'bg-blue-100 text-blue-800';
    case 'Microsoft': return 'bg-green-100 text-green-800';
    case 'Bitdefender': return 'bg-orange-100 text-orange-800';
    case 'Zoho': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getComplexityColor = (complexity: string): string => {
  switch (typeof complexity === 'string' ? complexity.trim() : '') {
    case 'Simple': return 'bg-green-100 text-green-800';
    case 'Moderate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getProductGradient = (productId: string): string => {
  switch (typeof productId === 'string' ? productId.trim() : '') {
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