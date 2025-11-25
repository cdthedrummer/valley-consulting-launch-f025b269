import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Users, TrendingUp, Search, MessageSquare, Clock } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

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
  const [lastUpdated, setLastUpdated] = useState<Date>(new Date());

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
        setLastUpdated(new Date(cached.collected_at || cached.created_at));
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

  const handleSearchCompetitors = async (competitorNames: string[]) => {
    try {
      setLoading(true);
      const { data: { user } } = await supabase.auth.getUser();
      
      const { data: profileData } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

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
      setLoading(false);
    }
  };
  const handleImplementStrategy = (gap: any) => {
    if (onChatWithPlan) {
      onChatWithPlan(`Help me implement a strategy for: ${gap.opportunity}`);
    }
  };

  if (loading) {
    return (
      <Card className={`${className} border-2 border-action-yellow/30 bg-warm-cream shadow-lg`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-archivo uppercase tracking-wide text-club-green">
            <Users className="h-5 w-5 text-action-yellow" />
            Competitive Edge
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2].map(i => (
              <div key={i} className="h-20 bg-club-green/5 animate-pulse rounded" />
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
            <Users className="h-5 w-5 text-action-yellow" />
            Competitive Edge
          </CardTitle>
          <div className="flex items-center gap-1 text-xs text-club-green/50 font-dm">
            <Clock className="h-3 w-3" />
            {formatDistanceToNow(lastUpdated, { addSuffix: true })}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Your Position */}
        <div className="p-3 rounded-lg bg-action-yellow/10 border-l-4 border-action-yellow">
          <div className="flex items-center justify-between mb-2">
            <span className="font-dm text-sm font-semibold text-club-green">Your Position</span>
            <Badge className="bg-club-green text-warm-cream font-dm">#{data?.yourPosition?.estimatedRank}</Badge>
          </div>
          <p className="font-dm text-xs text-club-green/70">
            {data?.yourPosition?.marketShare}% market share of {data?.yourPosition?.totalCompetitors} competitors
          </p>
        </div>

        {/* Top 2 Competitors */}
        <div className="space-y-2">
          <h4 className="font-dm text-xs font-bold text-club-green/60 uppercase tracking-widest">Top Competitors</h4>
          {data?.topCompetitors?.slice(0, 2).map((comp: any, idx: number) => (
            <div key={idx} className="p-3 rounded-lg border-2 border-club-green/10 bg-white text-sm">
              <div className="flex items-center justify-between mb-2">
                <span className="font-dm font-semibold text-club-green">{comp.name}</span>
                <Badge variant="outline" className="text-xs border-club-green/30 text-club-green font-dm">
                  {comp.marketShare}%
                </Badge>
              </div>
              <div className="space-y-1 text-xs font-dm">
                <p className="text-action-yellow">✓ {comp.keyStrength}</p>
                <p className="text-club-green/70">✗ {comp.keyWeakness}</p>
              </div>
            </div>
          ))}
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleSearchCompetitors(data?.topCompetitors?.map((c: any) => c.name) || [])}
            className="w-full border-club-green/20 text-club-green hover:bg-action-yellow/10 hover:border-action-yellow font-dm font-semibold"
          >
            <Search className="h-4 w-4 mr-2" />
            Research Competitors
          </Button>
        </div>

        {/* Market Gaps */}
        <div className="space-y-2">
          <h4 className="font-dm text-xs font-bold text-club-green/60 uppercase tracking-widest">Market Opportunities</h4>
          {data?.marketGaps?.slice(0, 2).map((gap: any, idx: number) => (
            <div key={idx} className="p-3 rounded-lg border-2 border-club-green/10 bg-white">
              <div className="flex items-start justify-between mb-2">
                <p className="font-dm text-sm font-medium flex-1 text-club-green">{gap.opportunity}</p>
                <TrendingUp className="h-4 w-4 text-action-yellow" />
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => handleImplementStrategy(gap)}
                className="w-full text-xs text-club-green hover:bg-action-yellow/10 font-dm"
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
