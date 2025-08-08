
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BusinessTagButton from './BusinessTagButton';
import { motion } from 'framer-motion';
import { useIsMobile } from '@/hooks/use-mobile';

const HeroSection: React.FC = () => {
  const isMobile = useIsMobile();

  return (
    <section className="relative overflow-hidden">
      {/* Background Video/Image */}
      <div className="w-full h-screen relative">
        <video
          className="w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          preload="metadata"
          poster="/lovable-uploads/1c9721c3-7053-4d03-ad41-97ed9a163d6f.png"
          aria-label="Local business owners and contractors collaborating on site and in-office"
        >
          <source src="/videos/contractors-hero.mp4" type="video/mp4" />
        </video>
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 to-hvcg-blue-dark/95"></div>
      </div>

      {/* Interactive Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Main Content Container with flexbox layout */}
        <div className="container mx-auto h-full flex flex-col justify-between relative px-4 py-8">
          {/* Best Deck Builder Button - Better mobile positioning */}
          <motion.div 
            initial={{ opacity: 0, x: -100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1.2, duration: 0.5 }}
            className="absolute top-16 left-4 md:top-20 lg:top-24 xl:top-32 md:left-8 lg:left-12 z-10"
          >
            <Link to="/industries">
              <BusinessTagButton 
                text="Trusted by local businesses across the Hudson Valley" 
                className="shadow-lg bg-hvcg-blue/95 hover:bg-hvcg-blue text-xs sm:text-sm" 
              />
            </Link>
          </motion.div>

          {/* Main content container */}
          <div className="flex-1 flex flex-col justify-center items-center min-h-0 py-16 md:py-20 lg:py-24">
            <div className="max-w-4xl text-center z-10 px-4 mb-8 lg:mb-12 xl:mb-16">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold mb-4 sm:mb-6 md:mb-8 drop-shadow-lg leading-tight"
              >
                We help local businesses
                <span className="text-hvcg-green block mt-1 sm:mt-2">get more customers</span>
              </motion.h1>
              
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 md:mb-10 drop-shadow-lg mx-auto max-w-3xl leading-relaxed"
              >
                Practical marketing, AI, and advertising to grow leads and loyalty for dentists, law firms, salons, home services and more.
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white text-lg sm:text-xl md:text-2xl py-4 sm:py-5 md:py-6 px-6 sm:px-8 md:px-10 shadow-lg group">
                  <Link to="/booking" className="flex items-center">
                    <Calendar className="mr-2 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 group-hover:scale-110 transition-transform" /> 
                    Book my free strategy call 
                    <ArrowRight className="ml-2 h-5 w-5 sm:h-6 sm:w-6 md:h-7 md:w-7 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                  </Link>
                </Button>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.5 }}
                className="text-white/80 text-base sm:text-lg md:text-xl mb-12 lg:mb-16 xl:mb-20"
              >
                15-minute call, no obligations
              </motion.div>
            </div>
          </div>
          
          {/* Statistics section at bottom with proper spacing */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.3, duration: 0.5 }}
            className="z-10 pb-4"
          >
            <div className="flex justify-center gap-4 sm:gap-8 md:gap-12 lg:gap-16 xl:gap-24">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-hvcg-green mb-1">35%</div>
                <div className="text-white text-xs sm:text-sm md:text-base lg:text-lg">Average Lead Increase</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-hvcg-green mb-1">60+</div>
                <div className="text-white text-xs sm:text-sm md:text-base lg:text-lg">Local Businesses Helped</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold text-hvcg-green mb-1">5+</div>
                <div className="text-white text-xs sm:text-sm md:text-base lg:text-lg">Years Serving Hudson Valley</div>
              </div>
            </div>
          </motion.div>
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
