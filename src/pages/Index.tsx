
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
import { MapPin } from "lucide-react";

const Index: React.FC = () => {
  return (
    <div>
      {/* Hero Section with interactive elements */}
      <HeroSection />

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
      
      {/* Local Credibility Section */}
      <section className="py-12 bg-hvcg-blue-dark text-white">
        <div className="container-custom">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <div className="flex items-center justify-center mb-4">
              <MapPin className="text-hvcg-green w-8 h-8 mr-3" />
              <h2 className="text-2xl font-bold">Proudly Serving the Hudson Valley</h2>
            </div>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Based in the Hudson Valley. Proudly serving contractors across Rockland, Westchester, Dutchess, and Ulster Counties.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Footer CTA */}
      <FooterCTASection />

      {/* Mobile Call Now Button (visible on mobile only) */}
      <MobileCallButton />
    </div>
  );
};

export default Index;
