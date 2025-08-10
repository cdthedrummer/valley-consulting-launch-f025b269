
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
        title="Hudson Valley Contractor Marketing | SEO, Ads & AI Automation"
        description="Local contractor marketing in the Hudson Valley: SEO, Google Ads, and AI automation to turn searches into calls."
        canonicalUrl="/"
        keywords="Hudson Valley contractor marketing, local SEO, Google Ads, AI automation, home services marketing, plumbing marketing, HVAC marketing"
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
