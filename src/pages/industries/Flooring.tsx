
import React from "react";
import IndustryTemplate from "../IndustryTemplate";

const FlooringPage: React.FC = () => {
  const challenges = [
    "Intense competition among flooring contractors in Hudson Valley makes it difficult to win new customers and grow your business.",
    
    "Traditional advertising methods often miss targeting homeowners who are actively planning flooring renovations.",
    
    "Difficulty showcasing the quality of your workmanship and materials through conventional marketing channels."
  ];
  
  const solutions = [
    "Targeted digital marketing campaigns that reach Hudson Valley homeowners specifically when they're searching for flooring services.",
    
    "High-quality visual content strategy to showcase your previous work and the transformative impact of your flooring installations.",
    
    "Educational marketing addressing common flooring questions and concerns to establish your expertise and build trust.",
    
    "Strategic partnerships with local interior designers and home builders to create referral networks.",
    
    "Local SEO optimization to ensure your flooring business appears prominently in search results for Hudson Valley residents looking for flooring services."
  ];

  const images = [
    {
      src: "/images/industries/flooring/flooring-1.jpg",
      alt: "Hardwood flooring installation"
    },
    {
      src: "/images/industries/flooring/flooring-2.jpg",
      alt: "Flooring contractor working on tile installation"
    },
    {
      src: "/images/industries/flooring/flooring-3.jpg",
      alt: "Modern laminate flooring in living room"
    }
  ];

  const faqs = [
    { question: "What content attracts flooring leads?", answer: "Style guides, material comparisons, and cost/maintenance explainers perform well in search and social." },
    { question: "Can you target higher‑value installs?", answer: "We segment by household value and interests to attract hardwood, tile, and luxury vinyl projects." },
    { question: "Do you support showroom bookings?", answer: "Yes — we drive calls and appointment requests with tracked CTAs and chat." },
  ];

  return (
    <IndustryTemplate
      industryName="Flooring"
      heroImage="/images/industries/flooring/flooring-hero.jpg"
      challenges={challenges}
      solutions={solutions}
      images={images}
      faqs={faqs}
    />
  );
};

export default FlooringPage;
