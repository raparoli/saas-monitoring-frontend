import React, { useState, useEffect } from 'react';
import { Button } from '../../../shared/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../shared/components/ui/tabs';
import { TooltipProvider } from '../../../shared/components/ui/tooltip';
import { CustomerUsageBreakdownPage } from './CustomerUsageBreakdownPage';
import { EnhancedCustomerDrawer } from './EnhancedCustomerDrawer';
import { CustomerDetailDrawer } from './CustomerDetailDrawer';
import { AlertDetailDrawer } from './AlertDetailDrawer';
import { OverviewTab } from './OverviewTab';
import { CustomersTab } from './CustomersTab';
import { UsageTab } from './UsageTab';
import { AlertsTab } from './AlertsTab';
import { LicenseSummaryTab } from './LicenseSummaryTab';
import { 
  ArrowLeft, 
  HardDrive, 
  Home,
  Users,
  BarChart3,
  AlertTriangle,
  Settings,
  RefreshCw,
  SortAsc,
  SortDesc
} from 'lucide-react';

// Import types and constants
import { Customer, Alert, CustomerUsageDetail, SortField, SortDirection } from '../types';
import { alerts, customers, customerUsageDetails } from '../constants';

interface AcronisDetailPageProps {
  onBack: () => void;
}

export function AcronisDetailPage({ onBack }: AcronisDetailPageProps) {
  // State management
  const [activeTab, setActiveTab] = useState('overview');
  const [isPageLoaded, setIsPageLoaded] = useState(false);
  const [selectedCustomer, setSelectedCustomer] = useState<Customer | null>(null);
  const [customerSearch, setCustomerSearch] = useState('');
  const [alertSeverityFilter, setAlertSeverityFilter] = useState('all');
  const [alertCategoryFilter, setAlertCategoryFilter] = useState('all');
  const [alertTypeFilter, setAlertTypeFilter] = useState('all');
  const [alertSearch, setAlertSearch] = useState('');
  const [alertDateFrom, setAlertDateFrom] = useState<Date | undefined>();
  const [alertDateTo, setAlertDateTo] = useState<Date | undefined>();
  const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
  const [isAlertDrawerOpen, setIsAlertDrawerOpen] = useState(false);
  const [alertCurrentPage, setAlertCurrentPage] = useState(1);
  
  // Customers tab state
  const [storageFilter, setStorageFilter] = useState('all');
  const [showDisabledCustomers, setShowDisabledCustomers] = useState(true);
  const [sortField, setSortField] = useState<SortField>('name');
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [selectedCustomerDetail, setSelectedCustomerDetail] = useState<Customer | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  // Usage tab state
  const [usageUtilizationFilter, setUsageUtilizationFilter] = useState('all');
  const [usageStorageFilter, setUsageStorageFilter] = useState('all');
  const [selectedUsageCustomer, setSelectedUsageCustomer] = useState<CustomerUsageDetail | null>(null);
  const [isUsageDrawerOpen, setIsUsageDrawerOpen] = useState(false);
  
  // Customer usage breakdown page state
  const [showCustomerBreakdown, setShowCustomerBreakdown] = useState(false);

  // Initialize component
  useEffect(() => {
    setIsPageLoaded(true);
    setActiveTab('overview');
  }, []);

  // Event handlers
  const handleTabChange = (newTab: string) => {
    setActiveTab(newTab);
  };

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) return <SortAsc className="w-4 h-4 text-muted-foreground" />;
    return sortDirection === 'asc' ? 
      <SortAsc className="w-4 h-4 text-primary" /> : 
      <SortDesc className="w-4 h-4 text-primary" />;
  };

  const handleCustomerRowClick = (customer: Customer) => {
    setSelectedCustomerDetail(customer);
    setIsDrawerOpen(true);
  };

  const handleUsageCustomerBreakdown = (customer: Customer) => {
    const usageDetail = customerUsageDetails.find(detail => detail.customerId === customer.id);
    if (usageDetail) {
      setSelectedUsageCustomer(usageDetail);
      setIsUsageDrawerOpen(true);
    }
  };

  const handleViewCustomerBreakdown = () => {
    setShowCustomerBreakdown(true);
  };

  const handleBackFromBreakdown = () => {
    setShowCustomerBreakdown(false);
  };

  const handleAlertRowClick = (alert: Alert) => {
    setSelectedAlert(alert);
    setIsAlertDrawerOpen(true);
  };

  const handleAlertPageChange = (page: number) => {
    setAlertCurrentPage(page);
  };

  // Loading state
  if (!isPageLoaded) {
    return (
      <div className="flex-1 p-6 flex items-center justify-center">
        <div className="flex items-center space-x-2">
          <RefreshCw className="w-5 h-5 animate-spin" />
          <span>Loading Acronis details...</span>
        </div>
      </div>
    );
  }

  // Show customer breakdown page
  if (showCustomerBreakdown) {
    return <CustomerUsageBreakdownPage onBack={handleBackFromBreakdown} />;
  }

  return (
    <TooltipProvider>
      <div className="flex-1 p-6 space-y-6">
        {/* Header */}
        <div className="flex items-center space-x-4">
          <Button variant="outline" size="sm" onClick={onBack} className="shadow-sm">
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back
          </Button>
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl shadow-lg">
              <HardDrive className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Acronis Cyber Protect</h1>
              <p className="text-muted-foreground">Comprehensive backup and cyber protection monitoring dashboard</p>
            </div>
          </div>
        </div>

        {/* Tab System */}
        <div className="rounded-lg border bg-card shadow-sm">
          <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
            <div className="border-b bg-muted/50 rounded-t-lg">
              <TabsList className="grid w-full grid-cols-5 h-12 bg-transparent p-1">
                <TabsTrigger value="overview" className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Home className="w-4 h-4" />
                  <span>Overview</span>
                </TabsTrigger>
                <TabsTrigger value="customers" className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Users className="w-4 h-4" />
                  <span>Customers</span>
                </TabsTrigger>
                <TabsTrigger value="usage" className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <BarChart3 className="w-4 h-4" />
                  <span>Usage</span>
                </TabsTrigger>
                <TabsTrigger value="alerts" className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Alerts</span>
                </TabsTrigger>
                <TabsTrigger value="license-summary" className="flex items-center space-x-2 data-[state=active]:bg-background data-[state=active]:shadow-sm">
                  <Settings className="w-4 h-4" />
                  <span>License Summary</span>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="p-6">
              <TabsContent value="overview">
                <OverviewTab />
              </TabsContent>

              <TabsContent value="customers">
                <CustomersTab
                  customerSearch={customerSearch}
                  setCustomerSearch={setCustomerSearch}
                  storageFilter={storageFilter}
                  setStorageFilter={setStorageFilter}
                  showDisabledCustomers={showDisabledCustomers}
                  setShowDisabledCustomers={setShowDisabledCustomers}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
                  getSortIcon={getSortIcon}
                  handleCustomerRowClick={handleCustomerRowClick}
                />
              </TabsContent>

              <TabsContent value="usage">
                <UsageTab
                  customerSearch={customerSearch}
                  setCustomerSearch={setCustomerSearch}
                  usageUtilizationFilter={usageUtilizationFilter}
                  setUsageUtilizationFilter={setUsageUtilizationFilter}
                  usageStorageFilter={usageStorageFilter}
                  setUsageStorageFilter={setUsageStorageFilter}
                  showDisabledCustomers={showDisabledCustomers}
                  setShowDisabledCustomers={setShowDisabledCustomers}
                  sortField={sortField}
                  sortDirection={sortDirection}
                  handleSort={handleSort}
                  getSortIcon={getSortIcon}
                  handleUsageCustomerBreakdown={handleUsageCustomerBreakdown}
                  handleViewCustomerBreakdown={handleViewCustomerBreakdown}
                />
              </TabsContent>

              <TabsContent value="alerts">
                <AlertsTab
                  alertSeverityFilter={alertSeverityFilter}
                  setAlertSeverityFilter={setAlertSeverityFilter}
                  alertCategoryFilter={alertCategoryFilter}
                  setAlertCategoryFilter={setAlertCategoryFilter}
                  alertTypeFilter={alertTypeFilter}
                  setAlertTypeFilter={setAlertTypeFilter}
                  alertSearch={alertSearch}
                  setAlertSearch={setAlertSearch}
                  alertDateFrom={alertDateFrom}
                  setAlertDateFrom={setAlertDateFrom}
                  alertDateTo={alertDateTo}
                  setAlertDateTo={setAlertDateTo}
                  alertCurrentPage={alertCurrentPage}
                  setAlertCurrentPage={setAlertCurrentPage}
                  handleAlertRowClick={handleAlertRowClick}
                  handleAlertPageChange={handleAlertPageChange}
                  alerts={alerts}
                />
              </TabsContent>

              <TabsContent value="license-summary">
                <LicenseSummaryTab />
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Customer Detail Drawer */}
        <CustomerDetailDrawer
          isOpen={isDrawerOpen}
          onClose={() => setIsDrawerOpen(false)}
          selectedCustomer={selectedCustomerDetail}
        />

        {/* Enhanced Usage Customer Drawer */}
        <EnhancedCustomerDrawer
          isOpen={isUsageDrawerOpen}
          onClose={() => setIsUsageDrawerOpen(false)}
          selectedUsageCustomer={selectedUsageCustomer}
        />

        {/* Alert Detail Drawer */}
        <AlertDetailDrawer
          isOpen={isAlertDrawerOpen}
          onClose={() => setIsAlertDrawerOpen(false)}
          selectedAlert={selectedAlert}
        />
      </div>
    </TooltipProvider>
  );
}