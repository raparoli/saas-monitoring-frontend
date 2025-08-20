/**
 * Utility functions for determining badge variants and colors
 */

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

export const getRoleBadgeColor = (role: string) => {
  switch (role) {
    case 'Admin': return 'bg-red-100 text-red-800';
    case 'Analyst': return 'bg-blue-100 text-blue-800';
    case 'Viewer': return 'bg-green-100 text-green-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getProductBadgeColor = (product: string) => {
  switch (product) {
    case 'Acronis': return 'bg-blue-100 text-blue-800';
    case 'Microsoft': return 'bg-green-100 text-green-800';
    case 'Bitdefender': return 'bg-orange-100 text-orange-800';
    case 'Zoho': return 'bg-purple-100 text-purple-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getComplexityBadgeColor = (complexity: string) => {
  switch (complexity) {
    case 'Simple': return 'bg-green-100 text-green-800';
    case 'Moderate': return 'bg-yellow-100 text-yellow-800';
    case 'Advanced': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

export const getEmailStatusColor = (status: string) => {
  switch (status) {
    case 'Sent': return 'bg-green-100 text-green-800';
    case 'Failed': return 'bg-red-100 text-red-800';
    case 'Pending': return 'bg-yellow-100 text-yellow-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};