import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
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
        <div className="container-custom h-full flex flex-col justify-between relative px-4 pt-0 pb-8">
          {/* Main content container */}
          <div className="flex-1 flex flex-col justify-center items-center min-h-0 md:py-20 lg:py-24 py-16">
            <div className="max-w-4xl text-center z-10 px-4 mb-8 lg:mb-12 xl:mb-16">
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-4 sm:mb-6 md:mb-8 drop-shadow-lg leading-tight"
              >
                Marketing experts
                <span className="text-hvcg-green block mt-1 sm:mt-2">powered by big-brand experience</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className="text-white text-lg sm:text-xl md:text-2xl lg:text-3xl mb-6 sm:mb-8 md:mb-10 drop-shadow-lg mx-auto max-w-3xl leading-relaxed"
              >
                Smart SEO, targeted ads, and AI-powered market insights for contractors—designed to turn local searches into profitable leads.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="mb-6 sm:mb-8 md:mb-10 lg:mb-12"
              >
                <Button
                  asChild
                  size="lg"
                  className="bg-hvcg-green hover:bg-hvcg-green-light text-white text-lg sm:text-xl md:text-2xl py-4 sm:py-5 md:py-6 px-6 sm:px-8 md:px-10 shadow-lg group"
                >
                  <Link to="/ai/dashboard" className="flex items-center">
                    <Calendar className="mr-2 h-6 w-6 sm:h-7 sm:w-7 md:h-8 md:w-8 group-hover:scale-110 transition-transform" />
                    Launch AI Dashboard
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
                Start exploring market insights in 30 seconds
              </motion.div>
            </div>
          </div>

          {/* Bottom spacing preserved without unverifiable stats */}
        </div>
      </div>

      {/* Note: Mobile CTA bar is provided globally via <MobileCallButton /> on the page. Removed from Hero to avoid duplication. */}
    </section>
  );
};

export default HeroSection;
