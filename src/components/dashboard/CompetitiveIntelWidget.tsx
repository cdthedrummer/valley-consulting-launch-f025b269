import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Users, 
  TrendingUp, 
  DollarSign,
  Clock,
  AlertCircle,
  CheckCircle,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface CompetitorData {
  name: string;
  estimatedMarketShare: number;
  strengths: string[];
  weaknesses: string[];
  pricingStrategy: string;
  averageResponseTime: string;
  customerSatisfaction: number;
  recentActivity: string[];
}

interface CompetitiveIntel {
  yourPosition: {
    estimatedRank: number;
    totalCompetitors: number;
    marketShare: number;
    competitiveAdvantages: string[];
  };
  competitors: CompetitorData[];
  marketGaps: {
    opportunity: string;
    difficulty: 'low' | 'medium' | 'high';
    potentialImpact: 'low' | 'medium' | 'high';
  }[];
  recommendations: string[];
}

export const CompetitiveIntelWidget: React.FC<{ 
  location?: string;
  industry?: string;
  className?: string;
}> = ({ location = 'Hudson Valley', industry = 'Construction', className }) => {
  const [data, setData] = useState<CompetitiveIntel | null>(null);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadCompetitiveData();
  }, [location, industry]);

  const loadCompetitiveData = async () => {
    try {
      // Check cache for competitive intelligence
      const { data: cached } = await supabase
        .from('local_market_intelligence')
        .select('*')
        .eq('location', location)
        .eq('industry', industry)
        .eq('data_type', 'competitive_intel')
        .gte('expires_at', new Date().toISOString())
        .single();

      if (cached) {
        setData(cached.data_payload as any as CompetitiveIntel);
      } else {
        // Generate simulated competitive intelligence
        // In production, this would integrate with business listing APIs, review platforms, etc.
        const mockData: CompetitiveIntel = {
          yourPosition: {
            estimatedRank: Math.floor(Math.random() * 10) + 3,
            totalCompetitors: Math.floor(Math.random() * 20) + 15,
            marketShare: Math.floor(Math.random() * 15) + 5,
            competitiveAdvantages: [
              'Strong local presence',
              'Positive online reviews',
              'Quick response time'
            ]
          },
          competitors: [
            {
              name: 'Top Local Contractor',
              estimatedMarketShare: 25,
              strengths: ['Established brand', 'Large team', 'Premium pricing'],
              weaknesses: ['Slow response', 'Expensive', 'Limited availability'],
              pricingStrategy: 'Premium',
              averageResponseTime: '48 hours',
              customerSatisfaction: 4.2,
              recentActivity: ['New Google My Business listing', 'Running Facebook ads']
            },
            {
              name: 'Mid-Market Competitor',
              estimatedMarketShare: 15,
              strengths: ['Competitive pricing', 'Fast service', 'Good reviews'],
              weaknesses: ['Smaller team', 'Limited specializations'],
              pricingStrategy: 'Competitive',
              averageResponseTime: '24 hours',
              customerSatisfaction: 4.5,
              recentActivity: ['Active on social media', 'Email marketing campaigns']
            },
            {
              name: 'Emerging Player',
              estimatedMarketShare: 8,
              strengths: ['Modern approach', 'Digital-first', 'Transparent pricing'],
              weaknesses: ['New to market', 'Building reputation'],
              pricingStrategy: 'Value',
              averageResponseTime: '12 hours',
              customerSatisfaction: 4.7,
              recentActivity: ['SEO optimization', 'Content marketing', 'Partnership outreach']
            }
          ],
          marketGaps: [
            {
              opportunity: 'Same-day emergency service with transparent pricing',
              difficulty: 'medium',
              potentialImpact: 'high'
            },
            {
              opportunity: 'Specialized services for historic homes',
              difficulty: 'low',
              potentialImpact: 'medium'
            },
            {
              opportunity: 'Eco-friendly and sustainable options',
              difficulty: 'medium',
              potentialImpact: 'high'
            },
            {
              opportunity: 'Virtual consultations and quotes',
              difficulty: 'low',
              potentialImpact: 'medium'
            }
          ],
          recommendations: [
            'Highlight your quick response time in all marketing materials',
            'Create content around eco-friendly solutions to fill market gap',
            'Implement automated quote system to compete with digital-first competitors',
            'Focus on building strong local SEO presence',
            'Develop customer referral program to increase market share'
          ]
        };

        setData(mockData);

        // Cache the data
        const { error: cacheError } = await supabase
          .from('local_market_intelligence')
          .insert({
            location,
            industry,
            data_type: 'competitive_intel',
            data_payload: mockData as any,
            source: 'competitive_analysis',
            relevance_score: 0.90,
            expires_at: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString()
          });
      }
    } catch (error) {
      console.error('Error loading competitive data:', error);
      toast({
        title: "Error loading competitive intel",
        description: "Unable to fetch competitive analysis",
        variant: "destructive"
      });
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshData = async () => {
    setRefreshing(true);
    // Delete cache to force refresh
    await supabase
      .from('local_market_intelligence')
      .delete()
      .eq('location', location)
      .eq('industry', industry)
      .eq('data_type', 'competitive_intel');
    
    await loadCompetitiveData();
    toast({
      title: "Intel refreshed",
      description: "Latest competitive analysis loaded",
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'low':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'high':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      default:
        return '';
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'text-green-600';
      case 'medium':
        return 'text-yellow-600';
      case 'low':
        return 'text-gray-600';
      default:
        return '';
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Competitive Intelligence
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
            <Users className="h-5 w-5" />
            Competitive Intelligence
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
        <ScrollArea className="h-[500px] pr-4">
          <div className="space-y-4">
            {/* Your Position */}
            <div className="p-4 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border">
              <h4 className="text-sm font-semibold mb-3">Your Market Position</h4>
              <div className="grid grid-cols-2 gap-3 mb-3">
                <div>
                  <p className="text-xs text-muted-foreground">Estimated Rank</p>
                  <p className="text-lg font-bold">#{data.yourPosition.estimatedRank}</p>
                  <p className="text-xs text-muted-foreground">of {data.yourPosition.totalCompetitors}</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Market Share</p>
                  <p className="text-lg font-bold">{data.yourPosition.marketShare}%</p>
                </div>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">Your Advantages:</p>
                <div className="flex flex-wrap gap-1">
                  {data.yourPosition.competitiveAdvantages.map((adv, idx) => (
                    <Badge key={idx} variant="secondary" className="text-xs">
                      <CheckCircle className="h-3 w-3 mr-1" />
                      {adv}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>

            {/* Top Competitors */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Top Competitors</h4>
              <div className="space-y-3">
                {data.competitors.map((competitor, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-3 rounded-lg border bg-card"
                  >
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h5 className="font-semibold text-sm">{competitor.name}</h5>
                        <div className="flex items-center gap-2 mt-1">
                          <Badge variant="outline" className="text-xs">
                            {competitor.estimatedMarketShare}% share
                          </Badge>
                          <span className="text-xs text-muted-foreground flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {competitor.averageResponseTime}
                          </span>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1">
                          <span className="text-lg font-bold">{competitor.customerSatisfaction}</span>
                          <span className="text-xs text-muted-foreground">/5.0</span>
                        </div>
                        <p className="text-xs text-muted-foreground">{competitor.pricingStrategy}</p>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-2 mb-2">
                      <div>
                        <p className="text-xs font-medium mb-1 flex items-center gap-1 text-green-600">
                          <CheckCircle className="h-3 w-3" />
                          Strengths
                        </p>
                        <ul className="text-xs space-y-0.5">
                          {competitor.strengths.slice(0, 2).map((strength, idx) => (
                            <li key={idx} className="text-muted-foreground">• {strength}</li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <p className="text-xs font-medium mb-1 flex items-center gap-1 text-red-600">
                          <AlertCircle className="h-3 w-3" />
                          Weaknesses
                        </p>
                        <ul className="text-xs space-y-0.5">
                          {competitor.weaknesses.slice(0, 2).map((weakness, idx) => (
                            <li key={idx} className="text-muted-foreground">• {weakness}</li>
                          ))}
                        </ul>
                      </div>
                    </div>

                    {competitor.recentActivity.length > 0 && (
                      <div className="p-2 rounded bg-muted/30">
                        <p className="text-xs font-medium mb-1">Recent Activity</p>
                        <div className="flex flex-wrap gap-1">
                          {competitor.recentActivity.map((activity, idx) => (
                            <Badge key={idx} variant="outline" className="text-xs">
                              {activity}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Market Gaps */}
            <div>
              <h4 className="text-sm font-semibold mb-2">Market Opportunities</h4>
              <div className="space-y-2">
                {data.marketGaps.map((gap, index) => (
                  <div key={index} className="p-3 rounded-lg border bg-card">
                    <div className="flex items-start justify-between mb-1">
                      <p className="text-sm font-medium flex-1">{gap.opportunity}</p>
                      <TrendingUp className={`h-4 w-4 ${getImpactColor(gap.potentialImpact)}`} />
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge 
                        variant="outline" 
                        className={`text-xs ${getDifficultyColor(gap.difficulty)}`}
                      >
                        {gap.difficulty} difficulty
                      </Badge>
                      <span className={`text-xs font-medium ${getImpactColor(gap.potentialImpact)}`}>
                        {gap.potentialImpact} impact
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Recommendations */}
            <div className="p-3 rounded-lg bg-muted/50 border">
              <h4 className="text-sm font-semibold mb-2">Strategic Recommendations</h4>
              <ul className="space-y-1">
                {data.recommendations.map((rec, idx) => (
                  <li key={idx} className="text-xs flex items-start gap-2">
                    <CheckCircle className="h-3 w-3 mt-0.5 text-green-600 flex-shrink-0" />
                    <span>{rec}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
