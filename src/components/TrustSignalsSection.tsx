import React from "react";
import { motion } from "framer-motion";
import { Shield, Trophy, ThumbsUp } from "lucide-react";
const TrustSignalsSection: React.FC = () => {
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
  return <section className="py-12 bg-white">
      <div className="container-custom">
        <motion.div initial={{
        opacity: 0,
        y: 10
      }} whileInView={{
        opacity: 1,
        y: 0
      }} viewport={{
        once: true
      }} className="text-center mb-10">
          <h2 className="text-2xl font-medium text-hvcg-blue-dark">Trusted by Contractors Throughout the Hudson Valley</h2>
        </motion.div>
        
        <motion.div variants={container} initial="hidden" whileInView="show" viewport={{
        once: true
      }} className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <motion.div variants={item} className="flex flex-col items-center text-center">
            <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Trophy className="text-hvcg-blue-dark w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">5+ Years Experience</h3>
            <p className="text-gray-600">Working exclusively with contractors and home service businesses in the Hudson Valley region</p>
          </motion.div>
          
          <motion.div variants={item} className="flex flex-col items-center text-center">
            <div className="bg-hvcg-green/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <ThumbsUp className="text-hvcg-green w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">97% Client Satisfaction</h3>
            <p className="text-gray-600">Our clients see an average 35% increase in qualified leads within the first 3 months</p>
          </motion.div>
          
          <motion.div variants={item} className="flex flex-col items-center text-center">
            <div className="bg-hvcg-blue-dark/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Shield className="text-hvcg-blue-dark w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Google Partner</h3>
            <p className="text-gray-600">Certified expertise in Google Ads and local search optimization</p>
          </motion.div>
        </motion.div>
        
        
      </div>
    </section>;
};
export default TrustSignalsSection;