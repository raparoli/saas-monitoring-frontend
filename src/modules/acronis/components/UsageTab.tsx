import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Badge } from '../../../shared/components/ui/badge';
import { Input } from '../../../shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/ui/table';
import { Checkbox } from '../../../shared/components/ui/checkbox';
import { Progress } from '../../../shared/components/ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../shared/components/ui/tooltip';
import { Search, Filter, Users, HardDrive, Calendar, Eye, BarChart3 } from 'lucide-react';
import { Customer, SortField } from '../types';
import { customers } from '../constants';
import { getFilteredUsageCustomers, getSortedCustomers, formatStorageGB, formatDate, getUtilizationColor } from '../utils';

interface UsageTabProps {
  customerSearch: string;
  setCustomerSearch: (search: string) => void;
  usageUtilizationFilter: string;
  setUsageUtilizationFilter: (filter: string) => void;
  usageStorageFilter: string;
  setUsageStorageFilter: (filter: string) => void;
  showDisabledCustomers: boolean;
  setShowDisabledCustomers: (show: boolean) => void;
  sortField: SortField;
  sortDirection: 'asc' | 'desc';
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
  const filteredCustomers = getFilteredUsageCustomers(
    customers,
    customerSearch,
    usageUtilizationFilter,
    usageStorageFilter,
    showDisabledCustomers
  );

  const sortedCustomers = getSortedCustomers(
    filteredCustomers,
    sortField,
    sortDirection
  );

  return (
    <div className="space-y-6 mt-0">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold">Usage Analysis</h3>
          <p className="text-muted-foreground">Detailed usage breakdown and utilization metrics</p>
        </div>
        <Button onClick={handleViewCustomerBreakdown} variant="outline">
          <BarChart3 className="w-4 h-4 mr-2" />
          View Breakdown
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter Controls</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row lg:items-center space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search customers..."
                  value={customerSearch}
                  onChange={(e) => setCustomerSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={usageUtilizationFilter} onValueChange={setUsageUtilizationFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Utilization Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Utilization</SelectItem>
                  <SelectItem value="80">Above 80%</SelectItem>
                </SelectContent>
              </Select>

              <Select value={usageStorageFilter} onValueChange={setUsageStorageFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Storage Filter" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Storage</SelectItem>
                  <SelectItem value="5000">Above 5 TB</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="showDisabledUsage"
                checked={showDisabledCustomers}
                onCheckedChange={setShowDisabledCustomers}
              />
              <label htmlFor="showDisabledUsage" className="text-sm">Show disabled customers</label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Usage Details ({sortedCustomers.length})</CardTitle>
          <CardDescription>Detailed usage breakdown for each customer</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('name')}
                    className="h-auto p-0 font-medium hover:bg-transparent"
                  >
                    Customer Name {getSortIcon('name')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('total_protected_workloads')}
                    className="h-auto p-0 font-medium hover:bg-transparent"
                  >
                    Protected Workloads {getSortIcon('total_protected_workloads')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('local_storageInGB')}
                    className="h-auto p-0 font-medium hover:bg-transparent"
                  >
                    Local Storage {getSortIcon('local_storageInGB')}
                  </Button>
                </TableHead>
                <TableHead>
                  <Button 
                    variant="ghost" 
                    onClick={() => handleSort('utilization_rate')}
                    className="h-auto p-0 font-medium hover:bg-transparent"
                  >
                    Utilization {getSortIcon('utilization_rate')}
                  </Button>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCustomers.map((customer) => (
                <TableRow 
                  key={customer.id} 
                  className="cursor-pointer hover:bg-muted/50"
                  onClick={() => handleCustomerRowClick(customer)}
                >
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <Users className="w-4 h-4 text-muted-foreground" />
                      <span>{customer.total_protected_workloads}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <HardDrive className="w-4 h-4 text-muted-foreground" />
                      <span>{formatStorageGB(customer.local_storageInGB)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="flex-1 max-w-20">
                        <Progress value={customer.utilization_rate || 0} className="h-2" />
                      </div>
                      <span className={`text-sm font-medium ${getUtilizationColor(customer.utilization_rate || 0)}`}>
                        {customer.utilization_rate || 0}%
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={customer.enabled ? 'default' : 'secondary'}>
                      {customer.enabled ? 'Active' : 'Disabled'}
                    </Badge>
                  </TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleUsageCustomerBreakdown(customer)}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>View usage breakdown</p>
                      </TooltipContent>
                    </Tooltip>
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