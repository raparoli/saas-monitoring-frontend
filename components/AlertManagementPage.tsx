import React, { useState, useMemo } from 'react';
import { MOCK_ALERT_EMAIL_LOGS } from '../src/data/mockAlertData';
import { AlertEmailLog } from '../src/types';
import { getSeverityBadgeVariant, getEmailStatusColor, getProductBadgeColor } from '../src/utils/badge-variants';
import { getStatusIcon } from '../src/utils/icons';
import { formatDateTime } from '../src/utils/formatters';
import { PageHeader } from '../src/components/common/PageHeader';
import { StatCard } from '../src/components/common/StatCard';
import { SearchAndFilter } from '../src/components/common/SearchAndFilter';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Separator } from './ui/separator';
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
  BarChart3
} from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('table');

  const itemsPerPage = 10;

  // Filtered data
  const filteredAlerts = useMemo(() => {
    return MOCK_ALERT_EMAIL_LOGS.filter(alert => {
      const matchesSearch = 
        alert.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.resourceName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.alertId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        alert.productName.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesSeverity = severityFilter === 'all' || alert.severity === severityFilter;
      const matchesCategory = categoryFilter === 'all' || alert.category === categoryFilter;
      const matchesEmailStatus = emailStatusFilter === 'all' || alert.emailStatus === emailStatusFilter;
      const matchesProduct = productFilter === 'all' || alert.productName === productFilter;

      return matchesSearch && matchesSeverity && matchesCategory && matchesEmailStatus && matchesProduct;
    });
  }, [searchTerm, severityFilter, categoryFilter, emailStatusFilter, productFilter]);

  // Pagination
  const totalPages = Math.ceil(filteredAlerts.length / itemsPerPage);
  const paginatedAlerts = filteredAlerts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  // Summary statistics
  const summaryStats = useMemo(() => {
    const totalEmailed = MOCK_ALERT_EMAIL_LOGS.length;
    const failedEmails = MOCK_ALERT_EMAIL_LOGS.filter(a => a.emailStatus === 'Failed').length;
    const criticalSent = MOCK_ALERT_EMAIL_LOGS.filter(a => a.severity === 'Critical' && a.emailStatus === 'Sent').length;
    
    // Most common alert type
    const alertTypeCounts = MOCK_ALERT_EMAIL_LOGS.reduce((acc, alert) => {
      acc[alert.alertType] = (acc[alert.alertType] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const mostCommonAlertType = Object.entries(alertTypeCounts)
      .sort(([,a], [,b]) => b - a)[0]?.[0] || 'N/A';

    // Most affected category
    const categoryCounts = MOCK_ALERT_EMAIL_LOGS.reduce((acc, alert) => {
      acc[alert.category] = (acc[alert.category] || 0) + 1;
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
  }, []);

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
  };

  return (
    <div className="flex-1 p-6 space-y-8 bg-gradient-to-br from-slate-50 via-white to-blue-50 min-h-screen">
      {/* Header */}
      <PageHeader
        icon={Mail}
        title="Alert Management"
        description="Track and manage email alerts sent to customers across your SaaS monitoring platform"
        iconGradient="from-blue-500 to-purple-600"
      />

      {/* Summary Statistics */}
      <div className="grid gap-6 md:grid-cols-5">
        <StatCard
          title="Total Alerts Emailed"
          value={summaryStats.totalEmailed.toLocaleString()}
          icon={MailCheck}
          gradient="from-blue-100 to-blue-100"
        />
        <StatCard
          title="Failed Emails"
          value={summaryStats.failedEmails}
          icon={XCircle}
          gradient="from-red-100 to-red-100"
        />
        <StatCard
          title="Critical Alerts Sent"
          value={summaryStats.criticalSent.toLocaleString()}
          icon={AlertCircle}
          gradient="from-orange-100 to-orange-100"
        />
        <StatCard
          title="Most Emailed Alert"
          value={summaryStats.mostCommonAlertType}
          icon={TrendingUp}
          gradient="from-purple-100 to-purple-100"
        />
        <StatCard
          title="Most Affected Category"
          value={summaryStats.mostAffectedCategory}
          icon={BarChart3}
          gradient="from-green-100 to-green-100"
        />
      </div>

      {/* Filter Controls */}
      <SearchAndFilter
        searchValue={searchTerm}
        onSearchChange={setSearchTerm}
        searchPlaceholder="Search by Customer, Product, Resource, or Alert ID"
        filters={[
          {
            value: dateRangeFilter,
            onChange: setDateRangeFilter,
            placeholder: "Date Range",
            options: [
              { value: '1day', label: 'Last 24 Hours' },
              { value: '7days', label: 'Last 7 Days' },
              { value: '30days', label: 'Last 30 Days' },
              { value: '90days', label: 'Last 90 Days' }
            ]
          },
          {
            value: productFilter,
            onChange: setProductFilter,
            placeholder: "Product",
            options: [
              { value: 'all', label: 'All Products' },
              { value: 'Acronis', label: 'Acronis' },
              { value: 'Microsoft', label: 'Microsoft' },
              { value: 'Bitdefender', label: 'Bitdefender' },
              { value: 'Zoho', label: 'Zoho' }
            ]
          },
          {
            value: severityFilter,
            onChange: setSeverityFilter,
            placeholder: "Severity",
            options: [
              { value: 'all', label: 'All Severities' },
              { value: 'Critical', label: 'Critical' },
              { value: 'Error', label: 'Error' },
              { value: 'Warning', label: 'Warning' },
              { value: 'Info', label: 'Info' }
            ]
          },
          {
            value: categoryFilter,
            onChange: setCategoryFilter,
            placeholder: "Category",
            options: [
              { value: 'all', label: 'All Categories' },
              { value: 'Backup', label: 'Backup' },
              { value: 'Email Security', label: 'Email Security' },
              { value: 'System', label: 'System' },
              { value: 'EDR', label: 'EDR' },
              { value: 'Licensing', label: 'Licensing' }
            ]
          },
          {
            value: emailStatusFilter,
            onChange: setEmailStatusFilter,
            placeholder: "Email Status",
            options: [
              { value: 'all', label: 'All Statuses' },
              { value: 'Sent', label: 'Sent' },
              { value: 'Failed', label: 'Failed' },
              { value: 'Pending', label: 'Pending' }
            ]
          }
        ]}
        onReset={handleResetFilters}
      />

      {/* Main Content Area */}
      <Card className="border-0 shadow-lg">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle>Alert Email Log</CardTitle>
              <CardDescription>
                Showing {paginatedAlerts.length} of {filteredAlerts.length} alert email records
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
                {paginatedAlerts.map((alert) => {
                  const StatusIcon = getStatusIcon(alert.emailStatus);
                  return (
                    <TableRow 
                      key={alert.id} 
                      className="cursor-pointer hover:bg-muted/20"
                      onClick={() => handleViewDetails(alert)}
                    >
                      <TableCell className="font-mono text-sm">
                        {alert.alertId}
                      </TableCell>
                      <TableCell>
                        <Badge className={getProductBadgeColor(alert.productName)}>
                          {alert.productName}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant={getSeverityBadgeVariant(alert.severity)}>
                          {alert.severity}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{alert.category}</Badge>
                      </TableCell>
                      <TableCell className="font-medium">
                        {alert.alertType}
                      </TableCell>
                      <TableCell>{alert.customerName}</TableCell>
                      <TableCell className="max-w-xs truncate font-mono text-sm">
                        {alert.resourceName}
                      </TableCell>
                      <TableCell className="text-sm">
                        {formatDateTime(alert.emailSentAt)}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center space-x-2">
                          <StatusIcon className="w-4 h-4" />
                          <Badge className={getEmailStatusColor(alert.emailStatus)}>
                            {alert.emailStatus}
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
              Showing {((currentPage - 1) * itemsPerPage) + 1} to {Math.min(currentPage * itemsPerPage, filteredAlerts.length)} of {filteredAlerts.length} results
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

      {/* Alert Details Modal */}
      <Dialog open={isAlertModalOpen} onOpenChange={setIsAlertModalOpen}>
        <DialogContent className="max-w-4xl max-h-[80vh]">
          <DialogHeader>
            <DialogTitle className="flex items-center space-x-2">
              <AlertTriangle className="w-5 h-5" />
              <span>Alert Email Details</span>
            </DialogTitle>
            <DialogDescription>
              Comprehensive information about alert #{selectedAlert?.alertId}
            </DialogDescription>
          </DialogHeader>
          
          {selectedAlert && (
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
                          <p className="font-mono">{selectedAlert.alertId}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Product</p>
                          <Badge className={getProductBadgeColor(selectedAlert.productName)}>
                            {selectedAlert.productName}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Severity</p>
                          <Badge variant={getSeverityBadgeVariant(selectedAlert.severity)}>
                            {selectedAlert.severity}
                          </Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Category</p>
                          <Badge variant="outline">{selectedAlert.category}</Badge>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Alert Type</p>
                          <p>{selectedAlert.alertType}</p>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Customer</p>
                          <p>{selectedAlert.customerName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Email Address</p>
                          <p className="font-mono text-sm">{selectedAlert.customerEmail}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Resource</p>
                          <p className="font-mono text-sm">{selectedAlert.resourceName}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Plan</p>
                          <p>{selectedAlert.planName}</p>
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
                          <p>{formatDateTime(selectedAlert.emailSentAt)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Delivery Status</p>
                          <div className="flex items-center space-x-2">
                            <Badge className={getEmailStatusColor(selectedAlert.emailStatus)}>
                              {selectedAlert.emailStatus}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-3">
                        <div>
                          <p className="text-sm font-medium text-muted-foreground">Delivery Attempts</p>
                          <p>{selectedAlert.deliveryAttempts}</p>
                        </div>
                        {selectedAlert.lastAttempt && (
                          <div>
                            <p className="text-sm font-medium text-muted-foreground">Last Attempt</p>
                            <p>{formatDateTime(selectedAlert.lastAttempt)}</p>
                          </div>
                        )}
                      </div>
                    </div>
                    {selectedAlert.errorMessage && (
                      <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-sm font-medium text-red-800">Error Message</p>
                        <p className="text-sm text-red-700 mt-1">{selectedAlert.errorMessage}</p>
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
                      <p className="text-sm">{selectedAlert.message}</p>
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
                        {selectedAlert.emailStatus === 'Failed' && (
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