import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Loader2, Plus, Menu, Volume2, Clipboard, Download } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import ChatSession from "@/components/ChatSession";
import MarkdownMessage from "@/components/MarkdownMessage";
import ChatSetup from "@/components/ChatSetup";
import SEOHead from "@/components/SEOHead";

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

interface ChatSessionData {
  id: string;
  title: string;
  created_at: string;
}

const AIDashboard: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [hasAccess, setHasAccess] = useState(false);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [chatSessions, setChatSessions] = useState<ChatSessionData[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userLocation, setUserLocation] = useState<string>('');
  const [userLocationType, setUserLocationType] = useState<'zipcode' | 'county' | null>(null);
  const [showSetup, setShowSetup] = useState(true);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  useEffect(() => {
    checkSubscriptionAccess();
  }, []);

  useEffect(() => {
    if (hasAccess && user) {
      loadChatSessions();
    }
  }, [hasAccess, user]);

  const checkSubscriptionAccess = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        navigate("/auth");
        return;
      }

      const { data, error } = await supabase.functions.invoke('check-subscription', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) throw error;

      if (data.subscribed) {
        setHasAccess(true);
      } else {
        setHasAccess(false);
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      toast({
        title: "Error",
        description: "Failed to verify subscription status.",
        variant: "destructive",
      });
    } finally {
      setCheckingAccess(false);
    }
  };

  const loadChatSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .select('*')
        .order('updated_at', { ascending: false });

      if (error) throw error;
      setChatSessions(data || []);
      
      // If no active session and we have sessions, select the first one
      if (!activeSessionId && data && data.length > 0) {
        setActiveSessionId(data[0].id);
        loadChatMessages(data[0].id);
      }
    } catch (error) {
      console.error('Error loading chat sessions:', error);
    }
  };

  const loadChatMessages = async (sessionId: string) => {
    try {
      const { data, error } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', sessionId)
        .order('created_at', { ascending: true });

      if (error) throw error;
      
      const sessionMessages = data?.map(msg => ({
        role: msg.role as 'user' | 'assistant' | 'system',
        content: msg.content
      })) || [];

      // Add welcome message if it's a new session with no messages
      if (sessionMessages.length === 0) {
        setMessages([{
          role: 'assistant',
          content: "Hi! I'm your AI Copilot for contractor marketing in Hudson Valley. Ask me about local market data, marketing strategies, or specific tactics for your business. For example, try asking: 'How many homes sold in my area last quarter?' or 'What's the best way to market HVAC services in Rockland County?'"
        }]);
      } else {
        setMessages(sessionMessages);
      }
    } catch (error) {
      console.error('Error loading chat messages:', error);
    }
  };

  const createNewChatSession = async () => {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert([{ user_id: user?.id, title: 'New Chat' }])
        .select()
        .single();

      if (error) throw error;
      
      setChatSessions(prev => [data, ...prev]);
      setActiveSessionId(data.id);
      setMessages([{
        role: 'assistant',
        content: "Hi! I'm your AI Copilot for contractor marketing in Hudson Valley. Ask me about local market data, marketing strategies, or specific tactics for your business."
      }]);
    } catch (error) {
      console.error('Error creating new chat session:', error);
      toast({
        title: "Error",
        description: "Failed to create new chat session.",
        variant: "destructive",
      });
    }
  };

  const deleteChatSession = async (sessionId: string) => {
    try {
      const { error } = await supabase
        .from('chat_sessions')
        .delete()
        .eq('id', sessionId);

      if (error) throw error;
      
      setChatSessions(prev => prev.filter(session => session.id !== sessionId));
      
      if (activeSessionId === sessionId) {
        const remainingSessions = chatSessions.filter(session => session.id !== sessionId);
        if (remainingSessions.length > 0) {
          setActiveSessionId(remainingSessions[0].id);
          loadChatMessages(remainingSessions[0].id);
        } else {
          setActiveSessionId(null);
          setMessages([]);
        }
      }
    } catch (error) {
      console.error('Error deleting chat session:', error);
      toast({
        title: "Error",
        description: "Failed to delete chat session.",
        variant: "destructive",
      });
    }
  };

  const updateSessionTitle = async (sessionId: string, firstMessage: string) => {
    try {
      const title = firstMessage.slice(0, 50) + (firstMessage.length > 50 ? '...' : '');
      const { error } = await supabase
        .from('chat_sessions')
        .update({ title, updated_at: new Date().toISOString() })
        .eq('id', sessionId);

      if (error) throw error;
      
      setChatSessions(prev => prev.map(session => 
        session.id === sessionId ? { ...session, title } : session
      ));
    } catch (error) {
      console.error('Error updating session title:', error);
    }
  };

  const handleSetupComplete = (location: string, locationType: 'zipcode' | 'county') => {
    setUserLocation(location);
    setUserLocationType(locationType);
    setShowSetup(false);
    
    // Create a new chat session with location context
    createNewChatSessionWithLocation(location, locationType);
  };

  const createNewChatSessionWithLocation = async (location: string, locationType: 'zipcode' | 'county') => {
    try {
      const { data, error } = await supabase
        .from('chat_sessions')
        .insert([{ 
          user_id: user?.id, 
          title: `${locationType === 'zipcode' ? 'ZIP' : 'County'}: ${location}` 
        }])
        .select()
        .single();

      if (error) throw error;
      
      setChatSessions(prev => [data, ...prev]);
      setActiveSessionId(data.id);
      
      // Create location-aware welcome message
      const welcomeMessage = {
        role: 'assistant' as const,
        content: `Hi! I'm your AI Copilot for contractor marketing in Hudson Valley. I see you're interested in ${location}. I can help you with local market data, marketing strategies, and specific tactics for your business in this area. 

What would you like to know about ${location}? For example:
- "How many homes sold in ${location} last quarter?"
- "Best marketing strategies for HVAC services in ${location}"
- "Local demographics and market trends for ${location}"`
      };
      
      setMessages([welcomeMessage]);
    } catch (error) {
      console.error('Error creating new chat session:', error);
      toast({
        title: "Error",
        description: "Failed to create new chat session.",
        variant: "destructive",
      });
    }
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading || !activeSessionId) return;

    const userMessage: Message = { role: 'user', content: input };
    
    // Create enhanced messages with location context
    const locationContext = userLocation && userLocationType 
      ? `\n\nUser's service area: ${userLocation} (${userLocationType}). Please provide location-specific insights and recommendations when relevant.`
      : '';
    
    const enhancedMessages = [...messages, userMessage];
    
    // Add location context to the first user message if we have location data
    if (userLocation && enhancedMessages.length <= 2) {
      enhancedMessages[enhancedMessages.length - 1] = {
        ...userMessage,
        content: userMessage.content + locationContext
      };
    }
    
    setMessages([...messages, userMessage]);
    
    // Save user message to database
    try {
      await supabase
        .from('chat_messages')
        .insert([{ 
          session_id: activeSessionId, 
          role: 'user', 
          content: input 
        }]);
    } catch (error) {
      console.error('Error saving user message:', error);
    }

    // Update session title if it's the first message
    if (messages.length <= 1) {
      updateSessionTitle(activeSessionId, input);
    }

    setInput("");
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { messages: enhancedMessages },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) throw error;

      if (data.choices && data.choices[0]) {
        const assistantMessage: Message = {
          role: 'assistant',
          content: data.choices[0].message.content
        };
        
        setMessages([...enhancedMessages, assistantMessage]);
        
        // Save assistant message to database
        try {
          await supabase
            .from('chat_messages')
            .insert([{ 
              session_id: activeSessionId, 
              role: 'assistant', 
              content: assistantMessage.content 
            }]);
        } catch (error) {
          console.error('Error saving assistant message:', error);
        }
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const speakReply = async (text: string, index: number) => {
    try {
      setPlayingIndex(index);
      const session = (await supabase.auth.getSession()).data.session;
      const { data, error } = await supabase.functions.invoke('elevenlabs-tts', {
        body: { text, voiceId: '9BWtsMINqrJLrRacOk9x' },
        headers: session ? { Authorization: `Bearer ${session.access_token}` } : undefined,
      });
      if (error) throw error;
      const audio = new Audio(`data:audio/mpeg;base64,${data.audioBase64}`);
      audio.onended = () => setPlayingIndex(null);
      await audio.play();
    } catch (err) {
      console.error('TTS error', err);
      setPlayingIndex(null);
      toast({ title: 'Text-to-speech failed', description: 'Please try again.', variant: 'destructive' });
    }
  };

  const copyMessage = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({ title: 'Copied to clipboard' });
    } catch (e) {
      toast({ title: 'Copy failed', variant: 'destructive' });
    }
  };

  const exportTranscript = () => {
    const md = messages.map(m => `## ${m.role === 'user' ? 'You' : 'AI'}\n\n${m.content}\n`).join('\n');
    const blob = new Blob([md], { type: 'text/markdown;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-copilot-${new Date().toISOString()}.md`;
    a.click();
    URL.revokeObjectURL(url);
  };
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  const switchChatSession = (sessionId: string) => {
    setActiveSessionId(sessionId);
    loadChatMessages(sessionId);
  };

  // Show setup if it's a new session or no location is set
  const shouldShowSetup = showSetup && (!activeSessionId || messages.length === 0);

  if (checkingAccess) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <SEOHead
          title="AI Copilot Dashboard | Hudson Valley Consulting"
          description="Access your AI Copilot conversations and local marketing insights."
          canonicalUrl="/ai/dashboard"
        />
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
          <p>Checking subscription access...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="pt-20 min-h-screen flex items-center justify-center">
        <SEOHead
          title="AI Copilot Dashboard | Hudson Valley Consulting"
          description="Access your AI Copilot conversations and local marketing insights."
          canonicalUrl="/ai/dashboard"
        />
        <Card className="max-w-md mx-auto">
          <CardContent className="p-8 text-center">
            <Bot className="h-12 w-12 mx-auto mb-4 text-gray-400" />
            <h2 className="text-2xl font-bold mb-4">Subscription Required</h2>
            <p className="text-gray-600 mb-6">
              You need an active AI Copilot subscription to access this feature.
            </p>
            <Button 
              onClick={() => navigate("/resources/ai-copilot")}
              className="bg-purple-600 hover:bg-purple-700"
            >
              Subscribe Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="pt-20 h-screen bg-gray-50 flex flex-col">
      <SEOHead
        title="AI Copilot Dashboard | Hudson Valley Consulting"
        description="Access your AI Copilot conversations and local marketing insights."
        canonicalUrl="/ai/dashboard"
      />
      <div className="flex-1 flex overflow-hidden">
        {/* Sidebar */}
        <div className={`${sidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 bg-white border-r border-gray-200 flex flex-col overflow-hidden`}>
          <div className="p-4 border-b border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-900">Chat History</h2>
              <Button 
                onClick={() => {
                  setShowSetup(true);
                  setActiveSessionId(null);
                  setMessages([]);
                }} 
                size="sm" 
                className="bg-purple-600 hover:bg-purple-700"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            {user && (
              <div className="flex items-center space-x-3 p-2 bg-gray-50 rounded-lg">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user.user_metadata?.avatar_url} />
                  <AvatarFallback>
                    {user.email?.charAt(0).toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {user.user_metadata?.full_name || user.email}
                  </p>
                  <p className="text-xs text-gray-500 truncate">{user.email}</p>
                </div>
              </div>
            )}
          </div>
          
          <ScrollArea className="flex-1">
            <div className="p-4 space-y-2">
              {chatSessions.map((session) => (
                <ChatSession
                  key={session.id}
                  id={session.id}
                  title={session.title}
                  isActive={activeSessionId === session.id}
                  onClick={() => switchChatSession(session.id)}
                  onDelete={() => deleteChatSession(session.id)}
                  createdAt={session.created_at}
                />
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Main Chat Area */}
        <div className="flex-1 flex flex-col min-w-0">
          {shouldShowSetup ? (
            <ChatSetup onSetupComplete={handleSetupComplete} />
          ) : (
            <Card className="flex-1 flex flex-col m-4 shadow-sm min-h-0">
              <CardHeader className="border-b bg-white rounded-t-lg flex-shrink-0">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => setSidebarOpen(!sidebarOpen)}
                      className="mr-3"
                    >
                      <Menu className="h-4 w-4" />
                    </Button>
                    <Bot className="h-6 w-6 mr-2 text-purple-600" />
                    AI Copilot for Contractors
                    {userLocation && (
                      <span className="ml-3 text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {userLocation}
                      </span>
                    )}
                  </CardTitle>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm" onClick={exportTranscript}>
                      <Download className="h-4 w-4 mr-1" /> Export
                    </Button>
                  </div>
                </div>
              </CardHeader>
              
              <CardContent className="flex-1 flex flex-col p-0 min-h-0">
{/* Voice support handled by global ElevenLabs widget */}
                {/* Messages Area */}
                <ScrollArea className="flex-1 p-6">
                  <div className="space-y-4">
                    {messages.map((message, index) => (
                      <div key={index} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`flex max-w-3xl ${message.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                          <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center ${
                            message.role === 'user' ? 'bg-blue-500 ml-2' : 'bg-purple-500 mr-2'
                          }`}>
                            {message.role === 'user' ? (
                              <User className="h-4 w-4 text-white" />
                            ) : (
                              <Bot className="h-4 w-4 text-white" />
                            )}
                          </div>
                          <div className={`rounded-lg px-4 py-2 ${
                            message.role === 'user' 
                              ? 'bg-blue-500 text-white' 
                              : 'bg-gray-100 text-gray-900'
                          }`}>
                            <MarkdownMessage 
                              content={message.content} 
                              isUser={message.role === 'user'}
                            />
                            <div className="mt-2 flex items-center gap-3">
                              {message.role !== 'user' && (
                                <button
                                  onClick={() => speakReply(message.content, index)}
                                  className="inline-flex items-center text-xs text-purple-700 hover:underline"
                                  aria-label="Listen to reply"
                                >
                                  <Volume2 className="h-3 w-3 mr-1" /> {playingIndex === index ? 'Playing…' : 'Listen'}
                                </button>
                              )}
                              <button
                                onClick={() => copyMessage(message.content)}
                                className="inline-flex items-center text-xs text-gray-600 hover:underline"
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
                          <div className="flex-shrink-0 w-8 h-8 rounded-full bg-purple-500 mr-2 flex items-center justify-center">
                            <Bot className="h-4 w-4 text-white" />
                          </div>
                          <div className="bg-gray-100 rounded-lg px-4 py-2">
                            <div className="flex items-center space-x-1">
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                              <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </ScrollArea>
                
                {/* Input Area */}
                <div className="border-t p-4 bg-white rounded-b-lg flex-shrink-0">
                  <div className="flex space-x-2">
                    <Input
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="Ask about local market data or marketing strategies..."
                      disabled={isLoading || !activeSessionId}
                      className="flex-1"
                    />
                    <Button 
                      onClick={sendMessage}
                      disabled={isLoading || !input.trim() || !activeSessionId}
                      className="bg-purple-600 hover:bg-purple-700"
                    >
                      <Send className="h-4 w-4" />
                    </Button>
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    Try asking: "How many homes sold in Nanuet last quarter?" or "Best Google Ads strategy for HVAC in Rockland County?"
                  </p>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default AIDashboard;
