import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart3 } from 'lucide-react';
import ResponsiveDashboard from './dashboard/ResponsiveDashboard';

interface DashboardWithControlsProps {
  userLocation?: string;
  userLocationType?: 'zipcode' | 'county' | null;
  userIndustry?: string;
  businessName?: string;
  className?: string;
  onChatWithPlan?: (planContent: string) => void;
}

const DashboardWithControls: React.FC<DashboardWithControlsProps> = ({
  userLocation,
  userLocationType,
  userIndustry,
  businessName,
  className,
  onChatWithPlan,
}) => {
  return (
    <div className={className}>
      <ResponsiveDashboard
        location={userLocation}
        locationType={userLocationType}
        industry={userIndustry}
        businessName={businessName}
        onChatWithPlan={onChatWithPlan}
      />
    </div>
  );
};

export default DashboardWithControls;