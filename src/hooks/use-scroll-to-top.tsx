import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export function useScrollToTop() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    // If there's a hash in the URL, scroll to that element with a slight delay
    if (hash) {
      // Short timeout to ensure the element exists in the DOM
      setTimeout(() => {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
          return;
        }
      }, 100);
    } else {
      // Otherwise scroll to top of page
      window.scrollTo(0, 0);
    }
  }, [pathname, hash]);

  return null;
}
