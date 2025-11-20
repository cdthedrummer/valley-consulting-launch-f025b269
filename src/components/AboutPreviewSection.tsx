
import React from "react";

const AboutPreviewSection: React.FC = () => {
  return (
    <section className="section bg-background relative overflow-hidden">
      {/* Subtle glow effects */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-accent/5 rounded-full blur-3xl"></div>
      
      <div className="container-custom relative z-10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">Built for local growth</h2>
          <p className="text-xl text-muted-foreground mb-8 leading-relaxed normal-case font-normal tracking-normal">
            We're a Hudson Valley marketing partner blending practical advertising with modern AI.
            No jargon—just clear plans, clean execution, and measurable results.
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed normal-case font-normal tracking-normal">
            Pedigree you can trust: multi‑agent AI systems, automation playbooks, and hands‑on consulting across
            complex organizations—applied simply for local businesses.
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutPreviewSection;
