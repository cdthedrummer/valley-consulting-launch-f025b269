import React from 'react';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const ClubhouseHero: React.FC = () => {
  return (
    <section id="overview" className="relative min-h-screen bg-club-green flex items-center overflow-hidden pt-24">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Left Column - Copy */}
          <div className="space-y-6 animate-fade-in-up">
            <div className="inline-block">
              <span className="font-dm text-action-yellow text-sm uppercase tracking-widest font-bold">
                SMART MARKETING FOR CONTRACTORS
              </span>
            </div>
            
            <h1 className="font-archivo text-warm-cream text-5xl md:text-6xl lg:text-7xl uppercase leading-none tracking-wide">
              GET MORE{' '}
              <span className="text-action-yellow block mt-2">
                LOCAL CUSTOMERS.
              </span>
            </h1>

            <p className="font-dm text-warm-cream/80 text-lg md:text-xl leading-relaxed max-w-xl">
              We build websites that show up on Google and help local customers find you. 
              Simple, effective marketing that actually works for your business.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-8 py-6 font-dm font-bold uppercase tracking-wide text-lg transition-all hover:-translate-y-1 hover:shadow-lift active:scale-95"
              >
                <Link to="/ai/dashboard">
                  LAUNCH DASHBOARD
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
              
              <Button
                asChild
                variant="outline"
                className="bg-transparent border-2 border-warm-cream text-warm-cream hover:bg-warm-cream hover:text-club-green rounded-pill px-8 py-6 font-dm font-bold uppercase tracking-wide text-lg transition-all hover:-translate-y-1 hover:shadow-lift active:scale-95"
              >
                <Link to="/booking">
                  BOOK A CALL
                </Link>
              </Button>
            </div>

            <div className="pt-4">
              <p className="font-dm text-warm-cream/60 text-sm uppercase tracking-widest">
                See your marketing results in real time
              </p>
            </div>
          </div>

          {/* Right Column - Visual */}
          <div className="relative animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            <div className="relative rounded-3xl overflow-hidden shadow-2xl rotate-2 transform transition-transform hover:rotate-0 hover:-translate-y-2 duration-500">
              <img
                src="/lovable-uploads/1c9721c3-7053-4d03-ad41-97ed9a163d6f.png"
                alt="Contractor reviewing analytics dashboard on iPad"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-club-green/60 to-transparent"></div>
            </div>
            
            {/* Floating Stats Card */}
            <div className="absolute -bottom-6 -left-6 bg-warm-cream rounded-3xl p-6 shadow-2xl max-w-xs">
              <div className="flex items-center space-x-4">
                <div className="bg-action-yellow rounded-full w-12 h-12 flex items-center justify-center">
                  <span className="font-archivo text-club-green text-2xl">↑</span>
                </div>
                <div>
                  <p className="font-archivo text-club-green text-3xl uppercase">247%</p>
                  <p className="font-dm text-club-green/60 text-sm uppercase tracking-wide">More Leads</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-warm-cream/10 to-transparent"></div>
    </section>
  );
};

export default ClubhouseHero;
