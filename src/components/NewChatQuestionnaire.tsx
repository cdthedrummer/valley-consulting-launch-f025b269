import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Bot, MessageSquare, Zap } from 'lucide-react';
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

  const handleLocationSelect = (loc: string, type: 'zipcode' | 'county') => {
    setLocation(loc);
    setLocationType(type);
  };

  const handleQuestionSelect = (question: string) => {
    setSelectedQuestion(question);
  };

  const handleStartChat = () => {
    onSetupComplete({
      location: location || undefined,
      locationType: locationType || undefined,
      industry: industry || undefined,
      language,
      initialQuestion: selectedQuestion || undefined
    });
  };

  return (
    <div className="flex items-center justify-center min-h-[80vh] p-4">
      <Card className="w-full max-w-6xl mx-auto">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-gradient-to-br from-primary/10 to-primary/20 rounded-full w-fit">
            <Bot className="h-8 w-8 text-primary" />
          </div>
          <CardTitle className="text-3xl font-bold gradient-text">AI Copilot Setup</CardTitle>
          <p className="text-muted-foreground mt-2">
            Customize your AI experience for personalized marketing insights
          </p>
        </CardHeader>
        
        <CardContent className="space-y-8">
          {/* Quick Options */}
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <LanguageSelector 
                value={language} 
                onValueChange={setLanguage}
              />
            </div>
            <Button 
              variant="outline" 
              onClick={onSkipSetup}
              className="text-muted-foreground hover:text-foreground"
            >
              Skip Setup & Chat Directly
            </Button>
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
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={handleStartChat}
              size="lg"
              className="bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 px-8"
            >
              Start AI Chat
              {selectedQuestion ? ' with Question' : ''}
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default NewChatQuestionnaire;