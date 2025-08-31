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
      <Card className={cn("border-0 bg-gradient-to-br from-purple-500/5 to-pink-500/5 overflow-hidden", className)}>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Wrench className="h-5 w-5 text-purple-600" />
              {industry} Insights
            </div>
            <Badge variant="outline" className="text-xs">
              {location}
            </Badge>
          </CardTitle>
        </CardHeader>
        
        <CardContent className="p-0">
          <Tabs defaultValue="trends" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mx-4 mb-4">
              <TabsTrigger value="trends">Trends</TabsTrigger>
              <TabsTrigger value="seasonal">Seasonal</TabsTrigger>
              <TabsTrigger value="insights">Tips</TabsTrigger>
            </TabsList>

            <TabsContent value="trends" className="px-4 pb-4 space-y-3">
              {trends.map((trend, index) => (
                <div key={index} className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-medium text-sm">{trend.metric}</h4>
                    <div className={cn(
                      "flex items-center gap-1 px-2 py-1 rounded-full text-xs",
                      getTrendColor(trend.trend)
                    )}>
                      {getTrendIcon(trend.trend)}
                      {Math.abs(trend.change)}%
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-2">
                    <span>{trend.timeframe}</span>
                    <span className="font-medium">
                      {trend.metric.includes('Price') ? `$${trend.value}` : 
                       trend.metric.includes('Index') || trend.metric.includes('Satisfaction') || 
                       trend.metric.includes('Demand') ? `${trend.value}%` : trend.value}
                    </span>
                  </div>
                  
                  <Progress 
                    value={trend.value} 
                    className="h-2" 
                  />
                </div>
              ))}
            </TabsContent>

            <TabsContent value="seasonal" className="px-4 pb-4 space-y-4">
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  Seasonal Demand Pattern
                </h4>
                <div className="space-y-2">
                  {seasonalData.map((month, index) => (
                    <div 
                      key={month.month} 
                      className={cn(
                        "flex items-center justify-between p-2 rounded-md",
                        index === getCurrentMonthIndex() ? "bg-primary/10 border border-primary/20" : ""
                      )}
                    >
                      <span className="text-sm font-medium w-8">{month.month}</span>
                      <div className="flex-1 mx-3">
                        <Progress value={month.demand} className="h-2" />
                      </div>
                      <div className="flex items-center gap-2 text-xs">
                        <span className="text-muted-foreground">${month.avgPrice}</span>
                        <div className={cn(
                          "w-2 h-2 rounded-full",
                          month.competition > 75 ? "bg-red-500" :
                          month.competition > 50 ? "bg-yellow-500" : "bg-green-500"
                        )} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="text-xs text-muted-foreground space-y-1">
                <p>• Peak season: June-August (highest demand)</p>
                <p>• Best pricing: December-February</p>
                <p>• Competition level: <span className="inline-flex items-center gap-1">
                  <div className="w-2 h-2 bg-red-500 rounded-full" /> High
                  <div className="w-2 h-2 bg-yellow-500 rounded-full" /> Medium
                  <div className="w-2 h-2 bg-green-500 rounded-full" /> Low
                </span></p>
              </div>
            </TabsContent>

            <TabsContent value="insights" className="px-4 pb-4 space-y-3">
              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                <div className="flex items-center gap-2 mb-3">
                  <Lightbulb className="h-4 w-4 text-yellow-600" />
                  <h4 className="text-sm font-medium">Marketing Tips</h4>
                </div>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li className="flex items-start gap-2">
                    <Target className="h-3 w-3 mt-0.5 text-green-600 flex-shrink-0" />
                    Target homeowners aged 35-54 for highest conversion rates
                  </li>
                  <li className="flex items-start gap-2">
                    <Clock className="h-3 w-3 mt-0.5 text-blue-600 flex-shrink-0" />
                    Schedule maintenance campaigns 2 months before peak seasons
                  </li>
                  <li className="flex items-start gap-2">
                    <DollarSign className="h-3 w-3 mt-0.5 text-purple-600 flex-shrink-0" />
                    Offer winter discounts to capture off-season business
                  </li>
                </ul>
              </div>

              <div className="bg-background/50 backdrop-blur-sm rounded-lg p-4 border">
                <div className="flex items-center gap-2 mb-3">
                  <AlertCircle className="h-4 w-4 text-orange-600" />
                  <h4 className="text-sm font-medium">Market Alerts</h4>
                </div>
                <ul className="text-xs text-muted-foreground space-y-2">
                  <li>• Service demand increased 12% this month</li>
                  <li>• Competition in area is 3% lower than average</li>
                  <li>• Price optimization opportunity: $50-80 above market rate</li>
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