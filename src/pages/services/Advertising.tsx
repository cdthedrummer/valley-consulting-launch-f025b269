
import React from "react";
import { Building } from "lucide-react";
import ServiceDetailLayout from "@/components/ServiceDetailLayout";

const Advertising: React.FC = () => {
  const approachDescription = (
    <>
      <p className="mb-4">
        We specialize in creating targeted advertising campaigns that connect contractors with potential customers in the Hudson Valley. Our ads are strategically placed to reach homeowners who are actively searching for the services you provide.
      </p>
      <p className="mb-4">
        Using advanced targeting techniques, we ensure your advertising budget is spent efficiently, maximizing your return on investment and generating high-quality leads that are more likely to convert.
      </p>
    </>
  );

  return (
    <ServiceDetailLayout
      icon={<Building className="text-hvcg-blue-dark w-10 h-10" />}
      title="Advertising Services"
      description="Targeted local ads that reach homeowners in need of your services, right when they're searching."
      approachTitle="Our Advertising Approach"
      approachDescription={approachDescription}
      servicesList={[
        "Google Ads campaign creation and management",
        "Facebook and Instagram targeted advertising",
        "Local service ads optimization",
        "Geotargeted mobile advertising",
        "Remarketing campaigns to reach previous website visitors",
        "Detailed performance reporting and analytics"
      ]}
      whyChooseTitle="Why Choose Our Advertising Services?"
      whyChooseFeatures={[
        {
          title: "Hudson Valley Focus",
          description: "We understand the unique characteristics of the local market and create campaigns specifically tailored to reach homeowners in this region."
        },
        {
          title: "Contractor Specialization",
          description: "Our experience with contractor businesses means we know exactly how to position your services to stand out from competitors."
        },
        {
          title: "Data-Driven Approach",
          description: "We continuously monitor campaign performance and make adjustments to improve results and maximize your advertising ROI."
        },
        {
          title: "Transparent Reporting",
          description: "Regular reports show exactly how your advertising budget is being spent and what results it's generating for your business."
        }
      ]}
    />
  );
};

export default Advertising;
