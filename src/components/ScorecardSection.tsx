import React, { useState } from 'react';
import { Trophy } from 'lucide-react';

const ScorecardSection: React.FC = () => {
  const metrics = [
    {
      category: 'TIME TO LAUNCH',
      diy: '2-4 months',
      agency: '4-8 weeks',
      hvcg: '1-2 weeks'
    },
    {
      category: 'MONTHLY COST',
      diy: '$0-200',
      agency: '$2,000-5,000',
      hvcg: '$750-1,500'
    },
    {
      category: 'UPDATE SPEED',
      diy: 'Days/weeks',
      agency: '1-2 weeks',
      hvcg: '24-48 hours'
    },
    {
      category: 'LOCAL DATA INSIGHTS',
      diy: 'None',
      agency: 'Basic reports',
      hvcg: 'Real-time AI'
    },
    {
      category: 'YOUR TIME REQUIRED',
      diy: '10-20 hrs/week',
      agency: '2-3 hrs/week',
      hvcg: '<1 hr/week'
    },
    {
      category: 'AI-POWERED FEATURES',
      diy: 'None',
      agency: 'Rarely',
      hvcg: 'Built-in'
    },
    {
      category: 'TECH STACK',
      diy: 'DIY tools',
      agency: 'Varies',
      hvcg: 'Enterprise-grade'
    },
    {
      category: 'SUPPORT RESPONSE',
      diy: 'Forums/tutorials',
      agency: '24-48 hours',
      hvcg: 'Same day'
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
            THE <span className="text-action-yellow">COMPARISON</span>
          </h2>
          <p className="font-dm text-warm-cream/70 text-lg md:text-xl max-w-3xl mx-auto">
            See how we stack up against doing it yourself or working with typical agencies.
          </p>
        </div>

        {/* Scorecard Table */}
        <div className="max-w-6xl mx-auto bg-warm-cream rounded-3xl overflow-hidden shadow-2xl">
          <div className="p-6 md:p-10 overflow-x-auto">
            {/* Table Header */}
            <div className="grid grid-cols-4 gap-3 md:gap-4 mb-6 pb-6 border-b-2 border-dashed border-club-green/20 min-w-[600px]">
              <div className="font-archivo text-club-green text-xs md:text-sm uppercase tracking-widest">
                
              </div>
              <div className="font-archivo text-club-green/50 text-xs md:text-sm uppercase tracking-widest text-center">
                DIY
              </div>
              <div className="font-archivo text-club-green/60 text-xs md:text-sm uppercase tracking-widest text-center">
                Typical Agency
              </div>
              <div className="font-archivo text-action-yellow text-xs md:text-sm uppercase tracking-widest text-center">
                HVCG
              </div>
            </div>

            {/* Table Rows */}
            <div className="space-y-4 min-w-[600px]">
              {metrics.map((metric, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 gap-3 md:gap-4 pb-4 border-b border-dashed border-club-green/10 last:border-0 items-center"
                >
                  <div className="font-dm text-club-green font-bold uppercase text-xs md:text-sm tracking-wide">
                    {metric.category}
                  </div>
                  <div className="font-dm text-club-green/50 text-xs md:text-sm text-center">
                    {metric.diy}
                  </div>
                  <div className="font-dm text-club-green/70 text-xs md:text-sm text-center">
                    {metric.agency}
                  </div>
                  <div className="text-center relative">
                    <div className="inline-flex items-center justify-center">
                      <div className="absolute inset-0 bg-action-yellow/10 rounded-full -m-2"></div>
                      <span className="font-dm font-bold text-xs md:text-sm text-club-green relative z-10">
                        {metric.hvcg}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Note */}
            <div className="mt-8 pt-6 border-t-2 border-dashed border-club-green/20 text-center">
              <p className="font-dm text-club-green/60 text-sm italic">
                Real comparisons based on our experience with contractors in the Hudson Valley
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
        <div id="tech-stack" className="mt-24 pt-12 border-t-2 border-dashed border-warm-cream/20">
          <div className="text-center mb-16">
            <h3 className="font-archivo text-warm-cream text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide mb-6">
              THE <span className="text-action-yellow">TECH BEHIND</span> YOUR SUCCESS
            </h3>
            <p className="font-dm text-warm-cream/80 text-xl md:text-2xl max-w-3xl mx-auto">
              Enterprise-grade data, cutting-edge AI, and battle-tested platforms delivering results fast.
            </p>
          </div>

          {/* Data Sources with Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
            <div className="bg-club-green/30 backdrop-blur-sm rounded-3xl p-8 border border-warm-cream/10 text-center">
              <div className="text-action-yellow text-5xl font-archivo font-bold mb-3">10+</div>
              <h4 className="font-archivo text-action-yellow text-2xl uppercase mb-4">DATA STREAMS</h4>
              <p className="font-dm text-warm-cream/80 text-base leading-relaxed">
                Enterprise experience, local contractor expertise, US Census integration, and real-time market intelligence
              </p>
            </div>
            <div className="bg-club-green/30 backdrop-blur-sm rounded-3xl p-8 border border-warm-cream/10 text-center">
              <div className="text-action-yellow text-5xl font-archivo font-bold mb-3">30+</div>
              <h4 className="font-archivo text-action-yellow text-2xl uppercase mb-4">AI MODELS</h4>
              <p className="font-dm text-warm-cream/80 text-base leading-relaxed">
                Access to top frontier models: Claude Opus 4.5, Gemini 3, ChatGPT 5.1, and more
              </p>
            </div>
            <div className="bg-club-green/30 backdrop-blur-sm rounded-3xl p-8 border border-warm-cream/10 text-center">
              <div className="text-action-yellow text-5xl font-archivo font-bold mb-3">&lt;24hr</div>
              <h4 className="font-archivo text-action-yellow text-2xl uppercase mb-4">FAST DELIVERY</h4>
              <p className="font-dm text-warm-cream/80 text-base leading-relaxed">
                Lightning-fast site creation, updates, and feedback loops
              </p>
            </div>
          </div>

          {/* Tech Logos */}
          <div className="bg-warm-cream rounded-3xl p-10 md:p-16">
            <h4 className="font-archivo text-club-green text-3xl md:text-4xl uppercase text-center mb-12">
              POWERED BY INDUSTRY LEADERS
            </h4>
            
            {/* AI Models */}
            <div className="mb-12">
              <p className="font-dm text-club-green/60 text-sm uppercase tracking-widest text-center mb-6">AI Intelligence</p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                <img src="/images/tech-logos/claude-logo.png?v=2" alt="Anthropic Claude" className="h-10 md:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" width="120" height="48" loading="lazy" />
                <img src="/images/tech-logos/chatgpt-logo.png?v=2" alt="OpenAI ChatGPT" className="h-10 md:h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" width="120" height="48" loading="lazy" />
                <img src="/images/tech-logos/gemini-logo.png?v=2" alt="Google Gemini" className="w-32 md:w-36 h-auto max-h-10 md:max-h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" width="144" height="48" loading="lazy" />
              </div>
            </div>

            {/* Development Platforms */}
            <div className="mb-12">
              <p className="font-dm text-club-green/60 text-sm uppercase tracking-widest text-center mb-6">Development Speed</p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                <img src="/images/tech-logos/lovable-logo.png?v=2" alt="Lovable" className="h-7 md:h-8 object-contain opacity-80 hover:opacity-100 transition-opacity" width="100" height="32" loading="lazy" />
                <img src="/images/tech-logos/replit-logo.png?v=2" alt="Replit" className="w-28 md:w-32 h-auto max-h-10 md:max-h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" width="128" height="48" loading="lazy" />
              </div>
            </div>

            {/* Data Sources */}
            <div>
              <p className="font-dm text-club-green/60 text-sm uppercase tracking-widest text-center mb-6">Data Sources</p>
              <div className="flex flex-wrap items-center justify-center gap-8 md:gap-12">
                <img src="/images/tech-logos/census-wordmark.png?v=2" alt="US Census Bureau" className="w-36 md:w-40 h-auto max-h-10 md:max-h-12 object-contain opacity-80 hover:opacity-100 transition-opacity" width="160" height="48" loading="lazy" />
              </div>
            </div>

            {/* What It Powers - Compact List */}
            <div className="mt-12 pt-12 border-t-2 border-dashed border-club-green/20">
              <h5 className="font-archivo text-club-green text-2xl md:text-3xl uppercase text-center mb-8">
                WHAT THIS POWERS
              </h5>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-w-4xl mx-auto">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-action-yellow rounded-full flex-shrink-0"></div>
                  <p className="font-dm text-club-green font-bold text-base">Professional Website Builds</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-action-yellow rounded-full flex-shrink-0"></div>
                  <p className="font-dm text-club-green font-bold text-base">Google Search & Maps Optimization</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-action-yellow rounded-full flex-shrink-0"></div>
                  <p className="font-dm text-club-green font-bold text-base">Lead Generation Systems</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-action-yellow rounded-full flex-shrink-0"></div>
                  <p className="font-dm text-club-green font-bold text-base">AI-Powered Site Updates</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-action-yellow rounded-full flex-shrink-0"></div>
                  <p className="font-dm text-club-green font-bold text-base">Mobile-First Design</p>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-action-yellow rounded-full flex-shrink-0"></div>
                  <p className="font-dm text-club-green font-bold text-base">Real-Time Analytics Dashboards</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ScorecardSection;
