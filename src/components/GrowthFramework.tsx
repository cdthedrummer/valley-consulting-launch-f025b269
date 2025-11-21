import React from 'react';
import { motion } from 'framer-motion';
import { Building2, Zap, BarChart3 } from 'lucide-react';

const GrowthFramework: React.FC = () => {
  const services = [
    {
      icon: Building2,
      title: "Infrastructure",
      subtitle: "SEO Foundation",
      description: "We build the digital foundation that puts you on the map."
    },
    {
      icon: Zap,
      title: "Velocity",
      subtitle: "Paid Campaigns",
      description: "Precision campaigns that target your ideal customer."
    },
    {
      icon: BarChart3,
      title: "Intelligence",
      subtitle: "Data & Reporting",
      description: "Real-time reporting. No vanity metrics, just ROI."
    }
  ];

  return (
    <section id="services" className="bg-warm-cream py-32">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-heading text-5xl md:text-6xl lg:text-7xl text-foreground mb-6">
            THE GROWTH FRAMEWORK
          </h2>
          <p className="text-foreground/70 text-xl max-w-3xl mx-auto">
            Our done-for-you service that turns your business into a market leader.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -8 }}
              className="bg-club-green rounded-3xl p-10 shadow-2xl hover:shadow-3xl transition-all duration-500 cursor-default group"
            >
              <service.icon className="h-16 w-16 text-gold-accent mb-6 group-hover:scale-110 transition-transform duration-300" />
              
              <div className="space-y-3 mb-6">
                <h3 className="font-heading text-3xl text-warm-cream">
                  {service.title}
                </h3>
                <p className="text-gold-accent text-sm font-bold uppercase tracking-wider">
                  {service.subtitle}
                </p>
              </div>
              
              <p className="text-warm-cream/80 text-lg leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default GrowthFramework;
