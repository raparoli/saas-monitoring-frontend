import { IntegrationProduct, ProductDetail } from '../types';

class ProductsService {
  async getAvailableProducts(params: {
    search?: string;
    category?: string;
  } = {}): Promise<{ data: IntegrationProduct[]; success: boolean; message?: string }> {
    await new Promise(resolve => setTimeout(resolve, 600));
    
    const mockProducts: IntegrationProduct[] = [
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
    
    let filteredProducts = [...mockProducts];
    
    if (params?.search && typeof params.search === 'string' && params.search.trim()) {
      filteredProducts = filteredProducts.filter(product => 
        product && typeof product === 'object' &&
        ((product.name || '').toLowerCase().includes(params.search!.toLowerCase()) ||
         (product.description || '').toLowerCase().includes(params.search!.toLowerCase()) ||
         (product.category || '').toLowerCase().includes(params.search!.toLowerCase()))
      );
    }
    
    if (params?.category && typeof params.category === 'string' && params.category !== 'all') {
      filteredProducts = filteredProducts.filter(product => 
        product && typeof product === 'object' && product.category === params.category
      );
    }
    
    return {
      success: true,
      data: filteredProducts,
      total: filteredProducts.length
    };
  }

  async getIntegratedProducts(): Promise<{ data: ProductDetail[]; success: boolean; message?: string }> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    const mockIntegratedProducts: ProductDetail[] = [
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
    
    return {
      success: true,
      data: mockIntegratedProducts,
      total: mockIntegratedProducts.length
    };
  }

  async integrateProduct(productId: string, config: any): Promise<{ data: null; success: boolean; message?: string }> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      success: true,
      data: null,
      message: 'Product integrated successfully'
    };
  }
}

export const productsService = new ProductsService();