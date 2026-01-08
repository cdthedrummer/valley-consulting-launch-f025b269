import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Search, Star, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SearchResultsShowcase: React.FC = () => {
  const benefits = [
    {
      icon: <Search className="w-5 h-5" />,
      text: "Rank #1 on Google Maps"
    },
    {
      icon: <Star className="w-5 h-5" />,
      text: "Show up in local searches"
    },
    {
      icon: <TrendingUp className="w-5 h-5" />,
      text: "Track your performance"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-club-green">
      <div className="container-custom">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="order-2 lg:order-1">
            <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-6">
              Get Found When Customers Search
            </h2>
            <p className="font-dm text-lg text-warm-cream/80 mb-8">
              We connect your website to Google Search and Maps so customers find you first. 
              No more losing jobs to competitors with better online visibility.
            </p>
            
            {/* Benefits List */}
            <div className="space-y-4 mb-8">
              {benefits.map((benefit, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-4"
                >
                  <div className="bg-action-yellow/20 w-10 h-10 rounded-xl flex items-center justify-center text-action-yellow">
                    {benefit.icon}
                  </div>
                  <span className="font-dm text-warm-cream text-lg">
                    {benefit.text}
                  </span>
                </div>
              ))}
            </div>

            <Button 
              asChild 
              className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-8 py-3 font-dm font-bold uppercase tracking-wide transition-all hover:-translate-y-1 hover:shadow-lift"
            >
              <Link to="/services/website-development">
                See How It Works <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          {/* Image */}
          <div className="order-1 lg:order-2">
            <div className="relative rounded-3xl overflow-hidden shadow-lift">
              <img 
                src="/images/website-showcase/search-maps-results.png"
                alt="Google Search and Maps results showing contractor ranking #1 with analytics dashboard"
                className="w-full h-auto max-h-[500px] object-cover"
                loading="lazy"
                width="800"
                height="500"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SearchResultsShowcase;
