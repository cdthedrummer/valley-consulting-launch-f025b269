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
}

const DashboardWithControls: React.FC<DashboardWithControlsProps> = ({
  userLocation,
  userLocationType,
  userIndustry,
  className,
}) => {
  const displayLocation = userLocationType === 'zipcode' ? `ZIP ${userLocation}` : userLocation;

  return (
    <div className={className}>
      {/* Dashboard Header */}
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <BarChart3 className="h-6 w-6 text-primary" />
          <h1 className="text-2xl font-bold">Market Intelligence Dashboard</h1>
        </div>
        <p className="text-muted-foreground">
          Real-time insights for {userIndustry} businesses in {displayLocation}
        </p>
      </div>

      {/* Dashboard Content */}
      <ResponsiveDashboard
        location={userLocation}
        locationType={userLocationType}
        industry={userIndustry}
      />
    </div>
  );
};

export default DashboardWithControls;