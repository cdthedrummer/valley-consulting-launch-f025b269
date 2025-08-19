import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MessageSquare, TrendingUp, Target, MapPin, BarChart3, Users } from 'lucide-react';

interface PrefilledQuestionsProps {
  onQuestionSelect: (question: string) => void;
  location?: string;
  industry?: string;
  className?: string;
}

const PrefilledQuestions: React.FC<PrefilledQuestionsProps> = ({ 
  onQuestionSelect, 
  location, 
  industry, 
  className 
}) => {
  const getQuestions = () => {
    const baseQuestions = [
      {
        category: 'Market Data',
        icon: BarChart3,
        questions: [
          location 
            ? `How many homes sold in ${location} last quarter?`
            : 'What are the current home sales trends in Hudson Valley?',
          location
            ? `What's the average home value in ${location}?`
            : 'What are average home values in my service area?',
          'Show me building permit data for new construction'
        ]
      },
      {
        category: 'Local Marketing',
        icon: Target,
        questions: [
          location && industry
            ? `Best Google Ads strategy for ${industry} in ${location}`
            : 'How do I create effective Google Ads for contractors?',
          'Local SEO tactics for home service businesses',
          'Nextdoor marketing strategies for contractors'
        ]
      },
      {
        category: 'Seasonal Strategies',
        icon: TrendingUp,
        questions: [
          industry
            ? `What are the peak seasons for ${industry} services?`
            : 'When is peak season for home services?',
          'Winter marketing strategies for contractors',
          'Summer lead generation tactics'
        ]
      },
      {
        category: 'Demographics',
        icon: Users,
        questions: [
          location
            ? `Tell me about the demographics in ${location}`
            : 'What are Hudson Valley demographics for contractors?',
          'High-income neighborhoods to target',
          'Age groups most likely to hire contractors'
        ]
      }
    ];

    return baseQuestions;
  };

  const questions = getQuestions();

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex items-center space-x-2 mb-3">
        <MessageSquare className="h-5 w-5 text-primary" />
        <h3 className="font-semibold text-foreground">Quick Start Questions</h3>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {questions.map((category, categoryIndex) => (
          <Card key={categoryIndex} className="p-4">
            <CardContent className="p-0">
              <div className="flex items-center space-x-2 mb-3">
                <category.icon className="h-4 w-4 text-primary" />
                <h4 className="font-medium text-sm text-foreground">{category.category}</h4>
              </div>
              <div className="space-y-2">
                {category.questions.map((question, questionIndex) => (
                  <Button
                    key={questionIndex}
                    variant="ghost"
                    className="w-full text-left justify-start h-auto p-3 text-sm text-muted-foreground hover:text-foreground hover:bg-accent whitespace-normal"
                    onClick={() => onQuestionSelect(question)}
                  >
                    <span className="break-words">{question}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default PrefilledQuestions;