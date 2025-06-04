
import React from "react";
import SEOHead from "@/components/SEOHead";
import HeroSection from "@/components/HeroSection";
import ServicesPreviewSection from "@/components/ServicesPreviewSection";
import ServicePlansSection from "@/components/ServicePlansSection";
import IndustriesSection from "@/components/IndustriesSection";
import TestimonialSection from "@/components/TestimonialSection";
import FooterCTASection from "@/components/FooterCTASection";
import MobileCallButton from "@/components/MobileCallButton";
import TrustSignalsSection from "@/components/TrustSignalsSection";
import AICopilotBanner from "@/components/AICopilotBanner";
import { motion } from "framer-motion";

const Index: React.FC = () => {
  return (
    <div>
      <SEOHead 
        title="Hudson Valley Consulting | Marketing & Advertising for Local Contractors"
        description="Expert marketing and advertising services for contractors in the Hudson Valley region. Get more qualified leads with our proven strategies. 35% average lead increase."
        canonicalUrl="/"
        keywords="contractor marketing, hudson valley advertising, local contractor ads, hvac marketing, plumbing advertising, contractor SEO, deck builder marketing"
      />

      {/* Hero Section with interactive elements */}
      <HeroSection />

      {/* AI Copilot Banner - NEW */}
      <AICopilotBanner />

      {/* Trust Signals Section */}
      <TrustSignalsSection />

      {/* Services Preview Section */}
      <ServicesPreviewSection />
      
      {/* Testimonial Highlight */}
      <TestimonialSection />
      
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
