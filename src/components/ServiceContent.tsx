
import React from "react";
import { Link } from "react-router-dom";
import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ServiceContentProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
  id: string;
  ctaTo?: string;
  ctaLabel?: string;
}

const ServiceContent: React.FC<ServiceContentProps> = ({ icon, title, description, features, id, ctaTo, ctaLabel }) => {
  return (
    <section id={id} className="scroll-mt-24">
      <div className="bg-club-green rounded-3xl overflow-hidden border border-warm-cream/10 p-8 md:p-12 hover:-translate-y-1 transition-all duration-300">
        <div className="flex flex-col md:flex-row md:items-start gap-8">
          <div className="bg-action-yellow/20 p-6 rounded-3xl flex items-center justify-center flex-shrink-0">
            <div className="text-action-yellow">
              {icon}
            </div>
          </div>
          <div className="flex-1">
            <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-action-yellow mb-4">{title}</h2>
            <p className="text-lg text-warm-cream/80 mb-6 font-dm">
              {description}
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
              {features.map((feature, index) => (
                <div key={index} className="flex items-start">
                  <Check className="h-5 w-5 text-action-yellow mr-3 mt-1 flex-shrink-0" />
                  <span className="text-warm-cream/90 font-dm">{feature}</span>
                </div>
              ))}
            </div>
            <Button asChild className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-full px-8 py-6 font-dm font-bold uppercase tracking-wide transition-all hover:-translate-y-1 active:scale-95">
              <Link to={ctaTo ?? "/booking"} aria-label={ctaLabel ? ctaLabel : `Book ${title}`}>
                {ctaLabel ?? `Book ${title}`}
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContent;
