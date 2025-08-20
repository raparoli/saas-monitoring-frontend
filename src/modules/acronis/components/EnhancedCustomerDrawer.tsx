import React, { useState } from 'react';
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle } from '../../../shared/components/ui/sheet';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Badge } from '../../../shared/components/ui/badge';
import { Progress } from '../../../shared/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../shared/components/ui/tabs';
import { ScrollArea } from '../../../shared/components/ui/scroll-area';
import { 
  TrendingUp, 
  DollarSign, 
  Activity, 
  Shield,
  BarChart3,
  PieChart as PieChartIcon,
  Clock
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { CustomerUsageDetail } from '../types';
import { formatStorageGB } from '../utils';

interface EnhancedCustomerDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  selectedUsageCustomer: CustomerUsageDetail | null;
}

export function EnhancedCustomerDrawer({ isOpen, onClose, selectedUsageCustomer }: EnhancedCustomerDrawerProps) {
  const [activeTab, setActiveTab] = useState('overview');

  if (!selectedUsageCustomer) return null;

  const { usageBreakdown, contractInfo } = selectedUsageCustomer;

  const storageData = [
    { name: 'Used Storage', value: usageBreakdown.cyberProtection.storage, color: '#3b82f6' },
    { name: 'Available Storage', value: usageBreakdown.quotas.storageQuota - usageBreakdown.cyberProtection.storage, color: '#e5e7eb' }
  ];

  const workloadData = [
    { name: 'Servers', used: usageBreakdown.cyberProtection.servers, quota: usageBreakdown.quotas.serversQuota },
    { name: 'VMs', used: usageBreakdown.cyberProtection.vms, quota: usageBreakdown.quotas.vmsQuota },
    { name: 'Workstations', used: usageBreakdown.cyberProtection.workstations, quota: usageBreakdown.quotas.workstationsQuota }
  ];

  const utilizationTrends = [
    { month: 'Jan', utilization: 65 },
    { month: 'Feb', utilization: 70 },
    { month: 'Mar', utilization: 75 },
    { month: 'Apr', utilization: 80 },
    { month: 'May', utilization: 85 },
    { month: 'Jun', utilization: 90 }
  ];

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[800px] sm:max-w-[800px]">
        <SheetHeader>
          <SheetTitle className="flex items-center space-x-2">
            <BarChart3 className="w-5 h-5" />
            <span>{selectedUsageCustomer.customerName}</span>
          </SheetTitle>
          <SheetDescription>
            Comprehensive usage analysis and breakdown
          </SheetDescription>
        </SheetHeader>

        <div className="mt-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="usage">Usage Details</TabsTrigger>
              <TabsTrigger value="trends">Trends</TabsTrigger>
            </TabsList>

            <ScrollArea className="h-[calc(100vh-200px)] mt-4">
              <TabsContent value="overview" className="space-y-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Storage Overview</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ResponsiveContainer width="100%" height={200}>
                        <PieChart>
                          <Pie
                            data={storageData}
                            cx="50%"
                            cy="50%"
                            outerRadius={60}
                            dataKey="value"
                            label={({ name, value }) => `${name}: ${formatStorageGB(value)}`}
                          >
                            {storageData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <Tooltip formatter={(value) => [formatStorageGB(value as number), '']} />
                        </PieChart>
                      </ResponsiveContainer>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base">Contract Information</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">License Type</span>
                        <Badge variant="outline">{contractInfo.licenseType}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Status</span>
                        <Badge variant={contractInfo.status === 'Active' ? 'default' : 'secondary'}>
                          {contractInfo.status}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-muted-foreground">Renewal Date</span>
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-3 h-3 text-muted-foreground" />
                          <span className="text-sm">{new Date(contractInfo.renewalDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="usage" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Workload Breakdown</CardTitle>
                    <CardDescription>Current usage across different workload types</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {workloadData.map((workload, index) => {
                        const utilizationRate = workload.quota > 0 ? Math.round((workload.used / workload.quota) * 100) : 0;
                        return (
                          <div key={index} className="space-y-2">
                            <div className="flex items-center justify-between">
                              <span className="text-sm font-medium">{workload.name}</span>
                              <span className="text-sm text-muted-foreground">
                                {workload.used} / {workload.quota}
                              </span>
                            </div>
                            <Progress value={utilizationRate} className="h-2" />
                            <div className="text-xs text-muted-foreground text-right">
                              {utilizationRate}% utilized
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Storage Details</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Used Storage</span>
                      <span className="font-medium">{formatStorageGB(usageBreakdown.cyberProtection.storage)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Storage Quota</span>
                      <span className="font-medium">{formatStorageGB(usageBreakdown.quotas.storageQuota)}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-muted-foreground">Available Storage</span>
                      <span className="font-medium">
                        {formatStorageGB(usageBreakdown.quotas.storageQuota - usageBreakdown.cyberProtection.storage)}
                      </span>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="trends" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-base">Utilization Trends</CardTitle>
                    <CardDescription>Storage utilization over the past 6 months</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ResponsiveContainer width="100%" height={250}>
                      <LineChart data={utilizationTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="month" />
                        <YAxis />
                        <Tooltip />
                        <Line 
                          type="monotone" 
                          dataKey="utilization" 
                          stroke="#3b82f6" 
                          strokeWidth={2}
                          dot={{ fill: '#3b82f6' }}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </CardContent>
                </Card>

                <div className="grid gap-4 md:grid-cols-2">
                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center space-x-2">
                        <TrendingUp className="w-4 h-4" />
                        <span>Growth Rate</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold text-green-600">+15%</div>
                      <p className="text-xs text-muted-foreground">vs last month</p>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle className="text-base flex items-center space-x-2">
                        <DollarSign className="w-4 h-4" />
                        <span>Est. Monthly Cost</span>
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">$489</div>
                      <p className="text-xs text-muted-foreground">Based on current usage</p>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </ScrollArea>
          </Tabs>
        </div>
      </SheetContent>
    </Sheet>
  );
}