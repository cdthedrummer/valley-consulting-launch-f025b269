import React from "react";
import SEOHead from "@/components/SEOHead";
import ApproachSection from "@/components/ApproachSection";
import CertificationsSection from "@/components/CertificationsSection";
import ServicesCTA from "@/components/ServicesCTA";

const Approach: React.FC = () => {
  return (
    <div>
      <SEOHead
        title="Our Approach | Enterprise‑grade marketing for Hudson Valley"
        description="Data‑driven, privacy‑safe, measurement‑first marketing built for local businesses. Enterprise discipline, local results."
        canonicalUrl="/approach"
        keywords="marketing approach, why choose us, local marketing process, measurement first"
      />

      <header className="bg-hvcg-blue-dark text-white py-16 md:py-20">
        <div className="container-custom text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Our approach to local growth</h1>
          <p className="text-white/90 max-w-3xl mx-auto">
            We bring enterprise‑grade rigor to small business outcomes: measurement‑first, systems over hacks, and privacy by design.
          </p>
        </div>
      </header>

      <main>
        <ApproachSection />
        <CertificationsSection />
        <ServicesCTA />
      </main>
    </div>
  );
};

export default Approach;
