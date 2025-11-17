
import React from "react";
import { Building, Briefcase, Scissors, Wrench, Star, Home } from "lucide-react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

const industries = [
  { label: "Legal", Icon: Briefcase },
  { label: "Dental", Icon: Star },
  { label: "Salons & Spas", Icon: Scissors },
  { label: "Home Services", Icon: Wrench },
  { label: "Med Spa", Icon: Star },
  { label: "Real Estate", Icon: Home },
];

const IndustriesWeServe: React.FC = () => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <section ref={ref} className="py-20 bg-gradient-to-b from-hvcg-blue-dark/5 to-white">
      <div className="container-custom">
        <div className={`text-center max-w-3xl mx-auto mb-16 fade-in-up ${isVisible ? 'visible' : ''}`}>
          <h2 className="text-4xl font-bold text-hvcg-blue-dark mb-6 tracking-heading uppercase">Industries we serve</h2>
          <p className="text-xl text-gray-700">Local expertise. Flexible playbooks. Results you can measure.</p>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
          {industries.map(({ label, Icon }, idx) => (
            <div 
              key={label} 
              className={`flex items-center justify-center gap-3 px-6 py-5 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 hover:border-hvcg-blue/30 transition-all duration-300 fade-in-up ${isVisible ? 'visible' : ''} fade-delay-${(idx % 4) + 1}`}
            >
              <Icon className="h-6 w-6 text-hvcg-blue" />
              <span className="text-sm font-semibold text-hvcg-blue-dark tracking-wide">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default IndustriesWeServe;
