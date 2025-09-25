import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User, Loader2, Plus, Menu, Volume2, Clipboard, Download, X, ChevronLeft } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { SubscriptionStatus } from '@/types/supabase';
import { SubscriptionBanner } from '@/components/SubscriptionBanner';
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import ChatSession from "@/components/ChatSession";
import MarkdownMessage from "@/components/MarkdownMessage";
import ChatSetup from "@/components/ChatSetup";
import SEOHead from "@/components/SEOHead";
import NewChatQuestionnaire from "@/components/NewChatQuestionnaire";
import PrefilledQuestions from "@/components/PrefilledQuestions";
import LanguageSelector from "@/components/LanguageSelector";
import IndustrySelector from "@/components/IndustrySelector";
import LocationInput from "@/components/LocationInput";
import ChatWithControls from "@/components/ChatWithControls";
import DashboardWithControls from "@/components/DashboardWithControls";
import DashboardHamburgerMenu from "@/components/DashboardHamburgerMenu";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { BarChart3, MessageSquare } from "lucide-react";

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
  const [subscriptionInfo, setSubscriptionInfo] = useState<SubscriptionStatus | null>(null);
  const [checkingAccess, setCheckingAccess] = useState(true);
  const [chatSessions, setChatSessions] = useState<ChatSessionData[]>([]);
  const [activeSessionId, setActiveSessionId] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [questionsOpen, setQuestionsOpen] = useState(true);
  const [historyOpen, setHistoryOpen] = useState(true);
  const { toast } = useToast();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [userLocation, setUserLocation] = useState<string>('');
  const [userLocationType, setUserLocationType] = useState<'zipcode' | 'county' | null>(null);
  const [userIndustry, setUserIndustry] = useState<string>('');
  const [userLanguage, setUserLanguage] = useState<string>('English');
  const [showSetup, setShowSetup] = useState(true);
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'chat' | 'dashboard'>('dashboard');
  const isMobile = useIsMobile();

  useEffect(() => {
    checkSubscriptionAccess();
  }, []);

  useEffect(() => {
    if (hasAccess && user) {
      loadChatSessions();
    }
  }, [hasAccess, user]);

  const checkSubscriptionAccess = async (showToast = false) => {
    setCheckingAccess(true);
    if (showToast) {
      toast({
        title: "Checking subscription status...",
        description: "Please wait while we verify your access.",
      });
    }
    
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

      if (error) {
        console.error('Subscription check error:', error);
        if (showToast) {
          toast({
            title: "Access check failed",
            description: "Unable to verify your subscription. Please try again or contact support.",
            variant: "destructive",
          });
        }
        throw error;
      }
      
      const subscriptionData = data as SubscriptionStatus & { is_trial_active?: boolean };
      setSubscriptionInfo(subscriptionData);
      
      // Enhanced access logic that handles both paid subscriptions AND active trials
      const hasValidAccess = subscriptionData.subscribed || subscriptionData.is_trial_active || false;
      
      if (hasValidAccess) {
        setHasAccess(true);
        if (showToast) {
          toast({
            title: "Access confirmed!",
            description: `You have access via ${subscriptionData.is_trial_active ? 'trial' : 'subscription'}.`,
          });
        }
        if (subscriptionData.is_trial_active) {
          console.log('User has active trial access');
        }
      } else {
        // Handle different subscription statuses
        const status = subscriptionData.subscription_status;
        const daysRemaining = subscriptionData.days_remaining || 0;
        
        // Grant access for processing subscriptions (incomplete/past_due) for recent payments
        if (status === 'incomplete' || status === 'past_due') {
          setHasAccess(true);
          if (showToast) {
            toast({
              title: "Subscription Processing",
              description: "Your subscription is being processed. You have temporary access.",
            });
          }
        }
        // Grant access for canceled subscriptions with remaining time
        else if (status === 'canceled' && daysRemaining > 0) {
          setHasAccess(true);
        }
        // Redirect to trial expired for truly expired subscriptions
        else if (status === 'canceled' && daysRemaining <= 0) {
          navigate('/ai/trial-expired');
          return;
        }
        // No access for other cases
        else {
          setHasAccess(false);
          if (showToast) {
            toast({
              title: "No active subscription",
              description: "Please complete your subscription to access the dashboard.",
              variant: "destructive",
            });
          }
        }
      }
    } catch (error) {
      console.error('Error checking subscription:', error);
      setHasAccess(false);
      setSubscriptionInfo(null);
      if (showToast) {
        toast({
          title: "Connection error",
          description: "Unable to connect to subscription service. Please check your internet connection.",
          variant: "destructive",
        });
      } else {
        toast({
          title: "Error",
          description: "Failed to verify subscription status. Please try refreshing the page.",
          variant: "destructive",
        });
      }
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

  const handleQuestionnaireComplete = (config: {
    location?: string;
    locationType?: 'zipcode' | 'county';
    industry?: string;
    language: string;
    initialQuestion?: string;
  }) => {
    setUserLocation(config.location || '');
    setUserLocationType(config.locationType || null);
    setUserIndustry(config.industry || '');
    setUserLanguage(config.language);
    setShowQuestionnaire(false);
    setShowSetup(false);
    
    // Create new chat session with full context
    createNewChatSessionWithContext(config);
  };

  const handleSkipSetup = () => {
    setShowQuestionnaire(false);
    setShowSetup(false);
    createNewChatSession();
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

  const createNewChatSessionWithContext = async (config: {
    location?: string;
    locationType?: 'zipcode' | 'county';
    industry?: string;
    language: string;
    initialQuestion?: string;
  }) => {
    try {
      const titleParts = [];
      if (config.location) titleParts.push(config.location);
      if (config.industry) titleParts.push(config.industry);
      const title = titleParts.length > 0 ? titleParts.join(' - ') : 'New Chat';

      const { data, error } = await supabase
        .from('chat_sessions')
        .insert([{ 
          user_id: user?.id, 
          title 
        }])
        .select()
        .single();

      if (error) throw error;
      
      setChatSessions(prev => [data, ...prev]);
      setActiveSessionId(data.id);
      
      // Create enhanced welcome message
      const welcomeParts = [];
      welcomeParts.push(`Hi! I'm your AI Copilot for contractor marketing in Hudson Valley.`);
      
      if (config.location && config.industry) {
        welcomeParts.push(`I see you're in the ${config.industry} business serving ${config.location}.`);
      } else if (config.location) {
        welcomeParts.push(`I see you're interested in the ${config.location} market.`);
      } else if (config.industry) {
        welcomeParts.push(`I see you're in the ${config.industry} business.`);
      }
      
      welcomeParts.push(`I can help you with local market data, marketing strategies, and specific tactics for your business.`);
      
      const welcomeMessage = {
        role: 'assistant' as const,
        content: welcomeParts.join(' ')
      };
      
      const initialMessages: Message[] = [welcomeMessage];
      
      // If there's an initial question, add it and get AI response
      if (config.initialQuestion) {
        const userMessage: Message = { role: 'user', content: config.initialQuestion };
        initialMessages.push(userMessage);
        
        // Save the initial question to database
        await supabase
          .from('chat_messages')
          .insert([{ 
            session_id: data.id, 
            role: 'user', 
            content: config.initialQuestion 
          }]);
        
        // Get AI response for the initial question
        await getInitialAIResponse(data.id, config, initialMessages);
      } else {
        setMessages(initialMessages);
      }
    } catch (error) {
      console.error('Error creating new chat session:', error);
      toast({
        title: "Error",
        description: "Failed to create new chat session.",
        variant: "destructive",
      });
    }
  };

  const getInitialAIResponse = async (sessionId: string, config: any, messages: any[]) => {
    try {
      const userContext = {
        location: config.location,
        locationType: config.locationType,
        industry: config.industry,
        language: config.language
      };

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { messages, userContext },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) throw error;

      if (data.choices && data.choices[0]) {
        const assistantMessage = {
          role: 'assistant' as const,
          content: data.choices[0].message.content
        };
        
        const finalMessages = [...messages, assistantMessage];
        setMessages(finalMessages);
        
        // Save assistant message to database
        await supabase
          .from('chat_messages')
          .insert([{ 
            session_id: sessionId, 
            role: 'assistant', 
            content: assistantMessage.content 
          }]);
      }
    } catch (error) {
      console.error('Error getting initial AI response:', error);
      setMessages(messages); // Just show the messages without AI response
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
      const userContext = {
        location: userLocation || undefined,
        locationType: userLocationType || undefined,
        industry: userIndustry || undefined,
        language: userLanguage
      };

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { messages: enhancedMessages, userContext },
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
    const content = messages.map(m => `${m.role === 'user' ? 'You' : 'AI'}: ${m.content}`).join('\n\n');
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `ai-copilot-${new Date().toISOString().split('T')[0]}.txt`;
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
    <div className="pt-20 min-h-screen bg-background">
      <SEOHead
        title="AI Copilot Dashboard | Hudson Valley Consulting"
        description="Access your AI Copilot conversations and local marketing insights."
        canonicalUrl="/ai/dashboard"
      />
      
      {/* Main Content Container */}
      <div className="flex flex-col min-h-screen pt-20">
        {/* Header with Menu and Toggle */}
        <header className="border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-20 z-30">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Left side - Menu and Title */}
            <div className="flex items-center gap-4">
              <DashboardHamburgerMenu
                user={user}
                userLocation={userLocation}
                userLocationType={userLocationType}
                userIndustry={userIndustry}
                userLanguage={userLanguage}
                settingsOpen={settingsOpen}
                questionsOpen={questionsOpen}
                historyOpen={historyOpen}
                chatSessions={chatSessions}
                activeSessionId={activeSessionId}
                isMobile={isMobile}
                onSettingsOpenChange={setSettingsOpen}
                onQuestionsOpenChange={setQuestionsOpen}
                onHistoryOpenChange={setHistoryOpen}
                onLocationChange={(location, type) => {
                  setUserLocation(location);
                  setUserLocationType(type);
                }}
                onIndustryChange={setUserIndustry}
                onLanguageChange={setUserLanguage}
                onQuestionSelect={(question) => {
                  setInput(question);
                  setViewMode('chat');
                }}
                onNewChat={() => {
                  setShowQuestionnaire(true);
                  setActiveSessionId(null);
                  setMessages([]);
                }}
                onChatSessionSelect={(sessionId) => {
                  switchChatSession(sessionId);
                  setShowQuestionnaire(false);
                  setShowSetup(false);
                }}
                onDeleteChatSession={deleteChatSession}
              />
              
              <div className="hidden md:block">
                <h1 className="text-lg font-semibold">Hudson Valley Consulting</h1>
              </div>
            </div>

            {/* Right side - View Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex bg-muted rounded-lg p-1" role="tablist">
                <Button
                  variant={viewMode === 'dashboard' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('dashboard')}
                  className="h-8 px-3 flex items-center gap-2"
                  role="tab"
                  aria-selected={viewMode === 'dashboard'}
                >
                  <BarChart3 className="h-4 w-4" />
                  <span className="hidden sm:inline">Dashboard</span>
                </Button>
                <Button
                  variant={viewMode === 'chat' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('chat')}
                  className="h-8 px-3 flex items-center gap-2"
                  role="tab"
                  aria-selected={viewMode === 'chat'}
                >
                  <MessageSquare className="h-4 w-4" />
                  <span className="hidden sm:inline">Chat</span>
                </Button>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="flex-1" role="main">
          {showQuestionnaire ? (
            <NewChatQuestionnaire 
              onSetupComplete={handleQuestionnaireComplete}
              onSkipSetup={handleSkipSetup}
            />
          ) : shouldShowSetup ? (
            <ChatSetup onSetupComplete={handleSetupComplete} />
          ) : (
            <>
              {subscriptionInfo && (
                <div className="space-y-3">
                  <SubscriptionBanner subscriptionStatus={subscriptionInfo} />
                  {(!subscriptionInfo.subscribed && !subscriptionInfo.is_trial_active) && (
                    <div className="mx-6 p-3 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-blue-800">
                          <strong>Just completed payment?</strong> Your subscription may still be processing.
                        </div>
                        <Button
                          onClick={() => checkSubscriptionAccess(true)}
                          disabled={checkingAccess}
                          size="sm"
                          variant="outline"
                          className="border-blue-300 text-blue-700 hover:bg-blue-100"
                        >
                          {checkingAccess ? (
                            <>
                              <Loader2 className="h-3 w-3 animate-spin mr-1" />
                              Checking...
                            </>
                          ) : (
                            'Refresh Status'
                          )}
                        </Button>
                      </div>
                    </div>
                  )}
                </div>
              )}
              
              {/* Dashboard Title */}
              <div className="container mx-auto px-4 pt-6 pb-2">
                <h1 className="text-2xl md:text-3xl font-bold mb-2">Market Intelligence Dashboard</h1>
                <p className="text-muted-foreground">
                  Real-time insights for {userIndustry} businesses in {userLocation || 'Hudson Valley'}
                </p>
              </div>

              {/* Content Area */}
              <div className="container mx-auto px-4 pb-6">
                {viewMode === 'dashboard' ? (
                  <DashboardWithControls
                    userLocation={userLocation || 'Hudson Valley'}
                    userLocationType={userLocationType}
                    userIndustry={userIndustry || 'Construction'}
                    className="max-w-7xl mx-auto"
                  />
                ) : (
                  <div className="max-w-4xl mx-auto">
                    <ChatWithControls
                      messages={messages}
                      input={input}
                      isLoading={isLoading}
                      activeSessionId={activeSessionId}
                      userLocation={userLocation}
                      userLocationType={userLocationType}
                      userIndustry={userIndustry}
                      userLanguage={userLanguage}
                      sidebarOpen={false}
                      onInputChange={setInput}
                      onSendMessage={sendMessage}
                      onKeyPress={handleKeyPress}
                      onToggleSidebar={() => setViewMode('dashboard')}
                      isMobile={isMobile}
                      onLocationChange={(location, type) => {
                        setUserLocation(location);
                        setUserLocationType(type);
                      }}
                      onIndustryChange={setUserIndustry}
                      onLanguageChange={setUserLanguage}
                      onQuestionSelect={(question) => {
                        setInput(question);
                      }}
                      onExportTranscript={exportTranscript}
                      onCopyMessage={copyMessage}
                    />
                  </div>
                )}
              </div>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default AIDashboard;
