import React from "react";
import { motion } from "framer-motion";
import { Shield, Trophy, ThumbsUp } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const TrustSignalsSection: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  const container = {
    hidden: {
      opacity: 0
    },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  const item = {
    hidden: {
      opacity: 0,
      y: 20
    },
    show: {
      opacity: 1,
      y: 0
    }
  };
  return <section ref={ref} className="section bg-gradient-to-b from-muted to-background relative overflow-hidden">
      {/* Subtle glow effects */}
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className={`text-center mb-16 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">Trusted by Contractors</h2>
          <p className="text-xl text-muted-foreground normal-case font-normal tracking-normal">Throughout the Hudson Valley</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className={`glass-card flex flex-col items-center text-center p-10 hover:shadow-xl hover:shadow-primary/20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-primary/10 border border-primary/20 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Trophy className="text-primary w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-3">5+ Years Experience</h3>
            <p className="text-muted-foreground leading-relaxed normal-case font-normal tracking-normal">Working exclusively with contractors and home service businesses in the Hudson Valley region</p>
          </div>
          
          <div className={`glass-card flex flex-col items-center text-center p-10 hover:shadow-xl hover:shadow-accent/20 transition-all duration-700 delay-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-accent/10 border border-accent/20 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <ThumbsUp className="text-accent w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-3">97% Client Satisfaction</h3>
            <p className="text-muted-foreground leading-relaxed normal-case font-normal tracking-normal">Our clients see an average 35% increase in qualified leads within the first 3 months</p>
          </div>
          
          <div className={`glass-card flex flex-col items-center text-center p-10 hover:shadow-xl hover:shadow-primary/20 transition-all duration-700 delay-200 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <div className="bg-primary/10 border border-primary/20 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
              <Shield className="text-primary w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-3">Google Partner</h3>
            <p className="text-muted-foreground leading-relaxed normal-case font-normal tracking-normal">Certified expertise in Google Ads and local search optimization</p>
          </div>
        </div>
        
        
      </div>
    </section>;
};
export default TrustSignalsSection;