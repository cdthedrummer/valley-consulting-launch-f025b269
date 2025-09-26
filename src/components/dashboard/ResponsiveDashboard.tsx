import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BarChart3, 
  TrendingUp, 
  MapPin, 
  Grid3X3 as LayoutGrid, 
  List,
  Eye as Focus,
  Maximize2,
  Minimize2,
  ChevronLeft
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { ErrorBoundary } from '@/components/ui/error-boundary';
import { DashboardLoading } from '@/components/ui/enhanced-loading';
import MarketIntelligenceWidget from './MarketIntelligenceWidget';
import OpportunityMapWidget from './OpportunityMapWidget';
import IndustryInsightsWidget from './IndustryInsightsWidget';

interface ResponsiveDashboardProps {
  location?: string;
  locationType?: 'zipcode' | 'county' | null;
  industry?: string;
  className?: string;
}

const ResponsiveDashboard: React.FC<ResponsiveDashboardProps> = ({
  location = 'Hudson Valley',
  locationType,
  industry = 'Construction',
  className
}) => {
  const [viewMode, setViewMode] = useState<'grid' | 'list' | 'focus'>('grid');
  const [focusedWidget, setFocusedWidget] = useState<string | null>(null);

  const displayLocation = locationType === 'zipcode' ? `ZIP ${location}` : location;

  const widgets = [
    {
      id: 'market-intelligence',
      title: 'Market Intelligence',
      icon: TrendingUp,
      component: MarketIntelligenceWidget,
      priority: 1
    },
    {
      id: 'industry-insights',
      title: 'Industry Insights',
      icon: BarChart3,
      component: IndustryInsightsWidget,
      priority: 2
    },
    {
      id: 'opportunity-map',
      title: 'Opportunity Map',
      icon: MapPin,
      component: OpportunityMapWidget,
      priority: 3
    }
  ];

  const getGridLayout = () => {
    switch (viewMode) {
      case 'grid':
        return 'grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4';
      case 'list':
        return 'flex flex-col gap-4';
      case 'focus':
        return 'grid grid-cols-1 gap-4';
      default:
        return 'grid grid-cols-1 lg:grid-cols-2 gap-4';
    }
  };

  const renderWidget = (widget: typeof widgets[0], index: number) => {
    const Component = widget.component;
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
          viewMode === 'focus' && !isExpanded && focusedWidget ? "lg:col-span-1" : "",
          viewMode === 'grid' && widget.id === 'opportunity-map' ? "lg:col-span-2 xl:col-span-3" : "",
          isExpanded ? "lg:col-span-2 xl:col-span-3" : ""
        )}
      >
        <div className="relative group">
          {viewMode === 'focus' && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute top-2 right-2 z-10 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => setFocusedWidget(isExpanded ? null : widget.id)}
            >
              {isExpanded ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
            </Button>
          )}
          
          <Component
            location={location}
            industry={industry}
            className={cn(
              "h-full transition-all duration-300",
              isExpanded ? "ring-2 ring-primary/20" : ""
            )}
          />
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
      {/* View Controls - Desktop */}
      <div className="mb-6 flex items-center justify-between">
        <div className="hidden md:flex items-center gap-1 bg-background/50 backdrop-blur-sm rounded-lg p-1 border border-border/50">
          <Button
            variant={viewMode === 'grid' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('grid')}
            className="h-8 w-8 p-0 touch-optimized focus-enhanced"
          >
            <LayoutGrid className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'list' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('list')}
            className="h-8 w-8 p-0 touch-target focus-enhanced"
          >
            <List className="h-4 w-4" />
          </Button>
          <Button
            variant={viewMode === 'focus' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setViewMode('focus')}
            className="h-8 w-8 p-0 touch-target focus-enhanced"
          >
            <Focus className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="text-right hidden xl:block">
          <div className="text-xs font-medium text-muted-foreground/80">Data Sources</div>
          <div className="text-xs text-muted-foreground/60">
            US Census • Local Data • Market Analysis
          </div>
        </div>
      </div>

        {/* Mobile View Toggle */}
        <div className="md:hidden">
          <Tabs value={viewMode} onValueChange={(value) => setViewMode(value as any)}>
            <TabsList className="grid w-full grid-cols-3 bg-background/50 backdrop-blur-sm">
              <TabsTrigger value="grid" className="flex items-center gap-2 touch-target">
                <LayoutGrid className="h-4 w-4" />
                <span className="hidden sm:inline">Grid</span>
              </TabsTrigger>
              <TabsTrigger value="list" className="flex items-center gap-2 touch-target">
                <List className="h-4 w-4" />
                <span className="hidden sm:inline">List</span>
              </TabsTrigger>
              <TabsTrigger value="focus" className="flex items-center gap-2 touch-target">
                <Focus className="h-4 w-4" />
                <span className="hidden sm:inline">Focus</span>
              </TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      {/* Widgets Container */}
      <AnimatePresence mode="wait">
        <motion.div
          key={viewMode}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.3 }}
          className={getGridLayout()}
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