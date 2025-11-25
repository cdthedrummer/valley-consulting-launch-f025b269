import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp, Target, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ClubhouseHero from '@/components/ClubhouseHero';
import ProShopSection from '@/components/ProShopSection';
import TechStackSection from '@/components/TechStackSection';
import ScorecardSection from '@/components/ScorecardSection';

const ClubhouseHome: React.FC = () => {
  // Local business schema for SEO
  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Hudson Valley Consulting Group",
    "description": "Website development and Google search optimization for contractors in the Hudson Valley",
    "url": "https://hudsonvalleycg.com",
    "telephone": "+18456758378",
    "email": "contact@hvcg.us",
    "address": {
      "@type": "PostalAddress",
      "addressRegion": "NY",
      "addressCountry": "US"
    },
    "areaServed": {
      "@type": "GeoCircle",
      "geoMidpoint": {
        "@type": "GeoCoordinates",
        "latitude": "41.7",
        "longitude": "-73.9"
      },
      "geoRadius": "80000"
    },
    "priceRange": "$$",
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "47"
    },
    "serviceArea": "Hudson Valley, NY"
  };

  const caseStudies = [
    {
      title: "HVAC Contractor",
      metric: "3.2x",
      label: "Lead Growth",
      description: "Increased qualified leads through local SEO and Google Ads optimization"
    },
    {
      title: "Plumbing Services",
      metric: "47%",
      label: "Lower CPL",
      description: "Reduced cost per lead with targeted ad campaigns and landing page optimization"
    },
    {
      title: "Deck Builder",
      metric: "$180K",
      label: "New Revenue",
      description: "Generated new project revenue through strategic marketing in first 6 months"
    }
  ];

  const resources = [
    {
      icon: <Target className="w-8 h-8" />,
      title: "AI Copilot",
      description: "Get instant marketing insights and lead qualification with our AI-powered assistant",
      link: "/resources/ai-copilot",
      badge: "7-Day Free Trial"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Marketing Checklist",
      description: "Essential marketing steps every contractor needs to dominate their local market",
      link: "/resources/marketing-checklist",
      badge: "Free Download"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Strategy Session",
      description: "Book a free 15-minute call to discuss your marketing goals and get expert advice",
      link: "/booking",
      badge: "Free Consultation"
    }
  ];

  return (
    <>
      <Helmet>
        <title>HVCG | Get More Local Customers</title>
        <meta
          name="description"
          content="Smart marketing for contractors. We build websites, handle your Google presence, and help you show up when customers search."
        />
        <meta
          name="keywords"
          content="contractor marketing, HVAC marketing, plumbing marketing, Hudson Valley contractors, local SEO, Google Ads for contractors, website development contractors, contractor advertising"
        />
        <script type="application/ld+json">
          {JSON.stringify(localBusinessSchema)}
        </script>
      </Helmet>

      <div className="min-h-screen bg-club-green scroll-smooth">
        <ClubhouseHero />
        <ProShopSection />
        
        {/* Case Studies Section */}
        <section id="results" className="py-16 md:py-24 bg-varsity-maroon">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-4">
                Real Results
              </h2>
              <p className="font-dm text-lg text-warm-cream/80 max-w-2xl mx-auto">
                See how we've helped contractors like you grow their business
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {caseStudies.map((study, index) => (
                <div 
                  key={index}
                  className="bg-warm-cream rounded-3xl p-8 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
                >
                  <div className="mb-4">
                    <div className="font-archivo text-5xl md:text-6xl text-action-yellow mb-2">
                      {study.metric}
                    </div>
                    <div className="font-dm text-sm uppercase tracking-widest text-club-green/60">
                      {study.label}
                    </div>
                  </div>
                  <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green mb-3">
                    {study.title}
                  </h3>
                  <p className="font-dm text-club-green/80">
                    {study.description}
                  </p>
                </div>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                asChild 
                className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-8 py-3 font-dm font-bold uppercase tracking-wide transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <Link to="/case-studies">
                  View All Case Studies <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>

        <TechStackSection />
        
        {/* Resources Section */}
        <section id="resources" className="py-16 md:py-24 bg-club-green">
          <div className="container-custom">
            <div className="text-center mb-12">
              <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-4">
                Free Resources
              </h2>
              <p className="font-dm text-lg text-warm-cream/80 max-w-2xl mx-auto">
                Tools and insights to help you grow your contracting business
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {resources.map((resource, index) => (
                <Link 
                  key={index}
                  to={resource.link}
                  className="group block"
                >
                  <div className="bg-warm-cream rounded-3xl p-8 h-full transition-all duration-300 hover:-translate-y-2 hover:shadow-lift relative overflow-hidden">
                    {resource.badge && (
                      <div className="absolute top-4 right-4 bg-action-yellow text-club-green px-3 py-1 rounded-pill text-xs font-dm font-bold uppercase tracking-wide">
                        {resource.badge}
                      </div>
                    )}
                    <div className="bg-action-yellow/20 w-16 h-16 rounded-3xl flex items-center justify-center mb-6 text-action-yellow group-hover:bg-action-yellow/30 transition-colors">
                      {resource.icon}
                    </div>
                    <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green mb-3 group-hover:text-action-yellow transition-colors">
                      {resource.title}
                    </h3>
                    <p className="font-dm text-club-green/80 mb-4">
                      {resource.description}
                    </p>
                    <div className="inline-flex items-center text-action-yellow font-dm font-bold uppercase tracking-wide text-sm group-hover:translate-x-1 transition-transform">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
            
            <div className="text-center">
              <Button 
                asChild 
                className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-8 py-3 font-dm font-bold uppercase tracking-wide transition-all hover:-translate-y-1 hover:shadow-lift"
              >
                <Link to="/resources">
                  View All Resources <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
        </section>
        
        <ScorecardSection />
      </div>
    </>
  );
};

export default ClubhouseHome;
