
import React from "react";
import { useScrollAnimation } from "@/hooks/use-scroll-animation";

interface FeatureProps {
  title: string;
  description: string;
}

interface WhyChooseSectionProps {
  title: string;
  features: FeatureProps[];
}

const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ title, features }) => {
  const { ref, isVisible } = useScrollAnimation();
  
  return (
    <div ref={ref} className="bg-gradient-to-br from-hvcg-blue/5 to-hvcg-blue-dark/5 rounded-2xl p-10 shadow-lg">
      <h2 className={`text-3xl font-bold text-hvcg-blue-dark mb-8 tracking-heading uppercase fade-in-up ${isVisible ? 'visible' : ''}`}>{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`bg-white p-8 rounded-xl shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-300 fade-in-up ${isVisible ? 'visible' : ''} fade-delay-${(index % 4) + 1}`}
          >
            <h3 className="text-xl font-bold text-hvcg-blue-dark mb-3 tracking-subheading">{feature.title}</h3>
            <p className="text-gray-700 leading-relaxed">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseSection;
