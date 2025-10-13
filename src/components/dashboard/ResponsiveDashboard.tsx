import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sparkles, 
  TrendingUp, 
  User,
  Building,
  Users,
  MapPin,
  Briefcase,
  AlertCircle,
  Loader2
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
  isLoadingProfile?: boolean;
  className?: string;
  onChatWithPlan?: (planContent: string) => void;
}

const ResponsiveDashboard: React.FC<ResponsiveDashboardProps> = ({
  location,
  locationType,
  industry,
  businessName,
  isLoadingProfile = false,
  className,
  onChatWithPlan
}) => {
  const [focusedWidget, setFocusedWidget] = useState<string | null>(null);
  
  // Trigger background intelligence analysis
  useIntelligenceAnalysis();

  const displayLocation = locationType === 'zipcode' ? `ZIP ${location}` : location;
  
  // Simplified gating checks - just check if data exists
  const hasLocationData = location && location.trim() !== '';
  const hasIndustryData = industry && industry.trim() !== '';
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

  // Show loading state while profile is loading
  if (isLoadingProfile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn("space-y-4", className)}
      >
        <Card className="border-2 border-primary/20 bg-gradient-to-r from-primary/5 via-background to-accent/5">
          <CardContent className="py-6">
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-primary" />
              <span className="text-muted-foreground">Loading your business profile...</span>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className={cn("space-y-3 md:space-y-4", className)}
    >
      {/* Business Context Header - Always Visible */}
      <Card className={cn(
        "border-2 sticky top-0 z-10 backdrop-blur-sm",
        hasCompleteProfile 
          ? "border-primary/20 bg-gradient-to-r from-primary/5 via-background to-accent/5"
          : "border-amber-200 bg-gradient-to-r from-amber-50 via-background to-orange-50"
      )}>
        <CardContent className="py-4">
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-4 flex-wrap">
              <div className="flex items-center gap-2">
                <div className={cn(
                  "p-2 rounded-lg",
                  hasCompleteProfile ? "bg-primary/10" : "bg-amber-100"
                )}>
                  <Building className={cn(
                    "h-5 w-5",
                    hasCompleteProfile ? "text-primary" : "text-amber-600"
                  )} />
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">Intelligence Dashboard For</div>
                  <div className="font-bold text-lg text-foreground">
                    {businessName || 'Your Business'}
                  </div>
                </div>
              </div>
              
              {hasCompleteProfile ? (
                <div className="flex items-center gap-2">
                  <Badge variant="secondary" className="gap-1.5">
                    <Briefcase className="h-3 w-3" />
                    {industry}
                  </Badge>
                  <Badge variant="outline" className="gap-1.5">
                    <MapPin className="h-3 w-3" />
                    {displayLocation}
                  </Badge>
                </div>
              ) : (
                <Badge variant="destructive" className="gap-1.5">
                  <AlertCircle className="h-3 w-3" />
                  Setup Required
                </Badge>
              )}
            </div>
            
            {hasCompleteProfile && (
              <div className="text-right hidden lg:block">
                <div className="text-xs font-medium text-muted-foreground/80">Data Sources</div>
                <div className="text-xs text-muted-foreground/60">
                  US Census • Local Data • Market Analysis
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Profile Completion Gate */}
      {!hasCompleteProfile ? (
        <Card className="border-2 border-amber-200 bg-gradient-to-br from-amber-50 to-orange-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-4">
              <div className="p-3 rounded-full bg-amber-100">
                <AlertCircle className="h-8 w-8 text-amber-600" />
              </div>
              <div className="flex-1 space-y-3">
                <div>
                  <h3 className="text-xl font-bold text-amber-900 mb-2">
                    Complete Your Profile to Unlock Insights
                  </h3>
                  <p className="text-amber-800 mb-4">
                    We need a few details to generate hyper-relevant intelligence for your business.
                  </p>
                </div>
                
                <div className="space-y-2 bg-white/60 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${hasLocationData ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {hasLocationData ? `✓ Location: ${displayLocation}` : 'Business Location Required'}
                    </span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className={`h-3 w-3 rounded-full ${hasIndustryData ? 'bg-green-500' : 'bg-amber-500 animate-pulse'}`} />
                    <Briefcase className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-medium">
                      {hasIndustryData ? `✓ Industry: ${industry}` : 'Industry Type Required'}
                    </span>
                  </div>
                </div>
                
                <p className="text-sm text-amber-700 pt-2">
                  💡 Use the form above to set your location and industry, then watch your personalized dashboard come to life!
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <>
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
        </>
      )}
    </motion.div>
  );
};

export default ResponsiveDashboard;
