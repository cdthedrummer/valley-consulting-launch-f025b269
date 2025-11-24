
import React from "react";
import { Building } from "lucide-react";
import ServiceDetailLayout from "@/components/ServiceDetailLayout";
import FAQSection from "@/components/FAQSection";
import SEOHead from "@/components/SEOHead";

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
    <>
      <SEOHead
        title="Google Ads for Contractors | Hudson Valley Consulting"
        description="Targeted local ads across Google and social to drive qualified leads for Hudson Valley businesses."
        canonicalUrl="/services/advertising"
      />
      <div className="bg-club-green min-h-screen">
        <ServiceDetailLayout
          icon={<Building className="text-action-yellow w-10 h-10" />}
          title="Google Ads for Contractors"
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

        <div className="container mx-auto px-4 pb-16">
          <FAQSection
            title="Advertising services: frequently asked questions"
            faqs={[
            {
              question: "Which platforms do you manage?",
              answer: "Google Search and Performance Max, Local Services Ads (LSAs), Facebook/Instagram, and occasionally YouTube and TikTok depending on fit."
            },
            {
              question: "How big of a budget do I need?",
              answer: "Most local campaigns start effectively around $1,000–$3,000/mo in ad spend. We scale based on results and your lead targets."
            },
            {
              question: "How do you target locally?",
              answer: "We use tight geo‑fencing, location intent, keyword match types, audiences, and negative lists to ensure ads run only where you serve."
            },
            {
              question: "Do you manage Google Local Services Ads?",
              answer: "Yes. We help with onboarding, category selection, bidding, and dispute processes to keep your cost per lead efficient."
            },
            {
              question: "What reporting will I receive?",
              answer: "Clear monthly reports with spend, CPL, calls, form fills, and recommended next steps—plus ongoing optimization notes."
            }
          ]}
          />
        </div>
      </div>
    </>
  );
};

export default Advertising;
