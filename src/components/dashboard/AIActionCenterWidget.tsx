import React from 'react';
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
  ArrowRight
} from 'lucide-react';
import { motion } from 'framer-motion';
import { CALENDLY_URL } from '@/config/calendly';

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
  const priorities: Priority[] = [
    {
      id: 'local-leads',
      title: 'High-Value Property Leads',
      description: `Found 5 properties in ${location} needing ${industry.toLowerCase()} work`,
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
  ];

  const handleAction = (priority: Priority) => {
    if (priority.actionType === 'chat' && onChatWithPlan) {
      let message = '';
      if (priority.id === 'local-leads') {
        message = `Show me the property leads in ${location} and help me create an outreach plan`;
      } else if (priority.id === 'market-gap') {
        message = `Help me build a marketing strategy for same-day emergency ${industry.toLowerCase()} service`;
      } else if (priority.id === 'competitor-advantage') {
        message = `Create a campaign highlighting my fast response time advantage`;
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
          <Badge className="bg-action-yellow/20 text-club-green font-dm font-semibold border border-action-yellow/30">
            3 priorities
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Top Priorities */}
        <div className="space-y-3">
          <h3 className="font-dm text-xs font-bold text-club-green/60 uppercase tracking-widest">
            Top Priorities
          </h3>
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
