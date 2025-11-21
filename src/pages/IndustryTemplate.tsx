import React from "react";
import { Link, useLocation } from "react-router-dom";
import { Calendar, Check } from "lucide-react";
import { Helmet } from "react-helmet-async";
import SEOHead from "@/components/SEOHead";
import { Button } from "@/components/ui/button";
import FAQSection from "@/components/FAQSection";

interface ImageProps {
  src: string;
  alt: string;
}

interface IndustryTemplateProps {
  industryName: string;
  region?: string;
  heroImage: string;
  challenges: string[];
  solutions: string[];
  images?: ImageProps[];
  faqs?: { question: string; answer: string }[];
}

const IndustryTemplate: React.FC<IndustryTemplateProps> = ({
  industryName,
  region = "Hudson Valley",
  heroImage,
  challenges,
  solutions,
  images = [],
  faqs = [],
}) => {
  const location = useLocation();
  const siteUrl = "https://hudsonvalleycg.com";
  const pageUrl = `${siteUrl}${location.pathname}`;
  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
      { "@type": "ListItem", position: 2, name: "Industries", item: `${siteUrl}/industries` },
      { "@type": "ListItem", position: 3, name: industryName, item: pageUrl },
    ],
  };

  const faqSchema = faqs && faqs.length > 0 ? {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((f) => ({
      "@type": "Question",
      name: f.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: f.answer,
      },
    })),
  } : null;

  return (
    <div className="bg-club-green min-h-screen">
      <SEOHead
        title={`${industryName} Marketing in ${region} | Hudson Valley Consulting`}
        description={`Marketing for ${industryName} contractors in ${region}: local SEO, ads, and consulting to grow leads.`}
        canonicalUrl={location.pathname}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
        {faqSchema && (
          <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>
        )}
      </Helmet>
      {/* Breadcrumbs */}
      <div className="container-custom pt-8">
        <nav className="mb-6 text-sm" aria-label="Breadcrumb">
          <ol className="flex items-center space-x-2 text-warm-cream/60">
            <li><Link to="/" className="hover:text-action-yellow transition-colors">Home</Link></li>
            <li aria-hidden="true">/</li>
            <li><Link to="/industries" className="hover:text-action-yellow transition-colors">Industries</Link></li>
            <li aria-hidden="true">/</li>
            <li className="text-warm-cream" aria-current="page">{industryName}</li>
          </ol>
        </nav>
      </div>
      {/* Hero Section */}
      <section className="relative py-16 md:py-24">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="font-archivo text-5xl md:text-7xl uppercase tracking-wide mb-6 text-warm-cream">
              {industryName} MARKETING
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-warm-cream/80 font-dm">
              Get more local customers and grow your {industryName.toLowerCase()} business in {region}.
            </p>
            <Button asChild size="lg" className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-full px-8 py-6 font-dm font-bold uppercase tracking-wide transition-all hover:-translate-y-1 active:scale-95">
              <Link to="/booking" className="inline-flex items-center">
                <Calendar className="mr-2 h-5 w-5" /> BOOK A CALL
              </Link>
            </Button>
          </div>
        </div>
      </section>
      
      {/* Challenges and Solutions */}
      <section className="py-16 bg-warm-cream">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Challenges Section */}
            <div>
              <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-club-green mb-8">
                COMMON CHALLENGES
              </h2>
              <div className="space-y-6">
                {challenges.map((challenge, index) => (
                  <div key={index} className="bg-club-green/10 p-6 rounded-3xl border border-club-green/20">
                    <h3 className="font-dm font-bold text-lg text-club-green mb-2">Challenge {index + 1}</h3>
                    <p className="text-club-green/80 font-dm">{challenge}</p>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Solutions Section */}
            <div>
              <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-club-green mb-8">
                HOW WE HELP
              </h2>
              <div className="space-y-4">
                {solutions.map((solution, index) => (
                  <div key={index} className="flex items-start">
                    <div className="bg-action-yellow rounded-full p-2 mt-1 mr-4 flex-shrink-0">
                      <Check className="h-4 w-4 text-club-green" />
                    </div>
                    <div>
                      <p className="text-lg text-club-green/90 font-dm">{solution}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Image Gallery Section */}
      {images && images.length > 0 && (
        <section className="py-16 bg-club-green">
          <div className="container-custom">
            <h2 className="font-archivo text-3xl md:text-4xl uppercase tracking-wide text-warm-cream mb-12 text-center">
              {industryName} PROJECTS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {images.map((image, index) => (
                <div key={index} className="overflow-hidden rounded-3xl shadow-lift hover:-translate-y-2 transition-all duration-300">
                  <img 
                    src={image.src} 
                    alt={image.alt || `${industryName} project example ${index + 1} in ${region}`} 
                    className="w-full h-64 object-cover transition-transform hover:scale-105"
                    loading="lazy"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      const slug = `${industryName.toLowerCase().replace(/&/g,'and').replace(/\s+/g,'-')}`;
                      e.currentTarget.src = `/images/industries/${slug}/${slug}-${index + 1}.jpg`;
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
      
      {/* Case Study Highlight */}
      <section className="py-16 bg-warm-cream">
        <div className="container-custom">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h2 className="font-archivo text-3xl md:text-5xl uppercase tracking-wide text-club-green mb-6">
              SUCCESS STORY
            </h2>
            <p className="text-lg text-club-green/80 font-dm">
              How we helped a local {industryName.toLowerCase()} contractor grow their business.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-club-green rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">
              <h3 className="font-archivo text-xl uppercase tracking-wide text-action-yellow mb-4">
                THE CHALLENGE
              </h3>
              <p className="text-warm-cream/80 font-dm">
                A local {industryName.toLowerCase()} contractor was struggling to get consistent leads and relied too much on word-of-mouth. They were spending money on generic advertising with poor results.
              </p>
            </div>
            
            <div className="bg-club-green rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">
              <h3 className="font-archivo text-xl uppercase tracking-wide text-action-yellow mb-4">
                OUR SOLUTION
              </h3>
              <p className="text-warm-cream/80 font-dm">
                We created a targeted strategy focused on local homeowners searching for {industryName.toLowerCase()} services, optimized their Google Business Profile, and improved their online reputation.
              </p>
            </div>
            
            <div className="bg-club-green rounded-3xl p-8 hover:-translate-y-2 transition-all duration-300">
              <h3 className="font-archivo text-xl uppercase tracking-wide text-action-yellow mb-4">
                THE RESULTS
              </h3>
              <p className="text-warm-cream/80 font-dm">
                Within 3 months: 170% increase in qualified leads, 40% higher conversion rate, and more selective with high-value projects.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {faqs && faqs.length > 0 && (
        <div className="container mx-auto px-4">
          <FAQSection title={`${industryName} marketing: frequently asked questions`} faqs={faqs} />
        </div>
      )}
      
      {/* CTA Section */}
      <section className="py-24 bg-club-green">
        <div className="container-custom text-center">
          <h2 className="font-archivo text-4xl md:text-6xl uppercase tracking-wide mb-6 text-warm-cream">
            READY TO GROW?
          </h2>
          <p className="text-xl mb-10 max-w-2xl mx-auto text-warm-cream/80 font-dm">
            Book a free call and let's talk about growing your {industryName.toLowerCase()} business in {region}.
          </p>
          <Button asChild size="lg" className="bg-action-yellow hover:bg-action-yellow/90 text-club-green rounded-full px-8 py-6 font-dm font-bold uppercase tracking-wide transition-all hover:-translate-y-1 active:scale-95">
            <Link to="/booking" className="inline-flex items-center">
              <Calendar className="mr-2 h-5 w-5" /> BOOK A CALL
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
};

export default IndustryTemplate;
