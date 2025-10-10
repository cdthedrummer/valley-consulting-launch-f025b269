import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { MessageSquare, TrendingUp, MapPin, DollarSign, Users, AlertCircle } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { motion, AnimatePresence } from 'framer-motion';

interface ChatSignal {
  id: string;
  signal_type: string;
  signal_value: any;
  confidence_score: number;
  created_at: string;
}

export const ChatInsightsWidget: React.FC<{ className?: string }> = ({ className }) => {
  const [signals, setSignals] = useState<ChatSignal[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSignals();
    
    // Subscribe to new signals
    const channel = supabase
      .channel('chat-signals-changes')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_signals'
        },
        () => {
          loadSignals();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const loadSignals = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) return;

      const { data, error } = await supabase
        .from('chat_signals')
        .select('*')
        .eq('user_id', user.id)
        .order('created_at', { ascending: false })
        .limit(10);

      if (error) throw error;
      setSignals(data || []);
    } catch (error) {
      console.error('Error loading chat signals:', error);
    } finally {
      setLoading(false);
    }
  };

  const getSignalIcon = (type: string) => {
    switch (type) {
      case 'pain_point':
        return <AlertCircle className="h-4 w-4 text-red-500" />;
      case 'service_interest':
        return <TrendingUp className="h-4 w-4 text-blue-500" />;
      case 'location_mention':
        return <MapPin className="h-4 w-4 text-green-500" />;
      case 'budget_indicator':
        return <DollarSign className="h-4 w-4 text-yellow-500" />;
      case 'target_audience':
        return <Users className="h-4 w-4 text-purple-500" />;
      default:
        return <MessageSquare className="h-4 w-4 text-muted-foreground" />;
    }
  };

  const getSignalLabel = (type: string) => {
    return type.split('_').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ');
  };

  const formatSignalValue = (signal: ChatSignal) => {
    if (typeof signal.signal_value === 'string') {
      return signal.signal_value;
    }
    if (signal.signal_value?.value) {
      return signal.signal_value.value;
    }
    return JSON.stringify(signal.signal_value);
  };

  if (loading) {
    return (
      <Card className={className}>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Chat Insights
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="animate-pulse">
                <div className="h-4 bg-muted rounded w-3/4 mb-2" />
                <div className="h-3 bg-muted rounded w-1/2" />
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5" />
          Chat Insights
          <Badge variant="secondary" className="ml-auto">
            {signals.length} signals
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        {signals.length === 0 ? (
          <div className="text-center py-8 text-muted-foreground">
            <MessageSquare className="h-12 w-12 mx-auto mb-3 opacity-20" />
            <p className="text-sm">Start chatting to see AI-extracted insights</p>
          </div>
        ) : (
          <ScrollArea className="h-[300px] pr-4">
            <AnimatePresence initial={false}>
              <div className="space-y-3">
                {signals.map((signal, index) => (
                  <motion.div
                    key={signal.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    className="p-3 rounded-lg border bg-card hover:bg-accent/5 transition-colors"
                  >
                    <div className="flex items-start gap-3">
                      <div className="mt-0.5">
                        {getSignalIcon(signal.signal_type)}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium text-muted-foreground">
                            {getSignalLabel(signal.signal_type)}
                          </span>
                          <Badge variant="outline" className="text-xs">
                            {Math.round(signal.confidence_score * 100)}% confidence
                          </Badge>
                        </div>
                        <p className="text-sm line-clamp-2">
                          {formatSignalValue(signal)}
                        </p>
                        <p className="text-xs text-muted-foreground mt-1">
                          {new Date(signal.created_at).toLocaleDateString()} at{' '}
                          {new Date(signal.created_at).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                          })}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
};
