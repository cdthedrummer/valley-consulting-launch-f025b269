import React from 'react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface CTATrackerProps {
  ctaType: 'hero' | 'nav' | 'footer' | 'inline' | 'mobile';
  label: string;
  to: string;
  className?: string;
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  size?: 'default' | 'sm' | 'lg' | 'icon';
  children: React.ReactNode;
}

const CTATracker: React.FC<CTATrackerProps> = ({
  ctaType,
  label,
  to,
  className,
  variant = 'default',
  size = 'default',
  children
}) => {
  const { user } = useAuth();

  const trackCTAClick = async () => {
    try {
      // Track CTA clicks in analytics table using generic approach since types aren't updated yet
      const { error } = await supabase
        .from('cta_clicks' as any)
        .insert({
          cta_type: ctaType,
          cta_label: label,
          destination: to,
          user_id: user?.id || null,
          timestamp: new Date().toISOString(),
          user_agent: navigator.userAgent,
          page_url: window.location.href,
          referrer: document.referrer || null
        });
      
      if (error) {
        console.error('CTA tracking error:', error);
      }
    } catch (error) {
      console.error('Error tracking CTA click:', error);
      // Don't block the navigation if tracking fails
    }
  };

  return (
    <Button
      asChild
      variant={variant}
      size={size}
      className={className}
      onClick={trackCTAClick}
    >
      <Link to={to}>
        {children}
      </Link>
    </Button>
  );
};

export default CTATracker;