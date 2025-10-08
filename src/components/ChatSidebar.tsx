import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { 
  Plus, 
  ChevronDown, 
  Settings, 
  HelpCircle, 
  MessageSquare,
  MapPin,
  Briefcase,
  Globe
} from 'lucide-react';
import { cn } from '@/lib/utils';
import LocationInput from './LocationInput';
import IndustrySelector from './IndustrySelector';
import LanguageSelector from './LanguageSelector';
import PrefilledQuestions from './PrefilledQuestions';
import ChatSession from './ChatSession';

interface ChatSessionData {
  id: string;
  title: string;
  created_at: string;
}

interface ChatSidebarProps {
  userLocation?: string;
  userLocationType?: 'zipcode' | 'county' | null;
  userIndustry?: string;
  userLanguage: string;
  chatSessions: ChatSessionData[];
  activeSessionId: string | null;
  onLocationChange: (location: string, type: 'zipcode' | 'county') => void;
  onIndustryChange: (industry: string) => void;
  onLanguageChange: (language: string) => void;
  onQuestionSelect: (question: string) => void;
  onNewChat: () => void;
  onChatSessionSelect: (sessionId: string) => void;
  onDeleteChatSession: (sessionId: string) => void;
  className?: string;
}

const ChatSidebar: React.FC<ChatSidebarProps> = ({
  userLocation,
  userLocationType,
  userIndustry,
  userLanguage,
  chatSessions,
  activeSessionId,
  onLocationChange,
  onIndustryChange,
  onLanguageChange,
  onQuestionSelect,
  onNewChat,
  onChatSessionSelect,
  onDeleteChatSession,
  className,
}) => {
  const [settingsOpen, setSettingsOpen] = React.useState(false);
  const [questionsOpen, setQuestionsOpen] = React.useState(false);

  return (
    <div className={cn("flex flex-col h-full bg-muted/30 border-r", className)}>
      {/* New Chat Button - Always visible at top */}
      <div className="p-3 border-b bg-background">
        <Button 
          onClick={onNewChat}
          className="w-full justify-start gap-2"
          variant="outline"
          size="sm"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </div>

      {/* Quick Settings Preview Card */}
      <div className="p-3 border-b bg-background space-y-2">
        <div className="text-xs font-medium text-muted-foreground mb-2">Current Settings</div>
        <div className="flex flex-wrap gap-2">
          {userLocation && (
            <Badge variant="secondary" className="text-xs">
              <MapPin className="h-3 w-3 mr-1" />
              {userLocationType === 'zipcode' ? 'ZIP ' : ''}{userLocation}
            </Badge>
          )}
          {userIndustry && (
            <Badge variant="secondary" className="text-xs">
              <Briefcase className="h-3 w-3 mr-1" />
              {userIndustry}
            </Badge>
          )}
          <Badge variant="secondary" className="text-xs">
            <Globe className="h-3 w-3 mr-1" />
            {userLanguage}
          </Badge>
        </div>
      </div>

      <ScrollArea className="flex-1">
        {/* Settings Section */}
        <Collapsible open={settingsOpen} onOpenChange={setSettingsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between p-3 h-auto text-left hover:bg-accent rounded-none"
            >
              <div className="flex items-center gap-2">
                <Settings className="h-4 w-4" />
                <span className="text-sm font-medium">Update Settings</span>
              </div>
              <ChevronDown className={cn("h-4 w-4 transition-transform", settingsOpen && "rotate-180")} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-3 pb-3 space-y-3 bg-accent/50">
            <div className="space-y-1.5">
              <label className="text-xs font-medium">Location</label>
              <LocationInput
                onLocationSelect={(location, type) => onLocationChange(location, type)}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium">Industry</label>
              <IndustrySelector
                value={userIndustry}
                onValueChange={onIndustryChange}
              />
            </div>

            <div className="space-y-1.5">
              <label className="text-xs font-medium">Language</label>
              <LanguageSelector
                value={userLanguage}
                onValueChange={onLanguageChange}
              />
            </div>
          </CollapsibleContent>
        </Collapsible>

        {/* Quick Questions Section */}
        <Collapsible open={questionsOpen} onOpenChange={setQuestionsOpen}>
          <CollapsibleTrigger asChild>
            <Button
              variant="ghost"
              className="w-full flex items-center justify-between p-3 h-auto text-left border-t hover:bg-accent rounded-none"
            >
              <div className="flex items-center gap-2">
                <HelpCircle className="h-4 w-4" />
                <span className="text-sm font-medium">Quick Questions</span>
              </div>
              <ChevronDown className={cn("h-4 w-4 transition-transform", questionsOpen && "rotate-180")} />
            </Button>
          </CollapsibleTrigger>
          <CollapsibleContent className="px-3 pb-3 bg-accent/50">
            <PrefilledQuestions
              onQuestionSelect={onQuestionSelect}
              location={userLocation}
              industry={userIndustry}
              className="text-xs"
            />
          </CollapsibleContent>
        </Collapsible>

        {/* Chat History Section */}
        <div className="border-t">
          <div className="p-3 flex items-center gap-2">
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">Recent Chats</span>
          </div>
          <div className="px-2 pb-2 space-y-1">
            {chatSessions.length === 0 ? (
              <p className="text-xs text-muted-foreground text-center py-4">
                No chat history yet.<br/>Start a new chat!
              </p>
            ) : (
              chatSessions.slice(0, 20).map((session) => (
                <ChatSession
                  key={session.id}
                  id={session.id}
                  title={session.title}
                  isActive={activeSessionId === session.id}
                  onClick={() => onChatSessionSelect(session.id)}
                  onDelete={() => onDeleteChatSession(session.id)}
                  createdAt={session.created_at}
                />
              ))
            )}
          </div>
        </div>
      </ScrollArea>
    </div>
  );
};

export default ChatSidebar;
