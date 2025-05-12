
import React, { useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ScrollableWidgetProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  duration?: number;
}

const ScrollableWidget: React.FC<ScrollableWidgetProps> = ({ 
  children, 
  className, 
  delay = 0,
  duration = 2000 
}) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
    
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      className={cn("bg-white/90 backdrop-blur-sm rounded-lg shadow-lg p-4", className)}
    >
      {children}
    </motion.div>
  );
};

export default ScrollableWidget;
