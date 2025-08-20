
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Bot, Sparkles, CheckCircle, ArrowRight, Users, TrendingUp, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";
import SEOHead from "@/components/SEOHead";

const AICopilot: React.FC = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { user } = useAuth();
  const { toast } = useToast();

  const handleStartTrial = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to start your trial.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const { data, error } = await supabase.functions.invoke('create-checkout', {
        headers: {
          Authorization: `Bearer ${(await supabase.auth.getSession()).data.session?.access_token}`,
        },
      });

      if (error) throw error;

      // Redirect to Stripe checkout in the same tab
      if (data?.url) {
        window.location.href = data.url;
      }
    } catch (error) {
      console.error('Error creating checkout:', error);
      toast({
        title: "Error",
        description: "Failed to start checkout process. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="pt-20">
      <SEOHead
        title="AI Copilot for Contractors | Hudson Valley Consulting"
        description="Local marketing insights, data, and tactics for contractors—available 24/7."
        canonicalUrl="/resources/ai-copilot"
      />
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-blue-600 text-white py-20">
        <div className="container-custom">
          <div className="text-center max-w-4xl mx-auto">
            <div className="flex justify-center mb-6">
              <div className="bg-white/20 rounded-full p-4">
                <Bot className="h-12 w-12" />
              </div>
            </div>
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">
              AI Copilot for Contractors
            </h1>
            <p className="text-xl lg:text-2xl text-white/90 mb-8">
              Get instant, actionable marketing advice tailored specifically for contractors in Rockland & Westchester counties.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user ? (
                <Button 
                  onClick={handleStartTrial}
                  disabled={isLoading}
                  className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3"
                >
                  {isLoading ? "Starting..." : "Start 7-Day Free Trial"}
                </Button>
              ) : (
                <Button asChild className="bg-white text-purple-600 hover:bg-gray-100 text-lg px-8 py-3">
                  <Link to="/auth">Sign In to Start Free Trial</Link>
                </Button>
              )}
              <p className="text-white/80">Then $15/month • Cancel anytime</p>
            </div>
          </div>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-6">
                Stop Guessing What Marketing Will Work
              </h2>
              <p className="text-lg text-gray-700 mb-6">
                Most contractors waste money on generic marketing advice that doesn't work in their local market. Our AI understands the Hudson Valley market and gives you specific, actionable recommendations.
              </p>
              <div className="space-y-4">
                <div className="flex items-start">
                  <MapPin className="h-6 w-6 text-red-500 mt-1 mr-3" />
                  <div>
                    <strong className="text-gray-900">Local Market Focus:</strong>
                    <p className="text-gray-700">Specialized knowledge of Rockland & Westchester counties</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <TrendingUp className="h-6 w-6 text-green-500 mt-1 mr-3" />
                  <div>
                    <strong className="text-gray-900">Data-Driven Insights:</strong>
                    <p className="text-gray-700">Real housing data to identify opportunities</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <Users className="h-6 w-6 text-blue-500 mt-1 mr-3" />
                  <div>
                    <strong className="text-gray-900">Contractor-Specific:</strong>
                    <p className="text-gray-700">Built for HVAC, plumbing, roofing, and home service pros</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gray-50 p-8 rounded-lg">
              <div className="bg-white p-6 rounded-lg shadow-sm border">
                <div className="flex items-start mb-4">
                  <div className="bg-blue-500 text-white p-2 rounded mr-3">
                    <Bot className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">You ask:</p>
                    <p className="font-medium">"How many homes sold in Nanuet last quarter?"</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-purple-500 text-white p-2 rounded mr-3">
                    <Sparkles className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm text-gray-600 mb-2">AI responds:</p>
                    <p className="text-sm text-gray-800">
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
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">
              Everything You Need to Market Smarter
            </h2>
            <p className="text-lg text-gray-700">
              Stop wasting money on marketing that doesn't work in your area.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="bg-purple-100 rounded-lg p-3 w-fit mb-4">
                  <MapPin className="h-6 w-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Local Market Data</h3>
                <p className="text-gray-600">
                  Get real housing sales data for specific ZIP codes in Rockland & Westchester counties.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="bg-blue-100 rounded-lg p-3 w-fit mb-4">
                  <TrendingUp className="h-6 w-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">Actionable Tactics</h3>
                <p className="text-gray-600">
                  Every response includes specific marketing moves you can implement today.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="bg-green-100 rounded-lg p-3 w-fit mb-4">
                  <Bot className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-xl font-semibold mb-2">24/7 Availability</h3>
                <p className="text-gray-600">
                  Get marketing advice whenever you need it, without scheduling calls or waiting for responses.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="py-16">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">
              Simple, Transparent Pricing
            </h2>
            <p className="text-lg text-gray-700">
              No contracts, no setup fees. Cancel anytime.
            </p>
          </div>

          <div className="max-w-md mx-auto">
            <Card className="border-2 border-purple-200">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <h3 className="text-2xl font-bold text-hvcg-blue-dark mb-2">AI Copilot</h3>
                  <div className="text-4xl font-bold text-purple-600 mb-2">$15</div>
                  <p className="text-gray-600">per month</p>
                </div>
                
                <div className="space-y-3 mb-8 text-left">
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Unlimited AI conversations</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Local market data access</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Actionable marketing tactics</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-500 mr-2" />
                    <span>Cancel anytime</span>
                  </div>
                </div>

                {user ? (
                  <Button 
                    onClick={handleStartTrial}
                    disabled={isLoading}
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4"
                  >
                    {isLoading ? "Starting..." : "Start 7-Day Free Trial"}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                ) : (
                  <Button asChild className="w-full bg-purple-600 hover:bg-purple-700 text-white mb-4">
                    <Link to="/auth">
                      Sign In to Start Free Trial
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                )}
                
                <p className="text-sm text-gray-600">
                  7-day free trial, then $15/month
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-hvcg-blue-dark text-white">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Stop Wasting Money on Generic Marketing?
          </h2>
          <p className="text-xl mb-8">
            Join contractors who are already using AI to get more customers in Hudson Valley.
          </p>
          {user ? (
            <Button 
              onClick={handleStartTrial}
              disabled={isLoading}
              className="bg-hvcg-green hover:bg-hvcg-green-light text-white text-lg px-8 py-3"
            >
              {isLoading ? "Starting..." : "Start Your Free Trial Now"}
            </Button>
          ) : (
            <Button asChild className="bg-hvcg-green hover:bg-hvcg-green-light text-white text-lg px-8 py-3">
              <Link to="/auth">Sign In to Start Your Free Trial</Link>
            </Button>
          )}
        </div>
      </section>
    </div>
  );
};

export default AICopilot;
