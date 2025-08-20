import React from 'react';
import { AlertTriangle, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SubscriptionStatus } from '@/types/supabase';

interface SubscriptionBannerProps {
  subscriptionStatus: SubscriptionStatus;
}

export const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({ subscriptionStatus }) => {

  if (!subscriptionStatus.is_canceled || !subscriptionStatus.subscribed) {
    return null;
  }

  const handleReactivate = () => {
    // Redirect to Stripe Payment Link
    window.open('https://buy.stripe.com/7sYbJ17kQespcID7aJ0x200', '_blank');
  };

  return (
    <Alert className="mb-6 border-warning bg-warning/10">
      <AlertTriangle className="h-4 w-4 text-warning" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Clock className="h-4 w-4" />
          <span>
            Your trial ends in <strong>{subscriptionStatus.days_remaining || 0} days</strong>.
            You'll lose access to your chat history unless you reactivate.
          </span>
        </div>
        <Button
          onClick={handleReactivate}
          size="sm"
          className="ml-4 flex items-center gap-1"
        >
          <Sparkles className="h-3 w-3" />
          Reactivate Subscription
        </Button>
      </AlertDescription>
    </Alert>
  );
};