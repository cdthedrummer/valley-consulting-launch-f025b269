
import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ScrollableWidgetProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
}

const ScrollableWidget: React.FC<ScrollableWidgetProps> = ({ 
  children, 
  className, 
  delay = 0
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
};

export default ScrollableWidget;
