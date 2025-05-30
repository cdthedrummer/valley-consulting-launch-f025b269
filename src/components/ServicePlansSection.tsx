
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/PricingCard";
import { motion } from "framer-motion";
import { Shield, Award, Clock } from "lucide-react";

const ServicePlansSection: React.FC = () => {
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
    <section className="py-20 bg-gradient-to-b from-hvcg-gray to-white">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-hvcg-blue-dark mb-4">Choose Your Plan</h2>
          <p className="text-lg text-gray-700">
            Designed for contractors ready to stop guessing and start growing. We do the heavy lifting on your local targeting, setup, and reporting.<br />
            <span className="font-medium">Not sure which one fits? Book a free 15-minute call</span> to get matched with the best option.
          </p>
        </motion.div>
        
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-3 gap-8"
        >
          <motion.div variants={item}>
            <PricingCard 
              title="Quick Start Audit"
              price="$500"
              description="One-time audit and action plan"
              features={[
                "Complete marketing audit: website, keywords, reviews",
                "Ad account review: wasted spend analysis",
                "Budget recommendations for Google, Meta, Nextdoor",
                "Clear action plan + 30-min strategy call"
              ]}
              icon={<Clock className="text-hvcg-blue h-12 w-12" />}
            />
          </motion.div>
          
          <motion.div variants={item}>
            <PricingCard 
              title="One-Time Strategy + Setup"
              price="$750"
              description="Complete strategy with implementation guidance"
              features={[
                "Everything in Quick Start Audit",
                "Local competitor analysis and insights",
                "Google Business Profile optimization review",
                "Customer journey mapping and lead quality assessment",
                "1-hour strategy session with implementation roadmap"
              ]}
              highlighted={true}
              highlightText="MOST POPULAR"
              icon={<Award className="text-hvcg-green h-12 w-12" />}
            />
          </motion.div>
          
          <motion.div variants={item}>
            <PricingCard 
              title="Ongoing Partnership"
              price="$1,500"
              description="Monthly marketing management"
              features={[
                "Hands-on ad management (Google, Meta, local platforms)",
                "2 custom ad creatives per month",
                "Website and review optimization",
                "Lead tracking with monthly performance reports",
                "Monthly strategy calls and campaign adjustments"
              ]}
              icon={<Shield className="text-hvcg-blue-dark h-12 w-12" />}
            />
          </motion.div>
        </motion.div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="text-center mt-12"
        >
          <div className="bg-hvcg-gray/50 p-6 rounded-lg inline-block">
            <p className="text-lg mb-4 font-medium">Ready to stop guessing about your marketing?</p>
            <Button asChild variant="default" size="lg" className="bg-hvcg-blue hover:bg-hvcg-blue-dark text-white shadow-md">
              <Link to="/booking">Talk to a Specialist</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicePlansSection;
