import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Download, Check, Bot, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";
import { submitContactForm } from "@/lib/supabase";
import SEOHead from "@/components/SEOHead";

const Resources: React.FC = () => {
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const result = await submitContactForm({
      name,
      email,
      message: "Requested the Contractor Marketing Checklist download",
      service_interest: "Marketing Resources"
    });
    
    if (result.success) {
      setSubmitted(true);
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-club-green">
      <SEOHead
        title="Resources | Hudson Valley Consulting"
        description="Free guides and premium AI tools for contractors in the Hudson Valley."
        canonicalUrl="/resources"
      />
      
      {/* Hero Section */}
      <section className="py-24 md:py-32 text-center">
        <div className="container-custom">
          <h1 className="font-archivo text-5xl md:text-7xl uppercase tracking-wide text-warm-cream mb-6">
            RESOURCES
          </h1>
          <p className="text-xl md:text-2xl text-warm-cream/80 max-w-3xl mx-auto font-dm">
            Free guides and tools built specifically for Hudson Valley contractors.
          </p>
        </div>
      </section>

      {/* AI Copilot Premium Feature */}
      <section className="py-16 bg-varsity-maroon">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center mb-6">
                <Bot className="h-10 w-10 text-action-yellow mr-4" />
                <span className="bg-action-yellow/20 text-action-yellow text-sm font-dm font-bold px-4 py-2 rounded-full uppercase tracking-wide">
                  PREMIUM
                </span>
              </div>
              <h2 className="font-archivo text-4xl md:text-5xl uppercase tracking-wide text-warm-cream mb-6">
                AI COPILOT
              </h2>
              <p className="text-lg text-warm-cream/80 mb-8 font-dm">
                Get instant marketing advice tailored for contractors in Rockland & Westchester counties. Ask about local market data and get concrete tactics to grow your business.
              </p>
              
              <div className="space-y-4 mb-8">
                {[
                  "Local market insights for Hudson Valley contractors",
                  "Actionable marketing recommendations",
                  "Real-time housing data and opportunity analysis",
                  "Concrete ad copy and campaign ideas"
                ].map((item, index) => (
                  <div key={index} className="flex items-start">
                    <Sparkles className="h-5 w-5 text-action-yellow mt-1 mr-3 flex-shrink-0" />
                    <span className="text-warm-cream/90 font-dm">{item}</span>
                  </div>
                ))}
              </div>

              <Button asChild className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-full px-8 py-6 font-dm font-bold uppercase tracking-wide transition-all hover:-translate-y-1 active:scale-95">
                <Link to="/resources/ai-copilot">
                  LEARN MORE
                </Link>
              </Button>
            </div>

            <div className="bg-warm-cream rounded-3xl p-8 md:p-12 text-center">
              <div className="bg-action-yellow/20 rounded-3xl p-8 w-24 h-24 mx-auto mb-8 flex items-center justify-center">
                <Bot className="h-12 w-12 text-action-yellow" />
              </div>
              <h3 className="font-archivo text-3xl uppercase tracking-wide text-club-green mb-4">$15/MONTH</h3>
              <p className="text-club-green/70 mb-8 font-dm">
                Cancel anytime • Instant access • Local expertise
              </p>
              <Button asChild className="w-full bg-club-green hover:bg-club-green/90 text-warm-cream rounded-full px-8 py-4 font-dm font-bold uppercase tracking-wide">
                <Link to="/resources/ai-copilot">
                  START FREE TRIAL
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Free Lead Magnet Section */}
      <section className="py-16 bg-warm-cream">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="font-archivo text-4xl md:text-5xl uppercase tracking-wide text-club-green mb-6">FREE RESOURCES</h2>
            <p className="text-lg text-club-green/80 font-dm">
              Download our free guides to get started with better marketing today.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <h3 className="font-archivo text-2xl uppercase tracking-wide text-club-green mb-6">
                CONTRACTOR MARKETING CHECKLIST
              </h3>
              
              <div className="space-y-6 mb-8">
                {[
                  {
                    title: "20-Point Checklist",
                    description: "Evaluate your current ads and find quick wins. Tailored for contractors."
                  },
                  {
                    title: "Local SEO Quick-Start",
                    description: "Rank higher in Hudson Valley search results and get seen by local customers."
                  },
                  {
                    title: "Response Templates",
                    description: "Professional templates for inquiry responses, follow-ups, and satisfaction checks."
                  },
                  {
                    title: "Budget Worksheet",
                    description: "Plan your advertising budget effectively to maximize ROI."
                  }
                ].map((item, index) => (
                  <div key={index} className="bg-club-green/5 rounded-3xl p-6 border border-club-green/10">
                    <h4 className="font-dm font-bold text-lg text-club-green mb-2 flex items-center">
                      <Check className="h-5 w-5 text-action-yellow mr-2" />
                      {item.title}
                    </h4>
                    <p className="text-club-green/80 font-dm ml-7">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <div className="bg-club-green rounded-3xl p-8 md:p-12 sticky top-24">
                {submitted ? (
                  <div className="text-center py-8">
                    <div className="bg-action-yellow/20 rounded-3xl p-6 w-20 h-20 mx-auto mb-6 flex items-center justify-center">
                      <Check className="h-10 w-10 text-action-yellow" />
                    </div>
                    <h3 className="font-archivo text-2xl uppercase tracking-wide text-warm-cream mb-4">CHECK YOUR EMAIL</h3>
                    <p className="text-warm-cream/80 mb-6 font-dm">
                      Your Marketing Checklist PDF is on its way.
                    </p>
                    <Button asChild className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-full px-8 py-4 font-dm font-bold uppercase tracking-wide">
                      <Link to="/resources/marketing-checklist">
                        VIEW ONLINE
                      </Link>
                    </Button>
                  </div>
                ) : (
                  <>
                    <h3 className="font-archivo text-2xl uppercase tracking-wide text-warm-cream mb-8 text-center">
                      GET YOUR FREE CHECKLIST
                    </h3>
                    <form onSubmit={handleSubmit} className="space-y-6">
                      <div>
                        <label htmlFor="name" className="block text-sm font-dm font-bold text-warm-cream mb-2">
                          Your Name
                        </label>
                        <Input
                          id="name"
                          type="text"
                          placeholder="John Doe"
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          required
                          className="rounded-full bg-warm-cream/10 border-warm-cream/20 text-warm-cream placeholder:text-warm-cream/50"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className="block text-sm font-dm font-bold text-warm-cream mb-2">
                          Email Address
                        </label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="you@example.com"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          required
                          className="rounded-full bg-warm-cream/10 border-warm-cream/20 text-warm-cream placeholder:text-warm-cream/50"
                        />
                      </div>
                      <Button 
                        type="submit" 
                        disabled={isSubmitting}
                        className="w-full bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-full px-8 py-6 font-dm font-bold uppercase tracking-wide transition-all hover:-translate-y-1 active:scale-95"
                      >
                        <Download className="mr-2 h-5 w-5" /> 
                        {isSubmitting ? "SENDING..." : "DOWNLOAD NOW"}
                      </Button>
                      <p className="text-xs text-warm-cream/60 text-center font-dm">
                        We respect your privacy. We'll never share your information.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Resources;