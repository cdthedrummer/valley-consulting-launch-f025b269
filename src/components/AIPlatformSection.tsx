import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Button } from './ui/button';
import { Brain, ArrowRight } from 'lucide-react';

const AIPlatformSection: React.FC = () => {
  return (
    <section id="platform" className="bg-deep-maroon py-32">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <div className="inline-flex items-center gap-3 bg-gold-accent/20 rounded-full px-6 py-3">
              <Brain className="h-5 w-5 text-gold-accent" />
              <span className="text-warm-cream font-bold text-sm uppercase tracking-wider">
                AI-Powered Intelligence
              </span>
            </div>
            
            <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-warm-cream leading-tight">
              Market Intelligence
              <br />
              <span className="text-gold-accent">On Demand</span>
            </h2>
            
            <p className="text-warm-cream/90 text-xl leading-relaxed">
              Access the same data our strategists use. Analyze trends, spy on competitors, and find opportunities 24/7.
            </p>
            
            <ul className="space-y-4">
              {[
                "Real-time market data and competitor analysis",
                "Property opportunity detection",
                "Campaign performance tracking",
                "Automated intelligence reports"
              ].map((feature, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.2 + index * 0.1 }}
                  className="flex items-start gap-3 text-warm-cream/80 text-lg"
                >
                  <div className="bg-gold-accent rounded-full w-2 h-2 mt-2 flex-shrink-0" />
                  {feature}
                </motion.li>
              ))}
            </ul>
            
            <Button
              asChild
              size="lg"
              className="bg-gold-accent hover:bg-gold-accent/90 text-foreground font-bold text-lg rounded-full px-8 py-6 transition-all duration-300 hover:-translate-y-1 shadow-2xl group mt-8"
            >
              <Link to="/ai/dashboard" className="flex items-center gap-2">
                Launch The Platform
                <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
              </Link>
            </Button>
          </motion.div>
          
          {/* Right: Dashboard Visual */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-warm-cream rounded-3xl shadow-2xl p-8 space-y-6">
              {/* Header */}
              <div className="flex items-center justify-between pb-4 border-b border-foreground/10">
                <h3 className="font-heading text-2xl text-foreground">Dashboard</h3>
                <div className="flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-gold-accent"></div>
                  <div className="w-3 h-3 rounded-full bg-club-green"></div>
                  <div className="w-3 h-3 rounded-full bg-deep-maroon"></div>
                </div>
              </div>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-club-green/10 rounded-2xl p-4">
                  <div className="text-foreground/60 text-xs font-bold uppercase mb-2">Market Share</div>
                  <div className="font-heading text-3xl text-club-green">24.8%</div>
                </div>
                <div className="bg-gold-accent/10 rounded-2xl p-4">
                  <div className="text-foreground/60 text-xs font-bold uppercase mb-2">Opportunities</div>
                  <div className="font-heading text-3xl text-gold-accent">18</div>
                </div>
              </div>
              
              {/* Chart Simulation */}
              <div className="space-y-3">
                <div className="text-foreground/70 text-sm font-bold">Competitive Position</div>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <div className="text-foreground/60 text-xs w-12">You</div>
                    <div className="flex-1 bg-foreground/5 rounded-full h-3">
                      <div className="bg-gold-accent rounded-full h-3 w-4/5"></div>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="text-foreground/60 text-xs w-12">Avg</div>
                    <div className="flex-1 bg-foreground/5 rounded-full h-3">
                      <div className="bg-club-green rounded-full h-3 w-2/5"></div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Activity Feed */}
              <div className="space-y-3 pt-4 border-t border-foreground/10">
                <div className="text-foreground/70 text-sm font-bold">Recent Activity</div>
                {[1, 2, 3].map((i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="w-2 h-2 rounded-full bg-gold-accent"></div>
                    <div className="text-foreground/60 text-sm">New opportunity detected</div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AIPlatformSection;
