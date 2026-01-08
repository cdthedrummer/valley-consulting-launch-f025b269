
import React from "react";
import IndustryTemplate from "../IndustryTemplate";

const PlumbingPage: React.FC = () => {
  const challenges = [
    "High competition among plumbing contractors in Hudson Valley makes it difficult to stand out and attract quality leads.",
    
    "Seasonal demand fluctuations for plumbing services create challenges in maintaining consistent cash flow throughout the year.",
    
    "Traditional advertising methods often fail to target homeowners specifically in need of plumbing services, resulting in wasted ad spend."
  ];
  
  const solutions = [
    "Targeted digital marketing campaigns reaching Hudson Valley homeowners exactly when they're searching for plumbing services online.",
    
    "Year-round marketing strategies that promote preventive maintenance during slower periods to maintain consistent business flow.",
    
    "Expert reputation management to showcase your quality workmanship and reliability with authentic reviews and testimonials.",
    
    "Optimized local SEO to ensure your plumbing business appears prominently in local search results for Hudson Valley residents.",
    
    "Cost-effective lead generation that reduces customer acquisition costs while improving the quality of your leads."
  ];

  const images = [
    {
      src: "/images/industries/plumbing/plumbing-1.jpg",
      alt: "Plumber fixing kitchen sink"
    },
    {
      src: "/images/industries/plumbing/plumbing-2.jpg",
      alt: "Modern bathroom plumbing fixtures"
    },
    {
      src: "/images/industries/plumbing/plumbing-3.jpg",
      alt: "Plumbing tools and equipment"
    }
  ];

  const faqs = [
    { question: "What plumbing keywords convert best?", answer: "Emergency and near‑me queries (e.g., 'emergency plumber near me') are high intent; we optimize pages and ads to match them." },
    { question: "How fast can we see results?", answer: "Ads drive leads immediately; SEO builds within 8–12 weeks and compounds from there." },
    { question: "Do you handle reviews?", answer: "We implement review generation and response workflows to boost Google Business Profile visibility and trust." },
  ];

  return (
    <IndustryTemplate
      industryName="Plumbing"
      heroImage="/images/industries/plumbing/plumbing-hero.jpg"
      challenges={challenges}
      solutions={solutions}
      images={images}
      faqs={faqs}
    />
  );
};

export default PlumbingPage;
