
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
    <div ref={ref} className="glass-card p-12 shadow-xl shadow-primary/10">
      <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold mb-10 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className={`glass-card p-8 hover:shadow-xl hover:shadow-primary/20 transition-all duration-700 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            style={{ transitionDelay: `${index * 100}ms` }}
          >
            <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
            <p className="text-muted-foreground leading-relaxed normal-case font-normal tracking-normal">{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseSection;
