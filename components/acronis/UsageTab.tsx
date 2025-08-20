import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Progress } from '../ui/progress';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import {
  Server,
  HardDrive,
  Cloud,
  BarChart3,
  PieChart as PieChartIcon,
  Monitor,
  Laptop,
  Search,
  Eye,
  SortAsc,
  SortDesc
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip as RechartsTooltip,
  Legend
} from 'recharts';
import { Customer, SortField, SortDirection } from './types';
import { customers } from './constants';
import { formatStorageGB, getFilteredUsageCustomers, getSortedCustomers } from './utils';

interface UsageTabProps {
  customerSearch: string;
  setCustomerSearch: (value: string) => void;
  usageUtilizationFilter: string;
  setUsageUtilizationFilter: (value: string) => void;
  usageStorageFilter: string;
  setUsageStorageFilter: (value: string) => void;
  showDisabledCustomers: boolean;
  setShowDisabledCustomers: (value: boolean) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  handleSort: (field: SortField) => void;
  getSortIcon: (field: SortField) => React.ReactNode;
  handleUsageCustomerBreakdown: (customer: Customer) => void;
  handleViewCustomerBreakdown: () => void;
}

export function UsageTab({
  customerSearch,
  setCustomerSearch,
  usageUtilizationFilter,
  setUsageUtilizationFilter,
  usageStorageFilter,
  setUsageStorageFilter,
  showDisabledCustomers,
  setShowDisabledCustomers,
  sortField,
  sortDirection,
  handleSort,
  getSortIcon,
  handleUsageCustomerBreakdown,
  handleViewCustomerBreakdown
}: UsageTabProps) {
  // Calculate stats
  const totalProtectedWorkloads = customers.reduce((sum, customer) => sum + customer.total_protected_workloads, 0);
  const totalLocalStorage = customers.reduce((sum, customer) => sum + customer.local_storageInGB, 0) / 1000;
  const totalCloudStorage = 4.71;
  const overallUtilizationRate = Math.round(customers.reduce((sum, customer) => sum + (customer.utilization_rate || 0), 0) / customers.length);

  const filteredUsageCustomers = getFilteredUsageCustomers(customers, customerSearch, usageUtilizationFilter, usageStorageFilter, showDisabledCustomers);
  const sortedUsageCustomers = getSortedCustomers(filteredUsageCustomers, sortField, sortDirection);

  return (
    <div className="space-y-6 mt-0">
      <div>
        <h3 className="text-lg font-semibold">Product Usage Overview</h3>
        <p className="text-muted-foreground">Comprehensive usage analytics and customer breakdown</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Protected Workloads</CardTitle>
            <Server className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalProtectedWorkloads}</div>
            <p className="text-xs text-muted-foreground">Across all customers</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Local Storage in Use</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalLocalStorage.toFixed(1)} TB</div>
            <p className="text-xs text-muted-foreground">Total local storage</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Cloud Storage in Use</CardTitle>
            <Cloud className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCloudStorage} TB</div>
            <p className="text-xs text-muted-foreground">Total cloud storage</p>
          </CardContent>
        </Card>

        <Card className="hover:shadow-md transition-shadow duration-200">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Overall Utilization Rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{overallUtilizationRate}%</div>
            <p className="text-xs text-muted-foreground">Average across customers</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5" />
              <span>Storage Distribution</span>
            </CardTitle>
            <CardDescription>
              Local vs Cloud storage usage breakdown
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={[
                    { name: 'Local Storage', value: totalLocalStorage, color: 'hsl(var(--chart-1))' },
                    { name: 'Cloud Storage', value: totalCloudStorage, color: 'hsl(var(--chart-2))' }
                  ]}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={100}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value} TB`}
                >
                  <Cell fill="hsl(var(--chart-1))" />
                  <Cell fill="hsl(var(--chart-2))" />
                </Pie>
                <RechartsTooltip formatter={(value) => [`${value} TB`, '']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
            <div className="mt-4 text-center">
              <p className="text-sm text-muted-foreground">
                Total Storage: {(totalLocalStorage + totalCloudStorage).toFixed(1)} TB
              </p>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Workload Type Usage</span>
            </CardTitle>
            <CardDescription>
              Usage distribution across workload types
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { type: 'Servers', icon: Server, used: customers.reduce((sum, c) => sum + (c.servers || 0), 0), quota: customers.length, utilization: 100 },
              { type: 'Virtual Machines', icon: Monitor, used: customers.reduce((sum, c) => sum + (c.vms || 0), 0), quota: customers.length, utilization: 100 },
              { type: 'Workstations', icon: Laptop, used: customers.reduce((sum, c) => sum + (c.workstations || 0), 0), quota: customers.length, utilization: 100 }
            ].map((workload, index) => {
              const Icon = workload.icon;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                        <Icon className="w-4 h-4 text-primary" />
                      </div>
                      <span className="font-medium">{workload.type}</span>
                    </div>
                    <div className="text-right">
                      <span className="text-sm font-medium">{workload.used} of {workload.quota} used</span>
                      <Badge variant={workload.utilization === 100 ? 'destructive' : 'default'} className="ml-2">
                        {workload.utilization}%
                      </Badge>
                    </div>
                  </div>
                  <Progress value={workload.utilization} className="h-2" />
                </div>
              );
            })}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Customer Usage Filters</CardTitle>
          <CardDescription>Filter customers by usage patterns</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search by customer name..."
                value={customerSearch}
                onChange={(e) => setCustomerSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={usageUtilizationFilter} onValueChange={setUsageUtilizationFilter}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Filter by utilization" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All utilization rates</SelectItem>
                <SelectItem value="80">Utilization {">"}80%</SelectItem>
              </SelectContent>
            </Select>

            <Select value={usageStorageFilter} onValueChange={setUsageStorageFilter}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Filter by storage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All storage sizes</SelectItem>
                <SelectItem value="5000">Storage {">"} 5 TB</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Switch
                id="show-disabled-usage"
                checked={showDisabledCustomers}
                onCheckedChange={setShowDisabledCustomers}
              />
              <Label htmlFor="show-disabled-usage" className="text-sm">Show disabled</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Customer Usage Breakdown</CardTitle>
              <CardDescription>
                Showing {sortedUsageCustomers.length} of {customers.length} customers
              </CardDescription>
            </div>
            <Button 
              onClick={handleViewCustomerBreakdown}
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 shadow-lg"
            >
              <BarChart3 className="w-4 h-4 mr-2" />
              View Advanced Breakdown
            </Button>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="cursor-pointer" onClick={() => handleSort('name')}>
                  <div className="flex items-center space-x-1">
                    <span>Customer Name</span>
                    {getSortIcon('name')}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('total_protected_workloads')}>
                  <div className="flex items-center space-x-1">
                    <span>Total Workloads</span>
                    {getSortIcon('total_protected_workloads')}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('local_storageInGB')}>
                  <div className="flex items-center space-x-1">
                    <span>Local Storage</span>
                    {getSortIcon('local_storageInGB')}
                  </div>
                </TableHead>
                <TableHead>Workload Breakdown</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('utilization_rate')}>
                  <div className="flex items-center space-x-1">
                    <span>Utilization Rate</span>
                    {getSortIcon('utilization_rate')}
                  </div>
                </TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedUsageCustomers.map((customer) => (
                <TableRow key={customer.id} className="hover:bg-muted/20">
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.total_protected_workloads}</TableCell>
                  <TableCell>{formatStorageGB(customer.local_storageInGB)}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-1 text-sm">
                      <span className="flex items-center space-x-1">
                        <Server className="w-3 h-3" />
                        <span>{customer.servers || 0}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Monitor className="w-3 h-3" />
                        <span>{customer.vms || 0}</span>
                      </span>
                      <span className="flex items-center space-x-1">
                        <Laptop className="w-3 h-3" />
                        <span>{customer.workstations || 0}</span>
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Badge 
                        variant={
                          (customer.utilization_rate || 0) > 85 ? 'destructive' : 
                          (customer.utilization_rate || 0) > 70 ? 'secondary' : 'default'
                        }
                      >
                        {customer.utilization_rate || 0}%
                      </Badge>
                      <div className="w-16">
                        <Progress value={customer.utilization_rate || 0} className="h-1" />
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleUsageCustomerBreakdown(customer)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Breakdown
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}