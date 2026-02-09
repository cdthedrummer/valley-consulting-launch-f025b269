import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, Monitor, Search, Briefcase } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ClubhouseHero from '@/components/ClubhouseHero';
import WebsitePreviewSection from '@/components/WebsitePreviewSection';

const ClubhouseHome: React.FC = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Hudson Valley Consulting Group",
    "description": "Professional website development and digital systems for businesses in the Hudson Valley",
    "url": "https://hudsonvalleycg.com",
    "telephone": "+18456758378",
    "email": "contact@hvcg.us",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "NY",
      "addressCountry": "US"
    },
    "priceRange": "$$",
    "serviceArea": "Hudson Valley, NY"
  };

  return (
    <>
      <Helmet>
        <title>HVCG | Strategy. Design. Results.</title>
        <meta
          name="description"
          content="We build professional websites and digital systems for businesses that need to get found online. Website builds starting at $1,399."
        />
        <meta
          name="keywords"
          content="contractor website, website development, digital strategy, Hudson Valley, small business website"
        />
        <link rel="canonical" href="https://hudsonvalleycg.com/" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-club-green scroll-smooth">
        <ClubhouseHero />
        
        {/* Credibility Strip */}
        <section className="py-6 bg-club-green border-t border-warm-cream/10">
          <div className="container-custom">
            <div className="flex flex-wrap justify-center gap-x-8 gap-y-2 text-warm-cream/50 font-dm text-sm uppercase tracking-widest">
              <span>Enterprise marketing operations</span>
              <span className="hidden sm:inline">•</span>
              <span>AI & automation systems</span>
              <span className="hidden sm:inline">•</span>
              <span>Website development</span>
              <span className="hidden sm:inline">•</span>
              <span>Hudson Valley, NY</span>
            </div>
          </div>
        </section>

        {/* What We Do — Capability Cards */}
        <section className="py-16 md:py-24 bg-warm-cream">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-club-green mb-4">
                WHAT WE DO
              </h2>
              <p className="font-dm text-lg text-club-green/70 max-w-2xl mx-auto">
                A small consultancy with enterprise-level execution.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {[
                {
                  icon: <Monitor className="w-8 h-8" />,
                  title: "Website Development",
                  description: "Professional sites for contractors and small businesses. Fast, mobile-friendly, Google-ready.",
                  price: "Starting at $1,399"
                },
                {
                  icon: <Search className="w-8 h-8" />,
                  title: "Search & Visibility",
                  description: "Google Business, Maps, and local SEO setup so customers find you first."
                },
                {
                  icon: <Briefcase className="w-8 h-8" />,
                  title: "Advisory & Automation",
                  description: "Strategy, workflow design, and AI systems for marketing teams. Select engagements."
                }
              ].map((service, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-action-yellow/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-action-yellow">
                    {service.icon}
                  </div>
                  <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green mb-3">
                    {service.title}
                  </h3>
                  <p className="font-dm text-club-green/70 leading-relaxed mb-4">
                    {service.description}
                  </p>
                  {service.price && (
                    <p className="font-dm text-action-yellow font-bold text-sm uppercase tracking-wide">
                      {service.price}
                    </p>
                  )}
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                asChild 
                className="bg-club-green hover:bg-club-green/90 text-warm-cream rounded-pill px-8 py-6 font-dm font-bold uppercase tracking-wide transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <Link to="/services">
                  VIEW SERVICES & PRICING <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <WebsitePreviewSection />

        {/* Portfolio Preview */}
        <section className="py-16 md:py-24 bg-club-green">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-4">
                RECENT WORK
              </h2>
              <p className="font-dm text-lg text-warm-cream/70 max-w-2xl mx-auto">
                Websites we've built for local businesses.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-10">
              <a 
                href="https://mcnultysjunkremoval.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-warm-cream/10 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
              >
                <div className="aspect-video bg-club-green/50 flex items-center justify-center">
                  <span className="font-archivo text-2xl text-warm-cream/40 uppercase tracking-wide group-hover:text-action-yellow transition-colors">
                    McNulty's Junk Removal
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-archivo text-lg uppercase tracking-wide text-warm-cream mb-1">
                    McNulty's Junk Removal
                  </h3>
                  <p className="font-dm text-warm-cream/60 text-sm">
                    Complete website build • Junk removal contractor
                  </p>
                </div>
              </a>

              <a 
                href="https://a1smartchoiceelectrician.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group bg-warm-cream/10 rounded-3xl overflow-hidden transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
              >
                <div className="aspect-video bg-club-green/50 flex items-center justify-center">
                  <span className="font-archivo text-2xl text-warm-cream/40 uppercase tracking-wide group-hover:text-action-yellow transition-colors">
                    A1 Smart Choice
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="font-archivo text-lg uppercase tracking-wide text-warm-cream mb-1">
                    A1 Smart Choice Electrician
                  </h3>
                  <p className="font-dm text-warm-cream/60 text-sm">
                    Website + Google visibility • Electrician
                  </p>
                </div>
              </a>
            </div>

            <div className="text-center">
              <Button 
                asChild 
                variant="outline"
                className="border-2 border-warm-cream text-warm-cream hover:bg-warm-cream hover:text-club-green rounded-pill px-8 py-6 font-dm font-bold uppercase tracking-wide transition-all"
              >
                <Link to="/work">
                  VIEW FULL PORTFOLIO <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        {/* Meet the Team */}
        <section className="py-16 md:py-24 bg-warm-cream">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-club-green mb-4">
                MEET THE TEAM
              </h2>
            </div>
            <div className="max-w-4xl mx-auto">
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg">
                <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-8 items-center">
                  <div className="text-center md:text-left">
                    <div className="w-40 h-40 mx-auto md:mx-0 rounded-full bg-club-green/10 flex items-center justify-center text-6xl font-archivo text-club-green">
                      CD
                    </div>
                  </div>
                  <div>
                    <h3 className="font-archivo text-2xl md:text-3xl uppercase tracking-wide text-club-green mb-2">
                      Charlie Dickerson
                    </h3>
                    <div className="font-dm text-club-green/60 text-sm uppercase tracking-widest mb-4">
                      Team Lead
                    </div>
                    <p className="font-dm text-club-green/80 text-lg leading-relaxed mb-3">
                      VP of AI & Advanced Automation at <strong>Omnicom Media Group</strong>. 
                      Charlie brings enterprise digital strategy experience to every project—delivering 
                      the same quality of work that Fortune 500 brands receive, at small business pricing.
                    </p>
                    <p className="font-dm text-club-green/50 text-sm italic mb-4">
                      Independent consultancy. Not affiliated with client brands.
                    </p>
                    <div className="flex items-center gap-4">
                      <a 
                        href="https://www.linkedin.com/in/charliedickerson/" 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-club-green hover:text-action-yellow transition-colors font-dm font-bold"
                      >
                        <Linkedin className="h-5 w-5" />
                        LinkedIn
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Bottom CTA */}
        <section className="py-16 md:py-24 bg-varsity-maroon">
          <div className="container-custom text-center">
            <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-6">
              LET'S TALK
            </h2>
            <p className="font-dm text-lg text-warm-cream/80 max-w-2xl mx-auto mb-8">
              Book a free 15-minute intro. Whether you need a website, advisory, or just want to connect—we're here.
            </p>
            <Button 
              asChild 
              className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-10 py-7 font-dm font-bold uppercase tracking-wide text-lg transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <Link to="/booking">
                BOOK A 15-MINUTE INTRO
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </section>
      </div>
    </>
  );
};

export default ClubhouseHome;
