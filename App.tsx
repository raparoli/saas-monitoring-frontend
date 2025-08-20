import React, { useState } from 'react';
import { useAppState } from './src/hooks/useAppState';
import { LoginPage } from './components/LoginPage';
import { DashboardLayout } from './components/DashboardLayout';
import { Dashboard } from './components/Dashboard';
import { ProductsPage } from './components/ProductsPage';
import { IntegratedProductsPage } from './components/IntegratedProductsPage';
import { ProductDetailPage } from './components/ProductDetailPage';
import { AcronisDetailPage } from './components/AcronisDetailPage';
import { IntegrationWindow } from './components/IntegrationWindow';
import { AlertManagementPage } from './components/AlertManagementPage';
import { UserManagementPage } from './components/UserManagementPage';
import { Page } from './src/types';

export default function App() {
  const {
    currentPage,
    isLoggedIn,
    selectedProduct,
    integrationProduct,
    showIntegrationWindow,
    handleLogin,
    handleNavigation,
    handleLogout,
    handleStartIntegration,
    handleCloseIntegration,
    handleIntegrationComplete,
    handleAcronisDetailFromDashboard,
    handleAcronisDetailFromIntegratedProducts,
    handleBackFromAcronis
  } = useAppState();

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