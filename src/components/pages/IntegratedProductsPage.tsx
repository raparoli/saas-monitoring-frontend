import React, { useState } from 'react';
import { useApi } from '../../shared/hooks/useApi';
import { apiService } from '../../shared/services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../shared/components/ui/card';
import { Button } from '../../shared/components/ui/button';
import { Badge } from '../../shared/components/ui/badge';
import { Input } from '../../shared/components/ui/input';
import { Progress } from '../../shared/components/ui/progress';
import { Separator } from '../../shared/components/ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../../shared/components/ui/tooltip';
import { 
  Eye, 
  Calendar, 
  Cloud, 
  CheckCircle,
  Star,
  Clock,
  Zap,
  Award,
  ArrowRight,
  Search,
  Filter,
  BarChart3,
  Users,
  Shield,
  FileText,
  HardDrive,
  AlertTriangle,
  RefreshCw
} from 'lucide-react';
import { ProductDetail, IntegrationProduct } from '../../shared/types';
import { PRODUCT_CATEGORIES } from '../../shared/constants';
import { 
  getProductIcon,
  getCategoryIcon
} from '../../shared/utils/iconHelpers';
import { 
  formatDate, 
  getDaysUntilRenewal, 
  getUsagePercentage,
  getStatusBadgeVariant,
  getUsageBadgeVariant,
  getComplexityColor,
  getProductGradient
} from '../../shared/utils';

interface IntegratedProductsPageProps {
  onViewDetails: (page: 'product-detail', product: ProductDetail) => void;
  onAcronisDetail: () => void;
  onStartIntegration: (product: IntegrationProduct) => void;
}

export function IntegratedProductsPage({ onViewDetails, onAcronisDetail, onStartIntegration }: IntegratedProductsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  // API integration for integrated products
  const { data: integratedProducts = [], loading: integratedLoading, error: integratedError, refetch: refetchIntegrated } = useApi(
    apiService.getIntegratedProducts,
    { immediate: true }
  );

  // API integration for available products
  const { data: availableProductsData = [], loading: availableLoading, error: availableError, refetch: refetchAvailable } = useApi(
    apiService.getAvailableProducts,
    { immediate: true }
  );

  // Ensure we have safe arrays
  const safeIntegratedProducts = Array.isArray(integratedProducts) ? integratedProducts : [];
  const safeAvailableProductsData = Array.isArray(availableProductsData) ? availableProductsData : [];

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

  const actualIntegratedProducts = safeIntegratedProducts.length > 0 ? safeIntegratedProducts : mockIntegratedProducts;

  const handleViewDetails = (product: ProductDetail) => {
    if (product && (product.id || '') === 'acronis') {
      onAcronisDetail();
    } else {
      onViewDetails('product-detail', product);
    }
  };

  const filteredProducts = (actualIntegratedProducts || []).filter(product => {
    if (!product || typeof product !== 'object' || product === null) return false;
    return (product.name || '').toLowerCase().includes((searchTerm || '').toLowerCase());
  });

  const availableProducts = safeAvailableProductsData.filter(p => p && typeof p === 'object' && p !== null && (p.status || '') === 'Available');

  const getStatusBadge = (status: string) => {
    switch (status || '') {
      case 'Available':
        return <Badge className="bg-green-100 text-green-800 hover:bg-green-200">Available</Badge>;
      case 'Integrated':
        return <Badge className="bg-blue-100 text-blue-800 hover:bg-blue-200">✓ Integrated</Badge>;
      case 'Coming Soon':
        return <Badge className="bg-orange-100 text-orange-800 hover:bg-orange-200">Coming Soon</Badge>;
      case 'Beta':
        return <Badge className="bg-purple-100 text-purple-800 hover:bg-purple-200">Beta</Badge>;
      default:
        return <Badge variant="secondary">{status}</Badge>;
    }
  };

  return (
    <TooltipProvider>
      <div className="flex-1 p-6 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
              <Cloud className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Products</h1>
              <p className="text-muted-foreground">
                Manage and monitor your connected SaaS products with comprehensive insights
              </p>
            </div>
          </div>
        </div>

        {/* Search */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Filter className="w-5 h-5" />
              <span>Filter Controls</span>
            </CardTitle>
            <CardDescription>
              Filter and search through data
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-white shadow-sm"
              />
            </div>
          </CardContent>
        </Card>
        
        {/* Loading and Error States */}
        {(integratedLoading || availableLoading) && (
          <Card className="border-0 shadow-lg">
            <CardContent className="p-6 text-center">
              <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
              <p>Loading products...</p>
            </CardContent>
          </Card>
        )}

        {(integratedError || availableError) && (
          <Card className="border-0 shadow-lg border-red-200 bg-red-50">
            <CardContent className="p-6 text-center">
              <p className="text-red-600">
                Error loading products: {integratedError || availableError}
              </p>
              <div className="flex justify-center space-x-2 mt-2">
                <Button variant="outline" onClick={refetchIntegrated}>
                  Retry Integrated
                </Button>
                <Button variant="outline" onClick={refetchAvailable}>
                  Retry Available
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Enhanced Product Cards Grid */}
        {!integratedLoading && !integratedError && (
          <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold">Integrated Products</h2>
              <p className="text-sm text-muted-foreground">
                Detailed view of all integrated products and their performance metrics
              </p>
            </div>
            <Button variant="outline" size="sm">
              <BarChart3 className="w-4 h-4 mr-2" />
              Analytics View
            </Button>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {filteredProducts.map((product) => {
              if (!product || typeof product !== 'object') return null;
              const usagePercentage = getUsagePercentage(product.usedLicenses, product.totalLicenses);
              const daysUntilRenewal = getDaysUntilRenewal(product.renewalDate);
              const IconComponent = getProductIcon(product.name);
              const isHighUsage = usagePercentage >= 85;
              const isNearRenewal = daysUntilRenewal <= 30;

              return (
                <Card 
                  key={product.id} 
                  className={`relative overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer group ${getProductGradient(product.id)}`}
                  onClick={() => handleViewDetails(product)}
                >
                  <CardContent className="p-6">
                    {/* Product Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center space-x-4">
                        <div className="flex items-center justify-center w-14 h-14 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg transition-transform group-hover:scale-110">
                          <IconComponent className="w-7 h-7 text-white" />
                        </div>
                        <div>
                          <h3 className="text-lg font-semibold">{product.name || 'Unknown Product'}</h3>
                          <p className="text-sm text-muted-foreground">{product.licenseType || 'Unknown License'}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusBadgeVariant(product.status || '')} className="shadow-sm">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {product.status || 'Unknown'}
                        </Badge>
                        {isHighUsage && (
                          <Tooltip>
                            <TooltipTrigger>
                              <AlertTriangle className="w-4 h-4 text-orange-500" />
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>High license usage detected</p>
                            </TooltipContent>
                          </Tooltip>
                        )}
                      </div>
                    </div>

                    {/* License Usage Section */}
                    <div className="space-y-4 mb-6">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium">License Usage</span>
                        <Badge variant={getUsageBadgeVariant(usagePercentage)} className="text-xs">
                          {usagePercentage}%
                        </Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Used</span>
                          <span className="font-medium">{(product.usedLicenses || 0).toLocaleString()} / {(product.totalLicenses || 0).toLocaleString()}</span>
                        </div>
                        <Progress 
                          value={usagePercentage} 
                          className="h-3 bg-white/50"
                        />
                      </div>
                    </div>

                    <Separator className="my-4" />

                    {/* Renewal Information */}
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-muted-foreground" />
                          <span className="text-sm font-medium">Renewal Date</span>
                        </div>
                        {isNearRenewal && (
                          <Badge variant="destructive" className="text-xs">
                            <Clock className="w-3 h-3 mr-1" />
                            Due Soon
                          </Badge>
                        )}
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <div>
                          <p className="text-sm font-medium">{formatDate(product.renewalDate)}</p>
                          <p className="text-xs text-muted-foreground">
                            {daysUntilRenewal > 0 ? `${daysUntilRenewal} days remaining` : 'Overdue'}
                          </p>
                        </div>
                        <Button 
                          size="sm" 
                          className="shadow-sm hover:shadow-md transition-all group-hover:bg-primary/90"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleViewDetails(product);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                      </div>
                    </div>

                    {/* Performance Indicators */}
                    <div className="mt-4 pt-4 border-t border-white/20">
                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center space-x-1">
                          <Zap className="w-3 h-3 text-green-500" />
                          <span className="text-muted-foreground">Performance: Optimal</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Star className="w-3 h-3 text-yellow-500" />
                          <span className="text-muted-foreground">Health Score: 95%</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        )}

        {/* Available Products */}
        {!availableLoading && !availableError && (
          <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Star className="w-5 h-5 text-yellow-500" />
            <h2 className="text-xl font-semibold">Available Products</h2>
            <Badge className="bg-yellow-100 text-yellow-800">Ready to Integrate</Badge>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {availableProducts.map((product) => {
              if (!product || typeof product !== 'object') return null;
              const IconComponent = getCategoryIcon(product.category);
              return (
                <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                  {product.isPopular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-yellow-100 text-yellow-800 shadow-sm">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
                      </Badge>
                    </div>
                  )}
                  {product.isRecommended && !product.isPopular && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-purple-100 text-purple-800 shadow-sm">
                        <Award className="w-3 h-3 mr-1" />
                        Recommended
                      </Badge>
                    </div>
                  )}
                  
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4 mb-4">
                      <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-gray-500 to-gray-600 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">{product.name || 'Unknown Product'}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{product.provider || 'Unknown Provider'}</p>
                        <Badge variant="outline" className="text-xs">
                          {product.category || 'Uncategorized'}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description || 'No description available'}</p>
                    
                    <div className="space-y-3 mb-4">
                      {product.rating && (
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                          <Separator orientation="vertical" className="h-4" />
                          <span className="text-sm text-muted-foreground">{product.users || '0'} users</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={getComplexityColor(product.integrationComplexity || 'Simple')}>
                          {product.integrationComplexity || 'Simple'} Setup
                        </Badge>
                        {getStatusBadge(product.status || 'Available')}
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full shadow-sm hover:shadow-md group-hover:bg-primary/90"
                      onClick={() => onStartIntegration(product)}
                      disabled={(product.status || '') !== 'Available'}
                    >
                      Start Integration
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
        )}

        {/* Enhanced Quick Actions Section */}
        <Card className="bg-gradient-to-r from-slate-50 to-blue-50 border-slate-200">
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
              <div className="space-y-2">
                <h3 className="text-lg font-semibold">Quick Actions</h3>
                <p className="text-sm text-muted-foreground">
                  Manage your products and licenses efficiently
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Button variant="outline" className="shadow-sm">
                  <Users className="w-4 h-4 mr-2" />
                  Manage Users
                </Button>
                <Button variant="outline" className="shadow-sm">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  View Reports
                </Button>
                <Button className="shadow-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                  <Shield className="w-4 h-4 mr-2" />
                  License Management
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div> 
    </TooltipProvider>  
  );
}