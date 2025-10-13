import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Search, MessageSquare } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface StreamlinedCompetitiveWidgetProps {
  location?: string;
  industry?: string;
  className?: string;
  onChatWithPlan?: (message: string) => void;
}

export const StreamlinedCompetitiveWidget: React.FC<StreamlinedCompetitiveWidgetProps> = ({
  location = 'Hudson Valley',
  industry = 'Construction',
  className,
  onChatWithPlan
}) => {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCompetitiveData();
  }, [location, industry]);

  const loadCompetitiveData = async () => {
    try {
      const { data: cached } = await supabase
        .from('local_market_intelligence')
        .select('*')
        .eq('location', location)
        .eq('industry', industry)
        .eq('data_type', 'competitive_intel')
        .gte('expires_at', new Date().toISOString())
        .single();

      if (cached) {
        setData(cached.data_payload);
      } else {
        // Mock data
        setData({
          yourPosition: {
            estimatedRank: 5,
            totalCompetitors: 23,
            marketShare: 8
          },
          topCompetitors: [
            {
              name: 'Top Local Contractor',
              marketShare: 25,
              keyStrength: 'Established brand',
              keyWeakness: 'Slow response (48hr)'
            },
            {
              name: 'Mid-Market Competitor',
              marketShare: 15,
              keyStrength: 'Fast service (24hr)',
              keyWeakness: 'Limited specializations'
            }
          ],
          marketGaps: [
            {
              opportunity: 'Same-day emergency service',
              impact: 'high'
            },
            {
              opportunity: 'Eco-friendly options',
              impact: 'high'
            }
          ]
        });
      }
    } catch (error) {
      console.error('Error loading competitive data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchCompetitors = (competitorNames: string[]) => {
    const query = encodeURIComponent(`${competitorNames.join(' ')} reviews`);
    window.open(`https://www.google.com/search?q=${query}`, '_blank');
  };

  const handleImplementStrategy = (gap: any) => {
    if (onChatWithPlan) {
      onChatWithPlan(`Help me implement a strategy for: ${gap.opportunity}`);
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Competitive Edge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="h-20 bg-muted animate-pulse rounded" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Users className="h-5 w-5" />
          Competitive Edge
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Your Position */}
        <div className="p-3 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Your Position</span>
            <Badge variant="secondary">#{data?.yourPosition?.estimatedRank}</Badge>
          </div>
          <p className="text-xs text-muted-foreground">
            {data?.yourPosition?.marketShare}% market share of {data?.yourPosition?.totalCompetitors} competitors
          </p>
        </div>

        {/* Top 2 Competitors */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Top Competitors</h4>
          {data?.topCompetitors?.slice(0, 2).map((comp: any, idx: number) => (
            <div key={idx} className="p-3 rounded-lg border bg-card text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-semibold">{comp.name}</span>
                <Badge variant="outline" className="text-xs">
                  {comp.marketShare}%
                </Badge>
              </div>
              <div className="space-y-1 text-xs">
                <p className="text-green-600">✓ {comp.keyStrength}</p>
                <p className="text-red-600">✗ {comp.keyWeakness}</p>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSearchCompetitors(data?.topCompetitors?.map((c: any) => c.name) || [])}
            className="w-full"
          >
            <Search className="h-4 w-4 mr-2" />
            Research Competitors
          </Button>
        </div>

        {/* Market Gaps */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold">Market Opportunities</h4>
          {data?.marketGaps?.slice(0, 2).map((gap: any, idx: number) => (
            <div key={idx} className="p-3 rounded-lg border bg-card">
              <div className="flex items-start justify-between mb-2">
                <p className="text-sm font-medium flex-1">{gap.opportunity}</p>
                <TrendingUp className="h-4 w-4 text-green-600" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleImplementStrategy(gap)}
                className="w-full text-xs"
              >
                <MessageSquare className="h-3 w-3 mr-1" />
                Implement Strategy
              </Button>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
