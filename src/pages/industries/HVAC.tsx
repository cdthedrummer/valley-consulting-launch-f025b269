
import React from "react";
import IndustryTemplate from "../IndustryTemplate";

const HVACPage: React.FC = () => {
  const challenges = [
    "Intense local competition from other HVAC contractors in Hudson Valley makes it difficult to stand out and win new customers.",
    
    "Seasonal demand fluctuations create cash flow challenges, with high demand during summer and winter months but slower periods in between.",
    
    "Rising customer acquisition costs through traditional advertising methods that don't specifically target homeowners in need of HVAC services."
  ];
  
  const solutions = [
    "Targeted digital advertising campaigns that reach Hudson Valley homeowners specifically when they're searching for HVAC services online.",
    
    "Seasonal marketing strategies that help maintain consistent business throughout the year by promoting preventative maintenance during shoulder seasons.",
    
    "Reputation management to showcase your quality work and expertise, setting you apart from competitors with authentic reviews and testimonials.",
    
    "Cost-effective lead generation strategies that reduce your customer acquisition costs while improving lead quality.",
    
    "Local SEO optimization to ensure your HVAC business appears prominently in local search results for Hudson Valley residents."
  ];

  const images = [
    {
      src: "https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Modern air conditioning unit installation"
    },
    {
      src: "https://images.unsplash.com/photo-1581244277943-fe4a9c777189?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "HVAC technician working on heating system"
    },
    {
      src: "https://images.unsplash.com/photo-1619045119136-349759223c3b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Home thermostat control system"
    }
  ];

  const faqs = [
    { question: "How do you generate HVAC leads?", answer: "We combine local SEO, Google Ads, and optimized Google Business Profile to capture high-intent searches like 'AC repair near me'." },
    { question: "Is HVAC marketing seasonal?", answer: "Demand spikes in summer and winter, so we front-load SEO and run targeted campaigns to smooth volume in shoulder seasons." },
    { question: "Can you track calls and form fills?", answer: "Yes. We implement call tracking and conversion tagging, reporting real leads — not vanity metrics." },
  ];

  return (
    <IndustryTemplate
      industryName="HVAC"
      heroImage="https://images.unsplash.com/photo-1621905251918-48416bd8575a?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      challenges={challenges}
      solutions={solutions}
      images={images}
      faqs={faqs}
    />
  );
};

export default HVACPage;
