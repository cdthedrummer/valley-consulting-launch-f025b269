
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
      src: "https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Hardwood flooring installation"
    },
    {
      src: "https://images.unsplash.com/photo-1609529411158-fb89a96bb6b5?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Flooring contractor working on tile installation"
    },
    {
      src: "https://images.unsplash.com/photo-1509660933844-6910e12765a0?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
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
      heroImage="https://images.unsplash.com/photo-1581858726788-75bc0f6a952d?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      challenges={challenges}
      solutions={solutions}
      images={images}
      faqs={faqs}
    />
  );
};

export default FlooringPage;
