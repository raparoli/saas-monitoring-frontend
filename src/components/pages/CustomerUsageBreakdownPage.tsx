import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Separator } from '../ui/separator';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';
import { 
  ArrowLeft,
  TrendingUp,
  TrendingDown,
  Database,
  Server,
  Monitor,
  Laptop,
  HardDrive,
  Cloud,
  Users,
  Calendar,
  AlertTriangle,
  CheckCircle,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  Filter,
  Search,
  Download,
  RefreshCw,
  Eye,
  Zap,
  Target,
  Clock,
  Shield,
  Globe,
  FileText,
  Settings,
  Bell,
  ChevronRight,
  Info,
  Star,
  Award,
  Building
} from 'lucide-react';
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
  Tooltip as RechartsTooltip, 
  Legend,
  LineChart,
  Line,
  Area,
  AreaChart
} from 'recharts';
import { 
  formatStorageGB, 
  formatDate, 
  getDaysUntilRenewal
} from '../../shared/utils/formatters';
import {
  getUsagePercentage,
  getStatusBadgeVariant,
  getUsageBadgeVariant,
  getComplexityColor,
  getProductGradient
} from '../../shared/utils/styleHelpers';

interface CustomerUsageBreakdownPageProps {
  onBack: () => void;
}

interface Customer {
  id: string;
  name: string;
  total_protected_workloads: number;
  local_storageInGB: number;
  enabled: boolean;
  utilization_rate?: number;
  servers?: number;
  vms?: number;
  workstations?: number;
  contact_email: string;
  location: string;
  created_at: string;
}

interface UsageBreakdown {
  customerId: string;
  customerName: string;
  totalStorage: number;
  storageBreakdown: {
    backups: number;
    archives: number;
    replicas: number;
    cache: number;
  };
  workloadBreakdown: {
    servers: number;
    vms: number;
    workstations: number;
    databases: number;
  };
  utilizationTrends: {
    date: string;
    storage: number;
    workloads: number;
    efficiency: number;
  }[];
  performanceMetrics: {
    backupSuccess: number;
    recoveryTime: number;
    compressionRatio: number;
    deduplicationRatio: number;
  };
  costAnalysis: {
    monthlyCost: number;
    costPerGB: number;
    costTrend: number;
    projectedCost: number;
  };
}

export function CustomerUsageBreakdownPage({ onBack }: CustomerUsageBreakdownPageProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortBy, setSortBy] = useState('storage');
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCustomer, setSelectedCustomer] = useState<string | null>(null);

  // Enhanced mock data for customer usage breakdowns
  const customers: Customer[] = [
    {
      id: '1',
      name: 'LAITH EMC NEW SERVER',
      total_protected_workloads: 1,
      local_storageInGB: 9390,
      enabled: true,
      utilization_rate: 94,
      servers: 1,
      vms: 0,
      workstations: 0,
      contact_email: 'admin@laithemc.com',
      location: 'UAE',
      created_at: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      name: 'Al Mahtab Vegetables',
      total_protected_workloads: 2,
      local_storageInGB: 8247,
      enabled: true,
      utilization_rate: 87,
      servers: 1,
      vms: 1,
      workstations: 0,
      contact_email: 'it@almahtab.com',
      location: 'UAE',
      created_at: '2024-02-10T09:15:00Z'
    },
    {
      id: '3',
      name: 'AL AYAAN',
      total_protected_workloads: 1,
      local_storageInGB: 3092,
      enabled: true,
      utilization_rate: 76,
      servers: 0,
      vms: 0,
      workstations: 1,
      contact_email: 'support@alayaan.com',
      location: 'UAE',
      created_at: '2024-03-05T14:20:00Z'
    },
    {
      id: '4',
      name: 'TechCorp Solutions',
      total_protected_workloads: 5,
      local_storageInGB: 12500,
      enabled: false,
      utilization_rate: 82,
      servers: 2,
      vms: 2,
      workstations: 1,
      contact_email: 'admin@techcorp.com',
      location: 'UAE',
      created_at: '2024-01-20T11:00:00Z'
    },
    {
      id: '5',
      name: 'Global Trading LLC',
      total_protected_workloads: 3,
      local_storageInGB: 6780,
      enabled: true,
      utilization_rate: 89,
      servers: 1,
      vms: 1,
      workstations: 1,
      contact_email: 'it@globaltrading.com',
      location: 'UAE',
      created_at: '2024-02-28T08:45:00Z'
    }
  ];

  const usageBreakdowns: UsageBreakdown[] = [
    {
      customerId: '1',
      customerName: 'LAITH EMC NEW SERVER',
      totalStorage: 9390,
      storageBreakdown: {
        backups: 6200,
        archives: 2100,
        replicas: 890,
        cache: 200
      },
      workloadBreakdown: {
        servers: 1,
        vms: 0,
        workstations: 0,
        databases: 2
      },
      utilizationTrends: [
        { date: '2024-01', storage: 7200, workloads: 1, efficiency: 85 },
        { date: '2024-02', storage: 7800, workloads: 1, efficiency: 87 },
        { date: '2024-03', storage: 8200, workloads: 1, efficiency: 89 },
        { date: '2024-04', storage: 8600, workloads: 1, efficiency: 91 },
        { date: '2024-05', storage: 8900, workloads: 1, efficiency: 93 },
        { date: '2024-06', storage: 9200, workloads: 1, efficiency: 94 },
        { date: '2024-07', storage: 9390, workloads: 1, efficiency: 94 }
      ],
      performanceMetrics: {
        backupSuccess: 98.5,
        recoveryTime: 45,
        compressionRatio: 2.3,
        deduplicationRatio: 3.1
      },
      costAnalysis: {
        monthlyCost: 489,
        costPerGB: 0.052,
        costTrend: 5.2,
        projectedCost: 515
      }
    },
    {
      customerId: '2',
      customerName: 'Al Mahtab Vegetables',
      totalStorage: 8247,
      storageBreakdown: {
        backups: 5500,
        archives: 1800,
        replicas: 747,
        cache: 200
      },
      workloadBreakdown: {
        servers: 1,
        vms: 1,
        workstations: 0,
        databases: 1
      },
      utilizationTrends: [
        { date: '2024-01', storage: 6100, workloads: 2, efficiency: 80 },
        { date: '2024-02', storage: 6500, workloads: 2, efficiency: 82 },
        { date: '2024-03', storage: 7000, workloads: 2, efficiency: 84 },
        { date: '2024-04', storage: 7400, workloads: 2, efficiency: 85 },
        { date: '2024-05', storage: 7800, workloads: 2, efficiency: 86 },
        { date: '2024-06', storage: 8100, workloads: 2, efficiency: 87 },
        { date: '2024-07', storage: 8247, workloads: 2, efficiency: 87 }
      ],
      performanceMetrics: {
        backupSuccess: 96.8,
        recoveryTime: 52,
        compressionRatio: 2.1,
        deduplicationRatio: 2.8
      },
      costAnalysis: {
        monthlyCost: 429,
        costPerGB: 0.052,
        costTrend: 3.8,
        projectedCost: 445
      }
    },
    {
      customerId: '3',
      customerName: 'AL AYAAN',
      totalStorage: 3092,
      storageBreakdown: {
        backups: 2100,
        archives: 700,
        replicas: 242,
        cache: 50
      },
      workloadBreakdown: {
        servers: 0,
        vms: 0,
        workstations: 1,
        databases: 0
      },
      utilizationTrends: [
        { date: '2024-01', storage: 2200, workloads: 1, efficiency: 70 },
        { date: '2024-02', storage: 2400, workloads: 1, efficiency: 72 },
        { date: '2024-03', storage: 2600, workloads: 1, efficiency: 73 },
        { date: '2024-04', storage: 2750, workloads: 1, efficiency: 74 },
        { date: '2024-05', storage: 2900, workloads: 1, efficiency: 75 },
        { date: '2024-06', storage: 3000, workloads: 1, efficiency: 76 },
        { date: '2024-07', storage: 3092, workloads: 1, efficiency: 76 }
      ],
      performanceMetrics: {
        backupSuccess: 99.2,
        recoveryTime: 28,
        compressionRatio: 2.6,
        deduplicationRatio: 3.4
      },
      costAnalysis: {
        monthlyCost: 161,
        costPerGB: 0.052,
        costTrend: 2.1,
        projectedCost: 164
      }
    }
  ];

  // Summary analytics
  const summaryStats = {
    totalCustomers: customers.length,
    activeCustomers: customers.filter(c => c.enabled).length,
    totalStorage: customers.reduce((sum, c) => sum + c.local_storageInGB, 0),
    avgUtilization: Math.round(customers.reduce((sum, c) => sum + (c.utilization_rate || 0), 0) / customers.length),
    totalWorkloads: customers.reduce((sum, c) => sum + c.total_protected_workloads, 0),
    monthlyGrowth: 8.5
  };

  // Utilization distribution
  const utilizationDistribution = [
    { range: '90-100%', count: 2, color: '#dc2626' },
    { range: '80-89%', count: 2, color: '#f59e0b' },
    { range: '70-79%', count: 1, color: '#10b981' },
    { range: '60-69%', count: 0, color: '#3b82f6' },
    { range: 'Below 60%', count: 0, color: '#6b7280' }
  ];

  // Storage type distribution
  const storageTypeDistribution = [
    { name: 'Backups', value: 65, color: '#3b82f6' },
    { name: 'Archives', value: 22, color: '#10b981' },
    { name: 'Replicas', value: 10, color: '#f59e0b' },
    { name: 'Cache', value: 3, color: '#8b5cf6' }
  ];

  // Workload distribution
  const workloadDistribution = [
    { name: 'Servers', value: 5, color: '#dc2626' },
    { name: 'Virtual Machines', value: 4, color: '#3b82f6' },
    { name: 'Workstations', value: 2, color: '#10b981' },
    { name: 'Databases', value: 3, color: '#f59e0b' }
  ];

  // Cost efficiency metrics
  const costEfficiencyData = [
    { customer: 'LAITH EMC', efficiency: 94, cost: 489, storage: 9390 },
    { customer: 'Al Mahtab', efficiency: 87, cost: 429, storage: 8247 },
    { customer: 'AL AYAAN', efficiency: 76, cost: 161, storage: 3092 },
    { customer: 'TechCorp', efficiency: 82, cost: 650, storage: 12500 },
    { customer: 'Global Trading', efficiency: 89, cost: 353, storage: 6780 }
  ];

  const filteredCustomers = customers.filter(customer => {
    const matchesSearch = customer.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = selectedFilter === 'all' || 
      (selectedFilter === 'high-usage' && (customer.utilization_rate || 0) > 85) ||
      (selectedFilter === 'medium-usage' && (customer.utilization_rate || 0) >= 70 && (customer.utilization_rate || 0) <= 85) ||
      (selectedFilter === 'low-usage' && (customer.utilization_rate || 0) < 70) ||
      (selectedFilter === 'active' && customer.enabled) ||
      (selectedFilter === 'inactive' && !customer.enabled);
    
    return matchesSearch && matchesFilter;
  });

  const formatStorageGB = (gb: number) => {
    if (gb >= 1000) {
      return `${(gb / 1000).toFixed(1)} TB`;
    }
    return `${gb.toLocaleString()} GB`;
  };

  const getUtilizationColor = (rate: number) => {
    if (rate >= 90) return 'text-red-600';
    if (rate >= 80) return 'text-orange-600';
    if (rate >= 70) return 'text-yellow-600';
    return 'text-green-600';
  };

  const getUtilizationBadgeVariant = (rate: number) => {
    if (rate >= 90) return 'destructive';
    if (rate >= 80) return 'secondary';
    return 'default';
  };

  const getCustomerBreakdown = (customerId: string) => {
    return usageBreakdowns.find(breakdown => breakdown.customerId === customerId);
  };

  const renderCustomerCard = (customer: Customer) => {
    const breakdown = getCustomerBreakdown(customer.id);
    if (!breakdown) return null;

    return (
      <Card 
        key={customer.id} 
        className={`transition-all duration-300 hover:shadow-lg cursor-pointer ${
          selectedCustomer === customer.id ? 'ring-2 ring-blue-500' : ''
        }`}
        onClick={() => setSelectedCustomer(selectedCustomer === customer.id ? null : customer.id)}
      >
        <CardContent className="p-6">
          {/* Customer Header */}
          <div className="flex items-start justify-between mb-4">
            <div className="flex items-center space-x-3">
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Building className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-lg truncate max-w-48">{customer.name}</h3>
                <p className="text-sm text-muted-foreground">{customer.location}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Badge variant={customer.enabled ? 'default' : 'secondary'}>
                {customer.enabled ? 'Active' : 'Inactive'}
              </Badge>
              <Badge variant={getUtilizationBadgeVariant(customer.utilization_rate || 0)}>
                {customer.utilization_rate}% Usage
              </Badge>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4">
            <div className="text-center">
              <p className="text-2xl font-bold text-blue-600">{formatStorageGB(customer.local_storageInGB)}</p>
              <p className="text-xs text-muted-foreground">Total Storage</p>
            </div>
            <div className="text-center">
              <p className="text-2xl font-bold text-green-600">{customer.total_protected_workloads}</p>
              <p className="text-xs text-muted-foreground">Workloads</p>
            </div>
            <div className="text-center">
              <p className={`text-2xl font-bold ${getUtilizationColor(customer.utilization_rate || 0)}`}>
                {customer.utilization_rate}%
              </p>
              <p className="text-xs text-muted-foreground">Efficiency</p>
            </div>
          </div>

          {/* Storage Breakdown */}
          <div className="space-y-3 mb-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Storage Distribution</span>
              <Button variant="ghost" size="sm" className="h-6 text-xs">
                <Eye className="w-3 h-3 mr-1" />
                Details
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span>Backups ({((breakdown.storageBreakdown.backups / breakdown.totalStorage) * 100).toFixed(0)}%)</span>
                <span>{formatStorageGB(breakdown.storageBreakdown.backups)}</span>
              </div>
              <Progress 
                value={(breakdown.storageBreakdown.backups / breakdown.totalStorage) * 100} 
                className="h-2"
              />
            </div>
          </div>

          {/* Cost Information */}
          <div className="pt-3 border-t">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm font-medium">${breakdown.costAnalysis.monthlyCost}/month</p>
                <p className="text-xs text-muted-foreground">${breakdown.costAnalysis.costPerGB.toFixed(3)}/GB</p>
              </div>
              <div className="text-right">
                <div className="flex items-center space-x-1">
                  <TrendingUp className="w-3 h-3 text-green-500" />
                  <span className="text-xs text-green-600">+{breakdown.costAnalysis.costTrend}%</span>
                </div>
                <p className="text-xs text-muted-foreground">vs last month</p>
              </div>
            </div>
          </div>

          {/* Expanded Details */}
          {selectedCustomer === customer.id && (
            <div className="mt-6 pt-4 border-t space-y-4">
              <Tabs defaultValue="trends" className="w-full">
                <TabsList className="grid w-full grid-cols-3">
                  <TabsTrigger value="trends">Trends</TabsTrigger>
                  <TabsTrigger value="performance">Performance</TabsTrigger>
                  <TabsTrigger value="breakdown">Breakdown</TabsTrigger>
                </TabsList>
                
                <TabsContent value="trends" className="space-y-4">
                  <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                      <AreaChart data={breakdown.utilizationTrends}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="date" fontSize={12} />
                        <YAxis fontSize={12} />
                        <RechartsTooltip />
                        <Area type="monotone" dataKey="storage" stackId="1" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.6} />
                        <Area type="monotone" dataKey="efficiency" stackId="2" stroke="#10b981" fill="#10b981" fillOpacity={0.6} />
                      </AreaChart>
                    </ResponsiveContainer>
                  </div>
                </TabsContent>

                <TabsContent value="performance" className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Backup Success</span>
                        <span className="text-sm font-medium">{breakdown.performanceMetrics.backupSuccess}%</span>
                      </div>
                      <Progress value={breakdown.performanceMetrics.backupSuccess} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Recovery Time</span>
                        <span className="text-sm font-medium">{breakdown.performanceMetrics.recoveryTime}min</span>
                      </div>
                      <div className="h-2 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className="h-full bg-green-500 transition-all"
                          style={{ width: `${100 - (breakdown.performanceMetrics.recoveryTime / 60) * 100}%` }}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Compression</span>
                        <span className="text-sm font-medium">{breakdown.performanceMetrics.compressionRatio}:1</span>
                      </div>
                      <Progress value={breakdown.performanceMetrics.compressionRatio * 20} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm">Deduplication</span>
                        <span className="text-sm font-medium">{breakdown.performanceMetrics.deduplicationRatio}:1</span>
                      </div>
                      <Progress value={breakdown.performanceMetrics.deduplicationRatio * 20} className="h-2" />
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="breakdown" className="space-y-4">
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <h4 className="font-medium mb-3">Storage Types</h4>
                      <div className="space-y-2">
                        {Object.entries(breakdown.storageBreakdown).map(([type, amount]) => (
                          <div key={type} className="flex justify-between items-center">
                            <span className="text-sm capitalize">{type}</span>
                            <div className="flex items-center space-x-2">
                              <span className="text-sm font-medium">{formatStorageGB(amount)}</span>
                              <div className="w-16 h-2 bg-secondary rounded-full overflow-hidden">
                                <div 
                                  className="h-full bg-blue-500 transition-all"
                                  style={{ width: `${(amount / breakdown.totalStorage) * 100}%` }}
                                />
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div>
                      <h4 className="font-medium mb-3">Workload Types</h4>
                      <div className="space-y-2">
                        {Object.entries(breakdown.workloadBreakdown).map(([type, count]) => (
                          <div key={type} className="flex justify-between items-center">
                            <span className="text-sm capitalize">{type}</span>
                            <Badge variant="outline">{count}</Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </div>
          )}
        </CardContent>
      </Card>
    );
  };

  return (
    <TooltipProvider>
      <div className="flex-1 p-6 space-y-6 bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button variant="ghost" onClick={onBack} className="hover:bg-gray-100">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Usage
            </Button>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Customer Usage Breakdown</h1>
              <p className="text-muted-foreground">
                Detailed analysis of customer storage utilization and performance metrics
              </p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="w-4 h-4 mr-2" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <RefreshCw className="w-4 h-4 mr-2" />
              Refresh
            </Button>
          </div>
        </div>

        {/* Summary Statistics */}
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-6">
          <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-blue-700">Total Customers</p>
                  <p className="text-2xl font-bold text-blue-900">{summaryStats.totalCustomers}</p>
                </div>
                <Users className="w-8 h-8 text-blue-500" />
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-green-700">Active</p>
                  <p className="text-2xl font-bold text-green-900">{summaryStats.activeCustomers}</p>
                </div>
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-purple-700">Total Storage</p>
                  <p className="text-2xl font-bold text-purple-900">{formatStorageGB(summaryStats.totalStorage)}</p>
                </div>
                <Database className="w-8 h-8 text-purple-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border-orange-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-orange-700">Avg Utilization</p>
                  <p className="text-2xl font-bold text-orange-900">{summaryStats.avgUtilization}%</p>
                </div>
                <Activity className="w-8 h-8 text-orange-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-red-50 to-red-100 border-red-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-red-700">Total Workloads</p>
                  <p className="text-2xl font-bold text-red-900">{summaryStats.totalWorkloads}</p>
                </div>
                <Server className="w-8 h-8 text-red-500" />
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-indigo-50 to-indigo-100 border-indigo-200">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-indigo-700">Growth</p>
                  <p className="text-2xl font-bold text-indigo-900">+{summaryStats.monthlyGrowth}%</p>
                </div>
                <TrendingUp className="w-8 h-8 text-indigo-500" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Analytics Dashboard */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Utilization Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <PieChartIcon className="w-5 h-5" />
                <span>Utilization Distribution</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={utilizationDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="count"
                      label={({ range, count }) => `${range}: ${count}`}
                    >
                      {utilizationDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Storage Type Distribution */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <HardDrive className="w-5 h-5" />
                <span>Storage Types</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={storageTypeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}%`}
                    >
                      {storageTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Cost Efficiency */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Target className="w-5 h-5" />
                <span>Cost Efficiency</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={costEfficiencyData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="customer" fontSize={10} />
                    <YAxis fontSize={12} />
                    <RechartsTooltip />
                    <Bar dataKey="efficiency" fill="#3b82f6" />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Filters and Controls */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <Input
                    placeholder="Search customers..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10 bg-white shadow-sm"
                  />
                </div>
                
                <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                  <SelectTrigger className="w-full sm:w-48 bg-white shadow-sm">
                    <SelectValue placeholder="Filter by usage" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Customers</SelectItem>
                    <SelectItem value="high-usage">High Usage ({">"}85%)</SelectItem>
                    <SelectItem value="medium-usage">Medium Usage (70-85%)</SelectItem>
                    <SelectItem value="low-usage">Low Usage ({"<"}70%)</SelectItem>
                    <SelectItem value="active">Active Only</SelectItem>
                    <SelectItem value="inactive">Inactive Only</SelectItem>
                  </SelectContent>
                </Select>

                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-full sm:w-48 bg-white shadow-sm">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="storage">Storage Usage</SelectItem>
                    <SelectItem value="utilization">Utilization Rate</SelectItem>
                    <SelectItem value="cost">Monthly Cost</SelectItem>
                    <SelectItem value="efficiency">Efficiency</SelectItem>
                    <SelectItem value="name">Customer Name</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="flex items-center space-x-2">
                <Button 
                  variant={viewMode === 'grid' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewMode('grid')}
                >
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Cards
                </Button>
                <Button 
                  variant={viewMode === 'table' ? 'default' : 'outline'} 
                  size="sm"
                  onClick={() => setViewMode('table')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  Table
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Customer Breakdown */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-xl font-semibold">Customer Usage Analysis</h2>
            <Badge variant="outline">
              {filteredCustomers.length} customer{filteredCustomers.length !== 1 ? 's' : ''}
            </Badge>
          </div>

          {viewMode === 'grid' ? (
            <div className="grid gap-6 lg:grid-cols-2">
              {filteredCustomers.map(renderCustomerCard)}
            </div>
          ) : (
            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Storage</TableHead>
                      <TableHead>Workloads</TableHead>
                      <TableHead>Utilization</TableHead>
                      <TableHead>Monthly Cost</TableHead>
                      <TableHead>Efficiency</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredCustomers.map((customer) => {
                      const breakdown = getCustomerBreakdown(customer.id);
                      return (
                        <TableRow key={customer.id}>
                          <TableCell>
                            <div className="flex items-center space-x-3">
                              <div className="flex items-center justify-center w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
                                <Building className="w-4 h-4 text-white" />
                              </div>
                              <div>
                                <p className="font-medium">{customer.name}</p>
                                <p className="text-sm text-muted-foreground">{customer.location}</p>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{formatStorageGB(customer.local_storageInGB)}</TableCell>
                          <TableCell>{customer.total_protected_workloads}</TableCell>
                          <TableCell>
                            <Badge variant={getUtilizationBadgeVariant(customer.utilization_rate || 0)}>
                              {customer.utilization_rate}%
                            </Badge>
                          </TableCell>
                          <TableCell>${breakdown?.costAnalysis.monthlyCost || 0}</TableCell>
                          <TableCell>
                            <div className="flex items-center space-x-2">
                              <Progress value={customer.utilization_rate} className="w-16 h-2" />
                              <span className="text-sm">{customer.utilization_rate}%</span>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setSelectedCustomer(selectedCustomer === customer.id ? null : customer.id)}
                            >
                              <Eye className="w-4 h-4 mr-1" />
                              View
                            </Button>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Insights and Recommendations */}
        <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <Star className="w-5 h-5 text-yellow-500" />
              <span>Insights & Recommendations</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border">
                <AlertTriangle className="w-5 h-5 text-orange-500 mt-1" />
                <div>
                  <h4 className="font-medium">High Utilization Alert</h4>
                  <p className="text-sm text-muted-foreground">
                    2 customers are using over 90% of their storage quota. Consider upgrading their plans.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border">
                <TrendingUp className="w-5 h-5 text-green-500 mt-1" />
                <div>
                  <h4 className="font-medium">Cost Optimization</h4>
                  <p className="text-sm text-muted-foreground">
                    Average deduplication ratio of 3.1:1 is saving approximately $1,250/month across all customers.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border">
                <Award className="w-5 h-5 text-blue-500 mt-1" />
                <div>
                  <h4 className="font-medium">Performance Excellence</h4>
                  <p className="text-sm text-muted-foreground">
                    AL AYAAN maintains 99.2% backup success rate with fastest recovery times.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-3 p-4 bg-white rounded-lg border">
                <Clock className="w-5 h-5 text-purple-500 mt-1" />
                <div>
                  <h4 className="font-medium">Efficiency Trend</h4>
                  <p className="text-sm text-muted-foreground">
                    Overall storage efficiency has improved by 8.5% this month due to better compression.
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </TooltipProvider>
  );
}