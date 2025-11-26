import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Loader2, Globe, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WebsiteOnboardingProps {
  onComplete: (quizData: QuizData) => void;
  onSkip?: () => void;
  isTeaser?: boolean;
}

interface QuizData {
  websiteUrl: string;
  businessName: string | null;
  industry: string;
  location: string | null;
  phoneNumber: string | null;
  servicesOffered: string[];
  serviceGaps: string[];
  competitorUrls: string[];
  marketingChallenge?: string;
  urgencyLevel?: string;
  primaryServices?: string[];
}

export const WebsiteOnboarding: React.FC<WebsiteOnboardingProps> = ({ 
  onComplete, 
  onSkip,
  isTeaser = false 
}) => {
  const [step, setStep] = useState<'url' | 'analyzing' | 'questions' | 'phone'>('url');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [scrapedData, setScrapedData] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const { toast } = useToast();

  const handleSubmitUrl = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!websiteUrl.trim()) {
      toast({
        title: "Website URL required",
        description: "Please enter your website URL",
        variant: "destructive",
      });
      return;
    }

    setStep('analyzing');

    try {
      const { data, error } = await supabase.functions.invoke('scrape-business-website', {
        body: { websiteUrl }
      });

      if (error) throw error;

      if (data?.success) {
        setScrapedData(data.data);
        setStep('questions');
        
        toast({
          title: "Website analyzed!",
          description: `We found ${data.data.businessName || 'your business'} in ${data.data.industry || 'home services'}`,
        });
      } else {
        throw new Error('Failed to analyze website');
      }
    } catch (error: any) {
      console.error('Website scrape error:', error);
      toast({
        title: "Analysis failed",
        description: error.message || "We couldn't analyze your website. Please try again or skip this step.",
        variant: "destructive",
      });
      setStep('url');
    }
  };

  const handleAnswerSelect = (question: string, answer: string | string[]) => {
    setAnswers(prev => ({ ...prev, [question]: answer }));
  };

  const handleContinueToPhone = () => {
    setStep('phone');
  };

  const handleComplete = () => {
    if (!phoneNumber.trim()) {
      toast({
        title: "Phone number required",
        description: "Please enter your phone number to continue",
        variant: "destructive",
      });
      return;
    }

    const quizData: QuizData = {
      websiteUrl,
      businessName: scrapedData?.businessName || null,
      industry: answers.industry || scrapedData?.industry || 'Other',
      location: answers.location || scrapedData?.location || null,
      phoneNumber,
      servicesOffered: answers.services || scrapedData?.servicesOffered || [],
      serviceGaps: scrapedData?.serviceGaps || [],
      competitorUrls: scrapedData?.competitorUrls || [],
      marketingChallenge: answers.challenge,
      urgencyLevel: answers.urgency,
      primaryServices: answers.services
    };

    onComplete(quizData);
  };

  if (step === 'url') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <Globe className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-archivo text-2xl">
              {isTeaser ? "Get Your Free Business Analysis" : "Let's Start With Your Website"}
            </CardTitle>
          </div>
          <p className="text-muted-foreground font-dm">
            Enter your website URL and we'll analyze your business in seconds
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmitUrl} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="website-url">Website URL</Label>
              <Input
                id="website-url"
                type="url"
                placeholder="https://yourcompany.com"
                value={websiteUrl}
                onChange={(e) => setWebsiteUrl(e.target.value)}
                className="text-lg"
                autoFocus
              />
            </div>
            <div className="flex gap-3">
              <Button type="submit" size="lg" className="flex-1">
                Analyze My Website
              </Button>
              {onSkip && !isTeaser && (
                <Button type="button" variant="ghost" onClick={onSkip}>
                  Skip
                </Button>
              )}
            </div>
          </form>
        </CardContent>
      </Card>
    );
  }

  if (step === 'analyzing') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="py-16 text-center">
          <Loader2 className="h-12 w-12 animate-spin text-primary mx-auto mb-4" />
          <h3 className="font-archivo text-xl mb-2">Analyzing Your Website...</h3>
          <p className="text-muted-foreground font-dm">
            We're using AI to understand your business, services, and competitive landscape
          </p>
        </CardContent>
      </Card>
    );
  }

  if (step === 'questions') {
    const detectedIndustry = scrapedData?.industry || 'Other';
    const detectedServices = scrapedData?.servicesOffered || [];

    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="font-archivo text-2xl">Quick Questions</CardTitle>
          <p className="text-muted-foreground font-dm">
            We detected some info - just confirm or adjust below
          </p>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Industry Confirmation */}
          <div className="space-y-3">
            <Label className="text-base">We detected you're in {detectedIndustry}. Is this correct?</Label>
            <div className="flex flex-wrap gap-2">
              {['Yes, correct', 'HVAC', 'Plumbing', 'Roofing', 'Flooring', 'Landscaping', 'Other'].map(option => (
                <Button
                  key={option}
                  type="button"
                  variant={answers.industry === option ? 'default' : 'outline'}
                  onClick={() => handleAnswerSelect('industry', option === 'Yes, correct' ? detectedIndustry : option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {/* Services */}
          {detectedServices.length > 0 && (
            <div className="space-y-3">
              <Label className="text-base">Which services do you primarily offer?</Label>
              <div className="flex flex-wrap gap-2">
                {detectedServices.map(service => (
                  <Button
                    key={service}
                    type="button"
                    variant={answers.services?.includes(service) ? 'default' : 'outline'}
                    onClick={() => {
                      const current = answers.services || [];
                      const updated = current.includes(service)
                        ? current.filter((s: string) => s !== service)
                        : [...current, service];
                      handleAnswerSelect('services', updated);
                    }}
                  >
                    {service}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Marketing Challenge */}
          <div className="space-y-3">
            <Label className="text-base">What's your biggest marketing challenge?</Label>
            <div className="flex flex-wrap gap-2">
              {[
                'Getting more leads',
                'Standing out from competitors',
                'Keeping customers',
                'Growing revenue'
              ].map(option => (
                <Button
                  key={option}
                  type="button"
                  variant={answers.challenge === option ? 'default' : 'outline'}
                  onClick={() => handleAnswerSelect('challenge', option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          {/* Urgency */}
          <div className="space-y-3">
            <Label className="text-base">How urgently do you need marketing help?</Label>
            <div className="flex flex-wrap gap-2">
              {['ASAP', 'Within 30 days', 'Just exploring'].map(option => (
                <Button
                  key={option}
                  type="button"
                  variant={answers.urgency === option ? 'default' : 'outline'}
                  onClick={() => handleAnswerSelect('urgency', option)}
                >
                  {option}
                </Button>
              ))}
            </div>
          </div>

          <Button 
            size="lg" 
            className="w-full"
            onClick={handleContinueToPhone}
            disabled={!answers.industry || !answers.challenge || !answers.urgency}
          >
            Continue
          </Button>
        </CardContent>
      </Card>
    );
  }

  if (step === 'phone') {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex items-center gap-3 mb-2">
            <div className="bg-primary/10 p-3 rounded-full">
              <CheckCircle2 className="h-6 w-6 text-primary" />
            </div>
            <CardTitle className="font-archivo text-2xl">
              {isTeaser ? "Get Your Free Analysis" : "Almost Done!"}
            </CardTitle>
          </div>
          <p className="text-muted-foreground font-dm">
            {isTeaser 
              ? "Enter your phone to receive your personalized competitive analysis"
              : "Where should we send your insights?"}
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              type="tel"
              placeholder="(555) 123-4567"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              className="text-lg"
              autoFocus
            />
          </div>
          
          {isTeaser && (
            <div className="bg-muted/50 p-4 rounded-lg">
              <p className="text-sm text-muted-foreground">
                After entering your phone, you'll see a preview of your analysis. 
                Subscribe for $15/month to unlock full access to AI insights, competitor research, and personalized recommendations.
              </p>
            </div>
          )}

          <Button size="lg" className="w-full" onClick={handleComplete}>
            {isTeaser ? "Get Free Preview" : "Complete Setup"}
          </Button>
        </CardContent>
      </Card>
    );
  }

  return null;
};
