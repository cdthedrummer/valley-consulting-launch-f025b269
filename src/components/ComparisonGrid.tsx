import React from 'react';
import { motion } from 'framer-motion';
import { Check, X } from 'lucide-react';

const ComparisonGrid: React.FC = () => {
  const metrics = [
    {
      metric: "Lead Response Time",
      industry: "48 Hours",
      hvc: "Instant",
      winner: true
    },
    {
      metric: "Data Transparency",
      industry: "Monthly PDF",
      hvc: "Real-Time Dashboard",
      winner: true
    },
    {
      metric: "ROI Focus",
      industry: "Impressions",
      hvc: "Revenue",
      winner: true
    },
    {
      metric: "Strategy Updates",
      industry: "Quarterly",
      hvc: "Continuous",
      winner: true
    }
  ];

  return (
    <section id="results" className="bg-warm-cream py-32">
      <div className="container-custom max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
            THE EVIDENCE
          </h2>
          <p className="text-foreground/70 text-xl max-w-3xl mx-auto">
            Why settle for generic when you can dominate?
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-club-green rounded-3xl shadow-2xl overflow-hidden"
        >
          {/* Header */}
          <div className="grid grid-cols-3 gap-4 p-8 border-b border-warm-cream/10">
            <div className="text-warm-cream/60 text-sm font-bold uppercase tracking-wider">
              Metric
            </div>
            <div className="text-warm-cream/60 text-sm font-bold uppercase tracking-wider text-center">
              Industry Average
            </div>
            <div className="text-gold-accent text-sm font-bold uppercase tracking-wider text-center">
              HVC Partner
            </div>
          </div>
          
          {/* Rows */}
          <div className="divide-y divide-warm-cream/10">
            {metrics.map((row, index) => (
              <motion.div
                key={row.metric}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="grid grid-cols-3 gap-4 p-8 hover:bg-warm-cream/5 transition-colors group"
              >
                <div className="text-warm-cream font-medium text-lg">
                  {row.metric}
                </div>
                <div className="text-warm-cream/60 text-center flex items-center justify-center gap-2">
                  <X className="h-4 w-4 text-destructive" />
                  {row.industry}
                </div>
                <div className="text-center flex items-center justify-center gap-2">
                  <div className="relative">
                    <Check className="h-5 w-5 text-gold-accent" />
                    {/* Circled Winner Effect */}
                    <svg className="absolute -inset-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300" viewBox="0 0 100 100">
                      <circle
                        cx="50"
                        cy="50"
                        r="45"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                        className="text-gold-accent"
                      />
                    </svg>
                  </div>
                  <span className="text-warm-cream font-bold text-lg">{row.hvc}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonGrid;
