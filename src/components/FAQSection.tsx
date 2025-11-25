
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
        <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-wide text-club-green mb-8">{title}</h2>
        <Accordion type="single" collapsible className="bg-white border-2 border-club-green/20 rounded-lg shadow-sm">
          {faqs.map((faq, idx) => (
            <AccordionItem key={idx} value={`item-${idx}`}>
              <AccordionTrigger className="px-6 py-4 text-left font-dm text-club-green font-semibold hover:text-action-yellow transition-colors">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-6 pb-4 font-dm text-club-green/80 text-base leading-relaxed">
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
