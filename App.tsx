import React, { useState } from 'react';
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

type Page = 'login' | 'dashboard' | 'products' | 'integrated-products' | 'product-detail' | 'acronis-detail' | 'alert-management' | 'user-management';

interface ProductDetail {
  id: string;
  name: string;
  logo: string;
  status: string;
  totalLicenses: number;
  usedLicenses: number;
  licenseType: string;
  renewalDate: string;
}

interface IntegrationProduct {
  id: string;
  name: string;
  description: string;
  category: string;
  provider?: string;
  rating?: number;
  users?: string;
  pricing?: string;
  features?: string[];
  isPopular?: boolean;
  isRecommended?: boolean;
  integrationComplexity?: 'Simple' | 'Moderate' | 'Advanced';
  status?: 'Available' | 'Coming Soon' | 'Beta' | 'Integrated';
}

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