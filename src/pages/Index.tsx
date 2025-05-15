
import React from "react";
import HeroSection from "@/components/HeroSection";
import ServicesPreviewSection from "@/components/ServicesPreviewSection";
import ServicePlansSection from "@/components/ServicePlansSection";
import IndustriesSection from "@/components/IndustriesSection";
import TestimonialSection from "@/components/TestimonialSection";
import AboutPreviewSection from "@/components/AboutPreviewSection";
import FooterCTASection from "@/components/FooterCTASection";
import MobileCallButton from "@/components/MobileCallButton";

const Index: React.FC = () => {
  return (
    <div>
      {/* Hero Section with interactive elements */}
      <HeroSection />

      {/* Services Preview Section */}
      <ServicesPreviewSection />
      
      {/* Service Packages Section */}
      <ServicePlansSection />

      {/* Industries Grid */}
      <IndustriesSection />
      
      {/* Testimonial Highlight */}
      <TestimonialSection />
      
      {/* About Us Preview */}
      <AboutPreviewSection />
      
      {/* Footer CTA */}
      <FooterCTASection />

      {/* Mobile Call Now Button (visible on mobile only) */}
      <MobileCallButton />
    </div>
  );
};

export default Index;
