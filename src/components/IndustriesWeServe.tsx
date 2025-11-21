
import React from "react";
import { Building, Briefcase, Scissors, Wrench, Star, Home } from "lucide-react";

const industries = [
  { label: "Legal", Icon: Briefcase },
  { label: "Dental", Icon: Star },
  { label: "Salons & Spas", Icon: Scissors },
  { label: "Home Services", Icon: Wrench },
  { label: "Med Spa", Icon: Star },
  { label: "Real Estate", Icon: Home },
];

const IndustriesWeServe: React.FC = () => {
  return (
    <section className="py-16 bg-hvcg-blue-dark/5">
      <div className="container-custom">
        <div className="text-center max-w-3xl mx-auto mb-10">
          <h2 className="text-3xl font-bold text-hvcg-blue-dark mb-4">Industries we serve</h2>
          <p className="text-lg text-gray-700">Local expertise. Flexible playbooks. Results you can measure.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {industries.map(({ label, Icon }) => (
            <div key={label} className="flex items-center justify-center gap-2 px-4 py-3 bg-white border border-gray-200 rounded-lg shadow-sm hover-scale animate-fade-in">
              <Icon className="h-5 w-5 text-hvcg-blue" />
              <span className="text-sm font-medium text-hvcg-blue-dark">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;
