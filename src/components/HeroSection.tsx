import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, TrendingUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section id="vision" className="relative min-h-screen bg-club-green flex items-center pt-32 pb-20">
      <div className="container-custom">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left: Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-8"
          >
            <h1 className="font-heading text-5xl md:text-7xl lg:text-8xl text-warm-cream leading-none tracking-tight">
              STOP GUESSING.
              <br />
              <span className="text-gold-accent">START DOMINATING.</span>
            </h1>
            
            <p className="text-warm-cream/90 text-xl md:text-2xl leading-relaxed max-w-2xl">
              We architect local market takeovers. Get the strategy, data, and tools to outpace your competition.
            </p>
            
            {/* CTA Group */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                asChild
                size="lg"
                className="bg-gold-accent hover:bg-gold-accent/90 text-foreground font-bold text-lg rounded-full px-8 py-6 transition-all duration-300 hover:-translate-y-1 shadow-2xl group"
              >
                <Link to="/booking" className="flex items-center gap-2">
                  Book Strategy Session
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
              
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-2 border-warm-cream text-warm-cream hover:bg-warm-cream hover:text-club-green font-bold text-lg rounded-full px-8 py-6 transition-all duration-300 hover:-translate-y-1 group"
              >
                <Link to="/ai/dashboard" className="flex items-center gap-2">
                  Explore AI Insights
                  <ArrowRight className="h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Link>
              </Button>
            </div>
          </motion.div>
          
          {/* Right: Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-warm-cream rounded-3xl shadow-2xl p-8 space-y-6">
              <div className="flex items-center justify-between">
                <h3 className="font-heading text-2xl text-foreground">Current Velocity</h3>
                <TrendingUp className="h-8 w-8 text-gold-accent" />
              </div>
              
              {/* Metric Card */}
              <div className="bg-club-green rounded-2xl p-6 space-y-4">
                <div className="text-warm-cream/70 text-sm font-medium uppercase tracking-wider">
                  Growth Metric
                </div>
                <div className="text-gold-accent font-heading text-6xl">
                  +142%
                </div>
                <div className="text-warm-cream/90 text-lg">
                  Average client growth in 6 months
                </div>
              </div>
              
              {/* Simple Graph Visualization */}
              <div className="space-y-3">
                <div className="flex items-end gap-2 h-32">
                  <div className="bg-club-green/20 rounded-t-lg flex-1 h-1/3"></div>
                  <div className="bg-club-green/40 rounded-t-lg flex-1 h-1/2"></div>
                  <div className="bg-club-green/60 rounded-t-lg flex-1 h-2/3"></div>
                  <div className="bg-gold-accent rounded-t-lg flex-1 h-full"></div>
                </div>
                <div className="text-foreground/60 text-sm text-center">
                  Q1 → Q2 → Q3 → Q4
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
