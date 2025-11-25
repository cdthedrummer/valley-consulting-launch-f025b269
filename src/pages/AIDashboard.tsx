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
import ChatSidebar from "@/components/ChatSidebar";
import OnboardingReminderBanner from "@/components/OnboardingReminderBanner";
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
  const [userMarketingGoal, setUserMarketingGoal] = useState<string>('');
  const [userMonthlyBudget, setUserMonthlyBudget] = useState<string>('');
  const [userIdealCustomers, setUserIdealCustomers] = useState<string>('');
  const [showSetup, setShowSetup] = useState(true);
  const [showQuestionnaire, setShowQuestionnaire] = useState(() => {
    // Show questionnaire by default for first-time users
    const hasCompletedSetup = localStorage.getItem('hasCompletedInitialSetup');
    return !hasCompletedSetup;
  });
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [viewMode, setViewMode] = useState<'chat' | 'dashboard'>('dashboard');
  const [showOnboardingReminder, setShowOnboardingReminder] = useState(() => {
    const dismissedReminder = localStorage.getItem('dismissedOnboardingReminder');
    return dismissedReminder !== 'true';
  });
  const [requestCount, setRequestCount] = useState<number>(0);
  const [maxRequests, setMaxRequests] = useState<number>(200);
  const [savedBusinessProfile, setSavedBusinessProfile] = useState<any>(null);
  const [isLoadingProfile, setIsLoadingProfile] = useState<boolean>(true);
  const [userBusinessName, setUserBusinessName] = useState<string>('');
  const isMobile = useIsMobile();

  // Save state to sessionStorage to persist across external link clicks
  useEffect(() => {
    if (userLocation || userIndustry || userBusinessName) {
      sessionStorage.setItem('dashboardState', JSON.stringify({
        location: userLocation,
        industry: userIndustry,
        businessName: userBusinessName
      }));
    }
  }, [userLocation, userIndustry, userBusinessName]);

  useEffect(() => {
    checkSubscriptionAccess();
  }, []);

  useEffect(() => {
    if (hasAccess && user) {
      loadChatSessions();
      loadBusinessProfile();
    }
  }, [hasAccess, user]);

  const loadBusinessProfile = async () => {
    setIsLoadingProfile(true);
    try {
      // Try to restore from sessionStorage first
      const savedState = sessionStorage.getItem('dashboardState');
      if (savedState) {
        const state = JSON.parse(savedState);
        if (state.location) setUserLocation(state.location);
        if (state.industry) setUserIndustry(state.industry);
        if (state.businessName) setUserBusinessName(state.businessName);
      }

      const { data, error } = await supabase
        .from('business_profiles')
        .select('*')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (error) {
        console.error('Error loading business profile:', error);
        setIsLoadingProfile(false);
        return;
      }

      if (data) {
        setSavedBusinessProfile(data);
        // Auto-populate context from saved profile
        setUserLocation(data.location || '');
        setUserLocationType(data.location?.match(/^\d{5}$/) ? 'zipcode' : 'county');
        setUserIndustry(data.industry || '');
        setUserBusinessName(data.business_name || '');
        setUserMarketingGoal(data.marketing_goal || '');
        setUserMonthlyBudget(data.monthly_budget || '');
        setUserIdealCustomers(data.ideal_customers || '');
        
        // Skip questionnaire if we have saved data
        setShowQuestionnaire(false);
        setShowSetup(false);
        localStorage.setItem('hasCompletedInitialSetup', 'true');
      }
    } catch (error) {
      console.error('Error in loadBusinessProfile:', error);
    } finally {
      setIsLoadingProfile(false);
    }
  };

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

  const handleQuestionnaireComplete = async (config: {
    location?: string;
    locationType?: 'zipcode' | 'county';
    industry?: string;
    language: string;
    initialQuestion?: string;
    businessProfile?: {
      business_name?: string;
      website_url?: string;
      years_in_business?: number;
      service_radius?: number;
      marketing_goal?: string;
      monthly_budget?: string;
      ideal_customers?: string;
    };
  }) => {
    setUserLocation(config.location || '');
    setUserLocationType(config.locationType || null);
    setUserIndustry(config.industry || '');
    setUserLanguage(config.language);
    
    // Store advanced marketing context
    if (config.businessProfile) {
      setUserMarketingGoal(config.businessProfile.marketing_goal || '');
      setUserMonthlyBudget(config.businessProfile.monthly_budget || '');
      setUserIdealCustomers(config.businessProfile.ideal_customers || '');
    }
    
    setShowQuestionnaire(false);
    setShowSetup(false);
    
    // Mark setup as completed
    localStorage.setItem('hasCompletedInitialSetup', 'true');
    
    // Save or update business profile with all data
    const profileData = {
      location: config.location,
      industry: config.industry,
      ...config.businessProfile,
    };

    try {
      const { data: existingProfile } = await supabase
        .from('business_profiles')
        .select('id')
        .eq('user_id', user?.id)
        .maybeSingle();

      if (existingProfile) {
        // Update existing profile
        await supabase
          .from('business_profiles')
          .update(profileData)
          .eq('user_id', user?.id);
      } else {
        // Insert new profile
        await supabase
          .from('business_profiles')
          .insert([{ user_id: user?.id, ...profileData }]);
      }

      // Reload the saved profile
      await loadBusinessProfile();
      
      toast({
        title: "Profile saved!",
        description: "Your business profile has been saved successfully.",
      });
    } catch (error) {
      console.error('Error saving business profile:', error);
    }
    
    // If business profile data is provided, enrich it
    if (config.businessProfile && (
      config.businessProfile.business_name || 
      config.businessProfile.website_url
    )) {
      try {
        const { error } = await supabase.functions.invoke('enrich-business', {
          body: config.businessProfile
        });

        if (error) {
          console.error('Error enriching business profile:', error);
        }
      } catch (error) {
        console.error('Error calling enrich-business:', error);
      }
    }
    
    // Create new chat session with full context
    createNewChatSessionWithContext(config);
  };

  const handleSkipSetup = () => {
    setShowQuestionnaire(false);
    setShowSetup(false);
    // Mark setup as skipped and show reminder banner
    localStorage.setItem('hasCompletedInitialSetup', 'true');
    localStorage.setItem('skippedInitialSetup', 'true');
    setShowOnboardingReminder(true);
    createNewChatSession();
  };

  const handleDismissOnboardingReminder = () => {
    setShowOnboardingReminder(false);
    localStorage.setItem('dismissedOnboardingReminder', 'true');
  };

  const handleOpenSettingsFromBanner = () => {
    setShowOnboardingReminder(false);
    setShowQuestionnaire(true);
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

  const sendMessage = async (overrideText?: string) => {
    const text = (overrideText ?? input).trim();
    if (!text || isLoading) return;
    if (!activeSessionId) {
      // Create a session automatically if missing
      await createNewChatSession();
      // Wait a tick for state to update
      await new Promise(r => setTimeout(r, 50));
    }
    if (!activeSessionId) return; // safety

    const userMessage: Message = { role: 'user', content: text };
    
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
          content: text 
        }]);
    } catch (error) {
      console.error('Error saving user message:', error);
    }

    // Update session title if it's the first message
    if (messages.length <= 1) {
      updateSessionTitle(activeSessionId, text);
    }

    setInput("");
    setIsLoading(true);

    try {
      const userContext = {
        location: userLocation || savedBusinessProfile?.location || undefined,
        locationType: userLocationType || undefined,
        industry: userIndustry || savedBusinessProfile?.industry || undefined,
        language: userLanguage,
        marketingGoal: userMarketingGoal || savedBusinessProfile?.marketing_goal || undefined,
        monthlyBudget: userMonthlyBudget || savedBusinessProfile?.monthly_budget || undefined,
        idealCustomers: userIdealCustomers || savedBusinessProfile?.ideal_customers || undefined,
        businessName: savedBusinessProfile?.business_name || undefined,
        yearsInBusiness: savedBusinessProfile?.years_in_business || undefined,
        serviceRadius: savedBusinessProfile?.service_radius || undefined,
      };

      const { data, error } = await supabase.functions.invoke('ai-chat', {
        body: { messages: enhancedMessages, userContext },
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) throw error;

      // Update rate limit info if available
      if (data.rateLimit) {
        setRequestCount(data.rateLimit.requestCount);
        setMaxRequests(data.rateLimit.maxRequests);
      }

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
    } catch (error: any) {
      console.error('Error sending message:', error);
      
      // Extract specific error message
      let errorMessage = "Failed to send message. Please try again.";
      let errorTitle = "Error";
      
      if (error?.message) {
        // Check for rate limit error
        if (error.message.includes('Too many requests') || error.message.includes('429')) {
          errorTitle = "Rate Limit Reached";
          errorMessage = "You've reached the hourly message limit. Please wait a bit before sending more messages.";
        } 
        // Check for subscription errors
        else if (error.message.includes('subscription') || error.message.includes('402')) {
          errorTitle = "Subscription Required";
          errorMessage = "Your subscription has expired. Please renew to continue using AI Copilot.";
        }
        // Use the actual error message if available
        else if (typeof error.message === 'string') {
          errorMessage = error.message;
        }
      }
      
      toast({
        title: errorTitle,
        description: errorMessage,
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

  const handleChatWithPlan = async (planContent: string) => {
    // Ensure there's an active session
    if (!activeSessionId) {
      await createNewChatSession();
      await new Promise(r => setTimeout(r, 50));
    }
    // Switch to chat mode and send immediately using override
    setViewMode('chat');
    setInput('');
    await sendMessage(planContent);
  };

  // Show setup if it's a new session or no location is set
  const shouldShowSetup = showSetup && (!activeSessionId || messages.length === 0);

  if (checkingAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-club-green">
        <SEOHead
          title="AI Copilot Dashboard | Hudson Valley Consulting"
          description="Access your AI Copilot conversations and local marketing insights."
          canonicalUrl="/ai/dashboard"
        />
        <div className="text-center">
          <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-action-yellow" />
          <p className="font-dm text-warm-cream">Checking subscription access...</p>
        </div>
      </div>
    );
  }

  if (!hasAccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-club-green">
        <SEOHead
          title="AI Copilot Dashboard | Hudson Valley Consulting"
          description="Access your AI Copilot conversations and local marketing insights."
          canonicalUrl="/ai/dashboard"
        />
        <Card className="max-w-md mx-auto bg-warm-cream border-2 border-action-yellow/30 shadow-lg">
          <CardContent className="p-8 text-center">
            <Bot className="h-12 w-12 mx-auto mb-4 text-action-yellow" />
            <h2 className="font-archivo text-2xl uppercase tracking-wide mb-4 text-club-green">Subscription Required</h2>
            <p className="font-dm text-club-green/70 mb-6">
              You need an active AI Copilot subscription to access this feature.
            </p>
            <Button 
              onClick={() => navigate("/resources/ai-copilot")}
              className="bg-action-yellow hover:bg-action-yellow/90 text-club-green font-bold"
            >
              Subscribe Now
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-club-green">
      <SEOHead
        title="AI Copilot Dashboard | Hudson Valley Consulting"
        description="Access your AI Copilot conversations and local marketing insights."
        canonicalUrl="/ai/dashboard"
      />
      
      {/* Main Content Container */}
      <div className="flex flex-col min-h-screen">
        {/* Header with Menu and Toggle */}
        <header className="border-b-2 border-action-yellow/30 bg-club-green sticky top-0 z-30 shadow-lg">
          <div className="container mx-auto px-4 h-16 flex items-center justify-between">
            {/* Left side - Menu and Title */}
            <div className="flex items-center gap-4">
              {/* Hamburger menu - only on mobile */}
              {isMobile && (
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
              )}
              
              <div className="hidden md:block">
                <h1 className="font-archivo text-lg uppercase tracking-wide text-warm-cream">Hudson Valley Consulting</h1>
              </div>
            </div>

            {/* Right side - View Toggle */}
            <div className="flex items-center gap-2">
              <div className="flex bg-warm-cream/10 rounded-lg p-1 border border-action-yellow/30" role="tablist">
                <Button
                  variant={viewMode === 'dashboard' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('dashboard')}
                  className={cn(
                    "h-8 px-3 flex items-center gap-2 font-dm font-medium transition-all",
                    viewMode === 'dashboard' 
                      ? "bg-action-yellow text-club-green hover:bg-action-yellow/90" 
                      : "text-warm-cream hover:bg-warm-cream/10 hover:text-action-yellow"
                  )}
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
                  className={cn(
                    "h-8 px-3 flex items-center gap-2 font-dm font-medium transition-all",
                    viewMode === 'chat' 
                      ? "bg-action-yellow text-club-green hover:bg-action-yellow/90" 
                      : "text-warm-cream hover:bg-warm-cream/10 hover:text-action-yellow"
                  )}
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

        {/* Main Content with Sidebar */}
        <main className="flex-1 flex overflow-hidden" role="main">
          {/* Desktop Sidebar - Always visible on larger screens */}
          {!isMobile && !showQuestionnaire && !shouldShowSetup && (
            <ChatSidebar
              userLocation={userLocation}
              userLocationType={userLocationType}
              userIndustry={userIndustry}
              userLanguage={userLanguage}
              chatSessions={chatSessions}
              activeSessionId={activeSessionId}
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
                setViewMode('chat');
              }}
              onDeleteChatSession={deleteChatSession}
              className="w-64 flex-shrink-0 hidden lg:flex"
            />
          )}

          {/* Main Content Area */}
          <div className="flex-1 flex flex-col overflow-hidden">
            {showQuestionnaire ? (
              <div className="flex-1 overflow-y-auto">
                <NewChatQuestionnaire 
                  onSetupComplete={handleQuestionnaireComplete}
                  onSkipSetup={handleSkipSetup}
                />
              </div>
            ) : shouldShowSetup ? (
              <div className="flex-1 overflow-y-auto">
                <ChatSetup onSetupComplete={handleSetupComplete} />
              </div>
            ) : (
              <>
            {/* Onboarding Reminder Banner - Always Show at Top (above dashboard title) */}
            {viewMode === 'dashboard' && (
              <OnboardingReminderBanner
                currentLocation={userLocation}
                currentIndustry={userIndustry}
                businessName={userBusinessName}
                hasLocationData={!!userLocation && userLocation.trim() !== ''}
                hasIndustryData={!!userIndustry && userIndustry.trim() !== ''}
                onLocationChange={async (location, type) => {
                  setUserLocation(location);
                  setUserLocationType(type);
                  
                  // Update sessionStorage for persistence
                  sessionStorage.setItem('userLocation', location);
                  
                  if (user) {
                    try {
                      const { error } = await supabase
                        .from('business_profiles')
                        .upsert({
                          user_id: user.id,
                          location,
                          updated_at: new Date().toISOString()
                        }, {
                          onConflict: 'user_id'
                        });

                      if (error) throw error;
                      
                      // Reload profile to refresh all state including business name
                      await loadBusinessProfile();
                      
                      toast({
                        title: "Location saved",
                        description: "Your business location has been updated. Chat will now use this location.",
                      });
                    } catch (error) {
                      console.error('Error saving location:', error);
                      toast({
                        title: "Error",
                        description: "Failed to save location. Please try again.",
                        variant: "destructive",
                      });
                    }
                  }
                }}
                onIndustryChange={async (industry) => {
                  setUserIndustry(industry);
                  
                  // Update sessionStorage for persistence
                  sessionStorage.setItem('userIndustry', industry);
                  
                  if (user) {
                    try {
                      const { error } = await supabase
                        .from('business_profiles')
                        .upsert({
                          user_id: user.id,
                          industry,
                          updated_at: new Date().toISOString()
                        }, {
                          onConflict: 'user_id'
                        });

                      if (error) throw error;
                      
                      // Reload profile to refresh all state including business name
                      await loadBusinessProfile();
                      
                      toast({
                        title: "Industry saved",
                        description: "Your industry has been updated. Chat will now use this industry context.",
                      });
                    } catch (error) {
                      console.error('Error saving industry:', error);
                      toast({
                        title: "Error",
                        description: "Failed to save industry. Please try again.",
                        variant: "destructive",
                      });
                    }
                  }
                }}
                onBusinessNameChange={async (name) => {
                  setUserBusinessName(name);
                  
                  // Update sessionStorage for persistence
                  sessionStorage.setItem('userBusinessName', name);
                  
                  if (user) {
                    try {
                      const { error } = await supabase
                        .from('business_profiles')
                        .upsert({
                          user_id: user.id,
                          business_name: name,
                          updated_at: new Date().toISOString()
                        }, {
                          onConflict: 'user_id'
                        });

                      if (error) throw error;
                      
                      // Reload profile to refresh all state
                      await loadBusinessProfile();
                      
                      toast({
                        title: "Business name saved",
                        description: "Your business name has been updated. Chat will now use this name.",
                      });
                    } catch (error) {
                      console.error('Error saving business name:', error);
                      toast({
                        title: "Error",
                        description: "Failed to save business name. Please try again.",
                        variant: "destructive",
                      });
                    }
                  }
                }}
                onDismiss={() => {
                  setShowOnboardingReminder(false);
                  localStorage.setItem('dismissedOnboardingReminder', 'true');
                }}
              />
            )}

                {subscriptionInfo && (
                  <div className="space-y-3 flex-shrink-0">
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
                
                {/* Content Area */}
                <div className="flex-1 overflow-y-auto bg-warm-cream/30">
                  <div className="container mx-auto px-4 py-6">
                    {viewMode === 'dashboard' ? (
                      <DashboardWithControls
                        userLocation={userLocation}
                        userLocationType={userLocationType}
                        userIndustry={userIndustry}
                        businessName={savedBusinessProfile?.business_name}
                        isLoadingProfile={isLoadingProfile}
                        className="max-w-7xl mx-auto"
                        onChatWithPlan={handleChatWithPlan}
                        onLocationChange={(location, type) => {
                          setUserLocation(location);
                          setUserLocationType(type);
                          if (user) {
                            supabase.from('business_profiles').upsert({
                              user_id: user.id,
                              location: location,
                            }).then(() => {
                              toast({ title: "Location saved", description: "Your business location has been updated." });
                            });
                          }
                        }}
                        onIndustryChange={(industry) => {
                          setUserIndustry(industry);
                          if (user) {
                            supabase.from('business_profiles').upsert({
                              user_id: user.id,
                              industry: industry,
                            }).then(() => {
                              toast({ title: "Industry saved", description: "Your industry has been updated." });
                            });
                          }
                        }}
                      />
                    ) : (
                      <div className="max-w-5xl mx-auto h-[calc(100vh-16rem)] flex">
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
                          requestCount={requestCount}
                          maxRequests={maxRequests}
                          onInputChange={setInput}
                          onSendMessage={sendMessage}
                          onKeyPress={handleKeyPress}
                          onToggleSidebar={() => {}}
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
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AIDashboard;
