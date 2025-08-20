import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Badge } from '../../../shared/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../shared/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/ui/table';
import { Progress } from '../../../shared/components/ui/progress';
import { ArrowLeft, Cloud, Shield, Calendar, Users, Activity, AlertTriangle } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { ProductDetail } from '../../../shared/types';

// Helper function for severity badge variant
function getSeverityBadgeVariant(severity: string) {
  switch (severity) {
    case 'warning': return 'secondary';
    case 'info': return 'default';
    default: return 'secondary';
  }
}

interface ProductDetailPageProps {
  product: ProductDetail;
  onBack: () => void;
}

export function ProductDetailPage({ product, onBack }: ProductDetailPageProps) {
  const [activeTab, setActiveTab] = useState('overview');

  // Ensure product exists and has required properties
  if (!product || typeof product !== 'object') {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold mb-2">Product Not Found</h2>
          <p className="text-muted-foreground mb-4">The requested product could not be loaded.</p>
          <Button onClick={onBack}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  // Mock data for charts and tables
  const usageOverTime = [
    { month: 'Jan', usage: 420 },
    { month: 'Feb', usage: 435 },
    { month: 'Mar', usage: 450 },
    { month: 'Apr', usage: 465 },
    { month: 'May', usage: 470 },
    { month: 'Jun', usage: 475 },
  ];

  const licenseDistribution = [
    { name: 'Used', value: product.usedLicenses || 0, color: 'hsl(var(--primary))' },
    { name: 'Available', value: (product.totalLicenses || 0) - (product.usedLicenses || 0), color: 'hsl(var(--muted))' },
  ];

  const alerts = [
    {
      id: 1,
      type: 'License Usage',
      message: 'License utilization approaching 95%',
      severity: 'warning',
      date: '2024-08-05',
    },
    {
      id: 2,
      type: 'Renewal Notice',
      message: 'Contract renewal required in 30 days',
      severity: 'info',
      date: '2024-08-03',
    }
  ];

  const users = [
    { id: 1, name: 'John Doe', email: 'john@company.com', department: 'Engineering', lastActive: '2024-08-08', status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@company.com', department: 'Marketing', lastActive: '2024-08-07', status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@company.com', department: 'Sales', lastActive: '2024-08-06', status: 'Inactive' },
    { id: 4, name: 'Sarah Wilson', email: 'sarah@company.com', department: 'HR', lastActive: '2024-08-08', status: 'Active' },
    { id: 5, name: 'Tom Brown', email: 'tom@company.com', department: 'Finance', lastActive: '2024-08-05', status: 'Active' },
  ];

  const usagePercentage = Math.round(((product.usedLicenses || 0) / (product.totalLicenses || 1)) * 100);
  const availableLicenses = (product.totalLicenses || 0) - (product.usedLicenses || 0);

  return (
    <div className="flex-1 p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="outline" size="sm" onClick={onBack}>
          <ArrowLeft className="w-4 h-4 mr-1" />
          Back
        </Button>
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-primary/10 rounded-lg">
            {(product.name || '').includes('Microsoft') ? (
              <Cloud className="w-6 h-6 text-primary" />
            ) : (
              <Shield className="w-6 h-6 text-primary" />
            )}
          </div>
          <div>
            <h1 className="text-3xl font-semibold">{product.name || 'Unknown Product'}</h1>
            <p className="text-muted-foreground">{product.licenseType || 'Unknown License Type'}</p>
          </div>
        </div>
        <Badge variant="default" className="ml-auto">
          {product.status || 'Unknown'}
        </Badge>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="usage">Usage</TabsTrigger>
          <TabsTrigger value="alerts">Alerts</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-3">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Licenses</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{product.totalLicenses || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {product.licenseType || 'Unknown Type'}
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Used Licenses</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{product.usedLicenses || 0}</div>
                <p className="text-xs text-muted-foreground">
                  {usagePercentage}% utilization
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available</CardTitle>
                <Activity className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{availableLicenses}</div>
                <p className="text-xs text-muted-foreground">
                  Remaining licenses
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>License Utilization</CardTitle>
                <CardDescription>Current license usage breakdown</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Used</span>
                    <span className="text-sm font-medium">{product.usedLicenses || 0}/{product.totalLicenses || 0}</span>
                  </div>
                  <Progress value={usagePercentage} className="h-2" />
                </div>
                <div className="text-sm text-muted-foreground">
                  {usagePercentage >= 90 && (
                    <div className="flex items-center space-x-1 text-destructive">
                      <AlertTriangle className="w-4 h-4" />
                      <span>High utilization - consider purchasing additional licenses</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Contract Information</CardTitle>
                <CardDescription>License and renewal details</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">License Type</span>
                    <span className="text-sm font-medium">{product.licenseType || 'Unknown'}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Renewal Date</span>
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm font-medium">
                        {product.renewalDate ? new Date(product.renewalDate).toLocaleDateString() : 'Unknown'}
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm text-muted-foreground">Status</span>
                    <Badge variant="default">{product.status || 'Unknown'}</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Usage Tab */}
        <TabsContent value="usage" className="space-y-6">
          <div className="grid gap-6 md:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle>Usage Trend</CardTitle>
                <CardDescription>License usage over the past 6 months</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={usageOverTime}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="usage" 
                      stroke="hsl(var(--primary))" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>License Distribution</CardTitle>
                <CardDescription>Current allocation of licenses</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={licenseDistribution}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label={({ name, value }) => `${name}: ${value}`}
                    >
                      {licenseDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Alerts Tab */}
        <TabsContent value="alerts" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Alerts</CardTitle>
              <CardDescription>Notifications and warnings for this product</CardDescription>
            </CardHeader>
            <CardContent>
              {alerts.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Type</TableHead>
                      <TableHead>Message</TableHead>
                      <TableHead>Severity</TableHead>
                      <TableHead>Date</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {alerts.map((alert) => (
                      <TableRow key={alert.id}>
                        <TableCell className="font-medium">{alert.type}</TableCell>
                        <TableCell>{alert.message}</TableCell>
                        <TableCell>
                          <Badge variant={getSeverityBadgeVariant(alert.severity)}>
                            {alert.severity}
                          </Badge>
                        </TableCell>
                        <TableCell>{new Date(alert.date).toLocaleDateString()}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <div className="text-center py-8 text-muted-foreground">
                  No alerts for this product
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Assigned Users</CardTitle>
              <CardDescription>Users with access to this product</CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Department</TableHead>
                    <TableHead>Last Active</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.department}</TableCell>
                      <TableCell>{new Date(user.lastActive).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                          {user.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}