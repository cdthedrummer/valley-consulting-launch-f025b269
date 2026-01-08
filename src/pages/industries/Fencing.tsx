
import React from "react";
import IndustryTemplate from "../IndustryTemplate";

const FencingPage: React.FC = () => {
  const challenges = [
    "Difficulty differentiating your fencing business from competitors in the Hudson Valley market.",
    
    "Seasonal nature of the fencing industry creates cash flow challenges during winter months.",
    
    "High cost of traditional advertising that doesn't specifically target homeowners planning fence installations."
  ];
  
  const solutions = [
    "Targeted online marketing campaigns that reach Hudson Valley homeowners at the exact moment they're researching fence installations.",
    
    "Seasonal marketing strategies to help maintain business throughout the year, promoting planning and early booking during off-seasons.",
    
    "Strategic content marketing showcasing your expertise, unique materials, and installation techniques.",
    
    "Local SEO optimization to ensure your fencing business appears prominently in local search results for Hudson Valley residents.",
    
    "Portfolio showcasing and professional online presence to highlight the quality of your work and build trust with potential clients."
  ];

  const images = [
    {
      src: "/images/industries/fencing/fencing-1.jpg",
      alt: "Modern privacy fence installation"
    },
    {
      src: "/images/industries/fencing/fencing-2.jpg",
      alt: "Decorative wooden fence with garden view"
    },
    {
      src: "/images/industries/fencing/fencing-3.jpg",
      alt: "Metal fence installation process"
    }
  ];

  const faqs = [
    { question: "Which fencing projects should we feature?", answer: "Show diverse materials (wood, vinyl, metal) and before/after galleries — this increases conversion rates." },
    { question: "Do you target neighborhoods?", answer: "Yes, we use geo‑targeting to reach high‑fit neighborhoods and zip codes in your service area." },
    { question: "How do you reduce ad waste?", answer: "We negative‑match low‑quality terms and optimize for calls/forms, not clicks." },
  ];

  return (
    <IndustryTemplate
      industryName="Fencing"
      heroImage="/images/industries/fencing/fencing-hero.jpg"
      challenges={challenges}
      solutions={solutions}
      images={images}
      faqs={faqs}
    />
  );
};

export default FencingPage;
