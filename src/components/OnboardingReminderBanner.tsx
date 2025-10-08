import React from 'react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Settings, X } from 'lucide-react';

interface OnboardingReminderBannerProps {
  onOpenSettings: () => void;
  onDismiss: () => void;
}

const OnboardingReminderBanner: React.FC<OnboardingReminderBannerProps> = ({
  onOpenSettings,
  onDismiss,
}) => {
  return (
    <Alert className="mx-4 my-3 bg-blue-50 border-blue-200">
      <Settings className="h-4 w-4 text-blue-600" />
      <AlertTitle className="text-blue-900 flex items-center justify-between">
        Complete Your Setup
        <Button
          variant="ghost"
          size="sm"
          onClick={onDismiss}
          className="h-6 w-6 p-0 hover:bg-blue-100"
        >
          <X className="h-4 w-4" />
        </Button>
      </AlertTitle>
      <AlertDescription className="text-blue-800 flex items-center justify-between">
        <span>
          Get better results by setting your location and industry preferences.
        </span>
        <Button
          onClick={onOpenSettings}
          size="sm"
          className="ml-4 bg-blue-600 hover:bg-blue-700"
        >
          Update Settings
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default OnboardingReminderBanner;
