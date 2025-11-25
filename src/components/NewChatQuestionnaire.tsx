import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Bot, MessageSquare, Zap, Building2, Target, DollarSign, Users, Sparkles } from 'lucide-react';
import LocationInput from './LocationInput';
import IndustrySelector from './IndustrySelector';
import LanguageSelector from './LanguageSelector';
import PrefilledQuestions from './PrefilledQuestions';

interface NewChatQuestionnaireProps {
  onSetupComplete: (config: {
    location?: string;
    locationType?: 'zipcode' | 'county';
    industry?: string;
    language: string;
    initialQuestion?: string;
    businessProfile?: {
      business_name?: string;
      website_url?: string;
      years_in_business?: number;
      service_radius?: number;
      marketing_goal?: string;
      monthly_budget?: string;
      ideal_customers?: string;
    };
  }) => void;
  onSkipSetup: () => void;
  savedProfile?: any;
}

const NewChatQuestionnaire: React.FC<NewChatQuestionnaireProps> = ({ 
  onSetupComplete, 
  onSkipSetup,
  savedProfile 
}) => {
  const [location, setLocation] = useState<string>(savedProfile?.location || '');
  const [locationType, setLocationType] = useState<'zipcode' | 'county' | null>(null);
  const [industry, setIndustry] = useState<string>(savedProfile?.industry || '');
  const [language, setLanguage] = useState<string>('English');
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  
  // Company profile fields - pre-populate from saved profile
  const [businessName, setBusinessName] = useState<string>(savedProfile?.business_name || '');
  const [websiteUrl, setWebsiteUrl] = useState<string>(savedProfile?.website_url || '');
  const [yearsInBusiness, setYearsInBusiness] = useState<string>(savedProfile?.years_in_business?.toString() || '');
  const [serviceRadius, setServiceRadius] = useState<string>(savedProfile?.service_radius?.toString() || '');
  
  // Advanced profile fields - pre-populate from saved profile
  const [marketingGoal, setMarketingGoal] = useState<string>(savedProfile?.marketing_goal || '');
  const [monthlyBudget, setMonthlyBudget] = useState<string>(savedProfile?.monthly_budget || '');
  const [idealCustomers, setIdealCustomers] = useState<string>(savedProfile?.ideal_customers || '');

  const handleLocationSelect = (loc: string, type: 'zipcode' | 'county') => {
    setLocation(loc);
    setLocationType(type);
  };

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
  };

  const handleStartChat = () => {
    const businessProfile = (businessName || websiteUrl || yearsInBusiness || serviceRadius || marketingGoal || monthlyBudget || idealCustomers) ? {
      business_name: businessName || undefined,
      website_url: websiteUrl || undefined,
      years_in_business: yearsInBusiness ? parseInt(yearsInBusiness) : undefined,
      service_radius: serviceRadius ? parseInt(serviceRadius) : undefined,
      marketing_goal: marketingGoal || undefined,
      monthly_budget: monthlyBudget || undefined,
      ideal_customers: idealCustomers || undefined,
    } : undefined;

    onSetupComplete({
      location: location || undefined,
      locationType: locationType || undefined,
      industry: industry || undefined,
      language,
      initialQuestion: selectedQuestion || undefined,
      businessProfile,
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-6xl mx-auto shadow-lg">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto mb-2 p-4 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full w-fit">
            <Bot className="h-10 w-10 text-primary" />
          </div>
          <CardTitle className="text-3xl md:text-4xl font-bold gradient-text">
            {savedProfile ? 'Update Your Profile' : 'Welcome to AI Copilot!'} 👋
          </CardTitle>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            {savedProfile 
              ? 'Update your business information to keep your AI insights accurate and personalized.'
              : 'Just 3 quick questions to unlock personalized marketing insights.'
            }
            <span className="block mt-1 text-sm">Takes less than 30 seconds!</span>
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Language and Skip Option */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-accent/50 p-4 rounded-lg">
            <div className="space-y-1">
              <label className="text-sm font-medium">Preferred Language</label>
              <LanguageSelector 
                value={language} 
                onValueChange={setLanguage}
              />
            </div>
            <div className="flex flex-col items-end gap-2">
              <Button 
                variant="ghost" 
                onClick={onSkipSetup}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                Skip for now
              </Button>
              <p className="text-xs text-muted-foreground">
                (You'll see a reminder to complete setup later)
              </p>
            </div>
          </div>

          <Separator />

          {/* Simplified Setup Form - 3 Essential Questions */}
          <div className="max-w-2xl mx-auto space-y-6">
            <div>
              <h3 className="text-xl font-semibold mb-6 flex items-center space-x-2">
                <Zap className="h-6 w-6 text-primary" />
                <span>3 Quick Questions</span>
              </h3>
              
              <div className="space-y-6">
                {/* Question 1: Location */}
                <div className="p-6 bg-accent/30 rounded-lg border-2 border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                      1
                    </div>
                    <label className="text-base font-semibold">Where do you serve customers?</label>
                  </div>
                  <LocationInput 
                    onLocationSelect={handleLocationSelect}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    💡 We'll find local opportunities and competitors in your area
                  </p>
                </div>

                {/* Question 2: Industry */}
                <div className="p-6 bg-accent/30 rounded-lg border-2 border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                      2
                    </div>
                    <label className="text-base font-semibold">What industry are you in?</label>
                  </div>
                  <IndustrySelector 
                    value={industry}
                    onValueChange={setIndustry}
                    className="w-full"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    💡 We'll provide industry-specific insights and strategies
                  </p>
                </div>

                {/* Question 3: Business Name */}
                <div className="p-6 bg-accent/30 rounded-lg border-2 border-primary/20">
                  <div className="flex items-center gap-2 mb-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold">
                      3
                    </div>
                    <label htmlFor="business-name" className="text-base font-semibold">
                      What's your business name?
                    </label>
                  </div>
                  <Input
                    id="business-name"
                    type="text"
                    placeholder="e.g., Smith's HVAC Services"
                    value={businessName}
                    onChange={(e) => setBusinessName(e.target.value)}
                    className="text-base h-12"
                  />
                  <p className="text-xs text-muted-foreground mt-2">
                    💡 We'll personalize your dashboard and insights
                  </p>
                </div>
              </div>

              {/* Preview */}
              {(location || industry || businessName) && (
                <div className="mt-6 p-4 bg-primary/10 rounded-lg border-l-4 border-primary">
                  <h4 className="font-medium mb-2 flex items-center gap-2">
                    <Sparkles className="h-4 w-4" />
                    Ready to unlock:
                  </h4>
                  <ul className="text-sm text-muted-foreground space-y-1.5">
                    {businessName && (
                      <li>✨ Personalized dashboard for {businessName}</li>
                    )}
                    {location && (
                      <li>📍 Local market intelligence for {location}</li>
                    )}
                    {industry && (
                      <li>🎯 {industry}-specific strategies and insights</li>
                    )}
                    <li>🤖 AI marketing copilot in {language}</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Quick Start Questions */}
            <div className="pt-4">
              <h4 className="text-sm font-medium mb-3 flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-primary" />
                Or start with a question:
              </h4>
              <PrefilledQuestions 
                onQuestionSelect={handleQuestionSelect}
                location={location}
                industry={industry}
              />
              {selectedQuestion && (
                <div className="mt-3 p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                  <p className="text-xs font-medium">Starting question:</p>
                  <p className="text-xs text-muted-foreground mt-1">"{selectedQuestion}"</p>
                </div>
              )}
            </div>
          </div>

          <Separator />

          {/* Action Buttons */}
          <div className="flex flex-col items-center space-y-3">
            <Button 
              onClick={handleStartChat}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-12 text-lg h-12"
            >
              {selectedQuestion ? '🚀 Start Chat with Question' : '💬 Start AI Chat'}
            </Button>
            {(!location || !industry || !businessName) && (
              <p className="text-sm text-muted-foreground text-center">
                💡 Complete all 3 questions for the best experience (you can update these later)
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewChatQuestionnaire;