import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Sparkles } from 'lucide-react';
import { createCheckoutSession } from '@/lib/supabase';
import { useToast } from '@/hooks/use-toast';

const TrialExpired: React.FC = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleUpgrade = async () => {
    try {
      const { url } = await createCheckoutSession();
      if (url) {
        window.open(url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout session:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleUpgradeWithDiscount = async () => {
    try {
      // Use regular checkout for now
      const { url } = await createCheckoutSession();
      if (url) {
        window.open(url, '_blank');
      }
    } catch (error) {
      console.error('Error creating checkout session with discount:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            <AlertCircle className="h-12 w-12 text-warning" />
          </div>
          <CardTitle className="text-2xl">Trial Expired</CardTitle>
          <CardDescription>
            Your 7-day AI Copilot trial has ended. Upgrade to continue using our AI assistant.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-accent/50 p-4 rounded-lg border border-accent">
            <div className="flex items-center gap-2 mb-2">
              <Sparkles className="h-4 w-4 text-primary" />
              <span className="font-semibold text-sm">Special Offer</span>
            </div>
            <p className="text-sm text-muted-foreground mb-3">
              Get 50% off your first 3 months with code <span className="font-mono font-bold">TRYAI</span>
            </p>
            <Button 
              onClick={handleUpgradeWithDiscount}
              className="w-full"
              size="sm"
            >
              Upgrade with 50% Discount
            </Button>
          </div>
          
          <Button 
            onClick={handleUpgrade}
            variant="outline"
            className="w-full"
          >
            Upgrade to AI Copilot - $15/month
          </Button>
          
          <Button 
            onClick={() => navigate('/')}
            variant="ghost"
            className="w-full"
          >
            Back to Homepage
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default TrialExpired;