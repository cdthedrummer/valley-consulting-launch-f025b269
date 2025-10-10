import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Rocket, 
  TrendingUp, 
  Target, 
  DollarSign, 
  Eye, 
  MousePointerClick,
  Calendar,
  Plus
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { motion } from 'framer-motion';

interface Campaign {
  id: string;
  campaign_name: string;
  status: string;
  campaign_type: string;
  budget_allocated: number;
  start_date: string;
  end_date: string | null;
  metrics: {
    impressions?: number;
    clicks?: number;
    conversions?: number;
    spend?: number;
    ctr?: number;
    cpc?: number;
    conversion_rate?: number;
  };
}

export const CampaignTrackingWidget: React.FC<{ className?: string }> = ({ className }) => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadCampaigns();
    
    // Subscribe to campaign updates
    const channel = supabase
      .channel('campaigns-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'campaigns'
        },
        () => {
          loadCampaigns();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadCampaigns = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('campaigns')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      if (error) throw error;

      // Get metrics for each campaign
      const campaignsWithMetrics = await Promise.all(
        (data || []).map(async (campaign) => {
          const { data: metricsData } = await supabase
            .from('campaign_metrics')
            .select('*')
            .eq('campaign_id', campaign.id)
            .order('metric_date', { ascending: false })
            .limit(1)
            .single();

          const metrics = metricsData ? {
            impressions: metricsData.impressions,
            clicks: metricsData.clicks,
            conversions: metricsData.conversions,
            spend: metricsData.spend,
            ctr: metricsData.clicks && metricsData.impressions 
              ? metricsData.clicks / metricsData.impressions 
              : 0,
            cpc: metricsData.clicks && metricsData.spend
              ? metricsData.spend / metricsData.clicks
              : 0,
            conversion_rate: metricsData.conversions && metricsData.clicks
              ? metricsData.conversions / metricsData.clicks
              : 0
          } : {};

          return {
            ...campaign,
            metrics
          };
        })
      );

      setCampaigns(campaignsWithMetrics);
    } catch (error) {
      console.error('Error loading campaigns:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'paused':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'completed':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getChannelIcon = (channel: string) => {
    // Simplified - you could expand this
    return <Target className="h-4 w-4" />;
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Campaign Performance
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

  return (
    <Card className={className}>
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Rocket className="h-5 w-5" />
            Campaign Performance
            {campaigns.length > 0 && (
              <Badge variant="secondary">
                {campaigns.filter(c => c.status === 'active').length} active
              </Badge>
            )}
          </CardTitle>
          <Button size="sm" variant="outline" className="gap-2">
            <Plus className="h-4 w-4" />
            New Campaign
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {campaigns.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Rocket className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm mb-3">No campaigns tracked yet</p>
            <Button variant="outline" size="sm" className="gap-2">
              <Plus className="h-4 w-4" />
              Create First Campaign
            </Button>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-4">
              {campaigns.map((campaign, index) => (
                <motion.div
                  key={campaign.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        {getChannelIcon(campaign.campaign_type)}
                      </div>
                      <div>
                        <h4 className="font-semibold text-sm mb-1">{campaign.campaign_name}</h4>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className={getStatusColor(campaign.status)}>
                            {campaign.status}
                          </Badge>
                          <span className="text-xs text-muted-foreground">{campaign.campaign_type}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="grid grid-cols-3 gap-3 mb-3">
                    <div className="p-2 rounded bg-muted/50">
                      <div className="flex items-center gap-1 mb-1">
                        <Eye className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Impressions</span>
                      </div>
                      <p className="text-sm font-semibold">
                        {campaign.metrics.impressions?.toLocaleString() || '0'}
                      </p>
                    </div>
                    <div className="p-2 rounded bg-muted/50">
                      <div className="flex items-center gap-1 mb-1">
                        <MousePointerClick className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">Clicks</span>
                      </div>
                      <p className="text-sm font-semibold">
                        {campaign.metrics.clicks?.toLocaleString() || '0'}
                      </p>
                    </div>
                    <div className="p-2 rounded bg-muted/50">
                      <div className="flex items-center gap-1 mb-1">
                        <TrendingUp className="h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">CTR</span>
                      </div>
                      <p className="text-sm font-semibold">
                        {campaign.metrics.ctr ? `${(campaign.metrics.ctr * 100).toFixed(2)}%` : '0%'}
                      </p>
                    </div>
                  </div>

                  {/* Budget Progress */}
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">Budget Spent</span>
                      <span className="font-medium">
                        ${campaign.metrics.spend?.toLocaleString() || '0'} / ${campaign.budget_allocated.toLocaleString()}
                      </span>
                    </div>
                    <Progress 
                      value={((campaign.metrics.spend || 0) / campaign.budget_allocated) * 100} 
                      className="h-1.5"
                    />
                  </div>

                  {/* Date Range */}
                  <div className="flex items-center gap-1 mt-3 text-xs text-muted-foreground">
                    <Calendar className="h-3 w-3" />
                    <span>
                      {new Date(campaign.start_date).toLocaleDateString()}
                      {campaign.end_date && ` - ${new Date(campaign.end_date).toLocaleDateString()}`}
                    </span>
                  </div>
                </motion.div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
