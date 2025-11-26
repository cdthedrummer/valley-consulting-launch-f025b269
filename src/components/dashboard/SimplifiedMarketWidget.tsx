import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, DollarSign, Users, Building2, RefreshCcw, Search, AlertTriangle, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import StatsCard from '../StatsCard';
import { formatDistanceToNow } from 'date-fns';

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
  const [lastUpdated] = useState(new Date());
  const [marketData, setMarketData] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Only fetch if location and industry are valid (min 2 chars)
    if (!location || location.length < 2 || !industry || industry.length < 2) {
      return;
    }

    // Debounce API calls to prevent excessive requests during typing
    const timeoutId = setTimeout(() => {
      fetchMarketData();
    }, 300);

    return () => clearTimeout(timeoutId);
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

  const handleSearchCompetitors = async () => {
    try {
      setIsLoading(true);
      const { data: profileData } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', (await supabase.auth.getUser()).data.user?.id)
        .single();

      const { data, error } = await supabase.functions.invoke('competitor-research', {
        body: { 
          location, 
          industry,
          businessProfile: profileData 
        }
      });

      if (error) throw error;

      // Display analysis in a modal or new view
      const newWindow = window.open('', '_blank');
      if (newWindow) {
        newWindow.document.write(`
          <html>
            <head>
              <title>Competitor Analysis - ${location}</title>
              <style>
                body {
                  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
                  max-width: 900px;
                  margin: 40px auto;
                  padding: 20px;
                  line-height: 1.6;
                  color: #333;
                }
                h1 { color: #2D5A3D; }
                h2 { color: #E8A840; margin-top: 30px; }
                pre { 
                  background: #f5f5f5; 
                  padding: 15px; 
                  border-radius: 8px;
                  white-space: pre-wrap;
                  word-wrap: break-word;
                }
              </style>
            </head>
            <body>
              <h1>Competitor Analysis</h1>
              <p><strong>Location:</strong> ${location} | <strong>Industry:</strong> ${industry}</p>
              <pre>${data.analysis}</pre>
            </body>
          </html>
        `);
      }
    } catch (err) {
      console.error('Error researching competitors:', err);
    } finally {
      setIsLoading(false);
    }
  };
  if (isLoading) {
    return (
      <Card className={`${className} border-2 border-action-yellow/30 bg-warm-cream shadow-lg`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-archivo uppercase tracking-wide text-club-green">
            <TrendingUp className="h-5 w-5 text-action-yellow" />
            Market Snapshot
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-16 bg-club-green/5 animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={`${className} border-2 border-action-yellow/30 bg-warm-cream shadow-lg`}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 font-archivo uppercase tracking-wide text-club-green">
            <TrendingUp className="h-5 w-5 text-action-yellow" />
            Market Snapshot
          </CardTitle>
          <div className="flex items-center gap-2">
            {error && (
              <Badge className="text-xs bg-action-yellow/20 text-club-green border border-action-yellow/30 font-dm">
                <AlertTriangle className="h-3 w-3 mr-1" />
                Sample Data
              </Badge>
            )}
            <div className="flex items-center gap-1 text-xs text-club-green/50 font-dm">
              <Clock className="h-3 w-3" />
              {formatDistanceToNow(lastUpdated, { addSuffix: true })}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Key Metrics Grid */}
        <div className="grid grid-cols-2 gap-3">
          <StatsCard
            title="Median Income"
            value={`$${(marketData?.demographics?.medianIncome || 0).toLocaleString()}`}
            icon={<DollarSign className="h-4 w-4" />}
            className="bg-action-yellow/10 border-2 border-action-yellow/30"
          />
          <StatsCard
            title="Avg Home Value"
            value={`$${(marketData?.demographics?.avgHomeValue || 0).toLocaleString()}`}
            icon={<Building2 className="h-4 w-4" />}
            className="bg-club-green/10 border-2 border-club-green/20"
          />
          <StatsCard
            title="Competitors"
            value={marketData?.businessData?.competitorCount || 0}
            icon={<Users className="h-4 w-4" />}
            className="bg-action-yellow/10 border-2 border-action-yellow/30"
          />
          <StatsCard
            title="Market Trend"
            value={marketData?.businessData?.marketTrend?.charAt(0).toUpperCase() + (marketData?.businessData?.marketTrend?.slice(1) || 'Stable')}
            icon={<TrendingUp className="h-4 w-4" />}
            className="bg-club-green/10 border-2 border-club-green/20"
          />
        </div>

        {/* Quick Insight */}
        <div className="p-3 rounded-lg bg-club-green/5 border border-club-green/10">
          <p className="font-dm text-sm text-club-green/80">
            {marketData?.demographics?.medianIncome > 80000 
              ? '✅ Strong customer purchasing power in this area'
              : '📊 Moderate customer purchasing power - focus on value messaging'}
          </p>
        </div>

        {/* Action Button */}
        <Button
          variant="outline"
          onClick={handleSearchCompetitors}
          className="w-full border-club-green/20 text-club-green hover:bg-action-yellow/10 hover:border-action-yellow font-dm font-semibold"
          size="sm"
        >
          <Search className="h-4 w-4 mr-2" />
          Search Local Competitors
        </Button>
      </CardContent>
    </Card>
  );
};
