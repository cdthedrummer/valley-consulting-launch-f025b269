import React from 'react';
import { useToast } from '@/hooks/use-toast';
import { CheckCircle, AlertCircle, XCircle, Info, X } from 'lucide-react';
import { cn } from '@/lib/utils';

export interface EnhancedToastProps {
  id: string;
  title?: string;
  description?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
  action?: React.ReactNode;
  duration?: number;
  onDismiss?: () => void;
}

const iconMap = {
  success: CheckCircle,
  error: XCircle,
  warning: AlertCircle,
  info: Info,
};

const styleMap = {
  success: 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200',
  error: 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200',
  warning: 'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
  info: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
};

export function EnhancedToast({ 
  id, 
  title, 
  description, 
  type = 'info', 
  action, 
  onDismiss 
}: EnhancedToastProps) {
  const Icon = iconMap[type];
  
  return (
    <div
      className={cn(
        'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg border shadow-lg transition-all duration-300 hover:shadow-xl',
        styleMap[type]
      )}
      role="alert"
      aria-live="assertive"
    >
      <div className="p-4">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <Icon className="h-5 w-5" />
          </div>
          <div className="ml-3 w-0 flex-1">
            {title && (
              <p className="text-sm font-medium">
                {title}
              </p>
            )}
            {description && (
              <p className={cn("text-sm", title ? "mt-1" : "")}>
                {description}
              </p>
            )}
            {action && (
              <div className="mt-3">
                {action}
              </div>
            )}
          </div>
          <div className="ml-4 flex-shrink-0 flex">
            <button
              onClick={onDismiss}
              className="inline-flex rounded-md hover:opacity-75 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-current transition-opacity"
            >
              <span className="sr-only">Close</span>
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// Enhanced toast utilities
export const enhancedToast = {
  success: (title: string, description?: string) => {
    const { toast } = useToast();
    return toast({
      title,
      description,
      className: 'border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-900/20 dark:text-green-200',
    });
  },
  
  error: (title: string, description?: string) => {
    const { toast } = useToast();
    return toast({
      title,
      description,
      variant: 'destructive',
      className: 'border-red-200 bg-red-50 text-red-800 dark:border-red-800 dark:bg-red-900/20 dark:text-red-200',
    });
  },
  
  warning: (title: string, description?: string) => {
    const { toast } = useToast();
    return toast({
      title,
      description,
      className: 'border-yellow-200 bg-yellow-50 text-yellow-800 dark:border-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-200',
    });
  },
  
  info: (title: string, description?: string) => {
    const { toast } = useToast();
    return toast({
      title,
      description,
      className: 'border-blue-200 bg-blue-50 text-blue-800 dark:border-blue-800 dark:bg-blue-900/20 dark:text-blue-200',
    });
  },
};