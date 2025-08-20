import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  PieChart, 
  Pie, 
  Cell, 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend 
} from 'recharts';
import { 
  Activity,
  AlertTriangle,
  CheckCircle,
  Users,
  HardDrive,
  Target,
  TrendingUp,
  ArrowUpRight,
  ExternalLink,
  Lightbulb,
  Shield,
  FileText,
  Clock,
  Bell,
  Info,
  AlertCircle,
  Zap,
  Award,
  ChevronRight,
  RefreshCw
} from 'lucide-react';

interface DashboardProps {
  onAcronisDetail: () => void;
}

export function Dashboard({ onAcronisDetail }: DashboardProps) {
  // Global Summary Data
  const globalStats = [
    {
      title: 'Total SaaS Products Integrated',
      value: '1',
      change: '+1 this month',
      trend: 'up',
      icon: Target,
      color: 'from-blue-500 to-blue-600'
    },
    {
      title: 'Total Customers Across All Products',
      value: '140+',
      change: '+12 this week',
      trend: 'up',
      icon: Users,
      color: 'from-green-500 to-green-600'
    },
    {
      title: 'Protected Workloads (Combined)',
      value: '460',
      change: '+23 this month',
      trend: 'up',
      icon: Shield,
      color: 'from-purple-500 to-purple-600'
    },
    {
      title: 'Overall License Utilization Rate',
      value: '89.6%',
      change: '+2.4% this month',
      trend: 'up',
      icon: Activity,
      color: 'from-orange-500 to-orange-600'
    }
  ];

  // Storage Distribution Data
  const storageData = [
    { name: 'Local Storage', value: 45, color: '#3b82f6' },
    { name: 'Cloud Storage', value: 35, color: '#10b981' },
    { name: 'Hybrid Storage', value: 20, color: '#f59e0b' }
  ];

  // License Utilization by Product Data
  const licenseUtilizationData = [
    {
      product: 'Acronis',
      used: 187,
      available: 13,
      overused: 0,
      total: 200
    },
    {
      product: 'Microsoft',
      used: 0,
      available: 250,
      overused: 0,
      total: 250
    },
    {
      product: 'Bitdefender',
      used: 0,
      available: 150,
      overused: 0,
      total: 150
    }
  ];

  // Integrated Products Data
  const integratedProducts = [
    {
      name: 'Acronis Cyber Protect',
      status: 'Connected',
      totalUsers: 187,
      licenseUsage: 93.5,
      lastSync: '2 minutes ago',
      icon: HardDrive,
      statusColor: 'bg-green-100 text-green-800'
    }
  ];

  // Alert Summary Data
  const alertStats = [
    { title: 'Critical Alerts', value: '5731', color: 'from-red-500 to-red-600', icon: AlertCircle },
    { title: 'Warning Alerts', value: '13177', color: 'from-yellow-500 to-yellow-600', icon: AlertTriangle },
    { title: 'Errors', value: '649', color: 'from-orange-500 to-orange-600', icon: AlertTriangle },
    { title: 'Informational', value: '747', color: 'from-blue-500 to-blue-600', icon: Info }
  ];

  // Alerts by Product Data
  const alertsByProductData = [
    { product: 'Acronis', critical: 5731, warning: 13177, errors: 649, info: 747 },
    { product: 'Microsoft', critical: 0, warning: 0, errors: 0, info: 0 },
    { product: 'Bitdefender', critical: 0, warning: 0, errors: 0, info: 0 }
  ];

  // AI Insights Data
  const aiInsights = [
    {
      title: 'License Optimization Opportunity',
      text: 'License utilization is nearing 90% on Acronis Cyber Protect — consider increasing quota.',
      icon: TrendingUp,
      actionLabel: 'Review Licenses',
      priority: 'high'
    },
    {
      title: 'Backup Performance Issue',
      text: 'Acronis has high backup failure rate detected in 2 customers this week.',
      icon: AlertTriangle,
      actionLabel: 'Investigate',
      priority: 'critical'
    },
    {
      title: 'Integration Recommendations',
      text: '3 products are available for integration. Consider Microsoft 365 for productivity enhancement.',
      icon: Lightbulb,
      actionLabel: 'View Products',
      priority: 'medium'
    }
  ];

  const getTrendIcon = (trend: string) => {
    return trend === 'up' ? <ArrowUpRight className="w-4 h-4 text-green-500" /> : null;
  };

  const renderTooltip = (props: any) => {
    if (props.active && props.payload && props.payload.length) {
      const data = props.payload[0].payload;
      return (
        <div className="bg-white p-3 border rounded-lg shadow-lg">
          <p className="font-medium">{data.product}</p>
          <p className="text-sm text-gray-600">Used: {data.used}</p>
          <p className="text-sm text-gray-600">Available: {data.available}</p>
          <p className="text-sm text-gray-600">Total: {data.total}</p>
          <p className="text-sm font-medium">Utilization: {((data.used / data.total) * 100).toFixed(1)}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="flex-1 p-6 space-y-8 bg-gradient-to-br from-slate-50 via-white to-purple-50 min-h-screen">
      {/* Enhanced Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
            <Activity className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">SaaS Monitoring Dashboard</h1>
            <p className="text-muted-foreground">
              Comprehensive overview of your integrated SaaS products and infrastructure
            </p>
          </div>
        </div>
      </div>

      {/* Section 1: Global Summary Cards */}
      <div className="grid gap-6  md:grid-cols-2 lg:grid-cols-4">
        {globalStats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
              <div className={`absolute inset-0 bg-gradient-to-br ${stat.color} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3">
                <div className="space-y-1">
                  <CardTitle className="text-sm font-medium text-muted-foreground">
                    {stat.title}
                  </CardTitle>
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold">{stat.value}</span>
                    {getTrendIcon(stat.trend)}
                  </div>
                </div>
                <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${stat.color} rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="space-y-1">
                  <Badge className="bg-green-100 text-green-800 text-xs">
                    {stat.change}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Section 2: Storage & Usage Visualization */}
      <div className="grid gap-8 lg:grid-cols-2">
        {/* Storage Type Distribution */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <HardDrive className="w-5 h-5 text-blue-500" />
              <span>Storage Type Distribution</span>
            </CardTitle>
            <CardDescription>
              Breakdown of storage allocation across local, cloud, and hybrid infrastructure
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie
                    data={storageData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    dataKey="value"
                    startAngle={90}
                    endAngle={450}
                  >
                    {storageData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, 'Percentage']} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-3">
                {storageData.map((item, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="font-medium">{item.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-lg font-bold">{item.value}%</span>
                      <p className="text-xs text-muted-foreground">{(item.value * 10).toFixed(0)} TB</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* License Utilization by Product */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Target className="w-5 h-5 text-green-500" />
              <span>License Utilization by Product</span>
            </CardTitle>
            <CardDescription>
              Current license usage across all integrated and available products
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={licenseUtilizationData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip content={renderTooltip} />
                <Legend />
                <Bar dataKey="used" stackId="a" fill="#10b981" name="Used" />
                <Bar dataKey="available" stackId="a" fill="#e5e7eb" name="Available" />
                <Bar dataKey="overused" stackId="a" fill="#ef4444" name="Overused" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Section 3: Integrated Products Grid */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5 text-green-500" />
                <span>Integrated Products</span>
              </CardTitle>
              <CardDescription>
                Currently integrated SaaS applications and their status
              </CardDescription>
            </div>
            <Badge className="bg-green-100 text-green-800">
              1 Active
            </Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {integratedProducts.map((product) => {
              const Icon = product.icon;
              return (
                <Card key={product.name} className="border shadow-sm hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-3">
                        <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-xl">
                          <Icon className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <h3 className="font-semibold">{product.name}</h3>
                          <Badge className={product.statusColor}>
                            {product.status}
                          </Badge>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between text-sm">
                        <span>Total Users:</span>
                        <span className="font-medium">{product.totalUsers}</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>License Usage:</span>
                        <span className="font-medium">{product.licenseUsage}%</span>
                      </div>
                      <Progress value={product.licenseUsage} className="h-2" />
                      <div className="flex justify-between text-sm">
                        <span>Last Sync:</span>
                        <span className="text-green-600">{product.lastSync}</span>
                      </div>
                    </div>
                    
                    <Button 
                      className="w-full mt-4" 
                      variant="outline"
                      onClick={onAcronisDetail}
                    >
                      <ExternalLink className="w-4 h-4 mr-2" />
                      View Details
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Section 4: Alert Summary Panel */}
      <div className="space-y-6">
        {/* Alert Stats */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {alertStats.map((alert) => {
            const Icon = alert.icon;
            return (
              <Card key={alert.title} className="border-0 shadow-md">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">{alert.title}</p>
                      <p className="text-2xl font-bold">{alert.value}</p>
                    </div>
                    <div className={`flex items-center justify-center w-10 h-10 bg-gradient-to-br ${alert.color} rounded-xl`}>
                      <Icon className="w-5 h-5 text-white" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Alerts by Product Chart */}
        <Card className="border-0 shadow-lg">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Bell className="w-5 h-5 text-red-500" />
              <span>Alerts by Product</span>
            </CardTitle>
            <CardDescription>
              Alert volume comparison across all products by severity level
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={alertsByProductData}>
                <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
                <XAxis dataKey="product" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="critical" stackId="a" fill="#ef4444" name="Critical" />
                <Bar dataKey="warning" stackId="a" fill="#f59e0b" name="Warning" />
                <Bar dataKey="errors" stackId="a" fill="#f97316" name="Errors" />
                <Bar dataKey="info" stackId="a" fill="#3b82f6" name="Info" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Section 5: Insights & Recommendations */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Lightbulb className="w-5 h-5 text-yellow-500" />
            <span>AI Insights & Recommendations</span>
          </CardTitle>
          <CardDescription>
            Intelligent recommendations to optimize your SaaS infrastructure
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {aiInsights.map((insight, index) => {
              const Icon = insight.icon;
              const priorityColor = insight.priority === 'critical' ? 'border-red-200 bg-red-50' :
                                   insight.priority === 'high' ? 'border-orange-200 bg-orange-50' :
                                   'border-blue-200 bg-blue-50';
              
              return (
                <Card key={index} className={`border ${priorityColor}`}>
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-3 mb-4">
                      <div className={`flex items-center justify-center w-8 h-8 rounded-lg ${
                        insight.priority === 'critical' ? 'bg-red-500' :
                        insight.priority === 'high' ? 'bg-orange-500' : 'bg-blue-500'
                      }`}>
                        <Icon className="w-4 h-4 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-semibold mb-2">{insight.title}</h4>
                        <p className="text-sm text-muted-foreground mb-4">{insight.text}</p>
                        <Button variant="outline" size="sm">
                          {insight.actionLabel}
                          <ChevronRight className="w-3 h-3 ml-1" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Quick Actions Section */}
      <Card className="border-0 shadow-lg bg-gradient-to-r from-blue-50 to-purple-50">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0">
            <div className="space-y-2">
              <h3 className="text-lg font-semibold flex items-center space-x-2">
                <Zap className="w-5 h-5 text-blue-500" />
                <span>Quick Actions</span>
              </h3>
              <p className="text-sm text-muted-foreground">
                Common management tasks for your SaaS monitoring platform
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button variant="outline" className="shadow-sm hover:shadow-md">
                <RefreshCw className="w-4 h-4 mr-2" />
                Sync All Products
              </Button>
              <Button variant="outline" className="shadow-sm hover:shadow-md">
                <FileText className="w-4 h-4 mr-2" />
                Export Report
              </Button>
              <Button className="shadow-sm bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700">
                <Activity className="w-4 h-4 mr-2" />
                View Analytics
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}