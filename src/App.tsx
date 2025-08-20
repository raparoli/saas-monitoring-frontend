import React, { useState } from 'react';
import { useAuth } from './modules/auth/hooks/useAuth';
import { LoginPage } from './modules/auth/components/LoginPage';
import { DashboardLayout } from './shared/components/layout/DashboardLayout';
import { Dashboard } from './modules/dashboard/components/Dashboard';
import { ProductsPage } from './modules/products/components/ProductsPage';
import { IntegratedProductsPage } from './modules/products/components/IntegratedProductsPage';
import { ProductDetailPage } from './modules/products/components/ProductDetailPage';
import { AcronisDetailPage } from './modules/acronis/components/AcronisDetailPage';
import { IntegrationWindow } from './modules/integration/components/IntegrationWindow';
import { AlertManagementPage } from './modules/alerts/components/AlertManagementPage';
import { UserManagementPage } from './modules/users/components/UserManagementPage';
import { Page, ProductDetail, IntegrationProduct } from './shared/types';

export default function App() {
  const { isAuthenticated, user, isLoading, login, logout } = useAuth();
  const [currentPage, setCurrentPage] = useState<Page>('dashboard');
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [integrationProduct, setIntegrationProduct] = useState<IntegrationProduct | null>(null);
  const [showIntegrationWindow, setShowIntegrationWindow] = useState(false);
  const [acronisSourcePage, setAcronisSourcePage] = useState<Page>('dashboard');

  const handleLogin = async (email: string, password: string) => {
    await login(email, password);
    setCurrentPage('dashboard');
  };

  const handleNavigation = (page: Page, product?: ProductDetail) => {
    if (page === 'product-detail' && product) {
      setSelectedProduct(product);
    }
    setCurrentPage(page);
  };

  const handleLogout = async () => {
    await logout();
    setCurrentPage('dashboard');
    setSelectedProduct(null);
    setIntegrationProduct(null);
    setShowIntegrationWindow(false);
    setAcronisSourcePage('dashboard');
  };

  const handleStartIntegration = (product: IntegrationProduct) => {
    setIntegrationProduct(product);
    setShowIntegrationWindow(true);
  };

  const handleCloseIntegration = () => {
    setShowIntegrationWindow(false);
    setIntegrationProduct(null);
  };

  const handleIntegrationComplete = () => {
    setShowIntegrationWindow(false);
    setIntegrationProduct(null);
    setCurrentPage('integrated-products');
  };

  const handleAcronisDetailFromDashboard = () => {
    setAcronisSourcePage('dashboard');
    setCurrentPage('acronis-detail');
  };

  const handleAcronisDetailFromIntegratedProducts = () => {
    setAcronisSourcePage('integrated-products');
    setCurrentPage('acronis-detail');
  };

  const handleBackFromAcronis = () => {
    setCurrentPage(acronisSourcePage);
  };

  // Show loading spinner while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background to-muted">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
          <p className="text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <LoginPage onLogin={handleLogin} />;
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return <Dashboard onAcronisDetail={handleAcronisDetailFromDashboard} />;
      case 'products':
        return <ProductsPage onStartIntegration={handleStartIntegration} />;
      case 'integrated-products':
        return (
          <IntegratedProductsPage 
            onViewDetails={handleNavigation}
            onAcronisDetail={handleAcronisDetailFromIntegratedProducts}
            onStartIntegration={handleStartIntegration}
          />
        );
      case 'product-detail':
        return selectedProduct ? (
          <ProductDetailPage 
            product={selectedProduct} 
            onBack={() => setCurrentPage('integrated-products')}
          />
        ) : null;
      case 'acronis-detail':
        return <AcronisDetailPage onBack={handleBackFromAcronis} />;
      case 'alert-management':
        return <AlertManagementPage />;
      case 'user-management':
        return <UserManagementPage />;
      default:
        return <Dashboard onAcronisDetail={handleAcronisDetailFromDashboard} />;
    }
  };

  return (
    <>
      <DashboardLayout 
        currentPage={currentPage}
        onNavigate={handleNavigation}
        onLogout={handleLogout}
        user={user}
      >
        {renderPage()}
      </DashboardLayout>

      {/* Integration Window Modal */}
      {showIntegrationWindow && integrationProduct && (
        <IntegrationWindow
          product={integrationProduct}
          onClose={handleCloseIntegration}
          onComplete={handleIntegrationComplete}
        />
      )}
    </>
  );
}