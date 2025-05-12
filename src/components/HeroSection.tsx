
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

  useEffect(() => {
    // Show widgets after a short delay when component mounts
    const timer = setTimeout(() => {
      setShowWidgets(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative">
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
        <div className="container mx-auto h-full relative">
          <div className="absolute top-1/4 left-10 max-w-xl">
            <h1 className="text-white text-4xl md:text-5xl font-bold mb-4 drop-shadow-lg">
              We help Hudson Valley Contractors get more customers
            </h1>
            <p className="text-white text-xl mb-8 drop-shadow-lg">
              Proven marketing strategies specifically designed for contractors serving the Hudson Valley
            </p>
            <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
              <Link to="/booking" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Book my strategy call
              </Link>
            </Button>
          </div>

          {/* Interactive Widgets */}
          {showWidgets && (
            <>
              {/* Business Tag Widget */}
              <div className="absolute top-[15%] right-10">
                <ScrollableWidget delay={300} duration={3000}>
                  <BusinessTagButton text="Best Deck Builder in Hudson Valley" />
                </ScrollableWidget>
              </div>
              
              {/* Leads Widget */}
              <div className="absolute top-[30%] right-20 w-64">
                <ScrollableWidget delay={1000} duration={3500}>
                  <StatsCard 
                    title="New Leads Today" 
                    value="7" 
                    change={15} 
                  />
                </ScrollableWidget>
              </div>
              
              {/* Traffic Widget */}
              <div className="absolute top-[50%] right-10 w-72">
                <ScrollableWidget delay={1500} duration={4000}>
                  <div className="p-4">
                    <h3 className="text-sm font-medium text-gray-500 mb-1">Website Traffic</h3>
                    <p className="text-2xl font-bold mb-2">1,248</p>
                    <SimpleChart data={trafficData} color="#0ea5e9" height={60} />
                    <p className="text-xs text-gray-500 mt-1 text-right">Last 7 days</p>
                  </div>
                </ScrollableWidget>
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
