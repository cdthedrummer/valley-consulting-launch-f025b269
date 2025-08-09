
import React from "react";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import ServicesPreviewSection from "@/components/ServicesPreviewSection";
import ServicePlansSection from "@/components/ServicePlansSection";
import IndustriesSection from "@/components/IndustriesSection";
import CertificationsSection from "@/components/CertificationsSection";
import ApproachSection from "@/components/ApproachSection";
import SchemaOrganization from "@/components/SchemaOrganization";
import FooterCTASection from "@/components/FooterCTASection";
import MobileCallButton from "@/components/MobileCallButton";
import TrustSignalsSection from "@/components/TrustSignalsSection";
import AICopilotBanner from "@/components/AICopilotBanner";
import { motion } from "framer-motion";
import ProblemsWeSolve from "@/components/ProblemsWeSolve";
import IndustriesWeServe from "@/components/IndustriesWeServe";
import AboutPreviewSection from "@/components/AboutPreviewSection";
import ServiceAreaSection from "@/components/ServiceAreaSection";

const Index: React.FC = () => {
  return (
    <div>
      <SEOHead 
        title="Hudson Valley Consulting | Marketing, AI & Advertising for Local Businesses"
        description="Practical marketing, AI, and advertising to grow leads and loyalty for dentists, legal, salons, home services and more. Local experts, real results."
        canonicalUrl="/"
        keywords="local marketing, small business advertising, AI marketing, dentist marketing, law firm marketing, salon advertising, contractor SEO"
      />

      {/* Hero Section with interactive elements */}
      <HeroSection />

      {/* AI Copilot Banner - NEW */}
      <AICopilotBanner />

      {/* Schema.org Organization */}
      <SchemaOrganization />

      {/* Problems We Solve */}
      <ProblemsWeSolve />

      {/* Trust Signals Section */}
      <TrustSignalsSection />

      {/* Certifications */}
      <CertificationsSection />

      {/* Our Approach */}
      <ApproachSection />

      {/* Services Preview Section */}
      <ServicesPreviewSection />

      {/* About Preview */}
      <AboutPreviewSection />

      {/* Industries We Serve */}
      <IndustriesWeServe />
      
      {/* Service Area */}
      <ServiceAreaSection />
      
      {/* Service Packages Section */}
      <ServicePlansSection />

      {/* Industries Grid */}
      <IndustriesSection />
      
      {/* Footer CTA */}
      <FooterCTASection />

      {/* Mobile Call Now Button (visible on mobile only) */}
      <MobileCallButton />
    </div>
  );
};

export default Index;
