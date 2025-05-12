
import React, { useEffect, useState, useRef } from 'react';
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
  delay = 0,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show widget after specified delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    // Set up scroll event listener
    const handleScroll = () => {
      if (!widgetRef.current) return;

      const rect = widgetRef.current.getBoundingClientRect();
      const isOffScreen = rect.bottom < 0 || rect.top > window.innerHeight;
      
      if (isOffScreen && isVisible) {
        setIsVisible(false);
      } else if (!isOffScreen && !isVisible) {
        setIsVisible(true);
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delay, isVisible]);

  return (
    <motion.div
      ref={widgetRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
};

export default ScrollableWidget;
