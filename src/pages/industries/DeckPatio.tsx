
import React from "react";
import IndustryTemplate from "../IndustryTemplate";

const DeckPatioPage: React.FC = () => {
  const challenges = [
    "Standing out in the crowded Hudson Valley deck and patio contractor market with many competitors offering similar services.",
    
    "Highly seasonal business with most demand concentrated in spring and summer months, creating cash flow challenges during off-season.",
    
    "Difficulty showcasing your craftsmanship and unique designs to potential customers who are early in their decision-making process."
  ];
  
  const solutions = [
    "Visual marketing strategies that showcase your best deck and patio projects to Hudson Valley homeowners planning outdoor renovations.",
    
    "Off-season marketing campaigns promoting early booking discounts and design planning for the upcoming season.",
    
    "Digital portfolio and virtual design consultations to highlight your unique approach and craftsmanship.",
    
    "Local SEO optimization to ensure your business appears when Hudson Valley homeowners search for deck and patio contractors.",
    
    "Targeted advertising to reach homeowners in specific neighborhoods or with homes of a certain age or value that are prime for deck/patio projects."
  ];

  return (
    <IndustryTemplate
      industryName="Deck & Patio"
      heroImage="https://images.unsplash.com/photo-1591017403491-3f78e10e2154?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80"
      challenges={challenges}
      solutions={solutions}
    />
  );
};

export default DeckPatioPage;
