import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ClubhouseHero: React.FC = () => {
  return (
    <section className="relative min-h-[90vh] bg-club-green flex items-center overflow-hidden py-20 md:py-24 lg:py-0">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-[55%,45%] gap-8 lg:gap-4 items-center">
          {/* Left Column - Copy */}
          <div className="space-y-6 animate-fade-in-up overflow-hidden">
            <div className="inline-block">
              <span className="font-dm text-action-yellow text-sm md:text-base uppercase tracking-widest font-bold">
                Hudson Valley Consulting Group
              </span>
            </div>
            
            <h1 className="font-archivo text-warm-cream text-4xl sm:text-5xl lg:text-5xl xl:text-6xl 2xl:text-7xl uppercase leading-none tracking-tight">
              PROFESSIONAL
              <span className="block mt-1">
                WEBSITES FOR
              </span>
              <span className="block mt-1 text-action-yellow">
                CONTRACTORS
              </span>
            </h1>

            <p className="font-dm text-warm-cream/90 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl">
              We build fast, mobile-friendly sites that help local customers find your business. Clean design, Google-ready, delivered in 4 weeks.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button 
                asChild 
                className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-10 py-7 font-dm font-bold uppercase tracking-wide text-lg transition-all hover:-translate-y-1 hover:shadow-lift active:scale-95"
              >
                <Link to="/work">
                  SEE OUR WORK
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button 
                asChild 
                variant="outline"
                className="border-2 border-warm-cream text-warm-cream hover:bg-warm-cream hover:text-club-green rounded-pill px-8 py-7 font-dm font-bold uppercase tracking-wide text-lg transition-all"
              >
                <Link to="/booking">
                  BOOK A CALL
                </Link>
              </Button>
            </div>
            
            <p className="font-dm text-warm-cream/60 text-sm pt-2">
              Starting at $1,399 • 4-week delivery
            </p>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-fade-in-up order-first lg:order-last" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img 
                alt="Professional contractor website displayed on tablet" 
                className="w-full h-auto object-cover max-h-[500px]" 
                width="800" 
                height="500" 
                fetchPriority="high" 
                src="/lovable-uploads/b7d94ba4-5862-4c25-9c45-f6d145f059ad.png" 
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClubhouseHero;
