
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Bot, MapPin, Zap } from 'lucide-react';
import LocationInput from './LocationInput';

interface ChatSetupProps {
  onSetupComplete: (location: string, locationType: 'zipcode' | 'county') => void;
}

const ChatSetup: React.FC<ChatSetupProps> = ({ onSetupComplete }) => {
  const [selectedLocation, setSelectedLocation] = useState<string>('');
  const [selectedLocationType, setSelectedLocationType] = useState<'zipcode' | 'county' | null>(null);

  const handleLocationSelect = (location: string, type: 'zipcode' | 'county') => {
    setSelectedLocation(location);
    setSelectedLocationType(type);
  };

  const handleStart = () => {
    if (selectedLocation && selectedLocationType) {
      onSetupComplete(selectedLocation, selectedLocationType);
    }
  };

  const quickExamples = [
    "How many homes sold in my area last quarter?",
    "Best Google Ads strategy for HVAC services",
    "Local demographic data for contractors",
    "Seasonal marketing trends in Hudson Valley"
  ];

  return (
    <div className="flex items-center justify-center min-h-[60vh] p-4">
      <Card className="w-full max-w-2xl">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 p-3 bg-purple-100 rounded-full w-fit">
            <Bot className="h-8 w-8 text-purple-600" />
          </div>
          <CardTitle className="text-2xl font-bold">AI Copilot for Contractors</CardTitle>
          <p className="text-gray-600 mt-2">
            Get instant, location-specific marketing insights and strategies for your contracting business
          </p>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Location Input */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <MapPin className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold">Your Service Area</h3>
            </div>
            <p className="text-sm text-gray-600">
              Tell us your primary service area to get relevant local market data and marketing recommendations.
            </p>
            <LocationInput 
              onLocationSelect={handleLocationSelect}
              className="w-full"
            />
          </div>

          {/* Quick Examples */}
          <div className="space-y-3">
            <div className="flex items-center space-x-2">
              <Zap className="h-5 w-5 text-purple-600" />
              <h3 className="font-semibold">What You Can Ask</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
              {quickExamples.map((example, index) => (
                <div key={index} className="p-3 bg-gray-50 rounded-lg text-sm">
                  "{example}"
                </div>
              ))}
            </div>
          </div>

          {/* Start Button */}
          <Button 
            onClick={handleStart}
            disabled={!selectedLocation}
            className="w-full bg-purple-600 hover:bg-purple-700"
            size="lg"
          >
            Start AI Copilot
            {selectedLocation && (
              <span className="ml-2 text-purple-200">
                for {selectedLocation}
              </span>
            )}
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ChatSetup;
