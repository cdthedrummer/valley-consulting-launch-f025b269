
import React from "react";
import { Users } from "lucide-react";
import ServiceDetailLayout from "@/components/ServiceDetailLayout";
import FAQSection from "@/components/FAQSection";
import SEOHead from "@/components/SEOHead";

const Consulting: React.FC = () => {
  const approachDescription = (
    <>
      <p className="mb-4">
        Our consulting services provide contractor businesses with expert guidance on marketing strategy, business development, and customer acquisition. We work closely with you to understand your unique challenges and develop customized solutions to help you grow.
      </p>
      <p className="mb-4">
        With experience working with contractors across the Hudson Valley, we bring industry-specific knowledge and proven strategies that have helped similar businesses succeed in this competitive market.
      </p>
    </>
  );

  return (
    <>
      <SEOHead
        title="Consulting Services | Hudson Valley Consulting"
        description="Practical marketing consulting for Hudson Valley businesses—audits, strategy, and roadmaps that drive growth."
        canonicalUrl="/services/consulting"
      />
      <ServiceDetailLayout
        icon={<Users className="text-hvcg-blue-dark w-10 h-10" />}
        title="Consulting Services"
        description="Expert advice tailored to your contracting business, helping you make smart marketing decisions."
        approachTitle="Our Consulting Approach"
        approachDescription={approachDescription}
        servicesList={[
          "Comprehensive marketing audits",
          "Competitor analysis and market positioning",
          "Customer acquisition strategy development",
          "Lead generation and conversion optimization",
          "Brand development and messaging",
          "Marketing budget planning and allocation",
          "Business growth consulting"
        ]}
        whyChooseTitle="Why Choose Our Consulting Services?"
        whyChooseFeatures={[
          {
            title: "Industry Expertise",
            description: "We specialize in working with contractors and understand the unique challenges and opportunities in your industry."
          },
          {
            title: "Customized Solutions",
            description: "We don't offer one-size-fits-all advice. Our recommendations are tailored specifically to your business goals and market situation."
          },
          {
            title: "Actionable Strategies",
            description: "We provide clear, practical guidance that you can implement immediately to start seeing results in your business."
          },
          {
            title: "Ongoing Support",
            description: "Our consulting relationships don't end after the initial engagement. We're available for follow-up support to ensure successful implementation."
          }
        ]}
      />

      <div className="container mx-auto px-4">
        <FAQSection
          title="Consulting services: frequently asked questions"
          faqs={[
            {
              question: "What topics can we cover in consulting?",
              answer: "Marketing audits, positioning, lead funnels, pricing, analytics, hiring vendors, and prioritizing a 90‑day roadmap tailored to your goals."
            },
            {
              question: "Do I need a long‑term contract?",
              answer: "No. We offer flexible engagements—start with a strategy sprint or monthly advisory and scale support as needed."
            },
            {
              question: "How are sessions delivered?",
              answer: "Video calls or in‑person (locally). You’ll receive notes, action items, and templates/tools after each session."
            },
            {
              question: "Can you work with my internal team or existing vendors?",
              answer: "Yes. We collaborate seamlessly with your staff or agencies to align goals, clarify responsibilities, and improve execution."
            },
            {
              question: "What outcomes should I expect?",
              answer: "Clarity on priorities, a practical plan, and measurable improvements in lead flow, conversion rate, or retention within weeks."
            }
          ]}
        />
      </div>
    </>
  );
};

export default Consulting;
