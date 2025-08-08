
import React from "react";
import { Link } from "react-router-dom";
import { Building, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";

const ServicesPreviewSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Services that grow your business</h2>
          <p className="text-lg text-gray-700">
            Clear, practical marketing, AI, and advertising for local businesses—built to drive leads, repeat customers, and revenue.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Building className="text-hvcg-blue-dark w-8 h-8" />}
            title="Advertising"
            description="Local search and paid campaigns tuned to high‑intent customers—measurable and profitable."
            link="/services/advertising"
          />
          
          <ServiceCard 
            icon={<Search className="text-hvcg-blue-dark w-8 h-8" />}
            title="SEO"
            description="Be found when people in your area search for you. Technical SEO + content that converts."
            link="/services/seo"
          />
          
          <ServiceCard 
            icon={<User className="text-hvcg-blue-dark w-8 h-8" />}
            title="Consulting"
            description="Hands-on guidance: audits, growth plans, and AI enablement tailored to your business."
            link="/services/consulting"
          />
        </div>

        <div className="text-center mt-12">
          <Button asChild size="lg" className="bg-hvcg-blue-dark hover:bg-hvcg-blue text-white">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreviewSection;
