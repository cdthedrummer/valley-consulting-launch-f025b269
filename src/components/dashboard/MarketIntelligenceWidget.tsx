import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { TrendingUp, Users, Building2, MapPin, DollarSign, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import StatsCard from '@/components/StatsCard';
import SimpleChart from '@/components/SimpleChart';
import ScrollableWidget from '@/components/ScrollableWidget';
import { cn } from '@/lib/utils';

interface MarketData {
  demographics: {
    totalHouseholds: number;
    medianIncome: number;
    avgHomeValue: number;
    homeOwnershipRate: number;
    ageGroups: Record<string, number>;
  };
  businessData: {
    totalEstablishments: number;
    recentSales: number;
    averagePrice: number;
    marketTrend: 'growing' | 'stable' | 'declining';
    competitorCount: number;
  };
  chartData: Array<{ name: string; value: number }>;
  location: string;
  lastUpdated: string;
}

interface MarketIntelligenceWidgetProps {
  location?: string;
  industry?: string;
  className?: string;
}

const MarketIntelligenceWidget: React.FC<MarketIntelligenceWidgetProps> = ({
  location = 'Hudson Valley',
  industry = 'Construction',
  className
}) => {
  const [marketData, setMarketData] = useState<MarketData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMarketData();
  }, [location, industry]);

  const fetchMarketData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('market-intelligence', {
        body: { location, industry },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (functionError) {
        throw functionError;
      }

      setMarketData(data);
    } catch (err) {
      console.error('Error fetching market data:', err);
      setError('Failed to load market data');
      
      // Fallback to mock data for demo
      setMarketData({
        demographics: {
          totalHouseholds: 2847,
          medianIncome: 89500,
          avgHomeValue: 475000,
          homeOwnershipRate: 78,
          ageGroups: { '25-34': 18, '35-44': 25, '45-54': 22, '55-64': 20, '65+': 15 }
        },
        businessData: {
          totalEstablishments: 156,
          recentSales: 37,
          averagePrice: 485000,
          marketTrend: 'stable',
          competitorCount: 12
        },
        chartData: [
          { name: 'Q1', value: 28 },
          { name: 'Q2', value: 35 },
          { name: 'Q3', value: 37 },
          { name: 'Q4', value: 42 }
        ],
        location,
        lastUpdated: new Date().toLocaleDateString()
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <Card className={cn("border-0 bg-gradient-to-br from-primary/5 to-secondary/5", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Market Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className={cn("border-0 bg-gradient-to-br from-destructive/5 to-orange-500/5", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <AlertCircle className="h-5 w-5" />
            Market Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">{error}</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollableWidget delay={200}>
      <Card className={cn("border-0 bg-gradient-to-br from-primary/5 to-secondary/5 overflow-hidden", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5 text-primary" />
              Market Intelligence
            </div>
            <span className="text-sm text-muted-foreground">{marketData?.location}</span>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mx-4 mb-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="business">Business</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="px-4 pb-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <StatsCard
                  title="Recent Sales"
                  value={marketData?.businessData.recentSales || 0}
                  change={12}
                  icon={<Building2 className="h-4 w-4" />}
                  className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20"
                />
                <StatsCard
                  title="Avg Price"
                  value={`$${((marketData?.businessData.averagePrice || 0) / 1000).toFixed(0)}K`}
                  change={5}
                  icon={<DollarSign className="h-4 w-4" />}
                  className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20"
                />
              </div>
              
              <div className="bg-widget-bg border border-widget-border rounded-lg p-4">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2 text-stat-text">
                  <TrendingUp className="h-4 w-4" />
                  Sales Trend
                </h4>
                <SimpleChart 
                  data={marketData?.chartData || []} 
                  color="hsl(var(--chart-primary))"
                  height={80}
                />
              </div>
            </TabsContent>

            <TabsContent value="demographics" className="px-4 pb-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <StatsCard
                  title="Households"
                  value={marketData?.demographics.totalHouseholds.toLocaleString() || '0'}
                  icon={<Users className="h-4 w-4" />}
                  className="bg-gradient-to-br from-purple-500/10 to-violet-500/10 border border-purple-500/20"
                />
                <StatsCard
                  title="Median Income"
                  value={`$${((marketData?.demographics.medianIncome || 0) / 1000).toFixed(0)}K`}
                  icon={<DollarSign className="h-4 w-4" />}
                  className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20"
                />
              </div>
              
              <div className="bg-widget-bg border border-widget-border rounded-lg p-4">
                <h4 className="text-sm font-medium mb-3 text-stat-text">Age Distribution</h4>
                <div className="space-y-2">
                  {Object.entries(marketData?.demographics.ageGroups || {}).map(([age, percentage]) => (
                    <div key={age} className="flex justify-between items-center">
                      <span className="text-sm text-stat-text">{age}</span>
                      <div className="flex items-center gap-2">
                        <div className="w-20 h-2 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-chart-primary rounded-full" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-8 text-stat-text">{percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="business" className="px-4 pb-4 space-y-4">
              <div className="grid grid-cols-2 gap-3">
                <StatsCard
                  title="Competitors"
                  value={marketData?.businessData.competitorCount || 0}
                  icon={<Building2 className="h-4 w-4" />}
                  className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20"
                />
                <StatsCard
                  title="Market Trend"
                  value={marketData?.businessData.marketTrend?.charAt(0).toUpperCase() + (marketData?.businessData.marketTrend?.slice(1) || '')}
                  icon={<TrendingUp className="h-4 w-4" />}
                  className="bg-gradient-to-br from-teal-500/10 to-green-500/10 border border-teal-500/20"
                />
              </div>
              
              <div className="bg-widget-bg border border-widget-border rounded-lg p-4">
                <h4 className="text-sm font-medium mb-2 text-stat-text">Market Insights</h4>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• {marketData?.businessData.totalEstablishments} total establishments in area</li>
                  <li>• {marketData?.demographics.homeOwnershipRate}% homeownership rate</li>
                  <li>• Best opportunities in 35-54 age groups</li>
                  <li>• Market showing {marketData?.businessData.marketTrend} trends</li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
          
          <div className="px-4 pb-4">
            <p className="text-xs text-muted-foreground">
              Last updated: {marketData?.lastUpdated}
            </p>
          </div>
        </CardContent>
      </Card>
    </ScrollableWidget>
  );
};

export default MarketIntelligenceWidget;