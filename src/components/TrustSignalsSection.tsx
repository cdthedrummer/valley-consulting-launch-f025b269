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
  return <section ref={ref} className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container-custom">
        <div className={`text-center mb-16 fade-in-up ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl font-bold text-hvcg-blue-dark tracking-heading uppercase mb-3">Trusted by Contractors</h2>
          <p className="text-xl text-gray-600">Throughout the Hudson Valley</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className={`flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 fade-in-up ${isVisible ? 'visible' : ''} fade-delay-1`}>
            <div className="bg-hvcg-blue/10 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Trophy className="text-hvcg-blue-dark w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-3 tracking-subheading">5+ Years Experience</h3>
            <p className="text-gray-600 leading-relaxed">Working exclusively with contractors and home service businesses in the Hudson Valley region</p>
          </div>
          
          <div className={`flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 fade-in-up ${isVisible ? 'visible' : ''} fade-delay-2`}>
            <div className="bg-hvcg-green/10 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <ThumbsUp className="text-hvcg-green w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-3 tracking-subheading">97% Client Satisfaction</h3>
            <p className="text-gray-600 leading-relaxed">Our clients see an average 35% increase in qualified leads within the first 3 months</p>
          </div>
          
          <div className={`flex flex-col items-center text-center p-8 bg-white rounded-xl shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-2 fade-in-up ${isVisible ? 'visible' : ''} fade-delay-3`}>
            <div className="bg-hvcg-blue-dark/10 w-20 h-20 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="text-hvcg-blue-dark w-10 h-10" />
            </div>
            <h3 className="text-2xl font-bold mb-3 tracking-subheading">Google Partner</h3>
            <p className="text-gray-600 leading-relaxed">Certified expertise in Google Ads and local search optimization</p>
          </div>
        </div>
        
        
      </div>
    </section>;
};
export default TrustSignalsSection;