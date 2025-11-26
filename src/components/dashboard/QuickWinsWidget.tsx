import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { CheckCircle2, Circle, Zap } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import ScrollableWidget from '@/components/ScrollableWidget';

interface QuickWin {
  id: string;
  title: string;
  description?: string;
  impact: 'high' | 'medium' | 'low';
  completed?: boolean;
}

interface QuickWinsWidgetProps {
  quickWins: string[] | QuickWin[];
  onToggleComplete?: (id: string) => void;
}

export const QuickWinsWidget: React.FC<QuickWinsWidgetProps> = ({
  quickWins,
  onToggleComplete
}) => {
  const [completedItems, setCompletedItems] = useState<Set<string>>(new Set());

  // Normalize quick wins to full objects
  const normalizedWins: QuickWin[] = quickWins.map((win, index) => {
    if (typeof win === 'string') {
      return {
        id: `win-${index}`,
        title: win,
        impact: 'medium' as const,
        completed: false
      };
    }
    return win;
  });

  const handleToggle = (id: string) => {
    const newCompleted = new Set(completedItems);
    if (newCompleted.has(id)) {
      newCompleted.delete(id);
    } else {
      newCompleted.add(id);
    }
    setCompletedItems(newCompleted);
    onToggleComplete?.(id);
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'high':
        return 'bg-green-500/10 text-green-500 border-green-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20';
      case 'low':
        return 'bg-blue-500/10 text-blue-500 border-blue-500/20';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const activeWins = normalizedWins.filter(win => !completedItems.has(win.id));
  const completedWins = normalizedWins.filter(win => completedItems.has(win.id));

  return (
    <ScrollableWidget>
      <Card className="p-6 h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Zap className="w-5 h-5 text-primary" />
              <h3 className="text-lg font-semibold">Quick Wins</h3>
            </div>
            <p className="text-sm text-muted-foreground">
              {activeWins.length} action{activeWins.length !== 1 ? 's' : ''} to boost your score
            </p>
          </div>
          {completedWins.length > 0 && (
            <Badge variant="secondary" className="gap-1">
              <CheckCircle2 className="w-3 h-3" />
              {completedWins.length} done
            </Badge>
          )}
        </div>

        <div className="space-y-3">
          <AnimatePresence mode="popLayout">
            {activeWins.map((win, index) => (
              <motion.div
                key={win.id}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.2 }}
              >
                <Card
                  className="p-4 cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => handleToggle(win.id)}
                >
                  <div className="flex items-start gap-3">
                    <button className="mt-1">
                      {completedItems.has(win.id) ? (
                        <CheckCircle2 className="w-5 h-5 text-primary" />
                      ) : (
                        <Circle className="w-5 h-5 text-muted-foreground" />
                      )}
                    </button>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-2 mb-1">
                        <p className={`font-medium ${completedItems.has(win.id) ? 'line-through text-muted-foreground' : ''}`}>
                          {win.title}
                        </p>
                        <Badge variant="outline" className={`text-xs ${getImpactColor(win.impact)}`}>
                          {win.impact}
                        </Badge>
                      </div>
                      {win.description && (
                        <p className="text-sm text-muted-foreground">{win.description}</p>
                      )}
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>

          {/* Completed Items */}
          {completedWins.length > 0 && (
            <div className="pt-4 border-t">
              <p className="text-xs font-medium text-muted-foreground mb-2">Completed</p>
              {completedWins.map((win) => (
                <div
                  key={win.id}
                  className="flex items-center gap-2 text-sm text-muted-foreground py-2 cursor-pointer hover:text-foreground"
                  onClick={() => handleToggle(win.id)}
                >
                  <CheckCircle2 className="w-4 h-4 text-green-500" />
                  <span className="line-through">{win.title}</span>
                </div>
              ))}
            </div>
          )}

          {activeWins.length === 0 && completedWins.length === 0 && (
            <div className="text-center py-8">
              <p className="text-muted-foreground">No quick wins available yet.</p>
              <p className="text-sm text-muted-foreground mt-1">
                Complete your business analysis to see personalized recommendations.
              </p>
            </div>
          )}
        </div>
      </Card>
    </ScrollableWidget>
  );
};
