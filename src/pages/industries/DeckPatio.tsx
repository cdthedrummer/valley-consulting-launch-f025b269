
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

  const images = [
    {
      src: "/images/industries/deck-and-patio/deck-and-patio-1.jpg",
      alt: "Beautiful wooden deck with railings and outdoor furniture"
    },
    {
      src: "/images/industries/deck-and-patio/deck-and-patio-2.jpg",
      alt: "Modern patio design with outdoor seating"
    },
    {
      src: "/images/industries/deck-and-patio/deck-and-patio-3.jpg",
      alt: "Deck construction in progress"
    }
  ];

  const faqs = [
    { question: "How do you handle seasonality?", answer: "We build pipelines early with design/estimate offers and run off‑season lead gen for spring installs." },
    { question: "Can you promote premium materials?", answer: "Yes — we position composite and hardwood options to attract higher‑value projects." },
    { question: "Do you use before/after content?", answer: "We create visual galleries and social ads that showcase transformations and drive inquiries." },
  ];

  return (
    <IndustryTemplate
      industryName="Deck & Patio"
      heroImage="/images/industries/deck-and-patio/deck-and-patio-hero.jpg"
      challenges={challenges}
      solutions={solutions}
      images={images}
      faqs={faqs}
    />
  );
};

export default DeckPatioPage;
