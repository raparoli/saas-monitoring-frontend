import { 
  LayoutDashboard, 
  Package, 
  Plug, 
  Mail,
  Users,
  Activity,
  Shield,
  Zap
} from 'lucide-react';
import { Page } from '../types';

export interface NavigationItem {
  id: Page;
  label: string;
  icon: typeof LayoutDashboard;
  badge?: string | null;
  gradient: string;
}

export const NAVIGATION_ITEMS: NavigationItem[] = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    icon: LayoutDashboard,
    badge: null,
    gradient: 'from-blue-500 to-blue-600'
  },
  {
    id: 'products',
    label: 'Product Marketplace',
    icon: Package,
    badge: 'New',
    gradient: 'from-purple-500 to-purple-600'
  },
  {
    id: 'integrated-products',
    label: 'Integrated Products',
    icon: Plug,
    badge: '1',
    gradient: 'from-green-500 to-green-600'
  },
  {
    id: 'alert-management',
    label: 'Alert Management',
    icon: Mail,
    badge: '10.8K',
    gradient: 'from-orange-500 to-orange-600'
  },
  {
    id: 'user-management',
    label: 'User Management',
    icon: Users,
    badge: '5',
    gradient: 'from-indigo-500 to-indigo-600'
  }
];

export const QUICK_ACTIONS = [
  {
    label: 'System Health',
    icon: Activity,
    status: 'Healthy',
    color: 'text-green-500'
  },
  {
    label: 'Security Score',
    icon: Shield,
    status: '95%',
    color: 'text-blue-500'
  },
  {
    label: 'Performance',
    icon: Zap,
    status: 'Optimal',
    color: 'text-yellow-500'
  }
];