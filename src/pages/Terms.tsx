import React from "react";
import SEOHead from "@/components/SEOHead";

const Terms: React.FC = () => {
  return (
    <div className="pt-20">
      <SEOHead
        title="Terms of Service | Hudson Valley Consulting"
        description="Review the terms of service for using Hudson Valley Consulting's website and services."
        canonicalUrl="/terms"
      />
      <header className="bg-hvcg-blue-dark text-white py-16">
        <div className="container-custom">
          <h1 className="text-4xl font-bold">Terms of Service</h1>
          <p className="text-white/80 mt-2">Please read these terms carefully.</p>
        </div>
      </header>
      <main className="py-12">
        <div className="container-custom prose prose-slate max-w-3xl">
          
          <h2>Use of Service</h2>
          <p>By accessing our website, you agree to comply with these Terms. If you do not agree, please discontinue use.</p>
          <h2>Intellectual Property</h2>
          <p>All content on this site is owned by Hudson Valley Consulting unless otherwise noted. Unauthorized use is prohibited.</p>
          <h2>Limitation of Liability</h2>
          <p>We are not liable for any indirect or consequential damages arising from the use of our services.</p>
          <h2>Contact</h2>
          <p>If you have questions about these Terms, please contact us at contact@hvcg.us.</p>
        </div>
      </main>
    </div>
  );
};

export default Terms;
