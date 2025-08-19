import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Bot, Send, User, Menu, Download, Clipboard } from 'lucide-react';
import MarkdownMessage from './MarkdownMessage';
import ChatControls from './ChatControls';
import LanguageSelector from './LanguageSelector';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatWithControlsProps {
  messages: Message[];
  input: string;
  isLoading: boolean;
  activeSessionId: string | null;
  userLocation?: string;
  userLocationType?: 'zipcode' | 'county' | null;
  userIndustry?: string;
  userLanguage: string;
  sidebarOpen: boolean;
  isMobile: boolean;
  onInputChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: React.KeyboardEvent) => void;
  onToggleSidebar: () => void;
  onLocationChange: (location: string, type: 'zipcode' | 'county') => void;
  onIndustryChange: (industry: string) => void;
  onLanguageChange: (language: string) => void;
  onQuestionSelect: (question: string) => void;
  onExportTranscript: () => void;
  onCopyMessage: (content: string) => void;
}

const ChatWithControls: React.FC<ChatWithControlsProps> = ({
  messages,
  input,
  isLoading,
  activeSessionId,
  userLocation,
  userLocationType,
  userIndustry,
  userLanguage,
  sidebarOpen,
  isMobile,
  onInputChange,
  onSendMessage,
  onKeyPress,
  onToggleSidebar,
  onLocationChange,
  onIndustryChange,
  onLanguageChange,
  onQuestionSelect,
  onExportTranscript,
  onCopyMessage,
}) => {
  return (
    <Card className="flex-1 flex flex-col shadow-sm min-h-0">
      <CardHeader className="border-b bg-background rounded-t-lg flex-shrink-0">
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleSidebar}
              className="mr-3"
            >
              <Menu className="h-4 w-4" />
            </Button>
            <Bot className="h-6 w-6 mr-2 text-primary" />
            AI Copilot for Contractors
            {userLocation && (
              <span className="ml-3 text-sm text-muted-foreground bg-accent px-2 py-1 rounded">
                {userLocation}
              </span>
            )}
          </CardTitle>
          <div className="flex items-center gap-2">
            {!isMobile && (
              <LanguageSelector 
                value={userLanguage} 
                onValueChange={onLanguageChange}
              />
            )}
            <Button variant="outline" size="sm" onClick={onExportTranscript}>
              <Download className="h-4 w-4 mr-1" /> Export
            </Button>
          </div>
        </div>
      </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 min-h-0">
          {/* Messages Area */}
          <ScrollArea className="flex-1 p-6">
            <div className="space-y-4">
              {messages.map((message, index) => (
                <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`flex max-w-3xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                    <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                      message.role === 'user' ? 'bg-primary ml-2' : 'bg-primary mr-2'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="h-4 w-4 text-primary-foreground" />
                      ) : (
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      )}
                    </div>
                    <div className={`rounded-lg px-4 py-2 ${
                      message.role === 'user' 
                        ? 'bg-primary text-primary-foreground' 
                        : 'bg-accent text-accent-foreground'
                    }`}>
                      <MarkdownMessage 
                        content={message.content} 
                        isUser={message.role === 'user'}
                      />
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          onClick={() => onCopyMessage(message.content)}
                          className="inline-flex items-center text-xs opacity-70 hover:opacity-100 hover:underline"
                          aria-label="Copy message"
                        >
                          <Clipboard className="h-3 w-3 mr-1" /> Copy
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex">
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary mr-2 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-primary-foreground" />
                    </div>
                    <div className="bg-accent rounded-lg px-4 py-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {/* Input Area */}
          <div className="border-t p-4 bg-background rounded-b-lg flex-shrink-0">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => onInputChange(e.target.value)}
                onKeyPress={onKeyPress}
                placeholder="Ask about local market data or marketing strategies..."
                disabled={isLoading || !activeSessionId}
                className="flex-1"
              />
              <Button 
                onClick={onSendMessage}
                disabled={isLoading || !input.trim() || !activeSessionId}
                className="bg-primary hover:bg-primary/90"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Try asking: "How many homes sold in Nanuet last quarter?" or "Best Google Ads strategy for HVAC in Rockland County?"
            </p>
          </div>
        </CardContent>
      </Card>
  );
};

export default ChatWithControls;