import React, { useState } from 'react';
import { useApi } from '../../../shared/hooks/useApi';
import { productsService } from '../services/productsService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Badge } from '../../../shared/components/ui/badge';
import { Input } from '../../../shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/ui/select';
import { Separator } from '../../../shared/components/ui/separator';
import { 
  Plus, 
  Star, 
  Database, 
  CheckCircle,
  Award,
  ArrowRight,
  Filter,
  Search,
  Shield,
  FileText,
  Cloud,
  RefreshCw
} from 'lucide-react';
import { IntegrationProduct } from '../types';
import { getCategoryIcon } from '../../../shared/utils/iconHelpers';
import { getComplexityColor } from '../../../shared/utils/styleHelpers';

const PRODUCT_CATEGORIES = ['all', 'Security', 'Productivity'] as const;

interface ProductsPageProps {
  onStartIntegration: (product: IntegrationProduct) => void;
}

export function ProductsPage({ onStartIntegration }: ProductsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const { data: products = [], loading, error, refetch } = useApi(
    productsService.getAvailableProducts,
    { immediate: true }
  );

  const safeProducts = (products && Array.isArray(products)) ? products : [];

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

  const filteredProducts = (safeProducts || []).filter(product => {
    if (!product || typeof product !== 'object' || product === null) return false;
    const matchesSearch = (product.name || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
                         (product.description || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
                         (product.category || '').toLowerCase().includes((searchTerm || '').toLowerCase());
    const matchesCategory = selectedCategory === 'all' || (product.category || '') === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const availableProducts = (safeProducts || []).filter(p => p && typeof p === 'object' && p !== null && (p.status || '') === 'Available');
  const integratedProducts = (safeProducts || []).filter(p => p && typeof p === 'object' && p !== null && (p.status || '') === 'Integrated');
  const recommendedProducts = (safeProducts || []).filter(p => p && typeof p === 'object' && p !== null && p.isRecommended && (p.status || '') === 'Available');

  return (
    <div className="flex-1 p-6 space-y-8 bg-gradient-to-br from-slate-50 via-white to-purple-50 min-h-screen">
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl shadow-lg">
            <Plus className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Product Marketplace</h1>
            <p className="text-muted-foreground">
              Discover and integrate powerful SaaS products to enhance your organization's capabilities
            </p>
          </div>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-blue-100 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Available Products</p>
                <span className="text-2xl font-bold">{(availableProducts || []).length}</span>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <Database className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-50 to-green-100 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Integrated</p>
                <span className="text-2xl font-bold">{(integratedProducts || []).length}</span>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-50 to-green-100 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-50 to-purple-100 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <span className="text-2xl font-bold">{PRODUCT_CATEGORIES.length - 1}</span>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <Filter className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-50 to-orange-100 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Recommended</p>
                <span className="text-2xl font-bold">{(recommendedProducts || []).length}</span>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-50 to-orange-100 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <Award className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

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
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products, descriptions, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-48 bg-white shadow-sm">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  {PRODUCT_CATEGORIES.map(cat => (
                    <SelectItem key={cat} value={cat}>
                      {cat === 'all' ? 'All Categories' : cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline">
                {(filteredProducts || []).length} product{(filteredProducts || []).length !== 1 ? 's' : ''}
              </Badge>
              <Button variant="outline" onClick={refetch} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {loading && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
            <p>Loading products...</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-0 shadow-lg border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <p className="text-red-600">Error loading products: {error}</p>
            <Button variant="outline" onClick={refetch} className="mt-2">
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {!loading && !error && searchTerm === '' && selectedCategory === 'all' && (
        <div className="space-y-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-semibold">Integrated Products</h2>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(integratedProducts || []).map((product) => {
                if (!product || typeof product !== 'object' || product === null) return null;
                const IconComponent = getCategoryIcon(product.category || '');
                return (
                  <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-blue-100 text-blue-800 shadow-sm">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Integrated
                      </Badge>
                    </div>
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-50 to-green-50 opacity-50 group-hover:opacity-70 transition-opacity duration-300" />
                    
                    <CardContent className="p-6 relative">
                      <div className="flex items-start space-x-4 mb-4">
                        <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                          <IconComponent className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg mb-1">{product.name || 'Unknown Product'}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{product.provider || 'Unknown Provider'}</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{product.rating || 0}</span>
                            </div>
                            <Separator orientation="vertical" className="h-4" />
                            <span className="text-sm text-muted-foreground">{product.users || '0'} users</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description || 'No description available'}</p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            Active Integration
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {(product.features || []).slice(0, 3).map((feature, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {feature}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      <Button 
                        className="w-full shadow-sm bg-blue-500 hover:bg-blue-600"
                        disabled
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Already Integrated
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-semibold">Available Products</h2>
              <Badge className="bg-yellow-100 text-yellow-800">Ready to Integrate</Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {(availableProducts || []).map((product) => {
                if (!product || typeof product !== 'object' || product === null) return null;
                const IconComponent = getCategoryIcon(product.category || '');
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
        </div>
      )}

      {!loading && !error && (searchTerm !== '' || selectedCategory !== 'all') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Search Results</h2>
            <Badge variant="outline">
              {(filteredProducts || []).length} product{(filteredProducts || []).length !== 1 ? 's' : ''}
            </Badge>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {(filteredProducts || []).map((product) => {
              if (!product || typeof product !== 'object' || product === null) return null;
              const IconComponent = getCategoryIcon(product.category || '');
              return (
                <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                  {(product.status || '') === 'Integrated' && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-blue-100 text-blue-800 shadow-sm">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Integrated
                      </Badge>
                    </div>
                  )}
                  {product.isPopular && (product.status || '') !== 'Integrated' && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-yellow-100 text-yellow-800 shadow-sm">
                        <Star className="w-3 h-3 mr-1" />
                        Popular
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
                      disabled={(product.status || '') !== 'Available'}
                      onClick={() => onStartIntegration(product)}
                    >
                      {(product.status || '') === 'Integrated' ? (
                        <>
                          <CheckCircle className="w-4 h-4 mr-2" />
                          Already Integrated
                        </>
                      ) : (
                        <>
                          Start Integration
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </>
                      )}
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}