import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import { Bot, MessageSquare, Zap, Building2, Target, DollarSign, Users, ChevronDown, Sparkles } from 'lucide-react';
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
}

const NewChatQuestionnaire: React.FC<NewChatQuestionnaireProps> = ({ 
  onSetupComplete, 
  onSkipSetup 
}) => {
  const [location, setLocation] = useState<string>('');
  const [locationType, setLocationType] = useState<'zipcode' | 'county' | null>(null);
  const [industry, setIndustry] = useState<string>('');
  const [language, setLanguage] = useState<string>('English');
  const [selectedQuestion, setSelectedQuestion] = useState<string>('');
  
  // Company profile fields
  const [businessName, setBusinessName] = useState<string>('');
  const [websiteUrl, setWebsiteUrl] = useState<string>('');
  const [yearsInBusiness, setYearsInBusiness] = useState<string>('');
  const [serviceRadius, setServiceRadius] = useState<string>('');
  
  // Advanced profile fields
  const [marketingGoal, setMarketingGoal] = useState<string>('');
  const [monthlyBudget, setMonthlyBudget] = useState<string>('');
  const [idealCustomers, setIdealCustomers] = useState<string>('');
  const [showAdvanced, setShowAdvanced] = useState(false);

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
            Welcome to AI Copilot! 👋
          </CardTitle>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Get personalized marketing insights tailored to your location and industry. 
            <span className="block mt-1 text-sm">Takes less than 60 seconds to set up!</span>
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

          {/* Setup Form */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {/* Left Column - Basic Info */}
            <div className="space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Zap className="h-5 w-5 text-primary" />
                  <span>Tell Us About Your Business</span>
                  <span className="ml-2 text-xs font-normal text-muted-foreground">(Optional but recommended)</span>
                </h3>
                
                <div className="space-y-4">
                  <LocationInput 
                    onLocationSelect={handleLocationSelect}
                    className="w-full"
                  />
                  
                  <IndustrySelector 
                    value={industry}
                    onValueChange={setIndustry}
                    className="w-full"
                  />
                </div>
              </div>

              {/* Company Profile Section */}
              <div>
                <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                  <Building2 className="h-5 w-5 text-primary" />
                  <span>Company Details</span>
                  <span className="ml-2 text-xs font-normal text-muted-foreground">(Optional - helps personalize results)</span>
                </h3>
                
                <div className="space-y-4">
                  <div>
                    <label htmlFor="business-name" className="text-sm font-medium block mb-1.5">
                      Business Name
                    </label>
                    <Input
                      id="business-name"
                      type="text"
                      placeholder="e.g., Smith's HVAC Services"
                      value={businessName}
                      onChange={(e) => setBusinessName(e.target.value)}
                    />
                  </div>

                  <div>
                    <label htmlFor="website" className="text-sm font-medium block mb-1.5">
                      Website URL
                    </label>
                    <Input
                      id="website"
                      type="url"
                      placeholder="e.g., https://www.yourbusiness.com"
                      value={websiteUrl}
                      onChange={(e) => setWebsiteUrl(e.target.value)}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="years" className="text-sm font-medium block mb-1.5">
                        Years in Business
                      </label>
                      <Input
                        id="years"
                        type="number"
                        placeholder="e.g., 15"
                        value={yearsInBusiness}
                        onChange={(e) => setYearsInBusiness(e.target.value)}
                        min="0"
                        max="100"
                      />
                    </div>

                    <div>
                      <label htmlFor="radius" className="text-sm font-medium block mb-1.5">
                        Service Radius (miles)
                      </label>
                      <Input
                        id="radius"
                        type="number"
                        placeholder="e.g., 50"
                        value={serviceRadius}
                        onChange={(e) => setServiceRadius(e.target.value)}
                        min="0"
                        max="500"
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Advanced Context Section */}
              <Collapsible open={showAdvanced} onOpenChange={setShowAdvanced}>
                <CollapsibleTrigger asChild>
                  <Button 
                    variant="outline" 
                    className="w-full justify-between group hover:bg-primary/5 border-dashed"
                  >
                    <div className="flex items-center space-x-2">
                      <Sparkles className="h-4 w-4 text-primary" />
                      <span className="font-medium">
                        {showAdvanced ? 'Hide' : 'Add More Context'} for Better Results
                      </span>
                    </div>
                    <ChevronDown className={`h-4 w-4 transition-transform ${showAdvanced ? 'rotate-180' : ''}`} />
                  </Button>
                </CollapsibleTrigger>
                
                <CollapsibleContent className="space-y-4 mt-4">
                  <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
                    <p className="text-sm text-muted-foreground mb-4">
                      💡 These details help us provide more targeted, actionable insights
                    </p>
                    
                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center space-x-2 mb-1.5">
                          <Target className="h-4 w-4 text-primary" />
                          <label htmlFor="marketing-goal" className="text-sm font-medium">
                            What's your #1 marketing goal?
                          </label>
                        </div>
                        <Input
                          id="marketing-goal"
                          type="text"
                          placeholder="e.g., Get more qualified leads, Build brand awareness, etc."
                          value={marketingGoal}
                          onChange={(e) => setMarketingGoal(e.target.value)}
                        />
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 mb-1.5">
                          <DollarSign className="h-4 w-4 text-primary" />
                          <label htmlFor="monthly-budget" className="text-sm font-medium">
                            Monthly Marketing Budget
                          </label>
                        </div>
                        <Input
                          id="monthly-budget"
                          type="text"
                          placeholder="e.g., $500-1000, $2000+, or 'Not sure yet'"
                          value={monthlyBudget}
                          onChange={(e) => setMonthlyBudget(e.target.value)}
                        />
                      </div>

                      <div>
                        <div className="flex items-center space-x-2 mb-1.5">
                          <Users className="h-4 w-4 text-primary" />
                          <label htmlFor="ideal-customers" className="text-sm font-medium">
                            Who are your ideal customers?
                          </label>
                        </div>
                        <Textarea
                          id="ideal-customers"
                          placeholder="e.g., Homeowners aged 35-55 in suburban areas who value quality over price..."
                          value={idealCustomers}
                          onChange={(e) => setIdealCustomers(e.target.value)}
                          rows={3}
                        />
                      </div>
                    </div>
                  </div>
                </CollapsibleContent>
              </Collapsible>

              {/* Preview */}
              {(location || industry) && (
                <div className="p-4 bg-accent rounded-lg">
                  <h4 className="font-medium mb-2">Your AI will be optimized for:</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    {location && (
                      <li>• Service area: {location} ({locationType})</li>
                    )}
                    {industry && (
                      <li>• Industry: {industry}</li>
                    )}
                    <li>• Language: {language}</li>
                  </ul>
                </div>
              )}
            </div>

            {/* Right Column - Quick Questions */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center space-x-2">
                <MessageSquare className="h-5 w-5 text-primary" />
                <span>Get Started Quickly</span>
              </h3>
              
              <PrefilledQuestions 
                onQuestionSelect={handleQuestionSelect}
                location={location}
                industry={industry}
              />

              {selectedQuestion && (
                <div className="mt-4 p-3 bg-primary/10 rounded-lg border-l-4 border-primary">
                  <p className="text-sm font-medium">Selected question:</p>
                  <p className="text-sm text-muted-foreground mt-1">"{selectedQuestion}"</p>
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
            {!location && !industry && (
              <p className="text-sm text-muted-foreground text-center">
                💡 Tip: Adding your location and industry helps us provide more accurate insights
              </p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewChatQuestionnaire;