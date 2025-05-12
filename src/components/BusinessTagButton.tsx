
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
  className 
}) => {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center gap-2 bg-hvcg-blue text-white py-2 px-4 rounded-full shadow-lg hover:bg-hvcg-blue-dark transition-all",
        className
      )}
    >
      <Award className="h-5 w-5" />
      <span className="font-medium">{text}</span>
    </button>
  );
};

export default BusinessTagButton;
