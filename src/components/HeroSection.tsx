
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScrollableWidget from './ScrollableWidget';
import StatsCard from './StatsCard';
import SimpleChart from './SimpleChart';
import BusinessTagButton from './BusinessTagButton';

const trafficData = [
  { name: 'Mon', value: 400 },
  { name: 'Tue', value: 300 },
  { name: 'Wed', value: 500 },
  { name: 'Thu', value: 380 },
  { name: 'Fri', value: 600 },
  { name: 'Sat', value: 550 },
  { name: 'Sun', value: 420 },
];

const HeroSection: React.FC = () => {
  const [showWidgets, setShowWidgets] = useState(false);
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
    
    // Show widgets after a short delay when component mounts
    const timer = setTimeout(() => {
      setShowWidgets(true);
    }, 500);

    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  return (
    <section className="relative overflow-hidden">
      {/* Background Image */}
      <div className="w-full h-screen">
        <img 
          src="/lovable-uploads/ea09a919-020e-4f34-af0a-40c76bc177c2.png" 
          alt="Hudson Valley Contractor at work"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Interactive Overlay Content */}
      <div className="absolute top-0 left-0 w-full h-full">
        {/* Main Content Container */}
        <div className="container mx-auto h-full flex flex-col items-center justify-center relative">
          {/* Main content moved further down to make room for widgets */}
          <div className="max-w-2xl text-center mb-8 mt-32 md:mt-40 z-10">
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

          {/* Interactive Widgets with improved positioning */}
          {showWidgets && (
            <>
              {/* Business Tag Widget - moved to the left with more opaque background */}
              <div className={`absolute ${isMobile ? 'top-20 left-4' : 'top-[20%] left-10'}`}>
                <ScrollableWidget scrollFactor={0.2}>
                  <BusinessTagButton 
                    text="Best Deck Builder in Hudson Valley" 
                    className="shadow-lg bg-hvcg-blue/95" 
                  />
                </ScrollableWidget>
              </div>
              
              {/* Leads Widget - kept on the right with better positioning */}
              <div className={`absolute ${isMobile ? 'top-32 right-4 w-48' : 'top-[25%] right-12 w-64'}`}>
                <ScrollableWidget delay={300} scrollFactor={0.4}>
                  <StatsCard 
                    title="New Leads Today" 
                    value="7" 
                    change={15}
                    className="bg-white/90 backdrop-blur-sm" 
                  />
                </ScrollableWidget>
              </div>
              
              {/* Traffic Widget - better positioned */}
              <div className={`absolute ${isMobile ? 'top-64 right-4 w-56' : 'top-[45%] right-10 w-72'}`}>
                <ScrollableWidget delay={600} scrollFactor={-0.2}>
                  <div className="p-4 bg-white/90 backdrop-blur-sm rounded-lg">
                    <h3 className="text-sm font-medium text-gray-800 mb-1">Website Traffic</h3>
                    <p className="text-2xl font-bold text-gray-900 mb-2">1,248</p>
                    <SimpleChart data={trafficData} color="#2563eb" height={60} />
                    <p className="text-xs text-gray-600 mt-1 text-right">Last 7 days</p>
                  </div>
                </ScrollableWidget>
              </div>
            </>
          )}
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
