import React, { useState } from 'react';
import { AVAILABLE_PRODUCTS, PRODUCT_CATEGORIES } from '../src/constants/products';
import { IntegrationProduct } from '../src/types';
import { getCategoryIcon } from '../src/utils/icons';
import { getComplexityBadgeColor } from '../src/utils/badge-variants';
import { PageHeader } from '../src/components/common/PageHeader';
import { StatCard } from '../src/components/common/StatCard';
import { SearchAndFilter } from '../src/components/common/SearchAndFilter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  Plus, 
  Star, 
  Database, 
  CheckCircle,
  Award,
  ArrowRight,
  Filter
} from 'lucide-react';

interface ProductsPageProps {
  onStartIntegration: (product: IntegrationProduct) => void;
}

export function ProductsPage({ onStartIntegration }: ProductsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredProducts = AVAILABLE_PRODUCTS.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getStatusBadge = (status: string) => {
    switch (status) {
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

  const availableProducts = AVAILABLE_PRODUCTS.filter(p => p.status === 'Available');
  const integratedProducts = AVAILABLE_PRODUCTS.filter(p => p.status === 'Integrated');
  const popularProducts = AVAILABLE_PRODUCTS.filter(p => p.isPopular && p.status === 'Available');
  const recommendedProducts = AVAILABLE_PRODUCTS.filter(p => p.isRecommended && p.status === 'Available');

  return (
    <div className="flex-1 p-6 space-y-8 bg-gradient-to-br from-slate-50 via-white to-purple-50 min-h-screen">
      {/* Enhanced Header */}
      <PageHeader
        icon={Plus}
        title="Product Marketplace"
        description="Discover and integrate powerful SaaS products to enhance your organization's capabilities"
        iconGradient="from-purple-500 to-pink-600"
      />

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <StatCard
          title="Available Products"
          value={availableProducts.length}
          icon={Database}
          gradient="from-blue-50 to-blue-100"
        />
        <StatCard
          title="Integrated"
          value={integratedProducts.length}
          icon={CheckCircle}
          gradient="from-green-50 to-green-100"
        />
        <StatCard
          title="Categories"
          value={PRODUCT_CATEGORIES.length - 1}
          icon={Filter}
          gradient="from-purple-50 to-purple-100"
        />
        <StatCard
          title="Recommended"
          value={recommendedProducts.length}
          icon={Award}
          gradient="from-orange-50 to-orange-100"
        />
      </div>

      {/* Search and Filter Controls */}
      <SearchAndFilter
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search products, descriptions, or categories..."
        filters={[
          {
            value: selectedCategory,
            onChange: setSelectedCategory,
            placeholder: "All Categories",
            options: PRODUCT_CATEGORIES.map(cat => ({
              value: cat,
              label: cat === 'all' ? 'All Categories' : cat
            }))
          }
        ]}
      />

      {/* Featured Sections */}
      {searchTerm === '' && selectedCategory === 'all' && (
        <div className="space-y-8">
          {/* Integrated Products */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <CheckCircle className="w-5 h-5 text-green-500" />
              <h2 className="text-xl font-semibold">Integrated Products</h2>
              <Badge className="bg-green-100 text-green-800">Active</Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {integratedProducts.map((product) => {
                const Icon = getCategoryIcon(product.category);
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
                          <getCategoryIcon(product.category) className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{product.provider}</p>
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{product.rating}</span>
                            </div>
                            <Separator orientation="vertical" className="h-4" />
                            <span className="text-sm text-muted-foreground">{product.users} users</span>
                          </div>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                      
                      <div className="space-y-3 mb-4">
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className="bg-blue-100 text-blue-800">
                            Active Integration
                          </Badge>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          {product.features?.slice(0, 3).map((feature, index) => (
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

          {/* Available Products */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <h2 className="text-xl font-semibold">Available Products</h2>
              <Badge className="bg-yellow-100 text-yellow-800">Ready to Integrate</Badge>
            </div>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {availableProducts.map((product) => {
                const Icon = getCategoryIcon(product.category);
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
                          <getCategoryIcon(product.category) className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                          <p className="text-sm text-muted-foreground mb-2">{product.provider}</p>
                          <Badge variant="outline" className="text-xs">
                            {product.category}
                          </Badge>
                        </div>
                      </div>
                      
                      <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                      
                      <div className="space-y-3 mb-4">
                        {product.rating && (
                          <div className="flex items-center space-x-2">
                            <div className="flex items-center space-x-1">
                              <Star className="w-4 h-4 text-yellow-500 fill-current" />
                              <span className="text-sm font-medium">{product.rating}</span>
                            </div>
                            <Separator orientation="vertical" className="h-4" />
                            <span className="text-sm text-muted-foreground">{product.users} users</span>
                          </div>
                        )}
                        
                        <div className="flex items-center justify-between">
                          <Badge variant="outline" className={getComplexityBadgeColor(product.integrationComplexity || 'Simple')}>
                            {product.integrationComplexity || 'Simple'} Setup
                          </Badge>
                          {getStatusBadge(product.status || 'Available')}
                        </div>
                        

                      </div>
                      
                      <Button 
                        className="w-full shadow-sm hover:shadow-md group-hover:bg-primary/90" 
                        onClick={() => onStartIntegration(product)}
                        disabled={product.status !== 'Available'}
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

      {/* All Products Grid */}
      {(searchTerm !== '' || selectedCategory !== 'all') && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Search Results</h2>
            <Badge variant="outline">
              {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
            </Badge>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredProducts.map((product) => {
              const Icon = getCategoryIcon(product.category);
              return (
                <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 group relative overflow-hidden">
                  {product.status === 'Integrated' && (
                    <div className="absolute top-4 right-4 z-10">
                      <Badge className="bg-blue-100 text-blue-800 shadow-sm">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Integrated
                      </Badge>
                    </div>
                  )}
                  {product.isPopular && product.status !== 'Integrated' && (
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
                        <getCategoryIcon(product.category) className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-semibold text-lg mb-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground mb-2">{product.provider}</p>
                        <Badge variant="outline" className="text-xs">
                          {product.category}
                        </Badge>
                      </div>
                    </div>
                    
                    <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
                    
                    <div className="space-y-3 mb-4">
                      {product.rating && (
                        <div className="flex items-center space-x-2">
                          <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4 text-yellow-500 fill-current" />
                            <span className="text-sm font-medium">{product.rating}</span>
                          </div>
                          <Separator orientation="vertical" className="h-4" />
                          <span className="text-sm text-muted-foreground">{product.users} users</span>
                        </div>
                      )}
                      
                      <div className="flex items-center justify-between">
                        <Badge variant="outline" className={getComplexityBadgeColor(product.integrationComplexity || 'Simple')}>
                          {product.integrationComplexity || 'Simple'} Setup
                        </Badge>
                        {getStatusBadge(product.status || 'Available')}
                      </div>
                      

                    </div>
                    
                    <Button 
                      className="w-full shadow-sm hover:shadow-md group-hover:bg-primary/90" 
                      onClick={() => onStartIntegration(product)}
                      disabled={product.status !== 'Available'}
                    >
                      {product.status === 'Integrated' ? (
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