import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, Globe, CheckCircle2, Zap, TrendingUp } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { QuizResultsPreview } from '@/components/QuizResultsPreview';

interface WebsiteOnboardingProps {
  onComplete: (data: QuizData) => void;
  onSkip: () => void;
  isTeaser?: boolean;
}

interface QuizData {
  websiteUrl: string;
  phoneNumber: string;
  scrapedData: any;
  marketingChallenge?: string;
  urgencyLevel?: string;
}

type Step = 'url' | 'analyzing' | 'results' | 'questions' | 'phone';

interface AnalysisStep {
  label: string;
  icon: any;
  completed: boolean;
}

export const WebsiteOnboarding: React.FC<WebsiteOnboardingProps> = ({
  onComplete,
  onSkip,
  isTeaser = false,
}) => {
  const [step, setStep] = useState<Step>('url');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [scrapedData, setScrapedData] = useState<any>(null);
  const [answers, setAnswers] = useState({
    marketingChallenge: '',
    urgencyLevel: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [analysisSteps, setAnalysisSteps] = useState<AnalysisStep[]>([
    { label: 'Fetching website content', icon: Globe, completed: false },
    { label: 'Analyzing business information', icon: Zap, completed: false },
    { label: 'Calculating marketing score', icon: TrendingUp, completed: false },
    { label: 'Identifying opportunities', icon: CheckCircle2, completed: false },
  ]);
  const { toast } = useToast();

  const handleSubmitUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!websiteUrl.trim()) return;

    setIsLoading(true);
    setStep('analyzing');

    // Animate analysis steps
    for (let i = 0; i < analysisSteps.length; i++) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setAnalysisSteps(prev => prev.map((s, idx) => 
        idx === i ? { ...s, completed: true } : s
      ));
    }

    try {
      const { data, error } = await supabase.functions.invoke('scrape-business-website', {
        body: { websiteUrl },
      });

      if (error) throw error;

      if (!data.success) {
        throw new Error(data.error || 'Failed to analyze website');
      }

      setScrapedData(data.data);
      
      // Wait a moment to show completion
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setStep('results');
    } catch (error: any) {
      console.error('Error scraping website:', error);
      toast({
        title: 'Analysis Failed',
        description: error.message || 'Could not analyze website. Please try again.',
        variant: 'destructive',
      });
      setStep('url');
    } finally {
      setIsLoading(false);
    }
  };

  const handleContinueFromResults = () => {
    setStep('questions');
  };

  const handleAnswerSelect = (question: string, value: string) => {
    setAnswers(prev => ({ ...prev, [question]: value }));
  };

  const handleComplete = () => {
    if (!phoneNumber.trim()) {
      toast({
        title: 'Phone Required',
        description: 'Please enter your phone number to receive your report.',
        variant: 'destructive',
      });
      return;
    }

    const quizData: QuizData = {
      websiteUrl,
      phoneNumber,
      scrapedData,
      marketingChallenge: answers.marketingChallenge,
      urgencyLevel: answers.urgencyLevel,
    };

    onComplete(quizData);
  };

  return (
    <div className="max-w-3xl mx-auto p-4 max-h-[90vh] overflow-y-auto">
      <AnimatePresence mode="wait">
        {/* Step 1: URL Input */}
        {step === 'url' && (
          <motion.div
            key="url"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-archivo text-club-green mb-3">Get Your Free Marketing Analysis</h2>
              <p className="text-club-green/70 font-dm">
                Enter your website and we'll analyze your marketing in 30 seconds
              </p>
            </div>

            <form onSubmit={handleSubmitUrl} className="space-y-4">
              <div>
                <Label htmlFor="website">Your Website URL</Label>
                <Input
                  id="website"
                  type="text"
                  placeholder="www.yourcompany.com"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="text-lg"
                  required
                />
              </div>

              <Button type="submit" size="lg" className="w-full bg-action-yellow hover:bg-action-yellow/90 text-club-green font-dm font-bold" disabled={isLoading}>
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Analyzing...
                  </>
                ) : (
                  'Analyze My Website'
                )}
              </Button>
            </form>
          </motion.div>
        )}

        {/* Step 2: Analyzing - Animated Steps */}
        {step === 'analyzing' && (
          <motion.div
            key="analyzing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-archivo text-club-green mb-3">Analyzing Your Website...</h2>
              <p className="text-club-green/70 font-dm">
                Our AI is reviewing your business presence
              </p>
            </div>

            <Card className="p-8">
              <div className="space-y-6">
                {analysisSteps.map((step, index) => {
                  const Icon = step.icon;
                  return (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.2 }}
                      className="flex items-center gap-4"
                    >
                      <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                        step.completed ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                      }`}>
                        {step.completed ? (
                          <CheckCircle2 className="w-5 h-5" />
                        ) : (
                          <Icon className="w-5 h-5" />
                        )}
                      </div>
                      <div className="flex-1">
                        <p className={`font-medium ${step.completed ? 'text-foreground' : 'text-muted-foreground'}`}>
                          {step.label}
                        </p>
                      </div>
                      {!step.completed && (
                        <Loader2 className="w-5 h-5 animate-spin text-primary" />
                      )}
                    </motion.div>
                  );
                })}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Step 3: Results Preview */}
        {step === 'results' && scrapedData && (
          <motion.div
            key="results"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-archivo text-club-green mb-3">Your Marketing Score Is Ready!</h2>
              <p className="text-club-green/70 font-dm">
                Here's what we found about your business
              </p>
            </div>

            <QuizResultsPreview
              businessName={scrapedData.businessName}
              industry={scrapedData.industry}
              servicesOffered={scrapedData.servicesOffered || []}
              location={scrapedData.location}
              marketingScore={scrapedData.marketingScore}
              quickWins={scrapedData.quickWins || []}
              competitorCount={scrapedData.competitorCount || 3}
              onContinue={handleContinueFromResults}
            />
          </motion.div>
        )}

        {/* Step 4: Quick Questions */}
        {step === 'questions' && (
          <motion.div
            key="questions"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-center mb-8">
              <h2 className="text-3xl font-archivo text-club-green mb-3">Just Two Quick Questions</h2>
              <p className="text-club-green/70 font-dm">
                Help us personalize your marketing plan
              </p>
            </div>

            <div className="space-y-8">
              {/* Question 1: Marketing Challenge */}
              <Card className="p-6">
                <Label className="text-lg mb-4 block">What's your biggest marketing challenge?</Label>
                <div className="grid gap-3">
                  {[
                    { value: 'not_enough_leads', label: 'Not enough leads', desc: 'Need more customers' },
                    { value: 'competition', label: 'Too much competition', desc: 'Hard to stand out' },
                    { value: 'no_time', label: 'No time for marketing', desc: 'Too busy with jobs' },
                    { value: 'dont_know_what_works', label: "Don't know what works", desc: 'Unsure where to start' },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      variant={answers.marketingChallenge === option.value ? 'default' : 'outline'}
                      className="h-auto py-4 px-6 justify-start text-left"
                      onClick={() => handleAnswerSelect('marketingChallenge', option.value)}
                    >
                      <div>
                        <div className="font-semibold">{option.label}</div>
                        <div className="text-sm opacity-80">{option.desc}</div>
                      </div>
                    </Button>
                  ))}
                </div>
              </Card>

              {/* Question 2: Urgency */}
              <Card className="p-6">
                <Label className="text-lg mb-4 block">When do you want to see results?</Label>
                <div className="grid gap-3">
                  {[
                    { value: 'asap', label: 'ASAP - Need leads now', badge: 'Urgent' },
                    { value: '1-3_months', label: '1-3 months', badge: 'Soon' },
                    { value: 'planning', label: 'Just planning ahead', badge: 'Planning' },
                  ].map((option) => (
                    <Button
                      key={option.value}
                      type="button"
                      variant={answers.urgencyLevel === option.value ? 'default' : 'outline'}
                      className="h-auto py-4 px-6 justify-start"
                      onClick={() => handleAnswerSelect('urgencyLevel', option.value)}
                    >
                      <div className="flex items-center gap-3">
                        <span className="font-semibold flex-1 text-left">{option.label}</span>
                        <Badge variant="secondary">{option.badge}</Badge>
                      </div>
                    </Button>
                  ))}
                </div>
              </Card>

              <Button
                onClick={() => setStep('phone')}
                size="lg"
                className="w-full"
                disabled={!answers.marketingChallenge || !answers.urgencyLevel}
              >
                Continue
              </Button>
            </div>
          </motion.div>
        )}

        {/* Step 5: Phone Number */}
        {step === 'phone' && (
          <motion.div
            key="phone"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <div className="text-center mb-6">
              <h2 className="text-3xl font-archivo text-club-green mb-3">Get Your Full Report</h2>
              <p className="text-club-green/70 font-dm">
                Enter your phone number to unlock your complete analysis
              </p>
            </div>

            <Card className="p-6 border-action-yellow/30 bg-warm-cream">
              {/* Preview of what they'll get */}
              <div className="mb-6 p-4 bg-club-green/5 rounded-lg border border-club-green/20">
                <p className="font-dm font-semibold text-club-green mb-3">📊 Your Full Report Includes:</p>
                <div className="space-y-2 text-sm font-dm text-club-green/80">
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-action-yellow flex-shrink-0 mt-0.5" />
                    <span>Complete marketing score breakdown with improvement areas</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-action-yellow flex-shrink-0 mt-0.5" />
                    <span>Full competitor analysis ({scrapedData?.competitorCount || 3}+ local businesses)</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-action-yellow flex-shrink-0 mt-0.5" />
                    <span>All {scrapedData?.quickWins?.length || 5} quick wins to boost your score</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <CheckCircle2 className="w-4 h-4 text-action-yellow flex-shrink-0 mt-0.5" />
                    <span>Local market opportunity insights for {scrapedData?.location || 'your area'}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="phone" className="font-dm text-club-green">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className="text-lg mt-2"
                    required
                  />
                  <p className="text-xs text-club-green/60 font-dm mt-2">
                    📱 We'll text you a link to your personalized report
                  </p>
                </div>

                <Button 
                  onClick={handleComplete} 
                  size="lg" 
                  className="w-full bg-action-yellow hover:bg-action-yellow/90 text-club-green font-dm font-bold"
                >
                  Send My Free Report
                </Button>

                {isTeaser && (
                  <div className="text-center pt-4 border-t border-club-green/20">
                    <div className="inline-block bg-varsity-maroon/10 px-4 py-3 rounded-lg">
                      <p className="text-sm text-club-green/80 font-dm mb-2">
                        💎 Want AI to implement these strategies for you?
                      </p>
                      <p className="text-xl font-archivo text-club-green mb-1">
                        Unlock Full AI Dashboard
                      </p>
                      <p className="text-lg font-bold text-action-yellow mb-2">
                        $15/month
                      </p>
                      <p className="text-xs text-club-green/70 font-dm">
                        Live market intelligence • Auto-competitor tracking • AI campaign builder
                      </p>
                    </div>
                  </div>
                )}
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
