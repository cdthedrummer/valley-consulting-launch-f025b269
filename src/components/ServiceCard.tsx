
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
    <Card className="border-none shadow-lg hover:shadow-xl transition-all">
      <CardContent className="p-6 text-center">
        <div className="bg-hvcg-blue/10 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
          {icon}
        </div>
        <h3 className="text-xl font-semibold text-hvcg-blue-dark mb-3">{title}</h3>
        <p className="text-gray-600 mb-4">
          {description}
        </p>
        <Link to={link} className="text-hvcg-blue font-medium inline-flex items-center">
          Learn more <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </CardContent>
    </Card>
  );
};

export default ServiceCard;
