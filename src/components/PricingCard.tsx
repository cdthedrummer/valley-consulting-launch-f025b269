
import React from "react";
import { Link } from "react-router-dom";
import { Calendar, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface PricingCardProps {
  title: string;
  price: string;
  description: string;
  features: string[];
  highlighted?: boolean;
  highlightText?: string;
  icon?: React.ReactNode;
}

const PricingCard: React.FC<PricingCardProps> = ({ 
  title, 
  price, 
  description, 
  features, 
  highlighted = false,
  highlightText,
  icon
}) => {
  const cardClasses = highlighted 
    ? "bg-white border-2 border-hvcg-green shadow-2xl relative transform hover:scale-105 hover:-translate-y-2 transition-all duration-300 z-10 rounded-2xl overflow-hidden" 
    : "bg-white border border-gray-200 shadow-lg relative hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 rounded-2xl overflow-hidden";

  const buttonClasses = highlighted
    ? "w-full bg-hvcg-green hover:bg-hvcg-green-light shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-lg tracking-wide uppercase font-semibold"
    : "w-full bg-hvcg-blue-dark hover:bg-hvcg-blue shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all duration-300 text-lg tracking-wide uppercase font-semibold";

  return (
    <Card className={cardClasses}>
      {highlighted && highlightText && (
        <div className="absolute -top-5 left-0 right-0 flex justify-center z-20">
          <motion.span 
            initial={{ scale: 0.8, y: -10 }}
            animate={{ scale: 1, y: 0 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 10 
            }}
            className="bg-gradient-to-r from-hvcg-green to-hvcg-green-light text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg uppercase tracking-wider"
          >
            {highlightText}
          </motion.span>
        </div>
      )}
      <CardContent className="pt-10 pb-10 px-8">
        <div className="flex flex-col items-center mb-6">
          {icon && <div className="mb-6">{icon}</div>}
          <h3 className="text-3xl font-bold text-hvcg-blue-dark mb-3 text-center tracking-subheading">{title}</h3>
        </div>
        <div className="text-center mb-8 relative">
          <span className="text-5xl font-bold text-hvcg-blue-dark tracking-tight">{price}</span>
          <span className="text-gray-600 block text-base mt-2 tracking-wide">{description}</span>
        </div>
        <h4 className="font-semibold text-hvcg-blue-dark mb-5 text-lg tracking-subheading uppercase">What's Included:</h4>
        <ul className="space-y-4 mb-10">
          {features.map((feature, index) => (
            <motion.li 
              key={index} 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start"
            >
              <Check className="h-6 w-6 text-hvcg-green mt-0.5 mr-3 flex-shrink-0" />
              <span className="text-gray-700 leading-relaxed">{feature}</span>
            </motion.li>
          ))}
        </ul>
        <Button asChild className={buttonClasses}>
          <Link to="/booking" className="flex items-center justify-center group py-6">
            <Calendar className="mr-2 h-6 w-6 group-hover:scale-110 transition-transform" /> 
            Book This Service
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
