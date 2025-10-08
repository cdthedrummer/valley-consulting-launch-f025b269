import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ScrollArea } from '@/components/ui/scroll-area';
import { 
  Lightbulb, 
  Mail, 
  Megaphone, 
  FileText, 
  Download,
  Loader2,
  CheckCircle,
  Send,
  MessageSquare
} from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface MarketingActionCenterProps {
  location?: string;
  locationType?: 'zipcode' | 'county' | null;
  industry?: string;
  className?: string;
  onChatWithPlan?: (plan: MarketingPlan) => void;
}

interface MarketingPlan {
  tasks: Array<{ task: string; priority: string; timeline: string }>;
  budgetAllocations: Array<{ channel: string; percentage: number; amount: number }>;
  keywords: string[];
  creatives: {
    email: string[];
    search: string[];
    nextdoor: string[];
    maps: string[];
  };
  timeline: string[];
  metrics: string[];
  callsToAction: string[];
}

const MarketingActionCenter: React.FC<MarketingActionCenterProps> = ({
  location,
  locationType,
  industry,
  className,
  onChatWithPlan,
}) => {
  const [isGenerating, setIsGenerating] = useState(false);
  const [plan, setPlan] = useState<MarketingPlan | null>(null);
  const [isSending, setIsSending] = useState(false);
  const [testEmail, setTestEmail] = useState('');
  const { toast } = useToast();

  const generatePlan = async () => {
    setIsGenerating(true);
    try {
      const { data, error } = await supabase.functions.invoke('marketing-plan', {
        body: {
          location,
          locationType,
          industry,
        },
      });

      if (error) throw error;
      
      setPlan(data.plan);
      toast({
        title: "Marketing plan generated!",
        description: "Your AI-powered marketing plan is ready.",
      });
    } catch (error: any) {
      console.error('Error generating plan:', error);
      toast({
        title: "Generation failed",
        description: error.message || "Failed to generate marketing plan. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const sendTestEmail = async () => {
    if (!testEmail || !plan) return;
    
    setIsSending(true);
    try {
      const { error } = await supabase.functions.invoke('send-outreach', {
        body: {
          recipients: [{ email: testEmail, name: 'Test User' }],
          template: plan.creatives.email[0] || 'Test email content',
          mode: 'test',
        },
      });

      if (error) throw error;

      toast({
        title: "Test email sent!",
        description: `Email sent to ${testEmail}`,
      });
    } catch (error: any) {
      console.error('Error sending email:', error);
      toast({
        title: "Send failed",
        description: error.message || "Failed to send email. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  };

  const exportCSV = () => {
    if (!plan) return;
    
    const csvContent = [
      ['Task', 'Priority', 'Timeline'],
      ...plan.tasks.map(t => [t.task, t.priority, t.timeline]),
    ].map(row => row.join(',')).join('\n');
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `marketing-plan-${location || 'general'}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Lightbulb className="h-5 w-5" />
          Marketing Action Center
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Button 
                onClick={generatePlan} 
                disabled={isGenerating}
                className="flex-1"
              >
                {isGenerating ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Generating Plan...
                  </>
                ) : (
                  <>
                    <Lightbulb className="mr-2 h-4 w-4" />
                    Generate Marketing Plan
                  </>
                )}
              </Button>
              {plan && (
                <Button 
                  variant="outline" 
                  size="icon"
                  onClick={exportCSV}
                  title="Export as CSV"
                >
                  <Download className="h-4 w-4" />
                </Button>
              )}
            </div>
            
            {plan && onChatWithPlan && (
              <Button 
                variant="secondary" 
                className="w-full"
                onClick={() => onChatWithPlan(plan)}
              >
                <MessageSquare className="mr-2 h-4 w-4" />
                Chat about this plan
              </Button>
            )}
          </div>

          {plan && (
            <Tabs defaultValue="plan" className="w-full">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="plan">Plan</TabsTrigger>
                <TabsTrigger value="email">Email</TabsTrigger>
                <TabsTrigger value="ads">Ads</TabsTrigger>
                <TabsTrigger value="assets">Assets</TabsTrigger>
              </TabsList>

              <TabsContent value="plan" className="space-y-4">
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Priority Tasks</h3>
                      <div className="space-y-2">
                        {plan.tasks.map((task, idx) => (
                          <div key={idx} className="p-3 bg-muted rounded-lg">
                            <div className="flex items-start gap-2">
                              <CheckCircle className="h-4 w-4 mt-1 text-primary" />
                              <div className="flex-1">
                                <p className="text-sm font-medium">{task.task}</p>
                                <p className="text-xs text-muted-foreground">
                                  {task.priority} priority • {task.timeline}
                                </p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Budget Allocation</h3>
                      <div className="space-y-2">
                        {plan.budgetAllocations.map((alloc, idx) => (
                          <div key={idx} className="flex justify-between items-center p-2 bg-muted rounded">
                            <span className="text-sm">{alloc.channel}</span>
                            <span className="text-sm font-medium">
                              {alloc.percentage}% (${alloc.amount})
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Target Keywords</h3>
                      <div className="flex flex-wrap gap-2">
                        {plan.keywords.map((keyword, idx) => (
                          <span key={idx} className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs">
                            {keyword}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="email" className="space-y-4">
                <ScrollArea className="h-[300px] w-full rounded-md border p-4">
                  {plan.creatives.email.map((content, idx) => (
                    <div key={idx} className="mb-4 p-3 bg-muted rounded-lg">
                      <p className="text-sm whitespace-pre-wrap">{content}</p>
                    </div>
                  ))}
                </ScrollArea>
                
                <div className="space-y-2">
                  <Label htmlFor="testEmail">Send Test Email</Label>
                  <div className="flex gap-2">
                    <Input
                      id="testEmail"
                      type="email"
                      placeholder="your@email.com"
                      value={testEmail}
                      onChange={(e) => setTestEmail(e.target.value)}
                    />
                    <Button 
                      onClick={sendTestEmail} 
                      disabled={isSending || !testEmail}
                      size="sm"
                    >
                      {isSending ? (
                        <Loader2 className="h-4 w-4 animate-spin" />
                      ) : (
                        <Send className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Test mode: emails only sent to the address above
                  </p>
                </div>
              </TabsContent>

              <TabsContent value="ads" className="space-y-4">
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-2">Google Search Ads</h3>
                      {plan.creatives.search.map((ad, idx) => (
                        <div key={idx} className="mb-3 p-3 bg-muted rounded-lg">
                          <p className="text-sm">{ad}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Nextdoor Ads</h3>
                      {plan.creatives.nextdoor.map((ad, idx) => (
                        <div key={idx} className="mb-3 p-3 bg-muted rounded-lg">
                          <p className="text-sm">{ad}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Google Maps / LSA</h3>
                      {plan.creatives.maps.map((ad, idx) => (
                        <div key={idx} className="mb-3 p-3 bg-muted rounded-lg">
                          <p className="text-sm">{ad}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>

              <TabsContent value="assets" className="space-y-4">
                <ScrollArea className="h-[400px] w-full rounded-md border p-4">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold mb-2">Call-to-Actions</h3>
                      {plan.callsToAction.map((cta, idx) => (
                        <div key={idx} className="mb-2 p-2 bg-primary/10 rounded">
                          <p className="text-sm">{cta}</p>
                        </div>
                      ))}
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Success Metrics</h3>
                      <ul className="list-disc list-inside space-y-1">
                        {plan.metrics.map((metric, idx) => (
                          <li key={idx} className="text-sm">{metric}</li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-2">Timeline</h3>
                      <div className="space-y-2">
                        {plan.timeline.map((item, idx) => (
                          <div key={idx} className="p-2 bg-muted rounded">
                            <p className="text-sm">{item}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </ScrollArea>
              </TabsContent>
            </Tabs>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default MarketingActionCenter;
