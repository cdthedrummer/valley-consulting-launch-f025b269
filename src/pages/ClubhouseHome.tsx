import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, Linkedin, Monitor, Search, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ClubhouseHero from '@/components/ClubhouseHero';
import WebsitePreviewSection from '@/components/WebsitePreviewSection';
import SearchResultsShowcase from '@/components/SearchResultsShowcase';

const ClubhouseHome: React.FC = () => {
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Hudson Valley Consulting Group",
    "description": "Professional website development for contractors in the Hudson Valley",
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

  const services = [
    {
      icon: <Monitor className="w-8 h-8" />,
      title: "Website Package",
      price: "$1,399",
      features: [
        "Custom homepage design",
        "Services & About pages",
        "Contact forms",
        "Mobile-friendly",
        "Fast loading"
      ]
    },
    {
      icon: <Search className="w-8 h-8" />,
      title: "Google Visibility",
      price: "$449",
      features: [
        "Google Business setup",
        "Search Console",
        "Local SEO basics",
        "Maps integration"
      ]
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "AI Updates Portal",
      price: "$200 + $25/mo",
      features: [
        "Update your site yourself",
        "AI-powered editor",
        "Video training",
        "30-day support"
      ]
    }
  ];

  return (
    <>
      <Helmet>
        <title>HVCG | Professional Websites for Contractors</title>
        <meta
          name="description"
          content="We build fast, mobile-friendly websites for contractors. Clean design, Google-ready, delivered in 4 weeks. Starting at $1,399."
        />
        <meta
          name="keywords"
          content="contractor website, HVAC website, plumber website, electrician website, contractor web design, Hudson Valley"
        />
        <link rel="canonical" href="https://hudsonvalleycg.com/" />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-club-green scroll-smooth">
        <ClubhouseHero />
        
        {/* Simple Services Overview */}
        <section className="py-16 md:py-24 bg-warm-cream">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-club-green mb-4">
                WHAT YOU GET
              </h2>
              <p className="font-dm text-lg text-club-green/70 max-w-2xl mx-auto">
                Simple packages. Clear pricing. No surprises.
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {services.map((service, index) => (
                <div 
                  key={index}
                  className="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="bg-action-yellow/20 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 text-action-yellow">
                    {service.icon}
                  </div>
                  <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green mb-2">
                    {service.title}
                  </h3>
                  <div className="font-archivo text-3xl text-action-yellow mb-4">
                    {service.price}
                  </div>
                  <ul className="space-y-2">
                    {service.features.map((feature, i) => (
                      <li key={i} className="font-dm text-club-green/70 flex items-start">
                        <span className="text-action-yellow mr-2">✓</span>
                        {feature}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <p className="font-dm text-club-green/60 mb-4">
                Full package: ~$2,000 • 4-week delivery
              </p>
              <Button 
                asChild 
                className="bg-club-green hover:bg-club-green/90 text-warm-cream rounded-pill px-8 py-6 font-dm font-bold uppercase tracking-wide transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <Link to="/services">
                  VIEW FULL DETAILS <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <WebsitePreviewSection />
        <SearchResultsShowcase />
        
        {/* Who's Building Your Site */}
        <section className="py-16 md:py-24 bg-club-green">
          <div className="container-custom">
            <div className="max-w-4xl mx-auto">
              <div className="bg-warm-cream rounded-3xl p-8 md:p-12">
                <div className="grid grid-cols-1 md:grid-cols-[200px,1fr] gap-8 items-center">
                  <div className="text-center md:text-left">
                    <div className="w-40 h-40 mx-auto md:mx-0 rounded-full bg-club-green/10 flex items-center justify-center text-6xl font-archivo text-club-green">
                      CD
                    </div>
                  </div>
                  <div>
                    <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-wide text-club-green mb-2">
                      WHO'S BUILDING YOUR SITE
                    </h2>
                    <div className="font-dm text-club-green/60 text-sm uppercase tracking-widest mb-4">
                      Charlie Dickerson
                    </div>
                    <p className="font-dm text-club-green/80 text-lg leading-relaxed mb-4">
                      VP of AI & Advanced Automation at <strong>Omnicom Media Group</strong>. 
                      I help Fortune 500 brands with their digital strategy. On the side, 
                      I build websites for local contractors who need a professional online 
                      presence—without the agency price tag.
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
        
        {/* Simple CTA */}
        <section className="py-16 md:py-24 bg-varsity-maroon">
          <div className="container-custom text-center">
            <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-6">
              READY TO GET ONLINE?
            </h2>
            <p className="font-dm text-lg text-warm-cream/80 max-w-2xl mx-auto mb-8">
              Book a free 15-minute call. We'll discuss your needs and I'll give you an honest assessment of whether we're a good fit.
            </p>
            <Button 
              asChild 
              className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-10 py-7 font-dm font-bold uppercase tracking-wide text-lg transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <Link to="/booking">
                BOOK A FREE CALL
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
