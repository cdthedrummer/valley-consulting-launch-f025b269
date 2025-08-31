import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, Home, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollableWidget from '@/components/ScrollableWidget';
import { cn } from '@/lib/utils';

interface OpportunityData {
  location: string;
  coordinates: [number, number];
  score: number;
  properties: number;
  avgValue: number;
  renovationPotential: 'high' | 'medium' | 'low';
  recentActivity: number;
}

interface OpportunityMapWidgetProps {
  location?: string;
  industry?: string;
  className?: string;
}

const OpportunityMapWidget: React.FC<OpportunityMapWidgetProps> = ({
  location = 'Hudson Valley',
  industry = 'Construction',
  className
}) => {
  const [opportunities, setOpportunities] = useState<OpportunityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityData | null>(null);

  useEffect(() => {
    fetchOpportunities();
  }, [location, industry]);

  const fetchOpportunities = async () => {
    setIsLoading(true);
    
    // Simulate API call - replace with real data
    setTimeout(() => {
      const mockOpportunities: OpportunityData[] = [
        {
          location: 'Nanuet, NY',
          coordinates: [41.0876, -74.0132],
          score: 92,
          properties: 23,
          avgValue: 485000,
          renovationPotential: 'high',
          recentActivity: 8
        },
        {
          location: 'Pearl River, NY',
          coordinates: [41.0587, -74.0210],
          score: 87,
          properties: 31,
          avgValue: 520000,
          renovationPotential: 'medium',
          recentActivity: 12
        },
        {
          location: 'Spring Valley, NY',
          coordinates: [41.1126, -74.0437],
          score: 78,
          properties: 18,
          avgValue: 435000,
          renovationPotential: 'high',
          recentActivity: 5
        },
        {
          location: 'Suffern, NY',
          coordinates: [41.1148, -74.1496],
          score: 84,
          properties: 27,
          avgValue: 465000,
          renovationPotential: 'medium',
          recentActivity: 9
        }
      ];
      
      setOpportunities(mockOpportunities);
      setSelectedOpportunity(mockOpportunities[0]);
      setIsLoading(false);
    }, 1000);
  };

  const getScoreColor = (score: number) => {
    if (score >= 85) return 'text-green-600 bg-green-100';
    if (score >= 70) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getPotentialIcon = (potential: string) => {
    const colors = {
      high: 'text-green-600',
      medium: 'text-yellow-600',
      low: 'text-red-600'
    };
    return colors[potential as keyof typeof colors] || colors.medium;
  };

  if (isLoading) {
    return (
      <Card className={cn("border-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Opportunity Map
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="h-48 bg-muted animate-pulse rounded-lg" />
            <div className="h-20 bg-muted animate-pulse rounded-lg" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollableWidget delay={400}>
      <Card className={cn("border-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 overflow-hidden", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-blue-600" />
              Opportunity Map
            </div>
            <Button variant="outline" size="sm" onClick={fetchOpportunities}>
              <RefreshCw className="h-3 w-3" />
            </Button>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="space-y-4">
          {/* Map Placeholder - Would integrate with real mapping library */}
          <div className="relative h-48 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center">
                <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <p className="text-sm text-muted-foreground">Interactive map coming soon</p>
                <p className="text-xs text-muted-foreground">Showing {opportunities.length} opportunities</p>
              </div>
            </div>
            
            {/* Mock pin indicators */}
            <div className="absolute top-4 left-6 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute top-8 right-8 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-6 left-1/3 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
            <div className="absolute bottom-4 right-1/4 w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
          </div>

          {/* Opportunity List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {opportunities.map((opportunity, index) => (
              <div
                key={index}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md",
                  selectedOpportunity?.location === opportunity.location
                    ? "bg-primary/10 border-primary/30"
                    : "bg-background/50 border-border/50 hover:bg-background/70"
                )}
                onClick={() => setSelectedOpportunity(opportunity)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{opportunity.location}</h4>
                  <div className={cn(
                    "px-2 py-1 rounded-full text-xs font-medium",
                    getScoreColor(opportunity.score)
                  )}>
                    {opportunity.score}
                  </div>
                </div>
                
                <div className="grid grid-cols-3 gap-2 text-xs text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <Home className="h-3 w-3" />
                    {opportunity.properties} homes
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className={cn("h-3 w-3", getPotentialIcon(opportunity.renovationPotential))} />
                    {opportunity.renovationPotential} potential
                  </div>
                  <div className="text-right">
                    ${(opportunity.avgValue / 1000).toFixed(0)}K avg
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Opportunity Details */}
          {selectedOpportunity && (
            <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
              <h4 className="font-medium mb-2">{selectedOpportunity.location}</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Opportunity Score:</span>
                  <span className="ml-2 font-medium">{selectedOpportunity.score}/100</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Recent Activity:</span>
                  <span className="ml-2 font-medium">{selectedOpportunity.recentActivity} sales</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Properties:</span>
                  <span className="ml-2 font-medium">{selectedOpportunity.properties}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Avg Value:</span>
                  <span className="ml-2 font-medium">${(selectedOpportunity.avgValue / 1000).toFixed(0)}K</span>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </ScrollableWidget>
  );
};

export default OpportunityMapWidget;