import React, { useState, useMemo } from 'react';
import { useApi } from '../../../shared/hooks/useApi';
import { alertsService } from '../services/alertsService';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../../../shared/components/ui/card';
import { Button } from '../../../shared/components/ui/button';
import { Badge } from '../../../shared/components/ui/badge';
import { Input } from '../../../shared/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../shared/components/ui/select';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../../../shared/components/ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '../../../shared/components/ui/dialog';
import { ScrollArea } from '../../../shared/components/ui/scroll-area';
import { Separator } from '../../../shared/components/ui/separator';
import {
  Mail,
  CheckCircle,
  XCircle,
  Eye,
  Download,
  ChevronLeft,
  ChevronRight,
  MailCheck,
  AlertCircle,
  TrendingUp,
  BarChart3,
  AlertTriangle,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';
import { AlertEmailLog } from '../../../shared/types';
import { 
  formatDateTime,
  getSeverityBadgeVariant,
  getEmailStatusColor,
  getProductBadgeColor
} from '../../../shared/utils';
import { getStatusIcon } from '../../../shared/utils/iconHelpers';

export function AlertManagementPage() {
  // State management
  const [searchTerm, setSearchTerm] = useState('');
  const [severityFilter, setSeverityFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [emailStatusFilter, setEmailStatusFilter] = useState('all');
  const [productFilter, setProductFilter] = useState('all');
  const [dateRangeFilter, setDateRangeFilter] = useState('7days');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedAlert, setSelectedAlert] = useState<AlertEmailLog | null>(null);
  const [isAlertModalOpen, setIsAlertModalOpen] = useState(false);

  // API integration
  const { data: alertsData, loading, error, refetch } = useApi(
    alertsService.getAlertEmailLogs,
    { immediate: true }
  );

  // Ensure safe array
  const alerts = (alertsData && Array.isArray(alertsData)) ? alertsData : [];
  const itemsPerPage = 10;

  // Filtered data
  const filteredAlerts = useMemo(() => {
    return (alerts || []).filter(alert => {
      if (!alert || typeof alert !== 'object' || alert === null) return false;
      const matchesSearch = 
        (alert.customerName || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
        (alert.resourceName || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
        (alert.alertId || '').toLowerCase().includes((searchTerm || '').toLowerCase()) ||
        (alert.productName || '').toLowerCase().includes((searchTerm || '').toLowerCase());
      
      const matchesSeverity = severityFilter === 'all' || (alert.severity || '') === severityFilter;
      const matchesCategory = categoryFilter === 'all' || (alert.category || '') === categoryFilter;
      const matchesEmailStatus = emailStatusFilter === 'all' || (alert.emailStatus || '') === emailStatusFilter;
      const matchesProduct = productFilter === 'all' || (alert.productName || '') === productFilter;

      return matchesSearch && matchesSeverity && matchesCategory && matchesEmailStatus && matchesProduct;
    });
  }, [alerts, searchTerm, severityFilter, categoryFilter, emailStatusFilter, productFilter]);

  // Pagination
  const totalPages = Math.ceil((filteredAlerts || []).length / itemsPerPage);
  const paginatedAlerts = (filteredAlerts || []).slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Summary statistics
  const summaryStats = useMemo(() => {
    const alertsArray = (alerts && Array.isArray(alerts)) ? alerts : [];
    const totalEmailed = alertsArray.length;
    const failedEmails = alertsArray.filter(a => a && typeof a === 'object' && a !== null && (a.emailStatus || '') === 'Failed').length;
    const criticalSent = alertsArray.filter(a => a && typeof a === 'object' && a !== null && (a.severity || '') === 'Critical' && (a.emailStatus || '') === 'Sent').length;
    
    // Most common alert type
    const alertTypeCounts = alertsArray.reduce((acc, alert) => {
      if (alert && typeof alert === 'object' && alert !== null && alert.alertType) {
        acc[alert.alertType] = (acc[alert.alertType] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    const mostCommonAlertType = Object.entries(alertTypeCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

    // Most affected category
    const categoryCounts = alertsArray.reduce((acc, alert) => {
      if (alert && typeof alert === 'object' && alert !== null && alert.category) {
        acc[alert.category] = (acc[alert.category] || 0) + 1;
      }
      return acc;
    }, {} as Record<string, number>);
    const mostAffectedCategory = Object.entries(categoryCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

    return {
      totalEmailed,
      failedEmails,
      criticalSent,
      mostCommonAlertType,
      mostAffectedCategory
    };
  }, [alerts]);

  const handleViewDetails = (alert: AlertEmailLog) => {
    setSelectedAlert(alert);
    setIsAlertModalOpen(true);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleResetFilters = () => {
    setSearchTerm('');
    setSeverityFilter('all');
    setCategoryFilter('all');
    setEmailStatusFilter('all');
    setProductFilter('all');
    setDateRangeFilter('7days');
    setCurrentPage(1);
    refetch();
  };

  return (
    <div className="flex-1 p-6 space-y-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
      {/* Header */}
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg">
            <Mail className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">Alert Management</h1>
            <p className="text-muted-foreground">
              Track and manage email alerts sent to customers across your SaaS monitoring platform
            </p>
          </div>
        </div>
      </div>

      {/* Summary Statistics */}
      <div className="grid gap-6 md:grid-cols-5">
        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100 to-blue-100 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Total Alerts Emailed</p>
                <span className="text-2xl font-bold">{summaryStats.totalEmailed.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-blue-100 to-blue-100 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <MailCheck className="h-6 w-6 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-red-100 to-red-100 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Failed Emails</p>
                <span className="text-2xl font-bold">{summaryStats.failedEmails}</span>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-red-100 to-red-100 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-orange-100 to-orange-100 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Critical Alerts Sent</p>
                <span className="text-2xl font-bold">{summaryStats.criticalSent.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-100 to-orange-100 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <AlertCircle className="h-6 w-6 text-orange-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-100 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Most Emailed Alert</p>
                <span className="text-2xl font-bold">{summaryStats.mostCommonAlertType}</span>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-purple-100 to-purple-100 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <TrendingUp className="h-6 w-6 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group">
          <div className="absolute inset-0 bg-gradient-to-br from-green-100 to-green-100 opacity-5 group-hover:opacity-10 transition-opacity duration-300" />
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div className="space-y-2">
                <p className="text-sm font-medium text-muted-foreground">Most Affected Category</p>
                <span className="text-2xl font-bold">{summaryStats.mostAffectedCategory}</span>
              </div>
              <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-green-100 to-green-100 rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300">
                <BarChart3 className="h-6 w-6 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filter Controls */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter Controls</span>
          </CardTitle>
          <CardDescription>
            Filter and search through data
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-4 lg:space-y-0 lg:space-x-4">
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 flex-1">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search by Customer, Product, Resource, or Alert ID"
                  value={searchTerm || ''}
                  onChange={(e) => setSearchTerm(e.target.value || '')}
                  className="pl-10 bg-white shadow-sm"
                />
              </div>
              
              <Select value={dateRangeFilter || '7days'} onValueChange={setDateRangeFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-white shadow-sm">
                  <SelectValue placeholder="Date Range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1day">Last 24 Hours</SelectItem>
                  <SelectItem value="7days">Last 7 Days</SelectItem>
                  <SelectItem value="30days">Last 30 Days</SelectItem>
                  <SelectItem value="90days">Last 90 Days</SelectItem>
                </SelectContent>
              </Select>

              <Select value={productFilter || 'all'} onValueChange={setProductFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-white shadow-sm">
                  <SelectValue placeholder="Product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Products</SelectItem>
                  <SelectItem value="Acronis">Acronis</SelectItem>
                  <SelectItem value="Microsoft">Microsoft</SelectItem>
                  <SelectItem value="Bitdefender">Bitdefender</SelectItem>
                  <SelectItem value="Zoho">Zoho</SelectItem>
                </SelectContent>
              </Select>

              <Select value={severityFilter || 'all'} onValueChange={setSeverityFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-white shadow-sm">
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

              <Select value={emailStatusFilter || 'all'} onValueChange={setEmailStatusFilter}>
                <SelectTrigger className="w-full sm:w-48 bg-white shadow-sm">
                  <SelectValue placeholder="Email Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Statuses</SelectItem>
                  <SelectItem value="Sent">Sent</SelectItem>
                  <SelectItem value="Failed">Failed</SelectItem>
                  <SelectItem value="Pending">Pending</SelectItem>
                </SelectContent>
              </Select>
            </div>
            
            <div className="flex items-center space-x-2">
              <Button variant="outline" onClick={handleResetFilters}>
                <RefreshCw className="w-4 h-4 mr-2" />
                Reset
              </Button>
              <Button variant="outline" onClick={refetch} disabled={loading}>
                <RefreshCw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Loading and Error States */}
      {loading && (
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6 text-center">
            <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
            <p>Loading alerts...</p>
          </CardContent>
        </Card>
      )}

      {error && (
        <Card className="border-0 shadow-lg border-red-200 bg-red-50">
          <CardContent className="p-6 text-center">
            <p className="text-red-600">Error loading alerts: {error}</p>
            <Button variant="outline" onClick={refetch} className="mt-2">
              Try Again
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Main Content Area */}
      {!loading && !error && (
        <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Alert Email Log</CardTitle>
              <CardDescription>
                Showing {(paginatedAlerts || []).length} of {(filteredAlerts || []).length} alert email records
              </CardDescription>
            </div>
            <div className="flex items-center space-x-2">
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                Export CSV
              </Button>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Alert ID</TableHead>
                  <TableHead>Product</TableHead>
                  <TableHead>Severity</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Alert Type</TableHead>
                  <TableHead>Customer Name</TableHead>
                  <TableHead>Resource Name</TableHead>
                  <TableHead>Email Sent At</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {(paginatedAlerts || []).map((alert) => {
                  if (!alert || typeof alert !== 'object' || alert === null) return null;
                  const StatusIcon = getStatusIcon(alert.emailStatus || '');
                  return (
                    <TableRow 
                      key={alert.id} 
                      className="cursor-pointer hover:bg-muted/20"
                      onClick={() => handleViewDetails(alert)}
                    >
                      <TableCell className="font-mono text-sm">
                        {alert.alertId || 'Unknown'}
                      </TableCell>
                      <TableCell>
                        <Badge className={getProductBadgeColor(alert.productName || '')}>
                          {alert.productName || 'Unknown'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getSeverityBadgeVariant(alert.severity || '')}>
                          {alert.severity || 'Unknown'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{alert.category || 'Unknown'}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {alert.alertType || 'Unknown'}
                      </TableCell>
                      <TableCell>{alert.customerName || 'Unknown'}</TableCell>
                      <TableCell className="max-w-xs truncate font-mono text-sm">
                        {alert.resourceName || 'Unknown'}
                      </TableCell>
                      <TableCell className="text-sm">
                        {alert.emailSentAt ? formatDateTime(alert.emailSentAt) : 'Unknown'}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <StatusIcon className="w-4 h-4" />
                          <Badge className={getEmailStatusColor(alert.emailStatus || '')}>
                            {alert.emailStatus || 'Unknown'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell onClick={(e) => e.stopPropagation()}>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleViewDetails(alert)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          View Details
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between p-4 border-t">
            <div className="text-sm text-muted-foreground">
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, (filteredAlerts || []).length)} of {(filteredAlerts || []).length} results
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                <ChevronLeft className="w-4 h-4" />
              </Button>
              <span className="text-sm text-muted-foreground px-2">
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                <ChevronRight className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
      )}

      {/* Alert Details Modal */}
      <Dialog open={isAlertModalOpen} onOpenChange={setIsAlertModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Alert Email Details</span>
            </DialogTitle>
            <DialogDescription>
              Comprehensive information about alert #{selectedAlert?.alertId || 'Unknown'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedAlert && typeof selectedAlert === 'object' && (
            <ScrollArea className="max-h-[60vh] pr-6">
              <div className="space-y-6">
                {/* Alert Overview */}
                <Card>
                  <CardHeader>
                    <CardTitle>Alert Overview</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Alert ID</p>
                          <p className="font-mono">{selectedAlert.alertId || 'Unknown'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Product</p>
                          <Badge className={getProductBadgeColor(selectedAlert.productName || '')}>
                            {selectedAlert.productName || 'Unknown'}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Severity</p>
                          <Badge variant={getSeverityBadgeVariant(selectedAlert.severity || '')}>
                            {selectedAlert.severity || 'Unknown'}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Category</p>
                          <Badge variant="outline">{selectedAlert.category || 'Unknown'}</Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Alert Type</p>
                          <p>{selectedAlert.alertType || 'Unknown'}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Customer</p>
                          <p>{selectedAlert.customerName || 'Unknown'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                          <p className="font-mono text-sm">{selectedAlert.customerEmail || 'Unknown'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Resource</p>
                          <p className="font-mono text-sm">{selectedAlert.resourceName || 'Unknown'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Plan</p>
                          <p>{selectedAlert.planName || 'Unknown'}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Email Details */}
                <Card>
                  <CardHeader>
                    <CardTitle>Email Delivery Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4 md:grid-cols-2">
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Email Sent At</p>
                          <p>{selectedAlert.emailSentAt ? formatDateTime(selectedAlert.emailSentAt) : 'Unknown'}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Delivery Status</p>
                          <div className="flex items-center space-x-2">
                            <Badge className={getEmailStatusColor(selectedAlert.emailStatus || '')}>
                              {selectedAlert.emailStatus || 'Unknown'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Delivery Attempts</p>
                          <p>{selectedAlert.deliveryAttempts || 0}</p>
                        </div>
                        {selectedAlert.lastAttempt && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Last Attempt</p>
                            <p>{selectedAlert.lastAttempt ? formatDateTime(selectedAlert.lastAttempt) : 'Unknown'}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {selectedAlert.errorMessage && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm font-medium text-red-800">Error Message</p>
                        <p className="text-sm text-red-700 mt-1">{selectedAlert.errorMessage || 'No error details'}</p>
                      </div>
                    )}
                  </CardContent>
                </Card>

                {/* Alert Message */}
                <Card>
                  <CardHeader>
                    <CardTitle>Alert Message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="p-4 bg-gray-50 rounded-lg">
                      <p className="text-sm">{selectedAlert.message || 'No message available'}</p>
                    </div>
                  </CardContent>
                </Card>

                {/* Actions */}
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold">Available Actions</h3>
                        <p className="text-sm text-muted-foreground">
                          Manage this alert email record
                        </p>
                      </div>
                      <div className="flex items-center space-x-3">
                        {(selectedAlert.emailStatus || '') === 'Failed' && (
                          <Button size="sm">
                            <Mail className="w-4 h-4 mr-2" />
                            Resend Email
                          </Button>
                        )}
                        <Button variant="outline" size="sm">
                          <Download className="w-4 h-4 mr-2" />
                          Export Details
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </ScrollArea>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}