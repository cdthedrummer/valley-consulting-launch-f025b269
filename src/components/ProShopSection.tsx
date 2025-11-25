import React from 'react';
import { Link } from 'react-router-dom';
import ProShopCard from './ProShopCard';
import { BarChart2, Target, Zap, Bot } from 'lucide-react';
const ProShopSection: React.FC = () => {
  return <section id="pro-shop" className="relative bg-warm-cream py-24">
      <div className="container-custom">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="font-dm text-club-green/60 text-sm uppercase tracking-widest font-bold">
            HOW WE HELP
          </span>
          <h2 className="font-archivo text-club-green text-4xl md:text-5xl lg:text-6xl uppercase tracking-wide leading-none">ALL THE WAYS TO <span className="text-action-yellow">GROW</span>
          </h2>
          <p className="font-dm text-club-green/70 text-lg md:text-xl max-w-3xl mx-auto">We handle your website, Google  & AI search presence, and ads so you can focus on the work.</p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ProShopCard icon={Target} title="WEBSITE DEVELOPMENT" subtitle="Get Found on Google" description="Professional websites built for contractors. We handle everything—design, Google setup, and making sure you show up when customers search." link="/services/website-development" cardBg="bg-club-green" iconBg="bg-action-yellow" />

          <ProShopCard icon={Zap} title="DIGITAL ADVERTISING" subtitle="Get Leads Fast" description="Run targeted ads on Google, Facebook, and Instagram to reach customers actively searching for your services. Pay only for results." link="/services/advertising" cardBg="bg-varsity-maroon" iconBg="bg-action-yellow" />

          <ProShopCard icon={BarChart2} title="MARKETING DASHBOARD" subtitle="See Your Results" description="Track your website visitors, leads, and where they're coming from. Real data on what's working for your business." link="/ai/dashboard" cardBg="bg-action-yellow" iconBg="bg-club-green" />

          <ProShopCard icon={Bot} title="GEO (AI SEARCH)" subtitle="Be Found by AI" description="Optimize your site for AI search engines like ChatGPT, Claude, and Gemini. Get recommended when AI tools answer questions." link="/services/geo" cardBg="bg-[#5D4E37]" iconBg="bg-action-yellow" />
        </div>

        {/* Explore All Services Button */}
        <div className="text-center mt-12">
          <Link 
            to="/services" 
            className="inline-block font-dm text-club-green/70 hover:text-club-green text-sm uppercase tracking-widest font-bold transition-colors border-b-2 border-club-green/30 hover:border-club-green pb-1"
          >
            Explore All Services →
          </Link>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-8">
          <p className="font-dm text-club-green/60 text-sm uppercase tracking-widest">
            Clear pricing. No surprises. Just marketing that works.
          </p>
        </div>
      </div>
    </section>;
};
export default ProShopSection;