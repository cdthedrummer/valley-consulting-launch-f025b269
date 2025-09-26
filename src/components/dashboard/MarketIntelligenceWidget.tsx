import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Users, Building2, DollarSign, RefreshCcw, AlertTriangle, ExternalLink } from 'lucide-react';
import { cn } from '@/lib/utils';
import { supabase } from '@/integrations/supabase/client';
import StatsCard from '../StatsCard';
import SimpleChart from '../SimpleChart';
import ScrollableWidget from '../ScrollableWidget';
import { useStatusAnnouncer } from '@/hooks/use-live-region';

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
    marketTrend: string;
    competitorCount: number;
  };
  chartData: Array<{ name: string; value: number }>;
  location: string;
  lastUpdated: string;
  dataSources?: {
    primary: string;
    secondary?: string[];
    lastFetch: string;
    reliability: 'high' | 'medium' | 'low';
  };
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
  const [isRetrying, setIsRetrying] = useState(false);
  const [dataSource, setDataSource] = useState<'live' | 'fallback'>('live');
  const { announce } = useStatusAnnouncer();

  useEffect(() => {
    fetchMarketData();
  }, [location, industry]);

  const fetchMarketData = async () => {
    setIsLoading(true);
    setError(null);
    setDataSource('live');
    announce(`Loading market data for ${location}...`);

    try {
      const { data, error: functionError } = await supabase.functions.invoke('market-intelligence', {
        body: { location, industry },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

        if (functionError) {
          console.error('Market intelligence function error:', functionError);
          
          // Attempt to inspect response for more details (Supabase FunctionsError may include response)
          const ctx: any = functionError as any;
          const resp: Response | undefined = ctx?.context?.response;
          const status = (resp as any)?.status;

          // Handle rate limiting explicitly
          if (status === 429 || functionError.message?.includes('Too many requests') || functionError.message?.toLowerCase().includes('rate limit')) {
            throw new Error('Rate limit exceeded. The dashboard is receiving high traffic. Please wait a few minutes and try refreshing.');
          }

          // Handle generic non-2xx edge function errors gracefully
          if (functionError.message?.includes('non-2xx')) {
            throw new Error('Service temporarily busy. Showing sample data. Please retry shortly.');
          }

          if (functionError.message?.includes('API Error')) {
            throw new Error(`Service temporarily unavailable: ${functionError.message}`);
          }

          throw new Error(`API Error: ${functionError.message || 'Unknown error'}`);
        }

      if (data) {
        setMarketData({
          ...data,
          dataSources: {
            primary: 'US Census Bureau (ACS 5-Year Estimates)',
            secondary: ['Bureau of Labor Statistics', 'County Business Patterns'],
            lastFetch: new Date().toISOString(),
            reliability: 'high'
          }
        });
        setDataSource('live');
        announce(`Market data loaded successfully for ${location}`);
      } else {
        throw new Error('No data received from API');
      }
    } catch (err) {
      console.error('Error fetching market data:', err);
      const errorMessage = err instanceof Error ? err.message : 'Unknown error occurred';
      
      // More user-friendly error messages
      if (errorMessage.includes('Rate limit')) {
        setError('Dashboard is experiencing high traffic. Data will refresh automatically in a few minutes.');
        // Auto-retry after 5 minutes for rate limit errors
        setTimeout(() => {
          fetchMarketData();
        }, 300000); // 5 minutes
      } else if (errorMessage.includes('Service temporarily unavailable')) {
        setError('Market data service is temporarily unavailable. Using sample data.');
      } else if (errorMessage.includes('non-2xx') || errorMessage.toLowerCase().includes('temporarily busy')) {
        setError('Market data service is busy. Showing sample data; please retry in a moment.');
        // Auto-retry after 2 minutes for transient non-2xx errors
        setTimeout(() => {
          fetchMarketData();
        }, 120000); // 2 minutes
      } else {
        setError(`Unable to load live market data: ${errorMessage}`);
      }
      
      setDataSource('fallback');
      announce(`Unable to load live data. Displaying sample data for ${location}`);
      
      // Fallback to mock data for demo with clear indication
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
        lastUpdated: new Date().toLocaleDateString(),
        dataSources: {
          primary: 'Sample Data (Demo)',
          secondary: ['Estimated values for demonstration'],
          lastFetch: new Date().toISOString(),
          reliability: 'low'
        }
      });
    } finally {
      setIsLoading(false);
      setIsRetrying(false);
    }
  };

  const handleRetry = async () => {
    setIsRetrying(true);
    announce('Retrying data fetch...');
    await fetchMarketData();
  };

  if (isLoading) {
    return (
      <Card className={cn("border-0 bg-gradient-to-br from-primary/5 to-secondary/5", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Market Intelligence
            {location && (
              <span className="text-sm font-normal text-muted-foreground">
                • {location}
              </span>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div 
            className="space-y-4" 
            role="status" 
            aria-live="polite" 
            aria-label="Loading market intelligence data"
          >
            <div className="sr-only">Loading market data for {location}...</div>
            
            {/* Enhanced loading skeleton with realistic content placeholders */}
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <div className="h-4 bg-muted animate-pulse rounded w-24"></div>
                <div className="h-3 bg-muted animate-pulse rounded w-16"></div>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {[...Array(4)].map((_, i) => (
                  <div 
                    key={i} 
                    className="p-3 border rounded-lg space-y-2" 
                    aria-hidden="true"
                  >
                    <div className="h-3 bg-muted animate-pulse rounded w-16"></div>
                    <div className="h-6 bg-muted animate-pulse rounded w-12"></div>
                  </div>
                ))}
              </div>
              
              <div className="h-32 bg-muted animate-pulse rounded-lg" aria-hidden="true"></div>
              
              <div className="text-center">
                <div className="h-3 bg-muted animate-pulse rounded w-48 mx-auto"></div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  if (error && !marketData) {
    return (
      <Card className={cn("border-0 bg-gradient-to-br from-destructive/5 to-orange-500/5", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-destructive" />
            Error Loading Market Data
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{error}</p>
          <Button onClick={handleRetry} disabled={isRetrying} className="w-full">
            <RefreshCcw className={cn("h-4 w-4 mr-2", isRetrying && "animate-spin")} />
            {isRetrying ? 'Retrying...' : 'Try Again'}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollableWidget className={className}>
      <Card className="border-0 bg-gradient-to-br from-primary/5 to-secondary/5 shadow-lg transition-all duration-300 hover:shadow-xl">
        {/* Enhanced Error Banner */}
        {error && (
          <div 
            role="alert" 
            aria-live="assertive" 
            className={cn(
              "px-4 sm:px-6 pt-3 pb-2 text-sm border-b transition-all duration-200",
              dataSource === 'fallback' 
                ? "text-amber-800 bg-amber-50 border-amber-200 dark:text-amber-200 dark:bg-amber-900/20" 
                : "text-red-800 bg-red-50 border-red-200 dark:text-red-200 dark:bg-red-900/20"
            )}
          >
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 flex-shrink-0 animate-pulse" />
                <span className="text-xs sm:text-sm">{error}</span>
              </div>
              <Button
                onClick={handleRetry}
                disabled={isRetrying}
                size="sm"
                variant="outline"
                className="ml-auto flex-shrink-0 touch-target transition-all duration-200 hover:scale-105 active:scale-95"
              >
                <RefreshCcw className={cn("h-3 w-3 mr-1", isRetrying && "animate-spin")} />
                <span className="hidden sm:inline">{isRetrying ? 'Retrying...' : 'Retry'}</span>
              </Button>
            </div>
          </div>
        )}
        
        <CardHeader className="pb-3 px-4 sm:px-6">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <TrendingUp className="h-5 w-5 text-primary transition-transform duration-200 hover:scale-110" />
              <span className="text-lg sm:text-xl">Market Intelligence</span>
              {location && (
                <span className="text-sm font-normal text-muted-foreground">
                  • {location}
                </span>
              )}
            </div>
            {/* Data Source Indicator */}
            <Badge 
              variant={dataSource === 'live' ? 'default' : 'secondary'}
              className="text-xs self-start sm:self-center transition-all duration-200 hover:scale-105"
            >
              {dataSource === 'live' ? 'Live Data' : 'Sample Data'}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="demographics" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mx-4 sm:mx-6 mb-4 bg-background shadow-sm">
              <TabsTrigger value="demographics" className="touch-target text-sm transition-all duration-200">
                <span className="hidden sm:inline">Demographics</span>
                <span className="sm:hidden">Demo</span>
              </TabsTrigger>
              <TabsTrigger value="business" className="touch-target text-sm transition-all duration-200">
                Business
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="demographics" className="mobile-section space-y-4">
              <div className="mobile-grid grid-cols-1 sm:grid-cols-2">
                <StatsCard
                  title="Households"
                  value={marketData?.demographics.totalHouseholds || 0}
                  icon={<Users className="h-4 w-4" />}
                  className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 hover:border-blue-500/40"
                />
                <StatsCard
                  title="Median Income"
                  value={`$${(marketData?.demographics.medianIncome || 0).toLocaleString()}`}
                  icon={<DollarSign className="h-4 w-4" />}
                  className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20 hover:border-green-500/40"
                />
                <StatsCard
                  title="Avg Home Value"
                  value={`$${(marketData?.demographics.avgHomeValue || 0).toLocaleString()}`}
                  icon={<Building2 className="h-4 w-4" />}
                  className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 hover:border-purple-500/40"
                />
                <StatsCard
                  title="Ownership Rate"
                  value={`${marketData?.demographics.homeOwnershipRate || 0}%`}
                  icon={<DollarSign className="h-4 w-4" />}
                  className="bg-gradient-to-br from-orange-500/10 to-red-500/10 border border-orange-500/20 hover:border-orange-500/40"
                />
              </div>
              
              <div className="widget-card p-4 sm:p-5 transition-all duration-300 hover:shadow-lg">
                <h4 className="text-sm font-medium mb-4 text-stat-text flex items-center gap-2">
                  <div className="w-2 h-2 bg-chart-primary rounded-full"></div>
                  Age Distribution
                </h4>
                <div className="space-y-3">
                  {Object.entries(marketData?.demographics.ageGroups || {}).map(([age, percentage]) => (
                    <div key={age} className="flex justify-between items-center p-2 rounded-md hover:bg-background/50 transition-colors duration-200">
                      <span className="text-sm font-medium text-stat-text">{age}</span>
                      <div className="flex items-center gap-3">
                        <div className="w-20 sm:w-24 h-2.5 bg-muted rounded-full overflow-hidden">
                          <div 
                            className="h-full bg-gradient-to-r from-chart-primary to-chart-secondary rounded-full transition-all duration-500 ease-out" 
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium w-10 text-right text-stat-text">{percentage}%</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="business" className="mobile-section space-y-4">
              <div className="mobile-grid grid-cols-1 sm:grid-cols-2">
                <StatsCard
                  title="Competitors"
                  value={marketData?.businessData.competitorCount || 0}
                  icon={<Building2 className="h-4 w-4" />}
                  className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20 hover:border-amber-500/40"
                />
                <StatsCard
                  title="Market Trend"
                  value={marketData?.businessData.marketTrend?.charAt(0).toUpperCase() + (marketData?.businessData.marketTrend?.slice(1) || '')}
                  icon={<TrendingUp className="h-4 w-4" />}
                  className="bg-gradient-to-br from-teal-500/10 to-green-500/10 border border-teal-500/20 hover:border-teal-500/40"
                />
              </div>
              
              <div className="widget-card p-4 sm:p-5 transition-all duration-300 hover:shadow-lg">
                <h4 className="text-sm font-medium mb-3 text-stat-text flex items-center gap-2">
                  <div className="w-2 h-2 bg-chart-secondary rounded-full"></div>
                  Market Insights
                </h4>
                <ul className="text-sm text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2 p-2 rounded-md hover:bg-background/50 transition-colors duration-200">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    {marketData?.businessData.totalEstablishments} total establishments in area
                  </li>
                  <li className="flex items-start gap-2 p-2 rounded-md hover:bg-background/50 transition-colors duration-200">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    {marketData?.demographics.homeOwnershipRate}% homeownership rate
                  </li>
                  <li className="flex items-start gap-2 p-2 rounded-md hover:bg-background/50 transition-colors duration-200">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Best opportunities in 35-54 age groups
                  </li>
                  <li className="flex items-start gap-2 p-2 rounded-md hover:bg-background/50 transition-colors duration-200">
                    <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                    Market showing {marketData?.businessData.marketTrend} trends
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
          
          {/* Data Attribution Footer */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-6">
            <div className="pt-3 border-t border-muted space-y-2">
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 text-xs text-muted-foreground">
                <span className="flex items-center gap-1">
                  <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                  Last updated: {marketData?.lastUpdated}
                </span>
                <Badge 
                  variant="outline" 
                  className={cn(
                    "text-xs transition-all duration-200 hover:scale-105",
                    marketData?.dataSources?.reliability === 'high' ? 'border-green-300 text-green-700 bg-green-50' :
                    marketData?.dataSources?.reliability === 'medium' ? 'border-yellow-300 text-yellow-700 bg-yellow-50' :
                    'border-orange-300 text-orange-700 bg-orange-50'
                  )}
                >
                  {marketData?.dataSources?.reliability === 'high' ? '🟢' : 
                   marketData?.dataSources?.reliability === 'medium' ? '🟡' : '🟠'} 
                  {marketData?.dataSources?.reliability?.toUpperCase()}
                </Badge>
              </div>
              
              {marketData?.dataSources && (
                <details className="text-xs text-muted-foreground">
                  <summary className="cursor-pointer hover:text-foreground flex items-center gap-1">
                    <ExternalLink className="h-3 w-3" />
                    Data Sources & Attribution
                  </summary>
                  <div className="mt-2 pl-4 space-y-1">
                    <div><strong>Primary:</strong> {marketData.dataSources.primary}</div>
                    {marketData.dataSources.secondary && (
                      <div>
                        <strong>Additional:</strong> {marketData.dataSources.secondary.join(', ')}
                      </div>
                    )}
                    <div className="text-xs opacity-75">
                      Data fetched: {new Date(marketData.dataSources.lastFetch).toLocaleString()}
                    </div>
                    {dataSource === 'fallback' && (
                      <div className="text-amber-600 font-medium">
                        ⚠️ This is sample data for demonstration purposes only
                      </div>
                    )}
                  </div>
                </details>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </ScrollableWidget>
  );
};

export default MarketIntelligenceWidget;