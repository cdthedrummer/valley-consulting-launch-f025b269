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

      <header className="bg-club-green text-warm-cream py-24 md:py-32">
        <div className="container-custom text-center">
          <h1 className="font-archivo text-4xl md:text-6xl uppercase tracking-wide mb-6">OUR APPROACH</h1>
          <p className="text-warm-cream/80 text-xl max-w-3xl mx-auto">
            Simple marketing that works. No hacks, just results.
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
