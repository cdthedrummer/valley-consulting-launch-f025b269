import React from 'react';
import { Monitor, Smartphone, MapPin, MessageSquare } from 'lucide-react';

const WebsitePreviewSection: React.FC = () => {
  const deliverables = [
    {
      icon: <Monitor className="w-6 h-6" />,
      title: "Complete Website",
      description: "Homepage, Services, About, Contact & Gallery pages"
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Mobile-Friendly",
      description: "Looks great on phones, tablets & desktops"
    },
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "Google Maps Ready",
      description: "Connected to your Business Profile"
    },
    {
      icon: <MessageSquare className="w-6 h-6" />,
      title: "Lead Capture",
      description: "Quote forms & click-to-call buttons"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-warm-cream">
      <div className="container-custom">
        <div className="text-center mb-12">
          <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-club-green mb-4">
            Here's What You Get
          </h2>
          <p className="font-dm text-lg text-club-green/80 max-w-2xl mx-auto">
            Professional websites built for contractors. See what we deliver.
          </p>
        </div>

        {/* Main Image */}
        <div className="mb-12">
          <div className="relative rounded-3xl overflow-hidden shadow-lift max-w-4xl mx-auto">
            <img 
              src="/images/website-showcase/website-preview-multi-device.png"
              alt="Website preview across multiple devices - desktop, tablet, and mobile"
              className="w-full h-auto"
              loading="lazy"
            />
          </div>
        </div>

        {/* Deliverables Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {deliverables.map((item, index) => (
            <div 
              key={index}
              className="bg-club-green rounded-2xl p-6 text-center transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
            >
              <div className="bg-action-yellow/20 w-14 h-14 rounded-2xl flex items-center justify-center mx-auto mb-4 text-action-yellow">
                {item.icon}
              </div>
              <h3 className="font-archivo text-lg uppercase tracking-wide text-warm-cream mb-2">
                {item.title}
              </h3>
              <p className="font-dm text-warm-cream/80 text-sm">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WebsitePreviewSection;
