import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { TrendingUp, Star, Award } from 'lucide-react';
import { motion } from 'framer-motion';
import ScrollableWidget from '@/components/ScrollableWidget';

interface BusinessScoreWidgetProps {
  score: number;
  industry: string;
  percentile: number;
  lastUpdated?: string;
}

export const BusinessScoreWidget: React.FC<BusinessScoreWidgetProps> = ({
  score,
  industry,
  percentile,
  lastUpdated
}) => {
  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-500';
    if (score >= 60) return 'text-yellow-500';
    return 'text-red-500';
  };

  const getScoreLabel = (score: number) => {
    if (score >= 80) return 'Excellent';
    if (score >= 60) return 'Good';
    if (score >= 40) return 'Fair';
    return 'Needs Work';
  };

  const starRating = Math.round((score / 100) * 5 * 10) / 10;
  const fullStars = Math.floor(starRating);
  const hasHalfStar = starRating % 1 >= 0.5;

  return (
    <ScrollableWidget>
      <Card className="p-6 h-full bg-gradient-to-br from-background to-accent/5">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold mb-1">Marketing Score</h3>
            <p className="text-sm text-muted-foreground">Your overall marketing effectiveness</p>
          </div>
          <Badge variant="secondary" className="gap-1">
            <Award className="w-3 h-3" />
            {industry}
          </Badge>
        </div>

        <div className="text-center space-y-4">
          {/* Score Display */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="relative inline-flex items-center justify-center"
          >
            <div className={`text-6xl font-bold ${getScoreColor(score)}`}>
              {score}
            </div>
            <div className="absolute -bottom-6 text-sm font-medium text-muted-foreground">
              / 100
            </div>
          </motion.div>

          {/* Stars */}
          <div className="flex justify-center items-center gap-1 pt-4">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-5 h-5 ${
                  i < fullStars
                    ? 'fill-yellow-400 text-yellow-400'
                    : i === fullStars && hasHalfStar
                    ? 'fill-yellow-400 text-yellow-400 opacity-50'
                    : 'text-muted'
                }`}
              />
            ))}
            <span className="ml-2 text-sm font-medium">{starRating}</span>
          </div>

          {/* Score Label */}
          <Badge variant={score >= 60 ? 'default' : 'secondary'} className="text-base px-4 py-1">
            {getScoreLabel(score)}
          </Badge>

          {/* Percentile */}
          <div className="pt-4 border-t">
            <div className="flex items-center justify-center gap-2 text-sm">
              <TrendingUp className="w-4 h-4 text-primary" />
              <span className="text-muted-foreground">
                Better than <span className="font-semibold text-foreground">{percentile}%</span> of {industry} businesses
              </span>
            </div>
          </div>

          {lastUpdated && (
            <p className="text-xs text-muted-foreground pt-2">
              Last updated: {new Date(lastUpdated).toLocaleDateString()}
            </p>
          )}
        </div>
      </Card>
    </ScrollableWidget>
  );
};
