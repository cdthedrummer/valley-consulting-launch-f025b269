import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2, CheckCircle, AlertCircle } from 'lucide-react';
import SEOHead from '@/components/SEOHead';

const PaymentSuccess: React.FC = () => {
  const [status, setStatus] = useState<'checking' | 'success' | 'failed' | 'timeout'>('checking');
  const [attempts, setAttempts] = useState(0);
  const navigate = useNavigate();
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      navigate('/auth');
      return;
    }

    checkSubscriptionStatus();
  }, [user]);

  const checkSubscriptionStatus = async () => {
    const maxAttempts = 12; // Check for up to 2 minutes (12 attempts x 10 seconds)
    const delayBetweenAttempts = 10000; // 10 seconds

    const attemptCheck = async (attempt: number): Promise<boolean> => {
      try {
        setAttempts(attempt);

        const { data, error } = await supabase.functions.invoke('check-subscription', {
          headers: {
            Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
          },
        });

        if (error) throw error;

        if (data.subscribed) {
          setStatus('success');
          setTimeout(() => navigate('/ai/dashboard'), 2000);
          return true;
        }

        if (attempt >= maxAttempts) {
          setStatus('timeout');
          return false;
        }

        // Wait before next attempt
        setTimeout(() => attemptCheck(attempt + 1), delayBetweenAttempts);
        return false;

      } catch (error) {
        console.error('Error checking subscription:', error);
        if (attempt >= maxAttempts) {
          setStatus('failed');
          return false;
        }
        
        // Wait before retry on error
        setTimeout(() => attemptCheck(attempt + 1), delayBetweenAttempts);
        return false;
      }
    };

    attemptCheck(1);
  };

  const handleManualCheck = () => {
    setStatus('checking');
    setAttempts(0);
    checkSubscriptionStatus();
  };

  const handleGoToDashboard = () => {
    navigate('/ai/dashboard');
  };

  return (
    <>
      <SEOHead 
        title="Payment Success - AI Copilot Activated"
        description="Your AI Copilot subscription has been activated successfully."
        canonicalUrl="/payment-success"
      />
      
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-background via-background to-muted p-4">
        <Card className="w-full max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            {status === 'checking' && (
              <>
                <Loader2 className="h-12 w-12 mx-auto mb-4 animate-spin text-primary" />
                <h1 className="text-2xl font-bold mb-2">Processing Your Subscription</h1>
                <p className="text-muted-foreground mb-4">
                  We're activating your AI Copilot subscription...
                </p>
                <p className="text-sm text-muted-foreground">
                  Attempt {attempts} of 12 - This may take up to 2 minutes
                </p>
              </>
            )}

            {status === 'success' && (
              <>
                <CheckCircle className="h-12 w-12 mx-auto mb-4 text-green-500" />
                <h1 className="text-2xl font-bold mb-2 text-green-700">Success!</h1>
                <p className="text-muted-foreground mb-4">
                  Your AI Copilot subscription is now active. Redirecting you to the dashboard...
                </p>
              </>
            )}

            {status === 'timeout' && (
              <>
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-amber-500" />
                <h1 className="text-2xl font-bold mb-2">Still Processing</h1>
                <p className="text-muted-foreground mb-6">
                  Your payment is still being processed. This can sometimes take a few minutes.
                </p>
                <div className="space-y-3">
                  <Button onClick={handleManualCheck} className="w-full">
                    Check Again
                  </Button>
                  <Button onClick={handleGoToDashboard} variant="outline" className="w-full">
                    Go to Dashboard Anyway
                  </Button>
                </div>
              </>
            )}

            {status === 'failed' && (
              <>
                <AlertCircle className="h-12 w-12 mx-auto mb-4 text-destructive" />
                <h1 className="text-2xl font-bold mb-2">Verification Error</h1>
                <p className="text-muted-foreground mb-6">
                  We had trouble verifying your subscription. Don't worry - if your payment went through, 
                  your subscription is likely active.
                </p>
                <div className="space-y-3">
                  <Button onClick={handleManualCheck} className="w-full">
                    Try Again
                  </Button>
                  <Button onClick={handleGoToDashboard} variant="outline" className="w-full">
                    Go to Dashboard
                  </Button>
                </div>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </>
  );
};

export default PaymentSuccess;