import React from 'react';
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
  Loader2,
  ArrowUp
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { UserIntelligenceWidget } from './UserIntelligenceWidget';
import { PropertyOpportunitiesWidget } from './PropertyOpportunitiesWidget';
import { AIActionCenterWidget } from './AIActionCenterWidget';
import { SimplifiedMarketWidget } from './SimplifiedMarketWidget';
import { StreamlinedCompetitiveWidget } from './StreamlinedCompetitiveWidget';
import { BusinessScoreWidget } from './BusinessScoreWidget';
import { CompetitorSpotlightWidget } from './CompetitorSpotlightWidget';
import { QuickWinsWidget } from './QuickWinsWidget';
import { useIntelligenceAnalysis } from '@/hooks/useIntelligenceAnalysis';

interface ResponsiveDashboardProps {
  location?: string;
  locationType?: 'zipcode' | 'county' | null;
  industry?: string;
  businessName?: string;
  isLoadingProfile?: boolean;
  className?: string;
  onChatWithPlan?: (planContent: string) => void;
  onLocationChange?: (location: string, locationType: 'zipcode' | 'county') => void;
  onIndustryChange?: (industry: string) => void;
  businessProfile?: any; // Contains marketingScore, quickWins, competitors
}

const ResponsiveDashboard: React.FC<ResponsiveDashboardProps> = ({
  location,
  locationType,
  industry,
  businessName,
  isLoadingProfile = false,
  className,
  onChatWithPlan,
  businessProfile,
}) => {
  
  // Trigger background intelligence analysis
  useIntelligenceAnalysis();

  const displayLocation = locationType === 'zipcode' ? `ZIP ${location}` : location;
  
  // Simplified gating checks - just check if data exists
  const hasCompleteProfile = location && location.trim() !== '' && industry && industry.trim() !== '';
  
  // Extract data from business profile
  const marketingScore = businessProfile?.marketing_score || 0;
  const quickWins = businessProfile?.scraped_data?.quickWins || [];
  const competitors = businessProfile?.competitors || [];
  const hasBusinessData = marketingScore > 0 || quickWins.length > 0 || competitors.length > 0;

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
      id: 'business-score',
      title: 'Marketing Score',
      icon: TrendingUp,
      component: BusinessScoreWidget,
      priority: 2,
      requiresBusinessData: true,
    },
    {
      id: 'quick-wins',
      title: 'Quick Wins',
      icon: Sparkles,
      component: QuickWinsWidget,
      priority: 3,
      requiresBusinessData: true,
    },
    {
      id: 'competitors',
      title: 'Competitors',
      icon: Users,
      component: CompetitorSpotlightWidget,
      priority: 4,
      requiresBusinessData: true,
    },
    {
      id: 'property-opportunities',
      title: 'Property Leads',
      icon: Building,
      component: PropertyOpportunitiesWidget,
      priority: 5,
    },
    {
      id: 'market-snapshot',
      title: 'Market Snapshot',
      icon: TrendingUp,
      component: SimplifiedMarketWidget,
      priority: 6,
    },
    {
      id: 'competitive-edge',
      title: 'Competitive Edge',
      icon: Users,
      component: StreamlinedCompetitiveWidget,
      priority: 7,
    },
    {
      id: 'user-intelligence',
      title: 'Your Intelligence',
      icon: User,
      component: UserIntelligenceWidget,
      priority: 8,
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
    
    if (widget.id === 'business-score') {
      if (!hasBusinessData) return null;
      const percentile = Math.min(95, Math.max(5, Math.floor(marketingScore * 0.9)));
      return (
        <BusinessScoreWidget
          score={marketingScore}
          industry={industry || 'Business'}
          percentile={percentile}
          lastUpdated={businessProfile?.updated_at}
        />
      );
    }
    
    if (widget.id === 'quick-wins') {
      if (!hasBusinessData) return null;
      return (
        <QuickWinsWidget
          quickWins={quickWins}
        />
      );
    }
    
    if (widget.id === 'competitors') {
      if (!hasBusinessData) return null;
      return (
        <CompetitorSpotlightWidget
          competitors={competitors}
          maxDisplay={3}
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
    
    // Fallback - should not reach here if widgets are properly filtered
    return null;
  };

  // Show loading state while profile is loading
  if (isLoadingProfile) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className={cn("space-y-4", className)}
      >
        <Card className="border-2 border-action-yellow/30 bg-warm-cream shadow-lg">
          <CardContent className="py-8">
            <div className="flex items-center justify-center gap-3">
              <Loader2 className="h-5 w-5 animate-spin text-action-yellow" />
              <span className="font-dm text-club-green">Loading your business profile...</span>
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
      className={cn("space-y-6", className)}
    >
      {/* Business Context Header - Only show when profile is complete */}
      {hasCompleteProfile && (
        <Card className="border-2 border-action-yellow/30 bg-warm-cream shadow-lg">
          <CardContent className="py-6">
            <div className="flex items-center justify-between flex-wrap gap-4">
              <div className="flex items-center gap-4 flex-wrap">
                <div className="flex items-center gap-3">
                  <div className="p-3 rounded-lg bg-action-yellow/20">
                    <Building className="h-6 w-6 text-club-green" />
                  </div>
                  <div>
                    <div className="font-dm text-xs uppercase tracking-wider text-club-green/60">Intelligence Dashboard For</div>
                    <div className="font-archivo text-xl uppercase tracking-wide text-club-green">
                      {businessName || 'Your Business'}
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-2">
                  <Badge className="gap-1.5 bg-club-green text-warm-cream font-dm">
                    <Briefcase className="h-3 w-3" />
                    {industry}
                  </Badge>
                  <Badge variant="outline" className="gap-1.5 border-club-green/30 text-club-green font-dm">
                    <MapPin className="h-3 w-3" />
                    {displayLocation}
                  </Badge>
                </div>
              </div>
              
              <div className="text-right hidden lg:block">
                <div className="font-dm text-xs font-medium uppercase tracking-wider text-club-green/60">Data Sources</div>
                <div className="font-dm text-xs text-club-green/50">
                  US Census • Local Data • Market Analysis
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Widgets - Only show when profile is complete */}
      {hasCompleteProfile ? (
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

        {/* Main Grid - Other Widgets (excluding property) */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 mb-4">
          {widgets
            .filter((widget: any) => 
              !widget.isHero && 
              widget.id !== 'property-opportunities' && 
              (!widget.requiresProfile || hasCompleteProfile) &&
              (!widget.requiresBusinessData || hasBusinessData)
            )
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
      <Card className="border-2 border-action-yellow/30 bg-warm-cream shadow-lg">
        <CardHeader className="pb-4">
          <CardTitle className="flex items-center gap-2 font-archivo text-lg md:text-xl uppercase tracking-wide text-club-green">
            <TrendingUp className="h-5 w-5 md:h-6 md:w-6 text-action-yellow" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-club-green/5 rounded-lg border-l-4 border-action-yellow">
              <h4 className="font-archivo text-sm uppercase tracking-wide mb-2 text-club-green">High Priority</h4>
              <p className="font-dm text-xs text-club-green/70 leading-relaxed">
                Target {displayLocation} homeowners aged 35-54 for {industry} services. Market demand is 12% above average.
              </p>
            </div>
            <div className="p-4 bg-club-green/5 rounded-lg border-l-4 border-action-yellow">
              <h4 className="font-archivo text-sm uppercase tracking-wide mb-2 text-club-green">Pricing Opportunity</h4>
              <p className="font-dm text-xs text-club-green/70 leading-relaxed">
                Current pricing is 5% below optimal. Consider $50-80 increase for new projects.
              </p>
            </div>
            <div className="p-4 bg-club-green/5 rounded-lg border-l-4 border-action-yellow">
              <h4 className="font-archivo text-sm uppercase tracking-wide mb-2 text-club-green">Seasonal Planning</h4>
              <p className="font-dm text-xs text-club-green/70 leading-relaxed">
                Schedule maintenance campaigns for next quarter when demand typically increases 25%.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Data Attribution */}
      <div className="font-dm text-xs text-club-green/40 text-center py-2">
        Data powered by US Census Bureau, American Community Survey, and County Business Patterns
      </div>
        </>
      ) : null}
    </motion.div>
  );
};

export default ResponsiveDashboard;
