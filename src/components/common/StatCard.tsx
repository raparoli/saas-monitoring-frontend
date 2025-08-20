import React from 'react';
import { Card, CardContent } from '../../../components/ui/card';
import { Badge } from '../../../components/ui/badge';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  gradient: string;
  change?: string;
  badge?: string;
  onClick?: () => void;
}

export function StatCard({ 
  title, 
  value, 
  icon: Icon, 
  gradient, 
  change, 
  badge,
  onClick 
}: StatCardProps) {
  return (
    <Card 
      className={`relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 group ${onClick ? 'cursor-pointer' : ''}`}
      onClick={onClick}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-5 group-hover:opacity-10 transition-opacity duration-300`} />
      <CardContent className="p-6">
        <div className="flex items-center justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">{title}</p>
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold">{value}</span>
            </div>
            {change && (
              <Badge className="bg-green-100 text-green-800 text-xs">
                {change}
              </Badge>
            )}
            {badge && (
              <Badge variant="outline" className="text-xs">
                {badge}
              </Badge>
            )}
          </div>
          <div className={`flex items-center justify-center w-12 h-12 bg-gradient-to-br ${gradient} rounded-xl shadow-md group-hover:scale-110 transition-transform duration-300`}>
            <Icon className="h-6 w-6 text-white" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}