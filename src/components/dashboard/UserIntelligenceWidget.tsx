import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Brain, TrendingUp, Target, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

interface IntelligenceProfile {
  primary_pain_points: string[];
  service_focus: string[];
  target_locations: string[];
  urgency_level: string;
  experience_level: string;
  conversation_count: number;
  insights: {
    total_signals: number;
    most_discussed_topics: string[];
    recent_focus: string[];
  };
  recommendations: {
    focus_areas: string[];
  };
}

interface UserIntelligenceWidgetProps {
  className?: string;
}

export const UserIntelligenceWidget: React.FC<UserIntelligenceWidgetProps> = ({ className }) => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<IntelligenceProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchIntelligence = async () => {
      if (!user) return;

      try {
        const { data, error } = await supabase
          .from('user_intelligence_profile')
          .select('*')
          .eq('user_id', user.id)
          .single();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching intelligence:', error);
        } else if (data) {
          setProfile(data as any);
        }
      } catch (err) {
        console.error('Failed to fetch intelligence:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchIntelligence();
  }, [user]);

  if (loading) {
    return (
      <Card className={`${className} border-2 border-action-yellow/30 bg-warm-cream shadow-lg`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-archivo uppercase tracking-wide text-club-green">
            <Brain className="h-5 w-5 text-action-yellow" />
            Your Marketing Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-dm text-sm text-club-green/70">Loading insights...</p>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className={`${className} border-2 border-action-yellow/30 bg-warm-cream shadow-lg`}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2 font-archivo uppercase tracking-wide text-club-green">
            <Brain className="h-5 w-5 text-action-yellow" />
            Your Marketing Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="font-dm text-sm text-club-green/70">
            Start chatting to build your personalized intelligence profile!
          </p>
        </CardContent>
      </Card>
    );
  }

  const urgencyColor = {
    low: 'bg-club-green/10 text-club-green',
    medium: 'bg-action-yellow/20 text-club-green',
    high: 'bg-varsity-maroon/20 text-club-green',
  }[profile.urgency_level] || 'bg-club-green/10 text-club-green';

  return (
    <Card className={`${className} border-2 border-action-yellow/30 bg-warm-cream shadow-lg`}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2 font-archivo uppercase tracking-wide text-club-green">
          <Brain className="h-5 w-5 text-action-yellow" />
          Your Marketing Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="font-dm text-xs text-club-green/60 mb-1 uppercase tracking-wider">Experience Level</p>
            <Badge variant="outline" className="capitalize border-club-green/30 text-club-green font-dm">
              {profile.experience_level}
            </Badge>
          </div>
          <div>
            <p className="font-dm text-xs text-club-green/60 mb-1 uppercase tracking-wider">Urgency</p>
            <Badge className={urgencyColor + ' capitalize font-dm'}>
              {profile.urgency_level}
            </Badge>
          </div>
        </div>

        {/* Top Pain Points */}
        {profile.primary_pain_points && profile.primary_pain_points.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-action-yellow" />
              <p className="font-dm text-sm font-semibold text-club-green">Top Challenges</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.primary_pain_points.slice(0, 3).map((point, idx) => (
                <Badge key={idx} className="text-xs bg-club-green/10 text-club-green border border-club-green/20 font-dm">
                  {point}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Service Focus */}
        {profile.service_focus && profile.service_focus.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-action-yellow" />
              <p className="font-dm text-sm font-semibold text-club-green">Focus Areas</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.service_focus.slice(0, 3).map((service, idx) => (
                <Badge key={idx} variant="outline" className="text-xs border-club-green/30 text-club-green font-dm">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Insights Summary */}
        {profile.insights && (
          <div className="pt-4 border-t border-club-green/10">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-action-yellow" />
              <p className="font-dm text-sm font-semibold text-club-green">Activity</p>
            </div>
            <div className="grid grid-cols-2 gap-2 font-dm text-xs text-club-green/70">
              <div>
                <span className="font-semibold text-club-green">
                  {profile.conversation_count}
                </span>{' '}
                conversations
              </div>
              <div>
                <span className="font-semibold text-club-green">
                  {profile.insights.total_signals || 0}
                </span>{' '}
                insights captured
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};