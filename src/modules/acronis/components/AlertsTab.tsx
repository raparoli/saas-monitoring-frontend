import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Badge } from '../../../shared/components/ui/badge';
import { Input } from '../../../shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/ui/table';
import { Tooltip, TooltipContent, TooltipTrigger } from '../../../shared/components/ui/tooltip';
import { Search, Filter, Eye, ChevronLeft, ChevronRight } from 'lucide-react';
import { Alert } from '../types';
import { getFilteredAlerts, formatDateTime, getSeverityColor, getSeverityIcon } from '../utils';

interface AlertsTabProps {
  alertSeverityFilter: string;
  setAlertSeverityFilter: (filter: string) => void;
  alertCategoryFilter: string;
  setAlertCategoryFilter: (filter: string) => void;
  alertTypeFilter: string;
  setAlertTypeFilter: (filter: string) => void;
  alertSearch: string;
  setAlertSearch: (search: string) => void;
  alertDateFrom: Date | undefined;
  setAlertDateFrom: (date: Date | undefined) => void;
  alertDateTo: Date | undefined;
  setAlertDateTo: (date: Date | undefined) => void;
  alertCurrentPage: number;
  setAlertCurrentPage: (page: number) => void;
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
  const ALERTS_PER_PAGE = 10;

  const filteredAlerts = getFilteredAlerts(
    alerts,
    alertSeverityFilter,
    alertCategoryFilter,
    alertTypeFilter,
    alertSearch,
    alertDateFrom,
    alertDateTo
  );

  const totalPages = Math.ceil(filteredAlerts.length / ALERTS_PER_PAGE);
  const paginatedAlerts = filteredAlerts.slice(
    (alertCurrentPage - 1) * ALERTS_PER_PAGE,
    alertCurrentPage * ALERTS_PER_PAGE
  );

  return (
    <div className="space-y-6 mt-0">
      <div>
        <h3 className="text-lg font-semibold">Alert Management</h3>
        <p className="text-muted-foreground">Monitor and manage all alerts from Acronis Cyber Protect</p>
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
                  placeholder="Search alerts..."
                  value={alertSearch}
                  onChange={(e) => setAlertSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
              
              <Select value={alertSeverityFilter} onValueChange={setAlertSeverityFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Severity" />
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
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="Backup">Backup</SelectItem>
                  <SelectItem value="EDR">EDR</SelectItem>
                  <SelectItem value="System">System</SelectItem>
                  <SelectItem value="Network">Network</SelectItem>
                </SelectContent>
              </Select>

              <Select value={alertTypeFilter} onValueChange={setAlertTypeFilter}>
                <SelectTrigger className="w-full sm:w-48">
                  <SelectValue placeholder="Alert Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="BackupDidNotStart">Backup Failed</SelectItem>
                  <SelectItem value="NoBackupForXDays">No Backup</SelectItem>
                  <SelectItem value="MalwareDetected">Malware</SelectItem>
                  <SelectItem value="StorageFull">Storage Full</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Alerts ({filteredAlerts.length})</CardTitle>
          <CardDescription>Click on any alert to view detailed information</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Alert Type</TableHead>
                <TableHead>Severity</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Plan Name</TableHead>
                <TableHead>Resource Name</TableHead>
                <TableHead>Created Date</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {paginatedAlerts.map((alert) => {
                const SeverityIcon = getSeverityIcon(alert.severity);
                return (
                  <TableRow 
                    key={alert.id} 
                    className="cursor-pointer hover:bg-muted/50"
                    onClick={() => handleAlertRowClick(alert)}
                  >
                    <TableCell className="font-medium">{alert.type}</TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-2">
                        <SeverityIcon className="w-4 h-4" />
                        <Badge variant={getSeverityColor(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline">{alert.category}</Badge>
                    </TableCell>
                    <TableCell className="font-mono text-sm">{alert.planName}</TableCell>
                    <TableCell className="max-w-xs truncate">{alert.resourceName}</TableCell>
                    <TableCell className="text-sm">{formatDateTime(alert.createdDate)}</TableCell>
                    <TableCell onClick={(e) => e.stopPropagation()}>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleAlertRowClick(alert)}
                          >
                            <Eye className="w-4 h-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View alert details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="flex items-center justify-between mt-4">
            <div className="text-sm text-muted-foreground">
              Showing {((alertCurrentPage - 1) * ALERTS_PER_PAGE) + 1} to {Math.min(alertCurrentPage * ALERTS_PER_PAGE, filteredAlerts.length)} of {filteredAlerts.length} results
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
                Page {alertCurrentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handleAlertPageChange(Math.min(totalPages, alertCurrentPage + 1))}
                disabled={alertCurrentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}