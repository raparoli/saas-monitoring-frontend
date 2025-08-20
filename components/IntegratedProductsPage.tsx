import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Input } from './ui/input';
import { Progress } from './ui/progress';
import { Separator } from './ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { 
  Search, 
  Eye, 
  Calendar, 
  Users, 
  Shield, 
  Cloud, 
  HardDrive, 
  TrendingUp,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
  Star,
  Clock,
  Zap,
  Filter,
  RefreshCw,
  FileText,
  Award,
  ArrowRight
} from 'lucide-react';

interface ProductDetail {
  id: string;
  name: string;
  logo: string;
  status: string;
  totalLicenses: number;
  usedLicenses: number;
  licenseType: string;
  renewalDate: string;
}

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

interface IntegratedProductsPageProps {
  onViewDetails: (page: 'product-detail', product: ProductDetail) => void;
  onAcronisDetail: () => void;
  onStartIntegration: (product: IntegrationProduct) => void;

}

export function IntegratedProductsPage({ onViewDetails, onAcronisDetail, onStartIntegration }: IntegratedProductsPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  
  const integratedProducts: ProductDetail[] = [
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
  
    // const filteredProducts = products.filter(product => {
    //   const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //                        product.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    //                        product.category.toLowerCase().includes(searchTerm.toLowerCase());
    //   const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    //   return matchesSearch && matchesCategory;
    // });
  
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

  const getStatusBadgeVariant = (status: string) => {
    switch (status.toLowerCase()) {
      case 'active':
        return 'default';
      case 'warning':
        return 'destructive';
      case 'inactive':
        return 'secondary';
      default:
        return 'secondary';
    }
  };

  const getUsagePercentage = (used: number, total: number) => {
    return Math.round((used / total) * 100);
  };

  const getUsageBadgeVariant = (percentage: number) => {
    if (percentage >= 90) return 'destructive';
    if (percentage >= 75) return 'secondary';
    return 'default';
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  const getDaysUntilRenewal = (dateString: string) => {
    const renewalDate = new Date(dateString);
    const today = new Date();
    const diffTime = renewalDate.getTime() - today.getTime();
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    return diffDays;
  };

  const getProductIcon = (productName: string) => {
    if (productName.includes('Acronis')) return HardDrive;
    return Shield;
  };

  const getProductGradient = (productId: string) => {
    switch (productId) {
      case 'acronis':
        return 'bg-gradient-to-br from-orange-50 to-red-100 border-orange-200';
      default:
        return 'bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200';
    }
  };

  const handleViewDetails = (product: ProductDetail) => {
    if (product.id === 'acronis') {
      onAcronisDetail();
    } else {
      onViewDetails('product-detail', product);
    }
  };

  const filteredProducts = integratedProducts.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate summary statistics
  const totalProducts = integratedProducts.length;
  const totalLicenses = integratedProducts.reduce((sum, product) => sum + product.totalLicenses, 0);
  const usedLicenses = integratedProducts.reduce((sum, product) => sum + product.usedLicenses, 0);
  const overallUsagePercentage = Math.round((usedLicenses / totalLicenses) * 100);
  const nextRenewalDays = Math.min(...integratedProducts.map(p => getDaysUntilRenewal(p.renewalDate)));
  const activeProducts = integratedProducts.filter(p => p.status === 'Active').length;
    const availableProducts = products.filter(p => p.status === 'Available');
//  const integratedProducts = products.filter(p => p.status === 'Integrated');
  const popularProducts = products.filter(p => p.isPopular && p.status === 'Available');
  const recommendedProducts = products.filter(p => p.isRecommended && p.status === 'Available');


  return (
    <TooltipProvider>
      <div className="flex-1 p-6 space-y-8">
        {/* Enhanced Header Section */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
          <div className="space-y-2">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
                <Cloud className="w-5 h-5 text-white" />
              </div>
              <div>
                {/* <h1 className="text-3xl font-semibold tracking-tight">Integrated Products</h1> */}
              <h1 className="text-3xl font-semibold tracking-tight">Products</h1>

                <p className="text-muted-foreground">
                  Manage and monitor your connected SaaS products with comprehensive insights
                </p>
              </div>
            </div>
          </div>
          
          <div className="flex items-center space-x-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64 bg-white shadow-sm"
              />
            </div>
            <Button variant="outline" size="sm" className="shadow-sm">
              <Filter className="w-4 h-4 mr-2" />
              Filters
            </Button>
            <Button variant="outline" size="sm" className="shadow-sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Enhanced Summary Cards with better visual hierarchy */}
        {/* <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <Card className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-blue-700">Total Products</p>
                  <p className="text-3xl font-bold text-blue-900">{totalProducts}</p>
                  <div className="flex items-center space-x-1 text-xs text-blue-600">
                    <CheckCircle className="w-3 h-3" />
                    <span>{activeProducts} active</span>
                  </div>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-blue-500 rounded-xl shadow-lg">
                  <Cloud className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden bg-gradient-to-br from-green-50 to-green-100 border-green-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-green-700">Total Licenses</p>
                  <p className="text-3xl font-bold text-green-900">{totalLicenses.toLocaleString()}</p>
                  <div className="flex items-center space-x-1 text-xs text-green-600">
                    <TrendingUp className="w-3 h-3" />
                    <span>Across all products</span>
                  </div>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-green-500 rounded-xl shadow-lg">
                  <Shield className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-purple-700">License Utilization</p>
                  <div className="flex items-baseline space-x-2">
                    <p className="text-3xl font-bold text-purple-900">{overallUsagePercentage}%</p>
                    <span className="text-sm text-purple-600">of {totalLicenses}</span>
                  </div>
                  <div className="w-full bg-purple-200 rounded-full h-2">
                    <div 
                      className="bg-purple-500 h-2 rounded-full transition-all duration-500"
                      style={{ width: `${overallUsagePercentage}%` }}
                    />
                  </div>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-purple-500 rounded-xl shadow-lg">
                  <Activity className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="relative overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200 hover:shadow-lg transition-all duration-300">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-orange-700">Next Renewal</p>
                  <p className="text-3xl font-bold text-orange-900">{nextRenewalDays}d</p>
                  <div className="flex items-center space-x-1 text-xs text-orange-600">
                    <Clock className="w-3 h-3" />
                    <span>Days remaining</span>
                  </div>
                </div>
                <div className="flex items-center justify-center w-12 h-12 bg-orange-500 rounded-xl shadow-lg">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div> */}

        {/* Enhanced Product Cards Grid */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div>
              {/* <h2 className="text-xl font-semibold">Product Overview</h2> */}
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
                          <h3 className="text-lg font-semibold">{product.name}</h3>
                          <p className="text-sm text-muted-foreground">{product.licenseType}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Badge variant={getStatusBadgeVariant(product.status)} className="shadow-sm">
                          <CheckCircle className="w-3 h-3 mr-1" />
                          {product.status}
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
                          <span className="font-medium">{product.usedLicenses.toLocaleString()} / {product.totalLicenses.toLocaleString()}</span>
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