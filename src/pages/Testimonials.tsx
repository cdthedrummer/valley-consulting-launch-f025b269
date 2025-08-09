import React from "react";
import SEOHead from "@/components/SEOHead";

const Testimonials: React.FC = () => {
  return (
    <div className="pt-20">
      <SEOHead
        title="Client Testimonials | Hudson Valley Consulting"
        description="What local businesses say about working with Hudson Valley Consulting."
        canonicalUrl="/testimonials"
      />
      <header className="bg-hvcg-blue-dark text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold">Testimonials</h1>
          <p className="text-white/80 mt-2">Real feedback from local clients.</p>
        </div>
      </header>
      <main className="py-12 bg-white">
        <div className="container-custom grid grid-cols-1 md:grid-cols-2 gap-6">
          
          <blockquote className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
            <p className="text-gray-800">“Within 90 days, calls doubled and we were booking better jobs.”</p>
            <footer className="mt-3 text-sm text-gray-600">HVAC Contractor — Poughkeepsie</footer>
          </blockquote>
          <blockquote className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
            <p className="text-gray-800">“Clear reporting, solid strategy, and great communication.”</p>
            <footer className="mt-3 text-sm text-gray-600">Plumbing Company — Newburgh</footer>
          </blockquote>
          <blockquote className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
            <p className="text-gray-800">“Our GBP and SEO finally work together — organic leads up 3x.”</p>
            <footer className="mt-3 text-sm text-gray-600">Deck & Patio — Kingston</footer>
          </blockquote>
          <blockquote className="p-6 border border-gray-200 rounded-lg bg-white shadow-sm">
            <p className="text-gray-800">“They focus on real results, not vanity metrics.”</p>
            <footer className="mt-3 text-sm text-gray-600">Flooring — Beacon</footer>
          </blockquote>
        </div>
      </main>
    </div>
  );
};

export default Testimonials;
