import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertCircle, Sparkles } from 'lucide-react';

const TrialExpired: React.FC = () => {
  const navigate = useNavigate();

  const handleUpgrade = () => {
    // Redirect to Stripe Payment Link
    window.open('https://buy.stripe.com/7sYbJ17kQespcID7aJ0x200', '_blank');
  };

  const handleUpgradeWithDiscount = () => {
    // Redirect to Stripe Payment Link (same link for now)
    window.open('https://buy.stripe.com/7sYbJ17kQespcID7aJ0x200', '_blank');
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