import { useState } from 'react';
import { Page, ProductDetail, IntegrationProduct } from '../types';

/**
 * Custom hook for managing application state
 */
export const useAppState = () => {
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

  return {
    // State
    currentPage,
    isLoggedIn,
    selectedProduct,
    integrationProduct,
    showIntegrationWindow,
    acronisSourcePage,
    
    // Actions
    handleLogin,
    handleNavigation,
    handleLogout,
    handleStartIntegration,
    handleCloseIntegration,
    handleIntegrationComplete,
    handleAcronisDetailFromDashboard,
    handleAcronisDetailFromIntegratedProducts,
    handleBackFromAcronis
  };
};