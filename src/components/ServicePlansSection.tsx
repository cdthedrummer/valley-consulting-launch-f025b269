
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import PricingCard from "@/components/PricingCard";

const ServicePlansSection: React.FC = () => {
  return (
    <section className="py-16 bg-hvcg-gray">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Choose Your Plan</h2>
          <p className="text-lg text-gray-700">
            Select the package that fits your needs and budget. Not sure which one is right for you?<br />
            Book a free 15-minute call to get matched with the best option.
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <PricingCard 
            title="Introductory Audit & Consultation"
            price="$700"
            description="One-time flat fee"
            features={[
              "Site audit: keywords, images, reviews",
              "Ad check: wasted spend, missed opps",
              "Budget plan: Google, Meta, Nextdoor",
              "Action plan + 30-min call"
            ]}
          />
          
          <PricingCard 
            title="Strategy Package"
            price="$1,100"
            description="Flat fee – includes strategy + support"
            features={[
              "Everything in the Introductory Audit",
              "Competitor + zip code insights",
              "GMB, Yelp, Angi audit",
              "Visitor profile: who's clicking + calling",
              "Spam lead check",
              "1-hr strategy call"
            ]}
            highlighted={true}
            highlightText="MOST POPULAR"
          />
          
          <PricingCard 
            title="Premium Retainer"
            price="$2,200"
            description="Ongoing monthly support"
            features={[
              "Ad management (Google, Meta, etc.)",
              "2 custom image ads per month",
              "Site + Reviews optimizations",
              "Lead tracking + monthly report",
              "Monthly performance call"
            ]}
          />
        </div>
        
        <div className="text-center mt-12">
          <p className="text-lg mb-4">Not sure which plan is right for your business?</p>
          <Button asChild variant="outline" size="lg" className="border-hvcg-blue text-hvcg-blue hover:bg-hvcg-blue hover:text-white">
            <Link to="/booking">Contact Us for Help</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicePlansSection;
