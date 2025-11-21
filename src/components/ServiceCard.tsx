import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";

interface ServiceCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  link: string;
}

const ServiceCard: React.FC<ServiceCardProps> = ({ icon, title, description, link }) => {
  return (
    <Link to={link} className="group block">
      <div className="bg-club-green rounded-3xl overflow-hidden border border-warm-cream/10 transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
        <div className="p-8 text-center">
          <div className="bg-action-yellow/20 w-20 h-20 rounded-3xl flex items-center justify-center mx-auto mb-6">
            <div className="text-action-yellow">
              {icon}
            </div>
          </div>
          <h3 className="font-archivo text-2xl uppercase tracking-wide text-action-yellow mb-4">{title}</h3>
          <p className="text-warm-cream/80 mb-6 font-dm">
            {description}
          </p>
          <div className="inline-flex items-center text-action-yellow font-dm font-bold uppercase tracking-wide text-sm group-hover:translate-x-1 transition-transform">
            EXPLORE <ArrowRight className="ml-2 h-4 w-4" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ServiceCard;
