
import React from "react";

const AboutPreviewSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Built for local growth</h2>
          <p className="text-lg text-gray-700 mb-6">
            We’re a Hudson Valley marketing partner blending practical advertising with modern AI.
            No jargon—just clear plans, clean execution, and measurable results.
          </p>
          <p className="text-gray-700">
            Pedigree you can trust: multi‑agent AI systems, automation playbooks, and hands‑on consulting across
            complex organizations—applied simply for local businesses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPreviewSection;
