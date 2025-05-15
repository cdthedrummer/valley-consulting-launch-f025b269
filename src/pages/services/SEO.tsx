
import React from "react";
import { Search } from "lucide-react";
import ServiceDetailLayout from "@/components/ServiceDetailLayout";

const SEO: React.FC = () => {
  const approachDescription = (
    <>
      <p className="mb-4">
        Our search engine optimization services are designed to help your contracting business rank higher in local search results. When homeowners in the Hudson Valley search for the services you offer, we make sure your business appears at the top of their search results.
      </p>
      <p className="mb-4">
        We implement proven SEO techniques specifically tailored for contractors, focusing on local search optimization, content marketing, and technical improvements to your website that boost your visibility and attract more potential customers.
      </p>
    </>
  );

  return (
    <ServiceDetailLayout
      icon={<Search className="text-hvcg-blue-dark w-10 h-10" />}
      title="SEO Services"
      description="Help local customers find your business when they search online for contractors in Hudson Valley."
      approachTitle="Our SEO Approach"
      approachDescription={approachDescription}
      servicesList={[
        "Local SEO optimization to rank in the Google Map Pack",
        "Keyword research tailored to contractor services",
        "Website content optimization for search engines",
        "Google Business Profile setup and optimization",
        "Citation building and local directory submissions",
        "Competitor analysis and strategy development",
        "Monthly performance reporting"
      ]}
      whyChooseTitle="Why Choose Our SEO Services?"
      whyChooseFeatures={[
        {
          title: "Long-Term Results",
          description: "Unlike paid advertising, SEO provides sustainable, long-term results that continue to work for your business over time."
        },
        {
          title: "Local Expertise",
          description: "We understand the Hudson Valley market and optimize your online presence to target customers in specific towns and communities."
        },
        {
          title: "Contractor-Specific Strategy",
          description: "Our SEO approaches are tailored specifically for contractors and the unique challenges of marketing construction services online."
        },
        {
          title: "Transparent Process",
          description: "We clearly explain our SEO strategies and provide regular reports showing your improvement in search rankings over time."
        }
      ]}
    />
  );
};

export default SEO;
