
import React from "react";

const ServicesHero: React.FC = () => {
  return (
    <section className="bg-gradient-to-r from-hvcg-blue-dark to-hvcg-blue text-white py-16 relative">
      {/* Semi-transparent overlay for better text visibility */}
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="container-custom text-center relative z-10">
        <h1 className="text-4xl lg:text-5xl font-bold mb-4">Our Services</h1>
        <p className="text-xl max-w-3xl mx-auto text-white/90">
          Expert advertising consulting services tailored specifically for contractors who want to attract better leads and grow their business.
        </p>
      </div>
    </section>
  );
};

export default ServicesHero;
