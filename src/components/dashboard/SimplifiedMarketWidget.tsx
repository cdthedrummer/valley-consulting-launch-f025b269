import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Users, Building2, RefreshCcw, Search, AlertTriangle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import StatsCard from '../StatsCard';

interface SimplifiedMarketWidgetProps {
  location?: string;
  industry?: string;
  className?: string;
}

export const SimplifiedMarketWidget: React.FC<SimplifiedMarketWidgetProps> = ({
  location = 'Hudson Valley',
  industry = 'Construction',
  className
}) => {
  const [marketData, setMarketData] = useState<any>(null);
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
        body: { location, industry }
      });

      if (functionError) throw functionError;

      if (data) {
        setMarketData(data);
      }
    } catch (err) {
      console.error('Error fetching market data:', err);
      setError('Unable to load market data');
      
      // Fallback data
      setMarketData({
        demographics: {
          medianIncome: 89500,
          avgHomeValue: 475000,
        },
        businessData: {
          competitorCount: 12,
          marketTrend: 'stable'
        }
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearchCompetitors = () => {
    const query = encodeURIComponent(`${industry} near ${location}`);
    const url = `https://www.google.com/search?q=${query}`;
    const win = window.open(url, '_blank', 'noopener,noreferrer');
    if (!win) {
      navigator.clipboard?.writeText(url);
      // Minimal toast-free fallback to avoid extra deps here
      console.info('Pop-up blocked. URL copied to clipboard:', url);
    }
  };
  if (isLoading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Market Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5" />
            Market Snapshot
          </CardTitle>
          {error && (
            <Badge variant="secondary" className="text-xs">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Sample Data
            </Badge>
          )}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatsCard
            title="Median Income"
            value={`$${(marketData?.demographics?.medianIncome || 0).toLocaleString()}`}
            icon={<DollarSign className="h-4 w-4" />}
            className="bg-gradient-to-br from-green-500/10 to-emerald-500/10 border border-green-500/20"
          />
          <StatsCard
            title="Avg Home Value"
            value={`$${(marketData?.demographics?.avgHomeValue || 0).toLocaleString()}`}
            icon={<Building2 className="h-4 w-4" />}
            className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20"
          />
          <StatsCard
            title="Competitors"
            value={marketData?.businessData?.competitorCount || 0}
            icon={<Users className="h-4 w-4" />}
            className="bg-gradient-to-br from-amber-500/10 to-yellow-500/10 border border-amber-500/20"
          />
          <StatsCard
            title="Market Trend"
            value={marketData?.businessData?.marketTrend?.charAt(0).toUpperCase() + (marketData?.businessData?.marketTrend?.slice(1) || 'Stable')}
            icon={<TrendingUp className="h-4 w-4" />}
            className="bg-gradient-to-br from-teal-500/10 to-green-500/10 border border-teal-500/20"
          />
        </div>

        {/* Quick Insight */}
        <div className="p-3 rounded-lg bg-muted/50 border">
          <p className="text-sm">
            {marketData?.demographics?.medianIncome > 80000 
              ? '✅ Strong customer purchasing power in this area'
              : '📊 Moderate customer purchasing power - focus on value messaging'}
          </p>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          onClick={handleSearchCompetitors}
          className="w-full"
          size="sm"
        >
          <Search className="h-4 w-4 mr-2" />
          Search Local Competitors
        </Button>
      </CardContent>
    </Card>
  );
};
