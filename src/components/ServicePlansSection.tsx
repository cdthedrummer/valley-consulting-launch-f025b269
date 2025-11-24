
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
    <section className="py-20 bg-club-green">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-action-yellow mb-4">Choose Your Plan</h2>
          <p className="font-dm text-lg text-warm-cream/80">
            Select the package that fits your needs and budget. Not sure which one is right for you?<br />
            <span className="font-bold text-warm-cream">Book a free 15-minute call</span> to get matched with the best option.
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
              title="Introductory Audit & Consultation"
              price="$500"
              description="One-time flat fee"
              features={[
                "Site audit: keywords, images, reviews",
                "Ad check: wasted spend, missed opps",
                "Budget plan: Google, Meta, Nextdoor",
                "Action plan + 30-min call"
              ]}
              icon={<Clock className="text-hvcg-blue h-12 w-12" />}
            />
          </motion.div>
          
          <motion.div variants={item}>
            <PricingCard 
              title="Strategy Package"
              price="$750"
              description="Flat fee – includes strategy + support"
              features={[
                "Everything in the Introductory Audit",
                "Competitor + zip code insights",
                "GMB, Yelp, Angi audit",
                "Visitor profile: who's clicking + calling",
                "Spam lead check",
                "1-hr strategy call"
              ]}
              highlighted={true}
              highlightText="MOST POPULAR"
              icon={<Award className="text-hvcg-green h-12 w-12" />}
            />
          </motion.div>
          
          <motion.div variants={item}>
            <PricingCard 
              title="Premium Retainer"
              price="$1,500"
              description="Ongoing monthly support"
              features={[
                "Ad management (Google, Meta, etc.)",
                "2 custom image ads per month",
                "Site + Reviews optimizations",
                "Lead tracking + monthly report",
                "Monthly performance call"
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
          <div className="bg-warm-cream/10 backdrop-blur-sm border border-warm-cream/20 p-8 rounded-3xl inline-block">
            <p className="font-dm text-lg mb-4 text-warm-cream">Not sure which plan is right for your business?</p>
            <Button asChild size="lg" className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill px-8 py-3 font-dm font-bold uppercase tracking-wide transition-all hover:-translate-y-1 hover:shadow-lift">
              <Link to="/booking">Contact Us for Help</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicePlansSection;
