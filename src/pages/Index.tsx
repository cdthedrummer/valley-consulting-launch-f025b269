
import React from "react";
import HeroSection from "@/components/HeroSection";
import ServicesPreviewSection from "@/components/ServicesPreviewSection";
import ServicePlansSection from "@/components/ServicePlansSection";
import IndustriesSection from "@/components/IndustriesSection";
import TestimonialSection from "@/components/TestimonialSection";
import FooterCTASection from "@/components/FooterCTASection";
import MobileCallButton from "@/components/MobileCallButton";
import TrustSignalsSection from "@/components/TrustSignalsSection";
import { motion } from "framer-motion";

const Index: React.FC = () => {
  return (
    <div>
      {/* Hero Section with interactive elements */}
      <HeroSection />

      {/* Trust Signals Section - NEW */}
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
