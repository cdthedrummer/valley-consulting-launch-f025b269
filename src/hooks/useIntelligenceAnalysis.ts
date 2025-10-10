import { useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

export const useIntelligenceAnalysis = () => {
  const { toast } = useToast();

  useEffect(() => {
    let mounted = true;

    const analyzeUserPatterns = async () => {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user || !mounted) return;

        // Trigger pattern analysis in background
        const { error } = await supabase.functions.invoke('analyze-user-patterns', {
          body: { userId: user.id }
        });

        if (error) {
          console.error('Pattern analysis error:', error);
        }
      } catch (error) {
        console.error('Failed to analyze patterns:', error);
      }
    };

    // Run analysis on mount
    analyzeUserPatterns();

    // Set up periodic analysis (every 5 minutes)
    const interval = setInterval(analyzeUserPatterns, 5 * 60 * 1000);

    // Subscribe to new chat messages to trigger analysis
    const channel = supabase
      .channel('intelligence-trigger')
      .on(
        'postgres_changes',
        {
          event: 'INSERT',
          schema: 'public',
          table: 'chat_messages'
        },
        () => {
          // Debounce analysis - wait 10 seconds after new message
          setTimeout(analyzeUserPatterns, 10000);
        }
      )
      .subscribe();

    return () => {
      mounted = false;
      clearInterval(interval);
      supabase.removeChannel(channel);
    };
  }, []);
};
