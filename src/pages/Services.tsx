
import React from "react";
import { Building, Search, Users, Code, Share2 } from "lucide-react";
import ServicesHero from "@/components/ServicesHero";
import ServiceContent from "@/components/ServiceContent";
import ServicesCTA from "@/components/ServicesCTA";
import ServicePlansSection from "@/components/ServicePlansSection";
import WhyChooseSection from "@/components/WhyChooseSection";

const Services: React.FC = () => {
  return (
    <div className="pt-20">
      {/* Hero Section */}
      <ServicesHero />

      {/* Services Sections */}
      <div className="bg-hvcg-gray py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 gap-16">
            {/* Google Ads Section */}
            <ServiceContent
              id="google-ads"
              icon={<Building className="text-hvcg-blue-dark w-16 h-16" />}
              title="Google Ads"
              description="Targeted Google Ads campaigns that bring qualified leads directly to your business. We specialize in local service ads and search campaigns that reach homeowners when they're actively looking for your services."
              features={[
                "Local service ads setup and management",
                "Keyword research and selection",
                "Ad copy optimization",
                "Landing page conversion optimization"
              ]}
            />

            {/* SEO Section */}
            <ServiceContent
              id="seo"
              icon={<Search className="text-hvcg-blue-dark w-16 h-16" />}
              title="Search Engine Optimization"
              description="Local SEO strategies that help your contracting business appear in search results when homeowners in your area are looking for your services, generating organic leads month after month."
              features={[
                "Local SEO optimization",
                "Google Business Profile optimization",
                "On-page SEO implementation",
                "Content strategy for contractors"
              ]}
            />

            {/* Social Media Marketing Section */}
            <ServiceContent
              id="social-media"
              icon={<Share2 className="text-hvcg-blue-dark w-16 h-16" />}
              title="Social Media Marketing"
              description="Strategic social media campaigns that showcase your work, build trust with potential customers, and create a strong online presence for your contracting business."
              features={[
                "Platform selection and strategy",
                "Content calendar development",
                "Social ad campaign management",
                "Review management strategies"
              ]}
            />

            {/* Website Development Section */}
            <ServiceContent
              id="website"
              icon={<Code className="text-hvcg-blue-dark w-16 h-16" />}
              title="Website Development"
              description="High-converting websites designed specifically for contractors that showcase your work, generate leads, and build trust with potential customers."
              features={[
                "Contractor-focused web design",
                "Mobile-responsive implementation",
                "Lead generation optimization",
                "Portfolio and testimonial showcase"
              ]}
            />

            {/* Business Consulting Section */}
            <ServiceContent
              id="consulting"
              icon={<Users className="text-hvcg-blue-dark w-16 h-16" />}
              title="Business Consulting"
              description="Strategic business consulting that helps contracting businesses improve operations, increase profitability, and scale effectively in the competitive Hudson Valley market."
              features={[
                "Business process optimization",
                "Growth strategy development",
                "Customer experience enhancement",
                "Pricing strategy optimization"
              ]}
            />
          </div>
        </div>
      </div>

      {/* Services Packages Section */}
      <ServicePlansSection />
      
      {/* CTA Section */}
      <ServicesCTA />
    </div>
  );
};

export default Services;
