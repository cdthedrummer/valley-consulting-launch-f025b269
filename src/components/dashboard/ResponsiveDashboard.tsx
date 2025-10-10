import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Maximize2,
  Minimize2,
  Lightbulb
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { DashboardLoading } from '@/components/ui/enhanced-loading';
import MarketIntelligenceWidget from './MarketIntelligenceWidget';
import OpportunityMapWidget from './OpportunityMapWidget';
import IndustryInsightsWidget from './IndustryInsightsWidget';
import MarketingActionCenter from './MarketingActionCenter';
import { UserIntelligenceWidget } from './UserIntelligenceWidget';
import { ChatInsightsWidget } from './ChatInsightsWidget';
import { CampaignTrackingWidget } from './CampaignTrackingWidget';

interface ResponsiveDashboardProps {
  location?: string;
  locationType?: 'zipcode' | 'county' | null;
  industry?: string;
  className?: string;
  onChatWithPlan?: (planContent: string) => void;
}

const ResponsiveDashboard: React.FC<ResponsiveDashboardProps> = ({
  location = 'Hudson Valley',
  locationType,
  industry = 'Construction',
  className,
  onChatWithPlan
}) => {
  const [focusedWidget, setFocusedWidget] = useState<string | null>(null);

  const displayLocation = locationType === 'zipcode' ? `ZIP ${location}` : location;

  const widgets = [
    {
      id: 'user-intelligence',
      title: 'Your Marketing Intelligence',
      icon: TrendingUp,
      component: UserIntelligenceWidget,
      priority: 0
    },
    {
      id: 'chat-insights',
      title: 'Chat Insights',
      icon: TrendingUp,
      component: ChatInsightsWidget,
      priority: 1
    },
    {
      id: 'campaign-tracking',
      title: 'Campaign Performance',
      icon: TrendingUp,
      component: CampaignTrackingWidget,
      priority: 2
    },
    {
      id: 'market-intelligence',
      title: 'Market Intelligence',
      icon: TrendingUp,
      component: MarketIntelligenceWidget,
      priority: 3
    },
    {
      id: 'industry-insights',
      title: 'Industry Insights',
      icon: BarChart3,
      component: IndustryInsightsWidget,
      priority: 4
    },
    {
      id: 'opportunity-map',
      title: 'Opportunity Map',
      icon: MapPin,
      component: OpportunityMapWidget,
      priority: 5
    },
    {
      id: 'marketing-action-center',
      title: 'Marketing Action Center',
      icon: Lightbulb,
      component: MarketingActionCenter,
      priority: 6
    }
  ];


  const renderWidget = (widget: typeof widgets[0], index: number) => {
    const Component = widget.component as any;
    const isExpanded = focusedWidget === widget.id;
    
    return (
      <motion.div
        key={widget.id}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: index * 0.1 }}
        className={cn(
          "relative",
          !isExpanded && focusedWidget ? "lg:col-span-1" : "",
          isExpanded ? "lg:col-span-2 xl:col-span-3" : ""
        )}
      >
        <div className="relative group">
          <Button
            variant="ghost"
            size="sm"
            className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setFocusedWidget(isExpanded ? null : widget.id)}
          >
            {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
          </Button>
          
          {widget.id === 'user-intelligence' ? (
            <UserIntelligenceWidget className={cn(
              "h-full transition-all duration-300",
              isExpanded ? "ring-2 ring-primary/20" : ""
            )} />
          ) : widget.id === 'chat-insights' ? (
            <ChatInsightsWidget className={cn(
              "h-full transition-all duration-300",
              isExpanded ? "ring-2 ring-primary/20" : ""
            )} />
          ) : widget.id === 'campaign-tracking' ? (
            <CampaignTrackingWidget className={cn(
              "h-full transition-all duration-300",
              isExpanded ? "ring-2 ring-primary/20" : ""
            )} />
          ) : (
            <Component
              location={location}
              industry={industry}
              {...(widget.id === 'marketing-action-center' ? { 
                locationType,
                onChatWithPlan: (plan: any) => {
                  if (onChatWithPlan) {
                    // Format the plan into a readable prompt
                    const planContent = `I have a marketing plan I'd like to discuss and implement. Here are the details:

**Priority Tasks:**
${plan.tasks.map((t: any, i: number) => `${i + 1}. ${t.task} (${t.priority} priority, ${t.timeline})`).join('\n')}

**Budget Allocation:**
${plan.budgetAllocations.map((b: any) => `- ${b.channel}: ${b.percentage}% ($${b.amount})`).join('\n')}

**Target Keywords:**
${plan.keywords.join(', ')}

**Email Creatives:**
${plan.creatives.email.map((e: string, i: number) => `Email ${i + 1}:\n${e}`).join('\n\n')}

**Search Ads:**
${plan.creatives.search.join('\n')}

**Timeline:**
${plan.timeline.join('\n')}

**Success Metrics:**
${plan.metrics.join('\n')}

Can you help me understand how to implement each of these components step by step? What should I prioritize first, and what specific actions should I take?`;
                    
                    onChatWithPlan(planContent);
                  }
                }
              } : {})}
              className={cn(
                "h-full transition-all duration-300",
                isExpanded ? "ring-2 ring-primary/20" : ""
              )}
            />
          )}
        </div>
      </motion.div>
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn("space-y-3 md:space-y-4", className)}
    >
      {/* Data Sources Header */}
      <div className="mb-6 flex items-center justify-end">
        <div className="text-right hidden xl:block">
          <div className="text-xs font-medium text-muted-foreground/80">Data Sources</div>
          <div className="text-xs text-muted-foreground/60">
            US Census • Local Data • Market Analysis
          </div>
        </div>
      </div>

      {/* Widgets Container */}
      <AnimatePresence mode="wait">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="grid grid-cols-1 gap-4"
        >
          {widgets
            .sort((a, b) => a.priority - b.priority)
            .map((widget, index) => renderWidget(widget, index))}
        </motion.div>
      </AnimatePresence>

      {/* Action Items - Always visible at bottom */}
      <Card className="border-0 bg-gradient-to-r from-primary/5 via-secondary/5 to-accent/5 backdrop-blur-sm">
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center gap-2 text-base md:text-lg text-balance">
            <TrendingUp className="h-4 w-4 md:h-5 md:w-5 text-accent" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="mobile-grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <div className="widget-card p-3 bg-background/60 backdrop-blur-sm">
              <h4 className="font-semibold text-xs md:text-sm mb-1 text-foreground">High Priority</h4>
              <p className="text-xs text-pretty text-muted-foreground">
                Target {displayLocation} homeowners aged 35-54 for {industry} services. Market demand is 12% above average.
              </p>
            </div>
            <div className="widget-card p-3 bg-background/60 backdrop-blur-sm">
              <h4 className="font-semibold text-xs md:text-sm mb-1 text-foreground">Pricing Opportunity</h4>
              <p className="text-xs text-pretty text-muted-foreground">
                Current pricing is 5% below optimal. Consider $50-80 increase for new projects.
              </p>
            </div>
            <div className="widget-card p-3 bg-background/60 backdrop-blur-sm">
              <h4 className="font-semibold text-xs md:text-sm mb-1 text-foreground">Seasonal Planning</h4>
              <p className="text-xs text-pretty text-muted-foreground">
                Schedule maintenance campaigns for next quarter when demand typically increases 25%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Attribution */}
      <div className="text-xs text-muted-foreground text-center py-2">
        Data powered by US Census Bureau, American Community Survey, and County Business Patterns
      </div>
    </motion.div>
  );
};

export default ResponsiveDashboard;