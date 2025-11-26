
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Sparkles, CheckCircle, ArrowRight, Users, TrendingUp, MapPin, X } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import SEOHead from "@/components/SEOHead";
import { WebsiteOnboarding } from "@/components/WebsiteOnboarding";
import { supabase } from "@/integrations/supabase/client";

const AICopilot: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);

  const handleStartTrial = () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to start your trial.",
        variant: "destructive",
      });
      return;
    }

    // Redirect to Stripe Payment Link
    window.open('https://buy.stripe.com/7sYbJ17kQespcID7aJ0x200', '_blank');
  };

  const handleQuizComplete = async (data: any) => {
    setQuizData(data);

    // Save quiz response to database
    try {
      await supabase.from('quiz_responses').insert({
        user_id: user?.id || null,
        website_url: data.websiteUrl,
        phone_number: data.phoneNumber,
        business_name: data.businessName,
        industry: data.industry,
        location: data.location,
        primary_services: data.servicesOffered,
        marketing_challenge: data.marketingChallenge,
        urgency_level: data.urgencyLevel,
        is_subscribed: false,
        scraped_data: data
      });

      toast({
        title: "Analysis complete!",
        description: "Subscribe to unlock your full competitive analysis and AI dashboard.",
      });

      // Show preview then prompt for subscription
      if (!user) {
        toast({
          title: "Sign in to continue",
          description: "Create an account to see your full analysis",
        });
        setTimeout(() => navigate('/auth'), 2000);
      } else {
        // User is signed in, show trial prompt
        setTimeout(() => handleStartTrial(), 2000);
      }
    } catch (error) {
      console.error('Error saving quiz:', error);
    }
  };

  return (
    <div className="pt-20">
      <SEOHead
        title="AI Copilot for Contractors | Hudson Valley Consulting"
        description="Local marketing insights, data, and tactics for contractors—available 24/7."
        canonicalUrl="/resources/ai-copilot"
      />
      
      {/* Interactive Quiz Modal */}
      {showQuiz && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-3xl relative">
            <button
              onClick={() => setShowQuiz(false)}
              className="absolute -top-2 -right-2 z-10 rounded-full bg-background p-2 opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </button>
            <WebsiteOnboarding 
              onComplete={handleQuizComplete}
              onSkip={() => setShowQuiz(false)}
              isTeaser={true}
            />
          </div>
        </div>
      )}
      {/* Hero Section */}
      <section className="bg-club-green text-warm-cream py-20">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-action-yellow/20 rounded-full p-4">
                <Bot className="h-12 w-12 text-action-yellow" />
              </div>
            </div>
            <h1 className="font-archivo text-5xl lg:text-6xl uppercase tracking-wide mb-6">
              AI Copilot for Contractors
            </h1>
            <p className="font-dm text-xl lg:text-2xl text-warm-cream/90 mb-8">
              Get instant, actionable marketing advice tailored specifically for contractors in Rockland & Westchester counties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <Button 
                onClick={() => setShowQuiz(true)}
                className="bg-action-yellow text-club-green hover:bg-action-yellow/90 rounded-pill font-dm font-bold uppercase tracking-wide text-lg px-8 py-3"
              >
                Get Free Business Analysis
              </Button>
              <p className="font-dm text-warm-cream/80">Then $15/month • Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 bg-warm-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="font-archivo text-3xl uppercase tracking-wide text-club-green mb-6">
                Stop Guessing What Marketing Will Work
              </h2>
              <p className="font-dm text-lg text-club-green/80 mb-6">
                Most contractors waste money on generic marketing advice that doesn't work in their local market. Our AI understands the Hudson Valley market and gives you specific, actionable recommendations.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-action-yellow mt-1 mr-3" />
                  <div>
                    <strong className="font-dm text-club-green">Local Market Focus:</strong>
                    <p className="font-dm text-club-green/70">Specialized knowledge of Rockland & Westchester counties</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="h-6 w-6 text-action-yellow mt-1 mr-3" />
                  <div>
                    <strong className="font-dm text-club-green">Data-Driven Insights:</strong>
                    <p className="font-dm text-club-green/70">Real housing data to identify opportunities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-action-yellow mt-1 mr-3" />
                  <div>
                    <strong className="font-dm text-club-green">Contractor-Specific:</strong>
                    <p className="font-dm text-club-green/70">Built for HVAC, plumbing, roofing, and home service pros</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-club-green p-8 rounded-3xl">
              <div className="bg-warm-cream p-6 rounded-3xl shadow-sm">
                <div className="flex items-start mb-4">
                  <div className="bg-action-yellow text-club-green p-2 rounded-xl mr-3">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-dm text-xs text-club-green/60 mb-2 uppercase tracking-wide">You ask:</p>
                    <p className="font-dm font-medium text-club-green">"How many homes sold in Nanuet last quarter?"</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-club-green text-action-yellow p-2 rounded-xl mr-3">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="font-dm text-xs text-club-green/60 mb-2 uppercase tracking-wide">AI responds:</p>
                    <p className="font-dm text-sm text-club-green">
                      "47 homes closed in 10954 in Q1 2025 (up 8% YoY). That's 47 new roofs due for maintenance within 5 years. 
                      Launch a $20/day Google campaign targeting 'roof inspection nanuet' + door-hangers on Pine St, Oak Ave, and Maple Dr where most sales happened."
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-club-green">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-archivo text-3xl uppercase tracking-wide text-action-yellow mb-4">
              Everything You Need to Market Smarter
            </h2>
            <p className="font-dm text-lg text-warm-cream/80">
              Stop wasting money on marketing that doesn't work in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="bg-warm-cream border-none">
              <CardContent className="p-6">
                <div className="bg-action-yellow/20 rounded-3xl p-3 w-fit mb-4">
                  <MapPin className="h-6 w-6 text-action-yellow" />
                </div>
                <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green mb-2">Local Market Data</h3>
                <p className="font-dm text-club-green/70">
                  Get real housing sales data for specific ZIP codes in Rockland & Westchester counties.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-warm-cream border-none">
              <CardContent className="p-6">
                <div className="bg-action-yellow/20 rounded-3xl p-3 w-fit mb-4">
                  <TrendingUp className="h-6 w-6 text-action-yellow" />
                </div>
                <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green mb-2">Actionable Tactics</h3>
                <p className="font-dm text-club-green/70">
                  Every response includes specific marketing moves you can implement today.
                </p>
              </CardContent>
            </Card>

            <Card className="bg-warm-cream border-none">
              <CardContent className="p-6">
                <div className="bg-action-yellow/20 rounded-3xl p-3 w-fit mb-4">
                  <Bot className="h-6 w-6 text-action-yellow" />
                </div>
                <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green mb-2">24/7 Availability</h3>
                <p className="font-dm text-club-green/70">
                  Get marketing advice whenever you need it, without scheduling calls or waiting for responses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16 bg-warm-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-archivo text-3xl uppercase tracking-wide text-club-green mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="font-dm text-lg text-club-green/70">
              No contracts, no setup fees. Cancel anytime.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="border-2 border-action-yellow bg-club-green">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <h3 className="font-archivo text-2xl uppercase tracking-wide text-warm-cream mb-2">AI Copilot</h3>
                  <div className="font-archivo text-4xl text-action-yellow mb-2">$15</div>
                  <p className="font-dm text-warm-cream/70">per month</p>
                </div>
                
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-action-yellow mr-2" />
                    <span className="font-dm text-warm-cream">Unlimited AI conversations</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-action-yellow mr-2" />
                    <span className="font-dm text-warm-cream">Local market data access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-action-yellow mr-2" />
                    <span className="font-dm text-warm-cream">Actionable marketing tactics</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-action-yellow mr-2" />
                    <span className="font-dm text-warm-cream">Cancel anytime</span>
                  </div>
                </div>

                <Button 
                  onClick={() => setShowQuiz(true)}
                  className="w-full bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill font-dm font-bold uppercase tracking-wide mb-4"
                >
                  Get Free Business Analysis
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
                
                <p className="font-dm text-sm text-warm-cream/70">
                  7-day free trial, then $15/month
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-club-green text-warm-cream">
        <div className="container-custom text-center">
          <h2 className="font-archivo text-3xl uppercase tracking-wide mb-4">
            Ready to Stop Wasting Money on Generic Marketing?
          </h2>
          <p className="font-dm text-xl mb-8">
            Join contractors who are already using AI to get more customers in Hudson Valley.
          </p>
          <Button 
            onClick={() => setShowQuiz(true)}
            className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill font-dm font-bold uppercase tracking-wide text-lg px-8 py-3"
          >
            Get Your Free Business Analysis
          </Button>
        </div>
      </section>
    </div>
  );
};

export default AICopilot;
