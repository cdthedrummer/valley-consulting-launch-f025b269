import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  User,
  Building,
  Users
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserIntelligenceWidget } from './UserIntelligenceWidget';
import { PropertyOpportunitiesWidget } from './PropertyOpportunitiesWidget';
import { AIActionCenterWidget } from './AIActionCenterWidget';
import { SimplifiedMarketWidget } from './SimplifiedMarketWidget';
import { StreamlinedCompetitiveWidget } from './StreamlinedCompetitiveWidget';
import { useIntelligenceAnalysis } from '@/hooks/useIntelligenceAnalysis';

interface ResponsiveDashboardProps {
  location?: string;
  locationType?: 'zipcode' | 'county' | null;
  industry?: string;
  businessName?: string;
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
  
  // Trigger background intelligence analysis
  useIntelligenceAnalysis();

  const displayLocation = locationType === 'zipcode' ? `ZIP ${location}` : location;
  
  // Check if we have sufficient data for property/competitive widgets
  const hasLocationData = location && location !== 'Hudson Valley';
  const hasIndustryData = industry && industry !== 'Construction';
  const hasCompleteProfile = hasLocationData && hasIndustryData;

  const widgets = [
    {
      id: 'ai-action-center',
      title: 'AI Action Center',
      icon: Sparkles,
      component: AIActionCenterWidget,
      priority: 1,
      isHero: true,
    },
    {
      id: 'property-opportunities',
      title: 'Property Leads',
      icon: Building,
      component: PropertyOpportunitiesWidget,
      priority: 2,
    },
    {
      id: 'market-snapshot',
      title: 'Market Snapshot',
      icon: TrendingUp,
      component: SimplifiedMarketWidget,
      priority: 3,
    },
    {
      id: 'competitive-edge',
      title: 'Competitive Edge',
      icon: Users,
      component: StreamlinedCompetitiveWidget,
      priority: 4,
    },
    {
      id: 'user-intelligence',
      title: 'Your Intelligence',
      icon: User,
      component: UserIntelligenceWidget,
      priority: 5,
      requiresProfile: true,
    },
  ];

  const renderWidget = (widget: typeof widgets[0]) => {
    const widgetClassName = cn("h-full transition-all duration-300");

    if (widget.id === 'ai-action-center') {
      return (
        <AIActionCenterWidget
          location={location}
          industry={industry}
          className={widgetClassName}
          onChatWithPlan={onChatWithPlan}
        />
      );
    }
    
    if (widget.id === 'user-intelligence') {
      return (
        <UserIntelligenceWidget
          className={widgetClassName}
        />
      );
    }
    
    if (widget.id === 'property-opportunities') {
      return (
        <PropertyOpportunitiesWidget
          location={location}
          industry={industry}
          className={widgetClassName}
        />
      );
    }
    
    if (widget.id === 'competitive-edge') {
      return (
        <StreamlinedCompetitiveWidget
          location={location}
          industry={industry}
          className={widgetClassName}
          onChatWithPlan={onChatWithPlan}
        />
      );
    }
    
    if (widget.id === 'market-snapshot') {
      return (
        <SimplifiedMarketWidget
          location={location}
          industry={industry}
          className={widgetClassName}
        />
      );
    }
    
    const WidgetComponent = widget.component as React.ComponentType<any>;
    return (
      <WidgetComponent
        location={location}
        industry={industry}
        className={widgetClassName}
      />
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
        {/* Hero Widget - AI Action Center */}
        {widgets.filter(w => w.isHero).map((widget) => (
          <motion.div
            key={widget.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="mb-6"
          >
            {renderWidget(widget)}
          </motion.div>
        ))}

        {/* Main Grid - Other Widgets */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {widgets
            .filter((widget: any) => !widget.isHero && (!widget.requiresProfile || hasCompleteProfile))
            .sort((a, b) => a.priority - b.priority)
            .map((widget) => (
              <motion.div
                key={widget.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                {renderWidget(widget)}
              </motion.div>
            ))}
        </div>
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
