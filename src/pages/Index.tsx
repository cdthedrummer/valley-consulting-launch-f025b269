
import React from "react";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import ServicesPreviewSection from "@/components/ServicesPreviewSection";
import CaseSnapshotsSection from "@/components/CaseSnapshotsSection";
import ServicePlansSection from "@/components/ServicePlansSection";
import IndustriesSection from "@/components/IndustriesSection";
import CertificationsSection from "@/components/CertificationsSection";
import ApproachSection from "@/components/ApproachSection";
import SchemaOrganization from "@/components/SchemaOrganization";
import SchemaLocalBusiness from "@/components/SchemaLocalBusiness";
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
        title="Hudson Valley Contractor Marketing | AI-Powered Market Intelligence"
        description="AI-powered marketing dashboard for contractors: real-time market data, competitor analysis, and smart insights for HVAC, plumbing, and home services in Hudson Valley."
        canonicalUrl="/"
        keywords="Hudson Valley contractor marketing, AI marketing dashboard, market intelligence, Google Ads, local SEO, HVAC marketing, plumbing marketing"
      />

      {/* Hero Section with interactive elements */}
      <HeroSection />

      {/* AI Copilot Banner - NEW */}
      <AICopilotBanner />

      {/* Schema.org structured data */}
      <SchemaOrganization />
      <SchemaLocalBusiness />
      {/* Problems We Solve */}
      <ProblemsWeSolve />

      {/* Trust Signals Section */}
      <TrustSignalsSection />

      {/* Certifications */}
      <CertificationsSection />

      {/* Our Approach */}
      <ApproachSection />

      {/* Case Snapshots (anonymized) */}
      <CaseSnapshotsSection />

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
