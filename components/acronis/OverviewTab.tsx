import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Progress } from '../ui/progress';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import {
  Shield,
  Users,
  CheckCircle,
  Calendar as CalendarIcon,
  AlertTriangle,
  Info
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
  Legend
} from 'recharts';
import { 
  licenseData, 
  storageDistribution, 
  workloadUtilization, 
  topCustomers, 
  alertSeverityData 
} from './constants';
import { formatStorageGB } from './utils';

export function OverviewTab() {
  return (
    <div className="space-y-8 mt-0">
      {/* License Summary Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">License Summary</h2>
          <p className="text-muted-foreground">Current license allocation and utilization status</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-4">
          <div className="lg:col-span-3 grid gap-4 md:grid-cols-3">
            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Licenses</CardTitle>
                <Shield className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{licenseData.totalLicenses}</div>
                <p className="text-xs text-muted-foreground">{licenseData.licenseType}</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Used Licenses</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{licenseData.usedLicenses}</div>
                <p className="text-xs text-muted-foreground">{licenseData.utilizationPercentage}% utilization</p>
              </CardContent>
            </Card>

            <Card className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Available</CardTitle>
                <CheckCircle className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{licenseData.availableLicenses}</div>
                <p className="text-xs text-muted-foreground">Remaining licenses</p>
              </CardContent>
            </Card>
          </div>

          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle className="text-base">Contract Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">License Type</span>
                  <span className="font-medium">{licenseData.licenseType}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Renewal Date</span>
                  <div className="flex items-center space-x-1">
                    <CalendarIcon className="w-3 h-3 text-muted-foreground" />
                    <span className="font-medium">
                      {new Date(licenseData.renewalDate).toLocaleDateString('en-GB')}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Status</span>
                  <Badge variant="default">{licenseData.status}</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardContent className="p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-medium">License Utilization</h4>
                  <p className="text-sm text-muted-foreground">
                    {licenseData.usedLicenses} / {licenseData.totalLicenses} licenses in use
                  </p>
                </div>
                <Badge variant={licenseData.utilizationPercentage >= 90 ? 'destructive' : 'default'}>
                  {licenseData.utilizationPercentage}%
                </Badge>
              </div>
              <Progress value={licenseData.utilizationPercentage} className="h-3" />
              {licenseData.utilizationPercentage >= 90 && (
                <div className="flex items-center space-x-2 text-sm text-destructive">
                  <AlertTriangle className="w-4 h-4" />
                  <span>High utilization — consider purchasing additional licenses</span>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Usage Insights Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Usage Insights</h2>
          <p className="text-muted-foreground">Storage distribution and workload utilization overview</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Storage Distribution</CardTitle>
              <CardDescription>Local vs Cloud storage usage breakdown</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={storageDistribution}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    dataKey="value"
                    label={({ name, value }) => `${name}: ${value} TB`}
                  >
                    {storageDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip formatter={(value) => [`${value} TB`, '']} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
              <div className="mt-4 text-center">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div className="inline-flex items-center space-x-1 text-sm text-muted-foreground cursor-help">
                      <Info className="w-4 h-4" />
                      <span>Total Storage in Use: {(storageDistribution[0].value + storageDistribution[1].value).toFixed(2)} TB</span>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>Combined local and cloud storage utilization</p>
                  </TooltipContent>
                </Tooltip>
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-3">Workload Utilization</h3>
              <p className="text-sm text-muted-foreground mb-4">Current usage across different workload types</p>
            </div>
            
            <div className="space-y-3">
              {workloadUtilization.map((workload, index) => {
                const Icon = workload.icon;
                return (
                  <Card key={index} className="hover:shadow-sm transition-shadow">
                    <CardContent className="p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-primary/10 rounded-lg">
                            <Icon className="w-4 h-4 text-primary" />
                          </div>
                          <span className="font-medium">{workload.type}</span>
                        </div>
                        <Badge variant={workload.utilizationRate === 100 ? 'destructive' : 'default'}>
                          {workload.utilizationRate}%
                        </Badge>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                          <span className="text-muted-foreground">Usage</span>
                          <span>{workload.used} / {workload.quota}</span>
                        </div>
                        <Tooltip>
                          <TooltipTrigger asChild>
                            <div>
                              <Progress value={workload.utilizationRate} className="h-2 cursor-help" />
                            </div>
                          </TooltipTrigger>
                          <TooltipContent>
                            <p>{workload.utilizationRate === 100 ? 'Fully utilized' : `${workload.utilizationRate}% utilized`}</p>
                          </TooltipContent>
                        </Tooltip>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Customer & Alert Snapshot Section */}
      <div className="space-y-6">
        <div>
          <h2 className="text-lg font-semibold mb-2">Customer & Alert Snapshot</h2>
          <p className="text-muted-foreground">Top customers and alert severity overview</p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle>Top 3 Customers by Local Storage</CardTitle>
              <CardDescription>Customers with highest storage utilization</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {topCustomers.map((customer, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-muted/20 rounded-lg">
                    <div className="flex-1">
                      <p className="font-medium text-sm">{customer.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {customer.protectedWorkloads} protected workload{customer.protectedWorkloads !== 1 ? 's' : ''}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-sm">{formatStorageGB(customer.localStorageGB)}</p>
                      <p className="text-xs text-muted-foreground">local storage</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alert Summary</CardTitle>
              <CardDescription>Alert distribution by severity level</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={240}>
                <BarChart data={alertSeverityData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="name" type="category" width={60} />
                  <RechartsTooltip />
                  <Bar dataKey="value" fill="hsl(var(--chart-1))">
                    {alertSeverityData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
              <div className="mt-4 grid grid-cols-2 gap-2 text-xs">
                {alertSeverityData.map((alert, index) => (
                  <div key={index} className="flex items-center space-x-2">
                    <div 
                      className="w-3 h-3 rounded"
                      style={{ backgroundColor: alert.color }}
                    />
                    <span className="text-muted-foreground">{alert.name}: {alert.value.toLocaleString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}