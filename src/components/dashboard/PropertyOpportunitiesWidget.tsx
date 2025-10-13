import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Home, 
  TrendingUp, 
  MapPin, 
  DollarSign,
  Users,
  Calendar,
  RefreshCw,
  ExternalLink,
  Search
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Property {
  address: string;
  estimatedValue: number;
  yearBuilt: number;
  lastRenovated: number | null;
  opportunityScore: number;
  reason: string;
  distance?: number;
  homeownerProfile: {
    estimatedAge: number;
    estimatedIncome: number;
    likelyNeeds: string;
  };
}

interface PropertyData {
  properties: Property[];
  marketInsights: {
    averageHomeAge: number;
    percentNeedingWork: number;
    topNeeds: string[];
    seasonalTrends: {
      peakSeason: string;
      slowSeason: string;
      currentDemand: string;
    };
  };
  competitorActivity: {
    activeCompetitors: number;
    averageResponseTime: string;
    marketSaturation: string;
    pricingInsights: {
      averageJobValue: number;
      priceRange: string;
    };
  };
}

export const PropertyOpportunitiesWidget: React.FC<{ 
  location?: string;
  industry?: string;
  className?: string;
}> = ({ location = 'Hudson Valley', industry = 'Construction', className }) => {
  const [data, setData] = useState<PropertyData | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadPropertyData();
  }, [location, industry]);

  const loadPropertyData = async () => {
    try {
      const { data: result, error } = await supabase.functions.invoke('scrape-property-data', {
        body: { location, industry }
      });

      if (error) throw error;
      
      setData(result.data);
    } catch (error) {
      console.error('Error loading property data:', error);
      toast({
        title: "Error loading property data",
        description: "Unable to fetch property opportunities",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    await loadPropertyData();
    toast({
      title: "Data refreshed",
      description: "Latest property opportunities loaded",
    });
  };

  const getOpportunityColor = (score: number) => {
    if (score >= 75) return 'bg-green-500/10 text-green-500 border-green-500/20';
    if (score >= 50) return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
    return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
  };

  const handleGoogleMaps = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.google.com/maps/search/?api=1&query=${encodedAddress}`, '_blank');
  };

  const handleZillowSearch = (address: string) => {
    const encodedAddress = encodeURIComponent(address);
    window.open(`https://www.zillow.com/homes/${encodedAddress}`, '_blank');
  };

  const handleGoogleSearch = (address: string) => {
    const encodedQuery = encodeURIComponent(`${address} ${industry}`);
    window.open(`https://www.google.com/search?q=${encodedQuery}`, '_blank');
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Property Opportunities
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (!data) return null;

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Home className="h-5 w-5" />
            Property Opportunities
            <Badge variant="secondary">
              {data.properties.length} leads
            </Badge>
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={refreshData}
            disabled={refreshing}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Market Overview */}
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-1">
                <TrendingUp className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Avg Home Age</span>
              </div>
              <p className="text-lg font-semibold">{data.marketInsights.averageHomeAge} years</p>
            </div>
            <div className="p-3 rounded-lg bg-muted/50">
              <div className="flex items-center gap-2 mb-1">
                <Home className="h-3 w-3 text-muted-foreground" />
                <span className="text-xs text-muted-foreground">Need Work</span>
              </div>
              <p className="text-lg font-semibold">{data.marketInsights.percentNeedingWork}%</p>
            </div>
          </div>

          {/* Top Needs */}
          <div>
            <h4 className="text-sm font-semibold mb-2">Top Service Needs</h4>
            <div className="flex flex-wrap gap-2">
              {data.marketInsights.topNeeds.slice(0, 4).map((need, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {need}
                </Badge>
              ))}
            </div>
          </div>

          {/* Property List */}
          <div>
            <h4 className="text-sm font-semibold mb-2">High-Opportunity Properties</h4>
            <ScrollArea className="h-[300px]">
              <div className="space-y-3 pr-4">
                {data.properties
                  .sort((a, b) => b.opportunityScore - a.opportunityScore)
                  .map((property, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <MapPin className="h-3 w-3 text-muted-foreground" />
                            <p className="text-sm font-medium line-clamp-1">{property.address}</p>
                          </div>
                          <div className="flex gap-2 flex-wrap">
                            <Badge 
                              variant="outline" 
                              className={`text-xs ${getOpportunityColor(property.opportunityScore)}`}
                            >
                              {Math.round(property.opportunityScore)}% opportunity
                            </Badge>
                            {property.distance && (
                              <Badge variant="outline" className="text-xs">
                                📍 {property.distance.toFixed(1)} mi
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-1 mb-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Value</span>
                          <span className="font-medium">${property.estimatedValue.toLocaleString()}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Built</span>
                          <span className="font-medium">{property.yearBuilt}</span>
                        </div>
                        <div className="flex items-center justify-between text-xs">
                          <span className="text-muted-foreground">Last Renovated</span>
                          <span className="font-medium">{property.lastRenovated || 'Never'}</span>
                        </div>
                      </div>

                      <div className="p-2 rounded bg-muted/30 mb-3">
                        <p className="text-xs text-muted-foreground mb-1">Why this property?</p>
                        <p className="text-xs font-medium">{property.reason}</p>
                      </div>

                      {/* Action Buttons */}
                      <div className="grid grid-cols-3 gap-2 mb-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGoogleMaps(property.address)}
                          className="text-xs h-8"
                        >
                          <MapPin className="h-3 w-3 mr-1" />
                          Maps
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleZillowSearch(property.address)}
                          className="text-xs h-8"
                        >
                          <Home className="h-3 w-3 mr-1" />
                          Zillow
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => handleGoogleSearch(property.address)}
                          className="text-xs h-8"
                        >
                          <Search className="h-3 w-3 mr-1" />
                          Search
                        </Button>
                      </div>

                      <div className="flex items-center justify-between text-xs">
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <Users className="h-3 w-3" />
                          <span>Age {property.homeownerProfile.estimatedAge}</span>
                        </div>
                        <div className="flex items-center gap-1 text-muted-foreground">
                          <DollarSign className="h-3 w-3" />
                          <span>${Math.round(property.homeownerProfile.estimatedIncome / 1000)}k</span>
                        </div>
                        <Badge variant="secondary" className="text-xs">
                          {property.homeownerProfile.likelyNeeds}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
              </div>
            </ScrollArea>
          </div>

          {/* Competitive Insights */}
          <div className="p-3 rounded-lg border bg-muted/20">
            <h4 className="text-sm font-semibold mb-2">Market Competition</h4>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <span className="text-muted-foreground">Active Competitors</span>
                <p className="font-semibold">{data.competitorActivity.activeCompetitors}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Avg Response Time</span>
                <p className="font-semibold">{data.competitorActivity.averageResponseTime}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Market Saturation</span>
                <p className="font-semibold">{data.competitorActivity.marketSaturation}</p>
              </div>
              <div>
                <span className="text-muted-foreground">Avg Job Value</span>
                <p className="font-semibold">${data.competitorActivity.pricingInsights.averageJobValue.toLocaleString()}</p>
              </div>
            </div>
          </div>

          {/* Seasonal Insight */}
          <div className="flex items-center gap-2 p-2 rounded bg-blue-500/10 text-blue-600 text-xs">
            <Calendar className="h-3 w-3" />
            <span>
              Peak season is {data.marketInsights.seasonalTrends.peakSeason}. 
              Current demand: {data.marketInsights.seasonalTrends.currentDemand}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
