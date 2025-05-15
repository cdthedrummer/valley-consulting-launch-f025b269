
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
      src: "https://images.unsplash.com/photo-1542013936693-884638332954?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Plumber fixing kitchen sink"
    },
    {
      src: "https://images.unsplash.com/photo-1601457238569-8b711d150726?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Modern bathroom plumbing fixtures"
    },
    {
      src: "https://images.unsplash.com/photo-1585704032915-c3400ca199e7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80", 
      alt: "Plumbing tools and equipment"
    }
  ];

  return (
    <IndustryTemplate
      industryName="Plumbing"
      heroImage="https://images.unsplash.com/photo-1558618666-5b6e429302bc?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      challenges={challenges}
      solutions={solutions}
      images={images}
    />
  );
};

export default PlumbingPage;
