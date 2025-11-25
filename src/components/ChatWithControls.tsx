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
  requestCount?: number;
  maxRequests?: number;
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
  requestCount = 0,
  maxRequests = 200,
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
  const shouldShowRateLimit = requestCount >= 100;
  return (
    <Card className="flex-1 flex flex-col border-2 border-action-yellow/30 bg-warm-cream shadow-lg min-h-0">
      <CardHeader className="border-b-2 border-action-yellow/30 bg-club-green rounded-t-lg flex-shrink-0">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            {isMobile && (
              <Button 
                variant="ghost" 
                size="sm"
                onClick={onToggleSidebar}
                className="h-8 w-8 p-0 text-warm-cream hover:bg-action-yellow/20"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
            <CardTitle className="flex items-center font-archivo text-base md:text-lg uppercase tracking-wide text-warm-cream">
              <Bot className="h-5 w-5 md:h-6 md:w-6 mr-2 text-action-yellow" />
              AI Assistant
              {userLocation && (
                <span className="ml-2 text-xs md:text-sm font-dm bg-action-yellow/20 text-warm-cream px-2 py-0.5 rounded">
                  {userLocation}
                </span>
              )}
            </CardTitle>
          </div>
          <div className="flex items-center gap-2">
            {!isMobile && (
              <LanguageSelector 
                value={userLanguage} 
                onValueChange={onLanguageChange}
              />
            )}
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onExportTranscript} 
              disabled={messages.length === 0}
              className="border-warm-cream/30 text-warm-cream hover:bg-action-yellow/20 hover:text-warm-cream"
            >
              <Download className="h-4 w-4 mr-1" /> 
              {!isMobile && "Export"}
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
                      message.role === 'user' ? 'bg-club-green ml-2' : 'bg-action-yellow mr-2'
                    }`}>
                      {message.role === 'user' ? (
                        <User className="h-4 w-4 text-warm-cream" />
                      ) : (
                        <Bot className="h-4 w-4 text-club-green" />
                      )}
                    </div>
                    <div className={`rounded-lg px-4 py-2 ${
                      message.role === 'user' 
                        ? 'bg-club-green/10 border-2 border-club-green/20 text-club-green' 
                        : 'bg-white border-2 border-action-yellow/30 text-club-green'
                    }`}>
                      <MarkdownMessage 
                        content={message.content} 
                        isUser={message.role === 'user'}
                      />
                      <div className="mt-2 flex items-center gap-3">
                        <button
                          onClick={() => onCopyMessage(message.content)}
                          className="inline-flex items-center font-dm text-xs text-club-green/60 hover:text-club-green hover:underline"
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
                    <div className="flex-shrink-0 w-8 h-8 rounded-full bg-action-yellow mr-2 flex items-center justify-center">
                      <Bot className="h-4 w-4 text-club-green" />
                    </div>
                    <div className="bg-white border-2 border-action-yellow/30 rounded-lg px-4 py-2">
                      <div className="flex items-center space-x-1">
                        <div className="w-2 h-2 bg-club-green rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-club-green rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-club-green rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </ScrollArea>
          
          {/* Chat Input Form */}
          <div className="border-t-2 border-action-yellow/30 p-4 bg-warm-cream rounded-b-lg flex-shrink-0">
            {shouldShowRateLimit && (
              <div className="mb-3 px-3 py-2 bg-action-yellow/20 border-2 border-action-yellow/40 rounded-md">
                <p className="font-dm text-xs text-club-green">
                  <span className="font-bold">Rate Limit Notice:</span> You've used {requestCount} of {maxRequests} messages this hour.
                </p>
              </div>
            )}
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                onSendMessage();
              }}
              className="space-y-2"
              aria-label="Send message"
            >
              <div className="flex space-x-2">
                <label htmlFor="chat-input" className="sr-only">
                  Message input
                </label>
                <textarea
                  id="chat-input"
                  value={input}
                  onChange={(e) => onInputChange(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      onSendMessage();
                    }
                  }}
                  placeholder="Ask about local market data or marketing strategies..."
                  disabled={isLoading || !activeSessionId}
                  className="flex-1 min-h-[40px] max-h-32 resize-none rounded-md border-2 border-club-green/20 bg-white px-3 py-2 font-dm text-sm text-club-green placeholder:text-club-green/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-action-yellow focus-visible:border-action-yellow disabled:cursor-not-allowed disabled:opacity-50"
                  rows={1}
                  aria-describedby="chat-input-help"
                />
                <Button 
                  type="submit"
                  disabled={isLoading || !input.trim() || !activeSessionId}
                  className="bg-action-yellow hover:bg-action-yellow/90 text-club-green font-dm font-semibold self-end"
                  aria-label="Send message"
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
              <p id="chat-input-help" className="font-dm text-xs text-club-green/60">
                Try asking: "How many homes sold in Nanuet last quarter?" or "Best Google Ads strategy for HVAC in Rockland County?"
                <br />
                <span className="font-semibold">Press Enter to send, Shift+Enter for new line</span>
              </p>
            </form>
          </div>
        </CardContent>
      </Card>
  );
};

export default ChatWithControls;