import React from 'react';
import { ArrowRight, LucideIcon } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ProShopCardProps {
  icon: LucideIcon;
  title: string;
  subtitle: string;
  description: string;
  link: string;
  iconBg?: string;
}

const ProShopCard: React.FC<ProShopCardProps> = ({
  icon: Icon,
  title,
  subtitle,
  description,
  link,
  iconBg = 'bg-action-yellow'
}) => {
  return (
    <Link
      to={link}
      className="group relative bg-club-green rounded-3xl overflow-hidden border border-warm-cream/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift active:scale-95"
    >
      {/* Top Half - Icon Section */}
      <div className="relative h-48 bg-gradient-to-br from-club-green to-club-green/80 flex items-center justify-center overflow-hidden">
        <div className={`${iconBg} rounded-full w-20 h-20 flex items-center justify-center transform transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}>
          <Icon className="w-10 h-10 text-club-green" />
        </div>
        
        {/* Decorative Grid Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(#F2F0EA 1px, transparent 1px), linear-gradient(90deg, #F2F0EA 1px, transparent 1px)`,
            backgroundSize: '20px 20px'
          }}></div>
        </div>
      </div>

      {/* Bottom Half - Content */}
      <div className="p-6 space-y-3">
        <div>
          <h3 className="font-archivo text-action-yellow text-2xl uppercase tracking-wide leading-none">
            {title}
          </h3>
          <p className="font-dm text-warm-cream/60 text-sm uppercase tracking-widest mt-1">
            {subtitle}
          </p>
        </div>

        <p className="font-dm text-warm-cream/80 text-base leading-relaxed">
          {description}
        </p>

        <div className="flex items-center text-action-yellow font-dm text-sm uppercase tracking-wide font-bold pt-2 group-hover:translate-x-1 transition-transform">
          EXPLORE
          <ArrowRight className="ml-2 h-4 w-4" />
        </div>
      </div>

      {/* Hover Glow Effect */}
      <div className="absolute inset-0 bg-gradient-to-t from-action-yellow/0 to-action-yellow/0 group-hover:from-action-yellow/10 group-hover:to-transparent transition-all duration-300 pointer-events-none"></div>
    </Link>
  );
};

export default ProShopCard;
