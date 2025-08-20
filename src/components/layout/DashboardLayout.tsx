import React from 'react';
import { Button } from '../ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { 
  LogOut, 
  Bell,
  Search,
  ChevronDown,
  Sparkles
} from 'lucide-react';
import { Page } from '../../types';
import { NAVIGATION_ITEMS, QUICK_ACTIONS } from '../../constants';

interface DashboardLayoutProps {
  children: React.ReactNode;
  currentPage: Page;
  onNavigate: (page: Page) => void;
  onLogout: () => void;
}

export function DashboardLayout({ children, currentPage, onNavigate, onLogout }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50">
      {/* Enhanced Sidebar */}
      <div className="w-80 bg-white border-r border-gray-200 shadow-xl flex flex-col">
        {/* Brand Header */}
        <div className="p-6 border-b border-gray-100">
          <div className="flex items-center space-x-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900">SaaS Monitor</h1>
              <p className="text-xs text-gray-500">Enterprise Dashboard</p>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="flex-1 px-4 py-6 space-y-2">
          <div className="space-y-1">
            {NAVIGATION_ITEMS.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              
              return (
                <Button
                  key={item.id}
                  variant="ghost"
                  className={`w-full justify-start h-auto p-4 transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-blue-50 to-purple-50 border border-blue-200 shadow-sm'
                      : 'hover:bg-gray-50 hover:shadow-sm'
                  }`}
                  onClick={() => onNavigate(item.id)}
                >
                  <div className="flex items-center space-x-3 w-full">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl transition-all duration-200 ${
                      isActive
                        ? `bg-gradient-to-br ${item.gradient} shadow-md`
                        : 'bg-gray-100 group-hover:bg-gray-200'
                    }`}>
                      <Icon className={`w-5 h-5 ${isActive ? 'text-white' : 'text-gray-600'}`} />
                    </div>
                    <div className="flex-1 text-left">
                      <div className="flex items-center justify-between">
                        <span className={`font-medium ${isActive ? 'text-gray-900' : 'text-gray-700'}`}>
                          {item.label}
                        </span>
                        {item.badge && (
                          <Badge 
                            variant={isActive ? 'default' : 'secondary'}
                            className={`text-xs ${
                              isActive ? 'bg-blue-100 text-blue-700' : ''
                            }`}
                          >
                            {item.badge}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>
                </Button>
              );
            })}
          </div>

          <Separator className="my-6" />

          {/* Quick Status */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <QUICK_ACTIONS[0].icon className="w-4 h-4 text-gray-500" />
              <span className="text-sm font-medium text-gray-700">System Status</span>
            </div>
            
            <div className="space-y-3">
              {QUICK_ACTIONS.map((action, index) => {
                const IconComponent = action.icon;
                return (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                    <div className="flex items-center space-x-3">
                      <IconComponent className={`w-4 h-4 ${action.color}`} />
                      <span className="text-sm text-gray-700">{action.label}</span>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {action.status}
                    </Badge>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

        {/* Enhanced User Profile */}
        <div className="p-4 border-t border-gray-100 bg-gray-50">
          <div className="flex items-center space-x-3 p-3 bg-white rounded-lg shadow-sm border">
            <Avatar className="w-10 h-10">
              <AvatarImage src="/api/placeholder/40/40" />
              <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white font-medium">
                JD
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-gray-900 truncate">John Doe</p>
              <p className="text-xs text-gray-500 truncate">System Administrator</p>
            </div>
            <Button variant="ghost" size="sm" onClick={onLogout} className="flex-shrink-0">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Enhanced Top Bar */}
        <div className="bg-white border-b border-gray-200 shadow-sm">
          <div className="flex items-center justify-between px-6 py-4">
            <div className="flex items-center space-x-4">
              <div className="text-sm text-gray-500">
                {new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric' 
                })}
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search..."
                  className="pl-10 pr-4 py-2 w-64 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>

              {/* Notifications */}
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 text-xs bg-red-500 hover:bg-red-600">
                  3
                </Badge>
              </Button>

              {/* Profile */}
              <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                <Avatar className="w-8 h-8">
                  <AvatarImage src="/api/placeholder/32/32" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-xs">
                    JD
                  </AvatarFallback>
                </Avatar>
                <ChevronDown className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 overflow-auto">
          {children}
        </div>
      </div>
    </div>
  );
}