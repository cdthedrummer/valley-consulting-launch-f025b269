import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';

const HeroSection: React.FC = () => {
  return (
    <section className="relative min-h-screen overflow-hidden flex items-center justify-center bg-gradient-to-br from-background via-background to-muted animate-gradient-shift bg-[length:200%_200%]">
      {/* Animated mesh background */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/30 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/30 rounded-full blur-3xl animate-pulse-glow delay-1000"></div>
      </div>

      {/* Main Content */}
      <div className="container-custom relative z-10">
        <div className="flex flex-col items-center justify-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-5xl"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-8 leading-none">
              Marketing Experts
              <span className="block text-primary mt-4 animate-pulse-glow">
                Powered By Big-Brand Experience
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.8 }}
              className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-12 max-w-4xl mx-auto leading-relaxed normal-case font-normal tracking-normal"
            >
              Smart SEO, targeted ads, and AI-powered market insights for contractors—designed to turn local searches into profitable leads.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.5 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-full px-10 py-7 text-lg font-bold uppercase tracking-widest shadow-lg hover:shadow-primary/50 hover:-translate-y-1 transition-all duration-300 group"
              >
                <Link to="/ai/dashboard" className="flex items-center gap-3">
                  <Zap className="h-6 w-6 group-hover:scale-110 transition-transform" />
                  Launch AI Dashboard
                  <ArrowRight className="h-5 w-5 opacity-0 -ml-2 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="rounded-full px-10 py-7 text-lg font-semibold uppercase tracking-wider border-2 border-primary/30 hover:border-primary hover:bg-primary/10 transition-all duration-300"
              >
                <Link to="/booking">Book Consultation</Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.9, duration: 0.5 }}
              className="mt-12 text-muted-foreground text-sm uppercase tracking-widest"
            >
              Start exploring market insights in 30 seconds
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1.5 h-1.5 bg-primary rounded-full mt-2"
          />
        </div>
      </motion.div>
    </section>
  );
};

export default HeroSection;
