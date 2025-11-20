
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link }) => {
  return (
    <Card className="glass-card hover:shadow-2xl hover:shadow-primary/20 transition-all duration-300 group overflow-hidden">
      <CardContent className="p-8 text-center">
        <div className="bg-primary/10 border border-primary/20 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-primary/20 group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-foreground group-hover:text-primary mb-4 transition-colors duration-300">{title}</h3>
        <p className="text-muted-foreground mb-6 leading-relaxed normal-case font-normal tracking-normal">
          {description}
        </p>
        <Link 
          to={link} 
          className="text-primary font-bold inline-flex items-center hover:text-primary/80 transition-all uppercase tracking-wider text-sm group-hover:translate-x-1 duration-300"
        >
          Learn more <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-2 transition-transform" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
