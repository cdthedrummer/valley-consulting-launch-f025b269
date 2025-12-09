
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, Sparkles, CheckCircle, ArrowRight, Users, TrendingUp, MapPin, X, Star } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import SEOHead from "@/components/SEOHead";
import { WebsiteOnboarding } from "@/components/WebsiteOnboarding";
import { supabase } from "@/integrations/supabase/client";

declare global {
  interface Window {
    gtag_report_conversion?: (url?: string) => boolean;
  }
}

const AICopilot: React.FC = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showQuiz, setShowQuiz] = useState(false);
  const [quizData, setQuizData] = useState<any>(null);

  const handleAnalysisClick = () => {
    // Fire Google Ads conversion
    if (typeof window.gtag_report_conversion === 'function') {
      window.gtag_report_conversion();
    }
    setShowQuiz(true);
  };

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
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-3xl relative bg-warm-cream rounded-lg shadow-2xl border-2 border-action-yellow/30 my-8">
            <button
              onClick={() => setShowQuiz(false)}
              className="absolute -top-3 -right-3 z-10 rounded-full bg-action-yellow border-2 border-club-green p-2 shadow-lg transition-all hover:scale-110 focus:outline-none focus:ring-2 focus:ring-action-yellow"
            >
              <X className="h-5 w-5 text-club-green" />
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
                onClick={handleAnalysisClick}
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

      {/* Dashboard Preview Section - NEW */}
      <section className="py-20 bg-gradient-to-br from-club-green via-club-green to-club-green/95">
        <div className="container-custom">
          <div className="text-center mb-12">
            <Badge className="bg-action-yellow text-club-green font-dm mb-4">
              Real Dashboard Preview
            </Badge>
            <h2 className="font-archivo text-4xl uppercase tracking-wide text-action-yellow mb-4">
              See What You Get
            </h2>
            <p className="font-dm text-xl text-warm-cream/90 max-w-2xl mx-auto">
              Here's what McNulty's Junk Removal sees in their dashboard after completing the free analysis
            </p>
          </div>

          {/* Mock Dashboard Container */}
          <div className="max-w-5xl mx-auto">
            {/* Dashboard Header */}
            <Card className="mb-6 bg-warm-cream border-2 border-action-yellow/30">
              <CardContent className="py-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div className="flex items-center gap-4">
                    <div className="p-3 rounded-lg bg-action-yellow/20">
                      <Bot className="h-6 w-6 text-club-green" />
                    </div>
                    <div>
                      <div className="font-dm text-xs uppercase tracking-wider text-club-green/60">Intelligence Dashboard For</div>
                      <div className="font-archivo text-xl uppercase tracking-wide text-club-green">
                        McNulty's Junk Removal
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className="gap-1.5 bg-club-green text-warm-cream font-dm">
                      <Users className="h-3 w-3" />
                      Junk Removal
                    </Badge>
                    <Badge className="gap-1.5 bg-varsity-maroon text-warm-cream font-dm">
                      <MapPin className="h-3 w-3" />
                      Rockland County, NY
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Widgets Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
              {/* Marketing Score Widget */}
              <Card className="p-6 bg-gradient-to-br from-warm-cream to-action-yellow/10 border-action-yellow/30">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <h3 className="text-lg font-archivo text-club-green mb-1">Marketing Score</h3>
                    <p className="text-sm text-club-green/70 font-dm">Your overall marketing effectiveness</p>
                  </div>
                  <Badge className="gap-1 bg-action-yellow text-club-green font-dm">
                    <TrendingUp className="w-3 h-3" />
                    Junk Removal
                  </Badge>
                </div>
                
                <div className="text-center space-y-4">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="relative inline-flex items-center justify-center"
                  >
                    <div className="text-6xl font-archivo text-club-green">72</div>
                    <div className="absolute -bottom-6 text-sm font-dm text-club-green/60">/ 100</div>
                  </motion.div>
                  
                  <div className="flex justify-center items-center gap-1 pt-4">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-5 h-5 ${
                          i < 3 ? 'fill-action-yellow text-action-yellow' : 
                          i === 3 ? 'fill-action-yellow text-action-yellow opacity-60' : 
                          'text-club-green/20'
                        }`}
                      />
                    ))}
                    <span className="ml-2 text-sm font-dm text-club-green">3.6</span>
                  </div>
                  
                  <Badge className="text-base px-4 py-1 bg-club-green text-action-yellow font-dm">
                    Good
                  </Badge>
                  
                  <div className="pt-4 border-t border-club-green/20">
                    <div className="flex items-center justify-center gap-2 text-sm font-dm">
                      <TrendingUp className="w-4 h-4 text-action-yellow" />
                      <span className="text-club-green/70">
                        Better than <span className="font-semibold text-club-green">65%</span> of junk removal businesses
                      </span>
                    </div>
                  </div>
                </div>
              </Card>

              {/* Quick Wins Widget */}
              <Card className="p-6 bg-warm-cream border-action-yellow/30">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <CheckCircle className="w-5 h-5 text-action-yellow" />
                      <h3 className="text-lg font-archivo text-club-green">Quick Wins</h3>
                    </div>
                    <p className="text-sm text-club-green/70 font-dm">5 actions to boost your score</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[
                    { title: 'Add emergency 24/7 hours to homepage header', impact: 'high' },
                    { title: 'Create "Same-Day Junk Removal Near Me" landing page', impact: 'high' },
                    { title: 'Add pricing calculator for common items', impact: 'medium' },
                    { title: 'Install Google Business Profile booking button', impact: 'medium' },
                    { title: 'Add before/after gallery to services page', impact: 'low' }
                  ].map((win, i) => (
                    <div
                      key={i}
                      className={`p-3 rounded-lg border ${
                        i === 0 ? 'bg-action-yellow/20 border-action-yellow/40' : 'bg-club-green/5 border-club-green/10'
                      }`}
                    >
                      <div className="flex items-start justify-between gap-2">
                        <p className={`text-sm font-dm flex-1 ${i === 0 ? 'text-club-green font-semibold' : 'text-club-green/80'}`}>
                          {win.title}
                        </p>
                        <Badge 
                          className={`text-xs font-dm ${
                            win.impact === 'high' ? 'bg-club-green text-action-yellow' :
                            win.impact === 'medium' ? 'bg-action-yellow/80 text-club-green' :
                            'bg-club-green/20 text-club-green'
                          }`}
                        >
                          {win.impact}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </div>

            {/* Competitor Analysis Widget - Full Width */}
            <Card className="p-6 mb-6 bg-warm-cream border-action-yellow/30">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-archivo text-club-green">Competitor Spotlight</h3>
                  <p className="text-sm text-club-green/70 font-dm">4 competitors analyzed in Rockland County</p>
                </div>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[
                  {
                    name: "1-800-GOT-JUNK?",
                    services: ['Residential', 'Commercial', 'Demolition', 'Estate'],
                    strengths: ['National brand recognition', 'Franchise support'],
                    weaknesses: ['Higher prices than local competitors', 'Less personal service'],
                    pricing: '$150-300 minimum'
                  },
                  {
                    name: "College Hunks Hauling Junk",
                    services: ['Junk Removal', 'Moving', 'Labor'],
                    strengths: ['Strong social media presence', '24/7 availability'],
                    weaknesses: ['Limited Rockland presence', 'Mixed reviews on pricing'],
                    pricing: '$175-350 average'
                  },
                  {
                    name: "JDog Junk Removal",
                    services: ['Residential', 'Commercial', 'Hoarding'],
                    strengths: ['Veteran-owned appeal', 'Community focused'],
                    weaknesses: ['Newer to market', 'Limited online reviews'],
                    pricing: '$140-280 range'
                  },
                  {
                    name: "Rockland Waste Services",
                    services: ['Junk Pickup', 'Roll-off Dumpsters'],
                    strengths: ['Long-established local', 'Large equipment'],
                    weaknesses: ['Outdated website', 'Poor mobile experience'],
                    pricing: '$120-250 typical'
                  }
                ].map((competitor, i) => (
                  <Card key={i} className="p-4 bg-club-green/5 border-club-green/20">
                    <div className="flex items-start justify-between mb-3">
                      <h4 className="font-dm font-semibold text-club-green">{competitor.name}</h4>
                      <Badge className="text-xs bg-action-yellow/20 text-club-green font-dm">
                        {competitor.services.length} services
                      </Badge>
                    </div>
                    
                    <div className="space-y-2 mb-3 text-sm font-dm">
                      <div className="flex items-start gap-2">
                        <TrendingUp className="w-4 h-4 text-club-green/40 flex-shrink-0 mt-0.5" />
                        <span className="text-club-green/70">{competitor.strengths[0]}</span>
                      </div>
                      <div className="flex items-start gap-2">
                        <ArrowRight className="w-4 h-4 text-varsity-maroon/60 flex-shrink-0 mt-0.5" />
                        <span className="text-club-green/70">{competitor.weaknesses[0]}</span>
                      </div>
                    </div>
                    
                    <p className="text-xs text-club-green/60 font-dm italic">💰 {competitor.pricing}</p>
                  </Card>
                ))}
              </div>
            </Card>

            {/* Market Opportunity Widget */}
            <Card className="p-8 bg-gradient-to-br from-action-yellow/20 to-warm-cream border-action-yellow/40">
              <div className="text-center">
                <h3 className="text-lg font-archivo text-club-green mb-4">Local Market Opportunity</h3>
                <div className="space-y-4">
                  <div>
                    <p className="text-5xl font-archivo text-club-green mb-2">$1.2M</p>
                    <p className="text-sm text-club-green/70 font-dm">Estimated untapped annual revenue in Rockland County</p>
                  </div>
                  <div className="grid grid-cols-3 gap-4 pt-4 border-t border-club-green/20">
                    <div>
                      <p className="text-2xl font-archivo text-club-green">847</p>
                      <p className="text-xs text-club-green/60 font-dm">Home sales Q1 2025</p>
                    </div>
                    <div>
                      <p className="text-2xl font-archivo text-club-green">23%</p>
                      <p className="text-xs text-club-green/60 font-dm">YoY growth</p>
                    </div>
                    <div>
                      <p className="text-2xl font-archivo text-club-green">$285</p>
                      <p className="text-xs text-club-green/60 font-dm">Avg. job value</p>
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* CTA */}
            <div className="text-center mt-8">
              <Button 
                onClick={() => setShowQuiz(true)}
                size="lg"
                className="bg-action-yellow text-club-green hover:bg-action-yellow/90 rounded-pill font-dm font-bold uppercase tracking-wide text-lg px-10 py-6"
              >
                Get Your Free Business Analysis
              </Button>
              <p className="font-dm text-warm-cream/70 mt-4">
                See your own data in 30 seconds • Then $15/month • Cancel anytime
              </p>
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
                  onClick={handleAnalysisClick}
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
