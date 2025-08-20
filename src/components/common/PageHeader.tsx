import React from 'react';

interface PageHeaderProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  iconGradient?: string;
  children?: React.ReactNode;
}

export function PageHeader({ 
  icon: Icon, 
  title, 
  description, 
  iconGradient = 'from-blue-500 to-purple-600',
  children 
}: PageHeaderProps) {
  return (
    <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-6 lg:space-y-0">
      <div className="space-y-2">
        <div className="flex items-center space-x-3">
          <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${iconGradient} rounded-2xl shadow-lg`}>
            <Icon className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">{title}</h1>
            <p className="text-muted-foreground">{description}</p>
          </div>
        </div>
      </div>
      {children && (
        <div className="flex items-center space-x-3">
          {children}
        </div>
      )}
    </div>
  );
}