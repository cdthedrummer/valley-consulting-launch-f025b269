
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
    <Card className="border-none shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group bg-white rounded-xl overflow-hidden">
      <CardContent className="p-8 text-center">
        <div className="bg-hvcg-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:bg-hvcg-blue/20 group-hover:scale-110 transition-all duration-300">
          {icon}
        </div>
        <h3 className="text-2xl font-bold text-hvcg-blue-dark mb-4 tracking-subheading">{title}</h3>
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>
        <Link 
          to={link} 
          className="text-hvcg-blue font-semibold inline-flex items-center hover:text-hvcg-blue-dark transition-colors group-hover:translate-x-1 duration-300"
        >
          Learn more <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
