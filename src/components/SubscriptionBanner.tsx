import React from 'react';
import { AlertTriangle, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SubscriptionStatus } from '@/types/supabase';

interface SubscriptionBannerProps {
  subscriptionStatus: SubscriptionStatus;
}

export const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({ subscriptionStatus }) => {

  // Show banner for canceled subscriptions with remaining access OR active trials approaching end
  if ((!subscriptionStatus.is_canceled || !subscriptionStatus.subscribed) && !subscriptionStatus.is_trial_active) {
    return null;
  }

  const isActiveTrial = subscriptionStatus.is_trial_active;
  const daysRemaining = subscriptionStatus.days_remaining || 0;

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
            {isActiveTrial ? (
              <>Your trial ends in <strong>{daysRemaining} days</strong>. Subscribe to continue access.</>
            ) : (
              <>Your subscription was canceled but you have <strong>{daysRemaining} days</strong> remaining. Reactivate to maintain access.</>
            )}
          </span>
        </div>
        <Button
          onClick={handleReactivate}
          size="sm"
          className="ml-4 flex items-center gap-1"
        >
          <Sparkles className="h-3 w-3" />
          {isActiveTrial ? 'Subscribe Now' : 'Reactivate Subscription'}
        </Button>
      </AlertDescription>
    </Alert>
  );
};