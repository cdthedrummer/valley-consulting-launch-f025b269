
import React from "react";
import { Link } from "react-router-dom";
import { Bot, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";

const AICopilotBanner: React.FC = () => {
  return (
    <motion.section 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="bg-gradient-to-r from-hvcg-blue to-hvcg-blue-dark py-12 shadow-xl"
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6 text-white">
            <motion.div 
              className="bg-white/20 rounded-full p-4 backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Bot className="h-10 w-10" />
            </motion.div>
            <div>
              <h3 className="text-2xl font-bold mb-2 tracking-heading">Launch Your AI Marketing Dashboard</h3>
              <p className="text-white/95 text-lg leading-relaxed">Get real-time market intelligence and data-driven insights for your contracting business</p>
            </div>
          </div>
          
          <Button 
            asChild 
            size="lg" 
            className="bg-hvcg-green hover:bg-hvcg-green-light text-white whitespace-nowrap group shadow-2xl hover:shadow-hvcg-green/50 hover:-translate-y-1 transition-all duration-300 text-lg tracking-wide uppercase font-semibold px-8 py-6"
          >
            <Link to="/ai/dashboard" className="flex items-center">
              Launch Dashboard
              <ArrowRight className="ml-3 h-6 w-6 group-hover:translate-x-2 transition-transform duration-300" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default AICopilotBanner;
