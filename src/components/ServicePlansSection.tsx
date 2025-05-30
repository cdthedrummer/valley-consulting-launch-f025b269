
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
            Select the package that fits your needs and budget. Not sure which one is right for you?<br />
            <span className="font-medium">Book a free 15-minute call</span> to get matched with the best option.
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
          <div className="bg-hvcg-gray/50 p-6 rounded-lg inline-block">
            <p className="text-lg mb-4 font-medium">Not sure which plan is right for your business?</p>
            <Button asChild variant="default" size="lg" className="bg-hvcg-blue hover:bg-hvcg-blue-dark text-white shadow-md">
              <Link to="/booking">Contact Us for Help</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicePlansSection;
