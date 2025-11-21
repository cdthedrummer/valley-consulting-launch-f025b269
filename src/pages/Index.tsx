
import React from "react";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import TrustedPartners from "@/components/TrustedPartners";
import GrowthFramework from "@/components/GrowthFramework";
import AIPlatformSection from "@/components/AIPlatformSection";
import ComparisonGrid from "@/components/ComparisonGrid";
import SchemaOrganization from "@/components/SchemaOrganization";
import SchemaLocalBusiness from "@/components/SchemaLocalBusiness";
import MobileCallButton from "@/components/MobileCallButton";

const Index: React.FC = () => {
  return (
    <div>
      <SEOHead 
        title="Hudson Valley Consulting | Architecting Local Market Dominance"
        description="Strategic marketing and AI-powered intelligence for contractors. Stop guessing, start dominating your local market with data-driven precision."
        canonicalUrl="/"
        keywords="contractor marketing strategy, market intelligence, competitive analysis, local market dominance, Hudson Valley marketing"
      />

      {/* Schema.org structured data */}
      <SchemaOrganization />
      <SchemaLocalBusiness />

      {/* Hero Section */}
      <HeroSection />

      {/* Trusted Partners */}
      <TrustedPartners />

      {/* Growth Framework (Services) */}
      <GrowthFramework />

      {/* AI Platform Section */}
      <AIPlatformSection />

      {/* Comparison Grid */}
      <ComparisonGrid />

      {/* Mobile Call Now Button (visible on mobile only) */}
      <MobileCallButton />
    </div>
  );
};

export default Index;
