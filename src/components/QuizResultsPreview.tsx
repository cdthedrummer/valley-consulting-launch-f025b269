import React from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Lock, Star, TrendingUp, Users, MapPin, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface QuizResultsPreviewProps {
  businessName: string | null;
  industry: string;
  servicesOffered: string[];
  location: string | null;
  marketingScore: number;
  quickWins: string[];
  competitorCount: number;
  onContinue: () => void;
}

export const QuizResultsPreview: React.FC<QuizResultsPreviewProps> = ({
  businessName,
  industry,
  servicesOffered,
  location,
  marketingScore,
  quickWins,
  competitorCount,
  onContinue,
}) => {
  // Calculate percentile based on score
  const percentile = Math.min(95, Math.max(5, Math.floor(marketingScore * 0.9)));
  
  // Star rating (out of 5)
  const starRating = Math.round((marketingScore / 100) * 5 * 10) / 10;
  const fullStars = Math.floor(starRating);
  const hasHalfStar = starRating % 1 >= 0.5;

  return (
    <div className="space-y-6">
      {/* Marketing Score - Large Display */}
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`w-6 h-6 ${
                i < fullStars
                  ? 'fill-yellow-400 text-yellow-400'
                  : i === fullStars && hasHalfStar
                  ? 'fill-yellow-400 text-yellow-400 opacity-50'
                  : 'text-muted'
              }`}
            />
          ))}
        </div>
        <h2 className="text-5xl font-bold text-primary mb-2">{marketingScore}/100</h2>
        <p className="text-lg text-muted-foreground">Your Marketing Score</p>
        <p className="text-sm text-muted-foreground mt-1">
          <TrendingUp className="inline w-4 h-4 mr-1" />
          Better than <span className="font-semibold text-foreground">{percentile}%</span> of contractors
        </p>
      </motion.div>

      {/* What We Found - Grid */}
      <div className="grid grid-cols-2 gap-4">
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <Briefcase className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Business</p>
              <p className="font-semibold">{businessName || 'Not found'}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <Users className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Industry</p>
              <p className="font-semibold">{industry}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Location</p>
              <p className="font-semibold">{location || 'Not specified'}</p>
            </div>
          </div>
        </Card>
        
        <Card className="p-4">
          <div className="flex items-start gap-3">
            <Briefcase className="w-5 h-5 text-primary mt-0.5" />
            <div>
              <p className="text-sm text-muted-foreground">Services</p>
              <p className="font-semibold">{servicesOffered.length} detected</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Wins - First visible, rest blurred */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Quick Wins to Boost Your Score</h3>
        <div className="space-y-3">
          {quickWins.slice(0, 1).map((win, i) => (
            <motion.div
              key={i}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg"
            >
              <Badge variant="secondary" className="mt-0.5">1</Badge>
              <p className="text-sm flex-1">{win}</p>
            </motion.div>
          ))}
          
          {/* Blurred remaining items */}
          <div className="relative">
            <div className="blur-sm pointer-events-none opacity-60 space-y-3">
              {quickWins.slice(1, 4).map((win, i) => (
                <div key={i} className="flex items-start gap-3 p-3 bg-accent/50 rounded-lg">
                  <Badge variant="secondary" className="mt-0.5">{i + 2}</Badge>
                  <p className="text-sm flex-1">{win}</p>
                </div>
              ))}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-background/90 backdrop-blur-sm px-6 py-3 rounded-lg border-2 border-primary shadow-lg">
                <Lock className="w-5 h-5 text-primary mx-auto mb-1" />
                <p className="text-sm font-semibold">Unlock Full Report</p>
              </div>
            </div>
          </div>
        </div>
      </Card>

      {/* Competitor Cards - Blurred */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Local Competitors Analyzed</h3>
        <div className="relative">
          <div className="blur-md pointer-events-none opacity-60 grid grid-cols-2 gap-3">
            {[...Array(competitorCount)].map((_, i) => (
              <div key={i} className="p-4 border rounded-lg">
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-1/2"></div>
              </div>
            ))}
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/90 backdrop-blur-sm px-8 py-4 rounded-lg border-2 border-primary shadow-lg text-center">
              <Lock className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold mb-1">See {competitorCount} Competitors</p>
              <p className="text-xs text-muted-foreground">Their prices, services & gaps</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Market Opportunity - Blurred */}
      <Card className="p-6">
        <div className="relative">
          <div className="blur-md pointer-events-none opacity-60">
            <h3 className="text-lg font-semibold mb-2">Local Market Opportunity</h3>
            <p className="text-3xl font-bold">$847,200</p>
            <p className="text-sm text-muted-foreground">Estimated untapped annual revenue</p>
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="bg-background/90 backdrop-blur-sm px-8 py-4 rounded-lg border-2 border-primary shadow-lg">
              <Lock className="w-6 h-6 text-primary mx-auto mb-2" />
              <p className="text-sm font-semibold">Unlock Market Data</p>
            </div>
          </div>
        </div>
      </Card>

      {/* CTA */}
      <div className="text-center pt-4">
        <Button onClick={onContinue} size="lg" className="w-full sm:w-auto">
          Get Your Full Marketing Report
        </Button>
        <p className="text-xs text-muted-foreground mt-3">
          Includes: Competitor analysis • Market data • Personalized action plan
        </p>
      </div>
    </div>
  );
};
