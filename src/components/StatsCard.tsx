
import React from 'react';
import { ArrowUp, ArrowDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: string | number;
  change?: number;
  className?: string;
  icon?: React.ReactNode;
}

const StatsCard: React.FC<StatsCardProps> = ({ title, value, change, className, icon }) => {
  const isPositive = change && change > 0;
  
  return (
    <div className={cn("flex flex-col p-4 rounded-lg bg-widget-bg border border-widget-border", className)}>
      <div className="flex items-center justify-between mb-2">
        <span className="text-sm font-medium text-stat-text">{title}</span>
        {icon && <div className="text-muted-foreground">{icon}</div>}
      </div>
      <div className="text-2xl font-bold text-stat-text">{value}</div>
      {change !== undefined && (
        <div className={cn(
          "flex items-center text-sm mt-1",
          isPositive ? "text-green-600" : "text-red-600"
        )}>
          {isPositive ? (
            <ArrowUp className="h-4 w-4 mr-1" />
          ) : (
            <ArrowDown className="h-4 w-4 mr-1" />
          )}
          <span>{Math.abs(change)}%</span>
          <span className="text-muted-foreground ml-1">vs last week</span>
        </div>
      )}
    </div>
  );
};

export default StatsCard;
