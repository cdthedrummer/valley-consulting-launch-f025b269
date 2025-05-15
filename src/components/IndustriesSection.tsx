
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import IndustryCard from "@/components/IndustryCard";

const IndustriesSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">We Help Contractors Like You</h2>
          <p className="text-lg text-gray-700">
            Specialized marketing strategies for different contracting trades in the Hudson Valley area.
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 text-center">
          {/* HVAC */}
          <IndustryCard
            title="HVAC"
            link="/industries/hvac"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hvcg-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M2 17h20M2 7h20M16 12H8M12 2v20"></path>
              </svg>
            }
          />
          
          {/* Plumbing */}
          <IndustryCard
            title="Plumbing"
            link="/industries/plumbing"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hvcg-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M12 2v20M2 6h4a2 2 0 0 1 2 2v12M2 6V2h20v4M22 6H18a2 2 0 0 0-2 2v12M18 18h4"></path>
              </svg>
            }
          />
          
          {/* Fencing */}
          <IndustryCard
            title="Fencing"
            link="/industries/fencing"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hvcg-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4v16M9 4v16M14 4v16M19 4v16M1 9h22M1 14h22"></path>
              </svg>
            }
          />
          
          {/* Deck/Patio */}
          <IndustryCard
            title="Deck/Patio"
            link="/industries/deck-patio"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hvcg-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="6" width="20" height="12" rx="2"></rect>
                <path d="M6 12h12M8 18v2M16 18v2"></path>
              </svg>
            }
          />
          
          {/* Flooring */}
          <IndustryCard
            title="Flooring"
            link="/industries/flooring"
            icon={
              <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-hvcg-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="2" y="2" width="20" height="20" rx="2"></rect>
                <path d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01"></path>
              </svg>
            }
          />
        </div>
        
        <div className="text-center mt-10">
          <Button asChild variant="outline" className="border-hvcg-blue text-hvcg-blue hover:bg-hvcg-blue hover:text-white">
            <Link to="/industries">View All Industries</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default IndustriesSection;
