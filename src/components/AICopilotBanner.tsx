
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
      className="section bg-gradient-to-br from-primary/20 via-background to-accent/20 relative overflow-hidden"
    >
      {/* Animated glow effects */}
      <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-accent/20 rounded-full blur-3xl animate-pulse-glow delay-1000"></div>
      
      <div className="container-custom relative z-10">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-6">
            <motion.div 
              className="bg-primary/20 border border-primary/30 rounded-full p-5 backdrop-blur-md"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ type: "spring", stiffness: 400 }}
            >
              <Bot className="h-12 w-12 text-primary" />
            </motion.div>
            <div>
              <h3 className="text-2xl md:text-3xl font-bold mb-2">Launch Your AI Marketing Dashboard</h3>
              <p className="text-muted-foreground text-lg leading-relaxed normal-case font-normal tracking-normal">Get real-time market intelligence and data-driven insights for your contracting business</p>
            </div>
          </div>
          
          <Button 
            asChild 
            size="lg" 
            variant="premium"
            className="whitespace-nowrap group text-lg px-10 py-7"
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
