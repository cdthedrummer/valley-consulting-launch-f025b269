
import React, { useEffect, useState, useRef } from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface ScrollableWidgetProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  scrollFactor?: number; // Controls how fast widget moves relative to scrolling
}

const ScrollableWidget: React.FC<ScrollableWidgetProps> = ({ 
  children, 
  className, 
  delay = 0,
  scrollFactor = 0.5, // Default scroll factor (0.5 means it moves at half the scroll speed)
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [yOffset, setYOffset] = useState(0);
  const widgetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Show widget after specified delay
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, delay);

    // Handle scroll for parallax effect
    const handleScroll = () => {
      if (window.innerWidth < 768) return; // Disable parallax effect on mobile
      
      const scrollY = window.scrollY;
      setYOffset(scrollY * scrollFactor);
      
      // Only check visibility if we have a ref
      if (widgetRef.current) {
        const rect = widgetRef.current.getBoundingClientRect();
        const isOffScreen = rect.bottom < 0 || rect.top > window.innerHeight;
        
        if (isOffScreen && isVisible) {
          setIsVisible(false);
        } else if (!isOffScreen && !isVisible) {
          setIsVisible(true);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    
    return () => {
      clearTimeout(showTimer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [delay, isVisible, scrollFactor]);

  return (
    <motion.div
      ref={widgetRef}
      initial={{ opacity: 0, y: 20 }}
      animate={isVisible ? { 
        opacity: 1, 
        y: yOffset, // Apply scrolling offset for parallax effect
      } : { 
        opacity: 0, 
        y: 20 
      }}
      transition={{ delay: delay / 1000, duration: 0.5 }}
      className={cn("", className)}
    >
      {children}
    </motion.div>
  );
};

export default ScrollableWidget;
