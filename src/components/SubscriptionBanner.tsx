import React from 'react';
import { AlertTriangle, Clock, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { SubscriptionStatus } from '@/types/supabase';
import { reactivateSubscription } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

interface SubscriptionBannerProps {
  subscriptionStatus: SubscriptionStatus;
}

export const SubscriptionBanner: React.FC<SubscriptionBannerProps> = ({ subscriptionStatus }) => {
  const { toast } = useToast();

  if (!subscriptionStatus.is_canceled || !subscriptionStatus.subscribed) {
    return null;
  }

  const handleReactivate = async () => {
    try {
      const { url } = await reactivateSubscription();
      if (url) {
        window.open(url, '_blank');
      }
    } catch (error) {
      console.error('Error reactivating subscription:', error);
      toast({
        title: "Error",
        description: "Failed to start reactivation process. Please try again.",
        variant: "destructive",
      });
    }
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