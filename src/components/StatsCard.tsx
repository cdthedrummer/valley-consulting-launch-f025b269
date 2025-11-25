
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
      "p-4 rounded-lg border-2 relative overflow-hidden",
      "transform transition-all duration-200 hover:scale-105 hover:shadow-md",
      "active:scale-95",
      className
    )}>
      {/* Subtle gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-action-yellow/5 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-200" />
      
      <div className="relative z-10">
        <div className="flex items-center justify-between mb-3">
          <span className="font-dm text-xs font-semibold text-club-green uppercase tracking-wider">
            {title}
          </span>
          {icon && (
            <div className="text-action-yellow transition-all duration-200 transform hover:scale-110">
              {icon}
            </div>
          )}
        </div>
        
        <div className="font-archivo text-2xl sm:text-3xl font-bold text-club-green mb-2">
          {value}
        </div>
        
        {change !== undefined && (
          <div className={cn(
            "flex items-center font-dm text-sm mt-1 transition-all duration-200",
            isPositive ? "text-action-yellow" : "text-varsity-maroon"
          )}>
            <div className="mr-1 transform transition-transform duration-200 hover:scale-110">
              {isPositive ? (
                <ArrowUp className="h-4 w-4" />
              ) : (
                <ArrowDown className="h-4 w-4" />
              )}
            </div>
            <span className="font-semibold">{Math.abs(change)}%</span>
            <span className="text-club-green/60 ml-1 text-xs">vs last week</span>
          </div>
        )}
      </div>
    </div>
  );
};

export default StatsCard;
