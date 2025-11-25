import React, { useState } from 'react';
import { Trophy } from 'lucide-react';

const ScorecardSection: React.FC = () => {
  const [isHVCG, setIsHVCG] = useState(true);

  const metrics = [
    {
      category: 'NEW LEADS PER MONTH',
      par: '2-5 leads',
      hvcg: '15-20 leads',
      improvement: '3-4x More'
    },
    {
      category: 'YOUR TIME SPENT',
      par: '5-10 hours',
      hvcg: '~0 hours',
      improvement: 'We Handle It'
    },
    {
      category: 'DATA ACCESS',
      par: 'Monthly reports',
      hvcg: 'Live dashboard',
      improvement: 'Real-Time'
    },
    {
      category: 'MARKETING ROI',
      par: '$1.80 returned',
      hvcg: '$4.20 returned',
      improvement: '2.3x Better'
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
            THE <span className="text-action-yellow">SCORECARD</span>
          </h2>
          <p className="font-dm text-warm-cream/70 text-lg md:text-xl max-w-3xl mx-auto">
            See how working with us compares to doing it yourself or working with typical agencies.
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
              DIY / TYPICAL AGENCY
            </button>
            <button
              onClick={() => setIsHVCG(true)}
              className={`px-6 py-3 rounded-pill font-dm font-bold uppercase tracking-wide text-sm transition-all ${
                isHVCG
                  ? 'bg-action-yellow text-club-green'
                  : 'text-warm-cream/60 hover:text-warm-cream'
              }`}
            >
              WORKING WITH HVCG
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
                Typical Results
              </div>
              <div className="font-archivo text-action-yellow text-sm uppercase tracking-widest text-center">
                With HVCG
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
                Real results from contractors we work with in the Hudson Valley
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center mt-12">
          <p className="font-dm text-warm-cream/80 text-lg mb-6">
            Ready to get more customers?
          </p>
          <a
            href="/booking"
            className="inline-block bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-8 py-4 font-dm font-bold uppercase tracking-wide text-lg transition-all hover:-translate-y-1 hover:shadow-lift active:scale-95"
          >
            BOOK A CALL
          </a>
        </div>

        {/* Tech Stack Section - Below Scorecard */}
        <div className="mt-24 pt-12 border-t-2 border-dashed border-warm-cream/20">
          <div className="text-center mb-12">
            <h3 className="font-archivo text-warm-cream text-3xl md:text-4xl uppercase tracking-wide mb-4">
              POWERED BY THE <span className="text-action-yellow">BEST</span>
            </h3>
            <p className="font-dm text-warm-cream/70 text-lg max-w-3xl mx-auto">
              We leverage enterprise-grade data, cutting-edge AI, and battle-tested platforms to deliver results fast.
            </p>
          </div>

          {/* Data Sources */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-club-green/30 backdrop-blur-sm rounded-3xl p-6 border border-warm-cream/10">
              <h4 className="font-archivo text-action-yellow text-xl uppercase mb-3">Real Data</h4>
              <p className="font-dm text-warm-cream/80 text-sm leading-relaxed">
                10+ years enterprise experience + deep local contractor knowledge + US Census data = insights you can trust
              </p>
            </div>
            <div className="bg-club-green/30 backdrop-blur-sm rounded-3xl p-6 border border-warm-cream/10">
              <h4 className="font-archivo text-action-yellow text-xl uppercase mb-3">AI Powered</h4>
              <p className="font-dm text-warm-cream/80 text-sm leading-relaxed">
                Multi-model AI (Claude, ChatGPT, Gemini) for speed, reliability, security, and enterprise-grade features
              </p>
            </div>
            <div className="bg-club-green/30 backdrop-blur-sm rounded-3xl p-6 border border-warm-cream/10">
              <h4 className="font-archivo text-action-yellow text-xl uppercase mb-3">Fast Delivery</h4>
              <p className="font-dm text-warm-cream/80 text-sm leading-relaxed">
                Built on Lovable & Replit for lightning-fast site creation, updates, and feedback loops
              </p>
            </div>
          </div>

          {/* What Powers Your Service */}
          <div className="bg-warm-cream rounded-3xl p-8 md:p-12">
            <h4 className="font-archivo text-club-green text-2xl md:text-3xl uppercase text-center mb-8">
              WHAT POWERS YOUR SERVICE
            </h4>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-club-green/80">
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-action-yellow rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-dm text-sm">
                  <strong className="text-club-green">Professional Websites:</strong> Homepage, services, about, contact, galleries built lightning-fast
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-action-yellow rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-dm text-sm">
                  <strong className="text-club-green">Google Optimization:</strong> Search & Maps setup so customers find you when they need you
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-action-yellow rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-dm text-sm">
                  <strong className="text-club-green">Lead Generation:</strong> Click-to-call, quote forms, and CTAs that convert visitors into customers
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-action-yellow rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-dm text-sm">
                  <strong className="text-club-green">AI Site Updates:</strong> Self-service tools with training & support for easy site management
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-action-yellow rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-dm text-sm">
                  <strong className="text-club-green">Mobile-First Design:</strong> Fast-loading, phone-friendly sites that work everywhere
                </p>
              </div>
              <div className="flex items-start space-x-3">
                <div className="w-2 h-2 bg-action-yellow rounded-full mt-2 flex-shrink-0"></div>
                <p className="font-dm text-sm">
                  <strong className="text-club-green">Real-Time Analytics:</strong> Live dashboards showing exactly where your leads come from
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScorecardSection;
