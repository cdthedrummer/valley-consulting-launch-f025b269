
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
    <div className={cn(
      "stats-card group relative overflow-hidden",
      "transform transition-all duration-200 hover:scale-105",
      "active:scale-95",
      className
    )}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-200" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="text-sm font-medium text-stat-text group-hover:text-primary transition-colors duration-200">
            {title}
          </span>
          {icon && (
            <div className="text-muted-foreground group-hover:text-primary transition-all duration-200 transform group-hover:scale-110">
              {icon}
            </div>
          )}
        </div>
        
        <div className="text-2xl sm:text-3xl font-bold text-stat-text mb-2 group-hover:animate-gentle-bounce">
          {value}
        </div>
        
        {change !== undefined && (
          <div className={cn(
            "flex items-center text-sm mt-1 transition-all duration-200",
            isPositive ? "text-green-600" : "text-red-600"
          )}>
            <div className="mr-1 transform transition-transform duration-200 group-hover:scale-110">
              {isPositive ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
            </div>
            <span className="font-medium">{Math.abs(change)}%</span>
            <span className="text-muted-foreground ml-1 text-xs">vs last week</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
