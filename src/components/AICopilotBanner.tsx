
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
      className="bg-gradient-to-r from-hvcg-blue to-hvcg-blue-dark py-8"
    >
      <div className="container-custom">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-white">
            <div className="bg-white/20 rounded-full p-3">
              <Bot className="h-8 w-8" />
            </div>
            <div>
              <h3 className="text-xl font-bold mb-1">Try Our AI Marketing Copilot</h3>
              <p className="text-white/90">Get instant marketing insights and strategies tailored for your contracting business</p>
            </div>
          </div>
          
          <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white whitespace-nowrap group">
            <Link to="/resources/ai-copilot" className="flex items-center">
              Try AI Copilot Free
              <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
            </Link>
          </Button>
        </div>
      </div>
    </motion.section>
  );
};

export default AICopilotBanner;
