import React from 'react';
import ProShopCard from './ProShopCard';
import { BarChart2, Target, Zap } from 'lucide-react';

const ProShopSection: React.FC = () => {
  return (
    <section id="vibe" className="relative bg-warm-cream py-24">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="font-dm text-club-green/60 text-sm uppercase tracking-widest font-bold">
            THE PRO SHOP
          </span>
          <h2 className="font-archivo text-club-green text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide leading-none">
            YOUR TOOLS TO <span className="text-action-yellow">DOMINATE</span>
          </h2>
          <p className="font-dm text-club-green/70 text-lg md:text-xl max-w-3xl mx-auto">
            Three core systems. Zero fluff. Built for contractors who refuse to lose.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProShopCard
            icon={Target}
            title="LOCAL DOMINANCE"
            subtitle="SEO Strategy"
            description="Own the turf in your zip code. Our SEO system puts you at the top when homeowners search."
            link="/services/seo"
            iconBg="bg-action-yellow"
          />

          <ProShopCard
            icon={Zap}
            title="PAID VELOCITY"
            subtitle="Advertising"
            description="High-speed lead generation. Precision-targeted ads that turn browsers into booked jobs."
            link="/services/advertising"
            iconBg="bg-varsity-maroon"
          />

          <ProShopCard
            icon={BarChart2}
            title="THE DASHBOARD"
            subtitle="AI Analytics"
            description="Your score, in real-time. See exactly what's working and where to double down."
            link="/ai/dashboard"
            iconBg="bg-action-yellow"
          />
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="font-dm text-club-green/60 text-sm uppercase tracking-widest">
            Systems over hacks. Measurement over mystery.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProShopSection;
