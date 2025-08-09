
import React from "react";
import { Helmet } from "react-helmet-async";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQSectionProps {
  title: string;
  faqs: FAQItem[];
}

const FAQSection: React.FC<FAQSectionProps> = ({ title, faqs }) => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  };

  return (
    <section className="py-12">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-hvcg-blue-dark mb-6">{title}</h2>
        <Accordion type="single" collapsible className="bg-white border border-gray-200 rounded-lg">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="px-4 text-left text-hvcg-blue-dark">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 text-gray-700">
                <p>{faq.answer}</p>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(schema)}</script>
      </Helmet>
    </section>
  );
};

export default FAQSection;
