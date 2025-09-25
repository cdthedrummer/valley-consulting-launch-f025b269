import { useEffect, useRef } from 'react';

interface UseLiveRegionOptions {
  politeness?: 'polite' | 'assertive';
  atomic?: boolean;
}

/**
 * Hook for announcing messages to screen readers using ARIA live regions
 */
export function useLiveRegion(options: UseLiveRegionOptions = {}) {
  const { politeness = 'polite', atomic = true } = options;
  const liveRegionRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Create live region if it doesn't exist
    if (!liveRegionRef.current) {
      const liveRegion = document.createElement('div');
      liveRegion.setAttribute('aria-live', politeness);
      liveRegion.setAttribute('aria-atomic', atomic.toString());
      liveRegion.setAttribute('role', 'status');
      liveRegion.className = 'sr-only';
      liveRegion.id = `live-region-${Date.now()}`;
      
      document.body.appendChild(liveRegion);
      liveRegionRef.current = liveRegion;
    }

    return () => {
      // Clean up live region on unmount
      if (liveRegionRef.current) {
        document.body.removeChild(liveRegionRef.current);
        liveRegionRef.current = null;
      }
    };
  }, [politeness, atomic]);

  const announce = (message: string) => {
    if (liveRegionRef.current) {
      // Clear first, then set message to ensure it's announced
      liveRegionRef.current.textContent = '';
      setTimeout(() => {
        if (liveRegionRef.current) {
          liveRegionRef.current.textContent = message;
        }
      }, 100);
    }
  };

  return { announce };
}

/**
 * Hook for announcing status changes (like form submissions, data loading)
 */
export function useStatusAnnouncer() {
  return useLiveRegion({ politeness: 'polite' });
}

/**
 * Hook for announcing important alerts that need immediate attention
 */
export function useAlertAnnouncer() {
  return useLiveRegion({ politeness: 'assertive' });
}