
import React from "react";
import { Link } from "react-router-dom";
import { Building, Search, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import ServiceCard from "@/components/ServiceCard";

const ServicesPreviewSection: React.FC = () => {
  return (
    <section className="section bg-background relative overflow-hidden">
      {/* Subtle glow effects */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">Services that grow your business</h2>
          <p className="text-xl text-muted-foreground leading-relaxed normal-case font-normal tracking-normal">
            Clear, practical marketing, AI, and advertising for local businesses—built to drive leads, repeat customers, and revenue.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <ServiceCard 
            icon={<Building className="text-primary w-8 h-8" />}
            title="Advertising"
            description="Local search and paid campaigns tuned to high‑intent customers—measurable and profitable."
            link="/services/advertising"
          />
          
          <ServiceCard 
            icon={<Search className="text-primary w-8 h-8" />}
            title="SEO"
            description="Be found when people in your area search for you. Technical SEO + content that converts."
            link="/services/seo"
          />
          
          <ServiceCard 
            icon={<User className="text-primary w-8 h-8" />}
            title="Consulting"
            description="Hands-on guidance: audits, growth plans, and AI enablement tailored to your business."
            link="/services/consulting"
          />
        </div>

        <div className="text-center mt-16">
          <Button asChild size="lg" variant="premium">
            <Link to="/services">View All Services</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default ServicesPreviewSection;
