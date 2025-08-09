
import React from "react";
import { Link } from "react-router-dom";
import { Check, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceContentProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  id: string;
}

const ServiceContent: React.FC<ServiceContentProps> = ({ icon, title, description, features, id }) => {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <div className="flex flex-col md:flex-row md:items-center gap-6">
          <div className="bg-hvcg-blue/10 p-6 rounded-full flex items-center justify-center">
            {icon}
          </div>
          <div className="flex-1">
            <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">{title}</h2>
            <p className="text-lg text-gray-700 mb-6">
              {description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-hvcg-green mr-2 mt-1 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            <Button asChild className="bg-hvcg-blue-dark hover:bg-hvcg-blue">
              <Link to="/booking" aria-label={`Book a ${title} consultation`}>Book a {title} consultation</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContent;
