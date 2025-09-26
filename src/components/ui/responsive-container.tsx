import React from 'react';
import { cn } from '@/lib/utils';

interface ResponsiveContainerProps {
  children: React.ReactNode;
  className?: string;
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | 'full';
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const maxWidthMap = {
  sm: 'max-w-sm',
  md: 'max-w-md',
  lg: 'max-w-4xl',
  xl: 'max-w-6xl',
  '2xl': 'max-w-7xl',
  full: 'max-w-full',
};

const paddingMap = {
  none: '',
  sm: 'px-4 sm:px-6',
  md: 'px-4 sm:px-6 lg:px-8',
  lg: 'px-4 sm:px-6 lg:px-8 xl:px-12',
};

export function ResponsiveContainer({ 
  children, 
  className, 
  maxWidth = 'xl', 
  padding = 'md' 
}: ResponsiveContainerProps) {
  return (
    <div className={cn(
      'mx-auto w-full',
      maxWidthMap[maxWidth],
      paddingMap[padding],
      className
    )}>
      {children}
    </div>
  );
}

interface ResponsiveGridProps {
  children: React.ReactNode;
  className?: string;
  cols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
  };
  gap?: 'sm' | 'md' | 'lg';
}

const gapMap = {
  sm: 'gap-4',
  md: 'gap-6',
  lg: 'gap-8',
};

export function ResponsiveGrid({ 
  children, 
  className, 
  cols = { sm: 1, md: 2, lg: 3 },
  gap = 'md'
}: ResponsiveGridProps) {
  const gridCols = cn(
    'grid',
    cols.sm && `grid-cols-${cols.sm}`,
    cols.md && `md:grid-cols-${cols.md}`,
    cols.lg && `lg:grid-cols-${cols.lg}`,
    cols.xl && `xl:grid-cols-${cols.xl}`,
    gapMap[gap]
  );

  return (
    <div className={cn(gridCols, className)}>
      {children}
    </div>
  );
}

interface MobileFirstStackProps {
  children: React.ReactNode;
  className?: string;
  breakpoint?: 'sm' | 'md' | 'lg';
  direction?: 'row' | 'col';
  align?: 'start' | 'center' | 'end';
  gap?: 'sm' | 'md' | 'lg';
}

export function MobileFirstStack({ 
  children, 
  className, 
  breakpoint = 'md',
  direction = 'row',
  align = 'start',
  gap = 'md'
}: MobileFirstStackProps) {
  const stackClasses = cn(
    'flex flex-col',
    breakpoint === 'sm' && `sm:flex-${direction}`,
    breakpoint === 'md' && `md:flex-${direction}`,
    breakpoint === 'lg' && `lg:flex-${direction}`,
    align === 'center' && 'items-center',
    align === 'end' && 'items-end',
    align === 'start' && 'items-start',
    gapMap[gap],
    className
  );

  return <div className={stackClasses}>{children}</div>;
}

// Touch-friendly component wrapper
interface TouchFriendlyProps {
  children: React.ReactNode;
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

const touchSizeMap = {
  sm: 'min-h-[44px] min-w-[44px]', // iOS recommendation
  md: 'min-h-[48px] min-w-[48px]', // Material Design
  lg: 'min-h-[56px] min-w-[56px]', // Large touch target
};

export function TouchFriendly({ children, className, size = 'md' }: TouchFriendlyProps) {
  return (
    <div className={cn(
      'touch-target',
      touchSizeMap[size],
      'flex items-center justify-center',
      className
    )}>
      {children}
    </div>
  );
}