// Products module types
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

export interface ProductFilters {
  search: string;
  category: string;
}

export interface ProductStats {
  totalProducts: number;
  integratedProducts: number;
  availableProducts: number;
  categories: number;
  recommendedProducts: number;
}