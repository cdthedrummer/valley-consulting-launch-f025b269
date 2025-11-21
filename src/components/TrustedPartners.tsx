import React from 'react';
import { motion } from 'framer-motion';

const TrustedPartners: React.FC = () => {
  const partners = [
    "PRECISION HVAC",
    "ELITE PLUMBING",
    "MASTER BUILDERS",
    "APEX CONTRACTING",
    "SUMMIT SERVICES"
  ];

  return (
    <section className="bg-club-green py-16 border-y border-warm-cream/10">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-8"
        >
          <p className="text-warm-cream/60 text-sm font-bold uppercase tracking-[0.3em]">
            Trusted by Market Leaders
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
            {partners.map((partner, index) => (
              <motion.div
                key={partner}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 0.5 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-warm-cream/50 text-base md:text-lg font-medium tracking-wide hover:text-warm-cream/70 transition-colors cursor-default"
              >
                {partner}
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default TrustedPartners;
