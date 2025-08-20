import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../../shared/components/ui/card';
import { Badge } from '../../shared/components/ui/badge';
import { Progress } from '../../shared/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../shared/components/ui/tabs';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../../shared/components/ui/sheet';
import {
  Building,
  Database,
  Server,
  Gauge,
  CreditCard,
  Cpu,
  Activity,
  Shield,
  Monitor,
  Laptop,
  Star
} from 'lucide-react';
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import { CustomerUsageDetail } from './types';
import { getEnhancedCustomerData, formatStorageGB } from './utils';

interface EnhancedCustomerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUsageCustomer: CustomerUsageDetail | null;
}

export function EnhancedCustomerDrawer({ 
  isOpen, 
  onClose, 
  selectedUsageCustomer 
}: EnhancedCustomerDrawerProps) {
  if (!selectedUsageCustomer) return null;

  const enhancedData = getEnhancedCustomerData(selectedUsageCustomer.customerId);
  if (!enhancedData) return null;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-4xl overflow-y-auto">
        <SheetHeader className="border-b pb-6 mb-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
                <Building className="w-8 h-8 text-white" />
              </div>
              <div>
                <SheetTitle className="text-2xl">{selectedUsageCustomer.customerName}</SheetTitle>
                <SheetDescription className="text-base">
                  Comprehensive usage analytics and performance insights
                </SheetDescription>
                <div className="flex items-center space-x-3 mt-2">
                  <Badge variant={enhancedData.enabled ? 'default' : 'secondary'}>
                    {enhancedData.enabled ? 'Active' : 'Inactive'}
                  </Badge>
                  <Badge variant={enhancedData.analytics.riskLevel === 'High' ? 'destructive' : 
                                 enhancedData.analytics.riskLevel === 'Medium' ? 'secondary' : 'default'}>
                    {enhancedData.analytics.riskLevel} Risk
                  </Badge>
                  <Badge className="bg-blue-100 text-blue-800">
                    Health Score: {enhancedData.analytics.healthScore}%
                  </Badge>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {formatStorageGB(enhancedData.local_storageInGB)}
              </div>
              <p className="text-sm text-muted-foreground">Total Storage</p>
            </div>
          </div>
        </SheetHeader>
        
        <div className="space-y-8">
          {/* Quick Stats Overview */}
          <div className="grid gap-4 md:grid-cols-4">
            <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-blue-700">Storage Used</p>
                    <p className="text-xl font-bold text-blue-900">
                      {formatStorageGB(enhancedData.local_storageInGB)}
                    </p>
                  </div>
                  <Database className="w-8 h-8 text-blue-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-green-700">Workloads</p>
                    <p className="text-xl font-bold text-green-900">
                      {enhancedData.total_protected_workloads}
                    </p>
                  </div>
                  <Server className="w-8 h-8 text-green-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-purple-700">Efficiency</p>
                    <p className="text-xl font-bold text-purple-900">
                      {enhancedData.utilization_rate}%
                    </p>
                  </div>
                  <Gauge className="w-8 h-8 text-purple-500" />
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
              <CardContent className="p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-orange-700">Monthly Cost</p>
                    <p className="text-xl font-bold text-orange-900">
                      ${enhancedData.analytics.costAnalysis.monthlyCost}
                    </p>
                  </div>
                  <CreditCard className="w-8 h-8 text-orange-500" />
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Enhanced Tabbed Content */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="storage">Storage</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="cost">Cost Analysis</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>
            
            <TabsContent value="overview" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Workload Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Cpu className="w-5 h-5" />
                      <span>Workload Distribution</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Server className="w-6 h-6 text-blue-600" />
                          <span className="font-medium">Servers</span>
                        </div>
                        <Badge variant="outline">{enhancedData.servers || 0}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Monitor className="w-6 h-6 text-green-600" />
                          <span className="font-medium">Virtual Machines</span>
                        </div>
                        <Badge variant="outline">{enhancedData.vms || 0}</Badge>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Laptop className="w-6 h-6 text-purple-600" />
                          <span className="font-medium">Workstations</span>
                        </div>
                        <Badge variant="outline">{enhancedData.workstations || 0}</Badge>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Recent Activity */}
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center space-x-2">
                      <Activity className="w-5 h-5" />
                      <span>Recent Activity</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      {enhancedData.analytics.recentActivity.map((activity, index) => (
                        <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className={`w-2 h-2 rounded-full ${
                              activity.status === 'Success' ? 'bg-green-500' : 
                              activity.status === 'In Progress' ? 'bg-yellow-500' : 'bg-red-500'
                            }`} />
                            <span className="font-medium">{activity.type}</span>
                          </div>
                          <div className="text-right">
                            <Badge variant={activity.status === 'Success' ? 'default' : 'secondary'}>
                              {activity.status}
                            </Badge>
                            <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Health Score and Risk Assessment */}
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2 text-blue-800">
                    <Shield className="w-5 h-5" />
                    <span>Health Assessment</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid gap-4 md:grid-cols-3">
                    <div className="text-center">
                      <div className="text-3xl font-bold text-blue-600 mb-2">
                        {enhancedData.analytics.healthScore}%
                      </div>
                      <p className="text-sm text-blue-700">Overall Health Score</p>
                    </div>
                    <div className="text-center">
                      <div className={`text-3xl font-bold mb-2 ${
                        enhancedData.analytics.riskLevel === 'Low' ? 'text-green-600' :
                        enhancedData.analytics.riskLevel === 'Medium' ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {enhancedData.analytics.riskLevel}
                      </div>
                      <p className="text-sm text-muted-foreground">Risk Level</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl font-bold text-purple-600 mb-2">
                        {enhancedData.analytics.performanceMetrics.backupSuccess}%
                      </div>
                      <p className="text-sm text-purple-700">Backup Success</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="storage" className="space-y-6">
              <div className="grid gap-6 lg:grid-cols-2">
                {/* Storage Breakdown Chart */}
                <Card>
                  <CardHeader>
                    <CardTitle>Storage Type Distribution</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={[
                              { name: 'Backups', value: enhancedData.analytics.storageBreakdown.backups, color: '#3b82f6' },
                              { name: 'Archives', value: enhancedData.analytics.storageBreakdown.archives, color: '#10b981' },
                              { name: 'Replicas', value: enhancedData.analytics.storageBreakdown.replicas, color: '#f59e0b' },
                              { name: 'Cache', value: enhancedData.analytics.storageBreakdown.cache, color: '#8b5cf6' }
                            ]}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${formatStorageGB(value)}`}
                          >
                            {[0, 1, 2, 3].map((index) => (
                              <Cell key={`cell-${index}`} fill={[
                                '#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'
                              ][index]} />
                            ))}
                          </Pie>
                          <RechartsTooltip formatter={(value) => [formatStorageGB(value as number), '']} />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </div>
                  </CardContent>
                </Card>

                {/* Detailed Storage Breakdown */}
                <Card>
                  <CardHeader>
                    <CardTitle>Storage Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {Object.entries(enhancedData.analytics.storageBreakdown).map(([type, amount]) => {
                      const percentage = (amount / enhancedData.local_storageInGB) * 100;
                      return (
                        <div key={type} className="space-y-2">
                          <div className="flex justify-between items-center">
                            <span className="font-medium capitalize">{type}</span>
                            <div className="text-right">
                              <span className="font-medium">{formatStorageGB(amount)}</span>
                              <p className="text-xs text-muted-foreground">{percentage.toFixed(1)}%</p>
                            </div>
                          </div>
                          <Progress value={percentage} className="h-2" />
                        </div>
                      );
                    })}
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Performance Metrics</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <span className="font-medium">Backup Success Rate</span>
                      <div className="text-right">
                        <span className="text-xl font-bold text-green-600">
                          {enhancedData.analytics.performanceMetrics.backupSuccess}%
                        </span>
                        <Progress value={enhancedData.analytics.performanceMetrics.backupSuccess} className="w-20 h-2 mt-1" />
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-blue-50 rounded-lg">
                      <span className="font-medium">Recovery Time</span>
                      <div className="text-right">
                        <span className="text-xl font-bold text-blue-600">
                          {enhancedData.analytics.performanceMetrics.recoveryTime}min
                        </span>
                        <p className="text-xs text-muted-foreground">Average recovery</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-purple-50 rounded-lg">
                      <span className="font-medium">Compression Ratio</span>
                      <div className="text-right">
                        <span className="text-xl font-bold text-purple-600">
                          {enhancedData.analytics.performanceMetrics.compressionRatio}:1
                        </span>
                        <p className="text-xs text-muted-foreground">Space saved</p>
                      </div>
                    </div>
                    
                    <div className="flex justify-between items-center p-3 bg-orange-50 rounded-lg">
                      <span className="font-medium">Deduplication Ratio</span>
                      <div className="text-right">
                        <span className="text-xl font-bold text-orange-600">
                          {enhancedData.analytics.performanceMetrics.deduplicationRatio}:1
                        </span>
                        <p className="text-xs text-muted-foreground">Efficiency gain</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Performance Score</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-4">
                      <div className="text-6xl font-bold text-blue-600">
                        {enhancedData.analytics.healthScore}
                      </div>
                      <div className="space-y-2">
                        <Progress value={enhancedData.analytics.healthScore} className="h-3" />
                        <p className="text-sm text-muted-foreground">Overall Performance Score</p>
                      </div>
                      <div className="grid grid-cols-2 gap-4 pt-4">
                        <div className="text-center">
                          <div className="text-2xl font-bold text-green-600 mb-1">
                            {enhancedData.analytics.performanceMetrics.backupSuccess}%
                          </div>
                          <p className="text-xs text-muted-foreground">Success Rate</p>
                        </div>
                        <div className="text-center">
                          <div className="text-2xl font-bold text-blue-600 mb-1">
                            {enhancedData.analytics.performanceMetrics.recoveryTime}min
                          </div>
                          <p className="text-xs text-muted-foreground">Recovery Time</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="cost" className="space-y-6">
              <div className="grid gap-6 md:grid-cols-3">
                <Card>
                  <CardHeader>
                    <CardTitle>Monthly Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-4xl font-bold text-green-600">
                        ${enhancedData.analytics.costAnalysis.monthlyCost}
                      </div>
                      <p className="text-sm text-muted-foreground">Current month</p>
                      <div className="flex items-center justify-center space-x-1 text-sm">
                        <Star className="w-4 h-4 text-green-500" />
                        <span className="text-green-600">+{enhancedData.analytics.costAnalysis.costTrend}% vs last month</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Cost per GB</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-4xl font-bold text-blue-600">
                        ${enhancedData.analytics.costAnalysis.costPerGB.toFixed(3)}
                      </div>
                      <p className="text-sm text-muted-foreground">Per GB stored</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle>Projected Cost</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-center space-y-2">
                      <div className="text-4xl font-bold text-orange-600">
                        ${enhancedData.analytics.costAnalysis.projectedCost}
                      </div>
                      <p className="text-sm text-muted-foreground">Next month</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="trends" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Storage & Efficiency Trends</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={enhancedData.analytics.utilizationTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <RechartsTooltip />
                        <Legend />
                        <Area 
                          type="monotone" 
                          dataKey="storage" 
                          stackId="1" 
                          stroke="#3b82f6" 
                          fill="#3b82f6" 
                          fillOpacity={0.6}
                          name="Storage (GB)"
                        />
                        <Area 
                          type="monotone" 
                          dataKey="efficiency" 
                          stackId="2" 
                          stroke="#10b981" 
                          fill="#10b981" 
                          fillOpacity={0.6}
                          name="Efficiency (%)"
                        />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}