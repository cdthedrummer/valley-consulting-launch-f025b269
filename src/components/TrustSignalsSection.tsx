
import React from "react";
import { motion } from "framer-motion";
import { Shield, Trophy, ThumbsUp } from "lucide-react";

const TrustSignalsSection: React.FC = () => {
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };
  
  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 }
  };

  return (
    <section className="py-12 bg-white">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-10"
        >
          <h2 className="text-2xl font-medium text-hvcg-blue-dark">
            We've helped brands at every level—from national contractors to local service teams—cut waste, build smart campaigns, and finally make marketing make sense.
          </h2>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          <motion.div variants={item} className="flex flex-col items-center text-center">
            <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Trophy className="text-hvcg-blue-dark w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Led marketing strategy for $10M+ contractor brands</h3>
            <p className="text-gray-600">Enterprise-level experience now focused exclusively on Hudson Valley contractors</p>
          </motion.div>
          
          <motion.div variants={item} className="flex flex-col items-center text-center">
            <div className="bg-hvcg-green/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <ThumbsUp className="text-hvcg-green w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Scaled local campaigns for HVAC, Decking, and Plumbing</h3>
            <p className="text-gray-600">Years of hands-on experience with the exact challenges contractors face</p>
          </motion.div>
          
          <motion.div variants={item} className="flex flex-col items-center text-center">
            <div className="bg-hvcg-blue-dark/10 w-16 h-16 rounded-full flex items-center justify-center mb-4">
              <Shield className="text-hvcg-blue-dark w-8 h-8" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Real results without bloated agency retainers</h3>
            <p className="text-gray-600">Transparent pricing and honest guidance focused on what truly works</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustSignalsSection;
