
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";

const AboutPreviewSection: React.FC = () => {
  return (
    <section className="py-16 bg-white">
      <div className="container-custom">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <img alt="Charlie Dickerson, Founder" className="rounded-lg shadow-lg" src="/lovable-uploads/8a371a47-6bef-49a1-bc4b-f57acace647c.jpg" />
          </div>
          <div>
            <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Why Choose Hudson Valley CG?</h2>
            <p className="text-lg text-gray-700 mb-4">
              With over 20 years of advertising experience and leadership roles at major brands like Roku and HBO Max, I bring enterprise-level strategies to local contractors.
            </p>
            <p className="text-lg text-gray-700 mb-6">
              I exclusively serve contractors with tailored strategies that understand your unique business challenges in the Hudson Valley area.
            </p>
            <Button asChild className="bg-hvcg-blue-dark hover:bg-hvcg-blue">
              <Link to="/about">Learn More About Us</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutPreviewSection;
