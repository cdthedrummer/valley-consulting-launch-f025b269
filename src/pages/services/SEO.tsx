
import React from "react";
import { Search } from "lucide-react";
import ServiceDetailLayout from "@/components/ServiceDetailLayout";
import FAQSection from "@/components/FAQSection";

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
    <>
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

      <div className="container mx-auto px-4">
        <FAQSection
          title="SEO services: frequently asked questions"
          faqs={[
            {
              question: "How long does SEO take to show results?",
              answer: "Most local businesses begin to see meaningful movement in 8–12 weeks, with compounding gains over 3–6 months. Timelines vary by competition and current site health."
            },
            {
              question: "What does local SEO include?",
              answer: "Optimizing your website content and structure, Google Business Profile, local citations (NAP), reviews strategy, and technical fixes that help you appear in the local map pack."
            },
            {
              question: "Do you optimize my Google Business Profile?",
              answer: "Yes. We fully optimize categories, services, photos, posts, and tracking, and we implement a reviews plan to improve visibility and conversions."
            },
            {
              question: "Can you work with my existing website?",
              answer: "Absolutely. We audit your current site and implement on-page, technical, and content improvements without requiring a full rebuild."
            },
            {
              question: "How do you measure success?",
              answer: "We track rankings, calls, form fills, and direction requests. Reporting is plain‑English and focused on leads, not vanity metrics."
            }
          ]}
        />
      </div>
    </>
  );
};

export default SEO;
