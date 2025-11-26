import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, TrendingUp, TrendingDown, Minus } from 'lucide-react';
import ScrollableWidget from '@/components/ScrollableWidget';

interface Competitor {
  name: string;
  url?: string;
  servicesOffered: string[];
  strengths: string[];
  weaknesses: string[];
  pricingHints?: string;
}

interface CompetitorSpotlightWidgetProps {
  competitors: Competitor[];
  maxDisplay?: number;
  onViewAll?: () => void;
}

export const CompetitorSpotlightWidget: React.FC<CompetitorSpotlightWidgetProps> = ({
  competitors,
  maxDisplay = 3,
  onViewAll
}) => {
  const displayedCompetitors = competitors.slice(0, maxDisplay);

  const getComparisonIcon = (type: 'strength' | 'weakness' | 'neutral') => {
    switch (type) {
      case 'strength':
        return <TrendingUp className="w-4 h-4 text-green-500" />;
      case 'weakness':
        return <TrendingDown className="w-4 h-4 text-red-500" />;
      default:
        return <Minus className="w-4 h-4 text-muted-foreground" />;
    }
  };

  if (competitors.length === 0) {
    return (
      <ScrollableWidget>
        <Card className="p-6 h-full">
          <h3 className="text-lg font-semibold mb-4">Competitor Analysis</h3>
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <p className="text-muted-foreground">No competitor data available yet.</p>
            <p className="text-sm text-muted-foreground mt-2">
              Complete your business profile to see competitor insights.
            </p>
          </div>
        </Card>
      </ScrollableWidget>
    );
  }

  return (
    <ScrollableWidget>
      <Card className="p-6 h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">Competitor Spotlight</h3>
            <p className="text-sm text-muted-foreground">
              {competitors.length} competitor{competitors.length !== 1 ? 's' : ''} analyzed
            </p>
          </div>
          {onViewAll && competitors.length > maxDisplay && (
            <Button variant="ghost" size="sm" onClick={onViewAll}>
              View All
            </Button>
          )}
        </div>

        <div className="space-y-4">
          {displayedCompetitors.map((competitor, index) => (
            <Card key={index} className="p-4 bg-accent/5 border-border/50">
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1">
                  <h4 className="font-semibold text-base">{competitor.name}</h4>
                  {competitor.url && (
                    <a
                      href={competitor.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-xs text-primary hover:underline flex items-center gap-1 mt-1"
                    >
                      Visit site
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
                <Badge variant="outline" className="text-xs">
                  {competitor.servicesOffered.length} services
                </Badge>
              </div>

              {/* Strengths & Weaknesses */}
              <div className="space-y-2 mb-3">
                {competitor.strengths.slice(0, 2).map((strength, i) => (
                  <div key={`strength-${i}`} className="flex items-start gap-2 text-sm">
                    {getComparisonIcon('strength')}
                    <span className="text-muted-foreground">{strength}</span>
                  </div>
                ))}
                {competitor.weaknesses.slice(0, 1).map((weakness, i) => (
                  <div key={`weakness-${i}`} className="flex items-start gap-2 text-sm">
                    {getComparisonIcon('weakness')}
                    <span className="text-muted-foreground">{weakness}</span>
                  </div>
                ))}
              </div>

              {/* Services */}
              {competitor.servicesOffered.length > 0 && (
                <div className="flex flex-wrap gap-1 mt-2">
                  {competitor.servicesOffered.slice(0, 3).map((service, i) => (
                    <Badge key={i} variant="secondary" className="text-xs">
                      {service}
                    </Badge>
                  ))}
                  {competitor.servicesOffered.length > 3 && (
                    <Badge variant="secondary" className="text-xs">
                      +{competitor.servicesOffered.length - 3} more
                    </Badge>
                  )}
                </div>
              )}

              {/* Pricing Hint */}
              {competitor.pricingHints && (
                <p className="text-xs text-muted-foreground mt-2 italic">
                  💰 {competitor.pricingHints}
                </p>
              )}
            </Card>
          ))}
        </div>
      </Card>
    </ScrollableWidget>
  );
};
