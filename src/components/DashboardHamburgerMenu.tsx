import React from 'react';
import { Button } from '@/components/ui/button';
import { 
  Sheet, 
  SheetContent, 
  SheetHeader, 
  SheetTitle, 
  SheetTrigger 
} from '@/components/ui/sheet';
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from '@/components/ui/collapsible';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Menu, ChevronDown, Settings, HelpCircle, MessageSquare, X } from 'lucide-react';
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

interface DashboardHamburgerMenuProps {
  user: any;
  userLocation?: string;
  userLocationType?: 'zipcode' | 'county' | null;
  userIndustry?: string;
  userLanguage: string;
  settingsOpen: boolean;
  questionsOpen: boolean;
  historyOpen: boolean;
  chatSessions: ChatSessionData[];
  activeSessionId: string | null;
  isMobile: boolean;
  onSettingsOpenChange: (open: boolean) => void;
  onQuestionsOpenChange: (open: boolean) => void;
  onHistoryOpenChange: (open: boolean) => void;
  onLocationChange: (location: string, type: 'zipcode' | 'county') => void;
  onIndustryChange: (industry: string) => void;
  onLanguageChange: (language: string) => void;
  onQuestionSelect: (question: string) => void;
  onNewChat: () => void;
  onChatSessionSelect: (sessionId: string) => void;
  onDeleteChatSession: (sessionId: string) => void;
}

const DashboardHamburgerMenu: React.FC<DashboardHamburgerMenuProps> = ({
  user,
  userLocation,
  userLocationType,
  userIndustry,
  userLanguage,
  settingsOpen,
  questionsOpen,
  historyOpen,
  chatSessions,
  activeSessionId,
  isMobile,
  onSettingsOpenChange,
  onQuestionsOpenChange,
  onHistoryOpenChange,
  onLocationChange,
  onIndustryChange,
  onLanguageChange,
  onQuestionSelect,
  onNewChat,
  onChatSessionSelect,
  onDeleteChatSession,
}) => {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button 
          variant="ghost" 
          size="sm"
          className="h-9 w-9 p-0"
          aria-label="Open menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent 
        side="left" 
        className="w-80 p-0 flex flex-col"
        aria-describedby="menu-description"
      >
        <SheetHeader className="p-4 border-b">
          <SheetTitle className="text-left">Dashboard Menu</SheetTitle>
          <p id="menu-description" className="text-sm text-muted-foreground text-left">
            Access settings, quick questions, and chat history
          </p>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto">
          {/* Settings Section */}
          <Collapsible open={settingsOpen} onOpenChange={onSettingsOpenChange}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between p-4 h-auto text-left hover:bg-accent"
                aria-expanded={settingsOpen}
              >
                <div className="flex items-center gap-3">
                  <Settings className="h-4 w-4" />
                  <span className="font-medium">Settings</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 transition-transform", settingsOpen && "rotate-180")} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4 space-y-4">
              <div className="space-y-2">
                <label htmlFor="location-input" className="text-sm font-medium">Location</label>
                <LocationInput
                  onLocationSelect={(location, type) => onLocationChange(location, type)}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="industry-select" className="text-sm font-medium">Industry</label>
                <IndustrySelector
                  value={userIndustry}
                  onValueChange={onIndustryChange}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="language-select" className="text-sm font-medium">Language</label>
                <LanguageSelector
                  value={userLanguage}
                  onValueChange={onLanguageChange}
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Quick Start Questions Section */}
          <Collapsible open={questionsOpen} onOpenChange={onQuestionsOpenChange}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between p-4 h-auto text-left border-t hover:bg-accent"
                aria-expanded={questionsOpen}
              >
                <div className="flex items-center gap-3">
                  <HelpCircle className="h-4 w-4" />
                  <span className="font-medium">Quick Start Questions</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 transition-transform", questionsOpen && "rotate-180")} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <div className="max-h-64 overflow-y-auto">
                <PrefilledQuestions
                  onQuestionSelect={onQuestionSelect}
                  location={userLocation}
                  industry={userIndustry}
                  className="text-sm"
                />
              </div>
            </CollapsibleContent>
          </Collapsible>

          {/* Chat History Section */}
          <Collapsible open={historyOpen} onOpenChange={onHistoryOpenChange}>
            <CollapsibleTrigger asChild>
              <Button
                variant="ghost"
                className="w-full flex items-center justify-between p-4 h-auto text-left border-t hover:bg-accent"
                aria-expanded={historyOpen}
              >
                <div className="flex items-center gap-3">
                  <MessageSquare className="h-4 w-4" />
                  <span className="font-medium">Chat History</span>
                </div>
                <ChevronDown className={cn("h-4 w-4 transition-transform", historyOpen && "rotate-180")} />
              </Button>
            </CollapsibleTrigger>
            <CollapsibleContent className="px-4 pb-4">
              <Button 
                onClick={onNewChat}
                size="sm" 
                className="w-full mb-4"
                aria-label="Start new chat session"
              >
                New Chat
              </Button>
              
              <div className="max-h-48 overflow-y-auto space-y-2">
                {chatSessions.map((session) => (
                  <ChatSession
                    key={session.id}
                    id={session.id}
                    title={session.title}
                    isActive={activeSessionId === session.id}
                    onClick={() => onChatSessionSelect(session.id)}
                    onDelete={() => onDeleteChatSession(session.id)}
                    createdAt={session.created_at}
                  />
                ))}
              </div>
            </CollapsibleContent>
          </Collapsible>
        </div>

        {/* User Profile - Always visible at bottom */}
        <div className="border-t p-4">
          {user && (
            <div className="flex items-center space-x-3 p-3 bg-accent rounded-lg">
              <Avatar className="h-8 w-8">
                <AvatarImage src={user.user_metadata?.avatar_url} />
                <AvatarFallback>
                  {user.email?.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {user.user_metadata?.full_name || user.email}
                </p>
                <p className="text-xs text-muted-foreground truncate">{user.email}</p>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default DashboardHamburgerMenu;