import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../shared/components/ui/card';
import { Button } from '../../shared/components/ui/button';
import { Badge } from '../../shared/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../shared/components/ui/table';
import { Input } from '../../shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../shared/components/ui/select';
import { Switch } from '../../shared/components/ui/switch';
import { Label } from '../../shared/components/ui/label';
import {
  Users,
  Database,
  HardDrive,
  Search,
  Eye,
  SortAsc,
  SortDesc
} from 'lucide-react';
import { Customer, SortField, SortDirection } from './types';
import { customers } from './constants';
import { formatStorageGB, formatDate, getFilteredCustomers, getSortedCustomers } from './utils';

interface CustomersTabProps {
  customerSearch: string;
  setCustomerSearch: (value: string) => void;
  storageFilter: string;
  setStorageFilter: (value: string) => void;
  showDisabledCustomers: boolean;
  setShowDisabledCustomers: (value: boolean) => void;
  sortField: SortField;
  sortDirection: SortDirection;
  handleSort: (field: SortField) => void;
  getSortIcon: (field: SortField) => React.ReactNode;
  handleCustomerRowClick: (customer: Customer) => void;
}

export function CustomersTab({
  customerSearch,
  setCustomerSearch,
  storageFilter,
  setStorageFilter,
  showDisabledCustomers,
  setShowDisabledCustomers,
  sortField,
  sortDirection,
  handleSort,
  getSortIcon,
  handleCustomerRowClick
}: CustomersTabProps) {
  const filteredCustomers = getFilteredCustomers(customers, customerSearch, storageFilter, showDisabledCustomers);
  const sortedCustomers = getSortedCustomers(filteredCustomers, sortField, sortDirection);

  // Calculate stats
  const totalCustomers = customers.length;
  const avgStoragePerCustomer = Math.round(customers.reduce((sum, customer) => sum + customer.local_storageInGB, 0) / customers.length);
  const highStorageCustomers = customers.filter(customer => customer.local_storageInGB > 5000).length;

  return (
    <div className="space-y-6 mt-0">
      <div>
        <h3 className="text-lg font-semibold">Customer Overview</h3>
        <p className="text-muted-foreground">Manage and monitor Acronis customers and their backup status</p>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Customers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalCustomers}</div>
            <p className="text-xs text-muted-foreground">Active and inactive customers</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg Storage per Customer</CardTitle>
            <Database className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{formatStorageGB(avgStoragePerCustomer)}</div>
            <p className="text-xs text-muted-foreground">Average storage utilization</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Customers Using {">"}5 TB</CardTitle>
            <HardDrive className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{highStorageCustomers}</div>
            <p className="text-xs text-muted-foreground">High storage usage customers</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filters & Search</CardTitle>
          <CardDescription>Filter and search through customer data</CardDescription>
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

            <Select value={storageFilter} onValueChange={setStorageFilter}>
              <SelectTrigger className="w-full sm:w-64">
                <SelectValue placeholder="Filter by storage usage" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All storage sizes</SelectItem>
                <SelectItem value="1000">Show customers with {">"}1 GB</SelectItem>
                <SelectItem value="5000">Show customers with {">"}5 GB</SelectItem>
                <SelectItem value="10000">Show customers with {">"}10 GB</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex items-center space-x-2">
              <Switch
                id="show-disabled"
                checked={showDisabledCustomers}
                onCheckedChange={setShowDisabledCustomers}
              />
              <Label htmlFor="show-disabled" className="text-sm">Show disabled customers</Label>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Data</CardTitle>
          <CardDescription>
            Showing {sortedCustomers.length} of {customers.length} customers
          </CardDescription>
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
                    <span>Protected Workloads</span>
                    {getSortIcon('total_protected_workloads')}
                  </div>
                </TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('local_storageInGB')}>
                  <div className="flex items-center space-x-1">
                    <span>Local Storage</span>
                    {getSortIcon('local_storageInGB')}
                  </div>
                </TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="cursor-pointer" onClick={() => handleSort('created_at')}>
                  <div className="flex items-center space-x-1">
                    <span>Created At</span>
                    {getSortIcon('created_at')}
                  </div>
                </TableHead>
                <TableHead>Renewal Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {sortedCustomers.map((customer) => (
                <TableRow 
                  key={customer.id} 
                  className="cursor-pointer hover:bg-muted/20" 
                  onClick={() => handleCustomerRowClick(customer)}
                >
                  <TableCell className="font-medium">{customer.name}</TableCell>
                  <TableCell>{customer.total_protected_workloads}</TableCell>
                  <TableCell>{formatStorageGB(customer.local_storageInGB)}</TableCell>
                  <TableCell>
                    <Badge variant={customer.enabled ? 'default' : 'secondary'}>
                      {customer.enabled ? 'Enabled' : 'Disabled'}
                    </Badge>
                  </TableCell>
                  <TableCell>{formatDate(customer.created_at)}</TableCell>
                  <TableCell>{formatDate(customer.production_start_date)}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleCustomerRowClick(customer)}
                    >
                      <Eye className="w-4 h-4 mr-1" />
                      View Details
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