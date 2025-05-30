
import React from "react";
import { Link } from "react-router-dom";
import { Star, Check, Award } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const TestimonialSection: React.FC = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-white to-hvcg-gray">
      <div className="container-custom">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-hvcg-blue-dark mb-4">Why We're Different</h2>
          <p className="text-gray-600">Experience and expertise that most agencies simply don't have</p>
        </motion.div>
        
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-lg p-8"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="text-hvcg-blue-dark w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Led marketing strategy for $10M+ contractor brands</h3>
                <p className="text-gray-700">We've worked with some of the biggest names in home services, managing campaigns with serious budgets and real accountability.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-hvcg-green/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Check className="text-hvcg-green w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Scaled local campaigns for HVAC, Decking, and Plumbing</h3>
                <p className="text-gray-700">We understand the seasonal cycles, customer behavior, and local competition that contractors deal with every day.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-hvcg-blue-dark/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="text-hvcg-blue-dark w-8 h-8" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Real results without bloated agency retainers</h3>
                <p className="text-gray-700">No long-term contracts, no inflated promises. Just honest strategy and execution that gets results for your specific business.</p>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-hvcg-gray/30 rounded-lg">
              <p className="text-lg text-center text-gray-700 italic">
                "After 15+ years helping national brands scale their marketing, we realized small contractor businesses were stuck with overpriced agencies or doing it all themselves. We launched Hudson Valley Consulting to give them an edge—without the fluff."
              </p>
            </div>
          </motion.div>
        </div>
        
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <Button asChild variant="outline" className="border-hvcg-blue text-hvcg-blue hover:bg-hvcg-blue hover:text-white shadow-sm">
            <Link to="/about">Learn More About Our Experience</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
};

export default TestimonialSection;
