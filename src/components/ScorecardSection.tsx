import React, { useState } from 'react';
import { Trophy } from 'lucide-react';

const ScorecardSection: React.FC = () => {
  const [isHVCG, setIsHVCG] = useState(true);

  const metrics = [
    {
      category: 'LEAD VELOCITY',
      par: '15-20 leads/mo',
      hvcg: '45-60 leads/mo',
      improvement: '+200%'
    },
    {
      category: 'DATA TRANSPARENCY',
      par: 'Monthly PDF',
      hvcg: 'Real-Time Dashboard',
      improvement: 'Live'
    },
    {
      category: 'RESPONSE TIME',
      par: '24-48 hours',
      hvcg: '< 2 hours',
      improvement: '12x Faster'
    },
    {
      category: 'ROI CLARITY',
      par: 'Opaque',
      hvcg: 'Crystal Clear',
      improvement: '100%'
    }
  ];

  return (
    <section id="scorecard" className="relative bg-varsity-maroon py-24 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(#F2F0EA 1px, transparent 1px), linear-gradient(90deg, #F2F0EA 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4">
          <div className="flex items-center justify-center space-x-3">
            <Trophy className="w-8 h-8 text-action-yellow" />
            <span className="font-dm text-warm-cream/80 text-sm uppercase tracking-widest font-bold">
              THE SCORECARD
            </span>
          </div>
          <h2 className="font-archivo text-warm-cream text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide leading-none">
            HOW YOU <span className="text-action-yellow">WIN</span>
          </h2>
          <p className="font-dm text-warm-cream/70 text-lg md:text-xl max-w-3xl mx-auto">
            Compare your current agency to the HVCG standard. The numbers don't lie.
          </p>
        </div>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center mb-12">
          <div className="bg-club-green/50 rounded-pill p-2 backdrop-blur-sm border border-warm-cream/10">
            <button
              onClick={() => setIsHVCG(false)}
              className={`px-6 py-3 rounded-pill font-dm font-bold uppercase tracking-wide text-sm transition-all ${
                !isHVCG
                  ? 'bg-warm-cream text-club-green'
                  : 'text-warm-cream/60 hover:text-warm-cream'
              }`}
            >
              STANDARD AGENCY
            </button>
            <button
              onClick={() => setIsHVCG(true)}
              className={`px-6 py-3 rounded-pill font-dm font-bold uppercase tracking-wide text-sm transition-all ${
                isHVCG
                  ? 'bg-action-yellow text-club-green'
                  : 'text-warm-cream/60 hover:text-warm-cream'
              }`}
            >
              HVCG PARTNER
            </button>
          </div>
        </div>

        {/* Scorecard Table */}
        <div className="max-w-4xl mx-auto bg-warm-cream rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-8 md:p-12">
            {/* Table Header */}
            <div className="grid grid-cols-3 gap-4 mb-6 pb-6 border-b-2 border-dashed border-club-green/20">
              <div className="font-archivo text-club-green text-sm uppercase tracking-widest">
                METRIC
              </div>
              <div className="font-archivo text-club-green/60 text-sm uppercase tracking-widest text-center">
                PAR (Industry Avg)
              </div>
              <div className="font-archivo text-action-yellow text-sm uppercase tracking-widest text-center">
                HVCG PLAYER
              </div>
            </div>

            {/* Table Rows */}
            <div className="space-y-6">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 gap-4 pb-6 border-b border-dashed border-club-green/10 last:border-0 transition-all duration-300"
                >
                  <div className="font-dm text-club-green font-bold uppercase text-sm tracking-wide">
                    {metric.category}
                  </div>
                  <div className="font-dm text-club-green/70 text-center">
                    {metric.par}
                  </div>
                  <div className="text-center relative">
                    <div className={`inline-flex items-center justify-center transition-all duration-300 ${
                      isHVCG ? 'scale-110' : 'scale-100'
                    }`}>
                      {isHVCG && (
                        <div className="absolute inset-0 bg-action-yellow/20 rounded-full -m-3 animate-pulse"></div>
                      )}
                      <span className={`font-dm font-bold relative z-10 ${
                        isHVCG ? 'text-club-green' : 'text-club-green/70'
                      }`}>
                        {metric.hvcg}
                      </span>
                    </div>
                    {isHVCG && (
                      <div className="absolute -right-8 top-1/2 -translate-y-1/2">
                        <span className="font-dm text-action-yellow text-xs font-bold uppercase tracking-wide">
                          {metric.improvement}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Note */}
            <div className="mt-8 pt-6 border-t-2 border-dashed border-club-green/20 text-center">
              <p className="font-dm text-club-green/60 text-sm italic">
                * Results based on 50+ contractor partnerships across the Hudson Valley
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="font-dm text-warm-cream/80 text-lg mb-6">
            Ready to upgrade your game?
          </p>
          <a
            href="/booking"
            className="inline-block bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-8 py-4 font-dm font-bold uppercase tracking-wide text-lg transition-all hover:-translate-y-1 hover:shadow-lift active:scale-95"
          >
            BOOK YOUR TEE TIME
          </a>
        </div>
      </div>
    </section>
  );
};

export default ScorecardSection;
