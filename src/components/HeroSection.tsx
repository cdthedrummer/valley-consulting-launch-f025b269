
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BusinessTagButton from './BusinessTagButton';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';
import StatsCard from './StatsCard';

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="w-full h-screen relative">
        <img 
          src="/lovable-uploads/1c9721c3-7053-4d03-ad41-97ed9a163d6f.png" 
          alt="Contractors shaking hands in an auto repair shop"
          className="w-full h-full object-cover"
        />
        {/* Black overlay with gradient */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 to-hvcg-blue-dark/90"></div>
      </div>

      {/* Interactive Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Main Content Container */}
        <div className="container mx-auto h-full flex flex-col items-center justify-center relative">
          {/* Best Deck Builder Button - Positioned on the left */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute top-32 left-8 z-10"
          >
            <Link to="/industries/deck-patio">
              <BusinessTagButton 
                text="Best Deck Builder in Hudson Valley" 
                className="shadow-lg bg-hvcg-blue/95 hover:bg-hvcg-blue" 
              />
            </Link>
          </motion.div>

          {/* Main content moved further down to make room for buttons */}
          <div className="max-w-2xl text-center mb-8 mt-24 md:mt-28 z-10 px-4">
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-white text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg"
            >
              We help Contractors 
              <span className="text-hvcg-green block mt-2">get more customers</span>
            </motion.h1>
            
            <motion.p 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="text-white text-lg md:text-2xl mb-10 drop-shadow-lg mx-auto"
            >
              Proven marketing strategies specifically designed for contractors serving the Hudson Valley
            </motion.p>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white text-lg py-6 px-8 shadow-lg group">
                <Link to="/booking" className="flex items-center">
                  <Calendar className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" /> 
                  Book my free strategy call 
                  <ArrowRight className="ml-2 h-5 w-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                </Link>
              </Button>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.0, duration: 0.5 }}
              className="mt-4 text-white/80 text-sm"
            >
              15-minute call, no obligations
            </motion.div>
          </div>
          
          {/* Mobile or Desktop stats section based on screen size */}
          {isMobile ? (
            // Mobile stats - vertical stack with more space and clear separation
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="absolute bottom-32 left-0 right-0 z-10 px-4"
            >
              <div className="flex flex-col space-y-6">
                <div className="text-center backdrop-blur-sm bg-black/20 rounded-lg py-3 px-4">
                  <div className="text-3xl font-bold text-hvcg-green mb-1">35%</div>
                  <div className="text-white text-sm">Average Lead Increase</div>
                </div>
                
                <div className="text-center backdrop-blur-sm bg-black/20 rounded-lg py-3 px-4">
                  <div className="text-3xl font-bold text-hvcg-green mb-1">60+</div>
                  <div className="text-white text-sm">Local Contractors Helped</div>
                </div>
                
                <div className="text-center backdrop-blur-sm bg-black/20 rounded-lg py-3 px-4">
                  <div className="text-3xl font-bold text-hvcg-green mb-1">5+</div>
                  <div className="text-white text-sm">Years in Hudson Valley</div>
                </div>
              </div>
            </motion.div>
          ) : (
            // Desktop stats - horizontal layout
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.3, duration: 0.5 }}
              className="absolute bottom-20 left-0 right-0 z-10"
            >
              <div className="container mx-auto">
                <div className="flex flex-wrap justify-center gap-8 md:gap-16">
                  <div className="text-center">
                    <div className="text-4xl font-bold text-hvcg-green mb-1">35%</div>
                    <div className="text-white text-sm">Average Lead Increase</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-hvcg-green mb-1">60+</div>
                    <div className="text-white text-sm">Local Contractors Helped</div>
                  </div>
                  <div className="text-center">
                    <div className="text-4xl font-bold text-hvcg-green mb-1">5+</div>
                    <div className="text-white text-sm">Years in Hudson Valley</div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </div>

      {/* Mobile Call Now & Compare Plans Button (visible on mobile only) */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden flex z-30">
        <a 
          href="tel:+18455551234" 
          className="flex-1 bg-hvcg-green text-white py-3 font-medium rounded-l-lg flex items-center justify-center shadow-lg"
        >
          <span className="h-5 w-5 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
            </svg>
          </span>
          Call Now
        </a>
        <Link 
          to="/services" 
          className="flex-1 bg-hvcg-blue text-white py-3 font-medium rounded-r-lg flex items-center justify-center shadow-lg"
        >
          <span className="h-5 w-5 mr-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="2" y="3" width="20" height="14" rx="2" ry="2"></rect>
              <line x1="8" y1="21" x2="16" y2="21"></line>
              <line x1="12" y1="17" x2="12" y2="21"></line>
            </svg>
          </span>
          Compare Plans
        </Link>
      </div>
    </section>
  );
};

export default HeroSection;
