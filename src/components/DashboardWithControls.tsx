import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { BarChart3, Menu } from 'lucide-react';
import ResponsiveDashboard from './dashboard/ResponsiveDashboard';
import ChatControls from './ChatControls';

interface DashboardWithControlsProps {
  userLocation?: string;
  userLocationType?: 'zipcode' | 'county' | null;
  userIndustry?: string;
  userLanguage: string;
  sidebarOpen: boolean;
  isMobile: boolean;
  onToggleSidebar: () => void;
  onLocationChange: (location: string, type: 'zipcode' | 'county') => void;
  onIndustryChange: (industry: string) => void;
  onLanguageChange: (language: string) => void;
  onQuestionSelect: (question: string) => void;
}

const DashboardWithControls: React.FC<DashboardWithControlsProps> = ({
  userLocation,
  userLocationType,
  userIndustry,
  userLanguage,
  sidebarOpen,
  isMobile,
  onToggleSidebar,
  onLocationChange,
  onIndustryChange,
  onLanguageChange,
  onQuestionSelect,
}) => {
  return (
    <Card className="flex-1 flex flex-col shadow-sm min-h-0">
      <CardHeader className="border-b bg-background rounded-t-lg flex-shrink-0 pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="mr-3"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <BarChart3 className="h-5 w-5 md:h-6 md:w-6 mr-2 text-primary" />
            <span className="text-base md:text-lg">Market Intelligence</span>
            {userLocation && (
              <span className="ml-3 text-xs md:text-sm text-muted-foreground bg-accent px-2 py-1 rounded">
                {userLocation}
              </span>
            )}
          </CardTitle>
        </div>
      </CardHeader>
        
      <CardContent className="flex-1 flex flex-col p-0 min-h-0">
        <ScrollArea className="flex-1 p-3 md:p-4">
          <ResponsiveDashboard
            location={userLocation}
            locationType={userLocationType}
            industry={userIndustry}
            className="pb-4"
          />
        </ScrollArea>
      </CardContent>
    </Card>
  );
};

export default DashboardWithControls;