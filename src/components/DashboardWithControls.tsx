import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart3 } from 'lucide-react';
import ResponsiveDashboard from './dashboard/ResponsiveDashboard';

interface DashboardWithControlsProps {
  userLocation?: string;
  userLocationType?: 'zipcode' | 'county' | null;
  userIndustry?: string;
  className?: string;
  onChatWithPlan?: (planContent: string) => void;
}

const DashboardWithControls: React.FC<DashboardWithControlsProps> = ({
  userLocation,
  userLocationType,
  userIndustry,
  className,
  onChatWithPlan,
}) => {
  const displayLocation = userLocationType === 'zipcode' ? `ZIP ${userLocation}` : userLocation;

  return (
    <div className={className}>
      <ResponsiveDashboard
        location={userLocation}
        locationType={userLocationType}
        industry={userIndustry}
        onChatWithPlan={onChatWithPlan}
      />
    </div>
  );
};

export default DashboardWithControls;