import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { MapPin, Building2, Globe, Settings, ChevronDown, ChevronUp } from 'lucide-react';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible';
import LocationInput from './LocationInput';
import IndustrySelector from './IndustrySelector';
import LanguageSelector from './LanguageSelector';
import PrefilledQuestions from './PrefilledQuestions';

interface ChatControlsProps {
  location?: string;
  locationType?: 'zipcode' | 'county' | null;
  industry?: string;
  language: string;
  onLocationChange: (location: string, type: 'zipcode' | 'county') => void;
  onIndustryChange: (industry: string) => void;
  onLanguageChange: (language: string) => void;
  onQuestionSelect: (question: string) => void;
  className?: string;
}

const ChatControls: React.FC<ChatControlsProps> = ({
  location,
  locationType,
  industry,
  language,
  onLocationChange,
  onIndustryChange,
  onLanguageChange,
  onQuestionSelect,
  className
}) => {
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(true);

  return (
    <div className={`space-y-3 md:space-y-4 ${className}`}>
      {/* Current Settings Summary */}
      <Card>
        <CardHeader className="pb-2 md:pb-3">
          <CardTitle className="text-base md:text-lg flex items-center justify-between">
            <span>Settings</span>
            <Settings className="h-4 w-4" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-1 md:gap-2">
            {location && (
              <Badge variant="secondary" className="flex items-center space-x-1 text-xs">
                <MapPin className="h-3 w-3" />
                <span className="truncate max-w-[100px] md:max-w-none">{location}</span>
              </Badge>
            )}
            {industry && (
              <Badge variant="secondary" className="flex items-center space-x-1 text-xs">
                <Building2 className="h-3 w-3" />
                <span className="truncate max-w-[80px] md:max-w-none">{industry}</span>
              </Badge>
            )}
            <Badge variant="secondary" className="flex items-center space-x-1 text-xs">
              <Globe className="h-3 w-3" />
              <span>{language}</span>
            </Badge>
          </div>
          
          <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
            <CollapsibleTrigger asChild>
              <Button variant="outline" size="sm" className="w-full text-xs md:text-sm">
                Update Settings
                {settingsOpen ? (
                  <ChevronUp className="h-3 w-3 md:h-4 md:w-4 ml-1" />
                ) : (
                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4 ml-1" />
                )}
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="space-y-3 md:space-y-4 mt-3 md:mt-4">
              <LocationInput 
                onLocationSelect={onLocationChange}
                className="w-full"
              />
              <IndustrySelector 
                value={industry}
                onValueChange={onIndustryChange}
                className="w-full"
              />
              <div className="space-y-2">
                <label className="text-xs md:text-sm font-medium flex items-center space-x-2">
                  <Globe className="h-3 w-3 md:h-4 md:w-4" />
                  <span>Language</span>
                </label>
                <LanguageSelector 
                  value={language} 
                  onValueChange={onLanguageChange}
                  className="w-full"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>
        </CardContent>
      </Card>

      {/* Quick Questions */}
      <Card>
        <Collapsible open={questionsOpen} onOpenChange={setQuestionsOpen}>
          <CollapsibleTrigger asChild>
            <CardHeader className="pb-2 md:pb-3 cursor-pointer hover:bg-accent/50 transition-colors">
              <CardTitle className="text-base md:text-lg flex items-center justify-between">
                <span>Quick Questions</span>
                {questionsOpen ? (
                  <ChevronUp className="h-3 w-3 md:h-4 md:w-4" />
                ) : (
                  <ChevronDown className="h-3 w-3 md:h-4 md:w-4" />
                )}
              </CardTitle>
            </CardHeader>
          </CollapsibleTrigger>
          <CollapsibleContent>
            <CardContent className="pt-0">
              <PrefilledQuestions 
                onQuestionSelect={onQuestionSelect}
                location={location}
                industry={industry}
                className=""
              />
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </Card>
    </div>
  );
};

export default ChatControls;