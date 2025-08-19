import React from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

interface LanguageSelectorProps {
  value: string;
  onValueChange: (value: string) => void;
  className?: string;
}

const languages = [
  { code: 'English', name: 'English', flag: '🇺🇸' },
  { code: 'Spanish', name: 'Español', flag: '🇪🇸' },
  { code: 'Chinese', name: '中文', flag: '🇨🇳' },
  { code: 'Hebrew', name: 'עברית', flag: '🇮🇱' },
  { code: 'German', name: 'Deutsch', flag: '🇩🇪' }
];

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  value, 
  onValueChange, 
  className 
}) => {
  const selectedLanguage = languages.find(lang => lang.code === value);

  return (
    <div className={className}>
      <Select value={value} onValueChange={onValueChange}>
        <SelectTrigger className="w-40">
          <div className="flex items-center space-x-2">
            <Globe className="h-4 w-4" />
            <span className="flex items-center space-x-1">
              <span>{selectedLanguage?.flag}</span>
              <span className="hidden sm:inline">{selectedLanguage?.name}</span>
            </span>
          </div>
        </SelectTrigger>
        <SelectContent className="bg-background border shadow-lg">
          {languages.map((language) => (
            <SelectItem key={language.code} value={language.code}>
              <div className="flex items-center space-x-2">
                <span>{language.flag}</span>
                <span>{language.name}</span>
              </div>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
};

export default LanguageSelector;