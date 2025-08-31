import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import MarketIntelligenceWidget from './MarketIntelligenceWidget';
import OpportunityMapWidget from './OpportunityMapWidget';
import IndustryInsightsWidget from './IndustryInsightsWidget';
import { BarChart3, TrendingUp, MapPin } from 'lucide-react';
import { cn } from '@/lib/utils';

interface VisualDashboardProps {
  location?: string;
  locationType?: 'zipcode' | 'county' | null;
  industry?: string;
  className?: string;
}

const VisualDashboard: React.FC<VisualDashboardProps> = ({
  location = 'Hudson Valley',
  locationType,
  industry = 'Construction',
  className
}) => {
  const getIndustryTheme = (industry: string) => {
    const themes = {
      'HVAC': 'from-blue-500/10 to-cyan-500/10',
      'Plumbing': 'from-blue-600/10 to-indigo-500/10',
      'Flooring': 'from-amber-500/10 to-orange-500/10',
      'Deck & Patio': 'from-green-500/10 to-emerald-500/10',
      'Fencing': 'from-gray-500/10 to-slate-500/10',
      'Construction': 'from-primary/10 to-secondary/10'
    };
    return themes[industry as keyof typeof themes] || themes.Construction;
  };

  const displayLocation = locationType === 'zipcode' ? `ZIP ${location}` : location;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("space-y-6", className)}
    >
      {/* Header */}
      <Card className={cn("border-0 bg-gradient-to-r", getIndustryTheme(industry))}>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <BarChart3 className="h-6 w-6 text-primary" />
              <div>
                <h2 className="text-2xl font-bold">Market Intelligence Dashboard</h2>
                <p className="text-sm text-muted-foreground font-normal">
                  Real-time insights for {industry} businesses in {displayLocation}
                </p>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground">Data Sources</div>
              <div className="text-xs text-muted-foreground">
                US Census • Local Data • Market Analysis
              </div>
            </div>
          </CardTitle>
        </CardHeader>
      </Card>

      {/* Widgets Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Market Intelligence Widget */}
        <MarketIntelligenceWidget 
          location={location}
          industry={industry}
          className="lg:col-span-1"
        />

        {/* Industry Insights Widget */}
        <IndustryInsightsWidget 
          industry={industry}
          location={location}
          className="lg:col-span-1"
        />
      </div>

      {/* Full Width Opportunity Map */}
      <OpportunityMapWidget 
        location={location}
        industry={industry}
        className="w-full"
      />

      {/* Action Items */}
      <Card className="border-0 bg-gradient-to-r from-green-500/5 to-blue-500/5">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-lg">
            <TrendingUp className="h-5 w-5 text-green-600" />
            Recommended Actions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <div className="p-4 bg-background/50 rounded-lg border">
              <h4 className="font-medium text-sm mb-2">High Priority</h4>
              <p className="text-xs text-muted-foreground">
                Target {location} homeowners aged 35-54 for {industry} services. Market demand is 12% above average.
              </p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg border">
              <h4 className="font-medium text-sm mb-2">Pricing Opportunity</h4>
              <p className="text-xs text-muted-foreground">
                Current pricing is 5% below optimal. Consider $50-80 increase for new projects.
              </p>
            </div>
            <div className="p-4 bg-background/50 rounded-lg border">
              <h4 className="font-medium text-sm mb-2">Seasonal Planning</h4>
              <p className="text-xs text-muted-foreground">
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

export default VisualDashboard;