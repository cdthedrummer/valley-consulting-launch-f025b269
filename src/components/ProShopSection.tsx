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
            HOW WE HELP
          </span>
          <h2 className="font-archivo text-club-green text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide leading-none">
            THREE WAYS TO <span className="text-action-yellow">GROW</span>
          </h2>
          <p className="font-dm text-club-green/70 text-lg md:text-xl max-w-3xl mx-auto">
            We handle your website, Google presence, and ads so you can focus on the work.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ProShopCard
            icon={Target}
            title="WEBSITE DEVELOPMENT"
            subtitle="Get Found on Google"
            description="Professional websites built for contractors. We handle everything—design, Google setup, and making sure you show up when customers search."
            link="/services"
            iconBg="bg-action-yellow"
          />

          <ProShopCard
            icon={Zap}
            title="GOOGLE ADS"
            subtitle="Get Leads Fast"
            description="Run ads on Google to reach customers actively searching for your services. Pay only when someone clicks. Track every dollar spent."
            link="/services/advertising"
            iconBg="bg-action-yellow"
          />

          <ProShopCard
            icon={BarChart2}
            title="MARKETING DASHBOARD"
            subtitle="See Your Results"
            description="Track your website visitors, leads, and where they're coming from. Real data on what's working for your business."
            link="/ai/dashboard"
            iconBg="bg-action-yellow"
          />
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <p className="font-dm text-club-green/60 text-sm uppercase tracking-widest">
            Clear pricing. No surprises. Just marketing that works.
          </p>
        </div>
      </div>
    </section>
  );
};

export default ProShopSection;
