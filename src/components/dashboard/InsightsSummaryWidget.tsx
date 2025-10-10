import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Sparkles, 
  TrendingUp, 
  AlertCircle, 
  CheckCircle,
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';

interface Insight {
  id: string;
  type: 'opportunity' | 'warning' | 'success' | 'recommendation';
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  actionable: boolean;
  created_at: string;
}

export const InsightsSummaryWidget: React.FC<{ 
  className?: string;
  onActionClick?: (insight: Insight) => void;
}> = ({ className, onActionClick }) => {
  const [insights, setInsights] = useState<Insight[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    loadInsights();
    
    // Subscribe to updates
    const channel = supabase
      .channel('insights-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'user_intelligence_profile'
        },
        () => {
          loadInsights();
        }
      )
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_signals'
        },
        () => {
          loadInsights();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadInsights = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      // Get user intelligence profile
      const { data: profile } = await supabase
        .from('user_intelligence_profile')
        .select('*')
        .eq('user_id', user.id)
        .single();

      // Get recent chat signals
      const { data: signals } = await supabase
        .from('chat_signals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(5);

      // Generate insights from data
      const generatedInsights: Insight[] = [];

      // Insights from user profile
      if (profile) {
        if (profile.primary_pain_points && profile.primary_pain_points.length > 0) {
          generatedInsights.push({
            id: 'pain-point-1',
            type: 'opportunity',
            title: 'Key Challenge Identified',
            description: `You've mentioned "${profile.primary_pain_points[0]}" as a main concern. We have strategies to address this.`,
            priority: 'high',
            actionable: true,
            created_at: profile.updated_at
          });
        }

        if (profile.recommendations && typeof profile.recommendations === 'object') {
          const recs = profile.recommendations as any;
          if (recs.nextSteps && Array.isArray(recs.nextSteps)) {
            recs.nextSteps.slice(0, 2).forEach((step: string, idx: number) => {
              generatedInsights.push({
                id: `rec-${idx}`,
                type: 'recommendation',
                title: 'Recommended Action',
                description: step,
                priority: idx === 0 ? 'high' : 'medium',
                actionable: true,
                created_at: profile.updated_at
              });
            });
          }
        }

        if (profile.urgency_level === 'high') {
          generatedInsights.push({
            id: 'urgency-alert',
            type: 'warning',
            title: 'High Urgency Detected',
            description: 'Your goals indicate time-sensitive needs. Consider prioritizing immediate actions.',
            priority: 'high',
            actionable: true,
            created_at: profile.updated_at
          });
        }
      }

      // Insights from recent signals
      if (signals && signals.length > 0) {
        const budgetSignals = signals.filter(s => s.signal_type === 'budget_indicator');
        if (budgetSignals.length > 0) {
          generatedInsights.push({
            id: 'budget-insight',
            type: 'opportunity',
            title: 'Budget Information Captured',
            description: 'We\'ve identified your budget preferences to create more accurate recommendations.',
            priority: 'medium',
            actionable: false,
            created_at: budgetSignals[0].created_at
          });
        }

        const locationSignals = signals.filter(s => s.signal_type === 'location_mention');
        if (locationSignals.length > 1) {
          generatedInsights.push({
            id: 'multi-location',
            type: 'recommendation',
            title: 'Multiple Locations Detected',
            description: 'You\'ve mentioned multiple service areas. Consider creating location-specific campaigns.',
            priority: 'medium',
            actionable: true,
            created_at: locationSignals[0].created_at
          });
        }
      }

      // Sort by priority and date
      generatedInsights.sort((a, b) => {
        const priorityOrder = { high: 0, medium: 1, low: 2 };
        const priorityDiff = priorityOrder[a.priority] - priorityOrder[b.priority];
        if (priorityDiff !== 0) return priorityDiff;
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      });

      setInsights(generatedInsights.slice(0, 6));
    } catch (error) {
      console.error('Error loading insights:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const refreshInsights = async () => {
    setRefreshing(true);
    await loadInsights();
    toast({
      title: "Insights refreshed",
      description: "Latest intelligence has been loaded",
    });
  };

  const getInsightIcon = (type: Insight['type']) => {
    switch (type) {
      case 'opportunity':
        return <Sparkles className="h-4 w-4 text-blue-500" />;
      case 'warning':
        return <AlertCircle className="h-4 w-4 text-yellow-500" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      case 'recommendation':
        return <TrendingUp className="h-4 w-4 text-purple-500" />;
    }
  };

  const getPriorityColor = (priority: Insight['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-500 border-red-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
    }
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Sparkles className="h-5 w-5" />
            AI Insights
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
            <Sparkles className="h-5 w-5" />
            AI Insights
            {insights.length > 0 && (
              <Badge variant="secondary">
                {insights.length} active
              </Badge>
            )}
          </CardTitle>
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={refreshInsights}
            disabled={refreshing}
            className="h-8 w-8 p-0"
          >
            <RefreshCw className={`h-4 w-4 ${refreshing ? 'animate-spin' : ''}`} />
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        {insights.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <Sparkles className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">Start chatting to generate AI insights</p>
          </div>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <AnimatePresence initial={false}>
              <div className="space-y-3">
                {insights.map((insight, index) => (
                  <motion.div
                    key={insight.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-4 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getInsightIcon(insight.type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-sm font-semibold">{insight.title}</h4>
                          <Badge 
                            variant="outline" 
                            className={`text-xs ${getPriorityColor(insight.priority)}`}
                          >
                            {insight.priority}
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">
                          {insight.description}
                        </p>
                        {insight.actionable && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-7 text-xs gap-1"
                            onClick={() => onActionClick?.(insight)}
                          >
                            Take Action
                            <ArrowRight className="h-3 w-3" />
                          </Button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
