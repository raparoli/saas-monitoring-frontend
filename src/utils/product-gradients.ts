/**
 * Utility functions for product-specific styling
 */

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

export const getProductIconGradient = (productId: string): string => {
  switch (productId) {
    case 'acronis':
      return 'bg-gradient-to-br from-orange-500 to-red-500';
    case 'microsoft':
      return 'bg-gradient-to-br from-blue-500 to-blue-600';
    case 'bitdefender':
      return 'bg-gradient-to-br from-purple-500 to-purple-600';
    case 'zoho':
      return 'bg-gradient-to-br from-green-500 to-green-600';
    default:
      return 'bg-gradient-to-br from-gray-500 to-gray-600';
  }
};

export const getUtilizationColor = (rate: number): string => {
  if (rate >= 90) return 'text-red-600';
  if (rate >= 80) return 'text-orange-600';
  if (rate >= 70) return 'text-yellow-600';
  return 'text-green-600';
};

export const getUtilizationBarColor = (rate: number): string => {
  if (rate >= 95) return 'bg-red-500';
  if (rate >= 80) return 'bg-orange-500';
  if (rate >= 60) return 'bg-yellow-500';
  return 'bg-green-500';
};