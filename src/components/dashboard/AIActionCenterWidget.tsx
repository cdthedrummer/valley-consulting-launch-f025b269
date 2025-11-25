import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  Sparkles, 
  MessageSquare, 
  Rocket,
  Calendar,
  Mail,
  TrendingUp,
  ArrowRight,
  RefreshCw,
  Clock
} from 'lucide-react';
import { motion } from 'framer-motion';
import { CALENDLY_URL } from '@/config/calendly';
import { supabase } from '@/integrations/supabase/client';
import { formatDistanceToNow } from 'date-fns';

interface AIActionCenterProps {
  location?: string;
  industry?: string;
  className?: string;
  onChatWithPlan?: (message: string) => void;
}

interface Priority {
  id: string;
  title: string;
  description: string;
  action: string;
  actionType: 'chat' | 'external' | 'quick';
  icon: React.ReactNode;
  priority: 'high' | 'medium';
  externalUrl?: string;
}

export const AIActionCenterWidget: React.FC<AIActionCenterProps> = ({
  location = 'Hudson Valley',
  industry = 'Construction',
  className,
  onChatWithPlan
}) => {
  const [priorities, setPriorities] = useState<Priority[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  const loadDynamicPriorities = async () => {
    setLoading(true);
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setLoading(false);
        return;
      }

      // Fetch user intelligence profile
      const { data: profile } = await supabase
        .from('user_intelligence_profile')
        .select('*')
        .eq('user_id', user.id)
        .maybeSingle();

      // Fetch recent chat signals
      const { data: signals } = await supabase
        .from('chat_signals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      // Generate dynamic priorities based on profile and signals
      const dynamicPriorities: Priority[] = [];

      // Priority 1: Based on urgency level
      if (profile?.urgency_level === 'high') {
        dynamicPriorities.push({
          id: 'urgent-action',
          title: 'High Priority: Immediate Action Required',
          description: `Your profile shows high urgency. Let's create a quick-win campaign for ${location}`,
          action: 'Start Now',
          actionType: 'chat',
          icon: <TrendingUp className="h-5 w-5" />,
          priority: 'high'
        });
      }

      // Priority 2: Based on primary pain points
      if (profile?.primary_pain_points && profile.primary_pain_points.length > 0) {
        const topPainPoint = profile.primary_pain_points[0];
        dynamicPriorities.push({
          id: 'pain-point-solution',
          title: `Solution for: ${topPainPoint}`,
          description: 'AI-powered strategy to address your top challenge',
          action: 'Get Strategy',
          actionType: 'chat',
          icon: <Rocket className="h-5 w-5" />,
          priority: 'high'
        });
      }

      // Priority 3: Based on service focus
      if (profile?.service_focus && profile.service_focus.length > 0) {
        dynamicPriorities.push({
          id: 'service-campaign',
          title: `${profile.service_focus[0]} Campaign Ready`,
          description: `Optimized strategy for ${profile.service_focus[0]} in ${location}`,
          action: 'View Plan',
          actionType: 'chat',
          icon: <Sparkles className="h-5 w-5" />,
          priority: 'medium'
        });
      }

      // Fallback priorities if no profile data
      if (dynamicPriorities.length === 0) {
        dynamicPriorities.push(
          {
            id: 'local-leads',
            title: 'High-Value Property Leads',
            description: `Found opportunities in ${location} needing ${industry.toLowerCase()} work`,
            action: 'View Leads',
            actionType: 'chat',
            icon: <TrendingUp className="h-5 w-5" />,
            priority: 'high'
          },
          {
            id: 'market-gap',
            title: 'Untapped Market Opportunity',
            description: 'Same-day emergency service gap with high demand',
            action: 'Build Strategy',
            actionType: 'chat',
            icon: <Rocket className="h-5 w-5" />,
            priority: 'high'
          },
          {
            id: 'competitor-advantage',
            title: 'Competitive Edge Available',
            description: 'Your response time is 50% faster than competitors',
            action: 'Create Campaign',
            actionType: 'chat',
            icon: <Sparkles className="h-5 w-5" />,
            priority: 'medium'
          }
        );
      }

      setPriorities(dynamicPriorities);
      setLastUpdated(new Date());
    } catch (error) {
      console.error('Error loading priorities:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadDynamicPriorities();
  }, [location, industry]);

  const handleAction = (priority: Priority) => {
    if (priority.actionType === 'chat' && onChatWithPlan) {
      let message = '';
      if (priority.id === 'local-leads') {
        message = `Show me the property leads in ${location} and help me create an outreach plan`;
      } else if (priority.id === 'market-gap') {
        message = `Help me build a marketing strategy for same-day emergency ${industry.toLowerCase()} service`;
      } else if (priority.id === 'competitor-advantage') {
        message = `Create a campaign highlighting my fast response time advantage`;
      } else if (priority.id === 'urgent-action') {
        message = `I need immediate marketing help for my ${industry} business in ${location}`;
      } else if (priority.id === 'pain-point-solution') {
        message = `Help me solve: ${priority.title}`;
      } else if (priority.id === 'service-campaign') {
        message = `Create a marketing campaign for ${priority.title}`;
      }
      onChatWithPlan(message);
    } else if (priority.actionType === 'external' && priority.externalUrl) {
      window.open(priority.externalUrl, '_blank');
    }
  };

  const quickActions = [
    {
      label: 'Schedule Consultation',
      icon: <Calendar className="h-4 w-4" />,
      action: () => window.open(CALENDLY_URL, '_blank')
    },
    {
      label: 'Draft Email',
      icon: <Mail className="h-4 w-4" />,
      action: () => onChatWithPlan?.('Help me draft a marketing email for potential customers')
    },
    {
      label: 'Create Ad Copy',
      icon: <MessageSquare className="h-4 w-4" />,
      action: () => onChatWithPlan?.('Create ad copy for my next campaign')
    }
  ];

  return (
    <Card className={`${className} border-2 border-action-yellow/30 bg-warm-cream shadow-lg`}>
      <CardHeader className="pb-4">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-3">
            <Sparkles className="h-6 w-6 text-action-yellow" />
            <span className="font-archivo text-2xl uppercase tracking-wide text-club-green">AI Action Center</span>
          </CardTitle>
          <div className="flex items-center gap-2">
            <Badge className="bg-action-yellow/20 text-club-green font-dm font-semibold border border-action-yellow/30">
              {priorities.length} priorities
            </Badge>
            <Button
              variant="ghost"
              size="sm"
              onClick={loadDynamicPriorities}
              disabled={loading}
              className="h-8 w-8 p-0"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            </Button>
          </div>
        </div>
        {lastUpdated && (
          <div className="flex items-center gap-1 text-xs text-club-green/50 font-dm mt-2">
            <Clock className="h-3 w-3" />
            Updated {formatDistanceToNow(lastUpdated, { addSuffix: true })}
          </div>
        )}
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Top Priorities */}
        <div className="space-y-3">
          <h3 className="font-dm text-xs font-bold text-club-green/60 uppercase tracking-widest">
            Top Priorities
          </h3>
          {loading ? (
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="p-4 rounded-lg border-2 border-club-green/10 bg-white animate-pulse">
                  <div className="h-4 bg-club-green/10 rounded w-3/4 mb-2"></div>
                  <div className="h-3 bg-club-green/10 rounded w-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="space-y-3">
              {priorities.map((priority, index) => (
                <motion.div
                  key={priority.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="p-4 rounded-lg border-2 border-club-green/10 bg-white hover:shadow-md hover:border-action-yellow/30 transition-all duration-200"
                >
                  <div className="flex items-start gap-3">
                    <div className={`p-2 rounded-lg ${
                      priority.priority === 'high' 
                        ? 'bg-action-yellow/20 text-club-green' 
                        : 'bg-club-green/10 text-club-green'
                    }`}>
                      {priority.icon}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <h4 className="font-archivo text-sm uppercase tracking-wide text-club-green">{priority.title}</h4>
                        {priority.priority === 'high' && (
                          <Badge className="text-xs bg-club-green text-warm-cream font-dm">High</Badge>
                        )}
                      </div>
                      <p className="font-dm text-sm text-club-green/70 mb-3">
                        {priority.description}
                      </p>
                      <Button
                        onClick={() => handleAction(priority)}
                        size="sm"
                        className="w-full sm:w-auto bg-action-yellow hover:bg-action-yellow/90 text-club-green font-dm font-semibold"
                      >
                        {priority.action}
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="space-y-3">
          <h3 className="font-dm text-xs font-bold text-club-green/60 uppercase tracking-widest">
            Quick Actions
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {quickActions.map((action, index) => (
              <Button
                key={index}
                variant="outline"
                onClick={action.action}
                className="justify-start gap-2 border-club-green/20 text-club-green hover:bg-action-yellow/10 hover:border-action-yellow font-dm"
              >
                {action.icon}
                {action.label}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
