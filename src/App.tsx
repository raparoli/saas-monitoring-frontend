import React, { useState } from 'react';
import { LoginPage } from './components/pages/LoginPage';
import { DashboardLayout } from './components/layout/DashboardLayout';
import { Dashboard } from './components/pages/Dashboard';
import { ProductsPage } from './components/pages/ProductsPage';
import { IntegratedProductsPage } from './components/pages/IntegratedProductsPage';
import { ProductDetailPage } from './components/pages/ProductDetailPage';
import { AcronisDetailPage } from './components/pages/AcronisDetailPage';
import { IntegrationWindow } from './components/modals/IntegrationWindow';
import { AlertManagementPage } from './components/pages/AlertManagementPage';
import { UserManagementPage } from './components/pages/UserManagementPage';
import { Page, ProductDetail, IntegrationProduct } from './types';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<ProductDetail | null>(null);
  const [integrationProduct, setIntegrationProduct] = useState<IntegrationProduct | null>(null);
  const [showIntegrationWindow, setShowIntegrationWindow] = useState(false);
  const [acronisSourcePage, setAcronisSourcePage] = useState<Page>('dashboard');

  const handleLogin = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleNavigation = (page: Page, product?: ProductDetail) => {
    if (page === 'product-detail' && product) {
      setSelectedProduct(product);
    }
    setCurrentPage(page);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setCurrentPage('login');
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

  if (!isLoggedIn) {
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