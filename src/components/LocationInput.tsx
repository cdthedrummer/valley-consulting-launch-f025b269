
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { MapPin, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface LocationInputProps {
  onLocationSelect: (location: string, type: 'zipcode' | 'county') => void;
  className?: string;
}

const LocationInput: React.FC<LocationInputProps> = ({ onLocationSelect, className }) => {
  const [input, setInput] = useState('');
  const [suggestions, setSuggestions] = useState<Array<{value: string, type: 'zipcode' | 'county', display: string}>>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  // Hudson Valley zip codes and counties for autocomplete
  const hudsonValleyData = [
    // Rockland County zip codes
    { value: '10901', type: 'zipcode' as const, display: 'Suffern, NY 10901' },
    { value: '10913', type: 'zipcode' as const, display: 'Blauvelt, NY 10913' },
    { value: '10920', type: 'zipcode' as const, display: 'Congers, NY 10920' },
    { value: '10927', type: 'zipcode' as const, display: 'Garnerville, NY 10927' },
    { value: '10952', type: 'zipcode' as const, display: 'Monsey, NY 10952' },
    { value: '10954', type: 'zipcode' as const, display: 'Nanuet, NY 10954' },
    { value: '10956', type: 'zipcode' as const, display: 'New City, NY 10956' },
    { value: '10962', type: 'zipcode' as const, display: 'Nyack, NY 10962' },
    { value: '10965', type: 'zipcode' as const, display: 'Pearl River, NY 10965' },
    { value: '10977', type: 'zipcode' as const, display: 'Spring Valley, NY 10977' },
    { value: '10994', type: 'zipcode' as const, display: 'West Nyack, NY 10994' },
    
    // Westchester County major zip codes
    { value: '10701', type: 'zipcode' as const, display: 'Yonkers, NY 10701' },
    { value: '10543', type: 'zipcode' as const, display: 'Mamaroneck, NY 10543' },
    { value: '10583', type: 'zipcode' as const, display: 'Scarsdale, NY 10583' },
    { value: '10601', type: 'zipcode' as const, display: 'White Plains, NY 10601' },
    { value: '10522', type: 'zipcode' as const, display: 'Dobbs Ferry, NY 10522' },
    
    // Counties
    { value: 'Rockland County', type: 'county' as const, display: 'Rockland County, NY' },
    { value: 'Westchester County', type: 'county' as const, display: 'Westchester County, NY' },
    { value: 'Orange County', type: 'county' as const, display: 'Orange County, NY' },
    { value: 'Putnam County', type: 'county' as const, display: 'Putnam County, NY' },
  ];

  useEffect(() => {
    if (input.length >= 2) {
      const filtered = hudsonValleyData.filter(item =>
        item.display.toLowerCase().includes(input.toLowerCase()) ||
        item.value.includes(input)
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [input]);

  const handleSelect = (item: typeof suggestions[0]) => {
    setInput(item.display);
    setShowSuggestions(false);
    onLocationSelect(item.value, item.type);
  };

  const handleSubmit = () => {
    if (input.trim()) {
      // Check if it's a zip code (5 digits)
      const isZipCode = /^\d{5}$/.test(input.trim());
      onLocationSelect(input.trim(), isZipCode ? 'zipcode' : 'county');
      setShowSuggestions(false);
    }
  };

  return (
    <div className={cn("relative", className)}>
      <div className="flex space-x-2">
        <div className="relative flex-1">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            placeholder="Enter zip code (10954) or county (Rockland County)..."
            className="pr-10"
          />
          <MapPin className="absolute right-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
        </div>
        <Button onClick={handleSubmit} disabled={!input.trim()}>
          <Search className="h-4 w-4" />
        </Button>
      </div>
      
      {showSuggestions && suggestions.length > 0 && (
        <Card className="absolute top-full left-0 right-0 mt-1 z-50 max-h-60 overflow-y-auto">
          <CardContent className="p-0">
            {suggestions.map((item, index) => (
              <button
                key={index}
                onClick={() => handleSelect(item)}
                className="w-full text-left px-4 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-b-0 flex items-center space-x-2"
              >
                <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
                <span className="text-sm">{item.display}</span>
                <span className="text-xs text-gray-500 ml-auto">
                  {item.type === 'zipcode' ? 'ZIP' : 'County'}
                </span>
              </button>
            ))}
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default LocationInput;
