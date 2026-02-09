import React from 'react';
import { Helmet } from 'react-helmet-async';
import { ExternalLink, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface PortfolioItem {
  name: string;
  industry: string;
  description: string;
  url?: string;
  image: string;
}

const Work: React.FC = () => {
  const portfolioItems: PortfolioItem[] = [
    {
      name: "McNulty's Junk Removal",
      industry: "Junk Removal",
      description: "Complete website redesign with online booking, service area maps, and before/after gallery.",
      url: "https://mcnultyjunk.com",
      image: "/images/website-showcase/full-website-design.png"
    },
    {
      name: "Reroll IRL",
      industry: "Interactive Experience",
      description: "Brand platform and website build for an immersive real-life RPG experience.",
      url: "https://rerollirl.com",
      image: "/lovable-uploads/b7d94ba4-5862-4c25-9c45-f6d145f059ad.png"
    },
    {
      name: "Hudson Valley HVAC Pro",
      industry: "HVAC",
      description: "Lead-focused landing pages with service scheduling, seasonal promotions, and review integration.",
      image: "/images/industries/hvac/hvac-hero.jpg"
    }
  ];

  return (
    <>
      <Helmet>
        <title>Our Work | HVCG - Contractor Website Portfolio</title>
        <meta
          name="description"
          content="See examples of professional contractor websites we've built. Clean designs, fast loading, mobile-friendly sites for HVAC, plumbing, electrical, and more."
        />
        <link rel="canonical" href="https://hudsonvalleycg.com/work" />
      </Helmet>

      {/* Hero Section */}
      <section className="bg-club-green text-warm-cream py-24 md:py-32">
        <div className="container-custom text-center">
          <h1 className="font-archivo text-4xl md:text-6xl uppercase tracking-wide mb-6">
            WEBSITES WE'VE BUILT
          </h1>
          <p className="text-xl text-warm-cream/80 max-w-2xl mx-auto">
            Professional, mobile-friendly sites that help contractors get found online.
          </p>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="bg-warm-cream py-16 md:py-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {portfolioItems.map((item, index) => (
              <div 
                key={index}
                className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 group"
              >
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={`${item.name} website`}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="bg-action-yellow/20 text-club-green px-3 py-1 rounded-pill text-xs font-dm font-bold uppercase tracking-wide">
                      {item.industry}
                    </span>
                    {item.url && (
                      <a 
                        href={item.url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-club-green/60 hover:text-action-yellow transition-colors"
                        aria-label={`Visit ${item.name} website`}
                      >
                        <ExternalLink className="h-5 w-5" />
                      </a>
                    )}
                  </div>
                  <h3 className="font-archivo text-xl uppercase tracking-wide text-club-green mb-2">
                    {item.name}
                  </h3>
                  <p className="font-dm text-club-green/70">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-varsity-maroon py-16 md:py-24">
        <div className="container-custom text-center">
          <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-6">
            READY TO GET STARTED?
          </h2>
          <p className="font-dm text-lg text-warm-cream/80 max-w-2xl mx-auto mb-8">
            Get a professional website for your contracting business. Starting at $1,399 with 4-week delivery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              asChild 
              className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-8 py-6 font-dm font-bold uppercase tracking-wide text-lg transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <Link to="/booking">
                BOOK A FREE CALL
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            <Button 
              asChild 
              variant="outline"
              className="border-2 border-warm-cream text-warm-cream hover:bg-warm-cream hover:text-varsity-maroon rounded-pill px-8 py-6 font-dm font-bold uppercase tracking-wide text-lg transition-all"
            >
              <Link to="/services">
                VIEW PRICING
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Work;
