import React from 'react';
import { Award } from 'lucide-react';
import { cn } from '@/lib/utils';

interface BusinessTagButtonProps {
  text: string;
  onClick?: () => void;
  className?: string;
}

const BusinessTagButton: React.FC<BusinessTagButtonProps> = ({
  text,
  onClick,
  className,
}) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'inline-flex items-center gap-2 rounded-full border border-border bg-background/60 px-3 py-1 text-xs font-medium text-foreground/80 shadow-sm backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2',
        className
      )}
      aria-label={text}
    >
      <Award className="h-3.5 w-3.5" aria-hidden="true" />
      <span>{text}</span>
    </button>
  );
};

export default BusinessTagButton;
