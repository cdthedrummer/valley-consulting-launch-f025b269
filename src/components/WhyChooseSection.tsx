
import React from "react";

interface FeatureProps {
  title: string;
  description: string;
}

interface WhyChooseSectionProps {
  title: string;
  features: FeatureProps[];
}

const WhyChooseSection: React.FC<WhyChooseSectionProps> = ({ title, features }) => {
  return (
    <div className="bg-hvcg-gray rounded-lg p-8">
      <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-4">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow">
            <h3 className="text-lg font-semibold text-hvcg-blue-dark mb-2">{feature.title}</h3>
            <p>{feature.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WhyChooseSection;
