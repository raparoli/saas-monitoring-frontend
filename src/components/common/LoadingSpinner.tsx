import React from 'react';
import { RefreshCw } from 'lucide-react';
import { cn } from '../../../components/ui/utils';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export function LoadingSpinner({ message = "Loading...", size = 'md' }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  return (
    <div className="flex-1 p-6 flex items-center justify-center">
      <div className="flex items-center space-x-2">
        <RefreshCw className={`${sizeClasses[size]} animate-spin`} />
        <span>{message}</span>
      </div>
    </div>
  );
}