import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Linkedin, Award, Shield, Zap } from "lucide-react";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";

const Approach: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="About | HVCG - Charlie Dickerson"
        description="Professional contractor websites built by Charlie Dickerson, VP of AI & Automation at Omnicom Media Group."
        canonicalUrl="/approach"
      />

      {/* Hero Section */}
      <header className="bg-club-green text-warm-cream py-24 md:py-32">
        <div className="container-custom text-center">
          <h1 className="font-archivo text-4xl md:text-6xl uppercase tracking-wide mb-6">ABOUT</h1>
          <p className="text-warm-cream/80 text-xl max-w-2xl mx-auto">
            Enterprise expertise. Small business pricing.
          </p>
        </div>
      </header>

      <main>
        {/* Bio Section */}
        <section className="bg-warm-cream py-16 md:py-24">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-8 items-start">
                  <div className="text-center md:text-left">
                    <div className="w-40 h-40 mx-auto md:mx-0 rounded-full bg-club-green flex items-center justify-center text-5xl font-archivo text-warm-cream">
                      CD
                    </div>
                    <div className="mt-4">
                      <a 
                        href="https://www.linkedin.com/in/charliedickerson/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-club-green hover:text-action-yellow transition-colors font-dm font-bold text-sm"
                      >
                        <Linkedin className="h-4 w-4" />
                        Connect on LinkedIn
                      </a>
                    </div>
                  </div>
                  <div>
                    <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-wide text-club-green mb-2">
                      Charlie Dickerson
                    </h2>
                    <div className="font-dm text-action-yellow text-sm uppercase tracking-widest mb-6">
                      VP of AI & Advanced Automation • Omnicom Media Group
                    </div>
                    <div className="space-y-4 font-dm text-club-green/80 text-lg leading-relaxed">
                      <p>
                        By day, I lead AI and automation strategy for some of the world's largest brands at Omnicom Media Group—helping Fortune 500 companies navigate digital transformation.
                      </p>
                      <p>
                        On evenings and weekends, I build websites for local contractors in the Hudson Valley. Why? Because I grew up here, and I've seen too many hardworking tradespeople get ripped off by agencies charging $10,000+ for a simple website.
                      </p>
                      <p>
                        My goal is simple: give contractors the same quality of work that big brands get—at a price that makes sense for a small business.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="bg-club-green py-16 md:py-24">
          <div className="container-custom">
            <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-action-yellow mb-12 text-center">
              HOW I WORK
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
              {[
                {
                  icon: <Shield className="w-8 h-8" />,
                  title: "No Surprises",
                  desc: "Clear pricing upfront. A simple contract. You'll always know what you're paying for."
                },
                {
                  icon: <Zap className="w-8 h-8" />,
                  title: "Fast & Focused",
                  desc: "4-week delivery. Weekly updates. I respect your time because I know you're busy running your business."
                },
                {
                  icon: <Award className="w-8 h-8" />,
                  title: "Quality First",
                  desc: "The same standards I apply to enterprise projects. Your site will be fast, mobile-friendly, and professional."
                }
              ].map((item, index) => (
                <div key={index} className="text-center">
                  <div className="bg-action-yellow/20 w-16 h-16 rounded-2xl flex items-center justify-center mx-auto mb-4 text-action-yellow">
                    {item.icon}
                  </div>
                  <h3 className="font-archivo text-xl uppercase tracking-wide text-warm-cream mb-2">
                    {item.title}
                  </h3>
                  <p className="font-dm text-warm-cream/70">
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-varsity-maroon py-16 md:py-24">
          <div className="container-custom text-center">
            <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-6">
              LET'S TALK
            </h2>
            <p className="font-dm text-lg text-warm-cream/80 max-w-xl mx-auto mb-8">
              Book a free 15-minute call. I'll give you an honest assessment of what you need—and whether I'm the right fit.
            </p>
            <Button 
              asChild 
              className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-10 py-7 font-dm font-bold uppercase tracking-wide text-lg transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <Link to="/booking">
                BOOK A CALL
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Approach;
