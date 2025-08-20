import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Separator } from './ui/separator';
import { 
  Search, 
  Filter, 
  Plus, 
  Star, 
  Users, 
  Shield, 
  Cloud, 
  Database, 
  Lock,
  TrendingUp,
  CheckCircle,
  Zap,
  Award,
  Globe,
  RefreshCw,
  ArrowRight,
  Sparkles,
  Target,
  Activity,
  HardDrive,
  FileText
} from 'lucide-react';

interface IntegrationProduct {
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

interface ProductsPageProps {
  onStartIntegration: (product: IntegrationProduct) => void;
}

export function ProductsPage({ onStartIntegration }: ProductsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const products: IntegrationProduct[] = [
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

  const categories = ['all', 'Security', 'Productivity'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.category.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Security': return Shield;
      case 'Productivity': return FileText;
      default: return Cloud;
    }
  };

  const getComplexityColor = (complexity: string) => {
    switch (complexity) {
      case 'Simple': return 'bg-green-100 text-green-800';
      case 'Moderate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

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

  const availableProducts = products.filter(p => p.status === 'Available');
  const integratedProducts = products.filter(p => p.status === 'Integrated');
  const popularProducts = products.filter(p => p.isPopular && p.status === 'Available');
  const recommendedProducts = products.filter(p => p.isRecommended && p.status === 'Available');

  return (
    <div className="flex-1 p-6 space-y-8 bg-gradient-to-br from-slate-50 via-white to-purple-50 min-h-screen">
      {/* Enhanced Header */}
      <div className="space-y-6">
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

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-0 shadow-sm bg-gradient-to-br from-blue-50 to-blue-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Available Products</p>
                  <p className="text-2xl font-bold text-blue-900">{availableProducts.length}</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 bg-blue-500 rounded-xl">
                  <Database className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-gradient-to-br from-green-50 to-green-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Integrated</p>
                  <p className="text-2xl font-bold text-green-900">{integratedProducts.length}</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 bg-green-500 rounded-xl">
                  <CheckCircle className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-gradient-to-br from-purple-50 to-purple-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Categories</p>
                  <p className="text-2xl font-bold text-purple-900">{categories.length - 1}</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 bg-purple-500 rounded-xl">
                  <Filter className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-0 shadow-sm bg-gradient-to-br from-orange-50 to-orange-100">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Recommended</p>
                  <p className="text-2xl font-bold text-orange-900">{recommendedProducts.length}</p>
                </div>
                <div className="flex items-center justify-center w-10 h-10 bg-orange-500 rounded-xl">
                  <Award className="w-5 h-5 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Search and Filter Controls */}
      <Card className="border-0 shadow-lg">
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search products, descriptions, or categories..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white shadow-sm"
                />
              </div>
              
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-full sm:w-64 bg-white shadow-sm">
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.slice(1).map((category) => (
                    <SelectItem key={category} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm" className="shadow-sm">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

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
                          <HardDrive className="w-6 h-6 text-white" />
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
                          <Icon className="w-6 h-6 text-white" />
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
                          <Badge variant="outline" className={getComplexityColor(product.integrationComplexity || 'Simple')}>
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
                        <Icon className="w-6 h-6 text-white" />
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
                        <Badge variant="outline" className={getComplexityColor(product.integrationComplexity || 'Simple')}>
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