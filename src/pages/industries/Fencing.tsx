
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
      src: "https://images.unsplash.com/photo-1605146052194-3a44e7a7b02e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Modern privacy fence installation"
    },
    {
      src: "https://images.unsplash.com/photo-1628788835388-415ee2fa9576?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Decorative wooden fence with garden view"
    },
    {
      src: "https://images.unsplash.com/photo-1572931467331-5be092c77dff?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      alt: "Metal fence installation process"
    }
  ];

  return (
    <IndustryTemplate
      industryName="Fencing"
      heroImage="https://images.unsplash.com/photo-1605146052194-3a44e7a7b02e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      challenges={challenges}
      solutions={solutions}
      images={images}
    />
  );
};

export default FencingPage;
