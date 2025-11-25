import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
const ClubhouseHero: React.FC = () => {
  return <section id="overview" className="relative min-h-screen bg-club-green flex items-center overflow-hidden py-20 md:py-0">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Column - Copy */}
          <div className="space-y-6 animate-fade-in-up">
            {/* Star Rating */}
            <div className="flex items-center gap-1 mb-4">
              {[...Array(5)].map((_, i) => <span key={i} className="text-action-yellow text-2xl">★</span>)}
            </div>
            
            <div className="inline-block">
              <span className="font-dm text-warm-cream text-sm md:text-base uppercase tracking-widest font-bold">
                Top-Rated Marketing for Contractors
              </span>
            </div>
            
            <h1 className="font-archivo text-warm-cream text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase leading-none tracking-tight">
              GET MORE
              <span className="block mt-1">
                LOCAL
              </span>
              <span className="block mt-1">
                CUSTOMERS
              </span>
            </h1>

            <p className="font-dm text-warm-cream/90 text-base md:text-lg lg:text-xl leading-relaxed max-w-xl">We build websites, launch campaigns, and give you insights to help local customers find you. Simple, effective marketing that actually works for your business.</p>

            <div className="flex flex-col gap-4 pt-4">
              <Button asChild className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-10 py-7 font-dm font-bold uppercase tracking-wide text-lg md:text-xl transition-all hover:-translate-y-1 hover:shadow-lift active:scale-95 w-full sm:w-auto border-2 border-warm-cream">
                <Link to="/ai/dashboard">
                  LAUNCH DASHBOARD
                </Link>
              </Button>
              
              <div className="flex items-center gap-3 bg-warm-cream rounded-pill p-2 w-full sm:w-auto">
                <span className="font-dm text-club-green text-sm uppercase tracking-wide px-4 font-bold">
                  Get Offers
                </span>
                <Button asChild className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-8 py-4 font-dm font-bold uppercase tracking-wide text-base transition-all">
                  <Link to="/booking">
                    Email →
                  </Link>
                </Button>
              </div>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-fade-in-up order-first md:order-last" style={{
          animationDelay: '0.2s'
        }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl">
              <img src="/lovable-uploads/1c9721c3-7053-4d03-ad41-97ed9a163d6f.png" alt="Contractor reviewing analytics dashboard on iPad" className="w-full h-auto object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>;
};
export default ClubhouseHero;