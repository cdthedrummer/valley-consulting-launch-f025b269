import React from 'react';
import { Sparkles, Zap, Shield, BarChart } from 'lucide-react';

const TechStackSection: React.FC = () => {
  const technologies = [
    {
      icon: <Sparkles className="h-8 w-8" />,
      title: "AI-Powered",
      description: "Smart algorithms analyze your market and find opportunities automatically"
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Lightning Fast",
      description: "Websites that load instantly and rank higher on Google"
    },
    {
      icon: <Shield className="h-8 w-8" />,
      title: "Secure & Reliable",
      description: "Enterprise-grade security protecting your business data 24/7"
    },
    {
      icon: <BarChart className="h-8 w-8" />,
      title: "Real-Time Analytics",
      description: "See exactly where your leads come from and what's working"
    }
  ];

  return (
    <section id="tech-stack" className="relative py-20 md:py-32 bg-varsity-maroon overflow-hidden">
      {/* Decorative Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-64 h-64 bg-action-yellow rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-warm-cream rounded-full blur-3xl"></div>
      </div>

      <div className="container-custom relative z-10">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <span className="font-dm text-action-yellow text-sm uppercase tracking-widest font-bold">
            TECHNOLOGY THAT WORKS
          </span>
          <h2 className="font-archivo text-warm-cream text-4xl md:text-5xl lg:text-6xl uppercase leading-tight">
            Built for{' '}
            <span className="text-action-yellow">Results</span>
          </h2>
          <p className="font-dm text-warm-cream/80 text-lg md:text-xl max-w-2xl mx-auto">
            We use cutting-edge technology to give contractors a competitive edge in their local market.
          </p>
        </div>

        {/* Tech Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
          {technologies.map((tech, index) => (
            <div
              key={index}
              className="group bg-club-green/30 backdrop-blur-sm rounded-3xl p-8 border-2 border-warm-cream/10 hover:border-action-yellow/50 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift"
            >
              <div className="flex flex-col space-y-4">
                <div className="w-16 h-16 bg-action-yellow rounded-2xl flex items-center justify-center text-club-green group-hover:scale-110 transition-transform duration-300">
                  {tech.icon}
                </div>
                <h3 className="font-archivo text-warm-cream text-2xl md:text-3xl uppercase">
                  {tech.title}
                </h3>
                <p className="font-dm text-warm-cream/70 text-base md:text-lg leading-relaxed">
                  {tech.description}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Stats */}
        <div className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { stat: "99.9%", label: "Uptime" },
            { stat: "<1s", label: "Load Time" },
            { stat: "24/7", label: "Support" },
            { stat: "A+", label: "Security" }
          ].map((item, index) => (
            <div key={index} className="text-center">
              <p className="font-archivo text-action-yellow text-3xl md:text-4xl uppercase">
                {item.stat}
              </p>
              <p className="font-dm text-warm-cream/60 text-sm uppercase tracking-wide mt-2">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStackSection;
