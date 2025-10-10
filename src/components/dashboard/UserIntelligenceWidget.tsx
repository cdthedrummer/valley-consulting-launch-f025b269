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
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Your Marketing Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">Loading insights...</p>
        </CardContent>
      </Card>
    );
  }

  if (!profile) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Brain className="h-5 w-5" />
            Your Marketing Intelligence
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Start chatting to build your personalized intelligence profile!
          </p>
        </CardContent>
      </Card>
    );
  }

  const urgencyColor = {
    low: 'bg-blue-500/10 text-blue-500',
    medium: 'bg-yellow-500/10 text-yellow-500',
    high: 'bg-red-500/10 text-red-500',
  }[profile.urgency_level] || 'bg-gray-500/10 text-gray-500';

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Brain className="h-5 w-5" />
          Your Marketing Intelligence
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Key Stats */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-xs text-muted-foreground mb-1">Experience Level</p>
            <Badge variant="outline" className="capitalize">
              {profile.experience_level}
            </Badge>
          </div>
          <div>
            <p className="text-xs text-muted-foreground mb-1">Urgency</p>
            <Badge className={urgencyColor + ' capitalize'}>
              {profile.urgency_level}
            </Badge>
          </div>
        </div>

        {/* Top Pain Points */}
        {profile.primary_pain_points && profile.primary_pain_points.length > 0 && (
          <div>
            <div className="flex items-center gap-2 mb-2">
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Top Challenges</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.primary_pain_points.slice(0, 3).map((point, idx) => (
                <Badge key={idx} variant="secondary" className="text-xs">
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
              <Target className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Focus Areas</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {profile.service_focus.slice(0, 3).map((service, idx) => (
                <Badge key={idx} variant="outline" className="text-xs">
                  {service}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Insights Summary */}
        {profile.insights && (
          <div className="pt-4 border-t">
            <div className="flex items-center gap-2 mb-2">
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
              <p className="text-sm font-medium">Activity</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
              <div>
                <span className="font-semibold text-foreground">
                  {profile.conversation_count}
                </span>{' '}
                conversations
              </div>
              <div>
                <span className="font-semibold text-foreground">
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