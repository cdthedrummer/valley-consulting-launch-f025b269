import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Lightbulb, X, CheckCircle2 } from 'lucide-react';
import LocationInput from './LocationInput';
import IndustrySelector from './IndustrySelector';

interface OnboardingReminderBannerProps {
  currentLocation?: string;
  currentIndustry?: string;
  hasLocationData: boolean;
  hasIndustryData: boolean;
  onLocationChange: (location: string, type: 'zipcode' | 'county') => void;
  onIndustryChange: (industry: string) => void;
  onDismiss: () => void;
}

const OnboardingReminderBanner: React.FC<OnboardingReminderBannerProps> = ({
  currentLocation,
  currentIndustry,
  hasLocationData,
  hasIndustryData,
  onLocationChange,
  onIndustryChange,
  onDismiss,
}) => {
  const [localLocation, setLocalLocation] = useState(currentLocation);
  const [localIndustry, setLocalIndustry] = useState(currentIndustry);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleLocationSelect = (location: string, type: 'zipcode' | 'county') => {
    setLocalLocation(location);
    onLocationChange(location, type);
    
    // Show success if both are now filled
    if (localIndustry) {
      setShowSuccess(true);
      setTimeout(() => {
        onDismiss();
      }, 2000);
    }
  };

  const handleIndustryChange = (industry: string) => {
    setLocalIndustry(industry);
    onIndustryChange(industry);
    
    // Show success if both are now filled
    if (localLocation) {
      setShowSuccess(true);
      setTimeout(() => {
        onDismiss();
      }, 2000);
    }
  };

  if (showSuccess) {
    return (
      <Card className="mx-4 my-3 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="pt-6">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-green-100">
              <CheckCircle2 className="h-6 w-6 text-green-600" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold text-green-900">Profile Complete! 🎉</h3>
              <p className="text-sm text-green-700">
                Your dashboard is now loading personalized insights for {localLocation} in the {localIndustry} industry.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="mx-4 my-3 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">Complete Your Profile for Better Insights</h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={onDismiss}
                  className="h-8 w-8 p-0 hover:bg-primary/10"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <p className="text-sm text-muted-foreground">
                To unlock property opportunities, competitive intelligence, and location-specific insights, complete the fields below.
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pl-[68px]">
            {/* Location Field */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${hasLocationData ? 'bg-green-500' : 'bg-amber-500'}`} />
                <label className="text-sm font-medium">
                  {hasLocationData ? '✓ Business Location' : 'Business Location'}
                </label>
              </div>
              <LocationInput
                onLocationSelect={handleLocationSelect}
                className="w-full"
              />
              {!hasLocationData && (
                <p className="text-xs text-muted-foreground">
                  Enter your ZIP code or county
                </p>
              )}
            </div>

            {/* Industry Field */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${hasIndustryData ? 'bg-green-500' : 'bg-amber-500'}`} />
                <label className="text-sm font-medium">
                  {hasIndustryData ? '✓ Industry Type' : 'Industry Type'}
                </label>
              </div>
              <IndustrySelector
                value={localIndustry}
                onValueChange={handleIndustryChange}
                className="w-full"
              />
              {!hasIndustryData && (
                <p className="text-xs text-muted-foreground">
                  Select your primary industry
                </p>
              )}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingReminderBanner;
