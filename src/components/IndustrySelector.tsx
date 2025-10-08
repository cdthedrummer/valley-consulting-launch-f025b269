import React, { useState, useEffect } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Building2 } from 'lucide-react';

interface IndustrySelectorProps {
  value?: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const industries = [
  'General Contracting',
  'HVAC Services',
  'Plumbing',
  'Electrical Services',
  'Roofing',
  'Flooring',
  'Kitchen & Bath Remodeling',
  'Deck & Patio Construction',
  'Fencing',
  'Landscaping',
  'Painting',
  'Windows & Doors',
  'Siding',
  'Concrete & Masonry',
  'Pool Services',
  'Solar Installation',
  'Home Security',
  'Cleaning Services',
  'Other'
];

const IndustrySelector: React.FC<IndustrySelectorProps> = ({ 
  value, 
  onValueChange, 
  className 
}) => {
  const [showCustomInput, setShowCustomInput] = useState(false);
  const [customIndustry, setCustomIndustry] = useState('');

  // Check if value is a custom industry (not in the list)
  useEffect(() => {
    if (value && !industries.includes(value)) {
      setShowCustomInput(true);
      setCustomIndustry(value);
    }
  }, [value]);

  const handleSelectChange = (selectedValue: string) => {
    if (selectedValue === 'Other') {
      setShowCustomInput(true);
      setCustomIndustry('');
    } else {
      setShowCustomInput(false);
      onValueChange(selectedValue);
    }
  };

  const handleCustomInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const customValue = e.target.value;
    setCustomIndustry(customValue);
    onValueChange(customValue);
  };

  return (
    <div className={`space-y-2 ${className}`}>
      <div className="flex items-center space-x-2">
        <Building2 className="h-4 w-4 text-primary" />
        <Label htmlFor="industry-select">Your Industry</Label>
      </div>
      <Select 
        value={showCustomInput ? 'Other' : value} 
        onValueChange={handleSelectChange}
      >
        <SelectTrigger>
          <SelectValue placeholder="Select your industry..." />
        </SelectTrigger>
        <SelectContent className="bg-background border shadow-lg max-h-60">
          {industries.map((industry) => (
            <SelectItem key={industry} value={industry}>
              {industry}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      
      {showCustomInput && (
        <Input
          type="text"
          placeholder="Enter your industry..."
          value={customIndustry}
          onChange={handleCustomInputChange}
          className="mt-2"
        />
      )}
    </div>
  );
};

export default IndustrySelector;