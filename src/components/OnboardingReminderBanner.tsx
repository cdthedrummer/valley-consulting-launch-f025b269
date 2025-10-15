import React, { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Lightbulb, X, CheckCircle2, Building2, Edit, MapPin, Briefcase, AlertCircle } from 'lucide-react';
import LocationInput from './LocationInput';
import IndustrySelector from './IndustrySelector';

interface OnboardingReminderBannerProps {
  currentLocation?: string;
  currentIndustry?: string;
  businessName?: string;
  hasLocationData: boolean;
  hasIndustryData: boolean;
  onLocationChange: (location: string, type: 'zipcode' | 'county') => void;
  onIndustryChange: (industry: string) => void;
  onBusinessNameChange: (name: string) => void;
  onDismiss: () => void;
}

const OnboardingReminderBanner: React.FC<OnboardingReminderBannerProps> = ({
  currentLocation,
  currentIndustry,
  businessName,
  hasLocationData,
  hasIndustryData,
  onLocationChange,
  onIndustryChange,
  onBusinessNameChange,
  onDismiss,
}) => {
  const [localLocation, setLocalLocation] = useState(currentLocation);
  const [localIndustry, setLocalIndustry] = useState(currentIndustry);
  const [localBusinessName, setLocalBusinessName] = useState(businessName);
  const [showSuccess, setShowSuccess] = useState(false);
  const [isExpanded, setIsExpanded] = useState(!hasLocationData || !hasIndustryData);

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

  const handleBusinessNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const name = e.target.value;
    setLocalBusinessName(name);
  };

  const handleBusinessNameBlur = () => {
    if (localBusinessName && localBusinessName !== businessName) {
      onBusinessNameChange(localBusinessName);
    }
  };

  if (showSuccess) {
    return (
      <Card className="mx-4 my-3 sticky top-0 z-10 border-2 border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 backdrop-blur-sm">
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

  // Collapsed view when profile is complete - shows business info with edit capability
  if (!isExpanded && hasLocationData && hasIndustryData) {
    return (
      <Card className="mx-4 my-3 sticky top-0 z-10 backdrop-blur-sm border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-background to-accent/5">
        <CardContent className="py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-primary/10">
                  <Building2 className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Intelligence Dashboard For</div>
                  <div className="font-bold text-lg text-foreground">
                    {businessName || 'Your Business'}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-2">
                <Badge variant="secondary" className="gap-1.5">
                  <Briefcase className="h-3 w-3" />
                  {currentIndustry}
                </Badge>
                <Badge variant="outline" className="gap-1.5">
                  <MapPin className="h-3 w-3" />
                  {currentLocation}
                </Badge>
              </div>
            </div>
            
            <Button 
              variant="ghost" 
              size="sm"
              onClick={() => setIsExpanded(true)}
              className="gap-2"
            >
              <Edit className="h-4 w-4" />
              Edit Profile
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Collapsed view when profile is INCOMPLETE - shows setup required with click to expand
  if (!isExpanded && (!hasLocationData || !hasIndustryData)) {
    return (
      <Card 
        className="mx-4 my-3 sticky top-0 z-10 backdrop-blur-sm border-2 border-amber-200 bg-gradient-to-r from-amber-50 via-background to-orange-50 cursor-pointer hover:border-amber-300 transition-colors"
        onClick={() => setIsExpanded(true)}
      >
        <CardContent className="py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-lg bg-amber-100">
                  <Building2 className="h-5 w-5 text-amber-600" />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Intelligence Dashboard For</div>
                  <div className="font-bold text-lg text-foreground">
                    {businessName || 'Your Business'}
                  </div>
                </div>
              </div>
              
              <Badge 
                variant="destructive" 
                className="gap-1.5 cursor-pointer"
              >
                <AlertCircle className="h-3 w-3" />
                Setup Required - Click to Complete
              </Badge>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  // Expanded view for setup/editing
  return (
    <Card className="mx-4 my-3 sticky top-0 z-10 border-2 border-primary/20 bg-gradient-to-r from-primary/5 to-accent/5 backdrop-blur-sm">
      <CardContent className="pt-6">
        <div className="space-y-4">
          {/* Header */}
          <div className="flex items-start gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <Lightbulb className="h-6 w-6 text-primary" />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between mb-2">
                <h3 className="font-semibold text-lg">
                  {hasLocationData && hasIndustryData ? 'Edit Your Profile' : 'Complete Your Profile for Better Insights'}
                </h3>
                <div className="flex gap-2">
                  {hasLocationData && hasIndustryData && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsExpanded(false)}
                      className="h-8"
                    >
                      Done
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onDismiss}
                    className="h-8 w-8 p-0 hover:bg-primary/10"
                  >
                    <X className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-sm text-muted-foreground">
                {hasLocationData && hasIndustryData 
                  ? 'Update your business information to refine your dashboard insights.'
                  : 'To unlock competitive intelligence and location-specific insights, complete the fields below.'}
              </p>
            </div>
          </div>

          {/* Form Fields */}
          <div className="space-y-4 pl-[68px]">
            {/* Business Name Field */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className={`h-2 w-2 rounded-full ${localBusinessName ? 'bg-green-500' : 'bg-gray-300'}`} />
                <label className="text-sm font-medium">
                  {localBusinessName ? '✓ Business Name' : 'Business Name (Optional)'}
                </label>
              </div>
              <Input
                type="text"
                placeholder="Enter your business name"
                value={localBusinessName || ''}
                onChange={handleBusinessNameChange}
                onBlur={handleBusinessNameBlur}
                className="w-full"
              />
              <p className="text-xs text-muted-foreground">
                This helps personalize your AI insights
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        </div>
      </CardContent>
    </Card>
  );
};

export default OnboardingReminderBanner;
