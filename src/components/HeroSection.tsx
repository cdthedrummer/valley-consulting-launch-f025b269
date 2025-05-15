
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import BusinessTagButton from './BusinessTagButton';

const HeroSection: React.FC = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // Check if viewport is mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    // Initial check
    checkMobile();
    
    // Add resize listener
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="w-full h-screen relative">
        <img 
          src="/lovable-uploads/5baca6cd-78bc-42bb-88f6-4f637aac6ed8.png" 
          alt="Roofing contractors working on a house"
          className="w-full h-full object-cover"
        />
        {/* Semi-transparent overlay with increased opacity */}
        <div className="absolute inset-0 bg-black/60"></div>
      </div>

      {/* Interactive Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Main Content Container */}
        <div className="container mx-auto h-full flex flex-col items-center justify-center relative">
          {/* Best Deck Builder Button - Positioned on the left */}
          <div className="absolute top-32 left-8 z-10">
            <Link to="/industries/deck-patio">
              <BusinessTagButton 
                text="Best Deck Builder in Hudson Valley" 
                className="shadow-lg bg-hvcg-blue/95 hover:bg-hvcg-blue" 
              />
            </Link>
          </div>

          {/* Main content moved further down to make room for buttons */}
          <div className="max-w-2xl text-center mb-8 mt-48 md:mt-56 z-10">
            <h1 className="text-white text-5xl md:text-7xl font-bold mb-6 drop-shadow-lg">
              We help Contractors get more customers
            </h1>
            <p className="text-white text-lg md:text-2xl mb-10 drop-shadow-lg mx-auto">
              Proven marketing strategies specifically designed for contractors serving the Hudson Valley
            </p>
            <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white text-lg py-6 px-8">
              <Link to="/booking" className="flex items-center">
                <Calendar className="mr-2 h-6 w-6" /> Book my strategy call
              </Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Call Now & Compare Plans Button (visible on mobile only) */}
      <div className="fixed bottom-4 left-4 right-4 md:hidden flex z-30">
        <a 
          href="tel:+18455551234" 
          className="flex-1 bg-hvcg-green text-white py-3 font-medium rounded-l-lg flex items-center justify-center"
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
          className="flex-1 bg-hvcg-blue text-white py-3 font-medium rounded-r-lg flex items-center justify-center"
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
