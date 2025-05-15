
import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import WhyChooseSection from "./WhyChooseSection";

interface ServiceDetailLayoutProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  approachTitle: string;
  approachDescription: React.ReactNode;
  servicesList: string[];
  whyChooseTitle: string;
  whyChooseFeatures: Array<{
    title: string;
    description: string;
  }>;
}

const ServiceDetailLayout: React.FC<ServiceDetailLayoutProps> = ({
  icon,
  title,
  description,
  approachTitle,
  approachDescription,
  servicesList,
  whyChooseTitle,
  whyChooseFeatures,
}) => {
  return (
    <div className="container mx-auto py-12 px-4">
      <Link to="/services" className="inline-flex items-center text-hvcg-blue mb-8 hover:text-hvcg-blue-dark transition-colors">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Services
      </Link>
      
      <div className="max-w-4xl mx-auto">
        <div className="mb-10 text-center">
          <div className="bg-hvcg-blue/10 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
            {icon}
          </div>
          <h1 className="text-4xl font-bold text-hvcg-blue-dark mb-4">{title}</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            {description}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-lg p-8 mb-10">
          <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">{approachTitle}</h2>
          {approachDescription}
          <h3 className="text-xl font-semibold text-hvcg-blue-dark mt-6 mb-2">Our {title} Services Include:</h3>
          <ul className="list-disc pl-6 space-y-2 mb-6">
            {servicesList.map((service, index) => (
              <li key={index}>{service}</li>
            ))}
          </ul>
          
          <div className="mt-10 text-center">
            <Button asChild size="lg" className="bg-hvcg-green hover:bg-hvcg-green-light text-white">
              <Link to="/booking" className="flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> Book a Strategy Call
              </Link>
            </Button>
          </div>
        </div>
        
        <WhyChooseSection 
          title={whyChooseTitle} 
          features={whyChooseFeatures} 
        />
      </div>
    </div>
  );
};

export default ServiceDetailLayout;
