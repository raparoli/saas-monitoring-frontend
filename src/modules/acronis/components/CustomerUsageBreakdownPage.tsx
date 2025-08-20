import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Badge } from '../../../shared/components/ui/badge';
import { Input } from '../../../shared/components/ui/input';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/ui/table';
import { Progress } from '../../../shared/components/ui/progress';
import { ArrowLeft, Users, HardDrive, Search, Filter } from 'lucide-react';
import { customers } from '../constants';
import { formatStorageGB, getUtilizationColor } from '../utils';

interface CustomerUsageBreakdownPageProps {
  onBack: () => void;
}

export function CustomerUsageBreakdownPage({ onBack }: CustomerUsageBreakdownPageProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCustomers = customers.filter(customer => 
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex-1 p-6 space-y-6">
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Customer Usage Breakdown</h1>
          <p className="text-muted-foreground">Detailed usage analysis for all customers</p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Search Customers</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Customer Usage Details</CardTitle>
          <CardDescription>Storage and workload utilization by customer</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Customer Name</TableHead>
                <TableHead>Protected Workloads</TableHead>
                <TableHead>Local Storage</TableHead>
                <TableHead>Utilization Rate</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredCustomers.map((customer) => (
                <TableRow key={customer.id}>
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
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}