import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
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
  BarChart3,
  AlertTriangle,
  Search,
  Filter,
  RefreshCw
} from 'lucide-react';

interface AlertEmailLog {
  id: string;
  alertId: string;
  productName: string;
  severity: 'Critical' | 'Warning' | 'Error' | 'Info';
  category: string;
  alertType: string;
  customerName: string;
  customerEmail: string;
  resourceName: string;
  emailSentAt: string;
  emailStatus: 'Sent' | 'Failed' | 'Pending';
  message: string;
  planName: string;
  deliveryAttempts: number;
  lastAttempt?: string;
  errorMessage?: string;
}

const MOCK_ALERT_EMAIL_LOGS: AlertEmailLog[] = [
  {
    id: '1',
    alertId: 'A0B6A95F',
    productName: 'Acronis',
    severity: 'Critical',
    category: 'Backup',
    alertType: 'BackupFailed',
    customerName: 'Taurus Group',
    customerEmail: 'admin@taurusgroup.com',
    resourceName: 'DC-GPS.rasasigps.ae',
    emailSentAt: '2024-01-15T14:30:00Z',
    emailStatus: 'Sent',
    message: 'Backup operation failed for critical server',
    planName: 'Enterprise Backup Plan',
    deliveryAttempts: 1
  },
  {
    id: '2',
    alertId: 'B1C7D83A',
    productName: 'Microsoft',
    severity: 'Warning',
    category: 'Email Security',
    alertType: 'MalwareDetected',
    customerName: 'Global Industries',
    customerEmail: 'security@globalindustries.com',
    resourceName: 'MAIL-SVR-01',
    emailSentAt: '2024-01-15T13:45:00Z',
    emailStatus: 'Failed',
    message: 'Malware detected in incoming email',
    planName: 'Email Security Pro',
    deliveryAttempts: 3,
    lastAttempt: '2024-01-15T15:20:00Z',
    errorMessage: 'SMTP server connection timeout'
  },
  {
    id: '3',
    alertId: 'C2D8E94B',
    productName: 'Bitdefender',
    severity: 'Error',
    category: 'System',
    alertType: 'StorageFull',
    customerName: 'Tech Solutions Ltd',
    customerEmail: 'it@techsolutions.com',
    resourceName: 'STORAGE-CLUSTER-01',
    emailSentAt: '2024-01-15T12:15:00Z',
    emailStatus: 'Sent',
    message: 'Storage capacity at 95% - immediate attention required',
    planName: 'Infrastructure Monitor',
    deliveryAttempts: 1
  },
  {
    id: '4',
    alertId: 'D3E9F05C',
    productName: 'Zoho',
    severity: 'Info',
    category: 'Licensing',
    alertType: 'LicenseExpiring',
    customerName: 'Startup Ventures',
    customerEmail: 'admin@startupventures.com',
    resourceName: 'LICENSE-SERVER',
    emailSentAt: '2024-01-15T11:00:00Z',
    emailStatus: 'Pending',
    message: 'License expires in 30 days - renewal required',
    planName: 'Standard License',
    deliveryAttempts: 0
  },
  {
    id: '5',
    alertId: 'E4F0G16D',
    productName: 'Acronis',
    severity: 'Critical',
    category: 'EDR',
    alertType: 'ThreatDetected',
    customerName: 'Financial Corp',
    customerEmail: 'security@financialcorp.com',
    resourceName: 'WORKSTATION-045',
    emailSentAt: '2024-01-15T10:30:00Z',
    emailStatus: 'Sent',
    message: 'Advanced persistent threat detected on endpoint',
    planName: 'EDR Advanced',
    deliveryAttempts: 1
  }
];

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

  const itemsPerPage = 10;

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity.toLowerCase()) {
      case 'critical':
      case 'error':
        return 'destructive';
      case 'warning':
        return 'secondary';
      case 'info':
        return 'default';
      default:
        return 'secondary';
    }
  };

  const getEmailStatusColor = (status: string) => {
    switch (status) {
      case 'Sent': return 'bg-green-100 text-green-800';
      case 'Failed': return 'bg-red-100 text-red-800';
      case 'Pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getProductBadgeColor = (product: string) => {
    switch (product) {
      case 'Acronis': return 'bg-blue-100 text-blue-800';
      case 'Microsoft': return 'bg-green-100 text-green-800';
      case 'Bitdefender': return 'bg-orange-100 text-orange-800';
      case 'Zoho': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Sent': return CheckCircle;
      case 'Failed': return XCircle;
      case 'Pending': return AlertCircle;
      default: return AlertCircle;
    }
  };

  const formatDateTime = (dateString: string) => {
    return new Date(dateString).toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-white shadow-sm"
                />
              </div>
              
              <Select value={dateRangeFilter} onValueChange={setDateRangeFilter}>
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

              <Select value={productFilter} onValueChange={setProductFilter}>
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

              <Select value={severityFilter} onValueChange={setSeverityFilter}>
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

              <Select value={emailStatusFilter} onValueChange={setEmailStatusFilter}>
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
            </div>
          </div>
        </CardContent>
      </Card>

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

function formatDateTime(dateString: string) {
  return new Date(dateString).toLocaleString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });
}

function formatDate(dateString: string) {
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
}