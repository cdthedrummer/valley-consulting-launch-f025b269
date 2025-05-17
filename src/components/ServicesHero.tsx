
import React from "react";
import { motion } from "framer-motion";

const ServicesHero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-hvcg-blue-dark to-hvcg-blue text-white py-16 relative">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="container-custom text-center relative z-10"
      >
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-xl max-w-3xl mx-auto text-white/90">
          Expert advertising consulting services tailored specifically for contractors who want to attract better leads and grow their business.
        </p>
      </motion.div>
    </section>
  );
};

export default ServicesHero;
