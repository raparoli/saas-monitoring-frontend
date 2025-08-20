import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../ui/table';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Tooltip, TooltipContent, TooltipTrigger } from '../ui/tooltip';
import {
  BarChart3,
  PieChart as PieChartIcon,
  Search,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  Eye
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  PieChart,
  Pie,
  Cell,
  Legend
} from 'recharts';
import { Alert } from './types';
import { ALERTS_PER_PAGE, alertCategoryCount, alertTypeCount } from './constants';
import { getSeverityStats, getSeverityIcon, getSeverityColor, formatDateTime, getFilteredAlerts } from './utils';

interface AlertsTabProps {
  alertSeverityFilter: string;
  setAlertSeverityFilter: (value: string) => void;
  alertCategoryFilter: string;
  setAlertCategoryFilter: (value: string) => void;
  alertTypeFilter: string;
  setAlertTypeFilter: (value: string) => void;
  alertSearch: string;
  setAlertSearch: (value: string) => void;
  alertDateFrom?: Date;
  setAlertDateFrom: (value: Date | undefined) => void;
  alertDateTo?: Date;
  setAlertDateTo: (value: Date | undefined) => void;
  alertCurrentPage: number;
  setAlertCurrentPage: (value: number) => void;
  handleAlertRowClick: (alert: Alert) => void;
  handleAlertPageChange: (page: number) => void;
  alerts: Alert[];
}

export function AlertsTab({
  alertSeverityFilter,
  setAlertSeverityFilter,
  alertCategoryFilter,
  setAlertCategoryFilter,
  alertTypeFilter,
  setAlertTypeFilter,
  alertSearch,
  setAlertSearch,
  alertDateFrom,
  setAlertDateFrom,
  alertDateTo,
  setAlertDateTo,
  alertCurrentPage,
  setAlertCurrentPage,
  handleAlertRowClick,
  handleAlertPageChange,
  alerts
}: AlertsTabProps) {
  const filteredAlerts = getFilteredAlerts(alerts, alertSeverityFilter, alertCategoryFilter, alertTypeFilter, alertSearch, alertDateFrom, alertDateTo);
  
  const totalAlertPages = Math.ceil(filteredAlerts.length / ALERTS_PER_PAGE);
  const paginatedAlerts = filteredAlerts.slice(
    (alertCurrentPage - 1) * ALERTS_PER_PAGE,
    alertCurrentPage * ALERTS_PER_PAGE
  );

  return (
    <div className="space-y-6 mt-0">
      <div>
        <h3 className="text-lg font-semibold">Alerts Overview</h3>
        <p className="text-muted-foreground">Monitor and manage Acronis system alerts and notifications</p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        {getSeverityStats().map((severity, index) => {
          const SeverityIcon = getSeverityIcon(severity.name);
          return (
            <Card key={index} className="hover:shadow-md transition-shadow duration-200">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">{severity.name} Alerts</CardTitle>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <SeverityIcon className="h-4 w-4" style={{ color: severity.color }} />
                    </div>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>
                      {severity.name === 'Critical' && 'Require immediate attention'}
                      {severity.name === 'Error' && 'Indicate system failures'}
                      {severity.name === 'Warning' && 'Potential issues requiring monitoring'}
                      {severity.name === 'Info' && 'General information and notifications'}
                    </p>
                  </TooltipContent>
                </Tooltip>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold" style={{ color: severity.color }}>
                  {severity.value.toLocaleString()}
                </div>
                <p className="text-xs text-muted-foreground">{severity.percentage}% of total alerts</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <BarChart3 className="h-5 w-5" />
              <span>Alerts by Category</span>
            </CardTitle>
            <CardDescription>
              Distribution of alerts across different system categories
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={alertCategoryCount} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="name" type="category" width={80} fontSize={12} />
                <RechartsTooltip />
                <Bar dataKey="value" fill="hsl(var(--chart-1))">
                  {alertCategoryCount.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center space-x-2">
              <PieChartIcon className="h-5 w-5" />
              <span>Alerts by Type</span>
            </CardTitle>
            <CardDescription>
              Most common alert types and their frequencies
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={alertTypeCount}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  dataKey="value"
                  label={({ name, value }) => `${name}: ${value}`}
                >
                  {alertTypeCount.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <RechartsTooltip formatter={(value) => [`${value} alerts`, '']} />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Alert Filters</CardTitle>
          <CardDescription>Filter and search through alert data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-5">
            <Select value={alertSeverityFilter} onValueChange={setAlertSeverityFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by severity" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Severities</SelectItem>
                <SelectItem value="Critical">Critical</SelectItem>
                <SelectItem value="Error">Error</SelectItem>
                <SelectItem value="Warning">Warning</SelectItem>
                <SelectItem value="Info">Info</SelectItem>
              </SelectContent>
            </Select>

            <Select value={alertCategoryFilter} onValueChange={setAlertCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Backup">Backup</SelectItem>
                <SelectItem value="Email Security">Email Security</SelectItem>
                <SelectItem value="System">System</SelectItem>
                <SelectItem value="EDR">EDR</SelectItem>
                <SelectItem value="Network">Network</SelectItem>
              </SelectContent>
            </Select>

            <Select value={alertTypeFilter} onValueChange={setAlertTypeFilter}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Types</SelectItem>
                <SelectItem value="BackupFailed">BackupFailed</SelectItem>
                <SelectItem value="NoBackupForXDays">NoBackupForXDays</SelectItem>
                <SelectItem value="MalwareDetected">MalwareDetected</SelectItem>
                <SelectItem value="StorageFull">StorageFull</SelectItem>
                <SelectItem value="ConnectionLost">ConnectionLost</SelectItem>
                <SelectItem value="LicenseExpiring">LicenseExpiring</SelectItem>
              </SelectContent>
            </Select>

            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search resources/plans..."
                value={alertSearch}
                onChange={(e) => setAlertSearch(e.target.value)}
                className="pl-10"
              />
            </div>

            <Button variant="outline" onClick={() => {
              setAlertSeverityFilter('all');
              setAlertCategoryFilter('all');
              setAlertTypeFilter('all');
              setAlertSearch('');
              setAlertDateFrom(undefined);
              setAlertDateTo(undefined);
              setAlertCurrentPage(1);
            }}>
              <RefreshCw className="w-4 h-4 mr-1" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Alert Details</CardTitle>
              <CardDescription>
                Showing {paginatedAlerts.length} of {filteredAlerts.length} alerts (Page {alertCurrentPage} of {totalAlertPages})
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAlertPageChange(Math.max(1, alertCurrentPage - 1))}
                disabled={alertCurrentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground px-2">
                Page {alertCurrentPage} of {totalAlertPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAlertPageChange(Math.min(totalAlertPages, alertCurrentPage + 1))}
                disabled={alertCurrentPage === totalAlertPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert Type</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Plan Name</TableHead>
                <TableHead>Resource Name</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAlerts.map((alert) => (
                <TableRow 
                  key={alert.id} 
                  className="cursor-pointer hover:bg-muted/20"
                  onClick={() => handleAlertRowClick(alert)}
                >
                  <TableCell className="font-medium">{alert.type}</TableCell>
                  <TableCell>
                    <Badge variant="outline">{alert.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={getSeverityColor(alert.severity)}>
                      {alert.severity}
                    </Badge>
                  </TableCell>
                  <TableCell>{alert.planName}</TableCell>
                  <TableCell className="max-w-xs truncate">{alert.resourceName}</TableCell>
                  <TableCell>{formatDateTime(alert.createdDate)}</TableCell>
                  <TableCell onClick={(e) => e.stopPropagation()}>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleAlertRowClick(alert)}
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