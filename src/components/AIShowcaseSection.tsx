import React from 'react';
import { Bot, Sparkles, MapPin, TrendingUp, Users } from 'lucide-react';

const AIShowcaseSection: React.FC = () => {
  return (
    <section id="vibe" className="py-20 bg-warm-cream">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-archivo text-4xl md:text-5xl uppercase tracking-wide text-club-green mb-6">
              Stop Guessing What Marketing Will Work
            </h2>
            <p className="font-dm text-lg md:text-xl text-club-green/80 mb-8">
              Most contractors waste money on generic marketing advice that doesn't work in their local market. Our AI understands the Hudson Valley market and gives you specific, actionable recommendations.
            </p>
            <div className="space-y-6">
              <div className="flex items-start">
                <MapPin className="h-7 w-7 text-action-yellow mt-1 mr-4 flex-shrink-0" />
                <div>
                  <strong className="font-dm text-club-green text-lg">Local Market Focus:</strong>
                  <p className="font-dm text-club-green/70 text-base">Specialized knowledge of Rockland & Westchester counties</p>
                </div>
              </div>
              <div className="flex items-start">
                <TrendingUp className="h-7 w-7 text-action-yellow mt-1 mr-4 flex-shrink-0" />
                <div>
                  <strong className="font-dm text-club-green text-lg">Data-Driven Insights:</strong>
                  <p className="font-dm text-club-green/70 text-base">Real housing data to identify opportunities</p>
                </div>
              </div>
              <div className="flex items-start">
                <Users className="h-7 w-7 text-action-yellow mt-1 mr-4 flex-shrink-0" />
                <div>
                  <strong className="font-dm text-club-green text-lg">Contractor-Specific:</strong>
                  <p className="font-dm text-club-green/70 text-base">Built for HVAC, plumbing, roofing, and home service pros</p>
                </div>
              </div>
            </div>
          </div>
          <div className="bg-club-green p-8 rounded-3xl shadow-2xl">
            <div className="bg-warm-cream p-6 rounded-3xl shadow-sm">
              <div className="flex items-start mb-6">
                <div className="bg-action-yellow text-club-green p-2.5 rounded-xl mr-3 flex-shrink-0">
                  <Bot className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-dm text-xs text-club-green/60 mb-2 uppercase tracking-wide font-bold">You ask:</p>
                  <p className="font-dm font-semibold text-base text-club-green">"How many homes sold in Nanuet last quarter?"</p>
                </div>
              </div>
              <div className="flex items-start">
                <div className="bg-club-green text-action-yellow p-2.5 rounded-xl mr-3 flex-shrink-0">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div className="flex-1">
                  <p className="font-dm text-xs text-club-green/60 mb-2 uppercase tracking-wide font-bold">AI responds:</p>
                  <p className="font-dm text-sm leading-relaxed text-club-green">
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
  );
};

export default AIShowcaseSection;
