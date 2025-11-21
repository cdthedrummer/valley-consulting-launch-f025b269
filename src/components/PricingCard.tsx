
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
    ? "bg-white border-none shadow-xl border-t-4 border-hvcg-green relative transform hover:scale-105 transition-all duration-300 z-10" 
    : "bg-white border-none shadow-lg border-t-4 border-hvcg-blue-dark relative hover:shadow-xl transition-all duration-300";

  const buttonClasses = highlighted
    ? "w-full bg-hvcg-green hover:bg-hvcg-green-light shadow-md"
    : "w-full bg-hvcg-blue-dark hover:bg-hvcg-blue shadow-md";

  return (
    <Card className={cardClasses}>
      {highlighted && highlightText && (
        <div className="absolute -top-4 left-0 right-0 flex justify-center">
          <motion.span 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ 
              type: "spring", 
              stiffness: 400, 
              damping: 10 
            }}
            className="bg-hvcg-green text-white px-4 py-1 rounded-full text-sm font-bold shadow-md"
          >
            {highlightText}
          </motion.span>
        </div>
      )}
      <CardContent className="pt-8 pb-8 px-6">
        <div className="flex flex-col items-center mb-4">
          {icon && <div className="mb-4">{icon}</div>}
          <h3 className="text-2xl font-bold text-hvcg-blue-dark mb-2 text-center">{title}</h3>
        </div>
        <div className="text-center mb-6 relative">
          <span className="text-3xl font-bold">{price}</span>
          <span className="text-gray-600 block text-sm">{description}</span>
        </div>
        <h4 className="font-medium text-hvcg-blue-dark mb-4">What's Included:</h4>
        <ul className="space-y-3 mb-8">
          {features.map((feature, index) => (
            <motion.li 
              key={index} 
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
              viewport={{ once: true }}
              className="flex items-start"
            >
              <Check className="h-5 w-5 text-hvcg-green mt-1 mr-2 flex-shrink-0" />
              <span>{feature}</span>
            </motion.li>
          ))}
        </ul>
        <Button asChild className={buttonClasses}>
          <Link to="/booking" className="flex items-center justify-center group">
            <Calendar className="mr-2 h-5 w-5 group-hover:scale-110 transition-transform" /> 
            Book This Service
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
};

export default PricingCard;
