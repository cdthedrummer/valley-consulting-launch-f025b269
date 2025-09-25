import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { 
  Wrench, 
  TrendingUp, 
  Calendar, 
  AlertCircle, 
  Lightbulb,
  Target,
  Clock,
  DollarSign
} from 'lucide-react';
import ScrollableWidget from '@/components/ScrollableWidget';
import { cn } from '@/lib/utils';

interface IndustryTrend {
  metric: string;
  value: number;
  change: number;
  trend: 'up' | 'down' | 'stable';
  timeframe: string;
}

interface SeasonalPattern {
  month: string;
  demand: number;
  avgPrice: number;
  competition: number;
}

interface IndustryInsightsWidgetProps {
  industry?: string;
  location?: string;
  className?: string;
}

const IndustryInsightsWidget: React.FC<IndustryInsightsWidgetProps> = ({
  industry = 'HVAC',
  location = 'Hudson Valley',
  className
}) => {
  const [trends, setTrends] = useState<IndustryTrend[]>([]);
  const [seasonalData, setSeasonalData] = useState<SeasonalPattern[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchIndustryData();
  }, [industry, location]);

  const fetchIndustryData = async () => {
    setIsLoading(true);
    
    // Simulate API call - replace with real industry data
    setTimeout(() => {
      const mockTrends: IndustryTrend[] = [
        {
          metric: 'Service Demand',
          value: 78,
          change: 12,
          trend: 'up',
          timeframe: 'vs last month'
        },
        {
          metric: 'Average Price',
          value: 850,
          change: 5,
          trend: 'up',
          timeframe: 'vs last quarter'
        },
        {
          metric: 'Competition Index',
          value: 65,
          change: -3,
          trend: 'down',
          timeframe: 'vs last month'
        },
        {
          metric: 'Customer Satisfaction',
          value: 92,
          change: 8,
          trend: 'up',
          timeframe: 'last 30 days'
        }
      ];

      const mockSeasonalData: SeasonalPattern[] = [
        { month: 'Jan', demand: 45, avgPrice: 950, competition: 40 },
        { month: 'Feb', demand: 50, avgPrice: 920, competition: 45 },
        { month: 'Mar', demand: 65, avgPrice: 880, competition: 55 },
        { month: 'Apr', demand: 75, avgPrice: 850, competition: 65 },
        { month: 'May', demand: 85, avgPrice: 820, competition: 75 },
        { month: 'Jun', demand: 95, avgPrice: 800, competition: 85 },
        { month: 'Jul', demand: 100, avgPrice: 780, competition: 90 },
        { month: 'Aug', demand: 95, avgPrice: 790, competition: 85 },
        { month: 'Sep', demand: 80, avgPrice: 830, competition: 70 },
        { month: 'Oct', demand: 70, avgPrice: 870, competition: 60 },
        { month: 'Nov', demand: 55, avgPrice: 900, competition: 50 },
        { month: 'Dec', demand: 40, avgPrice: 970, competition: 35 }
      ];

      setTrends(mockTrends);
      setSeasonalData(mockSeasonalData);
      setIsLoading(false);
    }, 800);
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-3 w-3 text-green-600" />;
      case 'down':
        return <TrendingUp className="h-3 w-3 text-red-600 rotate-180" />;
      default:
        return <TrendingUp className="h-3 w-3 text-yellow-600 rotate-90" />;
    }
  };

  const getTrendColor = (trend: string) => {
    switch (trend) {
      case 'up':
        return 'text-green-600 bg-green-100';
      case 'down':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-yellow-600 bg-yellow-100';
    }
  };

  const getCurrentMonthIndex = () => new Date().getMonth();

  if (isLoading) {
    return (
      <Card className={cn("border-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5", className)}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Wrench className="h-5 w-5" />
            Industry Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(4)].map((_, i) => (
              <div key={i} className="h-16 bg-muted animate-pulse rounded-lg" />
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <ScrollableWidget delay={300}>
      <Card className={cn(
        "border-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 overflow-hidden",
        "shadow-lg transition-all duration-300 hover:shadow-xl",
        className
      )}>
        <CardHeader className="pb-2 px-4 sm:px-6">
          <CardTitle className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <div className="flex items-center gap-2 flex-wrap">
              <Wrench className="h-5 w-5 text-purple-600 transition-transform duration-200 hover:scale-110" />
              <span className="text-lg sm:text-xl">{industry} Insights</span>
            </div>
            <Badge variant="outline" className="text-xs self-start sm:self-center transition-all duration-200 hover:scale-105">
              {location}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="trends" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mx-4 sm:mx-6 mb-4 bg-background shadow-sm">
              <TabsTrigger value="trends" className="touch-target text-sm transition-all duration-200">
                Trends
              </TabsTrigger>
              <TabsTrigger value="seasonal" className="touch-target text-sm transition-all duration-200">
                <span className="hidden sm:inline">Seasonal</span>
                <span className="sm:hidden">Season</span>
              </TabsTrigger>
              <TabsTrigger value="insights" className="touch-target text-sm transition-all duration-200">
                Tips
              </TabsTrigger>
            </TabsList>

            <TabsContent value="trends" className="mobile-section space-y-3">
              {trends.map((trend, index) => (
                <div key={index} className="widget-card p-4 sm:p-5 transition-all duration-300 hover:shadow-lg group">
                  <div className="flex items-center justify-between mb-3">
                    <h4 className="font-medium text-sm group-hover:text-primary transition-colors duration-200">
                      {trend.metric}
                    </h4>
                    <div className={cn(
                      "flex items-center gap-1 px-2 py-1 rounded-full text-xs transition-all duration-200 hover:scale-105",
                      getTrendColor(trend.trend)
                    )}>
                      <div className="transform transition-transform duration-200 group-hover:scale-110">
                        {getTrendIcon(trend.trend)}
                      </div>
                      {Math.abs(trend.change)}%
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                    <span className="flex items-center gap-1">
                      <div className="w-1 h-1 bg-muted-foreground rounded-full"></div>
                      {trend.timeframe}
                    </span>
                    <span className="font-medium text-stat-text">
                      {trend.metric.includes('Price') ? `$${trend.value}` : 
                       trend.metric.includes('Index') || trend.metric.includes('Satisfaction') || 
                       trend.metric.includes('Demand') ? `${trend.value}%` : trend.value}
                    </span>
                  </div>
                  
                  <Progress 
                    value={trend.value} 
                    className="h-2.5 transition-all duration-300" 
                  />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="seasonal" className="mobile-section space-y-4">
              <div className="widget-card p-4 sm:p-5 transition-all duration-300 hover:shadow-lg">
                <h4 className="text-sm font-medium mb-4 flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-primary" />
                  <div className="w-2 h-2 bg-chart-primary rounded-full"></div>
                  Seasonal Demand Pattern
                </h4>
                <div className="space-y-3">
                  {seasonalData.map((month, index) => (
                    <div 
                      key={month.month} 
                      className={cn(
                        "flex items-center justify-between p-3 rounded-md transition-all duration-200 hover:bg-background/50 hover:scale-[1.02]",
                        index === getCurrentMonthIndex() ? "bg-primary/10 border border-primary/20 shadow-sm" : ""
                      )}
                    >
                      <span className="text-sm font-medium w-8">{month.month}</span>
                      <div className="flex-1 mx-4">
                        <Progress value={month.demand} className="h-2.5 transition-all duration-500" />
                      </div>
                      <div className="flex items-center gap-3 text-xs">
                        <span className="text-muted-foreground font-medium">${month.avgPrice}</span>
                        <div className={cn(
                          "w-2.5 h-2.5 rounded-full transition-all duration-200 hover:scale-110",
                          month.competition > 75 ? "bg-red-500" :
                          month.competition > 50 ? "bg-yellow-500" : "bg-green-500"
                        )} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-muted-foreground space-y-2 p-3 rounded-lg bg-background/30">
                <p className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Peak season: June-August (highest demand)
                </p>
                <p className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Best pricing: December-February
                </p>
                <p className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full"></div>
                  Competition level: 
                  <span className="inline-flex items-center gap-2 ml-1">
                    <div className="w-2 h-2 bg-red-500 rounded-full" /> High
                    <div className="w-2 h-2 bg-yellow-500 rounded-full" /> Medium
                    <div className="w-2 h-2 bg-green-500 rounded-full" /> Low
                  </span>
                </p>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="mobile-section space-y-3">
              <div className="widget-card p-4 sm:p-5 transition-all duration-300 hover:shadow-lg group">
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-4 w-4 text-yellow-600 transition-transform duration-200 group-hover:scale-110" />
                  <h4 className="text-sm font-medium group-hover:text-primary transition-colors duration-200">
                    Marketing Tips
                  </h4>
                </div>
                <ul className="text-xs text-muted-foreground space-y-3">
                  <li className="flex items-start gap-3 p-2 rounded-md hover:bg-background/50 transition-colors duration-200">
                    <Target className="h-3 w-3 mt-0.5 text-green-600 flex-shrink-0 transition-transform duration-200 hover:scale-110" />
                    Target homeowners aged 35-54 for highest conversion rates
                  </li>
                  <li className="flex items-start gap-3 p-2 rounded-md hover:bg-background/50 transition-colors duration-200">
                    <Clock className="h-3 w-3 mt-0.5 text-blue-600 flex-shrink-0 transition-transform duration-200 hover:scale-110" />
                    Schedule maintenance campaigns 2 months before peak seasons
                  </li>
                  <li className="flex items-start gap-3 p-2 rounded-md hover:bg-background/50 transition-colors duration-200">
                    <DollarSign className="h-3 w-3 mt-0.5 text-purple-600 flex-shrink-0 transition-transform duration-200 hover:scale-110" />
                    Offer winter discounts to capture off-season business
                  </li>
                </ul>
              </div>

              <div className="widget-card p-4 sm:p-5 transition-all duration-300 hover:shadow-lg group">
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="h-4 w-4 text-orange-600 transition-transform duration-200 group-hover:scale-110" />
                  <h4 className="text-sm font-medium group-hover:text-primary transition-colors duration-200">
                    Market Alerts
                  </h4>
                </div>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2 p-2 rounded-md hover:bg-background/50 transition-colors duration-200">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                    Service demand increased 12% this month
                  </li>
                  <li className="flex items-start gap-2 p-2 rounded-md hover:bg-background/50 transition-colors duration-200">
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></div>
                    Competition in area is 3% lower than average
                  </li>
                  <li className="flex items-start gap-2 p-2 rounded-md hover:bg-background/50 transition-colors duration-200">
                    <div className="w-1.5 h-1.5 bg-purple-500 rounded-full mt-2 flex-shrink-0"></div>
                    Price optimization opportunity: $50-80 above market rate
                  </li>
                </ul>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </ScrollableWidget>
  );
};

export default IndustryInsightsWidget;