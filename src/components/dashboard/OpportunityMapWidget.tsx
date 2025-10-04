import React, { useState, useEffect, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, TrendingUp, Home, DollarSign, Activity, Target } from 'lucide-react';
import MapboxMap from '@/components/ui/mapbox-map';
import ScrollableWidget from '@/components/ScrollableWidget';
import { cn } from '@/lib/utils';

interface PropertyDetail {
  address: string;
  location: [number, number]; // [lng, lat]
  yearBuilt: number;
  lastSoldDate: string;
  lastSoldPrice: number;
  estimatedValue: number;
  renovationPotential: 'high' | 'medium' | 'low';
}

interface OpportunityData {
  name: string;
  location: [number, number]; // [lng, lat]
  score: number;
  propertyCount: number;
  avgValue: number;
  renovationPotential: 'high' | 'medium' | 'low';
  recentActivity: string;
  properties: PropertyDetail[];
}

interface OpportunityMapWidgetProps {
  location?: string;
  industry?: string;
  className?: string;
}

const OpportunityMapWidget: React.FC<OpportunityMapWidgetProps> = ({
  location,
  industry,
  className,
}) => {
  const [opportunities, setOpportunities] = useState<OpportunityData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedOpportunity, setSelectedOpportunity] = useState<OpportunityData | null>(null);

  useEffect(() => {
    fetchOpportunities();
  }, [location, industry]);

  // Seeded random generator for consistent property locations
  const seededRandom = (seed: number) => {
    let x = Math.sin(seed++) * 10000;
    return x - Math.floor(x);
  };

  const generatePropertyMarkers = (
    centerLng: number,
    centerLat: number,
    count: number,
    areaName: string,
    baseScore: number
  ): PropertyDetail[] => {
    const properties: PropertyDetail[] = [];
    const seed = areaName.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
    
    // Distribute in a golden-angle spiral pattern with realistic distances
    const goldenAngle = Math.PI * (3 - Math.sqrt(5)); // ~137.5 degrees
    const maxRadius = 0.02; // ~2km spread in degrees
    
    for (let i = 0; i < count; i++) {
      const angle = i * goldenAngle;
      const radius = Math.sqrt(i / count) * maxRadius * (0.5 + seededRandom(seed + i) * 0.5);
      
      const lng = centerLng + radius * Math.cos(angle);
      const lat = centerLat + radius * Math.sin(angle);
      
      const yearBuilt = Math.floor(1950 + seededRandom(seed + i * 2) * 60);
      const monthsAgo = Math.floor(seededRandom(seed + i * 3) * 12);
      const lastSoldPrice = Math.floor(350000 + seededRandom(seed + i * 4) * 300000);
      const appreciationRate = 1 + (seededRandom(seed + i * 5) * 0.15);
      
      const lastSoldDate = new Date();
      lastSoldDate.setMonth(lastSoldDate.getMonth() - monthsAgo);
      
      const streetNum = Math.floor(100 + seededRandom(seed + i * 6) * 900);
      const streets = ['Main St', 'Oak Ave', 'Maple Dr', 'Pine Rd', 'Cedar Ln', 'Elm St', 'Park Ave'];
      const streetName = streets[Math.floor(seededRandom(seed + i * 7) * streets.length)];
      
      let potential: 'high' | 'medium' | 'low' = 'low';
      if (yearBuilt < 1970 && lastSoldPrice < 400000) potential = 'high';
      else if (yearBuilt < 1985 && lastSoldPrice < 500000) potential = 'medium';
      
      properties.push({
        address: `${streetNum} ${streetName}, ${areaName}`,
        location: [lng, lat],
        yearBuilt,
        lastSoldDate: lastSoldDate.toLocaleDateString(),
        lastSoldPrice,
        estimatedValue: Math.floor(lastSoldPrice * appreciationRate),
        renovationPotential: potential
      });
    }
    
    return properties;
  };

  const fetchOpportunities = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const baseAreas = [
      { name: "Nanuet, NY", location: [-74.0135, 41.0887] as [number, number], score: 87, avgValue: 475000, potential: 'high' as const },
      { name: "New City, NY", location: [-73.9893, 41.1476] as [number, number], score: 82, avgValue: 520000, potential: 'high' as const },
      { name: "Pearl River, NY", location: [-74.0218, 41.0587] as [number, number], score: 79, avgValue: 490000, potential: 'medium' as const },
      { name: "Spring Valley, NY", location: [-74.0438, 41.1132] as [number, number], score: 75, avgValue: 425000, potential: 'high' as const },
      { name: "Suffern, NY", location: [-74.1496, 41.1148] as [number, number], score: 71, avgValue: 465000, potential: 'medium' as const }
    ];
    
    const mockData: OpportunityData[] = baseAreas.map(area => {
      const propertyCount = Math.floor(15 + Math.random() * 45); // 15-60 properties per area
      return {
        ...area,
        renovationPotential: area.potential,
        propertyCount,
        recentActivity: `${Math.floor(propertyCount * 0.3)} sales last quarter`,
        properties: generatePropertyMarkers(
          area.location[0],
          area.location[1],
          propertyCount,
          area.name,
          area.score
        )
      };
    });
    
    setOpportunities(mockData);
    setIsLoading(false);
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

  const getMarkerColor = (potential: 'high' | 'medium' | 'low') => {
    if (potential === 'high') return '#22c55e'; // green-500
    if (potential === 'medium') return '#eab308'; // yellow-500
    return '#ef4444'; // red-500
  };

  const allPropertyMarkers = useMemo(() => {
    return opportunities.flatMap(opp => 
      opp.properties.map(prop => ({
        location: prop.location,
        color: getMarkerColor(prop.renovationPotential),
        property: prop
      }))
    );
  }, [opportunities]);

  const handleMarkerClick = (property: PropertyDetail) => {
    const parentOpp = opportunities.find(opp => 
      opp.properties.some(p => p.address === property.address)
    );
    if (parentOpp) {
      setSelectedOpportunity(parentOpp);
    }
  };

  if (isLoading) {
    return (
      <ScrollableWidget delay={400}>
        <Card className={cn("border-0 shadow-lg", className)}>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-5 w-5" />
              Opportunity Map
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="h-96 bg-muted animate-pulse rounded-lg" />
              <div className="h-32 bg-muted animate-pulse rounded-lg" />
            </div>
          </CardContent>
        </Card>
      </ScrollableWidget>
    );
  }

  return (
    <ScrollableWidget delay={400}>
      <Card className={cn("border-0 shadow-lg overflow-hidden", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Target className="h-5 w-5 text-primary" />
            Property Opportunity Map
          </CardTitle>
          <p className="text-sm text-muted-foreground">
            {allPropertyMarkers.length} properties across {opportunities.length} target areas
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Map */}
          <div className="h-96 rounded-lg overflow-hidden border">
            <MapboxMap
              center={[-74.0135, 41.0887]}
              zoom={10}
              markers={allPropertyMarkers.map(marker => ({
                location: marker.location,
                color: marker.color,
                popup: `
                  <div class="p-3 min-w-[200px]">
                    <h3 class="font-bold text-sm mb-2">${marker.property.address}</h3>
                    <div class="space-y-1 text-xs">
                      <p><strong>Year Built:</strong> ${marker.property.yearBuilt}</p>
                      <p><strong>Last Sold:</strong> ${marker.property.lastSoldDate}</p>
                      <p><strong>Last Price:</strong> $${marker.property.lastSoldPrice.toLocaleString()}</p>
                      <p><strong>Est. Value:</strong> $${marker.property.estimatedValue.toLocaleString()}</p>
                      <p><strong>Potential:</strong> <span class="capitalize">${marker.property.renovationPotential}</span></p>
                    </div>
                  </div>
                `
              }))}
              onMarkerClick={(location) => {
                const clicked = allPropertyMarkers.find(
                  m => m.location[0] === location[0] && m.location[1] === location[1]
                );
                if (clicked) handleMarkerClick(clicked.property);
              }}
              className="w-full h-full"
              autoFit={true}
            />
          </div>

          {/* Opportunity Areas List */}
          <div className="space-y-2 max-h-64 overflow-y-auto">
            <h3 className="font-semibold text-sm">Target Areas</h3>
            {opportunities.map((opportunity, index) => (
              <div
                key={index}
                className={cn(
                  "p-3 rounded-lg border cursor-pointer transition-all hover:shadow-md",
                  selectedOpportunity?.name === opportunity.name
                    ? "bg-primary/10 border-primary"
                    : "bg-card hover:bg-muted/50"
                )}
                onClick={() => setSelectedOpportunity(opportunity)}
              >
                <div className="flex items-center justify-between mb-2">
                  <h4 className="font-medium text-sm">{opportunity.name}</h4>
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
                    {opportunity.propertyCount} homes
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className={cn("h-3 w-3", getPotentialIcon(opportunity.renovationPotential))} />
                    {opportunity.renovationPotential}
                  </div>
                  <div className="text-right">
                    ${(opportunity.avgValue / 1000).toFixed(0)}K avg
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Selected Area Details */}
          {selectedOpportunity && (
            <div className="bg-muted/50 rounded-lg p-4 border">
              <h4 className="font-semibold mb-3">{selectedOpportunity.name}</h4>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div>
                  <span className="text-muted-foreground">Score:</span>
                  <span className="ml-2 font-medium">{selectedOpportunity.score}/100</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Properties:</span>
                  <span className="ml-2 font-medium">{selectedOpportunity.propertyCount}</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Avg Value:</span>
                  <span className="ml-2 font-medium">${(selectedOpportunity.avgValue / 1000).toFixed(0)}K</span>
                </div>
                <div>
                  <span className="text-muted-foreground">Activity:</span>
                  <span className="ml-2 font-medium">{selectedOpportunity.recentActivity}</span>
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
