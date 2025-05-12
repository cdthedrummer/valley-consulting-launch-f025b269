
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
        <div className="container mx-auto h-full flex flex-col items-center justify-center relative">
          <div className="max-w-2xl text-center mb-8">
            <h1 className="text-white text-5xl md:text-6xl font-bold mb-4 drop-shadow-lg">
              We help Contractors get more customers
            </h1>
            <p className="text-white text-xl md:text-2xl mb-8 drop-shadow-lg mx-auto">
              Proven marketing strategies specifically designed for contractors serving the Hudson Valley
            </p>
            <Button asChild size="xl" className="bg-hvcg-green hover:bg-hvcg-green-light text-white text-lg py-6 px-8">
              <Link to="/services" className="flex items-center">
                <Calendar className="mr-2 h-6 w-6" /> Book my strategy call
              </Link>
            </Button>
          </div>

          {/* Interactive Widgets */}
          {showWidgets && (
            <>
              {/* Business Tag Widget */}
              <div className="absolute top-[15%] right-10">
                <ScrollableWidget delay={300}>
                  <BusinessTagButton text="Best Deck Builder in Hudson Valley" className="bg-transparent shadow-none hover:bg-hvcg-blue/70" />
                </ScrollableWidget>
              </div>
              
              {/* Leads Widget */}
              <div className="absolute top-[30%] right-20 w-64">
                <ScrollableWidget delay={1000}>
                  <StatsCard 
                    title="New Leads Today" 
                    value="7" 
                    change={15}
                    className="bg-transparent" 
                  />
                </ScrollableWidget>
              </div>
              
              {/* Traffic Widget */}
              <div className="absolute top-[50%] right-10 w-72">
                <ScrollableWidget delay={1500}>
                  <div className="p-4 bg-transparent">
                    <h3 className="text-sm font-medium text-white mb-1">Website Traffic</h3>
                    <p className="text-2xl font-bold text-white mb-2">1,248</p>
                    <SimpleChart data={trafficData} color="#ffffff" height={60} />
                    <p className="text-xs text-white/80 mt-1 text-right">Last 7 days</p>
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
