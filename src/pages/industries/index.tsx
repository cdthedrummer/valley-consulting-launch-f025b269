
import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface Industry {
  name: string;
  path: string;
  description: string;
  icon: React.ReactNode;
  image: string;
}

const IndustriesIndex: React.FC = () => {
  const industries: Industry[] = [
    {
      name: "HVAC",
      path: "/industries/hvac",
      description: "Marketing strategies for heating, ventilation, and air conditioning contractors in Hudson Valley.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-hvcg-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 17h20M2 7h20M16 12H8M12 2v20"></path>
        </svg>
      ),
      image: "/images/industries/hvac/hvac-hero.jpg"
    },
    {
      name: "Plumbing",
      path: "/industries/plumbing",
      description: "Lead generation and brand building for plumbing contractors serving Hudson Valley residents.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-hvcg-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12 2v20M2 6h4a2 2 0 0 1 2 2v12M2 6V2h20v4M22 6H18a2 2 0 0 0-2 2v12M18 18h4"></path>
        </svg>
      ),
      image: "/images/industries/plumbing/plumbing-hero.jpg"
    },
    {
      name: "Fencing",
      path: "/industries/fencing",
      description: "Custom marketing solutions for fencing contractors to reach homeowners in Hudson Valley.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-hvcg-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M4 4v16M9 4v16M14 4v16M19 4v16M1 9h22M1 14h22"></path>
        </svg>
      ),
      image: "/images/industries/fencing/fencing-hero.jpg"
    },
    {
      name: "Deck & Patio",
      path: "/industries/deck-patio",
      description: "Marketing expertise for deck and patio builders looking to showcase their work to local homeowners.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-hvcg-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="6" width="20" height="12" rx="2"></rect>
          <path d="M6 12h12M8 18v2M16 18v2"></path>
        </svg>
      ),
      image: "/images/industries/deck-and-patio/deck-and-patio-hero.jpg"
    },
    {
      name: "Flooring",
      path: "/industries/flooring",
      description: "Strategic advertising for flooring contractors to connect with renovation projects in Hudson Valley.",
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-hvcg-blue-dark" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="2" width="20" height="20" rx="2"></rect>
          <path d="M7 7h.01M7 12h.01M7 17h.01M12 7h.01M12 12h.01M12 17h.01M17 7h.01M17 12h.01M17 17h.01"></path>
        </svg>
      ),
      image: "/images/industries/flooring/flooring-hero.jpg"
    },
  ];

  const siteUrl = "https://hudsonvalleycg.com";
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${siteUrl}/industries` },
    ],
  };

  return (
    <div className="pt-20 bg-club-green min-h-screen">
      <SEOHead
        title="Industries We Serve | Hudson Valley Consulting"
        description="Marketing and consulting for contractors across HVAC, plumbing, fencing, decking, and flooring in the Hudson Valley."
        canonicalUrl="/industries"
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      </Helmet>
      {/* Hero Section */}
      <section className="bg-club-green text-warm-cream py-16">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="font-archivo text-4xl lg:text-6xl uppercase tracking-wide mb-4">Industry-Specific Marketing</h1>
            <p className="font-dm text-xl text-warm-cream/80">
              Specialized marketing and consulting services tailored for different contracting trades in Hudson Valley.
            </p>
          </div>
        </div>
      </section>
      {/* Breadcrumbs */}
      <div className="container-custom mt-6">
        <nav className="mb-6 text-sm font-dm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-warm-cream/60">
            <li><Link to="/" className="hover:text-action-yellow transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-warm-cream" aria-current="page">Industries</li>
          </ol>
        </nav>
      </div>
      {/* Industries List */}
      <section className="py-16">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {industries.map((industry) => (
              <Card key={industry.name} className="overflow-hidden border-none shadow-lg bg-warm-cream rounded-3xl transition-all duration-300 hover:-translate-y-2 hover:shadow-lift">
                <div className="h-48 overflow-hidden">
                  <img 
                    src={industry.image} 
                    alt={`${industry.name} Contractors`}
                    className="w-full h-full object-cover transition-transform hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <div className="bg-action-yellow/20 p-3 rounded-3xl mr-4">
                      {industry.icon}
                    </div>
                    <h2 className="font-archivo text-2xl uppercase tracking-wide text-club-green">{industry.name}</h2>
                  </div>
                  
                  <p className="font-dm text-club-green/80 mb-6">{industry.description}</p>
                  
                  <Button asChild className="w-full bg-club-green hover:bg-club-green/90 text-warm-cream rounded-pill font-dm font-bold uppercase tracking-wide transition-all hover:shadow-lift">
                    <Link to={industry.path} className="flex items-center justify-center">
                      Learn More <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
          
          <div className="mt-16 p-8 bg-varsity-maroon rounded-3xl">
            <h2 className="font-archivo text-2xl md:text-3xl uppercase tracking-wide text-action-yellow mb-4">Don't See Your Industry?</h2>
            <p className="font-dm text-warm-cream/80 mb-4">
              We work with all types of contractors in the Hudson Valley area. Our marketing and consulting services can be tailored to your specific trade and business needs.
            </p>
            <Button asChild className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-pill font-dm font-bold uppercase tracking-wide px-6 py-3 transition-all hover:shadow-lift">
              <Link to="/booking">Contact Us</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default IndustriesIndex;
